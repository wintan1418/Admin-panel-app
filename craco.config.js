const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@layout-body-background': '#fff',
              '@primary-color': '#FE6D14',
              '@btn-border-radius-base': '50px',
              '@btn-primary-color': '#fff',
              '@input-height-base': '31px',
              '@input-border-color': '#dedbdb',
              '@input-bg': '#fff',
              '@icon-color': '@primary-color',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}

// modifyVars color variable guide
//https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
