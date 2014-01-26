module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      css: {
        src: ['css/*.css', '!css/main.css'],
        dest: 'css/main.css'
      },
      js: {
        src: ['js/lib/*.js', '!js/lib/jquery.js'],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js: {
        src: '<%= concat.js.dest %>',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: {
        files: ['js/lib/*.js', 'css/*.css', '!css/main.css', '!js/iot-site*'],
        tasks: ['concat:css', 'uncss', 'cssmin', 'concat:js', 'uglify:js']
      }
    },
    uncss: {
      dist: {
        files: {
          'css/main.css': ['index.html']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'css/main.css': ['css/main.css']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['watch']);

};
