import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';
import { WaveGroup } from './WaveAni';

const backgroundStyle = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -99999,
  },
});

export default function WaveBackgroundAni(props) {
  const {
    waveCount,
    pointCount,
    waveHeight,
    waveMaxHeight,
    speed,
    colors,
    ...restProps
  } = props;

  const canvasRef = React.useRef();
  const waveGroup = new WaveGroup(
    waveCount,
    pointCount,
    waveHeight,
    waveMaxHeight,
    speed,
    colors,
  );

  //resize
  const ___resize = () => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    //for ratina
    const canvas = canvasRef.current;
    if (typeof canvas !== 'undefined' && canvas !== null) {
      const context = canvas.getContext('2d');
      const ratio = 1;
      // const { devicePixelRatio: ratio = 1 } = window;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
    }

    waveGroup.resize(width, height);
  };

  window.addEventListener('resize', ___resize.bind(this));

  //animation
  const ___draw = ctx => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    waveGroup.draw(ctx);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ___resize();

    let animationFrameId = 0;

    const animate = t => {
      ___draw(ctx);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [___draw, ___resize]);

  return (
    <canvas
      ref={canvasRef}
      className={css(backgroundStyle.canvas)}
      {...restProps}
    />
  );
}

WaveBackgroundAni.propTypes = {
  waveCount: PropTypes.number,
  pointCount: PropTypes.number,
  waveHeight: PropTypes.func,
  waveMaxHeight: PropTypes.func,
  color: PropTypes.arrayOf(PropTypes.string),
};
