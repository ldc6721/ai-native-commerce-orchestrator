# Infrastructure Scaffold Plan

## Artifact Metadata

- Artifact name: Infrastructure Scaffold Plan.
- Artifact type: scaffold readiness plan.
- Owning team: Infrastructure Team.
- Owning domain: Infrastructure.
- Status: active.
- Related backlog: S2-003 Infrastructure Scaffold Plan.
- Related PR: TBD.
- Last updated: 2026-07-02.

## Stage 2 Phase Policy Reference

이 문서는 `.ai/scaffold/stage-2-phase-policy.md`를 따른다.

- 현재 문서 작성은 Stage 2A - Scaffold Readiness Planning에 속한다.
- 실제 scaffold 파일 생성은 Stage 2B - Scaffold Execution에서만 허용된다.

## 목적

이 문서는 Stage 2에서 infrastructure scaffold를 생성하기 전에 허용 범위, 금지 범위, validation 기준, PR 경계를 정의합니다. 이 문서는 실제 Kubernetes manifest 구현 계획이 아니라 scaffold readiness plan입니다.

## 결정 요약

- Local Kubernetes는 `kind`를 기준으로 한다.
- Stage 2 infrastructure scaffold에서 kind cluster config 파일 생성은 허용한다.
- PostgreSQL과 Redis는 kind cluster 외부 dependency로 구성한다.
- PostgreSQL/Redis external dependency는 Docker container 방식으로 계획한다.
- Docker Compose는 primary local path가 아니다.
- Docker Compose는 dependency-only fallback으로만 허용한다.
- Stage 2에서는 Docker Compose file을 생성하지 않는다.
- NGINX는 kind 내부 gateway workload 방향으로 계획한다.
- Stage 2에서는 Kubernetes manifest 생성을 금지한다.
- Stage 2에서는 kind config만 허용한다.
- Stage 2에서는 script 생성을 금지하고, script 계획만 작성한다.

## Stage 2 Infrastructure Scaffold 허용 범위

Stage 2 infrastructure scaffold에서 허용되는 항목:

- `infra` directory skeleton 후보.
- `infra/kind/cluster-config.yaml` 후보.
- `infra/nginx/README.md` 후보.
- `infra/kubernetes/README.md` 후보.
- `infra/scripts/README.md` 후보.
- External PostgreSQL/Redis dependency documentation.
- Docker container 기반 dependency planning.
- NGINX gateway workload planning.
- Local validation expectation documentation.

## Stage 2 Infrastructure Scaffold 금지 범위

Stage 2 infrastructure scaffold에서 금지되는 항목:

- Kubernetes application manifest.
- Backend Deployment/Service manifest.
- Frontend Deployment/Service manifest.
- Redis Kubernetes workload manifest.
- PostgreSQL Kubernetes workload manifest.
- NGINX Kubernetes workload manifest.
- Docker Compose file.
- kind up/down script.
- dependency up/down script.
- CI workflow file.
- Auth gateway implementation.
- Rate limiting configuration.
- Service mesh configuration.

## Candidate Directory Structure

Stage 2 infrastructure scaffold 후보 구조:

```text
infra/
  kind/
    cluster-config.yaml
  nginx/
    README.md
  kubernetes/
    README.md
  scripts/
    README.md
```

주의:

- 위 구조는 scaffold 후보입니다.
- `cluster-config.yaml`은 Stage 2 scaffold에서 생성할 수 있습니다.
- `kubernetes/README.md`는 manifest boundary 설명용입니다.
- 실제 Kubernetes manifest는 Stage 2 plan review 이후 별도 PR에서만 검토합니다.
- 실제 scripts는 Local Environment Validation Plan과 Scaffold PR Plan 이후에만 검토합니다.

## kind Scaffold Boundary

허용:

- kind cluster name 후보.
- kind node topology 후보.
- port mapping 후보.
- local gateway와 연결될 수 있는 기본 cluster config 후보.

금지:

- application deployment.
- database workload.
- Redis workload.
- NGINX workload manifest.
- backend/frontend service wiring.

## External Dependency Boundary

PostgreSQL과 Redis는 kind 외부 dependency로 둡니다.

허용:

- Docker container 방식으로 실행한다는 계획.
- dependency naming convention 후보.
- port 후보.
- reset strategy 후보.
- connection string shape 후보.

금지:

- Docker Compose file 생성.
- dependency run script 생성.
- database schema 생성.
- Redis key 생성.
- seed data 생성.

## Docker Compose Policy

Docker Compose는 primary local path가 아닙니다.

허용:

- dependency-only fallback으로 문서상 허용.
- Stage 2 이후 필요성이 확인되면 별도 issue로 검토.

금지:

- Stage 2에서 compose file 생성.
- Compose를 kind 대체 경로로 정의.
- backend/frontend runtime을 Compose primary path로 구성.

## NGINX Gateway Boundary

NGINX는 kind 내부 gateway workload 방향으로 계획합니다.

허용:

- NGINX gateway workload 방향성 문서화.
- `/api/auth` routing expectation 문서화.
- frontend/backend routing expectation 문서화.

금지:

- NGINX Kubernetes manifest 생성.
- NGINX config 생성.
- Auth gateway policy 구현.
- rate limiting 구현.
- TLS termination 구현.

## Kubernetes Manifest Boundary

Stage 2에서는 kind config만 허용하고 application manifest는 금지합니다.

금지 대상:

- Namespace manifest.
- Deployment manifest.
- Service manifest.
- Ingress manifest.
- ConfigMap manifest.
- Secret manifest.
- PVC/PV manifest.

Manifest 생성은 backend/frontend scaffold plan과 local validation plan이 정리된 뒤 별도 scaffold PR로 검토합니다.

## Script Boundary

Stage 2에서는 script 생성이 아니라 script 계획만 작성합니다.

허용:

- README에 script 후보 명시.
- `kind up/down` command expectation 문서화.
- dependency up/down expectation 문서화.

금지:

- `.ps1`, `.sh`, `.bat` script 생성.
- script가 Docker/Kubernetes resource를 실제로 생성하는 동작.

## Validation Commands 후보

Infrastructure scaffold PR은 최소 다음 validation 후보를 가져야 합니다.

```text
kind version
kind create cluster --config infra/kind/cluster-config.yaml
kind delete cluster --name <cluster-name>
```

주의:

- 실제 command는 Local Environment Validation Plan에서 확정한다.
- dry-run은 필수 검증이 아니며, syntax validation이 지원될 경우 optional로만 사용한다.
- External PostgreSQL/Redis container 실행 검증은 Local Environment Validation Plan에서 별도 정의한다.

## PR Boundary

Infrastructure scaffold PR은 다음만 포함해야 합니다.

- `infra` directory skeleton.
- kind cluster config.
- README boundary documents.
- external dependency planning notes.

Infrastructure scaffold PR은 다음을 포함하면 안 됩니다.

- Kubernetes application manifests.
- Docker Compose file.
- executable scripts.
- backend code.
- frontend code.
- Auth implementation.
- DB schema or migration.

## Review 기준

Reviewer는 다음을 확인합니다.

- Stage 2 forbidden scope를 위반하지 않는다.
- PostgreSQL/Redis가 kind 내부 workload로 계획되지 않았다.
- Docker Compose가 primary path로 정의되지 않았다.
- Kubernetes application manifest가 없다.
- Script가 생성되지 않았다.
- NGINX가 auth gateway/rate limiting/service mesh 역할로 확장되지 않았다.

## QA 기준

QA는 Stage 2 infrastructure scaffold에서 application behavior QA를 수행하지 않습니다.

QA가 확인할 수 있는 것:

- local validation expectation이 정의되어 있다.
- kind config validation 후보가 있다.
- external dependency validation은 Local Environment Validation Plan으로 분리되어 있다.
- infrastructure scaffold가 feature implementation을 포함하지 않는다.

## Open Questions For Stage 2 Validation

Resolved by Stage 2B PR-001:

- kind cluster name: `ai-commerce-local`.
- kind node topology: single control-plane.
- port mapping:
  - host `8080` to cluster port `80`.
  - host `8443` to cluster port `443`.
- external PostgreSQL port: `5432`.
- external Redis port: `6379`.

Still open:

- external PostgreSQL container name.
- external Redis container name.
- local reset strategy.
- whether CI should run kind validation.

## Completion Criteria

S2-003은 다음 조건을 만족하면 완료됩니다.

- Infrastructure scaffold 허용 범위가 정의되어 있다.
- Infrastructure scaffold 금지 범위가 정의되어 있다.
- Candidate directory structure가 정의되어 있다.
- External dependency boundary가 정의되어 있다.
- Validation commands 후보가 정의되어 있다.
- PR boundary가 정의되어 있다.
- Local Environment Validation Plan으로 넘길 open question이 분리되어 있다.
