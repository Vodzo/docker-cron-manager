import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
  withMobileDialog,
} from '@material-ui/core';

class Editor extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  handleClose = () => {
    this.props.onClose();
  }

  render() {
    const { fullScreen } = this.props;
    const { visible: open } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(Editor);
