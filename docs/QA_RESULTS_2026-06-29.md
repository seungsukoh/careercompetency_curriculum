# QA 실행 기록 - 2026-06-29

## 범위

이번 기록은 최신 제품 흐름인 `직무 선택 -> 워드클라우드 -> 역량 체크 -> 교육 선택 -> 내 커리큘럼 -> 엑셀 내보내기`를 기준으로 한 자동 검증과 로직 검증 결과다.

실제 브라우저 렌더링 QA는 이번 세션에서 인앱 브라우저 `iab`가 제공되지 않았고 Chrome/Edge 실행 파일도 PATH에서 확인되지 않아 보류했다.

## 실행한 확인

- `node --check app.js`: 통과
- `node --check data/roleExpansions.js`: 통과
- `npm.cmd run validate:data`: 통과
- `npm.cmd run check`: 통과

데이터 감사 결과:

```json
{
  "tracks": 16,
  "roles": 96,
  "resources": 123,
  "roleResourceLinks": 96,
  "warnings": 0,
  "errors": 0
}
```

Vite 빌드 결과:

- `dist/index.html`
- `dist/assets/index-*.css`
- `dist/assets/role-expansions-*.js`
- `dist/assets/index-*.js`

## VM 기반 로직 QA

브라우저 DOM 대신 앱 seed와 함수 로직을 VM에서 실행해 핵심 계산을 확인했다.

검증 페르소나:

- 전공: 전자공학
- 관심 산업: 전자·하드웨어
- 직무군: 임베디드·제어
- 세부 직무: 임베디드 펌웨어 엔지니어

기간별 로드맵:

| 준비 기간 | 생성 주차 | 첫 주 과제 | 첫 주 추천 교육 |
|---|---:|---|---|
| 2주 | 2 | 임베디드 펌웨어 엔지니어 직무상세 분해 | STM32 MOOC GPIO·Timer·UART 핵심 단원, Arm Embedded Systems Education Kit 핵심 자료 |
| 4주 | 4 | 임베디드 펌웨어 엔지니어 직무상세 분해 | STM32 MOOC GPIO·Timer·UART 핵심 단원, Arm Embedded Systems Education Kit 핵심 자료 |
| 8주 | 8 | 임베디드 펌웨어 엔지니어 직무상세 분해 | STM32 MOOC GPIO·Timer·UART 핵심 단원, Arm Embedded Systems Education Kit 핵심 자료 |
| 12주 | 12 | 임베디드 펌웨어 엔지니어 직무상세 분해 | STM32 MOOC GPIO·Timer·UART 핵심 단원, Arm Embedded Systems Education Kit 핵심 자료 |

학습목표 반영 검증:

- 품질보증·품질관리 엔지니어 기준으로 `explore`, `foundation`, `portfolio`, `interview` 목표를 바꾸면 과제 순서 또는 추천 자료 순위가 달라졌다.
- `portfolio` 목표에서는 `SPC 산출물 작성` 과제가 `SPC 핵심 역량 보완`보다 앞에 배치되었다.

엑셀 내보내기 로직:

| 시트 | 행 수 |
|---|---:|
| 요약 | 18 |
| 실행계획 | 5 |
| 선택직무상세 | 30 |
| 회사공고대조 | 26 |
| 교육자료 | 14 |
| 역량체크 | 14 |

## 요구사항별 상태

| ID | 상태 | 근거 |
|---|---|---|
| R1 | 자동 통과 | 데이터 감사에서 16개 직무군과 96개 세부 직무가 검증됨 |
| R2 | 부분 통과 | 워드클라우드 렌더링 함수와 용어 생성 로직은 존재하나 실제 브라우저 시각 검증 필요 |
| R3 | 자동 통과 | 역할별 상세 필드와 진단 항목 누락 없음 |
| R4 | 자동 통과 | 모든 세부 직무에 role diagnostics가 있음 |
| R5 | 자동 통과 | 학습목표 변경 시 품질 직무의 과제/자료 우선순위 변화 확인 |
| R6 | 자동 통과 | 2/4/8/12주 생성 주차 수 확인 |
| R7 | 자동 통과 | 주차별 추천 교육자료 생성 확인 |
| R8 | 자동 통과 | 직무 직접 연결, 결핍 역량, 목표, 기간, MathWorks 필요 신호를 점수 계산에 사용 |
| R9 | 부분 통과 | 내 커리큘럼 로드맵/완료 상태 로직은 확인했으나 실제 클릭/새로고침 검증 필요 |
| R10 | 자동 통과 | `.xls` 워크북 6개 시트 생성 확인 |
| R11 | 통과 | 월간 검수 운영안과 seed 기반 워드클라우드 갱신 절차 문서화 |
| R12 | 통과 | `npm.cmd run check`로 정적 Vite 빌드 성공 |
| R13 | 통과 | 자료 카드는 원문 복제 없이 제목, 추천 이유, 산출물, 원본 링크 중심 구조 유지 |

## 보류

실제 브라우저에서 다음을 아직 확인해야 한다.

- 데스크톱 1280px 이상에서 직무 선택 후 워드클라우드가 바로 보이는지
- 모바일 390px 안팎에서 탭, 카드, 워드클라우드, 버튼 텍스트가 넘치지 않는지
- 체크박스 선택 후 역량 확보율과 추천이 화면에서 즉시 갱신되는지
- `내 커리큘럼에 추가`, 주차 완료 체크, 새로고침 후 localStorage 유지가 실제 브라우저에서 동작하는지
- `.xls` 다운로드가 데스크톱/모바일 브라우저에서 시작되는지
- Cloudflare Pages 배포 URL에서 같은 흐름이 동작하는지

## 다음 작업

1. 실제 브라우저 QA를 수행한다.
2. 실패 항목이 있으면 P0/P1로 분류해 수정한다.
3. 통과 후 savepoint 커밋과 푸시를 수행한다.
4. Cloudflare Pages 배포 URL에서 smoke test를 진행한다.
