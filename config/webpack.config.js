const getPerfPlugins = require("./webpack/performance.config").getPerfPlugins;
require("babel-polyfill");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const PATHS = {
	app: path.join(__dirname, ".."),
	// build: path.join(__dirname, "..", "..", "..", "..", "target", "classes", "META-INF", "resources")
	build: path.join(__dirname, "..", "dist")
};

function getPlugins(env) {
	return env.performance ? getPerfPlugins() : [];
}

function getConfigByEnv(env) {
	const additionalPlugins = getPlugins(env);
	return {
		additionalPlugins
	};
}

module.exports = function (env = {}) {
	const { additionalPlugins } = getConfigByEnv(env);

	return {
		resolve: {
			extensions: [" ", ".js", ".jsx"]
		},
		context: PATHS.app,
		entry: {
		//	index: ["babel-polyfill",  "./ts/index.jsx", "eventsource-polyfill", "webpack-hot-middleware/client?reload=true"]
		//	index: ["babel-polyfill",  "eventsource-polyfill", "webpack-hot-middleware/client?https://a302-0168-9626.she.pwj.com:8080", "webpack/hot/dev-server", "./ts/index.jsx"]
		//  index: ["babel-polyfill", "webpack/hot/dev-server", "./ts/index.jsx"]
		 index: ["babel-polyfill", "webpack/hot/dev-server","./ts/index.jsx"]
		},
		output: {
			path: PATHS.build,
			filename: "[name].js",
			publicPath: "./"
		},
		devtool: "cheap-module-source-map",
		devServer: {
			hot: true,
			port: 8080,
			filename: "[name].js",
			inline: true,
			historyApiFallback: true,
			// proxy: {
			// 	"/**": {
			// 		target: "https://a302-0168-9626.she.pwj.com:8080",
			// 		secure: false
			// 	}
			// },
			publicPath: "/"
		},
		module: {
			rules: [
				{
					test: /\.js|jsx?$/,
			        loader: 'babel-loader',
			        exclude: /node_modules/,
			        query: {
			          presets: ['@babel/preset-env', '@babel/react',{'plugins': ['@babel/plugin-proposal-class-properties']}]
			        }
				},
				{
			        test: /\.json$/,
			        exclude: '/node_modules/',
			        loader: 'json-loader'
			    },
				{
					test: /\.less$/,
					use: ["style-loader", "css-loader", "less-loader"]
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"]
				},
				{
				    test: /\.html$/,
				    exclude: [/node_modules/],
				    use: {
				        loader: 'file-loader',
				        query: {
				            name: '[name].[ext]'
				        },
				    },
				},
				{
					test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)/,
					exclude: /^node_modules$/,
					use: {
						loader: "file-loader?limit=20000&name=[name].[ext]"
					}
				}
			]
		},
		optimization: {
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			
			new webpack.ProvidePlugin({
				"Promise": "es6-promise",
				"fetch": "exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd"
				//"fetch": "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
			}),
			...additionalPlugins
		]
	};
};