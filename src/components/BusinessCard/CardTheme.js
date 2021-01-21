import { StyleSheet, css } from 'aphrodite';

const globalStyles = StyleSheet.create({
  card: {
    height: '100%',
  },

  bouncingVericalAni: {
    animationName: [
      {
        from: {
          transform: 'translate(0px, 0px)',
        },
        to: {
          transform: 'translate(0px, 5px)',
        },
      },
    ],
    animationDuration: '480ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    ':hover': {
      animationName: 'none',
    },
  },

  bouncingHorizonAni: {
    animationName: [
      {
        from: {
          transform: 'translate(0px, 0px)',
        },
        to: {
          transform: 'translate(5px, 0px)',
        },
      },
    ],
    animationDuration: '480ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    ':hover': {
      animationName: 'none',
    },
  },
});

export { globalStyles, StyleSheet, css };
