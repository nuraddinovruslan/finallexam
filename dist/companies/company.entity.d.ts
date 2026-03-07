import { User } from '../users/user.entity';
export declare class Company {
    id: number;
    name: string;
    description: string;
    website: string;
    industry: string;
    city: string;
    country: string;
    employeeCount: string;
    logoUrl: string;
    isActive: boolean;
    owner: User;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
}
