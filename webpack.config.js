const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')
const resolve = dir => require('path').join(__dirname, dir)
const webpack = require('webpack')

const config = {
	mode: 'development',
	// entry: [path.join(__dirname,'/src/main.js'),path.join(__dirname,'/src/extra.js'),path.join(__dirname,'/src/haha.js')],
	entry: {
		// extra: path.join(__dirname,'/src/extra.js'),
		app:  path.join(__dirname,'/src/app.jsx'),
	},
	output:{
		path: path.join(__dirname,'/build'),
		filename: '[name].bundle.js',
		libraryTarget: 'umd',
		library: '[name]_kuroMi'
	},
	// 
	devtool: 'source-map',
	 module: {
		rules: [
		  {
			test: /\.css$/, // 正则匹配以.css结尾的文件
			use: ['style-loader', 'css-loader'],
		  },
		  {
			test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
			use: ['style-loader', 'css-loader', 'sass-loader']
		  },
		  {
			test: /\.(jsx?)|(tsx?)$/,
			use:{
				loader: 'babel-loader',
				options:{
					presets:[['@babel/preset-env',{targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead'}],['@babel/preset-react']]
				}
			}
		  },
		  {
		    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		    loader: 'url-loader',
		    options: {
				limit: 1000000,
				name: 'img/[name].[hash:7].[ext]'
			  },
		  },
		  {
		  	test: /\.wasm$/,
		  	type: "asset/inline",
		  },
		  {
		  	test: /\.vue$/,
		  	loader: "vue-loader",
		  },
		   {
			  test: /\.ts$/,
			  exclude: /node_modules/,
			  use: {
				loader: "ts-loader",
			  },
			}
		]
	 },
    resolve: {
		 alias: {
			  '@': resolve('src'), //配置src目录的别名
			},
        //配置可省略的文件扩展名
        extensions: [".tsx", ".ts", ".js", ".cjs", ".json"]
    },
	plugins: [
	  new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'index.html',
		inject: true,
		minify: {
		  removeComments: true,
		  collapseWhitespace: true,
		  removeAttributeQuotes: true
		}
	  }),
	  new CleanWebpackPlugin(),
	  new webpack.HotModuleReplacementPlugin()
	],
    optimization: {
	  splitChunks: {
		cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	externals:{
		'wasmer_wasi_js_bg.wasm': true,
		'wasmer_wasi_js_bg.wasm.cjs': true,
		'wasmer_wasi_js_bg.wasm.tsx': true,
		'wasmer_wasi_js_bg.wasm.ts': true,
		'wasmer_wasi_js_bg.wasm.json': true,
		'wasmer_wasi_js_bg.wasm.js': true
	}
}
const devserver = new WebpackDevServer({
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true, // 热更新
  host: '127.0.0.1', // 地址
  port: '8081', // 端口
  open: true, // 是否自动打开
  setupExitSignals: true,
  compress: true,
}, webpack(config))
devserver.start()

module.exports = config