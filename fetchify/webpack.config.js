const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: '/'
  },
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,

  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template:  path.resolve(__dirname, "./public/index.html"),
      filename: "./index.html",
    })
  ]
};