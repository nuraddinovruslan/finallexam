"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("./resume.entity");
const user_entity_1 = require("../users/user.entity");
let ResumesService = class ResumesService {
    constructor(resumeRepository) {
        this.resumeRepository = resumeRepository;
    }
    async create(dto, user) {
        const resume = this.resumeRepository.create({
            ...dto,
            userId: user.id,
        });
        return this.resumeRepository.save(resume);
    }
    async findAll(search) {
        const query = this.resumeRepository
            .createQueryBuilder('resume')
            .leftJoinAndSelect('resume.user', 'user')
            .where('resume.isActive = :isActive', { isActive: true });
        if (search) {
            query.andWhere('(resume.title ILIKE :search OR resume.skills ILIKE :search OR resume.city ILIKE :search)', { search: `%${search}%` });
        }
        return query.orderBy('resume.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const resume = await this.resumeRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!resume)
            throw new common_1.NotFoundException(`Rezyume #${id} topilmadi`);
        resume.viewsCount += 1;
        await this.resumeRepository.save(resume);
        return resume;
    }
    async findMyResumes(userId) {
        return this.resumeRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async update(id, dto, user) {
        const resume = await this.resumeRepository.findOne({ where: { id } });
        if (!resume)
            throw new common_1.NotFoundException(`Rezyume #${id} topilmadi`);
        if (resume.userId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Bu rezyumeni faqat egasi tahrirlashi mumkin');
        }
        Object.assign(resume, dto);
        return this.resumeRepository.save(resume);
    }
    async remove(id, user) {
        const resume = await this.resumeRepository.findOne({ where: { id } });
        if (!resume)
            throw new common_1.NotFoundException(`Rezyume #${id} topilmadi`);
        if (resume.userId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Bu rezyumeni faqat egasi o\'chirishi mumkin');
        }
        await this.resumeRepository.remove(resume);
        return { message: `Rezyume #${id} o'chirildi` };
    }
};
exports.ResumesService = ResumesService;
exports.ResumesService = ResumesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResumesService);
//# sourceMappingURL=resumes.service.js.map