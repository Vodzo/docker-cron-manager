import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Route, Link, Switch } from 'react-router-dom';

import List from '../List';
import styles from './cronManager.style';

import Fab from '../../components/fab';
import Editor from '../Editor';
import Cron from '../Cron/Cron';
import Header from '../Header';
import Drawer from '../Drawer';

class CronManager extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    search: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      editorOpen: false,
      editing: false,
    };
  }

  openNewEditor = () => {
    this.setState(() => ({
      editorOpen: true,
    }));
  };

  handleEditorClose = () => {
    this.setState(() => ({
      editorOpen: false,
    }));
  };

  render() {
    const { classes, search, menuOpen } = this.props;
    const { editorOpen, editing } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Header
          onMenuIconClick={this.props.toggleMenu}
          onSearch={this.props.handleSearch}
          onThemeChange={this.props.handleThemeChange}
        />
        <Drawer onClose={this.props.handleClose} menuOpen={menuOpen} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/" exact render={props => <List {...props} search={search} />} />
            <Route path="/new" exact component={Cron} />
            <Route path="/edit/:id" exact component={Cron} />
          </Switch>
          <Link to="/new">
            <Fab />
          </Link>
          <Editor visible={editorOpen} onClose={this.handleEditorClose} editing={editing} />
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withTheme()(CronManager));
