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

import styles from './drawer.style';

class StyledDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    menuOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  handleClose = () => {
    this.props.onClose();
  }

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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map(text => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map(text => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(withTheme()(StyledDrawer));
