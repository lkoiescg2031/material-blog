import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default class MouseEffectLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.moverRef = React.createRef();
    this.layoutRef = React.createRef();
    this.movingEffect = this.movingEffect.bind(this);
  }

  movingEffect(movingRate = 0.3) {
    return event => {
      event.preventDefault();

      const { offsetWidth, offsetHeight } = this.layoutRef.current;
      const { clientX, clientY } = event;
      const { current: target } = this.moverRef;
      // 모바일에서 작동하지 않음
      if (offsetWidth <= 500) {
        target.style.transform = `translate(0px, 0px)`;
        return;
      }

      const moveX = (clientX - offsetWidth / 2) * movingRate;
      const moveY = (clientY - offsetHeight / 2) * movingRate;

      target.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
  }

  render() {
    const { children } = this.props;
    return (
      <div
        ref={this.layoutRef}
        className={css(mouseLayoutStyles.layout)}
        onMouseMove={this.movingEffect(0.1)}
      >
        <div ref={this.moverRef}>{children}</div>
      </div>
    );
  }
}

const mouseLayoutStyles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAEBEF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
