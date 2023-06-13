// https://www.youtube.com/playlist?list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8
const HtmlWebpackPlugin = require('html-webpack-plugin');
const projects = require('./src/data/projects.json');
const utils = require('./src/js/utils');

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/templates/index.pug',
    favicon: './src/images/favicon.png',
    templateParameters: { utils, projects, title: 'ryan best', page: 'work' }
  }),
  new HtmlWebpackPlugin({
    template: './src/templates/index.pug',
    filename: 'about/index.html',
    favicon: './src/images/favicon.png',
    templateParameters: { utils, title: 'ryan best', page: 'about' }
  })
];

const internalProjects = projects.filter(d => !d.url);
internalProjects.forEach(project => {
  plugins.push(new HtmlWebpackPlugin({
    template: './src/templates/index.pug',
    filename: `${project.id}/index.html`,
    favicon: './src/images/favicon.png',
    templateParameters: { utils, projects, title: project.title, page: project.id, project: project }
  }));
});

module.exports = {
  entry: './src/js/app.js',
  module: {
    rules: [
      // Include pug-loader to process the pug files
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins
};
