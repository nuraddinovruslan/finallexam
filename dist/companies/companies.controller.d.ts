import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { User } from '../users/user.entity';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    findAll(search?: string): Promise<import("./company.entity").Company[]>;
    findOne(id: number): Promise<import("./company.entity").Company>;
    findMyCompanies(user: User): Promise<import("./company.entity").Company[]>;
    create(dto: CreateCompanyDto, user: User): Promise<import("./company.entity").Company>;
    update(id: number, dto: UpdateCompanyDto, user: User): Promise<import("./company.entity").Company>;
    remove(id: number, user: User): Promise<{
        message: string;
    }>;
}
