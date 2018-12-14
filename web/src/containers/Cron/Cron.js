import React from 'react';
import PropTypes from 'prop-types';

import { Paper, withStyles, LinearProgress } from '@material-ui/core';
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

              return <Form cronJob={data.cronJob} />;
            }}
          </Query>
        ) : (
          <Form />
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(Cron);
