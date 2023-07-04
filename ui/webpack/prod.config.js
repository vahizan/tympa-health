/* eslint-disable @typescript-eslint/no-var-requires,no-undef */

const path = require('path');
const dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CommonConfig = require('./common.config');

const prodConfig = () => {
    return merge(CommonConfig, {
        output: {
            path: path.resolve('./build/web/public'),
            publicPath: '/',
            filename: '[name].bundle.[chunkHash].js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(sa|sc)ss$/,
                    exclude: /main.scss/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 2
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /main.scss/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader'
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        performance: {
            hints: false
        },
        devServer: {
            port: 3000
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        output: {
                            ascii_only: true,
                            comments: false
                        }
                    }
                })
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contentHash].css',
                chunkFilename: '[id].[hash].css',
                chunks: 'all'
            })
        ],
        mode: 'production'
    });
};

module.exports = prodConfig();
