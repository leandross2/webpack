const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        liveReload: true,
        port: 3333
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.png$/,
                use: [
                    'file-loader?name=i/[hash].[ext]'
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new HtmlWebpackPlugin({
            title: 'Home',
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src', 'images', 'icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'public', 'images', 'sprite', 'sprite.png'),
                css: path.resolve(__dirname, 'src', 'scss', '_sprite.scss')
            },
            apiOptions: {
                cssImageRef: "http://localhost:3333/public/images/sprite/sprite.png"
            },
            spritesmithOptions: {
                padding: 10
            }
        })
    ]
}