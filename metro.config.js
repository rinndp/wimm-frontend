// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add resolver for metro-cache FileStore
config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    './src/stores/FileStore': require.resolve('metro-cache/src/stores/FileStore')
};

module.exports = config;