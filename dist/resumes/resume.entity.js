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
exports.Resume = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../users/user.entity");
let Resume = class Resume {
};
exports.Resume = Resume;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Resume.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Backend Developer' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resume.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Experienced backend developer with 5 years...' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Node.js, Python, PostgreSQL' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Google - Senior Dev (2020-2024)' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "workExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TATU - Computer Science (2016-2020)' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "education", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3000 }),
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Resume.prototype, "expectedSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD' }),
    (0, typeorm_1.Column)({ default: 'UZS' }),
    __metadata("design:type", String)
], Resume.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toshkent' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'O\'zbekiston' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Resume.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Resume.prototype, "viewsCount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Resume.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resume.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Resume.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Resume.prototype, "updatedAt", void 0);
exports.Resume = Resume = __decorate([
    (0, typeorm_1.Entity)('resumes')
], Resume);
//# sourceMappingURL=resume.entity.js.map