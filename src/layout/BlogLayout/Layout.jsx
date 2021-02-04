import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import globalTheme from '../../styles/theme';

import WaveBackgroundAni from '../../components/WaveAniBackground';

import { Provider } from './Context';
import AppBar from './AppBar';
import Drawer, { drawerWidth } from './Drawer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: globalTheme.palette.primary.main,
    zIndex: -999,
    position: 'absolute',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
  },
}));

function BlogLayout({ title, drawerMenu, children }) {
  const classes = useStyles();
  const [isOpenDrawer, setDrawer] = React.useState(false);

  const toggleDrawer = event => {
    event.preventDefault();
    setDrawer(!isOpenDrawer);
  };

  return (
    <Provider
      value={{
        title: title || 'SW Dev blog',
        drawerElements: drawerMenu,
        isOpenDrawer,
        toggleDrawer,
        profile: {
          name: '김태홍',
          feature: null, // 외형 이미지 url
          desc: '행복한 삶을 추구하는 개발자 입니다.',
          email: 'lkoiescg2031@naver.com',
          // sns urls
          github: 'https://github.com/lkoiescg2031',
          twitter: null,
          facebook: null,
          instagram: null,
          linkedin: null,
        },
      }}
    >
      <ThemeProvider theme={globalTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar />
          <Drawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
        <WaveBackgroundAni />
      </ThemeProvider>
    </Provider>
  );
}

BlogLayout.propTypes = {
  title: PropTypes.string,
};
BlogLayout.defaultProps = {
  title: '',
};

export default BlogLayout;
