const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')


const optimization = () => ({
  splitChunks: {
    chunks: 'all', 
  },
  minimizer: [
    new CssMinimizerWebpackPlugin(), 
    new TerserPlugin() 
  ]
});

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  target: 'web',
  devServer: {
    port: 4200,
    hot: false
  },

  optimization: optimization(),


  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new EslintWebpackPlugin({
      extensions: ['js'],
      fix: true 
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]',
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'less-loader', 
        ],
      },
      {
        test: /\.s[ac]ss$/, 
        use: [
          {
            loader: MiniCssExtractPlugin.loader, 
            options: {
              publicPath: '',
            },
          },
          'css-loader', 
          'sass-loader' 
        ],
      },

      {
        test: /\.ts$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        }
      },

      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] 
          }
        }
      },

    ]
  }
}
