import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { User } from '../users/user.entity';
export declare class CompaniesService {
    private companyRepository;
    constructor(companyRepository: Repository<Company>);
    create(createDto: CreateCompanyDto, owner: User): Promise<Company>;
    findAll(search?: string): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    findMyCompanies(userId: number): Promise<Company[]>;
    update(id: number, dto: UpdateCompanyDto, user: User): Promise<Company>;
    remove(id: number, user: User): Promise<{
        message: string;
    }>;
}
