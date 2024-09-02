const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')


const optimization = () => ({
  splitChunks: {
    chunks: 'all', // Оптимізація загального коду для всіх типів чанків
  },
  minimizer: [
    new CssMinimizerWebpackPlugin(), // Мінімізація CSS файлів
    new TerserPlugin() // Мінімізація JS файлів
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
      extensions: ['js'], // Визначаємо розширення файлів для перевірки
      fix: true // Вмикаємо автоматичне виправлення помилок
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
          'less-loader', // Додаємо 'less-loader' для обробки .less файлів
        ],
      },
      {
        test: /\.s[ac]ss$/, // Регулярний вираз, що відповідає і .sass, і .scss файлам
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // Витягує CSS у окремі файли
            options: {
              publicPath: '',
            },
          },
          'css-loader', // Обробляє CSS
          'sass-loader' // Компілює Sass/SCSS у CSS
        ],
      },

      {
        test: /\.ts$/, // Вказуємо, що файл з розширенням .ts повинен бути оброблений
        exclude: /node_modules/, // Виключаємо директорію node_modules з обробки
        use: {
          loader: 'babel-loader', // Використовуємо babel-loader для компіляції
          options: {
            presets: [
              '@babel/preset-env', // Перетворення ES6+ у сумісний код JavaScript
              '@babel/preset-typescript' // Додавання підтримки TypeScript
            ]
          }
        }
      },

      {
        test: /\.js$/, // Відповідає усім .js файлам
        exclude: /node_modules/, // Виключає папку node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // Використовує preset-env для транспіляції сучасного JS
          }
        }
      },

    ]
  }
}