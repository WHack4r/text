const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 打包生成map文件
  productionSourceMap:false,
  // 默认打开浏览器
  devServer:{
    // 运行自动打开浏览器
    open: true,
    host: 'localhost',
    port: 8080,

    // 代理跨域
    proxy: {
      '/api': {
        target: ' http://gmall-h5-api.atguigu.cn',
        ws: true,
        changeOrigin: true
      },
    }
  },
  // 关闭eslint
  lintOnSave: false,
})
