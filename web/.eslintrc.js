module.exports = {
    extends: ['airbnb-base', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    settings: {
      react: {
        createClass: 'createReactClass', // Regex for Component Factory to use,
        // default to "createReactClass"
        pragma: 'React', // Pragma to use, default to "React"
        version: '16.4', // React version, default to the latest React stable release
      },
      // 'import/resolver': {
      //   node: {
      //     paths: ['./src'],
      //   },
      // },
    },
    globals: {
      process: false,
      __dirname: false,
      base: false,
      env: false,
      apiPrefix: false,
      describe: false,
      it: false,
      expect: false,
      document: true,
      window: true,
      localStorage: true,
      fetch: true,
      Headers: true,
      navigator: true,
    },
    rules: {
      'operator-linebreak': 0,
      'linebreak-style': 0,
      'no-console': 0,
      'import/no-extraneous-dependencies': 0,
      'import/extensions': 0,
      'guard-for-in': 0,
      'class-methods-use-this': 0,
    },
  };
  