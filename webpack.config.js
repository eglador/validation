const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    mode: 'production',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'app.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/page/index.html'),
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 5555,
        open: true,
        hot: true,
        compress: true
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.mode = 'development';
    }

    if (argv.mode === 'production') {
        //...
    }

    return config;
};