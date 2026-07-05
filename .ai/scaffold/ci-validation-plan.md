# CI Validation Plan

## Artifact Metadata

- Artifact name: CI Validation Plan.
- Artifact type: validation planning.
- Owning team: Platform Team.
- Owning domain: CI / Validation Governance.
- Status: active.
- Related backlog: S2-005 CI Validation Plan.
- Related PR: TBD.
- Last updated: 2026-07-02.

## Stage 2 Phase Policy Reference

이 문서는 `.ai/scaffold/stage-2-phase-policy.md`를 따른다.

- 현재 문서 작성은 Stage 2A - Scaffold Readiness Planning에 속한다.
- 실제 scaffold 파일 생성은 Stage 2B - Scaffold Execution에서만 허용된다.

## 목적

이 문서는 Stage 2 scaffold PR을 검증할 CI 기준을 정의합니다. Stage 2에서는 실제 CI workflow file을 생성하지 않고, backend/frontend/infrastructure/documentation scaffold가 어떤 기준을 통과해야 하는지 계획합니다.

## CI Validation 목표

CI validation은 다음을 확인합니다.

- Scaffold가 build/test/lint 가능한 최소 상태인지.
- Forbidden scope가 섞이지 않았는지.
- Backend, frontend, infrastructure scaffold가 각자 독립 검증 가능한지.
- Documentation/artifact source of truth가 유지되는지.
- Stage 3 feature implementation이 Stage 2 scaffold PR에 포함되지 않았는지.

## Stage 2 CI 확정 입력

- Backend package manager는 `npm`이다.
- Frontend package manager는 `npm`이다.
- Backend scaffold는 NestJS 기반이다.
- Frontend scaffold는 Vite + React + TypeScript 기반이다.
- Infrastructure scaffold는 kind config 중심이다.
- PostgreSQL/Redis는 kind 외부 dependency로 계획한다.
- Docker Compose는 primary path가 아니다.
- Contract source of truth는 `.ai/domains/*` artifact이다.

## CI Workflow 생성 정책

Stage 2A plan 단계에서는 실제 CI workflow file을 생성하지 않습니다. Stage 2B PR-005에서는 scaffold validation workflow file 생성을 허용합니다.

금지:

- CI script 생성.
- package install 자동화 script 생성.
- Docker Compose 기반 CI path 생성.
- Auth behavior E2E workflow 생성.

CI workflow file은 Scaffold PR Plan 이후 별도 PR에서 생성합니다.

## Stage 2B PR-005 결정

- CI provider는 GitHub Actions를 사용한다.
- Workflow file은 `.github/workflows/scaffold-validation.yml` 하나로 시작한다.
- Backend, frontend, infrastructure, artifact consistency를 별도 job으로 분리한다.
- Node.js version은 `22`를 사용한다.
- kind cluster creation은 Stage 2B CI에서 실행하지 않는다.
- CI는 kind config 존재와 forbidden manifest 부재만 검증한다.
- Auth E2E, deployment, migration, Redis session behavior validation은 포함하지 않는다.
## Backend CI 후보

Backend scaffold PR은 다음 후보 command를 CI에서 실행할 수 있어야 합니다.

```text
cd apps/backend
npm ci
npm run build
npm run test
npm run lint
```

Expected result:

- NestJS scaffold가 build된다.
- scaffold test가 통과한다.
- lint가 통과한다.
- Prisma model/migration 없이도 validation이 가능하다.
- Health endpoint compile이 가능하다.

Forbidden checks:

- Auth behavior test 요구.
- PostgreSQL migration 실행 요구.
- Redis session test 요구.

## Frontend CI 후보

Frontend scaffold PR은 다음 후보 command를 CI에서 실행할 수 있어야 합니다.

```text
cd apps/frontend
npm ci
npm run build
npm run test
npm run lint
```

Expected result:

- Vite + React + TypeScript scaffold가 build된다.
- scaffold test가 통과한다.
- lint가 통과한다.
- Auth UI나 API client 없이 validation이 가능하다.

Forbidden checks:

- Login UI test 요구.
- Auth API client test 요구.
- session bootstrap test 요구.
- browser E2E test 요구.

## Infrastructure CI 후보

Infrastructure scaffold PR은 다음 후보 command를 CI에서 실행할 수 있어야 합니다.

```text
kind version
kubectl version --client
kind create cluster --config infra/kind/cluster-config.yaml
```

Expected result:

- kind CLI가 사용 가능하다.
- kubectl client가 사용 가능하다.
- kind config syntax validation이 가능하다.

주의:

- dry-run은 필수 검증이 아니며, syntax validation이 지원될 경우 optional로만 사용한다.
- Stage 2에서는 application manifest validation을 요구하지 않는다.

Forbidden checks:

- Kubernetes application deployment.
- PostgreSQL/Redis workload deployment.
- NGINX workload deployment.
- Auth routing E2E validation.

## Documentation / Artifact CI 후보

`.ai` artifact 변경 PR은 다음을 검증해야 합니다.

후보:

- Required artifact가 registry에 등록되어 있는지.
- Stage backlog의 Result가 artifact와 일치하는지.
- forbidden scope 문구가 유지되는지.
- contract artifact가 package로 대체되지 않았는지.

Expected result:

- Artifact registry가 source of truth 역할을 유지한다.
- Stage roadmap과 backlog가 모순되지 않는다.
- scaffold plan과 completion review가 연결된다.

주의:

- Stage 2에서는 자동 문서 lint tool을 도입하지 않는다.
- 문서 CI 자동화는 후속 Platform issue로 분리할 수 있다.

## CI Matrix 후보

Stage 2 후속 CI workflow 후보:

```text
jobs:
  backend-scaffold
  frontend-scaffold
  infrastructure-scaffold
  artifact-consistency
```

주의:

- 위 matrix는 후보입니다.
- 실제 GitHub Actions workflow는 Scaffold PR Plan 이후 작성합니다.
- 각 job은 독립적으로 실패 원인을 추적할 수 있어야 합니다.

## CI Scope Boundary

Stage 2 CI는 scaffold readiness만 검증합니다.

허용:

- Build.
- Unit test scaffold.
- Lint.
- Config syntax validation.
- Artifact consistency review.

금지:

- Auth feature behavior validation.
- Full E2E validation.
- Stage environment deployment.
- Database migration execution.
- Redis session behavior validation.
- NGINX live routing validation.

## Required CI Evidence in Scaffold PR

각 scaffold PR은 다음 evidence를 포함해야 합니다.

- 실행한 command.
- 성공/실패 결과.
- 실패 시 원인과 후속 조치.
- 실행하지 않은 validation과 이유.
- forbidden scope 미포함 확인.

## Review 기준

Reviewer는 다음을 확인합니다.

- CI plan이 Stage 2 forbidden scope를 위반하지 않는다.
- backend/frontend/infrastructure validation이 분리되어 있다.
- CI가 Stage 3 behavior를 요구하지 않는다.
- CI workflow file 생성이 아직 발생하지 않았다.
- validation evidence가 PR template과 연결될 수 있다.

## QA 기준

QA는 다음을 확인합니다.

- Stage 2 CI가 behavior QA를 대체한다고 주장하지 않는다.
- Auth behavior QA는 Stage 3으로 분리되어 있다.
- scaffold validation 실패가 issue로 전환될 수 있다.
- CI failure가 owner별로 분류 가능하다.

## Open Questions For Scaffold PR Plan

Resolved by Stage 2B PR-005:

- CI workflow file: single GitHub Actions workflow file.
- CI provider: GitHub Actions.
- kind validation in CI: do not create a kind cluster in Stage 2B CI.
- artifact consistency: basic automated shell checks in CI.
- dependency cache policy: npm cache via `ctions/setup-node` per package lockfile.

Still open for later stages:

- Whether to split workflow files when CI grows.
- Whether to add kind cluster creation in CI after infrastructure approval.
- Whether to replace shell artifact checks with a dedicated validation tool.

## Completion Criteria

S2-005는 다음 조건을 만족하면 완료됩니다.

- Backend CI 후보가 정의되어 있다.
- Frontend CI 후보가 정의되어 있다.
- Infrastructure CI 후보가 정의되어 있다.
- Documentation/artifact validation 후보가 정의되어 있다.
- CI scope boundary가 정의되어 있다.
- 실제 CI workflow file은 생성하지 않았다.
