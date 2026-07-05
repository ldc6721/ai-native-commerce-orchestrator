import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { LoginRequest } from './auth.types';

const SESSION_COOKIE_NAME = 'sid';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() request: LoginRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const result = await this.authService.login(request);
    reply.header(
      'Set-Cookie',
      this.buildSessionCookie(result.sessionId, result.ttlSeconds),
    );
    return {
      authenticated: result.authenticated,
      user: result.user,
    };
  }

  @Post('logout')
  async logout(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const result = await this.authService.logout(this.readSessionId(request));
    reply.header('Set-Cookie', this.buildExpiredSessionCookie());
    return result;
  }

  @Get('session')
  session(@Req() request: FastifyRequest) {
    return this.authService.sessionStatus(this.readSessionId(request));
  }

  @Get('me')
  me(@Req() request: FastifyRequest) {
    return this.authService.currentUser(this.readSessionId(request));
  }

  private readSessionId(request: FastifyRequest): string | null {
    const cookieHeader = request.headers.cookie;
    if (!cookieHeader) {
      return null;
    }
    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
      const [name, ...valueParts] = cookie.trim().split('=');
      if (name === SESSION_COOKIE_NAME) {
        return decodeURIComponent(valueParts.join('='));
      }
    }
    return null;
  }

  private buildSessionCookie(sessionId: string, ttlSeconds: number): string {
    return this.cookieBase(encodeURIComponent(sessionId)) + '; Max-Age=' + ttlSeconds;
  }

  private buildExpiredSessionCookie(): string {
    return this.cookieBase('') + '; Max-Age=0';
  }

  private cookieBase(value: string): string {
    const parts = [
      SESSION_COOKIE_NAME + '=' + value,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
    ];
    if (process.env.NODE_ENV === 'production') {
      parts.push('Secure');
    }
    return parts.join('; ');
  }
}
