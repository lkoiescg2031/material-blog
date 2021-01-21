import React from 'react';
import PropTypes from 'prop-types';

import color from '../../styles/color';
import { StyleSheet, css, globalStyles } from './CardTheme';
import { Consumer, clickHandler } from './context';

const CardTemplate1 = ({
  title,
  subTitle,
  hasNextButton,
  nextButtonCallback,
}) => (
  <div
    className={css(
      globalStyles.card,
      CardTemplate1Styles.card,
      CardTemplate1Styles.btnParent,
    )}
  >
    <h1 className={css(CardTemplate1Styles.title)}>{title}</h1>
    <h4>{subTitle}</h4>
    {hasNextButton && (
      <Consumer>
        {({ setCard }) => (
          <button
            className={css(
              CardTemplate1Styles.btn,
              globalStyles.bouncingVericalAni,
            )}
            onClick={nextButtonCallback || clickHandler(setCard)}
          >
            <i className={`xi-caret-down-square-o xi-2x`} />
          </button>
        )}
      </Consumer>
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

export default CardTemplate1;

CardTemplate1.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  hasNextButton: PropTypes.bool,
  nextButtonCallback: PropTypes.func,
};

CardTemplate1.defaultProps = {
  hasNextButton: false,
  nextButtonCallback: null,
};
