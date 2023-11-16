const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: { import: true },
          },
          // { loader: MiniCssExtractPlugin.loader },
          // {
          //   loader: "css-loader",
          //   options: { import: true },
          // },
          // "style-loader",
          // "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],

  // additional settings
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
