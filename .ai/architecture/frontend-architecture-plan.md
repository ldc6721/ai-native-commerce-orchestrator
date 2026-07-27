# 프론트엔드 아키텍처 계획

## 산출물 메타데이터

- 산출물 이름: 프론트엔드 아키텍처 계획
- 산출물 유형: 아키텍처 계획
- 소유 팀: 프론트엔드 팀
- 소유 도메인: 프론트엔드 셸
- 상태: active
- 관련 백로그: S1-004 프론트엔드 아키텍처 계획
- 최종 갱신일: 2026-07-24

## 목적

이 문서는 React + TypeScript 프론트엔드의 feature-oriented 구조, 도메인 소유권, API 통합, 공통 컴포넌트 제한을 정의한다. 상세 Auth 구현 기준은 `.ai/stage-3-auth-frontend-integration-plan.md`가 소유한다.

## 현재 기술 기준

- 애플리케이션: Vite + React + TypeScript
- 라우팅: React Router
- 서버 상태: TanStack Query
- 폼과 입력 검증: React Hook Form + Zod
- 스타일링: Tailwind CSS
- 테스트: Vitest + Testing Library
- 브라우저 E2E: Playwright
- 패키지 관리자: npm

## 핵심 결정

- 프론트엔드는 `apps/frontend`에 둔다.
- 구조의 기본 단위는 feature/domain이다.
- API shape의 source of truth는 domain-owned contract artifact이다.
- API client는 각 feature/domain 내부에서 소유한다.
- shared API client layer를 만들지 않는다.
- shared type package와 generated contract package를 만들지 않는다.
- TypeScript 타입과 Zod 스키마는 구현 편의 산출물이며 계약 원본이 아니다.
- 첫 사용자 vertical slice는 Auth이다.

## 현재 구조

```text
apps/frontend/
  src/
    app/
    features/
      auth/
    styles/
```

역할:

- `app`: provider 조립, 최상위 라우팅, 애플리케이션 셸
- `features/<domain>`: 도메인별 화면, API client, 상태, hook, 입력 스키마, 테스트
- `styles`: 전역 스타일 진입점

Auth 구현이 진행되더라도 Auth 도메인 규칙을 `app` 또는 임의의 shared 디렉터리로 이동하지 않는다.

## Auth Feature 경계

Auth feature가 소유하는 책임:

- 로그인 폼과 로그인 화면
- 로그아웃 action
- 세션 bootstrap과 인증 상태
- 보호 라우트가 사용하는 인증 경계
- 현재 사용자 표시를 위한 frontend-safe 상태
- Auth API 계약 기반 request/response 처리
- Auth feature 단위·컴포넌트 테스트

Auth feature가 소유하지 않는 책임:

- 자격 증명 검증
- session 저장소의 source of truth
- Redis 동작
- 백엔드 persistence
- 역할·권한 모델
- 다른 도메인의 정책

## 모듈형 컴포넌트 원칙

이 프로젝트의 MCP-style modular component pattern은 다음 원칙을 의미한다.

- feature는 domain-owned contract를 기준으로 독립적인 UI module을 가진다.
- component가 domain behavior를 암묵적으로 소유하지 않는다.
- feature 내부 component는 해당 domain owner의 계약을 따른다.
- API 통합은 feature/domain 경계 안에서 명시적으로 관리한다.
- 재사용 가능성만 예상해서 공통화를 선행하지 않는다.

## API 통합 원칙

- API 계약은 `.ai/domains/*` 아래 문서 artifact가 소유한다.
- TypeScript 타입은 계약 문서를 수동으로 반영하되 계약을 대체하지 않는다.
- 구현 타입 변경으로 계약 변경을 숨기지 않는다.
- 각 feature는 자체 API client 경계를 가진다.
- Auth 요청은 상대 경로 `/api/auth/*`를 사용한다.
- cookie 기반 Auth 요청은 `credentials: "include"`를 명시한다.
- 프론트엔드는 credential 실패의 세부 원인을 추론하거나 노출하지 않는다.
- 세션 상태는 백엔드 session contract와 동기화한다.

## 공통 컴포넌트 제한

공통화할 수 있는 후보:

- 버튼
- 입력 필드
- 폼 필드 외형
- 레이아웃 primitive
- 로딩 표시
- 도메인 중립 오류 표시

공통화하면 안 되는 항목:

- Auth 로그인 정책
- Cart 가격 계산
- Order 상태 전이
- Payment 검증
- 도메인별 mapper
- feature별 API 오류 규칙

공통 컴포넌트는 둘 이상의 실제 사용처와 도메인 중립성이 확인된 뒤 별도 review를 거쳐 추출한다.

## 상태와 라우팅 원칙

- 서버 상태는 TanStack Query가 관리한다.
- 인증 상태를 별도 전역 store나 브라우저 저장소에 중복 보관하지 않는다.
- 라우트 보호는 `loading`, `anonymous`, `authenticated`, `error` 상태를 구분한다.
- 인증 오류를 익명 상태로 오인해 로그인 화면으로 강제 이동하지 않는다.
- 내부 redirect 경로만 허용해 오픈 redirect를 막는다.
- Auth 세부 흐름은 `.ai/stage-3-auth-frontend-integration-plan.md`를 따른다.

## Review 기준

- feature boundary가 domain ownership과 일치한다.
- shared API client, shared type package, generated contract package를 요구하지 않는다.
- contract artifact를 API 통합 기준으로 사용한다.
- `app`이 Auth 도메인 규칙을 소유하지 않는다.
- 사용자 상태와 오류 상태가 구분된다.
- QA 시나리오와 rollback 범위를 도출할 수 있다.

## 변경 통제

- 프론트엔드 팀이 이 문서를 소유한다.
- Auth feature 경계 변경은 Auth 팀 검토가 필요하다.
- API 응답 shape 변경은 관련 domain contract를 먼저 갱신해야 한다.
- shared 계층 도입은 PM / Orchestrator와 영향받는 domain owner의 승인이 필요하다.
- gateway, cookie, cross-origin 가정 변경은 Infrastructure Team 검토가 필요하다.
