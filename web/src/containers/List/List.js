import React from 'react';
import {
  withStyles,
  withTheme,
  Grid,
  Typography,
  LinearProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { Query } from 'react-apollo';
import cronstrue from 'cronstrue';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import styles from './list.style';
import queryCronJobs from '../../graphql/query/cronjobs';

class CronList extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    search: PropTypes.string,
  };

  render() {
    const { classes, search } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={null} lg={2} />
        <Grid item xs={12} lg={8} style={{ textAlign: 'center' }}>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              CronJobs
            </Typography>
          </div>
          <Query query={queryCronJobs} variables={{ search }} fetchPolicy="network-only">
            {({ loading, error, data }) => {
              // if (loading) return <Loader type="line-scale-pulse-out-rapid" />;
              if (loading) return <LinearProgress />;
              if (error) return `Error! ${error.message}`;

              return data.cronJobs.edges.length
                ? data.cronJobs.edges.map(cronJob => (
                    <ExpansionPanel key={cronJob.node.id}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Link to={`/edit/${cronJob.node._id}`}>
                          <Edit fontSize='small' className={classes.icon} />
                        </Link>
                        <Typography className={classes.heading}>
                          {cronJob.node.name} - {cronstrue.toString(cronJob.node.schedule)}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>{cronJob.node.name}</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
                : 'No results';
            }}
          </Query>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withTheme()(CronList));
