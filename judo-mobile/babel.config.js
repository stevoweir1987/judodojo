module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // SDK 54: reanimated 4 split its babel plugin into react-native-worklets.
    // This MUST be listed last.
    plugins: ["react-native-worklets/plugin"],
  };
};
