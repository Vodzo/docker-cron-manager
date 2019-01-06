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
import styles from './rabbitMQEditor.style';

class RabbitMQEditor extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool,
    visible: PropTypes.bool,
    toggleRabbitMQEditor: PropTypes.func,
    rabbitMQJob: PropTypes.object,
    handleRabbitMQJob: PropTypes.func,
  };

  handleClose = () => {
    this.props.toggleRabbitMQEditor(false);
  };

  render() {
    const {
      fullScreen, visible, rabbitMQJob, handleRabbitMQJob,
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
                    value={values.host}
                    onChange={handleChange}
                  />
                  <TextField
                    id="port"
                    label="Port"
                    type="number"
                    margin="normal"
                    value={values.port}
                    onChange={handleChange}
                  />
                  <TextField
                    id="user"
                    label="Username"
                    margin="normal"
                    value={values.user}
                    onChange={handleChange}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    margin="normal"
                    value={values.password}
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
                    value={values.queueTicket}
                    onChange={handleChange}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit} color="primary">
                  Save
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
