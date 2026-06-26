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
    majors: ["mechanical", "electrical", "both"],
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
    majors: ["mechanical", "electrical", "both"],
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
  ]
};

const resources = [
  {
    id: "matlab-onramp",
    title: "MATLAB Onramp",
    provider: "MathWorks",
    type: "무료교육",
    language: "영어",
    difficulty: "입문",
    hours: 2,
    tracks: ["mechanical-cae", "production-quality", "embedded-control"],
    skills: ["데이터 분석", "MATLAB/Python", "제어"],
    reason: "공학 데이터 처리와 모델링의 기본 조작을 짧게 익히기 좋습니다.",
    output: "실습 완료 캡처와 간단한 데이터 그래프",
    url: "https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted"
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
    type: "정부/협회 자료",
    language: "한국어",
    difficulty: "입문",
    hours: 1,
    tracks: ["mechanical-cae", "production-quality", "semiconductor-equipment", "electronics-pcb", "embedded-control"],
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
    id: "stm32-education",
    title: "STM32 Education",
    provider: "STMicroelectronics",
    type: "공식문서",
    language: "영어",
    difficulty: "기초실습",
    hours: 5,
    tracks: ["embedded-control", "electronics-pcb"],
    skills: ["MCU", "통신", "디버깅"],
    reason: "MCU 주변장치와 개발 흐름을 공식 자료로 확인할 수 있습니다.",
    output: "GPIO 또는 UART 실습 계획",
    url: "https://www.st.com/content/st_com/en/support/learning/stm32-education.html"
  },
  {
    id: "ros-tutorials",
    title: "ROS 2 Tutorials",
    provider: "ROS Documentation",
    type: "공식문서",
    language: "영어",
    difficulty: "기초실습",
    hours: 5,
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
    id: "analog-dialogue",
    title: "Analog Dialogue",
    provider: "Analog Devices",
    type: "기업 기술자료",
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
    type: "정부/협회 자료",
    language: "영어",
    difficulty: "기초실습",
    hours: 6,
    tracks: ["production-quality", "semiconductor-equipment"],
    skills: ["통계", "SPC", "DOE"],
    reason: "공정 데이터, 관리도, 실험계획법의 기준 자료로 활용하기 좋습니다.",
    output: "관리도 또는 DOE 개념 요약",
    url: "https://www.itl.nist.gov/div898/handbook/"
  },
  {
    id: "kmooc",
    title: "K-MOOC 공학 전공기초 후보 검수",
    provider: "K-MOOC",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    hours: 3,
    tracks: ["mechanical-cae", "production-quality", "electronics-pcb", "semiconductor-equipment", "embedded-control"],
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
    tracks: ["mechanical-cae", "production-quality", "semiconductor-equipment", "electronics-pcb", "embedded-control"],
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
  }
].map(normalizeResource);

const roadmaps = {
  "mechanical-cae": [
    ["직무 이해", "설계 업무와 산출물을 정리하고 관심 제품을 하나 고릅니다.", "제품 구조와 요구사항 1쪽 요약"],
    ["전공·도구 보완", "재료역학, CAD, 수치해석 자료를 보며 작은 부품을 모델링합니다.", "부품 모델과 주요 치수표"],
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

const learningGoals = {
  explore: {
    label: "직무 탐색",
    summary: "실제 업무, 필요 역량, 흔한 오해를 먼저 확인합니다.",
    preferredDifficulties: ["입문"],
    prioritySkills: ["직무 이해", "문서화"]
  },
  foundation: {
    label: "전공 보완",
    summary: "진단에서 비어 있는 전공·도구 역량을 먼저 메웁니다.",
    preferredDifficulties: ["입문", "기초실습"],
    prioritySkills: ["전공지식", "통계", "회로이론", "재료역학", "공정 흐름", "C언어"]
  },
  portfolio: {
    label: "포트폴리오",
    summary: "실습 시간과 산출물이 분명한 자료를 우선 봅니다.",
    preferredDifficulties: ["기초실습", "적용"],
    prioritySkills: ["문서화", "검증", "문제해결", "도구역량"]
  },
  interview: {
    label: "면접 준비",
    summary: "직무 언어로 설명할 수 있는 개념과 산출물 근거를 정리합니다.",
    preferredDifficulties: ["입문", "적용"],
    prioritySkills: ["직무 이해", "문서화", "검증"]
  }
};

const yearGuidance = {
  "2": "입문 자료와 직무 용어 정리를 우선하세요.",
  "3": "전공 보완과 작은 실습 산출물을 함께 가져가세요.",
  "4": "면접에서 설명할 수 있는 결과물과 검증 근거를 남기세요."
};

const starterKeywords = {
  "mechanical-cae": "재료역학 기계요소설계 구조해석 CAD",
  "production-quality": "품질관리 SPC 관리도 FMEA 공정능력",
  "semiconductor-equipment": "반도체 공정 소자 진공 플라즈마 계측",
  "electronics-pcb": "회로이론 전자회로 전원회로 PCB 계측",
  "embedded-control": "임베디드 C언어 MCU 제어공학 UART"
};

const storageKey = "careerCompetencyPilot";

const defaultState = {
  selectedTrackId: "production-quality",
  profile: { major: "mechanical", year: "3", industry: "all", goal: "foundation" },
  checked: {},
  saved: [],
  completed: [],
  completedRoadmap: [],
  difficulty: "all",
  view: "tracks"
};

let state = loadState();
let deferredInstallPrompt = null;

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  bindEvents();
  render();
  registerServiceWorker();
});

function bindElements() {
  [
    "majorSelect",
    "yearSelect",
    "industrySelect",
    "goalSelect",
    "selectedTrackMetric",
    "diagnosticMetric",
    "savedMetric",
    "trackCount",
    "trackList",
    "trackDetail",
    "diagnosisTitle",
    "scoreBadge",
    "scoreBar",
    "diagnosticList",
    "gapList",
    "roadmapTitle",
    "roadmapList",
    "difficultyFilter",
    "resourceGuidance",
    "resourceList",
    "savedList",
    "summaryPreview",
    "clearSavedButton",
    "copySummaryButton",
    "installButton"
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

  elements.yearSelect.addEventListener("change", (event) => {
    state.profile.year = event.target.value;
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

  elements.difficultyFilter.addEventListener("change", (event) => {
    state.difficulty = event.target.value;
    saveState();
    renderResources();
    renderSummaryPreview();
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      saveState();
      renderViews();
    });
  });

  elements.clearSavedButton.addEventListener("click", () => {
    state.saved = [];
    state.completed = [];
    saveState();
    render();
  });

  elements.copySummaryButton.addEventListener("click", copyPilotSummary);

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    elements.installButton.hidden = false;
  });

  elements.installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    elements.installButton.hidden = true;
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return { ...defaultState, ...saved, profile: { ...defaultState.profile, ...(saved?.profile || {}) } };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function render() {
  elements.majorSelect.value = state.profile.major;
  elements.yearSelect.value = state.profile.year;
  elements.industrySelect.value = state.profile.industry;
  elements.goalSelect.value = state.profile.goal;
  elements.difficultyFilter.value = state.difficulty;
  const changedTrack = syncSelectedTrackWithProfile();
  if (changedTrack) saveState();
  renderViews();
  renderTracks();
  renderTrackDetail();
  renderDiagnostics();
  renderRoadmap();
  renderResources();
  renderSaved();
  renderMetrics();
  renderSummaryPreview();
}

function renderViews() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === `${state.view}View`);
  });
}

function getSelectedTrack() {
  return tracks.find((track) => track.id === state.selectedTrackId) || tracks[0];
}

function getFilteredTracks() {
  return tracks.filter((track) => {
    const majorMatch = track.majors.includes(state.profile.major) || state.profile.major === "both";
    const industryMatch = state.profile.industry === "all" || track.industries.includes(state.profile.industry);
    return majorMatch && industryMatch;
  });
}

function syncSelectedTrackWithProfile() {
  const filtered = getFilteredTracks();
  if (!filtered.length) return false;
  if (filtered.some((track) => track.id === state.selectedTrackId)) return false;
  state.selectedTrackId = filtered[0].id;
  return true;
}

function renderTracks() {
  const filtered = getFilteredTracks();
  elements.trackCount.textContent = `${filtered.length}개 트랙`;
  elements.trackList.innerHTML = filtered.map((track) => `
    <button class="track-card ${track.id === state.selectedTrackId ? "is-selected" : ""}" type="button" data-track-id="${track.id}">
      <span class="status-pill">난이도 ${track.difficulty}</span>
      <h3>${track.title}</h3>
      <p>${track.summary}</p>
      <span class="badge-row">${track.skills.slice(0, 4).map((skill) => `<span class="badge">${skill}</span>`).join("")}</span>
    </button>
  `).join("");

  elements.trackList.querySelectorAll("[data-track-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTrackId = button.dataset.trackId;
      state.view = "tracks";
      saveState();
      render();
    });
  });
}

function renderTrackDetail() {
  const track = getSelectedTrack();
  elements.trackDetail.innerHTML = `
    <p class="eyebrow">선택 트랙</p>
    <h3>${track.title}</h3>
    <p>${track.summary}</p>
    <figure class="word-cloud-panel">
      <img src="/assets/wordcloud-${track.id}.png" alt="${track.title} 핵심 역량 워드 클라우드" loading="lazy">
      <figcaption>단어 크기는 직무 설명, 진단 문항, 과제, 자료에서 반복 강조되는 정도를 반영합니다.</figcaption>
    </figure>
    <div class="detail-grid">
      ${detailBlock("주요 업무", track.tasks)}
      ${detailBlock("핵심 역량", track.skills)}
      ${detailBlock("사용 도구", track.tools)}
      ${detailBlock("포트폴리오 산출물", track.outputs)}
    </div>
    <div class="detail-grid">
      ${detailBlock("흔한 오해", track.misconceptions)}
    </div>
  `;
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
  const track = getSelectedTrack();
  const questions = diagnostics[track.id] || [];
  elements.diagnosisTitle.textContent = track.title;
  elements.diagnosticList.innerHTML = questions.map(([skill, question], index) => {
    const id = `${track.id}-${index}`;
    const checked = Boolean(state.checked[id]);
    return `
      <label class="check-item">
        <input type="checkbox" data-check-id="${id}" ${checked ? "checked" : ""}>
        <span>
          <strong>${skill}</strong>
          ${question}
        </span>
      </label>
    `;
  }).join("");

  elements.diagnosticList.querySelectorAll("[data-check-id]").forEach((input) => {
    input.addEventListener("change", () => {
      state.checked[input.dataset.checkId] = input.checked;
      saveState();
      renderDiagnostics();
      renderResources();
      renderMetrics();
      renderSummaryPreview();
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
      </article>
    `).join("")
    : `<div class="empty-state">현재 체크리스트 기준으로 큰 공백이 없습니다. 산출물 정리 단계로 넘어가세요.</div>`;
}

function getDiagnosticScore(trackId) {
  const questions = diagnostics[trackId] || [];
  if (!questions.length) return 0;
  const checkedCount = questions.filter((_, index) => state.checked[`${trackId}-${index}`]).length;
  return Math.round((checkedCount / questions.length) * 100);
}

function getGapItems(trackId) {
  return (diagnostics[trackId] || [])
    .map(([skill, question], index) => ({ skill, question, id: `${trackId}-${index}` }))
    .filter((item) => !state.checked[item.id]);
}

function getGapSkills(trackId) {
  return getGapItems(trackId).map((item) => item.skill);
}

function renderRoadmap() {
  const track = getSelectedTrack();
  const tasks = getCurriculumTasks(track.id);
  elements.roadmapTitle.textContent = `${track.title} 4주 로드맵`;
  elements.roadmapList.innerHTML = tasks.map((task, index) => {
    const stepId = `${track.id}-week-${index + 1}`;
    const completed = state.completedRoadmap.includes(stepId);
    return `
    <article class="week-card ${completed ? "is-completed" : ""}">
      <span class="week-number">${index + 1}주차</span>
      <h3>${task.title}</h3>
      <p>${task.objective}</p>
      <div class="task-meta">
        <span class="badge">예상 ${task.time}</span>
        <span class="badge">${task.deliverable}</span>
      </div>
      <div>
        <h4>수행 단계</h4>
        <ol class="task-steps">${task.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      </div>
      <div>
        <h4>통과 기준</h4>
        <ul class="rubric-list">${task.rubric.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <button class="resource-action ${completed ? "is-saved" : ""}" type="button" data-roadmap-step-id="${stepId}">
        ${completed ? "주차 완료됨" : "주차 완료 체크"}
      </button>
    </article>
  `;
  }).join("");

  elements.roadmapList.querySelectorAll("[data-roadmap-step-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleListValue("completedRoadmap", button.dataset.roadmapStepId);
      saveState();
      renderRoadmap();
      renderResources();
      renderSummaryPreview();
    });
  });
}

function getCurriculumTasks(trackId) {
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

function getNextCurriculumTask(trackId) {
  const tasks = getCurriculumTasks(trackId);
  return tasks.find((_, index) => !state.completedRoadmap.includes(`${trackId}-week-${index + 1}`)) || tasks[tasks.length - 1];
}

function renderResources() {
  const track = getSelectedTrack();
  const gapSkills = getGapSkills(track.id);
  const context = getRecommendationContext(track, gapSkills);
  const items = resources.filter((resource) => {
    const trackMatch = resource.tracks.includes(track.id);
    const difficultyMatch = state.difficulty === "all" || resource.difficulty === state.difficulty;
    return trackMatch && difficultyMatch;
  }).sort((a, b) => sortResourcesForLearning(a, b, context));

  renderResourceGuidance(items, context);
  elements.resourceList.innerHTML = items.length
    ? items.map((resource) => renderResourceCard(resource, context)).join("")
    : `<div class="empty-state">현재 필터에 맞는 자료가 없습니다.</div>`;
  bindResourceActions(elements.resourceList);
}

function renderSaved() {
  const items = resources
    .filter((resource) => state.saved.includes(resource.id))
    .sort(sortResourcesForLearning);
  elements.savedList.innerHTML = items.length
    ? items.map((resource) => renderResourceCard(resource)).join("")
    : `<div class="empty-state">아직 저장한 자료가 없습니다.</div>`;
  bindResourceActions(elements.savedList);
}

function renderResourceCard(resource, context = null) {
  const saved = state.saved.includes(resource.id);
  const completed = state.completed.includes(resource.id);
  const prerequisites = resource.prerequisites.length ? resource.prerequisites.join(", ") : "없음";
  const checkedAt = resource.engagement?.checkedAt ? `확인 ${resource.engagement.checkedAt}` : "확인 예정";
  const signals = context ? getResourceSignals(resource, context) : [];
  const priority = signals.length > 0;
  return `
    <article class="resource-card ${completed ? "is-completed" : ""} ${priority ? "is-priority" : ""}">
      <div class="resource-meta">
        ${priority ? `<span class="badge">맞춤 추천</span>` : ""}
        <span class="badge">추천 ${resource.sequenceLevel}단계</span>
        <span class="badge">${resource.provider}</span>
        <span class="badge">${resource.type}</span>
        <span class="badge">${resource.language}</span>
        <span class="badge">${resource.difficulty}</span>
        <span class="badge">총 ${formatMinutes(resource.totalMinutes)}</span>
        <span class="badge">${formatQualityStatus(resource.qualityStatus)}</span>
        <span class="badge">${checkedAt}</span>
      </div>
      <h3>${resource.title}</h3>
      <p>${resource.reason}</p>
      ${signals.length ? `<div class="recommendation-note">${signals.join(" · ")}</div>` : ""}
      <div class="resource-learning-meta" aria-label="학습 정보">
        <span><strong>학습</strong>${formatMinutes(resource.estimatedMinutes)}</span>
        <span><strong>실습</strong>${formatMinutes(resource.practiceMinutes)}</span>
        <span><strong>선행</strong>${prerequisites}</span>
      </div>
      <p><strong>산출물:</strong> ${resource.expectedOutput}</p>
      <div class="resource-actions">
        <a class="resource-action" href="${resource.url}" target="_blank" rel="noreferrer">열기</a>
        <button class="resource-action ${saved ? "is-saved" : ""}" type="button" data-save-id="${resource.id}">
          ${saved ? "저장됨" : "저장"}
        </button>
        <button class="resource-action ${completed ? "is-saved" : ""}" type="button" data-complete-id="${resource.id}">
          ${completed ? "완료됨" : "완료 체크"}
        </button>
      </div>
    </article>
  `;
}

function renderResourceGuidance(items, context) {
  if (!elements.resourceGuidance) return;
  if (!items.length) {
    elements.resourceGuidance.innerHTML = `
      <h3>현재 조건의 추천 자료가 없습니다</h3>
      <p>난이도 필터를 전체로 바꾸면 선택 트랙의 기본 자료를 다시 볼 수 있습니다.</p>
    `;
    return;
  }

  const first = items[0];
  const task = getNextCurriculumTask(context.track.id);
  const gapText = context.gapSkills.length ? context.gapSkills.slice(0, 3).join(", ") : "큰 공백 없음";
  const guide = getGoalGuide(context.goalKey, first, context.track);
  elements.resourceGuidance.innerHTML = `
    <p class="eyebrow">${context.goal.label} · ${getSelectLabel(elements.yearSelect)}</p>
    <h3>먼저 볼 자료: ${first.title}</h3>
    <p>${context.goal.summary} ${yearGuidance[state.profile.year] || ""}</p>
    <div class="recommendation-note">
      <strong>이번 과제:</strong> ${task.title} · ${task.deliverable}
    </div>
    <div class="badge-row">
      <span class="badge">보완 역량: ${gapText}</span>
      <span class="badge">검색어: ${starterKeywords[context.track.id] || context.track.title}</span>
      <span class="badge">이번 산출물: ${first.expectedOutput}</span>
    </div>
    <p>${guide}</p>
  `;
}

function getRecommendationContext(track, gapSkills) {
  const goalKey = state.profile.goal || "foundation";
  return {
    track,
    gapSkills,
    goalKey,
    goal: learningGoals[goalKey] || learningGoals.foundation,
    year: state.profile.year
  };
}

function getGoalGuide(goalKey, resource, track) {
  const output = resource.expectedOutput || track.outputs[0];
  return {
    explore: `30분 안에 ${track.title}의 업무 3개와 모르는 용어 5개를 적으면 충분합니다.`,
    foundation: `체크하지 못한 역량 중 하나를 골라 ${output}까지 남기는 것을 최소 완료 기준으로 두세요.`,
    portfolio: `${output} 결과물을 면접에서 설명할 수 있도록 문제, 방법, 결과, 배운 점 순서로 정리하세요.`,
    interview: `${track.title} 직무에서 이 자료가 왜 필요한지 3문장으로 설명할 수 있으면 다음 자료로 넘어가세요.`
  }[goalKey] || `자료를 본 뒤 ${output}을 남기세요.`;
}

function getResourceSignals(resource, context) {
  const signals = [];
  const matchedGaps = resource.skills.filter((skill) => context.gapSkills.includes(skill));
  const matchedGoal = resource.skills.filter((skill) => context.goal.prioritySkills.includes(skill));
  if (matchedGaps.length) signals.push(`진단 보완: ${matchedGaps.slice(0, 3).join(", ")}`);
  if (matchedGoal.length) signals.push(`목표 적합: ${matchedGoal.slice(0, 2).join(", ")}`);
  if (isYearMatch(resource, context.year)) signals.push("학년 수준 적합");
  if (context.goalKey === "portfolio" && resource.practiceMinutes >= 60) signals.push("실습 산출물 우선");
  return signals;
}

function getResourcePriorityScore(resource, context) {
  const gapMatches = resource.skills.filter((skill) => context.gapSkills.includes(skill)).length;
  const goalMatches = resource.skills.filter((skill) => context.goal.prioritySkills.includes(skill)).length;
  const difficultyMatch = context.goal.preferredDifficulties.includes(resource.difficulty) ? 1 : 0;
  const yearMatch = isYearMatch(resource, context.year) ? 1 : 0;
  const languageMatch = resource.languageCode === "ko" ? 1 : 0;
  const portfolioPractice = context.goalKey === "portfolio" && resource.practiceMinutes >= 60 ? 1 : 0;
  return gapMatches * 40 + goalMatches * 20 + difficultyMatch * 12 + yearMatch * 10 + languageMatch * 6 + portfolioPractice * 8;
}

function isYearMatch(resource, year) {
  if (year === "2") return resource.difficulty === "입문";
  if (year === "4") return resource.difficulty !== "입문" || resource.sequenceLevel >= 2;
  return resource.difficulty === "입문" || resource.difficulty === "기초실습";
}

function sortResourcesForLearning(a, b, context = null) {
  if (context) {
    const priorityDiff = getResourcePriorityScore(b, context) - getResourcePriorityScore(a, context);
    if (priorityDiff !== 0) return priorityDiff;
  }
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
      renderResources();
      renderSaved();
      renderMetrics();
      renderSummaryPreview();
    });
  });

  container.querySelectorAll("[data-complete-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleListValue("completed", button.dataset.completeId);
      if (!state.saved.includes(button.dataset.completeId)) state.saved.push(button.dataset.completeId);
      saveState();
      renderResources();
      renderSaved();
      renderMetrics();
      renderSummaryPreview();
    });
  });
}

function toggleListValue(key, value) {
  state[key] = state[key].includes(value)
    ? state[key].filter((item) => item !== value)
    : [...state[key], value];
}

function renderMetrics() {
  const track = getSelectedTrack();
  elements.selectedTrackMetric.textContent = track ? "1" : "0";
  elements.diagnosticMetric.textContent = `${getDiagnosticScore(track.id)}%`;
  elements.savedMetric.textContent = `${state.completed.length}/${state.saved.length}`;
}

function renderSummaryPreview() {
  if (!elements.summaryPreview) return;
  elements.summaryPreview.textContent = buildPilotSummary();
}

function buildPilotSummary() {
  const track = getSelectedTrack();
  const savedTitles = resources
    .filter((resource) => state.saved.includes(resource.id))
    .sort((a, b) => sortResourcesForLearning(a, b))
    .map((resource) => {
      const status = state.completed.includes(resource.id) ? "완료" : "진행";
      return `- ${resource.title} (${formatMinutes(resource.totalMinutes)}, ${status})`;
    })
    .join("\n") || "- 없음";

  const gapSkills = getGapSkills(track.id);
  const nextResources = resources
    .filter((resource) => resource.tracks.includes(track.id))
    .sort((a, b) => sortResourcesForLearning(a, b, getRecommendationContext(track, gapSkills)));
  const nextResource = nextResources[0]?.title || "없음";
  const nextTask = getNextCurriculumTask(track.id);

  const completedWeeks = getCurriculumTasks(track.id)
    .map((_, index) => `${track.id}-week-${index + 1}`)
    .filter((stepId) => state.completedRoadmap.includes(stepId)).length;

  return [
    "[직무역량 로드맵 파일럿 결과]",
    `전공: ${getSelectLabel(elements.majorSelect)}`,
    `학년: ${getSelectLabel(elements.yearSelect)}`,
    `관심 산업: ${getSelectLabel(elements.industrySelect)}`,
    `학습 목표: ${learningGoals[state.profile.goal]?.label || state.profile.goal}`,
    `선택 트랙: ${track.title}`,
    `진단 점수: ${getDiagnosticScore(track.id)}%`,
    `보완 역량: ${gapSkills.slice(0, 5).join(", ") || "큰 공백 없음"}`,
    `다음 과제: ${nextTask.title} - ${nextTask.deliverable}`,
    `다음 추천 자료: ${nextResource}`,
    `완료 주차: ${completedWeeks}/${getCurriculumTasks(track.id).length}`,
    "저장 자료:",
    savedTitles
  ].join("\n");
}

async function copyPilotSummary() {
  const summary = buildPilotSummary();
  try {
    await navigator.clipboard.writeText(summary);
    elements.copySummaryButton.textContent = "복사 완료";
  } catch {
    elements.copySummaryButton.textContent = "복사 실패";
  }

  setTimeout(() => {
    elements.copySummaryButton.textContent = "파일럿 결과 복사";
  }, 1800);
}

function getSelectLabel(select) {
  return select.options[select.selectedIndex]?.textContent || select.value;
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
}
