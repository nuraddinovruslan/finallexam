import { UsersService } from './users.service';
import { UpdateUserDto, UpdateUserRoleDto } from './users.dto';
import { User, UserRole } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, dto: UpdateUserDto, user: User): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: UserRole;
        phone: string;
        city: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRole(id: number, dto: UpdateUserRoleDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: UserRole;
        phone: string;
        city: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deactivate(id: number): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
