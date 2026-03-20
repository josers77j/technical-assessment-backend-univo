import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ProviderStatus } from '../consts/provider-status.const';

export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
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

  @IsEnum(ProviderStatus)
  status?: typeof ProviderStatus;
}
