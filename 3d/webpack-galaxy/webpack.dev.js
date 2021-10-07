const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports ={
    entry:"./src/index.js",
    module:{
       rules:[
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
           {
            test:/\.html$/,
            use:"html-loader"
       },
       
       {
        test:/\.(jp?g|png|svg|gif|mp3)$/,
        use:{
         loader:"file-loader",
         options:{
            name:"[name].[hash].[ext]",
            outputPath:"images",
            esModule: false
        }
    
   }
   }
//    {
//     test: /\.(png|jp(e*)g|svg)$/,
//     use: [
//       {
//         loader: 'url-loader',
//         options: {
//           limit: 8000,
//           name: 'images/[name].[fullhash].[ext]',
//           publicPath: 'images/',
//         }
//       }
//     ]
//   }
    ]
    },
    mode:"development",
    output:{
        filename:"main.[contenthash].js",
        path:path.resolve(__dirname,"dist")
    },
    devServer:{
       // contentBase:"./src/static",
        open:true
    },
    plugins:[new HtmlWebpackPlugin({
        title:"webpack particles"
        //template:"./src/index.html"
    }),new CleanWebpackPlugin()]
}