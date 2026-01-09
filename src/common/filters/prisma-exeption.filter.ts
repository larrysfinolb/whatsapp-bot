import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ERROR_CODES } from '../enums/error-codes.enum';
import { ApiResponse } from '../interfaces/api-response.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus;
    let errorCode: ERROR_CODES;
    let message: string | string[];

    switch (exception.code) {
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        errorCode = ERROR_CODES.DUPLICATE_ENTRY;
        message = 'A record with the given unique constraint already exists.';
        break;
      }
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        errorCode = ERROR_CODES.RECORD_NOT_FOUND;
        message = 'The requested record was not found.';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
        message = 'An unexpected error occurred.';
    }

    const errorResponse: ApiResponse<void> = {
      success: false,
      statusCode: status,
      error: errorCode,
      message: message,
    };

    response.status(status).json(errorResponse);
  }
}
