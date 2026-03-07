import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResumeDto {
  @ApiProperty({ example: 'Backend Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Experienced backend developer with 5+ years...', required: false })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({ example: 'Node.js, TypeScript, PostgreSQL, Docker, Redis', required: false })
  @IsString()
  @IsOptional()
  skills?: string;

  @ApiProperty({ example: 'Google - Senior Dev (2020-2024)\nYandex - Middle Dev (2018-2020)', required: false })
  @IsString()
  @IsOptional()
  workExperience?: string;

  @ApiProperty({ example: 'TATU - Computer Science, Bachelor (2014-2018)', required: false })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiProperty({ example: 3000, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  expectedSalary?: number;

  @ApiProperty({ example: 'USD', required: false })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 'Toshkent', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'O\'zbekiston', required: false })
  @IsString()
  @IsOptional()
  country?: string;
}

export class UpdateResumeDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  skills?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  workExperience?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  expectedSalary?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  country?: string;
}
