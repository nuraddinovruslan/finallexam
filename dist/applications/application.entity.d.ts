import { User } from '../users/user.entity';
import { Vacancy } from '../vacancies/vacancy.entity';
import { Resume } from '../resumes/resume.entity';
export declare enum ApplicationStatus {
    PENDING = "pending",
    REVIEWED = "reviewed",
    INTERVIEW = "interview",
    REJECTED = "rejected",
    ACCEPTED = "accepted"
}
export declare class Application {
    id: number;
    status: ApplicationStatus;
    coverLetter: string;
    applicant: User;
    applicantId: number;
    vacancy: Vacancy;
    vacancyId: number;
    resume: Resume;
    resumeId: number;
    createdAt: Date;
    updatedAt: Date;
}
