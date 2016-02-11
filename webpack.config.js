var webpack = require('webpack');

module.exports = {

    entry: "./project/Client/build/main.js",
    output: {
        path: __dirname + "/project/Client/js",
        filename: "script.bundle.js",
        library: "main"
    },
    watch: true,
    devtool: "source-map",

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/project/Client'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        })
    ]

};