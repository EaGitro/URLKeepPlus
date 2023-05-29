
const path = require('path');
module.exports = {
  entry: {
    logic: './src/logic_index.ts',
    dom: './src/dom_index.tsx'
  },
  output: {
    filename: '[name]_main.js',                    /* 最終的な出力ファイル名 */
    path: path.resolve(__dirname, 'dist'),  /* 出力先ディレクトリ名(/dist) */
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx)$/,     /* "test" は loder を適応する正規表現. 今回は ts, js, tsx */
        exclude: /node_modules/,    /* 適応しないファイルの正規表現 */
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ],
      },
    ],
  },
  // resolve: {
  //   alias: {
  //     "~/src": path.resolve(__dirname, 'src'),
  //     "~": path.resolve(__dirname,'.')
  //   },
  //   modules: [
  //     path.resolve('./src')
  //   ]
  // },

  target: ["web", "es2021"],            /* どの環境に対してコンパイルするか. 今回はchrome用なので es2021 */

  resolve: {    /*ERROR:  Field 'browser' doesn't contain a valid alias configuration を解決 */
    extensions: ['.js', '.ts', '.tsx'],  // 拡張子で迷子にならないように

    alias: {
      "~/src": path.resolve(__dirname, 'src'),
      "~": path.resolve(__dirname, '.')
    }, 
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]

  },

  // mode: 'development',                  /* デバッグ用 */
  // devtool: 'inline-source-map',         /* ソースマップ */
  watch: true,                          /* 自動 bundle */
};