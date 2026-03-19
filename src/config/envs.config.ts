import { InternalServerErrorException } from '@nestjs/common';
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  DATABASE_URL: string;
}

const envSchema = joi
  .object({
    PORT: joi.number(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const responseSchema = envSchema.validate(process);

if (responseSchema.error)
  throw new InternalServerErrorException(
    `Config valid error: ${responseSchema.error.message}`,
  );
