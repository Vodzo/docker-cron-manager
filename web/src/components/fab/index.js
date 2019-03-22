import React from 'react';
import PropTypes from 'prop-types';
import { Fab, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class FabStyled extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes, ...props } = this.props;
    return (
      <Fab className={classes.fab} color="primary" {...props}>
        <AddIcon />
      </Fab>
    );
  }
}

export default withStyles(styles)(FabStyled);
