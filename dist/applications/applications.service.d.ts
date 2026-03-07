import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { Vacancy } from '../vacancies/vacancy.entity';
import { CreateApplicationDto, UpdateApplicationStatusDto } from './applications.dto';
import { User } from '../users/user.entity';
export declare class ApplicationsService {
    private appRepository;
    private vacancyRepository;
    constructor(appRepository: Repository<Application>, vacancyRepository: Repository<Vacancy>);
    apply(dto: CreateApplicationDto, user: User): Promise<Application>;
    getMyApplications(userId: number): Promise<Application[]>;
    getVacancyApplications(vacancyId: number, user: User): Promise<Application[]>;
    updateStatus(id: number, dto: UpdateApplicationStatusDto, user: User): Promise<Application>;
    cancelApplication(id: number, user: User): Promise<{
        message: string;
    }>;
    getAllApplications(): Promise<Application[]>;
}
