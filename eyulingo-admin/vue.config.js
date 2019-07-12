module.exports = {
    publicPath:'/',
    devServer: {
        
        host: 'localhost',
        
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/': {//请求称号
        //     target: 'http://localhost:8081', //请求的接口
        //     changeOrigin: true//允许跨域
        //     
        //     }
        // },
        before: app => {}
    },

}