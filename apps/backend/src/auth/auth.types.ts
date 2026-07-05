export interface UserSummary {
  id: string;
  email: string;
  displayName: string;
}

export interface AuthUserRecord extends UserSummary {
  passwordHash: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticatedSessionResponse {
  authenticated: true;
  user: UserSummary;
}

export interface AnonymousSessionResponse {
  authenticated: false;
  user: null;
}

export type SessionStatusResponse =
  | AuthenticatedSessionResponse
  | AnonymousSessionResponse;

export interface ErrorResponse {
  code: string;
  message: string;
}
