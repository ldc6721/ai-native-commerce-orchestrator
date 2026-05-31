# ADR-008 Contract As Domain-Owned Artifact

## Status

Approved.

## Context

이 repository는 explicit artifact-based collaboration과 bounded context ownership을 핵심 원칙으로 삼습니다. Contract를 shared code package로 만들면 domain ownership이 흐려지고, AI Agent가 편의상 shared 영역에 domain logic을 모을 위험이 있습니다.

## Decision

Contract는 package가 아니라 domain-owned document artifact로 관리합니다.

다음 package는 생성하지 않습니다.

```text
packages/shared-types
packages/shared-utils
packages/api-contracts
```

Contract source of truth는 `.ai/domains/*` 아래의 문서 artifact입니다.

Generated schema, OpenAPI, Zod schema, TypeScript type은 구현 또는 생성 산출물일 수 있지만 source of truth가 아닙니다.

## Consequences

- Frontend와 backend는 contract 문서를 기준으로 설계합니다.
- Contract 변경은 owning domain review가 필요합니다.
- Shared API client layer나 shared type package를 전제로 하지 않습니다.
- Stage 2/3에서 생성되는 implementation type은 contract artifact를 대체할 수 없습니다.

## Source Artifact

- `.ai/policies/contract-artifact-policy.md`
