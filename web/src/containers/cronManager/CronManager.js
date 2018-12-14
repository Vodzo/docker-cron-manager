import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  withTheme,
  LinearProgress,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Query } from 'react-apollo';
import cronstrue from 'cronstrue';
import styles from './cronManager.style';
import queryCronJobs from '../../graphql/query/cronjobs';
import Fab from '../../components/fab';
import Editor from '../editor';

class CronManager extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    search: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      editorOpen: false,
    };
  }

  openNewEditor = () => {
    this.setState(() => ({
      editorOpen: true,
    }));
  };

  handleEditorClose = () => {
    this.setState(() => ({
      editorOpen: false,
    }));
  };

  render() {
    const { classes, search } = this.props;
    const { editorOpen } = this.state;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={null} lg={2} />
          <Grid item xs={12} lg={8} style={{ textAlign: 'center' }}>
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <Typography variant="h6" gutterBottom>
                CronJobs
              </Typography>
            </div>
            <Query query={queryCronJobs} variables={{ search }}>
              {({ loading, error, data }) => {
                // if (loading) return <Loader type="line-scale-pulse-out-rapid" />;
                if (loading) return <LinearProgress />;
                if (error) return `Error! ${error.message}`;

                return data.cronJobs.edges.length
                  ? data.cronJobs.edges.map(cronJob => (
                      <ExpansionPanel key={cronJob.node.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
        <Fab onClick={this.openNewEditor} />
        <Editor visible={editorOpen} onClose={this.handleEditorClose} />
      </main>
    );
  }
}

export default withStyles(styles)(withTheme()(CronManager));
