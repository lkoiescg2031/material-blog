import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import color from '../styles/color';

/**
 * global styles
 */

const globalStyles = StyleSheet.create({
  card: {
    height: '100%',
  },
  bouncingAni: {
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
});

/**
 * Card Template 1
 */
export const CardTemplate1 = ({ title, subTitle, hasButton, onClick }) => (
  <div
    className={css(
      globalStyles.card,
      CardTemplate1Styles.card,
      CardTemplate1Styles.btnParent,
    )}
  >
    <h1 className={css(CardTemplate1Styles.title)}>{title}</h1>
    <h4>{subTitle}</h4>
    {hasButton && (
      <button
        className={css(CardTemplate1Styles.btn, globalStyles.bouncingAni)}
        onClick={onClick}
      >
        <i className={`xi-caret-down-square-o xi-2x`} />
      </button>
    )}
  </div>
);

const CardTemplate1Styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  btnParent: {
    position: 'relative',
  },
  btn: {
    border: 0,
    backgroundColor: '#00000000',
    color: color.secondaryColor,

    cursor: 'pointer',

    position: 'absolute',
    bottom: '0px',
    ':focus': {
      outline: 0,
    },
  },
});

export const CardTemplate2 = () => (
  <div className={css(globalStyles.card, CardTemplate2Style.card)}>
    <div
      className={css(CardTemplate2Style.inner, CardTemplate2Style.rightLine)}
    >
      <i className={css(CardTemplate2Style.figure)}></i>
      <h3>Taehong Kim</h3>
      <h5>Developer</h5>
    </div>
    <div className={css(CardTemplate2Style.inner, CardTemplate2Style.leftLine)}>
      <i className={css(CardTemplate2Style.qrCode)}></i>
      <h5>email: lkoiescg2031@naver.com</h5>
      <h5>webPage: lkoiescg2031.netrify.com</h5>
      <h5>github: lkoiescg2031</h5>
      <h5>facebook: lkoiescg2031</h5>
    </div>
  </div>
);

const CardTemplate2Style = StyleSheet.create({
  card: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
  },
  figure: {
    width: '110px',
    height: '110px',
    margin: '0px auto 15px auto',
    backgroundColor: color.secondaryColor,
    borderRadius: '100%',
  },
  inner: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
  },
  rightLine: {
    paddingRight: '15px',
    borderRight: `1px solid ${color.secondaryColor}`,
    '@media screen and (max-width : 500px)': {
      paddingRight: 0,
      paddingBottom: '15px',
      borderRight: 0,
      borderBottom: `1px solid ${color.secondaryColor}`,
      textAlign: 'center',
    },
  },
  leftLine: {
    paddingLeft: '15px',
    '@media screen and (max-width: 500px)': {
      paddingLeft: 0,
      paddingTop: '15px',
    },
  },
});
