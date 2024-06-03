module.exports = function override(config, env) {
  if (env === "development") {
    config.devServer = config.devServer || {};
    config.devServer.hot = false; // Disable HMR
  }
  return config;
};
