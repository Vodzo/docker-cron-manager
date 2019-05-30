const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    '@media only screen and (max-width: 600px)': {
      padding: theme.spacing(1),
    },
  },
  toolbar: theme.mixins.toolbar,
});

export default styles;
