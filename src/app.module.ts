import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { ResumesModule } from './resumes/resumes.module';
import { ApplicationsModule } from './applications/applications.module';

import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

import { User } from './users/user.entity';
import { Company } from './companies/company.entity';
import { Vacancy } from './vacancies/vacancy.entity';
import { Resume } from './resumes/resume.entity';
import { Application } from './applications/application.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
   TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('PGHOST') || 'postgres.railway.internal',
    port: config.get<number>('PGPORT') || 5432,
    username: config.get('PGUSER'),
    password: config.get('PGPASSWORD'),
    database: config.get('PGDATABASE'),
    entities: [User, Company, Vacancy, Resume, Application],
    synchronize: true,
    ssl: {
      rejectUnauthorized: false, 
    },
    extra: {
      connectionTimeoutMillis: 10000,
    },
  }),
}),,
    AuthModule,
    UsersModule,
    CompaniesModule,
    VacanciesModule,
    ResumesModule,
    ApplicationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
