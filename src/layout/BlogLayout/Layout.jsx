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

import { addAlpha } from '../../utils/colors';

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

function BlogLayout({ title, appBarMenu, drawerMenu, children }) {
  const classes = useStyles();
  const [isOpenDrawer, setDrawer] = React.useState(false);

  const toggleDrawer = event => {
    event.preventDefault();
    setDrawer(!isOpenDrawer);
  };

  // const waveMinHeight = globalTheme.mixins.toolbar.minHeight;
  const backgroundOpacity = 0;
  const createGradient = gradientOptions => ctx => {
    const { height } = ctx.canvas;
    const canvasGradient = ctx.createLinearGradient(0, 0, 0, height);

    Object.entries(gradientOptions).forEach(([offset, color]) => {
      canvasGradient.addColorStop(offset, color);
    });

    return canvasGradient;
  };

  return (
    <Provider
      value={{
        title,
        appbarElements: appBarMenu,
        drawerElements: drawerMenu,
        isOpenDrawer,
        toggleDrawer,
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
        <WaveBackgroundAni
          waveCount={3}
          pointCount={6}
          waveHeight={stageHeight => (stageHeight / 12) * 11}
          waveMaxHeight={() => Math.random() * 15 + 15}
          speed={0.05}
          colors={[
            createGradient({
              0: globalTheme.palette.primary.main,
              1: addAlpha(globalTheme.palette.primary.dark, backgroundOpacity),
            }),
            createGradient({
              0: globalTheme.palette.primary.main,
              1: addAlpha(globalTheme.palette.primary.main, backgroundOpacity),
            }),
            createGradient({
              0: globalTheme.palette.primary.main,
              1: addAlpha(globalTheme.palette.primary.light, backgroundOpacity),
            }),
          ]}
        />
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
