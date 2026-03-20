import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProviderStatus } from '../consts/provider-status.const';

export class UpdateProviderDto {
  @ApiPropertyOptional({
    example: 'Tech Supply Co',
    description: 'Updated provider name.',
  })
  @IsString()
  @IsOptional()
  name!: string;

  @ApiPropertyOptional({
    example: '742 Evergreen Terrace',
    description: 'Updated provider address.',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: '+1 555 123 4567',
    description: 'Updated provider phone number.',
  })
  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Electronics wholesale provider.',
    description: 'Updated provider description.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'support@techsupply.com',
    description: 'Updated provider email.',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    enum: ProviderStatus,
    example: ProviderStatus.ACTIVE,
    description: 'Provider status.',
  })
  @IsOptional()
  @IsEnum(ProviderStatus)
  status?: ProviderStatus;
}
