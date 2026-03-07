import { ApplicationStatus } from './application.entity';
export declare class CreateApplicationDto {
    vacancyId: number;
    resumeId?: number;
    coverLetter?: string;
}
export declare class UpdateApplicationStatusDto {
    status: ApplicationStatus;
}
