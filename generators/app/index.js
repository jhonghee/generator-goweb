'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    var prompts = [{
      name: 'import',
      message: 'What is the import path of your project?',
      default: 'github.com/yourname/pkgname'
    }];

    this.prompt(prompts, function(props){
      this.props = props; // To access props later use this.props.import;

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      var pkgname = this.props.import.split('/').reverse()[0];
      this.fs.copyTpl(
        this.templatePath('main.go'),
        this.destinationPath('src/'+this.props.import+'/cmd/command/main.go'),
        { projectImport: this.props.import,
          packageName: pkgname}
      );

      this.fs.copyTpl(
        this.templatePath('lib.go'),
        this.destinationPath('src/'+this.props.import+'/lib.go'),
        { packageName: pkgname}
      );
    }
  }
});
