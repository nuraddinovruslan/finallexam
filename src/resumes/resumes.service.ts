import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './resume.entity';
import { CreateResumeDto, UpdateResumeDto } from './resumes.dto';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) {}

  async create(dto: CreateResumeDto, user: User) {
    const resume = this.resumeRepository.create({
      ...dto,
      userId: user.id,
    });
    return this.resumeRepository.save(resume);
  }

  async findAll(search?: string) {
    const query = this.resumeRepository
      .createQueryBuilder('resume')
      .leftJoinAndSelect('resume.user', 'user')
      .where('resume.isActive = :isActive', { isActive: true });

    if (search) {
      query.andWhere(
        '(resume.title ILIKE :search OR resume.skills ILIKE :search OR resume.city ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    return query.orderBy('resume.createdAt', 'DESC').getMany();
  }

  async findOne(id: number) {
    const resume = await this.resumeRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!resume) throw new NotFoundException(`Rezyume #${id} topilmadi`);

    resume.viewsCount += 1;
    await this.resumeRepository.save(resume);

    return resume;
  }

  async findMyResumes(userId: number) {
    return this.resumeRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateResumeDto, user: User) {
    const resume = await this.resumeRepository.findOne({ where: { id } });
    if (!resume) throw new NotFoundException(`Rezyume #${id} topilmadi`);

    if (resume.userId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Bu rezyumeni faqat egasi tahrirlashi mumkin');
    }

    Object.assign(resume, dto);
    return this.resumeRepository.save(resume);
  }

  async remove(id: number, user: User) {
    const resume = await this.resumeRepository.findOne({ where: { id } });
    if (!resume) throw new NotFoundException(`Rezyume #${id} topilmadi`);

    if (resume.userId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Bu rezyumeni faqat egasi o\'chirishi mumkin');
    }

    await this.resumeRepository.remove(resume);
    return { message: `Rezyume #${id} o'chirildi` };
  }
}
