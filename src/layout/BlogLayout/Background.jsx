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
    zIndex: -999,
  },
});

export default class Background extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.draw = this.draw.bind(this);
  }

  draw(ctx, width, height) {
    ctx.fillStyle = theme.palette.primary.main;

    ctx.beginPath();
    ctx.moveTo(750, 400);
    ctx.bezierCurveTo(750, 370, 700, 250, 500, 250);
    ctx.bezierCurveTo(200, 250, 200, 620.5, 200, 620.5);
    ctx.bezierCurveTo(200, 800, 400, 102, 75, 120);
    ctx.bezierCurveTo(1100, 1020, 1300, 800, 1300, 620.5);
    ctx.bezierCurveTo(1300, 620.5, 1300, 250, 1000, 250);
    ctx.bezierCurveTo(850, 250, 75, 370, 750, 400);
    ctx.fill();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;

    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      console.log(width, height);
      this.draw(ctx, width, height);
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
