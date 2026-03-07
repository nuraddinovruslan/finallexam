import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, UpdateApplicationStatusDto } from './applications.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { User, UserRole } from '../users/user.entity';

@ApiTags('📨 Applications')
@ApiBearerAuth('JWT')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @Roles(UserRole.JOBSEEKER)
  @ApiOperation({ summary: 'Vakansiyaga ariza yuborish (jobseeker)' })
  apply(@Body() dto: CreateApplicationDto, @CurrentUser() user: User) {
    return this.applicationsService.apply(dto, user);
  }

  @Get('my')
  @Roles(UserRole.JOBSEEKER)
  @ApiOperation({ summary: 'Mening arizalarim (jobseeker)' })
  getMyApplications(@CurrentUser() user: User) {
    return this.applicationsService.getMyApplications(user.id);
  }

  @Get('vacancy/:vacancyId')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Vakansiya arizalari (employer/admin)' })
  getVacancyApplications(
    @Param('vacancyId', ParseIntPipe) vacancyId: number,
    @CurrentUser() user: User,
  ) {
    return this.applicationsService.getVacancyApplications(vacancyId, user);
  }

  @Get('all')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Barcha arizalar (admin)' })
  getAllApplications() {
    return this.applicationsService.getAllApplications();
  }

  @Patch(':id/status')
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Ariza statusini o\'zgartirish (employer/admin)' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateApplicationStatusDto,
    @CurrentUser() user: User,
  ) {
    return this.applicationsService.updateStatus(id, dto, user);
  }

  @Delete(':id')
  @Roles(UserRole.JOBSEEKER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Arizani bekor qilish (jobseeker/admin)' })
  cancelApplication(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.applicationsService.cancelApplication(id, user);
  }
}
