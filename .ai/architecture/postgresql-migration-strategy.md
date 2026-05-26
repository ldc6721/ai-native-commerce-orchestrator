# PostgreSQL Migration Strategy

## Artifact Metadata

- Artifact name: PostgreSQL Migration Strategy.
- Artifact type: architecture strategy.
- Owning team: Backend Platform Team.
- Owning domain: Backend Platform.
- Status: draft.
- Related backlog: S1-006 PostgreSQL Migration Strategy.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 PostgreSQL을 migration 기반으로 운영하기 위한 초기 전략을 정의합니다. Stage 1에서는 migration tool을 설치하거나 schema를 생성하지 않습니다.

## 핵심 결정

- PostgreSQL schema 변경은 migration 기반으로 관리한다.
- Stage 1에서는 migration file을 생성하지 않는다.
- Auth first vertical slice에 필요한 persistence 요구사항만 우선 고려한다.
- domain별 분리 가능성은 보존하되 초기부터 과도하게 분리하지 않는다.

## Migration Tool 결정 기준

Migration tool은 Stage 2 전에 다음 기준으로 결정합니다.

- NestJS와의 통합 난이도.
- TypeScript workflow 적합성.
- rollback 지원.
- CI 실행 가능성.
- local kind 환경과의 연결성.
- schema drift 탐지 가능성.

후보는 Stage 2 scaffold readiness에서 비교합니다.

## Schema Ownership

초기 원칙:

- Auth domain은 user identity persistence 요구사항을 제안한다.
- Backend Platform Team은 migration convention과 database connection boundary를 소유한다.
- domain schema는 domain owner review가 필요하다.
- cross-domain foreign key는 초기에 보수적으로 다룬다.

## Auth Persistence 후보

Auth first vertical slice에서 검토할 persistence 후보:

- user id.
- email.
- display name.
- password hash.
- account status.
- created at.
- updated at.

주의:

- 실제 schema는 Stage 3 implementation 전까지 생성하지 않는다.
- password hashing algorithm은 backend/security review에서 확정한다.

## Rollback 원칙

- migration은 forward path와 rollback consideration을 함께 기록한다.
- destructive migration은 별도 review를 요구한다.
- production-like data loss risk가 있는 변경은 QA/PM escalation 대상이다.
- Stage 2 scaffold에서는 migration runner 연결만 검토하고 domain schema는 최소화한다.

## Seed Data 원칙

- seed data는 development/test 목적을 구분한다.
- credential seed는 보안상 주의가 필요하다.
- Auth test user seed는 QA scenario와 연결되어야 한다.
- seed는 production path와 분리한다.

## Stage 2 Scaffold 조건

PostgreSQL scaffold planning은 다음이 준비된 뒤 진행합니다.

- Backend architecture plan이 작성되어 있다.
- Auth domain contract가 작성되어 있다.
- migration tool 결정 기준이 review되었다.
- local infrastructure strategy가 작성되어 있다.

## Review 기준

- migration 없는 manual schema 변경을 허용하지 않는다.
- Auth schema가 다른 domain을 과도하게 선점하지 않는다.
- rollback consideration이 있다.
- Stage 1에서 migration file을 만들지 않는다.

## Open Questions

- ORM 또는 query builder.
- Migration tool.
- Schema namespace strategy.
- Test database reset strategy.
- Seed execution command.
