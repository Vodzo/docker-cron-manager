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
} from '@material-ui/core';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Mutation } from 'react-apollo';
import Actions from '../Actions/index';
import GuzzleEditor from '../GuzzleEditor/GuzzleEditor';
import styles from '../editor.style';
import { mutateCronJob } from '../../../graphql/query/cronjob';

class EditorForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cronJob: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      cronJob: props.cronJob,
    };
  }

  handleMutation = (updateCronJob) => {
    const { cronJob } = this.state;
    cronJob.clientMutationId = '';
    cronJob.name = 'reverted';
    updateCronJob({
      variables: {
        input: {
          id: cronJob.id,
          name: cronJob.name,
          clientMutationId: cronJob.clientMutationId,
        },
      },
    });
  };

  render() {
    const { classes } = this.props;
    // const { cronJob } = this.state;
    return (
      <React.Fragment>
        <DialogTitle id="responsive-dialog-title">Create job</DialogTitle>
        <Tooltip title="Enable/Disable job" aria-label="Add" className={classes.enabledSwitch}>
          <Switch value="Enabled" checked />
        </Tooltip>

        <Mutation mutation={mutateCronJob}>
          {updateCronJob => (
            <Button onClick={() => this.handleMutation(updateCronJob)}>test</Button>
          )}
        </Mutation>

        <DialogContent>
          <DialogContentText>
            <a href="https://github.com/jobbyphp/jobby" rel="noopener noreferrer" target="_blank">
              Read Jobby docs
            </a>
          </DialogContentText>
          <FormControl fullWidth={true}>
            <TextField id="name" label="Name" margin="normal" autoFocus={true} />
            <TextField id="schedule" label="Schedule" margin="normal" />
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
                  <FormHelperText>Maximum execution time for this job (in seconds)</FormHelperText>
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
                  <TextField id="mailer" label="Mailer" margin="normal" placeholder="sendmail" />
                  <FormHelperText>Email method: sendmail or smtp or mail</FormHelperText>
                  <TextField id="smtpHost" label="SMTP Host" margin="normal" placeholder="null" />
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
                  <FormHelperText>The name used in the from field for SMTP messages</FormHelperText>
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Actions
              toggleGuzzleEditor={this.handleToggleGuzzleEditor}
              toggleRabbitMQEditor={this.handleToggleRabbitMQEditor}
            />
            <GuzzleEditor visible={false} toggleGuzzleEditor={this.handleToggleGuzzleEditor} />
          </FormControl>
        </DialogContent>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EditorForm);
