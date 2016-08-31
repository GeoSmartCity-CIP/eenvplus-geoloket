var _ = require('lodash-node'),
    nunjucks = require('nunjucks'),
    path = require('path');

var dir = {
        build: 'src/',
        comp: 'src/components/',
        html: 'src/',
        js: 'src/js/',
        less: 'src/style/',
        lib: 'src/lib/',
        ts: 'src/ts/',
        cs: 'src/cs/',
        tracer: 'src/tracer/',
        test: {
            js: 'test/specs/',
            ts: 'test/ts/'
        }
    },
    file = {
        dependency: dir.build + 'deps.js',
        depsWriter: 'node_modules/closure-tools/closure-bin/build/depswriter.py',
        htmlIn: dir.html + 'index.mako.html',
        htmlOut: dir.build + 'index.html',
        htmlOutMobile: dir.build + 'mobile.html',
        lessIn: dir.less + 'app.less',
        lessOut: dir.build + 'style/app.css',
        tsOut: dir.build + 'eenvplus.js'
    },
    src = {
        html: file.htmlIn,
        js: [dir.js + '**/*.js', dir.comp + '**/*.js'],
        less: [dir.less + '**/*.less', dir.ts + '**/*.less', dir.comp + '**/*.less'],
        ts: [dir.ts + '**/*.ts'],
        typeDefs: [dir.lib + '**/*.d.ts']
    },
    testSrc = {
        js: [dir.test.js + 'src/**/*.js', dir.test.js + 'test/**/*.js'],
        ts: [dir.test.ts + '**/*.ts']
    },
    vars = {
        wmts: {
            format: '{Format}',
            layer: '{Layer}',
            request: 'GetTile',
            service: 'WMTS',
            style: '',
            tileCol: '{TileCol}',
            tileMatrix: '{TileMatrix}',
            tileMatrixSet: 'BPL72VL',
            tileRow: '{TileRow}',
            version: '1.0.0'
        },
        dev: {
            versionslashed: '',
            apache_base_path: '',
            api_url:  '//o-gsc.vmm.be/api', // '//o-gsc.vmm.be/api', //the url of the eenvplus-sdi
            auth_url: '//o-gsc.vmm.be/auth',//the url of the  keycloak authentication service
            wmts_url: '//tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts', //the url of the wmts used for the background
            mode: 'dev'
        }
    };

    var tracer = {
        jsIn:    [dir.tracer + '*.js' , dir.tracer + 'directives/*.js' ],
        jsOut:    dir.build + "tracer.js"
    };

    var cs= {
        jsIn:    [dir.cs + '*.js' , dir.cs + 'directives/*.js' ],
        jsOut:    dir.build + "crowdsource.js",
        gsc:      dir.lib +   "gsc.js",
        jsBower:  dir.build + "bower.js",
        cssBower: dir.build + "style/bower.css"
    };

vars.dev.wmts_url += '?' + _.map(vars.wmts, urlParam).join('&');

function urlParam(value, key) {
    return key.toUpperCase() + '=' + value;
}


module.exports = function (grunt) {

    /**
     * Measures the build speed.
     */
    require('time-grunt')(grunt);

    /*
     * Load all NPM grunt tasks.
     */
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});

    function nunjucksTask() {
        var options = this.options();

        this.files.forEach(function (file) {
            var filepath = path.resolve(__dirname, file.src[0]);

            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Template\'s file "' + filepath + '" not found.');
                return false;
            }

            if (!options.data) grunt.log.warn('Template\'s data is empty. Guess you forget to specify data option');

            var data = options.data || {},
                process = options.preprocessData;
            if (typeof process === 'function') data = process.call(file, data);

            var template = grunt.file.read(filepath),
                compiledHtml = nunjucks
                    .configure(options.paths || '', options)
                    .renderString(template, data);

            grunt.file.write(file.dest, compiledHtml);
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    }

    grunt.initConfig({
        dir: dir,
        file: file,
        src: src,
        cs: cs,
        pkg: grunt.file.readJSON('package.json'),

        concat: {
          options: {
            stripBanners: true,
            sourceMap: true
          } ,
          cs: {
            src: cs.jsIn,
            dest: cs.jsOut
          } ,
          tracer: {
            src: tracer.jsIn ,
            dest: tracer.jsOut
          }
        },
        bower_concat: {
              all: {
                dest: {
                  'js': cs.jsBower,
                  'css': cs.cssBower
                },
                exclude: ['jquery', 'angular', 'angular-animate', 'angular-resource', 'keycloak', 'ng-file-upload' ],
                dependencies: {
                  'tink-api-angular': ['angular' ,'jquery'],
                },
                bowerOptions: {
                  relative: false
                }
              }
        },

        clean: {
            dev: [file.dependency, file.tsOut + '*', file.htmlOut, file.htmlOutMobile, file.lessOut, cs.jsOut, cs.jsOut + '.map', cs.jsBower,  cs.jsBower+ '.map', cs.cssBower, tracer.jsOut, tracer.jsOut + '.map']
        },

        closureDepsWriter: {
            options: {
                depswriter: file.depsWriter,
                root_with_prefix: [
                    '"' + dir.comp + ' components"',
                    '"' + dir.js + ' js"'
                ]
            },
            dev: {
                dest: file.dependency
            }
        },

        connect: {
            dev: {
                options: {
                    port: 8000,
                    base: './src'
                }
            }
        },

        karma: {
            test: {
                configFile: 'test/karma.conf.js'
            },
            test_ci: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        less: {
            options: {
                relativeUrls: true
            },
            dev: {
                files: {
                    '<%= file.lessOut %>': file.lessIn
                }
            }
        },

        nunjucks: {
            options: {
                tags: {
                    variableStart: '${',
                    variableEnd: '}'
                }
            },
            dev: {
                options: {
                    data: _.assign(_.clone(vars.dev), {device: 'desktop'})
                },
                files: {
                    '<%= file.htmlOut %>': file.htmlIn,
                    '<%= file.tsOut %>': file.tsOut
                }
            },
            devMobile: {
                options: {
                    data: _.assign(_.clone(vars.dev), {device: 'mobile'})
                },
                files: {
                    '<%= file.htmlOutMobile %>': file.htmlIn
                }
            }
        },

        ts: {
            dev: {
                src: [src.typeDefs, src.ts],
                out: file.tsOut,
                options: {
                    removeComments: false,
                    sourceMap: true
                }
            },
            test: {
                src: [src.typeDefs, src.ts, testSrc.ts],
                outDir: dir.test.js,
                options: {
                    fast: 'never'
                }
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('.tslintrc')
            },
            files: {
                src: [src.ts]
            }
        },

        watch: {
            options: {
                spawn: false
            },
            html: {
                files: src.html,
                tasks: ['nunjucks:dev', 'nunjucks:devMobile']
            },
            js: {
                files: src.js,
                tasks: ['closureDepsWriter:dev']
            },
            less: {
                files: src.less,
                tasks: ['less:dev']
            },
            ts: {
                files: src.ts,
                tasks: ['ts:dev', 'nunjucks:dev']
            },
            tsTest: {
                files: [src.ts, testSrc.ts],
                tasks: ['ts:test']
            }
        },

        war: {
          target: {
            options: {
              war_verbose: true,
              war_dist_folder: 'build',
              war_name: 'eenvplus',
              webxml_welcome: 'index.html',
              webxml_display_name: 'e-envplus',
            },
            files: [ {
                expand: true,
                cwd: 'src',
                src: ['**'],
                dest: ''
              }  ]
          }
        }
    });

    grunt.registerMultiTask('nunjucks', 'Renders nunjucks template to HTML', nunjucksTask);
    grunt.registerTask(
        'build-dev', 'Builds the files required for development',
        ['bower_concat','concat',
        'ts:dev', 'closureDepsWriter:dev', 'less:dev', 'nunjucks:dev', 'nunjucks:devMobile']
    );
    grunt.registerTask('http', 'Run an http server on development files.', ['connect:dev:keepalive']);
    grunt.registerTask( 'dev',
        'Monitors source html, js and less files and executes their corresponding dev build tasks when needed',  ['build-dev', 'ts:test', 'watch']
    );
    grunt.registerTask('build-war', [ 'war']);
    grunt.registerTask('travis', 'Single run build/test for CI server', ['ts:dev', 'ts:test', 'karma:test_ci']);
    grunt.registerTask('default', 'Default task: build dev environment', ['dev']);

};
