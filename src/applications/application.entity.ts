import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Vacancy } from '../vacancies/vacancy.entity';
import { Resume } from '../resumes/resume.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  INTERVIEW = 'interview',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

@Entity('applications')
export class Application {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: ApplicationStatus })
  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @ApiProperty({ example: 'I am very interested in this position...' })
  @Column({ type: 'text', nullable: true })
  coverLetter: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'applicantId' })
  applicant: User;

  @Column()
  applicantId: number;

  @ManyToOne(() => Vacancy, { eager: true })
  @JoinColumn({ name: 'vacancyId' })
  vacancy: Vacancy;

  @Column()
  vacancyId: number;

  @ManyToOne(() => Resume, { eager: true, nullable: true })
  @JoinColumn({ name: 'resumeId' })
  resume: Resume;

  @Column({ nullable: true })
  resumeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
