let mix = require('laravel-mix');

mix.webpackConfig({
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __filename: true,
    __dirname: true
  }
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.copy('resources/assets/js/plugins/couchdb-support.js', 'public/js/plugins')
   .js('resources/assets/js/analytics/easychart.chartjs.js', 'public/js/analytics/easyquery')
   .js('resources/assets/js/analytics/easychart.google.js', 'public/js/analytics/easyquery')
   .js('resources/assets/js/analytics/easychart.js', 'public/js/analytics/easyquery')
   .js('resources/assets/js/analytics/eq.view.basic.js', 'public/js/analytics/easyquery')
   .js('resources/assets/js/analytics/eq.view.grid.js', 'public/js/analytics/easyquery')
   .js('resources/assets/js/analytics/eq.view.report.js', 'public/js/analytics/easyquery')
   .js('resources/assets/js/analytics/eq.view.textsearch.js', 'public/js/analytics/easyquery')
   .js('resources/assets/js/analytics/eq.widget.settings.js', 'public/js/analytics/easyquery')
   .js('resources/assets/js/analytics/export.js', 'public/js/analytics/easyquery')
   .copy('resources/assets/js/analytics/eq.all.min.js', 'public/js/analytics/easyquery')
   .sass('resources/assets/sass/app.scss', 'public/css');
