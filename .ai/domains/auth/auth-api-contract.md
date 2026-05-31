# Auth API Contract

## Artifact Metadata

- Artifact name: Auth API Contract.
- Artifact type: API contract.
- Owning team: Auth Team.
- Owning domain: Auth.
- Status: approved draft.
- Related backlog: S1-002 Auth Domain Contract Plan.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 Auth first vertical slice의 API boundary를 문서 artifact로 정의합니다. 이 contract는 implementation type, generated schema, shared package가 아니라 frontend/backend 협업의 source of truth입니다.

## Contract Scope

Initial endpoints:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/auth/session`

Out of scope:

- `POST /auth/register`
- `POST /auth/password-reset`
- OAuth callback endpoints.
- Admin auth endpoints.
- Role/permission endpoints.

## Common Rules

- Response body must not expose password, password hash, credential metadata, or session store payload.
- Error response should be stable enough for frontend behavior but must not leak sensitive credential detail.
- Session transport is cookie-based.
- Session storage is expected to be server-side and Redis-backed.
- API implementation must follow this document, not a shared generated package.

## Data Shapes

### User Summary

```text
UserSummary:
  id: string
  email: string
  displayName: string
```

Notes:

- `id` is an opaque user identifier.
- `email` is the login identifier for the initial Auth slice.
- `displayName` is frontend-safe display data.

### Authenticated Session

```text
AuthenticatedSession:
  authenticated: true
  user: UserSummary
```

### Anonymous Session

```text
AnonymousSession:
  authenticated: false
  user: null
```

### Error Response

```text
ErrorResponse:
  code: string
  message: string
```

Initial error codes:

- `AUTH_INVALID_CREDENTIALS`
- `AUTH_SESSION_REQUIRED`
- `AUTH_SESSION_EXPIRED`
- `AUTH_LOGOUT_FAILED`
- `AUTH_UNEXPECTED_ERROR`

## Endpoint Contracts

### `POST /api/auth/login`

Purpose:

- Authenticate a user and establish an authenticated session.

Request:

```text
LoginRequest:
  email: string
  password: string
```

Success response:

```text
LoginResponse:
  authenticated: true
  user: UserSummary
```

Expected behavior:

- Valid credentials create or refresh an authenticated server-side session.
- Invalid credentials return a stable auth error without exposing which credential failed.
- Session is established through cookie-based transport.

Failure cases:

- Invalid credentials.
- Disabled or unavailable account state, if introduced later.
- Session store unavailable.
- Unexpected server error.

### `POST /api/auth/logout`

Purpose:

- Invalidate the current authenticated session.

Request:

```text
LogoutRequest:
  empty body
```

Success response:

```text
LogoutResponse:
  authenticated: false
```

Expected behavior:

- Existing session is invalidated.
- Repeated logout should be safe from a user experience perspective.
- Frontend may clear local authenticated state after success.

Failure cases:

- Session store unavailable.
- Unexpected server error.

### `GET /api/auth/me`

Purpose:

- Return the current authenticated user's frontend-safe summary.

Request:

```text
CurrentUserRequest:
  no body
```

Success response:

```text
CurrentUserResponse:
  user: UserSummary
```

Failure cases:

- Missing session.
- Expired session.
- Invalid session.

### `GET /api/auth/session`

Purpose:

- Return whether the current request has an authenticated session.

Request:

```text
SessionStatusRequest:
  no body
```

Success response:

```text
SessionStatusResponse:
  authenticated: boolean
  user: UserSummary | null
```

Expected behavior:

- Authenticated session returns `authenticated: true` and `user`.
- Anonymous or expired session returns `authenticated: false` and `user: null`.
- This endpoint is intended for app bootstrap and route guarding.

## Frontend Integration Expectations

- Frontend login feature uses `POST /api/auth/login`.
- Frontend logout action uses `POST /api/auth/logout`.
- App bootstrap or protected route check may use `GET /api/auth/session`.
- User profile display may use `GET /api/auth/me`.
- API client logic is managed per feature/domain. A shared API client layer is not created.
- Frontend must not infer credential failure reason from error detail.

## Backend Integration Expectations

- Backend owns credential verification.
- Backend owns session creation, validation, invalidation.
- Backend must keep session payload server-side.
- Backend must not expose password hash or credential metadata.
- Backend should align Redis behavior with Redis usage strategy.

## QA Scenario Seeds

- Login succeeds with valid credentials.
- Login fails with invalid credentials and safe error response.
- Current user succeeds with valid session.
- Current user fails with missing or expired session.
- Session status returns anonymous state when no session exists.
- Logout invalidates authenticated session.
- Repeated logout does not create inconsistent frontend state.

## Open Questions

- CSRF protection model.
- Exact HTTP status codes.
- Session TTL.
- Account disabled or locked behavior.
- Rate limiting and brute-force protection.

These are intentionally deferred to backend architecture, Redis strategy, NGINX gateway strategy, and security review.

## Change Control

- Auth Team owns this API contract.
- Frontend Team approval is required for response shape changes.
- Backend Platform Team approval is required for session behavior changes.
- Infrastructure Team review is required when routing, gateway, or Redis assumptions change.
- QA Team review is required when acceptance scenarios change.
