export interface UserSummary {
  id: string;
  email: string;
  displayName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticatedSession {
  authenticated: true;
  user: UserSummary;
}

export interface AnonymousSession {
  authenticated: false;
  user: null;
}

export type AuthSession = AuthenticatedSession | AnonymousSession;
export type LoginResponse = AuthenticatedSession;

export interface LogoutResponse {
  authenticated: false;
}

export type AuthErrorCode =
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_SESSION_REQUIRED'
  | 'AUTH_SESSION_EXPIRED'
  | 'AUTH_LOGOUT_FAILED'
  | 'AUTH_UNEXPECTED_ERROR'
  | 'AUTH_INVALID_REQUEST';
