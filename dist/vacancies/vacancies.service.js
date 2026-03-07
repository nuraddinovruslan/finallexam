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
exports.VacanciesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vacancy_entity_1 = require("./vacancy.entity");
const company_entity_1 = require("../companies/company.entity");
const user_entity_1 = require("../users/user.entity");
let VacanciesService = class VacanciesService {
    constructor(vacancyRepository, companyRepository) {
        this.vacancyRepository = vacancyRepository;
        this.companyRepository = companyRepository;
    }
    async create(dto, user) {
        const company = await this.companyRepository.findOne({
            where: { id: dto.companyId },
        });
        if (!company)
            throw new common_1.NotFoundException(`Kompaniya #${dto.companyId} topilmadi`);
        if (company.ownerId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Siz faqat o\'z kompaniyangizga vakansiya qo\'sha olasiz');
        }
        const vacancy = this.vacancyRepository.create(dto);
        return this.vacancyRepository.save(vacancy);
    }
    async findAll(filters) {
        const query = this.vacancyRepository
            .createQueryBuilder('vacancy')
            .leftJoinAndSelect('vacancy.company', 'company')
            .where('vacancy.isActive = :isActive', { isActive: true });
        if (filters?.search) {
            query.andWhere('(vacancy.title ILIKE :search OR vacancy.description ILIKE :search)', { search: `%${filters.search}%` });
        }
        if (filters?.city) {
            query.andWhere('vacancy.city ILIKE :city', { city: `%${filters.city}%` });
        }
        if (filters?.employmentType) {
            query.andWhere('vacancy.employmentType = :type', { type: filters.employmentType });
        }
        if (filters?.experienceLevel) {
            query.andWhere('vacancy.experienceLevel = :level', { level: filters.experienceLevel });
        }
        if (filters?.salaryMin) {
            query.andWhere('vacancy.salaryMax >= :salaryMin', { salaryMin: filters.salaryMin });
        }
        return query.orderBy('vacancy.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const vacancy = await this.vacancyRepository.findOne({
            where: { id },
            relations: ['company'],
        });
        if (!vacancy)
            throw new common_1.NotFoundException(`Vakansiya #${id} topilmadi`);
        vacancy.viewsCount += 1;
        await this.vacancyRepository.save(vacancy);
        return vacancy;
    }
    async findByCompany(companyId) {
        return this.vacancyRepository.find({
            where: { companyId, isActive: true },
            order: { createdAt: 'DESC' },
        });
    }
    async update(id, dto, user) {
        const vacancy = await this.vacancyRepository.findOne({
            where: { id },
            relations: ['company'],
        });
        if (!vacancy)
            throw new common_1.NotFoundException(`Vakansiya #${id} topilmadi`);
        if (vacancy.company.ownerId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Bu vakansiyani faqat kompaniya egasi tahrirlashi mumkin');
        }
        Object.assign(vacancy, dto);
        return this.vacancyRepository.save(vacancy);
    }
    async remove(id, user) {
        const vacancy = await this.vacancyRepository.findOne({
            where: { id },
            relations: ['company'],
        });
        if (!vacancy)
            throw new common_1.NotFoundException(`Vakansiya #${id} topilmadi`);
        if (vacancy.company.ownerId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Bu vakansiyani faqat kompaniya egasi o\'chirishi mumkin');
        }
        await this.vacancyRepository.remove(vacancy);
        return { message: `Vakansiya #${id} o'chirildi` };
    }
};
exports.VacanciesService = VacanciesService;
exports.VacanciesService = VacanciesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vacancy_entity_1.Vacancy)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VacanciesService);
//# sourceMappingURL=vacancies.service.js.map