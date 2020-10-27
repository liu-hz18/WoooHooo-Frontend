//vue.config.js 注意是在根目录下
module.exports = {
  pluginOptions: {
      proxy: {
          enabled: true,
          context: '/api',
          options: {
              target: 'https://wooohooo-backend-wooohooo.app.secoder.net/api',
              //target:'http://127.0.0.1:8000/api',
              changeOrigin: true,
              ws:true,                                            //websocket
              pathRewrite:{
                  '^/api':''
              }
          }
      }
  }
}
//配置跟2.x差不多就不一一写注释了
