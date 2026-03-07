import { EmploymentType, ExperienceLevel } from './vacancy.entity';
export declare class CreateVacancyDto {
    title: string;
    description: string;
    requirements?: string;
    benefits?: string;
    salaryMin?: number;
    salaryMax?: number;
    currency?: string;
    employmentType?: EmploymentType;
    experienceLevel?: ExperienceLevel;
    city?: string;
    companyId: number;
}
export declare class UpdateVacancyDto {
    title?: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    salaryMin?: number;
    salaryMax?: number;
    currency?: string;
    employmentType?: EmploymentType;
    experienceLevel?: ExperienceLevel;
    city?: string;
}
