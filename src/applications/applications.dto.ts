import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationStatus } from './application.entity';

export class CreateApplicationDto {
  @ApiProperty({ example: 1, description: 'Vakansiya ID' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  vacancyId: number;

  @ApiProperty({ example: 1, description: 'Rezyume ID', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  resumeId?: number;

  @ApiProperty({ example: 'I am very interested in this position because...', required: false })
  @IsString()
  @IsOptional()
  coverLetter?: string;
}

export class UpdateApplicationStatusDto {
  @ApiProperty({ enum: ApplicationStatus, example: ApplicationStatus.INTERVIEW })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
