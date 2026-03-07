import { Repository } from 'typeorm';
import { Vacancy } from './vacancy.entity';
import { Company } from '../companies/company.entity';
import { CreateVacancyDto, UpdateVacancyDto } from './vacancies.dto';
import { User } from '../users/user.entity';
export declare class VacanciesService {
    private vacancyRepository;
    private companyRepository;
    constructor(vacancyRepository: Repository<Vacancy>, companyRepository: Repository<Company>);
    create(dto: CreateVacancyDto, user: User): Promise<Vacancy>;
    findAll(filters?: {
        search?: string;
        city?: string;
        employmentType?: string;
        experienceLevel?: string;
        salaryMin?: number;
    }): Promise<Vacancy[]>;
    findOne(id: number): Promise<Vacancy>;
    findByCompany(companyId: number): Promise<Vacancy[]>;
    update(id: number, dto: UpdateVacancyDto, user: User): Promise<Vacancy>;
    remove(id: number, user: User): Promise<{
        message: string;
    }>;
}
