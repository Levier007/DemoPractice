import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const MyDecorator = createParamDecorator(
  (key: string, executionContext: ExecutionContext) => {
    const request: Request = executionContext.switchToHttp().getRequest();
    console.log(request.query[key]);
    return request.query[key];
  },
);
