# 교육 정합성 검토 2026-07-01

## 목적

추천 교육이 선택 직무와 실제로 맞는지 재검토했다. 특히 상위 추천, Starter Pack, 로드맵 과제별 추천이 검수된 자료 중심으로 노출되는지와 산업 필터 선택 시 관련 직무가 빠지지 않는지를 확인했다.

## 감사 기준

- Starter Pack은 `reviewed` 또는 `verified`이고 `broad`가 아닌 자료만 허용한다.
- 상위 추천 8개는 검수된 집중 자료가 충분히 포함되어야 한다.
- 직무에 직접 연결된 검수 자료가 충분하면 상위 추천에도 직접 연결 자료가 3개 이상 들어와야 한다.
- 로드맵 과제별 추천에는 검수된 자료 중 직무 직접 연결 또는 과제 직접 연결 근거가 있어야 한다.
- 역할의 `industries` 값은 부모 트랙의 `industries`와 모순되면 안 된다.
- 직무역량 진단 문구는 해당 직무 본문, 키워드, 산출물 설명과 맞아야 한다.
- 각 직무는 최소 3개 이상의 직무역량이 검수된 직접 연결 또는 상위 추천 교육자료로 보강되어야 한다.

## 수정 전 이슈

새 감사 스크립트 기준으로 초기 결과는 16개 트랙, 96개 역할 중 26개 이슈였다.

- P0: 0
- P1: 19
- P2: 7
- Starter Pack 누락: 0
- 낮은 신뢰 상위 추천: 6
- 직무-트랙 산업 필터 불일치: 13
- 직무 선택 불가: 0

## 반영 내용

- `scripts/audit-education-alignment.mjs`를 추가하고 `npm run audit:education`으로 실행할 수 있게 했다.
- 바이오, 전자, 방산, 에너지, 화학, 로보틱스 등 역할 산업 태그가 부모 트랙 필터에서 누락되는 문제를 보정했다.
- 반도체 후공정·패키징·테스트와 스마트팩토리·제조 DX 트랙에 NIST, MathWorks, Google, freeCodeCamp 등 검수된 데이터·통계·공정능력 자료를 연결했다.
- 내외장·의장 설계 로드맵이 전력전자/차량 네트워크 자료를 우선 추천하던 문제를 줄이기 위해 MIT 설계·재료역학 자료와 Ansys 자료를 자동차 로드맵 과제 및 직무 링크에 연결했다.
- MIT Design and Manufacturing I는 공식 MIT OCW 자료로 `reviewed` 처리하고 자동차 설계 직무에도 사용할 수 있게 했다.

## 수정 후 결과

`npm run audit:education` 결과:

- 트랙: 16
- 역할: 96
- 감사 완료 역할: 96
- 전체 이슈: 0
- P0/P1/P2: 0/0/0
- Starter Pack 누락: 0
- 낮은 신뢰 상위 추천: 0
- 낮은 직무 직접 연결 상위 추천: 0
- 직무-트랙 산업 필터 불일치: 0
- 직무 선택 불가: 0

## 심화 검토 결과

직무역량과 교육자료의 연결 깊이를 추가로 감사했다. 첫 심화 감사에서는 24개 직무가 `weak_role_competency_education_coverage`로 잡혔다.

결론:

- 직무역량 문구 자체가 직무와 맞지 않는 문제는 0건이었다.
- 약점은 역량 문구가 아니라, 해당 역량을 보완하는 검수 교육자료가 명시적으로 충분히 연결되지 않은 점이었다.
- `roleCompetencyResourceLinks`를 추가해 직무별 역량과 교육자료를 직접 연결했다.
- 기계/CAE, 자동차, 생산품질, 화학공정, 항공방산, 로보틱스, 에너지, AI 엔지니어링, 데이터센터 인프라, 제조 DX, 화학 지속가능성의 24개 직무를 보강했다.

심화 보강 후 `npm run audit:education` 결과:

- `lowRoleCompetencyCount`: 0
- `weakRoleCompetencyTextAlignment`: 0
- `weakRoleCompetencyEducationCoverage`: 0

## 검증

- `npm run audit:education`: 통과
- `npm run validate:data`: 통과
- `npm run validate:posting`: 통과
- `npm run check`: 통과

참고: 이번 심화 재검증에서는 데이터 검증, 공고 QA, Vite 빌드까지 같은 `npm run check` 흐름에서 통과했다.
