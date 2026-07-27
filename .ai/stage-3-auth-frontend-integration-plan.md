# Stage 3 Auth 프론트엔드 통합 계획

## 산출물 메타데이터

- 산출물 이름: Stage 3 Auth 프론트엔드 통합 계획
- 산출물 유형: 구현 준비 계획
- 소유 팀: 프론트엔드 팀
- 소유 도메인: Auth
- 상태: active
- 관련 단계: Stage 3 - 첫 구현
- 관련 계약: `.ai/domains/auth/auth-domain-contract.md`, `.ai/domains/auth/auth-api-contract.md`
- 최종 갱신일: 2026-07-24

## 목적

`main`에 병합된 Auth 백엔드 세션 기반을 브라우저 사용자 흐름과 연결하기 위한 구현 경계, 상태 모델, 테스트 기준, PR 순서를 정의한다. TypeScript 타입, Zod 스키마, API 함수는 Auth feature 내부 구현물이며 계약의 원본이 아니다.

## 진입 조건

- Stage 2B 프론트엔드 scaffold와 Auth 백엔드 세션 기반이 `main`에 병합되어 있다.
- Auth 도메인 계약과 API 계약이 active 상태이다.
- React Router, TanStack Query, React Hook Form, Zod, Tailwind CSS가 준비되어 있다.
- API client는 feature/domain 내부에서 소유하고 shared API client layer를 만들지 않는다.

## 목표 사용자 흐름

1. 애플리케이션 시작 시 현재 세션을 확인한다.
2. 익명 사용자는 로그인 화면에서 자격 증명을 제출한다.
3. 로그인 성공 시 서버 세션을 기준으로 인증 상태를 갱신한다.
4. 인증 사용자만 보호된 계정 화면에 접근한다.
5. 로그아웃 시 서버 세션을 무효화하고 익명 상태로 돌아간다.

## 범위

포함 범위:

- Auth feature 내부 API client와 feature-local 계약 타입
- `GET /api/auth/session` 기반 세션 bootstrap
- `POST /api/auth/login`, `POST /api/auth/logout` 연동
- `/login` 공개 라우트와 `/account` 최소 보호 라우트
- 로그인 폼, redirect, 원래 목적지 복귀, 오류 복구
- Vitest, Testing Library, Playwright 검증

제외 범위:

- 회원가입, 비밀번호 재설정, OAuth, MFA, 역할·권한
- shared API client, shared type package, generated contract package
- localStorage 또는 sessionStorage 기반 인증 토큰
- Kubernetes manifest, NGINX 실제 배포 검증, cross-origin 배포

## 소유권

- 프론트엔드 팀: Auth UI, feature-local API client, query/mutation, 라우팅 상태
- Auth 팀: API 계약, 자격 증명 검증, 세션 생성·검증·무효화
- QA 팀: 브라우저 흐름과 프론트엔드·백엔드 통합 evidence
- PM / Orchestrator: PR 순서, merge gate, 완료 판단
- API 응답 shape 변경: Auth 팀과 프론트엔드 팀 공동 검토

## 구조 결정

```text
apps/frontend/src/
  app/
    App.tsx
    routes/ProtectedRoute.tsx
  features/auth/
    api/authApi.ts
    components/LoginForm.tsx
    hooks/useAuthSession.ts
    hooks/useLogin.ts
    hooks/useLogout.ts
    pages/LoginPage.tsx
    pages/AccountPage.tsx
    schemas/loginSchema.ts
    types/auth.ts
    README.md
```

- Auth 네트워크 호출, 타입, 스키마, hook, 화면은 `features/auth`가 소유한다.
- `app`은 provider 조립과 라우트 연결만 담당한다.
- 도메인 중립 UI가 실제로 반복되기 전에는 shared UI를 선행 추출하지 않는다.

## API 통합 결정

- 브라우저 요청은 상대 경로 `/api/auth/*`를 사용한다.
- 모든 Auth 요청은 `credentials: "include"`를 명시한다.
- 로컬에서는 Vite가 `/api`를 백엔드로 proxy하여 브라우저 기준 동일 출처를 유지한다.
- 향후 NGINX도 동일한 `/api/auth` 경로를 유지한다.
- 초기 slice는 `VITE_API_BASE_URL`에 의존하지 않는다.
- `authApi.ts`는 request, 응답 해석, HTTP 오류 정규화만 담당한다.
- 백엔드 오류 메시지와 credential 세부 정보를 사용자에게 그대로 노출하지 않는다.
- `UserSummary`, 세션, 로그인, 오류 타입은 Auth feature 내부에 둔다.
- 계약 문서를 먼저 변경하고 구현 타입과 Zod 스키마를 뒤따라 변경한다.

## 인증 상태 모델

- `loading`: 최초 세션 확인 중
- `anonymous`: 세션이 없거나 만료됨
- `authenticated`: 유효한 세션과 `UserSummary`가 있음
- `error`: 세션 확인에 실패해 인증 여부를 확정할 수 없음

결정:

- `GET /api/auth/session` query를 브라우저 인증 상태의 기준으로 사용한다.
- 초기 slice에서 `/api/auth/me`를 bootstrap 용도로 중복 호출하지 않는다.
- 인증 상태를 별도 전역 store나 브라우저 저장소에 복제하지 않는다.
- session cookie는 브라우저가 관리하며 프론트엔드 JavaScript가 읽지 않는다.
- 세션 확인 오류를 익명 상태로 오인하지 않는다.

## 사용자 흐름 결정

로그인:

- 이메일은 유효한 형식, 비밀번호는 최소 8자로 검증한다.
- 제출 중에는 중복 제출을 막는다.
- `AUTH_INVALID_CREDENTIALS`는 어느 항목이 틀렸는지 구분하지 않는 일반 오류로 표시한다.
- 성공 시 session query를 갱신하고 보호 경로로 이동한다.
- `returnTo`는 `/`로 시작하는 내부 경로만 허용해 오픈 redirect를 막는다.

세션 bootstrap:

- 앱 시작 시 session query를 한 번 실행한다.
- 확인 중에는 보호 콘텐츠를 표시하지 않는다.
- 익명 응답은 정상 상태로 처리한다.
- 네트워크 오류는 재시도 가능한 오류로 처리하고 자동 재시도는 1회로 제한한다.

보호 라우트:

- 최소 보호 경로는 `/account`이다.
- 익명 사용자는 내부 `returnTo`를 보존하고 `/login`으로 이동한다.
- 인증 상태에서만 계정 화면을 렌더링한다.
- 오류 상태는 로그인으로 자동 이동하지 않고 재시도 동작을 제공한다.
- 인증 사용자가 `/login`에 접근하면 `/account`로 이동한다.

로그아웃:

- 반드시 `POST /api/auth/logout`를 호출한다.
- 성공 시 session query를 익명 상태로 갱신하고 `/login`으로 이동한다.
- 프론트엔드 상태만 지우는 로그아웃은 허용하지 않는다.
- 실패 시 인증 상태를 임의로 익명으로 확정하지 않는다.

## 보안 기준

- 기존 `sid`, `HttpOnly`, `SameSite=Lax` cookie 계약을 유지한다.
- password와 session 식별자를 저장하거나 기록하지 않는다.
- 현재 slice는 동일 출처 local-first 통합으로 제한한다.
- 전용 CSRF token은 이번 slice에 포함하지 않지만 cross-origin 배포 또는 production hardening 전에 필수 보안 gate로 재검토한다.
- rate limiting, brute-force protection, account lockout은 백엔드 후속 보안 작업으로 유지한다.

## 테스트 전략

PR별 자동화 테스트:

- API client의 method, path, header, `credentials`, 성공·오류 정규화
- 이메일·비밀번호 입력 검증 경계
- 세션 hook의 인증·익명·오류 상태와 query 갱신
- 로그인 폼의 validation, 제출 상태, 실패, 성공 이동
- 보호 라우트의 loading, redirect, render, error retry
- 로그아웃의 서버 호출 성공·실패와 상태 전환
- 기존 App test, lint, build 회귀

브라우저 E2E 필수 시나리오:

- 익명 사용자의 `/account` 접근 차단
- 잘못된 자격 증명의 안전한 오류 표시
- 로그인 후 원래 보호 경로 복귀
- 새로고침 후 서버 세션 복원
- 로그아웃 후 보호 경로 접근 차단
- 만료·유효하지 않은 session의 익명 상태 처리
- 네트워크 실패 시 복구 동작 제공

구현 PR 검증 명령:

```text
cd apps/frontend
npm run lint
npm run test
npm run build
```

## PR 계획

### PR-004 Auth 프론트엔드 통합 계획

- 이 계획과 프론트엔드 아키텍처, Stage 로드맵, Artifact Registry, Auth feature README를 갱신한다.

### PR-005 Auth API client와 세션 상태

- feature-local 타입, 오류 정규화, login/logout/session API 함수, session query/hook을 구현한다.
- Vite `/api` proxy와 API·hook 단위 테스트를 추가한다.
- 로그인 화면과 보호 라우트 UI는 포함하지 않는다.

### PR-006 로그인 UI와 보호 라우트

- 로그인 폼, `/login`, `/account`, protected route, logout action을 구현한다.
- 컴포넌트 및 라우팅 테스트를 추가한다.
- 브라우저 E2E와 infra 변경은 포함하지 않는다.

### PR-007 Auth 브라우저 QA와 완료 리뷰

- Playwright Auth E2E와 실제 dependency 통합 evidence를 추가한다.
- 알려진 위험, 후속 보안 작업, Stage 3 Auth frontend completion review를 기록한다.

## Merge Gate

- Auth API 계약과 구현 shape가 일치한다.
- shared API client, shared type package, generated contract package가 없다.
- lint, unit/component test, build evidence가 있다.
- Auth/session 동작은 QA 검토를 받는다.
- blocker finding과 숨겨진 계약 변경이 없다.
- PR-005, PR-006, PR-007 순서로 병합한다.

## 완료 조건

- 세션 bootstrap이 인증·익명·오류 상태를 구분한다.
- 로그인 성공과 실패가 계약대로 동작한다.
- 보호 라우트와 로그아웃이 서버 세션 기준으로 동작한다.
- 새로고침 후 인증 상태가 복원된다.
- credential 또는 내부 오류 정보가 사용자에게 노출되지 않는다.
- 단위·컴포넌트·브라우저 E2E evidence가 있다.
- Reviewer 승인과 QA sign-off가 있다.
- 완료 리뷰에 known risk와 다음 작업이 정리되어 있다.

## 롤백과 복구

- 프론트엔드 PR은 data migration을 포함하지 않는다.
- PR-005 API 경계와 PR-006 UI·라우팅 변경은 각각 독립적으로 되돌릴 수 있어야 한다.
- cookie 또는 proxy 문제가 발견되면 통합을 중단하고 API 경계 및 routing 검토로 돌아간다.

## 다음 작업

PR-004 계획 리뷰 후 PR-005 Auth API client와 세션 상태 구현을 시작한다.
