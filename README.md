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

정적 파일만 사용하므로 `index.html`을 브라우저에서 열면 됩니다. PWA 서비스 워커까지 확인하려면 로컬 서버로 실행합니다.

```powershell
python -m http.server 8787
```

그 다음 `http://localhost:8787`로 접속합니다.

## Cloudflare Pages 배포

1. Cloudflare Pages에서 GitHub 저장소를 연결합니다.
2. Framework preset은 `None`으로 둡니다.
3. Build command는 비워둡니다.
4. Build output directory는 `.`로 설정합니다.
5. 배포 후 Pages URL을 파일럿 참여자에게 공유합니다.

## 주요 파일

- `index.html`: 앱 화면 구조
- `styles.css`: 모바일 우선 UI 스타일
- `app.js`: 직무 트랙, 진단, 로드맵, 자료 추천 로직
- `manifest.webmanifest`: PWA 설치 정보
- `sw.js`: 정적 파일 캐시
- `docs/FREE_PILOT_PLAYBOOK.md`: 무료 파일럿 운영안
- `PROJECT_PLAN.md`: 전체 기획 및 구현 계획
