import { Company } from '../companies/company.entity';
export declare enum EmploymentType {
    FULL_TIME = "full_time",
    PART_TIME = "part_time",
    CONTRACT = "contract",
    INTERNSHIP = "internship",
    REMOTE = "remote"
}
export declare enum ExperienceLevel {
    NO_EXPERIENCE = "no_experience",
    JUNIOR = "junior",
    MIDDLE = "middle",
    SENIOR = "senior",
    LEAD = "lead"
}
export declare class Vacancy {
    id: number;
    title: string;
    description: string;
    requirements: string;
    benefits: string;
    salaryMin: number;
    salaryMax: number;
    currency: string;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    city: string;
    isActive: boolean;
    viewsCount: number;
    company: Company;
    companyId: number;
    createdAt: Date;
    updatedAt: Date;
}
