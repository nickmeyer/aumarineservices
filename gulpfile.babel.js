'use strict';

// Gulp module imports
import { src, dest, watch, parallel, series } from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import minifycss from 'gulp-minify-css';
import gulpif from 'gulp-if';
import babel from 'gulp-babel';
import twig from 'gulp-twig';
import sourcemaps from 'gulp-sourcemaps'
import rollup from 'gulp-better-rollup';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import yargs from 'yargs';

// Paths
const paths = {
  assets: {
    src: 'src/assets/*',
    dest: 'assets',
    watch: 'src/assets/**/*.*'
  },
  sass: {
    src: 'src/scss/*.scss',
    dest: 'css',
    watch: 'src/scss/**/*.scss'
  },
  js: {
    src: 'src/js/app.js',
    dest: 'js',
    watch: 'src/js/**/*.js'
  },
  views: {
    src: 'src/html/*.html',
    dest: '/',
    watch: 'src/html/**/*.html'
  }
}

// Recognise `--production` argument
const argv = yargs.argv;
const production = !!argv.production;

// De-caching for Data files
function requireUncached( $module ) {
  delete require.cache[require.resolve( $module )];
  return require( $module );
}

// Main Tasks

// Styles
export const buildStyles = () => src(paths.sass.src)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulpif(production, minifycss()))
  .pipe(dest(paths.sass.dest))
  .pipe(browserSync.stream());

// Views
export const buildViews = () => src(paths.views.src)
  .pipe(twig())
  .pipe(dest(paths.views.dest))
  .pipe(browserSync.stream());

// Scripts
export const buildScripts = () => src(paths.js.src)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(rollup({
    plugins: [babel({
      "presets": ["@babel/env"]
    })]
  }, {
    format: 'cjs',
  }))
  .pipe(gulpif(production, uglify()))
  .pipe(sourcemaps.write())
  .pipe(dest(paths.js.dest))
  .pipe(browserSync.stream());

export const buildAssets = () => src(paths.assets.src)
  .pipe(dest(paths.assets.dest));

// Clean
export const clean = () => del(['build']);

// Watch Task
export const devWatch = () => {
  browserSync.create()
  browserSync.init({
    server: "./"
  });
  watch(paths.sass.watch, buildStyles);
  watch(paths.views.watch, buildViews);
  watch(paths.js.watch, buildScripts);
};

// Development Task
export const dev = series(clean, parallel(buildViews), parallel(buildStyles), parallel(buildScripts), parallel(buildAssets), devWatch);

// Serve Task
export const build = series(clean, parallel(buildViews), parallel(buildStyles), parallel(buildScripts), parallel(buildAssets));

// Default task
export default dev;
