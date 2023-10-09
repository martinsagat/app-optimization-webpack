const common = require('./webpack.common.config.js');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    output: {
        filename: 'bundle.js'
    },
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true,
        },
        client: {
            overlay: true,
        },
        liveReload: false,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[md4:hash:7]',
                          }
                        },
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ],
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
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
                    filename: 'images/[name][ext]',
                }
              }
        ]
    }
})