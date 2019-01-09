import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles, FormControlLabel, Switch } from '@material-ui/core';
import client from '../../graphql/client';
import { mutateCronJob } from '../../graphql/query/cronjob';
import styles from './list.style';

class JobToggle extends React.Component {
  static propTypes = {
    cronJob: PropTypes.object,
    classes: PropTypes.object,
    expanded: PropTypes.bool,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      cronJob: props.cronJob,
    };
  }

  handleJobToggle = (e, newState) => {
    this.setState(
      state => ({
        cronJob: {
          ...state.cronJob,
          enabled: newState,
        },
      }),
      () => {
        client.mutate({
          mutation: mutateCronJob,
          variables: {
            input: {
              id: this.state.cronJob.id,
              clientMutationId: '',
              enabled: newState,
            },
          },
        });
      },
    );
  };

  handleClick = (e) => {
    e.stopPropagation();
  };

  render() {
    const { classes, expanded } = this.props;
    const { cronJob } = this.state;
    return (
      <FormControlLabel
        className={classes.rightLabel}
        onClick={this.handleClick}
        control={
          <Switch
            id="enabled"
            classes={{
              switchBase: classes.switch,
            }}
            checked={cronJob.enabled}
            onChange={this.handleJobToggle}
            value={true}
            onClick={this.handleClick}
          />
        }
        labelPlacement="start"
        label={expanded ? 'enabled' : ''}
      />
    );
  }
}

export default withStyles(styles)(JobToggle);
