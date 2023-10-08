const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');

const config = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // clean: true, // This is not needed because we are using the CleanWebpackPlugin
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'images/test-images/*.*' },
            ],
        })
    ],
}

module.exports = config;