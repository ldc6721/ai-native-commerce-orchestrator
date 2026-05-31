# ADR-001 Monorepo Structure

## Status

Approved.

## Context

이 repository는 AI-native engineering organization, workflow-first architecture, bounded context ownership, artifact-based collaboration을 목표로 합니다. Stage 1에서는 backend/frontend/infra scaffold를 만들기 전에 repository top-level boundary를 결정해야 합니다.

## Decision

Repository는 Stage 2 이후 다음 top-level 구조를 사용합니다.

```text
.ai/
apps/
infra/
docs/
```

`packages` 계층은 생성하지 않습니다.

생성하지 않는 구조:

```text
packages/
  shared-types/
  shared-utils/
  api-contracts/
```

Contract는 `.ai/domains/*` 아래의 domain-owned document artifact로 관리합니다.

## Consequences

- Stage 2 scaffold는 `apps/backend`, `apps/frontend`, `infra`를 후보로 사용합니다.
- shared package를 통해 domain boundary를 우회하지 않습니다.
- Contract source of truth는 code package가 아니라 `.ai/domains/*` artifact입니다.
- Stage 1에서는 scaffold directory를 생성하지 않습니다.

## Source Artifact

- `.ai/architecture/monorepo-structure-decision.md`
