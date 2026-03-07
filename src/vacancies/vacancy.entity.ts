import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../companies/company.entity';

export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  REMOTE = 'remote',
}

export enum ExperienceLevel {
  NO_EXPERIENCE = 'no_experience',
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  LEAD = 'lead',
}

@Entity('vacancies')
export class Vacancy {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Senior Backend Developer' })
  @Column()
  title: string;

  @ApiProperty({ example: 'We are looking for...' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'Node.js, PostgreSQL, Docker' })
  @Column({ type: 'text', nullable: true })
  requirements: string;

  @ApiProperty({ example: 'Health insurance, remote work' })
  @Column({ type: 'text', nullable: true })
  benefits: string;

  @ApiProperty({ example: 3000 })
  @Column({ type: 'decimal', nullable: true })
  salaryMin: number;

  @ApiProperty({ example: 5000 })
  @Column({ type: 'decimal', nullable: true })
  salaryMax: number;

  @ApiProperty({ example: 'USD' })
  @Column({ default: 'UZS' })
  currency: string;

  @ApiProperty({ enum: EmploymentType })
  @Column({ type: 'enum', enum: EmploymentType, default: EmploymentType.FULL_TIME })
  employmentType: EmploymentType;

  @ApiProperty({ enum: ExperienceLevel })
  @Column({ type: 'enum', enum: ExperienceLevel, default: ExperienceLevel.MIDDLE })
  experienceLevel: ExperienceLevel;

  @ApiProperty({ example: 'Toshkent' })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: 0 })
  @Column({ default: 0 })
  viewsCount: number;

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
