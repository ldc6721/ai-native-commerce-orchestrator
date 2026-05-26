# Backend Architecture Plan

## Artifact Metadata

- Artifact name: Backend Architecture Plan.
- Artifact type: architecture plan.
- Owning team: Backend Platform Team.
- Owning domain: Backend Platform.
- Status: draft.
- Related backlog: S1-003 Backend Architecture Plan.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 NestJS 기반 backend scaffold를 만들기 전에 backend module boundary, domain ownership, persistence, Redis usage, Auth first vertical slice 기준을 정의합니다.

## 핵심 결정

- Backend는 NestJS 기반으로 계획한다.
- Stage 1에서는 backend scaffold를 생성하지 않는다.
- Stage 2에서 `apps/backend` scaffold를 생성할 수 있다.
- Backend 구현은 `.ai/domains/*` contract artifact를 기준으로 한다.
- `shared-utils`, `shared-types`, `packages/api-contracts`는 사용하지 않는다.
- Auth first vertical slice는 session 기반 인증 흐름을 우선한다.

## 후보 Module Boundary

Stage 2 scaffold 이후 후보:

```text
apps/backend/
  src/
    app.module.ts
    main.ts
    auth/
    platform/
      database/
      redis/
      config/
```

주의: 위 구조는 후보이며 Stage 1에서는 생성하지 않습니다.

## Auth Backend Boundary

Auth module 후보 책임:

- login request 처리.
- logout request 처리.
- current user 조회.
- session validation.
- credential verification orchestration.
- session creation/invalidation orchestration.

Auth module이 직접 소유하지 않는 것:

- Redis deployment.
- PostgreSQL migration tool 결정.
- NGINX routing.
- Frontend authenticated state.
- shared package.

## Persistence 방향

- PostgreSQL은 user identity persistence 후보이다.
- migration 기반 운영을 전제로 한다.
- migration 도구는 PostgreSQL migration strategy에서 결정한다.
- Auth vertical slice에서 필요한 schema는 최소화한다.
- domain별 schema 분리 가능성은 보존하되, Stage 1에서 과도하게 분리하지 않는다.

## Redis 방향

- Redis의 초기 목적은 session management이다.
- cache layer는 Stage 1에서 구현 범위가 아니다.
- queue/event usage는 future consideration이다.
- session TTL, key naming, failure behavior는 Redis usage strategy에서 확정한다.

## Backend Shared Code 제한

- domain-neutral platform concern만 `platform` 영역 후보로 둔다.
- domain logic은 shared utility로 이동하지 않는다.
- Auth business rule은 Auth domain 내부에 남긴다.
- cross-domain type 공유는 package가 아니라 contract artifact를 기준으로 한다.

## Error Handling 방향

- API error shape는 Auth API contract의 `ErrorResponse`를 따른다.
- credential failure detail은 노출하지 않는다.
- error code는 frontend behavior에 충분히 안정적이어야 한다.
- HTTP status code 세부 결정은 Auth API contract 후속 review에서 확정한다.

## Stage 2 Scaffold 조건

Backend scaffold는 다음이 준비된 뒤 생성할 수 있습니다.

- 이 plan이 active 또는 approved draft 상태이다.
- Auth domain contract와 Auth API contract가 review되었다.
- PostgreSQL migration strategy가 작성되었다.
- Redis usage strategy가 작성되었다.
- Local infrastructure strategy가 작성되었다.
- scaffold PR이 domain implementation을 포함하지 않는다는 조건이 명확하다.

## Review 기준

- Contract artifact policy와 충돌하지 않는다.
- Auth API contract를 implementation type으로 대체하지 않는다.
- shared package를 도입하지 않는다.
- Stage 1에서 backend code를 생성하지 않는다.
- Stage 2 scaffold plan으로 이어질 수 있다.

## Open Questions

- NestJS package manager와 workspace tooling.
- ORM 또는 query builder 선택.
- Session middleware vs guard 구조.
- Cookie vs header session transport.
- Password hashing algorithm.
- Validation library.

위 질문은 Stage 1 후속 artifact 또는 ADR에서 결정합니다.
