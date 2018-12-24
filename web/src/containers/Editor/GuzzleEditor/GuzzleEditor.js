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
import styles from './guzzleEditor.style';

class GuzzleEditor extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool,
    visible: PropTypes.bool,
    toggleGuzzleEditor: PropTypes.func,
    guzzleJob: PropTypes.object,
    handleGuzzleJob: PropTypes.func,
  };

  handleClose = () => {
    this.props.toggleGuzzleEditor(false);
  };

  render() {
    const {
      fullScreen, visible, guzzleJob, handleGuzzleJob,
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
          initialValues={guzzleJob}
          onSubmit={(values) => {
            handleGuzzleJob(values);
            this.handleClose();
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
              <DialogTitle id="responsive-dialog-title">Guzzle job</DialogTitle>
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

export default withMobileDialog()(withStyles(styles)(GuzzleEditor));
