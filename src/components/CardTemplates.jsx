import React from 'react';
import PropTypes from 'prop-types';

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
 * 명함 앞면
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

CardTemplate1.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  hasButton: PropTypes.bool,
  onClick: PropTypes.func,
};

CardTemplate1.defaultProps = {
  hasButton: false,
  onClick: () => {},
};

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

/**
 * 명함 뒷면
 */
export const CardTemplate2 = ({
  figure,
  name,
  position,
  email,
  blog,
  github,
  facebook,
  twitter,
  instagram,
  linkedIn,
}) => (
  <div className={css(globalStyles.card, CardTemplate2Style.card)}>
    <div
      className={css(CardTemplate2Style.inner, CardTemplate2Style.rightLine)}
    >
      <img className={css(CardTemplate2Style.figure)} src={figure}></img>
      <h3>{name}</h3>
      <h5>{position}</h5>
    </div>
    <div className={css(CardTemplate2Style.inner, CardTemplate2Style.leftLine)}>
      <div className={css(CardTemplate2Style.inline)}>
        {email && <h5>{email}</h5>}
        {github && <h5>{github}</h5>}
        {twitter && <h5>{twitter}</h5>}
        {facebook && <h5>{facebook}</h5>}
        {instagram && <h5>{instagram}</h5>}
        {linkedIn && <h5>{linkedIn}</h5>}
      </div>
    </div>
    {blog && (
      <a role="button" href={blog}>
        {blog}
      </a>
    )}
  </div>
);

CardTemplate2.propTypes = {
  figure: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
  email: PropTypes.string,
  blog: PropTypes.string,
  github: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  linkedIn: PropTypes.string,
};

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
  inline: {
    display: 'inline',
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
      textAlign: 'center',
    },
  },
});
