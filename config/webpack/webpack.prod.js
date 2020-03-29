const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'production', // --mode production
    devtool: 'none',
    plugins: [
        new CleanWebpackPlugin(), // 清空文件插件 默认会清空当前打包的目录
        // new CopyPlugin([ // 拷贝插件
        //     // { 
        //     //     from: path.resolve(__dirname, '../public/a.json'), 
        //     //     to: path.resolve(__dirname, '../dist/a.json') }
        // ])
    ]
};