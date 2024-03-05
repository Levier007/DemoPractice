// invalid-data.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InvalidDataException } from './invalidDataException';

@Catch(InvalidDataException)
export class InvalidDataFilter implements ExceptionFilter {
  catch(exception: InvalidDataException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
