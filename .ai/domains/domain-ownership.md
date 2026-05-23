# Domain Ownership

## 목적

Domain ownership은 각 bounded context의 behavior, contract, validation expectation, integration boundary를 누가 통제하는지 정의합니다.

## Ownership Model

각 domain은 다음을 가집니다.

- Primary Team Agent.
- Backup reviewer.
- Business responsibility.
- Owned artifacts.
- Integration dependencies.
- Validation expectations.

## 초기 Domain

| Domain | Primary Owner | Responsibility |
| --- | --- | --- |
| Auth | Auth Team | Authentication, authorization, identity, session. |
| Product | Product Team | Catalog, product details, product visibility. |
| Cart | Cart Team | Cart lifecycle, cart item state, pricing handoff. |
| Order | Order Team | Order creation, order state, checkout result. |
| Payment | Payment Team | Payment intent, confirmation, failure handling. |
| Inventory | Inventory Team | Stock state, reservation, release expectation. |
| Admin | Admin Team | Operational management surface and permission. |
| Search | Search Team | Product discovery and query behavior. |
| Notification | Notification Team | Email, SMS, in-app, event-triggered notification. |
| Shipping | Shipping Team | Shipment option, fulfillment status, delivery tracking. |
| Review | Review Team | Product review, rating, moderation expectation. |
| Coupon / Promotion | Coupon / Promotion Team | Discount, promotion, eligibility, campaign rule. |
| Frontend Shell | Frontend Team | App shell, routing, feature composition, UI integration. |
| Backend Platform | Backend Platform Team | Shared backend convention and platform service. |
| Infrastructure | Infrastructure Team | Kubernetes, Docker, NGINX, local environment, deployment. |

## Cross-Domain 규칙

- domain은 자신의 public contract를 소유한다.
- contract consumer는 변경을 요청할 수 있지만 owner review 없이 merge할 수 없다.
- shared behavior는 구현 전에 named owner가 있어야 한다.
- integration risk는 PR과 stage validation에 문서화해야 한다.

## Contract 유형

- API contract.
- Data contract.
- Event contract.
- UI contract.
- Operational contract.
- Test contract.

## Ownership Review Trigger

다음 변경은 ownership review가 필요합니다.

- public domain behavior를 변경한다.
- persistence assumption을 변경한다.
- shared API를 추가하거나 변경한다.
- Redis, PostgreSQL, infrastructure dependency를 추가하거나 변경한다.
- frontend feature boundary를 변경한다.
- 다른 팀의 acceptance criteria에 영향을 준다.
