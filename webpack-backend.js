const path = require('path');
const buildPath = path.resolve(__dirname, 'build1/target');

module.exports = {
  target: "node",
  entry: {
    app: ["./node.js"]
  },
  output: {
    path: buildPath,
    filename: "bundle-back.js"
  }
};