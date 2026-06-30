# PM Progress - 2026-07-01

## Executive Summary

`오늘 시작할 1개` 추천이 왜 선택됐는지 사용자가 화면에서 바로 볼 수 있도록 근거 표시를 추가했다. 추천 순위 계산은 유지하고, 기존 점수화에 쓰던 신호를 카드 안에 짧은 라벨로 노출하는 방식이다.

## 완료한 변경

- `오늘 시작할 1개` 자료에 추천 근거 라벨을 추가했다.
  - 공고 신호
  - 보완 역량
  - 체크 반영
  - 직무 연결
  - 자료 신뢰
  - 오늘 순서
- 공고 QA가 오늘 시작 자료뿐 아니라 근거 라벨도 검증하도록 보강했다.
- 데스크톱과 모바일에서 추천 근거 블록이 카드 폭을 넘지 않도록 스타일을 추가했다.

## 검증 결과

| 명령/확인 | 결과 | 비고 |
| --- | --- | --- |
| `node --check app.js` | PASS | 문법 오류 없음 |
| `node --check scripts/validate-posting-qa.mjs` | PASS | 문법 오류 없음 |
| `npm.cmd run validate:posting` | PASS | 11개 fixture, 오늘 시작 근거 라벨 검증 포함 |
| `npm.cmd run check` | PASS | 데이터 검증, 공고 QA, Vite build 통과 |
| Edge headless 렌더링 QA | PASS | desktop 1366px, mobile 390px 모두 visible overflow 0건 |

## 현재 남은 작업

1. 현재 변경을 savepoint 커밋하고 푸시한다.
2. Cloudflare Pages 배포 URL에서 최신 asset과 `오늘 시작할 1개` 근거 라벨을 확인한다.
3. 학생 파일럿에서 추천 근거 라벨이 실제로 납득 가능한지 피드백을 수집한다.
