import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import client from './graphql/client';
import CronManager from './containers/CronManager';
import 'brace/mode/json';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';

const basename = process.env.PUBLIC_URL;

class App extends React.Component {
  state = {
    menuOpen: false,
    search: '',
    theme: localStorage.getItem('theme') || 'light',
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
    }), () => {
      localStorage.setItem('theme', this.state.theme);
    });
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
      typography: {
        useNextVariants: true,
      },
    });

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <ApolloProvider client={client}>
          <Router basename={basename}>
            <Switch>
              <Route
                path="/"
                render={props => (
                  <CronManager
                    {...props}
                    search={search}
                    menuOpen={menuOpen}
                    handleThemeChange={this.handleThemeChange}
                    handleSearch={this.handleSearch}
                    toggleMenu={this.toggleMenu}
                    handleClose={this.handleClose}
                  />
                )}
              />
            </Switch>
          </Router>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
