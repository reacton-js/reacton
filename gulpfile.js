const gulp = require('gulp')
const webpack = require('webpack-stream')
const browserSync = require('browser-sync').create()
const through2 = require('through2').obj
const del = require('gulp-clean')
const gulpIf = require('gulp-if')
const concat = require('gulp-concat')
const multipipe = require('multipipe')
let mode = 'development'


function copyright(file, encoding, callback) {
  file.contents = Buffer.from(`/*!
 * Reacton.js v2.3.0
 * (c) 2022-${(new Date).getFullYear()} | github.com/reacton-js
 * Released under the MIT License.
 */\n` + file.contents.toString())
  callback(null, file)
}

function components() {
  return gulp.src('src/components/**/*.{htm,mjs,js}')
    .pipe(gulpIf('*.htm', concat('components.htm')))
    .pipe(gulp.dest('dist'))
}

function modules() {
  return gulp.src('src/index.js')
    .pipe(webpack({
      mode,
      output: { filename: 'reacton.js' },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                // plugins: ['@babel/plugin-transform-runtime']
              }
            }
          }
        ]
      }
    }))
    .pipe(gulpIf(mode === 'production', multipipe(
      through2(copyright),
      gulp.dest('app'),
      gulp.dest('npm'),
      gulp.dest('gitflic'),
      gulp.dest('server/src')
    )))
    .pipe(gulp.dest('dist'))
}

function serve(done) {
  browserSync.init({
    server: { baseDir: './' },
    notify: false,
    open: false
  })
  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

function clean() {
  return gulp.src('dist')
    .pipe(del())
}

function copy() {
  return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist'))
}

function public(done) {
  mode = 'production'
  done()
}

function watch() {
  gulp.watch('index.html', gulp.series(reload))
  gulp.watch('src/components/**/*.{htm,mjs,js}', gulp.series(components, reload))
  gulp.watch(['src/index.js', 'src/modules/**/*.js'], gulp.series(modules, reload))
  gulp.watch('src/assets/**/*', gulp.series(copy, reload))
}

const dev = gulp.series(clean, copy, components, modules, serve, watch)
const build = gulp.series(public, dev)

gulp.task('default', dev)
gulp.task('build', build)