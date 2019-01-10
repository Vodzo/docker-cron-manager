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
import AceEditor from 'react-ace';
import styles from './list.style';
import queryCronJobs from '../../graphql/query/cronjobs';
import { queryLogJob } from '../../graphql/query/log';
import Fab from '../../components/fab';
import JobToggle from './JobToggle';
import LogViewer from '../LogViewer/index';
import ViewLogButton from './ViewLogButton';

class CronList extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    search: PropTypes.string,
  };

  state = {
    expanded: {},
    selectedLog: false,
  };

  handleExpansion = logId => (e, expansionState) => {
    this.setState((state) => {
      const newState = state;
      newState.expanded[logId] = expansionState;
      return newState;
    });
  };

  handleClick = (e) => {
    e.stopPropagation();
  };

  handleLogViewerClose = () => {
    this.setState(() => ({
      selectedLog: false,
    }));
  };

  showLog = (logId) => {
    this.setState(() => ({
      selectedLog: logId,
    }));
  };

  render() {
    const { classes, search } = this.props;
    const { expanded, selectedLog } = this.state;
    return (
      <React.Fragment>
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
                      <ExpansionPanel
                        key={cronJob.node.id}
                        onChange={this.handleExpansion(cronJob.node._id)}
                      >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Link to={`/edit/${cronJob.node._id}`}>
                            <Edit fontSize="small" className={classes.icon} />
                          </Link>
                          <Typography className={classes.heading}>
                            {cronJob.node.name} -{' '}
                            {cronJob.node.schedule
                              ? cronstrue.toString(cronJob.node.schedule)
                              : 'not set'}
                          </Typography>
                          <JobToggle
                            expanded={expanded[cronJob.node._id]}
                            cronJob={cronJob.node}
                            onChange={this.handleJobToggle}
                          />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <div style={{ width: '100%', textAlign: 'left' }}>
                            <Typography>Log:</Typography>
                            {expanded[cronJob.node._id] ? (
                              <Query
                                query={queryLogJob}
                                variables={{ id: `/api/logs/${cronJob.node._id}` }}
                                fetchPolicy="network-only"
                              >
                                {(queryLogJobProps) => {
                                  if (queryLogJobProps.loading) return <LinearProgress />;
                                  if (queryLogJobProps.error) return `Error! ${queryLogJobProps.error.message}`;

                                  return (
                                    <React.Fragment>
                                      <AceEditor
                                        mode="text"
                                        width="100%"
                                        wrapEnabled={true}
                                        theme={
                                          localStorage.getItem('theme') === 'dark'
                                            ? 'solarized_dark'
                                            : 'github'
                                        }
                                        fontSize={14}
                                        showPrintMargin={false}
                                        showGutter={true}
                                        highlightActiveLine={false}
                                        value={queryLogJobProps.data.log.text}
                                        setOptions={{
                                          showLineNumbers: true,
                                          tabSize: 2,
                                          readOnly: true,
                                        }}
                                      />
                                      <ViewLogButton
                                        color="primary"
                                        variant="contained"
                                        style={{ marginTop: '25px', float: 'right' }}
                                        onClick={this.showLog}
                                        logId={cronJob.node._id}
                                      >
                                        View full log
                                      </ViewLogButton>
                                    </React.Fragment>
                                  );
                                }}
                              </Query>
                            ) : (
                              ''
                            )}
                          </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                  ))
                  : 'No results';
              }}
            </Query>
          </Grid>
        </Grid>
        <LogViewer selectedLog={selectedLog} handleLogViewerClose={this.handleLogViewerClose} />
        <Link to="/new">
          <Fab />
        </Link>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withTheme()(CronList));
