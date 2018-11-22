const { injectBabelPlugin } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const args = process.argv.slice(2);

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    if (env === 'production') {
      config.devtool = false;
      if (args && args[0] === 'with-source-maps') {
        console.log('building with source maps');
        config.devtool = 'source-map';
      }
    }

    // rewire eslint
    config = rewireEslint(config, env);

    // rewire HtmlWebpackPlugin to append extra html variables
    for(var x in config.plugins) {
      if(config.plugins[x].constructor && config.plugins[x].constructor.name == 'HtmlWebpackPlugin') {
        const newOptions = config.plugins[x].options;
        // newOptions.favicon_suffix = (env === 'production' ? '' : '_dev');
        config.plugins.concat(new HtmlWebpackPlugin(newOptions));
      }
    }

    return config;
  },

  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      const fs = require('fs');

      // create .env file for example:
      // REACT_HTTPS_KEY="/path/to/key"
      // REACT_HTTPS_CERT="/path/to/cert"

      if(process.env.REACT_HTTPS_KEY && process.env.REACT_HTTPS_CERT) {
        config.https = {
          key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
          cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
        };
      }
      // Return your customised Webpack Development Server config.
      return config;
    }
  }
}