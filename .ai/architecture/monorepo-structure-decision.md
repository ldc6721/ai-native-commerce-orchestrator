# Monorepo Structure Decision

## Artifact Metadata

- Artifact name: Monorepo Structure Decision.
- Artifact type: architecture decision.
- Owning team: PM / Orchestrator.
- Owning domain: Platform / Repository Governance.
- Status: active.
- Related backlog: S1-001 Monorepo Structure Decision.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 Stage 1에서 repository의 상위 구조를 결정합니다. 목표는 backend, frontend, infrastructure scaffold를 바로 만드는 것이 아니라, Stage 2에서 scaffold를 만들 수 있는 기준과 boundary를 명확히 하는 것입니다.

## 결정 요약

- Repository는 `.ai`, `apps`, `infra`, `docs` 중심 구조를 사용한다.
- `packages` 계층은 생성하지 않는다.
- `shared-utils`는 생성하지 않는다.
- `shared-types`는 생성하지 않는다.
- `packages/api-contracts`는 생성하지 않는다.
- Contract는 code package가 아니라 domain-owned document artifact로 관리한다.
- Contract source of truth는 `.ai/domains/*` 아래의 contract artifact이다.
- Stage 1에서는 실제 backend, frontend, infrastructure scaffold를 생성하지 않는다.

## Target Repository Structure

Stage 2 이후 scaffold 후보 구조는 다음과 같습니다.

```text
.ai/
  agents/
  architecture/
  domains/
  policies/
  registry/
  templates/
  workflows/

apps/
  backend/
  frontend/

infra/
  kubernetes/
  nginx/
  docker/
  scripts/

docs/
  architecture/
  adr/
  workflows/
```

주의: 위 구조는 Stage 2 이후 scaffold 후보입니다. Stage 1에서는 `.ai` artifact 외의 runtime/scaffold directory를 생성하지 않습니다.

## Directory Responsibility

### `.ai/`

AI-native engineering organization의 source of truth입니다.

책임:

- Agent role 정의.
- Workflow 정의.
- Policy 정의.
- Stage roadmap과 backlog 관리.
- Domain ownership 관리.
- Contract artifact 관리.
- Architecture planning artifact 관리.
- Template과 registry 관리.

### `.ai/domains/`

Domain ownership과 domain-owned contract artifact를 관리합니다.

예상 구조:

```text
.ai/domains/
  domain-ownership.md
  auth/
    auth-domain-contract.md
    auth-api-contract.md
```

Contract는 여기서 시작합니다. 구현 단계에서 생성되는 OpenAPI, JSON Schema, TypeScript type 등은 source of truth가 아닙니다.

### `.ai/architecture/`

Stage 1 architecture planning artifact를 관리합니다.

책임:

- Monorepo structure decision.
- Backend architecture plan.
- Frontend architecture plan.
- Local infrastructure strategy.
- PostgreSQL migration strategy.
- Redis usage strategy.
- NGINX gateway strategy.
- ADR backlog.

### `apps/backend/`

Stage 2 이후 NestJS backend scaffold 후보 위치입니다.

책임:

- Backend application runtime.
- Domain module implementation.
- Backend integration with PostgreSQL and Redis.
- API implementation based on domain-owned contract artifact.

Stage 1에서는 생성하지 않습니다.

### `apps/frontend/`

Stage 2 이후 React + TypeScript frontend scaffold 후보 위치입니다.

책임:

- Frontend application runtime.
- Feature-oriented UI implementation.
- Auth-centered first vertical slice UI.
- API integration based on domain-owned contract artifact.

Stage 1에서는 생성하지 않습니다.

### `infra/`

Stage 2 이후 infrastructure scaffold 후보 위치입니다.

책임:

- kind 기반 local Kubernetes 구성.
- Kubernetes manifest 또는 kustomize/helm 후보.
- NGINX gateway configuration.
- Dockerfile 또는 image build 관련 artifact.
- Local bootstrap scripts.

Stage 1에서는 생성하지 않습니다.

### `docs/`

Stage 2 이후 user-facing 또는 long-term architecture documentation 후보 위치입니다.

책임:

- ADR.
- Architecture documentation.
- Workflow documentation that is not part of `.ai` operating source of truth.

Stage 1에서는 ADR backlog만 `.ai/architecture/adr-backlog.md`로 먼저 관리합니다. 실제 `docs/adr` 생성은 Stage 2 이후 결정합니다.

## Explicitly Not Created

다음 구조는 생성하지 않습니다.

```text
packages/
  shared-types/
  shared-utils/
  api-contracts/
```

이유:

- shared package는 domain boundary를 우회하는 공간이 될 수 있다.
- contract는 code package가 아니라 owner가 명확한 document artifact로 시작해야 한다.
- shared utility는 domain logic이 새는 통로가 될 수 있다.
- Stage 1의 목표는 구현 편의가 아니라 ownership과 boundary 안정화이다.

## Contract Artifact Rule

Contract는 다음 원칙을 따릅니다.

- Contract는 domain-owned document artifact로 관리한다.
- Contract 변경은 owning domain review가 필요하다.
- Contract consumer는 변경을 제안할 수 있지만 직접 확정하지 않는다.
- Generated schema나 implementation type은 source of truth가 아니다.
- Auth first vertical slice의 contract는 `.ai/domains/auth/` 아래에서 시작한다.

## Scaffold 허용 조건

Stage 2에서 scaffold를 생성하려면 다음 조건을 만족해야 합니다.

- 이 monorepo structure decision이 active 상태이다.
- Contract artifact policy가 active 상태이다.
- Backend architecture plan이 작성되어 있다.
- Frontend architecture plan이 작성되어 있다.
- Local infrastructure strategy가 작성되어 있다.
- Auth domain contract plan이 작성되어 있다.
- scaffold PR 단위가 정의되어 있다.
- scaffold가 domain implementation을 포함하지 않는다는 경계가 명확하다.

## 팀별 관점

### PM / Orchestrator

- Repository boundary와 Stage gate를 관리한다.
- scaffold가 Stage 1에서 생성되지 않도록 통제한다.
- Stage 2 진입 조건을 확인한다.

### Backend Platform Team

- `apps/backend`를 Stage 2 scaffold 후보로 본다.
- backend code는 domain contract artifact를 기준으로 구현한다.
- shared package 없이 backend 내부 boundary를 설계해야 한다.

### Frontend Team

- `apps/frontend`를 Stage 2 scaffold 후보로 본다.
- frontend feature boundary는 domain ownership과 contract artifact를 따른다.
- shared type package 없이 contract 문서를 기준으로 API integration을 설계한다.

### Infrastructure Team

- `infra`를 Stage 2 scaffold 후보로 본다.
- kind 기반 local Kubernetes strategy가 확정되기 전까지 manifest를 만들지 않는다.
- NGINX, PostgreSQL, Redis의 local 배치 전략을 별도 artifact에서 정의한다.

### Reviewer Agent

- PR 또는 artifact 변경이 `packages` 계층을 다시 도입하지 않는지 확인한다.
- Contract가 implementation type으로 대체되지 않는지 확인한다.
- Stage 1에서 scaffold가 생성되지 않는지 확인한다.

## Review 기준

이 artifact는 다음 기준을 만족해야 합니다.

- README의 장기 목표와 일치한다.
- Contract artifact policy와 충돌하지 않는다.
- Architecture policy와 충돌하지 않는다.
- Stage 1 backlog의 S1-001 acceptance criteria를 충족한다.
- Stage 2 scaffold readiness로 이어질 수 있다.

## Decision Outcome

S1-001 Monorepo Structure Decision은 active로 승인 가능한 상태입니다.

다음 작업:

- S1-002 Auth Domain Contract Plan.
- `.ai/domains/auth/auth-domain-contract.md`
- `.ai/domains/auth/auth-api-contract.md`
