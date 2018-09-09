import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    ReactDOM.render(<NextApp />, document.getElementById('root'));
  });
}

registerServiceWorker();
