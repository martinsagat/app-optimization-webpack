const common = require('./webpack.common.config.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');
const glob = require('glob');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: 'js/[name].[contenthash:8].js'
    },
    mode: 'production',
    devtool: false, // to debug in prod use 'source-map'
    optimization: {
        minimize: true,
        minimizer: [
            '...', // This is the default minimizer
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['imagemin-mozjpeg', { quality: 40}],
                            ['imagemin-pngquant', {
                                quality: [0.65, 0.9],
                                speed: 4
                            }],
                            ['imagemin-gifsicle', { interlaced: true, optimizationLevel: 3}],
                            ['imagemin-svgo', {
                                plugins: [
                                    {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            removeViewBox: false,
                                            addAttributesToSVGElement: {
                                                params: {
                                                    attributes: [
                                                        { xmlns: 'http://www.w3.org/2000/svg' }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }]
                            }]
                        ]
                    }
                },
                generator: [
                    {
                        type: 'asset',
                        preset: 'webp-custom-name',
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ['imagemin-webp']
                        }
                    }
                ]
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64]',
                          }
                        },
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ],
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ],
            },
            {
                test: /\.(png|svg|jpg|gif|jpg|jpeg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: { // if file less than 4kb convert to base64
                        maxSize: 4 * 1024, // 4kb
                    },
                },
                generator: {
                    filename: 'images/[name].[contenthash:8][ext]',
                }
                
              }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                `${path.join(__dirname, '../src')}/**/*`,
                { nodir: true }
            )
        })
    ]
})
