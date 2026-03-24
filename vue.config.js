const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Guru Ngulik | Electrial. IoT, and Web Dev"; // Ganti title di sini
      return args;
    });
  },
});
