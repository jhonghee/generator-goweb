'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var inquirer = require('inquirer');

module.exports = yeoman.generators.Base.extend({

  prompting: function() {

    var done = this.async();

    var prompts = [
      {
        type: 'list',
        name: 'selection',
        message: 'Type of project?',
        choices: [
          {
            name: 'Hello World',
            value: 1
          },
          {
            name: 'Basic Web',
            value: 2
          },
          new inquirer.Separator(),
          {
            name: 'Quit',
            value: 3
          }
        ]
      }
    ];

    this.prompt(prompts, function(props){
      this.props = props;

      done();
    }.bind(this));
  },

  callSelection: function() {
    switch (this.props.selection) {
      case 1:
          this.composeWith('goweb:lib', {});
        break;
      case 2:
          this.composeWith('goweb:web', {});
        break;
      default:
          console.log("not selected")
    }
  }

});
