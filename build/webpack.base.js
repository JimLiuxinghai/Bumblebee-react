const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgeCssExtractPlugin = require('purgecss-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.join(ROOT_PATH, '../public/static');
const VIEW_PATH = path.join(ROOT_PATH, '/src/views');
const INDEX_PATH = path.resolve(SRC_PATH);
const BUILD_PATH = path.join(ROOT_PATH, '/build/static/');
const MODULES_PATH = path.join(ROOT_PATH, '/node_modules/');

const resolve = (...filename) => {
    return path.resolve(...filename);
};
// 命令行的参数
module.exports = (env) => {
    const isDev = env.development;

    const baseConfig = {
        entry: {
            main: resolve(__dirname, '../public/static/main.tsx')
        },
        output: {
            path: resolve(__dirname, '../', 'dist/static'),
            filename: 'js/[name].[chunkhash:8].js'
            //pathinfo: false
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, '../public/static'),
                '~': resolve(__dirname, '../node_modules'),
                Components: resolve(__dirname, '../public/static', './components'),
                Libs: path.resolve(__dirname, '../public/static', './assets/libs')
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.less']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: resolve(__dirname, '../public/views/index.html'),
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
                paths: glob.sync(`public/**/*`, {
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
                    loader: 'ts-loader',
                    //babel-plugin-import 可以实现antd按需加载，所以它要和babel-loader配合使用
                    //ts-loader
                    options: {
                        transpileOnly: true, //只转译，不检查
                        getCustomTransformers: () => ({
                            //获取或者说定义自定义的转换器
                            before: [
                                tsImportPluginFactory({
                                    libraryName: 'antd', //对哪个模块进行按需加载
                                    libraryDirectory: 'es', //按需加载的模块，如果实现按需加载，必须是ES Modules
                                    style: 'css' //自动引入它对应的CSS
                                })
                            ]
                        }),
                        compilerOptions: {
                            module: 'es2015'
                        }
                    }
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
                    exclude: path.resolve(__dirname, '../public/static/assets'),
                    use: [
                        'style-loader',
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: "[local]_[hash:base64:5]"
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        },
                        'less-loader'
                    ]
                    // exclude: /node_modules/
                },
                {
                    test: /\.(less|css)$/,
                    include: [path.resolve(__dirname, '../public/static/assets')],
                    exclude: path.resolve(__dirname, '../public/static', './components'),
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                },
                {
                    test: /\.(jpg|png|gif|svg|jpeg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: './assets/[name].[hash:7].[ext]',
                            esModule: false
                        }
                    }
                }
            ]
        }
    };
    // mergeOptions
    return isDev ? merge(baseConfig, devConfig) : merge(baseConfig, prodConfig);
};
