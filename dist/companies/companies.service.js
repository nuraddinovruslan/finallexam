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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./company.entity");
const user_entity_1 = require("../users/user.entity");
let CompaniesService = class CompaniesService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async create(createDto, owner) {
        const company = this.companyRepository.create({
            ...createDto,
            ownerId: owner.id,
        });
        return this.companyRepository.save(company);
    }
    async findAll(search) {
        const query = this.companyRepository.createQueryBuilder('company')
            .where('company.isActive = :isActive', { isActive: true });
        if (search) {
            query.andWhere('(company.name ILIKE :search OR company.industry ILIKE :search OR company.city ILIKE :search)', { search: `%${search}%` });
        }
        return query.orderBy('company.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const company = await this.companyRepository.findOne({ where: { id } });
        if (!company)
            throw new common_1.NotFoundException(`Kompaniya #${id} topilmadi`);
        return company;
    }
    async findMyCompanies(userId) {
        return this.companyRepository.find({
            where: { ownerId: userId },
            order: { createdAt: 'DESC' },
        });
    }
    async update(id, dto, user) {
        const company = await this.findOne(id);
        if (company.ownerId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Bu kompaniyani faqat egasi tahrirlashi mumkin');
        }
        Object.assign(company, dto);
        return this.companyRepository.save(company);
    }
    async remove(id, user) {
        const company = await this.findOne(id);
        if (company.ownerId !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Bu kompaniyani faqat egasi o\'chirishi mumkin');
        }
        await this.companyRepository.remove(company);
        return { message: `Kompaniya #${id} o'chirildi` };
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map