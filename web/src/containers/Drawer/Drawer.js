import React from 'react';
import PropTypes from 'prop-types';

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  withStyles,
  withTheme,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import styles from './drawer.style';

class StyledDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    menuOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, menuOpen } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        open={menuOpen}
        onClose={this.handleClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <Link to="/" onClick={this.handleClose}>
            <ListItem button key="home">
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
    );
  }
}

export default withStyles(styles)(withTheme()(StyledDrawer));
