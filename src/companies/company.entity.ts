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
import { User } from '../users/user.entity';

@Entity('companies')
export class Company {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Google LLC' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Leading tech company' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: 'https://google.com' })
  @Column({ nullable: true })
  website: string;

  @ApiProperty({ example: 'IT / Software' })
  @Column({ nullable: true })
  industry: string;

  @ApiProperty({ example: 'Toshkent' })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ example: 'O\'zbekiston' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ example: '1000-5000' })
  @Column({ nullable: true })
  employeeCount: string;

  @ApiProperty({ example: 'https://logo.url/img.png' })
  @Column({ nullable: true })
  logoUrl: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  ownerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
