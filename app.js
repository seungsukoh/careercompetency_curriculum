const tracks = [
  {
    id: "mechanical-cae",
    title: "기계 설계·CAE",
    majors: ["mechanical", "both"],
    industries: ["mobility", "robotics", "manufacturing"],
    difficulty: "중",
    summary: "제품 요구사항을 도면, CAD 모델, 해석 리포트, 시험 조건으로 바꾸는 직무입니다.",
    tasks: ["요구사항 분석", "3D 모델링과 도면화", "구조·열 해석", "시제품 시험과 개선"],
    skills: ["재료역학", "기계요소설계", "CAD", "FEA", "공차·제조성"],
    tools: ["CAD", "CAE", "Excel", "MATLAB/Python"],
    outputs: ["설계 검토 보고서", "해석 리포트", "도면 변경 근거", "시험 결과 요약"],
    misconceptions: ["CAD 버튼을 외우는 것만으로는 부족합니다.", "해석 결과는 경계조건과 검증 논리가 핵심입니다."]
  },
  {
    id: "production-quality",
    title: "생산·공정·품질",
    majors: ["mechanical", "electrical", "chemical", "both"],
    industries: ["manufacturing", "mobility", "electronics", "semiconductor"],
    difficulty: "중",
    summary: "공정이 안정적으로 좋은 제품을 만들도록 조건, 설비, 품질 데이터를 관리하는 직무입니다.",
    tasks: ["공정 조건 관리", "불량 원인 분석", "SPC와 공정능력 확인", "개선안 실행"],
    skills: ["통계", "SPC", "FMEA", "DOE", "8D 문제해결"],
    tools: ["Excel", "Minitab/R", "Python", "MES 기초"],
    outputs: ["불량 분석 보고서", "공정능력 요약", "FMEA 표", "개선 전후 데이터"],
    misconceptions: ["품질은 꼼꼼함보다 계측, 통계, 원인분석이 중요합니다.", "생산기술은 단순 현장 관리가 아닙니다."]
  },
  {
    id: "semiconductor-equipment",
    title: "반도체 공정·장비",
    majors: ["mechanical", "electrical", "chemical", "both"],
    industries: ["semiconductor"],
    difficulty: "상",
    summary: "웨이퍼 공정과 장비 조건을 이해하고 수율, 설비 안정성, 공정 문제를 개선하는 직무입니다.",
    tasks: ["공정 흐름 이해", "장비 조건 관리", "수율·불량 데이터 분석", "진공·플라즈마 기초 적용"],
    skills: ["반도체 소자", "공정 흐름", "진공·플라즈마", "계측", "데이터 분석"],
    tools: ["Excel", "Python", "SPC", "장비 로그"],
    outputs: ["공정 흐름도", "불량 Pareto 분석", "조건 변경 검토표", "수율 개선 가설"],
    misconceptions: ["반도체 공정은 전자회로만으로 설명되지 않습니다.", "물리, 화학, 재료, 장비 이해가 함께 필요합니다."]
  },
  {
    id: "chemical-process",
    title: "화학공정·소재",
    majors: ["chemical", "both"],
    industries: ["chemical", "battery", "manufacturing", "semiconductor"],
    difficulty: "중",
    summary: "원료, 반응, 분리, 품질, 안전 조건을 연결해 공정과 소재 생산을 개선하는 직무입니다.",
    tasks: ["물질수지와 공정 흐름 이해", "반응·분리 조건 검토", "품질·수율 데이터 분석", "공정안전과 환경 리스크 관리"],
    skills: ["물질수지", "열역학", "반응공학", "분리공정", "공정안전"],
    tools: ["Excel", "MATLAB/Python", "Aspen/HYSYS", "JMP/Minitab", "LIMS/MES"],
    outputs: ["공정 흐름도", "조건 변경 검토표", "수율·품질 분석", "HAZOP 체크리스트"],
    misconceptions: ["화학공학은 실험실 연구만이 아니라 양산 공정 조건과 안전 판단 비중이 큽니다.", "공식 암기보다 물질수지, 데이터, 리스크를 연결하는 설명이 중요합니다."]
  },
  {
    id: "electronics-pcb",
    title: "전자회로·PCB·하드웨어",
    majors: ["electrical", "both"],
    industries: ["electronics", "mobility", "robotics"],
    difficulty: "중",
    summary: "전원, 신호, 노이즈, 부품 선정, PCB 레이아웃, 검증을 연결하는 하드웨어 직무입니다.",
    tasks: ["회로 요구사항 정의", "부품 선정", "회로 시뮬레이션", "PCB 검토", "계측 검증"],
    skills: ["회로이론", "전자회로", "전원회로", "PCB", "계측·디버깅"],
    tools: ["SPICE", "PCB CAD", "오실로스코프", "멀티미터"],
    outputs: ["회로 블록도", "부품 선정표", "PCB 리뷰 체크리스트", "측정 결과 리포트"],
    misconceptions: ["아두이노 실습만으로 제품 하드웨어 설계를 설명하기 어렵습니다.", "전원, EMC, 신뢰성 검토가 중요합니다."]
  },
  {
    id: "embedded-control",
    title: "임베디드·제어",
    majors: ["mechanical", "electrical", "both"],
    industries: ["mobility", "robotics", "electronics"],
    difficulty: "중",
    summary: "센서, MCU, 통신, 제어 알고리즘을 실제 장치에서 안정적으로 동작시키는 직무입니다.",
    tasks: ["MCU 주변장치 제어", "통신 프로토콜 구현", "센서 데이터 처리", "PID 제어와 디버깅"],
    skills: ["C언어", "MCU", "인터럽트", "UART/SPI/I2C/CAN", "제어공학"],
    tools: ["STM32/Arduino", "Logic Analyzer", "Git", "MATLAB/Python"],
    outputs: ["펌웨어 저장소", "통신 로그", "제어 응답 그래프", "디버깅 노트"],
    misconceptions: ["임베디드는 앱 개발보다 하드웨어 타이밍과 디버깅 비중이 큽니다.", "제어는 공식보다 모델링과 실험 튜닝이 중요합니다."]
  }
];

tracks.splice(1, 0, {
  id: "automotive-mobility",
  title: "자동차·모빌리티",
  majors: ["mechanical", "electrical", "both"],
  industries: ["mobility", "manufacturing", "electronics"],
  difficulty: "중",
  summary: "차량 시스템 요구사항을 차체·섀시·파워트레인·전장·제어·검증 산출물로 나누어 개발하는 직무군입니다.",
  tasks: ["차량 요구사항 분해", "차체·섀시·열관리 설계", "전장·제어 시스템 검증", "실차·HIL 시험과 양산 이관"],
  skills: ["차량동역학", "차체·섀시", "전장 아키텍처", "CAN/LIN", "HIL·실차검증"],
  tools: ["CATIA/Creo", "MATLAB/Simulink", "CANoe/CANalyzer", "HIL", "Excel/Python"],
  outputs: ["차량 시스템 요구사항표", "부품·제어 인터페이스 정의서", "시험계획서", "검증 리포트"],
  misconceptions: ["자동차 직무는 기구설계 하나로 끝나지 않고 차체, 섀시, 전장, 제어, 검증으로 세분화됩니다.", "전공과 맞는지 보려면 부품명보다 반복 업무와 시험 산출물을 함께 봐야 합니다."]
});

function normalizeResource(resource) {
  const estimatedMinutes = resource.estimatedMinutes ?? Math.max(30, (resource.hours || 1) * 60);
  const practiceMinutes = resource.practiceMinutes ?? getDefaultPracticeMinutes(resource.difficulty, estimatedMinutes);
  const languageCode = resource.language === "한국어" ? "ko" : "en";

  return {
    ...resource,
    languageCode,
    sequenceLevel: resource.sequenceLevel ?? getSequenceLevel(resource.difficulty),
    estimatedMinutes,
    practiceMinutes,
    totalMinutes: estimatedMinutes + practiceMinutes,
    prerequisites: resource.prerequisites ?? getDefaultPrerequisites(resource.difficulty),
    expectedOutput: resource.expectedOutput ?? resource.output,
    qualityStatus: resource.qualityStatus ?? (languageCode === "ko" ? "reviewed" : "candidate"),
    engagement: {
      views: null,
      comments: null,
      likes: null,
      checkedAt: "2026-06-25",
      ...(resource.engagement || {})
    }
  };
}

function getSequenceLevel(difficulty) {
  return {
    "입문": 1,
    "기초": 2,
    "기초실습": 3,
    "적용": 4,
    "포트폴리오": 5
  }[difficulty] || 9;
}

function getDefaultPracticeMinutes(difficulty, estimatedMinutes) {
  if (difficulty === "입문") return 30;
  if (difficulty === "기초실습") return Math.round(estimatedMinutes * 0.75);
  if (difficulty === "적용") return Math.round(estimatedMinutes);
  return Math.round(estimatedMinutes * 0.5);
}

function getDefaultPrerequisites(difficulty) {
  if (difficulty === "입문") return [];
  if (difficulty === "기초실습") return ["입문 개념"];
  if (difficulty === "적용") return ["기초 개념", "간단한 실습 경험"];
  return ["기초 개념"];
}

const diagnostics = {
  "mechanical-cae": [
    ["재료역학", "응력, 변형률, 안전율을 간단한 부품 사례로 설명할 수 있다."],
    ["CAD", "3D 모델과 2D 도면을 만들고 주요 치수를 관리할 수 있다."],
    ["FEA", "하중, 구속조건, 메시가 해석 결과에 미치는 영향을 설명할 수 있다."],
    ["공차·제조성", "공차와 제조공정이 설계 변경에 미치는 영향을 말할 수 있다."],
    ["문서화", "해석 결과를 설계 의사결정 근거로 정리할 수 있다."]
  ],
  "production-quality": [
    ["통계", "평균, 표준편차, 산포, 이상치를 공정 데이터로 해석할 수 있다."],
    ["SPC", "관리도와 공정능력 Cp/Cpk의 의미를 설명할 수 있다."],
    ["FMEA", "고장 모드, 영향, 원인, 검출 방법을 표로 정리할 수 있다."],
    ["8D", "문제 정의부터 재발 방지까지 개선 보고서 구조를 알고 있다."],
    ["데이터 분석", "불량 데이터를 Pareto 또는 추세 그래프로 요약할 수 있다."]
  ],
  "semiconductor-equipment": [
    ["공정 흐름", "산화, 노광, 식각, 증착, 이온주입, CMP의 역할을 구분할 수 있다."],
    ["장비 이해", "진공, 온도, 압력, 가스, 플라즈마가 장비 조건에 왜 중요한지 설명할 수 있다."],
    ["계측", "두께, CD, 결함, 수율 같은 공정 지표의 의미를 알고 있다."],
    ["데이터 분석", "수율이나 불량 데이터를 기준으로 개선 가설을 세울 수 있다."],
    ["문서화", "공정 조건 변경의 목적과 리스크를 검토표로 정리할 수 있다."]
  ],
  "electronics-pcb": [
    ["회로이론", "전압, 전류, 임피던스, 주파수 응답을 회로 사례로 설명할 수 있다."],
    ["전원회로", "레귤레이터, 디커플링, 전원 무결성의 기본을 알고 있다."],
    ["PCB", "그라운드, 리턴패스, 배치, 배선 폭이 왜 중요한지 설명할 수 있다."],
    ["계측", "오실로스코프와 멀티미터로 기본 신호를 측정할 수 있다."],
    ["검증", "측정 결과와 회로 요구사항을 비교해 Pass/Fail을 판단할 수 있다."]
  ],
  "embedded-control": [
    ["C언어", "포인터, 구조체, 비트 연산을 펌웨어 코드에서 사용할 수 있다."],
    ["MCU", "GPIO, Timer, ADC, PWM, 인터럽트의 역할을 설명할 수 있다."],
    ["통신", "UART, SPI, I2C, CAN의 차이와 사용 사례를 알고 있다."],
    ["제어", "PID 제어의 P/I/D 항이 응답에 미치는 영향을 설명할 수 있다."],
    ["디버깅", "로그, 브레이크포인트, 계측기로 문제 원인을 좁힐 수 있다."]
  ],
  "chemical-process": [
    ["물질수지", "원료, 생성물, 손실을 기준으로 간단한 공정 물질수지를 세울 수 있다."],
    ["열역학", "온도, 압력, 상평형이 반응·분리 결과에 미치는 영향을 설명할 수 있다."],
    ["반응공학", "전환율, 선택도, 수율을 반응 조건과 연결해 설명할 수 있다."],
    ["분리공정", "증류, 흡수, 추출, 막분리 중 어떤 분리 방식이 적합한지 판단할 수 있다."],
    ["공정안전", "MSDS, HAZOP, PSM 관점에서 주요 위험과 방지 대책을 정리할 수 있다."]
  ]
};

diagnostics["automotive-mobility"] = [
  ["차량 시스템", "차량 기능을 차체, 섀시, 전장, 제어기, 시험 조건으로 나누어 설명할 수 있다."],
  ["차량동역학", "조향, 제동, 현가, 구동 조건이 주행 안정성과 승차감에 미치는 영향을 말할 수 있다."],
  ["전장 네트워크", "CAN/LIN/Ethernet 신호와 ECU 간 인터페이스의 기본 흐름을 설명할 수 있다."],
  ["검증", "실차, 벤치, HIL 시험의 차이와 Pass/Fail 기준을 정리할 수 있다."],
  ["양산 품질", "APQP, PPAP, FMEA, Control Plan이 자동차 개발에서 왜 필요한지 설명할 수 있다."]
];

const resources = [
  {
    id: "matlab-onramp",
    title: "MATLAB Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "입문",
    hours: 2,
    tracks: ["mechanical-cae", "production-quality", "semiconductor-equipment", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["데이터 분석", "MATLAB/Python", "계측", "제어"],
    reason: "공학 데이터 처리와 모델링의 기본 조작을 짧게 익히기 좋습니다.",
    output: "실습 완료 캡처와 간단한 데이터 그래프",
    url: "https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted"
  },
  {
    id: "simulink-onramp",
    title: "Simulink Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 120,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["mechanical-cae", "production-quality", "electronics-pcb", "embedded-control", "semiconductor-equipment", "chemical-process"],
    skills: ["Simulink", "모델링", "제어", "검증"],
    prerequisites: ["MATLAB 기초"],
    reason: "제어, 장비, 전원, 시스템 검증 직무에서 모델 기반으로 동작을 설명하는 기본기를 확보합니다.",
    expectedOutput: "입출력 블록 모델과 시뮬레이션 결과 캡처",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/simulink-onramp/simulink"
  },
  {
    id: "stateflow-onramp",
    title: "Stateflow Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 60,
    sequenceLevel: 2,
    tracks: ["embedded-control", "electronics-pcb"],
    skills: ["Stateflow", "상태기계", "Fault처리", "검증"],
    prerequisites: ["Simulink 기초"],
    reason: "펌웨어 상태 전이, 오류 처리, 보호 로직을 명확한 상태도로 설명하는 역량을 만듭니다.",
    expectedOutput: "오류 처리 상태도와 전이 조건 메모",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/stateflow-onramp/stateflow"
  },
  {
    id: "control-design-onramp",
    title: "Control Design Onramp with Simulink",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 2,
    core: true,
    tracks: ["embedded-control", "mechanical-cae", "electronics-pcb"],
    skills: ["제어", "PID", "Simulink", "검증"],
    prerequisites: ["Simulink 기초", "제어공학 기초"],
    reason: "PID, 응답 지표, 모델 기반 검증이 필요한 제어·모터·시험 직무에 직접 연결됩니다.",
    expectedOutput: "PID 응답 비교 그래프와 튜닝 근거",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/control-design-onramp-with-simulink/controls"
  },
  {
    id: "signal-processing-onramp",
    title: "Signal Processing Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 60,
    sequenceLevel: 2,
    tracks: ["mechanical-cae", "electronics-pcb", "embedded-control", "semiconductor-equipment"],
    skills: ["신호처리", "계측", "센서", "데이터 분석"],
    prerequisites: ["MATLAB 기초"],
    reason: "시험·계측·센서 데이터에서 노이즈, 필터링, 주파수 특성을 해석하는 기초를 확보합니다.",
    expectedOutput: "측정 신호 필터링 전후 비교 그래프",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/signal-processing-onramp/signalprocessing"
  },
  {
    id: "machine-learning-onramp",
    title: "Machine Learning Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process"],
    skills: ["데이터 분석", "이상탐지", "수율분석", "Python/SQL"],
    prerequisites: ["MATLAB 기초", "통계 기초"],
    reason: "생산·수율·계측 데이터에서 분류, 예측, 이상 패턴 후보를 만드는 역량에 연결됩니다.",
    expectedOutput: "불량 또는 수율 데이터 분류 모델 실습 메모",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/machine-learning-onramp/machinelearning"
  },
  {
    id: "statistics-onramp",
    title: "Statistics Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 2,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process", "mechanical-cae"],
    skills: ["통계", "SPC", "DOE", "데이터 분석", "수율분석"],
    prerequisites: ["MATLAB 기초"],
    reason: "관리도, 공정능력, DOE, 수율 분석처럼 채용공고에 반복되는 통계 역량을 MATLAB 실습으로 보완합니다.",
    expectedOutput: "공정 데이터 기초 통계와 관리도 해석 메모",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/statistics-onramp/statistics"
  },
  {
    id: "mathworks-predictive-maintenance",
    title: "Predictive Maintenance Toolbox 예제",
    provider: "MathWorks",
    type: "공식문서/예제",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 4,
    tracks: ["production-quality", "semiconductor-equipment", "mechanical-cae", "embedded-control"],
    skills: ["이상탐지", "설비개선", "신호처리", "데이터 분석", "검증"],
    prerequisites: ["MATLAB 기초", "데이터 분석 기초"],
    reason: "설비 로그, 센서 신호, 이상 징후를 분석해야 하는 생산기술·장비·시험 직무에서 포트폴리오형 산출물로 연결하기 좋습니다.",
    expectedOutput: "설비 이상 징후 분석 시나리오와 개선 가설",
    qualityStatus: "candidate",
    url: "https://www.mathworks.com/help/predmaint/"
  },
  {
    id: "simscape-onramp",
    title: "Simscape Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["mechanical-cae", "electronics-pcb", "embedded-control", "semiconductor-equipment"],
    skills: ["Simscape", "물리 모델링", "전원회로", "모터"],
    prerequisites: ["Simulink 기초"],
    reason: "전기·기계·열 시스템을 물리 모델로 연결해 전원, 모터, 장비 동작을 설명할 때 적합합니다.",
    expectedOutput: "물리 시스템 모델과 주요 변수 변화 결과",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/simscape-onramp/simscape"
  },
  {
    id: "mathworks-simscape-electrical",
    title: "Simscape Electrical 예제",
    provider: "MathWorks",
    type: "공식문서/예제",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 4,
    tracks: ["electronics-pcb", "embedded-control", "mechanical-cae"],
    skills: ["전원회로", "전력전자", "모터", "물리 모델링", "검증"],
    prerequisites: ["Simulink 기초", "Simscape 기초"],
    reason: "전원, 모터, 전력 변환 회로를 모델 기반으로 설명해야 하는 하드웨어·제어 직무에 연결됩니다.",
    expectedOutput: "전원 또는 모터 모델과 주요 변수 변화 결과",
    qualityStatus: "candidate",
    url: "https://www.mathworks.com/help/sps/"
  },
  {
    id: "mathworks-motor-control-blockset",
    title: "Motor Control Blockset 핵심 예제",
    provider: "MathWorks",
    type: "공식문서/예제",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 4,
    core: true,
    tracks: ["embedded-control", "electronics-pcb", "mechanical-cae"],
    skills: ["모터", "PWM", "ADC", "FOC", "Simulink", "검증"],
    prerequisites: ["Simulink 기초", "제어공학 기초", "전력전자 기초"],
    reason: "모터제어 채용공고에서 자주 나오는 PWM, ADC 샘플링, FOC, 보호 로직을 모델 기반 실습과 검증 산출물로 연결합니다.",
    expectedOutput: "PWM/ADC 타이밍과 제어 응답 비교 그래프",
    qualityStatus: "verified",
    url: "https://www.mathworks.com/help/mcb/examples.html"
  },
  {
    id: "mathworks-simulink-examples",
    title: "MathWorks Simulink 공식 예제",
    provider: "MathWorks",
    type: "공식 예제/영상 실습 후보",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 3,
    tracks: ["embedded-control", "automotive-mobility", "electronics-pcb", "mechanical-cae", "production-quality"],
    skills: ["Simulink", "시뮬레이션", "모델링", "검증", "제어"],
    prerequisites: ["Simulink 기초"],
    reason: "블록 기반 모델을 직접 열어보고 입출력, 파라미터, 결과 그래프를 확인하는 공식 예제 모음입니다. 직무 산출물을 만들 때 예제 구조를 참고하기 좋습니다.",
    expectedOutput: "직무 문제에 맞춘 Simulink 모델 구조와 시뮬레이션 결과 캡처",
    qualityStatus: "candidate",
    broad: true,
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.mathworks.com/help/simulink/examples.html"
  },
  {
    id: "mathworks-fault-tolerant-fuel-control",
    title: "Simulink 연료 제어 Fault-Tolerant 예제",
    provider: "MathWorks",
    type: "세부 공식 예제/상태·고장 검증",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 4,
    core: true,
    tracks: ["embedded-control", "automotive-mobility"],
    skills: ["Simulink", "Stateflow", "Fault처리", "테스트케이스", "검증"],
    prerequisites: ["Simulink 기초", "상태기계 기초"],
    reason: "센서 오류, 상태 전이, fault handling을 모델로 확인하는 세부 예제입니다. ECU 소프트웨어, HIL/SIL, 검증 직무에서 요구사항-테스트케이스-로그를 연결할 때 범용 예제보다 바로 쓰기 좋습니다.",
    expectedOutput: "고장 조건, 상태 전이, Pass/Fail 기준이 포함된 테스트 케이스 초안",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.mathworks.com/help/simulink/slref/modeling-a-fault-tolerant-fuel-control-system.html"
  },
  {
    id: "mathworks-simulink-test-manager",
    title: "Simulink Test 테스트 하네스·Test Manager 예제",
    provider: "MathWorks",
    type: "세부 공식 예제/테스트 자동화",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 4,
    core: true,
    tracks: ["embedded-control", "automotive-mobility", "electronics-pcb"],
    skills: ["Simulink Test", "HIL", "SIL", "테스트케이스", "요구사항검증"],
    prerequisites: ["Simulink 기초", "검증 절차 이해"],
    reason: "모델을 보는 것에서 끝나지 않고 테스트 하네스, 테스트 케이스, 결과 리포트 흐름까지 확인하는 세부 자료입니다. 검증 직무의 산출물과 직접 맞닿습니다.",
    expectedOutput: "요구사항별 테스트 케이스, 입력 조건, 기대 결과, 결과 리포트 구조",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.mathworks.com/help/sltest/examples.html"
  },
  {
    id: "mathworks-lane-following-sensor-fusion",
    title: "Automated Driving 차선 추종·센서융합 예제",
    provider: "MathWorks",
    type: "세부 공식 예제/ADAS 시나리오",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 150,
    practiceMinutes: 150,
    sequenceLevel: 4,
    core: true,
    tracks: ["automotive-mobility", "embedded-control"],
    skills: ["ADAS", "센서융합", "시나리오", "Simulink", "검증"],
    prerequisites: ["MATLAB 기초", "센서·제어 기초"],
    reason: "카메라·레이더 등 센서 입력, 차선 추종 제어, 시나리오 기반 평가를 한 예제로 볼 수 있습니다. ADAS 검증 직무의 테스트 조건과 평가 지표를 잡는 데 적합합니다.",
    expectedOutput: "ADAS 시나리오, 센서 입력, 평가 지표, Pass/Fail 기준 초안",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.mathworks.com/help/driving/ug/lane-following-control-with-sensor-fusion-and-lane-detection.html"
  },
  {
    id: "mathworks-simscape-examples",
    title: "MathWorks Simscape 공식 예제",
    provider: "MathWorks",
    type: "공식 예제/물리 시뮬레이션",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 150,
    practiceMinutes: 150,
    sequenceLevel: 4,
    tracks: ["mechanical-cae", "automotive-mobility", "electronics-pcb", "embedded-control"],
    skills: ["Simscape", "물리 모델링", "열관리", "전원회로", "검증"],
    prerequisites: ["Simulink 기초", "Simscape 기초"],
    reason: "기계, 전기, 열 시스템을 물리 모델로 만들어 변수 변화가 결과에 미치는 영향을 확인하는 공식 예제 후보입니다.",
    expectedOutput: "물리 시스템 모델, 변수 변화 결과, 직무 요구사항 연결 메모",
    qualityStatus: "candidate",
    broad: true,
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.mathworks.com/help/simscape/examples.html"
  },
  {
    id: "mathworks-vehicle-dynamics-examples",
    title: "MathWorks Vehicle Dynamics Blockset 예제",
    provider: "MathWorks",
    type: "공식 예제/차량 시뮬레이션",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 150,
    practiceMinutes: 150,
    sequenceLevel: 4,
    tracks: ["automotive-mobility", "mechanical-cae"],
    skills: ["차량동역학", "조향", "제동", "현가", "시뮬레이션"],
    prerequisites: ["차량동역학 기초", "Simulink 기초"],
    reason: "조향, 제동, 현가, 차량 거동을 예제 모델로 확인하는 공식 예제 후보입니다. 자동차 섀시·시험·검증 직무의 판단 기준을 만들 때 참고할 수 있습니다.",
    expectedOutput: "차량 거동 시뮬레이션 조건표와 응답 결과 비교",
    qualityStatus: "candidate",
    broad: true,
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.mathworks.com/help/vdynblks/examples.html"
  },
  {
    id: "mathworks-automated-driving-examples",
    title: "MathWorks Automated Driving Toolbox 예제",
    provider: "MathWorks",
    type: "공식 예제/ADAS 시뮬레이션",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 150,
    practiceMinutes: 150,
    sequenceLevel: 4,
    tracks: ["automotive-mobility", "embedded-control"],
    skills: ["ADAS", "센서융합", "시나리오", "검증", "시뮬레이션"],
    prerequisites: ["MATLAB 기초", "센서·제어 기초"],
    reason: "주행 시나리오, 센서, 인지·검증 흐름을 예제 기반으로 확인할 수 있는 공식 후보입니다. ADAS 검증 직무에서 테스트 조건을 잡는 데 도움이 됩니다.",
    expectedOutput: "주행 시나리오, 센서 입력, Pass/Fail 검증 기준 초안",
    qualityStatus: "candidate",
    broad: true,
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.mathworks.com/help/driving/examples.html"
  },
  {
    id: "mathworks-official-videos",
    title: "MathWorks 공식 비디오 라이브러리",
    provider: "MathWorks",
    type: "공식 비디오/예제 탐색",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 2,
    tracks: ["mechanical-cae", "automotive-mobility", "electronics-pcb", "embedded-control", "production-quality", "semiconductor-equipment", "chemical-process"],
    skills: ["영상 실습", "예제 탐색", "모델링", "검증", "문제정의"],
    prerequisites: ["지원 직무 키워드 2개"],
    reason: "직무 키워드로 공식 비디오와 예제를 찾아보는 진입점입니다. 바로 매핑하기 어려운 세부 직무는 먼저 필요한 행동을 정하고 관련 영상을 예시로 고르는 데 사용합니다.",
    expectedOutput: "지원 직무 키워드로 찾은 영상 1개와 적용할 산출물 메모",
    qualityStatus: "candidate",
    broad: true,
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.mathworks.com/videos.html"
  },
  {
    id: "sensor-fusion-onramp",
    title: "Sensor Fusion Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    core: true,
    tracks: ["embedded-control"],
    skills: ["센서융합", "Kalman filter", "로봇", "제어"],
    prerequisites: ["MATLAB 기초", "신호처리 기초"],
    reason: "로봇·차량 제어에서 센서 노이즈, 추정, 위치 판단을 설명하는 차별화 역량을 만듭니다.",
    expectedOutput: "센서 추정 결과와 오차 비교 메모",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/sensor-fusion-onramp/sensorfusion"
  },
  {
    id: "optimization-onramp",
    title: "Optimization Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["mechanical-cae", "production-quality", "semiconductor-equipment", "chemical-process", "embedded-control"],
    skills: ["최적화", "DOE", "제어", "설계변경"],
    prerequisites: ["MATLAB 기초"],
    reason: "설계 변수, 공정 조건, 제어 파라미터를 목표와 제약 조건 기준으로 조정하는 역량에 연결됩니다.",
    expectedOutput: "변수·목표·제약 조건을 포함한 최적화 실습 메모",
    qualityStatus: "verified",
    url: "https://matlabacademy.mathworks.com/details/optimization-onramp/optimization"
  },
  {
    id: "mit-design-manufacturing",
    title: "Design and Manufacturing I",
    provider: "MIT OpenCourseWare",
    type: "대학 OCW",
    language: "영어",
    difficulty: "적용",
    hours: 8,
    tracks: ["mechanical-cae"],
    skills: ["기계요소설계", "공차·제조성", "문서화"],
    reason: "설계와 제조를 함께 보는 관점을 잡는 데 유용합니다.",
    output: "제품 설계 검토 메모",
    url: "https://ocw.mit.edu/courses/2-007-design-and-manufacturing-i-spring-2009/"
  },
  {
    id: "mit-mechanics-materials",
    title: "Mechanics and Materials I 핵심 단원",
    provider: "MIT OpenCourseWare",
    type: "대학 OCW 핵심단원",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 150,
    practiceMinutes: 90,
    sequenceLevel: 2,
    core: true,
    tracks: ["mechanical-cae"],
    skills: ["재료역학", "응력", "변형률", "안전율", "기계요소설계"],
    prerequisites: ["정역학", "미적분 기초"],
    reason: "기구설계와 CAE에서 가장 자주 묻는 하중, 응력, 변형률, 안전율 판단을 손계산으로 설명하게 만드는 핵심 전공 자료입니다.",
    expectedOutput: "브래킷 단면 응력 계산과 안전율 판단 노트",
    qualityStatus: "reviewed",
    url: "https://ocw.mit.edu/courses/2-001-mechanics-and-materials-i-fall-2006/"
  },
  {
    id: "mit-fea-solids",
    title: "Finite Element Analysis of Solids and Fluids 핵심 단원",
    provider: "MIT OpenCourseWare",
    type: "대학 OCW 핵심단원",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 150,
    practiceMinutes: 90,
    sequenceLevel: 3,
    core: true,
    tracks: ["mechanical-cae"],
    skills: ["FEA", "경계조건", "메시", "검증", "수치해석"],
    prerequisites: ["재료역학", "선형대수 기초"],
    reason: "해석 툴 사용법보다 경계조건, 요소, 메시 수렴, 결과 검증 논리를 배워 CAE 면접 답변의 핵심을 잡습니다.",
    expectedOutput: "경계조건과 메시 민감도 비교표",
    qualityStatus: "reviewed",
    url: "https://ocw.mit.edu/courses/2-092-finite-element-analysis-of-solids-and-fluids-i-fall-2009/"
  },
  {
    id: "mit-numerical-me",
    title: "Numerical Computation for Mechanical Engineers",
    provider: "MIT OpenCourseWare",
    type: "대학 OCW",
    language: "영어",
    difficulty: "기초실습",
    hours: 6,
    tracks: ["mechanical-cae"],
    skills: ["FEA", "데이터 분석", "MATLAB/Python"],
    reason: "해석 결과를 수치적으로 다루는 기본기를 보완합니다.",
    output: "수치해석 예제 풀이 노트",
    url: "https://ocw.mit.edu/courses/2-086-numerical-computation-for-mechanical-engineers-fall-2012/"
  },
  {
    id: "ncs",
    title: "국가직무능력표준 NCS",
    provider: "NCS",
    type: "정부/협회 교육자료",
    language: "한국어",
    difficulty: "입문",
    hours: 1,
    tracks: ["mechanical-cae", "production-quality", "semiconductor-equipment", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["직무 이해", "문서화", "품질"],
    reason: "직무 단위와 수행준거를 확인해 각 트랙의 실제 업무 기준점으로 삼을 수 있습니다.",
    output: "관심 직무 능력단위 3개 요약",
    url: "https://www.ncs.go.kr/"
  },
  {
    id: "mit-circuits",
    title: "Circuits and Electronics",
    provider: "MIT OpenCourseWare",
    type: "대학 OCW",
    language: "영어",
    difficulty: "기초실습",
    hours: 10,
    tracks: ["electronics-pcb"],
    skills: ["회로이론", "전자회로", "검증"],
    reason: "회로 해석과 전자회로 기본기를 체계적으로 복습할 수 있습니다.",
    output: "기본 회로 2개 해석 노트",
    url: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/"
  },
  {
    id: "allaboutcircuits-textbook",
    title: "All About Circuits 회로 기본 핵심 단원",
    provider: "All About Circuits",
    type: "공개 교재 핵심단원",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 1,
    core: true,
    tracks: ["electronics-pcb"],
    skills: ["회로이론", "전자회로", "전원회로", "임피던스", "검증"],
    prerequisites: ["기초 물리"],
    reason: "전압, 전류, 저항, 커패시터, 주파수 응답을 회로 블록도와 측정 기준으로 연결하는 하드웨어 직무 핵심 기본기입니다.",
    expectedOutput: "전원/센서 회로의 전압·전류·임피던스 계산 노트",
    qualityStatus: "reviewed",
    url: "https://www.allaboutcircuits.com/textbook/"
  },
  {
    id: "kicad-pcb-docs",
    title: "KiCad PCB 설계 공식 문서 핵심 단원",
    provider: "KiCad",
    type: "공식문서 핵심단원",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 120,
    sequenceLevel: 2,
    core: true,
    tracks: ["electronics-pcb"],
    skills: ["PCB", "리턴패스", "디커플링", "DFM/DFT", "검증"],
    prerequisites: ["회로 블록도", "부품 데이터시트"],
    reason: "PCB가 왜 동작 안정성, 리턴패스, 제조성, 측정 포인트와 연결되는지 실제 레이아웃 검토 항목으로 바꿉니다.",
    expectedOutput: "PCB 리뷰 체크리스트와 측정 포인트 표시",
    qualityStatus: "reviewed",
    url: "https://docs.kicad.org/"
  },
  {
    id: "ti-precision-labs",
    title: "Precision Labs",
    provider: "Texas Instruments",
    type: "기업 앱노트",
    language: "영어",
    difficulty: "기초실습",
    hours: 4,
    tracks: ["electronics-pcb"],
    skills: ["전원회로", "계측", "전자회로"],
    reason: "오피앰프, 데이터컨버터, 전원 등 실무형 회로 주제를 다룹니다.",
    output: "회로 주제별 설계 체크리스트",
    url: "https://www.ti.com/video/series/precision-labs.html"
  },
  {
    id: "ti-power-management-training",
    title: "TI Power Management 핵심 교육",
    provider: "Texas Instruments",
    type: "기업 공식교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 2,
    core: true,
    tracks: ["electronics-pcb", "embedded-control"],
    skills: ["전원회로", "전력전자", "발열", "리플", "검증"],
    prerequisites: ["회로이론", "부품 데이터시트"],
    reason: "전원 Tree, LDO/Buck 선택, 리플·발열·부하 transient처럼 전원 하드웨어 직무에서 바로 묻는 판단 기준을 학습합니다.",
    expectedOutput: "전원 Tree와 리플·발열 검증 체크리스트",
    qualityStatus: "reviewed",
    url: "https://www.ti.com/power-management/training.html"
  },
  {
    id: "stm32-education",
    title: "STM32 Education",
    provider: "STMicroelectronics",
    type: "공식문서",
    language: "영어",
    difficulty: "기초실습",
    hours: 5,
    tracks: ["embedded-control", "electronics-pcb"],
    skills: ["MCU", "통신", "디버깅"],
    reason: "MCU 주변장치와 개발 흐름을 공식 교육자료로 확인할 수 있습니다.",
    output: "GPIO 또는 UART 실습 계획",
    url: "https://www.st.com/content/st_com/en/support/learning/stm32-education.html"
  },
  {
    id: "stm32-mooc-gpio-timer-uart",
    title: "STM32 MOOC GPIO·Timer·UART 핵심 단원",
    provider: "STMicroelectronics",
    type: "공식 무료교육 핵심단원",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 2,
    core: true,
    tracks: ["embedded-control", "electronics-pcb"],
    skills: ["MCU", "GPIO", "Timer", "UART", "인터럽트", "디버깅"],
    prerequisites: ["C언어 기초"],
    reason: "펌웨어 직무의 핵심인 주변장치, 인터럽트, UART 로그를 공식 실습 흐름으로 연결합니다.",
    expectedOutput: "GPIO/Timer/UART 주변장치 매핑표와 샘플 로그",
    qualityStatus: "reviewed",
    url: "https://www.st.com/content/st_com/en/support/learning/stm32-education/stm32-moocs.html"
  },
  {
    id: "arm-embedded-systems",
    title: "Arm Embedded Systems Education Kit 핵심 자료",
    provider: "Arm Education",
    type: "공식 교육자료",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 2,
    core: true,
    tracks: ["embedded-control"],
    skills: ["MCU", "인터럽트", "C언어", "시스템로그", "디버깅"],
    prerequisites: ["C언어 기초", "디지털논리 기초"],
    reason: "MCU 구조, 메모리, 인터럽트, 입출력 흐름을 펌웨어 디버깅 관점에서 설명하는 데 필요한 핵심 배경입니다.",
    expectedOutput: "MCU 메모리·인터럽트·입출력 구조 요약",
    qualityStatus: "candidate",
    url: "https://www.arm.com/resources/education/education-kits"
  },
  {
    id: "linux-kernel-device-tree",
    title: "Linux Kernel Device Tree 핵심 문서",
    provider: "Linux Kernel Documentation",
    type: "공식문서 핵심단원",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 90,
    practiceMinutes: 90,
    sequenceLevel: 3,
    core: true,
    tracks: ["embedded-control"],
    skills: ["Device tree", "Driver", "GPIO", "I2C/SPI/UART", "시스템로그"],
    prerequisites: ["C언어 기초", "리눅스 명령어 기초"],
    reason: "임베디드 리눅스 채용공고의 핵심인 하드웨어 인터페이스, device tree, 드라이버 문제 추적을 공식 문서 기준으로 연결합니다.",
    expectedOutput: "Device tree 노드와 드라이버 로그 분석 메모",
    qualityStatus: "reviewed",
    url: "https://docs.kernel.org/devicetree/usage-model.html"
  },
  {
    id: "yocto-project-docs",
    title: "Yocto Project 이미지 빌드 핵심 문서",
    provider: "Yocto Project",
    type: "공식문서 핵심단원",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 4,
    core: true,
    tracks: ["embedded-control"],
    skills: ["Yocto", "Buildroot", "부팅흐름", "시스템로그", "디버깅"],
    prerequisites: ["리눅스 명령어 기초", "Git"],
    reason: "부트로더, kernel, rootfs, 이미지 빌드 흐름을 설명해야 하는 임베디드 리눅스 직무의 핵심 배경을 잡습니다.",
    expectedOutput: "부팅 구성요소와 이미지 빌드 흐름도",
    qualityStatus: "reviewed",
    url: "https://docs.yoctoproject.org/"
  },
  {
    id: "ros-tutorials",
    title: "ROS 2 Tutorials",
    provider: "ROS Documentation",
    type: "공식문서",
    language: "영어",
    difficulty: "기초실습",
    hours: 5,
    core: true,
    tracks: ["embedded-control"],
    skills: ["제어", "로봇", "Git"],
    reason: "로봇 소프트웨어 구조와 메시지 기반 통신을 실습할 수 있습니다.",
    output: "ROS 2 노드 실행 기록",
    url: "https://docs.ros.org/en/rolling/Tutorials.html"
  },
  {
    id: "mit-microelectronic",
    title: "Microelectronic Devices and Circuits",
    provider: "MIT OpenCourseWare",
    type: "대학 OCW",
    language: "영어",
    difficulty: "적용",
    hours: 10,
    tracks: ["semiconductor-equipment", "electronics-pcb"],
    skills: ["반도체 소자", "전자회로", "공정 흐름"],
    reason: "소자와 회로 관점을 함께 확인할 수 있어 반도체 직무 이해에 도움이 됩니다.",
    output: "소자 동작 원리 요약",
    url: "https://ocw.mit.edu/courses/6-012-microelectronic-devices-and-circuits-fall-2009/"
  },
  {
    id: "mit-semiconductor-devices",
    title: "Semiconductor Devices 핵심 단원",
    provider: "MIT OpenCourseWare",
    type: "대학 OCW 핵심단원",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 150,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["semiconductor-equipment", "electronics-pcb"],
    skills: ["반도체 소자", "공정 흐름", "계측", "전공지식"],
    prerequisites: ["전자회로 기초", "물리 기초"],
    reason: "산화, 접합, MOS 구조 같은 공정·소자 기본을 연결해 공정 흐름을 암기가 아니라 원리로 설명하게 합니다.",
    expectedOutput: "MOS 구조와 공정 단계 연결 메모",
    qualityStatus: "reviewed",
    url: "https://ocw.mit.edu/courses/6-012-microelectronic-devices-and-circuits-fall-2009/"
  },
  {
    id: "plasma-etch-core",
    title: "Plasma Etch Process 핵심 개념 후보",
    provider: "Semiconductor Engineering",
    type: "산업 기술교육자료",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 75,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["semiconductor-equipment"],
    skills: ["식각", "플라즈마", "장비조건", "공정 흐름", "Troubleshooting"],
    prerequisites: ["반도체 공정 흐름"],
    reason: "식각률, 선택비, 균일도, 잔류물 같은 식각 결과 지표를 압력, RF power, 가스 조건과 연결하는 핵심 자료 후보입니다.",
    expectedOutput: "식각 변수와 결과 지표 연결표",
    qualityStatus: "candidate",
    url: "https://semiengineering.com/knowledge_centers/manufacturing/process/etch/"
  },
  {
    id: "analog-dialogue",
    title: "Analog Dialogue",
    provider: "Analog Devices",
    type: "기업 기술교육자료",
    language: "영어",
    difficulty: "적용",
    hours: 3,
    tracks: ["electronics-pcb", "embedded-control"],
    skills: ["계측", "전자회로", "센서"],
    reason: "센서, 신호처리, 아날로그 회로 주제를 실무 사례와 함께 볼 수 있습니다.",
    output: "관심 회로 주제 1개 요약",
    url: "https://www.analog.com/en/resources/analog-dialogue.html"
  },
  {
    id: "nist-spc",
    title: "Engineering Statistics Handbook",
    provider: "NIST/SEMATECH",
    type: "정부/협회 교육자료",
    language: "영어",
    difficulty: "기초실습",
    hours: 6,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process"],
    skills: ["통계", "SPC", "DOE"],
    reason: "공정 데이터, 관리도, 실험계획법의 기준 교육자료로 활용하기 좋습니다.",
    output: "관리도 또는 DOE 개념 요약",
    url: "https://www.itl.nist.gov/div898/handbook/"
  },
  {
    id: "nist-control-charts",
    title: "NIST Control Charts 핵심 단원",
    provider: "NIST/SEMATECH",
    type: "정부/협회 핵심단원",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 90,
    sequenceLevel: 2,
    core: true,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process"],
    skills: ["SPC", "관리도", "공정능력", "통계", "이상탐지"],
    prerequisites: ["평균과 표준편차"],
    reason: "품질·공정 직무에서 핵심인 관리도 해석과 관리 이탈 판단을 실제 데이터 판정 기준으로 배웁니다.",
    expectedOutput: "Xbar/R 또는 I-MR 관리도와 이상 신호 판정표",
    qualityStatus: "verified",
    url: "https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc3.htm"
  },
  {
    id: "nist-process-capability",
    title: "NIST Process Capability 핵심 단원",
    provider: "NIST/SEMATECH",
    type: "정부/협회 핵심단원",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 75,
    practiceMinutes: 90,
    sequenceLevel: 2,
    core: true,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process"],
    skills: ["공정능력", "Cp/Cpk", "SPC", "품질", "통계"],
    prerequisites: ["기초 통계", "규격 상하한 이해"],
    reason: "Cp/Cpk를 단순 계산이 아니라 규격, 산포, 평균 이동과 연결해 품질관리 면접에서 설명할 수 있게 합니다.",
    expectedOutput: "Cp/Cpk 계산표와 공정 판정 문장",
    qualityStatus: "verified",
    url: "https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm"
  },
  {
    id: "asq-quality-tools",
    title: "ASQ Quality Tools",
    provider: "ASQ",
    type: "협회 교육자료",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 45,
    practiceMinutes: 45,
    sequenceLevel: 1,
    tracks: ["production-quality"],
    skills: ["품질", "문제해결", "Pareto", "FMEA"],
    prerequisites: [],
    reason: "공정 문제를 정의할 때 쓸 수 있는 품질 도구를 빠르게 고르고 적용하기 좋습니다.",
    expectedOutput: "품질 도구 1개를 선택한 공정 문제 정의 메모",
    qualityStatus: "candidate",
    url: "https://asq.org/quality-resources/quality-tools"
  },
  {
    id: "quality-one-fmea",
    title: "FMEA Training Resources",
    provider: "Quality-One",
    type: "기업 기술교육자료",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 75,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["production-quality"],
    skills: ["FMEA", "문제해결", "품질"],
    prerequisites: ["공정 문제 정의"],
    reason: "불량 원인, 영향, 검출 방법을 FMEA 표로 바꾸는 주차에 바로 연결됩니다.",
    expectedOutput: "불량 사례 FMEA 표 초안",
    qualityStatus: "candidate",
    url: "https://quality-one.com/fmea/"
  },
  {
    id: "asq-fmea",
    title: "Failure Mode and Effects Analysis",
    provider: "ASQ",
    type: "협회 교육자료",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["production-quality"],
    skills: ["FMEA", "품질", "문제해결"],
    prerequisites: ["공정 문제 정의"],
    reason: "FMEA 주차에서 고장 모드, 영향, 원인, 현재 관리 방법을 구분할 때 참고합니다.",
    expectedOutput: "고장 모드별 영향·원인·관리 방법 정리",
    qualityStatus: "candidate",
    url: "https://asq.org/quality-resources/fmea"
  },
  {
    id: "asq-eight-d",
    title: "8D Problem Solving",
    provider: "ASQ",
    type: "협회 교육자료",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["production-quality"],
    skills: ["8D 문제해결", "문제해결", "품질"],
    prerequisites: ["원인 가설"],
    reason: "개선 보고서 주차에서 임시조치, 원인분석, 재발방지 구조를 잡는 데 사용합니다.",
    expectedOutput: "8D 개선 보고서 초안",
    qualityStatus: "candidate",
    url: "https://asq.org/quality-resources/eight-disciplines-8d"
  },
  {
    id: "lean-a3-problem-solving",
    title: "A3 Problem Solving",
    provider: "Lean Enterprise Institute",
    type: "협회 교육자료",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["production-quality"],
    skills: ["문제해결", "8D 문제해결", "개선"],
    prerequisites: ["원인 가설"],
    reason: "개선 보고서 주차에서 문제, 원인, 대책, 후속 확인을 한 장 구조로 정리할 때 사용합니다.",
    expectedOutput: "A3 개선 보고서 초안",
    qualityStatus: "candidate",
    url: "https://www.lean.org/lexicon-terms/a3-report/"
  },
  {
    id: "moresteam-doe",
    title: "Design of Experiments 교육자료",
    provider: "MoreSteam",
    type: "기업 기술교육자료",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 90,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process"],
    skills: ["DOE", "통계", "공정관리"],
    prerequisites: ["통계 기초", "공정 변수 정의"],
    reason: "공정 조건을 바꿔 검증해야 하는 주차에서 변수와 실험 설계를 연결합니다.",
    expectedOutput: "조건 변경 DOE 검토 메모",
    qualityStatus: "candidate",
    url: "https://www.moresteam.com/toolbox/design-of-experiments.cfm"
  },
  {
    id: "learncheme-chemical-process",
    title: "LearnChemE 화학공학 개념·문제풀이",
    provider: "LearnChemE",
    type: "대학 공개교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 90,
    sequenceLevel: 2,
    tracks: ["chemical-process"],
    skills: ["물질수지", "열역학", "반응공학", "분리공정"],
    prerequisites: ["일반화학", "미적분 기초"],
    reason: "물질수지, 열역학, 반응·분리 개념을 짧은 문제풀이와 시각 자료로 보완할 때 적합합니다.",
    expectedOutput: "물질수지 또는 분리공정 예제 2개 풀이 노트",
    qualityStatus: "verified",
    url: "https://learncheme.com/"
  },
  {
    id: "learncheme-material-balances",
    title: "LearnChemE Material Balances 핵심 문제풀이",
    provider: "LearnChemE",
    type: "대학 공개교육 핵심단원",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 2,
    core: true,
    tracks: ["chemical-process"],
    skills: ["물질수지", "수율", "전환율", "선택도", "공정 흐름"],
    prerequisites: ["일반화학", "단위 환산"],
    reason: "화학공정 엔지니어가 반드시 설명해야 하는 물질수지, 전환율, 선택도, 수율을 문제풀이로 바로 익히게 합니다.",
    expectedOutput: "물질수지 계산표와 수율 저하 원인 가설",
    qualityStatus: "verified",
    url: "https://learncheme.com/screencasts/mass-energy-balances/"
  },
  {
    id: "learncheme-separations",
    title: "LearnChemE Separations 핵심 단원",
    provider: "LearnChemE",
    type: "대학 공개교육 핵심단원",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 2,
    core: true,
    tracks: ["chemical-process"],
    skills: ["분리공정", "증류", "상평형", "순도", "공정변수"],
    prerequisites: ["물질수지", "열역학 기초"],
    reason: "반응 후 제품 품질을 결정하는 증류·분리 조건을 수율, 순도, 에너지 사용량과 연결합니다.",
    expectedOutput: "분리 조건 변경에 따른 순도·수율 비교표",
    qualityStatus: "verified",
    url: "https://learncheme.com/screencasts/separations/"
  },
  {
    id: "mit-chemical-engineering",
    title: "MIT OCW Chemical Engineering Thermodynamics",
    provider: "MIT OpenCourseWare",
    type: "대학 OCW",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["chemical-process"],
    skills: ["열역학", "반응공학", "분리공정", "공정모델링"],
    prerequisites: ["물질수지", "열역학 기초"],
    reason: "화학공정 심화 개념을 MIT OCW의 실제 화학공학 열역학 강좌로 확인하고 면접용 설명 근거를 만들 때 사용합니다.",
    expectedOutput: "화학공학 열역학 핵심 단원 2개 요약과 직무 적용 메모",
    qualityStatus: "reviewed",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://ocw.mit.edu/courses/10-40-chemical-engineering-thermodynamics-fall-2003/"
  },
  {
    id: "kocw-chemical-process",
    title: "KOCW 화학공정·분리공정 후보",
    provider: "KOCW",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["chemical-process"],
    skills: ["물질수지", "분리공정", "반응공학", "공정 흐름"],
    prerequisites: [],
    reason: "화학공학 전공기초를 한국어 공개강의로 보완하고 공정 흐름 과제에 연결합니다.",
    expectedOutput: "화학공정 과제에 연결할 강의 1개와 볼 단원 2개 기록",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "http://www.kocw.net/home/search/search.do?query=%ED%99%94%ED%95%99%EA%B3%B5%ED%95%99%20%EB%B6%84%EB%A6%AC%EA%B3%B5%EC%A0%95"
  },
  {
    id: "kosha-psm",
    title: "KOSHA 공정안전관리 PSM 자료",
    provider: "KOSHA",
    type: "정부/협회 교육자료",
    language: "한국어",
    difficulty: "기초실습",
    estimatedMinutes: 75,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["chemical-process", "semiconductor-equipment"],
    skills: ["공정안전", "PSM", "HAZOP", "MSDS"],
    prerequisites: ["공정 흐름 이해"],
    reason: "화학·소재·반도체 공정에서 위험성 평가, MSDS, HAZOP 체크를 산출물로 남길 때 사용합니다.",
    expectedOutput: "공정 위험요인 5개와 예방대책 체크리스트",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.kosha.or.kr/"
  },
  {
    id: "fda-process-validation",
    title: "FDA Process Validation 핵심 가이던스",
    provider: "FDA",
    type: "정부 가이던스 핵심자료",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 90,
    practiceMinutes: 90,
    sequenceLevel: 3,
    core: true,
    tracks: ["chemical-process"],
    skills: ["GMP", "Validation", "SOP", "Batch record", "변경관리"],
    prerequisites: ["공정 흐름 이해", "품질 문서 기초"],
    reason: "바이오·제약 공정 직무에서 SOP, batch record, deviation, validation을 공정 조건과 품질 리스크로 연결하는 핵심 자료입니다.",
    expectedOutput: "공정 validation 단계와 기록 항목 매핑표",
    qualityStatus: "reviewed",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/process-validation-general-principles-and-practices"
  },
  {
    id: "coursera-chemical-engineering",
    title: "Coursera Chemical Engineering Thermodynamics I",
    provider: "Coursera",
    type: "글로벌 무료청강",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["chemical-process"],
    skills: ["반응공학", "분리공정", "공정모델링", "소재"],
    prerequisites: ["물질수지", "열역학 기초"],
    reason: "화학공정, 소재, 배터리 직무에서 필요한 열역학 개념을 Coursera의 실제 화학공학 강좌로 보완합니다.",
    expectedOutput: "열역학 개념 2개와 적용할 직무 과제 기록",
    qualityStatus: "reviewed",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.coursera.org/learn/chemtherm1"
  },
  {
    id: "nptel-chemical-engineering",
    title: "NPTEL Chemical Engineering 강좌 후보",
    provider: "NPTEL",
    type: "대학 공개교육",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["chemical-process"],
    skills: ["물질수지", "열역학", "반응공학", "분리공정", "공정제어"],
    prerequisites: ["화학공학 전공기초"],
    reason: "IIT 공개강의 기반으로 화공 전공 심화 주제를 체계적으로 보완하는 후보입니다.",
    expectedOutput: "심화 단원 1개 요약과 공정 조건 적용 메모",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://nptel.ac.in/courses?discipline=Chemical%20Engineering"
  },
  {
    id: "kmooc",
    title: "K-MOOC 공학 전공기초 후보 검수",
    provider: "K-MOOC",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    hours: 3,
    tracks: ["mechanical-cae", "production-quality", "electronics-pcb", "semiconductor-equipment", "chemical-process", "embedded-control"],
    skills: ["전공지식", "직무 이해"],
    reason: "전공 기초를 한국어로 보완할 때 쓰는 월간 검수 후보 풀입니다. 과제와 직접 맞는 강좌만 저장합니다.",
    output: "선택 과제와 연결되는 한국어 강좌 1개 후보 기록",
    url: "https://www.kmooc.kr/"
  },
  {
    id: "kocw-mechanical-design",
    title: "KOCW 기계요소설계·구조해석 후보",
    provider: "KOCW",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["mechanical-cae"],
    skills: ["재료역학", "기계요소설계", "CAD", "FEA"],
    prerequisites: [],
    reason: "제품 요구사항, 손계산, CAD 초안, 해석 조건 검증 과제에 연결할 국내 공개강의 후보를 검수합니다.",
    expectedOutput: "브래킷 설계 과제에 연결할 강의 1개와 볼 단원 2개 기록",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/search/search.do?query=%EA%B8%B0%EA%B3%84%EC%9A%94%EC%86%8C%EC%84%A4%EA%B3%84%20%EA%B5%AC%EC%A1%B0%ED%95%B4%EC%84%9D"
  },
  {
    id: "kocw-production-quality",
    title: "KOCW 품질관리·SPC 후보",
    provider: "KOCW",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["production-quality"],
    skills: ["통계", "SPC", "품질", "공정관리"],
    prerequisites: [],
    reason: "관리도, Cpk, Pareto, FMEA 과제에 연결할 국내 공개강의 후보를 검수합니다.",
    expectedOutput: "관리도·Cpk 과제에 연결할 강의 1개와 실습 데이터 적용 메모",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/search/search.do?query=%ED%92%88%EC%A7%88%EA%B4%80%EB%A6%AC%20SPC"
  },
  {
    id: "kocw-semiconductor",
    title: "KOCW 반도체 공정·소자 후보",
    provider: "KOCW",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["semiconductor-equipment"],
    skills: ["반도체 소자", "공정 흐름", "계측"],
    prerequisites: [],
    reason: "공정 흐름 매핑, 식각 장비 변수, 수율 Pareto 과제에 연결할 국내 공개강의 후보를 검수합니다.",
    expectedOutput: "공정 흐름도 과제에 연결할 강의 1개와 공정 단원 2개 기록",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/search/search.do?query=%EB%B0%98%EB%8F%84%EC%B2%B4%EA%B3%B5%EC%A0%95"
  },
  {
    id: "kocw-electronics-circuit",
    title: "KOCW 회로이론·전자회로 후보",
    provider: "KOCW",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["electronics-pcb"],
    skills: ["회로이론", "전자회로", "계측"],
    prerequisites: [],
    reason: "전원 요구사항, 센서 신호 증폭, 검증 리포트 과제에 연결할 국내 공개강의 후보를 검수합니다.",
    expectedOutput: "전원·증폭 회로 과제에 연결할 강의 1개와 회로 예제 1개 기록",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/search/search.do?query=%EC%A0%84%EC%9E%90%ED%9A%8C%EB%A1%9C%20PCB"
  },
  {
    id: "kocw-embedded-control",
    title: "KOCW 마이크로프로세서·제어공학 후보",
    provider: "KOCW",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["embedded-control"],
    skills: ["C언어", "제어공학", "MCU", "디버깅"],
    prerequisites: [],
    reason: "MCU 주변장치, UART 프로토콜, PID 응답 실험 과제에 연결할 국내 공개강의 후보를 검수합니다.",
    expectedOutput: "MCU 또는 제어 과제에 연결할 강의 1개와 실습 단원 1개 기록",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/search/search.do?query=%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%ED%94%84%EB%A1%9C%EC%84%B8%EC%84%9C%20%EC%A0%9C%EC%96%B4%EA%B3%B5%ED%95%99"
  },
  {
    id: "step-engineering",
    title: "STEP 산업기술 실습형 후보 검수",
    provider: "STEP",
    type: "무료교육",
    language: "한국어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 60,
    sequenceLevel: 2,
    tracks: ["mechanical-cae", "production-quality", "semiconductor-equipment", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["직무 이해", "도구역량", "문제해결"],
    prerequisites: ["관심 직무 트랙 선택"],
    reason: "공개강의 이후 실습형 보완이 필요한 과제에만 연결할 STEP 과정 후보를 검수합니다.",
    expectedOutput: "선택 과제의 실습 공백을 보완하는 STEP 과정 1개 후보 기록",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "https://www.step.or.kr/"
  },
  {
    id: "hrd-net-job-training",
    title: "HRD-Net 직업훈련 취업스킬 후보",
    provider: "HRD-Net",
    type: "직업훈련",
    language: "한국어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 60,
    sequenceLevel: 2,
    tracks: ["mechanical-cae", "production-quality", "semiconductor-equipment", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["직무 이해", "도구역량", "문서화", "자격증"],
    prerequisites: ["관심 직무 트랙 선택"],
    reason: "취업용 실무 스킬이나 자격 과정이 필요한 경우 직무명으로 검색해 실제 수강 가능한 훈련을 고릅니다.",
    expectedOutput: "관심 직무와 연결되는 HRD-Net 과정 1개와 수강 목적 기록",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.hrd.go.kr/"
  },
  {
    id: "digital-learning-ai-it-basics",
    title: "디지털배움터 AI·IT 기초 후보",
    provider: "디지털배움터",
    type: "무료교육",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 30,
    sequenceLevel: 1,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["AI 기초", "IT 기초", "데이터 분석", "직무 이해"],
    prerequisites: [],
    reason: "AI·IT 활용이 처음인 학생이 데이터, 디지털 도구, 자동화 용어를 가볍게 정리할 때 사용합니다.",
    expectedOutput: "관심 직무에서 쓸 AI·IT 용어 5개와 활용 예시",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.xn--2z1bw8k1pjz5ccumkb.kr/"
  },
  {
    id: "gseek-career-certificate",
    title: "GSEEK 자격증·취업기초 후보",
    provider: "GSEEK",
    type: "무료교육",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 60,
    practiceMinutes: 45,
    sequenceLevel: 1,
    tracks: ["mechanical-cae", "production-quality", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["자격증", "문서화", "직무 이해"],
    prerequisites: [],
    reason: "전공 심화 전 취업 기초, 자격증, 문서화 습관을 한국어로 빠르게 보완할 때 연결합니다.",
    expectedOutput: "지원 직무와 연결되는 자격·취업 강좌 1개와 보완 이유",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.gseek.kr/"
  },
  {
    id: "coursera-six-sigma-quality",
    title: "Coursera Six Sigma Principles",
    provider: "Coursera",
    type: "글로벌 무료청강",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process"],
    skills: ["품질", "SPC", "FMEA", "DOE", "문제해결"],
    prerequisites: ["기초 통계"],
    reason: "품질·공정개선 직무에서 Six Sigma 원리와 개선 흐름을 실제 Coursera 과정으로 보완합니다.",
    expectedOutput: "품질 개선 과제에 적용할 Six Sigma 도구 1개와 적용 메모",
    qualityStatus: "reviewed",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.coursera.org/learn/six-sigma-principles2"
  },
  {
    id: "coursera-engineering-data",
    title: "Coursera Data Analysis with Python",
    provider: "Coursera",
    type: "글로벌 무료청강",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process", "mechanical-cae"],
    skills: ["데이터 분석", "통계", "Python/SQL", "수율분석"],
    prerequisites: ["기초 통계", "스프레드시트 또는 Python 기초"],
    reason: "공정·수율·시험 데이터를 다루는 직무에서 Python 기반 데이터 분석 흐름을 실제 Coursera 과정으로 보완합니다.",
    expectedOutput: "공정 또는 시험 데이터 분석 강좌 1개와 적용할 데이터 과제",
    qualityStatus: "reviewed",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.coursera.org/learn/data-analysis-with-python"
  },
  {
    id: "coursera-embedded-control",
    title: "Coursera Introduction to Embedded Systems Software",
    provider: "Coursera",
    type: "글로벌 무료청강",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["embedded-control", "electronics-pcb"],
    skills: ["C언어", "제어", "센서", "검증"],
    prerequisites: ["C언어 기초", "제어공학 기초"],
    reason: "펌웨어·제어 직무에서 C 기반 임베디드 개발환경과 디버깅 흐름을 실제 Coursera 과정으로 보완합니다.",
    expectedOutput: "임베디드·제어 강좌 1개와 PID/센서 과제 적용 메모",
    qualityStatus: "reviewed",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.coursera.org/learn/introduction-embedded-systems"
  },
  {
    id: "edx-engineering-systems",
    title: "edX 공학 시스템·전공심화 후보",
    provider: "edX",
    type: "글로벌 무료청강",
    language: "영어",
    difficulty: "적용",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["mechanical-cae", "semiconductor-equipment", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["전공지식", "모델링", "전자회로", "공정 흐름"],
    prerequisites: ["전공 기초"],
    reason: "MIT·Harvard 등 글로벌 전공 강좌를 심화 개념 보완이나 면접 근거 자료로 연결합니다.",
    expectedOutput: "직무 과제와 연결되는 edX 강좌 1개와 핵심 단원 2개 기록",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.edx.org/search?q=engineering"
  },
  {
    id: "khan-math-physics-basics",
    title: "Khan Academy 수학·물리 기본기",
    provider: "Khan Academy",
    type: "무료교육",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 90,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["mechanical-cae", "production-quality", "semiconductor-equipment", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["수학", "물리", "통계", "전공지식"],
    prerequisites: [],
    reason: "전공 강의가 어렵게 느껴질 때 수학·물리·통계 기본기를 짧게 보완하는 자료입니다.",
    expectedOutput: "이번 주 과제에 필요한 수학·물리 개념 3개 풀이 기록",
    qualityStatus: "verified",
    url: "https://www.khanacademy.org/"
  },
  {
    id: "freecodecamp-python-data",
    title: "freeCodeCamp Python·데이터 프로젝트",
    provider: "freeCodeCamp",
    type: "프로젝트 무료교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 3,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process", "embedded-control"],
    skills: ["Python/SQL", "데이터 분석", "Git", "문서화"],
    prerequisites: ["프로그래밍 입문"],
    reason: "공정 데이터, 수율 분석, 로그 정리 과제를 코드 기반 포트폴리오로 남길 때 적합합니다.",
    expectedOutput: "CSV 분석 노트북 또는 GitHub README 초안",
    qualityStatus: "verified",
    url: "https://www.freecodecamp.org/learn/data-analysis-with-python/"
  },
  {
    id: "inflearn-free-it-practice",
    title: "인프런 무료 IT·임베디드 실습 후보",
    provider: "인프런",
    type: "무료교육",
    language: "한국어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 90,
    sequenceLevel: 2,
    tracks: ["electronics-pcb", "embedded-control", "production-quality"],
    skills: ["C언어", "Python/SQL", "Git", "디버깅"],
    prerequisites: ["기초 프로그래밍"],
    reason: "한국어로 C, Python, Git, 실습형 IT 보완이 필요할 때 무료 강좌 후보를 고릅니다.",
    expectedOutput: "실습 강좌 1개와 직무 과제에 적용할 코드/문서화 계획",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.inflearn.com/courses?s=%EB%AC%B4%EB%A3%8C"
  },
  {
    id: "udemy-free-practical-tools",
    title: "Udemy 무료 실전 도구 강의 후보",
    provider: "Udemy",
    type: "무료교육 후보",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 60,
    sequenceLevel: 2,
    tracks: ["mechanical-cae", "production-quality", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["도구역량", "문제해결", "문서화"],
    prerequisites: ["관심 직무 트랙 선택"],
    reason: "CAD, Python, 회로, 품질 도구처럼 바로 써먹는 스킬을 짧게 보완할 후보로만 사용합니다.",
    expectedOutput: "실전 도구 강좌 1개와 직무 산출물 적용 계획",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-26",
      nextReviewAt: "2026-07-26"
    },
    url: "https://www.udemy.com/courses/free/"
  },
  {
    id: "ansys-innovation-courses",
    title: "Ansys Innovation Courses 구조·열·유동 해석",
    provider: "Ansys",
    type: "공식 무료 시뮬레이션 교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 120,
    sequenceLevel: 3,
    core: true,
    tracks: ["mechanical-cae", "automotive-mobility", "electronics-pcb"],
    skills: ["FEA", "CFD", "열해석", "경계조건", "시뮬레이션", "검증"],
    prerequisites: ["재료역학 또는 열유체 기초"],
    reason: "구조, 열, 유동 해석을 공식 무료 강좌와 예제로 확인할 수 있습니다. CAE·차량 열관리·검증 직무에서 해석 조건과 결과 판단을 산출물로 남기기 좋습니다.",
    expectedOutput: "해석 조건표, 결과 캡처, 경계조건 검토 메모",
    qualityStatus: "reviewed",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://courses.ansys.com/"
  },
  {
    id: "ni-learn-test-measurement",
    title: "NI Learn 계측·시험 자동화 자료",
    provider: "NI",
    type: "공식 실습자료",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 90,
    practiceMinutes: 90,
    sequenceLevel: 3,
    core: true,
    tracks: ["mechanical-cae", "automotive-mobility", "electronics-pcb", "embedded-control"],
    skills: ["계측", "DAQ", "LabVIEW", "시험계획", "HIL", "검증"],
    prerequisites: ["기초 전기계측", "데이터 기록 이해"],
    reason: "시험·검증 직무에서 센서, DAQ, 자동화, HIL 흐름을 공식 학습 자료로 확인할 수 있습니다. 측정 조건과 Pass/Fail 기준을 세우는 과제에 연결됩니다.",
    expectedOutput: "계측 채널 정의표와 시험 자동화 흐름도",
    qualityStatus: "reviewed",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://learn.ni.com/"
  },
  {
    id: "google-ml-crash-course",
    title: "Google Machine Learning Crash Course",
    provider: "Google",
    type: "공식 무료교육",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 120,
    practiceMinutes: 90,
    sequenceLevel: 3,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process", "automotive-mobility"],
    skills: ["AI 기초", "데이터 분석", "이상탐지", "수율분석", "모델검증"],
    prerequisites: ["기초 통계", "Python 기초"],
    reason: "공정, 수율, 시험 데이터에서 예측·분류·검증 개념을 빠르게 잡는 공식 무료 과정입니다. AI를 과장하지 않고 데이터 기반 개선 가설을 만드는 데 적합합니다.",
    expectedOutput: "데이터 문제 정의, 입력 변수, 모델 검증 기준 메모",
    qualityStatus: "verified",
    url: "https://developers.google.com/machine-learning/crash-course"
  },
  {
    id: "boostcourse-data-ai-basic",
    title: "Boostcourse 데이터·AI 기초 실습 후보",
    provider: "Boostcourse",
    type: "무료교육",
    language: "한국어",
    difficulty: "입문",
    estimatedMinutes: 90,
    practiceMinutes: 60,
    sequenceLevel: 2,
    tracks: ["production-quality", "semiconductor-equipment", "chemical-process", "electronics-pcb", "embedded-control"],
    skills: ["Python/SQL", "데이터 분석", "AI 기초", "Git", "문서화"],
    prerequisites: ["기초 프로그래밍"],
    reason: "한국어로 데이터 분석과 AI 기초를 보완할 때 사용할 수 있는 무료 학습 후보입니다. 공정·품질·임베디드 로그 분석을 처음 시작하는 학생에게 진입 장벽이 낮습니다.",
    expectedOutput: "직무 데이터 예제 1개와 분석 절차 README 초안",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.boostcourse.org/"
  },
  {
    id: "youtube-nptel-vehicle-dynamics",
    title: "NPTEL Introduction to Vehicle Dynamics",
    provider: "NPTEL YouTube",
    type: "공개강의 직접영상",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 50,
    practiceMinutes: 45,
    sequenceLevel: 1,
    core: true,
    tracks: ["mechanical-cae", "automotive-mobility"],
    skills: ["차량동역학", "하중이동", "현가", "시험조건", "직무 이해"],
    prerequisites: ["물리 기초", "재료역학 기초"],
    reason: "NPTEL/IIT 공식 차량동역학 첫 강의입니다. 차량동역학의 기본 변수와 시험·설계 직무 연결을 잡는 데 적합합니다.",
    expectedOutput: "차량 동역학 핵심 변수 5개와 지원 직무 연결 메모",
    qualityStatus: "reviewed",
    engagement: {
      views: "443,486 views",
      comments: "상위 댓글에서 clear/brilliant/insightful 반응 확인",
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.youtube.com/watch?v=LZ82iANWBL0"
  },
  {
    id: "youtube-css-can-bus",
    title: "CAN Bus Explained - A Simple Intro",
    provider: "CSS Electronics YouTube",
    type: "공개강의 직접영상",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 10,
    practiceMinutes: 50,
    sequenceLevel: 1,
    core: true,
    tracks: ["electronics-pcb", "embedded-control", "automotive-mobility"],
    skills: ["CAN", "차량통신", "ECU", "진단", "인터페이스"],
    prerequisites: [],
    reason: "차량 ECU 통신을 처음 보는 학생에게 적합한 CAN 입문 영상입니다. 노드, 메시지, 차량 네트워크 흐름을 빠르게 파악할 수 있습니다.",
    expectedOutput: "CAN 노드, 프레임, 오류 처리 흐름을 직무 과제에 맞춘 1쪽 메모",
    qualityStatus: "reviewed",
    engagement: {
      views: "1,262,334 views",
      comments: "상위 댓글에서 simple/well explained 반응 확인",
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.youtube.com/watch?v=FqLDpHsxvf8"
  },
  {
    id: "youtube-skilllync-ev-crash-course",
    title: "How Do Electric Vehicles Work? EV Crash Course",
    provider: "Skill Lync YouTube",
    type: "공개강의 직접영상",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 180,
    practiceMinutes: 60,
    sequenceLevel: 1,
    tracks: ["mechanical-cae", "electronics-pcb", "embedded-control", "automotive-mobility"],
    skills: ["EV 시스템", "배터리", "모터", "열관리", "회생제동", "직무 이해"],
    prerequisites: [],
    reason: "EV 구조, 배터리, 모터, 열관리, 회생제동을 한 번에 훑는 공개강의입니다. 전동화 직무의 세부 담당 영역을 나누어 보는 데 적합합니다.",
    expectedOutput: "EV 파워트레인 구성요소와 세부 직무 담당 영역 매핑표",
    qualityStatus: "reviewed",
    engagement: {
      views: "2,791,345 views",
      comments: "상위 댓글에서 simple/easy to understand 반응 확인",
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.youtube.com/watch?v=qIfjibyt6pY"
  },
  {
    id: "youtube-mathworks-hil-testing",
    title: "Hardware in the Loop Testing",
    provider: "MathWorks YouTube",
    type: "공식 튜토리얼 직접영상",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 15,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["mechanical-cae", "electronics-pcb", "embedded-control", "automotive-mobility"],
    skills: ["HIL", "SIL", "Simulink", "시험계획", "검증리포트"],
    prerequisites: ["Simulink 기초"],
    reason: "제어 알고리즘을 실제 장비 없이 검증하는 HIL 개념을 MathWorks 공식 영상으로 연결합니다. 시험계획과 Pass/Fail 기준을 잡는 데 도움이 됩니다.",
    expectedOutput: "HIL/SIL 시험 목적, 입출력, Pass/Fail 기준 초안",
    qualityStatus: "reviewed",
    engagement: {
      views: "66,510 views",
      comments: "댓글에서 good information 반응 확인",
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.youtube.com/watch?v=8vbf9MZMOCY"
  },
  {
    id: "youtube-emc-emi-basics",
    title: "EMC and EMI",
    provider: "POWER ELECTRONICS BASICS YouTube",
    type: "공개강의 직접영상",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 20,
    practiceMinutes: 45,
    sequenceLevel: 1,
    tracks: ["electronics-pcb", "embedded-control", "automotive-mobility"],
    skills: ["EMC", "EMI", "노이즈", "시험계획", "인증"],
    prerequisites: ["회로 기초"],
    reason: "EMC/EMI 시험과 노이즈 경로를 빠르게 잡는 영상입니다. 회로·차량 전장 직무에서 인증과 사전 점검 흐름을 이해하는 데 적합합니다.",
    expectedOutput: "전도·방사 노이즈 경로와 사전 점검 체크리스트",
    qualityStatus: "reviewed",
    engagement: {
      views: "145,812 views",
      comments: "상위 댓글에서 useful/well explained/great work 반응 확인",
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.youtube.com/watch?v=C2UDpUAgoSQ"
  },
  {
    id: "youtube-nptel-hazop",
    title: "NPTEL Hazard and Operability Study",
    provider: "NPTEL YouTube",
    type: "공개강의 직접영상",
    language: "영어",
    difficulty: "기초실습",
    estimatedMinutes: 45,
    practiceMinutes: 60,
    sequenceLevel: 2,
    core: true,
    tracks: ["chemical-process", "semiconductor-equipment"],
    skills: ["HAZOP", "공정안전", "위험성평가", "변경관리", "문서화"],
    prerequisites: ["공정 흐름 이해"],
    reason: "공정안전 직무에서 반복적으로 쓰이는 HAZOP 방법을 대학 공개강의로 설명합니다. 위험성평가 표를 직접 작성하기 전 개념을 잡는 데 적합합니다.",
    expectedOutput: "공정 변수별 deviation, cause, consequence, safeguard 표",
    qualityStatus: "reviewed",
    engagement: {
      views: "41,950 views",
      comments: "상위 댓글에서 helpful and clear 반응 확인",
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.youtube.com/watch?v=n1s1UB80JgA"
  },
  {
    id: "youtube-cqe-quality-tools",
    title: "The 7 Quality Control Tools Explained with an Example",
    provider: "CQE Academy YouTube",
    type: "공개강의 직접영상",
    language: "영어",
    difficulty: "입문",
    estimatedMinutes: 20,
    practiceMinutes: 60,
    sequenceLevel: 1,
    core: true,
    tracks: ["production-quality"],
    skills: ["품질도구", "Pareto", "Ishikawa", "관리도", "문제해결"],
    prerequisites: [],
    reason: "품질 직무에서 바로 쓰는 7 QC tools를 예제로 설명합니다. 문제 정의부터 원인 분석까지 산출물로 연결하기 쉽습니다.",
    expectedOutput: "지원 직무 문제 1개에 적용할 7 QC tools 선택표",
    qualityStatus: "reviewed",
    engagement: {
      views: "962,731 views",
      comments: "상위 댓글에서 onboarding tool/best 16 mins 반응 확인",
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.youtube.com/watch?v=yuH35ottILU"
  },
  {
    id: "comento-production-tech-internship",
    title: "코멘토 생산기술·공정설계 5주 인턴체험",
    provider: "코멘토",
    type: "직무부트캠프/과제형",
    language: "한국어",
    difficulty: "적용",
    estimatedMinutes: 300,
    practiceMinutes: 600,
    sequenceLevel: 5,
    tracks: ["production-quality", "mechanical-cae", "automotive-mobility"],
    skills: ["생산기술", "공정설계", "신차개발", "문제해결", "포트폴리오"],
    prerequisites: ["관심 산업 공고 1개", "기초 품질·공정 용어"],
    reason: "현직자와 5주 동안 생산기술, 공정설계, 신차 개발 프로세스를 과제형으로 경험하는 외부 부트캠프입니다. 강의 수강보다 직무 산출물을 남기는 목적에 맞습니다.",
    expectedOutput: "공정설계 실습 과제, 신차 개발 프로세스 정리, 포트폴리오 초안",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://comento.kr/edu/learn/%EC%83%9D%EC%82%B0%EC%A0%9C%EC%A1%B0/%EC%83%9D%EC%82%B0%EA%B8%B0%EC%88%A0-G1194"
  },
  {
    id: "comento-semiconductor-equipment-bootcamp",
    title: "코멘토 반도체 장비 엔지니어 A to Z",
    provider: "코멘토",
    type: "직무부트캠프/현직자 과제",
    language: "한국어",
    difficulty: "적용",
    estimatedMinutes: 300,
    practiceMinutes: 600,
    sequenceLevel: 5,
    tracks: ["semiconductor-equipment", "production-quality"],
    skills: ["반도체 장비", "설비기술", "Trouble Shooting", "현직자 과제", "포트폴리오"],
    prerequisites: ["반도체 8대 공정 흐름", "장비 기본 용어"],
    reason: "대기업·외국계 현직자의 반도체 장비 직무 경험을 과제형으로 따라가며 장비 엔지니어의 반복 업무와 문제해결 방식을 익히는 후보입니다.",
    expectedOutput: "장비 직무 업무 분해표와 설비 이슈 대응 포트폴리오 초안",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://comento.kr/edu/learn/%EC%83%9D%EC%82%B0%EC%A0%9C%EC%A1%B0/%EC%84%A4%EB%B9%84%EA%B8%B0%EC%88%A0-G1470"
  },
  {
    id: "comento-plc-control-practice",
    title: "코멘토 전기·계장제어 PLC 설계·유지관리 실무",
    provider: "코멘토",
    type: "직무부트캠프/실무 과제",
    language: "한국어",
    difficulty: "적용",
    estimatedMinutes: 300,
    practiceMinutes: 540,
    sequenceLevel: 5,
    tracks: ["embedded-control", "electronics-pcb", "production-quality", "automotive-mobility"],
    skills: ["PLC", "계장제어", "설비 유지관리", "제어", "Trouble Shooting"],
    prerequisites: ["전기회로 기초", "제어 입문"],
    reason: "설비 자동화, 제어, 유지관리 직무에서 실제 업무 흐름을 과제형으로 확인할 수 있는 외부 실무 과정 후보입니다.",
    expectedOutput: "PLC 입출력 정의, 제어 시나리오, 설비 유지관리 체크리스트",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://comento.kr/edu/learn/%EA%B1%B4%EC%84%A4%EA%B8%B0%EA%B3%84%EA%B8%B0%EC%88%A0/%EC%A0%84%EA%B8%B0-G655"
  },
  {
    id: "comento-production-management-core",
    title: "코멘토 생산기술·생산관리 핵심 실무",
    provider: "코멘토",
    type: "직무부트캠프/현직자 과제",
    language: "한국어",
    difficulty: "기초실습",
    estimatedMinutes: 240,
    practiceMinutes: 480,
    sequenceLevel: 4,
    tracks: ["production-quality", "automotive-mobility"],
    skills: ["생산관리", "생산기술", "공정조건", "품질지표", "문제해결"],
    prerequisites: ["생산·품질 직무 차이 이해"],
    reason: "생산기술과 생산관리의 핵심 업무를 현직자 관점에서 과제로 확인하는 후보입니다. 직무 선택 단계에서 생산/품질/공정의 차이를 좁히는 데 좋습니다.",
    expectedOutput: "생산기술·생산관리 업무 비교표와 개선 과제 초안",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://comento.kr/edu/learn/%EC%83%9D%EC%82%B0%EC%A0%9C%EC%A1%B0/%EC%83%9D%EC%82%B0%EA%B8%B0%EC%88%A0-G191"
  },
  {
    id: "letuin-semiconductor-process-data-kdt",
    title: "렛유인 반도체 공정·설비 데이터 분석 과정",
    provider: "렛유인",
    type: "KDT/실무 프로젝트",
    language: "한국어",
    difficulty: "적용",
    estimatedMinutes: 420,
    practiceMinutes: 900,
    sequenceLevel: 5,
    tracks: ["semiconductor-equipment", "production-quality"],
    skills: ["반도체 공정", "설비 데이터", "수율분석", "결함분석", "프로젝트"],
    prerequisites: ["반도체 공정 기초", "Excel 또는 Python 기초"],
    reason: "반도체 공정·설비 데이터를 분석해 실무 프로젝트 산출물을 만드는 국비지원 장기훈련 후보입니다. 수율, 설비, 결함 데이터를 다루는 직무에 직접 연결됩니다.",
    expectedOutput: "공정·설비 데이터 분석 리포트와 개선 가설",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.letuin.com/promotion/SmcPrcEqpDtAnlKDT"
  },
  {
    id: "letuin-spotfire-defect-analysis",
    title: "렛유인 Spotfire 반도체 공정·결함 상관관계 분석",
    provider: "렛유인",
    type: "데이터분석 실무",
    language: "한국어",
    difficulty: "적용",
    estimatedMinutes: 300,
    practiceMinutes: 540,
    sequenceLevel: 4,
    tracks: ["semiconductor-equipment", "production-quality"],
    skills: ["Spotfire", "공정 데이터", "결함 상관관계", "시각화", "수율분석"],
    prerequisites: ["반도체 공정 기초", "데이터 표 해석"],
    reason: "반도체 현장 데이터의 공정·결함 상관관계를 시각화하고 분석하는 실무형 후보입니다. 수율/품질/공정 데이터 직무의 산출물로 연결하기 좋습니다.",
    expectedOutput: "Spotfire 기반 공정·결함 상관관계 분석 화면과 해석 메모",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://naeildo-letuinedu.com/Lecture/lecView?no=144"
  },
  {
    id: "letuin-semiconductor-field-practice",
    title: "렛유인 반도체 공정 현장실습 후보",
    provider: "렛유인",
    type: "오프라인 현장실습",
    language: "한국어",
    difficulty: "적용",
    estimatedMinutes: 360,
    practiceMinutes: 1080,
    sequenceLevel: 5,
    tracks: ["semiconductor-equipment"],
    skills: ["Photo", "Etch", "Deposition", "장비실습", "공정 관찰"],
    prerequisites: ["반도체 8대 공정 기초", "오프라인 일정 확인"],
    reason: "포토·식각·증착 장비를 직접 다뤄보는 오프라인 공정실습 후보입니다. 실제 장비 감각이 필요한 공정·장비 직무에서 강의만으로 채우기 어려운 부분을 보완합니다.",
    expectedOutput: "공정실습 수료 기록, 장비별 관찰 노트, 공정 조건 체크리스트",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.letuin.com/search/list?field=all&utm_medium=top_select&searchgo=Y&top_keyword=%EA%B3%B5%EC%A0%95%EC%8B%A4%EC%8A%B5"
  },
  {
    id: "letuin-cvd-maintenance-mentoring",
    title: "렛유인 CVD 공정 설비 Maintenance 멘토링 실무과정",
    provider: "렛유인",
    type: "직무부트캠프/멘토링",
    language: "한국어",
    difficulty: "적용",
    estimatedMinutes: 300,
    practiceMinutes: 720,
    sequenceLevel: 5,
    tracks: ["semiconductor-equipment"],
    skills: ["CVD", "설비 Maintenance", "Trouble Shooting", "공정설비", "현직자 멘토링"],
    prerequisites: ["증착 공정 기초", "장비 구성 이해"],
    reason: "CVD 설비 유지보수와 트러블슈팅을 현직자 멘토링 기반 과제로 다루는 후보입니다. 장비 엔지니어의 문제해결 스토리를 만들 때 적합합니다.",
    expectedOutput: "CVD 설비 이상 시나리오, 원인 가설, 유지보수 대응표",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.letuin.com/lecture/view?no=11663"
  },
  {
    id: "letuin-low-power-design-validation",
    title: "렛유인 저전력 반도체 설계와 검증 실무과정",
    provider: "렛유인",
    type: "설계 검증 실무",
    language: "한국어",
    difficulty: "적용",
    estimatedMinutes: 360,
    practiceMinutes: 720,
    sequenceLevel: 5,
    tracks: ["electronics-pcb", "semiconductor-equipment", "embedded-control"],
    skills: ["저전력 설계", "검증", "회로설계", "RTL/검증", "포트폴리오"],
    prerequisites: ["디지털 회로 기초", "반도체 설계 흐름 이해"],
    reason: "저전력 설계 기법과 검증 방법론을 실무 과정으로 다루는 후보입니다. 회로·반도체 설계 검증 직무의 산출물형 준비에 연결됩니다.",
    expectedOutput: "저전력 설계 요구사항, 검증 항목, 결과 해석 체크리스트",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-28",
      nextReviewAt: "2026-07-28"
    },
    url: "https://www.letuin.com/lecture/view?no=11520"
  }
].map(normalizeResource);

const automotiveResourceIds = new Set([
  "matlab-onramp",
  "statistics-onramp",
  "simulink-onramp",
  "stateflow-onramp",
  "control-design-onramp",
  "signal-processing-onramp",
  "mathworks-predictive-maintenance",
  "simscape-onramp",
  "mathworks-simscape-electrical",
  "sensor-fusion-onramp",
  "optimization-onramp",
  "mit-design-manufacturing",
  "mit-mechanics-materials",
  "mit-fea-solids",
  "mit-numerical-me",
  "kocw-mechanical-design",
  "kocw-electronics-circuit",
  "mit-circuits",
  "machine-learning-onramp",
  "allaboutcircuits-textbook",
  "kicad-pcb-docs",
  "ti-precision-labs",
  "analog-dialogue",
  "stm32-education",
  "stm32-mooc-gpio-timer-uart",
  "arm-embedded-systems",
  "coursera-embedded-control",
  "coursera-engineering-data",
  "edx-engineering-systems",
  "khan-math-physics-basics",
  "freecodecamp-python-data",
  "inflearn-free-it-practice",
  "step-engineering",
  "hrd-net-job-training",
  "ansys-innovation-courses",
  "ni-learn-test-measurement",
  "google-ml-crash-course",
  "boostcourse-data-ai-basic",
  "ncs",
  "youtube-nptel-vehicle-dynamics",
  "youtube-css-can-bus",
  "youtube-skilllync-ev-crash-course",
  "youtube-mathworks-hil-testing",
  "youtube-emc-emi-basics"
]);

resources.forEach((resource) => {
  if (automotiveResourceIds.has(resource.id)) {
    resource.tracks = [...new Set([...resource.tracks, "automotive-mobility"])];
  }
});

const roadmaps = {
  "mechanical-cae": [
    ["직무 이해", "설계 업무와 산출물을 정리하고 관심 제품을 하나 고릅니다.", "제품 구조와 요구사항 1쪽 요약"],
    ["전공·도구 보완", "재료역학, CAD, 수치해석 교육자료를 보며 작은 부품을 모델링합니다.", "부품 모델과 주요 치수표"],
    ["해석 적용", "하중과 구속조건을 정의하고 해석 가정을 문서화합니다.", "경계조건과 결과 해석 노트"],
    ["포트폴리오 정리", "설계 변경안과 근거를 리포트로 정리합니다.", "설계 검토 보고서"]
  ],
  "production-quality": [
    ["직무 이해", "생산기술, 공정기술, 품질 직무 차이를 비교합니다.", "직무별 업무 비교표"],
    ["데이터 기초", "공정 데이터의 산포, 이상치, 관리도를 학습합니다.", "관리도 예제 정리"],
    ["문제해결 적용", "FMEA 또는 8D 구조로 불량 사례를 분석합니다.", "불량 원인 분석 초안"],
    ["포트폴리오 정리", "개선 전후 지표와 재발 방지안을 제안합니다.", "개선 보고서 1부"]
  ],
  "semiconductor-equipment": [
    ["공정 흐름", "주요 반도체 공정의 목적과 입출력을 연결합니다.", "공정 흐름도"],
    ["장비 변수", "진공, 온도, 압력, 플라즈마 같은 장비 조건을 정리합니다.", "장비 조건 용어표"],
    ["수율 분석", "불량 데이터와 계측 지표를 기준으로 원인 가설을 세웁니다.", "Pareto 분석 예시"],
    ["포트폴리오 정리", "조건 변경의 효과와 리스크를 검토합니다.", "공정 개선 검토표"]
  ],
  "chemical-process": [
    ["공정 이해", "원료, 반응, 분리, 제품 품질 지표를 하나의 흐름으로 연결합니다.", "화학공정 흐름도"],
    ["전공·도구 보완", "물질수지, 열역학, 반응·분리공정 개념을 작은 예제로 복습합니다.", "물질수지 계산 노트"],
    ["조건·품질 분석", "공정 조건 변화가 수율, 순도, 불량, 안전 리스크에 미치는 영향을 비교합니다.", "조건 변경 검토표"],
    ["포트폴리오 정리", "공정 개선안과 HAZOP 관점 리스크를 함께 정리합니다.", "공정 개선·안전 검토 보고서"]
  ],
  "electronics-pcb": [
    ["회로 기본기", "전원, 신호, 임피던스, 노이즈 관점에서 회로를 봅니다.", "회로 블록도"],
    ["부품·시뮬레이션", "주요 부품 데이터시트를 읽고 간단한 회로를 시뮬레이션합니다.", "부품 선정표"],
    ["PCB·계측", "배치, 리턴패스, 디커플링, 측정 계획을 정리합니다.", "PCB 리뷰 체크리스트"],
    ["포트폴리오 정리", "요구사항 대비 측정 결과를 요약합니다.", "검증 리포트"]
  ],
  "embedded-control": [
    ["MCU 기본", "GPIO, Timer, ADC, PWM, 인터럽트의 역할을 정리합니다.", "주변장치 요약표"],
    ["통신·센서", "UART, SPI, I2C 중 하나를 골라 데이터 흐름을 설계합니다.", "통신 로그 계획"],
    ["제어 적용", "간단한 PID 응답을 시뮬레이션하거나 실험합니다.", "응답 그래프"],
    ["포트폴리오 정리", "코드, 실험 조건, 디버깅 과정을 정리합니다.", "펌웨어 프로젝트 노트"]
  ]
};

roadmaps["automotive-mobility"] = [
  ["직무 이해", "차량 개발 직무를 차체·섀시·전장·제어·검증으로 나누고 관심 직무의 반복 업무를 고릅니다.", "자동차 세부 직무 비교표"],
  ["요구사항 분해", "차량 기능 요구사항을 부품, 센서, 제어기, 시험 조건으로 나누어 봅니다.", "차량 시스템 요구사항표"],
  ["도구·검증 보완", "CAN 신호, MATLAB/Simulink, CAD 또는 HIL 중 선택 직무에 필요한 도구를 작은 예제로 확인합니다.", "인터페이스·시험 조건 노트"],
  ["포트폴리오 정리", "선택 직무의 설계 변경안 또는 검증 결과를 한 장 리포트로 정리합니다.", "자동차 직무 검증 리포트"]
];

const curriculumTasks = {
  "mechanical-cae": [
    {
      title: "제품 요구사항 분해",
      objective: "L형 브래킷이나 힌지처럼 단순한 기계 부품 하나를 골라 설계 조건을 말로 정의합니다.",
      time: "90분",
      steps: [
        "제품 사진이나 공개 도면을 1개 고르고 사용 상황을 적습니다.",
        "하중 방향, 고정 위치, 재료 후보, 허용 변형을 가정합니다.",
        "기능 요구사항 3개와 제약조건 3개를 분리합니다."
      ],
      deliverable: "요구사항 표와 부품 스케치 1쪽",
      rubric: ["하중·구속 가정이 보인다", "요구사항과 제약조건이 섞이지 않는다", "치수 또는 단위가 포함된다"]
    },
    {
      title: "손계산과 CAD 초안",
      objective: "가장 위험해 보이는 단면을 하나 정하고 응력·안전율을 대략 계산한 뒤 CAD 형상으로 옮깁니다.",
      time: "2시간",
      steps: [
        "굽힘 또는 인장 중 지배 하중을 하나 선택합니다.",
        "간단한 응력 계산식과 안전율을 적습니다.",
        "주요 치수 5개가 들어간 3D 모델 또는 2D 도면을 만듭니다."
      ],
      deliverable: "계산 노트, CAD 캡처, 주요 치수표",
      rubric: ["계산 가정이 형상과 연결된다", "안전율 판단이 있다", "치수 변경 이유를 설명할 수 있다"]
    },
    {
      title: "해석 조건 검증",
      objective: "FEA 결과 자체보다 경계조건과 메시가 결과에 미치는 영향을 확인합니다.",
      time: "2시간",
      steps: [
        "고정 조건과 하중 위치를 그림으로 표시합니다.",
        "거친 메시와 촘촘한 메시 결과를 비교합니다.",
        "손계산 결과와 FEA 최대응력을 비교하고 차이를 설명합니다."
      ],
      deliverable: "경계조건 그림과 해석 비교표",
      rubric: ["하중·구속 위치가 명확하다", "메시 변화 비교가 있다", "결과 차이에 대한 해석이 있다"]
    },
    {
      title: "설계 변경 제안",
      objective: "두께, 리브, 재료 중 하나를 바꿔 성능과 제조성을 함께 검토합니다.",
      time: "2시간",
      steps: [
        "기존안과 변경안의 차이를 표로 정리합니다.",
        "응력, 질량, 제작 난이도 중 최소 2개 지표를 비교합니다.",
        "최종 선택안과 포기한 대안을 함께 기록합니다."
      ],
      deliverable: "설계 검토 보고서 1쪽",
      rubric: ["비교 지표가 2개 이상이다", "변경안의 부작용을 적었다", "면접에서 선택 이유를 설명할 수 있다"]
    }
  ],
  "production-quality": [
    {
      title: "공정 문제 정의",
      objective: "가상의 제조 공정을 하나 정하고 품질 문제가 무엇인지 측정 가능한 언어로 바꿉니다.",
      time: "90분",
      steps: [
        "제품과 공정 4단계를 정합니다.",
        "CTQ를 1개 고르고 규격 상한·하한을 설정합니다.",
        "불량 유형 4개와 관측 위치를 정의합니다."
      ],
      deliverable: "공정 흐름도와 CTQ 정의표",
      rubric: ["측정 단위가 있다", "불량 유형이 겹치지 않는다", "공정 단계와 검사 위치가 연결된다"]
    },
    {
      title: "관리도와 Cpk 계산",
      objective: "샘플 데이터 30개로 평균, 산포, 이상치, 공정능력을 직접 계산합니다.",
      time: "2시간",
      steps: [
        "측정값 30개를 만들거나 수집합니다. 예: 9.92~10.10mm 범위 치수 데이터",
        "평균, 표준편차, 관리한계, Cpk를 계산합니다.",
        "관리 이탈 또는 규격 이탈 여부를 한 문장으로 판정합니다."
      ],
      deliverable: "관리도 캡처와 Cpk 계산표",
      rubric: ["계산식 또는 도구가 드러난다", "판정 문장이 있다", "이상치 처리 기준을 적었다"]
    },
    {
      title: "원인 가설과 FMEA",
      objective: "불량 원인을 추측이 아니라 데이터와 공정 조건으로 좁힙니다.",
      time: "2시간",
      steps: [
        "불량 건수를 Pareto로 정리합니다. 예: 치수불량 18, 스크래치 9, 조립불량 6, 오염 4",
        "상위 불량 1개에 대해 5Why 또는 Fishbone을 작성합니다.",
        "고장모드, 영향, 원인, 검출 방법, 개선안을 FMEA 표로 적습니다."
      ],
      deliverable: "Pareto 차트와 FMEA 초안",
      rubric: ["상위 원인이 숫자로 선택된다", "원인과 개선안이 대응된다", "검출 방법이 포함된다"]
    },
    {
      title: "8D 개선 보고서",
      objective: "개선 전후 지표를 비교하고 재발 방지까지 한 장으로 정리합니다.",
      time: "2시간",
      steps: [
        "문제, 원인, 임시조치, 영구조치를 구분합니다.",
        "개선 전후 불량률을 가정하고 비교합니다.",
        "재발 방지 체크 항목 3개를 만듭니다."
      ],
      deliverable: "8D 형식 개선 보고서 1쪽",
      rubric: ["문제 정의가 수치화된다", "임시조치와 영구조치가 구분된다", "재발 방지 항목이 실행 가능하다"]
    }
  ],
  "semiconductor-equipment": [
    {
      title: "공정 흐름 매핑",
      objective: "반도체 공정을 암기 목록이 아니라 입력·출력·불량 위험으로 연결합니다.",
      time: "90분",
      steps: [
        "산화, 노광, 식각, 증착, 이온주입, CMP를 순서대로 배치합니다.",
        "각 공정의 입력, 출력, 주요 장비 변수를 1개씩 적습니다.",
        "각 공정에서 생길 수 있는 불량을 1개씩 연결합니다."
      ],
      deliverable: "공정 흐름도와 불량 연결표",
      rubric: ["공정 목적이 한 문장으로 정리된다", "장비 변수가 포함된다", "불량과 공정이 연결된다"]
    },
    {
      title: "식각 장비 변수 정리",
      objective: "플라즈마 식각을 예로 들어 압력, RF power, 가스, 온도가 결과에 미치는 영향을 정리합니다.",
      time: "2시간",
      steps: [
        "식각률, 선택비, 균일도, CD 변화를 결과 지표로 둡니다.",
        "압력, RF power, 가스 유량, 온도의 영향을 가설로 적습니다.",
        "조건 변경 시 기대 효과와 리스크를 같이 씁니다."
      ],
      deliverable: "식각 조건 변수표",
      rubric: ["변수와 결과 지표가 연결된다", "효과와 리스크가 함께 있다", "장비 용어를 설명할 수 있다"]
    },
    {
      title: "수율 Pareto 분석",
      objective: "수율 저하 원인을 감으로 고르지 않고 결함 분포로 우선순위를 정합니다.",
      time: "2시간",
      steps: [
        "샘플 결함 수를 사용합니다. 예: particle 42, photo misalign 18, etch residue 11, metal open 7",
        "Pareto 차트와 누적 비율을 만듭니다.",
        "상위 결함 1개에 대해 계측 지표와 확인 실험을 제안합니다."
      ],
      deliverable: "결함 Pareto와 개선 가설 3개",
      rubric: ["상위 결함이 숫자로 선택된다", "계측 방법이 포함된다", "가설이 장비 조건과 연결된다"]
    },
    {
      title: "조건 변경 검토표",
      objective: "공정 조건 변경을 제안할 때 기대 효과, 검증 방법, 리스크를 함께 설명합니다.",
      time: "2시간",
      steps: [
        "변경할 조건 1개와 유지할 조건 2개를 정합니다.",
        "성공 지표와 중단 기준을 정합니다.",
        "다른 공정이나 품질 지표에 미칠 부작용을 적습니다."
      ],
      deliverable: "공정 조건 변경 검토표",
      rubric: ["성공 지표가 수치형이다", "중단 기준이 있다", "부작용과 확인 방법이 적혀 있다"]
    }
  ],
  "chemical-process": [
    {
      title: "화학공정 흐름도",
      objective: "원료부터 제품까지 주요 단위공정과 품질 지표를 한 장의 흐름도로 연결합니다.",
      time: "90분",
      steps: [
        "제품 예시를 고릅니다. 예: 전해액, 고분자 필름, 정제 제품, 의약 원료",
        "원료, 반응기, 분리기, 저장, 검사 단계를 순서대로 배치합니다.",
        "각 단계의 입력, 출력, 주요 관리 변수를 1개씩 적습니다."
      ],
      deliverable: "원료-반응-분리-품질 흐름도",
      rubric: ["단위공정 순서가 보인다", "입출력이 구분된다", "품질 지표가 포함된다"]
    },
    {
      title: "물질수지와 수율 계산",
      objective: "전환율, 선택도, 수율을 임의 데이터로 계산하고 손실 원인을 가정합니다.",
      time: "2시간",
      steps: [
        "원료 투입량, 생성물, 부산물, 손실량을 표로 둡니다.",
        "전환율, 선택도, 수율을 계산합니다.",
        "수율을 낮추는 원인 후보 3개와 확인 데이터를 적습니다."
      ],
      deliverable: "물질수지 계산표와 수율 저하 가설",
      rubric: ["단위가 일관된다", "전환율·선택도·수율이 구분된다", "손실 가설이 공정 조건과 연결된다"]
    },
    {
      title: "반응·분리 조건 비교",
      objective: "온도, 압력, 체류시간, 분리 조건 변화가 순도와 수율에 미치는 영향을 비교합니다.",
      time: "2시간",
      steps: [
        "변경할 조건 2개와 고정할 조건 2개를 정합니다.",
        "수율, 순도, 에너지 사용량, 안전 리스크 중 3개 지표를 비교합니다.",
        "조건 변경의 기대 효과와 부작용을 표로 정리합니다."
      ],
      deliverable: "반응·분리 조건 변경 검토표",
      rubric: ["고정 변수와 변경 변수가 분리된다", "품질 지표가 포함된다", "리스크와 검증 방법이 있다"]
    },
    {
      title: "HAZOP 안전 체크",
      objective: "선택한 공정 단계 하나에 대해 이상 조건과 예방 대책을 HAZOP 관점으로 정리합니다.",
      time: "2시간",
      steps: [
        "온도, 압력, 유량, 조성 중 위험 변수를 2개 고릅니다.",
        "높음, 낮음, 없음, 역류 같은 이상 조건을 적습니다.",
        "원인, 결과, 감지 방법, 예방 대책을 체크리스트로 만듭니다."
      ],
      deliverable: "HAZOP 체크리스트와 개선 조치 메모",
      rubric: ["이상 조건이 구체적이다", "감지 방법이 있다", "예방 대책이 실행 가능하다"]
    }
  ],
  "chemical-process-role-options": [
    {
      id: "chemical-process-engineer",
      title: "화학공정 엔지니어",
      postingKeywords: ["화학공정", "공정개선", "물질수지", "PFD", "조건변경"],
      industries: ["chemical", "battery", "manufacturing", "semiconductor", "all"],
      focus: "원료, 반응, 분리, 품질 지표를 연결해 공정 조건을 안정화하고 개선하는 직무",
      responsibilities: ["공정 흐름도와 물질수지 검토", "온도·압력·유량·조성 조건 관리", "수율·순도·불량 지표 분석", "조건 변경 효과와 리스크 문서화"],
      requirements: ["물질수지, 열역학, 반응공학, 분리공정 기초", "Excel 또는 MATLAB/Python 기반 계산", "공정 변수와 품질 지표 연결", "현장 변경 이력과 표준 조건 관리"],
      preferred: ["Aspen/HYSYS 등 공정모사 경험", "DOE/SPC 기반 조건 최적화", "공정 안전·환경 규제 이해"]
    },
    {
      id: "battery-process-engineer",
      title: "배터리 공정 엔지니어",
      postingKeywords: ["전극공정", "슬러리", "코팅", "조립", "수율"],
      industries: ["battery", "manufacturing", "all"],
      focus: "전극 제조, 조립, 활성화, 검사 공정의 조건과 품질 데이터를 연결해 수율을 개선하는 직무",
      responsibilities: ["믹싱·코팅·건조·캘린더링 조건 관리", "전극 두께, 밀도, 수분, 불량 데이터 분석", "공정 이상 원인 가설과 개선 실험 수행", "양산 조건 변경과 품질 리스크 검토"],
      requirements: ["전기화학·소재 기초", "점도, 건조, 코팅 균일도 같은 공정 변수 이해", "SPC와 수율 데이터 해석", "공정 조건표와 개선 보고서 작성"],
      preferred: ["배터리 소재 또는 셀 제조 이해", "DOE/통계 기반 실험 설계", "Python/SQL 기반 생산 데이터 처리"]
    },
    {
      id: "materials-rnd-engineer",
      title: "소재 R&D 엔지니어",
      postingKeywords: ["소재개발", "합성", "분석", "물성", "Scale-up"],
      industries: ["chemical", "battery", "semiconductor", "all"],
      focus: "소재 조성, 합성 조건, 물성 평가 결과를 연결해 후보 소재와 scale-up 방향을 제안하는 직무",
      responsibilities: ["소재 합성·배합 조건 설계", "물성·분석 결과 정리", "조성·공정 조건과 성능 지표 상관 분석", "lab 결과를 양산 검토 조건으로 변환"],
      requirements: ["유기/무기/고분자 또는 소재 기초", "분석 장비 결과 해석", "실험 조건과 결과를 표준 양식으로 기록", "데이터 기반 후보 선정"],
      preferred: ["DOE, 통계 분석, Python 활용", "Scale-up 또는 양산 이관 경험", "특허·논문·기술문서 조사 역량"]
    },
    {
      id: "process-safety-engineer",
      title: "공정안전·환경 엔지니어",
      postingKeywords: ["PSM", "HAZOP", "MSDS", "환경안전", "Risk Assessment"],
      industries: ["chemical", "battery", "manufacturing", "semiconductor", "all"],
      focus: "화학물질, 설비, 운전 조건의 위험성을 평가하고 사고 예방과 환경 규제 대응을 관리하는 직무",
      responsibilities: ["MSDS와 위험물 정보 검토", "HAZOP/위험성 평가 수행", "PSM 문서와 변경관리 지원", "배출·폐수·폐기물 관리 기준 확인"],
      requirements: ["화학물질 안전, 공정 흐름, 설비 위험요인 이해", "법규·표준 문서 읽기", "위험 원인과 예방 대책을 표로 정리", "현장 점검 결과 문서화"],
      preferred: ["산업안전/위험물/환경 자격 이해", "KOSHA PSM 자료 활용", "사고 사례 기반 재발 방지 보고"]
    },
    {
      id: "bioprocess-engineer",
      title: "바이오·제약 공정 엔지니어",
      postingKeywords: ["GMP", "배양", "정제", "Validation", "SOP"],
      industries: ["bio", "chemical", "manufacturing", "all"],
      focus: "배양, 정제, 품질, 밸리데이션 조건을 연결해 의약·바이오 생산 공정을 안정화하는 직무",
      responsibilities: ["배양·정제 공정 조건 관리", "SOP와 batch record 작성 지원", "수율·순도·오염 리스크 분석", "공정 밸리데이션과 변경관리 자료 정리"],
      requirements: ["생물공정 또는 화학공정 기초", "GMP, SOP, validation 용어 이해", "공정 조건과 품질 지표 연결", "기록 문서의 정확성 관리"],
      preferred: ["제약 품질 시스템 이해", "통계 기반 공정 모니터링", "영문 규정 문서 읽기"]
    }
  ],
  "electronics-pcb": [
    {
      title: "전원 요구사항 정의",
      objective: "5V 입력에서 3.3V를 만드는 전원 블록을 정하고 전류, 리플, 발열 조건을 정의합니다.",
      time: "90분",
      steps: [
        "부하 전류, 허용 리플, 입력 전압 범위를 정합니다.",
        "LDO와 Buck 중 하나를 선택하고 선택 이유를 적습니다.",
        "데이터시트에서 dropout, 효율, 열저항 중 필요한 항목을 찾습니다."
      ],
      deliverable: "전원 블록 요구사항표",
      rubric: ["수치 요구사항이 있다", "부품 선택 근거가 있다", "발열 또는 효율 검토가 있다"]
    },
    {
      title: "센서 신호 증폭 회로",
      objective: "간단한 센서 출력 신호를 ADC 입력 범위에 맞추는 증폭 회로를 설계합니다.",
      time: "2시간",
      steps: [
        "센서 출력 범위와 ADC 입력 범위를 정합니다.",
        "필요 이득과 기준 전압을 계산합니다.",
        "저항값 후보와 주파수 대역 제한을 정리합니다."
      ],
      deliverable: "회로 블록도와 부품 선정표",
      rubric: ["이득 계산이 있다", "ADC 범위와 연결된다", "노이즈나 대역폭 언급이 있다"]
    },
    {
      title: "PCB 리뷰 체크리스트",
      objective: "회로가 동작하는 것과 PCB가 안정적인 것은 다르다는 점을 체크리스트로 확인합니다.",
      time: "2시간",
      steps: [
        "전원 루프, 그라운드 리턴패스, 디커플링 위치를 확인합니다.",
        "전류가 큰 배선과 민감한 신호 배선을 구분합니다.",
        "측정 포인트와 커넥터 방향을 표시합니다."
      ],
      deliverable: "PCB 리뷰 체크리스트 10항목",
      rubric: ["리턴패스 항목이 있다", "디커플링 위치 기준이 있다", "측정 포인트가 포함된다"]
    },
    {
      title: "검증 리포트",
      objective: "측정값을 요구사항과 비교해 Pass/Fail을 판단하는 형식으로 정리합니다.",
      time: "2시간",
      steps: [
        "측정 항목, 장비, 프로브 위치, 조건을 정합니다.",
        "예상값과 측정값 표를 만듭니다.",
        "불합격 항목이 있다면 원인 가설과 다음 실험을 적습니다."
      ],
      deliverable: "검증 리포트 1쪽",
      rubric: ["측정 조건이 재현 가능하다", "Pass/Fail 기준이 있다", "다음 실험이 구체적이다"]
    }
  ],
  "embedded-control": [
    {
      title: "MCU 주변장치 설계",
      objective: "GPIO, Timer, ADC, PWM, Interrupt를 실제 장치 기능과 연결합니다.",
      time: "90분",
      steps: [
        "제어할 장치 예시를 고릅니다. 예: 온도 팬 제어, 라인트레이서, 모터 속도 제어",
        "입력 센서, 출력 액추에이터, 주기 작업을 표로 정리합니다.",
        "필요 주변장치와 인터럽트 우선순위를 정합니다."
      ],
      deliverable: "주변장치 매핑표",
      rubric: ["센서·출력·주기가 분리된다", "Timer/ADC/PWM 역할이 보인다", "인터럽트 사용 이유가 있다"]
    },
    {
      title: "UART 센서 프로토콜",
      objective: "센서 데이터를 주고받는 프레임 구조와 오류 처리 방법을 설계합니다.",
      time: "2시간",
      steps: [
        "프레임 구조를 정합니다. 예: STX, ID, LENGTH, DATA, CHECKSUM",
        "정상 로그 3줄과 오류 로그 2줄을 만듭니다.",
        "타임아웃, 체크섬 오류, 재전송 조건을 적습니다."
      ],
      deliverable: "통신 프레임 정의와 샘플 로그",
      rubric: ["프레임 필드가 명확하다", "오류 케이스가 있다", "로그로 디버깅할 수 있다"]
    },
    {
      title: "PID 응답 실험",
      objective: "P, I, D 값이 응답에 미치는 영향을 그래프나 표로 설명합니다.",
      time: "2시간",
      steps: [
        "목표값과 현재값을 둔 간단한 1차 시스템을 가정합니다.",
        "P만 사용, PI 사용, PID 사용 결과를 비교합니다.",
        "오버슈트, 정착시간, 정상상태 오차를 표로 적습니다."
      ],
      deliverable: "응답 비교 그래프와 튜닝 메모",
      rubric: ["비교 조건이 같다", "응답 지표가 2개 이상이다", "튜닝 이유를 설명할 수 있다"]
    },
    {
      title: "디버깅 노트와 README",
      objective: "코드보다 문제를 어떻게 좁혔는지 보이는 포트폴리오 노트를 만듭니다.",
      time: "2시간",
      steps: [
        "버그 상황, 재현 방법, 관측 로그를 적습니다.",
        "가설 2개와 확인 실험을 기록합니다.",
        "실행 방법, 핀 연결, 제한사항을 README로 정리합니다."
      ],
      deliverable: "디버깅 노트와 프로젝트 README",
      rubric: ["재현 절차가 있다", "로그와 가설이 연결된다", "다른 사람이 실행할 수 있다"]
    }
  ]
};

const chemicalProcessJobRoles = curriculumTasks["chemical-process-role-options"];
delete curriculumTasks["chemical-process-role-options"];

const learningGoals = {
  explore: {
    label: "직무가 맞는지 판단",
    summary: "반복 업무, 자격조건, 산출물을 먼저 확인해 지원 직무가 맞는지 판단합니다.",
    preferredDifficulties: ["입문"],
    prioritySkills: ["직무 이해", "문서화"]
  },
  foundation: {
    label: "부족 역량 보완",
    summary: "역량 체크에서 비어 있는 전공·도구 역량을 먼저 메웁니다.",
    preferredDifficulties: ["입문", "기초실습"],
    prioritySkills: ["전공지식", "통계", "회로이론", "재료역학", "공정 흐름", "물질수지", "열역학", "C언어"]
  },
  portfolio: {
    label: "실습 산출물 만들기",
    summary: "실습 시간과 산출물이 분명한 교육자료를 우선 봅니다.",
    preferredDifficulties: ["기초실습", "적용"],
    prioritySkills: ["문서화", "검증", "문제해결", "도구역량"]
  },
  interview: {
    label: "공고·면접 근거 정리",
    summary: "지원 회사 공고 문장과 직무 언어로 설명할 수 있는 산출물 근거를 정리합니다.",
    preferredDifficulties: ["입문", "적용"],
    prioritySkills: ["직무 이해", "문서화", "검증"]
  }
};

const goalRecommendationLabels = {
  explore: "반복 업무와 자격조건 판단 우선",
  foundation: "역량 체크 공백 보완 우선",
  portfolio: "실습 산출물과 제출 근거 우선",
  interview: "공고 문장과 면접 설명 근거 우선"
};

const goalScoringRules = {
  explore: {
    label: "직무 판단",
    resource: "입문, 직무 용어, 한국어·공식 자료, 짧은 학습시간",
    roadmap: "업무 흐름과 핵심 용어를 먼저 확인하는 과제"
  },
  foundation: {
    label: "부족 역량 보완",
    resource: "역량 체크에서 비어 있는 전공·도구 역량",
    roadmap: "보완 필요 역량과 직접 맞닿은 기초 과제"
  },
  portfolio: {
    label: "실습 산출물",
    resource: "실습시간, 보고서, README, 검증 결과물",
    roadmap: "산출물을 남기고 반복 보강할 수 있는 과제"
  },
  interview: {
    label: "공고·면접 근거",
    resource: "채용공고 키워드, 공식 자료, 설명 가능한 근거",
    roadmap: "직무 언어로 말할 수 있는 검증·비교 과제"
  }
};

const durationLabels = {
  "2": "2주 집중",
  "4": "4주 기본",
  "8": "8주 심화",
  "12": "12주 포트폴리오"
};

const durationStrategies = {
  "2": {
    label: "2주 집중",
    summary: "핵심 결핍 역량 1~2개와 짧은 공식·입문 자료만 압축 배치합니다.",
    resourceRule: "주차당 1~2개 자료, 총 학습량이 긴 자료는 후순위",
    taskRule: "업무 흐름, 직무 키워드, 바로 설명 가능한 산출물 우선"
  },
  "4": {
    label: "4주 기본",
    summary: "직무 필수역량과 작은 산출물을 균형 있게 배치합니다.",
    resourceRule: "주차당 2개 내외 자료, 직무 직접 매핑과 보완 역량 우선",
    taskRule: "기초 보완 후 데이터·검증 산출물로 연결"
  },
  "8": {
    label: "8주 심화",
    summary: "전공 보완, 실습 반복, 포트폴리오 초안을 함께 만듭니다.",
    resourceRule: "주차당 최대 3개 자료, 심화·실습 자료와 반복 과제 포함",
    taskRule: "핵심 과제를 반복해 판단 기준과 개선 근거 강화"
  },
  "12": {
    label: "12주 포트폴리오",
    summary: "심화자료와 산출물 보강, 면접 설명 근거까지 포함합니다.",
    resourceRule: "주차당 최대 3개 자료, 공식·심화·프로젝트형 자료 조합",
    taskRule: "반복 수행 후 포트폴리오 보강과 면접 답변 문장화"
  }
};

const industryLabels = {
  all: "전체",
  mobility: "자동차·모빌리티",
  semiconductor: "반도체",
  manufacturing: "제조·품질",
  robotics: "로봇·자동화",
  electronics: "전자·하드웨어",
  chemical: "화학·정유",
  battery: "배터리·소재",
  bio: "바이오·제약"
};

const majorLabels = {
  mechanical: "기계공학",
  electrical: "전자공학",
  chemical: "화학공학",
  both: "공학 융합/전체"
};

const majorBridgeTracks = {
  mechanical: ["electronics-pcb", "chemical-process"],
  electrical: ["mechanical-cae", "chemical-process"],
  chemical: ["electronics-pcb", "embedded-control", "mechanical-cae"]
};

const majorRoleFitProfiles = {
  mechanical: {
    direct: [
      "mechanical-design-engineer",
      "cae-analysis-engineer",
      "manufacturing-design-engineer",
      "thermal-cfd-engineer",
      "mechanical-test-engineer",
      "process-engineer",
      "production-technology-engineer"
    ],
    bridge: [
      "quality-engineer",
      "supplier-quality-engineer",
      "production-data-engineer",
      "semiconductor-equipment-engineer",
      "semiconductor-process-engineer",
      "semiconductor-yield-engineer",
      "etch-process-engineer",
      "metrology-engineer",
      "hardware-design-engineer",
      "validation-engineer",
      "control-engineer",
      "robotics-software-engineer",
      "motor-control-engineer",
      "battery-process-engineer",
      "process-safety-engineer"
    ],
    bridgeFocus: "데이터 분석, 전기·전자 기초, 공정·품질 언어를 보완하면 진입 가능성이 커집니다."
  },
  electrical: {
    direct: [
      "hardware-design-engineer",
      "pcb-design-engineer",
      "validation-engineer",
      "power-hardware-engineer",
      "emc-test-engineer",
      "embedded-firmware-engineer",
      "control-engineer",
      "robotics-software-engineer",
      "embedded-linux-engineer",
      "motor-control-engineer",
      "semiconductor-equipment-engineer",
      "semiconductor-process-engineer",
      "semiconductor-yield-engineer",
      "etch-process-engineer",
      "metrology-engineer"
    ],
    bridge: [
      "process-engineer",
      "quality-engineer",
      "production-data-engineer",
      "production-technology-engineer",
      "mechanical-test-engineer",
      "thermal-cfd-engineer",
      "battery-process-engineer",
      "process-safety-engineer"
    ],
    bridgeFocus: "회로·계측·제어 강점을 공정 데이터, 품질 기준, 설비 조건 해석으로 연결해야 합니다."
  },
  chemical: {
    direct: [
      "chemical-process-engineer",
      "battery-process-engineer",
      "materials-rnd-engineer",
      "process-safety-engineer",
      "bioprocess-engineer",
      "semiconductor-process-engineer",
      "semiconductor-yield-engineer",
      "etch-process-engineer",
      "process-engineer"
    ],
    bridge: [
      "quality-engineer",
      "production-data-engineer",
      "production-technology-engineer",
      "semiconductor-equipment-engineer",
      "metrology-engineer",
      "supplier-quality-engineer",
      "validation-engineer",
      "hardware-design-engineer"
    ],
    bridgeFocus: "물질수지·반응·분리 강점을 수율, 계측, 데이터, 장비 조건 언어로 번역해야 합니다."
  }
};

majorRoleFitProfiles.mechanical.direct.push(
  "vehicle-body-design-engineer",
  "chassis-suspension-engineer",
  "powertrain-mechanical-engineer",
  "vehicle-thermal-management-engineer",
  "ev-battery-pack-engineer",
  "vehicle-test-validation-engineer"
);
majorRoleFitProfiles.mechanical.bridge.push(
  "vehicle-ee-architecture-engineer",
  "automotive-embedded-sw-engineer",
  "hil-sil-validation-engineer",
  "adas-validation-engineer",
  "ev-power-electronics-engineer"
);
majorRoleFitProfiles.electrical.direct.push(
  "vehicle-ee-architecture-engineer",
  "automotive-embedded-sw-engineer",
  "hil-sil-validation-engineer",
  "adas-validation-engineer",
  "ev-power-electronics-engineer"
);
majorRoleFitProfiles.electrical.bridge.push(
  "vehicle-body-design-engineer",
  "chassis-suspension-engineer",
  "powertrain-mechanical-engineer",
  "vehicle-thermal-management-engineer",
  "ev-battery-pack-engineer",
  "vehicle-test-validation-engineer"
);

const starterKeywords = {
  "automotive-mobility": "자동차 차체 섀시 전장 ECU CAN HIL ADAS 검증",
  "mechanical-cae": "재료역학 기계요소설계 구조해석 CAD",
  "production-quality": "품질관리 SPC 관리도 FMEA 공정능력",
  "semiconductor-equipment": "반도체 공정 소자 진공 플라즈마 계측",
  "chemical-process": "화학공정 물질수지 반응공학 분리공정 공정안전",
  "electronics-pcb": "회로이론 전자회로 전원회로 PCB 계측",
  "embedded-control": "임베디드 C언어 MCU 제어공학 UART"
};

const jobRoles = {
  "chemical-process": chemicalProcessJobRoles,
  "mechanical-cae": [
    {
      id: "mechanical-design-engineer",
      title: "기구설계 엔지니어",
      postingKeywords: ["기구설계", "3D CAD", "도면", "공차", "시제품"],
      industries: ["mobility", "robotics", "manufacturing", "all"],
      focus: "제품 요구사항을 3D 형상, 2D 도면, 공차, BOM, 시제품 검증 계획으로 바꾸는 직무",
      responsibilities: ["신규 제품 또는 모듈의 기구 구조 설계", "3D CAD 모델링과 2D 도면 작성", "공차·조립성·재료·가공성을 고려한 설계 검토", "시제품 제작 이슈 반영과 설계 변경"],
      requirements: ["기계공학 기초와 기계요소 이해", "CATIA, SolidWorks, Creo 등 3D CAD 활용", "도면 해석과 치수·공차 표기 이해", "가공·사출·판금·조립 같은 제조 방식 기초"],
      preferred: ["GD&T 또는 공차 누적 검토", "양산 이관 경험 또는 DFM/DFA 이해", "시험 결과를 설계 변경 근거로 문서화하는 역량"]
    },
    {
      id: "cae-analysis-engineer",
      title: "CAE 해석 엔지니어",
      postingKeywords: ["구조해석", "열해석", "FEA", "경계조건", "검증"],
      industries: ["mobility", "robotics", "manufacturing", "all"],
      focus: "구조·열·진동 문제를 모델링하고 해석 조건과 시험 결과를 연결해 설계 의사결정을 돕는 직무",
      responsibilities: ["구조·열·진동 해석 모델 구성", "하중, 구속, 접촉, 재료 물성 정의", "메시 민감도와 결과 수렴성 확인", "시험 또는 손계산과 해석 결과 비교"],
      requirements: ["재료역학, 열전달, 진동 기초", "ANSYS, Abaqus, HyperWorks 등 FEA 도구 이해", "해석 가정과 경계조건 문서화", "결과를 설계 변경안으로 번역하는 리포트 작성"],
      preferred: ["시험 데이터 상관성 검토", "자동화 스크립트 또는 MATLAB/Python 활용", "규격·내구·안전율 기준 이해"]
    },
    {
      id: "manufacturing-design-engineer",
      title: "제조성 설계 엔지니어",
      postingKeywords: ["DFM", "DFA", "공차", "시제품", "양산성"],
      industries: ["manufacturing", "mobility", "all"],
      focus: "설계안이 실제 제작, 조립, 검사, 양산 조건에서 반복 가능하도록 제조 리스크를 줄이는 직무",
      responsibilities: ["설계 단계 DFM/DFA 검토", "시제품 제작 이슈와 양산 불량 가능성 분석", "금형·가공·조립·검사 조건을 설계에 반영", "협력사 또는 생산부서 피드백 기반 설계 변경"],
      requirements: ["공차와 조립 구조 이해", "주요 제조공정과 검사 방식 기초", "설계 변경 전후 영향 비교", "문제 원인과 개선안을 표준 문서로 정리"],
      preferred: ["원가·공정성·품질 균형 판단", "APQP/PPAP 또는 양산 이관 절차 이해", "현장 이슈를 설계 요구사항으로 재정의하는 역량"]
    },
    {
      id: "thermal-cfd-engineer",
      title: "열·유동 해석 엔지니어",
      postingKeywords: ["열해석", "CFD", "냉각", "유동", "온도"],
      industries: ["mobility", "robotics", "electronics", "manufacturing", "all"],
      focus: "발열, 냉각, 유동 조건을 모델링해 제품 온도와 성능 리스크를 검증하는 직무",
      responsibilities: ["발열원, 냉각 경로, 유동 조건 정의", "열전달·유동 해석 모델 구성", "온도 측정 또는 시험 조건과 해석 결과 비교", "방열 구조나 냉각 조건 개선안 제안"],
      requirements: ["열전달, 유체역학, 수치해석 기초", "CFD 또는 열해석 도구 기본 이해", "경계조건과 물성값 설정 근거 문서화", "온도·유량·압력 결과 해석"],
      preferred: ["전자제품 방열 또는 배터리 열관리 이해", "시험 데이터와 해석 결과 상관성 검토", "MATLAB/Python 데이터 후처리"]
    },
    {
      id: "mechanical-test-engineer",
      title: "기계 신뢰성·시험평가 엔지니어",
      postingKeywords: ["시험평가", "신뢰성", "내구", "진동", "검증"],
      industries: ["mobility", "robotics", "manufacturing", "all"],
      focus: "제품 요구사항을 시험 조건과 판정 기준으로 바꿔 내구·진동·환경 신뢰성을 검증하는 직무",
      responsibilities: ["시험 항목과 Pass/Fail 기준 정의", "내구, 진동, 온습도 등 시험 조건 설계", "시험 중 이상 현상과 파손 원인 정리", "개선 전후 시험 결과 비교 리포트 작성"],
      requirements: ["재료역학과 시험 규격 기초", "센서, 계측, 데이터 로깅 이해", "파손 모드와 설계 원인 연결", "시험 결과를 설계 변경 근거로 문서화"],
      preferred: ["KS/ISO/자동차 규격 이해", "시험 치구 설계 경험", "신뢰성 지표와 수명 추정 기초"]
    }
  ],
  "production-quality": [
    {
      id: "process-engineer",
      title: "공정기술 엔지니어",
      postingKeywords: ["공정조건", "수율", "설비", "개선", "DOE"],
      industries: ["manufacturing", "semiconductor", "mobility", "electronics", "all"],
      focus: "공정 조건, 설비 상태, 품질 데이터를 연결해 수율·품질·생산성을 개선하는 직무",
      responsibilities: ["공정 조건 설정과 표준화", "불량·수율·생산성 지표 모니터링", "설비 이상과 공정 변수 간 원인 분석", "DOE, SPC, FMEA, 8D 기반 개선 실행"],
      requirements: ["공정 흐름과 CTQ 이해", "Excel/Python/Minitab 기반 데이터 분석", "관리도, Cpk, Pareto 해석", "현장 부서와 협업해 조건 변경을 관리"],
      preferred: ["MES 또는 설비 로그 이해", "Lean/Six Sigma 문제해결", "표준작업서·작업조건표 작성 경험"]
    },
    {
      id: "quality-engineer",
      title: "품질보증·품질관리 엔지니어",
      postingKeywords: ["SPC", "Cpk", "FMEA", "8D", "ISO/IATF"],
      industries: ["manufacturing", "mobility", "electronics", "all"],
      focus: "검사 데이터와 고객 요구사항을 기준으로 품질 리스크를 예방하고 불량 재발을 막는 직무",
      responsibilities: ["수입·공정·출하 품질 관리", "SPC, Cpk, 검사 기준 운영", "FMEA, Control Plan, 8D 보고서 작성", "고객 클레임과 내부 불량 개선 추적"],
      requirements: ["통계적 품질관리와 측정 시스템 이해", "ISO 9001, IATF 16949 등 품질 시스템 기초", "도면·규격·검사성적서 해석", "원인분석과 재발방지 문서화"],
      preferred: ["MSA, APQP, PPAP 이해", "협력사 품질 또는 감사 대응", "영문 품질 문서와 고객 커뮤니케이션"]
    },
    {
      id: "production-data-engineer",
      title: "생산 데이터 분석 담당",
      postingKeywords: ["MES", "공정데이터", "Python", "SQL", "Pareto"],
      industries: ["manufacturing", "semiconductor", "electronics", "all"],
      focus: "MES, 설비 로그, 검사 데이터를 정리해 불량·정지·수율 개선 우선순위를 찾는 직무",
      responsibilities: ["공정·품질 데이터 수집과 전처리", "불량·정지·수율 지표 대시보드 구성", "Pareto, 추세, 상관 분석으로 개선 과제 도출", "현업이 볼 수 있는 분석 리포트 작성"],
      requirements: ["Python/SQL/Excel 중 하나 이상의 데이터 처리", "통계 기초와 시각화 이해", "MES, ERP, 설비 로그 데이터 구조 이해", "분석 결과를 현장 언어로 설명"],
      preferred: ["BI 도구 또는 자동 리포트 경험", "이상탐지·예측모델 기초", "공정 조건과 품질 지표를 함께 해석하는 역량"]
    },
    {
      id: "production-technology-engineer",
      title: "생산기술·라인개선 엔지니어",
      postingKeywords: ["생산기술", "라인셋업", "Takt time", "설비개선", "자동화"],
      industries: ["manufacturing", "mobility", "electronics", "all"],
      focus: "생산 라인의 takt time, 설비 배치, 작업 조건, 자동화 개선으로 생산성을 높이는 직무",
      responsibilities: ["신규 라인 셋업과 생산 조건 안정화", "공정 병목과 takt time 분석", "설비·치구·작업 방법 개선", "생산성, 불량률, 정지시간 개선 효과 검증"],
      requirements: ["공정 흐름과 설비 구성 이해", "작업 시간과 라인 밸런싱 기초", "Excel 기반 생산 지표 분석", "현장 개선안을 표준작업으로 정리"],
      preferred: ["자동화 설비 또는 PLC 기초", "Lean, 5S, Kaizen 이해", "치구 개선이나 설비 투자 효과 산정"]
    },
    {
      id: "supplier-quality-engineer",
      title: "협력사품질(SQE) 엔지니어",
      postingKeywords: ["협력사품질", "SQE", "PPAP", "Audit", "8D"],
      industries: ["manufacturing", "mobility", "electronics", "all"],
      focus: "협력사 공정과 부품 품질을 평가하고 부적합 재발 방지를 관리하는 직무",
      responsibilities: ["협력사 품질 이슈와 8D 개선 추적", "수입검사·공정감사·품질회의 운영", "PPAP/APQP 또는 승인 자료 검토", "부품 변경과 공급 리스크 관리"],
      requirements: ["도면·검사성적서·규격 해석", "FMEA, Control Plan, 8D 이해", "협력사 공정 흐름과 검사 기준 확인", "품질 이슈를 일정과 책임자로 관리"],
      preferred: ["IATF 16949와 고객 품질 대응", "공급망 리스크 평가", "영문 품질 문서 커뮤니케이션"]
    }
  ],
  "semiconductor-equipment": [
    {
      id: "semiconductor-process-engineer",
      title: "반도체 공정 엔지니어",
      postingKeywords: ["공정개선", "수율", "계측", "Recipe", "조건변경"],
      industries: ["semiconductor", "all"],
      focus: "단위 공정 Recipe와 계측 결과를 연결해 수율, 균일도, 결함 문제를 개선하는 직무",
      responsibilities: ["노광·식각·증착·CMP 등 단위 공정 조건 관리", "계측 지표와 공정 결과 분석", "Recipe 변경 실험과 DOE 수행", "OCAP, FMEA, Control Plan 같은 표준 문서 관리"],
      requirements: ["반도체 공정 흐름과 소자 기초", "계측 지표 두께, CD, overlay, defect 이해", "통계·SPC 기반 조건 변경 판단", "클린룸 안전과 공정 리스크 인식"],
      preferred: ["수율 개선 프로젝트 경험", "Python/SQL 기반 데이터 분석", "공정 이상 발생 시 8D 또는 원인분석 보고"]
    },
    {
      id: "semiconductor-equipment-engineer",
      title: "반도체 장비 엔지니어",
      postingKeywords: ["장비조건", "진공", "플라즈마", "Troubleshooting", "PM"],
      industries: ["semiconductor", "all"],
      focus: "진공, RF, 가스, 온도, 로봇 이송 등 장비 상태를 해석해 가동률과 공정 안정성을 높이는 직무",
      responsibilities: ["장비 설치, 유지보수, PM 계획 수행", "알람·로그·센서값 기반 Troubleshooting", "진공·플라즈마·가스·온도 조건 점검", "공정·품질 부서와 장비 이슈 재발 방지"],
      requirements: ["기계·전기·제어 기초와 도면 해석", "진공, RF power, MFC, valve, pump 역할 이해", "장비 로그와 계측값 비교", "안전 절차와 변경 이력 관리"],
      preferred: ["PLC, 센서, 통신 인터페이스 이해", "장비 가동률·MTBF·MTTR 지표 활용", "부품 교체 후 성능 검증 계획 수립"]
    },
    {
      id: "semiconductor-yield-engineer",
      title: "수율·결함 분석 담당",
      postingKeywords: ["Defect", "Yield", "Pareto", "Wafer map", "수율분석"],
      industries: ["semiconductor", "all"],
      focus: "Wafer map, defect, 계측, 공정 이력을 결합해 수율 저하 원인과 개선 우선순위를 찾는 직무",
      responsibilities: ["수율·결함 데이터 집계와 Pareto 분석", "Wafer map과 공정 이력 기반 원인 후보 도출", "계측·검사 결과와 공정 조건의 상관 분석", "개선 실험 결과 추적과 리포트"],
      requirements: ["통계, 데이터 전처리, 시각화 기초", "결함 분류와 계측 데이터 이해", "공정 흐름과 장비 조건의 상호 영향 이해", "분석 가설을 실험 계획으로 전환"],
      preferred: ["Python/SQL/BI 활용", "SPC, DOE, 이상탐지 기초", "공정·장비·품질 부서와 원인 검증 협업"]
    },
    {
      id: "etch-process-engineer",
      title: "반도체 식각 공정 엔지니어",
      postingKeywords: ["Etch", "식각", "Plasma", "RF power", "Selectivity"],
      industries: ["semiconductor", "all"],
      focus: "플라즈마 식각 recipe와 계측 결과를 연결해 CD, uniformity, residue 문제를 개선하는 직무",
      responsibilities: ["식각 recipe 조건 관리", "식각률, 선택비, 균일도, CD 결과 분석", "RF power, pressure, gas flow 조건 변경 실험", "잔류물·과식각·언더컷 원인 분석"],
      requirements: ["플라즈마와 진공 기초", "식각 공정 지표와 계측 이해", "DOE/SPC 기반 조건 변경 판단", "공정 변경 리스크 문서화"],
      preferred: ["장비 로그와 공정 결과 상관 분석", "OCAP/8D 보고", "Python 기반 데이터 정리"]
    },
    {
      id: "metrology-engineer",
      title: "반도체 계측·검사 엔지니어",
      postingKeywords: ["Metrology", "Inspection", "CD", "Defect", "계측"],
      industries: ["semiconductor", "all"],
      focus: "CD, 두께, overlay, defect 계측 결과의 신뢰성을 관리하고 공정 개선 판단 기준을 제공하는 직무",
      responsibilities: ["계측 recipe와 검사 조건 관리", "측정 반복성·재현성 확인", "계측 데이터 이상치와 trend 분석", "공정·수율 팀에 판단 가능한 리포트 제공"],
      requirements: ["반도체 계측 지표 이해", "측정 오차와 샘플링 기준 이해", "SPC와 trend chart 해석", "공정 이력과 계측 결과 연결"],
      preferred: ["MSA 또는 gauge R&R 기초", "Defect review 흐름 이해", "SQL/Python 기반 계측 데이터 처리"]
    }
  ],
  "electronics-pcb": [
    {
      id: "hardware-design-engineer",
      title: "하드웨어 설계 엔지니어",
      postingKeywords: ["회로설계", "부품선정", "전원", "PCB", "검증"],
      industries: ["electronics", "mobility", "robotics", "all"],
      focus: "아날로그·디지털·전원 회로 요구사항을 정의하고 부품 선정, PCB 검토, 측정 검증까지 연결하는 직무",
      responsibilities: ["회로 블록도와 schematic 설계", "전원, 센서, 통신, MCU 주변 회로 구성", "데이터시트 기반 부품 선정과 BOM 작성", "PCB 리뷰와 시제품 bring-up"],
      requirements: ["회로이론과 전자회로 기초", "전원 리플, 발열, 신호 무결성 이해", "오실로스코프, 멀티미터 등 계측기 사용", "측정 결과를 요구사항과 비교"],
      preferred: ["EMC/EMI와 ESD 고려", "SPICE 시뮬레이션", "Python/MATLAB 기반 측정 데이터 정리"]
    },
    {
      id: "pcb-design-engineer",
      title: "PCB 설계·검토 엔지니어",
      postingKeywords: ["PCB Layout", "Stack-up", "리턴패스", "EMC", "디커플링"],
      industries: ["electronics", "mobility", "robotics", "all"],
      focus: "PCB 배치, 배선, 그라운드, 전원 루프, EMC 조건을 검토해 회로가 안정적으로 동작하게 만드는 직무",
      responsibilities: ["PCB stack-up과 설계 제약 정의", "전원·고속·민감 신호 배치와 배선 검토", "리턴패스, 디커플링, 그라운드 분리 기준 적용", "DFM/DFT와 제조 파일 검토"],
      requirements: ["PCB CAD와 회로도-레이아웃 연계 이해", "임피던스, 전류 용량, 클리어런스 기초", "EMC/EMI와 전원 무결성 기본 원리", "리뷰 체크리스트 작성"],
      preferred: ["고속 인터페이스 또는 RF/아날로그 레이아웃", "제조사 DFM 피드백 반영", "측정 포인트와 테스트 편의성 설계"]
    },
    {
      id: "validation-engineer",
      title: "하드웨어 검증 엔지니어",
      postingKeywords: ["오실로스코프", "검증", "Test Plan", "Pass/Fail", "리포트"],
      industries: ["electronics", "mobility", "all"],
      focus: "테스트 계획과 측정 조건을 세워 하드웨어 요구사항 충족 여부를 재현 가능하게 판단하는 직무",
      responsibilities: ["검증 항목과 Pass/Fail 기준 정의", "오실로스코프, 로직애널라이저, 전원공급기 설정", "Bring-up, 기능 검증, 신뢰성 시험 지원", "불합격 원인 가설과 리포트 작성"],
      requirements: ["회로도와 요구사항 해석", "계측기 설정과 프로브 영향 이해", "테스트 로그와 측정값 정리", "이슈 재현 절차와 변경 이력 관리"],
      preferred: ["자동화 스크립트 Python/LabVIEW", "규격 시험 또는 환경 시험 이해", "개발·품질·생산 부서 이슈 트래킹"]
    },
    {
      id: "power-hardware-engineer",
      title: "전원회로 설계 엔지니어",
      postingKeywords: ["Power", "Buck", "LDO", "Ripple", "Thermal"],
      industries: ["electronics", "mobility", "robotics", "all"],
      focus: "전원 요구사항, 효율, 리플, 발열 조건을 만족하는 전원 회로를 설계하고 검증하는 직무",
      responsibilities: ["전원 tree와 부하 전류 산정", "LDO, buck, boost 등 전원 IC 선정", "리플, 효율, 발열 측정", "보호회로와 안정성 검토"],
      requirements: ["전력전자와 전원회로 기초", "데이터시트 기반 인덕터·커패시터 선정", "오실로스코프 전원 노이즈 측정", "열저항과 발열 계산"],
      preferred: ["EMI 필터와 layout 고려", "부하 transient 검증", "SPICE 또는 계산 시트 활용"]
    },
    {
      id: "emc-test-engineer",
      title: "EMC·신뢰성 검증 엔지니어",
      postingKeywords: ["EMC", "EMI", "ESD", "신뢰성시험", "인증"],
      industries: ["electronics", "mobility", "all"],
      focus: "EMC/EMI, ESD, 환경 시험 조건을 기준으로 하드웨어 신뢰성과 인증 리스크를 검증하는 직무",
      responsibilities: ["EMC/ESD 시험 계획과 사전 점검", "노이즈 원인 후보와 개선안 정리", "환경·신뢰성 시험 결과 관리", "인증 시험 부적합 대응 리포트 작성"],
      requirements: ["접지, 차폐, 필터, 케이블 영향 이해", "시험 규격과 Pass/Fail 기준 해석", "측정 조건과 재현 절차 문서화", "회로·PCB 개선 포인트 도출"],
      preferred: ["KC/CE/FCC 또는 자동차 EMC 기초", "시험소 대응 경험", "노이즈 측정 장비 활용"]
    }
  ],
  "embedded-control": [
    {
      id: "embedded-firmware-engineer",
      title: "임베디드 펌웨어 엔지니어",
      postingKeywords: ["C/C++", "MCU", "UART", "SPI/I2C", "Interrupt"],
      industries: ["electronics", "mobility", "robotics", "all"],
      focus: "MCU 주변장치, 통신 인터페이스, 인터럽트, 디버깅을 통해 장치 기능을 안정적으로 구현하는 직무",
      responsibilities: ["C/C++ 기반 MCU 펌웨어 개발", "GPIO, Timer, ADC, PWM, UART/SPI/I2C/CAN 제어", "인터럽트와 실시간 타이밍 이슈 대응", "디버거, 로그, 계측기로 문제 재현과 수정"],
      requirements: ["C언어, 포인터, 비트 연산, 메모리 구조 이해", "ARM Cortex-M 등 MCU 구조 기초", "통신 프로토콜과 오류 처리", "Git과 빌드·테스트 절차 이해"],
      preferred: ["RTOS, bootloader, OTA 경험", "하드웨어 회로도 해석", "Logic Analyzer와 오실로스코프 기반 디버깅"]
    },
    {
      id: "control-engineer",
      title: "제어 알고리즘 엔지니어",
      postingKeywords: ["PID", "MPC", "센서융합", "MATLAB", "Validation"],
      industries: ["mobility", "robotics", "all"],
      focus: "센서 데이터와 시스템 모델을 바탕으로 제어 알고리즘을 설계, 시뮬레이션, 검증하는 직무",
      responsibilities: ["PID, 상태공간, MPC 등 제어 알고리즘 설계", "센서 데이터 필터링과 추정 로직 구성", "MATLAB/Simulink 또는 Python 시뮬레이션", "SIL/HIL 또는 실험 데이터로 성능 검증"],
      requirements: ["제어공학과 신호처리 기초", "오버슈트, 정착시간, 안정성 지표 해석", "센서 노이즈와 샘플링 주기 이해", "모델과 실제 응답 차이를 설명"],
      preferred: ["모터·로봇·차량 제어 경험", "Kalman filter 또는 sensor fusion", "테스트 시나리오와 검증 리포트 작성"]
    },
    {
      id: "robotics-software-engineer",
      title: "로봇 소프트웨어 엔지니어",
      postingKeywords: ["ROS", "ROS2", "센서", "Navigation", "디버깅"],
      industries: ["robotics", "all"],
      focus: "ROS 기반 노드, 센서, 제어, 통신을 통합해 로봇 동작을 구현하고 현장 문제를 디버깅하는 직무",
      responsibilities: ["ROS/ROS2 노드, 토픽, 서비스 구성", "센서 데이터 수집과 좌표계·시간 동기화", "Navigation, perception, 제어 모듈 연동", "Linux 환경 로그 분석과 통합 디버깅"],
      requirements: ["C++/Python과 Linux 개발환경", "ROS 메시지 구조와 launch/config 이해", "센서 캘리브레이션과 데이터 흐름 파악", "Git 기반 협업과 재현 가능한 실행 문서"],
      preferred: ["SLAM, path planning, vision 기초", "Gazebo/RViz 시뮬레이션", "현장 테스트 로그 기반 문제 분리"]
    },
    {
      id: "embedded-linux-engineer",
      title: "임베디드 리눅스 엔지니어",
      postingKeywords: ["Embedded Linux", "Device Driver", "Kernel", "Yocto", "BSP"],
      industries: ["electronics", "mobility", "robotics", "all"],
      focus: "리눅스 기반 보드에서 BSP, 디바이스 드라이버, 부팅, 주변장치 연동을 안정화하는 직무",
      responsibilities: ["BSP 포팅과 부팅 이슈 분석", "I2C, SPI, UART, GPIO 디바이스 연동", "커널 로그와 드라이버 문제 디버깅", "빌드 환경과 배포 이미지 관리"],
      requirements: ["Linux, C, shell 기초", "device tree와 kernel log 이해", "하드웨어 회로도와 인터페이스 신호 해석", "Git과 빌드 시스템 사용"],
      preferred: ["Yocto/Buildroot 경험", "부트로더와 파일시스템 이해", "장기 로그 기반 안정성 이슈 분석"]
    },
    {
      id: "motor-control-engineer",
      title: "모터제어 펌웨어 엔지니어",
      postingKeywords: ["Motor Control", "PWM", "Encoder", "FOC", "PID"],
      industries: ["mobility", "robotics", "electronics", "all"],
      focus: "모터, 인버터, 센서 피드백을 제어해 속도·위치·토크 응답을 안정화하는 직무",
      responsibilities: ["PWM, encoder, current sensing 기반 제어 구현", "속도·위치 PID 또는 FOC 제어 튜닝", "보호 로직과 fault 처리", "실험 데이터로 응답 성능 검증"],
      requirements: ["전기기기와 제어공학 기초", "MCU timer, ADC, interrupt 이해", "오버슈트, 정착시간, ripple 해석", "계측기로 PWM·전류·응답 측정"],
      preferred: ["BLDC/PMSM 제어 경험", "MATLAB/Simulink 모델 기반 검증", "안전 정지와 오류 복구 설계"]
    }
  ]
};

jobRoles["automotive-mobility"] = [
  {
    id: "vehicle-body-design-engineer",
    title: "차체·BIW 설계 엔지니어",
    postingKeywords: ["BIW", "차체설계", "패키지", "충돌안전", "경량화"],
    industries: ["mobility", "all"],
    focus: "차량 패키지, 차체 구조, 체결점, 충돌 안전, 제조성을 함께 고려해 BIW와 외장·내장 장착 구조를 설계하는 직무",
    responsibilities: ["차량 패키지와 주변 부품 간 간섭 검토", "BIW, 브라켓, 마운팅 포인트, 체결 구조 설계", "강성, 중량, 충돌 안전, NVH 요구사항을 설계 조건으로 변환", "프레스, 용접, 조립 공정성을 고려한 도면·공차 검토"],
    requirements: ["기계공학, 재료역학, 기계요소설계 기초", "CATIA/Creo 기반 3D CAD와 2D 도면 해석", "차체 구조, 하중 경로, 체결 방식 이해", "설계 변경 사유를 시험 결과와 제조 조건으로 설명"],
    preferred: ["자동차 패키지 레이아웃 또는 BIW 프로젝트 경험", "GD&T, 공차 누적, DFM/DFA 이해", "충돌·강성·NVH 해석 결과를 설계 변경으로 연결"]
  },
  {
    id: "chassis-suspension-engineer",
    title: "섀시·현가·제동 엔지니어",
    postingKeywords: ["섀시", "현가", "조향", "제동", "차량동역학"],
    industries: ["mobility", "all"],
    focus: "조향, 제동, 현가, 타이어 접지 조건을 차량동역학 관점에서 해석하고 승차감·조종안정성·내구 요구를 맞추는 직무",
    responsibilities: ["현가 링크, 너클, 서브프레임, 부싱 등 섀시 부품 요구사항 정의", "조향 응답, 제동 안정성, 승차감 지표 검토", "내구 시험 조건과 하중 케이스를 설계 기준으로 변환", "실차 시험 데이터와 해석 결과를 비교해 개선안 도출"],
    requirements: ["동역학, 재료역학, 진동 기초", "차량동역학 지표와 섀시 구조 이해", "시험 조건, 하중, 변위, 진동 데이터를 해석", "설계 변경안을 성능·내구·제조성 관점으로 설명"],
    preferred: ["ADAMS/Car, Simulink, CAE 후처리 경험", "실차 주행시험 또는 내구 시험 데이터 분석", "제동·조향·현가 부품 개발 프로세스 이해"]
  },
  {
    id: "powertrain-mechanical-engineer",
    title: "파워트레인·구동계 기계 엔지니어",
    postingKeywords: ["파워트레인", "구동계", "감속기", "NVH", "내구"],
    industries: ["mobility", "all"],
    focus: "엔진·모터·감속기·드라이브샤프트 같은 구동계 부품의 토크 전달, 내구, 소음진동, 윤활 조건을 설계·검증하는 직무",
    responsibilities: ["토크, 회전수, 기어비, 베어링 하중 조건 정의", "감속기, 하우징, 샤프트, 마운트 구조 설계 검토", "NVH, 열, 윤활, 내구 시험 결과를 설계 변경과 연결", "협력사 부품 사양과 조립 품질 이슈 추적"],
    requirements: ["기계요소, 동역학, 진동, 열전달 기초", "구동계 부품 구조와 토크 전달 경로 이해", "시험 데이터와 파손 모드를 원인 가설로 정리", "도면, 공차, 재료, 표면처리 조건 해석"],
    preferred: ["전동화 구동계 또는 감속기 프로젝트 경험", "NVH 분석, 내구 시험, 윤활 조건 검토", "양산 이슈를 설계 변경 요구사항으로 정리"]
  },
  {
    id: "vehicle-thermal-management-engineer",
    title: "차량 열관리·냉각 시스템 엔지니어",
    postingKeywords: ["열관리", "냉각회로", "HVAC", "배터리온도", "CFD"],
    industries: ["mobility", "battery", "all"],
    focus: "배터리, 인버터, 모터, HVAC, 냉각수 회로의 열 부하와 온도 조건을 모델링해 성능과 신뢰성을 검증하는 직무",
    responsibilities: ["열원, 냉각 경로, 유량, 압력손실, 목표 온도 정의", "배터리·전력전자·모터 냉각 시스템 요구사항 검토", "CFD 또는 1D thermal 모델과 실차 온도 데이터를 비교", "고온·저온·급속충전 조건의 리스크와 개선안 정리"],
    requirements: ["열전달, 유체역학, 열역학 기초", "냉각수 회로, 라디에이터, 펌프, 팬, HVAC 구성 이해", "온도 센서 데이터와 해석 결과 비교", "경계조건과 물성값 설정 근거 문서화"],
    preferred: ["배터리 열관리, 전력전자 냉각, HVAC 프로젝트 경험", "CFD/Simscape/GT-SUITE 등 열 모델링 경험", "실차 환경시험 데이터 후처리"]
  },
  {
    id: "ev-battery-pack-engineer",
    title: "EV 배터리팩 설계·검증 엔지니어",
    postingKeywords: ["배터리팩", "BMS", "열폭주", "절연", "안전"],
    industries: ["mobility", "battery", "all"],
    focus: "셀·모듈·팩 구조, BMS 인터페이스, 냉각, 절연, 안전 요구사항을 통합해 전기차 배터리팩을 설계·검증하는 직무",
    responsibilities: ["셀 배치, 모듈 구조, 팩 하우징, 냉각 구조 요구사항 정의", "BMS, 전류 센서, 온도 센서, HV 인터페이스 연동 검토", "절연, 충돌, 진동, 열폭주, 방수 시험 조건 정리", "시험 결과와 고장 모드를 설계 변경안으로 문서화"],
    requirements: ["기계 구조와 전기 안전 기본 이해", "배터리 셀 특성, 팩 구조, 냉각 방식 이해", "HV 안전, 절연, 접지, 인터락 요구사항 파악", "시험 계획서와 검증 리포트 작성"],
    preferred: ["배터리팩 구조 설계 또는 BMS 연동 프로젝트", "UN R100, ISO 26262, 열폭주 안전 개념 이해", "CAN 데이터와 온도·전압 로그 분석"]
  },
  {
    id: "vehicle-ee-architecture-engineer",
    title: "차량 전장 E/E 아키텍처 엔지니어",
    postingKeywords: ["E/E Architecture", "ECU", "CAN", "LIN", "Ethernet"],
    industries: ["mobility", "electronics", "all"],
    focus: "차량 기능을 ECU, 센서, 액추에이터, 전원, 통신 네트워크로 나누고 E/E 아키텍처와 인터페이스를 정의하는 직무",
    responsibilities: ["기능 요구사항을 ECU, 센서, 액추에이터, 네트워크 신호로 분해", "CAN/LIN/Ethernet 메시지와 전원·접지 인터페이스 검토", "와이어링, 퓨즈, 릴레이, 커넥터, 진단 요구사항 정리", "시스템 변경이 다른 제어기와 기능에 미치는 영향 분석"],
    requirements: ["회로이론, 전자회로, 차량 네트워크 기초", "ECU, 센서, 액추에이터, 전원 분배 구조 이해", "CAN DBC, 신호 정의, 진단 코드 기본 이해", "시스템 요구사항과 인터페이스 문서화"],
    preferred: ["AUTOSAR, UDS, CANoe/CANalyzer 사용 경험", "와이어링 하네스 또는 전장품 검증 경험", "기능안전 ISO 26262 기본 개념"]
  },
  {
    id: "automotive-embedded-sw-engineer",
    title: "차량 임베디드 SW·ECU 엔지니어",
    postingKeywords: ["ECU", "AUTOSAR", "C/C++", "CAN", "진단"],
    industries: ["mobility", "electronics", "all"],
    focus: "ECU 펌웨어에서 센서 입력, 제어 로직, CAN 통신, 진단, 오류 처리를 구현하고 실차·벤치에서 디버깅하는 직무",
    responsibilities: ["C/C++ 기반 ECU 소프트웨어 기능 구현", "CAN 신호 송수신, 진단 서비스, fault handling 개발", "센서 입력, 상태머신, 제어 출력 로직 검증", "벤치·실차 로그로 재현 조건을 찾고 수정 내역 문서화"],
    requirements: ["C언어, 자료구조, MCU, 인터럽트 기본 이해", "CAN 통신, DBC, UDS 진단 기초", "컴파일, 디버깅, Git 기반 변경 이력 관리", "테스트 케이스와 로그 분석으로 문제 원인 분리"],
    preferred: ["AUTOSAR Classic/Adaptive 또는 RTOS 경험", "CANoe, CANalyzer, Lauterbach, Vector 도구 경험", "기능안전 요구사항과 SW 검증 프로세스 이해"]
  },
  {
    id: "hil-sil-validation-engineer",
    title: "HIL·SIL 검증 엔지니어",
    postingKeywords: ["HIL", "SIL", "Test Case", "CANoe", "요구사항검증"],
    industries: ["mobility", "electronics", "all"],
    focus: "제어기 요구사항을 테스트 케이스로 바꾸고 SIL/HIL 환경에서 CAN 신호, fault injection, Pass/Fail 결과를 검증하는 직무",
    responsibilities: ["요구사항 기반 테스트 케이스와 판정 기준 작성", "HIL 장비, I/O, CAN/LIN 신호, 시뮬레이션 모델 설정", "정상·고장·경계 조건 테스트 수행", "실패 로그를 분석해 SW, 모델, 장비 원인을 분리"],
    requirements: ["제어기 입출력과 차량 네트워크 기본 이해", "테스트 설계, 요구사항 추적성, Pass/Fail 기준 작성", "MATLAB/Simulink 또는 Python 기반 결과 분석", "로그, 파형, CAN 메시지를 근거로 리포트 작성"],
    preferred: ["dSPACE, NI, Vector CANoe/CAPL 경험", "SIL/MIL/HIL 검증 프로세스 이해", "자동화 테스트 스크립트 작성 경험"]
  },
  {
    id: "adas-validation-engineer",
    title: "ADAS·자율주행 검증 엔지니어",
    postingKeywords: ["ADAS", "센서융합", "시나리오", "인지", "실차검증"],
    industries: ["mobility", "electronics", "all"],
    focus: "카메라, 레이더, 라이다, GPS/IMU 데이터를 기반으로 ADAS 기능의 시나리오, 인지·판단 성능, 실차 검증 결과를 평가하는 직무",
    responsibilities: ["AEB, LKA, ACC, BSD 등 ADAS 기능 요구사항 분석", "센서 데이터, 객체 인식 결과, 차량 CAN 로그 동기화", "시나리오별 Pass/Fail 기준과 안전 조건 정의", "실차·시뮬레이션 결과를 비교해 개선 포인트 도출"],
    requirements: ["센서, 신호처리, 통계, 차량 네트워크 기초", "주행 시나리오와 평가 지표를 이해하고 설명", "로그 데이터 정리와 시각화", "기능 실패 조건을 재현 가능한 테스트로 정리"],
    preferred: ["ROS, Python, MATLAB, CarMaker, PreScan 경험", "카메라·레이다·라이다 데이터 처리 경험", "ISO 26262 또는 SOTIF 기본 개념"]
  },
  {
    id: "ev-power-electronics-engineer",
    title: "EV 전력전자·인버터 엔지니어",
    postingKeywords: ["인버터", "OBC", "DC-DC", "전력전자", "게이트드라이브"],
    industries: ["mobility", "electronics", "battery", "all"],
    focus: "인버터, OBC, DC-DC 컨버터, 게이트 드라이브, 전류 센싱, 열 설계를 검토하고 효율·EMI·안전 조건을 검증하는 직무",
    responsibilities: ["전압·전류·전력·효율 요구사항 정의", "스위칭 소자, 게이트 드라이버, 센싱 회로, 보호 회로 검토", "리플, 손실, 발열, EMI 측정 결과 분석", "모터·배터리·제어기 인터페이스와 안전 요구사항 검토"],
    requirements: ["전력전자, 회로이론, 전자회로 기초", "MOSFET/IGBT/SiC 소자와 스위칭 동작 이해", "오실로스코프, 전류 프로브, 전력분석기 계측", "열·EMI·보호 로직을 검증 리포트로 정리"],
    preferred: ["SPICE/PLECS/Simulink 기반 전력전자 모델링", "자동차 EMC, HV 안전, 절연 요구사항 이해", "인버터 또는 전원회로 Bring-up 경험"]
  },
  {
    id: "vehicle-test-validation-engineer",
    title: "실차 시험·차량 검증 엔지니어",
    postingKeywords: ["실차시험", "DVP&R", "내구", "환경시험", "계측"],
    industries: ["mobility", "all"],
    focus: "차량 요구사항을 DVP&R, 시험 조건, 계측 채널, 판정 기준으로 바꾸고 실차·벤치 시험 결과를 검증하는 직무",
    responsibilities: ["DVP&R 기반 시험 항목, 조건, 일정, 판정 기준 정의", "온도, 진동, 전류, CAN, 위치 등 계측 채널 구성", "내구, 환경, 기능, 신뢰성 시험 결과 정리", "불합격 항목의 원인 가설과 재시험 조건 수립"],
    requirements: ["시험계획서와 요구사항 추적성 이해", "센서, 데이터 로거, CAN 계측 기본 사용", "시험 결과를 그래프와 표로 정리", "Pass/Fail 기준과 개선 요청을 명확히 문서화"],
    preferred: ["실차 주행시험, 환경챔버, NVH, 내구 시험 경험", "Python/MATLAB 데이터 후처리", "개발·품질·생산 부서와 이슈 트래킹 경험"]
  }
];

const roleDiagnostics = {
  "mechanical-design-engineer": [["3D CAD", "부품의 기능 요구사항을 기준으로 3D 모델의 기준면과 주요 치수를 잡을 수 있다."], ["도면·공차", "2D 도면에 기준 치수, 공차, 재질, 표면처리 정보를 빠뜨리지 않고 표시할 수 있다."], ["조립성", "간섭, 체결, 분해 방향, 작업 공간을 고려해 설계 리스크를 설명할 수 있다."], ["제조공정", "가공, 사출, 판금 중 어떤 공정이 적합한지 설계 형상과 연결해 판단할 수 있다."], ["설계변경", "시제품 문제를 치수·재료·공차 변경안으로 정리하고 변경 근거를 쓸 수 있다."]],
  "cae-analysis-engineer": [["해석 목적", "구조·열·진동 중 어떤 해석이 필요한지 실패 모드 기준으로 고를 수 있다."], ["경계조건", "하중, 구속, 접촉, 재료 물성이 결과에 미치는 영향을 설명할 수 있다."], ["메시·수렴", "메시 크기나 요소 품질 변화가 결과 신뢰도에 미치는 영향을 비교할 수 있다."], ["상관검증", "손계산 또는 시험 조건으로 해석 결과를 검증할 계획을 세울 수 있다."], ["해석리포트", "해석 결과를 설계 변경 우선순위와 안전율 판단으로 연결해 문서화할 수 있다."]],
  "manufacturing-design-engineer": [["DFM/DFA", "가공, 조립, 검사 관점에서 설계안의 제조 리스크를 찾을 수 있다."], ["공차누적", "부품 공차가 조립 성능과 불량 가능성에 미치는 영향을 설명할 수 있다."], ["시제품", "시제품 제작 이슈를 설계 변경 요구사항으로 바꿔 정리할 수 있다."], ["양산이관", "양산 전 확인해야 할 금형, 공정, 검사 조건을 체크리스트로 만들 수 있다."], ["원가·품질 균형", "설계 변경이 원가, 품질, 납기에 미치는 영향을 비교할 수 있다."]],
  "process-engineer": [["공정변수", "온도, 압력, 속도, 설비 조건 중 품질에 영향을 줄 변수를 고를 수 있다."], ["CTQ", "제품 요구사항을 측정 가능한 CTQ와 공정 관리 항목으로 바꿀 수 있다."], ["DOE/SPC", "조건 변경 전후 비교를 위한 실험 계획과 관리 기준을 정할 수 있다."], ["설비이상", "설비 알람, 로그, 품질 데이터를 연결해 원인 후보를 좁힐 수 있다."], ["표준화", "개선 후 작업 조건표나 표준작업서에 반영할 항목을 정리할 수 있다."]],
  "quality-engineer": [["SPC", "관리도와 Cpk를 기준으로 공정이 안정적인지 판정할 수 있다."], ["FMEA", "고장 모드, 영향, 원인, 검출 방법, 개선안을 표로 정리할 수 있다."], ["8D", "고객 불량 또는 내부 불량을 8D 구조로 정리할 수 있다."], ["품질시스템", "ISO 9001 또는 IATF 16949에서 문서·기록 관리가 왜 필요한지 설명할 수 있다."], ["검사기준", "도면·규격·검사성적서를 보고 Pass/Fail 기준을 정의할 수 있다."]],
  "production-data-engineer": [["데이터 전처리", "공정 로그에서 결측, 이상치, 기준 시간 단위를 정리할 수 있다."], ["MES/SQL", "MES나 검사 데이터에서 lot, 설비, 시간, 불량 유형을 키로 묶을 수 있다."], ["Pareto", "불량 유형별 우선순위를 차트로 설명할 수 있다."], ["추세·상관", "공정 조건 변화와 품질 지표 변화의 관계를 그래프로 확인할 수 있다."], ["대시보드", "현장 담당자가 바로 볼 수 있는 지표와 해석 문장을 함께 제시할 수 있다."]],
  "semiconductor-process-engineer": [["공정조건", "조건 변경의 목적, 기대 효과, 리스크를 검토표로 쓸 수 있다."], ["Recipe", "압력, RF power, 가스, 온도 같은 recipe 항목을 결과 지표와 연결할 수 있다."], ["계측지표", "두께, CD, overlay, defect, 수율 지표를 공정 결과와 연결할 수 있다."], ["SPC/OCAP", "관리 이탈이 발생했을 때 확인 순서와 조치 기준을 설명할 수 있다."], ["DOE", "공정 조건 변경 실험에서 고정할 변수와 바꿀 변수를 구분할 수 있다."]],
  "semiconductor-equipment-engineer": [["장비변수", "진공, RF power, 가스 유량이 장비 상태와 결과 지표에 미치는 영향을 설명할 수 있다."], ["Troubleshooting", "장비 이상 징후를 로그, 알람, 계측값으로 좁힐 수 있다."], ["PM", "예방보전 항목과 장비 가동률 지표 MTBF/MTTR의 의미를 설명할 수 있다."], ["전기·제어", "센서, 밸브, 펌프, 모터 같은 장비 구성요소의 역할을 구분할 수 있다."], ["검증", "부품 교체나 조건 변경 후 확인해야 할 성능 검증 항목을 정할 수 있다."]],
  "semiconductor-yield-engineer": [["수율분석", "결함 분포와 수율 변화를 기준으로 개선 가설을 세울 수 있다."], ["Wafer map", "웨이퍼 위치별 결함 패턴을 보고 공정·장비 원인 후보를 말할 수 있다."], ["결함분류", "상위 결함 유형을 Pareto로 고르고 확인 실험을 제안할 수 있다."], ["데이터조인", "검사 결과, 계측값, 공정 이력을 lot 또는 wafer 기준으로 연결할 수 있다."], ["개선추적", "개선 전후 수율, 결함률, 재발 여부를 같은 기준으로 비교할 수 있다."]],
  "hardware-design-engineer": [["전원요구사항", "전압, 전류, 리플, 발열 조건을 수치로 정의할 수 있다."], ["부품선정", "데이터시트 항목을 근거로 부품 선택 이유를 설명할 수 있다."], ["회로블록", "센서, MCU, 전원, 통신 블록 간 신호 흐름을 그릴 수 있다."], ["PCB리뷰", "전원 루프, 그라운드, 민감 신호 배선을 리뷰 항목으로 만들 수 있다."], ["Bring-up", "시제품 전원 인가 전후 확인 순서와 실패 시 확인 항목을 정리할 수 있다."]],
  "pcb-design-engineer": [["Stack-up", "층 구성, 임피던스, 전류 용량이 PCB 제약에 미치는 영향을 설명할 수 있다."], ["리턴패스", "전류 루프와 리턴패스가 노이즈에 미치는 영향을 설명할 수 있다."], ["디커플링", "디커플링 위치와 값 선정 기준을 체크리스트로 만들 수 있다."], ["EMC", "배치, 접지, 케이블, 커넥터가 EMI/EMC 리스크에 미치는 영향을 설명할 수 있다."], ["DFM/DFT", "제조와 테스트 편의성을 위해 패드, 간격, 측정 포인트를 검토할 수 있다."]],
  "validation-engineer": [["측정계획", "프로브 위치, 장비 설정, Pass/Fail 기준을 재현 가능하게 적을 수 있다."], ["계측기", "오실로스코프, 로직애널라이저, 전원공급기의 기본 설정값을 목적에 맞게 고를 수 있다."], ["검증리포트", "측정 결과와 요구사항 차이를 원인 가설로 연결할 수 있다."], ["이슈재현", "불합격 현상을 재현 조건, 로그, 변경 이력으로 정리할 수 있다."], ["자동화", "반복 측정이나 로그 정리에 간단한 스크립트가 필요한 상황을 판단할 수 있다."]],
  "embedded-firmware-engineer": [["주변장치", "GPIO, Timer, ADC, PWM, UART를 기능 요구사항에 매핑할 수 있다."], ["C/메모리", "포인터, 비트 연산, volatile, 버퍼 개념을 펌웨어 문제와 연결할 수 있다."], ["인터럽트", "인터럽트 우선순위와 타이밍 리스크를 설명할 수 있다."], ["통신오류", "UART/SPI/I2C/CAN 통신에서 timeout, checksum, framing 오류를 구분할 수 있다."], ["디버깅", "로그, breakpoint, logic analyzer로 문제 원인을 좁히는 절차를 쓸 수 있다."]],
  "control-engineer": [["응답지표", "오버슈트, 정착시간, 정상상태 오차로 제어 성능을 비교할 수 있다."], ["모델링", "입력, 출력, 상태, 외란을 구분해 간단한 시스템 모델을 세울 수 있다."], ["튜닝", "P/I/D 변경이 응답에 미치는 영향을 실험으로 설명할 수 있다."], ["센서융합", "센서 노이즈, 샘플링 주기, 필터링이 제어 성능에 미치는 영향을 설명할 수 있다."], ["검증", "시뮬레이션 결과와 실제 실험 결과 차이를 검증 리포트로 정리할 수 있다."]],
  "robotics-software-engineer": [["ROS", "노드, 토픽, 메시지 구조를 센서 데이터 흐름으로 설명할 수 있다."], ["좌표계", "센서 좌표계, 로봇 기준 좌표계, 시간 동기화가 왜 중요한지 설명할 수 있다."], ["Navigation", "지도, localization, path planning, control이 어떤 순서로 연결되는지 말할 수 있다."], ["통합디버깅", "센서, 제어, 통신 문제를 로그 기준으로 분리할 수 있다."], ["실행문서", "다른 사람이 ROS 패키지를 실행할 수 있도록 launch, config, README를 정리할 수 있다."]],
  "thermal-cfd-engineer": [["열경계조건", "발열량, 대류 조건, 접촉 열저항을 해석 조건으로 정의할 수 있다."], ["CFD모델", "유동 입구·출구 조건과 압력 손실이 결과에 미치는 영향을 설명할 수 있다."], ["냉각설계", "방열판, 팬, 통풍구 중 어떤 개선이 필요한지 온도 결과로 판단할 수 있다."], ["시험상관", "열화상 또는 온도 센서 측정값과 해석 결과를 비교할 수 있다."], ["후처리", "온도 분포와 최대 온도 위치를 설계 변경 근거로 정리할 수 있다."]],
  "mechanical-test-engineer": [["시험계획", "요구사항을 시험 항목, 조건, 판정 기준으로 바꿀 수 있다."], ["계측", "하중, 변위, 진동, 온도 데이터를 어떤 센서로 측정할지 고를 수 있다."], ["파손분석", "파손 위치와 하중 조건을 연결해 원인 후보를 세울 수 있다."], ["신뢰성", "반복 시험, 환경 시험, 내구 시험의 목적 차이를 설명할 수 있다."], ["시험리포트", "시험 조건, 결과, 이상 현상, 개선안을 한 장으로 정리할 수 있다."]],
  "production-technology-engineer": [["Takt time", "공정별 작업시간을 비교해 병목 공정을 찾을 수 있다."], ["라인셋업", "공정 순서, 설비 배치, 작업자 동선을 생산 흐름으로 설명할 수 있다."], ["설비개선", "정지시간과 불량률을 기준으로 설비 개선 우선순위를 정할 수 있다."], ["자동화", "수작업을 자동화할 때 필요한 센서, 치구, 안전 조건을 말할 수 있다."], ["표준작업", "개선 후 작업 조건과 검사 기준을 표준작업서에 반영할 수 있다."]],
  "supplier-quality-engineer": [["협력사평가", "협력사 공정 흐름과 검사 기준을 확인할 체크 항목을 만들 수 있다."], ["PPAP/APQP", "승인 자료에서 도면, 공정흐름도, Control Plan의 관계를 설명할 수 있다."], ["수입검사", "부품 규격과 검사성적서로 수입 품질 판정을 할 수 있다."], ["8D추적", "협력사 개선 대책의 임시조치와 영구조치를 구분할 수 있다."], ["Audit", "품질 감사에서 확인할 기록과 현장 증거를 구분할 수 있다."]],
  "etch-process-engineer": [["식각지표", "식각률, 선택비, 균일도, CD 변화를 결과 지표로 설명할 수 있다."], ["Plasma", "RF power, pressure, gas flow가 플라즈마 식각에 미치는 영향을 말할 수 있다."], ["Recipe변경", "변경할 식각 조건과 고정할 조건을 구분해 DOE 계획을 세울 수 있다."], ["Defect", "residue, over etch, undercut 같은 불량을 공정 조건과 연결할 수 있다."], ["OCAP", "관리 이탈 발생 시 확인 순서와 중단 기준을 정할 수 있다."]],
  "metrology-engineer": [["계측Recipe", "측정 위치, 샘플 수, 반복 측정 조건을 계측 recipe로 정의할 수 있다."], ["측정오차", "반복성, 재현성, 장비 drift가 계측값에 미치는 영향을 설명할 수 있다."], ["Trend", "CD, 두께, defect trend로 공정 이상 징후를 찾을 수 있다."], ["데이터연결", "계측 결과를 lot, wafer, 공정 조건과 연결해 볼 수 있다."], ["리포트", "계측 결과가 공정 변경 또는 수율 판단에 주는 의미를 한 문단으로 쓸 수 있다."]],
  "power-hardware-engineer": [["전원Tree", "입력 전압, 출력 전압, 부하 전류를 전원 tree로 정리할 수 있다."], ["소자선정", "LDO, buck, boost 중 적합한 전원 구조를 효율과 발열 기준으로 고를 수 있다."], ["Ripple측정", "오실로스코프로 리플과 transient를 측정할 조건을 정할 수 있다."], ["발열", "전력 손실과 열저항으로 대략적인 온도 상승을 계산할 수 있다."], ["Layout", "전원 루프와 그라운드 배치가 노이즈에 미치는 영향을 설명할 수 있다."]],
  "emc-test-engineer": [["EMC기초", "전도·방사 노이즈와 ESD 시험의 차이를 설명할 수 있다."], ["노이즈경로", "케이블, 접지, 쉴드, 필터가 노이즈 경로에 미치는 영향을 말할 수 있다."], ["시험계획", "규격, 조건, 판정 기준을 시험 계획으로 정리할 수 있다."], ["부적합대응", "시험 실패 시 원인 후보와 개선 실험을 제안할 수 있다."], ["인증문서", "시험 결과와 변경 이력을 인증 대응 문서로 정리할 수 있다."]],
  "embedded-linux-engineer": [["부팅흐름", "bootloader, kernel, rootfs가 부팅 과정에서 하는 역할을 설명할 수 있다."], ["Device tree", "하드웨어 인터페이스 설정이 device tree에 어떻게 반영되는지 말할 수 있다."], ["Driver", "I2C/SPI/UART/GPIO 드라이버 문제를 로그와 회로도로 좁힐 수 있다."], ["빌드환경", "Yocto나 Buildroot 같은 이미지 빌드 흐름을 설명할 수 있다."], ["시스템로그", "kernel log와 application log를 분리해 원인 후보를 찾을 수 있다."]],
  "motor-control-engineer": [["PWM/ADC", "PWM 주기와 ADC 샘플링 타이밍이 제어 성능에 미치는 영향을 설명할 수 있다."], ["센서피드백", "encoder, hall sensor, current sensor 데이터를 제어 입력으로 해석할 수 있다."], ["PID/FOC", "속도·위치 PID와 FOC의 목적 차이를 설명할 수 있다."], ["Fault처리", "과전류, 과열, 센서 오류 발생 시 보호 로직을 설계할 수 있다."], ["성능검증", "응답 그래프와 전류 파형으로 튜닝 결과를 평가할 수 있다."]],
  "chemical-process-engineer": [["물질수지", "원료 투입량, 생성물, 손실량을 기준으로 공정 수지를 계산할 수 있다."], ["공정변수", "온도, 압력, 유량, 조성이 수율과 순도에 미치는 영향을 설명할 수 있다."], ["분리공정", "증류, 흡수, 추출, 막분리 중 적합한 분리 방식을 고를 수 있다."], ["공정모사", "Aspen/HYSYS 또는 계산표로 조건 변경 효과를 가정할 수 있다."], ["변경관리", "조건 변경의 기대 효과와 안전·품질 리스크를 함께 정리할 수 있다."]],
  "battery-process-engineer": [["전극공정", "믹싱, 코팅, 건조, 캘린더링 조건이 전극 품질에 미치는 영향을 설명할 수 있다."], ["품질지표", "두께, 밀도, 수분, 불량률 같은 지표를 공정 조건과 연결할 수 있다."], ["수율분석", "불량 유형과 공정 이력을 기준으로 개선 우선순위를 정할 수 있다."], ["DOE", "코팅 속도, 건조 온도, 점도 같은 조건 변경 실험을 설계할 수 있다."], ["안전", "용매, 분진, 전해액 취급 리스크와 예방 대책을 말할 수 있다."]],
  "materials-rnd-engineer": [["조성설계", "소재 조성이나 배합 조건을 성능 지표와 연결해 설명할 수 있다."], ["합성조건", "온도, 시간, 농도, 분위기 같은 합성 조건을 실험표로 정리할 수 있다."], ["분석데이터", "XRD, SEM, FTIR, DSC 등 분석 결과가 의미하는 바를 요약할 수 있다."], ["물성평가", "강도, 전도도, 점도, 열특성 같은 물성을 비교할 수 있다."], ["Scale-up", "lab 조건을 양산 조건으로 옮길 때 생길 리스크를 말할 수 있다."]],
  "process-safety-engineer": [["MSDS", "화학물질 위험성과 보호구, 저장 조건을 MSDS에서 찾을 수 있다."], ["HAZOP", "공정 변수의 이상 조건과 원인·결과·대책을 표로 만들 수 있다."], ["PSM", "공정안전자료, 운전절차, 변경관리의 관계를 설명할 수 있다."], ["환경관리", "배출, 폐수, 폐기물 관리 항목을 공정 흐름과 연결할 수 있다."], ["사고사례", "사고 원인을 공정 조건, 설비, 절차 문제로 분류할 수 있다."]],
  "bioprocess-engineer": [["GMP", "SOP, batch record, deviation의 역할을 설명할 수 있다."], ["배양공정", "pH, 온도, DO, 배지 조건이 배양 결과에 미치는 영향을 설명할 수 있다."], ["정제공정", "여과, 크로마토그래피, 농축 단계의 목적을 구분할 수 있다."], ["Validation", "공정 밸리데이션에서 확인해야 할 지표와 기록을 정리할 수 있다."], ["오염관리", "오염 리스크와 예방 조치를 공정 단계별로 설명할 수 있다."]]
};

Object.assign(roleDiagnostics, {
  "vehicle-body-design-engineer": [["차체 구조", "BIW, 브라켓, 마운팅 포인트가 하중 경로와 조립성에 어떤 영향을 주는지 설명할 수 있다."], ["패키지", "주변 부품 간 간섭과 장착 공간을 기준으로 설계 제약을 정리할 수 있다."], ["충돌·강성", "충돌 안전, 강성, NVH 요구사항을 설계 조건으로 바꿀 수 있다."], ["도면·공차", "도면, 공차, 용접·체결 조건을 제조성 관점에서 검토할 수 있다."], ["설계변경", "시험 또는 양산 이슈를 설계 변경 근거로 문서화할 수 있다."]],
  "chassis-suspension-engineer": [["차량동역학", "조향, 제동, 현가 변화가 차량 응답에 미치는 영향을 설명할 수 있다."], ["하중 케이스", "내구 시험 조건을 부품 하중과 변위 조건으로 바꿀 수 있다."], ["승차감·조종안정성", "승차감과 조종안정성 지표를 구분해 말할 수 있다."], ["시험데이터", "실차 시험 데이터를 그래프와 기준값으로 비교할 수 있다."], ["개선안", "부싱, 링크, 마운트 변경이 성능과 내구에 미치는 영향을 정리할 수 있다."]],
  "powertrain-mechanical-engineer": [["토크 전달", "토크, 회전수, 기어비가 구동계 부품 요구사항에 미치는 영향을 설명할 수 있다."], ["기계요소", "기어, 베어링, 샤프트, 하우징의 역할을 구분할 수 있다."], ["NVH", "소음·진동 문제가 어떤 부품 또는 조립 조건과 연결되는지 가설을 세울 수 있다."], ["내구", "파손 모드와 시험 조건을 연결해 개선 우선순위를 정할 수 있다."], ["양산 이슈", "협력사 부품 사양과 조립 품질 문제를 설계 요구사항으로 정리할 수 있다."]],
  "vehicle-thermal-management-engineer": [["열부하", "배터리, 모터, 인버터, HVAC의 열원을 구분하고 목표 온도를 정할 수 있다."], ["냉각회로", "펌프, 팬, 라디에이터, 냉각수 유량이 온도에 미치는 영향을 설명할 수 있다."], ["경계조건", "CFD 또는 열 모델의 경계조건과 물성값 설정 근거를 쓸 수 있다."], ["실차 온도", "온도 센서 데이터와 해석 결과 차이를 비교할 수 있다."], ["환경조건", "고온, 저온, 급속충전 조건에서 발생할 리스크를 정리할 수 있다."]],
  "ev-battery-pack-engineer": [["팩 구조", "셀, 모듈, 팩 하우징, 냉각 구조를 하나의 시스템으로 설명할 수 있다."], ["BMS 인터페이스", "전압, 전류, 온도, 인터락 신호가 BMS와 어떻게 연결되는지 말할 수 있다."], ["전기안전", "절연, 접지, HV 안전, 열폭주 위험을 검증 항목으로 바꿀 수 있다."], ["시험조건", "진동, 충돌, 방수, 열 시험 조건과 판정 기준을 정리할 수 있다."], ["로그분석", "CAN 로그와 온도·전압 데이터를 기반으로 고장 가설을 세울 수 있다."]],
  "vehicle-ee-architecture-engineer": [["E/E 구조", "차량 기능을 ECU, 센서, 액추에이터, 네트워크 신호로 분해할 수 있다."], ["CAN/LIN", "CAN/LIN/Ethernet 신호 흐름과 DBC의 역할을 설명할 수 있다."], ["전원분배", "퓨즈, 릴레이, 전원, 접지, 하네스 조건을 인터페이스로 정리할 수 있다."], ["진단", "UDS, DTC 같은 진단 요구사항의 목적을 말할 수 있다."], ["변경영향", "한 ECU 변경이 다른 기능과 네트워크에 미치는 영향을 검토할 수 있다."]],
  "automotive-embedded-sw-engineer": [["ECU SW", "센서 입력, 상태머신, 제어 출력, 통신을 ECU 소프트웨어 흐름으로 설명할 수 있다."], ["C/C++", "포인터, 비트 연산, 구조체를 임베디드 코드 문제와 연결할 수 있다."], ["CAN 진단", "CAN 메시지, DBC, UDS 진단 서비스의 기본 역할을 구분할 수 있다."], ["디버깅", "벤치 또는 실차 로그로 문제 재현 조건을 좁힐 수 있다."], ["검증", "요구사항과 테스트 케이스를 연결해 Pass/Fail을 판단할 수 있다."]],
  "hil-sil-validation-engineer": [["요구사항 검증", "요구사항을 테스트 케이스와 판정 기준으로 바꿀 수 있다."], ["HIL 구성", "HIL 장비, I/O, CAN 신호, 시뮬레이션 모델의 연결을 설명할 수 있다."], ["Fault Injection", "정상, 고장, 경계 조건 테스트를 구분할 수 있다."], ["로그분석", "실패 로그를 SW, 모델, 장비 원인으로 분리할 수 있다."], ["자동화", "반복 테스트를 스크립트나 테스트 시퀀스로 구성할 수 있다."]],
  "adas-validation-engineer": [["ADAS 기능", "AEB, LKA, ACC 같은 기능의 입력 센서와 출력 동작을 설명할 수 있다."], ["시나리오", "주행 시나리오와 Pass/Fail 기준을 테스트 조건으로 작성할 수 있다."], ["센서융합", "카메라, 레이더, 라이다, GPS/IMU 데이터의 차이를 말할 수 있다."], ["로그동기화", "객체 인식 결과와 CAN 로그를 시간 기준으로 비교할 수 있다."], ["안전", "기능 실패 조건과 안전 리스크를 검증 리포트로 정리할 수 있다."]],
  "ev-power-electronics-engineer": [["전력전자", "인버터, OBC, DC-DC의 역할과 전압·전류 요구사항을 설명할 수 있다."], ["스위칭", "MOSFET/IGBT/SiC 스위칭과 손실, 발열의 관계를 말할 수 있다."], ["계측", "리플, 효율, 전류, 온도를 계측 장비로 확인할 계획을 세울 수 있다."], ["EMI", "스위칭 노이즈와 필터, 접지, 레이아웃의 관계를 설명할 수 있다."], ["보호회로", "과전류, 과전압, 절연, 온도 보호 로직을 검증 항목으로 정리할 수 있다."]],
  "vehicle-test-validation-engineer": [["DVP&R", "요구사항을 시험 항목, 조건, 일정, 판정 기준으로 바꿀 수 있다."], ["계측채널", "온도, 진동, 전류, CAN, 위치 등 필요한 계측 채널을 고를 수 있다."], ["실차시험", "실차, 벤치, 환경 시험의 목적 차이를 설명할 수 있다."], ["결과정리", "시험 결과를 그래프, 표, Pass/Fail 문장으로 정리할 수 있다."], ["재시험", "불합격 항목의 원인 가설과 재시험 조건을 세울 수 있다."]]
});

const aiRoleCompetencyProfiles = {
  "cae-analysis-engineer": {
    level: "도움됨",
    summary: "해석 케이스가 많을 때 결과 분류, 민감도 분석, 반복 후처리를 자동화하는 역량으로 쓰입니다.",
    keywords: ["AI 후처리", "Python 자동화"],
    requirements: ["해석 결과 데이터를 표로 정리하고 변수별 영향도를 비교하는 데이터 처리 역량"],
    preferred: ["Python 기반 해석 자동화 또는 surrogate model 기초"],
    diagnostics: [["AI 후처리", "해석 결과 여러 개를 입력 변수와 결과 지표로 정리해 영향도가 큰 조건을 찾을 수 있다."]]
  },
  "mechanical-test-engineer": {
    level: "도움됨",
    summary: "시험 센서 로그에서 이상 패턴을 찾고 반복 리포트 작성을 줄이는 보조 역량입니다.",
    keywords: ["이상탐지", "시험데이터"],
    requirements: ["시험 로그를 시간 기준으로 정리하고 이상 구간을 표시하는 데이터 처리 역량"],
    preferred: ["Python/MATLAB 기반 시험 데이터 이상탐지 또는 자동 리포트 경험"],
    diagnostics: [["시험데이터 AI", "시험 로그에서 정상 구간과 이상 구간을 구분하고 원인 후보를 표시할 수 있다."]]
  },
  "process-engineer": {
    level: "중요",
    summary: "공정 조건과 품질 지표를 연결해 수율 저하, 설비 이상, 조건 변경 우선순위를 판단하는 데 쓰입니다.",
    keywords: ["AI", "이상탐지"],
    requirements: ["공정 변수와 품질 지표를 묶어 예측·분류 문제로 정의하는 기초"],
    preferred: ["AI/ML 기반 이상탐지, 예측모델 또는 공정 데이터 자동 분석 경험"],
    diagnostics: [["AI 문제정의", "공정 데이터를 입력 변수, 목표 지표, 검증 기준으로 나누어 AI 적용 가능성을 판단할 수 있다."]]
  },
  "quality-engineer": {
    level: "도움됨",
    summary: "비전검사, 불량 분류, 고객 클레임 텍스트 분류처럼 반복 품질 판단을 보조하는 역량입니다.",
    keywords: ["AI 검사", "불량분류"],
    requirements: ["검사 데이터와 불량 유형을 기준으로 분류 기준을 정리하는 역량"],
    preferred: ["AI 검사 결과를 관리도, FMEA, 8D 개선과 연결해 해석한 경험"],
    diagnostics: [["AI 검사해석", "AI 검사 또는 자동 분류 결과를 품질 기준과 재발방지 액션으로 연결할 수 있다."]]
  },
  "production-data-engineer": {
    level: "핵심",
    summary: "MES, 설비 로그, 검사 데이터를 기반으로 예측, 이상탐지, 대시보드 자동화를 수행하는 핵심 역량입니다.",
    keywords: ["AI", "머신러닝", "이상탐지"],
    requirements: ["Python/SQL 기반 데이터 전처리와 모델 검증 기준 설정"],
    preferred: ["예측모델, 이상탐지, 자동 대시보드 또는 MLOps 기초 경험"],
    diagnostics: [["ML 모델검증", "공정 데이터 모델의 학습 데이터, 검증 데이터, 성능 지표를 구분해 설명할 수 있다."]]
  },
  "production-technology-engineer": {
    level: "도움됨",
    summary: "라인 정지, 설비 병목, 작업시간 데이터를 분석해 자동화 개선 우선순위를 잡는 데 쓰입니다.",
    keywords: ["예지보전", "공정데이터"],
    requirements: ["설비 정지·작업시간 데이터를 개선 후보로 바꾸는 데이터 분석 기초"],
    preferred: ["예지보전, 라인 모니터링, 자동화 데이터 분석 경험"],
    diagnostics: [["예지보전", "설비 정지 로그와 불량률 변화를 연결해 개선 우선순위를 제안할 수 있다."]]
  },
  "semiconductor-process-engineer": {
    level: "중요",
    summary: "recipe, 계측, 수율 데이터를 연결해 조건 변경 후보와 이상 공정 구간을 찾는 역량입니다.",
    keywords: ["AI", "수율예측"],
    requirements: ["공정 recipe와 계측 지표를 분석 가능한 데이터 구조로 정리하는 역량"],
    preferred: ["수율 예측, 공정 이상탐지, DOE와 ML 결합 경험"],
    diagnostics: [["공정 AI", "recipe, 계측, 수율 데이터를 연결해 모델 입력과 검증 지표를 정의할 수 있다."]]
  },
  "semiconductor-equipment-engineer": {
    level: "중요",
    summary: "장비 센서, 알람, PM 이력을 기반으로 이상 징후와 예방보전 타이밍을 판단하는 역량입니다.",
    keywords: ["예지보전", "장비로그"],
    requirements: ["장비 로그, 알람, 센서값을 시간 기준으로 정리하는 데이터 처리 역량"],
    preferred: ["장비 이상탐지, 예지보전, 로그 기반 원인분석 경험"],
    diagnostics: [["장비 AI", "장비 알람과 센서 로그에서 정상 패턴과 이상 패턴을 구분할 수 있다."]]
  },
  "semiconductor-yield-engineer": {
    level: "핵심",
    summary: "wafer map, defect, 공정 이력을 결합해 수율 저하 원인과 개선 우선순위를 찾는 핵심 역량입니다.",
    keywords: ["AI", "Defect 분류", "수율예측"],
    requirements: ["결함·계측·공정 이력을 조인하고 모델 검증 기준을 세우는 역량"],
    preferred: ["불량 이미지/wafer map 분류, 수율 예측, 이상탐지 경험"],
    diagnostics: [["수율 AI", "wafer map과 공정 이력을 결합해 결함 패턴 분류 또는 수율 예측 문제를 정의할 수 있다."]]
  },
  "etch-process-engineer": {
    level: "도움됨",
    summary: "식각 조건과 CD, uniformity, defect 데이터를 연결해 조건 변경 후보를 좁히는 보조 역량입니다.",
    keywords: ["AI", "Recipe 최적화"],
    requirements: ["식각 recipe와 계측 결과를 같은 기준으로 비교하는 데이터 처리 역량"],
    preferred: ["DOE 결과를 ML 또는 통계 모델로 해석한 경험"],
    diagnostics: [["Recipe AI", "식각 조건 변경 결과를 입력 변수와 결과 지표로 나누어 최적화 후보를 설명할 수 있다."]]
  },
  "metrology-engineer": {
    level: "중요",
    summary: "계측 trend, defect review, 이상치 판단을 자동화하고 공정팀이 쓸 수 있는 판단 근거로 바꾸는 역량입니다.",
    keywords: ["AI 검사", "Trend 분석"],
    requirements: ["계측 데이터 이상치와 drift를 구분하는 통계·데이터 해석 역량"],
    preferred: ["계측 이미지/defect 분류 또는 trend 이상탐지 경험"],
    diagnostics: [["계측 AI", "계측 trend에서 장비 drift, 공정 변화, 샘플링 문제를 구분할 수 있다."]]
  },
  "battery-process-engineer": {
    level: "중요",
    summary: "전극 공정 조건과 품질 데이터를 연결해 불량 예측과 조건 최적화 후보를 찾는 역량입니다.",
    keywords: ["AI", "품질예측"],
    requirements: ["두께, 밀도, 수분, 불량률을 공정 조건과 함께 분석하는 역량"],
    preferred: ["전극 품질 예측, 이상탐지, DOE와 ML 결합 경험"],
    diagnostics: [["배터리 공정 AI", "전극 품질 데이터를 입력 조건과 결과 지표로 나누어 품질 예측 문제를 만들 수 있다."]]
  },
  "materials-rnd-engineer": {
    level: "도움됨",
    summary: "실험 조건, 조성, 물성 데이터를 축적해 후보 소재 탐색과 실험 우선순위 선정에 활용합니다.",
    keywords: ["AI 소재탐색", "실험데이터"],
    requirements: ["실험 조건과 물성 결과를 재사용 가능한 데이터셋으로 정리하는 역량"],
    preferred: ["AI 기반 후보 탐색, 문헌·특허 데이터 정리, 실험 최적화 경험"],
    diagnostics: [["소재 AI", "조성, 공정 조건, 물성 결과를 묶어 다음 실험 후보를 고르는 기준을 만들 수 있다."]]
  },
  "validation-engineer": {
    level: "도움됨",
    summary: "반복 측정 로그와 실패 패턴을 자동으로 정리해 검증 리포트와 이슈 재현 속도를 높이는 역량입니다.",
    keywords: ["테스트 자동화", "이상탐지"],
    requirements: ["측정 로그를 정리하고 실패 패턴을 조건별로 분류하는 데이터 처리 역량"],
    preferred: ["Python 기반 테스트 자동화, 로그 분석, 이상탐지 경험"],
    diagnostics: [["검증 AI", "측정 로그에서 반복 실패 패턴을 찾아 테스트 조건과 연결할 수 있다."]]
  },
  "embedded-firmware-engineer": {
    level: "도움됨",
    summary: "엣지 AI 자체 개발보다 센서 데이터 전처리, 모델 입력·출력 인터페이스, 로그 검증 이해가 우선입니다.",
    keywords: ["Edge AI", "센서데이터"],
    requirements: ["센서 데이터 전처리와 모델 입출력 인터페이스를 펌웨어 관점에서 이해"],
    preferred: ["TinyML, 모델 추론 로그 검증, Python 기반 데이터 전처리 경험"],
    diagnostics: [["Edge AI 인터페이스", "센서 입력, 모델 출력, MCU 자원 제약을 연결해 설명할 수 있다."]]
  },
  "control-engineer": {
    level: "도움됨",
    summary: "제어 성능을 높이기 위한 데이터 기반 모델링, 상태추정, 센서융합 보조 역량으로 활용됩니다.",
    keywords: ["AI 제어", "상태추정"],
    requirements: ["제어 로그를 입력, 출력, 외란, 상태 추정 관점으로 정리하는 역량"],
    preferred: ["데이터 기반 모델링, 센서융합, 이상탐지 기반 제어 검증 경험"],
    diagnostics: [["데이터 기반 제어", "제어 로그로 모델 오차와 센서 노이즈가 응답에 미치는 영향을 설명할 수 있다."]]
  },
  "robotics-software-engineer": {
    level: "중요",
    summary: "인지, localization, 경로계획, 센서융합에서 AI 모델과 로봇 시스템을 연결하는 역량입니다.",
    keywords: ["AI", "Perception", "SLAM"],
    requirements: ["카메라·라이다·IMU 데이터를 ROS 노드와 모델 입출력으로 연결하는 이해"],
    preferred: ["객체 인식, SLAM, 센서융합, 데이터셋 기반 성능평가 경험"],
    diagnostics: [["로봇 AI", "센서 데이터, 모델 추론 결과, 로봇 동작 로그를 시간 기준으로 연결할 수 있다."]]
  },
  "adas-validation-engineer": {
    level: "핵심",
    summary: "인지 모델, 센서융합, 시나리오 기반 검증이 ADAS 채용공고에서 자주 같이 요구되는 핵심 역량입니다.",
    keywords: ["AI", "센서융합", "Perception"],
    requirements: ["인지 결과, 센서 로그, CAN 신호를 기준으로 시나리오별 성능을 검증하는 역량"],
    preferred: ["객체 인식, 센서융합, 주행 시나리오 데이터셋 평가 경험"],
    diagnostics: [["ADAS AI 검증", "인지 결과와 센서/CAN 로그를 비교해 false positive/negative 사례를 설명할 수 있다."]]
  },
  "hil-sil-validation-engineer": {
    level: "중요",
    summary: "테스트 자동화, 로그 분류, 시나리오 우선순위 선정에서 AI·데이터 분석 역량이 도움이 됩니다.",
    keywords: ["테스트 자동화", "로그분석"],
    requirements: ["시뮬레이션 로그와 실패 조건을 자동 분류할 수 있는 데이터 처리 역량"],
    preferred: ["테스트 케이스 생성 보조, 로그 이상탐지, Python 자동화 경험"],
    diagnostics: [["검증 자동화 AI", "반복 테스트 로그를 실패 유형별로 분류하고 재시험 우선순위를 세울 수 있다."]]
  },
  "vehicle-test-validation-engineer": {
    level: "중요",
    summary: "실차 계측 로그, CAN, 환경 조건을 분석해 불합격 원인과 재시험 조건을 빠르게 좁히는 역량입니다.",
    keywords: ["AI", "실차로그"],
    requirements: ["실차 계측 로그를 시간 기준으로 정렬하고 이상 구간을 표시하는 역량"],
    preferred: ["실차 로그 이상탐지, 자동 리포트, Python/MATLAB 후처리 경험"],
    diagnostics: [["실차로그 AI", "실차 계측 로그에서 이상 구간과 관련 계측 채널을 연결해 설명할 수 있다."]]
  },
  "automotive-embedded-sw-engineer": {
    level: "도움됨",
    summary: "AI 모델 자체보다 차량 SW에서 모델 출력, 센서 입력, 진단 로그를 안전하게 처리하는 역량이 중요합니다.",
    keywords: ["AI 인터페이스", "센서데이터"],
    requirements: ["AI 모델 출력과 ECU 상태·진단 로직의 인터페이스를 이해"],
    preferred: ["인지 모델 출력 검증, 로그 기반 디버깅, 안전 요구사항 추적 경험"],
    diagnostics: [["AI SW 인터페이스", "모델 출력, ECU 상태, 진단 로그를 요구사항과 테스트 케이스로 연결할 수 있다."]]
  }
};

applyAiRoleCompetencyProfiles();

function applyAiRoleCompetencyProfiles() {
  const rolesById = Object.values(jobRoles).flat().reduce((acc, role) => {
    acc[role.id] = role;
    return acc;
  }, {});

  Object.entries(aiRoleCompetencyProfiles).forEach(([roleId, profile]) => {
    const role = rolesById[roleId];
    if (!role) return;
    role.aiCompetency = profile;
    role.postingKeywords = mergeUniqueRoleItems(role.postingKeywords, profile.keywords).slice(0, 9);
    role.requirements = mergeUniqueRoleItems(role.requirements, profile.requirements);
    role.preferred = mergeUniqueRoleItems(role.preferred, profile.preferred);
    roleDiagnostics[roleId] = mergeUniqueDiagnostics(roleDiagnostics[roleId] || [], profile.diagnostics || []);
  });
}

function mergeUniqueRoleItems(base = [], additions = []) {
  const seen = new Set();
  return [...base, ...additions].filter((item) => {
    const key = String(item || "").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeUniqueDiagnostics(base = [], additions = []) {
  const seen = new Set();
  return [...base, ...additions].filter(([skill]) => {
    const key = String(skill || "").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const industryDiagnostics = {
  mobility: [["차량신뢰성", "온도, 진동, 안전 요구가 설계·검증 조건에 미치는 영향을 설명할 수 있다."], ["양산검증", "시제품 검증과 양산 검증의 차이를 말할 수 있다."]],
  semiconductor: [["클린룸·공정", "오염, 진공, 계측 조건이 품질과 수율에 미치는 영향을 설명할 수 있다."], ["수율언어", "결함, 수율, 공정 조건을 하나의 개선 가설로 연결할 수 있다."]],
  manufacturing: [["현장지표", "불량률, takt time, 재작업률 같은 현장 지표를 해석할 수 있다."], ["표준작업", "작업 조건 변경이 품질과 생산성에 미치는 영향을 설명할 수 있다."]],
  robotics: [["센서통합", "센서, 구동기, 제어 주기를 하나의 동작 흐름으로 설명할 수 있다."], ["안전동작", "비상정지, 오류 상태, 재시작 조건을 고려할 수 있다."]],
  electronics: [["EMC·노이즈", "전원, 접지, 신호 배선이 노이즈와 신뢰성에 미치는 영향을 설명할 수 있다."], ["검증환경", "측정 장비와 테스트 조건을 제품 요구사항과 연결할 수 있다."]],
  chemical: [["화학물질안전", "MSDS, 저장 조건, 반응 위험이 공정 조건에 미치는 영향을 설명할 수 있다."], ["공정수율", "수율, 순도, 부산물, 손실을 하나의 물질수지로 연결할 수 있다."]],
  battery: [["전극품질", "코팅 균일도, 수분, 밀도, 두께가 셀 품질에 미치는 영향을 설명할 수 있다."], ["공정안전", "용매, 분진, 전해액 취급 리스크와 예방 대책을 말할 수 있다."]],
  bio: [["GMP문서", "SOP, batch record, deviation이 품질 보증에 왜 필요한지 설명할 수 있다."], ["오염관리", "배양·정제 공정에서 오염 리스크를 줄이는 확인 항목을 말할 수 있다."]]
};

const resourceTaskLinks = {
  "matlab-onramp": ["관리도와 Cpk 계산", "PID 응답 실험", "해석 조건 검증", "검증 리포트", "수율 Pareto 분석", "물질수지와 수율 계산"],
  "simulink-onramp": ["PID 응답 실험", "검증 리포트", "전원 요구사항 정의", "식각 장비 변수 정리", "반응·분리 조건 비교"],
  "stateflow-onramp": ["디버깅 노트와 README", "UART 센서 프로토콜", "검증 리포트"],
  "control-design-onramp": ["PID 응답 실험", "검증 리포트", "디버깅 노트와 README"],
  "signal-processing-onramp": ["검증 리포트", "PID 응답 실험", "수율 Pareto 분석", "해석 조건 검증"],
  "machine-learning-onramp": ["수율 Pareto 분석", "관리도와 Cpk 계산", "원인 가설과 FMEA", "물질수지와 수율 계산"],
  "statistics-onramp": ["관리도와 Cpk 계산", "수율 Pareto 분석", "원인 가설과 FMEA", "조건 변경 검토표", "물질수지와 수율 계산"],
  "mathworks-predictive-maintenance": ["수율 Pareto 분석", "조건 변경 검토표", "검증 리포트", "디버깅 노트와 README"],
  "simscape-onramp": ["전원 요구사항 정의", "PID 응답 실험", "손계산과 CAD 초안", "식각 장비 변수 정리"],
  "mathworks-simscape-electrical": ["전원 요구사항 정의", "PID 응답 실험", "검증 리포트"],
  "sensor-fusion-onramp": ["PID 응답 실험", "디버깅 노트와 README"],
  "optimization-onramp": ["설계 변경 제안", "조건 변경 검토표", "PID 응답 실험", "반응·분리 조건 비교"],
  "mit-design-manufacturing": ["제품 요구사항 분해", "설계 변경 제안"],
  "mit-mechanics-materials": ["제품 요구사항 분해", "손계산과 CAD 초안", "설계 변경 제안"],
  "mit-fea-solids": ["해석 조건 검증", "설계 변경 제안"],
  "mit-numerical-me": ["해석 조건 검증", "손계산과 CAD 초안"],
  ncs: ["공정 문제 정의", "공정 흐름 매핑", "제품 요구사항 분해", "MCU 주변장치 설계"],
  "mit-circuits": ["전원 요구사항 정의", "센서 신호 증폭 회로"],
  "allaboutcircuits-textbook": ["전원 요구사항 정의", "센서 신호 증폭 회로"],
  "kicad-pcb-docs": ["PCB 리뷰 체크리스트", "검증 리포트"],
  "ti-precision-labs": ["전원 요구사항 정의", "검증 리포트"],
  "stm32-education": ["MCU 주변장치 설계", "UART 센서 프로토콜"],
  "stm32-mooc-gpio-timer-uart": ["MCU 주변장치 설계", "UART 센서 프로토콜", "디버깅 노트와 README"],
  "arm-embedded-systems": ["MCU 주변장치 설계", "UART 센서 프로토콜", "디버깅 노트와 README"],
  "ros-tutorials": ["MCU 주변장치 설계", "디버깅 노트와 README"],
  "mit-microelectronic": ["공정 흐름 매핑", "전원 요구사항 정의"],
  "mit-semiconductor-devices": ["공정 흐름 매핑", "식각 장비 변수 정리"],
  "plasma-etch-core": ["식각 장비 변수 정리", "조건 변경 검토표"],
  "analog-dialogue": ["센서 신호 증폭 회로", "검증 리포트"],
  "nist-spc": ["관리도와 Cpk 계산", "원인 가설과 FMEA", "수율 Pareto 분석"],
  "nist-control-charts": ["관리도와 Cpk 계산", "수율 Pareto 분석"],
  "nist-process-capability": ["관리도와 Cpk 계산", "수율 Pareto 분석"],
  "asq-quality-tools": ["공정 문제 정의", "원인 가설과 FMEA"],
  "quality-one-fmea": ["원인 가설과 FMEA"],
  "asq-fmea": ["원인 가설과 FMEA"],
  "asq-eight-d": ["8D 개선 보고서"],
  "lean-a3-problem-solving": ["8D 개선 보고서"],
  "moresteam-doe": ["조건 변경 검토표", "관리도와 Cpk 계산", "반응·분리 조건 비교"],
  "learncheme-chemical-process": ["화학공정 흐름도", "물질수지와 수율 계산", "반응·분리 조건 비교"],
  "learncheme-material-balances": ["화학공정 흐름도", "물질수지와 수율 계산"],
  "learncheme-separations": ["반응·분리 조건 비교", "조건 변경 검토표"],
  "mit-chemical-engineering": ["물질수지와 수율 계산", "반응·분리 조건 비교"],
  "kocw-chemical-process": ["화학공정 흐름도", "물질수지와 수율 계산", "반응·분리 조건 비교"],
  "kosha-psm": ["HAZOP 안전 체크", "조건 변경 검토표"],
  "coursera-chemical-engineering": ["반응·분리 조건 비교", "HAZOP 안전 체크"],
  "nptel-chemical-engineering": ["물질수지와 수율 계산", "반응·분리 조건 비교"],
  kmooc: ["제품 요구사항 분해", "공정 문제 정의", "공정 흐름 매핑", "화학공정 흐름도", "전원 요구사항 정의", "MCU 주변장치 설계"],
  "kocw-mechanical-design": ["제품 요구사항 분해", "손계산과 CAD 초안", "해석 조건 검증"],
  "kocw-production-quality": ["공정 문제 정의", "관리도와 Cpk 계산", "원인 가설과 FMEA"],
  "kocw-semiconductor": ["공정 흐름 매핑", "식각 장비 변수 정리", "수율 Pareto 분석"],
  "kocw-electronics-circuit": ["전원 요구사항 정의", "센서 신호 증폭 회로", "검증 리포트"],
  "kocw-embedded-control": ["MCU 주변장치 설계", "UART 센서 프로토콜", "PID 응답 실험"],
  "step-engineering": ["설계 변경 제안", "8D 개선 보고서", "조건 변경 검토표", "PCB 리뷰 체크리스트", "디버깅 노트와 README"],
  "hrd-net-job-training": ["제품 요구사항 분해", "8D 개선 보고서", "조건 변경 검토표", "HAZOP 안전 체크", "PCB 리뷰 체크리스트", "디버깅 노트와 README"],
  "digital-learning-ai-it-basics": ["공정 문제 정의", "수율 Pareto 분석", "MCU 주변장치 설계", "검증 리포트"],
  "gseek-career-certificate": ["제품 요구사항 분해", "공정 문제 정의", "전원 요구사항 정의", "MCU 주변장치 설계"],
  "coursera-six-sigma-quality": ["공정 문제 정의", "관리도와 Cpk 계산", "원인 가설과 FMEA", "8D 개선 보고서", "조건 변경 검토표"],
  "coursera-engineering-data": ["관리도와 Cpk 계산", "수율 Pareto 분석", "해석 조건 검증", "조건 변경 검토표", "물질수지와 수율 계산"],
  "coursera-embedded-control": ["PID 응답 실험", "UART 센서 프로토콜", "디버깅 노트와 README", "검증 리포트"],
  "edx-engineering-systems": ["해석 조건 검증", "공정 흐름 매핑", "화학공정 흐름도", "전원 요구사항 정의", "PID 응답 실험"],
  "khan-math-physics-basics": ["손계산과 CAD 초안", "관리도와 Cpk 계산", "전원 요구사항 정의", "PID 응답 실험", "물질수지와 수율 계산"],
  "freecodecamp-python-data": ["관리도와 Cpk 계산", "수율 Pareto 분석", "물질수지와 수율 계산", "디버깅 노트와 README"],
  "inflearn-free-it-practice": ["UART 센서 프로토콜", "디버깅 노트와 README", "검증 리포트"],
  "udemy-free-practical-tools": ["손계산과 CAD 초안", "PCB 리뷰 체크리스트", "8D 개선 보고서", "디버깅 노트와 README"],
  "ansys-innovation-courses": ["해석 조건 검증", "설계 변경 제안", "차량 시스템 요구사항표", "자동차 직무 검증 리포트"],
  "ni-learn-test-measurement": ["검증 리포트", "UART 센서 프로토콜", "인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"],
  "google-ml-crash-course": ["관리도와 Cpk 계산", "수율 Pareto 분석", "조건 변경 검토표", "자동차 직무 검증 리포트"],
  "boostcourse-data-ai-basic": ["공정 문제 정의", "수율 Pareto 분석", "디버깅 노트와 README", "검증 리포트"],
  "youtube-nptel-vehicle-dynamics": ["제품 요구사항 분해", "해석 조건 검증", "자동차 세부 직무 비교표", "차량 시스템 요구사항표", "자동차 직무 검증 리포트"],
  "youtube-css-can-bus": ["MCU 주변장치 설계", "UART 센서 프로토콜", "전원 요구사항 정의", "인터페이스·시험 조건 노트", "자동차 세부 직무 비교표"],
  "youtube-skilllync-ev-crash-course": ["자동차 세부 직무 비교표", "차량 시스템 요구사항표", "인터페이스·시험 조건 노트"],
  "youtube-mathworks-hil-testing": ["검증 리포트", "PID 응답 실험", "인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"],
  "youtube-emc-emi-basics": ["전원 요구사항 정의", "PCB 리뷰 체크리스트", "검증 리포트", "자동차 직무 검증 리포트"],
  "youtube-nptel-hazop": ["HAZOP 안전 체크", "화학공정 흐름도", "조건 변경 검토표"],
  "youtube-cqe-quality-tools": ["공정 문제 정의", "관리도와 Cpk 계산", "원인 가설과 FMEA", "8D 개선 보고서"],
  "mathworks-simulink-examples": ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트", "PID 응답 실험", "검증 리포트"],
  "mathworks-fault-tolerant-fuel-control": ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트", "PID 응답 실험", "검증 리포트"],
  "mathworks-simulink-test-manager": ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트", "검증 리포트", "디버깅 노트와 README"],
  "mathworks-lane-following-sensor-fusion": ["자동차 세부 직무 비교표", "인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"],
  "mathworks-simscape-examples": ["차량 시스템 요구사항표", "인터페이스·시험 조건 노트", "전원 요구사항 정의", "해석 조건 검증"],
  "mathworks-vehicle-dynamics-examples": ["자동차 세부 직무 비교표", "차량 시스템 요구사항표", "자동차 직무 검증 리포트"],
  "mathworks-automated-driving-examples": ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"],
  "mathworks-official-videos": ["제품 요구사항 분해", "공정 문제 정의", "자동차 세부 직무 비교표", "인터페이스·시험 조건 노트", "검증 리포트"],
  "comento-production-tech-internship": ["공정 문제 정의", "설계 변경 제안", "조건 변경 검토표", "자동차 세부 직무 비교표", "자동차 직무 검증 리포트"],
  "comento-semiconductor-equipment-bootcamp": ["공정 흐름 매핑", "식각 장비 변수 정리", "수율 Pareto 분석", "조건 변경 검토표"],
  "comento-plc-control-practice": ["MCU 주변장치 설계", "PID 응답 실험", "디버깅 노트와 README", "인터페이스·시험 조건 노트"],
  "comento-production-management-core": ["공정 문제 정의", "관리도와 Cpk 계산", "원인 가설과 FMEA", "8D 개선 보고서"],
  "letuin-semiconductor-process-data-kdt": ["공정 흐름 매핑", "식각 장비 변수 정리", "수율 Pareto 분석", "조건 변경 검토표"],
  "letuin-spotfire-defect-analysis": ["수율 Pareto 분석", "관리도와 Cpk 계산", "조건 변경 검토표"],
  "letuin-semiconductor-field-practice": ["공정 흐름 매핑", "식각 장비 변수 정리", "조건 변경 검토표"],
  "letuin-cvd-maintenance-mentoring": ["식각 장비 변수 정리", "공정 흐름 매핑", "조건 변경 검토표"],
  "letuin-low-power-design-validation": ["전원 요구사항 정의", "검증 리포트", "인터페이스·시험 조건 노트"]
};

[
  ["matlab-onramp", ["차량 시스템 요구사항표", "인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["simulink-onramp", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["stateflow-onramp", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["control-design-onramp", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["sensor-fusion-onramp", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["mathworks-simulink-examples", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["mathworks-fault-tolerant-fuel-control", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["mathworks-simulink-test-manager", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["mathworks-lane-following-sensor-fusion", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["mathworks-simscape-examples", ["차량 시스템 요구사항표", "인터페이스·시험 조건 노트"]],
  ["mathworks-vehicle-dynamics-examples", ["자동차 세부 직무 비교표", "차량 시스템 요구사항표", "자동차 직무 검증 리포트"]],
  ["mathworks-automated-driving-examples", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["mathworks-official-videos", ["자동차 세부 직무 비교표", "인터페이스·시험 조건 노트"]],
  ["mathworks-simscape-electrical", ["차량 시스템 요구사항표", "인터페이스·시험 조건 노트"]],
  ["mit-mechanics-materials", ["차량 시스템 요구사항표"]],
  ["mit-fea-solids", ["차량 시스템 요구사항표", "자동차 직무 검증 리포트"]],
  ["kocw-mechanical-design", ["차량 시스템 요구사항표"]],
  ["kocw-electronics-circuit", ["차량 시스템 요구사항표", "인터페이스·시험 조건 노트"]],
  ["stm32-mooc-gpio-timer-uart", ["인터페이스·시험 조건 노트"]],
  ["arm-embedded-systems", ["인터페이스·시험 조건 노트"]],
  ["ti-precision-labs", ["자동차 직무 검증 리포트"]],
  ["step-engineering", ["자동차 세부 직무 비교표", "자동차 직무 검증 리포트"]],
  ["hrd-net-job-training", ["자동차 세부 직무 비교표", "자동차 직무 검증 리포트"]],
  ["youtube-nptel-vehicle-dynamics", ["자동차 세부 직무 비교표", "차량 시스템 요구사항표"]],
  ["youtube-css-can-bus", ["자동차 세부 직무 비교표", "인터페이스·시험 조건 노트"]],
  ["youtube-skilllync-ev-crash-course", ["자동차 세부 직무 비교표", "차량 시스템 요구사항표"]],
  ["youtube-mathworks-hil-testing", ["인터페이스·시험 조건 노트", "자동차 직무 검증 리포트"]],
  ["youtube-emc-emi-basics", ["자동차 직무 검증 리포트"]]
].forEach(([resourceId, taskTitles]) => {
  resourceTaskLinks[resourceId] = [...new Set([...(resourceTaskLinks[resourceId] || []), ...taskTitles])];
});

const roleResourceLinks = {
  "mechanical-design-engineer": ["mit-mechanics-materials", "kocw-mechanical-design", "mit-design-manufacturing", "step-engineering", "optimization-onramp", "khan-math-physics-basics", "udemy-free-practical-tools"],
  "cae-analysis-engineer": ["mit-fea-solids", "matlab-onramp", "simscape-onramp", "mit-numerical-me", "kocw-mechanical-design", "signal-processing-onramp", "coursera-engineering-data", "edx-engineering-systems"],
  "manufacturing-design-engineer": ["mit-mechanics-materials", "mit-design-manufacturing", "kocw-mechanical-design", "step-engineering", "optimization-onramp", "hrd-net-job-training", "udemy-free-practical-tools"],
  "thermal-cfd-engineer": ["mit-fea-solids", "matlab-onramp", "simscape-onramp", "mit-numerical-me", "signal-processing-onramp", "edx-engineering-systems", "coursera-engineering-data"],
  "mechanical-test-engineer": ["matlab-onramp", "signal-processing-onramp", "mathworks-predictive-maintenance", "step-engineering", "kocw-mechanical-design", "hrd-net-job-training", "youtube-nptel-vehicle-dynamics", "youtube-mathworks-hil-testing"],
  "process-engineer": ["nist-control-charts", "nist-process-capability", "statistics-onramp", "moresteam-doe", "matlab-onramp", "optimization-onramp", "coursera-six-sigma-quality", "kocw-production-quality", "coursera-engineering-data", "hrd-net-job-training"],
  "quality-engineer": ["nist-control-charts", "nist-process-capability", "kocw-production-quality", "statistics-onramp", "coursera-six-sigma-quality", "asq-fmea", "asq-eight-d", "quality-one-fmea", "hrd-net-job-training", "gseek-career-certificate"],
  "production-data-engineer": ["nist-control-charts", "matlab-onramp", "statistics-onramp", "machine-learning-onramp", "mathworks-predictive-maintenance", "kocw-production-quality", "coursera-engineering-data", "freecodecamp-python-data", "digital-learning-ai-it-basics"],
  "production-technology-engineer": ["step-engineering", "mathworks-predictive-maintenance", "moresteam-doe", "simulink-onramp", "optimization-onramp", "hrd-net-job-training", "udemy-free-practical-tools"],
  "supplier-quality-engineer": ["asq-eight-d", "quality-one-fmea", "coursera-six-sigma-quality", "lean-a3-problem-solving", "ncs", "hrd-net-job-training", "gseek-career-certificate"],
  "semiconductor-process-engineer": ["mit-semiconductor-devices", "plasma-etch-core", "kocw-semiconductor", "statistics-onramp", "nist-control-charts", "moresteam-doe", "matlab-onramp", "optimization-onramp", "edx-engineering-systems", "coursera-engineering-data"],
  "semiconductor-equipment-engineer": ["plasma-etch-core", "mathworks-predictive-maintenance", "kocw-semiconductor", "simulink-onramp", "simscape-onramp", "matlab-onramp", "signal-processing-onramp", "edx-engineering-systems", "hrd-net-job-training"],
  "semiconductor-yield-engineer": ["nist-control-charts", "nist-process-capability", "matlab-onramp", "statistics-onramp", "machine-learning-onramp", "kocw-semiconductor", "coursera-engineering-data", "freecodecamp-python-data", "digital-learning-ai-it-basics"],
  "etch-process-engineer": ["plasma-etch-core", "mit-semiconductor-devices", "kocw-semiconductor", "statistics-onramp", "moresteam-doe", "nist-control-charts", "matlab-onramp", "optimization-onramp", "edx-engineering-systems", "coursera-engineering-data"],
  "metrology-engineer": ["signal-processing-onramp", "matlab-onramp", "statistics-onramp", "nist-spc", "kocw-semiconductor", "coursera-engineering-data", "freecodecamp-python-data"],
  "chemical-process-engineer": ["learncheme-material-balances", "learncheme-separations", "learncheme-chemical-process", "kocw-chemical-process", "matlab-onramp", "statistics-onramp", "optimization-onramp", "coursera-chemical-engineering", "nptel-chemical-engineering"],
  "battery-process-engineer": ["learncheme-material-balances", "learncheme-separations", "statistics-onramp", "moresteam-doe", "matlab-onramp", "machine-learning-onramp", "coursera-chemical-engineering", "kosha-psm"],
  "materials-rnd-engineer": ["learncheme-material-balances", "learncheme-separations", "statistics-onramp", "mit-chemical-engineering", "coursera-chemical-engineering", "nptel-chemical-engineering", "khan-math-physics-basics", "coursera-engineering-data"],
  "process-safety-engineer": ["kosha-psm", "kocw-chemical-process", "youtube-nptel-hazop", "hrd-net-job-training", "ncs"],
  "bioprocess-engineer": ["kocw-chemical-process", "coursera-chemical-engineering", "fda-process-validation", "hrd-net-job-training", "moresteam-doe", "youtube-nptel-hazop"],
  "hardware-design-engineer": ["allaboutcircuits-textbook", "mit-circuits", "ti-precision-labs", "mathworks-simscape-electrical", "simscape-onramp", "analog-dialogue", "matlab-onramp", "edx-engineering-systems", "khan-math-physics-basics"],
  "pcb-design-engineer": ["kicad-pcb-docs", "allaboutcircuits-textbook", "kocw-electronics-circuit", "ti-precision-labs", "analog-dialogue", "step-engineering", "inflearn-free-it-practice", "udemy-free-practical-tools"],
  "validation-engineer": ["signal-processing-onramp", "matlab-onramp", "ti-precision-labs", "analog-dialogue", "simulink-onramp", "freecodecamp-python-data", "youtube-mathworks-hil-testing"],
  "power-hardware-engineer": ["mathworks-simscape-electrical", "simscape-onramp", "ti-precision-labs", "kocw-electronics-circuit", "simulink-onramp", "edx-engineering-systems", "khan-math-physics-basics"],
  "emc-test-engineer": ["signal-processing-onramp", "analog-dialogue", "ti-precision-labs", "kocw-electronics-circuit", "udemy-free-practical-tools", "youtube-emc-emi-basics"],
  "embedded-firmware-engineer": ["stm32-mooc-gpio-timer-uart", "arm-embedded-systems", "stm32-education", "kocw-embedded-control", "stateflow-onramp", "simulink-onramp", "freecodecamp-python-data", "inflearn-free-it-practice", "youtube-css-can-bus"],
  "control-engineer": ["control-design-onramp", "simulink-onramp", "matlab-onramp", "signal-processing-onramp", "mathworks-simscape-electrical", "sensor-fusion-onramp", "coursera-embedded-control", "edx-engineering-systems"],
  "robotics-software-engineer": ["ros-tutorials", "sensor-fusion-onramp", "simulink-onramp", "matlab-onramp", "coursera-embedded-control", "freecodecamp-python-data"],
  "embedded-linux-engineer": ["kocw-embedded-control", "stm32-education", "ros-tutorials", "step-engineering", "freecodecamp-python-data", "inflearn-free-it-practice"],
  "motor-control-engineer": ["control-design-onramp", "simulink-onramp", "mathworks-simscape-electrical", "simscape-onramp", "stateflow-onramp", "matlab-onramp", "coursera-embedded-control", "edx-engineering-systems"]
};

Object.assign(roleResourceLinks, {
  "vehicle-body-design-engineer": ["mit-mechanics-materials", "kocw-mechanical-design", "mit-design-manufacturing", "mit-fea-solids", "optimization-onramp", "step-engineering", "hrd-net-job-training"],
  "chassis-suspension-engineer": ["mit-mechanics-materials", "mit-fea-solids", "matlab-onramp", "simulink-onramp", "signal-processing-onramp", "optimization-onramp", "coursera-engineering-data", "youtube-nptel-vehicle-dynamics"],
  "powertrain-mechanical-engineer": ["mit-mechanics-materials", "mit-fea-solids", "simscape-onramp", "matlab-onramp", "signal-processing-onramp", "mathworks-predictive-maintenance", "edx-engineering-systems", "youtube-skilllync-ev-crash-course"],
  "vehicle-thermal-management-engineer": ["mit-fea-solids", "mit-numerical-me", "matlab-onramp", "simscape-onramp", "signal-processing-onramp", "coursera-engineering-data", "edx-engineering-systems", "youtube-skilllync-ev-crash-course"],
  "ev-battery-pack-engineer": ["simscape-onramp", "mathworks-simscape-electrical", "matlab-onramp", "signal-processing-onramp", "statistics-onramp", "kocw-electronics-circuit", "hrd-net-job-training", "youtube-skilllync-ev-crash-course"],
  "vehicle-ee-architecture-engineer": ["allaboutcircuits-textbook", "mit-circuits", "kocw-electronics-circuit", "ti-precision-labs", "analog-dialogue", "simulink-onramp", "edx-engineering-systems", "youtube-css-can-bus", "youtube-emc-emi-basics"],
  "automotive-embedded-sw-engineer": ["stm32-mooc-gpio-timer-uart", "arm-embedded-systems", "stm32-education", "kocw-embedded-control", "stateflow-onramp", "simulink-onramp", "freecodecamp-python-data", "inflearn-free-it-practice", "youtube-css-can-bus"],
  "hil-sil-validation-engineer": ["simulink-onramp", "stateflow-onramp", "control-design-onramp", "matlab-onramp", "signal-processing-onramp", "coursera-embedded-control", "freecodecamp-python-data", "youtube-mathworks-hil-testing", "youtube-css-can-bus"],
  "adas-validation-engineer": ["sensor-fusion-onramp", "signal-processing-onramp", "matlab-onramp", "simulink-onramp", "machine-learning-onramp", "coursera-embedded-control", "freecodecamp-python-data", "youtube-mathworks-hil-testing"],
  "ev-power-electronics-engineer": ["mathworks-simscape-electrical", "simscape-onramp", "ti-precision-labs", "kocw-electronics-circuit", "analog-dialogue", "simulink-onramp", "edx-engineering-systems", "youtube-skilllync-ev-crash-course", "youtube-emc-emi-basics"],
  "vehicle-test-validation-engineer": ["matlab-onramp", "signal-processing-onramp", "mathworks-predictive-maintenance", "statistics-onramp", "step-engineering", "hrd-net-job-training", "youtube-nptel-vehicle-dynamics", "youtube-mathworks-hil-testing"]
});

Object.entries({
  "manufacturing-design-engineer": ["comento-production-tech-internship", "comento-production-management-core"],
  "mechanical-test-engineer": ["comento-production-tech-internship", "mathworks-simulink-examples"],
  "process-engineer": ["comento-production-management-core", "comento-production-tech-internship"],
  "quality-engineer": ["comento-production-management-core"],
  "production-data-engineer": ["letuin-spotfire-defect-analysis", "letuin-semiconductor-process-data-kdt"],
  "production-technology-engineer": ["comento-production-tech-internship", "comento-production-management-core", "comento-plc-control-practice"],
  "semiconductor-process-engineer": ["letuin-semiconductor-process-data-kdt", "letuin-semiconductor-field-practice", "letuin-spotfire-defect-analysis"],
  "semiconductor-equipment-engineer": ["comento-semiconductor-equipment-bootcamp", "letuin-cvd-maintenance-mentoring", "letuin-semiconductor-field-practice", "letuin-semiconductor-process-data-kdt"],
  "semiconductor-yield-engineer": ["letuin-spotfire-defect-analysis", "letuin-semiconductor-process-data-kdt"],
  "etch-process-engineer": ["letuin-semiconductor-field-practice", "letuin-cvd-maintenance-mentoring", "letuin-semiconductor-process-data-kdt"],
  "metrology-engineer": ["letuin-spotfire-defect-analysis", "letuin-semiconductor-process-data-kdt"],
  "hardware-design-engineer": ["letuin-low-power-design-validation", "mathworks-simscape-examples", "mathworks-official-videos"],
  "pcb-design-engineer": ["letuin-low-power-design-validation", "mathworks-official-videos"],
  "validation-engineer": ["letuin-low-power-design-validation", "mathworks-simulink-examples", "mathworks-official-videos"],
  "power-hardware-engineer": ["letuin-low-power-design-validation", "mathworks-simscape-examples"],
  "embedded-firmware-engineer": ["comento-plc-control-practice", "mathworks-simulink-examples"],
  "control-engineer": ["comento-plc-control-practice", "mathworks-simulink-examples"],
  "motor-control-engineer": ["comento-plc-control-practice", "mathworks-simulink-examples"],
  "vehicle-body-design-engineer": ["comento-production-tech-internship", "mathworks-vehicle-dynamics-examples"],
  "chassis-suspension-engineer": ["mathworks-vehicle-dynamics-examples", "mathworks-simulink-examples"],
  "powertrain-mechanical-engineer": ["comento-production-tech-internship", "mathworks-simscape-examples"],
  "vehicle-thermal-management-engineer": ["mathworks-simscape-examples"],
  "ev-battery-pack-engineer": ["comento-production-tech-internship", "mathworks-simscape-examples"],
  "automotive-embedded-sw-engineer": ["comento-plc-control-practice", "mathworks-simulink-examples"],
  "hil-sil-validation-engineer": ["comento-plc-control-practice", "letuin-low-power-design-validation", "mathworks-simulink-examples"],
  "adas-validation-engineer": ["mathworks-automated-driving-examples", "mathworks-simulink-examples"],
  "ev-power-electronics-engineer": ["mathworks-simscape-examples"],
  "vehicle-test-validation-engineer": ["comento-production-tech-internship", "comento-plc-control-practice", "mathworks-vehicle-dynamics-examples", "mathworks-simulink-examples"]
}).forEach(([roleId, resourceIds]) => {
  roleResourceLinks[roleId] = [...new Set([...(roleResourceLinks[roleId] || []), ...resourceIds])];
});

Object.entries({
  "mechanical-design-engineer": ["ansys-innovation-courses"],
  "cae-analysis-engineer": ["ansys-innovation-courses", "machine-learning-onramp", "google-ml-crash-course"],
  "thermal-cfd-engineer": ["ansys-innovation-courses"],
  "mechanical-test-engineer": ["ni-learn-test-measurement", "ansys-innovation-courses", "machine-learning-onramp"],
  "process-engineer": ["google-ml-crash-course", "boostcourse-data-ai-basic"],
  "quality-engineer": ["boostcourse-data-ai-basic", "google-ml-crash-course"],
  "production-data-engineer": ["google-ml-crash-course", "boostcourse-data-ai-basic"],
  "production-technology-engineer": ["mathworks-predictive-maintenance", "machine-learning-onramp"],
  "semiconductor-process-engineer": ["google-ml-crash-course", "boostcourse-data-ai-basic"],
  "semiconductor-equipment-engineer": ["mathworks-predictive-maintenance", "machine-learning-onramp"],
  "semiconductor-yield-engineer": ["google-ml-crash-course", "boostcourse-data-ai-basic"],
  "etch-process-engineer": ["google-ml-crash-course", "boostcourse-data-ai-basic"],
  "metrology-engineer": ["ni-learn-test-measurement", "google-ml-crash-course"],
  "battery-process-engineer": ["machine-learning-onramp", "google-ml-crash-course"],
  "materials-rnd-engineer": ["machine-learning-onramp", "coursera-engineering-data"],
  "validation-engineer": ["ni-learn-test-measurement", "machine-learning-onramp"],
  "emc-test-engineer": ["ni-learn-test-measurement"],
  "embedded-firmware-engineer": ["ni-learn-test-measurement", "boostcourse-data-ai-basic", "mathworks-fault-tolerant-fuel-control", "machine-learning-onramp"],
  "automotive-embedded-sw-engineer": ["mathworks-fault-tolerant-fuel-control", "mathworks-simulink-test-manager", "machine-learning-onramp"],
  "control-engineer": ["mathworks-fault-tolerant-fuel-control", "sensor-fusion-onramp", "machine-learning-onramp"],
  "robotics-software-engineer": ["google-ml-crash-course", "machine-learning-onramp", "sensor-fusion-onramp"],
  "hil-sil-validation-engineer": ["ni-learn-test-measurement", "mathworks-simulink-test-manager", "mathworks-fault-tolerant-fuel-control", "google-ml-crash-course"],
  "adas-validation-engineer": ["google-ml-crash-course", "ni-learn-test-measurement", "mathworks-lane-following-sensor-fusion"],
  "vehicle-test-validation-engineer": ["ni-learn-test-measurement", "ansys-innovation-courses", "mathworks-simulink-test-manager", "machine-learning-onramp"],
  "vehicle-thermal-management-engineer": ["ansys-innovation-courses"],
  "chassis-suspension-engineer": ["ansys-innovation-courses", "ni-learn-test-measurement"]
}).forEach(([roleId, resourceIds]) => {
  roleResourceLinks[roleId] = [...new Set([...(roleResourceLinks[roleId] || []), ...resourceIds])];
});

const storageKey = "careerCompetencyPilot";
const primaryViews = ["tracks", "diagnosis", "roadmap", "saved", "references"];

const defaultState = {
  selectedTrackId: null,
  hasSelectedRoleSelection: false,
  profile: { major: "mechanical", industry: "all", goal: "foundation", durationWeeks: "4" },
  roleSearch: "",
  roleGroupFilter: "all",
  selectedRoles: {},
  checked: {},
  saved: [],
  completed: [],
  completedRoadmap: [],
  view: "tracks"
};

let state = loadState();
let wordCloudLayoutFrame = null;

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  bindEvents();
  render();
  disableServiceWorkerCache();
});

function bindElements() {
  [
    "majorSelect",
    "industrySelect",
    "goalSelect",
    "durationSelect",
    "selectedTrackMetric",
    "diagnosticMetric",
    "savedMetric",
    "nextActionPanel",
    "profileImpactPanel",
    "workflowStatus",
    "roleContextBar",
    "trackCount",
    "roleSearchInput",
    "roleGroupFilter",
    "selectedRoleOverview",
    "trackList",
    "trackDetail",
    "diagnosisGuide",
    "diagnosisTitle",
    "scoreBadge",
    "scoreBar",
    "diagnosticList",
    "gapList",
    "roadmapTitle",
    "roadmapGuidance",
    "roadmapList",
    "referenceCount",
    "referenceGuidance",
    "referenceList",
    "savedGuidance",
    "savedList",
    "clearSavedButton",
    "exportPlanButton"
  ].forEach((id) => {
    elements[id] = document.getElementById(id);
  });
}

function bindEvents() {
  elements.majorSelect.addEventListener("change", (event) => {
    state.profile.major = event.target.value;
    saveState();
    render();
  });

  elements.industrySelect.addEventListener("change", (event) => {
    state.profile.industry = event.target.value;
    saveState();
    render();
  });

  elements.goalSelect.addEventListener("change", (event) => {
    state.profile.goal = event.target.value;
    saveState();
    render();
  });

  elements.durationSelect.addEventListener("change", (event) => {
    state.profile.durationWeeks = event.target.value;
    saveState();
    render();
  });

  elements.roleSearchInput.addEventListener("input", (event) => {
    state.roleSearch = event.target.value;
    saveState();
    render();
  });

  elements.roleGroupFilter.addEventListener("change", (event) => {
    state.roleGroupFilter = event.target.value;
    saveState();
    render();
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      saveState();
      renderViews();
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-view-target]");
    if (!target) return;
    state.view = normalizeView(target.dataset.viewTarget);
    saveState();
    renderViews();
  });

  elements.clearSavedButton.addEventListener("click", () => {
    state.saved = [];
    state.completed = [];
    state.completedRoadmap = [];
    saveState();
    render();
  });

  elements.exportPlanButton.addEventListener("click", exportPlanAsExcel);

  window.addEventListener("resize", scheduleWordCloudLayout);
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    const { year: _ignoredYear, ...storedProfile } = stored?.profile || {};
    const profile = { ...defaultState.profile, ...storedProfile };
    if (!["mechanical", "electrical", "chemical"].includes(profile.major)) {
      profile.major = defaultState.profile.major;
    }
    return {
      ...defaultState,
      ...(stored || {}),
      profile,
      selectedTrackId: stored?.selectedTrackId || defaultState.selectedTrackId,
      hasSelectedRoleSelection: Boolean(stored?.hasSelectedRoleSelection),
      roleSearch: typeof stored?.roleSearch === "string" ? stored.roleSearch : defaultState.roleSearch,
      roleGroupFilter: stored?.roleGroupFilter || defaultState.roleGroupFilter,
      view: defaultState.view,
      selectedRoles: { ...defaultState.selectedRoles, ...(stored?.selectedRoles || {}) },
      checked: stored?.checked || defaultState.checked,
      saved: Array.isArray(stored?.saved) ? stored.saved : defaultState.saved,
      completed: Array.isArray(stored?.completed) ? stored.completed : defaultState.completed,
      completedRoadmap: Array.isArray(stored?.completedRoadmap) ? stored.completedRoadmap : defaultState.completedRoadmap
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function normalizeView(view, fallback = "roadmap") {
  if (view === "library" || view === "education") return "references";
  if (primaryViews.includes(view)) return view;
  return fallback;
}

function render() {
  elements.majorSelect.value = state.profile.major;
  elements.industrySelect.value = state.profile.industry;
  elements.goalSelect.value = state.profile.goal;
  elements.durationSelect.value = state.profile.durationWeeks;
  elements.roleSearchInput.value = state.roleSearch || "";
  elements.roleGroupFilter.value = state.roleGroupFilter || "all";
  const changedTrack = syncSelectedTrackWithProfile();
  if (changedTrack) saveState();
  renderViews();
  renderProfileImpact();
  renderTracks();
  renderTrackDetail();
  renderDiagnostics();
  renderRoadmap();
  renderReferences();
  renderSaved();
  renderMetrics();
  scheduleWordCloudLayout();
}

function renderViews() {
  state.view = normalizeView(state.view);
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === `${state.view}View`);
  });
  renderWorkflowStatus();
  renderRoleContextBar();
  scheduleWordCloudLayout();
}

function renderWorkflowStatus() {
  if (!elements.workflowStatus || !elements.nextActionPanel) return;

  if (!hasActiveRoleSelection()) {
    const steps = getWorkflowSteps({ track: null, role: null, checkedCount: 0, score: 0, gapCount: 0, savedCount: 0, taskCount: 0 });
    elements.workflowStatus.innerHTML = steps.map((step, index) => `
      <button class="workflow-step ${index === 0 ? "is-active" : ""} ${step.optional ? "is-optional" : ""}" type="button" data-view-target="${step.view}">
        <span class="workflow-step-number">${index + 1}</span>
        <span>
          <strong>${step.title}</strong>
          <em>${step.status}</em>
        </span>
      </button>
    `).join("");
    elements.nextActionPanel.innerHTML = `
      <p class="eyebrow">다음 행동</p>
      <h3>지원하려는 직무를 먼저 선택하세요</h3>
      <p>직무를 선택하면 워드클라우드, 반복 업무, 자격조건, 우대역량, 전공 연결성이 바로 아래에 열립니다.</p>
      <button class="primary-button full-width" type="button" data-view-target="tracks">직무 선택</button>
    `;
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const diagnosticItems = getDiagnosticItems(track);
  const checkedCount = diagnosticItems.filter((item) => state.checked[item.id]).length;
  const score = getDiagnosticScore(track.id);
  const gapCount = getGapItems(track.id).length;
  const savedCount = getSavedResources().length;
  const taskCount = getVisibleRoadmapTasks(track.id).length;
  const steps = getWorkflowSteps({ track, role, checkedCount, score, gapCount, savedCount, taskCount });
  const activeIndex = Math.max(steps.findIndex((step) => step.view === state.view), 0);

  elements.workflowStatus.innerHTML = steps.map((step, index) => `
    <button class="workflow-step ${index === activeIndex ? "is-active" : ""} ${step.complete ? "is-complete" : ""} ${step.optional ? "is-optional" : ""}" type="button" data-view-target="${step.view}">
      <span class="workflow-step-number">${index + 1}</span>
      <span>
        <strong>${step.title}</strong>
        <em>${step.status}</em>
      </span>
    </button>
  `).join("");

  const nextStep = getNextWorkflowStep(steps, activeIndex);
  elements.nextActionPanel.innerHTML = `
    <p class="eyebrow">다음 행동</p>
    <h3>${nextStep.title}</h3>
    <p>${nextStep.body}</p>
    <button class="${nextStep.primary ? "primary-button" : "ghost-button"} full-width" type="button" data-view-target="${nextStep.view}">${nextStep.action}</button>
  `;
}

function getWorkflowSteps({ track, role, checkedCount, score, gapCount, savedCount, taskCount }) {
  return [
    {
      view: "tracks",
      title: "직무 판단",
      status: role ? `${role.title}` : "선택 전",
      complete: hasActiveRoleSelection() && Boolean(role)
    },
    {
      view: "diagnosis",
      title: "역량 체크",
      status: checkedCount ? `${checkedCount}개 체크 · ${score}%` : "체크 전",
      complete: checkedCount > 0
    },
    {
      view: "roadmap",
      title: "교육 선택",
      status: gapCount ? `보완 ${gapCount}개 기준` : "추천 교육 확인",
      complete: hasActiveRoleSelection() && checkedCount > 0
    },
    {
      view: "saved",
      title: "내 커리큘럼",
      status: hasActiveRoleSelection() ? `${taskCount || 0}주 구성 · 선택 ${savedCount}개` : "직무 선택 후",
      complete: hasActiveRoleSelection()
    },
    {
      view: "references",
      title: "참고자료",
      status: "필요할 때만 보기",
      complete: false,
      optional: true
    }
  ];
}

function getNextWorkflowStep(steps, activeIndex) {
  if (!hasActiveRoleSelection()) {
    return {
      view: "tracks",
      title: "직무를 선택해야 시작됩니다",
      body: "전공과 관심 산업에 맞는 추천순 목록에서 실제 지원하려는 세부 직무를 고르세요.",
      action: "직무 선택",
      primary: true
    };
  }

  const diagnosisStep = steps.find((step) => step.view === "diagnosis");
  if (!diagnosisStep.complete) {
    return {
      view: "diagnosis",
      title: "보유한 역량을 먼저 체크하세요",
      body: "지원 직무에서 이미 갖춘 역량을 제외해야 로드맵이 부족 역량 중심으로 좁혀집니다.",
      action: "역량 체크",
      primary: true
    };
  }

  if (state.view !== "roadmap" && state.view !== "references" && state.view !== "saved") {
    return {
      view: "roadmap",
      title: "추천 교육을 확인하고 고르세요",
      body: "부족 역량과 첫 산출물에 맞춰 자동 추천된 교육을 먼저 훑고, 필요한 자료만 내 커리큘럼에 추가하세요.",
      action: "교육 선택",
      primary: true
    };
  }

  if (state.view === "roadmap" || state.view === "references") {
    return {
      view: "saved",
      title: "내 커리큘럼을 확인하세요",
      body: "고른 교육과 자동 배치된 주차별 과제를 한 화면에서 확인하고, 엑셀 커리큘럼으로 내보낼 수 있습니다.",
      action: "내 커리큘럼 확인",
      primary: true
    };
  }

  if (state.view === "saved") {
    return {
      view: "references",
      title: "더 필요한 자료만 참고하세요",
      body: "전체 자료 보관함은 보조 영역입니다. 내 커리큘럼에 부족한 유형이 있을 때만 분야별로 추가 확인하세요.",
      action: "참고자료 보기",
      primary: false
    };
  }

  return {
    view: "roadmap",
    title: "지원 회사 공고와 다시 대조하세요",
    body: "일반 직무 기반 추천이므로 회사별 직무상세의 업무, 자격요건, 우대사항과 맞는 항목을 우선하세요.",
    action: "교육 다시 확인",
    primary: false
  };
}

function renderRoleContextBar() {
  if (!elements.roleContextBar) return;
  if (!hasActiveRoleSelection()) {
    elements.roleContextBar.innerHTML = `
      <div class="role-context-main">
        <span>현재 기준</span>
        <strong>선택한 직무 없음</strong>
        <em>${getMajorLabel()} · ${getIndustryLabel()} 기준 추천 목록을 보고 있습니다.</em>
      </div>
      <div class="role-context-summary">
        <strong>먼저 할 일</strong>
        <span>지원하려는 세부 직무를 선택하면 직무상세와 부족 역량 로드맵이 생성됩니다.</span>
      </div>
      <div class="role-context-actions">
        <button class="primary-button" type="button" data-view-target="tracks">직무 선택</button>
      </div>
    `;
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const diagnosticItems = getDiagnosticItems(track);
  const checkedCount = diagnosticItems.filter((item) => state.checked[item.id]).length;
  const gapItems = getGapItems(track.id);
  const aiProfile = getRoleAiCompetencyProfile(role);
  const output = role ? getRoleCurriculumOutput(track, role) : track.outputs[0];
  const majorLabel = getMajorPathwayLabel(track, role);
  const gapPreview = gapItems.length
    ? gapItems.slice(0, 3).map((item) => item.skill).join(", ")
    : "큰 공백 없음";

  elements.roleContextBar.innerHTML = `
    <div class="role-context-main">
      <span>현재 기준</span>
      <strong>${role?.title || track.title}</strong>
      <em>${track.title} · ${getMajorLabel()} ${majorLabel}</em>
    </div>
    <div class="role-context-stats" aria-label="선택 직무 준비 현황">
      <span><strong>${checkedCount}/${diagnosticItems.length}</strong>확보 체크</span>
      <span><strong>${gapItems.length}개</strong>보완 역량</span>
      <span><strong>${getDurationLabel()}</strong>${learningGoals[state.profile.goal]?.label || "준비"}</span>
      ${aiProfile ? `<span><strong>${aiProfile.level}</strong>AI·데이터</span>` : ""}
    </div>
    <div class="role-context-summary">
      <strong>이번 계획의 결과물</strong>
      <span>${output}</span>
      <em>우선 보완: ${gapPreview}</em>
    </div>
    <div class="role-context-actions">
      <button class="ghost-button" type="button" data-view-target="tracks">직무 상세</button>
      <button class="primary-button" type="button" data-view-target="diagnosis">역량 체크</button>
      <button class="ghost-button" type="button" data-view-target="roadmap">교육 선택</button>
      <button class="ghost-button" type="button" data-view-target="saved">내 커리큘럼</button>
    </div>
  `;
}

function renderProfileImpact() {
  if (!elements.profileImpactPanel) return;
  const catalog = getRoleCatalog({ applyRoleFilters: false });
  const directCount = catalog.filter(({ track: itemTrack, role: itemRole }) => getMajorPathway(itemTrack, itemRole) === "direct").length;
  const bridgeCount = catalog.filter(({ track: itemTrack, role: itemRole }) => getMajorPathway(itemTrack, itemRole) === "bridge").length;
  const topRoles = catalog.slice(0, 3).map(({ role: itemRole }) => itemRole.title);
  const goalRule = goalScoringRules[state.profile.goal] || goalScoringRules.foundation;
  const selectedText = hasActiveRoleSelection()
    ? `${getSelectedRole(getSelectedTrack().id)?.title || "선택 직무"} 기준`
    : "직무 선택 전 추천 기준";

  elements.profileImpactPanel.innerHTML = `
    <div>
      <strong>${getMajorLabel()} 기준: ${selectedText}</strong>
      <span>직결 ${directCount}개 · 확장 ${bridgeCount}개를 먼저 올립니다.</span>
      <em>${topRoles.join(" / ")}</em>
    </div>
    <div>
      <strong>${goalRule.label} 완료 기준</strong>
      <span>${goalRule.roadmap}</span>
      <em>${goalRule.resource}</em>
    </div>
  `;
}

function getSelectedTrack() {
  return tracks.find((track) => track.id === state.selectedTrackId) || tracks[0];
}

function hasActiveRoleSelection() {
  return Boolean(state.hasSelectedRoleSelection && state.selectedTrackId);
}

function getFilteredTracks() {
  return tracks.filter((track) => {
    const industryMatch = state.profile.industry === "all" || track.industries.includes(state.profile.industry);
    return industryMatch;
  });
}

function syncSelectedTrackWithProfile() {
  const filtered = getFilteredTracks();
  if (!filtered.length) return false;
  let changed = false;

  if (!hasActiveRoleSelection()) return false;

  const roleCatalog = getRoleCatalog();
  let selectedRole = getSelectedRole(state.selectedTrackId);
  const selectedRoleId = selectedRole?.id;
  const currentSelectionVisible = roleCatalog.some(({ track, role }) => (
    track.id === state.selectedTrackId && role.id === selectedRoleId
  ));

  if (roleCatalog.length && !currentSelectionVisible) {
    const firstMatch = roleCatalog[0];
    state.selectedTrackId = firstMatch.track.id;
    state.selectedRoles = { ...state.selectedRoles, [firstMatch.track.id]: firstMatch.role.id };
    state.hasSelectedRoleSelection = true;
    return true;
  }

  if (!filtered.some((track) => track.id === state.selectedTrackId)) {
    state.selectedTrackId = filtered[0].id;
    selectedRole = getSelectedRole(state.selectedTrackId);
    changed = true;
  }

  if (selectedRole && state.selectedRoles[state.selectedTrackId] !== selectedRole.id) {
    state.selectedRoles = { ...state.selectedRoles, [state.selectedTrackId]: selectedRole.id };
    changed = true;
  }

  return changed;
}

function getAvailableRoles(track) {
  const roles = jobRoles[track?.id] || [];
  if (!roles.length || state.profile.industry === "all") return roles;

  const industryMatched = roles.filter((role) => role.industries.includes(state.profile.industry));
  if (industryMatched.length) return industryMatched;
  const genericRoles = roles.filter((role) => role.industries.includes("all"));
  return genericRoles.length ? genericRoles : roles;
}

function getSelectedRole(trackId = state.selectedTrackId) {
  if (!trackId) return null;
  const track = tracks.find((item) => item.id === trackId);
  const roles = getAvailableRoles(track);
  if (!roles.length) return null;

  const selectedRoleId = state.selectedRoles?.[trackId];
  return roles.find((role) => role.id === selectedRoleId) || roles[0];
}

function getDurationWeeks() {
  const weeks = Number(state.profile.durationWeeks || defaultState.profile.durationWeeks);
  return Number.isFinite(weeks) ? weeks : Number(defaultState.profile.durationWeeks);
}

function getDurationLabel() {
  return durationLabels[state.profile.durationWeeks] || `${getDurationWeeks()}주`;
}

function getDurationStrategy() {
  return durationStrategies[state.profile.durationWeeks] || durationStrategies["4"];
}

function getIndustryLabel(industry = state.profile.industry) {
  return industryLabels[industry] || industry;
}

function getMajorLabel(major = state.profile.major) {
  return majorLabels[major] || major;
}

function getMajorRoleFit(track, role, major = state.profile.major) {
  if (!track || major === "both") {
    return {
      level: "direct",
      reason: "공학계열 전체 기준으로 직무 연결 가능성을 우선 보여줍니다.",
      focus: "세부 전공보다 선택 직무의 보유 역량 체크 결과를 기준으로 로드맵을 구성합니다."
    };
  }

  const majorLabel = getMajorLabel(major);
  const profile = majorRoleFitProfiles[major];
  if (role && profile?.direct.includes(role.id)) {
    return {
      level: "direct",
      reason: `${majorLabel} 전공지식이 ${role.title}의 반복 업무와 직접 맞닿아 있습니다.`,
      focus: "체크하지 못한 역량 항목만 보완하면 바로 로드맵 우선순위에 반영됩니다."
    };
  }
  if (role && profile?.bridge.includes(role.id)) {
    return {
      level: "bridge",
      reason: `${majorLabel} 전공자가 프로젝트와 보완 학습으로 확장 진입할 수 있는 세부 직무입니다.`,
      focus: profile.bridgeFocus
    };
  }

  if (track.majors.includes(major)) {
    return {
      level: "direct",
      reason: `${majorLabel} 전공과 직접 맞닿은 직무군입니다.`,
      focus: "세부 직무를 고른 뒤 보유 역량을 체크하면 부족 항목만 로드맵에 우선 반영됩니다."
    };
  }
  if ((majorBridgeTracks[major] || []).includes(track.id)) {
    return {
      level: "bridge",
      reason: `${majorLabel} 전공자가 보완 학습으로 확장할 수 있는 직무군입니다.`,
      focus: profile?.bridgeFocus || "직무 언어와 도구 역량을 보완하면 진입 가능성이 커집니다."
    };
  }
  return {
    level: "explore",
    reason: `${majorLabel} 전공자는 이 직무의 필수 언어와 산출물을 먼저 확인해야 합니다.`,
    focus: "역량 체크에서 모르는 항목이 많으면 탐색 단계 로드맵으로 시작하는 편이 좋습니다."
  };
}

function getMajorPathway(track, role = null, major = state.profile.major) {
  const fit = getMajorRoleFit(track, role, major);
  return typeof fit === "string" ? fit : fit.level;
}

function getMajorPathwayLabel(track, role = null, major = state.profile.major) {
  return {
    direct: "전공 직결",
    bridge: "확장 가능",
    explore: "탐색 가능"
  }[getMajorPathway(track, role, major)];
}

function getMajorPathwayReason(track, role = null, major = state.profile.major) {
  const fit = getMajorRoleFit(track, role, major);
  return typeof fit === "string"
    ? getMajorRoleFit(track, null, major).reason
    : fit.reason;
}

function getMajorPathwayFocus(track, role = null, major = state.profile.major) {
  const fit = getMajorRoleFit(track, role, major);
  return typeof fit === "string" ? "" : fit.focus;
}

function renderTracks() {
  const roleCatalog = getRoleCatalog();
  const selectedTrack = getSelectedTrack();
  const selectedRole = getSelectedRole(selectedTrack.id);
  elements.trackCount.textContent = `${roleCatalog.length}개 세부 직무 · ${getMajorLabel()} 추천순`;
  if (elements.selectedRoleOverview) {
    elements.selectedRoleOverview.innerHTML = hasActiveRoleSelection()
      ? renderSelectedRoleOverview(selectedTrack, selectedRole)
      : renderRoleSelectionPrompt(roleCatalog);
  }

  if (!roleCatalog.length) {
    elements.trackList.innerHTML = `
      <div class="empty-state">
        검색 조건과 맞는 채용공고 직무가 없습니다. 직무군을 전체로 바꾸거나 검색어를 줄여보세요.
      </div>
    `;
    return;
  }

  elements.trackList.innerHTML = roleCatalog.map(({ track, role, score }, index) => {
    const selectedRole = getSelectedRole(track.id);
    const isSelected = track.id === state.selectedTrackId && selectedRole?.id === role.id;
    const recommendationLabel = index < 3 && score > 0 ? `추천 ${index + 1} · ${track.title}` : track.title;
    const majorPathwayLabel = getMajorPathwayLabel(track, role);
    const roleCard = `
    <button class="track-card ${isSelected ? "is-selected" : ""}" type="button" data-track-id="${track.id}" data-role-id="${role.id}" aria-expanded="${isSelected ? "true" : "false"}">
      <span class="status-pill">${recommendationLabel}</span>
      <h3>${role.title}</h3>
      <p>${role.focus}</p>
      <p class="role-preview">${role.responsibilities.slice(0, 2).join(" · ")}</p>
      <span class="badge-row">
        <span class="badge major-pathway-badge">${majorPathwayLabel}</span>
        ${role.postingKeywords.slice(0, 5).map((keyword) => `<span class="badge">${keyword}</span>`).join("")}
      </span>
    </button>
  `;
    return roleCard;
  }).join("");

  elements.trackList.querySelectorAll("[data-track-id][data-role-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTrackId = button.dataset.trackId;
      state.selectedRoles = { ...state.selectedRoles, [button.dataset.trackId]: button.dataset.roleId };
      state.hasSelectedRoleSelection = true;
      state.view = "tracks";
      saveState();
      render();
      focusSelectedRoleOverview();
    });
  });
  bindResourceActions(elements.selectedRoleOverview);
}

function renderRoleSelectionPrompt(roleCatalog) {
  const topRoles = roleCatalog.slice(0, 3).map(({ role }) => role.title);
  return `
    <article class="selection-prompt-panel">
      <div>
        <p class="eyebrow">아직 선택 전</p>
        <h3>아래 추천 직무 중 실제 지원하려는 직무를 먼저 고르세요</h3>
        <p>선택 후에는 같은 위치에 워드클라우드, 반복 업무, 자격조건, 우대역량, 전공 연결성, 교육 후보가 열립니다.</p>
      </div>
      ${topRoles.length ? `
        <div class="badge-row">
          ${topRoles.map((roleTitle) => `<span class="badge">${roleTitle}</span>`).join("")}
        </div>
      ` : ""}
    </article>
  `;
}

function focusSelectedRoleOverview() {
  requestAnimationFrame(() => {
    elements.selectedRoleOverview?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderSelectedRoleOverview(track = getSelectedTrack(), role = getSelectedRole(track.id)) {
  if (!role) return "";

  const evidence = getHiringEvidence(track, role);
  const context = getRecommendationContext(track, getGapSkills(track.id), getVisibleRoadmapTasks(track.id));
  const quickResources = uniqueResources([
    ...getRoleLinkedResources(role),
    ...getRecommendedResources(track, context)
  ]).slice(0, 3);
  const diagnosticItems = getDiagnosticItems(track);
  const checkedCount = diagnosticItems.filter((item) => state.checked[item.id]).length;
  const gapItems = getGapItems(track.id);
  const output = getRoleCurriculumOutput(track, role);

  return `
    <article class="selected-role-overview" aria-live="polite" aria-label="${role.title} 선택 직무 요약">
      <div class="selected-role-anchor">
        <span>선택 직무 판단 보드</span>
        <strong>${role.title}</strong>
      </div>
      ${renderRoleDecisionDashboard(track, role, checkedCount, diagnosticItems.length, gapItems, output)}
      <div class="selected-role-top">
        <div class="selected-role-summary">
          <p class="eyebrow">선택한 직무를 먼저 판단하세요</p>
          <h3>${role.title}</h3>
          <p>${role.focus}</p>
          <div class="role-decision-mini">
            <strong>지원 전 확인 질문</strong>
            <ul>
              ${getRoleDecisionQuestions(track, role).slice(0, 2).map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="selected-role-search">
            <strong>채용 사이트에서는 직접 검색</strong>
            <span>검색어 예시: ${evidence.query}</span>
            <div class="evidence-links">
              ${evidence.links.map((link) => `<a class="resource-action" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
            </div>
          </div>
          ${quickResources.length ? `
            <div class="selected-role-resources">
              <strong>교육 선택 전 미리 볼 후보</strong>
              ${quickResources.map((resource) => `
                <span>
                  <em>${resource.title}</em>
                  <small>${resource.provider} · ${resource.type}</small>
                  <small>
                    <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
                  </small>
                </span>
              `).join("")}
            </div>
          ` : ""}
          <div class="flow-actions">
            <button class="primary-button" type="button" data-view-target="diagnosis">역량 체크하기</button>
            <button class="ghost-button" type="button" data-view-target="roadmap">교육 후보 보기</button>
          </div>
        </div>
        ${renderRoleWordCloud(track, role, "is-featured")}
      </div>
      <section class="selected-role-detail-panel" aria-label="${role.title} 선택직무 상세">
        <div class="selected-role-detail-head">
          <div>
            <p class="eyebrow">선택직무 상세</p>
            <h3>${role.title}에서 실제로 확인할 내용</h3>
          </div>
          <div class="badge-row">
            ${role.postingKeywords.map((keyword) => `<span class="badge">${keyword}</span>`).join("")}
          </div>
        </div>
        <div class="role-detail-grid is-prominent">
          ${detailBlock("채용공고 반복 업무", role.responsibilities)}
          ${detailBlock("자격조건·필수 역량", role.requirements)}
          ${detailBlock("우대·차별화 역량", role.preferred)}
        </div>
        ${renderRoleAiCompetencyPanel(role)}
        <div class="company-detail-inline">
          <strong>지원 회사 공고와 대조</strong>
          위 반복업무·자격조건·우대역량 중 지원 회사 공고에 실제로 적힌 문장을 표시한 뒤, 없는 내용은 로드맵 우선순위에서 낮추세요.
        </div>
      </section>
      ${renderMajorConnectionPanel(track, role)}
      ${renderExpertReviewPanel(track, role)}
      ${renderRoleFitPanel(track, role)}
    </article>
  `;
}

function renderRoleDecisionDashboard(track, role, checkedCount, totalCount, gapItems, output) {
  const majorLabel = getMajorPathwayLabel(track, role);
  const gapText = gapItems.length
    ? gapItems.slice(0, 3).map((item) => item.skill).join(", ")
    : "큰 공백 없음";
  const aiProfile = getRoleAiCompetencyProfile(role);
  return `
    <section class="role-decision-dashboard" aria-label="${role.title} 지원 판단 요약">
      <div class="role-decision-card is-strong">
        <span>전공 연결</span>
        <strong>${majorLabel}</strong>
        <em>${getMajorPathwayReason(track, role)}</em>
      </div>
      <div class="role-decision-card">
        <span>역량 체크</span>
        <strong>${checkedCount}/${totalCount}개 확인</strong>
        <em>보완 우선: ${gapText}</em>
      </div>
      <div class="role-decision-card">
        <span>준비 결과물</span>
        <strong>${output}</strong>
        <em>교육자료보다 산출물이 최종 판단 기준입니다.</em>
      </div>
      <div class="role-decision-card">
        <span>AI·데이터</span>
        <strong>${aiProfile ? aiProfile.level : "직무별 필요 시 반영"}</strong>
        <em>${aiProfile ? aiProfile.summary : "공고에 데이터·자동화 표현이 있을 때만 우선순위에 올립니다."}</em>
      </div>
    </section>
  `;
}

function renderRoleAiCompetencyPanel(role) {
  const profile = getRoleAiCompetencyProfile(role);
  if (!profile) return "";
  const diagnosticItems = (profile.diagnostics || []).slice(0, 2);
  return `
    <div class="role-ai-panel" aria-label="${role.title} AI 활용 역량">
      <div>
        <p class="eyebrow">AI·데이터 활용 역량</p>
        <h4>${profile.level} · ${profile.summary}</h4>
      </div>
      <div class="role-ai-grid">
        ${detailBlock("공고에서 보이면 볼 표현", profile.keywords || [])}
        ${detailBlock("준비하면 좋은 증거", diagnosticItems.map(([skill, question]) => `${skill}: ${question}`))}
      </div>
      <p>AI가 직무의 본질을 대체한다는 뜻이 아니라, 해당 직무의 반복 데이터·로그·검사·시험 업무를 더 잘 설명하게 해주는 보조 또는 핵심 역량으로 반영합니다.</p>
    </div>
  `;
}

function getRoleAiCompetencyProfile(role) {
  if (!role) return null;
  if (role.aiCompetency) return role.aiCompetency;
  return createFallbackAiCompetencyProfile(role);
}

function createFallbackAiCompetencyProfile(role) {
  const text = getRoleSearchText({ title: "", summary: "" }, role);
  if (/(CAD|도면|공차|기구|차체|섀시|구동계|열관리|CFD|FEA|해석|시험|검증|DVP|계측|품질|공정|장비|회로|PCB|펌웨어|ECU|CAN|HIL|SIL|ADAS|센서|로그|데이터|수율|불량|MES|SPC|Python|MATLAB)/i.test(text)) {
    const isDataHeavy = /(데이터|로그|수율|불량|MES|SPC|Python|MATLAB|CAN|HIL|SIL|ADAS|센서|계측|검증|시험)/i.test(text);
    return {
      level: isDataHeavy ? "도움 큼" : "보조 역량",
      summary: isDataHeavy
        ? "공고에 로그, 시험, 계측, 데이터 정리 표현이 있으면 분석 자동화와 이상 구간 표시가 준비 차별점이 됩니다."
        : "반복 설계·검토 업무에서 표준 체크리스트, 비교표, 간단한 자동화 스크립트가 준비 근거가 됩니다.",
      keywords: isDataHeavy ? ["데이터 분석", "자동화", "이상탐지"] : ["자동화", "AI 활용", "비교표"],
      requirements: [isDataHeavy ? "직무 데이터를 입력, 기준, 결과 지표로 나누어 설명하는 역량" : "반복 검토 기준을 표와 체크리스트로 구조화하는 역량"],
      preferred: [isDataHeavy ? "Python/MATLAB/Excel 기반 로그·계측 데이터 후처리 경험" : "AI 도구를 활용해 검토표, 요구사항표, 비교표를 정리한 경험"],
      diagnostics: [[isDataHeavy ? "데이터 기반 판단" : "AI 활용 정리", isDataHeavy ? "직무 로그나 시험 데이터를 기준값과 비교해 이상 구간을 표시할 수 있다." : "직무 요구사항을 체크리스트와 산출물 기준으로 구조화할 수 있다."]]
    };
  }

  return null;
}

function getRoleAiDataExercise(role) {
  const profile = getRoleAiCompetencyProfile(role);
  if (!profile) return "";
  const keyword = profile.keywords?.[0] || "데이터 분석";
  return `${keyword} 관점에서 샘플 로그·측정값·공고 문장을 입력, 판단 기준, 결과 지표로 나누어 5줄 표로 정리합니다.`;
}

function renderInlineRoleWordCloud(track, role) {
  return `
    <article class="inline-wordcloud-panel" aria-label="${role.title} 역량 워드클라우드">
      ${renderRoleWordCloud(track, role, "is-inline")}
      <div class="inline-wordcloud-summary">
        <p class="eyebrow">선택 직무 역량</p>
        <h3>${role.title}</h3>
        <p>${role.focus}</p>
        <div class="badge-row">
          ${role.postingKeywords.map((keyword) => `<span class="badge">${keyword}</span>`).join("")}
        </div>
        <div class="role-decision-mini">
          <strong>직무 판단 포인트</strong>
          <ul>
            ${getRoleDecisionQuestions(track, role).slice(0, 2).map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div class="flow-actions">
          <button class="primary-button" type="button" data-view-target="diagnosis">역량 체크하기</button>
          <button class="ghost-button" type="button" data-view-target="roadmap">부족 역량 교육 보기</button>
        </div>
      </div>
    </article>
  `;
}

function getRoleCatalog({ applyRoleFilters = true } = {}) {
  const groupFilter = state.roleGroupFilter || "all";
  const searchTerm = normalizeRoleSearch(state.roleSearch);

  return getFilteredTracks()
    .filter((track) => !applyRoleFilters || groupFilter === "all" || track.id === groupFilter)
    .flatMap((track) => getAvailableRoles(track)
      .filter((role) => !applyRoleFilters || matchesRoleFilters(track, role, searchTerm))
      .map((role) => ({ track, role, score: getRoleCatalogScore(track, role) })))
    .sort((a, b) => b.score - a.score);
}

function getRoleCatalogScore(track, role) {
  let score = 0;

  const majorPathway = getMajorPathway(track, role);
  if (majorPathway === "direct") score += 95;
  if (majorPathway === "bridge") score += 24;
  if (majorPathway === "explore") score -= 80;
  if (state.profile.industry !== "all" && role.industries.includes(state.profile.industry)) score += 60;
  if (state.profile.industry !== "all" && track.industries.includes(state.profile.industry)) score += 20;
  score += Math.min(getRoleLinkedResourceIds(role).length, 8) * 3;
  score += Math.min(role.postingKeywords.length, 6) * 2;

  return score;
}

function matchesRoleFilters(track, role, searchTerm) {
  if (!searchTerm) return true;
  return getRoleSearchText(track, role).includes(searchTerm);
}

function getRoleSearchText(track, role) {
  return normalizeRoleSearch([
    track.title,
    track.summary,
    role.title,
    role.focus,
    ...(role.postingKeywords || []),
    ...(role.responsibilities || []),
    ...(role.requirements || []),
    ...(role.preferred || [])
  ].join(" "));
}

function normalizeRoleSearch(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function renderTrackDetail() {
  if (!hasActiveRoleSelection()) {
    elements.trackDetail.innerHTML = "";
    return;
  }

  const track = getSelectedTrack();
  const selectedRole = getSelectedRole(track.id);

  elements.trackDetail.innerHTML = `
    <details class="track-common-disclosure">
      <summary>
        <span>
          <em class="eyebrow">직무군 공통 참고 정보</em>
          <strong>${track.title}</strong>
          <small>${selectedRole ? `${selectedRole.title} 상세 정보는 위 선택 카드 바로 아래에 모았습니다.` : "같은 직무군에서 함께 쓰이는 공통 정보입니다."}</small>
        </span>
      </summary>
      <div class="track-common-body">
        <div class="detail-grid">
          ${detailBlock("주요 업무", track.tasks)}
          ${detailBlock("핵심 역량", track.skills)}
          ${detailBlock("사용 도구", track.tools)}
          ${detailBlock("포트폴리오 산출물", track.outputs)}
        </div>
        <div class="detail-grid">
          ${detailBlock("흔한 오해", track.misconceptions)}
        </div>
      </div>
    </details>
  `;
}

function getHiringEvidence(track, role) {
  const keywordText = role.postingKeywords.slice(0, 4).join(" ");
  const query = `${role.title} ${keywordText} 채용공고`;
  const encodedQuery = encodeURIComponent(query);
  return {
    query,
    links: [
      { label: "잡코리아 열기", url: "https://www.jobkorea.co.kr/" },
      { label: "사람인 열기", url: "https://www.saramin.co.kr/" },
      { label: "웹 검색", url: `https://duckduckgo.com/?q=${encodedQuery}` }
    ]
  };
}

function renderRoleWordCloud(track, role, modifier = "") {
  const terms = getRoleWordCloudTerms(track, role).slice(0, 20);
  return `
    <figure class="word-cloud-panel ${modifier}" aria-label="${role.title} 직무 키워드 워드클라우드">
      <div class="word-cloud-terms">
        ${terms.map((term, index) => renderWordCloudTerm(term, index, index === 0)).join("")}
      </div>
      <figcaption>${role.title} 직무상세의 주요 업무, 자격요건, 우대역량에서 반복되는 단어일수록 크게 표시합니다.</figcaption>
    </figure>
  `;
}

function renderWordCloudTerm(term, index, isPrimary = false) {
  return `<span class="word-cloud-term ${isPrimary ? "is-primary" : ""} weight-${term.level}" style="${getWordCloudTermStyle(term, index)}">${term.word}</span>`;
}

function getWordCloudTermStyle(term, index) {
  const size = (0.78 + Math.pow(term.level, 1.14) * 0.23).toFixed(2);
  const opacity = (0.68 + term.level * 0.05).toFixed(2);
  return `--size:${size}rem;--opacity:${opacity};--z:${term.level};`;
}

function scheduleWordCloudLayout() {
  if (wordCloudLayoutFrame) cancelAnimationFrame(wordCloudLayoutFrame);
  wordCloudLayoutFrame = requestAnimationFrame(() => {
    wordCloudLayoutFrame = null;
    layoutWordClouds();
  });
}

function layoutWordClouds() {
  document.querySelectorAll(".word-cloud-terms").forEach(layoutWordCloud);
}

function layoutWordCloud(container) {
  const containerRect = container.getBoundingClientRect();
  if (containerRect.width < 80 || containerRect.height < 80) return;

  const terms = Array.from(container.querySelectorAll(".word-cloud-term"));
  if (!terms.length) return;

  container.classList.add("is-layout-ready");
  terms.forEach((term) => {
    term.hidden = false;
    term.style.left = "50%";
    term.style.top = "50%";
  });

  const width = container.clientWidth;
  const height = container.clientHeight;
  const padding = width < 420 ? 14 : 18;
  const centerX = width / 2;
  const centerY = height / 2;
  const primary = terms.find((term) => term.classList.contains("is-primary")) || terms[0];
  const placed = [];

  placeWordCloudTerm(primary, centerX, centerY, placed, padding, width, height);

  const orderedTerms = terms
    .filter((term) => term !== primary)
    .sort((a, b) => Number(b.style.getPropertyValue("--z")) - Number(a.style.getPropertyValue("--z")));

  orderedTerms.forEach((term, index) => {
    const position = findCloudPosition(term, index, placed, width, height, padding);
    if (!position) {
      term.hidden = true;
      return;
    }
    placeWordCloudTerm(term, position.x, position.y, placed, padding, width, height);
  });

  pruneWordCloudOverlaps(container);
}

function placeWordCloudTerm(term, x, y, placed, padding, width, height) {
  term.style.left = `${Math.round(x)}px`;
  term.style.top = `${Math.round(y)}px`;
  const box = getWordCloudBox(term, x, y);
  box.left = Math.max(padding, Math.min(box.left, width - padding - box.width));
  box.top = Math.max(padding, Math.min(box.top, height - padding - box.height));
  box.right = box.left + box.width;
  box.bottom = box.top + box.height;
  term.style.left = `${Math.round(box.left + box.width / 2)}px`;
  term.style.top = `${Math.round(box.top + box.height / 2)}px`;
  placed.push(box);
}

function findCloudPosition(term, index, placed, width, height, padding) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) * 0.48;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const startAngle = index * goldenAngle;

  for (let step = 0; step < 900; step += 1) {
    const radius = 14 + Math.sqrt(step) * (maxRadius / 7);
    const angle = startAngle + step * 0.42;
    const x = centerX + Math.cos(angle) * radius * 1.05;
    const y = centerY + Math.sin(angle) * radius * 0.72;
    const box = getWordCloudBox(term, x, y);

    if (box.left < padding || box.top < padding || box.right > width - padding || box.bottom > height - padding) continue;
    if (!isBoxInsideCloud(box, width, height, padding)) continue;
    if (hasWordCloudCollision(box, placed)) continue;
    return { x, y };
  }

  return findFallbackCloudPosition(term, placed, width, height, padding);
}

function findFallbackCloudPosition(term, placed, width, height, padding) {
  const step = 6;
  for (let y = padding; y < height - padding; y += step) {
    for (let x = padding; x < width - padding; x += step) {
      const box = getWordCloudBox(term, x, y);
      if (box.left < padding || box.top < padding || box.right > width - padding || box.bottom > height - padding) continue;
      if (isBoxInsideCloud(box, width, height, padding) && !hasWordCloudCollision(box, placed)) {
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
      }
    }
  }

  return null;
}

function getWordCloudBox(term, x, y) {
  const width = term.offsetWidth;
  const height = term.offsetHeight;
  return {
    left: x - width / 2,
    top: y - height / 2,
    right: x + width / 2,
    bottom: y + height / 2,
    width,
    height
  };
}

function hasWordCloudCollision(box, placed) {
  const gap = 2;
  return placed.some((other) => (
    box.left < other.right + gap
    && box.right > other.left - gap
    && box.top < other.bottom + gap
    && box.bottom > other.top - gap
  ));
}

function pruneWordCloudOverlaps(container) {
  const visibleBoxes = [];
  Array.from(container.querySelectorAll(".word-cloud-term")).forEach((term) => {
    const rect = term.getBoundingClientRect();
    const box = {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height
    };

    if (hasWordCloudCollision(box, visibleBoxes)) {
      term.hidden = true;
      return;
    }
    visibleBoxes.push(box);
  });
}

function isBoxInsideCloud(box, width, height, padding) {
  const points = [
    [box.left, box.top],
    [box.right, box.top],
    [box.left, box.bottom],
    [box.right, box.bottom],
    [box.left + box.width / 2, box.top + box.height / 2]
  ];
  return points.every(([x, y]) => isPointInsideWordCloud(x, y, width, height, padding));
}

function isPointInsideWordCloud(x, y, width, height, padding) {
  const px = x / width;
  const py = y / height;
  const ellipseX = (x - width / 2) / ((width - padding * 2) * 0.48);
  const ellipseY = (y - height / 2) / ((height - padding * 2) * 0.39);
  if (ellipseX * ellipseX + ellipseY * ellipseY <= 1) return true;

  const lobes = [
    [0.28, 0.47, 0.24],
    [0.41, 0.34, 0.25],
    [0.57, 0.33, 0.27],
    [0.72, 0.49, 0.24],
    [0.38, 0.66, 0.24],
    [0.61, 0.67, 0.25]
  ];
  return lobes.some(([cx, cy, radius]) => {
    const dx = (px - cx) / radius;
    const dy = (py - cy) / (radius * 0.78);
    return dx * dx + dy * dy <= 1;
  });
}

function renderRoleFitPanel(track, role) {
  return `
    <div class="role-fit-panel" aria-label="${role.title} 직무 적합성 판단">
      ${roleFitBlock("맞는 신호", getRoleFitSignals(track, role))}
      ${roleFitBlock("주의 신호", getRoleCautionSignals(track, role))}
      ${roleFitBlock("지원 전 확인 질문", getRoleDecisionQuestions(track, role))}
      ${roleFitBlock("산출물 예시", getRoleArtifactExamples(track, role))}
    </div>
  `;
}

function renderExpertReviewPanel(track, role) {
  const reviewItems = getExpertReviewItems(track, role);
  return `
    <details class="expert-review-panel">
      <summary>
        <span>
          <em class="eyebrow">직무 전문가 검토</em>
          <strong>${role.title} 내용·교육과정 연결성</strong>
        </span>
      </summary>
      <div class="expert-review-grid">
        ${reviewItems.map((item) => `
          <div class="expert-review-item">
            <strong>${item.title}</strong>
            <p>${item.body}</p>
          </div>
        `).join("")}
      </div>
    </details>
  `;
}

function getExpertReviewItems(track, role) {
  const diagnosticItems = roleDiagnostics[role.id] || diagnostics[track.id] || [];
  const linkedResources = getRoleLinkedResources(role);
  const primaryResource = linkedResources.find((resource) => getRoleKeywordMatches(resource, role).length)
    || linkedResources.find((resource) => resource.core)
    || linkedResources[0];
  const directResourceCount = linkedResources.filter((resource) => !/search|results\?|query=|courses\/free\/?$/i.test(resource.url || "")).length;
  const output = getRoleCurriculumOutput(track, role);
  const expertSkillText = diagnosticItems.slice(0, 3).map(([skill]) => skill).join(", ");
  const keywordText = role.postingKeywords.slice(0, 3).join(", ");

  return [
    {
      title: "직무 내용",
      body: `${role.responsibilities[0]} 업무를 반복 업무의 중심으로 봅니다. 공고에서 ${keywordText} 같은 키워드가 실제 업무·자격요건에 같이 나오면 이 직무와의 연결성이 높습니다.`
    },
    {
      title: "필수 역량",
      body: `전문가 관점에서는 ${expertSkillText} 항목을 말로만 설명하는 것보다 ${output}처럼 제출 가능한 산출물로 남기는지가 중요합니다.`
    },
    {
      title: "교육과정",
      body: `${linkedResources.length}개 후보 중 ${directResourceCount}개는 바로 열 수 있는 자료입니다. ${primaryResource ? `${primaryResource.title}부터 보고` : "공식·검토 자료부터 보고"} 보유 역량 체크에서 빠진 항목만 로드맵에 남기도록 구성했습니다.`
    }
  ];
}

function getRoleLinkedResources(role) {
  const linkedIds = getRoleLinkedResourceIds(role);
  return linkedIds
    .map((id) => resources.find((resource) => resource.id === id))
    .filter(Boolean);
}

function getRoleCurriculumOutput(track, role) {
  if (role.title.includes("검증") || role.title.includes("시험")) return "시험계획서와 Pass/Fail 검증 리포트";
  if (role.title.includes("품질") || role.title.includes("공정")) return "조건 변경 검토표와 개선 보고서";
  if (role.title.includes("설계") || role.title.includes("하드웨어")) return "요구사항표, 설계 검토표, 측정 리포트";
  if (role.title.includes("데이터") || role.title.includes("수율")) return "분석 노트북과 원인 가설 리포트";
  if (role.title.includes("펌웨어") || role.title.includes("소프트웨어") || role.title.includes("제어")) return "동작 로그, 테스트 케이스, README";
  return track.outputs[0] || "직무 산출물";
}

function renderMajorConnectionPanel(track, role) {
  const label = getMajorPathwayLabel(track, role);
  const reason = getMajorPathwayReason(track, role);
  const focus = getMajorPathwayFocus(track, role);
  const badges = getMajorConnectionBadges(track, role);
  return `
    <div class="major-connection-panel" aria-label="${getMajorLabel()} 전공과 ${role.title} 연결성">
      <div>
        <p class="eyebrow">전공 연결성</p>
        <h4>${getMajorLabel()} → ${role.title}</h4>
      </div>
      <p><strong>${label}</strong> ${reason} ${focus}</p>
      <div class="badge-row">
        ${badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}
      </div>
    </div>
  `;
}

function getMajorConnectionBadges(track, role) {
  const pathway = getMajorPathway(track, role);
  const base = role.postingKeywords.slice(0, 3);
  if (pathway === "direct") return [...base, "미체크 역량만 보완"];
  if (pathway === "bridge") return [...base.slice(0, 2), "전공 확장", "보완 로드맵 필요"];
  return [...base.slice(0, 2), "직무 탐색", "기초 확인 우선"];
}

function roleFitBlock(title, items) {
  return `
    <div class="role-fit-block">
      <h4>${title}</h4>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function getRoleWordCloudTerms(track, role) {
  const weightedTerms = [];
  addWeightedRoleTerms(weightedTerms, role.postingKeywords, 24);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.responsibilities), 19);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.requirements), 17);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.focus), 15);
  addWeightedRoleTerms(weightedTerms, extractRoleTerms(role.preferred), 12);

  const scoreMap = new Map();
  weightedTerms.forEach(({ word, weight }) => {
    const cleanWord = cleanRoleTerm(word);
    const key = getRoleTermKey(cleanWord);
    if (!key || cleanWord.length < 2) return;
    const current = scoreMap.get(key) || { word: cleanWord, score: 0 };
    current.score += weight;
    scoreMap.set(key, current);
  });

  const terms = [...scoreMap.values()].sort((a, b) => b.score - a.score);
  const maxScore = terms[0]?.score || 1;
  return terms.map((term) => ({
    ...term,
    level: Math.max(1, Math.min(6, Math.ceil((term.score / maxScore) * 6)))
  }));
}

function addWeightedRoleTerms(target, words, weight) {
  (words || []).forEach((word) => {
    String(word || "")
      .split(/[\/·]/)
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((part) => target.push({ word: part, weight }));
  });
}

function extractRoleTerms(values) {
  const text = (Array.isArray(values) ? values : [values]).join(" ");
  const normalized = text
    .replace(/[.,;:()[\]{}"'`]/g, " ")
    .replace(/[·\/]/g, " ")
    .replace(/\s+/g, " ");

  return normalized.split(" ")
    .map((part) => cleanRoleTerm(part).replace(/(에서|으로|부터|까지|처럼|에게|와|과|을|를|이|가|은|는|의|에|로|도|만)$/g, ""))
    .filter((part) => part.length >= 2)
    .filter((part) => !roleTermStopWords.has(part))
    .filter((part) => !part.includes("합니다"));
}

function cleanRoleTerm(word) {
  return String(word || "")
    .replace(/[^0-9A-Za-z가-힣+#\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getRoleTermKey(word) {
  return word.toLowerCase().replace(/[\s\/-]+/g, "");
}

const roleTermStopWords = new Set([
  "직무", "엔지니어", "담당", "기초", "이해", "활용", "작성", "정리", "관리", "기반",
  "경험", "역량", "조건", "결과", "문서화", "리포트", "계획", "요구사항", "가능성",
  "비교", "정의", "설명", "기준", "역할", "사용", "수행", "지원", "문제", "이슈",
  "기본", "신규", "또는", "같은", "위한", "통한", "등", "수", "할", "있는", "검토",
  "개선", "확인", "연결", "제안", "수립", "운영", "대응", "필요"
]);

function getRoleFitSignals(track, role) {
  const keywordText = role.postingKeywords.slice(0, 3).join(", ");
  return [
    `${keywordText} 같은 공고 키워드가 내가 찾는 업무와 맞습니다.`,
    `${role.responsibilities[0]} 업무를 실제 사례로 설명해 보고 싶습니다.`,
    `${role.requirements[0]}을 수업, 프로젝트, 실습 산출물로 증명할 수 있습니다.`
  ].filter(Boolean);
}

function getRoleCautionSignals(track, role) {
  const text = getRoleCombinedText(track, role);
  const cautions = [];
  if (/(데이터|SQL|Python|통계|SPC|Cpk|Pareto|수율|불량)/i.test(text)) {
    cautions.push("데이터 정리, 이상치 확인, 표·그래프 해석을 반복하는 비중이 있습니다.");
  }
  if (/(현장|설비|라인|장비|양산|협력사|클린룸|공정)/.test(text)) {
    cautions.push("현장 조건, 설비 상태, 타 부서 피드백을 함께 보며 판단해야 합니다.");
  }
  if (/(문서|보고|표준|SOP|batch|Validation|검토표|리포트|기록|변경관리)/i.test(text)) {
    cautions.push("변경 근거와 검증 결과를 문서로 남기는 일이 직무의 일부입니다.");
  }
  if (/(시험|검증|계측|측정|오실로스코프|로그|Test|Pass|Fail)/i.test(text)) {
    cautions.push("측정 계획, 재현성, Pass/Fail 기준을 세우는 일이 중요합니다.");
  }
  if (/(코드|C\+\+|Linux|ROS|MCU|UART|Driver|Kernel|Yocto|펌웨어|디버깅)/i.test(text)) {
    cautions.push("코드, 로그, 하드웨어 인터페이스를 끝까지 추적하는 디버깅 비중이 있습니다.");
  }

  return (cautions.length ? cautions : [
    `${role.title}은 단일 툴 사용보다 ${role.postingKeywords.slice(0, 2).join("·")} 판단을 산출물로 설명하는 일이 중요합니다.`,
    "업무가 맞는지 보려면 공고 키워드보다 반복 업무와 요구 산출물을 함께 확인해야 합니다."
  ]).slice(0, 3);
}

function getRoleDecisionQuestions(track, role) {
  return [
    `공고에서 ${role.postingKeywords.slice(0, 3).join(", ")}가 반복될 때 실제로 어떤 업무를 하는지 말할 수 있습니까?`,
    `${role.responsibilities[0]}에 필요한 입력 데이터, 도면, 장비, 기준 중 무엇을 확인해야 하는지 떠올릴 수 있습니까?`,
    `${role.requirements[0]}을 내 프로젝트나 수업 산출물로 증명할 수 있습니까?`
  ].filter(Boolean);
}

function getRoleArtifactExamples(track, role) {
  const text = getRoleCombinedText(track, role);
  const examples = [];
  if (/(CAD|도면|공차|기구|DFM|DFA|제조성)/i.test(text)) examples.push("2D 도면·공차 검토표와 설계 변경 근거");
  if (/(해석|FEA|CFD|열|유동|메시|경계조건)/i.test(text)) examples.push("해석 조건표, 메시 민감도, 시험 대비 검증 리포트");
  if (/(SPC|Cpk|FMEA|8D|품질|불량|검사)/i.test(text)) examples.push("관리도·Cpk 분석표, 불량 Pareto, 8D 개선 보고서");
  if (/(공정|Recipe|수율|조건변경|DOE|Pareto|CTQ)/i.test(text)) examples.push("공정 변수-품질 지표 연결표와 조건 변경 검토표");
  if (/(반도체|웨이퍼|Defect|CD|식각|플라즈마|계측|장비)/i.test(text)) examples.push("Recipe 변경 이력, 계측 지표, 장비 로그 기반 원인 가설");
  if (/(PCB|회로|전원|리플|EMC|오실로스코프|부품선정)/i.test(text)) examples.push("회로 블록도, 부품 선정표, 측정 포인트와 검증 결과");
  if (/(MCU|펌웨어|UART|SPI|I2C|CAN|PWM|ADC)/i.test(text)) examples.push("주변장치 매핑표, 통신 로그, 디버깅 재현 절차");
  if (/(차량|차체|BIW|섀시|현가|조향|제동|파워트레인|구동계|배터리팩|BMS|E\/E|ECU|ADAS|HIL|SIL|DVP&R|실차|CANoe|AUTOSAR)/i.test(text)) examples.push("차량 요구사항표, 인터페이스 정의서, 시험계획서와 검증 리포트");
  if (/(Linux|Device Driver|Kernel|Yocto|BSP|부팅)/i.test(text)) examples.push("device tree·드라이버 로그 분석 메모와 이미지 빌드 흐름도");
  if (/(ROS|Navigation|SLAM|로봇|센서)/i.test(text)) examples.push("ROS 노드·토픽 구성도와 센서 데이터 흐름 로그");
  if (/(HAZOP|PSM|MSDS|안전|환경|위험)/i.test(text)) examples.push("HAZOP 체크리스트와 변경관리 위험 검토표");
  if (/(GMP|Validation|SOP|batch|바이오|제약)/i.test(text)) examples.push("SOP·batch record 항목 매핑과 validation 체크리스트");
  if (/(배터리|전극|슬러리|코팅|조립|활성화)/i.test(text)) examples.push("전극 공정 조건표와 수율·불량 데이터 분석");
  if (/(소재|합성|분석|물성|Scale-up)/i.test(text)) examples.push("조성·합성 조건과 물성 평가 결과 비교표");

  return [...new Set(examples.length ? examples : track.outputs)].slice(0, 4);
}

function getRoleCombinedText(track, role) {
  return [
    track.title,
    track.summary,
    role.title,
    role.focus,
    ...(role.postingKeywords || []),
    ...(role.responsibilities || []),
    ...(role.requirements || []),
    ...(role.preferred || [])
  ].join(" ");
}

function getWordCloudAsset(track, role) {
  if (role) {
    return {
      src: `/assets/wordcloud-role-${role.id}.png`,
      alt: `${role.title} 세부 직무 역량 워드 클라우드`,
      caption: `${role.title} 채용공고 키워드, 역량 체크 문항, 업무·자격요건에서 반복되는 역량일수록 크게 표시됩니다.`
    };
  }

  return {
    src: `/assets/wordcloud-${track.id}.png`,
    alt: `${track.title} 핵심 역량 워드 클라우드`,
    caption: "단어 크기는 직무 설명, 역량 체크 문항, 과제, 교육자료에서 반복 강조되는 정도를 반영합니다."
  };
}

function detailBlock(title, items) {
  return `
    <div>
      <h4>${title}</h4>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function renderDiagnostics() {
  if (!hasActiveRoleSelection()) {
    elements.diagnosisTitle.textContent = "직무를 먼저 선택하세요";
    elements.diagnosisGuide.innerHTML = `
      <div class="empty-state">지원하려는 세부 직무를 선택하면 그 직무의 반복 업무, 자격조건, 우대역량 기준으로 역량 체크가 열립니다.</div>
    `;
    elements.diagnosticList.innerHTML = "";
    elements.gapList.innerHTML = "";
    elements.scoreBadge.textContent = "0%";
    elements.scoreBar.style.width = "0%";
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const questions = getDiagnosticItems(track);
  elements.diagnosisTitle.textContent = role ? `${track.title} · ${role.title}` : track.title;
  elements.diagnosisGuide.innerHTML = renderDiagnosisGuide(track, role, questions);
  elements.diagnosticList.innerHTML = renderDiagnosticGroups(questions);

  elements.diagnosticList.querySelectorAll("[data-check-id]").forEach((input) => {
    input.addEventListener("change", () => {
      state.checked[input.dataset.checkId] = input.checked;
      saveState();
      renderDiagnostics();
      renderRoadmap();
      renderSaved();
      renderMetrics();
      renderWorkflowStatus();
      renderRoleContextBar();
    });
  });

  const score = getDiagnosticScore(track.id);
  elements.scoreBadge.textContent = `${score}%`;
  elements.scoreBar.style.width = `${score}%`;

  const gaps = getGapItems(track.id);

  elements.gapList.innerHTML = gaps.length
    ? gaps.map((item) => `
      <article class="gap-item">
        <strong>${item.skill}</strong>
        <p>${item.question}</p>
        <p class="gap-action">이 항목은 로드맵과 교육자료 추천에서 우선 보완 대상으로 사용됩니다.</p>
      </article>
    `).join("") + renderDiagnosisNextAction(gaps.length)
    : `<div class="empty-state">현재 체크리스트 기준으로 큰 공백이 없습니다. 산출물 정리 단계로 넘어가세요.</div>${renderDiagnosisNextAction(0)}`;
}

function renderDiagnosisNextAction(gapCount) {
  return `
    <div class="diagnosis-next-panel">
      <div>
        <strong>${gapCount ? `${gapCount}개 부족 역량 기준으로 로드맵을 구성합니다` : "보완 공백이 낮아 산출물 정리 중심으로 넘어갑니다"}</strong>
        <span>체크한 보유 역량은 뒤로 두고, 미체크 항목과 선택 직무 산출물을 우선 배치합니다.</span>
      </div>
      <button class="primary-button" type="button" data-view-target="roadmap">부족 역량 기준 교육 선택</button>
    </div>
  `;
}

function renderDiagnosticGroups(questions) {
  const groups = questions.reduce((acc, item) => {
    if (!acc.has(item.source)) acc.set(item.source, []);
    acc.get(item.source).push(item);
    return acc;
  }, new Map());

  return [...groups.entries()].map(([source, items], index) => {
    const checkedCount = items.filter((item) => state.checked[item.id]).length;
    const open = index < 2 || checkedCount < items.length;
    return `
      <section class="diagnostic-group">
        <details ${open ? "open" : ""}>
          <summary>
            <span>
              <strong>${source}</strong>
              <em>${checkedCount}/${items.length}개 확보</em>
            </span>
          </summary>
          <div class="diagnostic-group-items">
            ${items.map(renderDiagnosticCheckItem).join("")}
          </div>
        </details>
      </section>
    `;
  }).join("");
}

function renderDiagnosticCheckItem(item) {
  const checked = Boolean(state.checked[item.id]);
  return `
    <label class="check-item ${checked ? "is-checked" : ""}">
      <input type="checkbox" data-check-id="${item.id}" aria-label="${item.skill} 역량 보유 여부" ${checked ? "checked" : ""}>
      <span>
        <span class="diagnostic-source">${item.source}</span>
        <span class="diagnostic-state">${checked ? "확보함" : "보완 필요"}</span>
        <strong>${item.skill}</strong>
        <span class="diagnostic-question">${item.question}</span>
        <span class="diagnostic-choice-rule">체크 기준: 도움 없이 설명하거나 간단한 산출물로 증명할 수 있을 때만 체크하세요.</span>
      </span>
    </label>
  `;
}

function renderDiagnosisGuide(track, role, questions) {
  const roleItems = questions.filter((item) => item.source === role?.title).length;
  const industryItems = questions.filter((item) => item.source === getIndustryLabel()).length;
  const checkedCount = questions.filter((item) => state.checked[item.id]).length;
  const gapCount = Math.max(questions.length - checkedCount, 0);
  const gapPreview = questions
    .filter((item) => !state.checked[item.id])
    .slice(0, 4)
    .map((item) => item.skill)
    .join(", ") || "큰 공백 없음";
  const aiProfile = getRoleAiCompetencyProfile(role);
  const output = role ? getRoleCurriculumOutput(track, role) : track.outputs[0];
  const diagnosisScope = [
    "트랙 공통",
    role ? `${role.title} ${roleItems}개` : "",
    industryItems ? `${getIndustryLabel()} 산업 ${industryItems}개` : ""
  ].filter(Boolean).join(" · ");
  return `
    <div>
      <p class="eyebrow">선택 기준</p>
      <h3>채용공고에서 요구하는 역량 중 내가 확보한 내용만 체크</h3>
      <p>${diagnosisScope} 기준으로 확보 여부를 확인합니다. 체크하지 않은 항목은 내 커리큘럼의 주차별 과제와 교육자료 배치에 바로 반영됩니다.</p>
    </div>
    <div class="diagnosis-context-strip" aria-label="진단 현황">
      <span><strong>선택 직무</strong>${role?.title || track.title}</span>
      <span><strong>체크 완료</strong>${checkedCount}/${questions.length}개</span>
      <span><strong>로드맵 반영</strong>${gapCount}개 보완 역량</span>
    </div>
    <div class="diagnosis-focus-panel">
      <div>
        <strong>로드맵에서 우선 볼 역량</strong>
        <span>${gapPreview}</span>
      </div>
      <div>
        <strong>최종 산출물</strong>
        <span>${output}</span>
      </div>
      ${aiProfile ? `
        <div>
          <strong>AI·데이터 역량</strong>
          <span>${aiProfile.level} · ${aiProfile.keywords.slice(0, 3).join(", ")}</span>
        </div>
      ` : ""}
    </div>
    <div class="diagnosis-guide-grid">
      <span><strong>확보함</strong>혼자 설명, 실습, 산출물 중 하나로 증명 가능</span>
      <span><strong>보완 필요</strong>개념만 들어봤거나 예제를 보고도 막히는 상태</span>
      <span><strong>헷갈림</strong>보완 필요로 두면 추천 자료에서 우선 보완</span>
    </div>
    <div class="flow-actions">
      <button class="primary-button" type="button" data-view-target="roadmap">부족 역량 기준 교육 선택</button>
    </div>
  `;
}

function getDiagnosticScore(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  const questions = getDiagnosticItems(track);
  if (!questions.length) return 0;
  const checkedCount = questions.filter((item) => state.checked[item.id]).length;
  return Math.round((checkedCount / questions.length) * 100);
}

function getGapItems(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  return getDiagnosticItems(track).filter((item) => !state.checked[item.id]);
}

function getGapSkills(trackId) {
  return getGapItems(trackId).map((item) => item.skill);
}

function getAcquiredSkills(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  return getDiagnosticItems(track)
    .filter((item) => state.checked[item.id])
    .map((item) => item.skill);
}

function getDiagnosticItems(track) {
  if (!track) return [];

  const role = getSelectedRole(track.id);
  const baseItems = (diagnostics[track.id] || []).map(([skill, question], index) => ({
    id: `${track.id}-base-${index}`,
    skill,
    question,
    source: "트랙 공통"
  }));
  const roleItems = role ? (roleDiagnostics[role.id] || []).map(([skill, question], index) => ({
    id: `${track.id}-${role.id}-role-${index}`,
    skill,
    question,
    source: role.title
  })) : [];
  const industryItems = state.profile.industry === "all" ? [] : (industryDiagnostics[state.profile.industry] || []).map(([skill, question], index) => ({
    id: `${track.id}-${state.profile.industry}-industry-${index}`,
    skill,
    question,
    source: getIndustryLabel()
  }));

  return [...baseItems, ...roleItems, ...industryItems];
}

function renderRoadmap() {
  if (!hasActiveRoleSelection()) {
    elements.roadmapTitle.textContent = "직무 선택 후 로드맵 생성";
    elements.roadmapGuidance.innerHTML = `
      <div class="empty-state">세부 직무를 먼저 선택하세요. 선택 직무와 역량 체크 결과를 기준으로 주차별 과제와 교육자료가 자동 배치됩니다.</div>
    `;
    elements.roadmapList.innerHTML = "";
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const roadmapResourceUseCounts = new Map();
  elements.roadmapTitle.textContent = `${role?.title || track.title} 교육 선택`;
  renderRoadmapGuidance(context, tasks);
  elements.roadmapList.innerHTML = tasks.map((task, index) => {
    const linkedResources = getRoadmapResourcesForTask(track, task, context, roadmapResourceUseCounts);
    linkedResources.forEach((resource) => {
      roadmapResourceUseCounts.set(resource.id, (roadmapResourceUseCounts.get(resource.id) || 0) + 1);
    });
    return `
    <article class="week-card">
      <span class="week-number">${task.weekLabel || `${index + 1}주차`}</span>
      <h3>${task.title}</h3>
      <p>${task.objective}</p>
      <div class="task-meta">
        ${task.phase ? `<span class="badge">${task.phase}</span>` : ""}
        <span class="badge">예상 ${task.time}</span>
        <span class="badge">${task.deliverable}</span>
      </div>
      ${task.priorityReason ? `<div class="recommendation-note"><strong>추천 이유:</strong> ${task.priorityReason}</div>` : ""}
      <div>
        <h4>수행 단계</h4>
        <ol class="task-steps">${task.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      </div>
      <div>
        <h4>통과 기준</h4>
        <ul class="rubric-list">${task.rubric.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div class="roadmap-resource-block">
        <h4>추천 교육·실습자료</h4>
        <p class="roadmap-resource-guide">체크하지 않은 역량과 이번 주 산출물에 맞춘 자료입니다. 제목을 누르면 연결 이유와 교육·실습 링크가 열립니다.</p>
        ${linkedResources.length
          ? `<div class="roadmap-resource-list">${linkedResources.map((resource) => renderRoadmapResourceItem(resource, task, context)).join("")}</div>`
          : `<div class="empty-state compact">이 과제에 연결된 교육자료 후보가 아직 없습니다.</div>`}
      </div>
    </article>
  `;
  }).join("");

  bindResourceActions(elements.roadmapGuidance);
  bindResourceActions(elements.roadmapList);
}

function renderRoadmapGuidance(context, tasks) {
  if (!elements.roadmapGuidance) return;
  const selectedResources = getSavedResources();
  const roleResourceCount = getRoleLinkedResourceIds(context.role).length;
  const gapText = context.gapSkills.length ? context.gapSkills.slice(0, 4).join(", ") : "큰 공백 없음";
  const checkedCount = context.acquiredSkills.length;
  const goalLabel = getGoalRecommendationLabel(context.goalKey);
  const durationStrategy = getDurationStrategy();
  const practiceResourceCount = getRecommendedResources(context.track, context)
    .filter(isHandsOnResource)
    .length;
  const selectedText = selectedResources.length
    ? `${selectedResources.length}개 교육을 내 커리큘럼에 담았습니다.`
    : "추천 교육을 먼저 훑고 필요한 것만 내 커리큘럼에 담으세요.";

  elements.roadmapGuidance.innerHTML = `
    <section class="curriculum-overview-panel" aria-label="교육 선택 큰그림">
      <div>
        <p class="eyebrow">큰그림</p>
        <h3>${context.role?.title || context.track.title} 준비는 이렇게 진행됩니다</h3>
        <p>${durationStrategy.summary} 이미 체크한 보유 역량은 뒤로 두고, 보완 역량(${gapText})과 첫 산출물 중심으로 교육을 추천합니다.</p>
      </div>
      <ol class="curriculum-flow-list">
        <li><strong>직무 확인</strong><span>반복 업무와 자격조건 이해</span></li>
        <li><strong>부족 역량</strong><span>체크하지 못한 역량만 우선</span></li>
        <li><strong>교육 선택</strong><span>필요한 교육만 커리큘럼에 추가</span></li>
        <li><strong>내 커리큘럼</strong><span>주차별 과제와 산출물 확인</span></li>
      </ol>
    </section>
    ${renderRoadmapDecisionPanel(context, tasks)}
    ${renderEducationSummaryPanel(context, tasks, selectedText)}
    ${checkedCount ? "" : `
      <div class="workflow-warning">
        <strong>보유 역량 체크 전입니다</strong>
        아직 확보한 역량을 체크하지 않아 모든 역량 항목을 보완 대상으로 보고 있습니다. 실제 보유 역량을 체크하면 이미 아는 내용은 뒤로 빠지고 부족 역량 중심으로 커리큘럼이 다시 좁혀집니다.
        <button class="ghost-button" type="button" data-view-target="diagnosis">역량 체크하기</button>
      </div>
    `}
    <p class="company-detail-inline is-important"><strong>지원 전 필수 확인</strong> 이 커리큘럼 제안은 일반적인 직무내용을 기반으로 추천합니다. 지원 회사의 직무상세에 나온 업무·자격요건·우대사항을 반드시 확인하고, 공고와 직접 맞닿은 역량과 산출물을 우선 준비하세요.</p>
    <details class="roadmap-detail-disclosure" open>
      <summary>내 커리큘럼에 들어갈 과제 미리 보기</summary>
      ${renderCompetencyActionPlan(context, tasks)}
    </details>
    <div class="badge-row">
      <span class="badge">기간: ${getDurationLabel()}</span>
      <span class="badge">목표 반영: ${context.goal.label} · ${goalLabel}</span>
      <span class="badge">커리큘럼 주차: ${tasks.length}개</span>
      <span class="badge">직무 연결 자료: ${roleResourceCount}개</span>
      <span class="badge">실습형 후보: ${practiceResourceCount}개</span>
      <span class="badge">자료 배치: 부족 역량 우선</span>
      <span class="badge">내가 고른 교육: ${selectedResources.length}개</span>
    </div>
    ${renderHandsOnResourcePanel(context)}
    <div class="roadmap-final-cta">
      <div>
        <strong>교육을 골랐다면 내 커리큘럼을 확인하세요</strong>
        <span>주차별 과제, 추천 교육, 회사 공고 대조표를 한 화면과 엑셀 파일에서 확인합니다.</span>
      </div>
      <button class="primary-button" type="button" data-view-target="saved">내 커리큘럼 확인</button>
    </div>
    <details class="roadmap-detail-disclosure">
      <summary>추천 기준 자세히 보기</summary>
      <div class="duration-strategy-grid">
        <span><strong>자료 기준</strong>${durationStrategy.resourceRule}</span>
        <span><strong>과제 기준</strong>${durationStrategy.taskRule}</span>
      </div>
      ${renderGoalRuleGrid(context.goalKey)}
    </details>
  `;
}

function renderRoadmapDecisionPanel(context, tasks) {
  const role = context.role;
  const output = role ? getRoleCurriculumOutput(context.track, role) : context.track.outputs[0];
  const acquired = context.acquiredSkills.length
    ? context.acquiredSkills.slice(0, 4).join(", ")
    : "아직 체크 전";
  const gaps = context.gapSkills.length
    ? context.gapSkills.slice(0, 4).join(", ")
    : "큰 공백 없음";
  const firstTask = tasks[0]?.title || "직무상세 분해";
  const aiProfile = getRoleAiCompetencyProfile(role);
  return `
    <div class="roadmap-decision-panel" aria-label="로드맵 구성 기준">
      <div>
        <strong>선택 직무</strong>
        <span>${role?.title || context.track.title}</span>
      </div>
      <div>
        <strong>제외한 보유 역량</strong>
        <span>${acquired}</span>
      </div>
      <div>
        <strong>우선 보완</strong>
        <span>${gaps}</span>
      </div>
      <div>
        <strong>첫 산출물</strong>
        <span>${firstTask} · ${output}</span>
      </div>
      ${aiProfile ? `
        <div>
          <strong>AI·데이터 반영</strong>
          <span>${aiProfile.level} · ${aiProfile.summary}</span>
        </div>
      ` : ""}
    </div>
  `;
}

function renderEducationSummaryPanel(context, tasks, selectedText) {
  const summaryResources = getEducationSummaryResources(context, tasks);
  if (!summaryResources.length) {
    return `
      <section class="education-summary-panel" aria-label="추천 교육 요약">
        <div class="education-summary-headline">
          <div>
            <p class="eyebrow">추천 교육 요약</p>
            <h3>${selectedText}</h3>
          </div>
          <button class="primary-button" type="button" data-view-target="saved">내 커리큘럼 확인</button>
        </div>
        <div class="empty-state compact">선택 직무에 연결된 교육 후보가 아직 없습니다. 참고자료 보관함에서 직접 추가할 수 있습니다.</div>
      </section>
    `;
  }

  return `
    <section class="education-summary-panel" aria-label="추천 교육 요약">
      <div class="education-summary-headline">
        <div>
          <p class="eyebrow">추천 교육 요약</p>
          <h3>${selectedText}</h3>
          <p>상세 목록을 모두 읽기 전에, 먼저 아래 교육이 어떤 내용인지와 왜 추천됐는지 확인하세요.</p>
        </div>
        <button class="primary-button" type="button" data-view-target="saved">내 커리큘럼 확인</button>
      </div>
      <div class="education-summary-list">
        ${summaryResources.map((resource, index) => renderEducationSummaryCard(resource, index, context, tasks)).join("")}
      </div>
    </section>
  `;
}

function getEducationSummaryResources(context, tasks) {
  const rankedResources = getRecommendedResources(context.track, context);
  const focusedResources = rankedResources.filter((resource) => {
    if (state.saved.includes(resource.id)) return true;
    if (getRoleLinkedResourceIds(context.role).includes(resource.id)) return true;
    if (getResourceGapMatches(resource, context).length) return true;
    if (getResourceLinkedTasks(resource.id, tasks).length) return true;
    return !resource.broad;
  });
  return uniqueResources([...focusedResources, ...rankedResources]).slice(0, 4);
}

function renderEducationSummaryCard(resource, index, context, tasks) {
  const saved = state.saved.includes(resource.id);
  const linkedTask = getPrimaryTaskForResource(resource, tasks, context);
  const reason = getEducationSummaryReason(resource, linkedTask, context);
  const learningText = truncateText(resource.reason, 96);
  const outputText = truncateText(resource.expectedOutput, 88);
  const taskText = linkedTask ? `${linkedTask.weekLabel || `${index + 1}주차`} · ${linkedTask.title}` : "자동 배치 과제";

  return `
    <article class="education-summary-card ${saved ? "is-saved" : ""}">
      <div class="education-summary-card-head">
        <span class="education-rank">추천 ${index + 1}</span>
        <div>
          <h4>${resource.title}</h4>
          <p>${resource.provider} · ${resource.type} · ${formatMinutes(resource.totalMinutes)}</p>
        </div>
      </div>
      <div class="education-summary-body">
        <p><strong>내용</strong>${learningText}</p>
        <p><strong>추천 이유</strong>${reason}</p>
        <p><strong>내 커리큘럼 연결</strong>${taskText} / ${outputText}</p>
      </div>
      <div class="education-summary-actions">
        <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
        ${renderSaveActionButton(resource, "내 커리큘럼에 추가")}
      </div>
    </article>
  `;
}

function getPrimaryTaskForResource(resource, tasks, context) {
  return tasks.find((task) => getResourceLinkedTasks(resource.id, [task]).length)
    || tasks.find((task) => getTaskGapMatches(resource, task, context.gapSkills).length)
    || tasks.find((task) => getTaskRoleKeywordMatches(resource, task, context.role).length)
    || tasks.find((task) => getTaskMatchedSkills(resource, task).length)
    || tasks[0];
}

function getEducationSummaryReason(resource, task, context) {
  const signals = getEducationResourceSignals(resource, context)
    .filter((signal) => signal !== "계획 선택됨")
    .slice(0, 2);
  const connectionReason = task
    ? getTaskResourceConnectionReason(resource, task, context)
    : "선택 직무와 준비 목표에 연결되는 교육입니다.";
  const text = signals.length ? `${signals.join(" · ")} · ${connectionReason}` : connectionReason;
  return truncateText(text, 100);
}

function truncateText(text, maxLength) {
  const normalized = String(text || "").trim();
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength - 3)}...` : normalized;
}

function renderReferences() {
  if (!elements.referenceList || !elements.referenceGuidance || !elements.referenceCount) return;

  if (!hasActiveRoleSelection()) {
    elements.referenceCount.textContent = `${resources.length}개 자료`;
    elements.referenceGuidance.innerHTML = `
      <h3>참고자료는 보조 화면입니다</h3>
      <p>먼저 직무를 선택하고 교육 선택 화면에서 핵심 추천을 확인하세요. 이곳은 더 찾아보고 싶을 때 여는 전체 자료 보관함입니다.</p>
    `;
    elements.referenceList.innerHTML = `<div class="empty-state">먼저 직무 탭에서 지원하려는 세부 직무를 선택하세요.</div>`;
    return;
  }

  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const roleResources = uniqueResources([
    ...getRoleLinkedResources(role),
    ...getRecommendedResources(track, context)
  ]).slice(0, 8);
  const sections = getReferenceSections(context);

  elements.referenceCount.textContent = `${resources.length}개 자료`;
  elements.referenceGuidance.innerHTML = `
    <h3>전체 자료는 필요할 때만 참고하세요</h3>
    <p>핵심 추천은 교육 선택 화면에 이미 요약되어 있습니다. 이 탭은 공식 예제, 실습형 과정, 기초 강의, 채용공고 확인 자료를 더 살펴보고 싶을 때 사용하는 보관함입니다.</p>
    <div class="badge-row">
      <span class="badge">선택 직무: ${role?.title || track.title}</span>
      <span class="badge">전체 자료: ${resources.length}개</span>
      <span class="badge">분야: ${sections.length}개</span>
      <span class="badge">MathWorks·OCW·공식문서·실습형 과정 포함</span>
    </div>
  `;

  elements.referenceList.innerHTML = `
    ${roleResources.length ? `
      <section class="reference-priority-panel" aria-label="선택 직무 우선 참고자료">
        <div class="reference-section-head">
          <div>
            <p class="eyebrow">선택 직무 우선</p>
            <h3>${role?.title || track.title} 관련 자료</h3>
          </div>
          <span class="status-pill">${roleResources.length}개</span>
        </div>
        <div class="reference-resource-grid">
          ${roleResources.map((resource) => renderReferenceResourceItem(resource, context)).join("")}
        </div>
      </section>
    ` : ""}
    <div class="reference-section-list">
      ${sections.map((section) => renderReferenceSection(section, context)).join("")}
    </div>
  `;

  bindResourceActions(elements.referenceList);
}

function getReferenceSections(activeContext) {
  const categories = [
    {
      id: "official-simulation",
      title: "공식·시뮬레이션 예제",
      summary: "MathWorks, Ansys, NI, 공식 문서처럼 실습 환경과 예제가 명확한 자료입니다.",
      match: (resource) => /MathWorks|Ansys|NI|Texas Instruments|STMicroelectronics|Arm|KiCad|Linux Kernel|Yocto|ROS/.test(resource.provider)
        || /Simulink|Simscape|Stateflow|시뮬레이션|HIL|SIL|모델링|모델/.test(getResourceBadgeText(resource))
    },
    {
      id: "hands-on",
      title: "직접 실습·부트캠프",
      summary: "과제, 멘토링, 부트캠프, 현장실습처럼 산출물을 만들기 좋은 자료입니다.",
      match: (resource) => isHandsOnResource(resource)
        || /코멘토|렛유인|STEP|HRD-Net|KDT|현장실습|부트캠프|멘토링/.test(`${resource.provider} ${resource.type}`)
    },
    {
      id: "foundation",
      title: "기초 개념·무료 강의",
      summary: "직무 용어와 전공 기초를 빠르게 보완하기 위한 입문·기초 자료입니다.",
      match: (resource) => ["입문", "기초", "기초실습"].includes(resource.difficulty)
        || /KOCW|K-MOOC|YouTube|Coursera|edX|freeCodeCamp|Khan|Boostcourse|인프런|Udemy/.test(resource.provider)
    },
    {
      id: "job-evidence",
      title: "직무·채용공고 확인",
      summary: "직무명, NCS, 공고 키워드, 면접 설명 근거를 확인할 때 쓰는 자료입니다.",
      match: (resource) => /직무|NCS|채용|면접|공고|커리어|Job|Career/i.test(getResourceBadgeText(resource))
    }
  ];
  const assigned = new Set();
  const sections = categories.map((category) => {
    const sectionResources = resources
      .filter((resource) => !assigned.has(resource.id) && category.match(resource))
      .sort((a, b) => sortReferenceResources(a, b, activeContext));
    sectionResources.forEach((resource) => assigned.add(resource.id));
    return { ...category, context: activeContext, resources: sectionResources };
  });
  const otherResources = resources
    .filter((resource) => !assigned.has(resource.id))
    .sort((a, b) => sortReferenceResources(a, b, activeContext));

  if (otherResources.length) {
    sections.push({
      id: "other",
      title: "추가 참고자료",
      summary: "선택 직무와 직접 연결되면 내 커리큘럼에 추가해도 되는 보조 자료입니다.",
      context: activeContext,
      resources: otherResources
    });
  }

  return sections.filter((section) => section.resources.length);
}

function sortReferenceResources(a, b, context) {
  const score = (resource) => {
    const roleLinked = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
    const saved = state.saved.includes(resource.id) ? 1 : 0;
    const qualityScore = resource.qualityStatus === "verified" ? 3 : resource.qualityStatus === "reviewed" ? 2 : 1;
    return saved * 600
      + roleLinked * 320
      + (resource.core ? 120 : 0)
      + getResourcePriorityScore(resource, context)
      + (isHandsOnResource(resource) ? 35 : 0)
      + qualityScore * 16
      - resource.sequenceLevel * 2;
  };
  const scoreDiff = score(b) - score(a);
  if (scoreDiff !== 0) return scoreDiff;
  return sortResourcesForLearning(a, b, context);
}

function renderReferenceSection(section, activeContext) {
  return `
    <details class="reference-section" ${section.id === "official-simulation" || section.id === "hands-on" ? "open" : ""}>
      <summary>
        <span>
          <strong>${section.title}</strong>
          <em>${section.summary}</em>
        </span>
        <span class="status-pill">${section.resources.length}개</span>
      </summary>
      <div class="reference-section-body">
        ${section.resources.map((resource) => renderReferenceResourceItem(resource, section.context)).join("")}
      </div>
    </details>
  `;
}

function renderReferenceResourceItem(resource, context) {
  const saved = state.saved.includes(resource.id);
  const signals = context ? getResourceSignals(resource, context).slice(0, 3) : [];
  const skillText = (resource.skills || []).slice(0, 5).join(", ");
  return `
    <details class="reference-resource-card ${saved ? "is-saved" : ""}">
      <summary>
        <span>
          <strong>${resource.title}</strong>
          <em>${resource.provider} · ${resource.type} · ${resource.language} · ${formatMinutes(resource.totalMinutes)}</em>
        </span>
        ${renderResourceTrustBadges(resource)}
      </summary>
      <div class="reference-resource-detail">
        <p>${resource.reason}</p>
        ${signals.length ? `<p><strong>추천 신호:</strong> ${signals.join(" · ")}</p>` : ""}
        <p><strong>역량:</strong> ${skillText}</p>
        <p><strong>남길 산출물:</strong> ${resource.expectedOutput}</p>
        <div class="roadmap-resource-actions">
          <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
          ${renderSaveActionButton(resource)}
        </div>
      </div>
    </details>
  `;
}

function getCurriculumTasks(trackId) {
  const track = tracks.find((item) => item.id === trackId);
  const role = track ? getSelectedRole(track.id) : null;
  if (track && role) return getRoleSpecificCurriculumTasks(track, role);
  if (curriculumTasks[trackId]) return curriculumTasks[trackId];
  return (roadmaps[trackId] || []).map(([title, objective, deliverable]) => ({
    title,
    objective,
    time: "2시간",
    steps: [objective],
    deliverable,
    rubric: ["산출물이 제출 가능하다", "직무 역량과 연결된다", "다음 행동이 보인다"]
  }));
}

function getRoleSpecificCurriculumTasks(track, role) {
  const baseTasks = getBaseCurriculumTasks(track.id);
  const diagnosticsForRole = roleDiagnostics[role.id] || diagnostics[track.id] || [];
  const primarySkill = diagnosticsForRole[0]?.[0] || role.postingKeywords[0];
  const secondarySkill = diagnosticsForRole[1]?.[0] || role.postingKeywords[1] || primarySkill;
  const output = getRoleCurriculumOutput(track, role);
  const keywords = role.postingKeywords.slice(0, 4).join(", ");
  const aiDataExercise = getRoleAiDataExercise(role);

  if (track.id === "automotive-mobility") {
    return getAutomotiveRoleSpecificCurriculumTasks(track, role, primarySkill, secondarySkill, output, keywords, aiDataExercise);
  }

  return [
    {
      title: `${role.title} 직무상세 분해`,
      baseTitle: baseTasks[0]?.title || "직무 이해",
      objective: `${role.focus}를 실제 공고의 업무, 자격요건, 우대사항으로 나누어 지원 직무와 맞는지 판단합니다.`,
      time: "90분",
      steps: [
        `${role.responsibilities[0]} 업무가 공고에 실제로 있는지 표시합니다.`,
        `자격요건을 보유 역량, 보완 역량, 증명 산출물로 나눕니다: ${role.requirements[0]}`,
        `${keywords} 키워드가 회사 공고에서 어떤 문장으로 쓰였는지 기록합니다.`
      ],
      deliverable: `${role.title} 업무-역량 매핑표`,
      rubric: ["공고 문장과 앱 직무 설명이 연결된다", "보유 역량과 부족 역량이 분리된다", "지원 여부 판단 근거가 남는다"]
    },
    {
      title: `${primarySkill} 핵심 역량 보완`,
      baseTitle: baseTasks[1]?.title || "전공·도구 보완",
      objective: `${role.title}에서 반복되는 ${primarySkill}, ${secondarySkill} 역량을 교육자료와 작은 예제로 보완합니다.`,
      time: "2시간",
      steps: [
        `보유 역량 체크에서 ${primarySkill} 관련 미체크 항목을 확인합니다.`,
        "추천 교육자료 중 직접 링크와 검토 자료를 먼저 열어 핵심 개념을 정리합니다.",
        `다음 역량을 설명할 수 있는 예제나 계산, 표, 로그를 남깁니다: ${role.requirements[1] || role.requirements[0]}`
      ],
      deliverable: `${primarySkill} 보완 노트와 예제`,
      rubric: ["미체크 역량과 교육자료가 연결된다", "개념 설명과 작은 예제가 함께 있다", "지원 직무 용어로 다시 설명할 수 있다"]
    },
    {
      title: `${role.postingKeywords[0]} 산출물 작성`,
      baseTitle: baseTasks[2]?.title || "해석 적용",
      objective: `전문가가 보는 핵심은 학습 완료가 아니라 ${output}입니다. 교육자료를 보고 이번 직무의 산출물 초안을 만듭니다.`,
      time: "2시간",
      steps: [
        `${role.responsibilities[1] || role.responsibilities[0]}에 필요한 입력값과 판단 기준을 정합니다.`,
        "추천 자료에서 본 방법을 표, 그래프, 체크리스트, 테스트 케이스 중 하나로 적용합니다.",
        "결과가 공고의 업무 또는 자격요건 중 어떤 문장과 연결되는지 적습니다.",
        ...(aiDataExercise ? [aiDataExercise] : [])
      ],
      deliverable: output,
      rubric: ["산출물 형식이 직무와 맞다", "입력값과 판단 기준이 보인다", "공고 문장과 직접 연결된다"]
    },
    {
      title: "지원 회사 맞춤 검증",
      baseTitle: baseTasks[3]?.title || "포트폴리오 정리",
      objective: "일반 직무 로드맵을 지원 회사 공고 기준으로 다시 좁혀 면접에서 설명 가능한 근거로 정리합니다.",
      time: "2시간",
      steps: [
        "지원 회사 공고의 업무·자격요건·우대사항 문장을 3개 이상 가져옵니다.",
        "이번 로드맵 산출물 중 공고와 직접 맞는 것과 맞지 않는 것을 표시합니다.",
        "부족한 항목 1개를 다음 주 보완 과제로 정합니다."
      ],
      deliverable: "회사 공고 맞춤 보완 체크리스트",
      rubric: ["회사 공고 원문 기준으로 판단한다", "일반 추천과 회사 요구의 차이를 적는다", "다음 보완 행동이 구체적이다"]
    }
  ];
}

function getBaseCurriculumTasks(trackId) {
  if (curriculumTasks[trackId]) return curriculumTasks[trackId];
  return (roadmaps[trackId] || []).map(([title, objective, deliverable]) => ({
    title,
    objective,
    time: "2시간",
    steps: [objective],
    deliverable,
    rubric: ["산출물이 제출 가능하다", "직무 역량과 연결된다", "다음 행동이 보인다"]
  }));
}

function getAutomotiveRoleSpecificCurriculumTasks(track, role, primarySkill, secondarySkill, output, keywords, aiDataExercise) {
  const profile = getAutomotiveRolePracticeProfile(role);
  return [
    {
      title: `${role.title} 공고·DVP&R 분해`,
      baseTitle: "자동차 직무상세 분해",
      objective: `${role.focus}를 실제 공고의 반복 업무, 자격조건, 우대사항, 검증 산출물로 나누어 지원 직무와 맞는지 판단합니다.`,
      time: "90분",
      steps: [
        `${role.responsibilities[0]} 업무가 지원 회사 공고에 실제로 있는지 표시합니다.`,
        `DVP&R 관점으로 입력 요구사항, 시험 조건, 판정 기준, 남길 산출물을 나눕니다.`,
        `${keywords} 키워드가 공고에서 업무 문장인지 우대사항인지 구분합니다.`
      ],
      deliverable: `${role.title} 공고-DVP&R 매핑표`,
      rubric: ["공고 원문과 앱 직무 설명이 연결된다", "업무·자격·우대가 분리된다", "지원 여부 판단 근거가 남는다"]
    },
    {
      title: `${profile.system} 핵심 역량 실습`,
      baseTitle: "자동차 핵심 역량 실습",
      objective: `${role.title}에서 반복되는 ${primarySkill}, ${secondarySkill} 역량을 작은 실습 산출물로 증명합니다.`,
      time: "2시간",
      steps: [
        `${profile.input}를 입력 조건으로 정리합니다.`,
        `${profile.method}를 적용해 비교표, 모델, 로그, 체크리스트 중 하나를 만듭니다.`,
        `결과를 ${role.requirements[0]} 자격조건과 연결해 설명합니다.`
      ],
      deliverable: profile.coreDeliverable,
      rubric: ["입력 조건이 명확하다", "판단 기준과 결과가 함께 있다", "공고 자격조건과 직접 연결된다"]
    },
    {
      title: `${profile.dataTheme} 데이터·시뮬레이션 산출물`,
      baseTitle: "자동차 데이터·시뮬레이션 적용",
      objective: `공식 예제, MathWorks/시뮬레이션 자료, 로그 분석 중 가능한 방법을 골라 ${output} 초안을 만듭니다.`,
      time: "2시간",
      steps: [
        `${profile.dataInput}를 시간, 조건, 기준값으로 정리합니다.`,
        `${profile.analysis}를 수행해 정상/이상 또는 변경 전/후 차이를 표시합니다.`,
        aiDataExercise || "분석 결과를 입력, 판단 기준, 결과 지표로 나누어 5줄 표로 정리합니다."
      ],
      deliverable: profile.dataDeliverable,
      rubric: ["데이터 또는 모델 입력이 보인다", "비교 기준이 있다", "시험·검증 리포트로 확장 가능하다"]
    },
    {
      title: "지원 회사 맞춤 검증 계획서",
      baseTitle: "자동차 회사 공고 맞춤 검증",
      objective: "일반 직무 로드맵을 지원 회사 공고 기준으로 줄이고, 면접에서 설명 가능한 검증 계획으로 정리합니다.",
      time: "2시간",
      steps: [
        "지원 회사 공고의 업무·자격요건·우대사항 문장을 3개 이상 붙여 넣습니다.",
        `이번 산출물 중 ${profile.finalCheck}와 직접 맞는 항목을 표시합니다.`,
        "공고와 맞지 않는 일반 자료는 후순위로 내리고, 부족한 항목 1개를 다음 보완 과제로 정합니다."
      ],
      deliverable: "회사 공고 맞춤 자동차 직무 준비 체크리스트",
      rubric: ["회사 공고 원문 기준으로 판단한다", "일반 추천과 회사 요구의 차이를 적는다", "다음 보완 행동이 구체적이다"]
    }
  ];
}

function getAutomotiveRolePracticeProfile(role) {
  const profiles = {
    "vehicle-body-design-engineer": {
      system: "차체·BIW",
      input: "패키지 제약, 하중 경로, 체결점, 공차 조건",
      method: "간섭 검토와 제조성 체크",
      dataTheme: "차체 시험·설계 변경",
      dataInput: "강성, 중량, 충돌/NVH 요구와 시험 결과",
      analysis: "요구사항 대비 부족 항목과 설계 변경 후보를 비교",
      coreDeliverable: "BIW 설계 검토표",
      dataDeliverable: "차체 요구사항-시험 결과 비교표",
      finalCheck: "패키지, 충돌안전, 제조성, 도면·공차 요구"
    },
    "chassis-suspension-engineer": {
      system: "섀시·현가·제동",
      input: "조향, 제동, 현가 하중 케이스와 승차감 지표",
      method: "차량동역학 지표와 시험 조건 비교",
      dataTheme: "실차 주행·내구 데이터",
      dataInput: "속도, 조향각, 제동, 진동, 변위 로그",
      analysis: "기준값 대비 응답 차이와 개선 후보를 표시",
      coreDeliverable: "섀시 성능·내구 조건표",
      dataDeliverable: "주행시험 응답 비교 리포트",
      finalCheck: "조향·제동·현가 성능과 내구 시험 조건"
    },
    "powertrain-mechanical-engineer": {
      system: "파워트레인·구동계",
      input: "토크, 회전수, 기어비, 베어링 하중, NVH 조건",
      method: "토크 전달 경로와 파손 모드 정리",
      dataTheme: "NVH·내구 시험 데이터",
      dataInput: "진동, 온도, 토크, 회전수, 파손 위치 기록",
      analysis: "파손 모드별 원인 후보와 재시험 조건을 분류",
      coreDeliverable: "구동계 요구사항·하중 경로표",
      dataDeliverable: "NVH·내구 원인 가설 리포트",
      finalCheck: "토크 전달, NVH, 내구, 양산 이슈"
    },
    "vehicle-thermal-management-engineer": {
      system: "차량 열관리",
      input: "배터리, 모터, 인버터, HVAC 열부하와 냉각수 조건",
      method: "열원-냉각경로-목표온도 연결",
      dataTheme: "열 모델·온도 로그",
      dataInput: "유량, 온도, 외기 조건, 급속충전 조건",
      analysis: "고온/저온 조건별 목표 온도 초과 구간을 표시",
      coreDeliverable: "열부하·냉각회로 조건표",
      dataDeliverable: "온도 로그 기반 열관리 검증 리포트",
      finalCheck: "냉각회로, 열모델, 환경시험, 실차 온도"
    },
    "ev-battery-pack-engineer": {
      system: "EV 배터리팩",
      input: "셀·모듈·팩 구조, BMS 신호, 절연, 열폭주 안전 조건",
      method: "팩 구조와 전기안전 검증 항목 매핑",
      dataTheme: "BMS·온도·전압 로그",
      dataInput: "CAN 전압, 전류, 온도, 인터락, 절연 상태",
      analysis: "고장 후보와 안전 검증 항목을 연결",
      coreDeliverable: "배터리팩 안전 요구사항표",
      dataDeliverable: "BMS 로그 기반 고장 가설표",
      finalCheck: "BMS, HV 안전, 열폭주, 절연, 시험조건"
    },
    "vehicle-ee-architecture-engineer": {
      system: "차량 E/E 아키텍처",
      input: "ECU, 센서, 액추에이터, 전원, CAN/LIN/Ethernet 신호",
      method: "기능 요구사항을 네트워크·전원 인터페이스로 분해",
      dataTheme: "DBC·진단 신호",
      dataInput: "CAN 메시지, DTC, 전원 분배, 인터페이스 변경 이력",
      analysis: "변경 영향과 진단 요구사항을 신호 단위로 표시",
      coreDeliverable: "E/E 인터페이스 정의서",
      dataDeliverable: "CAN·진단 신호 영향 분석표",
      finalCheck: "ECU, 네트워크, 전원분배, UDS/DTC"
    },
    "automotive-embedded-sw-engineer": {
      system: "ECU 임베디드 SW",
      input: "센서 입력, 상태머신, 제어 출력, CAN 진단 요구",
      method: "요구사항을 테스트 케이스와 로그 확인 조건으로 변환",
      dataTheme: "ECU 로그·CAN 진단",
      dataInput: "CAN 메시지, DBC, UDS 응답, fault 로그",
      analysis: "재현 조건과 원인 후보를 SW/통신/센서로 분리",
      coreDeliverable: "ECU 요구사항-테스트 케이스표",
      dataDeliverable: "CAN 로그 디버깅 리포트",
      finalCheck: "C/C++, CAN, AUTOSAR, 진단, 디버깅"
    },
    "hil-sil-validation-engineer": {
      system: "HIL·SIL 검증",
      input: "요구사항, 테스트 케이스, HIL I/O, CAN 신호, fault 조건",
      method: "정상·고장·경계 조건 테스트 설계",
      dataTheme: "HIL 테스트 로그",
      dataInput: "테스트 시퀀스, CAN 로그, fault injection 결과",
      analysis: "Pass/Fail과 실패 원인을 SW/모델/장비로 분류",
      coreDeliverable: "HIL 테스트 케이스 매트릭스",
      dataDeliverable: "HIL 실패 로그 분류 리포트",
      finalCheck: "요구사항 검증, Test Case, CANoe, HIL/SIL"
    },
    "adas-validation-engineer": {
      system: "ADAS·자율주행 검증",
      input: "AEB/LKA/ACC 기능, 센서, 시나리오, 안전 판정 기준",
      method: "주행 시나리오와 Pass/Fail 기준 작성",
      dataTheme: "센서융합·인지 결과",
      dataInput: "카메라, 레이더, 라이다, GPS/IMU, CAN 로그",
      analysis: "false positive/negative와 시나리오 조건을 연결",
      coreDeliverable: "ADAS 시나리오 검증표",
      dataDeliverable: "센서/CAN 로그 동기화 평가표",
      finalCheck: "ADAS 기능, 센서융합, 시나리오, 실차검증"
    },
    "ev-power-electronics-engineer": {
      system: "EV 전력전자",
      input: "인버터, OBC, DC-DC, 전류 센싱, 게이트 드라이브 조건",
      method: "효율, 리플, 발열, EMI 검증 항목 정리",
      dataTheme: "전력전자 계측 데이터",
      dataInput: "전압, 전류, 리플, 온도, 효율, 스위칭 파형",
      analysis: "측정 조건별 손실·발열·EMI 리스크를 비교",
      coreDeliverable: "전력전자 검증 체크리스트",
      dataDeliverable: "인버터 계측 결과 리포트",
      finalCheck: "전력전자, EMI, HV 안전, 계측, 보호회로"
    },
    "vehicle-test-validation-engineer": {
      system: "실차 시험·차량 검증",
      input: "DVP&R, 시험 조건, 계측 채널, 판정 기준",
      method: "요구사항을 시험 항목과 Pass/Fail 기준으로 변환",
      dataTheme: "실차 계측 로그",
      dataInput: "온도, 진동, 전류, 위치, CAN, 환경 조건 로그",
      analysis: "불합격 구간과 관련 채널을 연결해 재시험 조건을 제안",
      coreDeliverable: "DVP&R 시험계획서",
      dataDeliverable: "실차 로그 기반 검증 리포트",
      finalCheck: "DVP&R, 실차시험, 계측채널, 결과정리"
    }
  };

  return profiles[role.id] || {
    system: "자동차 시스템",
    input: "차량 요구사항, 인터페이스, 시험 조건",
    method: "요구사항을 검증 가능한 산출물로 변환",
    dataTheme: "차량 로그·시험 데이터",
    dataInput: "CAN, 센서, 시험 결과 로그",
    analysis: "기준값 대비 차이와 원인 후보를 표시",
    coreDeliverable: "자동차 직무 요구사항 매핑표",
    dataDeliverable: "차량 시험 데이터 검증 리포트",
    finalCheck: "차량 요구사항과 검증 산출물"
  };
}

function getVisibleRoadmapTasks(trackId) {
  const coreTasks = getCurriculumTasks(trackId).map((task, index) => ({
    ...task,
    baseTitle: task.baseTitle || task.title,
    baseIndex: index,
    planWeek: index + 1,
    weekLabel: `${index + 1}주차`,
    phase: "핵심"
  }));
  const weeks = getDurationWeeks();
  const prioritizedCoreTasks = getPrioritizedCoreTasks(trackId, coreTasks).map((task, index) => ({
    ...task,
    planWeek: index + 1,
    weekLabel: `${index + 1}주차`,
    priorityReason: getTaskPriorityReason(task, trackId)
  }));

  if (weeks <= 2) {
    return prioritizedCoreTasks
      .slice(0, 2)
      .map((task, index) => ({
        ...task,
        planWeek: index + 1,
        weekLabel: `${index + 1}주차`,
        phase: "2주 압축",
        priorityReason: getTaskPriorityReason(task, trackId)
      }));
  }

  if (weeks <= 4) return prioritizedCoreTasks.slice(0, weeks);

  const expanded = [...prioritizedCoreTasks];
  const phases = weeks >= 12 ? ["심화 반복", "포트폴리오 보강"] : ["심화 반복"];
  phases.forEach((phase) => {
    prioritizedCoreTasks.forEach((task) => {
      expanded.push(createExtendedRoadmapTask(task, phase, expanded.length + 1));
    });
  });

  return expanded.slice(0, weeks);
}

function getPrioritizedCoreTasks(trackId, tasks) {
  return [...tasks].sort((a, b) => getTaskPriorityScore(b, trackId) - getTaskPriorityScore(a, trackId));
}

function getTaskPriorityScore(task, trackId) {
  const text = getTaskSearchText(task);
  const gapMatches = getGapSkills(trackId).filter((skill) => text.includes(skill)).length;
  const role = getSelectedRole(trackId);
  const roleMatches = role ? role.postingKeywords.filter((keyword) => text.includes(keyword)).length : 0;
  const introSignal = /입문|개념|용어|기초|흐름|요구사항|블록도|정리/.test(text) ? 1 : 0;
  const practiceSignal = /실습|시뮬레이션|부트캠프|프로젝트|멘토링|현장실습|KDT|그래프|표|모델|데이터|분석|초안|측정/.test(text) ? 1 : 0;
  const portfolioSignal = /보고서|리포트|README|검증|제안|개선|체크리스트/.test(text) ? 1 : 0;
  const foundationSignal = task.baseIndex <= 1 ? 1 : 0;
  const goal = state.profile.goal;
  const competencyGapSignal = gapMatches ? 1 : 0;

  return 100 - task.baseIndex * 8
    + gapMatches * 18
    + roleMatches * 10
    + competencyGapSignal * 16
    + (goal === "explore" ? introSignal * 26 : 0)
    + (goal === "foundation" ? foundationSignal * 20 + gapMatches * 14 : 0)
    + (goal === "portfolio" ? portfolioSignal * 30 + practiceSignal * 10 : 0)
    + (goal === "interview" ? portfolioSignal * 24 + roleMatches * 8 : 0);
}

function getTaskPriorityReason(task, trackId) {
  const text = getTaskSearchText(task);
  const gapMatch = getGapSkills(trackId).find((skill) => text.includes(skill));
  const role = getSelectedRole(trackId);
  const roleKeyword = role?.postingKeywords.find((keyword) => text.includes(keyword));

  if (gapMatch) return `현재 역량 체크에서 비어 있는 ${gapMatch} 역량을 직접 보완합니다.`;
  if (roleKeyword) return `${role.title} 채용공고 키워드인 ${roleKeyword}와 바로 연결됩니다.`;
  if (state.profile.goal === "portfolio" || state.profile.goal === "interview") return "짧은 기간 안에 설명 가능한 산출물을 남기는 과제입니다.";
  if (state.profile.goal === "explore") return "직무 탐색 목표에 맞춰 업무 흐름과 핵심 용어를 확인하는 과제입니다.";
  return "짧은 기간에서 직무 이해와 기본 산출물을 빠르게 만드는 과제입니다.";
}

function createExtendedRoadmapTask(task, phase, planWeek) {
  const isPortfolioPhase = phase === "포트폴리오 보강";
  return {
    ...task,
    title: isPortfolioPhase ? `${task.baseTitle} 산출물 보강` : `${task.baseTitle} 심화 반복`,
    objective: isPortfolioPhase
      ? `${task.deliverable}을 면접에서 설명할 수 있도록 문제, 방법, 결과, 배운 점 순서로 다듬습니다.`
      : `${task.objective} 같은 과제를 다른 예제나 조건으로 반복해 판단 기준을 굳힙니다.`,
    steps: isPortfolioPhase
      ? [
        "이전 산출물에서 근거가 약한 부분 1개를 고릅니다.",
        "수치, 조건, 비교표, 캡처 중 부족한 증거를 보강합니다.",
        "면접에서 60초 안에 설명할 문제-방법-결과 문장을 만듭니다."
      ]
      : [
        "첫 수행 산출물에서 부족한 기준 1개를 고릅니다.",
        "데이터, 조건, 예제를 바꿔 같은 과제를 다시 수행합니다.",
        "첫 결과와 반복 결과의 차이를 한 문단으로 정리합니다."
      ],
    deliverable: isPortfolioPhase ? `${task.deliverable} 보강본` : `${task.deliverable} 반복본`,
    rubric: isPortfolioPhase
      ? ["문제와 역할이 명확하다", "근거 자료가 포함된다", "면접 답변으로 설명 가능하다"]
      : ["반복 전후 차이가 보인다", "같은 기준으로 비교했다", "다음 개선점이 적혀 있다"],
    planWeek,
    weekLabel: `${planWeek}주차`,
    phase,
    priorityReason: isPortfolioPhase
      ? "준비 기간이 길어 산출물을 채용 설명형 결과물로 다듬는 주차입니다."
      : "반복 수행으로 실제 직무 판단 기준을 굳히는 주차입니다."
  };
}

function getTaskSearchText(task) {
  return [
    task.title,
    task.baseTitle,
    task.objective,
    task.deliverable,
    ...(task.steps || []),
    ...(task.rubric || [])
  ].join(" ");
}

function getRoadmapStepId(trackId, task) {
  return `${trackId}-${getDurationWeeks()}w-${task.planWeek}-${task.baseIndex}`;
}

function getNextCurriculumTask(trackId) {
  const tasks = getVisibleRoadmapTasks(trackId);
  return tasks.find((task) => !state.completedRoadmap.includes(getRoadmapStepId(trackId, task))) || tasks[tasks.length - 1];
}

function getRecommendedResources(track, context) {
  const candidates = resources.filter((resource) => {
    const trackMatch = resource.tracks.includes(track.id);
    return trackMatch;
  });
  const gapLinked = candidates.filter((resource) => getResourceGapMatches(resource, context).length);
  const roleLinked = candidates.filter((resource) => getRoleLinkedResourceIds(context.role).includes(resource.id));
  const roadmapLinked = candidates.filter((resource) => getResourceLinkedTasks(resource.id, context.visibleTasks).length);
  const pool = uniqueResources(context.gapSkills.length
    ? [...gapLinked, ...roleLinked, ...roadmapLinked, ...candidates]
    : [...roleLinked, ...roadmapLinked, ...candidates]);
  return pool
    .map((resource) => ({
      resource,
      score: getEducationResourceScore(resource, context)
    }))
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return sortResourcesForLearning(a.resource, b.resource, context);
    })
    .map((item) => item.resource);
}

function getRoadmapResourcesForTask(track, task, context, resourceUseCounts = new Map()) {
  const trackResources = resources.filter((resource) => resource.tracks.includes(track.id));
  const selectedResources = trackResources.filter((resource) => state.saved.includes(resource.id));
  const gapLinked = trackResources.filter((resource) => getResourceGapMatches(resource, context).length);
  const roleLinked = trackResources.filter((resource) => getRoleLinkedResourceIds(context.role).includes(resource.id));
  const directlyLinked = trackResources.filter((resource) => getResourceLinkedTasks(resource.id, [task]).length);
  const taskMatched = trackResources.filter((resource) => (
    getTaskMatchedSkills(resource, task).length
    || getTaskResourceKeywordMatches(resource, task).length
    || getTaskRoleKeywordMatches(resource, task, context.role).length
  ));
  const preferredPool = uniqueResources([...selectedResources, ...gapLinked, ...directlyLinked, ...roleLinked, ...taskMatched]);
  const pool = preferredPool.length >= 3
    ? preferredPool
    : uniqueResources([...preferredPool, ...trackResources]);

  const ranked = pool
    .map((resource) => ({
      resource,
      score: getTaskResourceScore(resource, task, context, resourceUseCounts)
    }))
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return sortResourcesForLearning(a.resource, b.resource, context);
    });
  const unusedRelevant = ranked.filter((item) => getRoadmapResourceUseCount(resourceUseCounts, item.resource.id) === 0 && item.score >= 8);
  const resourceLimit = getRoadmapResourceLimit(context);
  const selected = unusedRelevant.slice(0, resourceLimit);

  if (selected.length < resourceLimit) {
    selected.push(...ranked
      .filter((item) => !selected.some((selectedItem) => selectedItem.resource.id === item.resource.id))
      .slice(0, resourceLimit - selected.length));
  }

  return selected.map((item) => item.resource);
}

function getRoadmapResourceLimit(context) {
  if (context.durationWeeks <= 2) return 2;
  if (context.durationWeeks <= 4) return 3;
  return 3;
}

function uniqueResources(resourceList) {
  return [...new Map(resourceList.map((resource) => [resource.id, resource])).values()];
}

function getGoalRecommendationLabel(goalKey) {
  return goalRecommendationLabels[goalKey] || goalRecommendationLabels.foundation;
}

function renderGoalRuleGrid(activeGoalKey) {
  return `
    <div class="goal-rule-grid" aria-label="학습목표별 추천 기준">
      ${Object.entries(goalScoringRules).map(([key, rule]) => `
        <div class="goal-rule ${key === activeGoalKey ? "is-active" : ""}">
          <strong>${rule.label}</strong>
          <span>자료: ${rule.resource}</span>
          <span>로드맵: ${rule.roadmap}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderCompetencyActionPlan(context, tasks) {
  const actionItems = getCompetencyActionItems(context, tasks).slice(0, 4);
  return `
    <section class="competency-action-panel" aria-label="역량 확보 우선순위">
      <div class="competency-action-head">
        <strong>역량 확보 우선순위</strong>
        <span>먼저 할 일을 정한 뒤, 예시 자료 중 필요한 것만 계획에 넣으세요.</span>
      </div>
      <div class="competency-action-list">
        ${actionItems.map((item, index) => `
          <article class="competency-action-item">
            <span class="competency-action-number">${index + 1}</span>
            <div>
              <strong>${item.title}</strong>
              <p>${item.body}</p>
              <em>남길 것: ${item.deliverable}</em>
              ${item.resources.length ? `
                <div class="competency-example-resources">
                  <span>예시 자료</span>
                  ${item.resources.map((resource) => `
                    <div class="competency-example-resource">
                      <strong>${resource.title}</strong>
                      <div>
                        <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
                        ${renderSaveActionButton(resource, "내 커리큘럼에 추가")}
                      </div>
                    </div>
                  `).join("")}
                </div>
              ` : ""}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function getCompetencyActionItems(context, tasks) {
  const usedResourceIds = new Set();
  return tasks.map((task, index) => {
    const resourcesForTask = getCompetencyActionResources(context, task, usedResourceIds);
    resourcesForTask.forEach((resource) => usedResourceIds.add(resource.id));
    const defaultBodies = [
      "지원 회사 공고의 업무·자격요건 문장과 앱의 직무 설명을 맞춰보고, 이 직무가 실제로 내가 준비하려는 업무인지 판단합니다.",
      "체크하지 못한 역량 중 하나를 골라 개념 설명이 아니라 계산, 표, 모델, 로그 중 하나로 증명합니다.",
      "시뮬레이션, 데이터 분석, 현장실습, 부트캠프 중 현재 환경에서 가능한 방식을 골라 작은 산출물을 만듭니다.",
      "일반 로드맵 결과물을 지원 회사 공고 문장에 맞춰 줄이고, 면접에서 설명할 근거만 남깁니다."
    ];
    return {
      title: task.title,
      body: defaultBodies[index] || task.objective,
      deliverable: task.deliverable,
      resources: resourcesForTask
    };
  });
}

function getCompetencyActionResources(context, task, usedResourceIds = new Set()) {
  const rankedResources = resources
    .filter((resource) => resource.tracks.includes(context.track.id))
    .map((resource) => ({
      resource,
      score: getTaskResourceScore(resource, task, context) + (isHandsOnResource(resource) ? 70 : 0)
    }))
    .sort((a, b) => b.score - a.score);
  const freshResources = rankedResources.filter((item) => !usedResourceIds.has(item.resource.id));
  const selectedResources = freshResources.slice(0, 2);
  if (selectedResources.length < 2) {
    const selectedIds = new Set(selectedResources.map((item) => item.resource.id));
    selectedResources.push(...rankedResources
      .filter((item) => !selectedIds.has(item.resource.id))
      .slice(0, 2 - selectedResources.length));
  }
  return selectedResources
    .map((item) => item.resource);
}

function renderHandsOnResourcePanel(context) {
  const resourcesForPractice = getHandsOnResourceCandidates(context).slice(0, 3);
  if (!resourcesForPractice.length) return "";

  return `
    <div class="hands-on-resource-panel">
      <div>
        <strong>직접 실습 후보</strong>
        <span>시뮬레이션, 현장실습, 직무부트캠프처럼 산출물을 남기기 좋은 자료입니다.</span>
      </div>
      <div class="hands-on-resource-list">
        ${resourcesForPractice.map((resource) => `
          <div class="hands-on-resource-link">
            <span>
              <strong>${resource.title}</strong>
              <em>${resource.provider} · ${resource.type} · ${formatMinutes(resource.totalMinutes)}</em>
            </span>
            <span>
              <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
              ${renderSaveActionButton(resource, "내 커리큘럼에 추가")}
            </span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function getHandsOnResourceCandidates(context) {
  return getRecommendedResources(context.track, context)
    .filter(isHandsOnResource)
    .sort((a, b) => getHandsOnResourceScore(b, context) - getHandsOnResourceScore(a, context));
}

function getHandsOnResourceScore(resource, context) {
  const roleLinked = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
  const externalCourse = /코멘토|렛유인|STEP|HRD-Net|K-MOOC|KOCW|Coursera|edX|인프런|Udemy|Boostcourse|Ansys|NI|Google/.test(resource.provider) ? 1 : 0;
  const simulation = /Simulink|Simscape|Stateflow|시뮬레이션|HIL|SIL|모델링|모델/.test(getResourceBadgeText(resource)) ? 1 : 0;
  return getEducationResourceScore(resource, context)
    + roleLinked * 90
    + externalCourse * 180
    + simulation * 30
    + Math.min(resource.practiceMinutes, 720) * 0.04;
}

function countKeywordMatches(text, keywords) {
  return keywords.filter((keyword) => text.includes(String(keyword).toLowerCase())).length;
}

function clampScore(score, min, max) {
  return Math.max(min, Math.min(max, score));
}

function getCompetencyFitScore(resource, context) {
  const text = getResourceSearchText(resource);
  const coreResource = resource.core ? 1 : 0;
  const gapMatches = getResourceGapMatches(resource, context).length;
  const acquiredMatches = getResourceAcquiredMatches(resource, context).length;
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role).length;
  const linkedTaskMatches = getResourceLinkedTasks(resource.id, context.visibleTasks).length;
  const practiceEvidence = countKeywordMatches(text, ["실습", "시뮬레이션", "부트캠프", "프로젝트", "멘토링", "현장실습", "KDT", "보고서", "리포트", "README", "검증", "그래프", "표", "체크리스트"]);
  const shortDurationFit = context.durationWeeks <= 2 && resource.totalMinutes <= 180 ? 1 : 0;
  let score = 0;

  score += gapMatches * 34;
  score += roleKeywordMatches * 16;
  score += linkedTaskMatches * 14;
  score += Math.min(practiceEvidence, 4) * 6;
  score += shortDurationFit * 10;
  score += coreResource * 16;
  if (resource.provider === "MathWorks" && isMathWorksRequiredForRole(context)) score += 16;
  if (context.gapSkills.length && acquiredMatches && !gapMatches) score -= 18;

  return clampScore(score, 0, 92);
}

function getGoalResourceScore(resource, context) {
  const text = getResourceSearchText(resource);
  const goalKey = context.goalKey || "foundation";
  const preferredDifficulty = context.goal.preferredDifficulties.includes(resource.difficulty) ? 1 : 0;
  const gapMatches = getResourceGapMatches(resource, context).length;
  const goalSkillMatches = (resource.skills || []).filter((skill) => context.goal.prioritySkills.includes(skill)).length;
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role).length;
  const outputEvidenceMatches = countKeywordMatches(text, [
    "보고서",
    "리포트",
    "README",
    "검증",
    "그래프",
    "표",
    "모델",
    "비교",
    "체크리스트",
    "근거",
    "메모"
  ]);
  const officialSource = /공식|정부|협회|대학|ocw|무료교육|무료청강|mathworks|ncs|nist|asq|coursera|edx|khan|freecodecamp|hrd-net|gseek|인프런|udemy|youtube|ansys|ni|google|boostcourse/.test(text) ? 1 : 0;
  let score = 0;

  if (goalKey === "explore") {
    score += (resource.difficulty === "입문" ? 34 : 0)
      + goalSkillMatches * 22
      + (resource.totalMinutes <= 180 ? 12 : 0)
      + (resource.languageCode === "ko" ? 10 : 0)
      + countKeywordMatches(text, ["직무 이해", "용어", "개념", "ncs", "요약"]) * 8
      - (resource.difficulty === "적용" ? 10 : 0);
  }

  if (goalKey === "foundation") {
    score += gapMatches * 30
      + preferredDifficulty * 20
      + goalSkillMatches * 12
      + (resource.sequenceLevel <= 3 ? 10 : 0)
      + countKeywordMatches(text, ["기초", "입문", "보완", "onramp"]) * 6;
  }

  if (goalKey === "portfolio") {
    score += (resource.practiceMinutes >= 60 ? 26 : 0)
      + (resource.difficulty !== "입문" ? 16 : 0)
      + Math.min(outputEvidenceMatches, 4) * 9
      + goalSkillMatches * 14
      + (resource.totalMinutes >= 120 ? 6 : 0);
  }

  if (goalKey === "interview") {
    score += Math.min(roleKeywordMatches, 3) * 18
      + Math.min(outputEvidenceMatches, 4) * 8
      + preferredDifficulty * 14
      + (resource.totalMinutes <= 240 ? 10 : 0)
      + officialSource * 8
      + goalSkillMatches * 12;
  }

  return clampScore(score, 0, 84);
}

function getCompetencyFitSignal(resource, context) {
  const score = getCompetencyFitScore(resource, context);
  if (score < 24) return "";
  return "역량 체크 기반 추천";
}

function getGoalFitSignal(resource, context) {
  const score = getGoalResourceScore(resource, context);
  if (score < 24) return "";
  return `목표 반영: ${context.goal.label} · ${getGoalRecommendationLabel(context.goalKey)}`;
}

function getEducationResourceScore(resource, context) {
  const coreResource = resource.core ? 1 : 0;
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
  const mathWorksRoleNeed = resource.provider === "MathWorks" && isMathWorksRequiredForRole(context) ? 1 : 0;
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role).length;
  const gapMatches = getResourceGapMatches(resource, context).length;
  const acquiredMatches = getResourceAcquiredMatches(resource, context).length;
  const taskMatches = getResourceLinkedTasks(resource.id, context.visibleTasks).length;
  const mathWorksMatches = getMathWorksSkillMatches(resource, context).length;
  const competencyScore = getCompetencyFitScore(resource, context);
  const goalScore = getGoalResourceScore(resource, context);
  const selectedMatch = state.saved.includes(resource.id) ? 1 : 0;
  const broadPenalty = resource.broad && !selectedMatch ? 90 : 0;
  const completedPenalty = state.completed.includes(resource.id) ? 18 : 0;
  const acquiredOnlyPenalty = context.gapSkills.length && acquiredMatches && !gapMatches ? 80 : 0;
  const noGapPenalty = context.gapSkills.length && !gapMatches ? 28 : 0;

  return roleDirectMatch * 140
    + coreResource * 90
    + gapMatches * 48
    + mathWorksRoleNeed * 80
    + mathWorksMatches * 36
    + roleKeywordMatches * 22
    + taskMatches * 18
    + competencyScore
    + goalScore
    + getResourcePriorityScore(resource, context)
    + selectedMatch * 24
    - broadPenalty
    - completedPenalty
    - acquiredOnlyPenalty
    - noGapPenalty;
}

function getEducationResourceSignals(resource, context) {
  const signals = [];
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id);
  const matchedGaps = getResourceGapMatches(resource, context);
  const mathWorksMatches = getMathWorksSkillMatches(resource, context);
  const mathWorksRoleNeed = resource.provider === "MathWorks" && isMathWorksRequiredForRole(context);
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role);
  const linkedTasks = getResourceLinkedTasks(resource.id, context.visibleTasks);
  const competencyFitSignal = getCompetencyFitSignal(resource, context);
  const goalFitSignal = getGoalFitSignal(resource, context);

  if (roleDirectMatch) signals.push("선택 직무 직접 추천");
  if (resource.core) signals.push("핵심 직무역량 교육");
  if (competencyFitSignal) signals.push(competencyFitSignal);
  if (goalFitSignal) signals.push(goalFitSignal);
  if (mathWorksRoleNeed) signals.push("MathWorks 요구 직무");
  if (matchedGaps.length) signals.push(`역량 체크 보완: ${matchedGaps.slice(0, 2).join(", ")}`);
  if (mathWorksMatches.length) signals.push(`MathWorks 역량: ${mathWorksMatches.slice(0, 2).join(", ")}`);
  if (roleKeywordMatches.length) signals.push(`채용 키워드: ${roleKeywordMatches.slice(0, 2).join(", ")}`);
  if (linkedTasks.length) signals.push(`로드맵 연결: ${linkedTasks.slice(0, 2).join(", ")}`);
  if (state.saved.includes(resource.id)) signals.push("계획 선택됨");

  return signals;
}

function getRoleLinkedResourceIds(role) {
  if (!role) return [];
  return roleResourceLinks[role.id] || [];
}

function getMathWorksSkillMatches(resource, context) {
  if (resource.provider !== "MathWorks") return [];
  const roleText = context.role ? getRoleSearchText(context.track, context.role) : "";
  const diagnosticText = context.role ? (roleDiagnostics[context.role.id] || []).flat().join(" ").toLowerCase() : "";
  const combinedText = `${roleText} ${diagnosticText}`;
  return (resource.skills || []).filter((skill) => {
    const normalized = skill.toLowerCase();
    return combinedText.includes(normalized)
      || getSearchTokens(skill).some((token) => combinedText.includes(token));
  });
}

function isMathWorksRequiredForRole(context) {
  if (!context.role) return false;
  const roleText = getRoleSearchText(context.track, context.role);
  return [
    "matlab",
    "simulink",
    "model based",
    "model-based",
    "모델 기반",
    "sil",
    "hil",
    "mpc",
    "foc",
    "sensor fusion",
    "센서융합",
    "kalman"
  ].some((keyword) => roleText.includes(keyword));
}

function getTaskResourceScore(resource, task, context, resourceUseCounts = new Map()) {
  const coreResource = resource.core ? 1 : 0;
  const directTaskMatches = getResourceLinkedTasks(resource.id, [task]).length;
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id) ? 1 : 0;
  const mathWorksRoleNeed = resource.provider === "MathWorks" && isMathWorksRequiredForRole(context) ? 1 : 0;
  const matchedSkills = getTaskMatchedSkills(resource, task).length;
  const keywordMatches = getTaskResourceKeywordMatches(resource, task).length;
  const roleKeywordMatches = getTaskRoleKeywordMatches(resource, task, context.role).length;
  const gapMatches = getTaskGapMatches(resource, task, context.gapSkills).length;
  const resourceGapMatches = getResourceGapMatches(resource, context).length;
  const acquiredMatches = getResourceAcquiredMatches(resource, context).length;
  const outputMatches = getTaskOutputMatches(resource, task).length;
  const otherLinkedTaskMatches = getOtherLinkedTaskMatches(resource, task, context).length;
  const competencyScore = getCompetencyFitScore(resource, context);
  const goalScore = getGoalResourceScore(resource, context);
  const selectedMatch = state.saved.includes(resource.id) ? 1 : 0;
  const handsOnMatch = isHandsOnResource(resource) ? 1 : 0;
  const alreadyUsedPenalty = getRoadmapResourceUseCount(resourceUseCounts, resource.id) * 220;
  const durationPenalty = getDurationResourcePenalty(resource, context);
  const broadPenalty = resource.broad && !selectedMatch ? 180 : 0;
  const acquiredOnlyPenalty = context.gapSkills.length && acquiredMatches && !resourceGapMatches ? 160 : 0;
  const noGapPenalty = context.gapSkills.length && !resourceGapMatches && !gapMatches ? 70 : 0;

  return directTaskMatches * 160
    + coreResource * 95
    + (coreResource && directTaskMatches ? 75 : 0)
    + selectedMatch * 90
    + roleDirectMatch * 45
    + mathWorksRoleNeed * 35
    + matchedSkills * 45
    + Math.min(keywordMatches, 6) * 10
    + resourceGapMatches * 90
    + gapMatches * 45
    + roleKeywordMatches * 18
    + outputMatches * 14
    + handsOnMatch * 36
    + competencyScore * 0.45
    + goalScore * 0.45
    + getResourcePriorityScore(resource, context) * 0.15
    - (directTaskMatches ? 0 : otherLinkedTaskMatches * 180)
    - alreadyUsedPenalty
    - durationPenalty
    - broadPenalty
    - acquiredOnlyPenalty
    - noGapPenalty;
}

function getDurationResourcePenalty(resource, context) {
  if (context.durationWeeks <= 2) {
    return (resource.totalMinutes > 240 ? 90 : 0)
      + (resource.difficulty === "적용" && resource.practiceMinutes < 60 ? 35 : 0);
  }

  if (context.durationWeeks <= 4) {
    return resource.totalMinutes > 420 ? 45 : 0;
  }

  if (context.durationWeeks >= 8 && resource.practiceMinutes >= 60) {
    return -20;
  }

  return 0;
}

function getRoadmapResourceUseCount(resourceUseCounts, resourceId) {
  return resourceUseCounts instanceof Map
    ? resourceUseCounts.get(resourceId) || 0
    : Number(resourceUseCounts?.has?.(resourceId) || 0);
}

function getTaskResourceSignals(resource, task, context) {
  const signals = [];
  const directTaskMatches = getResourceLinkedTasks(resource.id, [task]);
  const roleDirectMatch = getRoleLinkedResourceIds(context.role).includes(resource.id);
  const matchedSkills = getTaskMatchedSkills(resource, task);
  const gapMatches = getTaskGapMatches(resource, task, context.gapSkills);
  const resourceGapMatches = getResourceGapMatches(resource, context);
  const roleKeywordMatches = getTaskRoleKeywordMatches(resource, task, context.role);
  const competencyFitSignal = getCompetencyFitSignal(resource, context);
  const goalFitSignal = getGoalFitSignal(resource, context);

  if (directTaskMatches.length) signals.push("이번 주 과제 직접 연결");
  if (resourceGapMatches.length) signals.push(`부족 역량 보완: ${resourceGapMatches.slice(0, 2).join(", ")}`);
  if (resource.core) signals.push("핵심 직무역량 교육");
  if (roleDirectMatch) signals.push("선택 직무 직접 추천");
  if (competencyFitSignal) signals.push(competencyFitSignal);
  if (goalFitSignal) signals.push(goalFitSignal);
  if (matchedSkills.length) signals.push(`과제 역량: ${matchedSkills.slice(0, 2).join(", ")}`);
  if (gapMatches.length) signals.push(`과제 결핍 연결: ${gapMatches.slice(0, 2).join(", ")}`);
  if (roleKeywordMatches.length) signals.push(`세부 직무 키워드: ${roleKeywordMatches.slice(0, 2).join(", ")}`);
  if (!signals.length) signals.push(`이번 주 산출물: ${task.deliverable}`);

  return signals;
}

function getTaskMatchedSkills(resource, task) {
  const taskText = getTaskSearchText(task).toLowerCase();
  return (resource.skills || []).filter((skill) => taskText.includes(skill.toLowerCase()));
}

function getTaskGapMatches(resource, task, gapSkills) {
  const taskText = getTaskSearchText(task).toLowerCase();
  const resourceText = getResourceSearchText(resource);
  return gapSkills.filter((skill) => {
    const normalized = skill.toLowerCase();
    return taskText.includes(normalized) && resourceText.includes(normalized);
  });
}

function getResourceSkillMatches(resource, skills) {
  const resourceText = getResourceSearchText(resource);
  return (skills || []).filter((skill) => {
    const normalized = skill.toLowerCase();
    return resourceText.includes(normalized)
      || getSearchTokens(skill).some((token) => resourceText.includes(token));
  });
}

function getResourceGapMatches(resource, context) {
  return getResourceSkillMatches(resource, context.gapSkills);
}

function getResourceAcquiredMatches(resource, context) {
  return getResourceSkillMatches(resource, context.acquiredSkills);
}

function getTaskRoleKeywordMatches(resource, task, role) {
  if (!role) return [];
  const taskText = getTaskSearchText(task).toLowerCase();
  const resourceText = getResourceSearchText(resource);
  return role.postingKeywords.filter((keyword) => {
    const normalized = keyword.toLowerCase();
    return taskText.includes(normalized) && resourceText.includes(normalized);
  });
}

function getTaskOutputMatches(resource, task) {
  const resourceText = getResourceSearchText(resource);
  return getSearchTokens(task.deliverable).filter((token) => resourceText.includes(token));
}

function getOtherLinkedTaskMatches(resource, task, context) {
  const currentTaskTitle = task.baseTitle || task.title;
  return getResourceLinkedTasks(resource.id, context.visibleTasks)
    .filter((taskTitle) => taskTitle !== currentTaskTitle);
}

function getTaskResourceKeywordMatches(resource, task) {
  const resourceText = getResourceSearchText(resource);
  return getSearchTokens(getTaskSearchText(task))
    .filter((token) => !roadmapResourceStopwords.has(token))
    .filter((token) => resourceText.includes(token));
}

function getResourceSearchText(resource) {
  return [
    resource.title,
    resource.provider,
    resource.type,
    resource.language,
    resource.difficulty,
    resource.reason,
    resource.expectedOutput,
    resource.output,
    ...(resource.skills || []),
    ...(resource.prerequisites || [])
  ].join(" ").toLowerCase();
}

function getSearchTokens(text) {
  return [...new Set(String(text || "")
    .toLowerCase()
    .split(/[^0-9a-z가-힣/+.#]+/i)
    .filter((token) => token.length >= 2))];
}

const roadmapResourceStopwords = new Set([
  "과제",
  "교육",
  "자료",
  "후보",
  "기록",
  "요약",
  "정리",
  "검토",
  "선택",
  "연결",
  "기초",
  "실습",
  "산출물",
  "보고서",
  "가능",
  "이번",
  "주차",
  "관심",
  "직무"
]);

function renderRoadmapResourceItem(resource, task, context) {
  const saved = state.saved.includes(resource.id);
  const taskSignals = getTaskResourceSignals(resource, task, context);
  const signals = [...new Set([...taskSignals, ...getResourceSignals(resource, context)])]
    .filter((signal) => !signal.startsWith("로드맵 연결"))
    .slice(0, 3);
  const score = Math.round(getTaskResourceScore(resource, task, context));
  const coreLabel = resource.core ? "핵심 교육 · " : "";
  const connectionReason = getTaskResourceConnectionReason(resource, task, context);

  return `
    <details class="roadmap-resource-item">
      <summary>
        <span class="roadmap-resource-title">
          <strong>${resource.title}</strong>
          <em>${resource.provider} · ${resource.type} · ${formatMinutes(resource.totalMinutes)}</em>
          ${renderResourceTrustBadges(resource)}
        </span>
        <span class="roadmap-resource-status">${coreLabel}자동추천 ${score}점</span>
      </summary>
      <div class="roadmap-resource-detail">
        <p>${resource.provider} · ${resource.difficulty} · ${formatMinutes(resource.totalMinutes)}</p>
        <p><strong>자동 배치 근거:</strong> ${connectionReason}</p>
        <p><strong>연결 산출물:</strong> ${resource.expectedOutput}</p>
        ${signals.length ? `<p>${signals.join(" · ")}</p>` : `<p>${task.deliverable}에 바로 연결됩니다.</p>`}
        <div class="roadmap-resource-actions">
          <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
          ${renderSaveActionButton(resource)}
        </div>
      </div>
    </details>
  `;
}

function renderResourceTrustBadges(resource) {
  const badges = [];
  const directUrl = !/search|results\?|query=|courses\/free\/?$/i.test(resource.url || "");
  const resourceText = getResourceBadgeText(resource);

  if (/Simulink|Simscape|Stateflow|시뮬레이션|HIL|SIL|모델링|모델/.test(resourceText)) badges.push("시뮬레이션");
  if (isHandsOnResource(resource)) badges.push("실습형");
  if (/코멘토|렛유인|Coursera|edX|K-MOOC|KOCW|STEP|HRD-Net|인프런|Udemy|Boostcourse/.test(resource.provider)) badges.push("외부 과정");
  if (/MathWorks|Ansys|NI|Google|Texas Instruments|STMicroelectronics|Arm|KiCad|Linux Kernel|Yocto|ROS/.test(resource.provider)) badges.push("공식 자료");
  if (directUrl) badges.push("직접 링크");
  if (/youtube|영상/i.test(`${resource.provider} ${resource.type}`)) badges.push("동영상");
  if (resource.qualityStatus === "verified") badges.push("검증 자료");
  if (resource.qualityStatus === "reviewed") badges.push("검토 자료");

  const uniqueBadges = [...new Set(badges)];
  return uniqueBadges.length
    ? `<span class="resource-trust-badges">${uniqueBadges.slice(0, 4).map((badge) => `<span>${badge}</span>`).join("")}</span>`
    : "";
}

function isHandsOnResource(resource) {
  return /실습|시뮬레이션|부트캠프|프로젝트|멘토링|현장실습|KDT|인턴체험|과제형|Maintenance|Trouble Shooting/i.test(getResourceBadgeText(resource));
}

function getResourceBadgeText(resource) {
  return [
    resource.title,
    resource.provider,
    resource.type,
    resource.reason,
    resource.expectedOutput,
    ...(resource.skills || [])
  ].join(" ");
}

function getResourceOpenLabel(resource) {
  return /코멘토|렛유인|부트캠프|현장실습|KDT|멘토링|인턴체험/i.test(getResourceBadgeText(resource))
    ? "과정 확인"
    : "교육 열기";
}

function renderSaveActionButton(resource, label = "내 커리큘럼에 추가") {
  const saved = state.saved.includes(resource.id);
  return `
    <button class="resource-action ${saved ? "is-saved" : ""}" type="button" data-save-id="${resource.id}">
      ${saved ? "추가됨 · 제거" : label}
    </button>
  `;
}

function renderCompleteActionButton(resource) {
  const completed = state.completed.includes(resource.id);
  return `
    <button class="resource-action ${completed ? "is-saved" : ""}" type="button" data-complete-id="${resource.id}">
      ${completed ? "완료됨" : "완료 체크"}
    </button>
  `;
}

function getTaskResourceConnectionReason(resource, task, context) {
  const reasons = [];
  const directTaskMatches = getResourceLinkedTasks(resource.id, [task]);
  const gapMatches = getTaskGapMatches(resource, task, context.gapSkills);
  const roleKeywordMatches = getTaskRoleKeywordMatches(resource, task, context.role);
  const matchedSkills = getTaskMatchedSkills(resource, task);
  const outputMatches = getTaskOutputMatches(resource, task);

  if (directTaskMatches.length) reasons.push("이번 주 과제에 직접 연결");
  if (resource.core) reasons.push("핵심 직무역량 교육");
  if (gapMatches.length) reasons.push(`부족 역량 보완: ${gapMatches.slice(0, 2).join(", ")}`);
  if (roleKeywordMatches.length) reasons.push(`채용 키워드 연결: ${roleKeywordMatches.slice(0, 2).join(", ")}`);
  if (matchedSkills.length) reasons.push(`과제 역량 연결: ${matchedSkills.slice(0, 2).join(", ")}`);
  if (outputMatches.length) reasons.push(`산출물 키워드 연결: ${outputMatches.slice(0, 2).join(", ")}`);
  if (resource.provider === "MathWorks" && isMathWorksRequiredForRole(context)) reasons.push("MathWorks 활용 직무 보강");
  if (context.durationWeeks <= 2 && resource.totalMinutes <= 240) reasons.push("짧은 기간에 소화 가능");
  if (context.durationWeeks >= 8 && resource.practiceMinutes >= 60) reasons.push("심화 실습 반복에 적합");

  return reasons.slice(0, 4).join(" · ") || `${task.deliverable} 산출물 작성에 필요한 배경 자료`;
}

function renderSaved() {
  if (!hasActiveRoleSelection()) {
    elements.savedGuidance.innerHTML = `
      <h3>직무 선택 후 내 커리큘럼이 생성됩니다</h3>
      <p>선택 직무 상세, 부족 역량, 주차별 과제, 추천 교육자료, 회사 공고 대조표가 내 커리큘럼으로 정리됩니다.</p>
    `;
    elements.savedList.innerHTML = `<div class="empty-state">직무 탭에서 세부 직무를 선택하세요.</div>`;
    return;
  }

  const track = getSelectedTrack();
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const items = getSavedResources();
  const resourceUseCounts = new Map();

  renderSavedGuidance(items, tasks);
  elements.savedList.innerHTML = `
    <div class="plan-roadmap">
      ${tasks.map((task) => {
        const stepId = getRoadmapStepId(track.id, task);
        const completed = state.completedRoadmap.includes(stepId);
        const linkedResources = getRoadmapResourcesForTask(track, task, context, resourceUseCounts);
        linkedResources.forEach((resource) => {
          resourceUseCounts.set(resource.id, (resourceUseCounts.get(resource.id) || 0) + 1);
        });
        return `
          <article class="plan-week-card ${completed ? "is-completed" : ""}">
            <div class="plan-week-head">
              <span class="week-number">${task.weekLabel}</span>
              <button class="resource-action ${completed ? "is-saved" : ""}" type="button" data-roadmap-step-id="${stepId}">
                ${completed ? "완료됨" : "완료 체크"}
              </button>
            </div>
            <h3>${task.title}</h3>
            <p>${task.objective}</p>
            <div class="task-meta">
              ${task.phase ? `<span class="badge">${task.phase}</span>` : ""}
              <span class="badge">${task.deliverable}</span>
            </div>
            <div class="plan-resource-list">
              ${linkedResources.map((resource) => renderPlanResourceItem(resource, task, context)).join("")}
            </div>
          </article>
        `;
      }).join("")}
    </div>
    ${items.length ? `
      <section class="plan-selected-resources">
        <div class="section-heading compact">
          <div>
            <p class="eyebrow">내가 고른 교육</p>
            <h3>내 커리큘럼에 추가한 교육</h3>
          </div>
        </div>
        ${items.map((resource) => renderResourceCard(resource, null, null, true)).join("")}
      </section>
    ` : `<div class="empty-state">추가한 교육자료가 없어도 위 자동 커리큘럼으로 바로 시작할 수 있습니다. 교육 선택 화면에서 필요한 자료만 내 커리큘럼에 추가하세요.</div>`}
  `;
  elements.savedList.querySelectorAll("[data-roadmap-step-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleListValue("completedRoadmap", button.dataset.roadmapStepId);
      saveState();
      renderSaved();
      renderRoadmap();
    });
  });
  bindResourceActions(elements.savedList);
}

function renderPlanResourceItem(resource, task, context) {
  const saved = state.saved.includes(resource.id);
  const signals = getTaskResourceSignals(resource, task, context).slice(0, 2);
  const connectionReason = getTaskResourceConnectionReason(resource, task, context);
  const coreLabel = resource.core ? "핵심 교육 · " : "";
  return `
    <details class="plan-resource-item">
      <summary>
        <span>
          <strong>${resource.title}</strong>
          <em>${coreLabel}${resource.provider} · ${resource.type} · ${formatMinutes(resource.totalMinutes)}</em>
        </span>
      </summary>
      <div class="plan-resource-detail">
        <p><strong>자동 배치 근거:</strong> ${connectionReason}</p>
        <p>${signals.join(" · ") || `${task.deliverable}에 연결되는 자료입니다.`}</p>
        <p><strong>산출물:</strong> ${resource.expectedOutput}</p>
        <div class="roadmap-resource-actions">
          <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
          ${renderCompleteActionButton(resource)}
        </div>
      </div>
    </details>
  `;
}

function renderSavedGuidance(items, tasks) {
  if (!elements.savedGuidance) return;
  const completedCount = items.filter((resource) => state.completed.includes(resource.id)).length;
  const totalMinutes = items.reduce((sum, resource) => sum + resource.totalMinutes, 0);
  const pendingCount = Math.max(items.length - completedCount, 0);
  const completedWeeks = tasks
    .map((task) => getRoadmapStepId(getSelectedTrack().id, task))
    .filter((stepId) => state.completedRoadmap.includes(stepId)).length;
  const durationStrategy = getDurationStrategy();

  elements.savedGuidance.innerHTML = `
    <h3>내 커리큘럼에서 실제 실행 순서를 확인합니다</h3>
    <p>교육 선택에서 고른 자료와 자동 배치된 주차별 과제를 한 화면에 모았습니다. 자료를 직접 고르지 않아도 ${durationStrategy.label} 기준으로 시작할 수 있고, 추가한 교육은 각 주차 추천에 우선 반영됩니다.</p>
    <div class="badge-row">
      <span class="badge">커리큘럼 주차: ${tasks.length}개</span>
      <span class="badge">완료 주차: ${completedWeeks}/${tasks.length}</span>
      <span class="badge">내가 고른 교육: ${items.length}개</span>
      <span class="badge">${durationStrategy.resourceRule}</span>
      <span class="badge">완료: ${completedCount}개</span>
      <span class="badge">진행: ${pendingCount}개</span>
      <span class="badge">총 학습량: ${formatMinutes(totalMinutes)}</span>
    </div>
  `;
}

function renderResourceCard(resource, context = null, priorityIndex = null, showCompletionAction = !context) {
  const saved = state.saved.includes(resource.id);
  const completed = state.completed.includes(resource.id);
  const prerequisites = resource.prerequisites.length ? resource.prerequisites.join(", ") : "없음";
  const signals = context ? getEducationResourceSignals(resource, context) : [];
  const linkedTasks = context ? getResourceLinkedTasks(resource.id, context.visibleTasks) : [];
  const priority = signals.length > 0 || priorityIndex !== null;
  const recommendationScore = context ? Math.round(getEducationResourceScore(resource, context)) : null;
  return `
    <article class="resource-card ${completed ? "is-completed" : ""} ${priority ? "is-priority" : ""}">
      ${priorityIndex !== null ? `
        <div class="resource-rank-band">
          <span>추천 ${priorityIndex + 1}순위</span>
          <strong>${recommendationScore}점</strong>
        </div>
      ` : ""}
      <div class="resource-meta">
        ${resource.provider === "MathWorks" ? `<span class="badge">MathWorks 역량</span>` : ""}
        ${priority && priorityIndex === null ? `<span class="badge">로드맵 추천</span>` : ""}
        <span class="badge">추천 ${resource.sequenceLevel}단계</span>
        <span class="badge">${resource.provider}</span>
        <span class="badge">자료 형식: ${resource.type}</span>
        <span class="badge">${resource.language}</span>
        <span class="badge">${resource.difficulty}</span>
        <span class="badge">총 ${formatMinutes(resource.totalMinutes)}</span>
        <span class="badge">${formatQualityStatus(resource.qualityStatus)}</span>
      </div>
      <h3>${resource.title}</h3>
      <p>${resource.reason}</p>
      ${linkedTasks.length ? `<p><strong>연결 과제:</strong> ${linkedTasks.join(", ")}</p>` : ""}
      ${signals.length ? `<div class="recommendation-note">${signals.join(" · ")}</div>` : ""}
      <div class="resource-learning-meta" aria-label="학습 정보">
        <span><strong>자료 형식</strong>${resource.type}</span>
        <span><strong>학습</strong>${formatMinutes(resource.estimatedMinutes)}</span>
        <span><strong>실습</strong>${formatMinutes(resource.practiceMinutes)}</span>
        <span><strong>선행</strong>${prerequisites}</span>
      </div>
      <p><strong>산출물:</strong> ${resource.expectedOutput}</p>
      <div class="resource-actions">
        <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">${getResourceOpenLabel(resource)}</a>
        ${showCompletionAction ? renderCompleteActionButton(resource) : renderSaveActionButton(resource)}
      </div>
    </article>
  `;
}

function getRecommendationContext(track, gapSkills, visibleTasks = null) {
  const goalKey = state.profile.goal || "foundation";
  return {
    track,
    role: getSelectedRole(track.id),
    gapSkills,
    acquiredSkills: getAcquiredSkills(track.id),
    goalKey,
    goal: learningGoals[goalKey] || learningGoals.foundation,
    durationWeeks: getDurationWeeks(),
    visibleTasks: visibleTasks || getVisibleRoadmapTasks(track.id)
  };
}

function getGoalGuide(goalKey, resource, track) {
  const output = resource.expectedOutput || track.outputs[0];
  return {
    explore: `30분 안에 ${track.title}의 업무 3개와 모르는 용어 5개를 적으면 충분합니다.`,
    foundation: `체크하지 못한 역량 중 하나를 골라 ${output}까지 남기는 것을 최소 완료 기준으로 두세요.`,
    portfolio: `${output} 결과물을 면접에서 설명할 수 있도록 문제, 방법, 결과, 배운 점 순서로 정리하세요.`,
    interview: `${track.title} 직무에서 이 교육자료가 왜 필요한지 3문장으로 설명할 수 있으면 다음 교육자료로 넘어가세요.`
  }[goalKey] || `교육자료를 본 뒤 ${output}을 남기세요.`;
}

function getResourceSignals(resource, context) {
  const signals = [];
  const linkedTasks = getResourceLinkedTasks(resource.id, context.visibleTasks);
  const matchedGaps = getResourceGapMatches(resource, context);
  const matchedGoal = (resource.skills || []).filter((skill) => context.goal.prioritySkills.includes(skill));
  const matchedRoleKeywords = getRoleKeywordMatches(resource, context.role);
  const competencyFitSignal = getCompetencyFitSignal(resource, context);
  const goalFitSignal = getGoalFitSignal(resource, context);
  if (linkedTasks.length) signals.push(`로드맵 연결: ${linkedTasks.slice(0, 2).join(", ")}`);
  if (resource.core) signals.push("핵심 직무역량 교육");
  if (competencyFitSignal) signals.push(competencyFitSignal);
  if (goalFitSignal) signals.push(goalFitSignal);
  if (matchedGaps.length) signals.push(`역량 체크 보완: ${matchedGaps.slice(0, 3).join(", ")}`);
  if (matchedGoal.length) signals.push(`목표 적합: ${matchedGoal.slice(0, 2).join(", ")}`);
  if (matchedRoleKeywords.length) signals.push(`세부 직무 키워드: ${matchedRoleKeywords.slice(0, 2).join(", ")}`);
  if (context.goalKey === "portfolio" && resource.practiceMinutes >= 60) signals.push("실습 산출물 우선");
  return signals;
}

function getResourcePriorityScore(resource, context) {
  const coreResource = resource.core ? 1 : 0;
  const linkedTaskMatches = getResourceLinkedTasks(resource.id, context.visibleTasks).length;
  const gapMatches = getResourceGapMatches(resource, context).length;
  const goalMatches = (resource.skills || []).filter((skill) => context.goal.prioritySkills.includes(skill)).length;
  const roleKeywordMatches = getRoleKeywordMatches(resource, context.role).length;
  const difficultyMatch = context.goal.preferredDifficulties.includes(resource.difficulty) ? 1 : 0;
  const languageMatch = resource.languageCode === "ko" ? 1 : 0;
  const portfolioPractice = context.goalKey === "portfolio" && resource.practiceMinutes >= 60 ? 1 : 0;
  const shortDurationFit = context.durationWeeks <= 2 && resource.totalMinutes <= 180 ? 1 : 0;
  const competencyScore = getCompetencyFitScore(resource, context);
  const goalScore = getGoalResourceScore(resource, context);
  return coreResource * 80
    + linkedTaskMatches * 60
    + gapMatches * 40
    + goalMatches * 20
    + roleKeywordMatches * 14
    + difficultyMatch * 12
    + languageMatch * 6
    + portfolioPractice * 8
    + shortDurationFit * 10
    + competencyScore * 0.35
    + goalScore * 0.35;
}

function getResourceLinkedTasks(resourceId, visibleTasks = []) {
  const linkedTaskTitles = resourceTaskLinks[resourceId] || [];
  if (!visibleTasks.length) return linkedTaskTitles;

  const visibleBaseTitles = new Set(visibleTasks.map((task) => task.baseTitle || task.title));
  return linkedTaskTitles.filter((taskTitle) => visibleBaseTitles.has(taskTitle));
}

function getRoleKeywordMatches(resource, role) {
  if (!role) return [];
  const text = [
    resource.title,
    resource.reason,
    resource.expectedOutput,
    ...(resource.skills || [])
  ].join(" ").toLowerCase();
  return role.postingKeywords.filter((keyword) => text.includes(keyword.toLowerCase()));
}

function sortResourcesForLearning(a, b, context = null) {
  if (context) {
    const priorityDiff = getResourcePriorityScore(b, context) - getResourcePriorityScore(a, context);
    if (priorityDiff !== 0) return priorityDiff;
  }
  if (!!a.core !== !!b.core) return a.core ? -1 : 1;
  if (a.languageCode !== b.languageCode) return a.languageCode === "ko" ? -1 : 1;
  const sequenceDiff = a.sequenceLevel - b.sequenceLevel;
  if (sequenceDiff !== 0) return sequenceDiff;
  return a.totalMinutes - b.totalMinutes;
}

function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}분`;
  if (!rest) return `${hours}시간`;
  return `${hours}시간 ${rest}분`;
}

function formatQualityStatus(status) {
  return {
    candidate: "후보",
    reviewed: "검토됨",
    verified: "검증됨",
    reviewNeeded: "재검토"
  }[status] || status;
}

function bindResourceActions(container) {
  container.querySelectorAll("[data-save-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleListValue("saved", button.dataset.saveId);
      saveState();
      renderTracks();
      renderRoadmap();
      renderReferences();
      renderSaved();
      renderMetrics();
      renderWorkflowStatus();
      renderRoleContextBar();
    });
  });

  container.querySelectorAll("[data-complete-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleListValue("completed", button.dataset.completeId);
      if (!state.saved.includes(button.dataset.completeId)) state.saved.push(button.dataset.completeId);
      saveState();
      renderTracks();
      renderRoadmap();
      renderReferences();
      renderSaved();
      renderMetrics();
      renderWorkflowStatus();
      renderRoleContextBar();
    });
  });
}

function toggleListValue(key, value) {
  state[key] = state[key].includes(value)
    ? state[key].filter((item) => item !== value)
    : [...state[key], value];
}

function renderMetrics() {
  if (!hasActiveRoleSelection()) {
    elements.selectedTrackMetric.textContent = "0";
    elements.diagnosticMetric.textContent = "0%";
    elements.savedMetric.textContent = "0";
    return;
  }

  const track = getSelectedTrack();
  elements.selectedTrackMetric.textContent = track ? "1" : "0";
  elements.diagnosticMetric.textContent = `${getDiagnosticScore(track.id)}%`;
  elements.savedMetric.textContent = `${getVisibleRoadmapTasks(track.id).length}주`;
}

function exportPlanAsExcel() {
  if (!hasActiveRoleSelection()) {
    elements.exportPlanButton.textContent = "직무 선택 필요";
    setTimeout(() => {
      elements.exportPlanButton.textContent = "엑셀 커리큘럼 다운로드";
    }, 1800);
    return;
  }

  try {
    const track = getSelectedTrack();
    const workbook = buildPlanExportWorkbook();
    const xml = buildExcelXml(workbook);
    const fileName = sanitizeFileName(`직무역량_내계획_${track.title}_${formatExportDate()}.xls`);
    downloadTextFile(fileName, xml, "application/vnd.ms-excel;charset=utf-8");
    elements.exportPlanButton.textContent = "내보내기 완료";
  } catch {
    elements.exportPlanButton.textContent = "내보내기 실패";
  }

  setTimeout(() => {
    elements.exportPlanButton.textContent = "엑셀 커리큘럼 다운로드";
  }, 1800);
}

function buildPlanExportWorkbook() {
  return [
    { name: "요약", rows: buildSummaryExportRows() },
    { name: "실행계획", rows: buildRoadmapExportRows() },
    { name: "선택직무상세", rows: buildRoleDetailExportRows() },
    { name: "회사공고대조", rows: buildCompanyPostingExportRows() },
    { name: "교육자료", rows: buildSavedResourceExportRows() },
    { name: "역량체크", rows: buildDiagnosisExportRows() }
  ];
}

function buildSummaryExportRows() {
  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  const gapSkills = getGapSkills(track.id);
  const visibleTasks = getVisibleRoadmapTasks(track.id);
  const nextTask = getNextCurriculumTask(track.id);
  const context = getRecommendationContext(track, gapSkills, visibleTasks);
  const nextResource = getRecommendedResources(track, context)[0]?.title || "없음";
  const completedWeeks = visibleTasks
    .map((task) => getRoadmapStepId(track.id, task))
    .filter((stepId) => state.completedRoadmap.includes(stepId)).length;

  return [
    ["항목", "내용"],
    ["문서명", `${role?.title || track.title} 직무역량 내 커리큘럼`],
    ["내보낸 날짜", formatExportDate()],
    ["전공", getSelectLabel(elements.majorSelect)],
    ["관심 산업", getSelectLabel(elements.industrySelect)],
    ["준비 목적", learningGoals[state.profile.goal]?.label || state.profile.goal],
    ["목표 추천 기준", getGoalRecommendationLabel(state.profile.goal)],
    ["준비 기간", getDurationLabel()],
    ["직무군", track.title],
    ["선택 직무", role?.title || "미선택"],
    ["직무 설명", role?.focus || track.summary],
    ["역량 확보율", `${getDiagnosticScore(track.id)}%`],
    ["보완 역량", gapSkills.slice(0, 8).join(", ") || "큰 공백 없음"],
    ["다음 과제", `${nextTask.title} - ${nextTask.deliverable}`],
    ["다음 추천 교육자료", nextResource],
    ["완료 주차", `${completedWeeks}/${visibleTasks.length}`],
    ["추가 교육자료", `${state.saved.length}개`],
    ["완료 교육자료", `${state.completed.length}개`]
  ];
}

function buildCompanyPostingExportRows() {
  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  if (!role) return [["구분", "앱 기준", "지원 회사 공고 문장", "준비 상태"], ["선택 직무", "미선택", "", ""]];

  const rows = [
    ["구분", "앱 기준", "지원 회사 공고 문장", "준비 상태"],
    ["안내", "이 커리큘럼은 일반적인 직무내용 기반 추천입니다. 지원 회사의 직무상세 내용과 다를 수 있으므로 반드시 실제 공고 문장을 붙여 넣고 비교하세요.", "", "필수 확인"],
    ["선택 직무", role.title, "", ""],
    ["직무 설명", role.focus, "", ""],
    ["전공 연결성", `${getMajorPathwayLabel(track, role)} - ${getMajorPathwayReason(track, role)}`, "", ""]
  ];

  role.responsibilities.forEach((item, index) => rows.push([`반복 업무 ${index + 1}`, item, "", "공고에 있으면 우선 준비"]));
  role.requirements.forEach((item, index) => rows.push([`자격조건 ${index + 1}`, item, "", "보유/보완 표시"]));
  role.preferred.forEach((item, index) => rows.push([`우대·차별화 ${index + 1}`, item, "", "해당 시 차별화 근거"]));
  getRoleArtifactExamples(track, role).forEach((item, index) => rows.push([`준비 산출물 ${index + 1}`, item, "", "제출 가능하게 정리"]));

  return rows;
}

function buildRoleDetailExportRows() {
  const track = getSelectedTrack();
  const role = getSelectedRole(track.id);
  if (!role) return [["구분", "내용"], ["선택 직무", "미선택"]];

  const rows = [
    ["구분", "내용"],
    ["직무군", track.title],
    ["선택 직무", role.title],
    ["직무 설명", role.focus],
    ["전공 연결성", `${getMajorPathwayLabel(track, role)} - ${getMajorPathwayReason(track, role)} ${getMajorPathwayFocus(track, role)}`],
    ["반복 키워드", role.postingKeywords.join(", ")]
  ];

  role.responsibilities.forEach((item, index) => rows.push([`채용공고 반복 업무 ${index + 1}`, item]));
  role.requirements.forEach((item, index) => rows.push([`자격조건·필수 역량 ${index + 1}`, item]));
  role.preferred.forEach((item, index) => rows.push([`우대·차별화 역량 ${index + 1}`, item]));
  const aiProfile = getRoleAiCompetencyProfile(role);
  if (aiProfile) {
    rows.push(["AI·데이터 활용 역량", `${aiProfile.level} - ${aiProfile.summary}`]);
    (aiProfile.keywords || []).forEach((item, index) => rows.push([`AI 관련 공고 표현 ${index + 1}`, item]));
    (aiProfile.diagnostics || []).forEach(([skill, question], index) => rows.push([`AI 준비 증거 ${index + 1}`, `${skill}: ${question}`]));
  }
  getRoleDecisionQuestions(track, role).forEach((item, index) => rows.push([`지원 전 확인 질문 ${index + 1}`, item]));
  return rows;
}

function buildSavedResourceExportRows() {
  const track = getSelectedTrack();
  const visibleTasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), visibleTasks);
  const resourceUseCounts = new Map();
  const autoResources = visibleTasks.flatMap((task) => {
    const linkedResources = getRoadmapResourcesForTask(track, task, context, resourceUseCounts);
    linkedResources.forEach((resource) => {
      resourceUseCounts.set(resource.id, (resourceUseCounts.get(resource.id) || 0) + 1);
    });
    return linkedResources.map((resource) => ({ resource, task }));
  });
  const plannedResources = uniqueResources([
    ...autoResources.map((item) => item.resource),
    ...getSavedResources()
  ]);
  const rows = [[
    "상태",
    "계획 반영",
    "교육자료",
    "제공처",
    "유형",
    "난이도",
    "언어",
    "총 시간",
    "학습",
    "실습",
    "선행",
    "연결 과제",
    "산출물",
    "URL"
  ]];

  if (!plannedResources.length) {
    rows.push(["교육자료가 없습니다.", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    return rows;
  }

  plannedResources.forEach((resource) => {
    const linkedAutoTasks = autoResources
      .filter((item) => item.resource.id === resource.id)
      .map((item) => item.task.title);
    const saved = state.saved.includes(resource.id);
    rows.push([
      state.completed.includes(resource.id) ? "완료" : "진행",
      saved ? "사용자 추가" : "로드맵 자동 배치",
      resource.title,
      resource.provider,
      resource.type,
      resource.difficulty,
      resource.language,
      formatMinutes(resource.totalMinutes),
      formatMinutes(resource.estimatedMinutes),
      formatMinutes(resource.practiceMinutes),
      resource.prerequisites.length ? resource.prerequisites.join(", ") : "없음",
      linkedAutoTasks.join(", ") || getResourceLinkedTasks(resource.id, visibleTasks).join(", ") || "직무 공통",
      resource.expectedOutput,
      resource.url
    ]);
  });

  return rows;
}

function buildRoadmapExportRows() {
  const track = getSelectedTrack();
  const tasks = getVisibleRoadmapTasks(track.id);
  const context = getRecommendationContext(track, getGapSkills(track.id), tasks);
  const resourceUseCounts = new Map();
  const rows = [["주차", "단계", "과제", "해야 할 일", "완료 기준", "예상 시간", "남길 산출물", "추천 교육자료", "교육자료 URL", "상태"]];

  tasks.forEach((task) => {
    const linkedResources = getRoadmapResourcesForTask(track, task, context, resourceUseCounts);
    linkedResources.forEach((resource) => {
      resourceUseCounts.set(resource.id, (resourceUseCounts.get(resource.id) || 0) + 1);
    });
    rows.push([
      task.weekLabel,
      task.phase || "",
      task.title,
      task.objective,
      (task.rubric || []).join("\n"),
      task.time,
      task.deliverable,
      linkedResources.map((resource) => resource.title).join("\n"),
      linkedResources.map((resource) => resource.url).join("\n"),
      state.completedRoadmap.includes(getRoadmapStepId(track.id, task)) ? "완료" : "진행"
    ]);
  });

  return rows;
}

function buildDiagnosisExportRows() {
  const track = getSelectedTrack();
  const rows = [["출처", "역량", "역량 체크 문항", "체크 여부"]];
  getDiagnosticItems(track).forEach((item) => {
    rows.push([
      item.source,
      item.skill,
      item.question,
      state.checked[item.id] ? "체크됨" : "보완 필요"
    ]);
  });
  return rows;
}

function getSavedResources() {
  return resources
    .filter((resource) => state.saved.includes(resource.id))
    .sort((a, b) => sortResourcesForLearning(a, b));
}

function buildExcelXml(sheets) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Top" ss:WrapText="1"/>
      <Font ss:FontName="Malgun Gothic" ss:Size="10"/>
    </Style>
    <Style ss:ID="Header">
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Malgun Gothic" ss:Size="10" ss:Bold="1"/>
      <Interior ss:Color="#E6F2EC" ss:Pattern="Solid"/>
    </Style>
  </Styles>
  ${sheets.map((sheet) => buildExcelWorksheet(sheet.name, sheet.rows)).join("\n")}
</Workbook>`;
}

function buildExcelWorksheet(name, rows) {
  const columnCount = Math.max(...rows.map((row) => row.length));
  const columns = Array.from({ length: columnCount }, () => `<Column ss:Width="160"/>`).join("");
  return `<Worksheet ss:Name="${escapeXml(name.slice(0, 31))}">
    <Table>
      ${columns}
      ${rows.map((row, rowIndex) => buildExcelRow(row, rowIndex === 0)).join("\n")}
    </Table>
  </Worksheet>`;
}

function buildExcelRow(row, isHeader) {
  return `<Row>${row.map((value) => buildExcelCell(value, isHeader)).join("")}</Row>`;
}

function buildExcelCell(value, isHeader) {
  const type = typeof value === "number" && Number.isFinite(value) ? "Number" : "String";
  return `<Cell ss:StyleID="${isHeader ? "Header" : "Default"}"><Data ss:Type="${type}">${escapeXml(value)}</Data></Cell>`;
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function downloadTextFile(fileName, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "_");
}

function formatExportDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSelectLabel(select) {
  return select.options[select.selectedIndex]?.textContent || select.value;
}

function disableServiceWorkerCache() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .catch(() => {});
  }

  if ("caches" in window) {
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith("career-competency"))
        .map((key) => caches.delete(key))))
      .catch(() => {});
  }
}
