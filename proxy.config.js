const proxyConfig = [
  {
    context: ['/apiv1'],
    target: "http://localhost:9000",
    secure: false,
    changeOrigin: false,
    logLevel : "debug"
  },
  {
    context: ['/apiv2'],
    target: "https://huella.azurewebsites.net",
    secure: false,
    changeOrigin: true,
    logLevel : "debug",
  //  pathRewrite: {"^/apiv2" : "https://huella.azurewebsites.net/apiv2"}
  },

];

module.exports = proxyConfig;
