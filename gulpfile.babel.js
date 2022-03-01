
// Gulp module imports
import {src, dest, watch, parallel, series} from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import minifycss from 'gulp-minify-css';
import gulpif from 'gulp-if';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps'
import rollup from 'gulp-better-rollup';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import yargs from 'yargs';

// Paths
const paths = {

main: {
        src: 'src/index.html',
        dest: 'dist',
        watch: 'src/index.html'
},
sass: {
    src: 'src/scss/*.scss',
    dest: 'dist/scss',
    watch: 'src/scss/**/*.scss'
  },
css: {
    src: 'src/css/**',
    dest: 'dist/css',
    watch: 'src/css/**/*'
  },

js: {
    src: 'src/js/*.js',
    dest: 'dist/js',
    watch: 'src/js/*.js'
  },
  views: {
    src: 'src/*.*',
    dest: 'dist',
    watch: 'src/*.*'
  },
  img: {
      src: 'src/images/**',
      dest: 'dist/images',
      watch: 'src/images/*.*'
    },
  components: {
        src: 'src/components/*.js',
        dest: 'dist/components',
        watch: 'src/components/*.js'
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
export const buildStyles = () => src(paths.css.src)
  .pipe(gulpif(production, minifycss()))
  .pipe(dest(paths.css.dest))
  .pipe(browserSync.stream());

// Views
export const buildViews = () => src(paths.views.src)
  .pipe(dest(paths.views.dest))
  .pipe(browserSync.stream());

//fonts

export const buildScripts = () => src(paths.js.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(gulpif(production, uglify()))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.js.dest))
    .pipe(browserSync.stream());


//images
  export const buildImg = () => src(paths.img.src)
    .pipe(dest(paths.img.dest));

// Clean
export const clean = () => del(['dist']);

// Watch Task
export const devWatch = () => {
  browserSync.create()
  browserSync.init({
    server: "./src"
  });
  watch(paths.css.watch, buildStyles);
  watch(paths.views.watch, buildViews);
  watch(paths.js.watch, buildScripts);
  watch(paths.fonts.watch, buildFonts);
};

// Development Task
export const dev = series(clean, parallel(buildViews), parallel(buildStyles), parallel(buildScripts), parallel(buildImg), devWatch);

// Serve Task
export const build = series(clean, parallel(buildViews), parallel(buildStyles), parallel(buildScripts), parallel(buildImg), );

// Default task
export default dev;
