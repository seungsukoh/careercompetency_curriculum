# 병렬 진행 구조

## 원칙

작업은 역할이 아니라 소유 영역 기준으로 나눈다. 각 작업 흐름은 가능한 한 서로 다른 파일을 수정하게 해서 충돌을 줄인다.

## 작업 흐름

| 흐름 | 목적 | 주요 산출물 | 소유 파일 |
|---|---|---|---|
| PM/전략 | 제품 범위, 파일럿 목표, 검증 질문 결정 | 전략 문서, 우선순위 | `docs/PRODUCT_STRATEGY_REVIEW.md`, `PROJECT_PLAN.md` |
| 자료 큐레이션 | 한국어 자료 후보 수집, 검수 기준, 추천 순서 결정 | 자료 후보 목록, 검수 상태 | `docs/RESOURCE_CURATION_POLICY.md`, 추후 `data/resources.json` |
| 데이터 모델 | 자료/직무/로드맵 스키마와 마이그레이션 경계 관리 | resource schema, progress schema | `app.js`, 추후 `data/*.json` |
| 앱 UI/UX | 학생이 보는 화면, 저장/완료 체크, 모바일 사용성 | 정적 PWA 화면 | `index.html`, `styles.css`, `app.js` |
| 검증/QA | 브라우저 동작, 모바일 레이아웃, 저장/복사 흐름 확인 | 검수 결과, 버그 목록 | `README.md`, 필요 시 `docs/QA_CHECKLIST.md` |
| 배포/운영 | Cloudflare Pages 배포, 캐시, 업데이트 절차 | 배포 절차, 운영 절차 | `README.md`, `sw.js`, `manifest.webmanifest` |

## 병렬 작업 규칙

- 한 작업자는 한 번에 하나의 흐름을 맡는다.
- 같은 파일을 여러 작업자가 동시에 수정하지 않는다.
- 모든 작업은 `docs/REQUIREMENTS_VALIDATION_CRITERIA.md`의 요구사항 ID에 연결한다.
- 데이터 스키마 변경은 UI 작업 전에 먼저 합의한다.
- 자료 큐레이션은 앱 코드와 분리해 진행한다.
- UI 작업자는 자료의 품질을 판단하지 않고, 정해진 필드를 화면에 잘 표시하는 데 집중한다.
- QA 작업자는 구현을 고치기보다 요구사항 ID별 재현 절차와 기대 결과를 남긴다.

## 권장 작업 순서

1. 데이터 모델 흐름이 `resource` 필드와 진행상태 필드를 확정한다.
2. 앱 UI/UX 흐름이 확정된 필드를 화면에 표시한다.
3. 자료 큐레이션 흐름이 트랙별 최소 자료 묶음을 채운다.
4. QA 흐름이 모바일/데스크톱 핵심 플로우를 검증한다.
5. PM/전략 흐름이 학생 파일럿 질문과 성공 기준을 조정한다.
6. 배포/운영 흐름이 Cloudflare Pages와 PWA 캐시 정책을 정리한다.

## 현재 바로 병렬화 가능한 일

| 작업 | 담당 흐름 | 충돌 위험 | 비고 |
|---|---|---|---|
| 한국어 자료 후보 25개 수집 | 자료 큐레이션 | 낮음 | 앱 코드 수정 없이 문서/데이터 후보로 진행 |
| 자료 카드 UI 개선 | 앱 UI/UX | 중간 | `app.js`, `styles.css` 수정 |
| 브라우저 QA 체크리스트 작성 | 검증/QA | 낮음 | `docs/QA_CHECKLIST.md` 신규 작성 |
| Cloudflare 배포 절차 보강 | 배포/운영 | 낮음 | `README.md` 중심 |
| 학생 5명 파일럿 질문 정리 | PM/전략 | 낮음 | `docs/FREE_PILOT_PLAYBOOK.md` 중심 |

## 향후 파일 분리

병렬 작업이 늘어나면 `app.js`의 seed 데이터를 분리한다.

```text
data/tracks.json
data/resources.json
data/roadmaps.json
data/diagnostics.json
```

이후 앱 개발자는 렌더링 로직을, 자료 큐레이션 담당자는 JSON 데이터를, QA 담당자는 검증 문서를 독립적으로 다룰 수 있다.
