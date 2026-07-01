# Frontend Scaffold Plan

## Artifact Metadata

- Artifact name: Frontend Scaffold Plan.
- Artifact type: scaffold readiness plan.
- Owning team: Frontend Team.
- Owning domain: Frontend Shell.
- Status: active.
- Related backlog: S2-002 Frontend Scaffold Plan.
- Related PR: TBD.
- Last updated: 2026-07-02.

## 목적

이 문서는 Stage 2에서 frontend scaffold를 생성하기 전에 허용 범위, 금지 범위, validation 기준, PR 경계를 정의합니다. 이 문서는 구현 계획이 아니라 scaffold readiness plan입니다.

## 결정 요약

- Frontend scaffold는 Vite + React + TypeScript 기반으로 계획한다.
- Package manager는 `npm`을 사용한다.
- Routing은 React Router를 사용한다.
- Server state 관리는 TanStack Query를 사용한다.
- Form validation은 React Hook Form + Zod를 사용한다.
- Styling은 Tailwind CSS를 사용한다.
- Stage 2 frontend scaffold 후보 위치는 `apps/frontend`이다.
- Auth feature directory는 Stage 2에서 placeholder만 허용한다.
- API client file은 Stage 2에서 생성하지 않는다.
- shared API client layer는 생성하지 않는다.
- Login UI implementation은 Stage 2에서 금지한다.

## Stage 2 Frontend Scaffold 허용 범위

Stage 2 frontend scaffold에서 허용되는 항목:

- Vite + React + TypeScript application skeleton.
- `npm` 기반 package setup.
- TypeScript configuration.
- Vite configuration.
- React Router dependency/setup 후보.
- TanStack Query dependency/setup 후보.
- React Hook Form + Zod dependency/setup 후보.
- Tailwind CSS dependency/setup 후보.
- Basic app shell placeholder.
- `features/auth/README.md` placeholder.
- Domain feature boundary documentation.
- Build/test/lint script 후보.

## Stage 2 Frontend Scaffold 금지 범위

Stage 2 frontend scaffold에서 금지되는 항목:

- Login page implementation.
- Login form implementation.
- Auth API client implementation.
- `authApi.ts` creation.
- `useSession` implementation.
- Protected route implementation.
- Current user UI implementation.
- Cookie/session handling implementation.
- shared API client layer creation.
- shared type package creation.
- Generated API client creation.
- Auth behavior test creation.

## Candidate Directory Structure

Stage 2 frontend scaffold 후보 구조:

```text
apps/frontend/
  package.json
  index.html
  tsconfig.json
  vite.config.ts
  tailwind.config.ts
  src/
    main.tsx
    app/
      README.md
    features/
      auth/
        README.md
    styles/
      globals.css
  test/
```

주의:

- 위 구조는 scaffold 후보입니다.
- `features/auth/README.md`는 Auth feature boundary placeholder입니다.
- `LoginPage.tsx`, `authApi.ts`, `useSession.ts`는 Stage 2에서 만들지 않습니다.
- App shell은 placeholder 수준으로만 허용합니다.

## Routing Boundary

React Router는 Stage 2 scaffold dependency/setup 후보로 허용합니다.

허용:

- Router dependency.
- Routing boundary placeholder.
- README에 route ownership 설명.

금지:

- Login route implementation.
- Protected route implementation.
- Auth redirect logic.
- Session bootstrap logic.

## Server State Boundary

TanStack Query는 Stage 2 scaffold dependency/setup 후보로 허용합니다.

허용:

- Dependency declaration.
- Query provider boundary placeholder.
- README에 server state ownership 설명.

금지:

- `/api/auth/session` query implementation.
- `/api/auth/me` query implementation.
- login mutation implementation.
- logout mutation implementation.

## Form Validation Boundary

React Hook Form + Zod는 Stage 2 scaffold dependency/setup 후보로 허용합니다.

중요:

- Zod schema는 contract source of truth가 아니다.
- Auth API contract source of truth는 `.ai/domains/auth/auth-api-contract.md`이다.
- Zod는 Stage 3 implementation에서 frontend validation helper로 사용할 수 있다.

금지:

- Login form schema implementation.
- Auth request schema implementation.
- Generated schema creation.

## Styling Boundary

Tailwind CSS는 Stage 2 scaffold dependency/setup 후보로 허용합니다.

허용:

- Tailwind configuration.
- global style entry.
- design token placeholder.

금지:

- Login screen styling.
- Auth-specific UI components.
- Marketing or landing page implementation.

## Auth Feature Boundary

허용:

- `src/features/auth/README.md`.
- Auth feature responsibility 설명.
- Auth API contract reference.

금지:

- Auth page component.
- Auth form component.
- Auth API client file.
- Auth hooks.
- Auth state implementation.
- Cookie/session handling.

Auth implementation은 Stage 3 Auth first implementation에서 다룹니다.

## API Client Boundary

이미 확정된 원칙:

- API client는 feature/domain별로 개별 관리한다.
- shared API client layer는 만들지 않는다.
- Stage 2에서는 API client file을 생성하지 않는다.

Stage 3에서 Auth API client를 만들 경우:

- Auth feature 내부에 둔다.
- Auth API contract artifact를 source of truth로 사용한다.
- shared generated package를 사용하지 않는다.

## Validation Commands

Frontend scaffold PR은 최소 다음 validation 후보를 가져야 합니다.

```text
npm install
npm run build
npm run test
npm run lint
```

주의:

- 실제 command 이름은 Vite scaffold 결과에 맞춰 Stage 2 scaffold PR에서 확정한다.
- Validation은 scaffold buildability를 확인한다.
- Auth behavior test는 Stage 2에 포함하지 않는다.

## Environment Variables 후보

Stage 2 frontend scaffold에서 이름만 후보로 둘 수 있는 환경 변수:

```text
VITE_API_BASE_URL
```

주의:

- 실제 값은 커밋하지 않는다.
- Auth endpoint prefix는 `/api/auth`를 기준으로 한다.
- 환경 변수 사용 여부는 scaffold PR plan에서 확정한다.

## PR Boundary

Frontend scaffold PR은 다음만 포함해야 합니다.

- `apps/frontend` Vite + React + TypeScript skeleton.
- Tailwind setup.
- React Router setup boundary.
- TanStack Query setup boundary.
- React Hook Form + Zod dependency/setup boundary.
- Auth feature placeholder.
- Frontend README or scaffold notes.

Frontend scaffold PR은 다음을 포함하면 안 됩니다.

- Login UI.
- Auth API client.
- Auth hooks.
- Protected route.
- Backend code.
- Kubernetes manifest.
- NGINX config.
- shared package.

## Review 기준

Reviewer는 다음을 확인합니다.

- Stage 2 forbidden scope를 위반하지 않는다.
- Auth UI implementation이 없다.
- Auth API client file이 없다.
- shared API client layer가 없다.
- shared type package가 없다.
- Contract artifact를 source of truth로 참조한다.
- Zod schema가 contract source of truth처럼 사용되지 않는다.

## QA 기준

QA는 Stage 2 frontend scaffold에서 behavior QA를 수행하지 않습니다.

QA가 확인할 수 있는 것:

- scaffold validation command가 정의되어 있다.
- frontend scaffold가 build 가능한 범위로 계획되어 있다.
- Auth behavior QA는 Stage 3으로 분리되어 있다.

## Open Questions For Stage 3

- Login route path.
- Protected route UX.
- Session bootstrap timing.
- Auth error UI behavior.
- Form field validation copy.
- Loading and retry behavior.

## Completion Criteria

S2-002는 다음 조건을 만족하면 완료됩니다.

- Frontend scaffold 허용 범위가 정의되어 있다.
- Frontend scaffold 금지 범위가 정의되어 있다.
- Candidate directory structure가 정의되어 있다.
- Validation commands 후보가 정의되어 있다.
- PR boundary가 정의되어 있다.
- Stage 3으로 넘길 open question이 분리되어 있다.
