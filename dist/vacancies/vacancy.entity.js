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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vacancy = exports.ExperienceLevel = exports.EmploymentType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const company_entity_1 = require("../companies/company.entity");
var EmploymentType;
(function (EmploymentType) {
    EmploymentType["FULL_TIME"] = "full_time";
    EmploymentType["PART_TIME"] = "part_time";
    EmploymentType["CONTRACT"] = "contract";
    EmploymentType["INTERNSHIP"] = "internship";
    EmploymentType["REMOTE"] = "remote";
})(EmploymentType || (exports.EmploymentType = EmploymentType = {}));
var ExperienceLevel;
(function (ExperienceLevel) {
    ExperienceLevel["NO_EXPERIENCE"] = "no_experience";
    ExperienceLevel["JUNIOR"] = "junior";
    ExperienceLevel["MIDDLE"] = "middle";
    ExperienceLevel["SENIOR"] = "senior";
    ExperienceLevel["LEAD"] = "lead";
})(ExperienceLevel || (exports.ExperienceLevel = ExperienceLevel = {}));
let Vacancy = class Vacancy {
};
exports.Vacancy = Vacancy;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vacancy.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senior Backend Developer' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vacancy.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'We are looking for...' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Vacancy.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Node.js, PostgreSQL, Docker' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Vacancy.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Health insurance, remote work' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Vacancy.prototype, "benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3000 }),
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Vacancy.prototype, "salaryMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000 }),
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Vacancy.prototype, "salaryMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD' }),
    (0, typeorm_1.Column)({ default: 'UZS' }),
    __metadata("design:type", String)
], Vacancy.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: EmploymentType }),
    (0, typeorm_1.Column)({ type: 'enum', enum: EmploymentType, default: EmploymentType.FULL_TIME }),
    __metadata("design:type", String)
], Vacancy.prototype, "employmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ExperienceLevel }),
    (0, typeorm_1.Column)({ type: 'enum', enum: ExperienceLevel, default: ExperienceLevel.MIDDLE }),
    __metadata("design:type", String)
], Vacancy.prototype, "experienceLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toshkent' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vacancy.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Vacancy.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Vacancy.prototype, "viewsCount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'companyId' }),
    __metadata("design:type", company_entity_1.Company)
], Vacancy.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vacancy.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vacancy.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vacancy.prototype, "updatedAt", void 0);
exports.Vacancy = Vacancy = __decorate([
    (0, typeorm_1.Entity)('vacancies')
], Vacancy);
//# sourceMappingURL=vacancy.entity.js.map