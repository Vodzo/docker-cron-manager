import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, withStyles, Chip, Menu, MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './actions.style';

class Actions extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleGuzzleEditor: PropTypes.func,
    toggleRabbitMQEditor: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      menuOpen: false,
    };
  }

  handleClick = (event) => {
    const { currentTarget } = event;
    this.setState(() => ({
      anchorEl: currentTarget,
      menuOpen: true,
    }));
  };

  handleCloseMenu = () => {
    this.setState(() => ({
      menuOpen: false,
    }));
  }

  handleGuzzleJob = () => {
    this.handleCloseMenu();
    this.props.toggleGuzzleEditor(true);
  }

  handleRabbitMQJob = () => {
    this.handleCloseMenu();
    this.props.toggleRabbitMQEditor();
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, menuOpen } = this.state;
    return (
      <Paper elevation={1} className={classes.actions}>
        <Typography variant="h6" gutterBottom>Actions</Typography>
        <Chip
          label="Add action"
          onClick={this.handleClick}
          className={classes.chip}
          color="primary"
          clickable
          onDelete={this.handleClick}
          deleteIcon={<AddIcon />}
        />
        <Menu
          id="action-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={this.handleGuzzleJob}>Guzzle job</MenuItem>
          <MenuItem onClick={this.handleRabbitMQJob}>RabbitMQ job</MenuItem>
        </Menu>
      </Paper>
    );
  }
}

export default withStyles(styles)(Actions);
