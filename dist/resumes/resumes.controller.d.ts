import { ResumesService } from './resumes.service';
import { CreateResumeDto, UpdateResumeDto } from './resumes.dto';
import { User } from '../users/user.entity';
export declare class ResumesController {
    private readonly resumesService;
    constructor(resumesService: ResumesService);
    findAll(search?: string): Promise<import("./resume.entity").Resume[]>;
    findOne(id: number): Promise<import("./resume.entity").Resume>;
    findMyResumes(user: User): Promise<import("./resume.entity").Resume[]>;
    create(dto: CreateResumeDto, user: User): Promise<import("./resume.entity").Resume>;
    update(id: number, dto: UpdateResumeDto, user: User): Promise<import("./resume.entity").Resume>;
    remove(id: number, user: User): Promise<{
        message: string;
    }>;
}
