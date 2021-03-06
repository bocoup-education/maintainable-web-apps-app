'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  // Load tasks and configuration.
  grunt.loadTasks('build');

  // Register alias tasks.
  grunt.registerTask('setup-dev',
    'Prepare development environment',
    ['clean:prod', 'jade:dev', 'stylus:dev', 'server:dev']);

  grunt.registerTask('lint',
    'Statically analyze the project JavaScript for errors and code style',
    ['jshint']);

  grunt.registerTask('prod',
    'Compile for production.',
    [
      'clean:prod', 'jade:prod', 'stylus:prod', 'systemjs',
      'copy:prod', 'server:prod'
    ]);

  grunt.registerTask('dev',
    'Start a development web server.',
    ['lint', 'setup-dev', 'watch']);

  grunt.registerTask('server',
    'Start the REST and connect servers.',
    function() {
      require('./server/server');
      grunt.task.run('connect:' + this.args.join(':'));
    }
  );

  grunt.registerTask('default', ['dev']);

};
