const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {resolve} = require("@babel/core/lib/vendor/import-meta-resolve");

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        publicPath:"/"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ['file-loader']
            },
            {
                test: /\.(js|ts|jsx|tsx)$/, //m?jsx
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react", "@babel/preset-typescript"]
                    }
                }
            },
        ]
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserWebpackPlugin()],
    },
}