import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',

    display: 'block',

    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default class Background extends PureComponent {
  static propTypes = {
    aniState: PropTypes.oneOf(['start', 'pause', 'reset', 'stop']),
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.run = this.run.bind(this);
    this.waveStart = this.waveStart.bind(this);
    this.waveStop = this.waveStop.bind(this);
    this.wavePause = this.wavePause.bind(this);
    this.waveReset = this.waveReset.bind(this);
  }

  waveStart() {
    // TODO wave animation start 추가
  }
  wavePause() {
    // TODO wave animation pause 추가
  }
  waveReset() {
    // TODO wave animation reset 추가
  }
  waveStop() {
    // TODO wave animation stop 추가
  }

  // ani props 에 따라 에니메이션 실행
  run() {
    const canvas = this.canvasRef.current;

    if (canvas === undefined) {
      console.error('cannot find canvas');
    }

    if (canvas.getContext) {
      const { aniState } = this.props;
      const ctx = canvas.getContext('2d');
      switch (aniState) {
        case 'start':
          break;
        case 'pause':
          break;
        case 'reset':
          break;
        case 'stop':
          break;
        default:
          console.log('cannot match animation state');
      }
    }
  }
  // animation 실행
  componentDidMount() {
    this.run();
  }
  // animation 업데이트 반영
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.aniState !== this.props.aniState) {
      this.run();
    }
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        className={css(styles.canvas)}
        width="5000"
        height="5000"
      />
    );
  }
}
