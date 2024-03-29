module.exports = (grunt) ->

  grunt.initConfig {
    clean : ['dest']
    coffee : 
      node :
        expand : true
        cwd : 'src'
        src : ['*.coffee']
        dest : 'dest'
        ext : '.js'
      test :
        expand : true
        cwd : 'test_src'
        src : ['*.coffee']
        dest : 'test'
        ext : '.js'
    jshint :
      all : ['dest/*.js']
      options : 
        eqnull : true

  }


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'gen', ['clean', 'coffee', 'jshint']
  grunt.registerTask 'default', ['gen']