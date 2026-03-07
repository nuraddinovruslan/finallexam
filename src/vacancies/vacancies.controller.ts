import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiBearerAuth, ApiQuery,
} from '@nestjs/swagger';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto, UpdateVacancyDto } from './vacancies.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { User, UserRole } from '../users/user.entity';

@ApiTags('💼 Vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Barcha vakansiyalar (ochiq, filtrlash mumkin)' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'employmentType', required: false })
  @ApiQuery({ name: 'experienceLevel', required: false })
  @ApiQuery({ name: 'salaryMin', required: false, type: Number })
  findAll(
    @Query('search') search?: string,
    @Query('city') city?: string,
    @Query('employmentType') employmentType?: string,
    @Query('experienceLevel') experienceLevel?: string,
    @Query('salaryMin') salaryMin?: number,
  ) {
    return this.vacanciesService.findAll({ search, city, employmentType, experienceLevel, salaryMin });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Vakansiya ma\'lumotlari (ochiq)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vacanciesService.findOne(id);
  }

  @Public()
  @Get('company/:companyId')
  @ApiOperation({ summary: 'Kompaniyaning vakansiyalari (ochiq)' })
  findByCompany(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.vacanciesService.findByCompany(companyId);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi vakansiya qo\'shish (employer)' })
  create(@Body() dto: CreateVacancyDto, @CurrentUser() user: User) {
    return this.vacanciesService.create(dto, user);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Vakansiya tahrirlash (employer/admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVacancyDto,
    @CurrentUser() user: User,
  ) {
    return this.vacanciesService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Vakansiya o\'chirish (employer/admin)' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.vacanciesService.remove(id, user);
  }
}
