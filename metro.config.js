// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add resolver for metro-cache FileStore
config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    './src/stores/FileStore': require.resolve('metro-cache/src/stores/FileStore')
};

// Also add resolver for TerminalReporter if needed
config.resolver.extraNodeModules['./src/lib/TerminalReporter'] =
    require.resolve('metro/src/lib/TerminalReporter');

module.exports = config;