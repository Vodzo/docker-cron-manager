import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
  Dialog,
  LinearProgress,
} from '@material-ui/core';
import AceEditor from 'react-ace';
import { Query } from 'react-apollo';
import { queryLogJobFull } from '../../graphql/query/log';

class LogViewer extends React.Component {
  static propTypes = {
    fullScreen: PropTypes.bool,
    handleLogViewerClose: PropTypes.func,
    selectedLog: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  };

  render() {
    const { fullScreen, handleLogViewerClose, selectedLog } = this.props;
    const open = !!selectedLog;
    return (
      <Dialog
        fullWidth={true}
        fullScreen={fullScreen}
        maxWidth="lg"
        open={open}
        onClose={handleLogViewerClose}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <DialogTitle id="responsive-dialog-title">Log viewer</DialogTitle>
        <DialogContent>
          <Query
            query={queryLogJobFull}
            variables={{ id: `/api/logs/${selectedLog}` }}
            fetchPolicy="network-only"
          >
            {(queryLogJobProps) => {
              if (queryLogJobProps.loading) return <LinearProgress />;
              if (queryLogJobProps.error) return `Error! ${queryLogJobProps.error.message}`;

              return (
                <AceEditor
                  mode="text"
                  width="100%"
                  wrapEnabled={true}
                  theme={localStorage.getItem('theme') === 'light' ? 'github' : 'solarized_dark'}
                  fontSize={14}
                  showPrintMargin={false}
                  showGutter={true}
                  highlightActiveLine={false}
                  value={queryLogJobProps.data.log.fullLog}
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                    readOnly: true,
                  }}
                />
              );
            }}
          </Query>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogViewerClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(LogViewer);
