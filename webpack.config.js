const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const { resolve } = require('@babel/core/lib/vendor/import-meta-resolve');

const isDev = process.env.NODE_ENV !== 'production';
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const ESLintOptions = {
    extensions: [`js`, `jsx`, `ts`, `tsx`],
    exclude: [`/node_modules/`, `/bower_components/`],
    failOnError: false,
};

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            // minify: {
            //   collapseWhitespace: isProd
            // }
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //   patterns: [
        //     {
        //        from: path.resolve(__dirname, 'src/assets/seo.json'),
        //        to: path.resolve(__dirname, 'dist')
        //     },
        //   ],
        // }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ];

    if (isDev) {
        base.push(new ESLintPlugin(ESLintOptions));
    } else {
        base.push(new BundleAnalyzerPlugin());
    }

    return base;
};
const cssLoaders = (extra) => {
    const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};
const babelOptions = (preset) => {
    const opts = {
        presets: ['@babel/preset-env'],
        // plugins: [
        //   '@babel/plugin-proposal-class-properties'
        // ]
    };

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
};

const jsLoaders = (babelPreset) => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions(babelPreset),
        },
    ];

    return loaders;
};

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };

    if (!isDev) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ];
    }

    return config;
};

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: ['@babel/polyfill', './index.ts'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
        //    publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: optimization(),
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    devtool: isDev ? 'eval-source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
                //       use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                //        use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            },
            {
                test: /\.csv$/,
                use: ['csv-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: jsLoaders('@babel/preset-typescript'),
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: jsLoaders('@babel/preset-react'),
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: jsLoaders(
                    `'@babel/preset-react','@babel/preset-typescript'`
                ),
            },
        ],
    },
};
