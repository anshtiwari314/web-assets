const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry: "./src/index.js",
    module:{
        rules:[
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: 'file-loader',
                  
              }
        ],
        
    },
    devServer:{
        contentBase: './static',
        open: true
        },
    output:{
        path:path.resolve(__dirname, "dist"),
        filename: "output.js"
    }    ,
    plugins: [new HtmlWebpackPlugin({
        title:"hello anuj",
        
    })]
}