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

## 추가 진행 - UI 표본 검토

심화 보강 대상 중 8개 직무를 로컬 preview 화면에서 직접 선택해 `교육 선택` 로드맵의 첫 2주차 추천 이유와 추천 자료를 확인했다.

표본 직무:

- 열·유동 해석 엔지니어
- 내외장·의장 설계 엔지니어
- 자동차 생산기술·신차 양산 엔지니어
- 협력사품질(SQE) 엔지니어
- 항공우주 시스템 엔지니어
- 로봇 기구설계 엔지니어
- 데이터센터 냉각·열관리 엔지니어
- 제조 AI 엔지니어

확인 및 보정:

- 주차별 추천 이유가 트랙 공통 역량보다 해당 직무의 진단 역량을 먼저 설명하도록 수정했다.
- 로드맵 자료 선택에서 주차 제목·목표에 들어간 직무역량과 직접 매핑된 교육자료를 우선 노출하도록 수정했다.
- 내외장·의장 설계, 로봇 기구설계, 데이터센터 냉각 직무에서 전장·제어·전력설비 자료가 과하게 섞이던 문제를 제외 규칙과 직접 매핑으로 보정했다.
- 데이터센터 냉각 직무에는 `Simscape Onramp`와 Ansys 자료를 데이터센터 인프라 트랙에서도 사용할 수 있게 연결했다.

UI 표본 검토 결과:

- 8개 표본 모두 직무 선택과 4주 로드맵 생성이 정상 동작했다.
- 첫 2주차 추천 이유는 모두 해당 직무역량 또는 채용 키워드와 연결됐다.
- 감사 결과는 계속 `P0/P1/P2 0건`을 유지했다.

## 추가 진행 - 전공·직무·교육 구분 정합성

사용자 요청에 따라 학과, 직무, 교육이 누구나 구분할 수 있게 나뉘고 실제 추천 흐름에서 서로 맞물리는지 다시 검토했다.

판단:

- 기존 4개 전공(`기계공학`, `전기공학`, `전자공학`, `화학공학`)만으로는 현재 16개 직무군을 설명하기에 부족했다.
- 특히 자율주행·차량 SW, 제조 AI, 스마트팩토리, 반도체 수율·테스트, 소재·후공정 직무에서 필요한 전공 신호가 누락돼 있었다.
- 그래서 P0 보강 전공으로 `컴퓨터공학·소프트웨어`, `산업공학`, `신소재·재료공학`을 추가했다.

반영:

- 전공 선택 UI와 저장 프로필 검증 허용 목록을 7개 전공 체계로 확장했다.
- 최종 `majorRoleFitProfiles` 보정 함수에 새 전공 3개를 추가해 실제 직무 추천 정렬에 쓰이게 했다.
- `컴퓨터공학·소프트웨어`: 임베디드, 차량 SW, 자율주행, 제조 AI, MES/SCADA, 설비·공정 데이터 직무를 직결/확장으로 연결했다.
- `산업공학`: 생산·공정·품질, 자동차 양산품질, 제조 데이터, 반도체 수율·테스트, 스마트팩토리 직무를 직결/확장으로 연결했다.
- `신소재·재료공학`: 배터리·소재, 고분자·필름, 반도체 공정·후공정, 박막·CMP·불량분석, 소재 품질 직무를 직결/확장으로 연결했다.
- 트랙 전공 태그도 함께 보정해 직무 목록 필터와 전공 적합도 라벨이 같은 기준을 쓰도록 했다.
- 데이터 검증 스크립트가 `direct`, `bridge`뿐 아니라 `challenge` 직무 참조도 검사하도록 강화했다.

이번 판단 기준:

- 학과는 사용자의 배경 신호이고, 직무는 채용에서 수행하는 반복 업무와 산출물이며, 교육은 부족 역량을 메우는 수단으로 분리한다.
- 전공과 직무를 억지로 모두 직결 처리하지 않고 `직결`, `전공 확장`, `도전 직무`로 나눠 전공 적합성의 강도를 노출한다.
- 직무역량은 기존 심화 감사에서 본문·키워드·산출물과의 문구 정합성 0건 이슈를 유지했고, 교육자료 연결 감사도 계속 0건 이슈를 유지했다.

## 추가 진행 - 신규 전공 로컬 UI 표본 검토

로컬 Vite 서버와 Edge headless 렌더링으로 새 전공 3개가 실제 화면에서 선택되고, 직무 카드와 교육 선택 영역까지 이어지는지 표본 확인했다.

확인 항목:

- 전공 드롭다운 7개 항목이 모두 표시됐다.
- `컴퓨터공학·소프트웨어`: 36개 세부 직무가 표시됐고, 직결 20개·확장 16개로 계산됐다.
- `산업공학`: 28개 세부 직무가 표시됐고, 직결 12개·확장 16개로 계산됐다.
- `신소재·재료공학`: 29개 세부 직무가 표시됐고, 직결 14개·확장 15개로 계산됐다.

표본 직무와 교육 연결:

- `컴퓨터공학·소프트웨어` 표본: 임베디드 펌웨어, 로봇 소프트웨어
  - 첫 2주차가 MCU, 주변장치, ROS, 통신, 제어 역량으로 구성됐다.
  - STM32, Arm Education, ROS 2 Tutorials, CAN 자료가 직무 직접 자료 또는 Starter Pack으로 노출됐다.
- `산업공학` 표본: 공정기술, 품질보증·품질관리
  - 첫 2주차가 공정변수, CTQ, SPC, FMEA, 공정능력 역량으로 구성됐다.
  - NIST Control Charts, Statistics Onramp, Six Sigma, FMEA 자료가 우선 노출됐다.
- `신소재·재료공학` 표본: 소재 R&D, 배터리 공정
  - 첫 2주차가 조성설계, 합성조건, 물질수지, 전극공정, 품질지표 역량으로 구성됐다.
  - MIT Chemical Engineering Thermodynamics, LearnChemE Material Balances, Separations, Statistics 자료가 우선 노출됐다.

판단:

- 화면상 학과 선택, 직무 카드, 교육 선택 영역은 구분되어 읽힌다.
- 신규 전공 3개 모두 첫 추천 직무가 `전공 직결`로 표시되고, 첫 2주 교육 추천도 해당 직무역량 문구와 연결됐다.
- 로컬 표본 기준으로 전공-직무-교육 연결의 명백한 불일치나 빈 추천은 발견되지 않았다.

## 추가 진행 - Cloudflare 배포 표본 및 학생 관점 문구 검토

Cloudflare Pages 배포 URL `https://careercompetency-curriculum.pages.dev/`에서 로컬과 같은 신규 전공 표본을 다시 확인했다.

배포 표본 결과:

- 전공 드롭다운 7개 항목이 배포본에서도 모두 표시됐다.
- `컴퓨터공학·소프트웨어`: 36개 세부 직무, 직결 20개·확장 16개로 표시됐다.
- `산업공학`: 28개 세부 직무, 직결 12개·확장 16개로 표시됐다.
- `신소재·재료공학`: 29개 세부 직무, 직결 14개·확장 15개로 표시됐다.
- 표본 6개 직무 모두 `전공 직결` 카드와 `교육 선택` 화면으로 정상 연결됐다.

배포 표본 6개:

- `컴퓨터공학·소프트웨어`: 임베디드 펌웨어, 로봇 소프트웨어
- `산업공학`: 공정기술, 품질보증·품질관리
- `신소재·재료공학`: 소재 R&D, 배터리 공정

학생 관점 판단:

- 화면의 상위 선택값은 `학과/전공`, 카드 목록은 `세부 직무`, 주차별 추천은 `교육자료`로 읽혀 세 개념이 섞이지 않는다.
- 각 표본의 첫 2주 추천 이유가 직무역량 문구와 직접 연결됐다. 예: MCU·ROS, 공정변수·SPC, 조성설계·전극공정.
- `오늘 시작할 1개`에는 보완 역량, 직무 연결, 자료 신뢰, 오늘 순서가 같이 표시돼 왜 이 교육부터 시작하는지 설명된다.
- 명백한 연결 불일치나 빈 추천은 없었다.

보정:

- 학생이 보는 추천 이유에서 `소재개발와 바로 연결됩니다`처럼 키워드 뒤 조사가 어색하게 붙는 문제를 발견했다.
- `getTaskPriorityReason()`에 한글 받침 여부를 보는 `getAndParticle()`을 추가해 `소재개발과`, `SPC와`처럼 자연스럽게 표시되도록 수정했다.
- `9fab670` 푸시 후 Cloudflare Pages 새 asset(`index-CBY-TMqn.js`) 반영을 확인했고, 배포 화면에서 `소재개발과 바로 연결됩니다`로 표시되는 것을 재확인했다.

## 추가 진행 - 한국어 가능 교육과 주차별 추천 구조 감사

사용자 지적에 따라 Simulink Onramp처럼 한국어로 수강 가능한 MathWorks Academy Onramp류와 주차별 교육 추천의 중복·선후관계를 다시 검토했다.

반영:

- `MATLAB Onramp`, `Simulink Onramp`, `Stateflow Onramp`, `Control Design Onramp with Simulink`, `Signal Processing Onramp`, `Machine Learning Onramp`, `Statistics Onramp`, `Simscape Onramp`, `Sensor Fusion Onramp`, `Optimization Onramp`를 `한국어/영어` 가능 자료로 표시했다.
- `한국어/영어`처럼 한국어가 포함된 자료도 `languageCode=ko`로 분류되도록 정규화 로직을 바꿨다.
- 교육 카드 연결 신호와 검수 배지에 `한국어 가능`이 표시되도록 했다.
- 주차별 로드맵 추천에서 3시간 내외의 짧은 1회성 자료는 한 번 배치되면 뒤 주차에서 다시 추천하지 않도록 했다.
- 장기 부트캠프, KDT, 프로젝트, 멘토링, 현장실습처럼 여러 주차에 걸쳐 수행 가능한 자료만 재사용 가능하도록 분리했다.
- `MATLAB -> Simulink -> Stateflow/Control Design/Simscape`처럼 선수관계가 있는 자료는 선행 자료가 앞 주차에 배치되기 전까지 뒤로 미루도록 했다.
- 미래 주차에 직접 연결된 짧은 자료는 앞 주차에서 소모하지 않고 해당 주차까지 보존하도록 했다.
- `오늘 시작할 1개` 추천은 공고 QA 기준을 유지하기 위해 검증된 핵심/Starter Pack 자료 가중치를 보강했다.
- 선택 직무 요약 화면에는 `전공`, `상세직무내용`, `직무 관련 교육` 3개 카드를 먼저 보여주도록 보완했고, 워드클라우드는 그 아래로 이동했다.

판단:

- 4주·8주 로드맵 감사 기준으로 짧은 자료 중복 추천은 0건이다.
- 4주·8주 로드맵 감사 기준으로 선수자료가 후행 주차에 나오는 선후관계 역전은 0건이다.
- 중복을 막으면서 기존에 반복 추천으로 덮이던 약점이 드러났다. `weak_roadmap_task_resources` P2 48건은 직접 연결·검증 자료가 부족한 주차이며, 다음 보강 대상이다.
- 즉, 현재 핵심 결함은 "같은 짧은 교육이 여러 주차에 반복됨"이 아니라 "반복을 제거하면 일부 주차의 대체 직접 교육이 부족함"으로 바뀌었다.

## 추가 진행 - Coursera 반영 상태 점검

사용자 질문에 따라 Coursera 자료가 좋은 내용에 비해 추천 구조에 충분히 반영되어 있는지 확인했다.

확인:

- 현재 Coursera는 4개 과정이 반영되어 있다.
  - `Coursera Chemical Engineering Thermodynamics I`
  - `Coursera Six Sigma Principles`
  - `Coursera Data Analysis with Python`
  - `Coursera Introduction to Embedded Systems Software`
- 96개 직무 감사 기준 상위 8개 추천 노출은 `Data Analysis with Python` 16개 직무, 나머지 3개 과정은 각각 4~5개 직무다.
- Coursera는 추천 점수에서 외부 과정/무료청강/공식성 신호를 받지만, 영어 자료라 한국어 자료와 검증된 공식 실습 자료보다 뒤로 밀리는 경우가 있다.
- 기존 `Coursera Chemical Engineering Thermodynamics I`가 `HAZOP 안전 체크`에 직접 연결되어 있었는데, 열역학 강좌를 HAZOP 직접 교육으로 보는 것은 과도하다고 판단했다.

반영:

- 4개 Coursera 과정에 `recommendedSections`를 추가해 사용자가 강좌 전체가 아니라 어떤 단원/목차를 봐야 하는지 알 수 있게 했다.
- `Coursera Chemical Engineering Thermodynamics I`는 `HAZOP 안전 체크` 대신 `반응·분리 조건 비교`, `조건 변경 검토표`에 연결했다.
- `Coursera Introduction to Embedded Systems Software`는 `PID 응답 실험` 직접 연결 대신 `MCU 주변장치 설계`, `UART 센서 프로토콜`, `디버깅 노트와 README`, `검증 리포트`에 연결했다.

판단:

- Coursera는 일부 핵심 직무에 반영되어 있지만, "좋은 Coursera 콘텐츠가 충분히 반영됐다"고 보기는 어렵다.
- 특히 자율주행, BMS/배터리, 전력·ESS, 데이터센터, 지속가능 화학 쪽 Coursera 후보는 아직 부족하다.
- 다음 Coursera 보강은 검증 가능한 과정 URL과 단원명을 확인한 뒤 추가해야 한다. 영어 자료이므로 한국어 가능 자료를 대체하기보다 심화/보완 자료로 배치하는 것이 맞다.

## 추가 진행 - Coursera 다분야 보강

사용자 요청에 따라 다양한 분야에 적용 가능한 Coursera 과정을 추가 검토하고, 직무·주차 산출물에 직접 연결되는 과정만 반영했다.

추가한 Coursera 과정:

- `Introduction to Self-Driving Cars`: 자율주행 기능 요구사항, 센서·차량 로그, 시나리오 검증
- `State Estimation and Localization for Self-Driving Cars`: 자율주행·로봇·UAV 위치추정, 센서융합, 로그 검증
- `Visual Perception for Self-Driving Cars`: 자율주행 인지, 제조 비전검사, 라벨·오탐·미탐 기준
- `Motion Planning for Self-Driving Cars`: 자율주행 planning/control, 주행 시나리오, pass/fail 기준
- `Algorithms for Battery Management Systems`: ESS/BMS, EV 배터리팩, SOC/SOH, 충방전 로그
- `Introduction to Power Electronics`: 전력전자, 인버터, PCS, DC-DC, 보호회로
- `Electric Power Systems`: 전력계통, 수배전, 데이터센터 전력 인프라, 장애 대응
- `Digital Manufacturing & Design`: 스마트팩토리, 생산기술, 디지털 제조, 설계-공정-품질 연결
- `Solar Energy Basics`: 재생에너지, 태양광-ESS, 계통 연계
- `Introduction to Sustainability`: 수소, CCUS, 수처리, 리사이클 등 지속가능 공정의 환경·운영 리스크

반영 방식:

- 모든 신규 Coursera 과정에 `recommendedSections`를 넣어 강좌 전체가 아니라 어떤 단원/목차를 봐야 하는지 명확히 했다.
- `autonomous-sdv`, `energy-ess`, `data-center-infra`, `manufacturing-dx`, `chemical-sustainability`, `robotics-automation`, `aerospace-defense`, `automotive-mobility`에 걸쳐 직무 링크를 추가했다.
- 주차별 `resourceTaskLinks`에 직접 연결해 같은 짧은 자료를 반복하지 않고도 대체 교육이 잡히도록 했다.
- 영어 자료이므로 한국어 자료를 대체하는 기본 입문 자료가 아니라, 직무 심화·글로벌 무료청강 보완 자료로 배치했다.
- 신규 Coursera URL 10개는 `curl -L -I`로 모두 `200 OK`를 확인했다. 배터리 과정은 최초 후보 slug가 404라서 실제 접근 가능한 `https://www.coursera.org/learn/battery-management-systems`로 보정했다.

결과:

- 리소스 수는 127개에서 137개로 늘었다.
- `roleCompetencyResourceLinks`는 24개에서 29개로 늘었다.
- `weak_roadmap_task_resources` P2는 45건에서 27건으로 줄었다.
- 4주·8주 로드맵의 짧은 자료 중복 추천은 계속 0건이다.
- 선수관계 역전도 계속 0건이다.

## 추가 진행 - Coursera 직무 적합성 재검토

사용자가 "교육 개수를 늘리는 것보다 추천한 교육이 해당 직무에 도움이 되는지가 더 중요하다"고 기준을 명확히 했기 때문에, 신규 Coursera 연결을 추천 품질 관점에서 다시 감사했다.

판단 기준:

- 역할 직접 연결은 해당 직무의 핵심 산출물에 바로 쓰일 때만 유지한다.
- 주차별 연결은 과제 제목과 키워드가 비슷한 정도가 아니라, 실제 산출물 작성에 도움이 될 때만 유지한다.
- 넓은 개론형 과정은 `candidate`/`broad` 성격으로 두고, 직접 추천을 억제한다.
- P2 개수를 줄이기 위해 약한 자료를 억지로 붙이지 않는다. 직접 교육이 부족하면 P2로 남겨 다음 보강 대상으로 둔다.

정리한 연결:

- `Introduction to Self-Driving Cars`는 ADAS 검증과 자율주행 세부 직무에는 유지했지만, 차체/샤시/열관리/차량보정/HIL·SIL/기능안전/차량시험 같은 일반 자동차 직무에서는 제외했다.
- `Visual Perception for Self-Driving Cars`는 자율주행 인지와 비전검사 AI에는 유지했지만, 일반 AI 데이터 분석·예지보전·제조 AI에는 제외했다.
- `Motion Planning for Self-Driving Cars`는 자율주행 planning/control과 로봇 제어에는 유지했지만, 자동차 일반 직무와 로봇 기계설계·스마트팩토리 자동화에는 제외했다.
- `Algorithms for Battery Management Systems`는 ESS/BMS와 EV 배터리팩/BMS 제어에는 유지했지만, 배터리 리사이클링 공정, 기능안전, 재생에너지 계통 역할에서는 제외했다.
- `Electric Power Systems`는 전력계통과 데이터센터 전기 인프라에는 유지했지만, 데이터센터 냉각과 DCIM/BMS 운영 추천에서는 제외했다.
- `Digital Manufacturing & Design`는 생산기술, MES/SCADA, 산업 데이터, 자동차 제조에는 유지했지만, 자동차 디자인/열관리/보정 같은 비제조 역할에서는 제외했다.
- `Solar Energy Basics`는 재생에너지 계통 중심으로 남기고, 수소/CCUS/화학 지속가능 공정 연결은 제거했다.
- `Introduction to Sustainability`는 넓은 개론 후보로 낮추고, 수소/CCUS/폴리머/배터리 리사이클링 역할의 직접 추천에서는 제거했다.

검증 결과:

- 신규 Coursera가 노출되는 역할은 표본 스캔 기준 41개에서 24개로 줄었다.
- 남은 신규 Coursera 노출은 EV 배터리/BMS, ADAS 검증, 자동차 제조, 자율주행 세부 직무, 전력/ESS, 비전검사 AI, 데이터센터 전기 인프라, 제조 DX처럼 직무 산출물과 직접 연결되는 영역이다.
- `npm.cmd run audit:education` 기준 P0/P1은 계속 0건이고, 짧은 자료 중복 추천 0건, 선수관계 역전 0건을 유지했다.
- `weak_roadmap_task_resources` P2는 40건으로 늘었다. 이는 약한 Coursera 연결을 제거하면서 직접 교육이 부족한 주차가 다시 드러난 결과이며, 추천 품질 관점에서는 의도한 방향이다.

## 검증 결과

| 명령/확인 | 결과 | 비고 |
| --- | --- | --- |
| `npm.cmd run audit:education` | PASS | 16개 트랙, 96개 직무, P0/P1/P2 0건. 4주·8주 짧은 자료 중복 0건, 선수관계 역전 0건 |
| `npm.cmd run validate:data` | PASS | 138개 리소스, 96개 직무 링크, 29개 역량-교육 링크, 경고/오류 0건 |
| `npm.cmd run validate:posting` | PASS | 11개 fixture 통과 |
| `npm.cmd run check` | PASS | 데이터 검증, 공고 QA, Vite build 통과 |
| `node --check app.js` | PASS | 문법 오류 없음 |
| `node --check data/roleExpansions.js` | PASS | 문법 오류 없음 |
| `node --check scripts/validate-data.mjs` | PASS | 문법 오류 없음 |
| `node --check scripts/validate-posting-qa.mjs` | PASS | 문법 오류 없음 |
| 로컬 preview UI 표본 검토 | PASS | 8개 직무, 첫 2주차 추천 이유·자료 확인 |
| 신규 전공 로컬 UI 표본 검토 | PASS | 새 전공 3개, 표본 6개 직무, 첫 2주차 추천 이유·자료 확인 |
| Cloudflare 신규 전공 표본 검토 | PASS | 배포 URL에서 새 전공 3개, 표본 6개 직무, 첫 2주차 추천 이유·자료 확인 |
| 학생 관점 문구 검토 | PASS | 연결 구조는 명확, 조사 어색함 1건 발견 후 코드 보정 |
| Cloudflare 문구 보정 재확인 | PASS | 재배포 후 `소재개발과 바로 연결됩니다` 표시 확인 |
| Edge headless 렌더링 QA | PASS | desktop 1366px, mobile 390px 모두 visible overflow 0건 |

## 현재 남은 작업

1. 직접 맞는 검토 완료 교육이 없는 최종 정리·공고 맞춤 주차는 broad 교육으로 억지 보강하지 않는다.
2. 추가 보강은 같은 짧은 자료나 넓은 Coursera 과정을 다시 넣는 방식이 아니라, 주차 산출물에 직접 맞는 한국어/검증 자료를 확인한 경우에만 진행한다.
3. Coursera는 자율주행, BMS/배터리, 전력·ESS, 데이터센터 전기 인프라, 스마트팩토리/제조 DX 중심으로만 유지한다. 추가 Coursera는 역할 산출물에 직접 맞는 경우에만 선별한다.
4. 파일럿 전에는 "전공과 직무가 억지 연결처럼 보이지 않는가", "추천 교육이 직무역량을 보완한다고 느껴지는가", "직무와 학과와 교육이 화면에서 서로 다른 개념으로 읽히는가", "주차별 교육 순서가 자연스러운가"를 별도 질문으로 수집한다.

## 추가 진행 - 직무 적합성 기반 교육 추천 정밀화

사용자 기준을 `추천 수`가 아니라 `해당 직무 산출물에 실제로 도움이 되는가`로 다시 고정하고, 주차별 추천 로직과 교육 링크를 재검토했다.

변경 내용:

- 주차 추천에서 `과제 직접 연결` 자료를 `직무 일반 역량` 자료보다 먼저 고르도록 순서를 바꿨다.
- 직접 맞는 검토 완료 자료가 없을 때 broad/candidate 후보를 억지로 채우지 않도록 필터링했다. 화면에는 빈 상태가 남더라도 약한 교육을 추천하지 않는 쪽을 우선했다.
- 반도체 식각 과제는 KOCW 건식각·습식각 핵심 단원을 공정 흐름용으로 먼저 소모하지 않게 조정했다.
- 바이오/화학 HAZOP 과제는 NPTEL HAZOP 자료가 화학공정 흐름도에서 먼저 소모되지 않게 분리했다.
- UAV 요구사항 분해에는 NASA Systems Engineering Handbook을 추가해 첫 주차 요구사항-검증 추적표 산출물과 직접 연결했다.
- 데이터센터 운영 로그/알람 과제는 Coursera Engineering Data, freeCodeCamp Python/Data, Signal Processing Onramp, Predictive Maintenance 자료를 직무별로 연결했다.
- 전력전자/ESS PCS 구성 과제는 Simscape, TI Precision Labs, KOCW/Coursera 전력전자 자료가 선후관계 없이 앞 주차에 소모되지 않도록 링크를 재배치했다.
- 화학 지속가능성의 분석·품질 데이터 과제는 Statistics Onramp와 Coursera Engineering Data를 track/role/task에 연결했다.
- 시뮬레이션 AI의 현장 적용 리스크 과제는 Google ML Crash Course와 Statistics Onramp가 문제정의 과제에서 먼저 소비되지 않도록 조정했다.
- 8주 심화 반복 주차는 새 짧은 교육을 강제로 반복 추천하지 않도록 하고, UI 빈 상태에서 `반복·보강 주차`와 `직접 맞는 교육 부족`을 구분해 설명하도록 했다.

검증 결과:

- `npm.cmd run audit:education` PASS
- P0/P1/P2 모두 0건
- 짧은 자료 중복 추천 0건
- 선후관계 역전 0건
- 별도 표본 점검 기준, 4주 핵심 로드맵에서 추천이 비어 있는 주차는 7건으로 축소됐다. 남은 7건은 항공우주/화학 지속가능성의 `지원 회사 맞춤 검증` 또는 `산출물 정리` 성격의 최종 정리 과제이며, 현재는 약한 broad 후보를 추천하지 않고 빈 상태를 유지한다.
- 8주 확장 로드맵의 빈 추천은 대부분 `반복본` 주차다. 해당 주차는 새 교육을 넣는 것보다 앞 주차 산출물 반복·보강이 목적이므로 UI에서 별도 문구로 안내한다.

다음 단계:

1. 남은 7개 빈 최종 정리 과제에 대해, 직무별 포트폴리오/보고서 작성에 직접 맞는 검토 완료 자료가 있는지 별도 소싱한다.
2. 사용자 표본으로 `전공-직무-교육` 카드가 서로 다른 개념으로 보이면서도 추천 흐름이 자연스러운지 확인한다.
3. 8주 반복 주차 문구가 "자료 누락"이 아니라 "산출물 반복·보강"으로 읽히는지 확인한다.

## 추가 진행 - dead-code 정리와 커버리지 가시화

코드 전체 검토 요청에 따라 정적 dead-code 후보와 현재 검증 커버리지를 분리해 점검했다.

변경 내용:

- `app.js`에서 선언부 외 사용이 없던 함수 4개를 제거했다.
  - `renderInlineRoleWordCloud`
  - `getWordCloudAsset`
  - `getTodayStartResourceScore`
  - `getGoalGuide`
- `styles.css`에서 HTML/JS에서 더 이상 사용하지 않는 selector 묶음을 정리했다.
- 동적으로 생성되는 `word-cloud-term weight-1~6` selector는 유지했다.
- `scripts/smoke-render.mjs`를 추가해 VM 기반으로 주요 UI HTML 렌더링을 검증한다.
  - `전공 / 상세직무내용 / 직무 관련 교육` 카드 표시
  - 공고 맞춤 빈 상태 문구
  - 8주 반복·보강 주차 문구
- `scripts/coverage-summary.mjs`를 추가해 `validate:data`, `validate:posting`, `audit:education`, `smoke:render`의 V8 함수 커버리지를 요약한다.
- `npm.cmd run check`에 `smoke:render`를 포함했다.

검증 결과:

- 정적 함수 dead-code 후보 0건
- CSS unused 후보는 동적 word-cloud weight selector 6개만 남음
- `npm.cmd run coverage:summary` 기준 `app.js` 함수 290개 중 248개 실행, 함수 기준 85.5%
- 렌더/UI 함수 커버리지 80.9%
- 추천/직무/교육 로직 함수 커버리지 93.6%
- `npm.cmd run check` PASS
- `npm.cmd run audit:education` PASS, P0/P1/P2 0건

다음 단계:

1. 남은 미커버 함수 중 실제 사용 경로인 Excel export, 이벤트 핸들러, 워드클라우드 레이아웃을 브라우저 또는 DOM 테스트로 보강한다.
2. 커버리지 요약은 Windows 파일 잠금에 영향을 덜 받도록 실행별 임시 폴더를 사용한다.

## 추가 진행 - Vite 청크 경고 해소

dead-code 정리 후 남아 있던 Vite 500KB 청크 경고는 `app.js` 안에 정적 데이터와 렌더링 로직이 함께 들어 있어 발생했다. 로직 변경 없이 기본 데이터만 별도 모듈로 분리해 초기 앱 청크 크기를 낮췄다.

변경 내용:

- `data/baseData.js`를 추가해 트랙, 리소스, 로드맵, 직무, 전공 적합도, 진단, 교육 링크 데이터를 관리한다.
- `data/roleExpansions.js`는 기존처럼 확장 데이터 전용 청크로 유지하고, `baseData.js`에서 확장을 적용한다.
- `app.js`는 데이터 import 후 UI/추천 로직에 집중하도록 축소했다.
- VM 기반 검증 스크립트 5개가 `roleExpansions`, `baseData`, `app` 순서로 소스를 결합해 기존 테스트 흐름을 유지하도록 수정했다.
- `vite.config.js`의 manual chunk에 `base-data`와 `role-expansions`를 명시했다.
- `coverage:summary`는 고정 임시 폴더 삭제 대신 실행별 하위 폴더를 사용해 Windows EPERM 파일 잠금에 덜 민감하게 바꿨다.

검증 결과:

- `npm.cmd run audit:education` PASS, 16개 트랙, 96개 직무, P0/P1/P2 0건
- `npm.cmd run check` PASS, 데이터 검증, 공고 QA, 렌더 smoke, Vite build 통과
- Vite build 청크: 앱 158.34KB, `role-expansions` 195.23KB, `base-data` 334.99KB
- Vite 500KB 청크 경고 해소
- `npm.cmd run coverage:summary` PASS
- 데이터 분리 후 커버리지: 앱 함수 277개 중 235개 실행, 함수 기준 84.8%
- 렌더/UI 함수 커버리지 80.9%
- 추천/직무/교육 로직 함수 커버리지 93.2%

다음 단계:

1. Excel export, 이벤트 핸들러, 워드클라우드 레이아웃처럼 실제 사용되지만 자동 실행이 약한 UI 경로를 브라우저/DOM 테스트로 추가한다.
2. `data/baseData.js`가 계속 커지면 트랙/리소스/로드맵/직무 링크 단위로 추가 분리해 데이터 유지보수성을 높인다.
3. 파일럿 전 사용자 표본으로 `전공 / 상세직무내용 / 직무 관련 교육` 흐름이 실제로 빠르게 이해되는지 확인한다.

## 추가 진행 - UI 액션 smoke와 함수 커버리지 보강

dead-code 정리 후 남아 있던 미커버 함수 대부분은 실제 사용자 액션에서만 실행되는 경로였다. `scripts/smoke-render.mjs`의 VM 가짜 DOM을 확장해 렌더링뿐 아니라 주요 UI 액션까지 검증하도록 보강했다.

변경 내용:

- 가짜 DOM에 `closest`, `querySelectorAll`, `classList`, `dataset`, `getBoundingClientRect`, 이벤트 등록/dispatch, 다운로드 링크, Blob/Object URL 동작을 추가했다.
- smoke 테스트에 다음 액션 경로를 추가했다.
  - 로드맵 교육 전체 선택/해제
  - view 이동 버튼
  - 공고 원문 입력 후 비교 패널 갱신
  - 리소스 저장/완료 버튼
  - 선택 교육 초기화
  - Excel 커리큘럼 export와 XML escaping
  - 선택 직무 결과 패널 focus/scroll
  - 워드클라우드 배치와 fallback 위치 탐색
  - service worker/cache 무효화 함수 호출

검증 결과:

- `npm.cmd run smoke:render` PASS
  - 3개 렌더 시나리오
  - 11개 액션 리소스
  - 8개 워드클라우드 term 배치
- `npm.cmd run coverage:summary` PASS
  - 앱 함수 277/277 실행, 100%
  - 렌더/UI 함수 68/68 실행, 100%
  - 추천/직무/교육 로직 함수 191/191 실행, 100%
  - 미커버 샘플 0개
- `npm.cmd run check` PASS
  - 데이터 검증, 공고 QA, smoke 렌더/액션, Vite build 통과
  - Vite 500KB 청크 경고 없음

다음 단계:

1. 현재 100%는 VM 함수 실행 기준이므로, 실제 브라우저 기반 회귀 테스트는 별도 최소 세트로 유지한다.
2. 다음 기능 변경부터는 `smoke-render`에 사용자 행동 1개 이상을 같이 추가해 커버리지 하락을 방지한다.
3. 파일럿 전에는 데이터 품질보다 UX 판단이 더 중요하므로, 전공 선택 후 직무 카드와 교육 추천이 학생에게 자연스럽게 읽히는지 표본 사용자로 확인한다.

## 추가 진행 - 실제 브라우저 UX 샘플 QA

VM 기반 smoke는 함수 실행 커버리지는 높지만, 실제 브라우저의 ES module import, 화면 폭, 카드 구분감, 추천 중복은 놓칠 수 있다. 그래서 Edge CDP 기반 샘플 QA를 추가해 `전공 / 상세직무내용 / 직무 관련 교육` 흐름을 실제 렌더링 화면에서 검증했다.

변경 내용:

- `scripts/browser-ux-sample.mjs`를 추가해 실제 Edge headless 브라우저로 대표 전공·직무 조합을 자동 확인한다.
- `npm.cmd run qa:ux` 스크립트를 추가했다.
- `UX_SAMPLE_URL`이 없으면 빈 포트에 자체 Vite QA 서버를 띄워, 5173 등 기존 포트에 다른 앱이 떠 있는 상황을 피한다.
- 샘플은 desktop 1366px, mobile 390px 두 뷰포트에서 각각 실행한다.
  - 컴퓨터공학·소프트웨어 → 임베디드 펌웨어
  - 산업공학 → 품질보증·품질관리
  - 신소재·재료공학 → 배터리 공정
  - 화학공학 → 소재 R&D
  - 기계공학 → 드론·UAM 비행제어
- 각 샘플에서 선택 직무 제목, `전공 / 상세직무내용 / 직무 관련 교육` 라벨, 직무 상세 카드, 교육 카드, 오늘 시작할 1개 근거, 첫 2주차 추천, 교육 요약 중복, 가로 overflow를 검증한다.
- 실제 브라우저에서 `app.js`가 `data/baseData.js`의 일부 상수 import를 못 찾는 문제를 발견하고 `durationLabels`, `durationStrategies`, `learningGoals`, `roleResourceExclusions` export/import를 보정했다.
- Starter Pack에 이미 나온 교육이 교육 요약 추천에 다시 반복되는 문제를 줄이기 위해 `getEducationSummaryResources()`에서 Starter Pack 리소스를 제외했다.
- 브라우저 QA 산출물과 Edge 프로필 파일이 Vite watcher에 잡히지 않도록 `tmp/**`, `.tmp-edge-qa*/**` watch ignore를 추가했다.

검증 결과:

- `node --check app.js` PASS
- `node --check data/baseData.js` PASS
- `node --check scripts/browser-ux-sample.mjs` PASS
- `node --check vite.config.js` PASS
- `npm.cmd run check` PASS
- `npm.cmd run audit:education` PASS, 16개 트랙, 96개 직무, P0/P1/P2 0건, 짧은 자료 중복 0건, 선후관계 역전 0건
- `npm.cmd run coverage:summary` PASS
  - 앱 함수 277/277 실행, 100%
  - 렌더/UI 함수 68/68 실행, 100%
  - 추천/직무/교육 로직 함수 191/191 실행, 100%
- `npm.cmd run qa:ux` PASS
  - 5개 대표 직무 × 2개 뷰포트 = 10개 샘플
  - failures 0
  - 스크린샷/리포트: `tmp/browser-ux-samples/run-55132-1782902005772`

판단:

- 전공, 상세직무내용, 직무 관련 교육은 실제 브라우저 화면에서도 서로 다른 개념으로 구분되어 읽힌다.
- 대표 5개 전공·직무 샘플에서 첫 교육 추천이 비어 있거나 같은 카드 안에서 중복되는 문제는 없었다.
- 교육 요약 추천은 Starter Pack과 중복되지 않도록 조정되어, 짧은 온램프 자료가 화면의 여러 영역에 반복 노출되는 문제가 줄었다.
- 이번에 발견한 import 문제처럼 VM 결합 테스트가 실제 module boundary를 숨길 수 있으므로, 브라우저 QA는 앞으로 배포 전 최소 회귀 테스트로 유지해야 한다.

다음 단계:

1. 파일럿 전 브라우저 QA 샘플을 5개에서 8~10개 직무로 늘리되, 단순 개수 확대가 아니라 전공 경계가 헷갈릴 수 있는 조합 위주로 고른다.
2. 배포 전 체크리스트에 `npm.cmd run qa:ux`를 포함해 실제 브라우저 import/렌더링 회귀를 계속 잡는다.
3. 실제 학생 3~5명에게 `전공 선택 → 직무 카드 선택 → 교육 추천 이해` 흐름을 관찰해, 자동 QA가 판단하지 못하는 용어 난이도와 카드 우선순위를 확인한다.

## 추가 진행 - 브라우저 QA 샘플 확대와 중복 추천 기준 강화

파일럿 전 자동 UX 검증 범위를 5개 대표 직무에서 10개 직무로 넓혔다. 단순 개수 확대가 아니라 전공 경계가 헷갈릴 수 있는 직무를 추가해 `전공 / 상세직무내용 / 직무 관련 교육`이 실제 화면에서 구분되고 연결되는지 확인했다.

변경 내용:

- `industryLabels`에 UI 선택지와 맞는 산업 라벨을 보강했다.
  - 데이터센터·인프라
  - 항공·우주
  - 국방·방산
  - 전력·ESS
  - AI·데이터
  - 환경·수처리
- 브라우저 QA 샘플을 10개 직무로 확대했다.
  - 기존 5개: 임베디드 펌웨어, 품질보증·품질관리, 배터리 공정, 소재 R&D, 드론·UAM 비행제어
  - 추가 5개: 자율주행 인지 알고리즘, 데이터센터 전력설비, 제조 데이터, 반도체 패키징 공정, 전력전자·인버터
- QA가 프로필 요약 바에서 산업 라벨이 코드값(`ai`, `infrastructure` 등)으로 노출되지 않는지 확인하도록 했다.
- 첫 2주차 추천 교육 사이에 같은 교육이 반복되면 실패하도록 브라우저 QA 기준을 강화했다.
- 로드맵 추천 로직에서 이미 앞 주차에 추천한 교육은 기본 주차에서 다시 추천하지 않도록 조정했다.
  - 예외는 사용자가 직접 저장한 교육을 8주 심화의 반복·보강 주차에서 다시 참조하는 경우로 제한했다.

검증 결과:

- `node --check app.js` PASS
- `node --check data/baseData.js` PASS
- `node --check scripts/browser-ux-sample.mjs` PASS
- `npm.cmd run audit:education` PASS, P0/P1/P2 0건
- `npm.cmd run check` PASS
- `npm.cmd run coverage:summary` PASS
  - 앱 함수 277/277 실행, 100%
  - 렌더/UI 함수 68/68 실행, 100%
  - 추천/직무/교육 로직 함수 191/191 실행, 100%
- `npm.cmd run qa:ux` PASS
  - 10개 대표 직무 × 2개 뷰포트 = 20개 샘플
  - failures 0
  - 첫 2주차 사이 반복 교육 0건
  - 스크린샷/리포트: `tmp/browser-ux-samples/run-67312-1782903301189`

판단:

- 전공 경계가 섞이는 샘플에서도 전공, 직무, 교육이 화면상 다른 개념으로 구분되어 읽힌다.
- 산업 라벨 누락으로 코드값이 사용자에게 보일 위험을 줄였다.
- 기존 감사가 잡던 `짧은 자료 중복`보다 더 강한 기준으로, 실제 첫 2주 추천 카드 사이의 반복 노출도 막았다.

다음 단계:

1. 실제 학생 표본에서는 자동 QA가 보는 구조 문제가 아니라 “직무명이 이해되는가”, “첫 교육이 왜 필요한지 납득되는가”를 관찰한다.
2. 파일럿 전에 `전공 경계 샘플`을 고정 회귀 세트로 유지하고, 신규 직무를 추가할 때 해당 세트에 1개 이상 반영한다.
3. 추천 교육을 더 늘리기보다, 각 직무의 첫 산출물과 직접 연결되는 자료인지 계속 우선 검토한다.

## 추가 진행 - 학생 페르소나 기반 추천 검증

실제 학생 표본을 만나기 전에, 앱 내부의 페르소나 판정이 상태 변화에 맞게 동작하는지 자동 QA로 고정했다. 전공, 산업, 직무, 준비 기간, 역량 체크 수, 저장 교육을 다르게 설정해 추천 문구와 교육 매핑이 맞는지 확인한다.

변경 내용:

- `scripts/persona-qa.mjs`를 추가했다.
- `npm.cmd run qa:persona` 스크립트를 추가했다.
- `npm.cmd run check`에 persona QA를 포함해 일반 검증에서 함께 실행되도록 했다.
- 검증 페르소나 7개를 설정했다.
  - 직무 미확신/역량 체크 전 학생
  - 단기 준비 학생
  - 전공 확장 학생
  - 도전 직무 학생
  - 기초 보완 학생
  - 실행 계획 학생
  - 전공 직결 학생
- 각 페르소나에서 다음을 확인한다.
  - 기대한 `학생 페르소나` 제목으로 분류되는지
  - 전공 적합도 경로가 `direct`, `bridge`, `challenge` 중 기대값과 맞는지
  - 첫 2주차 교육 추천이 비지 않는지
  - 첫 2주차 사이 교육이 중복 노출되지 않는지
  - 직무 교육 매핑 의견이 `교육 매핑 확인`으로 나오는지
  - 추천 기준 패널에 주요 페르소나 라벨이 모두 표시되는지

검증 결과:

- `npm.cmd run qa:persona` PASS
  - personas 7
  - failures 0
- `npm.cmd run check` PASS
  - 데이터 검증, 공고 QA, render smoke, persona QA, Vite build 통과
- `npm.cmd run audit:education` PASS, P0/P1/P2 0건
- `npm.cmd run coverage:summary` PASS
  - 앱 함수 277/277 실행, 100%
  - 렌더/UI 함수 68/68 실행, 100%
  - 추천/직무/교육 로직 함수 191/191 실행, 100%

판단:

- 페르소나 판정은 현재 우선순위대로 동작한다.
  - 역량 체크 전이면 먼저 `역량 체크 전 학생`으로 본다.
  - 2주 준비는 `단기 준비 학생`으로 본다.
  - 전공 확장/도전 경로는 직결로 과장하지 않고 별도 페르소나로 분리된다.
  - 직결 경로에서 부족 역량이 많으면 `기초 보완 학생`, 저장 교육이 있으면 `실행 계획 학생`, 그 외에는 `전공 직결 학생`으로 분류된다.
- 이 기준은 실제 학생 인터뷰 전에 자동 회귀 기준으로 유지할 수 있다.

다음 단계:

1. 실제 학생 인터뷰에서는 이 7개 페르소나 중 어디에 가까운지 표시하고, 앱의 판정과 학생 자기인식이 어긋나는지 확인한다.
2. 브라우저 UX QA에는 전체 페르소나를 모두 넣기보다, `전공 확장`, `도전 직무`, `단기 준비`처럼 오해 위험이 큰 3개만 대표 화면 검증으로 추가하는 것을 검토한다.
3. 페르소나 문구는 설명을 늘리기보다, 첫 교육 추천 이유와 최종 산출물 문구가 학생에게 납득되는지 위주로 조정한다.

## 추가 진행 - 페르소나 실제 브라우저 화면 검증

VM 기반 persona QA에 이어, 오해 위험이 큰 페르소나 3개를 실제 브라우저 UX 샘플에 추가했다. 역량 체크와 준비 기간을 실제 DOM 이벤트로 변경한 뒤, 화면에 표시되는 `학생 페르소나` 문구와 첫 2주 추천 교육을 함께 검증한다.

변경 내용:

- `scripts/browser-ux-sample.mjs`에 페르소나 상태 주입을 추가했다.
  - `durationWeeks`: 준비 기간 선택값
  - `checkedMode`: 역량 체크박스를 실제 이벤트로 체크
  - `expectedPersona`: 화면에 보여야 하는 학생 페르소나
- 브라우저 샘플에 3개 페르소나 시나리오를 추가했다.
  - 단기 준비 학생: 컴퓨터공학 → 임베디드 펌웨어, 2주 준비, 역량 전체 체크
  - 전공 확장 학생: 전자공학 → 데이터센터 전력설비, 4주 준비, 역량 전체 체크
  - 도전 직무 학생: 기계공학 → 자율주행 인지 알고리즘, 4주 준비, 역량 전체 체크
- 각 페르소나 샘플에서 다음을 추가 확인한다.
  - `학생 페르소나` 문구가 기대값과 일치하는지
  - 역량 체크 수가 실제 화면 상태에 반영되는지
  - 첫 2주차 추천 교육이 비지 않는지
  - 첫 2주차 사이 교육이 중복되지 않는지
  - 모바일/데스크톱 가로 overflow가 없는지

검증 결과:

- `node --check scripts/browser-ux-sample.mjs` PASS
- `npm.cmd run qa:persona` PASS, personas 7, failures 0
- `npm.cmd run qa:ux` PASS
  - 13개 시나리오 × 2개 뷰포트 = 26개 샘플
  - failures 0
  - 페르소나 3개 모두 기대 문구 표시
  - 페르소나 샘플 첫 2주차 교육 중복 0건
  - 스크린샷/리포트: `tmp/browser-ux-samples/run-54448-1782904269083`
- `npm.cmd run check` PASS

판단:

- 페르소나 판정은 VM 함수 수준뿐 아니라 실제 브라우저 화면에서도 정상 동작한다.
- 특히 `도전 직무 학생`은 전공 직결처럼 보이지 않고, 화면에서 `도전 직무`로 분리되어 표시된다.
- 자동 QA 기준에서는 페르소나 3개 모두 첫 2주 교육 추천이 비지 않고, 반복 노출도 없다.

다음 단계:

1. 실제 학생 인터뷰에서 이 3개 페르소나 화면을 우선 보여주고, “이 설명이 내 상황을 맞게 표현하는가”를 확인한다.
2. `큰 공백 없음`처럼 역량을 모두 체크한 상태의 문구가 학생에게 너무 낙관적으로 보이는지 관찰한다.
3. 학생 반응이 어긋나면 페르소나 이름보다 첫 산출물과 첫 교육 추천 이유를 먼저 조정한다.

## 추가 진행 - 학생 인터뷰 프로토콜 작성

자동 QA로 확인한 페르소나, 전공-직무-교육 연결, 중복 추천 방지 기준을 실제 학생 관찰로 검증하기 위해 현장용 인터뷰 프로토콜을 추가했다.

산출물:

- `docs/STUDENT_INTERVIEW_PROTOCOL_2026-07-01.md`

주요 내용:

- 30분 인터뷰 기준으로 전공 선택, 상세 직무 카드 선택, 역량 체크, 교육 추천, 페르소나 문구, 내 커리큘럼 추가까지 순서화했다.
- 학생이 `전공`, `상세직무내용`, `직무 관련 교육`을 자기 말로 구분하는지 확인하는 과업을 별도로 넣었다.
- 첫 추천 교육이 해당 직무에 실제로 도움이 된다고 납득되는지, 1-2주차 추천이 중복이나 선후관계 역전처럼 보이지 않는지 관찰 기준을 만들었다.
- 7개 자동 QA 페르소나와 3개 고위험 브라우저 페르소나 화면을 인터뷰 기록 기준에 연결했다.
- `큰 공백 없음` 같은 역량 체크 후 문구가 과하게 낙관적으로 보이는지 별도 관찰 항목으로 지정했다.

판단:

- 지금까지의 자동 QA는 구조적 회귀를 잡는 기준으로 유지한다.
- 다음 품질 판단은 교육 자료 개수 확대가 아니라, 학생이 첫 추천 교육의 직무 도움을 설명할 수 있는지로 본다.

다음 단계:

1. 학생 5명으로 파일럿 인터뷰를 먼저 진행한다.
2. 같은 혼동이 2회 이상 반복되는 항목만 코드/문구 수정 우선순위로 올린다.
3. 우선순위는 `첫 추천 교육 이유`, `전공-상세직무-교육 구분`, `1-2주차 추천 순서`, `페르소나 문구` 순서로 둔다.

## 추가 진행 - 학생 인터뷰 결과 누적 및 요약 장치

인터뷰 프로토콜을 실제 실행 결과로 이어가기 위해 CSV 입력 템플릿과 요약 스크립트를 추가했다. 목표는 파일럿 후 주관적 메모를 그대로 두지 않고, 2회 이상 반복된 혼동만 수정 우선순위로 올리는 것이다.

산출물:

- `docs/STUDENT_INTERVIEW_RESULTS_TEMPLATE_2026-07-01.csv`
- `scripts/summarize-student-interviews.mjs`
- `npm.cmd run summarize:interviews`

주요 내용:

- 인터뷰 기록은 개인정보 대신 `interview_id` 중심으로 남기도록 했다.
- 전공 적합도, 상세직무 이해, 교육 추천 이해, 1-2주차 순서, 페르소나 문구, 내보내기 유용성을 각각 `pass/hold/fix`로 기록할 수 있게 했다.
- `first_recommendation_reason`, `concept_confusion`, `week_sequence`, `persona_copy`, `export_usefulness`, `language_access`, `resource_quality` 이슈 카테고리를 표준화했다.
- 요약 스크립트는 CSV에서 2회 이상 반복된 이슈를 찾아 다음 수정 우선순위를 출력한다.

검증 결과:

- `node --check scripts/summarize-student-interviews.mjs` PASS
- `npm.cmd run summarize:interviews` PASS
  - 현재 템플릿에는 인터뷰 행이 없으므로 interviews 0, repeatedIssues 0으로 정상 종료

판단:

- 다음 실제 파일럿에서 학생 반응이 나오면, 교육 수를 늘리기 전에 반복 이슈가 어느 범주인지 먼저 확인할 수 있다.
- 특히 `첫 추천 교육 이유`와 `전공-상세직무-교육 구분`은 2회 이상 반복되면 P0 수정 후보로 본다.

다음 단계:

1. 학생 5명 인터뷰 후 CSV에 결과를 입력한다.
2. `npm.cmd run summarize:interviews -- docs/STUDENT_INTERVIEW_RESULTS_TEMPLATE_2026-07-01.csv`로 반복 이슈를 확인한다.
3. 반복 이슈가 있으면 교육 데이터 추가보다 추천 이유 문구, 상세직무 카드, 주차 순서 로직을 먼저 수정한다.
