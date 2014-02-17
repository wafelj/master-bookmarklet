module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      build: {
        src: 'build/bookmarklet.js',
        dest: 'build/bookmarklet.min.js'
      }
    },
    handlebars: {
      build: {
        options: {
          namespace: 'Handlebars.templates',
          processName: function (filepath) { return filepath.replace('src/','').split('.')[0]; }
        },
        files: {
          "build/template.js": "build/template.html"
        }
      }
    },
    concat: {
      build: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['src/lib/handlebars.runtime-v1.3.0.js', 'build/template.js', 'src/bookmarklet.js'],
          dest: 'build/bookmarklet.js',
        }
      }
    },

    less: {
      build: {
        files: {
          "build/style.css": "src/style.less"
        }
      }
    },

    inlinecss: {
      build: {
        files: {
            'build/template.html': 'build/template.html'
        }
      }
    },
    copy: {
      build: {
        nonull: true,
        src: 'src/template.html',
        dest: 'build/template.html',
      },
    },

    watch: {
      all: {
        files: ['src/**/*.{html,js,css,less,png,json}'],
        tasks: ['default']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-inline-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less', 'copy', 'inlinecss', 'handlebars', 'concat', 'uglify', 'watch']);
};