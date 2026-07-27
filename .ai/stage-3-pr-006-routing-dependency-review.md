# Stage 3 PR-006 라우팅 의존성 결정 리뷰

## 산출물 메타데이터

- 산출물 이름: Stage 3 PR-006 라우팅 의존성 결정 리뷰
- 산출물 유형: 아키텍처 및 보안 결정 리뷰
- 소유 팀: 프론트엔드 팀
- 소유 도메인: 프론트엔드 셸 / Auth
- 상태: active
- 관련 단계: Stage 3 - 첫 구현
- 관련 계획: `.ai/stage-3-auth-frontend-integration-plan.md`
- 최종 갱신일: 2026-07-27

## 목적

PR-006 로그인 UI와 보호 라우트 구현에 사용할 라우팅 의존성을 보안, 호환성, 소유권 기준으로 검토하고 승인 결과를 기록한다.

## 검토 배경

- 기존 scaffold의 React Router 의존성은 high 등급 보안 권고로 제거되었다.
- 현재 배포된 React Router 안정 버전만으로는 전체 high audit gate를 통과할 수 없었다.
- 라우팅 규칙을 직접 구현하는 방식은 검증된 라이브러리를 사용한다는 아키텍처 원칙에 맞지 않는다.
- PR-006 진입 조건은 패치된 안정 버전 또는 대체 라우터 결정을 review artifact로 승인하는 것이다.

## 후보 검토

### React Router 재도입

결정: 보류

- 현재 배포 버전의 high audit gate가 해소되지 않았다.
- 보안 경고를 예외 처리하거나 CI gate를 약화하지 않는다.

### 자체 라우팅 구현

결정: 거절

- history, redirect, search validation, route lifecycle을 직접 구현하면 불필요한 보안·회귀 위험이 생긴다.
- 작은 초기 범위라도 검증된 라우팅 엔진을 사용해야 한다.

### TanStack Router

결정: 승인

- 승인 버전: `@tanstack/react-router@1.170.18`
- React 19와 TypeScript 6 환경을 지원한다.
- 기존 TanStack Query 기반 서버 상태 모델과 충돌하지 않는다.
- 코드 기반 route tree를 사용해 plugin과 generated route file을 추가하지 않는다.
- Auth 도메인 구현은 `features/auth`에 유지하고 router 조립만 `app`이 소유한다.

## 승인된 구현 경계

- 공개 경로: `/`, `/login`
- 보호 경로: `/account`
- 허용된 `returnTo`: 현재 보호 경로 `/account`만 허용
- 익명 상태: `/login`으로 이동
- 인증 상태: 계정 화면 렌더링
- 오류 상태: 자동 로그인 이동 금지, 재시도 제공
- 로그인 성공: session query 갱신 후 보호 경로 이동
- 로그아웃 성공: 서버 응답 후에만 익명 상태로 갱신
- 로그아웃 실패: 인증 화면과 상태 유지

## 검증 증거

Node 22 깨끗한 컨테이너에서 실행:

```text
npm ci
npm run lint
npm run test
npm run build
npm audit --audit-level=high
```

결과:

```text
lint: pass
테스트: 5 files, 23 tests pass
build: pass
audit high: found 0 vulnerabilities
```

## 위험과 후속 조건

- 브라우저 실제 backend 통합과 새로고침 세션 복원은 PR-007 E2E에서 검증한다.
- 라우터 버전 변경은 lockfile, 테스트, high audit 증거를 함께 갱신해야 한다.
- 새로운 보호 경로를 추가할 때 `returnTo` 허용 목록과 오픈 redirect 테스트를 함께 변경해야 한다.

## 완료 결정

TanStack Router 코드 기반 구성을 PR-006 라우팅 의존성으로 승인한다. React Router는 보안 gate가 해소되고 별도 리뷰가 있기 전까지 재도입하지 않는다.
