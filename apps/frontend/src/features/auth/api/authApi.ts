import { z } from 'zod';
import type {
  AuthErrorCode,
  AuthSession,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
} from '../types/auth';

const authErrorCodes = [
  'AUTH_INVALID_CREDENTIALS',
  'AUTH_SESSION_REQUIRED',
  'AUTH_SESSION_EXPIRED',
  'AUTH_LOGOUT_FAILED',
  'AUTH_UNEXPECTED_ERROR',
  'AUTH_INVALID_REQUEST',
] as const;

const safeErrorMessages: Record<AuthErrorCode, string> = {
  AUTH_INVALID_CREDENTIALS: '이메일 또는 비밀번호를 확인해 주세요.',
  AUTH_SESSION_REQUIRED: '로그인이 필요합니다.',
  AUTH_SESSION_EXPIRED: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  AUTH_LOGOUT_FAILED: '로그아웃을 완료하지 못했습니다. 다시 시도해 주세요.',
  AUTH_UNEXPECTED_ERROR: '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.',
  AUTH_INVALID_REQUEST: '요청 내용을 확인해 주세요.',
};

const userSummarySchema = z.object({
  id: z.string(),
  email: z.string(),
  displayName: z.string(),
});

const authenticatedSessionSchema = z.object({
  authenticated: z.literal(true),
  user: userSummarySchema,
});

const authSessionSchema = z.discriminatedUnion('authenticated', [
  authenticatedSessionSchema,
  z.object({
    authenticated: z.literal(false),
    user: z.null(),
  }),
]);

const logoutResponseSchema = z.object({
  authenticated: z.literal(false),
});

const errorResponseSchema = z.object({
  code: z.enum(authErrorCodes),
  message: z.string(),
});

export class AuthApiError extends Error {
  constructor(
    public readonly code: AuthErrorCode,
    public readonly status: number | null,
    options?: { cause?: unknown },
  ) {
    super(safeErrorMessages[code], options);
    this.name = 'AuthApiError';
  }
}

async function requestJson<T>(
  path: string,
  schema: z.ZodType<T>,
  init: RequestInit,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');

  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      credentials: 'include',
      headers,
    });
  } catch (cause) {
    throw new AuthApiError('AUTH_UNEXPECTED_ERROR', null, { cause });
  }

  const body = await readResponseBody(response);
  if (!response.ok) {
    throw normalizeHttpError(body, response.status);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw new AuthApiError('AUTH_UNEXPECTED_ERROR', response.status, {
      cause: parsed.error,
    });
  }
  return parsed.data;
}

async function readResponseBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch (cause) {
    throw new AuthApiError('AUTH_UNEXPECTED_ERROR', response.status, { cause });
  }
}

function normalizeHttpError(body: unknown, status: number): AuthApiError {
  const parsed = errorResponseSchema.safeParse(body);
  if (!parsed.success) {
    return new AuthApiError('AUTH_UNEXPECTED_ERROR', status, {
      cause: parsed.error,
    });
  }
  return new AuthApiError(parsed.data.code, status);
}

export function login(request: LoginRequest): Promise<LoginResponse> {
  return requestJson('/api/auth/login', authenticatedSessionSchema, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
}

export function logout(): Promise<LogoutResponse> {
  return requestJson('/api/auth/logout', logoutResponseSchema, {
    method: 'POST',
  });
}

export function getSession(): Promise<AuthSession> {
  return requestJson('/api/auth/session', authSessionSchema, {
    method: 'GET',
  });
}
