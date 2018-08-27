const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

console.log(WEBPACK_ENV)
module.exports = {
  entry: './src/app.jsx',
  output: {
    //当前根目录（__dirname+dist）
    path: path.resolve(__dirname, 'dist'),
    publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//s.jianliwu.com/admin-ve-fe/dist/',
    filename: 'js/app.js'
  },
  //resolve 模块的处理方案
  resolve:{
    //alias 设置别名
    alias:{
        page:path.resolve(__dirname,'src/page'),
        component:path.resolve(__dirname,'src/component'),
        util:path.resolve(__dirname,'src/util'),
        service:path.resolve(__dirname,'src/service')
    }
  },
  module: {
    rules: [
             {
              test:/\.js$/,
              exclude:/(node_modules)/,
              loader: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                use: ['css-loader', 'sass-loader']
                })
            },
            {
              test: /\.(png|jpg|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                    name:'resource/[name].[ext]'
                  }
                }
              ]
            },
            {
              test: /\.(svg|eot|ttf|woff|woff2|otf)$/,
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  name:'resource/[name].[ext]'
              }
            }    
        ]
    
  },
  plugins: [
    new HtmlWebpackPlugin({
        template:'./src/index.html'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
        name:'common',
        filename:'js/base.js'
    })
  ],
  devServer: {
     port:8086,
     //404时返回index.html
     historyApiFallback:{
        index:'/dist/index.html'
     },
     //配置代理
     proxy:{
        '/manage':{
          target:'http://admintest.happymmall.com',
          changeOrigin:true
        },
        '/user/logout.do' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
        }
     }
  }
};