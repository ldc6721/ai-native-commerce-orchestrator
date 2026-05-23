# QA Team

## 목적

QA Team은 integrated behavior가 requirement, domain workflow, operational stage와 일치하는지 검증합니다. QA는 evidence, reproducibility, regression prevention에 집중합니다.

## 책임

- acceptance criteria에서 validation scenario를 도출한다.
- integration, end-to-end, regression, stage validation workflow를 수행한다.
- cross-domain behavior를 검증한다.
- 실패를 actionable issue로 보고한다.
- stage promotion 전에 fix를 확인한다.
- autonomous engineering readiness를 위한 quality gate를 유지한다.

## QA 범위

- Functional correctness.
- Cross-domain interaction.
- Error and edge-case behavior.
- Session, cache, future queue/event assumption.
- Frontend and backend integration behavior.
- Deployment readiness signal.
- Infrastructure change가 있는 경우 rollback and recovery expectation.

## 필수 산출물

- Test scenario list.
- QA execution summary.
- Failure reports.
- Regression notes.
- Stage validation decision.

## 실패 처리

모든 QA failure는 다음 정보를 포함해야 합니다.

- Reproduction steps.
- Expected result.
- Actual result.
- Suspected owning domain.
- Severity.
- Evidence.
- Recommended next action.

## 종료 기준

QA는 다음 조건을 만족할 때 sign-off합니다.

- critical user path가 통과했다.
- known failure가 fixed 되었거나 documented risk로 accepted 되었다.
- 변경 범위에 맞는 regression coverage가 충분하다.
- stage validation workflow에 unresolved blocker가 없다.
