export function applyRoleExpansions(context) {
  const {
    tracks,
    resources,
    normalizeResource,
    diagnostics,
    industryLabels,
    majorLabels,
    majorBridgeTracks,
    majorRoleFitProfiles,
    jobRoles,
    roleDiagnostics,
    roleResourceLinks,
    roleCompetencyResourceLinks,
    resourceTaskLinks,
    curriculumTasks,
    starterKeywords,
    industryDiagnostics
  } = context;

  function applyEmergingRoleExpansion() {
    const mergeValues = (base = [], additions = []) => [...new Set([...(base || []), ...(additions || [])])];
    const addTrackTags = (trackId, field, values) => {
      const track = tracks.find((item) => item.id === trackId);
      if (track) track[field] = mergeValues(track[field], values);
    };
    const addMajorFits = (major, { direct = [], bridge = [], bridgeFocus } = {}) => {
      if (!majorRoleFitProfiles[major]) {
        majorRoleFitProfiles[major] = { direct: [], bridge: [], bridgeFocus: bridgeFocus || "" };
      }
      majorRoleFitProfiles[major].direct = mergeValues(majorRoleFitProfiles[major].direct, direct);
      majorRoleFitProfiles[major].bridge = mergeValues(majorRoleFitProfiles[major].bridge, bridge);
      if (bridgeFocus) majorRoleFitProfiles[major].bridgeFocus = bridgeFocus;
    };
    const addRoleCompetencyLinks = (definitions) => {
      Object.entries(definitions).forEach(([roleId, competencyMap]) => {
        roleCompetencyResourceLinks[roleId] = roleCompetencyResourceLinks[roleId] || {};
        Object.entries(competencyMap).forEach(([skill, resourceIds]) => {
          roleCompetencyResourceLinks[roleId][skill] = mergeValues(roleCompetencyResourceLinks[roleId][skill], resourceIds);
        });
      });
    };

    Object.assign(industryLabels, {
      aerospace: "항공·우주",
      defense: "국방·방산",
      energy: "전력·ESS",
      ai: "AI·데이터"
    });

    Object.assign(majorLabels, {
      electrical_power: "전기공학",
      computer: "컴퓨터공학·소프트웨어",
      industrial: "산업공학",
      materials: "신소재·재료공학"
    });

    majorBridgeTracks.electrical_power = ["electronics-pcb", "embedded-control", "automotive-mobility", "semiconductor-equipment", "robotics-automation", "ai-engineering"];
    Object.assign(majorBridgeTracks, {
      computer: ["electronics-pcb", "robotics-automation", "automotive-mobility", "semiconductor-equipment", "manufacturing-dx", "data-center-infra"],
      industrial: ["automotive-mobility", "semiconductor-equipment", "semiconductor-packaging-test", "data-center-infra", "ai-engineering"],
      materials: ["production-quality", "automotive-mobility", "energy-ess", "semiconductor-equipment", "semiconductor-packaging-test"]
    });

    [
      ["production-quality", "majors", ["electrical_power"]],
      ["semiconductor-equipment", "majors", ["electrical_power"]],
      ["electronics-pcb", "majors", ["electrical_power"]],
      ["embedded-control", "majors", ["electrical_power"]],
      ["automotive-mobility", "majors", ["electrical_power"]],
      ["production-quality", "majors", ["industrial", "materials"]],
      ["semiconductor-equipment", "majors", ["computer", "industrial", "materials"]],
      ["electronics-pcb", "majors", ["computer"]],
      ["embedded-control", "majors", ["computer"]],
      ["automotive-mobility", "majors", ["computer", "industrial", "materials"]],
      ["chemical-process", "majors", ["materials"]],
      ["mechanical-cae", "industries", ["aerospace", "defense"]],
      ["electronics-pcb", "industries", ["defense", "aerospace", "energy"]],
      ["embedded-control", "industries", ["defense", "aerospace"]],
      ["production-quality", "industries", ["defense", "energy", "ai"]],
      ["automotive-mobility", "industries", ["ai"]]
    ].forEach(([trackId, field, values]) => addTrackTags(trackId, field, values));

    const emergingTracks = [
      {
        id: "aerospace-defense",
        title: "항공·우주·국방",
        majors: ["mechanical", "electrical", "electrical_power", "both"],
        industries: ["aerospace", "defense", "mobility", "electronics", "robotics"],
        difficulty: "상",
        summary: "항공기, 드론, 위성, 방산 시스템의 임무 요구사항을 비행체·센서·통신·제어·검증 산출물로 바꾸는 직무군입니다.",
        tasks: ["임무 요구사항 분해", "비행체·센서 모델링", "항전·통신 인터페이스 검토", "환경·안전 시험과 검증"],
        skills: ["비행역학", "항공전자", "센서융합", "RF·레이더", "HIL·SIL", "MIL-STD"],
        tools: ["MATLAB/Simulink", "Aerospace Blockset", "UAV Toolbox", "PX4", "STK", "DOORS/Polarion"],
        outputs: ["임무 요구사항표", "비행·센서 모델 검증 리포트", "항전 인터페이스 정의서", "환경시험 체크리스트"],
        misconceptions: ["항공·방산 직무는 멋있는 제품명보다 요구사항 추적, 시험 근거, 안전·환경 규격 이해가 중요합니다.", "기계·전기·전자·제어가 함께 쓰이므로 세부 직무별 산출물을 보고 선택해야 합니다."]
      },
      {
        id: "robotics-automation",
        title: "로봇·자동화",
        majors: ["mechanical", "electrical", "electrical_power", "computer", "both"],
        industries: ["robotics", "manufacturing", "electronics", "ai", "energy", "chemical"],
        difficulty: "중",
        summary: "로봇 기구, 구동기, 센서, ROS, PLC, 비전, 안전 요구를 연결해 실제 작업 셀과 자율 동작을 구현하는 직무군입니다.",
        tasks: ["작업 시나리오 정의", "센서·구동기 인터페이스 구성", "제어·경로 계획", "안전·검증 리포트 작성"],
        skills: ["로봇기구", "ROS2", "SLAM·Navigation", "PLC·계장", "비전검사", "안전제어"],
        tools: ["ROS2", "Gazebo", "RViz", "MoveIt", "OpenCV", "PLC", "EtherCAT"],
        outputs: ["로봇 작업 시퀀스", "센서·액추에이터 I/O 표", "ROS 노드 구성도", "안전 인터록 체크리스트"],
        misconceptions: ["로봇 직무는 코딩만이 아니라 기구·전장·제어·안전·현장 통합을 함께 봐야 합니다.", "데모 영상보다 재현 가능한 로그, 좌표계, I/O 정의가 준비 근거가 됩니다."]
      },
      {
        id: "energy-ess",
        title: "전력·ESS",
        majors: ["electrical_power", "electrical", "mechanical", "chemical", "materials", "both"],
        industries: ["energy", "battery", "electronics", "manufacturing", "mobility", "robotics"],
        difficulty: "중",
        summary: "전력계통, PCS, 인버터, 배터리, 보호계전, EMS 데이터를 연결해 전력·ESS 시스템을 설계·운영·검증하는 직무군입니다.",
        tasks: ["부하·전력 요구사항 정의", "PCS·배터리 구성 검토", "보호·안전 로직 검증", "운영 데이터 분석"],
        skills: ["전력공학", "전력전자", "ESS·BMS", "보호계전", "SCADA·EMS", "안전규격"],
        tools: ["Simscape Electrical", "Simscape Battery", "MATLAB/Simulink", "PCS", "BMS", "SCADA", "Python"],
        outputs: ["전력 요구사항표", "ESS 구성·보호 검토표", "충방전 로그 분석 리포트", "안전 시험 체크리스트"],
        misconceptions: ["ESS는 배터리만 보는 직무가 아니라 PCS, 계통 연계, 보호, 열·안전, 운영 데이터를 함께 다룹니다.", "전기공학 전공자는 전력계통과 전력전자 산출물로 강점을 명확히 보여주는 편이 좋습니다."]
      },
      {
        id: "ai-engineering",
        title: "AI 적용 엔지니어링",
        majors: ["mechanical", "electrical", "electrical_power", "chemical", "computer", "industrial", "both"],
        industries: ["ai", "manufacturing", "semiconductor", "mobility", "robotics", "electronics", "battery", "energy"],
        difficulty: "중",
        summary: "제조, 품질, 시험, 설비, 해석, 로봇 데이터를 AI 모델과 현장 의사결정 기준으로 연결하는 응용 직무군입니다.",
        tasks: ["문제·데이터 정의", "기준 모델 학습·평가", "현장 적용 리스크 검토", "개선 리포트 작성"],
        skills: ["데이터 전처리", "머신러닝", "컴퓨터비전", "이상탐지", "MLOps 기초", "설명가능성"],
        tools: ["Python", "SQL", "scikit-learn", "PyTorch", "TensorFlow", "OpenCV", "MLflow", "Power BI"],
        outputs: ["데이터 정의서", "모델 평가 리포트", "현장 적용 리스크표", "개선 우선순위 대시보드"],
        misconceptions: ["AI 적용 직무는 모델을 만드는 것보다 어떤 현장 문제를 어떤 데이터와 판정 기준으로 개선할지 정의하는 일이 중요합니다.", "전공지식 없이 AI만 준비하면 공정·설비·시험 데이터를 설득력 있게 해석하기 어렵습니다."]
      }
    ];

    const existingTrackIds = new Set(tracks.map((track) => track.id));
    emergingTracks.forEach((track) => {
      if (!existingTrackIds.has(track.id)) tracks.push(track);
    });

    Object.assign(diagnostics, {
      "aerospace-defense": [
        ["임무 요구사항", "임무 목적을 비행 조건, 센서, 통신, 검증 항목으로 나눌 수 있다."],
        ["비행·제어", "자세, 속도, 고도, 경로 추종이 제어와 센서 데이터에 어떻게 연결되는지 설명할 수 있다."],
        ["항전 인터페이스", "전원, 통신, 센서, 임무장비 인터페이스를 신호와 문서로 정리할 수 있다."],
        ["환경·규격", "진동, 온도, EMI/EMC, MIL-STD 같은 시험 조건을 요구사항과 연결할 수 있다."],
        ["검증 증거", "요구사항-시험 케이스-결과 리포트의 추적성을 설명할 수 있다."]
      ],
      "robotics-automation": [
        ["작업 시나리오", "로봇이 수행할 동작을 좌표계, 경로, I/O, 안전 조건으로 나눌 수 있다."],
        ["센서·구동기", "모터, 엔코더, 카메라, 라이다, 그리퍼 신호 흐름을 설명할 수 있다."],
        ["ROS·제어", "노드, 토픽, launch, 제어 주기, 로그를 기준으로 문제를 분리할 수 있다."],
        ["PLC·자동화", "PLC I/O, 인터록, 비상정지, 설비 상태 전환을 순서도로 정리할 수 있다."],
        ["검증", "반복 동작, 위치 오차, 사이클 타임, 안전 조건을 시험 기준으로 만들 수 있다."]
      ],
      "energy-ess": [
        ["전력 요구사항", "부하, 전압, 전류, 용량, 효율, 계통 연계 조건을 수치로 정의할 수 있다."],
        ["PCS·인버터", "DC-AC 변환, 스위칭, 리플, 발열, 보호 조건을 설명할 수 있다."],
        ["ESS·BMS", "SOC/SOH, 충방전 제한, 셀 밸런싱, 열·절연 안전 조건을 연결할 수 있다."],
        ["보호·안전", "차단기, 보호계전, 접지, 절연, 비상정지 요구를 검토할 수 있다."],
        ["운영 데이터", "충방전 로그와 알람 데이터를 기준으로 이상 원인 후보를 좁힐 수 있다."]
      ],
      "ai-engineering": [
        ["문제정의", "현장 문제를 목표 지표, 입력 데이터, 판정 기준으로 바꿀 수 있다."],
        ["전처리", "결측, 이상치, 라벨, 시간 동기화, 데이터 누수를 점검할 수 있다."],
        ["모델평가", "정확도 외에 재현율, 오탐, 미탐, 비용, 현장 적용성을 비교할 수 있다."],
        ["설명가능성", "모델 결과를 공정·설비·품질 원인 가설로 설명할 수 있다."],
        ["운영", "모델 배포 후 성능 저하, 데이터 drift, 재학습 기준을 정리할 수 있다."]
      ]
    });

    const emergingJobRoles = {
      "aerospace-defense": [
        {
          id: "aerospace-systems-engineer",
          title: "항공우주 시스템 엔지니어",
          postingKeywords: ["시스템엔지니어링", "요구사항", "검증", "항공우주", "추적성"],
          industries: ["aerospace", "defense", "all"],
          focus: "항공기·위성·발사체·무인기의 임무 요구사항을 시스템 구조, 인터페이스, 시험 계획, 검증 증거로 바꾸는 직무",
          coreWork: "임무 요구사항을 하위 시스템 요구, 인터페이스, 검증 방법, 시험 증거로 추적해 개발 리스크를 줄입니다.",
          coreTerms: ["mission requirement", "system architecture", "interface control document", "V&V", "traceability", "DOORS", "Polarion", "FMEA", "MIL-STD-810", "EMI/EMC"],
          tools: ["DOORS", "Polarion", "MATLAB", "Simulink", "Excel", "JIRA"],
          coreCompetencies: ["요구사항을 기계·전장·제어·시험 항목으로 분해하는 역량", "인터페이스 변경이 성능·안전·일정에 미치는 영향을 추적하는 역량", "검증 계획과 결과 증거를 하나의 표로 관리하는 역량"],
          responsibilities: ["임무 요구사항과 시스템 아키텍처 정리", "하위 시스템 인터페이스와 검증 방법 정의", "요구사항 추적표와 시험 증거 관리", "설계 변경 영향과 리스크 리뷰"],
          requirements: ["기계·전기·전자·제어 중 하나의 공학 기초", "요구사항, 인터페이스, 검증 산출물 이해", "시험 결과를 요구사항 충족 여부로 문서화하는 역량"],
          preferred: ["DOORS/Polarion 요구사항 관리 경험", "MIL-STD, 환경시험, EMI/EMC, FMEA 이해", "MATLAB/Simulink 기반 모델 검증 경험"]
        },
        {
          id: "uav-flight-control-engineer",
          title: "드론·UAM 비행제어 엔지니어",
          postingKeywords: ["UAV", "비행제어", "PX4", "센서융합", "HIL"],
          industries: ["aerospace", "defense", "robotics", "all"],
          focus: "IMU, GPS, 모터, 제어 알고리즘, 비행 로그를 연결해 무인기의 자세·고도·경로 추종 성능을 검증하는 직무",
          coreWork: "비행체 동역학과 센서 데이터를 제어 알고리즘, HIL, 비행 로그 분석으로 연결해 안정적인 비행 성능을 만듭니다.",
          coreTerms: ["UAV", "UAM", "flight control", "PX4", "ArduPilot", "IMU", "GNSS", "Kalman Filter", "PID", "HIL", "SITL"],
          tools: ["MATLAB", "Simulink", "UAV Toolbox", "PX4", "QGroundControl", "Python"],
          coreCompetencies: ["자세·고도·경로 제어 성능을 로그와 응답 지표로 설명하는 역량", "센서 노이즈와 추정 오차가 비행 안정성에 미치는 영향을 판단하는 역량", "SITL/HIL 시험 조건과 실제 비행 로그 차이를 비교하는 역량"],
          responsibilities: ["비행제어 알고리즘 모델링과 튜닝", "IMU/GNSS/압력 센서 데이터 분석", "SITL/HIL 기반 제어 검증", "비행 로그 기반 이상 원인 분석"],
          requirements: ["동역학, 제어공학, 센서융합 기초", "MATLAB/Simulink 또는 Python 기반 데이터 분석", "비행 로그와 제어 응답 지표 해석"],
          preferred: ["PX4/ArduPilot, QGroundControl, UAV Toolbox 경험", "HIL/SITL 검증, Kalman filter, 경로 계획 경험"]
        },
        {
          id: "avionics-integration-engineer",
          title: "항공전자·임무장비 통합 엔지니어",
          postingKeywords: ["항공전자", "Avionics", "임무장비", "통신", "인터페이스"],
          industries: ["aerospace", "defense", "electronics", "all"],
          focus: "항공전자 장비, 센서, 통신, 전원, 임무장비 인터페이스를 통합하고 벤치·환경 시험으로 검증하는 직무",
          coreWork: "전원, 통신, 센서, 임무장비의 인터페이스를 정의하고 통합 시험에서 발생하는 신호·통신 문제를 분리합니다.",
          coreTerms: ["avionics", "mission equipment", "ICD", "ARINC", "MIL-STD-1553", "RS-422", "CAN", "EMI/EMC", "environmental test"],
          tools: ["오실로스코프", "Logic Analyzer", "CANalyzer", "MATLAB", "Python", "DOORS"],
          coreCompetencies: ["전원·통신·센서 인터페이스를 ICD와 시험 항목으로 바꾸는 역량", "통합 시험 로그에서 장비·케이블·소프트웨어 원인을 분리하는 역량", "EMI/EMC와 환경 시험 조건을 설계 검토에 반영하는 역량"],
          responsibilities: ["항전 장비 인터페이스 정의", "벤치 통합 시험과 계측", "통신 로그와 신호 품질 분석", "환경·EMI 시험 이슈 대응"],
          requirements: ["회로이론, 통신 인터페이스, 계측 기초", "전원, 접지, 신호 무결성, 로그 분석 역량", "요구사항과 시험 결과 문서화"],
          preferred: ["ARINC, MIL-STD-1553, CAN, RS-422 경험", "EMI/EMC, 환경시험, 항공전자 통합 경험"]
        },
        {
          id: "defense-systems-engineer",
          title: "방산 시스템 엔지니어",
          postingKeywords: ["방산", "체계공학", "무기체계", "요구사항", "시험평가"],
          industries: ["defense", "aerospace", "electronics", "all"],
          focus: "무기체계 요구사항, 운용 시나리오, 하위 장비 인터페이스, 시험평가 기준을 연결하는 방산 체계 개발 직무",
          coreWork: "운용 시나리오를 체계 요구사항, 하위 장비 인터페이스, 시험평가 기준, 리스크 관리 산출물로 전환합니다.",
          coreTerms: ["무기체계", "체계공학", "운용요구서", "시험평가", "RAM", "FMEA", "MIL-STD-810", "MIL-STD-461", "traceability"],
          tools: ["DOORS", "Polarion", "Excel", "MATLAB", "JIRA", "시험평가 체크리스트"],
          coreCompetencies: ["운용 요구를 기능 요구와 시험 기준으로 분해하는 역량", "하위 장비 변경이 체계 성능과 일정에 미치는 영향을 정리하는 역량", "시험평가 결과를 요구사항 충족 근거로 관리하는 역량"],
          responsibilities: ["운용 시나리오와 요구사항 정리", "하위 장비 인터페이스 관리", "시험평가 항목과 판정 기준 정의", "RAM/FMEA 기반 리스크 관리"],
          requirements: ["체계공학, 요구사항, 시험평가 문서 이해", "기계·전기·전자·SW 중 하나의 기술 언어", "협력사·시험기관과 변경 이슈를 추적하는 역량"],
          preferred: ["방산 규격, MIL-STD, RAM, FMEA, 형상관리 경험", "요구사항 관리 도구와 시험평가 산출물 경험"]
        },
        {
          id: "radar-rf-signal-engineer",
          title: "레이더·RF 신호처리 엔지니어",
          postingKeywords: ["Radar", "RF", "신호처리", "AESA", "MATLAB"],
          industries: ["defense", "aerospace", "electronics", "all"],
          focus: "RF 송수신, 레이더 파형, 신호처리, 탐지·추적 알고리즘을 시뮬레이션과 시험 데이터로 검증하는 직무",
          coreWork: "RF 신호와 레이더 데이터를 필터링, 탐지, 추적, 성능 지표로 분석해 시스템 성능을 검증합니다.",
          coreTerms: ["Radar", "RF", "AESA", "waveform", "Doppler", "range-Doppler", "CFAR", "tracking", "SNR", "MATLAB"],
          tools: ["MATLAB", "Signal Processing Toolbox", "RF Toolbox", "Python", "오실로스코프", "스펙트럼 분석기"],
          coreCompetencies: ["주파수, 대역폭, SNR, 도플러가 탐지 성능에 미치는 영향을 설명하는 역량", "range-Doppler map과 CFAR 결과를 성능 지표로 해석하는 역량", "시험 데이터와 시뮬레이션 결과 차이를 원인 가설로 정리하는 역량"],
          responsibilities: ["RF·레이더 신호 데이터 분석", "탐지·추적 알고리즘 시뮬레이션", "시험 데이터 후처리와 성능 지표 산출", "파형·필터·임계값 변경 영향 검토"],
          requirements: ["신호처리, 통신, 전자회로 기초", "MATLAB/Python 기반 데이터 분석", "주파수 영역과 시간 영역 신호 해석"],
          preferred: ["Radar Toolbox, RF 계측, CFAR, tracking, AESA 개념 경험", "방산·항공 센서 시험 데이터 분석 경험"]
        }
      ],
      "robotics-automation": [
        {
          id: "robot-mechanical-design-engineer",
          title: "로봇 기구설계 엔지니어",
          postingKeywords: ["로봇기구", "감속기", "엔드이펙터", "강성", "조립성"],
          industries: ["robotics", "manufacturing", "all"],
          focus: "로봇 링크, 구동부, 감속기, 엔드이펙터, 안전 커버를 작업 조건과 반복 정밀도에 맞게 설계하는 직무",
          coreWork: "작업 하중, 반복 정밀도, 조립성, 유지보수성을 기준으로 로봇 기구와 엔드이펙터를 설계합니다.",
          coreTerms: ["robot arm", "end effector", "payload", "repeatability", "backlash", "reducer", "stiffness", "fixture", "DFM/DFA"],
          tools: ["SolidWorks", "CATIA", "ANSYS", "MATLAB", "Excel"],
          coreCompetencies: ["작업 하중과 모션 범위를 기구 치수와 강성 조건으로 바꾸는 역량", "감속기·베어링·모터 선정 근거를 계산과 도면으로 정리하는 역량", "조립성과 안전 커버를 현장 작업 조건과 연결하는 역량"],
          responsibilities: ["로봇 링크와 엔드이펙터 설계", "모터·감속기·베어링 선정 검토", "강성·진동·간섭 검토", "제작·조립 이슈 반영"],
          requirements: ["기계요소, 동역학, CAD, 공차 기초", "하중 계산과 조립성 검토", "시제품 문제를 설계 변경으로 문서화하는 역량"],
          preferred: ["로봇암, 그리퍼, 협동로봇 주변장치 설계 경험", "FEA, 모션 시뮬레이션, DFM/DFA 경험"]
        },
        {
          id: "robot-control-engineer",
          title: "로봇 제어 엔지니어",
          postingKeywords: ["로봇제어", "모션제어", "ROS2", "경로계획", "서보"],
          industries: ["robotics", "manufacturing", "all"],
          focus: "모터, 엔코더, 제어기, 경로 계획을 연결해 위치·속도·토크 응답과 반복 동작 성능을 맞추는 직무",
          coreWork: "로봇 동역학, 서보 응답, 경로 계획, 제어 주기를 조정해 반복 동작과 안전 정지를 검증합니다.",
          coreTerms: ["motion control", "servo", "encoder", "trajectory", "PID", "FOC", "ROS2", "MoveIt", "EtherCAT"],
          tools: ["MATLAB", "Simulink", "ROS2", "Gazebo", "EtherCAT", "Python"],
          coreCompetencies: ["위치·속도·토크 응답을 제어 파라미터와 연결하는 역량", "경로 계획과 충돌 회피 조건을 시험 시나리오로 바꾸는 역량", "로그로 제어 지연, 진동, 오차 원인을 분리하는 역량"],
          responsibilities: ["서보 제어와 경로 계획 구현", "ROS2/Gazebo 기반 시뮬레이션", "모션 로그 분석과 튜닝", "안전 정지와 인터록 검증"],
          requirements: ["제어공학, 동역학, C++/Python 기초", "ROS2 또는 Simulink 모델링 이해", "센서·구동기 로그 분석"],
          preferred: ["MoveIt, EtherCAT, 모션 컨트롤러, 실시간 제어 경험", "협동로봇 또는 모바일 로봇 제어 경험"]
        },
        {
          id: "robot-perception-engineer",
          title: "로봇 인지·비전 엔지니어",
          postingKeywords: ["로봇비전", "Perception", "SLAM", "OpenCV", "딥러닝"],
          industries: ["robotics", "ai", "manufacturing", "all"],
          focus: "카메라, 라이다, 3D 센서 데이터를 좌표계·라벨·모델·판정 기준으로 연결해 로봇 인지 기능을 만드는 직무",
          coreWork: "센서 데이터와 좌표계를 정리하고 인식·추정·분류 모델의 오탐·미탐을 현장 기준으로 줄입니다.",
          coreTerms: ["perception", "OpenCV", "PCL", "SLAM", "LiDAR", "camera calibration", "YOLO", "point cloud", "sensor fusion"],
          tools: ["ROS2", "OpenCV", "PCL", "Python", "PyTorch", "RViz"],
          coreCompetencies: ["센서 캘리브레이션과 좌표계 변환을 설명하는 역량", "오탐·미탐 사례를 데이터와 환경 조건으로 분류하는 역량", "모델 결과를 로봇 경로·동작 판단과 연결하는 역량"],
          responsibilities: ["카메라·라이다 데이터 수집과 전처리", "객체 인식·SLAM·센서융합 모델 적용", "오탐·미탐 원인 분석", "ROS2 노드와 시각화 구성"],
          requirements: ["Python, 선형대수, 영상처리, ROS 기초", "데이터 라벨링과 모델 평가 지표 이해", "센서 로그 재현과 문제 분리"],
          preferred: ["YOLO, PyTorch, OpenCV, PCL, SLAM 경험", "Jetson, ROS2, 실환경 데이터셋 개선 경험"]
        },
        {
          id: "smart-factory-automation-engineer",
          title: "스마트팩토리 자동화 엔지니어",
          postingKeywords: ["스마트팩토리", "PLC", "SCADA", "MES", "자동화"],
          industries: ["manufacturing", "robotics", "electronics", "all"],
          focus: "설비, PLC, 센서, 로봇, MES/SCADA 데이터를 연결해 자동화 라인의 생산성과 품질을 개선하는 직무",
          coreWork: "라인의 I/O, 상태 전환, 알람, MES 데이터를 연결해 자동화 설비의 정지·불량 원인을 줄입니다.",
          coreTerms: ["PLC", "SCADA", "MES", "OPC UA", "EtherCAT", "Profinet", "line balancing", "OEE", "alarm", "interlock"],
          tools: ["PLC", "SCADA", "MES", "Python", "Power BI", "Excel"],
          coreCompetencies: ["설비 I/O와 상태 전환을 시퀀스로 정리하는 역량", "알람·정지·불량 데이터를 같은 시간축으로 분석하는 역량", "자동화 개선 효과를 OEE, takt time, 불량률로 설명하는 역량"],
          responsibilities: ["자동화 설비 I/O와 제어 시퀀스 정리", "PLC·SCADA·MES 데이터 연계", "설비 정지와 품질 이슈 분석", "로봇·비전·센서 도입 검토"],
          requirements: ["PLC, 센서, 전기회로, 생산 지표 이해", "Excel/Python 기반 데이터 정리", "현장 개선안을 표준작업으로 문서화"],
          preferred: ["OPC UA, SCADA, MES, 비전검사, 로봇 셀 경험", "예지보전, 대시보드, 설비 데이터 분석 경험"]
        },
        {
          id: "plc-instrumentation-engineer",
          title: "PLC·계장제어 엔지니어",
          postingKeywords: ["PLC", "계장", "시퀀스제어", "센서", "유지보수"],
          industries: ["manufacturing", "energy", "chemical", "all"],
          focus: "센서, 밸브, 모터, 인버터, PLC 로직, 인터록을 연결해 설비를 안전하고 반복 가능하게 운전하는 직무",
          coreWork: "설비 I/O, PLC 시퀀스, 계장 신호, 인터록을 정리하고 트러블슈팅 절차를 만듭니다.",
          coreTerms: ["PLC", "instrumentation", "I/O list", "sequence", "interlock", "VFD", "sensor", "valve", "HMI", "SCADA"],
          tools: ["PLC", "HMI", "SCADA", "멀티미터", "오실로스코프", "Excel"],
          coreCompetencies: ["I/O list와 배선도를 보고 센서·액추에이터 역할을 구분하는 역량", "시퀀스 로직과 인터록 조건을 순서도로 설명하는 역량", "알람 발생 시 전기·계장·기계 원인을 나눠 점검하는 역량"],
          responsibilities: ["PLC I/O와 시퀀스 로직 관리", "계장 신호와 센서 상태 점검", "설비 인터록과 안전 조건 검토", "트러블슈팅과 유지보수 문서화"],
          requirements: ["전기회로, 계측, PLC 기초", "도면·I/O list·HMI 화면 해석", "설비 이상 대응 절차 작성"],
          preferred: ["인버터, 서보, SCADA, OPC UA 경험", "화학·전력·제조 설비 유지보수 경험"]
        }
      ],
      "energy-ess": [
        {
          id: "power-systems-engineer",
          title: "전력계통·전력설비 엔지니어",
          postingKeywords: ["전력계통", "수배전", "보호계전", "부하", "전기설비"],
          industries: ["energy", "manufacturing", "all"],
          focus: "수배전 설비, 부하, 보호계전, 접지, 전력 품질을 검토해 전기설비의 안정성과 안전을 확보하는 직무",
          coreWork: "부하와 계통 조건을 전압강하, 단락, 보호 협조, 접지, 전력 품질 기준으로 검토합니다.",
          coreTerms: ["load flow", "short circuit", "protection relay", "grounding", "power quality", "수배전", "차단기", "계전기", "SCADA"],
          tools: ["Excel", "MATLAB", "Simscape Electrical", "SCADA", "전력분석기"],
          coreCompetencies: ["부하, 전압, 전류, 용량 조건을 전기설비 요구사항으로 정리하는 역량", "차단기·계전기·접지 조건을 안전 검토 항목으로 바꾸는 역량", "전력 품질과 알람 데이터를 운영 개선으로 연결하는 역량"],
          responsibilities: ["수배전 설비 용량과 부하 검토", "보호계전과 접지 조건 관리", "전력 품질과 설비 알람 분석", "전기 안전 점검과 개선안 작성"],
          requirements: ["전력공학, 회로이론, 전기설비 기초", "단선결선도와 부하표 해석", "전기 안전과 보호 협조 이해"],
          preferred: ["전력분석, SCADA, 보호계전, 전기기사 수준의 설비 이해", "공장 전력설비 또는 신재생 연계 경험"]
        },
        {
          id: "ess-bms-engineer",
          title: "ESS·BMS 시스템 엔지니어",
          postingKeywords: ["ESS", "BMS", "PCS", "SOC", "안전"],
          industries: ["energy", "battery", "electronics", "all"],
          focus: "배터리 랙, BMS, PCS, EMS, 열·소방·절연 안전 조건을 연결해 ESS 시스템을 설계·검증하는 직무",
          coreWork: "ESS의 배터리 상태, PCS 운전, EMS 제어, 안전 신호를 통합해 충방전 성능과 고장 대응을 검증합니다.",
          coreTerms: ["ESS", "BMS", "PCS", "EMS", "SOC", "SOH", "thermal runaway", "isolation monitoring", "fire safety", "SCADA"],
          tools: ["Simscape Battery", "Simscape Electrical", "MATLAB", "Python", "BMS", "SCADA"],
          coreCompetencies: ["셀·모듈·랙 신호를 SOC/SOH와 보호 조건으로 연결하는 역량", "PCS 운전 모드와 EMS 제어 조건을 시험 케이스로 바꾸는 역량", "열·절연·소방 안전 요구를 검증 체크리스트로 만드는 역량"],
          responsibilities: ["ESS 구성과 BMS/PCS/EMS 인터페이스 정의", "충방전 로그와 알람 데이터 분석", "보호 로직과 안전 시험 조건 검토", "운영 이슈와 개선안 문서화"],
          requirements: ["배터리, 전력전자, BMS, 안전 기초", "전압·전류·온도 로그 해석", "시스템 요구사항과 시험 결과 문서화"],
          preferred: ["Simscape Battery, BMS 모델링, PCS/EMS 운영 데이터 경험", "UL/IEC 안전, 소방, 절연, 열폭주 대응 이해"]
        },
        {
          id: "power-electronics-inverter-engineer",
          title: "전력전자·인버터 엔지니어",
          postingKeywords: ["전력전자", "인버터", "PCS", "게이트드라이브", "EMI"],
          industries: ["energy", "mobility", "electronics", "all"],
          focus: "인버터, 컨버터, PCS, 게이트 드라이브, 전류 센싱, EMI/열 검증을 수행하는 전력전자 직무",
          coreWork: "전력 변환 회로의 효율, 리플, 발열, EMI, 보호 동작을 계측과 시뮬레이션으로 검증합니다.",
          coreTerms: ["inverter", "converter", "IGBT", "SiC MOSFET", "gate driver", "PWM", "ripple", "EMI", "thermal", "PLECS"],
          tools: ["Simscape Electrical", "LTspice", "PLECS", "PSIM", "오실로스코프", "전류 프로브", "전력분석기"],
          coreCompetencies: ["전압·전류·스위칭 파형을 손실·발열·EMI와 연결하는 역량", "게이트 드라이브와 보호 회로 동작을 측정 조건으로 검증하는 역량", "부품 데이터시트 기반 정격·열·효율 검토를 수행하는 역량"],
          responsibilities: ["전력 변환 회로 요구사항 정의", "부품 선정과 회로 시뮬레이션", "스위칭 파형·효율·발열 측정", "EMI/보호 동작 검증"],
          requirements: ["회로이론, 전력전자, 전자회로 기초", "오실로스코프와 전류 프로브 계측", "부품 데이터시트와 열 설계 이해"],
          preferred: ["SiC/GaN, PLECS/PSIM/Simscape Electrical 경험", "ESS PCS, EV 인버터, OBC, DC-DC 검증 경험"]
        },
        {
          id: "electric-machine-drive-engineer",
          title: "전기기기·모터드라이브 엔지니어",
          postingKeywords: ["전기기기", "PMSM", "모터제어", "FOC", "인버터"],
          industries: ["energy", "mobility", "robotics", "all"],
          focus: "모터, 인버터, 센서, FOC, 열·효율·NVH 조건을 연결해 구동 시스템 성능을 맞추는 직무",
          coreWork: "모터 파라미터, 인버터 제어, 센서 피드백, 시험 데이터를 연결해 토크·속도·효율 성능을 검증합니다.",
          coreTerms: ["PMSM", "BLDC", "FOC", "PWM", "encoder", "resolver", "torque ripple", "efficiency map", "motor drive"],
          tools: ["Motor Control Blockset", "Simulink", "Simscape Electrical", "오실로스코프", "전력분석기"],
          coreCompetencies: ["모터 파라미터와 제어 응답을 토크·속도·효율 지표로 설명하는 역량", "전류 센싱, 엔코더, PWM 타이밍을 계측으로 검증하는 역량", "열·소음·효율 트레이드오프를 시험 데이터로 정리하는 역량"],
          responsibilities: ["모터·인버터 제어 요구사항 정의", "FOC/PID 제어 튜닝", "전류·속도·토크 계측과 로그 분석", "효율·열·NVH 검증"],
          requirements: ["전기기기, 전력전자, 제어공학 기초", "PWM, ADC, 센서 피드백 이해", "시험 데이터와 모델 응답 비교"],
          preferred: ["Motor Control Blockset, PMSM/BLDC 제어, dyno 시험 경험", "EV·로봇·산업용 모터드라이브 경험"]
        },
        {
          id: "renewable-energy-grid-engineer",
          title: "신재생·계통연계 엔지니어",
          postingKeywords: ["신재생", "계통연계", "인버터", "전력품질", "EMS"],
          industries: ["energy", "all"],
          focus: "태양광·풍력·ESS를 계통에 연계할 때 인버터, 전력 품질, 출력 제어, 운영 데이터를 검토하는 직무",
          coreWork: "신재생 발전과 ESS의 출력 변동, 계통 연계 조건, 전력 품질, EMS 운영 전략을 함께 검토합니다.",
          coreTerms: ["renewable energy", "grid connection", "PV inverter", "frequency regulation", "power quality", "EMS", "SCADA", "forecasting"],
          tools: ["MATLAB", "Simulink", "Simscape Electrical", "Python", "SCADA", "Power BI"],
          coreCompetencies: ["발전량·부하·ESS 운전 조건을 계통 안정성과 연결하는 역량", "전력 품질과 출력 제어 이슈를 데이터로 설명하는 역량", "운영 데이터 기반 예측·제어 개선안을 제안하는 역량"],
          responsibilities: ["신재생·ESS 연계 조건 검토", "인버터 출력과 전력 품질 분석", "SCADA/EMS 운영 데이터 정리", "계통 영향과 개선안 문서화"],
          requirements: ["전력공학, 신재생, 전력전자 기초", "전력 데이터와 운영 로그 해석", "계통 연계 기준 이해"],
          preferred: ["PV/풍력/ESS 프로젝트, 출력 예측, EMS, SCADA 경험", "전력 품질 분석과 계통 안정도 검토 경험"]
        }
      ],
      "ai-engineering": [
        {
          id: "manufacturing-ai-engineer",
          title: "제조 AI 엔지니어",
          postingKeywords: ["제조AI", "공정데이터", "예측모델", "Python", "MLOps"],
          industries: ["ai", "manufacturing", "semiconductor", "battery", "all"],
          focus: "공정·설비·품질 데이터를 AI 모델로 분석해 불량, 수율, 정지, 조건 변경 의사결정을 지원하는 직무",
          coreWork: "현장 문제를 데이터셋과 목표 지표로 정의하고 모델 결과를 공정 개선 가설과 연결합니다.",
          coreTerms: ["manufacturing AI", "feature engineering", "anomaly detection", "classification", "drift", "MLOps", "MES", "SPC"],
          tools: ["Python", "SQL", "scikit-learn", "MLflow", "Power BI", "Jupyter"],
          aiCompetency: { level: "핵심 역량", summary: "이 직무는 AI 모델 자체보다 현장 문제정의, 데이터 품질, 모델 평가, 운영 기준이 핵심입니다.", diagnostics: [["데이터 정의", "목표 지표와 입력 데이터를 현장 기준으로 정의할 수 있다."], ["운영 기준", "모델 성능 저하와 재학습 기준을 정리할 수 있다."]] },
          coreCompetencies: ["공정 문제를 모델 목표와 라벨 기준으로 바꾸는 역량", "결측·이상치·데이터 누수 리스크를 점검하는 역량", "모델 결과를 현장 개선 우선순위로 설명하는 역량"],
          responsibilities: ["공정·설비·품질 데이터셋 정의", "분류·예측·이상탐지 모델 실험", "모델 평가와 현장 적용 리스크 검토", "대시보드와 개선 리포트 작성"],
          requirements: ["Python/SQL, 통계, 공정·품질 데이터 이해", "모델 평가 지표와 전처리 기초", "현업과 문제 정의를 맞추는 커뮤니케이션"],
          preferred: ["MLOps, MLflow, Power BI, MES 데이터 경험", "반도체·배터리·제조 공정 AI 프로젝트 경험"]
        },
        {
          id: "predictive-maintenance-ai-engineer",
          title: "예지보전 AI 엔지니어",
          postingKeywords: ["예지보전", "이상탐지", "센서데이터", "시계열", "정비이력"],
          industries: ["ai", "manufacturing", "energy", "semiconductor", "all"],
          focus: "진동, 온도, 전류, 압력, 알람 로그를 분석해 설비 이상 징후와 정비 우선순위를 찾는 직무",
          coreWork: "센서 시계열과 설비 이벤트를 정렬해 고장 전조, 오탐, 미탐, 정비 효과를 모델과 리포트로 검증합니다.",
          coreTerms: ["predictive maintenance", "time series", "anomaly detection", "sensor fusion", "MTBF", "MTTR", "alarm log", "condition monitoring"],
          tools: ["MATLAB", "Python", "Signal Processing", "Machine Learning", "Power BI", "SCADA"],
          aiCompetency: { level: "핵심 역량", summary: "예지보전은 AI보다 먼저 센서 품질, 이벤트 정의, 정비 이력 연결이 성패를 가릅니다.", diagnostics: [["시계열", "센서 데이터를 시간 기준으로 정렬하고 이벤트와 연결할 수 있다."], ["오탐·미탐", "오탐과 미탐 비용을 기준으로 모델을 평가할 수 있다."]] },
          coreCompetencies: ["센서 신호와 설비 이벤트를 같은 시간축으로 연결하는 역량", "이상탐지 결과를 정비 우선순위와 리스크로 설명하는 역량", "MTBF/MTTR 개선 효과를 데이터로 검증하는 역량"],
          responsibilities: ["센서·알람·정비 이력 데이터 정리", "이상탐지와 고장 예측 모델 실험", "오탐·미탐 사례 분석", "정비 우선순위 리포트 작성"],
          requirements: ["시계열 데이터, 신호처리, 통계 기초", "설비 상태와 정비 이력 이해", "Python/MATLAB 분석 역량"],
          preferred: ["Predictive Maintenance Toolbox, SCADA/MES 데이터, 설비보전 경험", "제조·에너지 설비 AI 프로젝트 경험"]
        },
        {
          id: "vision-inspection-ai-engineer",
          title: "비전검사 AI 엔지니어",
          postingKeywords: ["비전검사", "불량검출", "OpenCV", "딥러닝", "검사자동화"],
          industries: ["ai", "manufacturing", "electronics", "semiconductor", "all"],
          focus: "카메라, 조명, 렌즈, 라벨 데이터, 딥러닝 모델을 연결해 외관 불량 검사 기준을 자동화하는 직무",
          coreWork: "검사 환경과 라벨 기준을 정리하고 불량 검출 모델의 오탐·미탐을 품질 기준으로 낮춥니다.",
          coreTerms: ["machine vision", "defect detection", "OpenCV", "YOLO", "segmentation", "lighting", "lens", "false positive", "false negative"],
          tools: ["OpenCV", "Python", "PyTorch", "TensorFlow", "NVIDIA Jetson", "Power BI"],
          aiCompetency: { level: "핵심 역량", summary: "비전검사 AI는 모델보다 조명·렌즈·라벨 기준·품질 판정 기준을 함께 잡는 역량이 중요합니다.", diagnostics: [["라벨 기준", "불량 유형별 라벨 기준과 판정 기준을 정의할 수 있다."], ["검사 환경", "조명·렌즈·해상도가 검출 성능에 미치는 영향을 설명할 수 있다."]] },
          coreCompetencies: ["불량 유형과 라벨 기준을 품질 판정 기준으로 정리하는 역량", "조명·렌즈·해상도 조건을 모델 성능과 연결하는 역량", "오탐·미탐 사례를 개선 데이터셋으로 바꾸는 역량"],
          responsibilities: ["검사 이미지 수집과 라벨 기준 정의", "검출·분류·분할 모델 학습과 평가", "오탐·미탐 원인 분석", "현장 검사 장비 적용 리스크 검토"],
          requirements: ["Python, OpenCV, 딥러닝 기초", "품질 검사 기준과 불량 유형 이해", "모델 평가 지표와 데이터셋 관리"],
          preferred: ["YOLO/segmentation, Jetson/TensorRT, 조명·렌즈 셋업 경험", "전자·반도체·자동차 부품 비전검사 경험"]
        },
        {
          id: "engineering-data-analyst",
          title: "엔지니어링 데이터 분석가",
          postingKeywords: ["데이터분석", "공학데이터", "SQL", "대시보드", "원인가설"],
          industries: ["ai", "manufacturing", "mobility", "energy", "all"],
          focus: "시험, 공정, 설비, 품질 데이터를 정리해 원인 가설, 우선순위, 의사결정 리포트를 만드는 직무",
          coreWork: "여러 시스템의 데이터를 결합해 현업이 바로 판단할 수 있는 지표, 그래프, 원인 가설을 만듭니다.",
          coreTerms: ["engineering data", "SQL", "dashboard", "Pareto", "correlation", "root cause", "Power BI", "Python", "data quality"],
          tools: ["SQL", "Python", "Power BI", "Tableau", "Excel", "Jupyter"],
          aiCompetency: { level: "도움 큼", summary: "AI 모델 이전에 데이터 품질, 지표 정의, 의사결정 리포트 역량이 중심입니다.", diagnostics: [["지표 정의", "현업 질문을 지표와 그래프로 바꿀 수 있다."], ["데이터 품질", "결측·중복·이상치를 분석 결론의 리스크로 설명할 수 있다."]] },
          coreCompetencies: ["데이터 소스와 키를 이해해 분석 가능한 테이블로 결합하는 역량", "Pareto, 추세, 상관 분석을 원인 가설로 연결하는 역량", "현업 의사결정에 필요한 한 장 리포트를 만드는 역량"],
          responsibilities: ["데이터 추출·정제·시각화", "품질·설비·시험 지표 분석", "원인 가설과 개선 우선순위 정리", "대시보드와 자동 리포트 운영"],
          requirements: ["SQL, Python/Excel, 통계 기초", "공학 데이터의 단위·시간·조건 이해", "분석 결과를 현장 언어로 설명"],
          preferred: ["Power BI/Tableau, 데이터 파이프라인, 자동 리포트 경험", "제조·품질·시험 데이터 분석 프로젝트 경험"]
        },
        {
          id: "simulation-ai-engineer",
          title: "시뮬레이션·디지털트윈 AI 엔지니어",
          postingKeywords: ["디지털트윈", "시뮬레이션", "AI", "최적화", "모델기반"],
          industries: ["ai", "mobility", "robotics", "energy", "manufacturing", "all"],
          focus: "물리 모델, 시뮬레이션 데이터, 실험 로그, 최적화·AI 모델을 연결해 설계·제어·운영 판단을 빠르게 만드는 직무",
          coreWork: "시뮬레이션과 실험 데이터를 비교해 모델 신뢰도를 확인하고 AI·최적화로 설계 변수와 운영 조건을 찾습니다.",
          coreTerms: ["digital twin", "simulation", "surrogate model", "optimization", "DOE", "Simulink", "Simscape", "model validation", "parameter estimation"],
          tools: ["MATLAB", "Simulink", "Simscape", "Optimization", "Python", "Machine Learning"],
          aiCompetency: { level: "핵심 역량", summary: "시뮬레이션 AI는 물리 모델의 가정, 데이터 상관 검증, 최적화 목적함수를 명확히 정의해야 합니다.", diagnostics: [["모델 검증", "시뮬레이션과 실험 데이터 차이를 검증 리포트로 정리할 수 있다."], ["최적화", "목표와 제약 조건을 수식·지표로 정의할 수 있다."]] },
          coreCompetencies: ["물리 모델의 입력·출력·가정을 실험 조건과 맞추는 역량", "DOE와 surrogate model로 변수 민감도를 설명하는 역량", "최적화 결과를 설계·제어 변경안으로 문서화하는 역량"],
          responsibilities: ["물리 모델과 실험 데이터 상관 검증", "시뮬레이션 데이터셋 생성", "AI/최적화 기반 변수 탐색", "디지털트윈 검증 리포트 작성"],
          requirements: ["시뮬레이션, 통계, Python/MATLAB 기초", "물리 모델 가정과 실험 데이터 해석", "목표·제약 조건 정의 역량"],
          preferred: ["Simulink/Simscape, Optimization, surrogate model, parameter estimation 경험", "제조·에너지·모빌리티 디지털트윈 프로젝트 경험"]
        }
      ]
    };

    Object.entries(emergingJobRoles).forEach(([trackId, roles]) => {
      const existingIds = new Set((jobRoles[trackId] || []).map((role) => role.id));
      jobRoles[trackId] = [
        ...(jobRoles[trackId] || []),
        ...roles.filter((role) => !existingIds.has(role.id))
      ];
    });

    Object.assign(roleDiagnostics, {
      "aerospace-systems-engineer": [["요구사항", "임무 요구를 기능·성능·환경 요구로 나눌 수 있다."], ["인터페이스", "하위 시스템 간 신호와 책임 범위를 ICD로 정리할 수 있다."], ["검증", "요구사항별 검증 방법과 증거를 연결할 수 있다."], ["리스크", "변경 영향과 FMEA 항목을 추적할 수 있다."], ["규격", "환경·EMI 시험 조건을 요구사항과 연결할 수 있다."]],
      "uav-flight-control-engineer": [["비행동역학", "자세·속도·고도 응답을 제어 지표로 설명할 수 있다."], ["센서융합", "IMU/GNSS 센서 오차와 추정 결과의 관계를 말할 수 있다."], ["PX4", "SITL/HIL과 실제 비행 로그의 차이를 비교할 수 있다."], ["튜닝", "PID 또는 경로 추종 파라미터 변경 영향을 분석할 수 있다."], ["안전", "failsafe와 비상 착륙 조건을 테스트 케이스로 만들 수 있다."]],
      "avionics-integration-engineer": [["ICD", "전원·통신·센서 인터페이스를 문서로 정리할 수 있다."], ["계측", "통신 신호와 전원 품질을 계측기로 확인할 수 있다."], ["통합시험", "장비 통합 이슈를 로그와 변경 이력으로 추적할 수 있다."], ["EMI/EMC", "접지·차폐·케이블 조건이 노이즈에 미치는 영향을 설명할 수 있다."], ["환경시험", "진동·온도 시험 조건을 장비 요구사항과 연결할 수 있다."]],
      "defense-systems-engineer": [["운용요구", "운용 시나리오를 기능 요구와 시험 항목으로 바꿀 수 있다."], ["체계공학", "하위 장비 변경이 체계 성능에 미치는 영향을 정리할 수 있다."], ["시험평가", "시험 기준, 판정 조건, 증거 자료를 연결할 수 있다."], ["RAM", "신뢰도·정비성 지표가 운용성에 미치는 영향을 설명할 수 있다."], ["형상관리", "요구사항과 변경 이력을 추적할 수 있다."]],
      "radar-rf-signal-engineer": [["RF", "주파수, 대역폭, SNR이 성능에 미치는 영향을 설명할 수 있다."], ["신호처리", "필터링, FFT, range-Doppler 결과를 해석할 수 있다."], ["탐지", "CFAR와 임계값 변화가 오탐·미탐에 미치는 영향을 설명할 수 있다."], ["추적", "측정값과 track의 차이를 성능 지표로 볼 수 있다."], ["계측", "시험 데이터와 시뮬레이션 결과 차이를 원인 가설로 정리할 수 있다."]],
      "robot-mechanical-design-engineer": [["하중", "payload와 작업 반력을 기구 설계 조건으로 바꿀 수 있다."], ["구동부", "모터·감속기·베어링 선정 근거를 설명할 수 있다."], ["강성", "강성·백래시·반복정밀도가 품질에 미치는 영향을 말할 수 있다."], ["엔드이펙터", "그리퍼와 fixture 요구사항을 작업물 기준으로 정리할 수 있다."], ["제조성", "조립·정비·안전 커버 조건을 도면에 반영할 수 있다."]],
      "robot-control-engineer": [["모션제어", "위치·속도·토크 응답을 제어 파라미터와 연결할 수 있다."], ["경로계획", "trajectory와 충돌 회피 조건을 설명할 수 있다."], ["ROS2", "노드·토픽·launch 구조를 동작 흐름으로 말할 수 있다."], ["튜닝", "오버슈트·진동·정착시간을 로그로 비교할 수 있다."], ["안전", "비상정지와 인터록 조건을 검증 항목으로 만들 수 있다."]],
      "robot-perception-engineer": [["센서", "카메라·라이다 데이터와 좌표계를 설명할 수 있다."], ["캘리브레이션", "내부·외부 파라미터가 인식 결과에 미치는 영향을 말할 수 있다."], ["모델평가", "오탐·미탐을 데이터와 환경 조건으로 분류할 수 있다."], ["SLAM", "지도·위치추정·경로계획의 연결 흐름을 설명할 수 있다."], ["ROS", "인지 결과를 로봇 동작 판단에 연결할 수 있다."]],
      "smart-factory-automation-engineer": [["I/O", "센서·액추에이터 I/O와 설비 상태를 표로 만들 수 있다."], ["PLC", "시퀀스와 인터록을 순서도로 정리할 수 있다."], ["MES/SCADA", "알람·정지·불량 데이터를 시간 기준으로 연결할 수 있다."], ["OEE", "가동률·성능·품질 손실을 개선 우선순위로 바꿀 수 있다."], ["자동화", "로봇·비전·센서 도입 시 안전과 품질 조건을 설명할 수 있다."]],
      "plc-instrumentation-engineer": [["도면", "배선도와 I/O list를 보고 계장 신호를 구분할 수 있다."], ["시퀀스", "PLC 동작 순서와 인터록 조건을 설명할 수 있다."], ["계측", "센서·밸브·인버터 신호 이상을 점검할 수 있다."], ["안전", "비상정지와 안전회로 요구를 정리할 수 있다."], ["트러블슈팅", "알람 발생 시 전기·계장·기계 원인을 나눌 수 있다."]],
      "power-systems-engineer": [["부하", "부하표와 전압·전류·용량 조건을 해석할 수 있다."], ["수배전", "단선결선도와 차단기 구성을 설명할 수 있다."], ["보호계전", "보호 협조와 접지 조건의 목적을 말할 수 있다."], ["전력품질", "전압강하, 고조파, 역률 이슈를 설명할 수 있다."], ["안전", "전기 안전 점검 항목을 설비 요구사항과 연결할 수 있다."]],
      "ess-bms-engineer": [["ESS 구성", "배터리 랙, BMS, PCS, EMS 역할을 구분할 수 있다."], ["충방전", "전압·전류·온도 로그를 SOC/SOH와 연결할 수 있다."], ["보호", "과전압, 과열, 절연 이상, 소방 조건을 검증 항목으로 만들 수 있다."], ["운영", "SCADA/EMS 알람과 운전 모드를 분석할 수 있다."], ["안전", "열폭주와 절연 안전 리스크를 설명할 수 있다."]],
      "power-electronics-inverter-engineer": [["스위칭", "PWM, 게이트 드라이브, 전류 센싱을 회로 동작과 연결할 수 있다."], ["계측", "전압·전류·리플·효율을 계측할 수 있다."], ["발열", "손실과 열 조건을 부품 정격과 연결할 수 있다."], ["EMI", "스위칭과 배선이 EMI에 미치는 영향을 설명할 수 있다."], ["보호", "과전류·과전압 보호 동작을 시험할 수 있다."]],
      "electric-machine-drive-engineer": [["전기기기", "PMSM/BLDC 구조와 토크 발생 원리를 설명할 수 있다."], ["FOC", "전류 제어와 속도 제어의 입력·출력을 구분할 수 있다."], ["센서", "엔코더·리졸버·전류 센싱 신호를 해석할 수 있다."], ["효율", "효율 map과 토크 ripple을 시험 데이터로 볼 수 있다."], ["검증", "제어 응답과 발열·NVH 리스크를 함께 판단할 수 있다."]],
      "renewable-energy-grid-engineer": [["계통연계", "신재생 출력과 계통 조건을 연결할 수 있다."], ["인버터", "PV/ESS 인버터 운전 모드를 설명할 수 있다."], ["전력품질", "주파수, 전압, 고조파 이슈를 말할 수 있다."], ["EMS", "운영 데이터와 출력 제어 전략을 정리할 수 있다."], ["예측", "발전량·부하 예측이 운영에 미치는 영향을 설명할 수 있다."]],
      "manufacturing-ai-engineer": [["문제정의", "공정 문제를 목표 지표와 라벨 기준으로 바꿀 수 있다."], ["전처리", "결측·이상치·데이터 누수를 점검할 수 있다."], ["모델평가", "오탐·미탐과 현장 비용 기준으로 모델을 비교할 수 있다."], ["설명", "모델 결과를 공정 원인 가설로 설명할 수 있다."], ["운영", "성능 저하와 재학습 기준을 정리할 수 있다."]],
      "predictive-maintenance-ai-engineer": [["시계열", "센서 데이터를 이벤트와 같은 시간축으로 정렬할 수 있다."], ["이상탐지", "정상·이상 패턴을 지표로 구분할 수 있다."], ["정비이력", "고장·정비 기록을 모델 라벨과 연결할 수 있다."], ["평가", "오탐·미탐 비용을 기준으로 성능을 설명할 수 있다."], ["리포트", "정비 우선순위와 개선 효과를 문서화할 수 있다."]],
      "vision-inspection-ai-engineer": [["라벨", "불량 유형별 라벨과 판정 기준을 정의할 수 있다."], ["광학", "조명·렌즈·해상도가 검출 성능에 미치는 영향을 말할 수 있다."], ["모델", "분류·검출·분할 모델의 차이를 설명할 수 있다."], ["평가", "오탐·미탐 사례를 데이터셋 개선으로 연결할 수 있다."], ["적용", "현장 검사 속도와 품질 기준을 함께 판단할 수 있다."]],
      "engineering-data-analyst": [["데이터소스", "시험·공정·품질 데이터의 키와 단위를 이해할 수 있다."], ["SQL", "필요한 데이터를 추출·결합할 수 있다."], ["시각화", "Pareto, 추세, 상관 그래프로 문제를 설명할 수 있다."], ["원인가설", "분석 결과를 현업 원인 후보로 정리할 수 있다."], ["대시보드", "반복 확인할 지표와 해석 문장을 함께 제시할 수 있다."]],
      "simulation-ai-engineer": [["물리모델", "입력·출력·가정과 실험 조건을 연결할 수 있다."], ["상관검증", "시뮬레이션과 실험 데이터 차이를 설명할 수 있다."], ["DOE", "변수와 목표·제약 조건을 정의할 수 있다."], ["Surrogate", "대체 모델의 학습 데이터와 적용 범위를 설명할 수 있다."], ["최적화", "최적화 결과를 설계·운영 변경안으로 정리할 수 있다."]]
    });

    const emergingResources = [
      {
        id: "mathworks-aerospace-blockset-examples",
        title: "Aerospace Blockset 비행체 모델 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 180,
        practiceMinutes: 240,
        sequenceLevel: 4,
        tracks: ["aerospace-defense"],
        skills: ["항공우주", "비행역학", "모델링", "검증"],
        prerequisites: ["Simulink 기초", "동역학 기초"],
        reason: "비행체 모델, 좌표계, 환경 조건, 검증 흐름을 공식 예제로 확인할 수 있어 항공·방산 시스템 직무 산출물과 직접 연결됩니다.",
        expectedOutput: "비행체 모델 입출력 요약과 검증 조건표",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/aeroblks/examples.html"
      },
      {
        id: "mathworks-uav-toolbox-examples",
        title: "UAV Toolbox 드론 비행제어 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 180,
        practiceMinutes: 240,
        sequenceLevel: 4,
        tracks: ["aerospace-defense", "robotics-automation"],
        skills: ["UAV", "PX4", "비행제어", "센서융합", "HIL"],
        prerequisites: ["Simulink 기초", "제어공학 기초"],
        reason: "PX4 연동, 비행 시뮬레이션, 센서·제어 흐름을 예제로 볼 수 있어 드론·UAM 직무 준비에 적합합니다.",
        expectedOutput: "비행제어 테스트 조건과 로그 분석 메모",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/uav/examples.html"
      },
      {
        id: "px4-autopilot-docs",
        title: "PX4 Autopilot 공식 문서",
        provider: "PX4",
        type: "공식문서/실습",
        language: "영어",
        difficulty: "기초실습",
        estimatedMinutes: 180,
        practiceMinutes: 240,
        sequenceLevel: 4,
        tracks: ["aerospace-defense"],
        skills: ["PX4", "SITL", "비행 로그", "UAV", "failsafe"],
        prerequisites: ["Linux 기초", "드론 구성 이해"],
        reason: "드론 제어 직무에서 자주 보이는 PX4, SITL, parameter, flight log 흐름을 공식 문서로 확인할 수 있습니다.",
        expectedOutput: "PX4 파라미터와 비행 로그 확인 절차",
        qualityStatus: "reviewed",
        url: "https://docs.px4.io/main/en/"
      },
      {
        id: "mathworks-robotics-system-toolbox-examples",
        title: "Robotics System Toolbox 로봇 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 180,
        practiceMinutes: 240,
        sequenceLevel: 4,
        tracks: ["robotics-automation"],
        skills: ["로봇", "경로계획", "센서융합", "시뮬레이션"],
        prerequisites: ["MATLAB 기초", "로봇공학 기초"],
        reason: "로봇 모델링, 경로 계획, 센서 데이터 처리 예제를 통해 로봇 제어·인지 직무 산출물을 만들기 좋습니다.",
        expectedOutput: "로봇 작업 시나리오와 경로 계획 결과 캡처",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/robotics/examples.html"
      },
      {
        id: "mathworks-ros-toolbox-examples",
        title: "ROS Toolbox 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 150,
        practiceMinutes: 240,
        sequenceLevel: 4,
        tracks: ["robotics-automation"],
        skills: ["ROS", "ROS2", "센서데이터", "통합", "시뮬레이션"],
        prerequisites: ["ROS 기초", "Python 또는 MATLAB 기초"],
        reason: "ROS 메시지, 토픽, bag 데이터 흐름을 공식 예제로 확인해 로봇 소프트웨어와 인지 직무에 연결할 수 있습니다.",
        expectedOutput: "ROS 노드·토픽 구성도와 센서 로그 확인 메모",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/ros/examples.html"
      },
      {
        id: "nav2-ros-docs",
        title: "ROS2 Navigation2 공식 문서",
        provider: "Open Navigation",
        type: "공식문서/실습",
        language: "영어",
        difficulty: "기초실습",
        estimatedMinutes: 180,
        practiceMinutes: 300,
        sequenceLevel: 4,
        tracks: ["robotics-automation"],
        skills: ["ROS2", "Navigation", "SLAM", "경로계획", "로봇제어"],
        prerequisites: ["ROS2 기초"],
        reason: "모바일 로봇 공고에서 반복되는 localization, navigation, planner, controller 구성을 공식 문서로 확인할 수 있습니다.",
        expectedOutput: "Navigation stack 구성도와 파라미터 체크리스트",
        qualityStatus: "reviewed",
        url: "https://docs.nav2.org/"
      },
      {
        id: "mathworks-simscape-battery-examples",
        title: "Simscape Battery ESS·배터리 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 180,
        practiceMinutes: 240,
        sequenceLevel: 4,
        tracks: ["energy-ess", "automotive-mobility"],
        skills: ["ESS", "BMS", "배터리", "열관리", "시뮬레이션"],
        prerequisites: ["Simulink 기초", "배터리 기초"],
        reason: "셀·모듈·팩 모델과 열·전기 특성을 예제로 확인해 ESS/BMS 직무의 검증 산출물로 연결할 수 있습니다.",
        expectedOutput: "ESS/BMS 모델 구성과 충방전 조건표",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/simscape-battery/examples.html"
      },
      {
        id: "nvidia-jetson-ai-course",
        title: "NVIDIA Jetson AI 실습 과정",
        provider: "NVIDIA",
        type: "기업 공식교육",
        language: "영어",
        difficulty: "기초실습",
        estimatedMinutes: 240,
        practiceMinutes: 360,
        sequenceLevel: 4,
        tracks: ["ai-engineering", "robotics-automation"],
        skills: ["컴퓨터비전", "Jetson", "딥러닝", "엣지AI", "추론"],
        prerequisites: ["Python 기초", "딥러닝 입문"],
        reason: "로봇·비전검사·엣지 AI 공고에서 자주 보이는 Jetson 기반 추론 실습을 공식 자료로 확인할 수 있습니다.",
        expectedOutput: "이미지 추론 실습 결과와 오탐·미탐 사례 메모",
        qualityStatus: "reviewed",
        url: "https://developer.nvidia.com/embedded/learn/jetson-ai-certification-programs"
      },
      {
        id: "mathworks-deep-learning-onramp",
        title: "Deep Learning Onramp",
        provider: "MathWorks",
        type: "무료교육",
        language: "영어",
        difficulty: "입문",
        estimatedMinutes: 120,
        practiceMinutes: 90,
        sequenceLevel: 2,
        tracks: ["ai-engineering", "robotics-automation"],
        skills: ["딥러닝", "분류", "모델평가", "MATLAB"],
        prerequisites: ["MATLAB 기초"],
        reason: "비전검사와 AI 적용 직무에서 딥러닝 개념과 모델 평가 흐름을 짧게 실습하기 좋습니다.",
        expectedOutput: "분류 모델 실습 캡처와 평가 지표 요약",
        qualityStatus: "reviewed",
        url: "https://matlabacademy.mathworks.com/details/deep-learning-onramp/deeplearning"
      }
    ];

    const existingResourceIds = new Set(resources.map((resource) => resource.id));
    resources.push(...emergingResources
      .filter((resource) => !existingResourceIds.has(resource.id))
      .map(normalizeResource));

    Object.entries({
      "matlab-onramp": ["aerospace-defense", "robotics-automation", "energy-ess", "ai-engineering"],
      "simulink-onramp": ["aerospace-defense", "robotics-automation", "energy-ess", "ai-engineering"],
      "stateflow-onramp": ["aerospace-defense", "robotics-automation", "energy-ess"],
      "control-design-onramp": ["aerospace-defense", "robotics-automation", "energy-ess"],
      "signal-processing-onramp": ["aerospace-defense", "robotics-automation", "energy-ess", "ai-engineering"],
      "statistics-onramp": ["ai-engineering"],
      "coursera-engineering-data": ["ai-engineering"],
      "sensor-fusion-onramp": ["aerospace-defense", "robotics-automation"],
      "machine-learning-onramp": ["ai-engineering", "robotics-automation", "energy-ess"],
      "google-ml-crash-course": ["ai-engineering", "robotics-automation", "production-quality", "manufacturing-dx"],
      "boostcourse-data-ai-basic": ["ai-engineering"],
      "freecodecamp-python-data": ["ai-engineering", "robotics-automation", "energy-ess"],
      "mathworks-predictive-maintenance": ["ai-engineering", "robotics-automation", "energy-ess"],
      "mathworks-simscape-electrical": ["energy-ess", "robotics-automation"],
      "mathworks-simscape-examples": ["energy-ess", "robotics-automation", "aerospace-defense"],
      "mathworks-simulink-examples": ["aerospace-defense", "robotics-automation", "energy-ess", "ai-engineering"],
      "mathworks-official-videos": ["aerospace-defense", "robotics-automation", "energy-ess", "ai-engineering"],
      "mathworks-motor-control-blockset": ["energy-ess", "robotics-automation"],
      "ti-power-management-training": ["energy-ess"],
      "ti-precision-labs": ["energy-ess", "aerospace-defense"],
      "mit-mechanics-materials": ["robotics-automation"],
      "mit-design-manufacturing": ["robotics-automation"],
      "ros-tutorials": ["robotics-automation"],
      "comento-plc-control-practice": ["robotics-automation", "energy-ess"],
      "ni-learn-test-measurement": ["aerospace-defense", "robotics-automation", "energy-ess"],
      "edx-engineering-systems": ["aerospace-defense", "robotics-automation", "energy-ess"],
      "ansys-innovation-courses": ["aerospace-defense", "robotics-automation"],
      "ncs": ["aerospace-defense", "robotics-automation", "energy-ess", "ai-engineering"]
    }).forEach(([resourceId, trackIds]) => {
      const resource = resources.find((item) => item.id === resourceId);
      if (resource) resource.tracks = mergeValues(resource.tracks, trackIds);
    });

    Object.assign(curriculumTasks, {
      "aerospace-defense": [
        { title: "임무 요구사항 분해", objective: "선택 직무의 임무, 운용 조건, 하위 시스템을 요구사항으로 나눕니다.", time: "2시간", deliverable: "임무 요구사항표와 하위 시스템 매핑", keywords: ["요구사항", "임무", "인터페이스"], finalCheck: "임무 요구가 시험 가능한 문장으로 정리됐는지" },
        { title: "비행·센서 모델 확인", objective: "비행체, 센서, 제어 모델의 입력·출력과 가정을 확인합니다.", time: "3시간", deliverable: "비행·센서 모델 입출력 표", keywords: ["비행역학", "센서융합", "모델링"], finalCheck: "모델 가정과 실제 시험 조건의 차이를 적었는지" },
        { title: "항전·통신 인터페이스 검토", objective: "전원, 통신, 센서, 임무장비 인터페이스와 계측 조건을 정리합니다.", time: "2시간", deliverable: "ICD 초안과 계측 채널표", keywords: ["항전", "통신", "ICD"], finalCheck: "신호, 전원, 데이터 방향이 구분됐는지" },
        { title: "시험·안전 검증 리포트", objective: "환경·EMI·HIL 시험 조건과 요구사항 추적성을 리포트로 만듭니다.", time: "3시간", deliverable: "검증 매트릭스와 리스크 리포트", keywords: ["검증", "MIL-STD", "HIL"], finalCheck: "요구사항-시험-결과가 연결됐는지" }
      ],
      "robotics-automation": [
        { title: "로봇 작업 시나리오 정의", objective: "작업물, 로봇 동작, 좌표계, 안전 조건을 한 흐름으로 정리합니다.", time: "2시간", deliverable: "작업 시퀀스와 좌표계 메모", keywords: ["작업 시나리오", "좌표계", "안전"], finalCheck: "로봇이 언제 무엇을 판단하는지 명확한지" },
        { title: "센서·구동기 인터페이스", objective: "모터, 센서, 카메라, 라이다, PLC I/O 흐름을 표로 만듭니다.", time: "2시간", deliverable: "센서·액추에이터 I/O 정의표", keywords: ["센서", "구동기", "I/O"], finalCheck: "입력·출력·주기·이상 상태가 정리됐는지" },
        { title: "제어·경로 계획 실습", objective: "ROS2, Simulink 또는 시뮬레이션 예제로 경로와 제어 응답을 확인합니다.", time: "3시간", deliverable: "ROS 노드 구성도와 제어 응답 캡처", keywords: ["ROS2", "경로계획", "제어"], finalCheck: "로그로 문제 원인을 재현할 수 있는지" },
        { title: "현장 안전·검증 리포트", objective: "비상정지, 인터록, 반복 정밀도, 사이클 타임 기준을 정리합니다.", time: "2시간", deliverable: "안전 인터록 체크리스트와 검증 리포트", keywords: ["안전", "인터록", "검증"], finalCheck: "안전과 품질 기준이 함께 적혔는지" }
      ],
      "energy-ess": [
        { title: "전력·부하 요구사항 정의", objective: "전압, 전류, 용량, 효율, 계통 조건을 수치로 정리합니다.", time: "2시간", deliverable: "전력 요구사항표와 부하 조건표", keywords: ["전력", "부하", "계통"], finalCheck: "수치 기준이 없는 요구사항이 남지 않았는지" },
        { title: "PCS·배터리 구성 검토", objective: "BMS, PCS, EMS, 배터리 랙, 보호 장치의 역할을 구분합니다.", time: "3시간", deliverable: "ESS 구성도와 인터페이스 표", keywords: ["ESS", "BMS", "PCS"], finalCheck: "전력 흐름과 신호 흐름이 분리되어 있는지" },
        { title: "보호·안전 로직 검증", objective: "과전압, 과전류, 절연, 열폭주, 비상정지 조건을 테스트 케이스로 만듭니다.", time: "2시간", deliverable: "보호 로직 테스트 케이스", keywords: ["보호", "안전", "절연"], finalCheck: "정상·고장·경계 조건이 포함됐는지" },
        { title: "운영 데이터 분석 리포트", objective: "충방전 로그와 알람 데이터를 기준으로 이상 원인 후보를 정리합니다.", time: "3시간", deliverable: "운영 로그 분석 리포트", keywords: ["운영데이터", "알람", "SCADA"], finalCheck: "데이터 기반 원인 가설과 추가 확인 항목이 있는지" }
      ],
      "ai-engineering": [
        { title: "문제와 데이터 정의", objective: "현장 문제를 목표 지표, 입력 데이터, 라벨 기준으로 바꿉니다.", time: "2시간", deliverable: "데이터 정의서와 목표 지표표", keywords: ["문제정의", "데이터", "라벨"], finalCheck: "모델보다 먼저 판단 기준이 정해졌는지" },
        { title: "기준 모델 학습·평가", objective: "간단한 분류, 예측, 이상탐지 모델을 만들고 평가 지표를 비교합니다.", time: "3시간", deliverable: "모델 평가 리포트", keywords: ["모델평가", "이상탐지", "분류"], finalCheck: "오탐·미탐과 현장 비용을 적었는지" },
        { title: "현장 적용 리스크 검토", objective: "데이터 누수, drift, 라벨 오류, 운영 조건 차이를 점검합니다.", time: "2시간", deliverable: "AI 적용 리스크 체크리스트", keywords: ["MLOps", "drift", "설명가능성"], finalCheck: "모델이 틀렸을 때의 대응 기준이 있는지" },
        { title: "개선 리포트와 설명 자료", objective: "모델 결과를 공정·설비·품질 개선 우선순위로 번역합니다.", time: "2시간", deliverable: "개선 우선순위 리포트와 대시보드 초안", keywords: ["대시보드", "원인가설", "개선"], finalCheck: "현업 담당자가 다음 행동을 알 수 있는지" }
      ]
    });

    Object.assign(starterKeywords, {
      "aerospace-defense": "항공 우주 국방 방산 UAV UAM 비행제어 항공전자 레이더 RF 요구사항 HIL MIL-STD",
      "robotics-automation": "로봇 자동화 ROS2 SLAM Navigation PLC 센서 구동기 비전검사 인터록 EtherCAT",
      "energy-ess": "전력 ESS BMS PCS EMS 인버터 전력전자 보호계전 전기설비 SCADA 충방전",
      "ai-engineering": "AI 적용 제조AI 데이터분석 이상탐지 비전검사 예지보전 MLOps Python SQL"
    });

    const emergingDirectRoles = {
      mechanical: [
        "aerospace-systems-engineer", "uav-flight-control-engineer", "defense-systems-engineer",
        "robot-mechanical-design-engineer", "robot-control-engineer", "smart-factory-automation-engineer",
        "simulation-ai-engineer"
      ],
      electrical: [
        "aerospace-systems-engineer", "uav-flight-control-engineer", "avionics-integration-engineer", "defense-systems-engineer", "radar-rf-signal-engineer",
        "robot-control-engineer", "robot-perception-engineer", "smart-factory-automation-engineer", "plc-instrumentation-engineer",
        "power-electronics-inverter-engineer", "electric-machine-drive-engineer",
        "manufacturing-ai-engineer", "predictive-maintenance-ai-engineer", "vision-inspection-ai-engineer", "engineering-data-analyst", "simulation-ai-engineer"
      ],
      electrical_power: [
        "power-systems-engineer", "ess-bms-engineer", "power-electronics-inverter-engineer", "electric-machine-drive-engineer", "renewable-energy-grid-engineer",
        "plc-instrumentation-engineer", "smart-factory-automation-engineer", "uav-flight-control-engineer", "avionics-integration-engineer"
      ],
      chemical: [
        "ess-bms-engineer", "manufacturing-ai-engineer", "predictive-maintenance-ai-engineer", "engineering-data-analyst"
      ]
    };

    addMajorFits("mechanical", {
      direct: emergingDirectRoles.mechanical,
      bridge: ["avionics-integration-engineer", "radar-rf-signal-engineer", "robot-perception-engineer", "plc-instrumentation-engineer", "ess-bms-engineer", "power-electronics-inverter-engineer", "electric-machine-drive-engineer", "renewable-energy-grid-engineer", "manufacturing-ai-engineer", "predictive-maintenance-ai-engineer", "vision-inspection-ai-engineer", "engineering-data-analyst"]
    });
    addMajorFits("electrical", {
      direct: emergingDirectRoles.electrical,
      bridge: ["robot-mechanical-design-engineer", "power-systems-engineer", "ess-bms-engineer", "renewable-energy-grid-engineer"]
    });
    addMajorFits("electrical_power", {
      direct: emergingDirectRoles.electrical_power,
      bridge: ["hardware-design-engineer", "pcb-design-engineer", "validation-engineer", "power-hardware-engineer", "emc-test-engineer", "embedded-firmware-engineer", "control-engineer", "motor-control-engineer", "vehicle-ee-architecture-engineer", "bms-control-engineer", "ev-power-electronics-engineer", "aerospace-systems-engineer", "defense-systems-engineer", "radar-rf-signal-engineer", "robot-control-engineer", "robot-perception-engineer", "manufacturing-ai-engineer", "predictive-maintenance-ai-engineer", "vision-inspection-ai-engineer", "engineering-data-analyst", "simulation-ai-engineer"],
      bridgeFocus: "전력공학·전기기기·전력전자 강점을 ESS, 모터드라이브, 설비전기, 제어, 계측 데이터 산출물로 보여주는 것이 중요합니다."
    });
    addMajorFits("chemical", {
      direct: emergingDirectRoles.chemical,
      bridge: ["power-systems-engineer", "renewable-energy-grid-engineer", "vision-inspection-ai-engineer", "simulation-ai-engineer", "smart-factory-automation-engineer"]
    });

    Object.entries({
      "aerospace-systems-engineer": ["mathworks-aerospace-blockset-examples", "simulink-onramp", "edx-engineering-systems", "ni-learn-test-measurement", "ncs"],
      "uav-flight-control-engineer": ["mathworks-uav-toolbox-examples", "px4-autopilot-docs", "control-design-onramp", "sensor-fusion-onramp", "simulink-onramp", "ni-learn-test-measurement"],
      "avionics-integration-engineer": ["ti-precision-labs", "signal-processing-onramp", "ni-learn-test-measurement", "mathworks-simulink-examples", "allaboutcircuits-textbook", "youtube-emc-emi-basics"],
      "defense-systems-engineer": ["edx-engineering-systems", "mathworks-aerospace-blockset-examples", "ncs", "quality-one-fmea", "asq-fmea", "ni-learn-test-measurement"],
      "radar-rf-signal-engineer": ["signal-processing-onramp", "matlab-onramp", "mathworks-official-videos", "coursera-engineering-data", "google-ml-crash-course"],
      "robot-mechanical-design-engineer": ["mit-mechanics-materials", "mit-design-manufacturing", "ansys-innovation-courses", "mathworks-robotics-system-toolbox-examples", "kocw-mechanical-design"],
      "robot-control-engineer": ["mathworks-robotics-system-toolbox-examples", "mathworks-ros-toolbox-examples", "control-design-onramp", "simulink-onramp", "ros-tutorials", "comento-plc-control-practice"],
      "robot-perception-engineer": ["mathworks-ros-toolbox-examples", "nav2-ros-docs", "sensor-fusion-onramp", "mathworks-deep-learning-onramp", "nvidia-jetson-ai-course", "google-ml-crash-course"],
      "smart-factory-automation-engineer": ["comento-plc-control-practice", "mathworks-predictive-maintenance", "boostcourse-data-ai-basic", "freecodecamp-python-data", "nist-process-capability", "comento-production-tech-internship"],
      "plc-instrumentation-engineer": ["comento-plc-control-practice", "ni-learn-test-measurement", "kocw-embedded-control", "ti-precision-labs", "hrd-net-job-training"],
      "power-systems-engineer": ["mathworks-simscape-electrical", "kocw-power-electronics-system-analysis", "simscape-onramp", "matlab-onramp", "edx-engineering-systems", "ni-learn-test-measurement", "ncs"],
      "ess-bms-engineer": ["mathworks-simscape-battery-examples", "mathworks-simscape-electrical", "kocw-power-electronics-system-analysis", "simulink-onramp", "stateflow-onramp", "matlab-onramp", "mathworks-predictive-maintenance"],
      "power-electronics-inverter-engineer": ["kocw-power-electronics-system-analysis", "mathworks-simscape-electrical", "ti-power-management-training", "ti-precision-labs", "simscape-onramp", "mathworks-motor-control-blockset", "youtube-emc-emi-basics"],
      "electric-machine-drive-engineer": ["kocw-power-electronics-system-analysis", "mathworks-motor-control-blockset", "control-design-onramp", "mathworks-simscape-electrical", "simulink-onramp", "ni-learn-test-measurement"],
      "renewable-energy-grid-engineer": ["mathworks-simscape-electrical", "kocw-power-electronics-system-analysis", "mathworks-simscape-battery-examples", "matlab-onramp", "coursera-engineering-data", "google-ml-crash-course"],
      "manufacturing-ai-engineer": ["google-ml-crash-course", "machine-learning-onramp", "boostcourse-data-ai-basic", "freecodecamp-python-data", "mathworks-predictive-maintenance", "statistics-onramp"],
      "predictive-maintenance-ai-engineer": ["mathworks-predictive-maintenance", "signal-processing-onramp", "machine-learning-onramp", "statistics-onramp", "google-ml-crash-course", "freecodecamp-python-data", "coursera-engineering-data"],
      "vision-inspection-ai-engineer": ["mathworks-deep-learning-onramp", "nvidia-jetson-ai-course", "machine-learning-onramp", "google-ml-crash-course", "boostcourse-data-ai-basic"],
      "engineering-data-analyst": ["freecodecamp-python-data", "google-ml-crash-course", "boostcourse-data-ai-basic", "statistics-onramp", "coursera-engineering-data"],
      "simulation-ai-engineer": ["simulink-onramp", "simscape-onramp", "optimization-onramp", "machine-learning-onramp", "mathworks-simulink-examples", "mathworks-simscape-examples"]
    }).forEach(([roleId, resourceIds]) => {
      roleResourceLinks[roleId] = mergeValues(resourceIds, roleResourceLinks[roleId] || []);
    });

    addRoleCompetencyLinks({
      "aerospace-systems-engineer": {
        "요구사항": ["edx-engineering-systems", "mathworks-aerospace-blockset-examples", "ncs"],
        "인터페이스": ["edx-engineering-systems", "ni-learn-test-measurement", "mathworks-aerospace-blockset-examples"],
        "리스크": ["edx-engineering-systems", "ncs", "ni-learn-test-measurement"],
        "규격": ["ncs", "ni-learn-test-measurement", "mathworks-aerospace-blockset-examples"]
      },
      "avionics-integration-engineer": {
        "ICD": ["ni-learn-test-measurement", "mathworks-simulink-examples", "allaboutcircuits-textbook"],
        "통합시험": ["ni-learn-test-measurement", "mathworks-simulink-examples"],
        "EMI/EMC": ["youtube-emc-emi-basics", "ti-precision-labs", "allaboutcircuits-textbook"],
        "환경시험": ["ni-learn-test-measurement", "mathworks-simulink-examples"]
      },
      "defense-systems-engineer": {
        "운용요구": ["edx-engineering-systems", "ncs", "mathworks-aerospace-blockset-examples"],
        "체계공학": ["edx-engineering-systems", "ncs"],
        "시험평가": ["ni-learn-test-measurement", "edx-engineering-systems"],
        "형상관리": ["ncs", "edx-engineering-systems"]
      },
      "radar-rf-signal-engineer": {
        "RF": ["signal-processing-onramp", "ni-learn-test-measurement", "matlab-onramp"],
        "탐지": ["signal-processing-onramp", "matlab-onramp", "mathworks-official-videos"],
        "추적": ["signal-processing-onramp", "coursera-engineering-data", "google-ml-crash-course"]
      },
      "robot-mechanical-design-engineer": {
        "하중": ["mit-mechanics-materials", "ansys-innovation-courses"],
        "구동부": ["mathworks-motor-control-blockset", "mathworks-robotics-system-toolbox-examples"],
        "강성": ["mit-mechanics-materials", "ansys-innovation-courses"],
        "엔드이펙터": ["mathworks-robotics-system-toolbox-examples", "mit-design-manufacturing"],
        "제조성": ["mit-design-manufacturing", "ansys-innovation-courses"]
      },
      "plc-instrumentation-engineer": {
        "도면": ["ni-learn-test-measurement", "ti-precision-labs"],
        "시퀀스": ["ni-learn-test-measurement", "kocw-embedded-control"],
        "안전": ["ni-learn-test-measurement", "ncs"]
      },
      "power-systems-engineer": {
        "수배전": ["kocw-power-electronics-system-analysis", "ncs", "mathworks-simscape-electrical"],
        "보호계전": ["kocw-power-electronics-system-analysis", "ncs", "mathworks-simscape-electrical"],
        "전력품질": ["mathworks-simscape-electrical", "ni-learn-test-measurement", "edx-engineering-systems"]
      },
      "renewable-energy-grid-engineer": {
        "계통연계": ["mathworks-simscape-electrical", "kocw-power-electronics-system-analysis", "mathworks-simscape-battery-examples"],
        "전력품질": ["mathworks-simscape-electrical", "kocw-power-electronics-system-analysis"],
        "EMS": ["mathworks-simscape-battery-examples", "google-ml-crash-course"],
        "예측": ["google-ml-crash-course", "coursera-engineering-data", "matlab-onramp"]
      },
      "manufacturing-ai-engineer": {
        "문제정의": ["google-ml-crash-course", "machine-learning-onramp", "statistics-onramp"],
        "전처리": ["freecodecamp-python-data", "statistics-onramp", "google-ml-crash-course"],
        "운영": ["mathworks-predictive-maintenance", "google-ml-crash-course", "freecodecamp-python-data"]
      },
      "predictive-maintenance-ai-engineer": {
        "시계열": ["mathworks-predictive-maintenance", "signal-processing-onramp", "statistics-onramp"],
        "정비이력": ["mathworks-predictive-maintenance", "freecodecamp-python-data", "coursera-engineering-data"],
        "리포트": ["mathworks-predictive-maintenance", "freecodecamp-python-data", "statistics-onramp"]
      },
      "simulation-ai-engineer": {
        "물리모델": ["simulink-onramp", "simscape-onramp", "mathworks-simscape-examples"],
        "상관검증": ["simulink-onramp", "statistics-onramp", "coursera-engineering-data"],
        "Surrogate": ["machine-learning-onramp", "google-ml-crash-course", "statistics-onramp"],
        "최적화": ["optimization-onramp", "machine-learning-onramp", "mathworks-simulink-examples"]
      }
    });

    Object.entries({
      "mathworks-aerospace-blockset-examples": ["임무 요구사항 분해", "비행·센서 모델 확인", "시험·안전 검증 리포트"],
      "mathworks-uav-toolbox-examples": ["비행·센서 모델 확인", "시험·안전 검증 리포트", "제어·경로 계획 실습"],
      "px4-autopilot-docs": ["비행·센서 모델 확인", "시험·안전 검증 리포트"],
      "mathworks-robotics-system-toolbox-examples": ["로봇 작업 시나리오 정의", "제어·경로 계획 실습"],
      "mathworks-ros-toolbox-examples": ["센서·구동기 인터페이스", "제어·경로 계획 실습", "문제와 데이터 정의"],
      "nav2-ros-docs": ["제어·경로 계획 실습", "현장 안전·검증 리포트"],
      "mathworks-simscape-battery-examples": ["PCS·배터리 구성 검토", "보호·안전 로직 검증", "운영 데이터 분석 리포트"],
      "mathworks-deep-learning-onramp": ["기준 모델 학습·평가", "개선 리포트와 설명 자료"],
      "mathworks-simscape-electrical": ["전력·부하 요구사항 정의", "PCS·배터리 구성 검토", "보호·안전 로직 검증"],
      "kocw-power-electronics-system-analysis": ["전력·부하 요구사항 정의", "PCS·배터리 구성 검토", "보호·안전 로직 검증"],
      "ti-power-management-training": ["전력·부하 요구사항 정의", "보호·안전 로직 검증"],
      "mathworks-motor-control-blockset": ["보호·안전 로직 검증", "제어·경로 계획 실습"],
      "signal-processing-onramp": ["기준 모델 학습·평가"],
      "machine-learning-onramp": ["기준 모델 학습·평가"],
      "statistics-onramp": ["문제와 데이터 정의", "기준 모델 학습·평가", "현장 적용 리스크 검토"],
      "mathworks-predictive-maintenance": ["운영 데이터 분석 리포트", "문제와 데이터 정의", "기준 모델 학습·평가"],
      "google-ml-crash-course": ["문제와 데이터 정의", "기준 모델 학습·평가", "현장 적용 리스크 검토"],
      "coursera-engineering-data": ["문제와 데이터 정의", "개선 리포트와 설명 자료"],
      "boostcourse-data-ai-basic": ["문제와 데이터 정의", "개선 리포트와 설명 자료"],
      "freecodecamp-python-data": ["문제와 데이터 정의", "기준 모델 학습·평가", "개선 리포트와 설명 자료"],
      "comento-plc-control-practice": ["센서·구동기 인터페이스", "현장 안전·검증 리포트", "보호·안전 로직 검증"],
      "ni-learn-test-measurement": ["항전·통신 인터페이스 검토", "시험·안전 검증 리포트", "보호·안전 로직 검증"]
    }).forEach(([resourceId, taskTitles]) => {
      resourceTaskLinks[resourceId] = mergeValues(resourceTaskLinks[resourceId], taskTitles);
    });

    Object.assign(industryDiagnostics, {
      aerospace: [["요구사항추적", "임무 요구사항을 하위 시스템과 검증 항목으로 나눌 수 있다."], ["비행·환경검증", "비행 조건, 환경 시험, 센서 데이터를 검증 기준과 연결할 수 있다."]],
      defense: [["체계공학", "운용 시나리오와 하위 장비 요구사항의 관계를 설명할 수 있다."], ["규격·시험평가", "MIL-STD, 환경시험, 시험평가 기준을 요구사항과 연결할 수 있다."]],
      energy: [["전력·ESS", "부하, PCS, BMS, 보호, 운영 데이터를 하나의 시스템으로 설명할 수 있다."], ["안전·보호", "전기 안전, 절연, 보호계전, 열폭주 리스크를 검토할 수 있다."]],
      ai: [["문제정의", "AI 모델보다 먼저 목표 지표, 데이터, 판정 기준을 정의할 수 있다."], ["운영검증", "모델 성능 저하와 현장 적용 리스크를 점검할 수 있다."]]
    });
  }

  applyEmergingRoleExpansion();

  function applyAutonomousVehicleSoftwareExpansion() {
    const mergeValues = (base = [], additions = []) => [...new Set([...(base || []), ...(additions || [])])];
    const addMajorFits = (major, { direct = [], bridge = [], bridgeFocus } = {}) => {
      if (!majorRoleFitProfiles[major]) {
        majorRoleFitProfiles[major] = { direct: [], bridge: [], bridgeFocus: bridgeFocus || "" };
      }
      majorRoleFitProfiles[major].direct = mergeValues(majorRoleFitProfiles[major].direct, direct);
      majorRoleFitProfiles[major].bridge = mergeValues(majorRoleFitProfiles[major].bridge, bridge);
      if (bridgeFocus) majorRoleFitProfiles[major].bridgeFocus = bridgeFocus;
    };

    if (!tracks.some((track) => track.id === "autonomous-sdv")) {
      tracks.splice(2, 0, {
        id: "autonomous-sdv",
        title: "자율주행·차량 SW",
        majors: ["electrical", "electrical_power", "mechanical", "computer", "both"],
        industries: ["mobility", "ai", "electronics", "robotics", "defense"],
        difficulty: "상",
        summary: "카메라·레이더·라이다·GPS/IMU, 차량 네트워크, AUTOSAR/SDV 플랫폼, 진단·OTA·보안을 연결해 차량 SW 기능을 개발·검증하는 직무군입니다.",
        tasks: ["자율주행 기능 요구사항 분해", "인지·센서융합·경로계획 모델 검토", "차량 SW 플랫폼·진단 인터페이스 정의", "시나리오·로그 기반 검증"],
        skills: ["인지·센서융합", "Localization", "Planning·Control", "AUTOSAR·SDV", "UDS·OTA", "ISO 21434"],
        tools: ["MATLAB/Simulink", "Automated Driving Toolbox", "RoadRunner", "ROS2", "CANoe/CANalyzer", "AUTOSAR", "Python"],
        outputs: ["자율주행 기능 요구사항표", "센서/CAN 로그 동기화 리포트", "시나리오 검증표", "AUTOSAR 인터페이스 정의서", "진단·OTA 테스트 케이스"],
        misconceptions: ["자율주행은 AI 모델 하나가 아니라 센서 데이터, 차량 제어, 안전 시나리오, 차량 SW 플랫폼, 검증 체계가 함께 움직입니다.", "차량용 SW는 코딩만 보는 직무가 아니라 CAN/UDS, AUTOSAR, 요구사항, 테스트, 기능안전·보안까지 연결해 설명해야 합니다."]
      });
    }

    if (!majorBridgeTracks.electrical_power.includes("autonomous-sdv")) majorBridgeTracks.electrical_power.push("autonomous-sdv");
    ["electrical", "mechanical"].forEach((major) => {
      majorBridgeTracks[major] = mergeValues(majorBridgeTracks[major], ["autonomous-sdv"]);
    });

    Object.assign(diagnostics, {
      "autonomous-sdv": [
        ["인지·센서융합", "카메라, 레이더, 라이다, GPS/IMU 데이터가 자율주행 판단에 어떻게 쓰이는지 설명할 수 있다."],
        ["시나리오 검증", "AEB, LKA, ACC, cut-in, VRU 같은 시나리오를 테스트 조건과 Pass/Fail 기준으로 바꿀 수 있다."],
        ["차량 네트워크", "CAN, Ethernet, SOME/IP, UDS, DBC의 역할을 차량 기능 흐름과 연결할 수 있다."],
        ["SW 플랫폼", "AUTOSAR Classic/Adaptive, middleware, service, safety 요구사항의 차이를 설명할 수 있다."],
        ["보안·OTA", "ISO 21434, secure boot, OTA, 진단 로그가 차량 SW 품질과 안전에 왜 필요한지 설명할 수 있다."]
      ]
    });

    const autonomousRoles = [
      {
        id: "autonomous-perception-engineer",
        title: "자율주행 인지 알고리즘 엔지니어",
        postingKeywords: ["Perception", "Camera", "LiDAR", "Radar", "Deep Learning"],
        industries: ["mobility", "ai", "robotics", "all"],
        focus: "카메라·라이다·레이더 데이터를 객체, 차선, 신호, 주행 가능 영역으로 인식하고 오탐·미탐을 줄이는 직무",
        coreWork: "센서 데이터셋, 라벨 기준, 인지 모델, 평가 지표를 연결해 자율주행 기능의 오탐·미탐 리스크를 줄입니다.",
        coreTerms: ["perception", "camera", "LiDAR", "radar", "object detection", "segmentation", "lane detection", "false positive", "false negative", "dataset", "annotation"],
        tools: ["Python", "PyTorch", "OpenCV", "ROS2", "MATLAB", "Automated Driving Toolbox"],
        aiCompetency: { level: "핵심 역량", summary: "인지 직무는 AI 모델, 센서 조건, 라벨 품질, 평가 지표가 직무의 중심입니다.", keywords: ["Perception", "Dataset", "오탐·미탐"], diagnostics: [["인지 평가", "오탐·미탐 사례를 센서 조건과 라벨 기준으로 분류할 수 있다."], ["데이터셋", "학습·검증 데이터 분리와 라벨 품질 리스크를 설명할 수 있다."]] },
        coreCompetencies: ["센서별 장단점과 인지 모델 입력·출력을 설명하는 역량", "오탐·미탐 사례를 데이터셋 개선 항목으로 바꾸는 역량", "인지 결과를 차량 시나리오와 안전 리스크로 연결하는 역량"],
        responsibilities: ["주행 센서 데이터셋 수집·전처리", "객체·차선·주행 가능 영역 인지 모델 평가", "오탐·미탐 원인 분석", "인지 결과와 주행 시나리오 검증 지표 연결"],
        requirements: ["Python, 영상처리, 딥러닝, 선형대수 기초", "카메라·라이다·레이더 데이터와 라벨 기준 이해", "모델 성능 지표와 실패 사례 분석"],
        preferred: ["ROS2, OpenCV, PyTorch, TensorRT, Automated Driving Toolbox 경험", "차량 센서 로그와 주행 데이터셋 평가 경험"]
      },
      {
        id: "sensor-fusion-localization-engineer",
        title: "센서퓨전·측위 엔지니어",
        postingKeywords: ["Sensor Fusion", "Localization", "Kalman Filter", "GPS/IMU", "SLAM"],
        industries: ["mobility", "robotics", "ai", "all"],
        focus: "카메라, 레이더, 라이다, GPS/IMU, wheel speed 데이터를 시간 동기화하고 차량 위치·객체 추정을 안정화하는 직무",
        coreWork: "센서 시간 동기화, 좌표계, 추정 필터, 위치 오차를 관리해 자율주행 판단의 입력 신뢰도를 높입니다.",
        coreTerms: ["sensor fusion", "localization", "Kalman Filter", "GPS", "IMU", "SLAM", "coordinate frame", "time synchronization", "tracking", "HD map"],
        tools: ["MATLAB", "Sensor Fusion Toolbox", "ROS2", "Python", "RViz", "RoadRunner"],
        aiCompetency: { level: "중요", summary: "AI 모델보다 센서 동기화, 좌표계, 추정 오차 검증이 핵심입니다.", keywords: ["센서융합", "Localization", "Kalman Filter"], diagnostics: [["동기화", "센서 시간 차이가 추정 결과에 미치는 영향을 설명할 수 있다."], ["오차", "위치 오차와 추적 성능을 평가 지표로 정리할 수 있다."]] },
        coreCompetencies: ["센서 좌표계와 시간 동기화를 로그로 검증하는 역량", "Kalman filter와 tracking 결과를 성능 지표로 해석하는 역량", "지도·차량 상태·센서 오차가 주행 판단에 주는 영향을 설명하는 역량"],
        responsibilities: ["센서 로그 시간 동기화와 좌표계 정리", "객체 추적·차량 localization 모델 검증", "GPS/IMU/차량 CAN 로그 비교", "센서 오류와 추정 실패 시나리오 분석"],
        requirements: ["확률·선형대수, 신호처리, 센서융합 기초", "MATLAB/Python 기반 로그 분석", "차량 좌표계와 CAN 신호 이해"],
        preferred: ["Sensor Fusion Toolbox, ROS2, SLAM, HD map, GNSS/IMU 경험", "실차 주행 로그 기반 localization 검증 경험"]
      },
      {
        id: "autonomous-planning-control-engineer",
        title: "자율주행 판단·경로계획·제어 엔지니어",
        postingKeywords: ["Planning", "Control", "Trajectory", "Behavior", "MPC"],
        industries: ["mobility", "ai", "robotics", "all"],
        focus: "인지·측위 결과를 기반으로 차선 변경, 추종, 정지, 회피 경로를 만들고 차량 제어 응답을 검증하는 직무",
        coreWork: "주행 상황을 behavior, trajectory, control command로 바꾸고 시나리오별 안전·승차감·법규 기준을 검증합니다.",
        coreTerms: ["behavior planning", "path planning", "trajectory", "MPC", "LKA", "ACC", "AEB", "cut-in", "comfort", "safety constraint"],
        tools: ["MATLAB", "Simulink", "Model Predictive Control", "RoadRunner", "CarMaker", "Python"],
        aiCompetency: { level: "중요", summary: "경로계획은 AI보다 시나리오, 제약조건, 제어 응답 검증이 더 직접적인 준비 근거가 됩니다.", keywords: ["Planning", "MPC", "Scenario"], diagnostics: [["시나리오", "주행 상황을 제약조건과 목표함수로 바꿀 수 있다."], ["응답", "경로와 제어 명령이 차량 응답에 미치는 영향을 검증할 수 있다."]] },
        coreCompetencies: ["주행 시나리오를 상태, 목표, 제약조건으로 바꾸는 역량", "경로와 제어 응답을 안전·승차감 지표로 비교하는 역량", "시뮬레이션 결과와 차량 로그 차이를 원인 가설로 정리하는 역량"],
        responsibilities: ["주행 행동·경로계획 로직 검토", "LKA/ACC/AEB 제어 응답 검증", "시뮬레이션 기반 시나리오 평가", "안전 제약조건과 예외 상황 정리"],
        requirements: ["제어공학, 차량동역학, 알고리즘 기초", "Simulink/MATLAB 또는 Python 시뮬레이션", "주행 시나리오와 평가 지표 이해"],
        preferred: ["MPC, RoadRunner, CarMaker, PreScan, 실차 로그 분석 경험", "ADAS/자율주행 planning 프로젝트 경험"]
      },
      {
        id: "autonomous-simulation-validation-engineer",
        title: "자율주행 시뮬레이션·검증 엔지니어",
        postingKeywords: ["Scenario", "Simulation", "ADAS", "RoadRunner", "Validation"],
        industries: ["mobility", "ai", "electronics", "all"],
        focus: "주행 시나리오, 센서 모델, HIL/SIL, 실차 로그를 연결해 자율주행 기능의 Pass/Fail 기준을 검증하는 직무",
        coreWork: "요구사항을 시나리오와 평가 지표로 바꾸고 시뮬레이션·실차 로그를 비교해 기능 실패 조건을 찾습니다.",
        coreTerms: ["scenario", "simulation", "RoadRunner", "CarMaker", "PreScan", "HIL", "SIL", "KPIs", "coverage", "corner case"],
        tools: ["RoadRunner", "Automated Driving Toolbox", "Simulink Test", "Python", "CANoe", "dSPACE"],
        aiCompetency: { level: "중요", summary: "자율주행 검증에서는 corner case 탐색과 로그 분류에 데이터 분석 역량이 크게 쓰입니다.", keywords: ["Scenario Mining", "Corner Case", "로그분석"], diagnostics: [["검증 커버리지", "시나리오 커버리지와 실패 조건을 지표로 설명할 수 있다."], ["로그 분류", "실패 로그를 센서·인지·제어·시나리오 원인으로 나눌 수 있다."]] },
        coreCompetencies: ["요구사항을 주행 시나리오와 Pass/Fail 기준으로 바꾸는 역량", "SIL/HIL/실차 결과 차이를 원인별로 분류하는 역량", "corner case와 검증 커버리지를 리포트로 정리하는 역량"],
        responsibilities: ["자율주행 시나리오 설계와 테스트 케이스 작성", "시뮬레이션·HIL·실차 로그 비교", "Pass/Fail 기준과 검증 커버리지 관리", "실패 케이스 원인 분석"],
        requirements: ["ADAS 기능, 센서 로그, 차량 네트워크, 테스트 설계 이해", "MATLAB/Python 기반 로그 분석", "요구사항과 테스트 케이스 추적"],
        preferred: ["RoadRunner, CarMaker, PreScan, dSPACE, Simulink Test 경험", "scenario mining, corner case 분석 경험"]
      },
      {
        id: "vehicle-sw-platform-engineer",
        title: "차량 SW 플랫폼·AUTOSAR 엔지니어",
        postingKeywords: ["AUTOSAR", "BSW", "Middleware", "SDV", "SOME/IP"],
        industries: ["mobility", "electronics", "all"],
        focus: "AUTOSAR Classic/Adaptive, BSW, middleware, service, Ethernet/SOME-IP를 기반으로 차량 SW 플랫폼을 구성하는 직무",
        coreWork: "ECU 기능을 software component, interface, service, communication stack으로 나누고 통합·빌드·검증 흐름을 관리합니다.",
        coreTerms: ["AUTOSAR Classic", "AUTOSAR Adaptive", "BSW", "RTE", "SWC", "SOME/IP", "DDS", "ara::com", "Service-Oriented Architecture", "SDV"],
        tools: ["AUTOSAR", "Vector", "DaVinci", "EB tresos", "CANoe", "Git", "C/C++", "QNX/Linux"],
        aiCompetency: { level: "보조 역량", summary: "차량 SW 플랫폼은 AI보다 요구사항·인터페이스·빌드·통합 검증을 정확히 다루는 역량이 우선입니다.", keywords: ["요구사항 분석", "인터페이스 정리"], diagnostics: [["인터페이스", "SWC와 service interface를 요구사항과 연결할 수 있다."], ["통합", "빌드·통합 오류를 로그와 설정 기준으로 분리할 수 있다."]] },
        coreCompetencies: ["차량 기능을 SWC, BSW, RTE, middleware 인터페이스로 분해하는 역량", "CAN/Ethernet/SOME-IP 통신을 플랫폼 설정과 연결하는 역량", "빌드·통합 오류를 설정·코드·통신 원인으로 분리하는 역량"],
        responsibilities: ["AUTOSAR SWC/BSW 설정과 인터페이스 관리", "CAN/Ethernet/SOME-IP 통신 스택 연동", "빌드·통합·버전 관리", "플랫폼 요구사항과 테스트 케이스 작성"],
        requirements: ["C/C++, 임베디드 SW, 차량 네트워크 기초", "AUTOSAR Classic/Adaptive 개념과 SWC/RTE/BSW 이해", "Git, 빌드 로그, 통합 테스트 경험"],
        preferred: ["Vector DaVinci, EB tresos, CANoe, QNX/Linux, Adaptive AUTOSAR 경험", "SDV, service-oriented architecture, Ethernet 통신 경험"]
      },
      {
        id: "vehicle-diagnostics-ota-engineer",
        title: "차량 진단·OTA 엔지니어",
        postingKeywords: ["UDS", "DTC", "OTA", "DoIP", "진단"],
        industries: ["mobility", "electronics", "all"],
        focus: "UDS, DTC, DoIP, bootloader, OTA 업데이트, 실패 복구 조건을 설계·검증하는 차량 SW 직무",
        coreWork: "차량 기능의 고장 상태를 진단 서비스, DTC, update campaign, rollback, 로그 분석으로 관리합니다.",
        coreTerms: ["UDS", "DTC", "DoIP", "bootloader", "OTA", "FOTA", "SOTA", "rollback", "diagnostic session", "flash programming"],
        tools: ["CANoe", "CANalyzer", "Vector", "UDS", "Python", "Git", "JIRA"],
        aiCompetency: { level: "보조 역량", summary: "진단·OTA는 AI보다 오류 상태 정의, 업데이트 실패 조건, 재현 로그 관리가 핵심입니다.", keywords: ["진단 로그", "업데이트 실패 분석"], diagnostics: [["진단 서비스", "UDS 서비스와 DTC가 어떤 고장 상태를 표현하는지 설명할 수 있다."], ["OTA 검증", "업데이트 실패와 rollback 조건을 테스트 케이스로 만들 수 있다."]] },
        coreCompetencies: ["UDS 서비스와 DTC를 기능 고장 상태와 연결하는 역량", "OTA 업데이트 단계별 실패·복구 조건을 테스트하는 역량", "진단 로그를 재현 조건과 원인 후보로 정리하는 역량"],
        responsibilities: ["UDS 진단 서비스와 DTC 요구사항 정의", "OTA/bootloader 업데이트 시나리오 검증", "DoIP/CAN 진단 로그 분석", "업데이트 실패·rollback 테스트 케이스 작성"],
        requirements: ["CAN, Ethernet, UDS, DTC, bootloader 기초", "C/C++ 또는 Python 기반 로그 분석", "요구사항과 테스트 케이스 문서화"],
        preferred: ["CANoe Diagnostic, DoIP, OTA 플랫폼, secure boot 경험", "차량 진단 표준과 양산 업데이트 프로세스 이해"]
      },
      {
        id: "vehicle-cybersecurity-engineer",
        title: "차량 사이버보안 엔지니어",
        postingKeywords: ["ISO 21434", "TARA", "Secure Boot", "HSM", "Cybersecurity"],
        industries: ["mobility", "electronics", "defense", "all"],
        focus: "차량 네트워크, ECU, OTA, 진단, 키 관리의 위협을 분석하고 ISO 21434 기반 보안 요구사항과 검증 증거를 만드는 직무",
        coreWork: "차량 기능과 통신 경로의 위협을 TARA로 분석하고 secure boot, 인증, 암호화, 로그 검증 요구사항으로 바꿉니다.",
        coreTerms: ["ISO 21434", "TARA", "UNECE R155", "UNECE R156", "secure boot", "HSM", "key management", "penetration test", "SBOM", "threat analysis"],
        tools: ["CANoe", "Wireshark", "Python", "HSM", "JIRA", "Polarion", "보안 체크리스트"],
        aiCompetency: { level: "보조 역량", summary: "보안 직무는 AI보다 위협 모델링, 요구사항 추적, 검증 증거 관리가 우선입니다.", keywords: ["TARA", "보안 요구사항"], diagnostics: [["위협분석", "자산·위협·취약점·공격 경로를 표로 정리할 수 있다."], ["보안검증", "보안 요구사항과 테스트 증거를 연결할 수 있다."]] },
        coreCompetencies: ["차량 기능·네트워크·OTA 경로를 threat scenario로 나누는 역량", "보안 요구사항을 ECU·통신·진단 테스트로 바꾸는 역량", "보안 이슈를 기능안전·품질·개발 프로세스와 연결하는 역량"],
        responsibilities: ["TARA와 보안 요구사항 작성", "CAN/Ethernet/OTA 위협 시나리오 분석", "secure boot, key management, 인증 요구 검토", "보안 검증 증거와 이슈 추적"],
        requirements: ["차량 네트워크, 임베디드 SW, 보안 기초", "ISO 21434, TARA, 암호화·인증 개념 이해", "요구사항과 테스트 증거 문서화"],
        preferred: ["UNECE R155/R156, HSM, secure boot, penetration test 경험", "AUTOSAR SecOC, OTA 보안, SBOM 이해"]
      }
    ];

    jobRoles["autonomous-sdv"] = mergeValues(jobRoles["autonomous-sdv"] || [], autonomousRoles).filter((role, index, arr) => (
      arr.findIndex((item) => item.id === role.id) === index
    ));

    Object.assign(roleDiagnostics, {
      "autonomous-perception-engineer": [["센서", "카메라·라이다·레이더 데이터 특성과 한계를 설명할 수 있다."], ["라벨", "객체·차선·영역 라벨 기준을 판정 기준으로 만들 수 있다."], ["모델평가", "precision, recall, 오탐, 미탐을 시나리오와 연결할 수 있다."], ["데이터셋", "학습·검증 데이터 분리와 bias 리스크를 설명할 수 있다."], ["안전", "인지 실패가 차량 동작에 미치는 위험을 정리할 수 있다."]],
      "sensor-fusion-localization-engineer": [["좌표계", "센서 좌표계와 차량 좌표계 변환을 설명할 수 있다."], ["동기화", "센서 시간 동기화 오류가 추정 결과에 미치는 영향을 말할 수 있다."], ["Kalman Filter", "예측과 보정 단계의 입력·출력을 구분할 수 있다."], ["Localization", "GPS/IMU/차량 CAN 로그로 위치 오차를 평가할 수 있다."], ["Tracking", "객체 추적 결과와 raw detection 차이를 설명할 수 있다."]],
      "autonomous-planning-control-engineer": [["Behavior", "차선 변경, 정지, 추종 같은 행동 결정을 조건으로 표현할 수 있다."], ["Trajectory", "경로의 안전·승차감·법규 제약을 평가할 수 있다."], ["Control", "조향·가감속 명령이 차량 응답에 미치는 영향을 설명할 수 있다."], ["Scenario", "cut-in, VRU, 급정거 같은 시나리오를 테스트로 만들 수 있다."], ["검증", "시뮬레이션과 로그 차이를 원인 가설로 정리할 수 있다."]],
      "autonomous-simulation-validation-engineer": [["시나리오", "주행 시나리오를 actor, road, event, 평가 지표로 나눌 수 있다."], ["Pass/Fail", "기능 요구사항을 판정 기준으로 바꿀 수 있다."], ["SIL/HIL", "SIL, HIL, 실차 검증 목적 차이를 설명할 수 있다."], ["로그분석", "실패 로그를 센서·인지·제어·시나리오 원인으로 분류할 수 있다."], ["커버리지", "검증 커버리지와 corner case 의미를 설명할 수 있다."]],
      "vehicle-sw-platform-engineer": [["AUTOSAR", "SWC, RTE, BSW, Adaptive service의 역할을 구분할 수 있다."], ["통신", "CAN, Ethernet, SOME/IP, DDS가 차량 기능에 어떻게 쓰이는지 설명할 수 있다."], ["빌드", "빌드·통합 오류를 설정, 코드, 의존성 원인으로 나눌 수 있다."], ["요구사항", "플랫폼 요구사항을 인터페이스와 테스트 케이스로 연결할 수 있다."], ["SDV", "service-oriented architecture와 ECU 중심 구조의 차이를 말할 수 있다."]],
      "vehicle-diagnostics-ota-engineer": [["UDS", "진단 session, service, DID, routine control의 목적을 설명할 수 있다."], ["DTC", "고장 상태를 DTC와 freeze frame으로 정리할 수 있다."], ["OTA", "업데이트, 검증, 실패, rollback 흐름을 테스트 케이스로 만들 수 있다."], ["DoIP", "CAN 진단과 Ethernet/DoIP 진단 차이를 설명할 수 있다."], ["로그", "업데이트 실패 로그를 재현 조건과 원인 후보로 나눌 수 있다."]],
      "vehicle-cybersecurity-engineer": [["TARA", "자산, 위협, 취약점, 공격 경로를 표로 만들 수 있다."], ["ISO 21434", "보안 요구사항과 검증 증거의 관계를 설명할 수 있다."], ["Secure Boot", "secure boot, HSM, key management의 목적을 말할 수 있다."], ["OTA 보안", "업데이트 인증과 rollback 리스크를 검토할 수 있다."], ["보안검증", "보안 테스트 결과를 요구사항 충족 증거로 정리할 수 있다."]]
    });

    const newResources = [
      {
        id: "mathworks-autosar-blockset-examples",
        title: "AUTOSAR Blockset 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 180,
        practiceMinutes: 240,
        sequenceLevel: 4,
        tracks: ["autonomous-sdv", "embedded-control", "automotive-mobility"],
        skills: ["AUTOSAR", "SWC", "RTE", "인터페이스", "차량 SW"],
        prerequisites: ["Simulink 기초", "차량 SW 개념"],
        reason: "AUTOSAR SWC, 인터페이스, 코드 생성 흐름을 공식 예제로 확인해 차량 SW 플랫폼 직무의 산출물과 직접 연결됩니다.",
        expectedOutput: "AUTOSAR SWC 인터페이스 정의와 테스트 케이스 초안",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/autosar/examples.html"
      },
      {
        id: "mathworks-vehicle-network-toolbox-examples",
        title: "Vehicle Network Toolbox 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 150,
        practiceMinutes: 180,
        sequenceLevel: 4,
        tracks: ["autonomous-sdv", "automotive-mobility", "embedded-control"],
        skills: ["CAN", "DBC", "UDS", "차량통신", "로그분석"],
        prerequisites: ["CAN 기초"],
        reason: "CAN 메시지, DBC, 차량 네트워크 로그 분석 흐름을 공식 예제로 확인해 ECU·진단·검증 직무에 연결하기 좋습니다.",
        expectedOutput: "CAN/DBC 신호 정의표와 로그 분석 메모",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/vnt/examples.html"
      },
      {
        id: "mathworks-roadrunner-scenario-examples",
        title: "RoadRunner 주행 시나리오 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 180,
        practiceMinutes: 240,
        sequenceLevel: 4,
        tracks: ["autonomous-sdv", "automotive-mobility"],
        skills: ["RoadRunner", "시나리오", "자율주행 검증", "시뮬레이션"],
        prerequisites: ["자율주행 기능 이해"],
        reason: "자율주행 검증에서 중요한 도로·actor·event·평가 지표를 시나리오 산출물로 만드는 데 적합한 공식 예제입니다.",
        expectedOutput: "자율주행 시나리오 정의표와 평가 지표 초안",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/roadrunner/examples.html"
      },
      {
        id: "autoisac-cybersecurity-best-practices",
        title: "Auto-ISAC Automotive Cybersecurity Best Practices",
        provider: "Auto-ISAC",
        type: "산업 가이드",
        language: "영어",
        difficulty: "기초실습",
        estimatedMinutes: 120,
        practiceMinutes: 120,
        sequenceLevel: 3,
        tracks: ["autonomous-sdv"],
        skills: ["차량보안", "TARA", "ISO 21434", "보안 요구사항"],
        prerequisites: ["차량 네트워크 기초"],
        reason: "차량 사이버보안 직무에서 요구되는 위협 분석, 보안 요구사항, 조직 프로세스 관점을 빠르게 정리하는 산업 가이드입니다.",
        expectedOutput: "차량 기능 1개에 대한 위협 시나리오와 보안 요구사항 표",
        qualityStatus: "reviewed",
        url: "https://automotiveisac.com/best-practices/"
      }
    ];

    const existingResourceIds = new Set(resources.map((resource) => resource.id));
    resources.push(...newResources.filter((resource) => !existingResourceIds.has(resource.id)).map(normalizeResource));

    [
      "mathworks-automated-driving-examples",
      "mathworks-lane-following-sensor-fusion",
      "mathworks-simulink-test-manager",
      "mathworks-fault-tolerant-fuel-control",
      "mathworks-automated-driving-examples",
      "mathworks-official-videos",
      "sensor-fusion-onramp",
      "control-design-onramp",
      "simulink-onramp",
      "stateflow-onramp",
      "signal-processing-onramp",
      "machine-learning-onramp",
      "mathworks-deep-learning-onramp",
      "google-ml-crash-course",
      "freecodecamp-python-data",
      "youtube-css-can-bus",
      "youtube-mathworks-hil-testing",
      "nvidia-jetson-ai-course",
      "ros-tutorials",
      "mathworks-ros-toolbox-examples"
    ].forEach((resourceId) => {
      const resource = resources.find((item) => item.id === resourceId);
      if (resource) resource.tracks = mergeValues(resource.tracks, ["autonomous-sdv"]);
    });

    Object.assign(curriculumTasks, {
      "autonomous-sdv": [
        { title: "자율주행 기능 요구사항 분해", objective: "지원 직무가 인지, 센서융합, 판단, 제어, 플랫폼, 진단 중 어디에 가까운지 요구사항으로 나눕니다.", time: "2시간", deliverable: "자율주행 기능 요구사항표", keywords: ["ADAS", "요구사항", "기능분해"], finalCheck: "기능 입력, 출력, 실패 조건이 적혔는지" },
        { title: "센서·차량 로그 구조 정리", objective: "카메라·레이더·라이다·GPS/IMU와 CAN/DBC 신호를 시간 기준으로 정리합니다.", time: "3시간", deliverable: "센서/CAN 로그 동기화 표", keywords: ["센서융합", "CAN", "로그"], finalCheck: "센서 데이터와 차량 신호가 같은 시간축에 놓였는지" },
        { title: "시나리오·SW 인터페이스 검증", objective: "주행 시나리오 또는 AUTOSAR/UDS 인터페이스를 테스트 케이스로 바꿉니다.", time: "3시간", deliverable: "시나리오·인터페이스 테스트 케이스", keywords: ["RoadRunner", "AUTOSAR", "UDS"], finalCheck: "정상·고장·경계 조건이 포함됐는지" },
        { title: "차량 SW 검증 리포트", objective: "인지 실패, 제어 응답, 진단 로그, OTA/보안 리스크 중 하나를 최종 리포트로 정리합니다.", time: "3시간", deliverable: "차량 SW 검증 리포트", keywords: ["검증", "OTA", "보안"], finalCheck: "지원 회사 공고 키워드와 산출물이 직접 연결됐는지" }
      ]
    });

    Object.assign(starterKeywords, {
      "autonomous-sdv": "자율주행 ADAS Perception Sensor Fusion Localization Planning Control AUTOSAR SDV UDS OTA ISO21434 RoadRunner"
    });

    const autonomousDirect = [
      "autonomous-perception-engineer",
      "sensor-fusion-localization-engineer",
      "autonomous-planning-control-engineer",
      "autonomous-simulation-validation-engineer",
      "vehicle-sw-platform-engineer",
      "vehicle-diagnostics-ota-engineer",
      "vehicle-cybersecurity-engineer"
    ];
    addMajorFits("electrical", { direct: autonomousDirect });
    addMajorFits("electrical_power", {
      direct: ["vehicle-diagnostics-ota-engineer", "vehicle-cybersecurity-engineer"],
      bridge: autonomousDirect,
      bridgeFocus: "전력·전기기기 강점에 CAN/UDS, AUTOSAR, 센서 로그, 검증 문서를 보완하면 차량 SW·자율주행 직무로 확장할 수 있습니다."
    });
    addMajorFits("mechanical", {
      direct: ["autonomous-planning-control-engineer", "autonomous-simulation-validation-engineer"],
      bridge: ["autonomous-perception-engineer", "sensor-fusion-localization-engineer", "vehicle-sw-platform-engineer", "vehicle-diagnostics-ota-engineer", "vehicle-cybersecurity-engineer"]
    });
    addMajorFits("chemical", {
      bridge: ["autonomous-simulation-validation-engineer", "vehicle-cybersecurity-engineer"]
    });

    Object.entries({
      "autonomous-perception-engineer": ["mathworks-automated-driving-examples", "mathworks-lane-following-sensor-fusion", "mathworks-deep-learning-onramp", "nvidia-jetson-ai-course", "sensor-fusion-onramp", "google-ml-crash-course"],
      "sensor-fusion-localization-engineer": ["sensor-fusion-onramp", "mathworks-lane-following-sensor-fusion", "mathworks-automated-driving-examples", "mathworks-ros-toolbox-examples", "signal-processing-onramp", "matlab-onramp"],
      "autonomous-planning-control-engineer": ["control-design-onramp", "simulink-onramp", "mathworks-automated-driving-examples", "mathworks-roadrunner-scenario-examples", "mathworks-lane-following-sensor-fusion", "youtube-mathworks-hil-testing"],
      "autonomous-simulation-validation-engineer": ["mathworks-roadrunner-scenario-examples", "mathworks-automated-driving-examples", "mathworks-simulink-test-manager", "youtube-mathworks-hil-testing", "ni-learn-test-measurement", "sensor-fusion-onramp"],
      "vehicle-sw-platform-engineer": ["mathworks-autosar-blockset-examples", "mathworks-vehicle-network-toolbox-examples", "simulink-onramp", "stateflow-onramp", "youtube-css-can-bus", "freecodecamp-python-data"],
      "vehicle-diagnostics-ota-engineer": ["mathworks-vehicle-network-toolbox-examples", "youtube-css-can-bus", "stateflow-onramp", "simulink-onramp", "freecodecamp-python-data", "ni-learn-test-measurement"],
      "vehicle-cybersecurity-engineer": ["autoisac-cybersecurity-best-practices", "mathworks-vehicle-network-toolbox-examples", "youtube-css-can-bus", "freecodecamp-python-data", "ncs"]
    }).forEach(([roleId, resourceIds]) => {
      roleResourceLinks[roleId] = mergeValues(resourceIds, roleResourceLinks[roleId] || []);
    });

    Object.entries({
      "mathworks-automated-driving-examples": ["자율주행 기능 요구사항 분해", "센서·차량 로그 구조 정리", "시나리오·SW 인터페이스 검증"],
      "mathworks-lane-following-sensor-fusion": ["자율주행 기능 요구사항 분해", "센서·차량 로그 구조 정리", "시나리오·SW 인터페이스 검증"],
      "mathworks-roadrunner-scenario-examples": ["시나리오·SW 인터페이스 검증", "차량 SW 검증 리포트"],
      "mathworks-autosar-blockset-examples": ["시나리오·SW 인터페이스 검증", "차량 SW 검증 리포트"],
      "mathworks-vehicle-network-toolbox-examples": ["센서·차량 로그 구조 정리", "시나리오·SW 인터페이스 검증", "차량 SW 검증 리포트"],
      "autoisac-cybersecurity-best-practices": ["차량 SW 검증 리포트"],
      "sensor-fusion-onramp": ["센서·차량 로그 구조 정리"],
      "mathworks-deep-learning-onramp": ["센서·차량 로그 구조 정리"],
      "nvidia-jetson-ai-course": ["센서·차량 로그 구조 정리"],
      "youtube-css-can-bus": ["센서·차량 로그 구조 정리", "차량 SW 검증 리포트"],
      "youtube-mathworks-hil-testing": ["시나리오·SW 인터페이스 검증", "차량 SW 검증 리포트"]
    }).forEach(([resourceId, taskTitles]) => {
      resourceTaskLinks[resourceId] = mergeValues(resourceTaskLinks[resourceId], taskTitles);
    });

    industryDiagnostics.mobility = mergeValues(industryDiagnostics.mobility, [
      ["SDV", "차량 기능을 ECU 중심 구조와 서비스 중심 구조로 나누어 설명할 수 있다."],
      ["자율주행 검증", "주행 시나리오와 센서/CAN 로그를 Pass/Fail 기준과 연결할 수 있다."]
    ]);
    industryDiagnostics.ai = mergeValues(industryDiagnostics.ai || [], [
      ["AI 적용 기준", "AI 모델 결과를 데이터 품질, 오탐·미탐 비용, 현장 적용 리스크 기준으로 설명할 수 있다."]
    ]);
  }

  applyAutonomousVehicleSoftwareExpansion();

  function applyPriorityRoleExpansion() {
    const mergeValues = (base = [], additions = []) => [...new Set([...(base || []), ...(additions || [])])];
    const addRoleCompetencyLinks = (definitions) => {
      Object.entries(definitions).forEach(([roleId, competencyMap]) => {
        roleCompetencyResourceLinks[roleId] = roleCompetencyResourceLinks[roleId] || {};
        Object.entries(competencyMap).forEach(([skill, resourceIds]) => {
          roleCompetencyResourceLinks[roleId][skill] = mergeValues(roleCompetencyResourceLinks[roleId][skill], resourceIds);
        });
      });
    };
    const mergeRolesById = (base = [], additions = []) => {
      const seen = new Set();
      return [...base, ...additions].filter((role) => {
        if (!role?.id || seen.has(role.id)) return false;
        seen.add(role.id);
        return true;
      });
    };
    const addMajorFits = (major, { direct = [], bridge = [], bridgeFocus } = {}) => {
      if (!majorRoleFitProfiles[major]) {
        majorRoleFitProfiles[major] = { direct: [], bridge: [], bridgeFocus: bridgeFocus || "" };
      }
      majorRoleFitProfiles[major].direct = mergeValues(majorRoleFitProfiles[major].direct, direct);
      majorRoleFitProfiles[major].bridge = mergeValues(majorRoleFitProfiles[major].bridge, bridge);
      if (bridgeFocus) majorRoleFitProfiles[major].bridgeFocus = bridgeFocus;
    };
    const addTrackTags = (trackId, field, values) => {
      const track = tracks.find((item) => item.id === trackId);
      if (track) track[field] = mergeValues(track[field], values);
    };

    Object.assign(industryLabels, {
      infrastructure: "데이터센터·인프라",
      environment: "환경·수처리"
    });

    [
      ["semiconductor-equipment", "industries", ["ai"]],
      ["production-quality", "industries", ["infrastructure"]],
      ["chemical-process", "industries", ["energy", "environment", "ai"]]
    ].forEach(([trackId, field, values]) => addTrackTags(trackId, field, values));

    const priorityTracks = [
      {
        id: "data-center-infra",
        title: "데이터센터 전력·열관리",
        majors: ["electrical_power", "electrical", "mechanical", "industrial", "both"],
        industries: ["infrastructure", "energy", "electronics", "manufacturing", "ai"],
        difficulty: "중",
        summary: "UPS, 수배전, 발전기, 냉각, BMS/DCIM, 장애 대응을 연결해 데이터센터 가용성과 에너지 효율을 관리하는 직무군입니다.",
        tasks: ["전력 부하·이중화 요구사항 정의", "냉각·공조 용량 검토", "BMS/DCIM 알람 분석", "장애 대응·예방정비 계획"],
        skills: ["수배전", "UPS", "발전기", "HVAC", "냉각수", "BMS/DCIM", "PUE"],
        tools: ["전력분석기", "BMS", "DCIM", "SCADA", "Excel", "Power BI", "Simscape"],
        outputs: ["전력 단선도 검토표", "냉각 용량 계산표", "BMS 알람 원인분석표", "장애 대응 체크리스트"],
        misconceptions: ["데이터센터 직무는 IT 장비만 보는 일이 아니라 전력, 냉각, 이중화, 장애 대응을 함께 보는 설비 엔지니어링입니다.", "전기·기계 전공자는 설비 원리와 운영 데이터를 함께 설명해야 경쟁력이 생깁니다."]
      },
      {
        id: "semiconductor-packaging-test",
        title: "반도체 후공정·패키징·테스트",
        majors: ["electrical", "electrical_power", "mechanical", "chemical", "industrial", "materials", "both"],
        industries: ["semiconductor", "electronics", "manufacturing", "ai"],
        difficulty: "상",
        summary: "HBM, advanced packaging, probe/final test, 신뢰성, 불량분석 데이터를 연결해 제품 수율과 품질을 확보하는 직무군입니다.",
        tasks: ["패키지 구조·공정 조건 검토", "Probe·Final Test 항목 정의", "불량 모드·수율 데이터 분석", "신뢰성 시험 결과 해석"],
        skills: ["Advanced Packaging", "HBM", "Probe Test", "Final Test", "ATE", "Reliability", "FA"],
        tools: ["ATE", "JMP", "Python", "SEM/EDS", "X-ray", "C-SAM", "Thermal cycling"],
        outputs: ["패키지 공정 조건표", "Test bin Pareto", "신뢰성 시험 리포트", "불량 분석 원인 가설표"],
        misconceptions: ["후공정은 단순 조립이 아니라 전기적 test, 열·기계 신뢰성, 소재·공정 조건, 데이터 분석이 함께 필요한 직무입니다.", "HBM과 advanced packaging은 구조 용어와 test yield를 함께 이해해야 직무 판단이 됩니다."]
      },
      {
        id: "manufacturing-dx",
        title: "스마트팩토리·제조 DX",
        majors: ["mechanical", "electrical", "electrical_power", "chemical", "computer", "industrial", "both"],
        industries: ["manufacturing", "robotics", "ai", "semiconductor", "battery"],
        difficulty: "중",
        summary: "MES, SCADA, PLC, OPC UA, 설비 로그, 품질 데이터를 연결해 제조 현장의 자동화와 데이터 기반 개선을 수행하는 직무군입니다.",
        tasks: ["설비·공정 데이터 구조 정의", "PLC/SCADA/MES 인터페이스 확인", "OEE·불량·정지 원인 분석", "대시보드·알람 개선"],
        skills: ["MES", "SCADA", "OPC UA", "PLC", "SQL", "Python", "OEE"],
        tools: ["MES", "SCADA", "PLC", "OPC UA", "Python", "SQL", "Power BI"],
        outputs: ["설비 데이터 정의서", "OEE 손실 Pareto", "알람 개선 리포트", "제조 대시보드 초안"],
        misconceptions: ["스마트팩토리는 화려한 AI보다 설비 데이터가 어떤 시간·공정·품질 기준으로 연결되는지 정의하는 일이 먼저입니다.", "전공자는 현장 공정 언어와 데이터 구조를 같이 설명해야 합니다."]
      },
      {
        id: "chemical-sustainability",
        title: "화학·소재·환경 고도화",
        majors: ["chemical", "materials", "mechanical", "electrical_power", "both"],
        industries: ["chemical", "battery", "environment", "energy", "manufacturing", "semiconductor", "electronics"],
        difficulty: "중",
        summary: "수소, CCUS, 수처리, 배터리 리사이클, 고분자·필름 소재, scale-up을 공정 조건과 안전·환경 규제로 연결하는 화학공학 직무군입니다.",
        tasks: ["반응·분리 공정 조건 검토", "환경·안전 규제 기준 확인", "실험 결과 scale-up 검토", "공정 데이터와 품질 지표 분석"],
        skills: ["반응공학", "분리공정", "수처리", "CCUS", "수소", "고분자", "Scale-up"],
        tools: ["Aspen/HYSYS", "MATLAB/Python", "LIMS", "GC/MS", "HPLC", "FTIR", "HAZOP"],
        outputs: ["공정 흐름도와 물질수지", "Scale-up 리스크표", "환경·안전 체크리스트", "품질·분석 결과 요약"],
        misconceptions: ["화학공학 직무는 연구실 합성만이 아니라 공정 안정화, 안전, 환경, scale-up, 데이터 해석으로 넓어집니다.", "지원 회사가 소재·정유·배터리·수소·환경 중 어디에 가까운지 먼저 확인해야 합니다."]
      }
    ];

    const existingTrackIds = new Set(tracks.map((track) => track.id));
    priorityTracks.forEach((track) => {
      if (!existingTrackIds.has(track.id)) tracks.push(track);
    });

    Object.assign(diagnostics, {
      "data-center-infra": [
        ["전력 이중화", "UPS, 발전기, ATS, 배전반이 가용성에 어떤 역할을 하는지 설명할 수 있다."],
        ["냉각 용량", "IT 부하, 냉각 방식, 공조 용량, airflow가 온도 안정성에 미치는 영향을 말할 수 있다."],
        ["운영 데이터", "BMS/DCIM 알람과 전력·온도 로그를 장애 원인 후보로 정리할 수 있다."],
        ["에너지 효율", "PUE와 에너지 절감 개선안을 설비 조건과 연결할 수 있다."],
        ["장애 대응", "정전, 과열, 누수, 장비 고장 상황의 대응 순서를 체크리스트로 만들 수 있다."]
      ],
      "semiconductor-packaging-test": [
        ["패키지 구조", "die, substrate, bump, TSV, interposer, molding 구조를 설명할 수 있다."],
        ["테스트 흐름", "wafer probe, final test, burn-in, binning의 목적 차이를 말할 수 있다."],
        ["수율 데이터", "test bin, fail item, lot, wafer map을 기준으로 불량 원인을 좁힐 수 있다."],
        ["신뢰성", "thermal cycling, HAST, HTOL 같은 시험 목적과 판정 기준을 설명할 수 있다."],
        ["FA", "X-ray, C-SAM, SEM/EDS 결과를 공정·소재 원인 가설로 연결할 수 있다."]
      ],
      "manufacturing-dx": [
        ["데이터 구조", "lot, 설비, recipe, 시간, 품질 결과를 하나의 데이터 키로 묶을 수 있다."],
        ["인터페이스", "PLC, SCADA, MES, OPC UA의 역할과 연결 흐름을 설명할 수 있다."],
        ["OEE", "가동률, 성능, 품질 손실을 개선 우선순위로 바꿀 수 있다."],
        ["알람 분석", "설비 정지·알람 로그를 재현 조건과 원인 후보로 정리할 수 있다."],
        ["대시보드", "현장 담당자가 볼 지표와 판단 문장을 함께 설계할 수 있다."]
      ],
      "chemical-sustainability": [
        ["공정 흐름", "원료, 반응, 분리, 정제, 배출 흐름을 PFD 수준으로 설명할 수 있다."],
        ["Scale-up", "실험실 조건과 파일럿·양산 조건의 차이를 열·물질전달 관점으로 말할 수 있다."],
        ["환경·안전", "배출, 폐수, 위험물, HAZOP, PSM 기준을 공정 조건과 연결할 수 있다."],
        ["분석 데이터", "GC/MS, HPLC, FTIR, 물성 데이터를 품질 지표와 연결할 수 있다."],
        ["신사업 공정", "수소, CCUS, 리사이클, 수처리 공정의 핵심 변수를 구분할 수 있다."]
      ]
    });

    const expansionRoles = {
      "data-center-infra": [
        {
          id: "data-center-electrical-infra-engineer",
          title: "데이터센터 전력설비 엔지니어",
          postingKeywords: ["데이터센터", "UPS", "수배전", "발전기", "전력품질"],
          industries: ["infrastructure", "energy", "all"],
          focus: "UPS, 수배전, 발전기, ATS, 접지, 전력품질을 관리해 데이터센터 전력 가용성을 확보하는 직무",
          coreWork: "IT 부하와 전력 이중화 구조를 단선도, 알람 로그, 예방정비 기준으로 연결해 전력 장애 리스크를 줄입니다.",
          coreTerms: ["data center", "UPS", "switchgear", "generator", "ATS", "STS", "power quality", "grounding", "single line diagram", "redundancy"],
          tools: ["전력분석기", "BMS", "DCIM", "SCADA", "Excel", "Power BI"],
          aiCompetency: { level: "보조 역량", summary: "전력설비 직무에서는 AI보다 전력 계통, 이중화, 알람 재현과 예방정비 기준이 우선입니다.", keywords: ["알람 분석", "예방정비"], diagnostics: [["단선도", "전력 흐름과 이중화 경로를 단선도로 설명할 수 있다."], ["장애 대응", "전력 알람을 원인 후보와 조치 순서로 정리할 수 있다."]] },
          coreCompetencies: ["전력 단선도와 이중화 경로를 해석하는 역량", "UPS·발전기·차단기 알람을 장애 대응 기준으로 바꾸는 역량", "전력품질과 예방정비 결과를 리포트로 정리하는 역량"],
          responsibilities: ["수배전·UPS·발전기 설비 운영", "전력품질과 알람 로그 분석", "정전·절체 시나리오 점검", "예방정비와 장애 대응 문서화"],
          requirements: ["전력공학, 수배전, 접지, 차단기 기초", "BMS/DCIM 알람과 설비 점검표 이해", "전기안전과 장애 대응 문서 작성"],
          preferred: ["전기기사 수준의 설비 이해", "UPS, 발전기, ATS/STS, 전력품질 분석 경험", "데이터센터 또는 플랜트 전력설비 운영 경험"]
        },
        {
          id: "data-center-cooling-engineer",
          title: "데이터센터 냉각·열관리 엔지니어",
          postingKeywords: ["데이터센터", "HVAC", "냉각", "PUE", "CFD"],
          industries: ["infrastructure", "energy", "all"],
          focus: "IT 부하, 공조기, 냉수, airflow, hot aisle/cold aisle을 연결해 서버룸 온도와 에너지 효율을 관리하는 직무",
          coreWork: "열부하와 냉각 경로를 계산하고 온도 로그·알람으로 과열, 냉각 불균형, 에너지 손실 원인을 찾습니다.",
          coreTerms: ["HVAC", "CRAC", "CRAH", "chiller", "airflow", "hot aisle", "cold aisle", "PUE", "thermal load", "CFD"],
          tools: ["BMS", "DCIM", "ANSYS Fluent", "Excel", "Power BI", "데이터로거"],
          aiCompetency: { level: "보조 역량", summary: "냉각 직무는 예측보다 열부하, airflow, 온도 로그를 근거로 개선안을 만드는 역량이 중요합니다.", keywords: ["온도 로그", "열부하"], diagnostics: [["열부하", "IT 부하를 냉각 용량과 연결해 계산할 수 있다."], ["PUE", "에너지 효율 개선 지표를 설명할 수 있다."]] },
          coreCompetencies: ["열부하와 냉각 용량을 계산하는 역량", "온도·유량·압력 로그로 냉각 불균형을 찾는 역량", "PUE 개선안을 설비 변경 리스크와 함께 정리하는 역량"],
          responsibilities: ["서버룸 온도와 냉각 설비 운영", "공조 알람과 온도 로그 분석", "냉각 용량·airflow 개선 검토", "에너지 효율 개선안 문서화"],
          requirements: ["열전달, 유체, 공조 기초", "온도·유량·압력 데이터 해석", "설비 점검표와 개선 리포트 작성"],
          preferred: ["HVAC, chiller, CFD, BMS/DCIM 경험", "데이터센터 또는 클린룸 열관리 경험"]
        },
        {
          id: "dcim-bms-operations-engineer",
          title: "DCIM·BMS 운영 데이터 엔지니어",
          postingKeywords: ["DCIM", "BMS", "알람", "설비데이터", "대시보드"],
          industries: ["infrastructure", "manufacturing", "ai", "all"],
          focus: "BMS/DCIM에서 수집되는 전력, 온도, 습도, 알람 데이터를 정리해 장애 예방과 운영 개선 대시보드를 만드는 직무",
          coreWork: "운영 로그를 시간·설비·알람 등급으로 정리하고 반복 장애와 에너지 손실을 개선 우선순위로 바꿉니다.",
          coreTerms: ["DCIM", "BMS", "alarm", "trend", "dashboard", "PUE", "CMMS", "root cause", "preventive maintenance"],
          tools: ["DCIM", "BMS", "Power BI", "SQL", "Python", "Excel"],
          aiCompetency: { level: "중요", summary: "반복 알람과 이상 징후를 분류하는 데이터 분석 역량이 운영 개선에 직접 쓰입니다.", keywords: ["이상탐지", "대시보드"], diagnostics: [["데이터 정리", "알람 로그를 설비·시간·원인 후보로 정리할 수 있다."], ["개선 우선순위", "반복 장애와 영향도를 기준으로 개선 순서를 제안할 수 있다."]] },
          coreCompetencies: ["설비 로그를 분석 가능한 데이터 구조로 만드는 역량", "반복 알람과 장애 영향도를 우선순위화하는 역량", "운영자가 바로 쓰는 대시보드와 조치 기준을 만드는 역량"],
          responsibilities: ["BMS/DCIM 데이터 정리", "알람 trend와 반복 장애 분석", "운영 대시보드 구성", "예방정비·장애 대응 개선안 도출"],
          requirements: ["Excel/SQL/Python 중 하나 이상의 데이터 처리", "설비 알람과 운영 지표 이해", "대시보드와 개선 리포트 작성"],
          preferred: ["Power BI, CMMS, BMS/DCIM 운영 데이터 경험", "예지보전 또는 설비 운영 개선 프로젝트 경험"]
        }
      ],
      "semiconductor-packaging-test": [
        {
          id: "advanced-packaging-engineer",
          title: "반도체 패키징 공정 엔지니어",
          postingKeywords: ["Advanced Packaging", "HBM", "Bump", "TSV", "Substrate"],
          industries: ["semiconductor", "electronics", "all"],
          focus: "die attach, bump, TSV, substrate, molding, warpage 조건을 관리해 패키지 수율과 신뢰성을 확보하는 직무",
          coreWork: "패키지 구조와 공정 조건을 수율, warpage, 열·기계 신뢰성 결과와 연결해 개선 실험을 설계합니다.",
          coreTerms: ["advanced packaging", "HBM", "bump", "TSV", "interposer", "substrate", "molding", "warpage", "underfill", "thermal resistance"],
          tools: ["JMP", "Python", "SEM", "X-ray", "C-SAM", "thermal cycling"],
          aiCompetency: { level: "보조 역량", summary: "패키징은 AI보다 구조·소재·공정 조건과 신뢰성 데이터를 연결하는 역량이 우선입니다.", keywords: ["수율 데이터", "공정 조건"], diagnostics: [["구조", "패키지 구조와 공정 순서를 설명할 수 있다."], ["불량", "warpage, delamination, crack을 공정 조건과 연결할 수 있다."]] },
          coreCompetencies: ["패키지 구조와 공정 조건을 설명하는 역량", "불량 모드를 소재·공정·열응력 원인으로 나누는 역량", "수율·신뢰성 결과를 개선 실험으로 바꾸는 역량"],
          responsibilities: ["패키지 공정 조건 관리", "불량·수율 데이터 분석", "신뢰성 시험 결과 해석", "공정 조건 변경 리스크 검토"],
          requirements: ["반도체 공정, 소재, 열·기계 기초", "통계와 수율 데이터 해석", "공정 조건표와 개선 리포트 작성"],
          preferred: ["HBM, TSV, bump, underfill, substrate 이해", "SEM/X-ray/C-SAM 분석 경험", "DOE/JMP/Python 활용 경험"]
        },
        {
          id: "semiconductor-test-engineer",
          title: "반도체 테스트 엔지니어",
          postingKeywords: ["Probe Test", "Final Test", "ATE", "Test Program", "Yield"],
          industries: ["semiconductor", "electronics", "all"],
          focus: "wafer probe, final test, ATE, test program, binning 데이터를 관리해 전기적 불량과 수율을 분석하는 직무",
          coreWork: "전기적 test item과 fail bin 데이터를 분석해 제품 특성, 공정 편차, test coverage 문제를 구분합니다.",
          coreTerms: ["wafer probe", "final test", "ATE", "test program", "binning", "parametric test", "coverage", "guardband", "yield"],
          tools: ["ATE", "JMP", "Python", "SQL", "Spotfire", "Excel"],
          aiCompetency: { level: "중요", summary: "테스트 데이터가 많아 Python/SQL 기반 fail pattern 분석과 자동 리포트 역량이 도움이 됩니다.", keywords: ["fail bin", "yield analysis"], diagnostics: [["테스트 흐름", "Probe와 final test의 목적 차이를 설명할 수 있다."], ["수율 분석", "fail bin과 test item을 기준으로 원인 후보를 좁힐 수 있다."]] },
          coreCompetencies: ["전기적 test item과 제품 특성을 연결하는 역량", "fail bin·lot·wafer map 데이터를 분석하는 역량", "test coverage와 guardband 리스크를 설명하는 역량"],
          responsibilities: ["테스트 항목과 bin 결과 분석", "ATE test program 이슈 대응", "수율·불량 trend 리포트 작성", "공정·설계·품질 부서와 원인 분류"],
          requirements: ["전자회로 또는 반도체 소자 기초", "Python/SQL/JMP 기반 데이터 분석", "테스트 결과와 제품 spec 해석"],
          preferred: ["ATE, probe/final test, wafer map 분석 경험", "test program, guardband, DFT 이해"]
        },
        {
          id: "packaging-reliability-fa-engineer",
          title: "패키지 신뢰성·불량분석 엔지니어",
          postingKeywords: ["Reliability", "FA", "HAST", "Thermal Cycling", "C-SAM"],
          industries: ["semiconductor", "electronics", "all"],
          focus: "패키지 신뢰성 시험과 불량분석 결과를 소재·공정·설계 원인 가설로 연결하는 직무",
          coreWork: "열·습도·전기 스트레스 시험 결과와 분석 이미지를 종합해 fail mechanism과 개선 항목을 정리합니다.",
          coreTerms: ["reliability", "HAST", "HTOL", "thermal cycling", "C-SAM", "X-ray", "cross section", "delamination", "crack", "fail mechanism"],
          tools: ["C-SAM", "X-ray", "SEM/EDS", "JMP", "Excel", "8D"],
          aiCompetency: { level: "보조 역량", summary: "이미지 분류보다 시험 조건, fail mechanism, 재발 방지 논리를 정확히 쓰는 역량이 우선입니다.", keywords: ["FA", "신뢰성"], diagnostics: [["시험 조건", "HAST, HTOL, TC 목적 차이를 설명할 수 있다."], ["원인 가설", "분석 이미지와 공정 조건을 연결할 수 있다."]] },
          coreCompetencies: ["신뢰성 시험 조건과 fail mode를 연결하는 역량", "분석 장비 결과를 원인 가설로 정리하는 역량", "재발 방지 개선안을 공정·소재·설계로 나누는 역량"],
          responsibilities: ["신뢰성 시험 결과 분석", "FA 분석 결과 해석", "불량 원인 가설과 개선안 작성", "고객 품질 이슈 대응 자료 정리"],
          requirements: ["반도체 패키지·소재 기초", "신뢰성 시험과 분석 장비 용어 이해", "8D/FA 리포트 작성 역량"],
          preferred: ["C-SAM, X-ray, SEM/EDS, cross-section 경험", "고객 품질 대응 또는 신뢰성 평가 경험"]
        }
      ],
      "manufacturing-dx": [
        {
          id: "mes-scada-integration-engineer",
          title: "MES·SCADA 연동 엔지니어",
          postingKeywords: ["MES", "SCADA", "OPC UA", "PLC", "인터페이스"],
          industries: ["manufacturing", "semiconductor", "battery", "all"],
          focus: "설비 PLC, SCADA, MES 간 데이터 흐름과 인터페이스를 정의해 생산 이력과 설비 상태를 연결하는 직무",
          coreWork: "설비 신호와 생산 정보를 lot, recipe, time, alarm 기준으로 연결해 추적성과 자동화를 높입니다.",
          coreTerms: ["MES", "SCADA", "PLC", "OPC UA", "tag", "recipe", "lot traceability", "alarm", "interface", "ISA-95"],
          tools: ["MES", "SCADA", "PLC", "OPC UA", "SQL", "Excel"],
          aiCompetency: { level: "보조 역량", summary: "연동 직무는 AI보다 데이터 정의, 인터페이스, 추적성, 알람 기준이 우선입니다.", keywords: ["데이터 정의", "인터페이스"], diagnostics: [["데이터 흐름", "PLC tag와 MES lot 정보를 연결할 수 있다."], ["추적성", "생산 이력과 품질 결과를 한 흐름으로 설명할 수 있다."]] },
          coreCompetencies: ["설비 신호와 생산 데이터를 연결하는 역량", "인터페이스 오류를 데이터·통신·운영 조건으로 나누는 역량", "추적성과 알람 기준을 문서화하는 역량"],
          responsibilities: ["MES·SCADA 인터페이스 정의", "PLC tag와 생산 데이터 매핑", "알람·상태 전환 기준 정리", "연동 오류 원인 분석"],
          requirements: ["제조 공정 흐름, PLC/SCADA/MES 기초", "SQL 또는 데이터 구조 이해", "인터페이스 정의서 작성"],
          preferred: ["OPC UA, ISA-95, MES 구축 또는 설비 자동화 경험", "반도체·배터리·제조 현장 데이터 경험"]
        },
        {
          id: "industrial-data-engineer",
          title: "제조 데이터 엔지니어",
          postingKeywords: ["제조데이터", "SQL", "Python", "OEE", "대시보드"],
          industries: ["manufacturing", "ai", "semiconductor", "battery", "all"],
          focus: "공정·설비·검사 데이터를 정리해 OEE, 수율, 불량, 정지 원인을 분석 가능한 데이터셋과 대시보드로 만드는 직무",
          coreWork: "현장 데이터를 수집·정제·시각화해 개선 우선순위와 재현 가능한 원인 가설을 제시합니다.",
          coreTerms: ["industrial data", "SQL", "Python", "pandas", "OEE", "yield", "downtime", "dashboard", "data pipeline"],
          tools: ["SQL", "Python", "Power BI", "Tableau", "MES", "SCADA"],
          aiCompetency: { level: "핵심 역량", summary: "제조 데이터 엔지니어는 전처리, 지표 정의, 이상 탐지, 대시보드가 직무 중심입니다.", keywords: ["SQL", "Python", "대시보드"], diagnostics: [["전처리", "결측·이상치·시간 동기화를 처리할 수 있다."], ["지표", "OEE와 수율 지표를 데이터 컬럼으로 정의할 수 있다."]] },
          coreCompetencies: ["현장 데이터를 분석 가능한 테이블로 만드는 역량", "OEE·수율·불량 지표를 정의하는 역량", "대시보드 결과를 개선 행동으로 연결하는 역량"],
          responsibilities: ["공정·설비 데이터 수집과 정제", "OEE·불량·정지 원인 분석", "대시보드 구성", "개선 과제 우선순위 제안"],
          requirements: ["SQL/Python 데이터 처리", "제조 공정과 품질 지표 이해", "시각화와 해석 리포트 작성"],
          preferred: ["MES/SCADA 데이터, Power BI, 이상탐지, 데이터 파이프라인 경험", "제조 AI 또는 스마트팩토리 프로젝트 경험"]
        },
        {
          id: "smart-factory-vision-engineer",
          title: "스마트팩토리 비전검사 엔지니어",
          postingKeywords: ["비전검사", "OpenCV", "YOLO", "불량검출", "검사자동화"],
          industries: ["manufacturing", "robotics", "ai", "semiconductor", "battery", "all"],
          focus: "카메라, 조명, 라벨 기준, AI 모델, 검사 지그를 연결해 자동 검사 정확도와 현장 적용성을 높이는 직무",
          coreWork: "불량 정의와 이미지 조건을 관리하고 오탐·미탐을 줄이는 검사 자동화 기준을 만듭니다.",
          coreTerms: ["machine vision", "lighting", "camera", "OpenCV", "YOLO", "false positive", "false negative", "annotation", "inspection jig"],
          tools: ["OpenCV", "Python", "YOLO", "NVIDIA Jetson", "Power BI", "카메라/조명"],
          aiCompetency: { level: "핵심 역량", summary: "비전검사는 AI 모델뿐 아니라 조명, 라벨 기준, 오탐·미탐 판정 기준이 핵심입니다.", keywords: ["비전검사", "오탐·미탐"], diagnostics: [["라벨 기준", "불량 판정 기준을 이미지 라벨로 정의할 수 있다."], ["현장 적용", "조명·카메라 조건이 검사 결과에 미치는 영향을 설명할 수 있다."]] },
          coreCompetencies: ["불량 정의를 라벨 기준으로 바꾸는 역량", "오탐·미탐을 데이터와 현장 조건으로 분석하는 역량", "검사 자동화 결과를 품질 개선 기준으로 연결하는 역량"],
          responsibilities: ["비전검사 조건과 라벨 기준 정의", "이미지 데이터 수집·전처리", "모델 평가와 오탐·미탐 분석", "검사 자동화 현장 적용 리스크 검토"],
          requirements: ["Python/OpenCV 또는 비전 기초", "품질 불량 유형과 검사 조건 이해", "모델 평가 지표와 현장 검증 문서화"],
          preferred: ["YOLO, Jetson, 카메라·조명 셋업, 자동화 설비 경험", "제조·반도체·배터리 검사 데이터 경험"]
        }
      ],
      "chemical-sustainability": [
        {
          id: "hydrogen-process-engineer",
          title: "수소 공정 엔지니어",
          postingKeywords: ["수소", "전해조", "개질", "압축", "안전"],
          industries: ["energy", "chemical", "environment", "all"],
          focus: "수전해, 개질, 정제, 압축, 저장 공정을 물질수지와 안전 조건으로 검토하는 직무",
          coreWork: "수소 생산·정제·저장 조건을 효율, 순도, 안전, 설비 제약 기준으로 비교하고 공정 리스크를 줄입니다.",
          coreTerms: ["hydrogen", "electrolysis", "reformer", "purification", "compression", "storage", "explosion limit", "PSA", "safety"],
          tools: ["Aspen/HYSYS", "Excel", "MATLAB/Python", "PFD", "HAZOP"],
          aiCompetency: { level: "보조 역량", summary: "수소 공정은 AI보다 공정 흐름, 효율, 순도, 안전 조건을 계산하고 설명하는 역량이 우선입니다.", keywords: ["물질수지", "안전"], diagnostics: [["공정 흐름", "생산·정제·압축·저장 흐름을 설명할 수 있다."], ["안전", "폭발한계와 누출 대응 조건을 체크리스트로 만들 수 있다."]] },
          coreCompetencies: ["수소 공정 물질수지와 효율을 계산하는 역량", "정제·압축·저장 리스크를 안전 기준으로 정리하는 역량", "공정 조건 변경이 순도와 에너지 사용에 미치는 영향을 설명하는 역량"],
          responsibilities: ["수소 생산·정제 공정 검토", "효율·순도·압력 조건 분석", "안전·위험성 평가", "공정 개선 리포트 작성"],
          requirements: ["물질수지, 열역학, 반응·분리 기초", "PFD와 HAZOP 이해", "Excel/MATLAB/Python 계산 역량"],
          preferred: ["수전해, PSA, 개질, 고압가스 안전 이해", "Aspen/HYSYS 공정모사 경험"]
        },
        {
          id: "ccus-process-engineer",
          title: "CCUS 공정 엔지니어",
          postingKeywords: ["CCUS", "CO2 포집", "흡수", "분리막", "공정모사"],
          industries: ["chemical", "energy", "environment", "all"],
          focus: "CO2 포집, 흡수·재생, 압축, 저장·활용 공정을 에너지 사용량과 분리 성능 기준으로 검토하는 직무",
          coreWork: "배가스 조성, 흡수제, 재생 에너지, 압축 조건을 연결해 CO2 포집 공정의 성능과 비용 리스크를 평가합니다.",
          coreTerms: ["CCUS", "carbon capture", "amine absorption", "regeneration", "membrane", "CO2 purity", "energy penalty", "compression"],
          tools: ["Aspen Plus", "HYSYS", "Excel", "MATLAB/Python", "PFD"],
          aiCompetency: { level: "보조 역량", summary: "CCUS는 공정모사와 에너지·분리 성능 비교가 우선이고, 데이터 분석은 조건 비교에 보조적으로 쓰입니다.", keywords: ["공정모사", "조건 비교"], diagnostics: [["분리 성능", "CO2 회수율과 순도를 지표로 설명할 수 있다."], ["에너지", "재생 에너지와 압축 조건이 비용에 미치는 영향을 말할 수 있다."]] },
          coreCompetencies: ["CO2 포집 공정 흐름을 PFD로 정리하는 역량", "분리 성능과 에너지 사용량을 비교하는 역량", "공정 조건 변경 리스크를 문서화하는 역량"],
          responsibilities: ["CO2 포집 공정 조건 검토", "흡수·재생·압축 조건 비교", "공정모사 결과 정리", "경제성·환경성 리스크 메모 작성"],
          requirements: ["분리공정, 열역학, 물질수지 기초", "Aspen/HYSYS 또는 계산 도구 활용", "공정 성능 지표 해석"],
          preferred: ["CCUS, 흡수제, 분리막, 공정모사 경험", "에너지·환경 프로젝트 이해"]
        },
        {
          id: "water-treatment-process-engineer",
          title: "수처리·환경공정 엔지니어",
          postingKeywords: ["수처리", "폐수", "막분리", "TOC", "환경규제"],
          industries: ["environment", "chemical", "semiconductor", "battery", "all"],
          focus: "폐수·초순수·막분리·처리 약품·환경 규제 기준을 연결해 수질 안정성과 설비 운영을 관리하는 직무",
          coreWork: "수질 지표와 처리 공정 조건을 분석해 배출 기준, 설비 이상, 약품 사용량, 재이용 가능성을 판단합니다.",
          coreTerms: ["wastewater", "UPW", "membrane", "RO", "TOC", "COD", "BOD", "T-N", "T-P", "sludge", "discharge limit"],
          tools: ["Excel", "LIMS", "SCADA", "수질분석", "P&ID", "HAZOP"],
          aiCompetency: { level: "보조 역량", summary: "수처리는 규제 기준, 수질 지표, 설비 조건 해석이 중심이고 데이터 분석은 이상 추세 확인에 도움이 됩니다.", keywords: ["수질 데이터", "이상 추세"], diagnostics: [["수질 지표", "COD, TOC, pH, T-N, T-P 의미를 설명할 수 있다."], ["공정 조건", "막오염과 약품 조건을 운영 리스크로 정리할 수 있다."]] },
          coreCompetencies: ["수질 지표를 처리 공정과 연결하는 역량", "막분리·약품·슬러지 조건을 운영 리스크로 보는 역량", "규제 기준과 현장 데이터를 비교하는 역량"],
          responsibilities: ["폐수·초순수 공정 운영 조건 검토", "수질 분석 결과와 알람 데이터 해석", "환경 규제 대응 자료 정리", "설비 이상과 개선안 문서화"],
          requirements: ["환경공학 또는 화학공정 기초", "수질 지표와 처리 공정 이해", "운영 데이터와 규제 기준 비교"],
          preferred: ["반도체 UPW/폐수, 막분리, LIMS/SCADA 경험", "환경기사·수질 분석 이해"]
        },
        {
          id: "polymer-film-materials-engineer",
          title: "고분자·필름 소재 엔지니어",
          postingKeywords: ["고분자", "필름", "코팅", "물성", "Scale-up"],
          industries: ["chemical", "battery", "electronics", "all"],
          focus: "고분자 조성, 코팅·건조 조건, 필름 물성, 분석 데이터를 연결해 소재 성능과 양산성을 검토하는 직무",
          coreWork: "조성·공정 조건과 인장, 열, 광학, 접착, 투습 같은 물성 지표를 연결해 제품 요구사항을 만족시키는 조건을 찾습니다.",
          coreTerms: ["polymer", "film", "coating", "drying", "rheology", "tensile strength", "adhesion", "WVTR", "DSC", "TGA", "FTIR"],
          tools: ["DSC", "TGA", "FTIR", "Rheometer", "Excel", "JMP", "Python"],
          aiCompetency: { level: "중요", summary: "소재 실험 데이터가 많아 DOE, 물성 예측, 조성-성능 상관 분석 역량이 도움이 됩니다.", keywords: ["DOE", "물성 데이터"], diagnostics: [["물성", "조성·공정 조건과 물성 지표를 연결할 수 있다."], ["Scale-up", "lab 조건과 양산 코팅 조건 차이를 설명할 수 있다."]] },
          coreCompetencies: ["고분자 조성과 공정 조건을 물성 지표로 연결하는 역량", "분석 장비 결과를 소재 성능으로 해석하는 역량", "lab-to-pilot scale-up 리스크를 정리하는 역량"],
          responsibilities: ["고분자·필름 조성 및 공정 조건 검토", "물성·분석 결과 정리", "코팅·건조·scale-up 이슈 분석", "후보 소재 성능 비교표 작성"],
          requirements: ["고분자, 물성, 열분석 기초", "실험 조건과 분석 데이터 정리", "DOE와 통계 기초"],
          preferred: ["필름·코팅·접착 소재, DSC/TGA/FTIR/rheology 경험", "배터리·디스플레이·전자소재 이해"]
        },
        {
          id: "battery-recycling-process-engineer",
          title: "배터리 리사이클 공정 엔지니어",
          postingKeywords: ["배터리 리사이클", "습식제련", "침출", "용매추출", "회수율"],
          industries: ["battery", "chemical", "environment", "all"],
          focus: "폐배터리 전처리, 침출, 용매추출, 정제, 금속 회수율을 관리해 리사이클 공정성과 안전성을 검토하는 직무",
          coreWork: "원료 변동성과 공정 조건을 회수율, 순도, 폐수·안전 리스크와 연결해 재활용 공정 개선안을 만듭니다.",
          coreTerms: ["battery recycling", "black mass", "leaching", "solvent extraction", "precipitation", "recovery rate", "purity", "wastewater"],
          tools: ["Excel", "MATLAB/Python", "ICP", "pH meter", "LIMS", "HAZOP"],
          aiCompetency: { level: "보조 역량", summary: "리사이클은 원료 변동, 회수율, 순도, 안전 조건을 공정 데이터로 설명하는 역량이 핵심입니다.", keywords: ["회수율", "공정 데이터"], diagnostics: [["회수율", "금속 회수율과 순도를 계산할 수 있다."], ["원료 변동", "black mass 조성 변화가 공정 조건에 미치는 영향을 말할 수 있다."]] },
          coreCompetencies: ["침출·분리·정제 흐름을 물질수지로 설명하는 역량", "회수율·순도·폐수 리스크를 동시에 비교하는 역량", "원료 변동성을 조건 변경 검토표로 정리하는 역량"],
          responsibilities: ["배터리 리사이클 공정 조건 관리", "회수율·순도 데이터 분석", "폐수·안전 리스크 검토", "조건 변경과 개선 실험 문서화"],
          requirements: ["분리공정, 전기화학, 물질수지 기초", "실험 데이터와 수율 계산", "공정안전·환경 기준 이해"],
          preferred: ["습식제련, 용매추출, ICP 분석, 폐배터리 재활용 경험", "DOE/Python 데이터 처리 경험"]
        }
      ]
    };

    Object.entries(expansionRoles).forEach(([trackId, roles]) => {
      jobRoles[trackId] = mergeRolesById(jobRoles[trackId] || [], roles);
    });

    Object.assign(roleDiagnostics, {
      "data-center-electrical-infra-engineer": [["단선도", "전력 계통과 이중화 경로를 읽을 수 있다."], ["UPS", "UPS와 발전기 절체 시나리오를 설명할 수 있다."], ["전력품질", "전압강하, 고조파, 접지 리스크를 말할 수 있다."], ["알람", "전력 알람을 원인 후보와 조치 순서로 나눌 수 있다."], ["정비", "예방정비 항목과 장애 대응 체크리스트를 만들 수 있다."]],
      "data-center-cooling-engineer": [["열부하", "IT 부하를 냉각 용량으로 환산할 수 있다."], ["Airflow", "hot aisle/cold aisle과 냉각 불균형을 설명할 수 있다."], ["PUE", "PUE 의미와 개선 방향을 말할 수 있다."], ["온도로그", "온도 trend로 과열 원인을 좁힐 수 있다."], ["공조", "CRAC/CRAH/chiller 역할을 구분할 수 있다."]],
      "dcim-bms-operations-engineer": [["데이터 구조", "BMS/DCIM 로그를 설비·시간·알람 등급으로 정리할 수 있다."], ["반복 알람", "반복 알람과 장애 영향도를 우선순위화할 수 있다."], ["대시보드", "운영자가 바로 볼 지표를 설계할 수 있다."], ["예방정비", "알람 trend를 예방정비 후보로 바꿀 수 있다."], ["조치 기준", "알람별 확인 항목과 담당 부서를 정리할 수 있다."]],
      "advanced-packaging-engineer": [["패키지 구조", "die, bump, substrate, interposer, molding 역할을 설명할 수 있다."], ["공정조건", "온도, 압력, 접합, underfill 조건을 품질 지표와 연결할 수 있다."], ["불량모드", "warpage, delamination, crack 원인을 분류할 수 있다."], ["신뢰성", "열·습도 스트레스가 패키지에 미치는 영향을 말할 수 있다."], ["수율", "수율 데이터를 공정 조건 변경 후보로 바꿀 수 있다."]],
      "semiconductor-test-engineer": [["Test Flow", "Probe, final test, burn-in 목적을 구분할 수 있다."], ["ATE", "ATE와 test program의 역할을 설명할 수 있다."], ["Bin 분석", "fail bin Pareto로 원인 후보를 좁힐 수 있다."], ["Coverage", "test coverage와 guardband 의미를 말할 수 있다."], ["데이터", "lot, wafer, test item 기준으로 데이터를 묶을 수 있다."]],
      "packaging-reliability-fa-engineer": [["시험", "HAST, HTOL, thermal cycling 목적 차이를 설명할 수 있다."], ["분석", "C-SAM, X-ray, SEM 결과를 fail mode와 연결할 수 있다."], ["원인 가설", "분석 결과를 공정·소재·설계 원인으로 나눌 수 있다."], ["8D", "고객 품질 이슈를 재발 방지까지 정리할 수 있다."], ["판정", "시험 조건과 판정 기준을 문서화할 수 있다."]],
      "mes-scada-integration-engineer": [["PLC Tag", "설비 tag와 MES 데이터를 매핑할 수 있다."], ["OPC UA", "OPC UA와 SCADA/MES 연동 목적을 설명할 수 있다."], ["추적성", "lot 이력과 품질 결과를 연결할 수 있다."], ["알람", "상태 전환과 알람 기준을 정의할 수 있다."], ["인터페이스", "연동 오류를 데이터·통신·운영 원인으로 나눌 수 있다."]],
      "industrial-data-engineer": [["SQL", "공정 데이터를 join 가능한 키로 정리할 수 있다."], ["전처리", "결측·이상치·시간 동기화를 처리할 수 있다."], ["OEE", "OEE 손실을 가동률·성능·품질로 분해할 수 있다."], ["대시보드", "지표와 해석 문장을 함께 구성할 수 있다."], ["개선", "분석 결과를 개선 과제 우선순위로 바꿀 수 있다."]],
      "smart-factory-vision-engineer": [["라벨", "불량 판정 기준을 라벨 규칙으로 만들 수 있다."], ["조명", "조명·카메라 조건이 검사 결과에 미치는 영향을 설명할 수 있다."], ["모델평가", "오탐·미탐을 precision/recall과 현장 리스크로 해석할 수 있다."], ["현장검증", "검사 속도와 설비 연동 조건을 고려할 수 있다."], ["개선", "불량 유형별 데이터 보강 계획을 만들 수 있다."]],
      "hydrogen-process-engineer": [["물질수지", "수소 생산·정제 흐름의 물질수지를 세울 수 있다."], ["안전", "폭발한계와 누출 대응 조건을 설명할 수 있다."], ["정제", "PSA, 압축, 저장 조건을 구분할 수 있다."], ["효율", "에너지 사용량과 순도를 비교할 수 있다."], ["공정도", "PFD와 주요 계측 지점을 표시할 수 있다."]],
      "ccus-process-engineer": [["포집", "CO2 포집률과 순도를 지표로 설명할 수 있다."], ["흡수·재생", "흡수제와 재생 에너지 조건을 말할 수 있다."], ["압축", "압축 조건이 비용과 안전에 미치는 영향을 설명할 수 있다."], ["공정모사", "공정모사 결과를 조건 비교표로 정리할 수 있다."], ["환경성", "포집 공정의 환경·경제성 trade-off를 말할 수 있다."]],
      "water-treatment-process-engineer": [["수질", "COD, TOC, pH, T-N, T-P 의미를 설명할 수 있다."], ["막분리", "RO와 막오염 리스크를 설명할 수 있다."], ["규제", "배출 기준과 운영 데이터를 비교할 수 있다."], ["설비", "펌프, 탱크, 약품 주입, 슬러지 흐름을 말할 수 있다."], ["이상 대응", "수질 이상 trend와 확인 항목을 정리할 수 있다."]],
      "polymer-film-materials-engineer": [["조성", "조성과 공정 조건을 물성 지표와 연결할 수 있다."], ["분석", "DSC, TGA, FTIR 결과 의미를 설명할 수 있다."], ["코팅", "점도, 건조, 두께 균일도 영향을 말할 수 있다."], ["Scale-up", "lab 조건과 양산 조건 차이를 정리할 수 있다."], ["DOE", "조성·조건 DOE 결과를 비교표로 만들 수 있다."]],
      "battery-recycling-process-engineer": [["침출", "침출 조건과 금속 회수율을 연결할 수 있다."], ["분리", "용매추출·침전 목적을 설명할 수 있다."], ["원료 변동", "black mass 조성 변화가 공정 조건에 미치는 영향을 말할 수 있다."], ["환경", "폐수와 안전 리스크를 검토할 수 있다."], ["수율", "회수율과 순도 계산표를 만들 수 있다."]]
    });

    const priorityResources = [
      {
        id: "kdcc-data-center-operation-study",
        title: "데이터센터 구축·운영 제도 연구 핵심 섹션",
        provider: "한국데이터센터연합회(KDCC)",
        type: "정책연구 PDF 핵심섹션",
        language: "한국어",
        difficulty: "입문",
        estimatedMinutes: 90,
        practiceMinutes: 60,
        sequenceLevel: 2,
        starterPack: true,
        core: true,
        tracks: ["data-center-infra"],
        skills: ["데이터센터", "전력", "냉각", "운영", "PUE", "시설기준"],
        prerequisites: ["전기·기계 설비 기초"],
        reason: "한국어 자료로 데이터센터 구성요소, 전력·냉각 인프라, 에너지 효율, 시설 기준을 먼저 정리할 수 있는 공공·협회 기반 자료입니다.",
        expectedOutput: "데이터센터 전력·냉각 구성요소와 운영 이슈 요약표",
        recommendedSections: ["제1장 제2절 데이터센터산업의 정의 및 범위", "제2장 국내 동향 조사 중 기술동향과 현장이슈", "표 2-24 데이터센터 에너지 효율 관련 국내 기술개발 사례", "표 2-28 데이터센터 건축물 용도분류에 따른 시설물 구비 규정", "제3장 표 3-6 인프라 운영관리 주요 기술개발 내용과 표 3-7 운영 가이드라인"],
        engagement: { checkedAt: "2026-06-29", nextReviewAt: "2026-07-29" },
        qualityStatus: "reviewed",
        url: "https://kdcc.or.kr/kdcc/bbsNew_download.do?bbs_data=aWR4PTkzJnN0YXJ0UGFnZT00NSZsaXN0Tm89MjcmdGFibGU9Y3NfYmJzX2RhdGFfbmV3JmNvZGU9c3ViMDRkJnNlYXJjaF9pdGVtPSZzZWFyY2hfb3JkZXI9JnVybD1zdWIwNGQma2V5dmFsdWU9c3ViMDQmYmJzX21hbG5hbWU9%7C%7C&download=1"
      },
      {
        id: "smartspace-data-center-electrical-guide",
        title: "데이터센터 전기설비 구성 및 설계 가이드",
        provider: "Smartspace",
        type: "전문 가이드/직무 읽기",
        language: "한국어",
        difficulty: "기초실습",
        estimatedMinutes: 60,
        practiceMinutes: 90,
        sequenceLevel: 2,
        starterPack: true,
        core: true,
        tracks: ["data-center-infra"],
        skills: ["데이터센터", "UPS", "수배전", "비상발전기", "접지", "전력 모니터링"],
        prerequisites: ["전기설비 기초"],
        reason: "데이터센터 전기설비를 수전, 변전, UPS, 배전, 비상발전기, 접지, 전력 모니터링 흐름으로 정리해 전력 단선도와 장애 대응 체크리스트로 연결하기 좋습니다.",
        expectedOutput: "데이터센터 수전-UPS-배전-발전기 전력 경로 구성도",
        recommendedSections: ["수전 설비와 이중 수전", "변전 설비와 고압·저압 배전반", "UPS와 배터리 시스템", "비상발전기와 ATS 연동", "PDU/RPP와 A/B Feed", "접지와 전력 모니터링"],
        engagement: { checkedAt: "2026-06-30", nextReviewAt: "2026-07-30" },
        qualityStatus: "reviewed",
        url: "https://smartspace.co.kr/datacenter-electrical-design-guide/"
      },
      {
        id: "keea-electrical-facility-operation-training",
        title: "자가용전기설비 운전 및 유지관리 핵심 훈련",
        provider: "한국전기기술인협회",
        type: "협회 훈련과정 핵심섹션",
        language: "한국어",
        difficulty: "기초실습",
        estimatedMinutes: 90,
        practiceMinutes: 90,
        sequenceLevel: 3,
        starterPack: true,
        core: true,
        tracks: ["data-center-infra"],
        skills: ["수배전", "표준결선도", "비상발전기", "정전복전", "고장예방"],
        prerequisites: ["전기설비 기초"],
        reason: "데이터센터 전력 직무에서 필요한 수배전 표준결선도, 주요 기기 조작, 정전·복전, 고장예방 관점을 실제 전기설비 운전 훈련 목표와 연결할 수 있습니다.",
        expectedOutput: "수배전 표준결선도 점검 항목과 정전·복전 대응 순서표",
        recommendedSections: ["자가용전기설비 운전 및 유지관리 훈련목표", "수배전설비 표준결선도 및 주요 기기별 특성", "특고압기기 점검, 차단기 및 개폐기 조작 실습", "정전 및 복전 실습", "수배전설비 안전사고 및 고장예방 기술"],
        engagement: { checkedAt: "2026-06-30", nextReviewAt: "2026-07-30" },
        qualityStatus: "reviewed",
        url: "https://www.keea.or.kr/champ/exercise/planIntroPage.do"
      },
      {
        id: "mathworks-simscape-fluids-examples",
        title: "Simscape Fluids 예제",
        provider: "MathWorks",
        type: "공식문서/예제",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 150,
        practiceMinutes: 180,
        sequenceLevel: 4,
        tracks: ["data-center-infra", "mechanical-cae", "chemical-sustainability"],
        skills: ["유체", "냉각", "펌프", "열관리", "물리 모델링"],
        prerequisites: ["Simulink/Simscape 기초"],
        reason: "냉각수, 펌프, 유량, 압력 조건을 모델로 확인해 데이터센터 냉각과 화학공정 유체 시스템 산출물에 연결할 수 있습니다.",
        expectedOutput: "냉각 또는 유체 회로 모델과 조건 변화 비교표",
        qualityStatus: "reviewed",
        url: "https://www.mathworks.com/help/fluids/examples.html"
      },
      {
        id: "semiengineering-advanced-packaging",
        title: "Semiconductor Engineering Advanced Packaging",
        provider: "Semiconductor Engineering",
        type: "전문 기사/직무 읽기",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 120,
        practiceMinutes: 90,
        sequenceLevel: 3,
        tracks: ["semiconductor-packaging-test", "semiconductor-equipment"],
        skills: ["Advanced Packaging", "HBM", "패키징", "신뢰성"],
        prerequisites: ["반도체 공정 기초"],
        reason: "HBM, chiplet, substrate, bonding 등 후공정 공고에 반복되는 용어를 직무 맥락으로 정리하기 좋습니다.",
        expectedOutput: "패키지 구조 용어표와 공정·불량 연결표",
        qualityStatus: "reviewed",
        url: "https://semiengineering.com/knowledge_centers/packaging/advanced-packaging/"
      },
      {
        id: "semiengineering-semiconductor-test",
        title: "Semiconductor Engineering Test",
        provider: "Semiconductor Engineering",
        type: "전문 기사/직무 읽기",
        language: "영어",
        difficulty: "적용",
        estimatedMinutes: 120,
        practiceMinutes: 90,
        sequenceLevel: 3,
        tracks: ["semiconductor-packaging-test", "semiconductor-equipment"],
        skills: ["ATE", "Probe Test", "Final Test", "Yield", "Reliability"],
        prerequisites: ["반도체 소자·공정 기초"],
        reason: "테스트, binning, coverage, yield, 신뢰성 이슈를 직무 상세와 연결해 test 엔지니어 판단 기준을 잡는 데 적합합니다.",
        expectedOutput: "Probe/Final Test 흐름도와 fail bin Pareto 예시",
        qualityStatus: "reviewed",
        url: "https://semiengineering.com/knowledge_centers/test/"
      },
      {
        id: "opc-foundation-opcua-overview",
        title: "OPC UA 개요와 산업 데이터 연결",
        provider: "OPC Foundation",
        type: "공식문서/개념",
        language: "영어",
        difficulty: "기초실습",
        estimatedMinutes: 90,
        practiceMinutes: 90,
        sequenceLevel: 3,
        tracks: ["manufacturing-dx", "robotics-automation", "energy-ess"],
        skills: ["OPC UA", "SCADA", "MES", "설비데이터", "인터페이스"],
        prerequisites: ["제조 공정과 PLC 기초"],
        reason: "스마트팩토리 공고에서 반복되는 OPC UA, 설비 데이터, MES/SCADA 연동을 개념과 산출물로 연결할 수 있습니다.",
        expectedOutput: "PLC-SCADA-MES 데이터 흐름도와 tag 정의 예시",
        qualityStatus: "reviewed",
        url: "https://opcfoundation.org/about/opc-technologies/opc-ua/"
      },
      {
        id: "aiche-ccps-process-safety-beacon",
        title: "CCPS Process Safety Beacon",
        provider: "AIChE CCPS",
        type: "전문 안전 사례",
        language: "영어",
        difficulty: "기초실습",
        estimatedMinutes: 90,
        practiceMinutes: 90,
        sequenceLevel: 3,
        tracks: ["chemical-process", "chemical-sustainability"],
        skills: ["공정안전", "사고사례", "HAZOP", "PSM"],
        prerequisites: ["공정안전 기초"],
        reason: "화학공정·환경안전 직무에서 중요한 사고 시나리오, 예방 대책, HAZOP 관점을 짧은 사례로 익힐 수 있습니다.",
        expectedOutput: "사고 사례 기반 HAZOP 체크리스트",
        qualityStatus: "reviewed",
        url: "https://www.aiche.org/ccps/resources/process-safety-beacon"
      },
      {
        id: "doe-hydrogen-production-delivery",
        title: "Hydrogen Production and Delivery",
        provider: "U.S. Department of Energy",
        type: "공식 자료/개념",
        language: "영어",
        difficulty: "입문",
        estimatedMinutes: 90,
        practiceMinutes: 90,
        sequenceLevel: 2,
        tracks: ["chemical-sustainability", "energy-ess"],
        skills: ["수소", "생산", "정제", "저장", "안전"],
        prerequisites: ["물질수지와 열역학 기초"],
        reason: "수소 공정 직무의 생산·저장·운송 흐름과 안전 이슈를 공고 키워드와 연결해 정리하기 좋습니다.",
        expectedOutput: "수소 생산·정제·저장 공정 흐름도",
        qualityStatus: "reviewed",
        url: "https://www.energy.gov/eere/fuelcells/hydrogen-production"
      },
      {
        id: "doe-carbon-capture-overview",
        title: "Carbon Capture 개요",
        provider: "U.S. Department of Energy",
        type: "공식 자료/개념",
        language: "영어",
        difficulty: "입문",
        estimatedMinutes: 90,
        practiceMinutes: 90,
        sequenceLevel: 2,
        tracks: ["chemical-sustainability", "energy-ess"],
        skills: ["CCUS", "CO2 포집", "흡수", "분리", "공정성능"],
        prerequisites: ["분리공정 기초"],
        reason: "CCUS 공고에서 반복되는 포집, 압축, 저장, 활용 개념을 공정 흐름과 성능 지표로 정리할 수 있습니다.",
        expectedOutput: "CCUS 공정 흐름도와 성능 지표 표",
        qualityStatus: "reviewed",
        url: "https://www.energy.gov/fecm/office-carbon-management"
      },
      {
        id: "learncheme-reactor-design",
        title: "LearnChemE Kinetics and Reactor Design",
        provider: "LearnChemE",
        type: "공개강의/개념 실습",
        language: "영어",
        difficulty: "기초실습",
        estimatedMinutes: 150,
        practiceMinutes: 120,
        sequenceLevel: 3,
        tracks: ["chemical-process", "chemical-sustainability"],
        skills: ["반응공학", "반응기", "전환율", "선택도", "Scale-up"],
        prerequisites: ["물질수지와 미분방정식 기초"],
        reason: "수소, 소재, 리사이클, 일반 화학공정에서 반복되는 반응기 조건과 전환율 계산을 작은 산출물로 만들기 좋습니다.",
        expectedOutput: "반응 조건별 전환율·수율 계산표",
        qualityStatus: "reviewed",
        url: "https://learncheme.com/screencasts/kinetics-reactor-design/"
      }
    ];

    const existingResourceIds = new Set(resources.map((resource) => resource.id));
    resources.push(...priorityResources.filter((resource) => !existingResourceIds.has(resource.id)).map(normalizeResource));

    [
      "ansys-innovation-courses",
      "simscape-onramp",
      "mathworks-simscape-electrical",
      "mathworks-simscape-examples",
      "mathworks-predictive-maintenance",
      "ni-learn-test-measurement"
    ].forEach((resourceId) => {
      const resource = resources.find((item) => item.id === resourceId);
      if (resource) resource.tracks = mergeValues(resource.tracks, ["data-center-infra"]);
    });
    [
      "letuin-spotfire-defect-analysis",
      "letuin-semiconductor-process-data-kdt",
      "semiengineering-failure-analysis",
      "statistics-onramp",
      "machine-learning-onramp",
      "freecodecamp-python-data",
      "google-ml-crash-course",
      "nist-control-charts",
      "nist-process-capability"
    ].forEach((resourceId) => {
      const resource = resources.find((item) => item.id === resourceId);
      if (resource) resource.tracks = mergeValues(resource.tracks, ["semiconductor-packaging-test"]);
    });
    [
      "mathworks-predictive-maintenance",
      "statistics-onramp",
      "machine-learning-onramp",
      "nist-control-charts",
      "nist-process-capability",
      "boostcourse-data-ai-basic",
      "freecodecamp-python-data",
      "google-ml-crash-course",
      "nvidia-jetson-ai-course",
      "comento-plc-control-practice"
    ].forEach((resourceId) => {
      const resource = resources.find((item) => item.id === resourceId);
      if (resource) resource.tracks = mergeValues(resource.tracks, ["manufacturing-dx"]);
    });
    [
      "learncheme-chemical-process",
      "learncheme-material-balances",
      "learncheme-separations",
      "mit-chemical-engineering",
      "nptel-chemical-engineering",
      "kosha-psm",
      "youtube-nptel-hazop",
      "coursera-chemical-engineering"
    ].forEach((resourceId) => {
      const resource = resources.find((item) => item.id === resourceId);
      if (resource) resource.tracks = mergeValues(resource.tracks, ["chemical-sustainability"]);
    });

    Object.assign(curriculumTasks, {
      "data-center-infra": [
        { title: "전력·냉각 구성도 정리", objective: "데이터센터를 UPS·수배전·발전기·냉각·BMS/DCIM으로 나눠 직무 범위를 판단합니다.", time: "2시간", deliverable: "전력·냉각 구성도", keywords: ["데이터센터", "UPS", "HVAC"], finalCheck: "전력 경로와 냉각 경로가 분리돼 있는지" },
        { title: "운영 로그와 알람 분석", objective: "전력, 온도, 습도, 알람 로그를 시간 기준으로 정리해 반복 장애 후보를 찾습니다.", time: "3시간", deliverable: "BMS/DCIM 알람 원인분석표", keywords: ["BMS", "DCIM", "알람"], finalCheck: "알람별 확인 항목과 조치 순서가 있는지" },
        { title: "PUE·장애 대응 리포트", objective: "에너지 효율과 장애 대응 기준을 지원 회사 공고 키워드와 연결합니다.", time: "3시간", deliverable: "PUE 개선·장애 대응 리포트", keywords: ["PUE", "예방정비", "장애대응"], finalCheck: "가용성, 안전, 에너지 기준이 함께 적혔는지" }
      ],
      "semiconductor-packaging-test": [
        { title: "패키지 구조·공정 흐름 정리", objective: "HBM, bump, TSV, substrate, molding 흐름을 구조와 불량 모드로 연결합니다.", time: "2시간", deliverable: "패키지 구조·불량 연결표", keywords: ["HBM", "Advanced Packaging", "Bump"], finalCheck: "구조 용어와 불량 모드가 연결됐는지" },
        { title: "Test bin·수율 분석", objective: "Probe/Final Test 결과를 bin, lot, wafer map 기준으로 정리합니다.", time: "3시간", deliverable: "Test bin Pareto와 원인 가설", keywords: ["ATE", "Probe", "Yield"], finalCheck: "상위 fail item과 확인 실험이 있는지" },
        { title: "신뢰성·FA 리포트", objective: "HAST, HTOL, thermal cycling, C-SAM/X-ray 결과를 원인 가설과 개선안으로 정리합니다.", time: "3시간", deliverable: "신뢰성·FA 리포트", keywords: ["Reliability", "FA", "C-SAM"], finalCheck: "시험 조건, 판정 기준, 재발 방지가 포함됐는지" }
      ],
      "manufacturing-dx": [
        { title: "설비 데이터 구조 정의", objective: "lot, recipe, 설비, alarm, 품질 결과를 하나의 데이터 구조로 정리합니다.", time: "2시간", deliverable: "설비 데이터 정의서", keywords: ["MES", "SCADA", "OPC UA"], finalCheck: "join 가능한 키와 시간 기준이 있는지" },
        { title: "OEE·정지 손실 분석", objective: "가동률, 성능, 품질 손실을 분리하고 개선 우선순위를 정합니다.", time: "3시간", deliverable: "OEE 손실 Pareto", keywords: ["OEE", "downtime", "Python"], finalCheck: "손실 유형별 개선 행동이 있는지" },
        { title: "대시보드·비전검사 적용", objective: "대시보드 또는 비전검사 기준을 만들어 현장 의사결정에 연결합니다.", time: "3시간", deliverable: "제조 DX 대시보드 또는 검사 기준표", keywords: ["Power BI", "OpenCV", "비전검사"], finalCheck: "사용자가 볼 지표와 판정 문장이 있는지" }
      ],
      "chemical-sustainability": [
        { title: "신사업 화학공정 흐름도", objective: "수소, CCUS, 수처리, 리사이클, 고분자 중 하나를 골라 원료-반응-분리-품질 흐름을 정리합니다.", time: "2시간", deliverable: "공정 흐름도와 물질수지 초안", keywords: ["수소", "CCUS", "수처리"], finalCheck: "원료, 제품, 부산물, 배출 흐름이 보이는지" },
        { title: "분석·품질 데이터 연결", objective: "GC/MS, HPLC, FTIR, DSC/TGA 또는 수질 지표를 품질 판단 기준으로 바꿉니다.", time: "3시간", deliverable: "분석 결과-품질 지표 연결표", keywords: ["HPLC", "FTIR", "TOC", "DSC"], finalCheck: "분석값이 합격/불합격 판단으로 이어지는지" },
        { title: "Scale-up·환경안전 검토", objective: "lab 조건을 파일럿·양산 조건으로 옮길 때 생기는 열·물질전달, 안전, 환경 리스크를 정리합니다.", time: "3시간", deliverable: "Scale-up 리스크와 HAZOP 체크리스트", keywords: ["Scale-up", "HAZOP", "PSM"], finalCheck: "리스크, 감지 방법, 예방 대책이 같이 있는지" }
      ]
    });

    Object.assign(starterKeywords, {
      "data-center-infra": "데이터센터 UPS 수배전 발전기 냉각 HVAC BMS DCIM PUE 장애대응 예방정비",
      "semiconductor-packaging-test": "반도체 후공정 Advanced Packaging HBM Probe Test Final Test ATE Reliability FA",
      "manufacturing-dx": "스마트팩토리 MES SCADA OPC UA PLC SQL Python OEE 대시보드 비전검사",
      "chemical-sustainability": "화학공학 수소 CCUS 수처리 배터리리사이클 고분자 필름 Scale-up HAZOP PSM"
    });

    addMajorFits("electrical_power", {
      direct: ["data-center-electrical-infra-engineer", "dcim-bms-operations-engineer"],
      bridge: ["data-center-cooling-engineer", "industrial-data-engineer", "mes-scada-integration-engineer"],
      bridgeFocus: "전력·설비 강점을 데이터센터 전력, ESS, 제조 설비 데이터, 안전 기준으로 연결하면 최근 인프라·에너지 직무와 맞닿습니다."
    });
    addMajorFits("electrical", {
      direct: ["semiconductor-test-engineer", "mes-scada-integration-engineer", "industrial-data-engineer", "smart-factory-vision-engineer"],
      bridge: ["advanced-packaging-engineer", "packaging-reliability-fa-engineer", "dcim-bms-operations-engineer"]
    });
    addMajorFits("mechanical", {
      direct: ["data-center-cooling-engineer"],
      bridge: ["data-center-electrical-infra-engineer", "advanced-packaging-engineer", "packaging-reliability-fa-engineer", "mes-scada-integration-engineer", "industrial-data-engineer", "smart-factory-vision-engineer", "polymer-film-materials-engineer"]
    });
    addMajorFits("chemical", {
      direct: ["advanced-packaging-engineer", "packaging-reliability-fa-engineer", "hydrogen-process-engineer", "ccus-process-engineer", "water-treatment-process-engineer", "polymer-film-materials-engineer", "battery-recycling-process-engineer"],
      bridge: ["semiconductor-test-engineer", "industrial-data-engineer", "smart-factory-vision-engineer", "data-center-cooling-engineer"],
      bridgeFocus: "화학공학 강점은 배터리·소재·수소·CCUS·수처리뿐 아니라 후공정 패키징, 공정 데이터, 환경안전으로 확장할 수 있습니다."
    });

    Object.entries({
      "data-center-electrical-infra-engineer": ["kdcc-data-center-operation-study", "smartspace-data-center-electrical-guide", "keea-electrical-facility-operation-training", "mathworks-simscape-electrical", "ti-power-management-training", "ni-learn-test-measurement"],
      "data-center-cooling-engineer": ["kdcc-data-center-operation-study", "mathworks-simscape-fluids-examples", "mathworks-simscape-examples", "ansys-innovation-courses", "simscape-onramp"],
      "dcim-bms-operations-engineer": ["kdcc-data-center-operation-study", "mathworks-predictive-maintenance", "freecodecamp-python-data", "boostcourse-data-ai-basic"],
      "advanced-packaging-engineer": ["semiengineering-advanced-packaging", "semiengineering-failure-analysis", "statistics-onramp", "nist-control-charts", "nist-process-capability", "letuin-semiconductor-field-practice"],
      "semiconductor-test-engineer": ["semiengineering-semiconductor-test", "letuin-spotfire-defect-analysis", "statistics-onramp", "freecodecamp-python-data", "google-ml-crash-course", "nist-control-charts", "nist-process-capability"],
      "packaging-reliability-fa-engineer": ["semiengineering-advanced-packaging", "semiengineering-failure-analysis", "asq-eight-d", "statistics-onramp", "nist-control-charts", "nist-process-capability"],
      "mes-scada-integration-engineer": ["opc-foundation-opcua-overview", "comento-plc-control-practice", "ncs", "freecodecamp-python-data", "mathworks-predictive-maintenance", "statistics-onramp", "nist-process-capability"],
      "industrial-data-engineer": ["freecodecamp-python-data", "boostcourse-data-ai-basic", "mathworks-predictive-maintenance", "google-ml-crash-course", "statistics-onramp", "machine-learning-onramp", "nist-control-charts", "nist-process-capability"],
      "smart-factory-vision-engineer": ["nvidia-jetson-ai-course", "mathworks-deep-learning-onramp", "google-ml-crash-course", "boostcourse-data-ai-basic", "machine-learning-onramp", "statistics-onramp", "freecodecamp-python-data"],
      "hydrogen-process-engineer": ["doe-hydrogen-production-delivery", "learncheme-reactor-design", "learncheme-material-balances", "aiche-ccps-process-safety-beacon"],
      "ccus-process-engineer": ["doe-carbon-capture-overview", "learncheme-separations", "learncheme-reactor-design", "mit-chemical-engineering"],
      "water-treatment-process-engineer": ["aiche-ccps-process-safety-beacon", "learncheme-separations", "kosha-psm", "youtube-nptel-hazop"],
      "polymer-film-materials-engineer": ["learncheme-reactor-design", "statistics-onramp", "coursera-engineering-data", "nptel-chemical-engineering"],
      "battery-recycling-process-engineer": ["learncheme-material-balances", "learncheme-separations", "aiche-ccps-process-safety-beacon", "statistics-onramp"]
    }).forEach(([roleId, resourceIds]) => {
      roleResourceLinks[roleId] = mergeValues(resourceIds, roleResourceLinks[roleId] || []);
    });

    addRoleCompetencyLinks({
      "data-center-cooling-engineer": {
        "열부하": ["kdcc-data-center-operation-study", "mathworks-simscape-fluids-examples", "ansys-innovation-courses", "simscape-onramp"],
        "Airflow": ["kdcc-data-center-operation-study", "mathworks-simscape-fluids-examples", "ansys-innovation-courses", "simscape-onramp"],
        "온도로그": ["mathworks-predictive-maintenance", "mathworks-simscape-fluids-examples", "kdcc-data-center-operation-study"],
        "공조": ["kdcc-data-center-operation-study", "mathworks-simscape-fluids-examples", "mathworks-simscape-examples", "simscape-onramp"]
      },
      "dcim-bms-operations-engineer": {
        "반복 알람": ["kdcc-data-center-operation-study", "mathworks-predictive-maintenance", "freecodecamp-python-data"],
        "대시보드": ["freecodecamp-python-data", "boostcourse-data-ai-basic", "kdcc-data-center-operation-study"],
        "예방정비": ["mathworks-predictive-maintenance", "kdcc-data-center-operation-study"],
        "조치 기준": ["kdcc-data-center-operation-study", "mathworks-predictive-maintenance"]
      },
      "industrial-data-engineer": {
        "전처리": ["freecodecamp-python-data", "statistics-onramp", "machine-learning-onramp"],
        "OEE": ["mathworks-predictive-maintenance", "nist-process-capability", "freecodecamp-python-data"],
        "대시보드": ["freecodecamp-python-data", "boostcourse-data-ai-basic", "google-ml-crash-course"]
      },
      "smart-factory-vision-engineer": {
        "라벨": ["mathworks-deep-learning-onramp", "google-ml-crash-course", "nvidia-jetson-ai-course"],
        "조명": ["nvidia-jetson-ai-course", "mathworks-deep-learning-onramp"],
        "모델평가": ["google-ml-crash-course", "machine-learning-onramp", "statistics-onramp"]
      },
      "water-treatment-process-engineer": {
        "수질": ["learncheme-separations", "mathworks-simscape-fluids-examples", "aiche-ccps-process-safety-beacon"],
        "막분리": ["learncheme-separations", "mathworks-simscape-fluids-examples"],
        "규제": ["kosha-psm", "aiche-ccps-process-safety-beacon", "youtube-nptel-hazop"],
        "설비": ["mathworks-simscape-fluids-examples", "learncheme-separations"],
        "이상 대응": ["youtube-nptel-hazop", "aiche-ccps-process-safety-beacon", "mathworks-simscape-fluids-examples"]
      },
      "polymer-film-materials-engineer": {
        "분석": ["statistics-onramp", "coursera-engineering-data", "nptel-chemical-engineering"],
        "코팅": ["learncheme-reactor-design", "nptel-chemical-engineering", "statistics-onramp"],
        "DOE": ["statistics-onramp", "coursera-engineering-data"]
      }
    });

    Object.entries({
      "kdcc-data-center-operation-study": ["전력·냉각 구성도 정리", "운영 로그와 알람 분석", "PUE·장애 대응 리포트"],
      "smartspace-data-center-electrical-guide": ["전력·냉각 구성도 정리", "PUE·장애 대응 리포트"],
      "keea-electrical-facility-operation-training": ["전력·냉각 구성도 정리", "운영 로그와 알람 분석", "PUE·장애 대응 리포트"],
      "mathworks-simscape-fluids-examples": ["전력·냉각 구성도 정리", "PUE·장애 대응 리포트"],
      "semiengineering-advanced-packaging": ["패키지 구조·공정 흐름 정리", "신뢰성·FA 리포트"],
      "semiengineering-semiconductor-test": ["Test bin·수율 분석", "신뢰성·FA 리포트"],
      "opc-foundation-opcua-overview": ["설비 데이터 구조 정의", "OEE·정지 손실 분석"],
      "statistics-onramp": ["Test bin·수율 분석", "OEE·정지 손실 분석"],
      "nist-control-charts": ["Test bin·수율 분석", "OEE·정지 손실 분석"],
      "nist-process-capability": ["Test bin·수율 분석", "신뢰성·FA 리포트", "OEE·정지 손실 분석"],
      "freecodecamp-python-data": ["Test bin·수율 분석", "설비 데이터 구조 정의", "OEE·정지 손실 분석", "대시보드·비전검사 적용"],
      "google-ml-crash-course": ["Test bin·수율 분석", "대시보드·비전검사 적용"],
      "machine-learning-onramp": ["Test bin·수율 분석", "대시보드·비전검사 적용"],
      "aiche-ccps-process-safety-beacon": ["Scale-up·환경안전 검토"],
      "doe-hydrogen-production-delivery": ["신사업 화학공정 흐름도", "Scale-up·환경안전 검토"],
      "doe-carbon-capture-overview": ["신사업 화학공정 흐름도", "Scale-up·환경안전 검토"],
      "learncheme-reactor-design": ["신사업 화학공정 흐름도", "분석·품질 데이터 연결"],
      "learncheme-separations": ["신사업 화학공정 흐름도", "Scale-up·환경안전 검토"]
    }).forEach(([resourceId, taskTitles]) => {
      resourceTaskLinks[resourceId] = mergeValues(resourceTaskLinks[resourceId], taskTitles);
    });

    industryDiagnostics.infrastructure = [
      ["가용성", "전력·냉각 이중화와 장애 대응 기준을 설명할 수 있다."],
      ["운영 데이터", "BMS/DCIM 알람을 원인 후보와 예방정비 항목으로 바꿀 수 있다."]
    ];
    industryDiagnostics.environment = [
      ["환경 규제", "배출·폐수·폐기물 기준을 공정 조건과 연결할 수 있다."],
      ["처리 공정", "수처리·리사이클·CCUS 공정의 입력, 출력, 품질 지표를 설명할 수 있다."]
    ];
    industryDiagnostics.chemical = mergeValues(industryDiagnostics.chemical, [
      ["Scale-up", "lab 조건과 양산 조건의 차이를 열·물질전달, 안전, 품질 기준으로 설명할 수 있다."],
      ["친환경 공정", "수소, CCUS, 리사이클, 수처리 중 하나의 공정 흐름과 핵심 변수를 말할 수 있다."]
    ]);
  }

  function calibrateMajorRoleFitProfiles() {
    const unique = (values = []) => [...new Set(values.filter(Boolean))];
    const without = (values = [], excluded = []) => {
      const excludedSet = new Set(excluded);
      return unique(values).filter((value) => !excludedSet.has(value));
    };
    const setMajorFit = (major, { direct = [], bridge = [], challenge = [], bridgeFocus = "", challengeFocus = "" }) => {
      const directValues = unique(direct);
      const bridgeValues = without(bridge, directValues);
      const challengeValues = without(challenge, [...directValues, ...bridgeValues]);
      majorRoleFitProfiles[major] = {
        ...(majorRoleFitProfiles[major] || {}),
        direct: directValues,
        bridge: bridgeValues,
        challenge: challengeValues,
        bridgeFocus: bridgeFocus || majorRoleFitProfiles[major]?.bridgeFocus || "",
        challengeFocus: challengeFocus || majorRoleFitProfiles[major]?.challengeFocus || "전공 핵심과 거리가 있으므로 직무 기초 언어, 도구, 작은 산출물을 먼저 확인해야 합니다."
      };
    };

    setMajorFit("mechanical", {
      direct: [
        "mechanical-design-engineer",
        "cae-analysis-engineer",
        "manufacturing-design-engineer",
        "thermal-cfd-engineer",
        "mechanical-test-engineer",
        "production-technology-engineer",
        "vehicle-body-design-engineer",
        "vehicle-interior-exterior-design-engineer",
        "chassis-suspension-engineer",
        "powertrain-mechanical-engineer",
        "vehicle-thermal-management-engineer",
        "automotive-manufacturing-engineer",
        "vehicle-test-validation-engineer",
        "robot-mechanical-design-engineer",
        "data-center-cooling-engineer"
      ],
      bridge: [
        "process-engineer",
        "quality-engineer",
        "supplier-quality-engineer",
        "production-data-engineer",
        "vehicle-calibration-engineer",
        "ev-battery-pack-engineer",
        "bms-control-engineer",
        "hil-sil-validation-engineer",
        "adas-validation-engineer",
        "functional-safety-engineer",
        "automotive-quality-field-engineer",
        "aerospace-systems-engineer",
        "uav-flight-control-engineer",
        "defense-systems-engineer",
        "robot-control-engineer",
        "smart-factory-automation-engineer",
        "manufacturing-ai-engineer",
        "predictive-maintenance-ai-engineer",
        "simulation-ai-engineer",
        "autonomous-planning-control-engineer",
        "autonomous-simulation-validation-engineer",
        "mes-scada-integration-engineer",
        "industrial-data-engineer",
        "advanced-packaging-engineer",
        "packaging-reliability-fa-engineer",
        "data-center-electrical-infra-engineer"
      ],
      challenge: [
        "hardware-design-engineer",
        "pcb-design-engineer",
        "validation-engineer",
        "power-hardware-engineer",
        "emc-test-engineer",
        "embedded-firmware-engineer",
        "control-engineer",
        "embedded-linux-engineer",
        "motor-control-engineer",
        "semiconductor-process-engineer",
        "semiconductor-equipment-engineer",
        "semiconductor-yield-engineer",
        "etch-process-engineer",
        "metrology-engineer",
        "photo-lithography-engineer",
        "thin-film-deposition-engineer",
        "cmp-process-engineer",
        "process-integration-engineer",
        "semiconductor-facility-engineer",
        "fdc-apc-process-control-engineer",
        "defect-failure-analysis-engineer",
        "power-systems-engineer",
        "ess-bms-engineer",
        "power-electronics-inverter-engineer",
        "electric-machine-drive-engineer",
        "renewable-energy-grid-engineer",
        "autonomous-perception-engineer",
        "sensor-fusion-localization-engineer",
        "vehicle-sw-platform-engineer",
        "vehicle-diagnostics-ota-engineer",
        "vehicle-cybersecurity-engineer",
        "vision-inspection-ai-engineer",
        "engineering-data-analyst",
        "dcim-bms-operations-engineer",
        "semiconductor-test-engineer",
        "smart-factory-vision-engineer"
      ],
      bridgeFocus: "기계 전공의 설계·해석·시험 강점을 생산기술, 차량 검증, 로봇, 설비 데이터 산출물로 번역해야 합니다.",
      challengeFocus: "회로, 펌웨어, 반도체 장비/공정, 전력계통 직무는 전기전자 기초와 현장 용어 보강 없이는 전공 직결로 보기 어렵습니다."
    });

    setMajorFit("electrical_power", {
      direct: [
        "power-systems-engineer",
        "ess-bms-engineer",
        "power-electronics-inverter-engineer",
        "electric-machine-drive-engineer",
        "renewable-energy-grid-engineer",
        "ev-power-electronics-engineer",
        "plc-instrumentation-engineer",
        "data-center-electrical-infra-engineer",
        "dcim-bms-operations-engineer"
      ],
      bridge: [
        "hardware-design-engineer",
        "pcb-design-engineer",
        "validation-engineer",
        "power-hardware-engineer",
        "emc-test-engineer",
        "embedded-firmware-engineer",
        "control-engineer",
        "motor-control-engineer",
        "vehicle-ee-architecture-engineer",
        "wiring-harness-engineer",
        "bms-control-engineer",
        "hil-sil-validation-engineer",
        "functional-safety-engineer",
        "aerospace-systems-engineer",
        "uav-flight-control-engineer",
        "avionics-integration-engineer",
        "defense-systems-engineer",
        "radar-rf-signal-engineer",
        "robot-control-engineer",
        "robot-perception-engineer",
        "smart-factory-automation-engineer",
        "data-center-cooling-engineer",
        "mes-scada-integration-engineer",
        "industrial-data-engineer",
        "semiconductor-facility-engineer"
      ],
      challenge: [
        "automotive-embedded-sw-engineer",
        "adas-validation-engineer",
        "autonomous-perception-engineer",
        "sensor-fusion-localization-engineer",
        "autonomous-planning-control-engineer",
        "autonomous-simulation-validation-engineer",
        "vehicle-sw-platform-engineer",
        "vehicle-diagnostics-ota-engineer",
        "vehicle-cybersecurity-engineer",
        "semiconductor-process-engineer",
        "semiconductor-equipment-engineer",
        "semiconductor-yield-engineer",
        "etch-process-engineer",
        "metrology-engineer",
        "fdc-apc-process-control-engineer",
        "semiconductor-test-engineer",
        "manufacturing-ai-engineer",
        "predictive-maintenance-ai-engineer",
        "vision-inspection-ai-engineer",
        "engineering-data-analyst",
        "simulation-ai-engineer",
        "smart-factory-vision-engineer"
      ],
      bridgeFocus: "전력공학·전기기기·전력전자 강점을 회로, 제어, 계측, 차량 전장, 설비 데이터 산출물로 연결해야 합니다.",
      challengeFocus: "AI·자율주행·반도체 세부 공정은 전력 전공만으로는 부족하므로 SW, 데이터, 공정 용어를 먼저 보강해야 합니다."
    });

    setMajorFit("electrical", {
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
        "semiconductor-yield-engineer",
        "metrology-engineer",
        "fdc-apc-process-control-engineer",
        "defect-failure-analysis-engineer",
        "semiconductor-test-engineer",
        "vehicle-ee-architecture-engineer",
        "wiring-harness-engineer",
        "automotive-embedded-sw-engineer",
        "bms-control-engineer",
        "hil-sil-validation-engineer",
        "adas-validation-engineer",
        "functional-safety-engineer",
        "ev-power-electronics-engineer",
        "vehicle-diagnostics-ota-engineer",
        "vehicle-cybersecurity-engineer",
        "avionics-integration-engineer",
        "radar-rf-signal-engineer",
        "robot-control-engineer",
        "robot-perception-engineer",
        "plc-instrumentation-engineer",
        "smart-factory-automation-engineer",
        "mes-scada-integration-engineer",
        "industrial-data-engineer",
        "smart-factory-vision-engineer"
      ],
      bridge: [
        "semiconductor-process-engineer",
        "etch-process-engineer",
        "photo-lithography-engineer",
        "thin-film-deposition-engineer",
        "cmp-process-engineer",
        "process-integration-engineer",
        "semiconductor-facility-engineer",
        "advanced-packaging-engineer",
        "packaging-reliability-fa-engineer",
        "power-systems-engineer",
        "ess-bms-engineer",
        "power-electronics-inverter-engineer",
        "electric-machine-drive-engineer",
        "renewable-energy-grid-engineer",
        "data-center-electrical-infra-engineer",
        "dcim-bms-operations-engineer",
        "autonomous-perception-engineer",
        "sensor-fusion-localization-engineer",
        "autonomous-planning-control-engineer",
        "autonomous-simulation-validation-engineer",
        "vehicle-sw-platform-engineer",
        "manufacturing-ai-engineer",
        "predictive-maintenance-ai-engineer",
        "vision-inspection-ai-engineer",
        "engineering-data-analyst",
        "simulation-ai-engineer"
      ],
      challenge: [
        "mechanical-design-engineer",
        "cae-analysis-engineer",
        "thermal-cfd-engineer",
        "vehicle-body-design-engineer",
        "chassis-suspension-engineer",
        "chemical-process-engineer",
        "battery-process-engineer",
        "materials-rnd-engineer",
        "process-safety-engineer",
        "bioprocess-engineer",
        "hydrogen-process-engineer",
        "ccus-process-engineer",
        "water-treatment-process-engineer",
        "polymer-film-materials-engineer",
        "battery-recycling-process-engineer",
        "data-center-cooling-engineer"
      ],
      bridgeFocus: "회로·계측·제어 강점을 반도체 공정, 전력·ESS, 차량 SW, 제조 데이터 산출물로 확장할 수 있습니다.",
      challengeFocus: "기계 설계·화학공정 중심 직무는 전자 전공의 주력 경로가 아니므로 전공 보완보다 직무 탐색 단계로 보는 편이 안전합니다."
    });

    setMajorFit("chemical", {
      direct: [
        "chemical-process-engineer",
        "battery-process-engineer",
        "materials-rnd-engineer",
        "process-safety-engineer",
        "bioprocess-engineer",
        "semiconductor-process-engineer",
        "etch-process-engineer",
        "photo-lithography-engineer",
        "thin-film-deposition-engineer",
        "cmp-process-engineer",
        "process-integration-engineer",
        "process-engineer",
        "advanced-packaging-engineer",
        "packaging-reliability-fa-engineer",
        "hydrogen-process-engineer",
        "ccus-process-engineer",
        "water-treatment-process-engineer",
        "polymer-film-materials-engineer",
        "battery-recycling-process-engineer"
      ],
      bridge: [
        "quality-engineer",
        "supplier-quality-engineer",
        "production-data-engineer",
        "production-technology-engineer",
        "semiconductor-equipment-engineer",
        "semiconductor-yield-engineer",
        "metrology-engineer",
        "semiconductor-facility-engineer",
        "fdc-apc-process-control-engineer",
        "defect-failure-analysis-engineer",
        "semiconductor-test-engineer",
        "ev-battery-pack-engineer",
        "bms-control-engineer",
        "vehicle-thermal-management-engineer",
        "automotive-quality-field-engineer",
        "manufacturing-ai-engineer",
        "predictive-maintenance-ai-engineer",
        "vision-inspection-ai-engineer",
        "engineering-data-analyst",
        "data-center-cooling-engineer",
        "industrial-data-engineer",
        "smart-factory-vision-engineer"
      ],
      challenge: [
        "hardware-design-engineer",
        "pcb-design-engineer",
        "embedded-firmware-engineer",
        "control-engineer",
        "motor-control-engineer",
        "power-systems-engineer",
        "power-electronics-inverter-engineer",
        "electric-machine-drive-engineer",
        "data-center-electrical-infra-engineer",
        "dcim-bms-operations-engineer",
        "vehicle-ee-architecture-engineer",
        "automotive-embedded-sw-engineer",
        "autonomous-perception-engineer",
        "vehicle-sw-platform-engineer",
        "vehicle-cybersecurity-engineer"
      ],
      bridgeFocus: "물질수지·반응·분리·소재 강점을 수율, 계측, 품질, 데이터, 장비 조건 언어로 번역해야 합니다.",
      challengeFocus: "전기전자·펌웨어·전력설비 중심 직무는 별도 기초를 많이 요구하므로 지원 전 핵심 용어와 산출물을 먼저 확인해야 합니다."
    });

    setMajorFit("computer", {
      direct: [
        "embedded-firmware-engineer",
        "embedded-linux-engineer",
        "robotics-software-engineer",
        "automotive-embedded-sw-engineer",
        "autonomous-perception-engineer",
        "sensor-fusion-localization-engineer",
        "autonomous-planning-control-engineer",
        "autonomous-simulation-validation-engineer",
        "vehicle-sw-platform-engineer",
        "vehicle-diagnostics-ota-engineer",
        "vehicle-cybersecurity-engineer",
        "manufacturing-ai-engineer",
        "predictive-maintenance-ai-engineer",
        "vision-inspection-ai-engineer",
        "engineering-data-analyst",
        "simulation-ai-engineer",
        "mes-scada-integration-engineer",
        "industrial-data-engineer",
        "smart-factory-vision-engineer",
        "fdc-apc-process-control-engineer"
      ],
      bridge: [
        "control-engineer",
        "robot-control-engineer",
        "robot-perception-engineer",
        "bms-control-engineer",
        "hil-sil-validation-engineer",
        "adas-validation-engineer",
        "functional-safety-engineer",
        "vehicle-ee-architecture-engineer",
        "wiring-harness-engineer",
        "production-data-engineer",
        "semiconductor-yield-engineer",
        "metrology-engineer",
        "defect-failure-analysis-engineer",
        "semiconductor-test-engineer",
        "dcim-bms-operations-engineer",
        "smart-factory-automation-engineer"
      ],
      challenge: [
        "mechanical-design-engineer",
        "cae-analysis-engineer",
        "manufacturing-design-engineer",
        "thermal-cfd-engineer",
        "mechanical-test-engineer",
        "process-engineer",
        "quality-engineer",
        "supplier-quality-engineer",
        "production-technology-engineer",
        "vehicle-body-design-engineer",
        "vehicle-interior-exterior-design-engineer",
        "chassis-suspension-engineer",
        "powertrain-mechanical-engineer",
        "vehicle-calibration-engineer",
        "vehicle-thermal-management-engineer",
        "ev-battery-pack-engineer",
        "automotive-manufacturing-engineer",
        "automotive-quality-field-engineer",
        "vehicle-test-validation-engineer",
        "hardware-design-engineer",
        "pcb-design-engineer",
        "validation-engineer",
        "power-hardware-engineer",
        "emc-test-engineer",
        "motor-control-engineer",
        "semiconductor-process-engineer",
        "semiconductor-equipment-engineer",
        "etch-process-engineer",
        "photo-lithography-engineer",
        "thin-film-deposition-engineer",
        "cmp-process-engineer",
        "process-integration-engineer",
        "semiconductor-facility-engineer",
        "power-systems-engineer",
        "ess-bms-engineer",
        "power-electronics-inverter-engineer",
        "electric-machine-drive-engineer",
        "renewable-energy-grid-engineer",
        "data-center-electrical-infra-engineer",
        "data-center-cooling-engineer",
        "chemical-process-engineer",
        "battery-process-engineer",
        "materials-rnd-engineer",
        "process-safety-engineer",
        "bioprocess-engineer",
        "hydrogen-process-engineer",
        "ccus-process-engineer",
        "water-treatment-process-engineer",
        "polymer-film-materials-engineer",
        "battery-recycling-process-engineer",
        "advanced-packaging-engineer",
        "packaging-reliability-fa-engineer"
      ],
      bridgeFocus: "소프트웨어·데이터 강점을 센서 로그, 제어 주기, 설비 인터페이스, 검증 자동화 산출물로 번역하면 제조·차량·로봇 직무로 확장할 수 있습니다.",
      challengeFocus: "기계 설계, 전력설비, 화학·반도체 공정 중심 직무는 물리·공정 기초와 현장 장비 언어를 먼저 보완해야 전공 적합성이 생깁니다."
    });

    setMajorFit("industrial", {
      direct: [
        "process-engineer",
        "quality-engineer",
        "supplier-quality-engineer",
        "production-data-engineer",
        "production-technology-engineer",
        "automotive-manufacturing-engineer",
        "automotive-quality-field-engineer",
        "manufacturing-ai-engineer",
        "predictive-maintenance-ai-engineer",
        "engineering-data-analyst",
        "industrial-data-engineer",
        "mes-scada-integration-engineer"
      ],
      bridge: [
        "semiconductor-yield-engineer",
        "fdc-apc-process-control-engineer",
        "defect-failure-analysis-engineer",
        "semiconductor-test-engineer",
        "advanced-packaging-engineer",
        "packaging-reliability-fa-engineer",
        "smart-factory-automation-engineer",
        "smart-factory-vision-engineer",
        "vision-inspection-ai-engineer",
        "simulation-ai-engineer",
        "dcim-bms-operations-engineer",
        "data-center-cooling-engineer",
        "vehicle-test-validation-engineer",
        "hil-sil-validation-engineer",
        "process-integration-engineer",
        "semiconductor-facility-engineer"
      ],
      challenge: [
        "mechanical-design-engineer",
        "cae-analysis-engineer",
        "manufacturing-design-engineer",
        "thermal-cfd-engineer",
        "mechanical-test-engineer",
        "vehicle-body-design-engineer",
        "vehicle-interior-exterior-design-engineer",
        "chassis-suspension-engineer",
        "powertrain-mechanical-engineer",
        "vehicle-calibration-engineer",
        "vehicle-thermal-management-engineer",
        "ev-battery-pack-engineer",
        "hardware-design-engineer",
        "pcb-design-engineer",
        "validation-engineer",
        "power-hardware-engineer",
        "emc-test-engineer",
        "embedded-firmware-engineer",
        "control-engineer",
        "embedded-linux-engineer",
        "motor-control-engineer",
        "robotics-software-engineer",
        "robot-control-engineer",
        "robot-perception-engineer",
        "semiconductor-process-engineer",
        "semiconductor-equipment-engineer",
        "etch-process-engineer",
        "metrology-engineer",
        "photo-lithography-engineer",
        "thin-film-deposition-engineer",
        "cmp-process-engineer",
        "power-systems-engineer",
        "ess-bms-engineer",
        "power-electronics-inverter-engineer",
        "electric-machine-drive-engineer",
        "renewable-energy-grid-engineer",
        "chemical-process-engineer",
        "battery-process-engineer",
        "materials-rnd-engineer",
        "process-safety-engineer",
        "bioprocess-engineer",
        "hydrogen-process-engineer",
        "ccus-process-engineer",
        "water-treatment-process-engineer",
        "polymer-film-materials-engineer",
        "battery-recycling-process-engineer",
        "autonomous-perception-engineer",
        "sensor-fusion-localization-engineer",
        "vehicle-sw-platform-engineer",
        "vehicle-cybersecurity-engineer"
      ],
      bridgeFocus: "공정개선·품질·데이터 강점을 수율, 테스트, 설비 로그, 공급망 품질, 대시보드 산출물로 보여주면 반도체·제조 DX·인프라 직무로 확장할 수 있습니다.",
      challengeFocus: "장치 설계, 회로, 펌웨어, 화학 반응처럼 전공 물리 지식이 핵심인 직무는 산업공학 강점만으로는 부족하므로 기술 기초 보완을 먼저 확인해야 합니다."
    });

    setMajorFit("materials", {
      direct: [
        "materials-rnd-engineer",
        "battery-process-engineer",
        "polymer-film-materials-engineer",
        "battery-recycling-process-engineer",
        "advanced-packaging-engineer",
        "packaging-reliability-fa-engineer",
        "thin-film-deposition-engineer",
        "cmp-process-engineer",
        "semiconductor-process-engineer",
        "etch-process-engineer",
        "photo-lithography-engineer",
        "process-integration-engineer",
        "defect-failure-analysis-engineer",
        "chemical-process-engineer"
      ],
      bridge: [
        "process-safety-engineer",
        "water-treatment-process-engineer",
        "ccus-process-engineer",
        "hydrogen-process-engineer",
        "quality-engineer",
        "supplier-quality-engineer",
        "process-engineer",
        "production-technology-engineer",
        "semiconductor-equipment-engineer",
        "semiconductor-yield-engineer",
        "metrology-engineer",
        "semiconductor-test-engineer",
        "ev-battery-pack-engineer",
        "vehicle-thermal-management-engineer",
        "automotive-quality-field-engineer"
      ],
      challenge: [
        "mechanical-design-engineer",
        "cae-analysis-engineer",
        "manufacturing-design-engineer",
        "thermal-cfd-engineer",
        "mechanical-test-engineer",
        "vehicle-body-design-engineer",
        "vehicle-interior-exterior-design-engineer",
        "chassis-suspension-engineer",
        "powertrain-mechanical-engineer",
        "vehicle-calibration-engineer",
        "automotive-manufacturing-engineer",
        "vehicle-test-validation-engineer",
        "hardware-design-engineer",
        "pcb-design-engineer",
        "validation-engineer",
        "power-hardware-engineer",
        "emc-test-engineer",
        "embedded-firmware-engineer",
        "control-engineer",
        "embedded-linux-engineer",
        "robotics-software-engineer",
        "motor-control-engineer",
        "robot-control-engineer",
        "robot-perception-engineer",
        "power-systems-engineer",
        "ess-bms-engineer",
        "power-electronics-inverter-engineer",
        "electric-machine-drive-engineer",
        "renewable-energy-grid-engineer",
        "data-center-electrical-infra-engineer",
        "dcim-bms-operations-engineer",
        "data-center-cooling-engineer",
        "manufacturing-ai-engineer",
        "predictive-maintenance-ai-engineer",
        "vision-inspection-ai-engineer",
        "engineering-data-analyst",
        "simulation-ai-engineer",
        "mes-scada-integration-engineer",
        "industrial-data-engineer",
        "smart-factory-automation-engineer",
        "smart-factory-vision-engineer",
        "autonomous-perception-engineer",
        "vehicle-sw-platform-engineer",
        "vehicle-cybersecurity-engineer"
      ],
      bridgeFocus: "소재·물성·공정 강점을 계측, 불량분석, 신뢰성, 수율, 열관리 산출물로 연결하면 반도체 후공정·배터리·품질 직무로 확장할 수 있습니다.",
      challengeFocus: "소프트웨어, 전력, 회로, 순수 기계 설계 중심 직무는 소재 지식과 직접 맞닿는 면이 제한적이므로 도구·장비·제어 기초를 별도로 보완해야 합니다."
    });
  }

  applyPriorityRoleExpansion();
  calibrateMajorRoleFitProfiles();
}
