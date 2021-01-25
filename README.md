# 블로그 레포

## 블로그 기능 명세

### Landing Page

  1. 바탕 + businessCard 으로 구성 :heavy_check_mark:
  2. businessCard 는 앞면, 뒷면 으로 구성
     1. 앞면 카드 구현 :heavy_check_mark:
     2. 뒷면 카드 구헌
  3. 앞면 카드에서 클릭시 후면으로 이동 및 에니메이션 추가 :heavy_check_mark:
  4. 뒷면에서 클릭시 블로그 홈으로 진입 :heavy_check_mark:
  5. 마우스 커서를 따라 명함이 이동 :heavy_check_mark:
  6. 데이터 값 주입 :heavy_check_mark:
  
### Layout

  1. Background 웨이브 애니메이션 추가 :heavy_check_mark:
     1. 최상단 위치 시 뒷편에서 웨이브 애니메이션 동작 :heavy_check_mark:
     2. 스크롤 시 웨이브 애니메이션 중지 :x:
  2. 상단에 material-ui를 이용한 Appbar 추가 :heavy_check_mark:
  3. Appbar에 카테고리 추가 추가 ( 항목 : challenges, projects, resume, posts)
  4. Drawer 추가
  5. Drawer 상단 간략한 프로필 추가
  6. Drawer Post 위주의 계층 뷰 추가

### Pages

  1. Home Page
     1. ????
  2. challenges Page 
     1. 첼린지 제목 및 간단한 설명 추가
     2. 진행 기간 및 달성도를 파악 할 수 있는 UI 추가
     3. 클릭 시 첼린지 제목, 상세 설명, 상세 내용을 볼 수 있도록 추가
  3. toy projects Pages 카테고리
     1. 프로젝트 제목 및 작업 기간 추가
     2. 소스코드 링크 기능 추가
     3. 샘플 보기 기능 추가
     4. 기술 스택 표기 추가
  4. resume Pages
     1. 개인 이력서 (국문) 추가
     2. 개인 이력서 (영문) 추가
     3. 이메일 연락 추가
     4. sns 정보 추가
  5. posts pages
     1. 포스팅 기능 추가
     2. 포스팅 테그 기능 추가
     3. sns 댓글 기능 추가

## Change Log
  2021.01.11        블로그 저장소 생성
  2021.01.12 ~ now  블로그 시작 페이지 구상 구현