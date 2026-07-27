# Auth Feature 경계

## 목적

이 디렉터리는 Auth 프론트엔드 feature 구현을 소유합니다. 실제 구현은 active 상태의 Stage 3 Auth 프론트엔드 통합 계획을 따라야 합니다.

## 소유 범위

- Auth feature 전용 API client
- Auth 계약을 반영한 feature-local 타입과 입력 스키마
- 로그인, 로그아웃, 세션 bootstrap
- Auth query, mutation, hook
- 로그인 화면과 최소 계정 화면
- 보호 라우트에서 사용하는 Auth 상태 경계
- Auth 단위·컴포넌트 테스트

## 금지 범위

- shared API client layer
- shared type package 또는 generated contract package
- localStorage 또는 sessionStorage 기반 인증 토큰
- credential verification 또는 Redis session 저장 로직
- 역할·권한, 회원가입, 비밀번호 재설정
- Auth 계약 artifact보다 구현 타입을 우선하는 변경

## 구현 규칙

- API 요청은 상대 경로 `/api/auth/*`와 `credentials: "include"`를 사용합니다.
- session cookie는 브라우저와 백엔드가 관리하며 프론트엔드 JavaScript가 읽지 않습니다.
- `GET /api/auth/session`을 브라우저 인증 상태의 기준으로 사용합니다.
- Auth 관련 구현은 `features/auth` 내부에서 관리합니다.

## Source of Truth

- `.ai/domains/auth/auth-api-contract.md`
- `.ai/domains/auth/auth-domain-contract.md`
- `.ai/stage-3-auth-frontend-integration-plan.md`
