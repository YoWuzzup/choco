import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { RedirectException } from '../exceptions/redirect.exception';

@Catch(RedirectException)
export class RedirectFilter implements ExceptionFilter {
  catch(exception: RedirectException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { redirectUrl } = exception.getResponse() as { redirectUrl: string };

    response.redirect(HttpStatus.SEE_OTHER, redirectUrl);
  }
}
