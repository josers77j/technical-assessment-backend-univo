import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({
    example: 'Tech Supply Co',
    description: 'Provider name.',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @ApiPropertyOptional({
    example: '742 Evergreen Terrace',
    description: 'Provider physical address.',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: '+50372727272',
    description: 'Phone in E.164 format, including country code, no spaces.',
  })
  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Electronics wholesale provider.',
    description: 'Additional provider details.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'sales@techsupply.com',
    description: 'Provider contact email.',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
