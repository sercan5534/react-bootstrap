"use strict";

const HtmlTemplateModule = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production"

module.exports = {
    entry: ["./src/router.jsx"],
    output: {
        path: __dirname + "/../dist/",
        publicPath: "/"

    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            { test: /\.(jsx|js)$/, exclude: [/node_modules/], use: "babel-loader" },
            {
                test: /\.(sa|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(eot|woff|svg|ttf|png|jpg|ico|eot%3F|woff2)$/, loader: "url-loader", options: { limit: 8192 }
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new HtmlTemplateModule({
            title: "React Project",
            meta: { viewport: "width=device-width, initial-scale=1, shrink-to-fit=no" },
            minify: true,
            hash: true,
            template: "./template/index.template.ejs"

        }),
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].css",
            chunkFilename: devMode ? "[id].css" : "[id].css",
        })
    ]
}