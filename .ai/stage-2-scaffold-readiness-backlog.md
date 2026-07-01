# Stage 2 Scaffold Readiness Backlog

## Artifact Metadata

- Artifact name: Stage 2 Scaffold Readiness Backlog.
- Artifact type: stage backlog.
- Owning team: PM / Orchestrator.
- Owning domain: Scaffold Readiness Governance.
- Status: active.
- Related stage: Stage 2 - Scaffold Readiness.
- Related PR: TBD.
- Last updated: 2026-07-02.

## Stage 2 Phase Policy Reference

이 문서는 `.ai/scaffold/stage-2-phase-policy.md`를 따른다.

- 현재 문서 작성은 Stage 2A - Scaffold Readiness Planning에 속한다.
- 실제 scaffold 파일 생성은 Stage 2B - Scaffold Execution에서만 허용된다.

## 목적

이 문서는 Stage 2에서 수행할 scaffold readiness 작업을 정의합니다. Stage 2의 목표는 backend, frontend, infrastructure scaffold를 바로 생성하는 것이 아니라, scaffold를 생성해도 되는 범위, PR 단위, validation 기준을 확정하는 것입니다.

Stage 2는 Stage 3 feature implementation이 아닙니다.

## Stage 2 Entry Evidence

Stage 2는 다음 Stage 1 artifact를 기준으로 시작합니다.

- `.ai/stage-1-completion-review.md`
- `.ai/architecture/monorepo-structure-decision.md`
- `.ai/domains/auth/auth-domain-contract.md`
- `.ai/domains/auth/auth-api-contract.md`
- `.ai/architecture/backend-architecture-plan.md`
- `.ai/architecture/frontend-architecture-plan.md`
- `.ai/architecture/local-infrastructure-strategy.md`
- `.ai/architecture/postgresql-migration-strategy.md`
- `.ai/architecture/redis-usage-strategy.md`
- `.ai/architecture/nginx-gateway-strategy.md`
- `.ai/architecture/adrs/ADR-001-monorepo-structure.md`
- `.ai/architecture/adrs/ADR-004-kind-local-kubernetes.md`
- `.ai/architecture/adrs/ADR-008-contract-as-domain-owned-artifact.md`

## Stage 2 확정 입력

- Local Kubernetes는 `kind`를 사용한다.
- PostgreSQL과 Redis는 local kind cluster 외부 dependency로 구성한다.
- PostgreSQL schema 변경은 Prisma migration으로만 관리한다.
- Raw SQL 기반 schema 변경은 사용하지 않는다.
- Auth session transport는 cookie 기반이다.
- Auth API prefix는 `/api/auth`이다.
- Frontend API client는 feature/domain별로 관리한다.
- shared API client layer는 만들지 않는다.
- shared package는 만들지 않는다.
- Contract source of truth는 `.ai/domains/*` artifact이다.

## Stage 2 완료 조건

Stage 2는 다음 조건을 만족할 때 완료됩니다.

- Backend scaffold plan이 작성되어 있다.
- Frontend scaffold plan이 작성되어 있다.
- Infrastructure scaffold plan이 작성되어 있다.
- Local environment validation plan이 작성되어 있다.
- CI validation plan이 작성되어 있다.
- scaffold PR 단위가 정의되어 있다.
- scaffold가 domain implementation을 포함하지 않는다는 경계가 명확하다.
- Stage 3 Auth first implementation으로 넘어가기 위한 open question이 분리되어 있다.

## Backlog 우선순위

### S2-001 Backend Scaffold Plan

기본 정보:

- Type: scaffold readiness.
- Owner: Backend Platform Team.
- Supporting teams: Auth Team, Infrastructure Team, QA Team.
- Target artifact: `.ai/scaffold/backend-scaffold-plan.md`.
- Status: active.

Acceptance Criteria:

- `apps/backend` scaffold 후보 구조가 정의되어 있다.
- NestJS bootstrap 범위가 정의되어 있다.
- Prisma setup 범위가 정의되어 있다.
- Redis session integration은 scaffold에서 어디까지 다룰지 정의되어 있다.
- Auth implementation은 Stage 2 scaffold에 포함하지 않는다는 경계가 명확하다.
- Backend scaffold validation command와 expected result가 정의되어 있다.

Result:

- Artifact created: `.ai/scaffold/backend-scaffold-plan.md`.
- Nest CLI 기반, npm 사용, auth directory placeholder 허용, Prisma schema skeleton 허용, migration/model 금지, health endpoint 허용으로 결정했다.

### S2-002 Frontend Scaffold Plan

기본 정보:

- Type: scaffold readiness.
- Owner: Frontend Team.
- Supporting teams: Auth Team, Backend Platform Team, QA Team.
- Target artifact: `.ai/scaffold/frontend-scaffold-plan.md`.
- Status: active.

Acceptance Criteria:

- `apps/frontend` scaffold 후보 구조가 정의되어 있다.
- Auth feature directory 후보가 정의되어 있다.
- shared API client layer를 만들지 않는다는 기준이 반영되어 있다.
- feature/domain별 API client boundary가 정의되어 있다.
- frontend scaffold가 login UI implementation을 포함하지 않는다는 경계가 명확하다.
- Frontend scaffold validation command와 expected result가 정의되어 있다.

Result:

- Artifact created: `.ai/scaffold/frontend-scaffold-plan.md`.
- Vite + React + TypeScript, npm, React Router, TanStack Query, React Hook Form + Zod, Tailwind CSS를 scaffold 기준으로 결정했다.
- Auth feature는 README placeholder만 허용하고 API client file과 login UI는 금지한다.

### S2-003 Infrastructure Scaffold Plan

기본 정보:

- Type: scaffold readiness.
- Owner: Infrastructure Team.
- Supporting teams: Backend Platform Team, Frontend Team, QA Team.
- Target artifact: `.ai/scaffold/infrastructure-scaffold-plan.md`.
- Status: active.

Acceptance Criteria:

- `infra` scaffold 후보 구조가 정의되어 있다.
- kind cluster 관련 scaffold 범위가 정의되어 있다.
- PostgreSQL/Redis external dependency 연결 방식이 계획되어 있다.
- NGINX gateway scaffold 범위가 정의되어 있다.
- Kubernetes manifest 생성 여부와 순서가 정의되어 있다.
- Infrastructure scaffold validation command와 expected result가 정의되어 있다.

Result:

- Artifact created: `.ai/scaffold/infrastructure-scaffold-plan.md`.
- kind config 생성은 허용하고, Kubernetes manifest와 script 생성은 금지한다.
- PostgreSQL/Redis는 kind 외부 Docker container dependency로 계획한다.
- NGINX는 kind 내부 gateway workload 방향으로 계획한다.

### S2-004 Local Environment Validation Plan

기본 정보:

- Type: validation planning.
- Owner: Infrastructure Team.
- Supporting teams: Backend Platform Team, Frontend Team, QA Team.
- Target artifact: `.ai/scaffold/local-environment-validation-plan.md`.
- Status: active.

Acceptance Criteria:

- kind cluster validation 기준이 정의되어 있다.
- external PostgreSQL validation 기준이 정의되어 있다.
- external Redis validation 기준이 정의되어 있다.
- backend/frontend connectivity validation 후보가 정의되어 있다.
- local reset strategy 후보가 정의되어 있다.
- failure handling과 troubleshooting expectation이 정의되어 있다.

Result:

- Artifact created: `.ai/scaffold/local-environment-validation-plan.md`.
- kind, external PostgreSQL, external Redis, backend/frontend scaffold validation 후보를 정의했다.
- script, manifest, compose 생성은 계속 금지한다.

### S2-005 CI Validation Plan

기본 정보:

- Type: validation planning.
- Owner: Platform Team.
- Supporting teams: Backend Platform Team, Frontend Team, Infrastructure Team, QA Team.
- Target artifact: `.ai/scaffold/ci-validation-plan.md`.
- Status: active.

Acceptance Criteria:

- backend scaffold validation 후보가 정의되어 있다.
- frontend scaffold validation 후보가 정의되어 있다.
- infrastructure scaffold validation 후보가 정의되어 있다.
- documentation/artifact validation 기준이 정의되어 있다.
- CI가 Stage 3 feature implementation을 요구하지 않는다는 경계가 명확하다.

Result:

- Artifact created: `.ai/scaffold/ci-validation-plan.md`.
- Backend, frontend, infrastructure, artifact consistency CI 후보를 정의했다.
- 실제 CI workflow file 생성은 금지한다.

### S2-006 Scaffold PR Plan

기본 정보:

- Type: PR planning.
- Owner: PM / Orchestrator.
- Supporting teams: Backend Platform Team, Frontend Team, Infrastructure Team, QA Team.
- Target artifact: `.ai/scaffold/scaffold-pr-plan.md`.
- Status: active.

Acceptance Criteria:

- Backend scaffold PR 단위가 정의되어 있다.
- Frontend scaffold PR 단위가 정의되어 있다.
- Infrastructure scaffold PR 단위가 정의되어 있다.
- Local validation PR 단위가 정의되어 있다.
- PR dependency order가 정의되어 있다.
- 각 PR의 forbidden scope가 정의되어 있다.

Result:

- Artifact created: `.ai/scaffold/scaffold-pr-plan.md`.
- Infrastructure, backend, frontend, local validation, CI validation scaffold PR 단위와 dependency order를 정의했다.
- 각 PR의 forbidden scope checklist를 정의했다.

### S2-007 Stage 2 Completion Review

기본 정보:

- Type: stage completion review.
- Owner: PM / Orchestrator.
- Supporting teams: Reviewer Agent, QA Team, all scaffold owners.
- Target artifact: `.ai/stage-2-completion-review.md`.
- Status: active.

Acceptance Criteria:

- Stage 2 완료 조건별 evidence가 정리되어 있다.
- scaffold 생성 가능 여부가 판단되어 있다.
- Stage 3 Auth first implementation 진입 조건이 정리되어 있다.
- unresolved open question이 Stage 3 또는 후속 issue로 분리되어 있다.

Result:

- Artifact created: `.ai/stage-2-completion-review.md`.
- Stage 2A Scaffold Readiness Planning 완료로 판단했다.
- Stage 2B Scaffold Execution은 PR-001 Infrastructure base scaffold부터 시작하도록 권고했다.

## 실행 순서

권장 실행 순서는 다음과 같습니다.

1. S2-001 Backend Scaffold Plan.
2. S2-002 Frontend Scaffold Plan.
3. S2-003 Infrastructure Scaffold Plan.
4. S2-004 Local Environment Validation Plan.
5. S2-005 CI Validation Plan.
6. S2-006 Scaffold PR Plan.
7. S2-007 Stage 2 Completion Review.

## Stage 2 중 금지 사항

- Auth feature implementation.
- Login UI implementation.
- Auth backend endpoint implementation.
- Prisma migration file 생성.
- PostgreSQL schema 생성.
- Redis runtime manifest 생성.
- plan 승인 없는 Kubernetes manifest 생성.
- Docker Compose primary path 생성.
- shared package 생성.
- shared API client layer 생성.

Stage 2는 scaffold readiness 단계입니다. 실제 scaffold 파일 생성은 Stage 2 plan review 이후 별도 PR 단위로 진행합니다.
