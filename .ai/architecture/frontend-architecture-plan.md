# Frontend Architecture Plan

## Artifact Metadata

- Artifact name: Frontend Architecture Plan.
- Artifact type: architecture plan.
- Owning team: Frontend Team.
- Owning domain: Frontend Shell.
- Status: draft.
- Related backlog: S1-004 Frontend Architecture Plan.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 React + TypeScript frontend scaffold 전에 feature-oriented architecture, Auth feature boundary, API integration 기준을 정의합니다.

## 핵심 결정

- Frontend는 React + TypeScript 기반으로 계획한다.
- Stage 1에서는 frontend scaffold를 생성하지 않는다.
- Stage 2에서 `apps/frontend` scaffold를 생성할 수 있다.
- Frontend는 shared type package가 아니라 domain-owned contract artifact를 기준으로 API를 통합한다.
- 첫 vertical slice는 Auth 중심이다.

## 후보 Feature Structure

Stage 2 scaffold 이후 후보:

```text
apps/frontend/
  src/
    app/
    features/
      auth/
    shared/
      ui/
      routing/
      api-client/
```

주의: 위 구조는 후보이며 Stage 1에서는 생성하지 않습니다.

## Auth Feature Boundary

Auth feature 후보 책임:

- login form.
- logout action.
- current user display boundary.
- session bootstrap.
- protected route expectation.
- Auth API contract 기반 request/response 처리.

Auth feature가 소유하지 않는 것:

- credential verification.
- session storage source of truth.
- Redis behavior.
- backend persistence.
- role/permission model.

## MCP-Style Modular Component Pattern 정의

이 프로젝트에서 MCP-style modular component pattern은 다음 의미로 사용합니다.

- feature는 domain-owned contract를 기준으로 독립적인 UI module을 가진다.
- component는 domain behavior를 암묵적으로 소유하지 않는다.
- reusable UI는 domain-neutral일 때만 shared UI 후보가 된다.
- feature 내부 component는 해당 domain owner의 contract를 따른다.
- API integration은 feature boundary 또는 app-level API client boundary에서 명시적으로 관리한다.

## API Integration 원칙

- API shape의 source of truth는 `.ai/domains/*` contract artifact이다.
- TypeScript type은 구현 편의 산출물이며 source of truth가 아니다.
- generated client가 생기더라도 contract artifact를 대체하지 않는다.
- frontend는 credential failure detail을 추론하지 않는다.
- session 상태는 backend session contract와 동기화되어야 한다.

## Shared Component 제한

허용 후보:

- Button.
- Input.
- Form field shell.
- Layout primitive.
- Loading indicator.
- Error display primitive.

금지 후보:

- Auth-specific login policy.
- Cart price logic.
- Order state transition.
- Payment validation.
- domain-specific mapper.

## Stage 2 Scaffold 조건

Frontend scaffold는 다음이 준비된 뒤 생성할 수 있습니다.

- 이 plan이 active 또는 approved draft 상태이다.
- Auth API contract가 review되었다.
- Backend architecture plan이 작성되었다.
- Local infrastructure strategy가 작성되었다.
- scaffold PR이 Auth implementation을 포함하지 않는다는 조건이 명확하다.

## Review 기준

- feature boundary가 domain ownership과 일치한다.
- shared type package를 요구하지 않는다.
- contract artifact를 API integration 기준으로 사용한다.
- Stage 1에서 frontend code를 생성하지 않는다.
- QA scenario를 도출할 수 있다.

## Open Questions

- Routing library.
- Server state management approach.
- Form validation approach.
- API client implementation detail.
- UI component library 여부.
- Authenticated route UX.
