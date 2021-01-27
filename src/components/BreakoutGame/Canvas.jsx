import React, { PureComponent } from 'react';

import { StyleSheet, css } from 'aphrodite';

import Game from './Game';

const stageWidth = 285;
const stageHeight = 500;

const styles = StyleSheet.create({
  root: {
    minWidth: 300,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: '100%',
    maxWidth: stageWidth,
    height: stageHeight,
    margin: '0 0 15px 0',
  },
});

export default class Canvas extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    //for retina
    const ratio = window.devicePixelRatio;

    this.canvas.width = stageWidth * ratio;
    this.canvas.height = stageHeight * ratio;
    this.ctx.scale(ratio, ratio);

    this.game = new Game();
    this.game.reset(this.ctx, stageWidth, stageHeight);
    this.game.run();
  }

  componentWillUnmount() {
    this.game.exit();
  }

  render() {
    return (
      <div className={css(styles.root)}>
        <canvas ref={this.canvasRef} className={css(styles.canvas)} />
      </div>
    );
  }
}
