const styles = theme => ({
  expansion: {
    // border: '0px',
    // boxShadow: 'none',
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  marginLess: {
    padding: '0px',
    margin: '0px',
  },
  enabledSwitch: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  buttonRelative: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export default styles;
