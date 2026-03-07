import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto, UpdateVacancyDto } from './vacancies.dto';
import { User } from '../users/user.entity';
export declare class VacanciesController {
    private readonly vacanciesService;
    constructor(vacanciesService: VacanciesService);
    findAll(search?: string, city?: string, employmentType?: string, experienceLevel?: string, salaryMin?: number): Promise<import("./vacancy.entity").Vacancy[]>;
    findOne(id: number): Promise<import("./vacancy.entity").Vacancy>;
    findByCompany(companyId: number): Promise<import("./vacancy.entity").Vacancy[]>;
    create(dto: CreateVacancyDto, user: User): Promise<import("./vacancy.entity").Vacancy>;
    update(id: number, dto: UpdateVacancyDto, user: User): Promise<import("./vacancy.entity").Vacancy>;
    remove(id: number, user: User): Promise<{
        message: string;
    }>;
}
