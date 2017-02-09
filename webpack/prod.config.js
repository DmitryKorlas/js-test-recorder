const path = require('path');
const webpack = require('webpack');
const customPath = path.join(__dirname, './customPublicPath');

// fix for windows OS. it can't work with relative paths
function fixPath(listPaths) {
    return listPaths.map(item => path.resolve(__dirname, item));
}

module.exports = {
    entry: {
        recorderApp: [customPath, path.join(__dirname, '../src/chrome/extension/recorderApp')],
        background: [customPath, path.join(__dirname, '../src/chrome/extension/background')],
        inject: [customPath, path.join(__dirname, '../src/chrome/extension/inject')]
    },
    output: {
        path: path.join(__dirname, '../build/js'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    resolve: {
        extensions: ['', '.js'],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: fixPath(['../node_modules/'])
            },
            {
                test: /\.scss/,
                include: fixPath(['../node_modules/materialize-css/', '../node_modules/mdi/']),
                loader: 'style!css?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap'
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)(\?[a-z0-9=\.]+)?$/,
                include: fixPath(['../node_modules/materialize-css', '../node_modules/mdi']),
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.css$/,
                include: fixPath(['../node_modules/highlight.js']),
                loaders: [
                    'style',
                    'css?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ]
            },
            {
                test: /\.p?css$/,
                exclude: fixPath(['../node_modules/highlight.js']),
                loaders: [
                    'style',
                    'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss'
                ]
            }
        ]
    },
    postcss: function () {
        return [require('precss')];
    }
};
