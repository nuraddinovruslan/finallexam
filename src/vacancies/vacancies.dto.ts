import { ApiProperty } from '@nestjs/swagger';
import {
  IsString, IsOptional, IsNotEmpty, IsEnum,
  IsNumber, IsPositive, Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EmploymentType, ExperienceLevel } from './vacancy.entity';

export class CreateVacancyDto {
  @ApiProperty({ example: 'Senior Backend Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'We are looking for an experienced backend developer...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Node.js 5+ years, PostgreSQL, Docker', required: false })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiProperty({ example: 'Health insurance, remote work, stock options', required: false })
  @IsString()
  @IsOptional()
  benefits?: string;

  @ApiProperty({ example: 3000, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  salaryMin?: number;

  @ApiProperty({ example: 5000, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  salaryMax?: number;

  @ApiProperty({ example: 'USD', required: false })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ enum: EmploymentType, required: false })
  @IsEnum(EmploymentType)
  @IsOptional()
  employmentType?: EmploymentType;

  @ApiProperty({ enum: ExperienceLevel, required: false })
  @IsEnum(ExperienceLevel)
  @IsOptional()
  experienceLevel?: ExperienceLevel;

  @ApiProperty({ example: 'Toshkent', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 1, description: 'Kompaniya ID' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  companyId: number;
}

export class UpdateVacancyDto {
  @ApiProperty({ example: 'Senior Backend Developer', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  benefits?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  salaryMin?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  salaryMax?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ enum: EmploymentType, required: false })
  @IsEnum(EmploymentType)
  @IsOptional()
  employmentType?: EmploymentType;

  @ApiProperty({ enum: ExperienceLevel, required: false })
  @IsEnum(ExperienceLevel)
  @IsOptional()
  experienceLevel?: ExperienceLevel;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;
}
