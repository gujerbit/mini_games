const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../backend/public"),
    assetsDir: "./assets",
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@assets": path.resolve(__dirname, "src/assets"),
                "@components": path.resolve(__dirname, "src/components"),
                "@views": path.resolve(__dirname, "src/views"),
                "@ui": path.resolve(__dirname, "src/components/ui"),
            }
        }
    }
};