# ADR Backlog

## Artifact Metadata

- Artifact name: ADR Backlog.
- Artifact type: architecture backlog.
- Owning team: PM / Orchestrator.
- Owning domain: Architecture Governance.
- Status: draft.
- Related backlog: S1-009 ADR Backlog.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 Stage 1에서 ADR로 남겨야 할 architecture decision 후보를 추적합니다. ADR은 모든 문서의 대체물이 아니라, 장기적으로 변경 비용이 큰 결정을 기록하는 용도입니다.

## ADR 작성 기준

ADR이 필요한 경우:

- framework 또는 platform 선택.
- repository structure 결정.
- local infrastructure strategy 결정.
- persistence/migration strategy 결정.
- gateway strategy 결정.
- contract governance 원칙 결정.

ADR이 없어도 되는 경우:

- 단일 domain의 draft contract.
- 아직 검증되지 않은 implementation detail.
- Stage 1에서 의도적으로 보류한 open question.
- template 문구 수정.

## ADR 후보 목록

### ADR-001 Monorepo Structure

- Owner: PM / Orchestrator.
- Source artifact: `.ai/architecture/monorepo-structure-decision.md`.
- Trigger condition: Stage 2 scaffold 시작 전.
- Status: candidate.

### ADR-002 NestJS Backend Architecture

- Owner: Backend Platform Team.
- Source artifact: `.ai/architecture/backend-architecture-plan.md`.
- Trigger condition: Backend scaffold plan 작성 전.
- Status: candidate.

### ADR-003 React Frontend Architecture

- Owner: Frontend Team.
- Source artifact: `.ai/architecture/frontend-architecture-plan.md`.
- Trigger condition: Frontend scaffold plan 작성 전.
- Status: candidate.

### ADR-004 kind Local Kubernetes

- Owner: Infrastructure Team.
- Source artifact: `.ai/architecture/local-infrastructure-strategy.md`.
- Trigger condition: Infrastructure scaffold plan 작성 전.
- Status: candidate.

### ADR-005 NGINX Gateway Strategy

- Owner: Infrastructure Team.
- Source artifact: `.ai/architecture/nginx-gateway-strategy.md`.
- Trigger condition: NGINX scaffold 또는 gateway routing 결정 전.
- Status: candidate.

### ADR-006 Redis Session Strategy

- Owner: Backend Platform Team.
- Source artifact: `.ai/architecture/redis-usage-strategy.md`.
- Trigger condition: Redis-backed session scaffold 또는 implementation 전.
- Status: candidate.

### ADR-007 PostgreSQL Migration Strategy

- Owner: Backend Platform Team.
- Source artifact: `.ai/architecture/postgresql-migration-strategy.md`.
- Trigger condition: migration setup scaffold 전.
- Status: candidate.

### ADR-008 Contract As Domain-Owned Artifact

- Owner: PM / Orchestrator.
- Source artifact: `.ai/policies/contract-artifact-policy.md`.
- Trigger condition: Stage 2 scaffold 시작 전.
- Status: candidate.

## Stage 2 전 최소 ADR 세트

Stage 2 scaffold readiness 전에 최소로 필요한 ADR 후보:

- ADR-001 Monorepo Structure.
- ADR-004 kind Local Kubernetes.
- ADR-008 Contract As Domain-Owned Artifact.

Backend/frontend scaffold를 시작하기 전 필요한 ADR 후보:

- ADR-002 NestJS Backend Architecture.
- ADR-003 React Frontend Architecture.

Auth first implementation 전에 필요한 ADR 후보:

- ADR-006 Redis Session Strategy.
- ADR-007 PostgreSQL Migration Strategy.

NGINX scaffold 전에 필요한 ADR 후보:

- ADR-005 NGINX Gateway Strategy.

## ADR 작성 위치

Stage 1에서는 ADR 후보를 이 backlog에서 관리합니다.

Stage 2 이후 실제 ADR 문서 위치 후보:

```text
docs/adr/
```

주의: Stage 1에서는 `docs/adr` 디렉터리를 생성하지 않습니다.

## Review 기준

- ADR 후보가 source artifact와 연결되어 있다.
- owner가 명확하다.
- trigger condition이 명확하다.
- ADR 작성이 필요한 결정과 artifact만으로 충분한 결정을 구분한다.
