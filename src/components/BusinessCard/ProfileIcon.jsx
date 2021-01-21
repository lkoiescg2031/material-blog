import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';
import color from '../../styles/color';

export default class ProfileIcon extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf([
      'email',
      'blog',
      'github',
      'facebook',
      'twitter',
      'instagram',
      'linkedIn',
    ]).isRequired,
    url: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.getIconHref = this.getIconHref.bind(this);
  }

  getIconHref() {
    const { type, url } = this.props;

    switch (type) {
      case 'email':
        return { name: 'email', icon: 'xi-mail', href: `mailto:${url}` };
      case 'blog':
        return { name: 'home', icon: 'xi-home', href: url };
      case 'github':
        return { name: 'github', icon: 'xi-github', href: url };
      case 'facebook':
        return { name: 'facebook', icon: 'xi-facebook-official', href: url };
      case 'twitter':
        return { name: 'twitter', icon: 'xi-twiiter', href: url };
      case 'instagram':
        return { name: 'instagram', icon: 'xi-instagram', href: url };
      case 'linkedIn':
        return { name: 'linkedIn', icon: 'xi-linkedin-square', href: url };
      default:
        return { icon: 'xi-ellipsis-h', href: url };
    }
  }

  render() {
    const { icon, href } = this.getIconHref();

    return (
      <a type="button" className={css(styles.wrapper)} href={href}>
        <i className={icon} />
      </a>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: '0.3rem',
    color: color.secondaryColor,
    fontSize: '2.5rem',
  },
});
