# Architecture Policy

## 목적

이 policy는 repository가 workflow-first, domain-owned, autonomous multi-agent engineering에 적합한 상태를 유지하도록 합니다. 구현보다 ownership, contract, workflow가 먼저 정의되어야 합니다.

## 핵심 원칙

- 구현보다 workflow-first architecture를 우선한다.
- bounded context ownership을 명확히 한다.
- explicit artifact-based collaboration을 유지한다.
- PR-centric change management를 따른다.
- local-first development readiness를 우선한다.
- Kubernetes-oriented cloud-native 방향을 유지한다.
- 실제 duplication 또는 complexity가 나타나기 전까지 abstraction은 보수적으로 도입한다.

## 기술 방향

Backend:

- NestJS.
- PostgreSQL.
- Redis.

Frontend:

- React.
- TypeScript.
- Feature-oriented architecture.
- MCP-style modular component pattern.

Infrastructure:

- Kubernetes.
- Docker.
- NGINX.
- Local-first kind environment.

## Boundary 규칙

- 각 domain은 자신의 contract와 behavior를 소유한다.
- shared code에는 명확한 platform owner가 있어야 한다.
- cross-domain behavior는 explicit integration review가 필요하다.
- persistence change는 migration strategy를 포함해야 한다.
- Redis 사용은 session, cache, future async/event support 중 목적을 명시해야 한다.
- Frontend feature는 domain ownership과 contract boundary에 매핑되어야 한다.
- Shared utility, shared type, api-contract package는 초기 구조에 만들지 않는다.
- Contract는 code package가 아니라 domain-owned document artifact로 관리한다.

## Architecture Decision Record

다음 결정은 ADR로 남깁니다.

- Framework decision.
- Persistence strategy.
- Infrastructure topology.
- Contract versioning.
- Cross-domain integration pattern.
- Queue/event adoption.

## Anti-Pattern

- ownership과 workflow 정의 전에 구현을 시작하는 것.
- hidden contract change.
- 안정된 필요 없이 broad shared abstraction을 만드는 것.
- shared utility를 통해 domain boundary가 새는 것.
- validation과 rollback expectation 없는 infrastructure manifest.
