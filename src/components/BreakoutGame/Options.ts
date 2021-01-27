const retroFontName = 'pixel-retro';
const retroFont = (size: number): string => `${size}px ${retroFontName}`;

const theme = {
  palette: {
    outter: '#6E6E6D',
    inner: '#FAD0C9',
  },
};

const game = {
  stage: {
    stageWidth: 285,
    stageHeight: 500,
    outLineColor: theme.palette.outter,
    outLineWidth: 2,
  },
  user: {

  },
  bullets: {
    initialDistance: 2, // 초기 총알 중심 사이의 간격, 단위 radius
    bullet: {
      radius: 3,
      color: theme.palette.outter,
      speed: 1, //, 2.5 // 총알 속도, 단위 2 * radius
      durability: 10, // stage button line bounce durability
      weakness: 1, // damaged pre bounce
    },
  },
  bricks: {
    betweenSpace: 18, // 블럭 사이 간격
    brick: {
      //brick shape
      height: 18,
      color: theme.palette.outter,
      weakness: 1, // 한번에 받는 대미지 양
      // font shape
      fontColor: theme.palette.inner,
      font: retroFont(14),
      textAlign: 'center' as CanvasTextAlign,
      textBaseline: 'top' as CanvasTextBaseline,
    },
  },
};

const options = {
  theme,
  game,
};

export default options;
