# 프로젝트 동기화 기준

## 목적

작업을 PM, 자료 큐레이션, 개발, QA, 배포로 나누어 진행하더라도 모든 작업자가 같은 프로젝트 계획과 진행 상태를 보도록 하는 공유 기준이다.

이 문서는 새 세션, 병렬 작업 시작, 작업 인수인계, savepoint 커밋 전후에 반드시 확인한다.

## 공유 기준 파일

| 파일 | 역할 | 언제 확인하는가 |
|---|---|---|
| `.agents/handoff.md` | 현재 상태, 최근 결정, 다음 작업 | 모든 세션 시작 시 |
| `.agents/CONTINUATION.md` | 토큰 리밋/재시작 복구 절차 | 세션 재개 또는 문제가 있을 때 |
| `docs/PROJECT_SYNC.md` | 공유 기준 파일과 동기화 규칙 | 병렬 작업 시작 전 |
| `PROJECT_PLAN.md` | 장기 제품 방향과 전체 기획 | 큰 방향 변경 또는 외부 공유 전 |
| `docs/REQUIREMENTS_VALIDATION_CRITERIA.md` | 요구사항과 검증 기준의 원본 | 기능, 자료, QA 작업 전 |
| `docs/PM_ACTION_PLAN.md` | PM 우선순위와 파일럿 판단 기준 | 범위/우선순위 결정 전 |
| `docs/WORKSTREAMS.md` | 병렬 작업 구조와 파일 소유권 | 작업을 나누기 전 |
| `docs/RESOURCE_CURATION_POLICY.md` | 자료 수집/검수 기준 | 자료 후보 수집 전 |
| `docs/ARCHITECTURE_DECISIONS.md` | 유지보수와 마이그레이션 결정 | 구조 변경 전 |
| `docs/QA_CHECKLIST.md` | 요구사항별 검증 절차 | 검증 작업 시 |
| `docs/QA_RESULTS_*.md` | 특정 실행일의 QA 결과와 남은 실패/보류 항목 | 검증 실행 후 또는 다음 세션 인계 전 |

## 동기화 규칙

1. 새 작업을 시작하면 `.agents/handoff.md`, `.agents/CONTINUATION.md`, `docs/PROJECT_SYNC.md`를 먼저 읽는다.
2. 작업이 기능, 자료, QA, 운영 중 하나라도 바꾸면 `docs/REQUIREMENTS_VALIDATION_CRITERIA.md`의 요구사항 ID에 연결한다.
3. 작업 흐름을 나눌 때는 `docs/WORKSTREAMS.md`의 파일 소유권을 따른다.
4. 공유 기준 파일을 수정하면 `.agents/handoff.md`에도 변경 내용을 짧게 남긴다.
5. 큰 방향, 범위, 우선순위가 바뀌면 `PROJECT_PLAN.md` 또는 `docs/PM_ACTION_PLAN.md` 중 맞는 파일을 업데이트한다.
6. 요구사항이나 검증 기준이 바뀌면 `docs/QA_CHECKLIST.md`도 함께 맞춘다.
7. QA를 실행하면 기준 문서가 아니라 `docs/QA_RESULTS_*.md`에 실행 결과를 남기고, 남은 P0 실패는 `.agents/handoff.md`에 요약한다.
8. 구조나 데이터 경계가 바뀌면 `docs/ARCHITECTURE_DECISIONS.md`에 결정 이유를 남긴다.
9. 자료 선별 기준이 바뀌면 `docs/RESOURCE_CURATION_POLICY.md`에 반영한다.
10. 작업 종료 전 `git status --short`와 `git log --oneline @{u}..`를 확인한다.
11. 재시작 위험, 토큰 리밋, 인수인계, 공유 기준 파일 변경이 있으면 savepoint 커밋 후 푸시한다.

## 병렬 작업 시작 체크

작업자가 나뉘면 각 작업자는 아래를 확인한다.

- 맡은 작업 흐름은 무엇인가?
- 수정할 파일 소유권이 겹치지 않는가?
- 연결되는 요구사항 ID는 무엇인가?
- 검증 방법은 무엇인가?
- 결과를 어느 공유 기준 파일에 기록할 것인가?

## 공유 기준 변경 원칙

공유 기준 파일은 자주 바꾸지 않는다. 단, 다음 경우에는 반드시 업데이트한다.

- MVP 범위가 바뀐다.
- P0/P1 우선순위가 바뀐다.
- 자료 검수 기준이 바뀐다.
- 데이터 구조나 배포 구조가 바뀐다.
- QA에서 반복적으로 같은 실패가 나온다.
- 다음 세션이 이어받기 어려운 결정이 생긴다.

## 다음 세션 시작 순서

```text
1. Read .agents/handoff.md
2. Read .agents/CONTINUATION.md
3. Read docs/PROJECT_SYNC.md
4. Run git status --short
5. Run git log --oneline @{u}..
6. If local changes or unpushed commits exist, create/push a savepoint when appropriate.
7. Continue from the smallest P0 requirement or current PM checkpoint.
```
