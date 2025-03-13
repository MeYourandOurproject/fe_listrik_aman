const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Listrik Aman Indonesia | Innovate Connect"; // Ganti title di sini
      return args;
    });
  },
});
