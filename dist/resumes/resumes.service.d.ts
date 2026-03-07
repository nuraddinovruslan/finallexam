import { Repository } from 'typeorm';
import { Resume } from './resume.entity';
import { CreateResumeDto, UpdateResumeDto } from './resumes.dto';
import { User } from '../users/user.entity';
export declare class ResumesService {
    private resumeRepository;
    constructor(resumeRepository: Repository<Resume>);
    create(dto: CreateResumeDto, user: User): Promise<Resume>;
    findAll(search?: string): Promise<Resume[]>;
    findOne(id: number): Promise<Resume>;
    findMyResumes(userId: number): Promise<Resume[]>;
    update(id: number, dto: UpdateResumeDto, user: User): Promise<Resume>;
    remove(id: number, user: User): Promise<{
        message: string;
    }>;
}
