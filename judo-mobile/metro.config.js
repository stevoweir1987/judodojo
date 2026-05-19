const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Allow bundling .pdf files as static assets
config.resolver.assetExts.push("pdf");

module.exports = config;
