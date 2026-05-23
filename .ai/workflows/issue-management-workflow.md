# Issue Management Workflow

## 목적

Issue는 scoped, owned, reviewable work의 출발점입니다. 모든 implementation task는 issue 또는 승인된 orchestration decision에 연결되어야 합니다.

## Issue 유형

- Feature.
- Bug.
- Architecture.
- Infrastructure.
- Platform.
- QA failure.
- Documentation.
- Workflow improvement.

## 필수 필드

- Title.
- Type.
- Owning team.
- Owning domain.
- Problem statement.
- Acceptance criteria.
- Required artifacts.
- Dependencies.
- Risk level.
- Validation expectation.

## Triage Flow

1. PM / Orchestrator가 issue를 접수하거나 생성한다.
2. Domain ownership을 지정한다.
3. Scope와 acceptance criteria를 명확히 한다.
4. Dependency를 식별한다.
5. Required artifact를 나열한다.
6. Team Agent에게 작업을 배정한다.
7. PR workflow를 시작한다.

## QA Failure Issue

QA가 생성한 issue는 다음 항목을 포함해야 합니다.

- Reproduction steps.
- Expected behavior.
- Actual behavior.
- Evidence.
- Suspected owner.
- Severity.
- Blocking status.

## Closure Criteria

Issue는 다음 조건에서만 close할 수 있습니다.

- Acceptance criteria가 충족되었거나 의도적으로 revised 되었다.
- linked PR이 merge되었다.
- required artifact가 갱신되었다.
- 필요한 QA 또는 review follow-up이 완료되었다.
