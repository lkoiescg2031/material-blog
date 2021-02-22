import React from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import globalTheme from '../../styles/theme';

import WaveBackgroundAni from '../../components/WaveAniBackground';

import { Provider } from './Context';
import AppBar from './AppBar';
import Drawer, { drawerWidth } from './Drawer';

class BlogLayout extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '',
  };

  constructor(props) {
    super(props);

    this.state = { isOpenDrawer: false };
    this.backgroundRef = React.createRef();
    this.onScroll = this.onScroll.bind(this);
  }

  toggleDrawer(event) {
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      isOpenDrawer: !prevState.isOpenDrawer,
    }));
  }

  onScroll(event) {
    const { scrollTop } = event.target.scrollingElement;
    const target = this.backgroundRef.current;

    if (scrollTop === 0) {
      target.runAnimation();
    } else if (target.requestAnimationFrameId !== 0) {
      this.backgroundRef.current.stopAnimation();
    } else {
      this.backgroundRef.current.updateBackground();
    }
  }

  componentDidMount() {
    this.backgroundRef.current.runAnimation();
    window.addEventListener('scroll', this.onScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    const { classes, title, drawerMenu, children } = this.props;
    const { isOpenDrawer } = this.state;

    return (
      <Provider
        value={{
          title: title || 'SW Dev blog',
          drawerElements: drawerMenu,
          isOpenDrawer,
          toggleDrawer: this.toggleDrawer,
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
          <WaveBackgroundAni ref={this.backgroundRef} />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(theme => ({
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
}))(BlogLayout);
