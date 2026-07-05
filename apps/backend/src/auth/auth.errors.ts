import { HttpException, HttpStatus } from '@nestjs/common';

export type AuthErrorCode =
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_SESSION_REQUIRED'
  | 'AUTH_SESSION_EXPIRED'
  | 'AUTH_INVALID_REQUEST'
  | 'AUTH_UNEXPECTED_ERROR';

export class AuthHttpException extends HttpException {
  constructor(code: AuthErrorCode, message: string, status: HttpStatus) {
    super({ code, message }, status);
  }
}
