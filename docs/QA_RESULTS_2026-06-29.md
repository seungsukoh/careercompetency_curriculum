# QA 실행 기록 - 2026-06-29

## 범위

이번 기록은 최신 제품 흐름인 `직무 선택 -> 워드클라우드 -> 역량 체크 -> 교육 선택 -> 내 커리큘럼 -> 엑셀 내보내기`를 기준으로 한 자동 검증과 로직 검증 결과다.

실제 브라우저 렌더링 QA는 인앱 브라우저 `iab`가 제공되지 않아 Edge headless와 Vite preview 조합으로 일부 대체 수행했다.

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

## 추가 검증 - 자료 큐레이션 보강

사용자 피드백에 따라 영어/한국어 언어 표기, 볼 단원/섹션, 필수 Starter Pack 안내를 보강한 뒤 동일한 자동 검증을 재실행했다.

확인 결과:

- 자료 카드, 로드맵 주차 자료, 추천 교육 요약, 내 커리큘럼 상세, 참고자료 상세, 엑셀 `교육자료` 시트에 볼 단원/섹션 정보가 포함된다.
- 영어/한국어 표기는 자료 카드 배지와 주요 추천 목록 메타데이터에 노출된다.
- `core: true` 자료는 필수 Starter Pack으로 정규화되어 교육 선택 화면에서 먼저 완료할 핵심 자료로 안내된다.
- 검색 페이지나 플랫폼성 한국어 후보는 `candidate`와 `broad`로 유지하고, 직접 예제/문서/단원이 명확한 후보만 `reviewed`로 승격했다.

## 추가 검증 - 학생 페르소나 리뷰

`docs/STUDENT_PERSONA_REVIEW_2026-06-29.md`에 6개 학생 페르소나를 정의하고 VM 기반 로직 점검을 수행했다.

- P1 CAE, P2 임베디드, P3 반도체 식각, P4 전력전자·ESS, P5 제조 AI, P6 데이터센터 전력 인프라를 확인했다.
- 모든 페르소나에서 진단 항목은 11-13개, 주차별 추천 자료는 최소 3개 이상이었다.
- 상위 8개 추천 자료의 `recommendedSections` 누락은 없었다.
- 점검 중 P5 제조 AI와 P6 데이터센터의 Starter Pack 공백을 발견했다. P5는 Google/Machine Learning Onramp로 보정했고, P6은 이후 링크 재검증에서 Schneider 자료를 제외하고 KDCC 한국어 자료로 교체했다.
- 당시 잔여 리스크는 전력전자·ESS, 데이터센터, 반도체 식각의 한국어 직접 강좌가 broad candidate 위주라는 점이었다. 아래 한국어 직접 강의 승격에서 P3/P4를 보완했고, 링크 재검증에서 P6의 한국어 기본 자료를 보완했다.

## 추가 검증 - 한국어 직접 강의 승격

P3/P4 약점으로 남았던 한국어 직접 강의 부족을 보완했다.

- P3 반도체 식각: KOCW `반도체 공정` 강좌를 `reviewed` Starter Pack으로 추가하고, `9. 광학 리소그라피와 10. 고급 리소그라피`, `11. 건식각`, `12. 습식각과 세정`, `13. CMOS 종합공정`을 볼 단원으로 지정했다.
- P4 전력전자·ESS: KOCW `전력전자시스템 해석` 강좌를 `reviewed` Starter Pack으로 추가하고, 스위치 소자, PWM 컨버터, 3상 인버터, PSIM, BLDC 드라이버 실습 단원을 지정했다.
- P6 데이터센터: KOCW에서 데이터센터 UPS/전력 직접 강좌는 찾지 못했다. 대신 KDCC `데이터센터 구축 및 운영 활성화를 위한 제도 연구` PDF를 확인해 데이터센터 구성요소, 전력·냉각 인프라, 에너지 효율, 시설 기준 섹션을 Starter Pack으로 승격했다. HRD-Net 데이터센터 전력/UPS 후보는 candidate로 남겼다.

## 추가 검증 - 링크 접근성 재점검

사용자 지적에 따라 학생이 실제로 열 링크를 본문 GET 기준으로 재확인했다.

- Schneider `Data Center University`: `Invoke-WebRequest` GET 기준 403으로 확인되어 `reviewed`와 Starter Pack에서 제외했다. 후보 CSV에는 `candidate`로만 남기고 직접 수강 페이지 확인 전 승격 금지로 기록했다.
- KOCW `반도체 공정`: GET 200, 제목 `반도체 공정 - 충북대학교 | KOCW 공개 강의`, 본문 키워드 `강의`, `건식각` 확인.
- KOCW `전력전자시스템 해석`: GET 200, 제목 `전력전자시스템 해석 - 성균관대학교 | KOCW 공개 강의`, 본문 키워드 `강의`, `PWM` 확인.
- KDCC PDF: HEAD 200, `Content-Length: 3008171`, 파일명 `데이터센터 구축 및 운영 활성화를 위한 제도연구 최종보고서.pdf` 확인. 로컬 추출 기준 58쪽 본문과 목차를 확인했다.
- Starter Pack 로직: `candidate` 또는 `reviewNeeded` 자료는 `core: true`여도 필수 Starter Pack에 노출되지 않도록 보정했다. VM 재점검 기준 candidate Starter Pack은 0개다.
- Starter Pack 링크 감사: 필수 자료 40개를 GET 기준으로 일괄 확인했을 때 6개 실패가 있었다. MIT Mechanics URL 슬러그, SparkFun 회로 기초 대체, TI Power Management 공식 개요, iSixSigma FMEA, Quality-One 8D로 수정했고, Semiconductor Engineering 식각 상세는 candidate로 내렸다. 최종 재검사 기준 필수 Starter Pack 39개 중 실패 0개다.

## 추가 검증 - Starter Pack 브라우저 QA

2026-06-30에 빌드 산출물을 `npm.cmd run preview -- --host 127.0.0.1 --port 4173`로 열고 Edge headless에서 P6 데이터센터 전력설비 페르소나를 확인했다.

- 전공: 전기공학
- 준비 기간: 4주 기본
- 세부 직무: 데이터센터 전력설비 엔지니어
- 확인 화면: 교육 선택

확인 결과:

- `필수 Starter Pack` 영역이 교육 선택 화면 상단에 노출된다.
- 안내 문구는 "선택 과제가 아니라 먼저 완료할 기본 역량"으로 읽힌다.
- Starter Pack에는 KDCC 한국어 PDF와 NI Learn 자료가 노출되며, candidate 자료는 포함되지 않는다.
- 데스크톱 1366x900과 모바일 390x844에서 Starter Pack 카드의 `볼 단원/섹션` 텍스트가 카드 밖으로 넘치지 않았다.
- DOM 폭 검사 기준 Starter Pack/추천 요약 패널의 정보 행 오버플로는 0건이었다.
- 수행 기준 문장에서 산출물명 뒤에 조사가 어색하게 붙는 문제도 재검증 기준 발견되지 않았다.
- 확인 스크린샷: `tmp/qa-desktop.png`, `tmp/qa-mobile.png`

VM 재점검 결과:

| 페르소나 | Starter Pack 변화 | 상위 8개 reviewed/verified | 상위 8개 한국어 | 주차별 최소 자료 | 단원/섹션 누락 |
|---|---|---:|---:|---:|---|
| P3 | KOCW 반도체 공정 추가, 깨진 Plasma Etch 상세는 candidate로 하향 | 8/8 | 1/8 | 3 | 없음 |
| P4 | KOCW 전력전자 최상위 추가 | 8/8 | 1/8 | 3 | 없음 |
| P6 | Smartspace, KDCC, 한국전기기술인협회 한국어 Starter Pack 추가, Schneider 제외 | 7/8 | 4/8 | 3 | 없음 |

## 추가 검증 - P6 데이터센터 정합성 보강

2026-06-30에 P6 데이터센터 전력설비 페르소나의 하위 추천 정합성을 다시 점검했다.

- Smartspace `데이터센터 전기설비 구성 및 설계 가이드`: GET 200과 본문 키워드 `UPS`, `수전`, `변전`, `배전`, `비상발전기`, `접지`, `전력 모니터링`, `데이터센터`를 확인해 reviewed Starter Pack으로 추가했다.
- 한국전기기술인협회 `자가용전기설비 운전 및 유지관리`: GET 200과 `수배전설비 표준결선도`, `특고압기기 점검`, `차단기 및 개폐기 조작 실습`, `정전 및 복전 실습`, `고장예방` 훈련 내용을 확인해 reviewed Starter Pack으로 추가했다.
- 최신 VM 감사 기준 P6 상위 8개 추천은 reviewed/verified 7개, 한국어 4개다. 상위 1-3위는 Smartspace, KDCC, 한국전기기술인협회로 모두 한국어 직접 자료다.
- P4 전력전자·ESS에는 한국전기기술인협회 자료가 하위 추천으로 섞이지 않도록 해당 자료의 트랙 범위를 `data-center-infra`로 제한했다. P4 상위 8개는 다시 reviewed/verified 8/8이다.
- 남은 약점: P6 8위 GSEEK는 candidate 보조 후보라 핵심 추천으로 보지 않는다. 상위 1-7위는 과제·역할 연결성이 높다.

## 추가 검증 - 브라우저 흐름 QA

2026-06-30에 Edge/Chrome headless CDP로 P6 흐름을 재검증했다.

- 데스크톱 1366x900과 모바일 390x844에서 직무상세 워드클라우드가 표시되고 가로 오버플로가 없었다.
- 역량 체크박스 1개 선택 시 확보율이 0%에서 8%로 갱신되고 `careerCompetencyPilot` localStorage에 체크 키가 저장됐다.
- 교육 선택 화면에서 Smartspace, KDCC, 한국전기기술인협회가 필수 Starter Pack에 표시되고, 모바일 Starter Pack 카드 오버플로는 0건이었다.
- `내 커리큘럼에 추가`와 주차 완료 체크 후 새로고침해도 저장 자료와 완료 주차는 localStorage에 유지됐다. 새로고침 직후 화면은 직무 탭으로 돌아가지만 `내 커리큘럼` 탭을 열면 복원된 상태가 보인다.
- `.xls` 내보내기는 headless 브라우저에서 실제 파일이 남지 않아 Blob/anchor 계측으로 검증했다. 생성 파일명은 `직무역량_내계획_데이터센터_전력·열관리_2026-06-30.xls`, MIME은 `application/vnd.ms-excel;charset=utf-8`, 워크북 시트 6개와 Smartspace 자료·볼 단원/섹션 포함을 확인했다.

최신 데이터 감사 결과:

```json
{
  "tracks": 16,
  "roles": 96,
  "resources": 127,
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

## 추가 검증 - 전공/직무/교육 매칭 재감사

2026-06-30에 사용자가 강조한 `전공과 직무 매칭`, `직무와 교육 매칭`을 별도 VM 감사로 재점검했다.

전공-직무 매칭 결과:

| 조건 | 전체 | 전공 직결 | 전공 확장 | 도전 직무 | 비고 |
|---|---:|---:|---:|---:|---|
| 기계공학 / 전체 | 41 | 15 | 26 | 0 | 전체 보기에서 도전 직무 숨김 |
| 전기공학 / 전체 | 61 | 35 | 26 | 0 | 전자·제어·반도체·차량 전장 중심 |
| 전력·전기설비 / 전체 | 34 | 9 | 25 | 0 | 전력·ESS·데이터센터 직결 축소 |
| 화학공학 / 전체 | 41 | 19 | 22 | 0 | 화공·반도체 공정 중심 |
| 기계공학 / AI | 11 | 0 | 6 | 5 | 자동차·화학 기본 직무 누수 제거 |
| 화학공학 / AI | 7 | 0 | 6 | 1 | AI 관련 세부 직무만 노출 |
| 전력·전기설비 / 인프라 | 3 | 2 | 1 | 0 | 데이터센터 전력·DCIM 직결 |

직무-교육 매칭 결과:

| 페르소나 | 상위 3개 추천 | Starter Pack | 후보/broad 처리 |
|---|---|---|---|
| P1 CAE | MIT FEA, Ansys, MIT Mechanics | 모두 reviewed, 직무 직접 연결 | KOCW 후보는 참고자료 후보로 후순위 |
| P2 임베디드 | STM32 MOOC, Arm, STM32 Education | 모두 reviewed, 직무 직접 연결 | KOCW/인프런 broad 후보는 상위 8개와 Starter Pack 제외 |
| P3 식각 | KOCW 반도체 공정, MIT Semiconductor, Statistics Onramp | reviewed/verified 직접 연결 | 렛유인 후보는 상위 8개 밖 실습 보조 후보로 유지 |
| P4 전력전자 | TI Power, KOCW 전력전자, Motor Control | 모두 reviewed/verified 직접 연결 | 후보 자료 없음 |
| P5 예지보전 AI | Predictive Maintenance, Google ML, Machine Learning Onramp | 모두 reviewed/verified 직접 연결 | ROS/Jetson 계열은 핵심 상위 추천에서 제외 |
| P6 데이터센터 전력 | Smartspace, KDCC, 한국전기기술인협회 | 모두 reviewed, 직무 직접 연결 | GSEEK는 8위 보조 후보 수준 |

조치:

- `전공 직결 / 전공 확장 / 도전 직무` 3단계 분류를 도입했다.
- 산업 필터를 세부 직무의 `industries` 기준으로 엄격화했다. 트랙에만 `ai` 태그가 있어 `all` 역할이 새어 들어오는 fallback을 제거했다.
- `candidate`, `reviewNeeded`, `broad` 교육 자료에 점수 패널티를 추가해 검수 자료가 Starter Pack과 상위 추천을 우선 차지하도록 했다.
- 추천 메인 정렬에서 reviewed/verified 비후보 자료를 후보 자료보다 우선하도록 했다. P1/P2/P3/P4/P5는 상위 8개가 모두 reviewed/verified이고, P6은 검수 자료 7개 다음 8번째에만 GSEEK 보조 후보가 남는다.
- AI 산업 공통 진단에서 자율주행 전용 `자율주행 AI`를 제거하고 일반 `AI 적용 기준`으로 교체했다.
- P5 예지보전 AI는 ROS Toolbox를 AI 적용 직무군 후보에서 제외하고, Statistics Onramp, Coursera Engineering Data, freeCodeCamp Python·데이터 프로젝트를 직무 직접 교육으로 보강했다. 최신 VM 감사 기준 선택 직무 순위는 5위에서 1위로 올랐고, 주차별 상위 추천은 예지보전, ML, 통계, 공학 데이터 중심으로 정렬된다.
- 주차별 상세 추천과 실습 후보 정렬에도 같은 신뢰도 우선 기준을 적용했다. Chrome headless 브라우저 QA 기준 P1/P3/P6의 desktop/mobile 6개 화면 모두 상세 추천 상위 4개에 후보 자료가 없고, 가로 오버플로는 0건이었다.
- MathWorks `MATLAB Onramp`는 공식 교육 링크이므로 `verified`로 명시했다.
- 최신 검증: `npm.cmd run validate:data`, `npm.cmd run build` 통과.

## 추가 검증 - P1/P3/P5 브라우저 대표 QA

2026-06-30에 Vite preview `http://127.0.0.1:4174/`를 Edge headless로 열고 P1/P3/P5를 desktop 1366x900, mobile 390x844에서 재검증했다. 사용자가 가장 중요하다고 강조한 `전공과 직무 매칭`, `직무와 교육 매칭`이 실제 화면에서도 같은 순서로 보이는지 확인했다.

| 페르소나 | 화면 확인 결과 | 전공-직무 단계 | 상위 추천 교육 | 후보/오버플로 |
|---|---|---|---|---|
| P1 CAE | `CAE 해석 엔지니어 교육 선택` 노출 | 전공 직결 | Finite Element Analysis, Ansys Innovation Courses, Mechanics and Materials | 후보 상위 노출 0건, 가로 오버플로 0건 |
| P3 반도체 식각 | `반도체 식각 공정 엔지니어` 선택 유지 | 전공 직결 | Semiconductor Devices, KOCW 반도체 공정, Statistics Onramp | 후보 상위 노출 0건, 가로 오버플로 0건 |
| P5 예지보전 AI | `예지보전 AI 엔지니어` 선택 유지 | 전공 확장 | Predictive Maintenance Toolbox, Google ML, Machine Learning Onramp, Coursera Data, Statistics, freeCodeCamp, Signal Processing, NCS | ROS Toolbox/NVIDIA Jetson 미노출, 가로 오버플로 0건 |

발견 및 조치:

- P5 예지보전 AI에서 AI 프로필에 `keywords`가 없는 경우 `renderDiagnosisGuide()`가 `slice` 호출 중 중단되는 오류를 발견했다. `aiProfile.keywords`가 비어 있으면 세부 직무의 `postingKeywords`를 쓰도록 fallback을 추가했다.
- P5 예지보전 AI의 핵심 추천에서 로봇·자율주행 성격이 강한 ROS Toolbox와 NVIDIA Jetson이 섞이지 않도록 역할별 제외 목록을 추가했다.
- 예지보전 AI의 `postingKeywords`는 일반 `AI`보다 `시계열`, `정비이력` 중심으로 좁혀 실제 설비 예지보전 맥락이 먼저 잡히도록 보정했다.
- 최신 검증: `npm.cmd run validate:data`, `npm.cmd run build`, P1/P3/P5 desktop/mobile 브라우저 QA 통과.

## 추가 검증 - `.xls` 실제 파일 저장 QA

2026-06-30에 Edge headless CDP로 P6 데이터센터 전력설비 페르소나의 `엑셀 커리큘럼 다운로드` 버튼을 실제 클릭해 다운로드 폴더에 `.xls` 파일이 저장되는지 확인했다.

검증 조건:

- 전공: 전력·전기설비
- 관심 산업: 데이터센터·인프라
- 준비 기간: 4주 기본
- 세부 직무: 데이터센터 전력설비 엔지니어
- 저장 위치: `tmp/edge-xls-downloads-20260630`

확인 결과:

| 항목 | 결과 |
|---|---|
| 버튼 상태 | 클릭 후 `내보내기 완료`로 변경 |
| 저장 파일 | `직무역량_내계획_데이터센터_전력·열관리_2026-06-30.xls` |
| 파일 크기 | 44,620 bytes |
| 워크북 XML | `<Workbook>` 포함 |
| 시트 | `요약`, `실행계획`, `선택직무상세`, `회사공고대조`, `교육자료`, `역량체크` 6개 확인 |
| 내용 | `데이터센터 전력설비 엔지니어`, Smartspace/데이터센터 전기설비, `볼 단원/섹션`, URL 포함 |

이 검증으로 이전 Blob/anchor 계측뿐 아니라 실제 브라우저 다운로드 저장까지 통과했다.

## 추가 검증 - Cloudflare Pages 배포 smoke test

2026-06-30에 `main` 푸시 후 Cloudflare Pages 배포 URL `https://careercompetency-curriculum.pages.dev/`에서 smoke test를 수행했다.

HTTP/asset 확인:

- URL 응답: 200
- `<title>`: `지원 직무 판단 및 역량 커리큘럼`
- 최신 asset: `assets/index-B5XXzJr5.js`, `assets/role-expansions-B12dKokU.js`, `assets/index-BH05jmIL.css`

배포 smoke 중 발견한 추가 문제와 조치:

- 첫 배포 smoke에서 P5 예지보전 AI의 3주차 `예시 자료`에 `NVIDIA Jetson AI 실습 과정`이 남아 있었다.
- 원인: 상위 추천과 주차별 추천에는 역할별 제외 목록을 적용했지만, 보완 과제용 예시 자료를 고르는 `getCompetencyActionResources()`에는 같은 제외 기준이 빠져 있었다.
- 조치: `getCompetencyActionResources()`와 교육 매핑 확인 패널의 role resource 집계에도 `isRoleExcludedResource()`를 적용했다.
- 보정 커밋: `ee7783a Filter excluded role resources in task suggestions`

최종 배포 브라우저 smoke 결과:

| 항목 | 결과 |
|---|---|
| 페르소나 | 기계공학 / AI·데이터 / 8주 / 예지보전 AI 엔지니어 |
| 전공-직무 단계 | 전공 확장 |
| 핵심 추천 확인 | Predictive Maintenance, Google Machine Learning Crash Course, Machine Learning Onramp 노출 |
| 제외 확인 | `ROS Toolbox` 미노출, `NVIDIA Jetson` 미노출 |
| 레이아웃 | desktop 1366x900 기준 가로 오버플로 0건 |

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
| R2 | 통과 | P1/P3/P5/P6 대표 흐름을 Edge headless desktop/mobile에서 확인했고, 워드클라우드/교육 선택 화면의 가로 오버플로 0건을 확인 |
| R3 | 자동 통과 | 역할별 상세 필드와 진단 항목 누락 없음 |
| R4 | 자동 통과 | 모든 세부 직무에 role diagnostics가 있음 |
| R5 | 자동 통과 | 학습목표 변경 시 품질 직무의 과제/자료 우선순위 변화 확인 |
| R6 | 자동 통과 | 2/4/8/12주 생성 주차 수 확인 |
| R7 | 자동 통과 | 주차별 추천 교육자료 생성 확인 |
| R8 | 자동 통과 | 직무 직접 연결, 결핍 역량, 목표, 기간, MathWorks 필요 신호를 점수 계산에 사용 |
| R9 | 통과 | P6에서 내 커리큘럼 추가, 주차 완료 체크, 새로고침 후 localStorage 유지와 탭 재진입 복원을 확인 |
| R10 | 통과 | Edge headless 실제 다운로드에서 `.xls` 파일 저장, 6개 시트, 선택 직무, 교육자료 URL, 볼 단원/섹션 포함 확인 |
| R11 | 통과 | 월간 검수 운영안과 seed 기반 워드클라우드 갱신 절차 문서화 |
| R12 | 통과 | `npm.cmd run check`로 정적 Vite 빌드 성공 |
| R13 | 통과 | 자료 카드는 원문 복제 없이 제목, 추천 이유, 산출물, 원본 링크 중심 구조 유지 |
| Q6 | 통과 | Edge headless에서 P6 교육 선택 화면의 필수 Starter Pack 영역과 candidate 제외를 확인 |
| Q7 | 통과 | Edge headless에서 P1/P3/P5 교육 선택 화면의 전공-직무 단계, 상위 추천 교육, P5 ROS/Jetson 제외를 확인 |
| Q8 | 통과 | Edge headless에서 P6 내 커리큘럼 `.xls` 다운로드가 실제 파일로 저장되는지 확인 |
| Q9 | 통과 | Cloudflare Pages 배포 URL에서 최신 asset, P5 예지보전 AI 추천, ROS/Jetson 제외, 가로 오버플로 0건 확인 |

## 보류

현재 QA 범위의 P0/P1 보류 항목은 없다. 실제 학생 파일럿에서는 학생이 고른 직무와 회사 공고 문장을 기준으로 추천 자료가 과하거나 부족한 사례를 계속 수집한다.

## 다음 작업

1. 학생 파일럿에서 세부 직무 선택률, 역량 체크 완료율, 내 커리큘럼/엑셀 사용률을 수집한다.
2. P1/P2의 한국어 broad 후보처럼 상위 추천에서는 제외했지만 후보 풀에 남긴 자료를 월간 검수에서 계속 승격 또는 제거한다.
