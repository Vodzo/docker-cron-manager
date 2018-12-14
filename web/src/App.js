import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, withTheme, createMuiTheme, MuiThemeProvider,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WbIncandescent from '@material-ui/icons/WbIncandescent';
import WbIncandescentOutlined from '@material-ui/icons/WbIncandescentOutlined';
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';
import './App.css';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ApolloProvider, Query } from 'react-apollo';
import cronstrue from 'cronstrue';
// import Loader from './components/loader';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from './components/fab';
import client from './graphql/client';
import queryCronJobs from './graphql/query/cronjobs';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  paper: {
    width: '100%',
  },
});

class App extends React.Component {
  state = {
    menuOpen: false,
    search: '',
    theme: 'light',
  };

  toggleMenu = () => {
    this.setState(() => ({
      menuOpen: !this.state.menuOpen,
    }));
  };

  handleClose = () => {
    this.setState(() => ({
      menuOpen: false,
    }));
  };

  handleSearch = (e) => {
    const { value } = e.target;
    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => {
      this.setState(() => ({
        search: value,
      }));
    }, 250);
  };

  toggleTheme = () => {
    this.setState(() => ({
      theme: this.state.theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    const { classes } = this.props;
    const { menuOpen, search, theme } = this.state;

    const MuiTheme = createMuiTheme({
      palette: {
        type: this.state.theme,
      },
    });

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon onClick={this.toggleMenu} />
              </IconButton>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                DCM - Docker Cron Manager
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={this.handleSearch}
                />
              </div>
              <div className={classes.grow} />
              <IconButton color="inherit" aria-label="Menu" onClick={this.toggleTheme}>
                {theme === 'light' ? <WbIncandescentOutlined /> : <WbIncandescent />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            // variant="permanent"
            open={menuOpen}
            onClose={this.handleClose}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map(text => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map(text => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={null} lg={2} />
              <Grid item xs={12} lg={8} style={{ textAlign: 'center' }}>
                <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                  <Typography variant="h6" gutterBottom>
                    CronJobs
                  </Typography>
                </div>
                <Query query={queryCronJobs} variables={{ search }}>
                  {({ loading, error, data }) => {
                    // if (loading) return <Loader type="line-scale-pulse-out-rapid" />;
                    if (loading) return <LinearProgress />;
                    if (error) return `Error! ${error.message}`;

                    return data.cronJobs.edges.length
                      ? data.cronJobs.edges.map(cronJob => (
                          <ExpansionPanel key={cronJob.node.id}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>
                                {cronJob.node.name} - {cronstrue.toString(cronJob.node.schedule)}
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>{cronJob.node.name}</Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                      ))
                      : 'No results';
                  }}
                </Query>
              </Grid>
            </Grid>
          </main>
          <Fab />
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTheme()(App));
