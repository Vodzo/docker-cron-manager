import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  withMobileDialog,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './guzzleEditor.style';

class GuzzleEditor extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool,
    visible: PropTypes.bool,
    toggleGuzzleEditor: PropTypes.func,
  };

  handleClose = () => {
    this.props.toggleGuzzleEditor(false);
  };

  render() {
    const { fullScreen, visible } = this.props;
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
        <DialogTitle id="responsive-dialog-title">Guzzle job</DialogTitle>
        <DialogContent>
          <DialogContentText>sadasd</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(GuzzleEditor));
