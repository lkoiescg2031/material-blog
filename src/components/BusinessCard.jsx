import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';
import color from '../styles/color';

export default class BusinessCard extends PureComponent {
  static propTypes = {
    children: PropTypes.func,
  };

  static defaultProps = {
    children: () => {},
  };

  constructor(props) {
    super(props);
    this.businessCardRef = React.createRef();
    this.state = { currentCardIdx: 0 };
    this.changeTo = this.changeTo.bind(this);
    this.hideBusinessCardAnimation = this.hideBusinessCardAnimation.bind(this);
    this.showBusinessCardAnimation = this.showBusinessCardAnimation.bind(this);
  }

  hideBusinessCardAnimation() {
    const animation = this.businessCardRef.current.animate(
      [
        { transform: 'rotate3D(0.5, 0.5, 0, 0deg)' },
        { transform: 'rotate3D(0.5, 0.5, 0, 90deg)' },
      ],
      450,
    ).finished;

    return animation;
  }

  showBusinessCardAnimation() {
    const animation = this.businessCardRef.current.animate(
      [
        { transform: 'rotate3D(0.5, 0.5, 0, 90deg)' },
        { transform: 'rotate3D(0.5, 0.5, 0, 0deg)' },
      ],
      220,
    ).finished;

    return animation;
  }

  async changeTo(number) {
    //번호 미입력시 보정
    if (typeof number === 'undefined') {
      const lastNumber = this.props.children(this.changeTo).props.children
        .length;
      const currentIdx = this.state.currentCardIdx;
      number = (currentIdx + 1) % lastNumber;
    }

    await this.hideBusinessCardAnimation();

    this.setState(
      prevState => ({ ...prevState, currentCardIdx: number }),
      this.showBusinessCardAnimation,
    );
  }

  render() {
    const { children: getChildrenNode } = this.props;
    const { currentCardIdx } = this.state;
    const children = getChildrenNode(this.changeTo).props.children;

    return (
      <div ref={this.businessCardRef} className={css(styles.card)}>
        {children[currentCardIdx] || children[0] || children}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '500px',
    height: '300px',
    padding: '15px',
    backgroundColor: color.primaryColor,
    borderRadius: '15px',
    boxShadow: '3px 3px 3px 2px gray',
    color: color.secondaryColor,
    '@media screen and (max-width: 500px)': {
      width: '100vw',
      height: '100vh',
      borderRadius: '0px',
    },
  },
});
