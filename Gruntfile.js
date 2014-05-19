module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: "sky.templates",
          processName: function (filepath) {
            var file = filepath.match(/[^\/]*\.hbs/)[0];
            return file.substring(0, file.length - 4);
          }
        },
        files: {
          "table/tableTmpl.js": "table/table.hbs"
        }

      }
    },
    watch: {
      handlebars: {
        files: '**/*.hbs',
        tasks: ['handlebars']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['handlebars']);

};