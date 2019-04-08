import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { version } from './package.json';

const dev = process.env.NODE_ENV !== 'production';

/* PATHS */
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const bowerModulesPath = path.resolve(__dirname, 'bower_components');
const buildPath = path.resolve(__dirname, 'build/target');


const extractStyle = new ExtractTextPlugin({
    filename: 'style/default.css'
});

export default new Promise(async resolve => {
    let currentCommit = null;
    try {
        currentCommit = false;
    } catch (error) {}

    const copyPlugin = [{
        from: 'src/index.html',
        transform: (content) => content.toString()
            .replace(/<!-- %%version%% -->/ig, `${version}_${new Date().getTime()}`)
            .replace(/<!-- %%versionHTML%% -->/ig, `<strong>${version}</strong> - ${Date().toLocaleString()}`)
            .replace(/<!-- %%commit%% -->/ig, currentCommit ? currentCommit.latest.hash : 'no-commit')
    }, {
        context: path.resolve(__dirname, 'src', 'img'),
        from: '**/*',
        to: path.join(buildPath, 'img')
    }, {
        context: path.resolve(__dirname, 'src', 'resources'),
        from: '**/*',
        to: path.join(buildPath, 'resources')
    }];

    resolve({
        context: path.join(__dirname),
        devtool: dev ? '#source-map' : false,
        entry: {
            main: ['babel-polyfill', 'whatwg-fetch', './src/index.js']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    enforce: 'pre',
                    loader: 'source-map-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: [nodeModulesPath, bowerModulesPath],
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                    })
                },
                {
                    test: /\.(gif|jpg|png|ico|eot|ttf)$/,
                        use: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]',
                                publicPath: '../'
                            }
                    }
                }
                /*,{   test: /\.svg|woff|woff2|$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'url-loader'
                    }) 
                }*/
            ]
        },
        output: {
            path: buildPath,
            publicPath: '/',
            // Make sure to use [name] or [id] in output.filename
            //  when using multiple entry points
            filename: '[name].bundle.js',
            chunkFilename: '[id].bundle_[chunkhash].js',
            sourceMapFilename: '[file].map'
        },
        plugins: dev
            ? [
                new CopyWebpackPlugin(copyPlugin),
                extractStyle,
                new webpack.HotModuleReplacementPlugin()
            ]
            : [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('production')
                    }
                }),
                new webpack.optimize.UglifyJsPlugin({
                    uglifyOptions:{
                        ecma:5 
                    },
                    mangle: false
                }),
                new CopyWebpackPlugin(copyPlugin),
                extractStyle
            ],
        externals: {
            //https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md#react-15-compatibility
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        }
    });
});
