# AI 엔지니어링 조직 진입점

## 목적

이 디렉터리는 AI-native 엔지니어링 조직의 운영 체계입니다. Agent가 어떻게 작업을 시작하고, 산출물을 주고받고, 리뷰를 요청하고, QA를 통과하며, 구현 단계로 넘어갈 수 있는지를 정의합니다.

이 저장소는 관련 workflow, ownership, artifact gate가 충족되기 전까지 Backend, Frontend, Infrastructure 구현으로 이동하지 않습니다.

## 먼저 읽어야 할 문서

모든 Agent는 작업을 시작하기 전에 다음 문서를 먼저 읽습니다.

1. `.ai/workflows/workflow-entrypoint.md`
2. `.ai/agents/minimum-operating-loops.md`
3. `.ai/workflows/workstream-lifecycle.md`
4. `.ai/stage-roadmap.md`
5. `.ai/domains/domain-ownership.md`
6. `.ai/policies/architecture-policy.md`
7. `.ai/policies/testing-policy.md`
8. `.ai/policies/definition-of-ready.md`
9. `.ai/policies/definition-of-done.md`
10. `.ai/registry/artifact-registry.md`

이후 각 역할에 맞는 문서를 읽습니다.

- PM / Orchestrator: `.ai/agents/pm-orchestrator-agent.md`
- Team Agent: `.ai/agents/team-agents.md`
- Reviewer Agent: `.ai/agents/reviewer-agent.md`
- QA Team: `.ai/agents/qa-team.md`

## 기본 운영 순서

새 작업은 기본적으로 다음 순서로 진행합니다.

1. 요청 유형을 식별한다.
2. 현재 Stage와 허용 가능한 작업인지 확인한다.
3. owner, domain, required artifact를 식별한다.
4. issue 또는 task artifact를 생성하거나 갱신한다.
5. workstream lifecycle에 따라 요건 파악, 계획 수립, 테스트 구성, 개발 진행, 최종 리뷰를 수행한다.
6. 최종 리뷰 전 각 단계별 review와 되돌림 루프를 통과한다.
7. 명시적인 handoff evidence를 남긴다.
8. 필요한 경우 review 또는 QA를 요청한다.
9. 완료 선언 전에 관련 artifact를 갱신한다.

## 현재 Stage

현재 Stage: Stage 0 - AI Organization Bootstrap.

허용되는 작업:

- Agent 역할 정의.
- Workflow 정의.
- Ownership model 정의.
- Policy 정의.
- Artifact 및 issue template 정의.
- Definition of Ready / Definition of Done.
- Artifact registry.
- 향후 architecture stage를 위한 planning artifact.

아직 허용되지 않는 작업:

- Backend scaffold.
- Frontend scaffold.
- Kubernetes manifest.
- Docker Compose.
- Production code.

## 완료 규칙

작업은 담당 Agent가 다음 항목을 명확히 제시할 수 있을 때 완료됩니다.

- 변경된 artifact.
- artifact owner.
- 수행한 validation 또는 review.
- 다음 handoff 대상 또는 blocking reason.
