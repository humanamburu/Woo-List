var webpack = require('webpack');

module.exports = {

    entry: "./project/Client/build/main.js",
    output: {
        path: __dirname + "/project/Client/scripts",
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
            sourceMap: true,
            mangle: false,
            compress: {
                warnings: false
            }
        })
    ]

};
