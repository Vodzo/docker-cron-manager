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
    cronJob: PropTypes.object,
    handleDeleteGuzzleJob: PropTypes.func,
    handleDeleteRabbitMQJob: PropTypes.func,
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
  };

  handleGuzzleJob = (guzzleJob) => {
    this.handleCloseMenu();
    this.props.toggleGuzzleEditor(true, guzzleJob);
  };

  handleRabbitMQJob = (rabbitMQJob) => {
    this.handleCloseMenu();
    this.props.toggleRabbitMQEditor(true, rabbitMQJob);
  };

  deleteGuzzleJob = (guzzleJob) => {
    this.props.handleDeleteGuzzleJob(guzzleJob);
  };

  deleteRabbitMQJob = (rabbitMQJob) => {
    this.props.handleDeleteRabbitMQJob(rabbitMQJob);
  };

  render() {
    const { classes, cronJob } = this.props;
    const { anchorEl, menuOpen } = this.state;
    return (
      <Paper elevation={1} className={classes.actions}>
        <Typography variant="h6" gutterBottom>
          Actions
        </Typography>
        <Chip
          label="Add action"
          onClick={this.handleClick}
          className={classes.chip}
          color="primary"
          clickable
          onDelete={this.handleClick}
          deleteIcon={<AddIcon />}
        />
        <Menu id="action-menu" anchorEl={anchorEl} open={menuOpen} onClose={this.handleCloseMenu}>
          <MenuItem onClick={() => this.handleGuzzleJob(false)}>Guzzle job</MenuItem>
          <MenuItem onClick={this.handleRabbitMQJob}>RabbitMQ job</MenuItem>
        </Menu>
        {cronJob.guzzleJobs && cronJob.guzzleJobs.edges.map((job, index) => (
          <Chip
            label={job.node.name}
            className={classes.chip}
            key={index}
            onClick={() => this.handleGuzzleJob(job.node)}
            onDelete={() => this.deleteGuzzleJob(job.node)}
          />
        ))}
        {cronJob.rabbitMQJobs && cronJob.rabbitMQJobs.edges.map((job, index) => (
          <Chip
            label={job.node.name}
            className={classes.chip}
            key={index}
            onClick={() => this.handleRabbitMQJob(job.node)}
            onDelete={() => this.deleteRabbitMQJob(job.node)}
          />
        ))}
      </Paper>
    );
  }
}

export default withStyles(styles)(Actions);
