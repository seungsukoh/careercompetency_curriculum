# QA 실행 기록 - 2026-06-25

## 범위

이번 기록은 `docs/REQUIREMENTS_VALIDATION_CRITERIA.md`와 `docs/QA_CHECKLIST.md`를 기준으로 한 QA 결과다.

검증 범위:

- 정적 문법 검사
- seed 데이터 필드와 트랙별 자료 수 점검
- Microsoft Edge headless 브라우저 QA
- 데스크톱 1280x900 핵심 흐름 QA
- 모바일 390x844 핵심 흐름 QA
- 외부 자료 URL 접근성 확인

현재 seed 데이터에는 `type: "YouTube"` 자료가 없으므로 YouTube 조회수/댓글 검수는 해당 없음으로 기록한다. YouTube 후보를 추가할 때 R7 기준으로 조회수, 댓글 품질, 채널 신뢰도를 기록해야 한다.

## 실행한 확인

- `node --check app.js`: 통과
- seed 데이터 점검:
  - 전체 자료: 18개
  - 중복 ID: 없음
  - 5개 직무 트랙 유지
- 트랙별 자료 수:
  - `mechanical-cae`: 전체 7개, 한국어 4개
  - `production-quality`: 전체 6개, 한국어 4개
  - `semiconductor-equipment`: 전체 6개, 한국어 4개
  - `electronics-pcb`: 전체 9개, 한국어 4개
  - `embedded-control`: 전체 8개, 한국어 4개
- 외부 URL 접근성:
  - seed의 고유 URL 14개 모두 HTTP 200 확인
  - 기존 404였던 MIT `Design and Manufacturing II` 링크는 MIT OCW `Design and Manufacturing I` 유효 링크로 교체
- 브라우저 QA:
  - Microsoft Edge headless
  - 로컬 서버: `http://localhost:8787`
  - 콘솔 오류: 없음
  - 페이지 오류: 없음

## 브라우저 QA 결과

| ID | 상태 | 근거 |
|---|---|---|
| R1 | 통과 | 데스크톱에서 직무 트랙 선택 후 상세/진단/로드맵/자료가 같은 트랙 기준으로 갱신됨 |
| R2 | 통과 | 직무 상세에 주요 업무, 핵심 역량, 사용 도구, 포트폴리오 산출물, 흔한 오해 블록 표시 |
| R3 | 통과 | 진단 체크 시 점수가 0%에서 20%로 갱신되고 부족 항목이 4개로 갱신됨 |
| R4 | 통과 | 자료 목록 상단에 한국어 자료가 먼저 나오고 추천 단계 배지가 표시됨 |
| R5 | 통과 | 자료 카드에 추천 단계, 제공처, 유형, 언어, 난이도, 총 시간, 검수상태, 확인일, 학습/실습/선행/산출물이 표시됨 |
| R6 | 통과 | 모든 트랙에 한국어 자료 4개 이상 확보, 화면 상단 3개 자료가 한국어로 노출됨 |
| R8 | 통과 | 자료 저장/완료 체크 후 새로고침해도 저장 목록과 완료 상태가 유지됨 |
| R9 | 통과 | 로드맵 주차 완료 체크 후 새로고침해도 완료 주차가 유지됨 |
| R10 | 통과 | 파일럿 결과 복사 내용에 선택 트랙, 진단 점수, 완료 주차, 저장/완료 자료가 포함됨 |
| R11 | 통과 | 작은 정적 seed 묶음과 월간/학기 단위 검토 필드로 운영 부담을 제한함 |
| R13 | 통과 | 정적 파일만으로 로컬 서버에서 핵심 흐름 동작 |
| R14 | 통과 | 원문 복제 없이 제목, 추천 이유, 산출물, 원본 링크 중심으로 제공하며 URL 접근성 확인 완료 |
| R15 | 준비 통과 | 성공 기준과 파일럿 질문은 문서화되어 있으나 실제 학생 5명 지표는 파일럿 후 검증 |

## 모바일 QA 결과

| 항목 | 상태 | 근거 |
|---|---|---|
| 첫 화면 | 통과 | 390px 폭에서 `scrollWidth=390`, 가로 넘침 없음 |
| 탭 이동 | 통과 | 직무, 진단, 로드맵, 자료, 저장 탭 클릭 가능 |
| 자료 카드 | 통과 | 모바일 카드에서 배지 8개와 학습/실습/선행 메타데이터 3개 표시 |
| 완료 체크 | 통과 | 자료 완료와 로드맵 완료 체크 가능, 주요 컨트롤 최소 높이 40px |
| 복사 | 통과 | 브라우저 QA에서 클립보드 API를 대체해 요약 생성 내용을 확인 |

## 링크 검수 결과

모든 고유 URL은 Node `fetch` 기준 HTTP 200을 반환했다.

- MATLAB Onramp
- MIT OCW `Design and Manufacturing I`
- MIT OCW `Numerical Computation for Mechanical Engineers`
- NCS
- MIT OCW `Circuits and Electronics`
- TI Precision Labs
- STMicroelectronics STM32 Education
- ROS 2 Tutorials
- MIT OCW `Microelectronic Devices and Circuits`
- Analog Dialogue
- NIST Engineering Statistics Handbook
- K-MOOC
- KOCW
- STEP

## 남은 작업

1. savepoint 커밋과 푸시를 수행한다.
2. Cloudflare Pages 배포 후 배포 URL에서 같은 핵심 흐름을 짧게 재확인한다.
3. 학생 5명 파일럿을 진행하고 R15의 실제 지표를 기록한다.
4. YouTube 후보를 추가할 경우 R7 기준에 따라 조회수, 댓글 품질, 채널 신뢰도, 확인일을 기록한다.
