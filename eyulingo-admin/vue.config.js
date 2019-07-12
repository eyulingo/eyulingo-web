module.exports = {
    publicPath:'./',
    devServer: {
        
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    }
}