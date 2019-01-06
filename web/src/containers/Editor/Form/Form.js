import {
  Tooltip,
  Switch,
  FormControl,
  TextField,
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography,
  FormHelperText,
  FormControlLabel,
  withStyles,
  Button,
  CircularProgress,
  ExpansionPanelSummary,
  Snackbar,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import Actions from '../Actions/index';
import GuzzleEditor from '../GuzzleEditor/GuzzleEditor';
import styles from '../editor.style';
import { mutateCronJob, createCronJob } from '../../../graphql/query/cronjob';
import { updateGuzzleJob, createGuzzleJob } from '../../../graphql/query/guzzlejob';
import client from '../../../graphql/client';
import RabbitMQEditor from '../RabbitMQEditor';

class EditorForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cronJob: PropTypes.object,
    guzzleJob: PropTypes.object,
    rabbitMQJob: PropTypes.object,
    history: PropTypes.object,
  };

  static defaultProps = {
    cronJob: {
      name: '',
      schedule: '',
      guzzleJobs: {
        edges: [],
      },
      rabbitMQJobs: {
        edges: [],
      },
    },
    guzzleJob: {
      name: '',
      method: '',
      url: '',
    },
    rabbitMQJob: {
      name: '',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      cronJob: props.cronJob,
      guzzleEditorVisible: false,
      rabbitMQEditorVisible: false,
      guzzleJob: props.guzzleJob,
      rabbitMQJob: props.rabbitMQJob,
      submitting: false,
      filteringPanel: false,
      loggingPanel: false,
      mailingPanel: false,
      saveMessageVisible: false,
    };
  }

  handleGuzzleMutations = (guzzleJobs) => {
    const mutationJobs = [];
    guzzleJobs.forEach((edge) => {
      const { node } = edge;
      if (node.id) {
        mutationJobs.push(
          new Promise(resolve => client
            .mutate({
              mutation: updateGuzzleJob,
              variables: {
                input: {
                  clientMutationId: '',
                  timeUpdated: `${new Date().getFullYear()}-${new Date().getMonth() +
                      1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                  name: node.name,
                  url: node.url,
                  method: node.method,
                  id: node.id,
                },
              },
            })
            .then((result) => {
              resolve(result.data.updateGuzzleJob.id);
            })),
        );
      } else {
        mutationJobs.push(
          new Promise(resolve => client
            .mutate({
              mutation: createGuzzleJob,
              variables: {
                input: {
                  clientMutationId: '',
                  timeCreated: `${new Date().getFullYear()}-${new Date().getMonth() +
                      1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                  name: node.name,
                  url: node.url,
                  method: node.method,
                },
              },
            })
            .then((result) => {
              resolve(result.data.createGuzzleJob.id);
            })),
        );
      }
    });
    return Promise.all(mutationJobs);
  };

  handleMutation = (mutation, values) => {
    const cronJob = values;
    cronJob.clientMutationId = '';

    this.setState(() => ({
      saveMessageVisible: false,
    }));

    this.handleGuzzleMutations(this.state.cronJob.guzzleJobs.edges).then((guzzleJobs) => {
      const data = {
        variables: {
          input: {
            name: cronJob.name,
            schedule: cronJob.schedule || '',
            clientMutationId: cronJob.clientMutationId,
            debug: cronJob.debug || false,
            enabled: cronJob.enabled || false,
            output: cronJob.output || '/dev/null',
            dateFormat: cronJob.dateFormat || 'Y-m-d H:i:s',
            mailer: cronJob.mailer || 'sendmail',
            smtpPort: cronJob.smtpPort || 25,
            timeCreated:
              cronJob.timeCreated ||
              `${new Date().getFullYear()}-${new Date().getMonth() +
                1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            guzzleJobs,
          },
        },
      };

      if (cronJob.id) {
        data.variables.input.id = cronJob.id;
      }
      mutation(data).then(() => {
        /**
         * set states before unmount...
         */
        this.setState(
          () => ({
            submitting: false,
          }),
          () => {
            /**
             * ...and then redirect
             */
            this.props.history.push('/');
          },
        );
      });
    });
  };

  handleToggleGuzzleEditor = (guzzleEditorVisible, guzzleJob) => {
    this.setState(() => ({
      guzzleEditorVisible,
      guzzleJob: guzzleJob || this.constructor.defaultProps.guzzleJob,
    }));
  };

  handleGuzzleJob = (guzzleJob) => {
    if (guzzleJob.id || guzzleJob.queueId) {
      this.updateGuzzleJob(guzzleJob);
    } else {
      this.addToQueue(guzzleJob);
    }
    this.setState(() => ({
      saveMessageVisible: true,
    }));
  };

  updateGuzzleJob(guzzleJob) {
    this.setState((state) => {
      const newGuzzleJobs = state.cronJob.guzzleJobs.edges.map((edge) => {
        if (edge.node.id === guzzleJob.id || edge.node.queueId === guzzleJob.queueId) {
          return {
            node: guzzleJob,
          };
        }
        return edge;
      });

      return {
        cronJob: {
          ...state.cronJob,
          guzzleJobs: {
            ...state.cronJob.guzzleJobs,
            edges: newGuzzleJobs,
          },
        },
      };
    });
  }

  addToQueue(guzzleJob) {
    const queueItem = guzzleJob;
    queueItem.queueId = new Date().getTime();
    this.setState(state => ({
      cronJob: {
        ...state.cronJob,
        guzzleJobs: {
          ...state.cronJob.guzzleJobs,
          edges: [...state.cronJob.guzzleJobs.edges, { node: queueItem }],
        },
      },
    }));
  }

  handleDeleteGuzzleJob = (guzzleJob) => {
    this.setState((state) => {
      const newGuzzleJobs = state.cronJob.guzzleJobs.edges.filter((edge) => {
        if (
          (guzzleJob.id && edge.node.id === guzzleJob.id) ||
          (guzzleJob.queueId && edge.node.queueId === guzzleJob.queueId)
        ) {
          return false;
        }
        return true;
      });

      return {
        cronJob: {
          ...state.cronJob,
          guzzleJobs: {
            ...state.cronJob.guzzleJobs,
            edges: newGuzzleJobs,
          },
        },
      };
    });
  };

  handleToggleRabbitMQEditor = (rabbitMQEditorVisible, rabbitMQJob) => {
    this.setState(() => ({
      rabbitMQEditorVisible,
      rabbitMQJob: rabbitMQJob || this.constructor.defaultProps.rabbitMQJob,
    }));
  };

  handleRabbitMQJob = (data) => {
    console.log(data);
  }

  toggleFilteringPanel = (e, expanded) => {
    this.setState(() => ({
      filteringPanel: expanded,
    }));
  };

  toggleLoggingPanel = (e, expanded) => {
    this.setState(() => ({
      loggingPanel: expanded,
    }));
  };

  toggleMailingPanel = (e, expanded) => {
    this.setState(() => ({
      mailingPanel: expanded,
    }));
  };

  render() {
    const { classes } = this.props;
    const {
      cronJob,
      guzzleEditorVisible,
      rabbitMQEditorVisible,
      guzzleJob,
      rabbitMQJob,
      submitting,
      filteringPanel,
      loggingPanel,
      mailingPanel,
      saveMessageVisible,
    } = this.state;
    const mutationJob = cronJob.id ? mutateCronJob : createCronJob;
    return (
      <React.Fragment>
        <Mutation mutation={mutationJob}>
          {mutation => (
            <Formik
              initialValues={cronJob}
              onSubmit={(values) => {
                this.setState(() => ({
                  submitting: true,
                }));
                this.handleMutation(mutation, values);
              }}
              render={({ values, handleChange, handleSubmit }) => (
                <React.Fragment>
                  {/* <DialogTitle id="responsive-dialog-title"> */}
                  <Typography variant="h4" gutterBottom>
                    {values.id ? `Edit job: ${values.name}` : 'Create job'}
                    <Typography variant="caption">
                      <a
                        href="https://github.com/jobbyphp/jobby"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Read Jobby docs
                      </a>
                    </Typography>
                  </Typography>
                  {/* </DialogTitle> */}
                  <Tooltip
                    title="Enable/Disable job"
                    aria-label="Add"
                    className={classes.enabledSwitch}
                  >
                    <Switch value="Enabled" checked />
                  </Tooltip>

                  <FormControl fullWidth={true}>
                    <TextField
                      id="name"
                      label="Name"
                      margin="normal"
                      autoFocus={true}
                      value={values.name}
                      onChange={handleChange}
                    />
                    <TextField
                      id="schedule"
                      label="Schedule"
                      margin="normal"
                      value={values.schedule}
                      onChange={handleChange}
                    />
                    <ExpansionPanel
                      expanded={filteringPanel}
                      className={classes.expansion}
                      onChange={this.toggleFilteringPanel}
                      style={{ marginTop: '25px' }}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Filtering</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <FormControl fullWidth={true}>
                          <TextField id="runAs" label="runAs" margin="normal" />
                          <FormHelperText>
                            Run as this user, if crontab user has sudo privileges
                          </FormHelperText>
                          <FormControlLabel control={<Switch value="debug" />} label="Debug" />
                          <FormHelperText>Send jobby internal messages to debug.log</FormHelperText>
                          <TextField id="Environment" label="Environment" margin="normal" />
                          <FormHelperText>Development environment for this job</FormHelperText>
                          <TextField id="runOnHost" label="runOnHost" margin="normal" />
                          <FormHelperText>Run jobs only on this hostname</FormHelperText>
                          <TextField
                            id="maxRuntime"
                            label="maxRuntime"
                            margin="normal"
                            type="number"
                            placeholder="0"
                          />
                          <FormHelperText>
                            Maximum execution time for this job (in seconds)
                          </FormHelperText>
                        </FormControl>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      expanded={loggingPanel}
                      className={classes.expansion}
                      onChange={this.toggleLoggingPanel}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Logging</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <FormControl fullWidth={true}>
                          <TextField id="output" label="Output" placeholder="/dev/null" />
                          <FormHelperText>Redirect stdout and stderr to this file</FormHelperText>
                          <TextField
                            id="output_stdout"
                            label="Output stdout"
                            margin="normal"
                            placeholder="/dev/null"
                          />
                          <FormHelperText>Redirect stdout to this file</FormHelperText>
                          <TextField
                            id="output_stderr"
                            label="Output stderr"
                            margin="normal"
                            placeholder="/dev/null"
                          />
                          <FormHelperText>Redirect stderr to this filee</FormHelperText>
                          <TextField
                            id="dateFormat"
                            label="DateFormat"
                            margin="normal"
                            placeholder="Y-m-d H:i:s"
                          />
                          <FormHelperText>Format for dates on jobby log messages</FormHelperText>
                        </FormControl>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel
                      expanded={mailingPanel}
                      className={classes.expansion}
                      onChange={this.toggleMailingPanel}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Mailing</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <FormControl fullWidth={true}>
                          <TextField id="recipients" label="Recipients" placeholder="" />
                          <FormHelperText>Comma-separated string of email addresses</FormHelperText>
                          <TextField
                            id="mailer"
                            label="Mailer"
                            margin="normal"
                            placeholder="sendmail"
                          />
                          <FormHelperText>Email method: sendmail or smtp or mail</FormHelperText>
                          <TextField
                            id="smtpHost"
                            label="SMTP Host"
                            margin="normal"
                            placeholder="null"
                          />
                          <FormHelperText>SMTP host, if mailer is smtp</FormHelperText>
                          <TextField
                            id="smtpPort"
                            label="SMTP Port"
                            margin="normal"
                            placeholder="25"
                            type="number"
                          />
                          <FormHelperText>SMTP port, if mailer is smtp</FormHelperText>
                          <TextField
                            id="smtpUsername"
                            label="SMTP Username"
                            margin="normal"
                            placeholder=""
                            type="number"
                          />
                          <FormHelperText>SMTP user, if mailer is smtp</FormHelperText>
                          <TextField
                            id="smtpPassword"
                            label="SMTP Password"
                            margin="normal"
                            placeholder=""
                          />
                          <FormHelperText>SMTP user, if mailer is smtp</FormHelperText>
                          <TextField
                            id="smtpSecurity"
                            label="SMTP Security"
                            margin="normal"
                            placeholder=""
                          />
                          <FormHelperText>
                            SMTP security option: ssl or tls, if mailer is smtp
                          </FormHelperText>
                          <TextField
                            id="smtpSender"
                            label="SMTP Sender"
                            margin="normal"
                            placeholder="jobby@<hostname>"
                          />
                          <FormHelperText>
                            The sender and from addresses used in SMTP notices
                          </FormHelperText>
                          <TextField
                            id="smtpSenderName"
                            label="SMTP Sender name"
                            margin="normal"
                            placeholder="Jobby"
                          />
                          <FormHelperText>
                            The name used in the from field for SMTP messages
                          </FormHelperText>
                        </FormControl>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Actions
                      toggleGuzzleEditor={this.handleToggleGuzzleEditor}
                      toggleRabbitMQEditor={this.handleToggleRabbitMQEditor}
                      cronJob={cronJob}
                      handleDeleteGuzzleJob={this.handleDeleteGuzzleJob}
                      handleDeleteRabbitMQJob={this.handleDeleteRabbitMQJob}
                    />
                    <GuzzleEditor
                      visible={guzzleEditorVisible}
                      toggleGuzzleEditor={this.handleToggleGuzzleEditor}
                      guzzleJob={guzzleJob}
                      handleGuzzleJob={this.handleGuzzleJob}
                    />
                    <RabbitMQEditor
                      visible={rabbitMQEditorVisible}
                      toggleRabbitMQEditor={this.handleToggleRabbitMQEditor}
                      rabbitMQJob={rabbitMQJob}
                      handleRabbitMQJob={this.handleRabbitMQJob}
                    />
                  </FormControl>
                  <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    className={classes.buttonRelative}
                    disabled={submitting}
                    fullWidth
                  >
                    Save
                    {submitting && (
                      <CircularProgress size={24} className={classes.buttonProgress} />
                    )}
                  </Button>
                </React.Fragment>
              )}
            />
          )}
        </Mutation>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={saveMessageVisible}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">To apply changes click save</span>}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(EditorForm));
