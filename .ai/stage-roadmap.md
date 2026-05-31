# Stage Roadmap

## 목적

이 문서는 README.md의 장기 목표를 실제 진행 가능한 stage로 나눕니다. 현재 저장소의 목표는 쇼핑몰 구현을 바로 시작하는 것이 아니라, AI-native engineering platform이 안정적으로 작업을 굴릴 수 있는 조건을 먼저 만드는 것입니다.

## 장기 목표

이 저장소는 다음을 목표로 합니다.

- AI-native Software Engineering Organization.
- Multi-Agent Collaboration Workflow.
- PR 기반 개발 프로세스.
- Workflow-First Architecture.
- Bounded Context Ownership.
- Explicit Artifact-Based Collaboration.
- Autonomous Delivery Workflow.
- Kubernetes-Oriented Cloud-Native Architecture.
- Production-oriented Commerce Platform.

## Stage 0 - Organization Bootstrap

### 목표

AI Agent들이 같은 방식으로 일할 수 있는 최소 운영 체계를 만든다.

### 주요 산출물

- Agent 역할 정의.
- Workflow entrypoint.
- Workstream lifecycle.
- PR workflow.
- Review workflow.
- QA workflow.
- Architecture policy.
- Testing policy.
- Contract artifact policy.
- Definition of Ready.
- Definition of Done.
- Domain ownership.
- Artifact template.
- Issue template.
- Artifact registry.

### 완료 조건

- 모든 작업이 어떤 workflow로 들어가는지 명확하다.
- 구현 금지 조건과 허용 조건이 명확하다.
- domain owner가 정의되어 있다.
- artifact 중심 협업 방식이 정의되어 있다.

## Stage 1 - Architecture Planning

### 목표

구현 전에 backend, frontend, infrastructure, domain contract의 설계 방향을 확정한다.

### 주요 산출물

- Monorepo structure decision.
- Backend architecture plan.
- Frontend architecture plan.
- Local Kubernetes strategy.
- PostgreSQL migration strategy.
- Redis usage strategy.
- NGINX gateway strategy.
- Initial domain contract plan.
- Contract artifact governance.
- Stage 1 architecture planning backlog.
- ADR 초안.

### 완료 조건

- scaffold를 생성해도 되는 repository structure가 합의되어 있다.
- backend/frontend/infra boundary가 명확하다.
- local-first 개발 환경 방향이 결정되어 있다.
- contract가 package가 아니라 domain-owned artifact로 관리된다는 기준이 확정되어 있다.
- 주요 architecture decision이 ADR로 기록되어 있다.

## Stage 2 - Scaffold Readiness

### 목표

코드 생성을 시작하기 전에 scaffold의 범위와 검증 방식을 확정한다.

### 주요 산출물

- Backend scaffold plan.
- Frontend scaffold plan.
- Infrastructure scaffold plan.
- CI validation plan.
- Local environment validation plan.

### 완료 조건

- scaffold PR 단위가 정의되어 있다.
- scaffold가 어떤 테스트와 검증을 통과해야 하는지 명확하다.
- scaffold가 domain implementation을 포함하지 않는다는 경계가 명확하다.

## Stage 3 - First Implementation

### 목표

가장 작은 vertical slice를 PR 기반으로 구현한다.

### 후보

- Auth session foundation.
- Product read model foundation.
- Cart session foundation.
- Frontend shell + API integration baseline.

### 완료 조건

- 하나의 user-facing 또는 platform-facing flow가 PR, review, QA를 통과한다.
- domain ownership과 artifact contract가 실제 구현에 적용된다.
- regression과 integration validation 방식이 작동한다.

## Stage 4 - Integration Hardening

### 목표

여러 domain과 infrastructure가 함께 움직일 때의 안정성을 높인다.

### 주요 산출물

- Stage validation automation.
- Cross-domain contract tests.
- Deployment readiness checks.
- Rollback and recovery validation.
- Observability baseline.

## 지금 먼저 해야 할 일

현재는 Stage 1 completion review가 완료되어 Stage 2 Scaffold Readiness planning을 시작할 수 있습니다. 다음 우선순위는 다음과 같습니다.

1. Stage 2 scaffold readiness backlog를 만든다.
2. Backend scaffold plan을 만든다.
3. Frontend scaffold plan을 만든다.
4. Infrastructure scaffold plan을 만든다.
5. Local environment validation plan을 만든다.

이 순서가 끝나면 backend, frontend, infrastructure scaffold PR 단위를 논의할 준비가 됩니다.
