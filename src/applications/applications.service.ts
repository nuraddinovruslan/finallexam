import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { Vacancy } from '../vacancies/vacancy.entity';
import { CreateApplicationDto, UpdateApplicationStatusDto } from './applications.dto';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private appRepository: Repository<Application>,
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {}

  async apply(dto: CreateApplicationDto, user: User) {
    const vacancy = await this.vacancyRepository.findOne({
      where: { id: dto.vacancyId },
      relations: ['company'],
    });

    if (!vacancy || !vacancy.isActive) {
      throw new NotFoundException(`Vakansiya #${dto.vacancyId} topilmadi yoki yopilgan`);
    }

    const existing = await this.appRepository.findOne({
      where: { vacancyId: dto.vacancyId, applicantId: user.id },
    });

    if (existing) {
      throw new ConflictException('Siz bu vakansiyaga allaqachon ariza yuborgansiz');
    }

    const application = this.appRepository.create({
      ...dto,
      applicantId: user.id,
    });

    return this.appRepository.save(application);
  }

  async getMyApplications(userId: number) {
    return this.appRepository.find({
      where: { applicantId: userId },
      relations: ['vacancy', 'vacancy.company', 'resume'],
      order: { createdAt: 'DESC' },
    });
  }

  async getVacancyApplications(vacancyId: number, user: User) {
    const vacancy = await this.vacancyRepository.findOne({
      where: { id: vacancyId },
      relations: ['company'],
    });

    if (!vacancy) throw new NotFoundException(`Vakansiya #${vacancyId} topilmadi`);

    if (vacancy.company.ownerId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Faqat vakansiya egasi arizalarni ko\'ra oladi');
    }

    return this.appRepository.find({
      where: { vacancyId },
      relations: ['applicant', 'resume'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: number, dto: UpdateApplicationStatusDto, user: User) {
    const application = await this.appRepository.findOne({
      where: { id },
      relations: ['vacancy', 'vacancy.company'],
    });

    if (!application) throw new NotFoundException(`Ariza #${id} topilmadi`);

    if (
      application.vacancy.company.ownerId !== user.id &&
      user.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException('Faqat vakansiya egasi statusni o\'zgartira oladi');
    }

    application.status = dto.status;
    return this.appRepository.save(application);
  }

  async cancelApplication(id: number, user: User) {
    const application = await this.appRepository.findOne({ where: { id } });
    if (!application) throw new NotFoundException(`Ariza #${id} topilmadi`);

    if (application.applicantId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Faqat ariza egasi bekor qila oladi');
    }

    await this.appRepository.remove(application);
    return { message: `Ariza #${id} bekor qilindi` };
  }

  async getAllApplications() {
    return this.appRepository.find({
      relations: ['applicant', 'vacancy', 'vacancy.company'],
      order: { createdAt: 'DESC' },
    });
  }
}
