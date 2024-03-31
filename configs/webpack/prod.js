import { merge } from "webpack-merge";
import { dirname } from "path";
import { fileURLToPath } from "url";
import commonConfig from "./common.js";
let srcPath, projectPath;
if (process.platform === "win32") {
  srcPath = dirname(fileURLToPath(import.meta.url)).replace("\\configs\\webpack", "\\src");
  projectPath = dirname(fileURLToPath(import.meta.url)).replace("\\configs\\webpack", "");
} else {
  srcPath = dirname(fileURLToPath(import.meta.url)).replace("/configs/webpack", "/src");
  projectPath = dirname(fileURLToPath(import.meta.url)).replace("/configs/webpack", "");
}

export default merge(commonConfig, {
  mode: "production",
  entry: {
    index: `${srcPath}/views/index.tsx`,
    style: `${srcPath}/styles/styles.scss`,
    vendor: ["react", "react-dom"],
    clean: true,
  },
  output: {
    path: `${projectPath}/dist`,
    publicPath: "dist/",
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },
  optimization: {
    chunkIds: "named",
    concatenateModules: true,
    innerGraph: false,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
  },
});
