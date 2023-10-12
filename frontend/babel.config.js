module.exports = (api) => {
  // Check if we are in test mode
  if (api.env('test')) {
    return {
      "presets": ["next/babel", "@babel/preset-react"]
    };
  }
  return {};
};