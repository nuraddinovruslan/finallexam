import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, UpdateResumeDto } from './resumes.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { User, UserRole } from '../users/user.entity';

@ApiTags('📄 Resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Barcha rezyumeler (ochiq, employer ko\'ra oladi)' })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query('search') search?: string) {
    return this.resumesService.findAll(search);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Rezyume ma\'lumotlari (ochiq)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resumesService.findOne(id);
  }

  @Get('my/list')
  @ApiBearerAuth('JWT')
  @Roles(UserRole.JOBSEEKER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Mening rezyumelerim (jobseeker)' })
  findMyResumes(@CurrentUser() user: User) {
    return this.resumesService.findMyResumes(user.id);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @Roles(UserRole.JOBSEEKER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi rezyume yaratish (jobseeker)' })
  create(@Body() dto: CreateResumeDto, @CurrentUser() user: User) {
    return this.resumesService.create(dto, user);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @Roles(UserRole.JOBSEEKER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Rezyume tahrirlash (jobseeker/admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResumeDto,
    @CurrentUser() user: User,
  ) {
    return this.resumesService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @Roles(UserRole.JOBSEEKER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Rezyume o\'chirish (jobseeker/admin)' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.resumesService.remove(id, user);
  }
}
