const styles = theme => ({
  paper: {
    width: '100%',
    padding: theme.spacing(3),
    '@media only screen and (max-width: 600px)': {
      padding: theme.spacing(1),
    },
    marginBottom: '15px',
  },
});

export default styles;
