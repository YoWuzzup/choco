import { HttpException, HttpStatus } from '@nestjs/common';

export class RedirectException extends HttpException {
  constructor(redirectUrl: string) {
    super(
      { statusCode: HttpStatus.SEE_OTHER, redirectUrl },
      HttpStatus.SEE_OTHER,
    );
  }
}
