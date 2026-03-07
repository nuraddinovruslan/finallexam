import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { User } from '../users/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../users/user.entity").UserRole;
            phone: string;
            city: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../users/user.entity").UserRole;
            phone: string;
            city: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getProfile(user: User): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: import("../users/user.entity").UserRole;
        phone: string;
        city: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
