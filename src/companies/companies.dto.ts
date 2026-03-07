import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Google LLC' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Leading tech company worldwide', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://google.com', required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ example: 'IT / Software', required: false })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiProperty({ example: 'Toshkent', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'O\'zbekiston', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: '1000-5000', required: false })
  @IsString()
  @IsOptional()
  employeeCount?: string;

  @ApiProperty({ example: 'https://logo.url/img.png', required: false })
  @IsString()
  @IsOptional()
  logoUrl?: string;
}

export class UpdateCompanyDto {
  @ApiProperty({ example: 'Google LLC', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://google.com', required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ example: 'IT / Software', required: false })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiProperty({ example: 'Toshkent', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'O\'zbekiston', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: '5000+', required: false })
  @IsString()
  @IsOptional()
  employeeCount?: string;

  @ApiProperty({ example: 'https://logo.url/img.png', required: false })
  @IsString()
  @IsOptional()
  logoUrl?: string;
}
