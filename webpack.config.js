const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        'autoprefixer-loader',
                        'sass-loader',
                    ]
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|png)$/,
                loader: 'url-loader?limit=100000'
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    );
    module.exports.plugins.push(
        new UglifyJSPlugin({uglifyOptions: { ecma: 8 }})
    );
}