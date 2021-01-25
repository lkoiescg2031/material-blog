import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css, globalStyles } from './CardTheme';
import color from '../../styles/color';
import { Consumer, clickHandler } from './context';

import ProfileIcon from './ProfileIcon';
import Inline from '../Inline';

const CardTemplate2 = ({
  name,
  figure,
  position,
  email,
  blog,
  github,
  //sns
  facebook,
  twitter,
  instagram,
  linkedIn,
  //options
  hasNextButton,
  homeButtonCallback,
}) => {
  const sns = { blog, email, github, facebook, twitter, instagram, linkedIn };

  return (
    <div className={css(globalStyles.card, styles.card)}>
      <div className={css(styles.inner)}>
        <img className={css(styles.figure)} src={figure} alt="figure" />
        <div>
          <h3 className={css(styles.name)}>{name}</h3>
          <h5 className={css(styles.position)}>{position}</h5>
        </div>
      </div>
      <div className={css(styles.inner)}>
        <Inline>
          {Object.entries(sns).map(([key, value], idx) => {
            if (value === null || value.toString().length === 0) {
              return null;
            }
            return (
              <ProfileIcon key={`profile_${idx + 1}`} type={key} url={value} />
            );
          })}
        </Inline>
      </div>
      {hasNextButton && (
        <Consumer>
          {({ setCard }) => (
            <button
              className={css(
                styles.homeButton,
                globalStyles.bouncingHorizonAni,
              )}
              onClick={homeButtonCallback || clickHandler(setCard)}
            >
              <i className="xi-caret-down-square-o xi-rotate-270 xi-2x" />
            </button>
          )}
        </Consumer>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    '@media screen and (max-width:  500px)': {
      flexFlow: 'column wrap',
    },
    position: 'relative',
  },
  inner: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media screen and (max-width: 500px)': {
      width: '100%',
      textAlign: 'center',
    },
    ':first-child': {
      width: '184px',
      paddingRight: '15px',
      borderRight: `1px solid ${color.secondaryColor}`,
      '@media screen and (max-width : 500px)': {
        padding: 0,
        border: 0,
        paddingBottom: '15px',
        borderBottom: `1px solid ${color.secondaryColor}`,
      },
    },
    ':nth-child(2)': {
      width: '285px',
      paddingLeft: '15px',
      '@media screen and (max-width: 500px)': {
        padding: 0,
        border: 0,
        paddingTop: '15px',
      },
    },
  },
  figure: {
    width: '110px',
    height: '110px',
    margin: '0px auto 15px auto',
    backgroundColor: color.secondaryColor,
    borderRadius: '100%',
  },
  name: {
    margin: 0,
  },
  position: {
    margin: 0,
  },
  homeButton: {
    border: 0,
    backgroundColor: '#00000000',
    color: color.secondaryColor,

    cursor: 'pointer',
    outline: 0,

    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

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
  hasNextButton: PropTypes.bool,
  homeButtonCallback: PropTypes.func,
};

CardTemplate2.defaultProps = {
  hasNextButton: false,
  homeButton: null,
};

export default CardTemplate2;
