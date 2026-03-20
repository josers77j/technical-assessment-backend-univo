import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

type PrismaMeta<T = unknown> = Record<string, unknown> & T;

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const logger = new Logger('ExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string;
    logger.error(exception);

    if (exception instanceof Prisma.PrismaClientValidationError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid request payload for database operation.',
        error: 'PrismaException',
        code: 'PRISMA_VALIDATION_ERROR',
      });
      return;
    }

    const code = exception.code;
    switch (exception.code) {
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        const meta = exception.meta as PrismaMeta<{
          target: string | string[];
        }>;
        const fields = Array.isArray(meta.target)
          ? meta.target.join(', ')
          : meta.target;
        message = `Unique constraint failed on field(s): ${fields}`;
        break;
      }
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;

      case 'P2003': {
        status = HttpStatus.BAD_REQUEST;
        const fieldName = exception.meta?.constraint as string | undefined;
        message = fieldName
          ? `Invalid foreign key reference: ${fieldName}`
          : 'Invalid foreign key reference';
        break;
      }

      case 'P2000': {
        status = HttpStatus.BAD_REQUEST;
        const columnName = exception.meta?.column_name as string;
        message = `Value is too long for column: ${columnName}`;
        break;
      }

      case 'P2011': {
        status = HttpStatus.BAD_REQUEST;
        const constraint = exception.meta?.constraint as string;
        message = `Null constraint violation: ${constraint}`;
        break;
      }

      case 'P2012': {
        status = HttpStatus.BAD_REQUEST;
        const path = exception.meta?.path as string;
        message = `Missing required value at: ${path}`;
        break;
      }

      default:
        message = exception.message;
        break;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      error: 'PrismaException',
      code,
    });
  }
}
