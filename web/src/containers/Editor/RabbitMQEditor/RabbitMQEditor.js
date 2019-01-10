import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  withMobileDialog,
  withStyles,
  TextField,
  FormControl,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import AceEditor from 'react-ace';
import styles from './rabbitMQEditor.style';

class RabbitMQEditor extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool,
    visible: PropTypes.bool,
    toggleRabbitMQEditor: PropTypes.func,
    rabbitMQJob: PropTypes.object,
    handleRabbitMQJob: PropTypes.func,
    classes: PropTypes.object,
  };

  handleClose = () => {
    this.props.toggleRabbitMQEditor(false);
  };

  mapHandler = (newValue, formikChangeHandler) => {
    const event = {};
    event.target = {
      name: 'message',
      type: 'string',
      value: newValue,
    };
    formikChangeHandler(event);
  };

  render() {
    const {
      fullScreen, visible, rabbitMQJob, handleRabbitMQJob, classes,
    } = this.props;
    return (
      <Dialog
        fullWidth={true}
        fullScreen={fullScreen}
        maxWidth="lg"
        open={visible}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <Formik
          initialValues={rabbitMQJob}
          onSubmit={(values) => {
            handleRabbitMQJob(values);
            this.handleClose();
          }}
          render={({ values, handleChange, handleSubmit }) => (
            <React.Fragment>
              <DialogTitle id="responsive-dialog-title">RabbitMQ job</DialogTitle>
              <DialogContent>
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
                    id="host"
                    label="Host"
                    margin="normal"
                    value={values.host || ''}
                    onChange={handleChange}
                  />
                  <TextField
                    id="port"
                    label="Port"
                    type="number"
                    margin="normal"
                    value={values.port || ''}
                    onChange={handleChange}
                  />
                  <TextField
                    id="user"
                    label="Username"
                    margin="normal"
                    value={values.user || ''}
                    onChange={handleChange}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    margin="normal"
                    value={values.password || ''}
                    onChange={handleChange}
                  />
                  <TextField
                    id="vhost"
                    label="vhost"
                    margin="normal"
                    value={values.vhost || ''}
                    onChange={handleChange}
                  />
                  <Typography variant="h6">Queue options</Typography>
                  <FormControl fullWidth={true} className={classes.indent}>
                    <TextField
                      id="queueName"
                      label="Queue name"
                      margin="normal"
                      value={values.queueName || ''}
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="queuePassive"
                          checked={values.queuePassive}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Queue passive"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="queueDurable"
                          checked={values.queueDurable}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Queue durable"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="queueExclusive"
                          checked={values.queueExclusive}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Queue Exclusive"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="queueAutoDelete"
                          checked={values.queueAutoDelete}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Queue AutoDelete"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="queueNoWait"
                          checked={values.queueNoWait}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Queue NoWait"
                    />
                    <TextField
                      id="queueTicket"
                      label="Queue Ticket"
                      margin="normal"
                      type="number"
                      value={values.queueTicket || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Typography variant="h6">Exchange options</Typography>
                  <FormControl fullWidth={true} className={classes.indent}>
                    <TextField
                      id="exchangeName"
                      label="Exchange Name"
                      margin="normal"
                      value={values.exchangeName || ''}
                      onChange={handleChange}
                    />
                    <TextField
                      id="exchangeType"
                      label="Exchange Type"
                      margin="normal"
                      value={values.exchangeType || ''}
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="exchangePassive"
                          checked={values.exchangePassive}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Exchange passive"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="exchangeDurable"
                          checked={values.exchangeDurable}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Exchange durable"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="exchangeAutoDelete"
                          checked={values.exchangeAutoDelete}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Exchange AutoDelete"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="exchangeInternal"
                          checked={values.exchangeInternal}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Exchange Internal"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="exchangeNoWait"
                          checked={values.exchangeNoWait}
                          onChange={handleChange}
                          value={true}
                        />
                      }
                      label="Exchange NoWait"
                    />
                    <TextField
                      id="exchangeTicket"
                      label="Exchange Ticket"
                      margin="normal"
                      type="number"
                      value={values.exchangeTicket || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Typography variant="h6">Message</Typography>
                  <FormControl fullWidth={true} className={classes.indent}>
                    <AceEditor
                      id="message"
                      mode="json"
                      width="100%"
                      theme={localStorage.getItem('theme') === 'dark' ? 'solarized_dark' : 'github'}
                      name="message"
                      onChange={newValue => this.mapHandler(newValue, handleChange)}
                      fontSize={14}
                      showPrintMargin={false}
                      showGutter={true}
                      highlightActiveLine={true}
                      value={values.message || ''}
                      setOptions={{
                        showLineNumbers: true,
                        tabSize: 2,
                      }}
                    />
                    <TextField
                      id="routingKey"
                      label="Message routing key"
                      margin="normal"
                      value={values.routingKey || ''}
                      onChange={handleChange}
                    />
                  </FormControl>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                  {rabbitMQJob.id ? 'Update' : 'Add'}
                </Button>
              </DialogActions>
            </React.Fragment>
          )}
        />
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(RabbitMQEditor));
