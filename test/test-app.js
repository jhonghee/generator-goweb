'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('goweb:lib', function () {

  var importPath = 'github.com/yourname/pkgname';

  process.env.GOPATH="_gopath";

  var destdir = process.env.GOPATH + "/src/" + importPath; // src under GOPATH

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/lib'))
      .withOptions({ skipInstall: true })
      .withPrompts({ import: importPath, organization: 1 })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      destdir+'/cmd/command/main.go',
      destdir+'/lib.go',
      destdir+'/lib_test.go',
      destdir+'/.gitignore'
    ]);
  });
});
