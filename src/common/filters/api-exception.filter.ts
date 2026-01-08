import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ERROR_CODES } from 'src/common/enums/error-codes.enum';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus() as HttpStatus;
    const exceptionResponse: any = exception.getResponse();

    let message: string | string[];
    let errorCode: ERROR_CODES | undefined;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      message = exceptionResponse.message || exception.message;
      errorCode = exceptionResponse.code;
    } else {
      message = exception.message;
    }

    if (!errorCode) {
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          errorCode = ERROR_CODES.VALIDATION_ERROR;
          break;
        case HttpStatus.NOT_FOUND:
          errorCode = ERROR_CODES.RECORD_NOT_FOUND;
          break;
        case HttpStatus.CONFLICT:
          errorCode = ERROR_CODES.DUPLICATE_ENTRY;
          break;
        default:
          errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
      }
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
