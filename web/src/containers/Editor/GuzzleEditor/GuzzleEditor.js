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
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import AceEditor from 'react-ace';
import styles from './guzzleEditor.style';

class GuzzleEditor extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool,
    visible: PropTypes.bool,
    toggleGuzzleEditor: PropTypes.func,
    guzzleJob: PropTypes.object,
    handleGuzzleJob: PropTypes.func,
    classes: PropTypes.object,
  };

  handleClose = () => {
    this.props.toggleGuzzleEditor(false);
  };

  mapHandler = (newValue, formikChangeHandler) => {
    const event = {};
    event.target = {
      name: 'options',
      type: 'string',
      value: newValue,
    };
    formikChangeHandler(event);
  };

  render() {
    const {
      fullScreen, visible, guzzleJob, handleGuzzleJob, classes,
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
                  <Typography variant="h6">Options</Typography>
                  <FormControl fullWidth={true} className={classes.indent}>
                    <AceEditor
                      id="options"
                      mode="json"
                      width="100%"
                      theme={
                        localStorage.getItem('theme') === 'light' ? 'github' : 'solarized_dark'
                      }
                      name="options"
                      onChange={newValue => this.mapHandler(newValue, handleChange)}
                      fontSize={14}
                      showPrintMargin={false}
                      showGutter={true}
                      highlightActiveLine={true}
                      value={values.options || ''}
                      setOptions={{
                        showLineNumbers: true,
                        tabSize: 2,
                      }}
                    />
                  </FormControl>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                  {guzzleJob.id ? 'Update' : 'Add'}
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
