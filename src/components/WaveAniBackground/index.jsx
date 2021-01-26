import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import WaveGroup from './WaveGroup';
import { StyleSheet, css } from 'aphrodite';

import { createGradient } from '../../utils/canvas';

const defaultWaveColors = [
  createGradient({
    0: '#ef9a9aff',
    1: '#a76b6b00',
  }),
  createGradient({
    0: '#ef9a9aff',
    1: '#ef9a9a00',
  }),
  createGradient({
    0: '#ef9a9aff',
    1: '#f2aeae00',
  }),
];

const WaveAniBackgroundStyle = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -9999,
  },
});

export default class WaveAniBackground extends PureComponent {
  static propTypes = {
    waveCount: PropTypes.number,
    pointCount: PropTypes.number,
    waveHeight: PropTypes.number,
    waveMaxHeight: PropTypes.number,
    speed: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    waveCount: 3,
    pointCount: 6,
    waveHeight: stageHeight => (stageHeight / 12) * 11,
    waveMaxHeight: () => Math.random() * 15 + 15,
    speed: 0.05,
    colors: defaultWaveColors,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.canvasRef = React.createRef();

    //handle Wave ani
    this.___resize = this.___resize.bind(this);
    this.update = this.update.bind(this);
    this.___animate = this.___animate.bind(this);
    this.toggleAnimation = this.toggleAnimation.bind(this);
  }

  ___resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    //for retina
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = this.stageWidth * ratio;
    this.canvas.height = this.stageHeight * ratio;
    this.ctx.scale(ratio, ratio);

    this.waveGroupAni.resize(this.stageWidth, this.stageHeight);
  }

  ___animate(t) {
    this.update();
    this.requestAnimationFrameId = window.requestAnimationFrame(
      this.___animate,
    );
  }

  update() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.waveGroupAni.draw(this.ctx);
  }

  toggleAnimation() {
    if (this.requestAnimationFrameId === 0) {
      this.requestAnimationFrameId = window.requestAnimationFrame(
        this.___animate,
      );
    } else {
      window.cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = 0;
    }
  }

  componentDidMount() {
    //initialize
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    this.requestAnimationFrameId = 0;

    this.waveGroupAni = new WaveGroup(this.props);

    window.addEventListener('resize', this.___resize, false);
    this.___resize();

    this.toggleAnimation();
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        className={css(WaveAniBackgroundStyle.canvas)}
      />
    );
  }
}
