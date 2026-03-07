import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createDto: CreateCompanyDto, owner: User) {
    const company = this.companyRepository.create({
      ...createDto,
      ownerId: owner.id,
    });
    return this.companyRepository.save(company);
  }

  async findAll(search?: string) {
    const query = this.companyRepository.createQueryBuilder('company')
      .where('company.isActive = :isActive', { isActive: true });

    if (search) {
      query.andWhere(
        '(company.name ILIKE :search OR company.industry ILIKE :search OR company.city ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    return query.orderBy('company.createdAt', 'DESC').getMany();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) throw new NotFoundException(`Kompaniya #${id} topilmadi`);
    return company;
  }

  async findMyCompanies(userId: number) {
    return this.companyRepository.find({
      where: { ownerId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateCompanyDto, user: User) {
    const company = await this.findOne(id);

    if (company.ownerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Bu kompaniyani faqat egasi tahrirlashi mumkin');
    }

    Object.assign(company, dto);
    return this.companyRepository.save(company);
  }

  async remove(id: number, user: User) {
    const company = await this.findOne(id);

    if (company.ownerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Bu kompaniyani faqat egasi o\'chirishi mumkin');
    }

    await this.companyRepository.remove(company);
    return { message: `Kompaniya #${id} o'chirildi` };
  }
}
