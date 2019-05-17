import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.babel';


webpackConfig.then(config => {
    config.entry.main.unshift('webpack-dev-server/client?http://localhost/', 'webpack/hot/dev-server');
    const compiler = webpack(config);
    const websiteProxyConfig = {
            target: 'http://localhost:8091/',
            secure: false
        };

    new WebpackDevServer(compiler, {
        contentBase: 'build/target',
        hot: true,
        inline: true,
        filename: 'main.bundle.js',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: {colors: true},
        setup: (app) => {
            
        },
        proxy: {
             '/':{...websiteProxyConfig},
            },
    }).listen(8085, '0.0.0.0');
});