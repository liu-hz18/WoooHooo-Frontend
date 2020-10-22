//vue.config.js 注意是在根目录下
module.exports = {
  pluginOptions: {
      proxy: {
          enabled: true,
          context: '/api',
          options: {
              target: 'https://wooohooo-backend-wooohooo.app.secoder.net/api',
              changeOrigin: true,
              ws:true,                                            //websocket
              pathRewrite:{
                  '^/api':''
              }
          }
      }
  }
}
