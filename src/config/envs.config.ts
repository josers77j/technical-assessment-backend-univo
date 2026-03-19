import { InternalServerErrorException } from '@nestjs/common';
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}

const envSchema = joi
  .object<EnvVars>({
    PORT: joi.number(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const responseSchema = envSchema.validate(process);

if (responseSchema.error)
  throw new InternalServerErrorException(
    `Config valid error: ${responseSchema.error.message}`,
  );

export const envVars: EnvVars = {
  PORT: responseSchema.value.PORT,
  DATABASE_URL: responseSchema.value.DATABASE_URL,
};
