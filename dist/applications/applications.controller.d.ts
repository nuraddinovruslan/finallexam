import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, UpdateApplicationStatusDto } from './applications.dto';
import { User } from '../users/user.entity';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    apply(dto: CreateApplicationDto, user: User): Promise<import("./application.entity").Application>;
    getMyApplications(user: User): Promise<import("./application.entity").Application[]>;
    getVacancyApplications(vacancyId: number, user: User): Promise<import("./application.entity").Application[]>;
    getAllApplications(): Promise<import("./application.entity").Application[]>;
    updateStatus(id: number, dto: UpdateApplicationStatusDto, user: User): Promise<import("./application.entity").Application>;
    cancelApplication(id: number, user: User): Promise<{
        message: string;
    }>;
}
