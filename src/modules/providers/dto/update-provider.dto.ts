import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ProviderStatus } from '../consts/provider-status.const';

export class UpdateProviderDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(ProviderStatus)
  status?: ProviderStatus;
}
