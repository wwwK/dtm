// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  //build输出目录
  outputDir: 'dist',

  //静态资源目录（js, css, img）
  assetsDir: 'assets',

  //是否开启eslint
  lintOnSave: false,

  configureWebpack: {
    name: process.env.VUE_APP_TITLE || '数字孪生管理系统'
  },

  // 添加修改css样式配置
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // 插件
  pluginOptions: {
    // 样式资源加载器
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/styles/theme.less')]
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api/action': {
        target: 'http://192.168.111.26:8443',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
};
