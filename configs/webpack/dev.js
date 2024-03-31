import { merge } from "webpack-merge";
import { dirname } from "path";
import { fileURLToPath } from "url";
import commonConfig from "./common.js";
import webpack from "webpack";

let srcPath, publicPath;
if (process.platform === "win32") {
  srcPath = dirname(fileURLToPath(import.meta.url)).replace("\\configs\\webpack", "\\src");
  publicPath = dirname(fileURLToPath(import.meta.url)).replace("\\configs\\webpack", "");
} else {
  srcPath = dirname(fileURLToPath(import.meta.url)).replace("/configs/webpack", "/src");
  publicPath = dirname(fileURLToPath(import.meta.url)).replace("/configs/webpack", "");
}
console.log(publicPath);
export default merge(commonConfig, {
  mode: "development",
  entry: [
    //"webpack/hot/only-dev-server",
    "webpack-dev-server/client?https://localhost:9000", // bundle the client for webpack-dev-server and connect to the provided endpoint
    // "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    `${publicPath}/demo/index.tsx`, // the entry point of our app
    `${srcPath}/styles/styles.scss`,
  ],
  output: {
    publicPath: "/",
  },
  devServer: {
    https: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
  devtool: "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
  ],
});
