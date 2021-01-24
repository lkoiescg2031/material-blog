import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import ScrollEffect from './ScrollEffect';
import { Consumer } from './Context';

const useStyles = makeStyles(theme => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function BlogLayoutAppBar(props) {
  const classes = useStyles();

  return (
    <ScrollEffect {...props}>
      <AppBar position="fixed" className={classes.appbar}>
        <Consumer>
          {({ title, appbarElements, toggleDrawer }) => (
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                aria-label="open drawer"
                className={classes.menuButton}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" noWrap className={classes.title}>
                {title}
              </Typography>
              {appbarElements}
            </Toolbar>
          )}
        </Consumer>
      </AppBar>
    </ScrollEffect>
  );
}

BlogLayoutAppBar.propTypes = {};

export default BlogLayoutAppBar;
