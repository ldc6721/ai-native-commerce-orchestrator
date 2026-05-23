# Stage Validation Workflow

## 목적

Stage validation은 PR 묶음이 shared stage branch 또는 environment로 통합될 준비가 되었는지 판단합니다.

## Validation 입력

- Candidate PR list.
- Linked issues.
- Domain ownership map.
- Artifact contract changes.
- Test evidence.
- QA execution summary.
- Known risks and deferred work.

## Validation 단계

1. Candidate Assembly
   - PM / Orchestrator가 stage 후보 PR을 식별한다.
   - Integration Team이 dependency order를 확인한다.

2. Contract Compatibility Check
   - API, event, schema, UI, infrastructure contract를 검증한다.
   - versioning 또는 migration expectation을 확인한다.

3. Integration Risk Review
   - cross-domain behavior change를 식별한다.
   - rollback concern을 식별한다.
   - local Kubernetes 또는 deployment assumption을 식별한다.

4. QA Execution
   - 필요한 integration, end-to-end, regression scenario를 실행한다.
   - failure를 issue로 기록한다.

5. Stage Decision
   - Promote.
   - Promote with accepted risk.
   - Hold pending fixes.
   - Reject and return to owners.

## Stage Exit Criteria

- unresolved blocker issue가 없다.
- contract change가 문서화되어 있다.
- 필요한 owner approval이 있다.
- QA summary가 존재한다.
- risky change에 대해 rollback 또는 remediation path가 알려져 있다.
