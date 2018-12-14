import React from 'react';
import PropTypes from 'prop-types';
import { Fab, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const styles = () => ({
  fab: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
  },
});

class FabStyled extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes } = this.props;
    return (
      <Fab className={classes.fab} color="primary">
        <AddIcon />
      </Fab>
    );
  }
}

export default withStyles(styles)(FabStyled);
