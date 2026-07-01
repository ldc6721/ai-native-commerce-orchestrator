# Backend Scaffold Plan

## Artifact Metadata

- Artifact name: Backend Scaffold Plan.
- Artifact type: scaffold readiness plan.
- Owning team: Backend Platform Team.
- Owning domain: Backend Platform.
- Status: active.
- Related backlog: S2-001 Backend Scaffold Plan.
- Related PR: TBD.
- Last updated: 2026-07-02.

## Stage 2 Phase Policy Reference

이 문서는 `.ai/scaffold/stage-2-phase-policy.md`를 따른다.

- 현재 문서 작성은 Stage 2A - Scaffold Readiness Planning에 속한다.
- 실제 scaffold 파일 생성은 Stage 2B - Scaffold Execution에서만 허용된다.

## 목적

이 문서는 Stage 2에서 backend scaffold를 생성하기 전에 허용 범위, 금지 범위, validation 기준, PR 경계를 정의합니다. 이 문서는 구현 계획이 아니라 scaffold readiness plan입니다.

## 결정 요약

- Backend scaffold는 NestJS 기반으로 계획한다.
- Scaffold 방식은 Nest CLI 기반 기본 구조를 사용한다.
- Package manager는 `npm`을 사용한다.
- Stage 2 backend scaffold 후보 위치는 `apps/backend`이다.
- Auth directory는 Stage 2에서 생성할 수 있다.
- Auth 구현은 Stage 2에서 금지한다.
- Prisma `schema.prisma` 생성은 Stage 2 scaffold에서 허용한다.
- Prisma migration 생성은 Stage 2에서 금지한다.
- Prisma model 생성은 Stage 2에서 금지한다.
- Health endpoint는 scaffold validation을 위해 허용한다.

## Stage 2 Backend Scaffold 허용 범위

- NestJS application skeleton.
- `npm` 기반 package setup.
- TypeScript configuration.
- Lint/test/build script 후보.
- Basic app module.
- Health endpoint.
- Platform configuration boundary.
- Prisma setup skeleton.
- `prisma/schema.prisma` with generator and datasource only.
- Redis configuration boundary.
- Auth directory placeholder.
- Documentation or README for backend module boundary.

## Stage 2 Backend Scaffold 금지 범위

- Auth controller implementation.
- Auth service implementation.
- `POST /api/auth/login` implementation.
- `POST /api/auth/logout` implementation.
- `GET /api/auth/me` implementation.
- `GET /api/auth/session` implementation.
- Redis-backed session implementation.
- Cookie session implementation.
- Password hashing implementation.
- User model creation.
- Prisma migration file creation.
- PostgreSQL schema creation.
- Raw SQL usage.
- shared package creation.
- shared API contract package creation.

## Candidate Directory Structure

Stage 2 backend scaffold 후보 구조:

```text
apps/backend/
  package.json
  tsconfig.json
  nest-cli.json
  src/
    main.ts
    app.module.ts
    health/
      health.controller.ts
    auth/
      README.md
    platform/
      config/
      database/
      redis/
  prisma/
    schema.prisma
  test/
```

주의:

- 위 구조는 scaffold 후보입니다.
- `auth/README.md`는 Auth boundary placeholder입니다.
- `auth.controller.ts`와 `auth.service.ts`는 Stage 2에서 만들지 않습니다.
- `schema.prisma`에는 generator와 datasource만 둡니다.
- `schema.prisma`에 `User` model을 만들지 않습니다.

## Prisma Scaffold Boundary

허용:

```text
generator client
datasource db
```

금지:

```text
model User
migration files
raw SQL files
seed data
```

## Redis Scaffold Boundary

허용:

- Redis configuration namespace.
- Redis environment variable naming 후보.
- Redis connection boundary placeholder.
- README 또는 TODO boundary document.

금지:

- Redis client runtime implementation.
- Session store implementation.
- Session serialization.
- TTL policy implementation.
- Redis key creation.

## Auth Scaffold Boundary

허용:

- `src/auth/README.md`.
- Auth module boundary 설명.
- Auth API contract reference.

금지:

- Auth NestJS module implementation.
- Auth controller.
- Auth service.
- DTO implementation.
- Guard/middleware implementation.
- Cookie/session handling.

Auth implementation은 Stage 3 Auth first implementation에서 다룹니다.

## Health Endpoint Boundary

Health endpoint는 scaffold validation을 위해 허용합니다.

허용 후보:

```text
GET /health
```

Health endpoint는 domain endpoint가 아닙니다.

금지:

- DB health check.
- Redis health check.
- Auth health check.
- readiness/liveness split.

위 항목은 infrastructure validation과 Stage 3 readiness에서 다룹니다.

## Validation Commands

Backend scaffold PR은 최소 다음 validation 후보를 가져야 합니다.

```text
npm install
npm run build
npm run test
npm run lint
```

주의:

- 실제 command 이름은 Nest CLI scaffold 결과에 맞춰 Stage 2 scaffold PR에서 확정한다.
- Validation은 scaffold buildability를 확인한다.
- Auth behavior test는 Stage 2에 포함하지 않는다.

## Environment Variables 후보

Stage 2 backend scaffold에서 이름만 후보로 둘 수 있는 환경 변수:

```text
DATABASE_URL
REDIS_URL
SESSION_COOKIE_NAME
NODE_ENV
PORT
```

주의:

- 실제 secret 값은 커밋하지 않는다.
- `.env` 파일 생성 여부는 scaffold PR plan에서 결정한다.
- cookie security detail은 Stage 3 implementation readiness에서 결정한다.

## PR Boundary

Backend scaffold PR은 다음만 포함해야 합니다.

- `apps/backend` NestJS skeleton.
- Prisma skeleton without model/migration.
- Health endpoint.
- Auth boundary placeholder.
- Platform boundary placeholders.
- Backend README or scaffold notes.

Backend scaffold PR은 다음을 포함하면 안 됩니다.

- Auth feature implementation.
- User schema.
- Prisma migration.
- Redis session logic.
- NGINX config.
- Kubernetes manifest.
- Frontend code.

## Review 기준

Reviewer는 다음을 확인합니다.

- Stage 2 forbidden scope를 위반하지 않는다.
- Auth implementation이 없다.
- Prisma model/migration이 없다.
- Raw SQL이 없다.
- shared package가 없다.
- Health endpoint 외 domain endpoint가 없다.
- Contract artifact를 source of truth로 참조한다.

## QA 기준

QA는 Stage 2 backend scaffold에서 behavior QA를 수행하지 않습니다.

QA가 확인할 수 있는 것:

- scaffold validation command가 정의되어 있다.
- health endpoint가 scaffold smoke check로 충분하다.
- Auth behavior QA는 Stage 3으로 분리되어 있다.

## Open Questions For Stage 3

- Session TTL.
- CSRF protection detail.
- Password hashing algorithm.
- User model fields.
- Prisma client integration detail.
- Redis session store implementation.
- Auth DTO validation detail.

## Completion Criteria

S2-001은 다음 조건을 만족하면 완료됩니다.

- Backend scaffold 허용 범위가 정의되어 있다.
- Backend scaffold 금지 범위가 정의되어 있다.
- Candidate directory structure가 정의되어 있다.
- Validation commands 후보가 정의되어 있다.
- PR boundary가 정의되어 있다.
- Stage 3으로 넘길 open question이 분리되어 있다.
