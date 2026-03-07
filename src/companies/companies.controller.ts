import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { User, UserRole } from '../users/user.entity';

@ApiTags('🏢 Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Barcha kompaniyalar (ochiq)' })
  @ApiQuery({ name: 'search', required: false, description: 'Qidirish' })
  findAll(@Query('search') search?: string) {
    return this.companiesService.findAll(search);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Kompaniya ma\'lumotlari (ochiq)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @Get('my/list')
  @ApiBearerAuth('JWT')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Mening kompaniyalarim (employer)' })
  findMyCompanies(@CurrentUser() user: User) {
    return this.companiesService.findMyCompanies(user.id);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Kompaniya yaratish (employer)' })
  create(@Body() dto: CreateCompanyDto, @CurrentUser() user: User) {
    return this.companiesService.create(dto, user);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Kompaniya tahrirlash (employer/admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompanyDto,
    @CurrentUser() user: User,
  ) {
    return this.companiesService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Kompaniya o\'chirish (employer/admin)' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.companiesService.remove(id, user);
  }
}
