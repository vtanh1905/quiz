import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const resData: any = exception.getResponse();
    const statusCode = exception.getStatus();
    let error = exception.name;
    let message = exception.message;
    if (typeof resData === 'object') {
      error = resData.error;
      message = resData.message;
    }

    response.status(statusCode).json({
      statusCode,
      error,
      message,
      timestamp: new Date().toISOString(),
      apiPath: request.url,
    });
  }
}
