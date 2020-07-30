module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['electron-pos-printer'],
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
}
