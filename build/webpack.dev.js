const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',// --mode production
    watchOptions: {
        ignored: [/node_modules/],
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 //每秒询问的文件变更的次数
    },
    plugins: [
        new CleanWebpackPlugin() // 清空文件插件 默认会清空当前打包的目录
    ]
}