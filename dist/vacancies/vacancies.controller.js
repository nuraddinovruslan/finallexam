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
exports.VacanciesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vacancies_service_1 = require("./vacancies.service");
const vacancies_dto_1 = require("./vacancies.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
const user_entity_1 = require("../users/user.entity");
let VacanciesController = class VacanciesController {
    constructor(vacanciesService) {
        this.vacanciesService = vacanciesService;
    }
    findAll(search, city, employmentType, experienceLevel, salaryMin) {
        return this.vacanciesService.findAll({ search, city, employmentType, experienceLevel, salaryMin });
    }
    findOne(id) {
        return this.vacanciesService.findOne(id);
    }
    findByCompany(companyId) {
        return this.vacanciesService.findByCompany(companyId);
    }
    create(dto, user) {
        return this.vacanciesService.create(dto, user);
    }
    update(id, dto, user) {
        return this.vacanciesService.update(id, dto, user);
    }
    remove(id, user) {
        return this.vacanciesService.remove(id, user);
    }
};
exports.VacanciesController = VacanciesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Barcha vakansiyalar (ochiq, filtrlash mumkin)' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'employmentType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'experienceLevel', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'salaryMin', required: false, type: Number }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('city')),
    __param(2, (0, common_1.Query)('employmentType')),
    __param(3, (0, common_1.Query)('experienceLevel')),
    __param(4, (0, common_1.Query)('salaryMin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number]),
    __metadata("design:returntype", void 0)
], VacanciesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Vakansiya ma\'lumotlari (ochiq)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VacanciesController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('company/:companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Kompaniyaning vakansiyalari (ochiq)' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VacanciesController.prototype, "findByCompany", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.EMPLOYER, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Yangi vakansiya qo\'shish (employer)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vacancies_dto_1.CreateVacancyDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], VacanciesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.EMPLOYER, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Vakansiya tahrirlash (employer/admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, vacancies_dto_1.UpdateVacancyDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], VacanciesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.EMPLOYER, user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Vakansiya o\'chirish (employer/admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], VacanciesController.prototype, "remove", null);
exports.VacanciesController = VacanciesController = __decorate([
    (0, swagger_1.ApiTags)('💼 Vacancies'),
    (0, common_1.Controller)('vacancies'),
    __metadata("design:paramtypes", [vacancies_service_1.VacanciesService])
], VacanciesController);
//# sourceMappingURL=vacancies.controller.js.map