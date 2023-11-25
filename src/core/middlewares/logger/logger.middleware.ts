import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const logger  = new Logger(LoggerMiddleware.name)
    const { method, originalUrl } = req;
    const { statusCode } = res;
    const message = `${method} ${originalUrl} ${statusCode}`;
    if (statusCode >= 500) {
      logger.error(message);
    } else if (statusCode >= 400) {
      logger.warn(message);
    } else {
      logger.log(message);
    } 
    next();
  }
}
