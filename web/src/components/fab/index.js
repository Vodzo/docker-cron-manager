import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const styles = () => ({
  fab: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
  },
});

class Fab extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes } = this.props;
    return (
      <Button variant="fab" className={classes.fab} color="primary">
        <AddIcon />
      </Button>
    );
  }
}

export default withStyles(styles)(Fab);
