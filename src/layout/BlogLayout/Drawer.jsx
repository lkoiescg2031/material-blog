import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Consumer } from './Context';

export const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {},
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#00000000',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: '3px',
  },
}));

function BlogLayoutDrawer(props) {
  const classes = useStyles();

  const drawerItems = (drawerMenu, toggleDrawer) => (
    <>
      <div className={classes.toolbar}>
        <IconButton className={classes.closeButton} onClick={toggleDrawer}>
          <ArrowBackIosIcon />
        </IconButton>
      </div>
      <Divider />
      {drawerMenu}
    </>
  );
  return (
    <Consumer>
      {({ isOpenDrawer, toggleDrawer, drawerElements }) => (
        <nav>
          <Hidden smUp implementation="css">
            <SwipeableDrawer
              anchor="left"
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
              open={isOpenDrawer}
              onOpen={toggleDrawer}
              onClose={toggleDrawer}
            >
              {drawerItems(drawerElements, toggleDrawer)}
            </SwipeableDrawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              ancher="left"
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
              open
            >
              {drawerItems(drawerElements, toggleDrawer)}
            </Drawer>
          </Hidden>
        </nav>
      )}
    </Consumer>
  );
}

BlogLayoutDrawer.propTypes = {};

export default BlogLayoutDrawer;
