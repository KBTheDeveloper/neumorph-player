import { merge } from 'webpack-merge';
import { dirname } from 'path';
import { fileURLToPath } from "url";
import commonConfig from './common.js';
import webpack from 'webpack';

let srcPath;
if (process.platform === "win32") {
    srcPath = dirname(fileURLToPath(import.meta.url)).replace('\\configs\\webpack', "\\src");
} else {
    srcPath = dirname(fileURLToPath(import.meta.url)).replace('/configs/webpack', "/src");
}

export default merge(commonConfig, {
    mode: "development",
    entry: [
        //"webpack/hot/only-dev-server",
        "webpack-dev-server/client?https://localhost:9000", // bundle the client for webpack-dev-server and connect to the provided endpoint
        // "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
        `${srcPath}/../demo/index.tsx`, // the entry point of our app
        `${srcPath}/styles/styles.scss`,
    ],
    output: {
        publicPath: '/'
    },
    devServer: {
        https: true,
        port: 9000,
        historyApiFallback: true,
        hot: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.DefinePlugin({
            process: { env: {} }
        })
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    }
});
