'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {

    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'import',
      message: 'What is the import path of your project?',
      default: 'github.com/yourname/pkgname'
    }];

    this.prompt(prompts, function(props){
      this.props = props; // To access props later use this.props.import;

      var destdir = process.env.GOPATH + "/src/" + props.import; // src under GOPATH
      if(!process.env.GOPATH.trim()) {
        destdir = this.destinationPath("src/" + props.import); // src under current directory
      }

      // handle explicit gb project
      if (process.argv[3] == 'gb') {
        destdir = this.destinationPath("src/" + props.import); // src under current directory
      }

      this.destdir = destdir;

      done();
    }.bind(this));
  },

  writing: {
    lib: function() {

      var pkgname = this.props.import.split('/').reverse()[0];

      this.fs.copyTpl(
        this.templatePath('_main.go'),
        this.destdir+'/cmd/command/main.go',
        { projectImport: this.props.import,
          packageName: pkgname}
      );

      this.fs.copyTpl(
        this.templatePath('_lib.go'),
        this.destdir+'/lib.go',
        { packageName: pkgname}
      );

      this.fs.copyTpl(
        this.templatePath('_lib_test.go'),
        this.destdir+'/lib_test.go',
        { packageName: pkgname}
      );

      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destdir+'/.gitignore'
      );

    },

    workspace: function() {
      var gitinit = this.spawnCommand('git', ['init', this.destdir]);
    }
  }

});
