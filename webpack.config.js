const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx$)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: ['css-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'file-loader?name=[name].[ext]',
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
};
