# Agent 최소 운영 루프

## 목적

이 문서는 각 AI Agent 유형별 최소 운영 루프를 정의합니다. 루프는 의도적으로 짧게 유지하여 Agent가 ownership, artifact, review, QA 책임을 건너뛰지 않으면서 자율적으로 작업할 수 있게 합니다.

## 공통 Agent 루프

모든 Agent는 다음 루프를 따릅니다.

1. Intake
   - workflow entrypoint를 읽는다.
   - request type, current stage, owner, required artifact를 식별한다.

2. Scope
   - in scope를 명시한다.
   - out of scope를 명시한다.
   - dependency와 blocker를 식별한다.

3. Act
   - stage와 assignment가 허용하는 artifact만 생성하거나 갱신한다.
   - 변경을 issue, domain, workflow에 추적 가능하게 유지한다.

4. Validate
   - artifact를 관련 policy와 template 기준으로 확인한다.
   - evidence 또는 known gap을 기록한다.

5. Handoff
   - next owner를 명시한다.
   - next workflow를 명시한다.
   - open question, risk, required review를 기록한다.

## PM / Orchestrator 루프

1. 요청을 접수한다.
2. request type과 stage permission을 분류한다.
3. 작업을 owned issue 또는 artifact로 분해한다.
4. primary owner와 supporting reviewer를 지정한다.
5. dependency와 stage gate를 식별한다.
6. 작업을 진행할지, 분리할지, 중단할지 결정한다.
7. Team, Reviewer, QA, Integration으로 넘길 handoff package를 만든다.

최소 출력:

- Owner.
- Domain.
- Required artifacts.
- Acceptance criteria.
- Next workflow.
- Blocking risks.

## Team Agent 루프

1. assigned issue 또는 artifact를 받는다.
2. domain ownership과 allowed stage action을 확인한다.
3. 관련 policy, template, domain contract를 읽는다.
4. 요건 파악을 수행하고 단계별 review를 통과한다.
5. 계획 수립을 수행하고 단계별 review를 통과한다.
6. 테스트 구성을 수행하고 단계별 review를 통과한다.
7. 개발 진행 또는 artifact 변경을 수행하고 단계별 review를 통과한다.
8. 최종 리뷰를 수행한다.
9. PR-ready summary 또는 implementation handoff를 준비한다.
10. Reviewer Agent review를 요청한다.

최소 출력:

- Changed artifacts.
- Scope summary.
- Validation performed.
- Contract impact.
- Review request.

## Reviewer Agent 루프

1. artifact 또는 PR-ready package를 받는다.
2. owner, scope, acceptance criteria를 확인한다.
3. architecture, testing, ownership, workflow policy 기준으로 검토한다.
4. blocker, major, minor, note finding을 식별한다.
5. approve, request changes, block 중 하나를 결정한다.
6. finding을 owner에게 전달하고 필요한 경우 PM / Orchestrator에게 escalation한다.

최소 출력:

- Decision.
- Findings by severity.
- Required corrections.
- Residual risks.
- QA recommendation.

## QA Team 루프

1. validation request 또는 stage candidate를 받는다.
2. user flow, integration point, regression risk를 식별한다.
3. acceptance criteria에서 validation scenario를 정의한다.
4. 가능한 validation을 실행하거나, 구현이 없는 경우 validation plan을 문서화한다.
5. failure를 owner와 severity가 있는 issue로 보고한다.
6. sign-off, sign-off with risk, block 중 하나를 결정한다.

최소 출력:

- Validation scope.
- Scenarios checked.
- Evidence 또는 planned evidence.
- Failures and owners.
- QA decision.

## Integration Team 루프

1. stage candidate 또는 cross-domain change set을 받는다.
2. PR과 artifact dependency order를 확인한다.
3. domain 간 contract compatibility를 확인한다.
4. merge, deployment, rollback risk를 식별한다.
5. integrated behavior에 대한 QA validation을 요청한다.
6. promote, hold, reject 중 하나를 권고한다.

최소 출력:

- Candidate set.
- Dependency order.
- Compatibility result.
- Integration risks.
- Stage recommendation.

## 루프 완료 기준

루프는 다음 조건을 만족할 때 완료됩니다.

- 다음 Agent가 hidden context 없이 이어서 작업할 수 있다.
- required artifact가 link 또는 name으로 명시되어 있다.
- validation 또는 review status가 명확하다.
- open risk에 owner가 있다.
- action이 current stage gate 안에 있다.
