import React, { PureComponent } from 'react';

import { StyleSheet, css } from 'aphrodite';

import Game from './Game';
import options from './Options';

import './retroFont.css';

const { stageWidth, stageHeight } = options.game.stage;

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

    this.____initContext = this.____initContext.bind(this);
  }

  ____initContext() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    //for retina
    const ratio = window.devicePixelRatio;

    this.canvas.width = stageWidth * ratio;
    this.canvas.height = stageHeight * ratio;
    this.ctx.scale(ratio, ratio);

    this.game = new Game();
    this.game.init(this.ctx);
  }

  componentDidMount() {
    this.____initContext();
    this.game.runGame();
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
