import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  withMobileDialog,
  TextField,
  DialogContentText,
  FormControl,
  Switch,
  FormControlLabel,
  ExpansionPanelDetails,
  ExpansionPanel,
  withStyles,
  FormHelperText,
  Typography,
  Tooltip,
} from '@material-ui/core';
import styles from './editor.style';
import Actions from './Actions';
import GuzzleEditor from './GuzzleEditor/GuzzleEditor';

class Editor extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      advanced: false,
      openGuzzleEditor: false,
    };
  }

  handleClose = () => {
    this.props.onClose();
    this.setState(() => ({
      advanced: false,
    }));
  };

  toggleAdvanced = () => {
    this.setState(() => ({
      advanced: !this.state.advanced,
    }));
  };

  handleToggleGuzzleEditor = (state) => {
    this.setState(() => ({
      openGuzzleEditor: state,
    }));
  };

  handleToggleRabbitMQEditor = () => {};

  render() {
    const { fullScreen, visible: open, classes } = this.props;
    const { advanced, openGuzzleEditor } = this.state;
    return (
      <Dialog
        fullWidth={true}
        fullScreen={fullScreen}
        maxWidth="lg"
        open={open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <DialogTitle id="responsive-dialog-title">Create job</DialogTitle>
        <Tooltip title="Enable/Disable job" aria-label="Add" className={classes.enabledSwitch}>
          <Switch value="Enabled" checked />
        </Tooltip>

        <DialogContent>
          <DialogContentText>
            <a href="https://github.com/jobbyphp/jobby" rel="noopener noreferrer" target="_blank">
              Read Jobby docs
            </a>
          </DialogContentText>
          <FormControl fullWidth={true}>
            <TextField id="name" label="Name" margin="normal" autoFocus={true} />
            <TextField id="schedule" label="Schedule" margin="normal" />
            <ExpansionPanel expanded={advanced} className={classes.expansion}>
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
            <GuzzleEditor
              visible={openGuzzleEditor}
              toggleGuzzleEditor={this.handleToggleGuzzleEditor}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.toggleAdvanced}>
            Advanced
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(Editor));
