let project_folder = "dist";
let source_folder = "src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        // в вышеуказанном массиве после запятой указано исключение, то есть все файлы, которые начинаются с нижнего подчеркивания, мы не хотим включать в результаты выборки.
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest, series, parallel, watch} = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin');
    // выше мы для каждого подключенного плагина назначаем свою переменную.
    // это существенно упрощает дальнейшее использование плагина в коде.

function browserSync() {
    // Функция, которая будет обновлять нашу страницу.
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        // указываем путь к исходным файлам проекта.
        .pipe(fileinclude())
        // просим gulp запустить для вышеуказанных файлов функцию fileinclude, которая поможет собрать их в одно целое.
        .pipe(dest(path.build.html))
        // прописываем путь для папки, куда будет "выгружаться" результат нашей работы (dist\)
        .pipe(browsersync.stream())
        // запускаем эту ф-цию, чтобы обновилась страница в браузере.
}

function css() {
    return src(path.src.css)
        //берем наш исходный scss файл
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        // трансформируем его из scss - > css, а также указываем, что мы не хотим, чтобы css был как-либо сжат, поэтому мы указали expanded.
        .pipe(
            group_media()
        )
        // эта команда происходит из плагина gulp-group-css-media-queries.
        // Вверху в переменных мы прописали такую строку    group_media = require("gulp-group-css-media-queries);
        // соответственно теперь мы можем внутри pipe() запустить интересующую нас ф-цию group_media() .
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )

        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        //выгружаем в папку с нашим скомпилированным проектом css-файлы, после всех манипуляций, которые были проведены над ними выше в данной функции.
        .pipe(browsersync.stream())
    // запускаем эту ф-цию, чтобы обновилась страница в браузере.
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(
            uglify()
        )
        // сжимаем и оптимизируем js-файл.
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        // обращаемся к папке с исходными изображениями
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        // оптимизируем исходные изображения без смены их формата с коэффициентом 3 из 7. Соблюдаем, так сказать, баланс между размером конечного файла изображения и его качеством.
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles() {
    watch([path.watch.html], html);
    // в скобках сначала указываем путь к файлам, за которыми хотим следить.
    // после этого указываем ф-цию, которую нужно применить к файлам при их изменении.
    watch([path.watch.css], css);
    watch([path.watch.js], js);
    watch([path.watch.img], images);
}

function clean() {
        return del(path.clean);
}
// Эта ф-ция отвечает за очистку папки dist, в которую помещается скомпилированный проект.

let build = series(clean, parallel(js, css, html, images));
let dev= parallel(watchFiles, browserSync);

// Код ниже: мы пытаемся "подружить" Gulp с новыми переменными.
// Чтобы какая-либо команда стала доступна для вызова в консоли, нужно ее "экспортировать" - см. ниже.
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build; //теперь у нас появилась команда в консоли: gulp build
exports.dev = dev; //теперь у нас появилась команда в консоли: gulp dev
exports.default = series(build, dev);
// в exports.default мы прописываем набор инструкций, которые выполнятся при запуске команды gulp.