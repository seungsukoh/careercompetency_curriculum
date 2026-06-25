# Career Competency Curriculum

기계공학과 전자공학 대학생을 위한 직무역량 로드맵 파일럿입니다. 학생이 관심 직무 트랙을 고르면 필요한 역량, 공개 학습자료, 4주 학습 계획, 포트폴리오 산출물을 확인할 수 있습니다.

## 무료 파일럿 운영 방식

- 배포: Cloudflare Pages 무료 플랜
- 데이터: 정적 JavaScript seed 데이터
- 저장: 브라우저 localStorage
- 인증/DB: 파일럿에서는 사용하지 않음
- 앱 형태: 모바일 우선 PWA

이 구조는 도메인 비용을 제외하면 월 0원으로 운영할 수 있습니다. 학생은 모바일 브라우저에서 접속하고, 지원되는 브라우저에서는 홈 화면에 추가해 앱처럼 사용할 수 있습니다.

## 로컬 실행

Vite 개발 서버로 실행합니다.

```powershell
npm install
npm run dev
```

그 다음 터미널에 표시되는 로컬 URL로 접속합니다.

배포 산출물을 로컬에서 확인하려면 다음을 실행합니다.

```powershell
npm run build
npm run preview
```

## Cloudflare Pages 배포

1. Cloudflare Pages에서 GitHub 저장소를 연결합니다.
2. Framework preset은 `Vite`로 둡니다.
3. Build command는 `npm run build`로 설정합니다.
4. Build output directory는 `dist`로 설정합니다.
5. 배포 후 Pages URL을 파일럿 참여자에게 공유합니다.

## 주요 파일

- `package.json`: Vite 빌드/개발 스크립트
- `vite.config.js`: Vite 빌드 설정
- `index.html`: 앱 화면 구조
- `styles.css`: 모바일 우선 UI 스타일
- `app.js`: 직무 트랙, 진단, 로드맵, 자료 추천 로직
- `public/manifest.webmanifest`: PWA 설치 정보
- `public/sw.js`: 정적 파일 캐시
- `public/assets/icon.svg`: PWA 아이콘
- `docs/PROJECT_SYNC.md`: 병렬 작업 시 공유할 계획/진행 기준 파일과 동기화 규칙
- `docs/REQUIREMENTS_VALIDATION_CRITERIA.md`: 요구사항과 검증 기준
- `docs/QA_CHECKLIST.md`: 요구사항별 QA 체크리스트
- `docs/QA_RESULTS_2026-06-25.md`: 현재 QA 결과와 배포/파일럿 전 남은 작업
- `docs/FREE_PILOT_PLAYBOOK.md`: 무료 파일럿 운영안
- `PROJECT_PLAN.md`: 전체 기획 및 구현 계획
