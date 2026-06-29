# 직무역량 커리큘럼 추천 앱 가이드

## 목적

이 앱은 학생이 지원하려는 세부 직무를 고르고, 해당 직무의 실제 업무·필수 역량·우대 역량을 확인한 뒤, 부족한 역량 중심으로 실행 가능한 교육 계획을 만드는 도구다.

추천 결과는 일반적인 직무 내용과 공개 교육 자료를 기반으로 한다. 최종 준비 계획은 반드시 지원 회사의 직무상세, 자격요건, 우대사항과 대조해 조정해야 한다.

현재 구현 기준은 16개 직무군, 96개 세부 직무, 123개 교육자료다.

## 핵심 사용자 흐름

1. 전공과 관심 산업을 선택한다.
2. 관련 세부 직무를 고른다.
3. 선택 직무 바로 아래에서 워드클라우드, 직무 설명, 반복 업무, 자격요건, 우대 역량을 확인한다.
4. 이미 보유한 역량을 체크한다.
5. 체크하지 않은 부족 역량 중심으로 추천 교육을 확인한다.
6. 교육 소개, 다루는 역량, 추천 이유, 추천 의견, 완성할 산출물을 보고 필요한 교육만 내 커리큘럼에 추가한다.
7. 내 커리큘럼에서 주차별 과제, 연결 교육, 완료 여부를 확인한다.
8. 필요하면 엑셀로 내보내 지원 회사 공고와 다시 대조한다.

## UX 원칙

- Simple is the best를 우선한다.
- 사용자가 지금 해야 할 선택과 그 결과가 한 화면에서 자연스럽게 이어져야 한다.
- 직무 선택 결과는 직무 카드와 멀리 떨어져 있으면 안 된다.
- 중요한 안내는 접힌 상세 영역 안에 숨기지 않는다.
- 상세 정보는 관심 있는 사용자가 펼쳐볼 수 있게 둔다.
- 추천 자료 전체 목록은 핵심 흐름이 아니라 참고자료로 분리한다.
- 자동 탭 이동은 사용자가 흐름을 잃지 않을 때만 허용한다.
- 처음부터 다시 시작 버튼은 최상단에 둔다.
- 카드 안의 텍스트와 태그는 박스를 넘어가면 안 된다.
- 추천 교육, 과제, 자료 항목은 서로 붙어 보이지 않도록 간격과 테두리로 단위를 분명히 구분한다.

## 브랜드·시각 시스템

색 비율은 Cream 60, Navy 30, Gold 10을 기준으로 한다.

| 역할 | 색상 | 사용처 |
|---|---|---|
| Primary Ink | `#0E2750` | 본문, 구조, 주요 버튼, 표 헤더 |
| Signal Gold | `#C9A86A` | 핵심 강조, CTA, 추천 교육 단위 구분 |
| Paper Cream | `#F2F1EC` | 기본 배경, 패널 배경 |
| Deep BG | `#061328` | 강한 대비가 필요한 구조 요소 |

Gold는 강조용으로만 사용하고, 배경 전체를 금색 계열로 만들지 않는다.

웹 폰트는 Pretendard, Noto Serif KR, JetBrains Mono 체계를 사용한다. 본문과 UI는 Pretendard 중심으로 유지하고, 장식적 serif 사용은 제한한다.

## 직무 콘텐츠 작성 기준

각 세부 직무는 다음 요소를 갖춰야 한다.

- 핵심 업무: 실제로 무엇을 하는 직무인지 한 문장으로 설명
- 반복 업무: 채용공고에서 반복적으로 보이는 업무
- 필수 역량: 지원자가 준비해야 하는 기본 역량
- 우대 역량: 있으면 차별화되는 도구, 실습, 프로젝트 경험
- 주요 용어: 워드클라우드와 직무 상세에 반영할 실무 용어
- 도구: MATLAB, Simulink, CANoe, KiCad, Minitab, Python 등 직무별 사용 가능성이 높은 도구
- 산출물: 교육 후 남길 수 있는 보고서, 체크리스트, 모델, 로그 분석표, 회로 리뷰표 등

직무 설명은 추상적인 표현보다 학생이 지원 직무 적합성을 판단할 수 있는 구체적인 업무 언어를 우선한다.

## 확장 우선순위와 보강 현황

현재 앱에서 가장 빈약했던 영역은 전기공학, 항공·우주·국방, 로봇·자동화, 전력·ESS, AI 적용 직무다.

- 전기공학: 기존에는 전자공학 안에 섞여 있어 전력계통, 전력설비, 전기기기, PCS, ESS 직무 판단이 약했다.
- 항공·우주·국방: 요구사항 추적, 항전 통합, 비행제어, 레이더·RF, 시험평가 직무가 거의 보이지 않았다.
- 로봇·자동화: 산업 필터는 있었지만 로봇 기구, 제어, 인지, PLC·계장, 스마트팩토리 직무가 독립적으로 부족했다.
- 전력·ESS: BMS는 자동차 쪽에 있었지만 ESS, PCS, EMS, 보호계전, 계통연계 관점이 부족했다.
- AI 적용: AI가 보조 역량으로만 들어가 있어 제조 AI, 예지보전, 비전검사, 엔지니어링 데이터 분석처럼 지원자가 직접 선택할 직무로 약했다.
- 자율주행·차량 SW: ADAS 검증은 있었지만 인지, 센서퓨전, 판단·경로계획, SDV/AUTOSAR, UDS·OTA, 차량 보안 직무가 충분히 나뉘지 않았다.
- 데이터센터 전력·열관리: 전기·기계 전공자가 지원할 수 있는 인프라 직무인데 UPS, 수배전, 냉각, BMS/DCIM, PUE 관점이 없었다.
- 반도체 후공정·패키징·테스트: HBM, advanced packaging, Probe/Final Test, ATE, 신뢰성, FA가 별도 직무로 충분히 보이지 않았다.
- 스마트팩토리·제조 DX: MES, SCADA, OPC UA, PLC, OEE, 제조 데이터, 비전검사처럼 최근 제조 공고에 반복되는 직무 언어가 더 필요했다.
- 화학공학 고도화: 수소, CCUS, 수처리, 배터리 리사이클, 고분자·필름, scale-up, 환경안전 쪽 직무 선택지가 부족했다.

확장할 때는 단순히 직무명을 늘리지 않는다. 각 직무마다 채용공고에서 반복되는 업무, 필수 역량, 우대 역량, 도구, 워드클라우드 용어, 추천 교육, 최종 산출물이 함께 들어가야 한다.

## 교육 추천 기준

교육은 단순 링크가 아니라 커리큘럼 구성 단위로 관리한다.

필수 필드:

- 제목
- 제공처
- 자료 형식
- 난이도
- 예상 학습 시간
- 실습 시간
- 선행 조건
- 연결 역량
- 추천 이유
- 추천 의견
- 완성할 산출물
- URL

추천 교육은 다음 순서로 평가한다.

1. 선택 직무와 직접 연결되는가
2. 부족 역량을 보완하는가
3. 실제 산출물로 이어지는가
4. 공식 자료, 대학 공개강의, 검수된 실습 자료인가
5. 영상만 보고 끝나지 않고 실습 또는 정리 과제로 이어지는가
6. 학생이 감당 가능한 시간과 난이도인가
7. 지원 회사 공고와 맞지 않을 때 제외하기 쉬운가

조회수와 댓글 품질은 참고 신호로만 사용한다. 사용자에게 조회수와 댓글 수를 그대로 보여줄 필요는 없다.

## 대표 직무 교육 검토 기준

### HIL·SIL 검증 엔지니어

우선 교육은 요구사항, 테스트 케이스, HIL I/O, CAN 신호, fault injection, Pass/Fail 판정 기준으로 이어져야 한다.

우선 자료:

- Simulink Test 테스트 하네스·Test Manager 예제
- Simulink 연료 제어 Fault-Tolerant 예제
- MathWorks HIL Testing 영상
- NI 계측·시험 자동화 자료

완성할 산출물:

- 요구사항별 테스트 케이스 매트릭스
- HIL 입출력 정의표
- 실패 로그 원인 분류 리포트

### 임베디드 펌웨어 엔지니어

우선 교육은 MCU 주변장치, C 메모리, 인터럽트, UART/SPI/I2C/CAN, 디버깅 절차로 이어져야 한다.

우선 자료:

- STM32 MOOC GPIO·Timer·UART 핵심 단원
- Arm Embedded Systems Education Kit
- STM32 Education
- Stateflow Onramp
- Simulink Fault-Tolerant 예제

완성할 산출물:

- MCU 주변장치 매핑표
- UART 로그와 오류 케이스 정리
- 디버깅 재현 절차 README

### 반도체 식각 공정 엔지니어

우선 교육은 plasma etch, RF power, pressure, gas flow, selectivity, etch rate, endpoint, residue, CD bias, uniformity로 이어져야 한다.

우선 자료:

- Plasma Etch Process 핵심 개념
- 렛유인 반도체 현장실습/공정 데이터 자료
- MIT Semiconductor Devices
- Statistics Onramp
- DOE 자료

완성할 산출물:

- 식각 recipe DOE 표
- CD·uniformity 개선 리포트
- residue/over etch 원인 가설표

### 자동차 생산기술 엔지니어

우선 교육은 APQP, PPAP, PFMEA, Control Plan, line setup, takt time, OEE, fixture, vision inspection으로 이어져야 한다.

우선 자료:

- 코멘토 생산기술·공정설계 과제형 자료
- 코멘토 생산관리 핵심 실무
- Quality-One FMEA
- ASQ FMEA·8D
- NIST process capability

완성할 산출물:

- 공정 흐름·설비·치구 검토표
- PFMEA/Control Plan 초안
- 초기 품질 개선 리포트

### PCB 설계 엔지니어

우선 교육은 stack-up, controlled impedance, return path, decoupling, ground plane, creepage, clearance, DFM, DFT, EMC로 이어져야 한다.

우선 자료:

- KiCad PCB 설계 공식 문서
- TI Power Management 교육
- All About Circuits 핵심 단원
- TI Precision Labs
- EMC/EMI 기초 자료

완성할 산출물:

- PCB 리뷰 체크리스트
- 전원 Tree와 리플·발열 검증표
- 측정 포인트와 DFM/DFT 검토표

## 신규 확장 직무군 검토 기준

### 항공·우주·국방

채용공고에서 반복되는 신호는 요구사항, 체계공학, 항전 통합, 비행제어, 센서융합, RF·레이더, 시험평가, 환경시험, MIL-STD다.

우선 교육은 Aerospace Blockset, UAV Toolbox, PX4, 신호처리, 계측·시험 자료를 중심으로 연결한다. 완성할 산출물은 임무 요구사항표, ICD 초안, 비행 로그 분석, 시험평가 매트릭스다.

### 로봇·자동화

채용공고에서 반복되는 신호는 로봇 기구, 모션제어, ROS2, SLAM, Navigation, OpenCV, PLC, SCADA, MES, 인터록, 안전제어다.

우선 교육은 Robotics System Toolbox, ROS Toolbox, Navigation2, PLC·계장 실무, 예지보전 자료를 중심으로 연결한다. 완성할 산출물은 로봇 작업 시퀀스, I/O 정의표, ROS 노드 구성도, 안전 인터록 체크리스트다.

### 전력·ESS

채용공고에서 반복되는 신호는 전력계통, 수배전, 보호계전, PCS, ESS, BMS, EMS, SCADA, 인버터, 전력전자, 전기기기, 절연·열 안전이다.

우선 교육은 Simscape Electrical, Simscape Battery, Motor Control Blockset, TI Power Management, 계측·시험 자료를 중심으로 연결한다. 완성할 산출물은 전력 요구사항표, ESS 구성도, 보호 로직 테스트 케이스, 충방전 로그 분석 리포트다.

### AI 적용 엔지니어링

채용공고에서 반복되는 신호는 제조 AI, 이상탐지, 예지보전, 비전검사, 데이터 전처리, 모델 평가, MLOps, Python, SQL, 대시보드다.

우선 교육은 Machine Learning Onramp, Deep Learning Onramp, Google ML Crash Course, Predictive Maintenance, Python/SQL 자료를 중심으로 연결한다. 완성할 산출물은 데이터 정의서, 모델 평가 리포트, 오탐·미탐 분석표, 현장 적용 리스크 체크리스트다.

### 자율주행·차량 SW

채용공고에서 반복되는 신호는 Perception, Sensor Fusion, Localization, Planning, Control, Scenario, RoadRunner, AUTOSAR, SDV, SOME/IP, UDS, OTA, ISO 21434다.

우선 교육은 Automated Driving Toolbox, RoadRunner, Sensor Fusion Onramp, AUTOSAR Blockset, Vehicle Network Toolbox, HIL/SIL 검증 자료를 중심으로 연결한다. 완성할 산출물은 자율주행 기능 요구사항표, 센서/CAN 로그 동기화표, 시나리오 검증표, AUTOSAR 인터페이스 정의서, UDS·OTA 테스트 케이스다.

### 데이터센터 전력·열관리

채용공고에서 반복되는 신호는 데이터센터, UPS, 수배전, 발전기, ATS/STS, BMS, DCIM, HVAC, chiller, PUE, 예방정비, 장애 대응이다.

우선 교육은 Data Center University, Simscape Electrical, Simscape Fluids, 계측·시험 자료를 중심으로 연결한다. 완성할 산출물은 전력 단선도 검토표, 냉각 용량 계산표, BMS/DCIM 알람 원인분석표, 장애 대응 체크리스트다.

### 반도체 후공정·패키징·테스트

채용공고에서 반복되는 신호는 Advanced Packaging, HBM, TSV, bump, substrate, Probe Test, Final Test, ATE, binning, reliability, HAST, HTOL, C-SAM, X-ray, FA다.

우선 교육은 Semiconductor Engineering의 packaging/test 자료, 렛유인 수율·결함 분석 자료, 통계·Python 자료를 중심으로 연결한다. 완성할 산출물은 패키지 구조·불량 연결표, test bin Pareto, 신뢰성 시험 리포트, FA 원인 가설표다.

### 스마트팩토리·제조 DX

채용공고에서 반복되는 신호는 MES, SCADA, PLC, OPC UA, SQL, Python, OEE, downtime, alarm, dashboard, vision inspection, OpenCV, YOLO다.

우선 교육은 OPC UA 공식 개요, Predictive Maintenance, PLC·SCADA 실무 자료, Python/SQL, 비전 AI 자료를 중심으로 연결한다. 완성할 산출물은 설비 데이터 정의서, PLC-SCADA-MES 인터페이스 정의서, OEE 손실 Pareto, 제조 대시보드 또는 비전검사 기준표다.

### 화학·소재·환경 고도화

채용공고에서 반복되는 신호는 수소, CCUS, 수처리, 폐수, 막분리, 배터리 리사이클, 고분자, 필름, 코팅, 물성, scale-up, HAZOP, PSM이다.

우선 교육은 LearnChemE 반응·분리, AIChE CCPS, DOE Hydrogen/Carbon Capture, 공정안전 자료를 중심으로 연결한다. 완성할 산출물은 공정 흐름도와 물질수지, 분석 결과-품질 지표 연결표, scale-up 리스크표, 환경안전 체크리스트다.

## 워드클라우드 기준

워드클라우드는 직무 상세 내용의 핵심 용어를 반영해야 한다.

포함 대상:

- 반복 업무
- 필수 역량
- 우대 역량
- 주요 도구
- 시뮬레이션·검증 도구
- 공정/시험/품질 지표

가장 중요한 단어는 중앙에 크고 명확하게 보여야 한다. 겹침은 피하되, 공백을 과도하게 만들지 않는다.

## 내 커리큘럼 기준

내 커리큘럼은 학생이 실행할 계획이다. 따라서 교육 목록보다 주차별 과제와 산출물이 더 중요하다.

각 주차 카드에는 다음이 보여야 한다.

- 주차
- 과제명
- 목표
- 완료 체크
- 연결 추천 교육
- 교육 소개
- 다루는 역량
- 추천 이유
- 추천 의견
- 산출물

교육을 이미 내 커리큘럼에 추가했다면 다시 "추가"로 보이지 않아야 한다.

## 엑셀 내보내기 기준

엑셀은 완성된 문서처럼 보여야 한다.

필수 시트:

- 요약
- 실행계획
- 선택직무상세
- 회사공고대조
- 교육자료
- 역량체크

엑셀에도 추천 의견, 학생 페르소나, 직무 상세, 산출물, URL이 포함되어야 한다.

## 배포·캐시 기준

Cloudflare Pages와 브라우저 캐시 때문에 이전 내용이 보일 수 있다.

수정 후 확인할 것:

- `index.html`의 `app.js`와 `styles.css` 버전 쿼리 갱신
- `npm.cmd run build` 성공
- 배포 후 강력 새로고침 또는 캐시 무효화 필요 여부 확인
- PWA 서비스워커가 오래된 정적 파일을 잡고 있지 않은지 확인

캐시 문제는 사용자가 앱을 신뢰하지 못하게 만드는 주요 원인이므로, UI 수정마다 버전 쿼리를 갱신한다.

## QA 체크 기준

최소 검증 페르소나:

- 기계공학 + 자동차·모빌리티 + HIL·SIL 검증
- 전자공학 + 전자/하드웨어 + 임베디드 펌웨어
- 화학공학 + 반도체 + 식각 공정

검증 항목:

- 직무 선택 결과가 바로 보이는가
- 워드클라우드가 직무 상세 용어를 반영하는가
- 추천 교육이 직무와 부족 역량에 맞는가
- 교육 상세에 교육 소개, 다루는 역량, 추천 이유, 추천 의견, 산출물이 보이는가
- 내 커리큘럼에서 주차별 실행 순서가 명확한가
- 추천교육 단위가 시각적으로 분리되는가
- 버튼 문구가 일관적인가
- 모바일과 데스크톱에서 텍스트가 넘치지 않는가
- 엑셀 내보내기가 정상 동작하는가

## 작업 운영 원칙

- 앱 수정 후 가능한 한 바로 빌드와 브라우저 QA를 수행한다.
- 사용자가 요청한 경우 수정 단위마다 커밋하고 푸시한다.
- 기존에 남아 있는 무관한 문서 변경은 별도 요청이 없으면 커밋하지 않는다.
- 새 직무나 교육 자료를 추가할 때는 UI보다 먼저 직무-역량-산출물 연결성을 검토한다.
- 자료를 많이 추가하는 것보다 학생이 왜 이 교육을 선택해야 하는지 이해하게 만드는 것이 우선이다.
