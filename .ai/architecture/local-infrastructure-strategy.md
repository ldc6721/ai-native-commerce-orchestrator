# Local Infrastructure Strategy

## Artifact Metadata

- Artifact name: Local Infrastructure Strategy.
- Artifact type: infrastructure strategy.
- Owning team: Infrastructure Team.
- Owning domain: Infrastructure.
- Status: draft.
- Related backlog: S1-005 Local Infrastructure Strategy.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 local-first infrastructure 방향을 `kind` 기준으로 정의합니다. Stage 1에서는 manifest, compose, script를 생성하지 않고 Stage 2 scaffold readiness의 기준만 정합니다.

## 핵심 결정

- Local Kubernetes는 `kind`를 기준으로 한다.
- Stage 1에서는 Kubernetes manifest를 생성하지 않는다.
- Stage 1에서는 Docker Compose를 생성하지 않는다.
- PostgreSQL, Redis, NGINX의 local 배치는 Stage 2 scaffold plan에서 구체화한다.
- Infrastructure artifact는 `.ai/architecture/*`에서 먼저 결정한다.

## kind 선택 기준

kind를 기준으로 하는 이유:

- Kubernetes API compatibility를 local-first로 검증하기 쉽다.
- CI 환경에서 재현 가능한 cluster 구성이 가능하다.
- Stage 2 이후 manifest validation과 연결하기 좋다.
- cloud-native 방향과 정렬된다.

## Local Component 후보

Stage 2 이후 후보:

- kind cluster.
- PostgreSQL workload 또는 local dependency.
- Redis workload 또는 local dependency.
- NGINX gateway 또는 ingress-facing gateway 후보.
- backend service.
- frontend service.

주의: 위 항목은 후보이며 Stage 1에서는 생성하지 않습니다.

## Docker Compose 정책

- Docker Compose는 Stage 1에서 생성하지 않는다.
- Docker Compose는 local Kubernetes를 대체하는 primary path가 아니다.
- 필요 시 Stage 2에서 dependency-only fallback으로 검토할 수 있다.
- Compose를 도입하려면 kind 경로와 충돌하지 않아야 한다.

## PostgreSQL Local 원칙

- PostgreSQL은 migration 기반 운영을 전제로 한다.
- Stage 2에서 local DB bootstrap 방식이 결정된다.
- data persistence, seed, reset strategy는 PostgreSQL migration strategy를 따른다.

## Redis Local 원칙

- Redis 초기 목적은 session management이다.
- Stage 2에서 Redis availability와 reset strategy를 정의한다.
- cache와 queue/event usage는 future consideration이다.

## NGINX Local 원칙

- NGINX는 reverse proxy/gateway 후보이다.
- Ingress와의 관계는 NGINX gateway strategy에서 결정한다.
- Stage 1에서는 nginx config를 생성하지 않는다.

## Stage 2 Scaffold 조건

Infrastructure scaffold는 다음이 준비된 뒤 생성할 수 있습니다.

- 이 strategy가 active 또는 approved draft 상태이다.
- NGINX gateway strategy가 작성되어 있다.
- Redis usage strategy가 작성되어 있다.
- PostgreSQL migration strategy가 작성되어 있다.
- scaffold PR 단위가 정의되어 있다.
- local validation command와 expected result가 문서화되어 있다.

## Review 기준

- Stage 1에서 manifest/script/compose 파일을 생성하지 않는다.
- kind를 primary local Kubernetes path로 유지한다.
- dependency bootstrap이 backend/frontend scaffold보다 앞서 과도하게 구현되지 않는다.
- rollback/reset expectation을 Stage 2에 넘길 수 있다.

## Open Questions

- PostgreSQL을 cluster 내부 workload로 둘지 외부 container로 둘지.
- Redis를 cluster 내부 workload로 둘지 외부 container로 둘지.
- NGINX를 ingress controller로 볼지 gateway workload로 볼지.
- local image build strategy.
- CI에서 kind를 사용할지 별도 경량 validation을 둘지.
