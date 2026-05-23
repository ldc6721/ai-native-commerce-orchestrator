# PR Workflow

## 목적

모든 지속 가능한 repository 변경은 pull request를 통해 진행합니다. PR은 collaboration, review, QA evidence, integration governance의 기본 단위입니다.

## 생명주기

1. Issue를 생성하거나 선택한다.
2. PM / Orchestrator가 owner, scope, acceptance criteria를 확인한다.
3. Team Agent가 필요한 artifact를 준비하거나 갱신한다.
4. Team Agent가 branch를 생성한다.
5. Team Agent가 scoped work를 수행한다.
6. Team Agent가 PR artifact template을 사용해 PR을 연다.
7. Reviewer Agent가 review를 수행한다.
8. risk 또는 workflow stage에 따라 필요한 경우 QA Team이 검증한다.
9. Team Agent가 finding을 수정한다.
10. Integration Team 또는 PM / Orchestrator가 stage readiness를 표시한다.
11. 모든 gate를 통과하면 PR을 merge한다.

## Branch Naming

권장 prefix:

- `feature/*`
- `fix/*`
- `infra/*`
- `platform/*`
- `docs/*`
- `workflow/*`

## 필수 PR 내용

- Purpose.
- Linked issue.
- Owning team and domain.
- Changed artifacts.
- Architecture considerations.
- Testing and validation evidence.
- Risk analysis.
- 필요한 경우 rollback 또는 recovery notes.

## Merge Gate

- Reviewer approval.
- cross-domain, user-facing, infrastructure, high-risk change의 경우 필요한 QA sign-off.
- unresolved blocker finding 없음.
- behavior change가 있는 경우 artifact contract 갱신.
- integration risk 문서화.

## 금지되는 PR 패턴

- orchestration approval 없이 관련 없는 여러 domain을 섞는 PR.
- implementation PR 안에 숨겨진 contract change.
- validation plan 없는 infrastructure change.
- platform ownership review 없는 shared utility change.
