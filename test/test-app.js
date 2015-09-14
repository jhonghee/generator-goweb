'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('goweb:lib', function () {

  var importPath = 'github.com/yourname/pkgname';

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/lib'))
      .withOptions({ skipInstall: true })
      .withPrompts({ import: importPath, organization: 1 })
      .on('end', done);
  });

  it('creates files', function () {
    var isWin = /^win/.test(process.platform);
    var setgoenv = 'setgoenv.sh';
    if(isWin) {
      setgoenv = 'setgoenv.cmd';
    }

    assert.file([
      'src/'+importPath+'/cmd/command/main.go',
      'src/'+importPath+'/lib.go',
      'src/'+importPath+'/.gitignore',
      setgoenv
    ]);
  });
});
