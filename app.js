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
    title: "K-MOOC 공학 강좌 검색",
    provider: "K-MOOC",
    type: "대학 OCW",
    language: "한국어",
    difficulty: "입문",
    hours: 3,
    tracks: ["mechanical-cae", "production-quality", "electronics-pcb", "semiconductor-equipment", "embedded-control"],
    skills: ["전공지식", "직무 이해"],
    reason: "한국어 전공 기초 강좌를 찾기 위한 출발점입니다.",
    output: "관심 강좌 2개 저장",
    url: "https://www.kmooc.kr/"
  },
  {
    id: "kocw-mechanical-design",
    title: "KOCW 기계설계·해석 공개강의 검색",
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
    reason: "재료역학, 기계요소설계, 구조해석 키워드로 국내 공개강의를 찾아 기계 설계 트랙의 기초를 보완합니다.",
    expectedOutput: "기계설계 또는 해석 공개강의 1개 선택과 학습 계획 메모",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/index.do"
  },
  {
    id: "kocw-production-quality",
    title: "KOCW 생산·품질 공개강의 검색",
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
    reason: "품질관리, 생산관리, 통계 키워드로 국내 공개강의를 찾아 공정 데이터와 개선 방법론의 기초를 잡습니다.",
    expectedOutput: "품질 또는 생산관리 강좌 1개 선택과 핵심 개념 5개 정리",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/index.do"
  },
  {
    id: "kocw-semiconductor",
    title: "KOCW 반도체 공정·소자 공개강의 검색",
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
    reason: "반도체 공정, 반도체 소자, 전자재료 키워드로 국내 공개강의를 찾아 공정·장비 직무의 전공 기초를 보완합니다.",
    expectedOutput: "반도체 공정 흐름 또는 소자 개념 요약 1쪽",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/index.do"
  },
  {
    id: "kocw-electronics-circuit",
    title: "KOCW 회로·전자회로 공개강의 검색",
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
    reason: "회로이론, 전자회로, 계측 키워드로 국내 공개강의를 찾아 PCB·하드웨어 트랙의 기본기를 보완합니다.",
    expectedOutput: "회로 기본 개념 5개와 측정 질문 3개 정리",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/index.do"
  },
  {
    id: "kocw-embedded-control",
    title: "KOCW 임베디드·제어 공개강의 검색",
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
    reason: "제어공학, 임베디드, 마이크로프로세서 키워드로 국내 공개강의를 찾아 펌웨어와 제어 기초를 연결합니다.",
    expectedOutput: "제어 또는 임베디드 강좌 1개 선택과 실습 목표 1개 작성",
    qualityStatus: "candidate",
    engagement: {
      checkedAt: "2026-06-25",
      nextReviewAt: "2026-07-25"
    },
    url: "http://www.kocw.net/home/index.do"
  },
  {
    id: "step-engineering",
    title: "STEP 산업기술 온라인 과정 검색",
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
    reason: "산업기술 분야의 한국어 온라인 과정을 확인해 공개강의 이후 실습형 보완 자료 후보를 찾습니다.",
    expectedOutput: "선택 트랙과 관련된 실습형 과정 1개 저장",
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

const storageKey = "careerCompetencyPilot";

const defaultState = {
  selectedTrackId: "production-quality",
  profile: { major: "mechanical", year: "3", industry: "all" },
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
    "resourceList",
    "savedList",
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

  elements.difficultyFilter.addEventListener("change", (event) => {
    state.difficulty = event.target.value;
    saveState();
    renderResources();
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
  elements.difficultyFilter.value = state.difficulty;
  renderViews();
  renderTracks();
  renderTrackDetail();
  renderDiagnostics();
  renderRoadmap();
  renderResources();
  renderSaved();
  renderMetrics();
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
    });
  });

  const score = getDiagnosticScore(track.id);
  elements.scoreBadge.textContent = `${score}%`;
  elements.scoreBar.style.width = `${score}%`;

  const gaps = questions
    .map(([skill, question], index) => ({ skill, question, id: `${track.id}-${index}` }))
    .filter((item) => !state.checked[item.id]);

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

function renderRoadmap() {
  const track = getSelectedTrack();
  elements.roadmapTitle.textContent = `${track.title} 4주 로드맵`;
  elements.roadmapList.innerHTML = (roadmaps[track.id] || []).map(([title, objective, output], index) => {
    const stepId = `${track.id}-week-${index + 1}`;
    const completed = state.completedRoadmap.includes(stepId);
    return `
    <article class="week-card ${completed ? "is-completed" : ""}">
      <span class="week-number">${index + 1}주차</span>
      <h3>${title}</h3>
      <p>${objective}</p>
      <div class="badge-row"><span class="badge">${output}</span></div>
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
    });
  });
}

function renderResources() {
  const track = getSelectedTrack();
  const items = resources.filter((resource) => {
    const trackMatch = resource.tracks.includes(track.id);
    const difficultyMatch = state.difficulty === "all" || resource.difficulty === state.difficulty;
    return trackMatch && difficultyMatch;
  }).sort(sortResourcesForLearning);

  elements.resourceList.innerHTML = items.length
    ? items.map(renderResourceCard).join("")
    : `<div class="empty-state">현재 필터에 맞는 자료가 없습니다.</div>`;
  bindResourceActions(elements.resourceList);
}

function renderSaved() {
  const items = resources
    .filter((resource) => state.saved.includes(resource.id))
    .sort(sortResourcesForLearning);
  elements.savedList.innerHTML = items.length
    ? items.map(renderResourceCard).join("")
    : `<div class="empty-state">아직 저장한 자료가 없습니다.</div>`;
  bindResourceActions(elements.savedList);
}

function renderResourceCard(resource) {
  const saved = state.saved.includes(resource.id);
  const completed = state.completed.includes(resource.id);
  const prerequisites = resource.prerequisites.length ? resource.prerequisites.join(", ") : "없음";
  const checkedAt = resource.engagement?.checkedAt ? `확인 ${resource.engagement.checkedAt}` : "확인 예정";
  return `
    <article class="resource-card ${completed ? "is-completed" : ""}">
      <div class="resource-meta">
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

function sortResourcesForLearning(a, b) {
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

async function copyPilotSummary() {
  const track = getSelectedTrack();
  const savedTitles = resources
    .filter((resource) => state.saved.includes(resource.id))
    .sort(sortResourcesForLearning)
    .map((resource) => {
      const status = state.completed.includes(resource.id) ? "완료" : "진행";
      return `- ${resource.title} (${formatMinutes(resource.totalMinutes)}, ${status})`;
    })
    .join("\n") || "- 없음";

  const completedWeeks = (roadmaps[track.id] || [])
    .map((_, index) => `${track.id}-week-${index + 1}`)
    .filter((stepId) => state.completedRoadmap.includes(stepId)).length;

  const summary = [
    "[직무역량 로드맵 파일럿 결과]",
    `전공: ${getSelectLabel(elements.majorSelect)}`,
    `학년: ${getSelectLabel(elements.yearSelect)}`,
    `관심 산업: ${getSelectLabel(elements.industrySelect)}`,
    `선택 트랙: ${track.title}`,
    `진단 점수: ${getDiagnosticScore(track.id)}%`,
    `완료 주차: ${completedWeeks}/4`,
    "저장 자료:",
    savedTitles
  ].join("\n");

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
