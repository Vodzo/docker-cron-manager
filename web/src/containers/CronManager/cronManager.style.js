const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    '@media only screen and (max-width: 600px)': {
      padding: theme.spacing.unit,
    },
  },
  toolbar: theme.mixins.toolbar,
});

export default styles;
