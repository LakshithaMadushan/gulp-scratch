const gulp = require('gulp');
const shell = require('gulp-shell');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('test_async', async () => {
	console.log('Run gulp default task'); //  Did you forget to signal async completion?
});

//___________________________________________________________________________

gulp.task('test_async_function', async () => {
	const msg = await asyncFunction();
	console.log('Message:', msg);
});

function asyncFunction() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('🤡');
		}, 2000);
	});
}

//___________________________________________________________________________

gulp.task('create_buddy', shell.task([ 'mkdir buddy' ]));
gulp.task('delete_buddy', shell.task([ 'rm -rf buddy' ])); // This can use to remove the dist folder

//___________________________________________________________________________

gulp.task('file_destination', async () => {
	gulp.src('*.js').pipe(gulp.dest('buddy'));
});

//___________________________________________________________________________

gulp.task('browser-sync', function() {
	browserSync.init({
		port: 3333,
		server: 'src' // server: { baseDir: './src'}
	});

	// Watching Files
	gulp.watch('*.js').on('change', browserSync.reload); // Browser sync source folder
});

// (every single file) scripts/index.js or scripts/nested/index.js --> '*.js'
// (every single folder) scripts/nested/index.js, and scripts/nested/twice/index.js. --> 'scripts/**/*.js'
// (negative) --> 'scripts/**/*.js', '!scripts/vendor/**' --> '!'

//___________________________________________________________________________

gulp.task('file_destination_and_rename', async () => {
	gulp.src('*.js').pipe(rename({ extname: '.min.js' })).pipe(gulp.dest('buddy'));
});

//___________________________________________________________________________

const styleSRC = './src/styles/*.scss';
const styleDEST = './buddy/styles';

gulp.task(
	'style',
	gulp.series('delete_buddy', async () => {
		gulp
			.src(styleSRC)
			.pipe(sourcemaps.init())
			.pipe(
				sass({
					errLogToConsole: true
				})
			)
			.pipe(rename({ suffix: '.min' }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(styleDEST));
	})
);

gulp.task('build-style', gulp.series('delete_buddy', 'style')); // GUlp Sequence

//___________________________________________________________________________

// Compile and Bundle Javascript es6 with Babel
gulp.task('js', async () => {
	// browserify
	// transform babelify [env]
	// bundle
	// source
	// readme .min
	// buffer
	// init source map
	// uglify
	// write source map
	// dist
});
