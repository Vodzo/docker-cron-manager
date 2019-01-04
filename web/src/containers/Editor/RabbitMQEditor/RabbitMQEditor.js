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
                    id="method"
                    label="Method"
                    margin="normal"
                    value={values.method}
                    onChange={handleChange}
                  />
                  <TextField
                    id="url"
                    label="Url"
                    margin="normal"
                    value={values.url}
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
