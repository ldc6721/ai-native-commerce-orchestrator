# Testing Policy

## 목적

Testing은 변경이 requirement를 만족하고 안전하게 integration될 수 있다는 evidence를 제공합니다. Test expectation은 risk, ownership boundary, user impact에 따라 확장됩니다.

## Test Category

- isolated logic을 위한 unit test.
- module/service boundary를 위한 integration test.
- user flow와 cross-domain flow를 위한 end-to-end test.
- API, event, schema, UI integration expectation을 위한 contract test.
- database change를 위한 migration test.
- integrated release candidate를 위한 stage validation test.
- deployment와 rollback behavior를 위한 infrastructure validation test.

## 최소 기대치

모든 PR은 다음을 포함해야 합니다.

- Validation summary.
- 실행한 command 또는 check.
- Known gap.
- test를 추가하지 않은 경우 risk-based explanation.

## Risk-Based Expansion

다음 변경은 test coverage를 확장해야 합니다.

- domain boundary를 넘는 변경.
- API contract 변경.
- persistence 또는 migration 변경.
- session 또는 cache behavior 변경.
- infrastructure, deployment, gateway behavior 변경.
- checkout, payment, auth, order flow에 영향을 주는 변경.

## QA Integration

다음 변경은 QA sign-off가 필요합니다.

- Cross-domain flow.
- User-facing behavior.
- Payment, order, auth, session change.
- Runtime behavior에 영향을 주는 infrastructure change.
- Stage promotion.

## 금지되는 Testing Claim

- evidence 없이 validation을 주장하지 않는다.
- implementation reasoning을 test result 대신 사용하지 않는다.
- high-risk change를 unreviewed test gap이 있는 상태로 merge하지 않는다.
