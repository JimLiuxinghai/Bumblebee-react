const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgeCssExtractPlugin = require('purgecss-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const SMP = new SpeedMeasurePlugin();
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const os = require('os');
const ROOT_PATH = path.resolve(__dirname, '../../');
const SRC_PATH = path.join(ROOT_PATH, 'public/static');
const SRC_VIEW_PATH = path.join(ROOT_PATH, 'public/views');
const DIST_PATH = path.join(ROOT_PATH, 'dist/static');

const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const resolve = (...filename) => {
    return path.resolve(...filename);
};

// 命令行的参数
module.exports = (env) => {
    const isDev = env.development;

    const baseConfig = {
        entry: {
            main: resolve(SRC_PATH, 'main.tsx')
        },
        output: {
            path: DIST_PATH,
            filename: 'js/[name].[chunkhash:8].js'
            //pathinfo: false
        },
        resolve: {
            alias: {
                '@': SRC_PATH,
                '@components': resolve(SRC_PATH, 'components'),
                '@language': resolve(SRC_PATH, 'language'),
                '~': resolve(ROOT_PATH, 'node_modules')
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.less']
        },
        plugins: [
            new HappyPack({
                id: 'babel',
                loaders: [{
                    loader: 'babel-loader?cacheDirectory'
                }],
                threadPool: happyThreadPool
            }),
            new HtmlWebpackPlugin({
                template: resolve(SRC_VIEW_PATH, 'index.html'),
                filename: 'index.html',
                hash: true,
                minify: !isDev
                    ? {
                        // 是否压缩
                        removeAttributeQuotes: true,
                        collapseWhitespace: true
                    }
                    : false,
                chunksSortMode: 'manual', // 手动排序
                chunks: ['main'] // 需要引入的代码块
                // excludeChunks:['main'] // 排除某个模块
            }),

            new PurgeCssExtractPlugin({
                paths: glob.sync(path.join(SRC_PATH, '*/*/*.html'), {
                    nodir: true
                })
            }),
            new webpack.ProvidePlugin({
                React: 'react'
            })
        ],
        module: {
            rules: [
                // 默认loader的执行顺序是 右边往左边 从下到上
                // {
                //     test: /\.js$/,
                //     use: 'eslint-loader', // eslint 默认可以使用eslint --init来生成配置文件
                //     exclude: /node_modules/,
                //     enforce: 'pre', // 强制在所有js的loader之前执行
                // },
                {
                    test: /\.(j|t)sx?$/,
                    include: SRC_PATH,
                    use: ['happypack/loader?id=babel']
                    
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 0 }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: resolve(SRC_PATH, 'assets'),
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 0,
                                modules: {
                                    localIdentName: '[local]_[hash:base64:5]'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    include: [resolve(SRC_PATH, 'assets')],
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 0
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            //1024 == 1kb  
                            //小于10kb时打包成base64编码的图片否则单独打包成图片
                            limit: 10240,
                            name: path.join('./assets/[name].[hash:7].[ext]'),
                            esModule: false
                        }
                    }]
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: path.join('./assets/font/[name].[hash:7].[ext]')
                        }
                    }]
                }
            ]
        }
    };
    // mergeOptions
    const mergeConfigs = isDev ? merge(baseConfig, devConfig) : merge(baseConfig, prodConfig);
    return SMP.wrap(mergeConfigs);
};
