# Contract Artifact Policy

## 목적

이 policy는 API, data, event, UI, operational contract를 코드 package가 아니라 명시적인 문서 artifact로 관리한다는 원칙을 정의합니다.

이 프로젝트에서 contract는 shared package가 아니라 domain ownership을 가진 artifact입니다.

## 핵심 결정

- `shared-utils`는 생성하지 않는다.
- `shared-types`는 생성하지 않는다.
- `packages/api-contracts`는 생성하지 않는다.
- 공통 contract는 문서 artifact로 먼저 관리한다.
- Contract의 source of truth는 domain-owned artifact이다.

## Contract 위치

Contract는 domain ownership을 기준으로 `.ai/domains/` 아래에 둡니다.

예상 구조:

```text
.ai/domains/
  domain-ownership.md

  auth/
    auth-domain-contract.md
    auth-api-contract.md

  product/
    product-domain-contract.md
    product-api-contract.md
```

## Contract 유형

- API contract.
- Data contract.
- Event contract.
- UI contract.
- Operational contract.
- Test contract.

## Ownership 규칙

- 각 contract는 하나의 primary owning domain을 가진다.
- Contract consumer는 변경을 제안할 수 있지만 owner review 없이 변경할 수 없다.
- Cross-domain contract는 PM / Orchestrator와 관련 domain owner가 함께 승인한다.
- Contract 변경은 PR에서 명시적으로 표시되어야 한다.

## 금지 사항

- 편의를 위해 shared package에 domain type을 모으지 않는다.
- Domain logic을 shared utility로 이동하지 않는다.
- Contract 문서 없이 API shape를 구현으로 먼저 확정하지 않는다.
- Generated schema나 implementation type을 source of truth로 삼지 않는다.

## 구현 단계에서의 처리

향후 OpenAPI, JSON Schema, Zod schema, TypeScript type이 필요할 수 있습니다. 이 경우에도 해당 산출물은 구현 또는 생성 산출물이며 source of truth가 아닙니다.

Source of truth는 항상 `.ai/domains/*` 아래의 contract artifact입니다.

## Review 기준

Reviewer는 contract 관련 변경에서 다음을 확인합니다.

- owning domain이 명확한가.
- contract consumer가 식별되었는가.
- acceptance criteria와 validation expectation이 있는가.
- frontend, backend, infrastructure 영향이 명시되었는가.
- generated artifact가 contract artifact를 대체하지 않는가.
