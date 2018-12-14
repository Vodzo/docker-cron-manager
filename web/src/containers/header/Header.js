import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  withTheme,
  withStyles,
} from '@material-ui/core';

import {
  WbIncandescent,
  WbIncandescentOutlined,
  Search as SearchIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';

import styles from './header.style';

class Header extends React.Component {
  static propTypes = {
    theme: PropTypes.object,
    classes: PropTypes.object,
    onMenuIconClick: PropTypes.func,
    onSearch: PropTypes.func,
    onThemeChange: PropTypes.func,
  };

  toggleMenu = () => {
    this.props.onMenuIconClick();
  };

  handleSearch = (e) => {
    const { value } = e.target;
    this.props.onSearch(value);
  };

  handleThemeChange = () => {
    this.props.onThemeChange();
  };

  render() {
    const { theme, classes } = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon onClick={this.toggleMenu} />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            DCM - Docker Cron Manager
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this.handleSearch}
            />
          </div>
          <div className={classes.grow} />
          <IconButton color="inherit" aria-label="Menu" onClick={this.handleThemeChange}>
            {theme === 'light' ? <WbIncandescentOutlined /> : <WbIncandescent />}
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(withTheme()(Header));
