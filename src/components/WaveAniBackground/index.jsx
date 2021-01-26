import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import WaveGroup from './WaveGroup';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -9999,
  },
});

export default class WaveAniBackground extends PureComponent {
  static propTypes = {
    props: PropTypes,
    waveCount: PropTypes.number,
    pointCount: PropTypes.number,
    waveHeight: PropTypes.number,
    waveMaxHeight: PropTypes.number,
    speed: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};

    this.canvasRef = React.createRef();

    this.init = this.initializeCanvas.bind(this);
    this.clear = this.clear.bind(this);
    this.run = this.run.bind(this);
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
  }

  clear() {
    const {
      waveCount,
      pointCount,
      waveHeight,
      waveMaxHeight,
      speed,
      colors,
    } = this.props;

    this.waveGroupAni = new WaveGroup(
      waveCount,
      pointCount,
      waveHeight,
      waveMaxHeight,
      speed,
      colors,
    );
  }
  run() {
    window.addEventListener('resize', this.resize, false);
    this.resize();

    this.requestAnimationFrameId = window.requestAnimationFrame(this.animate);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    //for retina
    const ratio = 1; //window.devicePixelRatio || 1;
    this.canvas.width = this.stageWidth * ratio;
    this.canvas.height = this.stageHeight * ratio;
    this.ctx.scale(ratio, ratio);

    this.waveGroupAni.resize(this.stageWidth, this.stageHeight);
  }

  animate() {
    //prevAnimation
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.waveGroupAni.draw(this.ctx);

    //afterAnimation
    this.requestAnimationFrameId = window.requestAnimationFrame(this.animate);
  }

  componentDidMount() {
    this.initializeCanvas();
    this.run();
  }

  initializeCanvas() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    this.requestAnimationFrameId = 0;
    this.clear();
  }

  render() {
    return <canvas ref={this.canvasRef} className={css(styles.canvas)} />;
  }
}
