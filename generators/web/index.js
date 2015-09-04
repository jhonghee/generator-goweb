'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'import',
      message: 'What is the import path of your project?',
      default: 'github.com/yourname/pkgname'
    }];

    this.prompt(prompts, function (props) {
      this.props = props; // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    web: function () {
      var pkgname = this.props.import.split('/').reverse()[0];
      this.fs.copyTpl(
        this.templatePath('_main.go'),
        this.destinationPath('src/'+this.props.import+'/cmd/server/main.go'),
        { projectImport: this.props.import,
          packageName: pkgname}
      );

      this.fs.copyTpl(
        this.templatePath('_lib.go'),
        this.destinationPath('src/'+this.props.import+'/lib.go'),
        { packageName: pkgname}
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );


      var self = this;
      // spawn hugo new command
      var hugo = this.spawnCommand('hugo', ['new', 'site', 'site']);
      hugo.on('close', function(code){
        if(code === 0) { // Success
          fs.appendFile(self.destinationPath('site/config.toml'), 'publishdir = "../bin/public"', function (err) {
            if (err != null) {
              self.log('Failed to append publishdir to site/config.toml: ' + err);
            }
          });
        }
        else {
          self.log('Failed to create hugo site');
        }
      });
    }
  },

  // install: function () {
  //   this.installDependencies();
  // }
});


