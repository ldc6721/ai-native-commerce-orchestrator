# Stage 3 Auth First Implementation Plan

## Artifact Metadata

- Artifact name: Stage 3 Auth First Implementation Plan.
- Artifact type: implementation plan.
- Owning team: PM / Orchestrator.
- Owning domain: Auth.
- Status: active.
- Related stage: Stage 3 - First Implementation.
- Related contracts:
    - `.ai/domains/auth/auth-domain-contract.md`
    - `.ai/domains/auth/auth-api-contract.md`
- Last updated: 2026-07-05.

## Purpose

This document defines the first Stage 3 vertical slice. Stage 3 starts implementation, but it must stay small enough for PR-based review, QA, and rollback.

The first vertical slice is Auth backend session foundation.

## Stage 3 Entry Decision

Stage 3 may proceed on a branch based on the accepted Stage 2B scaffold stack.

Current entry condition:

- Stage 2B scaffold execution is complete.
- Backend scaffold exists and passes scaffold validation.
- Auth domain and API contracts exist as active artifacts.
- Auth is the selected first vertical slice.

## Selected Vertical Slice

### Name

Auth backend session foundation.

### Goal

Implement the smallest backend flow that can authenticate a known user, establish a server-side session, validate the current session, and invalidate the session.

### In Scope

- Auth backend module boundary.
- `POST /api/auth/login`.
- `POST /api/auth/logout`.
- `GET /api/auth/session`.
- `GET /api/auth/me`.
- Cookie-based session transport.
- Server-side session store abstraction.
- Redis-oriented session store contract.
- Test double for session store in automated tests.
- User persistence model required for credential verification.
- Prisma schema update for the initial User model.
- Safe error response shape.
- Backend unit and controller tests.

### Out of Scope

- Frontend login UI.
- Frontend Auth API client.
- Protected route implementation.
- Registration.
- Password reset.
- OAuth or social login.
- MFA.
- Role-based authorization.
- Admin permission model.
- Rate limiting.
- Production secrets management.
- Kubernetes application deployment.
- NGINX live routing validation.
- Redis Kubernetes workload.

## Decisions

### Session Transport

Decision:

- Use HTTP-only cookie-based session transport.

Cookie defaults:

- Cookie name: `sid`.
- `HttpOnly`: true.
- `SameSite`: `lax`.
- `Secure`: false in local development; true in production-like environments.
- Path: `/`.

Rationale:

- Aligns with the Stage 1 user decision to use cookie-based Auth sessions.
- Keeps session payload server-side.

### Session TTL

Decision:

- Session TTL is 7 days.
- The initial implementation uses fixed expiration.
- Rolling session renewal is deferred.

Rationale:

- 7 days is a practical local-first default for commerce account sessions.
- Fixed expiration is simpler and easier to validate in the first implementation.

### CSRF Protection

Decision:

- Initial Auth backend foundation uses `SameSite=Lax` cookies.
- A dedicated CSRF token mechanism is deferred until frontend form integration or cross-site embedding is introduced.

Rationale:

- Stage 3 first slice is backend-only and local-first.
- Login/logout endpoints are still reviewed as security-sensitive changes.

Deferred work:

- Add CSRF token strategy before broad browser-facing production hardening.

### Password Hashing

Decision:

- Use Argon2id for password hashing.

Rationale:

- Argon2id is a strong default for password storage.
- Credential verification must never expose hash or credential metadata.

Fallback rule:

- If dependency installation blocks local validation, pause and document the blocker instead of replacing password hashing with a weaker ad hoc implementation.

### User Model

Decision:

Initial persisted user fields:

- `id`
- `email`
- `displayName`
- `passwordHash`
- `createdAt`
- `updatedAt`

Constraints:

- `email` is unique.
- `passwordHash` is never returned in API responses.

Deferred fields:

- `email` verification state.
- account disabled state.
- lockout counters.
- role or permission fields.

### Prisma Migration

Decision:

- Database schema changes are managed through Prisma schema and Prisma migration artifacts only.
- Application code must not use raw SQL.

Stage 3 expectation:

- Add the initial `User` model.
- Add a Prisma migration generated from the Prisma schema before merge.

### Redis Session Store

Decision:

- Runtime session storage is Redis-oriented.
- Auth service depends on a session store interface.
- Automated unit/controller tests may use an in-memory test double.

Rationale:

- Keeps Redis as the production-oriented session source of truth without making every unit test depend on a running Redis container.

### API Status Codes

Decision:

- Login success: `200`.
- Logout success: `200`.
- Session status success, including anonymous: `200`.
- Current user success: `200`.
- Invalid credentials: `401`.
- Missing or expired session for `/api/auth/me`: `401`.
- Invalid request body: `400`.
- Unexpected server error: `500`.

### DTO Validation

Decision:

- Login request validates email and password as non-empty strings.
- Email must be syntactically valid.
- Password minimum length is 8 for initial validation.

Rationale:

- This is enough to protect backend expectations without defining full password policy.

## PR Plan

### PR-001 Auth Contract Finalization

Purpose:

- Promote Auth contracts from approved draft to active for Stage 3.
- Record the decisions in this plan.

Expected artifacts:

- `.ai/stage-3-auth-first-implementation-plan.md`
- Updated Auth domain contract.
- Updated Auth API contract.
- Updated artifact registry.

### PR-002 Auth Backend Session Foundation

Purpose:

- Implement the backend Auth vertical slice.

Expected implementation:

- Auth module.
- Auth controller.
- Auth service.
- Session store abstraction.
- Cookie handling.
- User credential verification boundary.
- Prisma user model and migration artifact.
- Tests for login, logout, session status, current user, and safe errors.

### PR-003 Auth QA And Integration Review

Purpose:

- Record validation evidence and remaining risks after implementation.

Expected artifacts:

- Stage 3 Auth implementation review.
- QA scenario result summary.
- Known gaps and follow-up issue list.

## Acceptance Criteria

Stage 3 Auth backend session foundation is acceptable when:

- Auth contract decisions are active.
- Login succeeds for a valid persisted user.
- Login fails safely for invalid credentials.
- Successful login sets an HTTP-only session cookie.
- /api/auth/session returns anonymous state without a session.
- /api/auth/session returns authenticated state with a valid session.
- /api/auth/me returns the current user with a valid session.
- /api/auth/me does not expose credential metadata.
- Logout invalidates the session.
- Repeated logout is safe.
- Unit/controller tests cover success and failure paths.
- Validation evidence is recorded.

## Rollback Consideration

Rollback should be possible by reverting the Auth backend implementation PR and its Prisma migration before the migration is applied to a shared environment.

Because Stage 3 starts local-first, production data rollback is not in scope yet.

## QA Requirement

QA review is required because Auth, session, and user-facing behavior are high-risk areas.

Initial QA can be artifact-driven and automated-test-driven. Browser E2E is deferred until frontend Auth UI exists.

## Known Gaps

- Actual Redis-backed integration validation requires local Redis availability.
- Actual PostgreSQL migration execution requires local PostgreSQL availability.
- kind cluster execution remains outside this first Auth implementation slice.
- CSRF hardening is deferred until frontend integration.
- Rate limiting and brute-force protection are deferred.

## Next Action

Proceed with PR-001 Auth Contract Finalization, then PR-002 Auth Backend Session Foundation.
