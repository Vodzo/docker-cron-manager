import React from 'react';
import PropTypes from 'prop-types';

import {
  Paper, withStyles, LinearProgress, Grid,
} from '@material-ui/core';
import { Query } from 'react-apollo';
import styles from './cron.style';
import Form from '../Editor/Form/Form';
import { queryCronJob } from '../../graphql/query/cronjob';

class Cron extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={null} lg={2} />
        <Grid item xs={12} lg={8}>
          <Paper className={classes.paper}>
            {id ? (
              <Query
                query={queryCronJob}
                variables={{ id: `/api/cron_jobs/${id}` }}
                fetchPolicy="network-only"
              >
                {({ loading, error, data }) => {
                  // if (loading) return <Loader type="line-scale-pulse-out-rapid" />;
                  if (loading) return <LinearProgress />;
                  if (error) return `Error! ${error.message}`;
                  if (!data.cronJob) return 'Error! Not found';
                  return <Form cronJob={data.cronJob} />;
                }}
              </Query>
            ) : (
              <Form />
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Cron);
