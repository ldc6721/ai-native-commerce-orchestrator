# AI Native Commerce Orchestrator

AI-native Multi-Team Engineering Workflow 기반의 Commerce Engineering Platform

---

# Overview

이 프로젝트는 단순한 쇼핑몰 애플리케이션 예제 프로젝트가 아닙니다.

`AI Native Commerce Orchestrator` 는 다음을 목표로 합니다.

* AI-native Software Engineering Organization
* Multi-Agent Collaboration Workflow
* PR 기반 개발 프로세스
* Workflow-First Architecture
* Bounded Context Ownership
* Explicit Artifact-Based Collaboration
* Cloud-Native Infrastructure
* Autonomous Engineering Readiness

본 Repository 는 단순 코드 저장소가 아니라,
AI Agent 들이 협업 가능한 “AI-native Engineering Platform” 을 목표로 설계됩니다.

---

# Project Goal

Production-Oriented Commerce Platform 구축

예상 도메인:

* 인증 / 회원가입
* 상품 관리
* 장바구니
* 주문
* 결제
* 재고
* 관리자
* 이미지 처리
* 검색
* 알림
* 배송
* 리뷰
* 쿠폰 / 프로모션

---

# Core Philosophy

본 프로젝트는 다음 철학을 기반으로 합니다.

* Workflow-First
* AI-Agent Collaboration
* PR-Centric Development
* Bounded Context Architecture
* Explicit Artifact Ownership
* Autonomous Delivery Workflow
* Kubernetes-Oriented Infrastructure
* Long-Term Maintainability

---

# Engineering Organization Structure

## PM / Orchestrator Agent

최상위 PM / Orchestrator Agent 는 다음 역할을 수행합니다.

* 목표 해석
* 요구사항 세분화
* Domain Decomposition
* Branch 기반 작업 분배
* Dependency Coordination
* Cross-Team Integration 관리
* Stage Merge Coordination
* Issue 재분배

PM 은 직접 구현하지 않습니다.

---

## Team Agents

각 Team 은 독립적인 Bounded Context 를 가집니다.

예상 Team:

* Auth Team
* Product Team
* Cart Team
* Order Team
* Payment Team
* Frontend Team
* Infra Team
* Platform Team
* Reviewer Team
* QA Team

각 Team 은:

* 독립 Session / SubAgent 기반으로 동작
* Explicit Artifact 기반 협업
* PR 기반 통합
* Context Ownership 유지

구조를 따릅니다.

---

# Shared Context Strategy

본 시스템은 다음 구조를 따릅니다.

> Shared Facts + Isolated Reasoning

공유:

* Requirements
* ADR
* API Contracts
* Acceptance Criteria
* Architecture Constraints
* Coding Standards

비공유:

* Chain-of-Thought
* Intermediate Reasoning
* Local Exploratory Context

목표:

* Context Pollution 최소화
* 독립적인 Review / QA 구조
* Bounded Reasoning 강화

---

# Workflow

각 Team 은 다음 Lifecycle 을 따릅니다.

1. Requirement Analysis
2. Planning
3. Development
4. Local Testing
5. Pull Request 생성
6. Review
7. Fixes
8. Stage Merge Candidate

모든 작업은 Branch 기반으로 수행됩니다.

예시:

```bash id="8a4n0q"
feature/auth-login
feature/cart-session
infra/nginx-gateway
platform/redis-session
```

---

# Pull Request Workflow

모든 변경은 Pull Request 기반으로 통합됩니다.

PR 에는 반드시 다음이 포함되어야 합니다.

* 목적
* 영향 범위
* Architecture Consideration
* Testing Summary
* Risk Analysis

검증:

* Reviewer Agent
* QA Agent
* CI/CD Pipeline

---

# Reviewer Agent

Reviewer 는 Developer 의 Reasoning Context 를 공유하지 않습니다.

역할:

* Architecture Validation
* Overengineering 탐지
* Security Validation
* Maintainability Review
* Coding Standard Validation
* Requirement Mismatch 탐지

---

# QA Team

QA Team 역할:

* E2E Testing
* Integration Testing
* Regression Testing
* Cross-Domain Validation
* Stage Validation

테스트 실패 시:

* Issue 생성
* Domain 추적
* 담당 Team 재분배

를 수행합니다.

목표:
Self-Healing Iterative Workflow

---

# Functional vs Non-Functional Development

## 기능 개발

중점:

* Business Correctness
* UX
* API Behavior
* Feature Acceptance

---

## Infra / Platform 개발

중점:

* Scalability
* Resiliency
* Rollback Safety
* Observability
* Deployment Safety
* Failure Recovery

Infra Workflow 는 다음을 고려합니다.

* Stress / Load Testing
* Chaos Testing
* Rollback Validation
* Deployment Validation

---

# Tech Stack

## Backend

* NestJS
* TypeScript
* PostgreSQL
* Redis

### Redis 역할

* Session Management
* Cache Layer
* 향후 Queue/Event 확장 고려

### PostgreSQL 방향성

* Migration 기반 운영
* Production-Oriented Schema 관리
* 향후 Domain 기반 분리 가능 구조

---

## Frontend

* React
* TypeScript

### Frontend 방향성

* Feature-Oriented Architecture
* MCP-Style Modular Component Pattern
* Domain Ownership 기반 구조
* API Abstraction Layer

예시:

```bash id="5wn3mu"
features/
  auth/
  product/
  cart/
  order/
```

---

## Infrastructure

* Kubernetes
* Docker
* NGINX

### Infrastructure 방향성

* Container-First Architecture
* Cloud-Native Compatibility
* Local-First Development Workflow
* 확장 가능한 Deployment Topology

---

# Local Development

현재는 Local-First Kubernetes 환경을 우선합니다.

결정된 Local Kubernetes 환경:

* kind

경량 Local Workflow 를 위한 Docker Compose 도 고려합니다.

---

# API Gateway

NGINX 는 다음 역할을 수행합니다.

* Reverse Proxy
* API Gateway
* Frontend Serving

향후:

* Ingress Controller
* Service Mesh
* Rate Limiting
* Auth Gateway

등으로 확장 가능하도록 고려합니다.

---

# Repository Structure

```bash id="jlwm169"
.ai/
  agents/
  workflows/
  policies/
  templates/
  domains/

apps/
  backend/
  frontend/

infra/
  kubernetes/
  nginx/
  docker/
  scripts/

docs/
  architecture/
  adr/
  workflows/
```

---

# Branch Strategy

```bash id="jlwm170"
main
stage

feature/*
infra/*
platform/*
fix/*
```

예시:

```bash id="jlwm171"
feature/auth-login
feature/payment-confirm
infra/k8s-ingress
platform/observability
```

---

# Architecture Principles

* Premature Overengineering 지양
* Pragmatic 하지만 확장 가능한 구조 우선
* Bounded Context Ownership 최적화
* AI-Agent Collaboration 최적화
* PR 기반 Workflow 최적화
* Orchestration Scalability 고려
* Explicit Artifact 중심 구조

---

# ADR (Architecture Decision Records)

예정 ADR:

```bash id="jlwm172"
ADR-001-monorepo.md
ADR-002-nestjs.md
ADR-003-react-frontend.md
ADR-004-kubernetes-local.md
ADR-005-nginx-gateway.md
ADR-006-redis-session.md
```

---

# CI/CD

GitHub Actions 기반 Workflow 사용 예정

예정 Pipeline:

* lint
* test
* build
* PR validation
* stage validation
* deployment preparation

---

# License

MIT License

---

# Long-Term Direction

본 프로젝트는 다음을 탐구합니다.

* AI-native Engineering Organization
* Autonomous Development Workflow
* Multi-Agent Collaboration
* Orchestrated Software Delivery
* Cloud-Native Delivery System
* Scalable Platform Engineering Model

이 Repository 는 단순 Commerce Application 을 넘어,
AI-native Software Engineering Platform 으로 발전하는 것을 목표로 합니다.
