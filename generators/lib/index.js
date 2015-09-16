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
    }, {
      type: 'list',
      name: 'organization',
      message: 'Type of organization?',
      choices: [
        {
          name: 'Standard Workspace',
          value: 1
        },
        {
          name: 'GB project',
          value: 2
        }
      ]
    }];

    this.prompt(prompts, function(props){
      this.props = props; // To access props later use this.props.import;

      done();
    }.bind(this));
  },

  writing: {
    lib: function() {
      var pkgname = this.props.import.split('/').reverse()[0];

      this.fs.copyTpl(
        this.templatePath('_main.go'),
        this.destinationPath('src/'+this.props.import+'/cmd/command/main.go'),
        { projectImport: this.props.import,
          packageName: pkgname}
      );

      this.fs.copyTpl(
        this.templatePath('_lib.go'),
        this.destinationPath('src/'+this.props.import+'/lib.go'),
        { packageName: pkgname}
      );
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('src/'+this.props.import+'/.gitignore')
      );
    },

    workspace: function() {
      if (this.props.organization == 1) {
        var cwdModel = {
          cwd: this.env.cwd,
          projectImport: this.props.import
        };
        var setgoenv = 'setgoenv.sh';
        var build = 'build.sh';
        this.fs.copyTpl(
          this.templatePath('_setgoenv.sh'),
          this.destinationPath(setgoenv),
          cwdModel
        );
        this.fs.copyTpl(
          this.templatePath('_build.sh'),
          this.destinationPath(build),
          cwdModel
        );
        this.log('The standard workspace requires to set the GOPATH with ' + setgoenv);
      }
    }
  },

  end: {
    build: function() {

      switch (this.props.organization) {
        case 1:
          var build = 'build.sh';
          var chmod = this.spawnCommand('chmod', ['+x', build]);
          chmod.on('close', function(code){
            if(code === 0) {
              this.spawnCommand('./' + build, []);
            }
            else {
              this.log('Failed to chmod');
            }
          }.bind(this));
          break;
        case 2:
          this.spawnCommand('git', ['init', 'src/'+this.props.import]);
          break;
      }

    }
  }
});
