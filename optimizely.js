const optimizelySDK = require('@optimizely/optimizely-sdk');

optimizelySDK.setLogLevel('info');
optimizelySDK.setLogger(optimizelySDK.logging.createLogger())

const optimizelyClientInstance = optimizelySDK.createInstance({
  sdkKey: 'K3H8WDB1b67tUfmz3yqmh',
  datafileOptions: {
    autoUpdate: true,
    updateInterval: 1000,  // 1 second in milliseconds
  },
});


module.exports = optimizelyClientInstance;