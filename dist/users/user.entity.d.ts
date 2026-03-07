export declare enum UserRole {
    JOBSEEKER = "jobseeker",
    EMPLOYER = "employer",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    phone: string;
    city: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
