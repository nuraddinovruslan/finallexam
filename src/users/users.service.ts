import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { UpdateUserDto, UpdateUserRoleDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'role', 'phone', 'city', 'isActive', 'createdAt'],
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'firstName', 'lastName', 'email', 'role', 'phone', 'city', 'isActive', 'createdAt'],
    });

    if (!user) {
      throw new NotFoundException(`Foydalanuvchi #${id} topilmadi`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser: User) {
    if (currentUser.id !== id && currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Siz faqat o\'z profilingizni tahrirlashingiz mumkin');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Foydalanuvchi #${id} topilmadi`);

    Object.assign(user, updateUserDto);
    const updated = await this.userRepository.save(user);
    const { password, ...result } = updated;
    return result;
  }

  async updateRole(id: number, dto: UpdateUserRoleDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Foydalanuvchi #${id} topilmadi`);

    user.role = dto.role;
    const updated = await this.userRepository.save(user);
    const { password, ...result } = updated;
    return result;
  }

  async deactivate(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Foydalanuvchi #${id} topilmadi`);

    user.isActive = false;
    await this.userRepository.save(user);
    return { message: `Foydalanuvchi #${id} bloklandi` };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Foydalanuvchi #${id} topilmadi`);

    await this.userRepository.remove(user);
    return { message: `Foydalanuvchi #${id} o'chirildi` };
  }
}
