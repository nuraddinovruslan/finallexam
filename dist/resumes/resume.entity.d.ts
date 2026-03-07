import { User } from '../users/user.entity';
export declare class Resume {
    id: number;
    title: string;
    summary: string;
    skills: string;
    workExperience: string;
    education: string;
    expectedSalary: number;
    currency: string;
    city: string;
    country: string;
    isActive: boolean;
    viewsCount: number;
    user: User;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
