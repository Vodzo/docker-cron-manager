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
  Button,
  Tooltip,
} from '@material-ui/core';

import {
  WbIncandescent,
  WbIncandescentOutlined,
  Search as SearchIcon,
  Menu as MenuIcon,
  ImportContacts,
} from '@material-ui/icons';

import { Link, withRouter } from 'react-router-dom';
import styles from './header.style';

class Header extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    classes: PropTypes.object,
    onMenuIconClick: PropTypes.func,
    onSearch: PropTypes.func,
    onThemeChange: PropTypes.func,
    history: PropTypes.object,
  };

  toggleMenu = () => {
    this.props.onMenuIconClick();
  };

  handleSearch = (e) => {
    const { value } = e.target;
    this.props.history.push('/');
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
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={this.toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.title}>
            <Typography variant="h6" color="inherit" noWrap>
              DCM - Docker Cron Manager
            </Typography>
          </Link>
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
            {theme === 'light' ? <WbIncandescent /> : <WbIncandescentOutlined />}
          </IconButton>
          <Tooltip title="Docs" aria-label="Docs">
            <Button
              color="inherit"
              aria-label="Menu"
              href="https://vodzo.github.io/docker-cron-manager/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImportContacts />
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(withTheme(Header)));
