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

## 추가 진행 - 교육 정합성 심화 검토

사용자가 요청한 "더 많고 더 깊은 관계있는 교육 연결"과 "직무역량이 해당 직무와 제대로 연결되어 있는지"를 별도 감사 기준으로 추가했다.

- 96개 세부 직무의 직무역량 진단 문구가 직무 본문, 키워드, 산출물 설명과 맞는지 검사했다.
- 각 직무에서 최소 3개 이상의 직무역량이 검수된 직접 연결 또는 상위 추천 교육자료로 보강되는지 검사했다.
- 초기 심화 감사에서는 24개 직무가 `weak_role_competency_education_coverage`로 잡혔다.
- 직무역량 문구 자체의 직무 정합성 문제는 0건이었다. 약점은 역량 문구가 아니라, 해당 역량을 보완하는 교육자료 연결이 명시적으로 부족한 점이었다.
- `roleCompetencyResourceLinks`를 추가해 직무별 역량과 교육자료를 직접 연결했다.
- 기계/CAE, 자동차, 생산품질, 화학공정, 항공방산, 로보틱스, 에너지, AI 엔지니어링, 데이터센터 인프라, 제조 DX, 화학 지속가능성 영역의 24개 직무를 보강했다.

심화 감사 후 결과:

- `weakRoleCompetencyTextAlignment`: 0
- `weakRoleCompetencyEducationCoverage`: 0
- 전체 교육 정합성 이슈: 0

## 검증 결과

| 명령/확인 | 결과 | 비고 |
| --- | --- | --- |
| `npm.cmd run audit:education` | PASS | 16개 트랙, 96개 직무, P0/P1/P2 0건 |
| `npm.cmd run validate:data` | PASS | `roleCompetencyResourceLinks` 24개 직무 참조 검증 포함 |
| `npm.cmd run validate:posting` | PASS | 11개 fixture 통과 |
| `npm.cmd run check` | PASS | 데이터 검증, 공고 QA, Vite build 통과 |
| `node --check app.js` | PASS | 문법 오류 없음 |
| `node --check scripts/validate-posting-qa.mjs` | PASS | 문법 오류 없음 |
| Edge headless 렌더링 QA | PASS | desktop 1366px, mobile 390px 모두 visible overflow 0건 |

## 현재 남은 작업

1. 현재 교육 정합성 심화 변경을 커밋하고 푸시한다.
2. Cloudflare Pages 배포 URL에서 최신 asset, `오늘 시작할 1개` 근거 라벨, 보강된 직무별 교육 추천을 표본 확인한다.
3. UI에서 심화 보강 대상 24개 직무 중 5~8개를 골라 추천 교육이 실제 카드/로드맵에서 납득 가능하게 보이는지 브라우저 샘플링한다.
4. 학생 파일럿에서는 "직무역량은 맞아 보이나", "추천 교육이 그 역량을 보완한다고 느껴지나", "너무 일반적인 자료가 먼저 나오지 않나"를 별도 질문으로 수집한다.
