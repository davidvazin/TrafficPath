var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app.module.ts",
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.ts?$/,
        use: [
          "ts-loader",
          "tslint-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8000 // Convert images < 8kb to base64 strings
          }
        }]
      },
      {
        test: /\.json$/,
        use: ["json-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "css", "less", ".json"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "."),
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};