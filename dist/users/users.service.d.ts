import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { UpdateUserDto, UpdateUserRoleDto } from './users.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto, currentUser: User): Promise<{
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
