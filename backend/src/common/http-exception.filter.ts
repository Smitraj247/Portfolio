import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

const ERROR_NAMES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const safeServerMessage = statusCode === HttpStatus.SERVICE_UNAVAILABLE
      ? "We're currently performing maintenance. The site is temporarily offline for scheduled updates and improvements. We'll be back soon. Thank you for your patience."
      : 'An unexpected error occurred. Please try again later.';
    const message = isHttpException && statusCode < 500
      ? this.getClientMessage(exception)
      : safeServerMessage;

    if (statusCode >= 500) {
      console.error(`HTTP ${statusCode} ${request.method} ${request.url}`);
    }

    response.status(statusCode).json({
      statusCode,
      error: ERROR_NAMES[statusCode] ?? 'Error',
      message,
    });
  }

  private getClientMessage(exception: HttpException): string | string[] {
    const body = exception.getResponse();
    if (typeof body === 'string') return body;
    if (typeof body === 'object' && body !== null && 'message' in body) {
      const message = (body as { message?: unknown }).message;
      if (typeof message === 'string' || (Array.isArray(message) && message.every((item) => typeof item === 'string'))) {
        return message;
      }
    }
    return exception.message;
  }
}
