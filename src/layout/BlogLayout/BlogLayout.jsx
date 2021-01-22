import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import globalTheme from '../../styles/theme';

import { Provider } from './context';
import AppBar from './BlogLayoutAppBar';
import Drawer, { drawerWidth } from './BlogLayoutDrawer';
import Background from './Background';

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
        <Background />
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
