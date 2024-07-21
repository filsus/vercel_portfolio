module.exports = {
    // other webpack configurations...
  
    module: {
      rules: [
        // other rules...
  
        {
          test: /\.(woff|woff2|eot|ttf|otf|png|jpe?g|gif|webp|svg)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/', // optional, specify where to put the files in the build folder
          },
        },
  
        // rule for canvas.node file
        {
          test: /canvas\.node$/,
          loader: 'file-loader',
        },
      ],
    },
  };
  