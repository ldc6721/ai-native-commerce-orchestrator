# Stage 2 Phase Policy

## Artifact Metadata

- Artifact name: Stage 2 Phase Policy.
- Artifact type: scaffold governance policy.
- Owning team: PM / Orchestrator.
- Owning domain: Scaffold Readiness Governance.
- Status: active.
- Related stage: Stage 2 - Scaffold Readiness.
- Related PR: TBD.
- Last updated: 2026-07-02.

## 목적

이 문서는 Stage 2 안에서 `planning`과 `execution`의 경계를 명확히 합니다. Stage 2는 scaffold readiness 단계이지만, 그 안에는 문서 계획 단계와 실제 scaffold PR 실행 단계가 나뉩니다.

## Stage 2 Phase 정의

Stage 2는 두 phase로 나눕니다.

```text
Stage 2A - Scaffold Readiness Planning
Stage 2B - Scaffold Execution
```

## Stage 2A - Scaffold Readiness Planning

### 목적

Scaffold를 만들기 전에 허용 범위, 금지 범위, PR 단위, validation 기준을 확정합니다.

### 허용

- `.ai` planning artifact 작성.
- scaffold plan 작성.
- validation plan 작성.
- PR plan 작성.
- completion review 작성.
- open question inventory 작성.

### 금지

- `apps/` 생성.
- `infra/` 생성.
- `.github/workflows/` 생성.
- backend scaffold 생성.
- frontend scaffold 생성.
- Kubernetes manifest 생성.
- Docker Compose file 생성.
- executable script 생성.
- Auth implementation.
- Prisma migration.
- User model.

### 현재 상태

현재 작업은 Stage 2A입니다.

## Stage 2B - Scaffold Execution

### 목적

Stage 2A에서 승인된 plan에 따라 실제 scaffold PR을 생성합니다.

### 허용

Stage 2B에서는 Scaffold PR Plan에 정의된 PR 단위 안에서만 다음을 허용합니다.

- `apps/backend` NestJS scaffold.
- `apps/frontend` Vite + React + TypeScript scaffold.
- `infra/kind/cluster-config.yaml`.
- `infra/*/README.md` boundary documents.
- `.github/workflows/*` CI scaffold, 단 PR-005에서만 허용.
- health endpoint scaffold.
- Prisma `schema.prisma`, 단 generator와 datasource만 허용.

### 금지

- Auth implementation.
- Login UI.
- Auth API client.
- Prisma migration.
- User model.
- Raw SQL.
- Redis session implementation.
- PostgreSQL schema creation.
- Docker Compose primary path.
- Kubernetes application manifest, 별도 plan 승인 전까지 금지.
- shared package.
- shared API client layer.

## CI Workflow 생성 시점

CI workflow file은 phase에 따라 다르게 취급합니다.

Stage 2A:

- `.github/workflows/*` 생성 금지.
- CI 후보와 scope만 문서화한다.

Stage 2B:

- Scaffold PR Plan의 `PR-005 CI Validation Scaffold`에서만 CI workflow file 생성을 허용한다.
- PR-001부터 PR-004까지의 scope가 안정된 뒤 진행한다.
- CI는 scaffold readiness만 검증한다.
- Auth behavior, E2E, deployment workflow는 포함하지 않는다.

## Health Endpoint Validation 범위

Health endpoint는 scaffold smoke check로만 허용합니다.

Stage 2A:

- health endpoint 허용 여부와 validation expectation만 문서화한다.
- backend code를 생성하지 않는다.

Stage 2B:

- Backend Scaffold PR에서 `GET /health` 구현을 허용한다.
- 서버 실행 후 `GET /health`가 성공하는 smoke check를 허용한다.

금지:

- DB readiness check.
- Redis readiness check.
- Auth health check.
- readiness/liveness split.
- domain behavior validation.

Health endpoint는 domain endpoint가 아닙니다.

## kind Validation 기준

`kind create cluster --dry-run`은 필수 validation으로 취급하지 않습니다.

Primary validation 후보:

```text
kind version
kind create cluster --config infra/kind/cluster-config.yaml
kubectl cluster-info
kind delete cluster --name <cluster-name>
```

Optional validation 후보:

```text
kind config syntax validation, if supported
```

주의:

- Stage 2A에서는 cluster를 생성하지 않는다.
- Stage 2B Infrastructure PR에서 실제 validation evidence를 남긴다.
- CI에서 kind validation을 실행할지 여부는 Scaffold PR Plan 또는 CI follow-up에서 확정한다.

## Open Question 처리 방식

Stage 2 Completion Review는 open question을 다음 세 그룹으로 분류해야 합니다.

### Stage 2B 전에 닫아야 할 질문

예:

- kind cluster name.
- external PostgreSQL/Redis container name and port.
- backend/frontend scaffold command names.
- actual scaffold PR order.
- CI workflow를 PR-005에서 생성할지 여부.

### Stage 3 전에 닫아도 되는 질문

예:

- Auth session TTL.
- CSRF protection detail.
- Password hashing algorithm.
- User model fields.
- Login route UX.
- Auth error UI behavior.

### 후속 issue로 넘길 질문

예:

- Docker Compose dependency-only fallback 필요성.
- artifact consistency 자동화.
- kind validation CI 실행 여부.
- NGINX ingress controller 전환 여부.

## Review 기준

Reviewer는 Stage 2 문서와 PR에서 다음을 확인합니다.

- Stage 2A 작업이 실제 scaffold를 생성하지 않았는가.
- Stage 2B 작업이 승인된 PR boundary 안에 있는가.
- CI workflow가 PR-005 전에는 생성되지 않았는가.
- health endpoint가 domain behavior로 확장되지 않았는가.
- kind validation이 dry-run 필수 조건에 의존하지 않는가.
- open question이 적절한 phase로 분류되었는가.

## Completion Criteria

이 policy는 다음 조건을 만족할 때 active 기준으로 사용됩니다.

- Stage 2A와 Stage 2B 경계가 정의되어 있다.
- CI workflow 생성 시점이 정의되어 있다.
- health endpoint validation 범위가 정의되어 있다.
- kind validation 기준이 정의되어 있다.
- open question 처리 방식이 정의되어 있다.
