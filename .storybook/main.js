const path = require('path');

module.exports = {
  "stories": [
    "../stories/index.js",
    "../src/**/*.stories.js"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  "webpackFinal": async (config) => {
    // Add src and stories directories to the module resolution path
    config.resolve.modules.push(path.resolve(__dirname, "../src"));
    config.resolve.modules.push(path.resolve(__dirname, "../stories"));

    // Find the rule that handles babel-loader and add the stories directory
    const babelLoaderRule = config.module.rules.find(rule => 
      rule.oneOf?.find(oneOfRule => 
        oneOfRule.loader?.includes('babel-loader')
      )
    );
    if (babelLoaderRule) {
      const oneOfBabelRule = babelLoaderRule.oneOf.find(oneOfRule => 
        oneOfRule.loader?.includes('babel-loader')
      );
      if (oneOfBabelRule.include) {
        oneOfBabelRule.include.push(path.resolve(__dirname, '../stories'));
      }
    }

    return config;
  }
}
