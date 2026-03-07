import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
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
    getProfile(userId: number): Promise<{
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
    private generateToken;
}
