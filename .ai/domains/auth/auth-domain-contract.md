# Auth Domain Contract

## Artifact Metadata

- Artifact name: Auth Domain Contract.
- Artifact type: domain contract.
- Owning team: Auth Team.
- Owning domain: Auth.
- Status: approved draft.
- Related backlog: S1-002 Auth Domain Contract Plan.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 Auth domain의 책임, 경계, 주요 개념, integration expectation을 정의합니다. 첫 vertical slice가 Auth 중심으로 결정되었으므로, backend/frontend/infrastructure scaffold와 구현은 이 contract를 기준으로 정렬됩니다.

## Domain Mission

Auth domain은 사용자의 인증 상태를 생성, 확인, 종료하는 책임을 가집니다. 초기 목표는 production-ready auth 전체를 구현하는 것이 아니라, session 기반 인증 흐름의 contract를 명확히 하여 Stage 2 scaffold와 Stage 3 first implementation의 기준을 만드는 것입니다.

## In Scope

- Login.
- Logout.
- Current authenticated user 조회.
- Session validation.
- Session lifecycle expectation.
- Authenticated request를 위한 frontend/backend boundary.
- Redis-backed session expectation.

## Out of Scope

- 회원가입.
- 비밀번호 재설정.
- 이메일 인증.
- OAuth / social login.
- MFA.
- Role-based authorization.
- Admin permission model.
- Payment 또는 order 권한 정책.
- Refresh token rotation.

Out of scope 항목은 후속 domain contract 또는 future issue에서 다룹니다.

## Core Concepts

### User Identity

초기 Auth vertical slice에서 user identity는 인증된 사용자를 식별하기 위한 최소 개념입니다.

필수 개념:

- User id.
- Email.
- Display name 또는 profile label.
- Authentication status.

민감 정보:

- Password hash.
- Password policy.
- Credential verification detail.

민감 정보는 API response나 frontend contract에 노출하지 않습니다.

### Session

Session은 사용자가 login 이후 authenticated state를 유지하기 위한 server-side state입니다.

초기 결정:

- Redis-backed session을 전제로 한다.
- Session transport는 cookie 기반으로 구성한다.
- Session id는 cookie를 통해 client에 전달될 수 있지만 session payload의 source of truth는 server-side Redis store이다.
- Session TTL은 Redis usage strategy에서 확정한다.
- Session invalidation은 logout과 expiration을 포함한다.

### Current User

Current user는 현재 session이 유효할 때 frontend가 사용할 수 있는 사용자 요약 정보입니다.

초기 정보:

- id.
- email.
- displayName.

추가 profile field는 Stage 3 이후 별도 contract에서 다룹니다.

## Domain Responsibilities

Auth Team은 다음을 소유합니다.

- Auth domain contract.
- Auth API contract.
- Session behavior expectation.
- Login/logout/current user acceptance criteria.
- Auth-related QA scenario seed.

Backend Platform Team은 다음을 지원합니다.

- NestJS module boundary.
- Session middleware 또는 guard 후보.
- Redis integration pattern.
- PostgreSQL user persistence boundary.

Frontend Team은 다음을 지원합니다.

- Login form boundary.
- Authenticated user state.
- Current user API integration.
- Authenticated route expectation.

Infrastructure Team은 다음을 지원합니다.

- Redis local/runtime placement.
- NGINX routing expectation.
- kind local environment implication.

## Cross-Domain Dependencies

Initial dependencies:

- Backend Platform: session handling, module boundary.
- Frontend: login/current user integration.
- Infrastructure: Redis availability and routing.
- PostgreSQL strategy: user persistence and migration expectation.

Deferred dependencies:

- Order authorization.
- Payment authorization.
- Admin permission.
- Notification email verification.

## Acceptance Criteria

Auth domain planning is acceptable when:

- Login, logout, current user, session validation are defined at contract level.
- Sensitive credential details are not exposed to frontend contract.
- Redis session expectation is documented.
- Out-of-scope auth features are explicitly deferred.
- Backend, frontend, infrastructure teams can derive their Stage 1 planning artifacts from this document.

## Validation Expectations

Stage 1 validation:

- Contract artifact policy review.
- Auth Team owner review.
- Backend Platform review for session feasibility.
- Frontend review for UI/API integration clarity.
- QA review for scenario derivation.

Stage 2 validation:

- Scaffold plan references this contract.
- No production auth implementation is created before scaffold readiness.

Stage 3 validation:

- Login/logout/current user behavior passes PR review and QA scenario.

## Open Questions

- Session TTL value.
- CSRF protection detail.
- Password hashing algorithm.
- User persistence model.
- Error response detail level.

These questions are intentionally not finalized in this artifact. They must be resolved in Redis usage, backend architecture, PostgreSQL migration, and API contract planning artifacts.

## Change Control

- Auth Team owns changes to this artifact.
- Backend Platform, Frontend, Infrastructure, and QA review is required when their boundary is affected.
- PM / Orchestrator approval is required for cross-domain auth behavior changes.
