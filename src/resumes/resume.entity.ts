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

@Entity('resumes')
export class Resume {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Backend Developer' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Experienced backend developer with 5 years...' })
  @Column({ type: 'text', nullable: true })
  summary: string;

  @ApiProperty({ example: 'Node.js, Python, PostgreSQL' })
  @Column({ type: 'text', nullable: true })
  skills: string;

  @ApiProperty({ example: 'Google - Senior Dev (2020-2024)' })
  @Column({ type: 'text', nullable: true })
  workExperience: string;

  @ApiProperty({ example: 'TATU - Computer Science (2016-2020)' })
  @Column({ type: 'text', nullable: true })
  education: string;

  @ApiProperty({ example: 3000 })
  @Column({ type: 'decimal', nullable: true })
  expectedSalary: number;

  @ApiProperty({ example: 'USD' })
  @Column({ default: 'UZS' })
  currency: string;

  @ApiProperty({ example: 'Toshkent' })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ example: 'O\'zbekiston' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: 0 })
  @Column({ default: 0 })
  viewsCount: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
