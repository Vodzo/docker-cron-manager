import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';
import Header from './containers/Header';
import Drawer from './containers/Drawer';
import CronManager from './containers/CronManager';

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

  handleSearch = (search) => {
    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => {
      this.setState(() => ({
        search,
      }));
    }, 250);
  };

  handleThemeChange = () => {
    this.setState(() => ({
      theme: this.state.theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    const { search, menuOpen } = this.state;

    const MuiTheme = createMuiTheme({
      palette: {
        type: this.state.theme,
        primary: {
          main: this.state.theme === 'light' ? '#3f51b5' : '#3f95df',
        },
      },
    });

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Header
            onMenuIconClick={this.toggleMenu}
            onSearch={this.handleSearch}
            onThemeChange={this.handleThemeChange}
          />
          <Drawer onClose={this.handleClose} menuOpen={menuOpen} />
          <CronManager search={search} />
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
