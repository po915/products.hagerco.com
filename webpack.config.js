var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./src/index.jsx",
  plugins: [
    new webpack.EnvironmentPlugin( { ...process.env } )
  ],
  output: {
    path: __dirname + '/public',
    filename: "bundle.js",
    publicPath: '/public/'
  },
  module: {
    rules: [
        {
          // this is so that we can compile any React,
          // ES6 and above into normal ES5 syntax
          test: /\.(js|jsx)$/,
          // we do not want anything from node_modules to be compiled
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(css|scss)$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ['file-loader']
        }
      ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};