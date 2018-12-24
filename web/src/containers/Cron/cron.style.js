const styles = theme => ({
  paper: {
    width: '100%',
    padding: theme.spacing.unit * 3,
    '@media only screen and (max-width: 600px)': {
      padding: theme.spacing.unit,
    },
  },
});

export default styles;
