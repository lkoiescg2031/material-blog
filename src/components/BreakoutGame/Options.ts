const retroFontName = 'pixel-retro';
const retroFont = (size: number): string => `${size}px ${retroFontName}`;

const theme = {
  palette: {
    outter: '#7E7E7D',
    inner: '#FAD0C9',
  },
};

// new version
const shape = {
  stage: {
    //테두리
    stageWidth: 285,
    stageHeight: 500,
    stageColor: theme.palette.outter,
    outLineWidth: 2,
    //상단 점수판
    scoreBoardHeight: 40,
    bigFont: retroFont(11),
    smallFont: retroFont(8),
    fontColor: theme.palette.inner,
  },
  user: {
    fontColor: theme.palette.inner,
    fontBig: retroFont(8),
    fontSmall: retroFont(7),
    speed: 11,
  },
  brick: {
    height: 18,
    between: 18,
    color: theme.palette.outter,
    fontColor: theme.palette.inner,
    font: retroFont(7),
  },
  bullet: {
    radius: 3,
    color: theme.palette.outter,
    speed: 1,
  },
};

// // old version
// const game = {
//   stage: {
//     //외형 옵션
//     stageWidth: 285,
//     stageHeight: 500,
//     stageColor: theme.palette.outter,
//     outLineWidth: 2,
//     y: 40,
//     fontColor: theme.palette.inner,
//     fontBig: retroFont(11),
//     fontSmall: retroFont(8),

//     //난이도 옵션
//     rowSize: 5, // 기본 row count
//     colSize: 5, // 기본 col count
//     durability: 0, // 기본 durability
//     durabilityIncRate: 10, // 블럭 내구도 증가량
//   },
//   user: {
//     //난이도 옵션
//     bulletCount: 10,
//     bulletDurability: 3,
//     bulletCountIncRate: 3,
//     bulletDurabilityIncRate: 1,
//     //초기 방향
//     initialShootPosX: 0,
//     initialShootPosY: 500,
//     initialShootDir: 180,
//     //외형 옵션
//     fontColor: theme.palette.inner,
//     fontBig: retroFont(8),
//     fontSmall: retroFont(7),
//   },
//   bullets: {
//     //기본값
//     defaultTotal: 10, //기본 총알 수
//     defaultX: 0,
//     defaultY: 501,
//     defaultDir: 342, //단위 degree
//     defaultDurability: 3, // 총알 기본 하단 바운스 횟수
//     //외형 옵션
//     initialDistance: 2, // 초기 총알 중심 사이의 간격, 단위 radius
//     bullet: {
//       radius: 3,
//       color: theme.palette.outter,
//       speed: 1, //, 2.5 // 총알 속도, 단위 2 * radius
//       weakness: 1, // damaged pre bounce
//     },
//   },
//   bricks: {
//     //외형 옵션
//     betweenSpace: 18, // 블럭 사이 간격
//     brick: {
//       //brick shape
//       height: 18,
//       color: theme.palette.outter,
//       weakness: 1, // 한번에 받는 대미지 양
//       // font shape
//       fontColor: theme.palette.inner,
//       font: retroFont(7),
//     },
//   },
// };

const options = {
  theme,
  // game,
  shape,
};

export default options;
