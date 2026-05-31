# Stage 1 Architecture Planning Backlog

## 목적

이 문서는 Stage 1에서 수행할 architecture planning 작업을 issue-ready한 backlog로 정리합니다. Stage 1의 목표는 backend, frontend, infrastructure, domain contract 구현을 바로 시작하는 것이 아니라, scaffold를 만들 수 있는 수준까지 설계 기준과 artifact를 확정하는 것입니다.

## Stage 1 확정 결정

- Local Kubernetes 환경은 `kind`로 구성한다.
- 공통 contract는 package가 아니라 domain-owned document artifact로 관리한다.
- `shared-utils`는 생성하지 않는다.
- `shared-types`는 생성하지 않는다.
- `packages/api-contracts`는 생성하지 않는다.
- 첫 vertical slice는 Auth 중심으로 진행한다.

## Stage 1 완료 조건

Stage 1은 다음 조건을 만족할 때 완료됩니다.

- scaffold를 생성해도 되는 repository structure가 합의되어 있다.
- backend, frontend, infrastructure boundary가 명확하다.
- contract가 domain-owned document artifact로 관리된다는 기준이 반영되어 있다.
- Auth 중심 first vertical slice의 contract와 architecture dependency가 정의되어 있다.
- Auth session transport는 cookie 기반으로 결정되어 있다.
- kind 기반 local infrastructure 방향이 결정되어 있다.
- PostgreSQL과 Redis는 local kind cluster 외부 dependency로 결정되어 있다.
- PostgreSQL, Redis, NGINX의 초기 역할과 제한이 정의되어 있다.
- PostgreSQL schema 변경은 Prisma migration으로만 관리하기로 결정되어 있다.
- NGINX Auth routing prefix는 `/api/auth`로 결정되어 있다.
- Frontend API client는 feature/domain별로 관리하고 shared API client layer를 만들지 않기로 결정되어 있다.
- 주요 architecture decision이 ADR backlog에 등록되어 있다.

## Backlog 우선순위

### S1-001 Monorepo Structure Decision

기본 정보:

- Type: architecture.
- Owner: PM / Orchestrator.
- Supporting teams: Backend Platform Team, Frontend Team, Infrastructure Team.
- Target artifact: `.ai/architecture/monorepo-structure-decision.md`.
- ADR candidate: `ADR-001-monorepo-structure.md`.
- Status: active.

문제 정의:

- README의 repository structure를 Stage 1 결정에 맞게 확정해야 한다.
- `packages` 계층은 제거되었으므로, app, infra, docs, `.ai` 중심 구조를 명확히 해야 한다.

Acceptance Criteria:

- `apps/backend`, `apps/frontend`, `infra`, `docs`, `.ai`의 책임이 정의되어 있다.
- `packages`를 만들지 않는다는 결정이 반영되어 있다.
- contract artifact 위치가 `.ai/domains/*` 기준으로 설명되어 있다.
- scaffold 생성 가능 조건이 정의되어 있다.

Validation:

- Architecture policy와 contract artifact policy를 위반하지 않는다.
- Backend, Frontend, Infrastructure Team이 각자의 boundary를 이해할 수 있다.

Result:

- Artifact created: `.ai/architecture/monorepo-structure-decision.md`.
- Stage 2 scaffold 후보 구조는 `.ai`, `apps`, `infra`, `docs` 중심으로 결정한다.
- `packages` 계층은 생성하지 않는다.

### S1-002 Auth Domain Contract Plan

기본 정보:

- Type: architecture.
- Owner: Auth Team.
- Supporting teams: Frontend Team, Backend Platform Team, QA Team.
- Target artifacts:
  - `.ai/domains/auth/auth-domain-contract.md`
  - `.ai/domains/auth/auth-api-contract.md`
- ADR candidate: none by default.
- Status: approved draft.

문제 정의:

- 첫 vertical slice가 Auth 중심으로 결정되었으므로 Auth domain의 responsibility와 API contract를 먼저 정의해야 한다.

Acceptance Criteria:

- Auth domain의 responsibility와 out-of-scope가 정의되어 있다.
- login, logout, current user, session validation의 contract가 초안으로 정의되어 있다.
- frontend/backend contract boundary가 문서화되어 있다.
- Redis session expectation이 명시되어 있다.
- 보안상 민감한 결정 중 아직 확정하지 않을 항목이 분리되어 있다.

Validation:

- Contract artifact policy를 따른다.
- Auth Team owner review가 가능하다.
- QA가 acceptance scenario를 만들 수 있다.

Result:

- Artifact created: `.ai/domains/auth/auth-domain-contract.md`.
- Artifact created: `.ai/domains/auth/auth-api-contract.md`.
- Contract status is approved draft after cookie-based session transport and `/api/auth` prefix decisions.

### S1-003 Backend Architecture Plan

기본 정보:

- Type: architecture.
- Owner: Backend Platform Team.
- Supporting teams: Auth Team, Infrastructure Team, QA Team.
- Target artifact: `.ai/architecture/backend-architecture-plan.md`.
- ADR candidate: `ADR-002-nestjs-backend-architecture.md`.
- Status: approved draft.

문제 정의:

- NestJS 기반 backend scaffold를 만들기 전에 module boundary, domain ownership, persistence, Redis 사용 기준을 정의해야 한다.

Acceptance Criteria:

- NestJS module boundary 원칙이 정의되어 있다.
- Auth vertical slice를 위한 backend module 후보가 정의되어 있다.
- PostgreSQL migration과 schema ownership 고려사항이 연결되어 있다.
- Redis 사용 목적이 session 중심으로 제한되어 있다.
- shared module 또는 shared utility를 만들지 않는 기준이 반영되어 있다.

Validation:

- Architecture policy를 따른다.
- Contract artifact policy와 충돌하지 않는다.
- Stage 2 scaffold plan으로 이어질 수 있다.

Result:

- Artifact created: `.ai/architecture/backend-architecture-plan.md`.
- Contract artifact 기반 backend boundary와 Auth session 중심 계획을 정의했다.

### S1-004 Frontend Architecture Plan

기본 정보:

- Type: architecture.
- Owner: Frontend Team.
- Supporting teams: Auth Team, Backend Platform Team, QA Team.
- Target artifact: `.ai/architecture/frontend-architecture-plan.md`.
- ADR candidate: `ADR-003-react-frontend-architecture.md`.
- Status: approved draft.

문제 정의:

- React + TypeScript frontend scaffold 전에 feature-oriented architecture와 Auth feature boundary를 정의해야 한다.

Acceptance Criteria:

- feature-oriented directory 방향이 정의되어 있다.
- Auth feature boundary와 API integration responsibility가 정의되어 있다.
- MCP-style modular component pattern의 프로젝트 내 의미가 정의되어 있다.
- shared component와 domain component의 경계가 정의되어 있다.
- contract 문서 artifact를 frontend 구현 기준으로 사용하는 방식이 정의되어 있다.

Validation:

- Frontend Team이 scaffold plan을 작성할 수 있다.
- Auth API contract와 연결된다.
- UI 구현 전 QA scenario를 도출할 수 있다.

Result:

- Artifact created: `.ai/architecture/frontend-architecture-plan.md`.
- React + TypeScript, feature-oriented structure, Auth feature boundary 초안을 정의했다.

### S1-005 Local Infrastructure Strategy

기본 정보:

- Type: infrastructure.
- Owner: Infrastructure Team.
- Supporting teams: Backend Platform Team, Frontend Team, QA Team.
- Target artifact: `.ai/architecture/local-infrastructure-strategy.md`.
- ADR candidate: `ADR-004-kind-local-kubernetes.md`.
- Status: approved draft.

문제 정의:

- Local-first 환경을 kind 기준으로 구성하기 위한 방향과 Stage 2 scaffold 조건을 정의해야 한다.

Acceptance Criteria:

- kind를 local Kubernetes 기준으로 사용하는 이유가 설명되어 있다.
- PostgreSQL, Redis, NGINX의 local 배치 원칙이 정의되어 있다.
- Docker Compose 사용 여부와 제한이 결정되어 있다.
- Stage 2에서 만들 manifest 또는 script 범위가 제한되어 있다.
- local validation 기대치가 정의되어 있다.

Validation:

- Kubernetes manifest를 아직 생성하지 않는다.
- Infrastructure scaffold readiness로 이어질 수 있다.

Result:

- Artifact created: `.ai/architecture/local-infrastructure-strategy.md`.
- kind 기준 local infrastructure 방향과 Stage 2 scaffold 조건을 정의했다.

### S1-006 PostgreSQL Migration Strategy

기본 정보:

- Type: architecture.
- Owner: Backend Platform Team.
- Supporting teams: Auth Team, QA Team.
- Target artifact: `.ai/architecture/postgresql-migration-strategy.md`.
- ADR candidate: `ADR-007-postgresql-migration-strategy.md`.
- Status: approved draft.

문제 정의:

- PostgreSQL을 migration 기반으로 운영하기 위한 초기 전략을 정의해야 한다.

Acceptance Criteria:

- migration 도구 선택 후보와 결정 기준이 정의되어 있다.
- schema ownership과 domain 분리 가능성이 설명되어 있다.
- rollback 기준이 정의되어 있다.
- seed data 정책이 정의되어 있다.
- Auth vertical slice에서 필요한 DB 결정과 보류할 결정을 구분한다.

Validation:

- Backend architecture plan과 충돌하지 않는다.
- Stage 2 scaffold에서 migration setup을 판단할 수 있다.

Result:

- Artifact created: `.ai/architecture/postgresql-migration-strategy.md`.
- migration 기반 운영 원칙과 tool 결정 기준을 정의했다.

### S1-007 Redis Usage Strategy

기본 정보:

- Type: architecture.
- Owner: Backend Platform Team.
- Supporting teams: Auth Team, Infrastructure Team, QA Team.
- Target artifact: `.ai/architecture/redis-usage-strategy.md`.
- ADR candidate: `ADR-006-redis-session-strategy.md`.
- Status: approved draft.

문제 정의:

- Redis의 초기 사용 범위를 session management 중심으로 제한하고, cache와 queue/event 확장은 보류 기준을 정의해야 한다.

Acceptance Criteria:

- Redis의 초기 역할이 session management로 정의되어 있다.
- cache layer는 언제 허용되는지 기준이 있다.
- queue/event usage는 future consideration으로 분리되어 있다.
- key naming, TTL, failure behavior의 초기 원칙이 있다.
- Auth contract와 연결된다.

Validation:

- Infrastructure strategy와 충돌하지 않는다.
- Auth domain contract에서 session expectation을 참조할 수 있다.

Result:

- Artifact created: `.ai/architecture/redis-usage-strategy.md`.
- Redis 초기 사용 범위를 session management로 제한했다.

### S1-008 NGINX Gateway Strategy

기본 정보:

- Type: infrastructure.
- Owner: Infrastructure Team.
- Supporting teams: Frontend Team, Backend Platform Team, QA Team.
- Target artifact: `.ai/architecture/nginx-gateway-strategy.md`.
- ADR candidate: `ADR-005-nginx-gateway-strategy.md`.
- Status: approved draft.

문제 정의:

- NGINX의 초기 역할을 reverse proxy, API gateway, frontend serving 중 어디까지로 볼지 결정해야 한다.

Acceptance Criteria:

- NGINX 초기 역할이 정의되어 있다.
- local kind 환경과의 관계가 설명되어 있다.
- Ingress, rate limiting, auth gateway는 현재 범위인지 future consideration인지 구분되어 있다.
- frontend/backend routing expectation이 정의되어 있다.

Validation:

- Kubernetes manifest를 아직 생성하지 않는다.
- Local infrastructure strategy와 충돌하지 않는다.

Result:

- Artifact created: `.ai/architecture/nginx-gateway-strategy.md`.
- NGINX 초기 역할을 reverse proxy/gateway 후보로 제한했다.

### S1-009 ADR Backlog

기본 정보:

- Type: architecture.
- Owner: PM / Orchestrator.
- Supporting teams: All architecture owners.
- Target artifact: `.ai/architecture/adr-backlog.md`.
- Status: approved draft.

문제 정의:

- Stage 1에서 결정해야 할 architecture decision을 ADR 후보로 추적해야 한다.

Acceptance Criteria:

- ADR 후보 목록이 정의되어 있다.
- 각 ADR 후보의 owner와 trigger condition이 정의되어 있다.
- 어떤 결정은 ADR이 필요 없고 artifact만으로 충분한지 구분되어 있다.
- Stage 2로 넘어가기 전에 필요한 ADR 최소 세트가 정의되어 있다.

Validation:

- Stage roadmap과 일치한다.
- 각 architecture planning artifact와 연결된다.

Result:

- Artifact created: `.ai/architecture/adr-backlog.md`.
- Stage 2 전 필요한 ADR 후보와 trigger condition을 정의했다.

## 실행 순서

권장 실행 순서는 다음과 같습니다.

1. S1-001 Monorepo Structure Decision.
2. S1-002 Auth Domain Contract Plan.
3. S1-003 Backend Architecture Plan.
4. S1-004 Frontend Architecture Plan.
5. S1-005 Local Infrastructure Strategy.
6. S1-006 PostgreSQL Migration Strategy.
7. S1-007 Redis Usage Strategy.
8. S1-008 NGINX Gateway Strategy.
9. S1-009 ADR Backlog.

## Stage 1 중 금지 사항

- Backend scaffold 생성.
- Frontend scaffold 생성.
- Kubernetes manifest 생성.
- Docker Compose 생성.
- shared package 생성.
- API contract package 생성.
- Auth 구현 시작.

Stage 1은 구현 허용 단계가 아니라, 구현을 허용하기 위한 architecture planning 단계입니다.
