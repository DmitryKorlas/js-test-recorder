const path = require('path');
const webpack = require('webpack');

const host = 'localhost';
const port = 3008;
const customPath = path.join(__dirname, './customPublicPath');
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true';

// fix for windows OS. it can't work with relative paths
function fixPath(listPaths) {
    return listPaths.map(item => path.resolve(__dirname, item));
}

const baseDevConfig = () => ({
    devtool: 'eval-cheap-module-source-map',
    entry: {
        recorderApp: [customPath, hotScript, path.join(__dirname, '../src/chrome/extension/recorderApp')],
        background: [customPath, hotScript, path.join(__dirname, '../src/chrome/extension/background')],
    },
    devMiddleware: {
        publicPath: `http://${host}:${port}/js`,
        stats: {
            colors: true
        },
        noInfo: true
    },
    hotMiddleware: {
        path: '/js/__webpack_hmr'
    },
    output: {
        path: path.join(__dirname, '../dev/js'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
        new webpack.DefinePlugin({
            __HOST__: `'${host}'`,
            __PORT__: port,
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['react-hmre']
            }
        },
            {
                test: /(\.css|\.scss)$/,
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
});

const injectPageConfig = baseDevConfig();
injectPageConfig.entry = [
    customPath,
    path.join(__dirname, '../src/chrome/extension/inject')
];
delete injectPageConfig.hotMiddleware;
delete injectPageConfig.module.loaders[0].query;
injectPageConfig.plugins.shift(); // remove HotModuleReplacementPlugin
injectPageConfig.output = {
    path: path.join(__dirname, '../dev/js'),
    filename: 'inject.bundle.js',
};
const appConfig = baseDevConfig();

module.exports = [
    injectPageConfig,
    appConfig
];
