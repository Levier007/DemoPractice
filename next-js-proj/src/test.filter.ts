import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { TestException } from './testException';

// @Catch(BadRequestException)
@Catch(TestException)
export class TestFilter implements ExceptionFilter {
  catch(exception: TestException, host: ArgumentsHost) {
    // host;
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response.status(500).json({
        message: exception.message,
      });
    } else if (host.getType() === 'ws') {
    } else if (host.getType() === 'rpc') {
    }
  }
}
