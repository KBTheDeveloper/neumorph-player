import {dirname}  from 'path';
import {fileURLToPath} from "url";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
let srcPath, projectPath;
if (process.platform === "win32") {
    srcPath = dirname(fileURLToPath(import.meta.url)).replace('\\configs\\webpack', "\\src");
    projectPath = dirname(fileURLToPath(import.meta.url)).replace('\\configs\\webpack', "");
} else {
    srcPath = dirname(fileURLToPath(import.meta.url)).replace('/configs/webpack', "/src");
    projectPath = dirname(fileURLToPath(import.meta.url)).replace('/configs/webpack', "");
}

export default {
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    context: srcPath,
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: true,
                            sourceMap: false,
                        }
                    },
                    'sass-loader',
                ],
            },
            // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
            // Using here url-loader and file-loader
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/audio/[name].[ext]?[hash]'
                }
            },
            // {
            //     test: /\.json$/,
            //     loader: "json-loader"
            // },
        ],
    },
    plugins: [
        //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html', //Name of file in ./dist/
            template: `${projectPath}/public/index.html`, //Name of template in ./src
            hash: true,
            inject: true,
        }),
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: "./assets/[name].css",
            chunkFilename: "./assets/[id].css"
        }),
    ],
    // externals: {
    //     react: "React",
    //     "react-dom": "ReactDOM",
    // },
}
