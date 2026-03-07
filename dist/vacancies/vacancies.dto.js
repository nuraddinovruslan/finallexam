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
exports.UpdateVacancyDto = exports.CreateVacancyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const vacancy_entity_1 = require("./vacancy.entity");
class CreateVacancyDto {
}
exports.CreateVacancyDto = CreateVacancyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senior Backend Developer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'We are looking for an experienced backend developer...' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Node.js 5+ years, PostgreSQL, Docker', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Health insurance, remote work, stock options', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateVacancyDto.prototype, "salaryMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateVacancyDto.prototype, "salaryMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: vacancy_entity_1.EmploymentType, required: false }),
    (0, class_validator_1.IsEnum)(vacancy_entity_1.EmploymentType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "employmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: vacancy_entity_1.ExperienceLevel, required: false }),
    (0, class_validator_1.IsEnum)(vacancy_entity_1.ExperienceLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toshkent', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacancyDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Kompaniya ID' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateVacancyDto.prototype, "companyId", void 0);
class UpdateVacancyDto {
}
exports.UpdateVacancyDto = UpdateVacancyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senior Backend Developer', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateVacancyDto.prototype, "salaryMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateVacancyDto.prototype, "salaryMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: vacancy_entity_1.EmploymentType, required: false }),
    (0, class_validator_1.IsEnum)(vacancy_entity_1.EmploymentType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "employmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: vacancy_entity_1.ExperienceLevel, required: false }),
    (0, class_validator_1.IsEnum)(vacancy_entity_1.ExperienceLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVacancyDto.prototype, "city", void 0);
//# sourceMappingURL=vacancies.dto.js.map