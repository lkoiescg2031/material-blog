import React from 'react';

import { StyleSheet, css } from 'aphrodite';

export default function Inline({ children }) {
  return <div className={css(styles.wrapper)}>{children}</div>;
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
});
