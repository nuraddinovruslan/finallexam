import { UserRole } from './user.entity';
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    city?: string;
}
export declare class UpdateUserRoleDto {
    role: UserRole;
}
