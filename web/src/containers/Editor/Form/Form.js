import {
  DialogTitle,
  DialogContent,
  Tooltip,
  Switch,
  DialogContentText,
  FormControl,
  TextField,
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography,
  FormHelperText,
  FormControlLabel,
  withStyles,
  Button,
  DialogActions,
} from '@material-ui/core';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import Actions from '../Actions/index';
import GuzzleEditor from '../GuzzleEditor/GuzzleEditor';
import styles from '../editor.style';
import { mutateCronJob, createCronJob } from '../../../graphql/query/cronjob';

class EditorForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cronJob: PropTypes.object,
    guzzleJob: PropTypes.object,
  };

  static defaultProps = {
    cronJob: {
      name: '',
      schedule: '',
      guzzleJobs: {
        edges: [],
      },
    },
    guzzleJob: {
      name: '',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      cronJob: props.cronJob,
      guzzleEditorVisible: false,
      guzzleJob: props.guzzleJob,
    };
  }

  handleGuzzleMutations = (guzzleJobs) => {
    const guzzleJobIds = [];
    guzzleJobs.forEach((edge) => {
      const { node } = edge;
      console.log(node);
    });
    return guzzleJobIds;
  };

  handleMutation = (mutation, values) => {
    const cronJob = values;
    cronJob.clientMutationId = '';

    const guzzleJobs = this.handleGuzzleMutations(cronJob.guzzleJobs.edges);
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
    mutation(data);
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
        if (edge.node.id === guzzleJob.id || edge.node.queueId === guzzleJob.queueId) {
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

  render() {
    const { classes } = this.props;
    const { cronJob, guzzleEditorVisible, guzzleJob } = this.state;
    const mutationJob = cronJob.id ? mutateCronJob : createCronJob;
    return (
      <Mutation mutation={mutationJob}>
        {mutation => (
          <Formik
            initialValues={cronJob}
            onSubmit={(values) => {
              this.handleMutation(mutation, values);
              // MyImaginaryRestApiCall(user.id, values).then(
              //   (updatedUser) => {
              //     actions.setSubmitting(false);
              //     updateUser(updatedUser);
              //     onClose();
              //   },
              //   (error) => {
              //     actions.setSubmitting(false);
              //     actions.setErrors(transformMyRestApiErrorsToAnObject(error));
              //     actions.setStatus({ msg: 'Set some arbitrary status or data' });
              //   },
              // );
            }}
            render={({ values, handleChange, handleSubmit }) => (
              <React.Fragment>
                <DialogTitle id="responsive-dialog-title">
                  {values.id ? `Edit job: ${values.name}` : 'Create job'}
                </DialogTitle>
                <Tooltip
                  title="Enable/Disable job"
                  aria-label="Add"
                  className={classes.enabledSwitch}
                >
                  <Switch value="Enabled" checked />
                </Tooltip>
                <DialogContent>
                  <DialogContentText>
                    <a
                      href="https://github.com/jobbyphp/jobby"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Read Jobby docs
                    </a>
                  </DialogContentText>
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
                    <ExpansionPanel expanded={true} className={classes.expansion}>
                      <ExpansionPanelDetails className={classes.marginLess}>
                        <FormControl fullWidth={true}>
                          <Typography variant="h6" gutterBottom>
                            Filtering
                          </Typography>
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
                          <Typography variant="h6" style={{ marginTop: '40px' }}>
                            Logging
                          </Typography>
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
                          <Typography variant="h6" style={{ marginTop: '40px' }}>
                            Mailing
                          </Typography>
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
                      jobs={cronJob.guzzleJobs.edges}
                      handleDeleteGuzzleJob={this.handleDeleteGuzzleJob}
                    />
                    <GuzzleEditor
                      visible={guzzleEditorVisible}
                      toggleGuzzleEditor={this.handleToggleGuzzleEditor}
                      guzzleJob={guzzleJob}
                      handleGuzzleJob={this.handleGuzzleJob}
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubmit} color="primary" variant="contained">
                    Save
                  </Button>
                </DialogActions>
              </React.Fragment>
            )}
          />
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(EditorForm);
