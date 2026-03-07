import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './vacancy.entity';
import { Company } from '../companies/company.entity';
import { CreateVacancyDto, UpdateVacancyDto } from './vacancies.dto';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(dto: CreateVacancyDto, user: User) {
    const company = await this.companyRepository.findOne({
      where: { id: dto.companyId },
    });

    if (!company) throw new NotFoundException(`Kompaniya #${dto.companyId} topilmadi`);

    if (company.ownerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Siz faqat o\'z kompaniyangizga vakansiya qo\'sha olasiz');
    }

    const vacancy = this.vacancyRepository.create(dto);
    return this.vacancyRepository.save(vacancy);
  }

  async findAll(filters?: {
    search?: string;
    city?: string;
    employmentType?: string;
    experienceLevel?: string;
    salaryMin?: number;
  }) {
    const query = this.vacancyRepository
      .createQueryBuilder('vacancy')
      .leftJoinAndSelect('vacancy.company', 'company')
      .where('vacancy.isActive = :isActive', { isActive: true });

    if (filters?.search) {
      query.andWhere(
        '(vacancy.title ILIKE :search OR vacancy.description ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    if (filters?.city) {
      query.andWhere('vacancy.city ILIKE :city', { city: `%${filters.city}%` });
    }

    if (filters?.employmentType) {
      query.andWhere('vacancy.employmentType = :type', { type: filters.employmentType });
    }

    if (filters?.experienceLevel) {
      query.andWhere('vacancy.experienceLevel = :level', { level: filters.experienceLevel });
    }

    if (filters?.salaryMin) {
      query.andWhere('vacancy.salaryMax >= :salaryMin', { salaryMin: filters.salaryMin });
    }

    return query.orderBy('vacancy.createdAt', 'DESC').getMany();
  }

  async findOne(id: number) {
    const vacancy = await this.vacancyRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!vacancy) throw new NotFoundException(`Vakansiya #${id} topilmadi`);

    // Ko'rishlar sonini oshirish
    vacancy.viewsCount += 1;
    await this.vacancyRepository.save(vacancy);

    return vacancy;
  }

  async findByCompany(companyId: number) {
    return this.vacancyRepository.find({
      where: { companyId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateVacancyDto, user: User) {
    const vacancy = await this.vacancyRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!vacancy) throw new NotFoundException(`Vakansiya #${id} topilmadi`);

    if (vacancy.company.ownerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Bu vakansiyani faqat kompaniya egasi tahrirlashi mumkin');
    }

    Object.assign(vacancy, dto);
    return this.vacancyRepository.save(vacancy);
  }

  async remove(id: number, user: User) {
    const vacancy = await this.vacancyRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!vacancy) throw new NotFoundException(`Vakansiya #${id} topilmadi`);

    if (vacancy.company.ownerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Bu vakansiyani faqat kompaniya egasi o\'chirishi mumkin');
    }

    await this.vacancyRepository.remove(vacancy);
    return { message: `Vakansiya #${id} o'chirildi` };
  }
}
