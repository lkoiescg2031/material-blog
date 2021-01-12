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
    this.handleMoveItem = this.handleMoveItem.bind(this);
  }

  handleMoveItem(event) {
    const { clientX, clientY } = event;
    const target = this.moverRef.current;
    const moveX = clientX * 0.03;
    const moveY = clientY * 0.03;

    target.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  render() {
    const { children } = this.props;
    return (
      <div className={css(styles.layout)} onMouseMove={this.handleMoveItem}>
        <div ref={this.moverRef}>{children}</div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAEBEF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
