'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
// set the configuration of eslint-tester: use the babel-eslint parser
// more info: https://github.com/eslint/eslint-tester/issues/19
var initialConfig = ESLintTester.getDefaultConfig();
ESLintTester.setDefaultConfig({
  parser: "babel-eslint"
});
var eslintTester = new ESLintTester(linter);



var valid = [
  'class Foo {' +
  '  static bar = 1;' +
  '  baz() {}' +
  '}          ',
  'class Foo {' +
  '  bar = 2;' +
  '  baz() {}' +
  '}          ',
  'class Foo {' +
  '  bar() {}' +
  '}          ',
  'class Foo {' +
  '  bar = 3; ' +
  '}          '
].map(function(code) {
      return {
        code: code,
        args: [ 1, 'properties-first' ],
        ecmaFeatures: { classes: true }
      };
    });

var invalidClass = [
  'class Foo {' +
  '  baz() {}' +
  '  static bar = 1;' +
  '}          ',
  'class Foo {' +
  '  baz() {}' +
  '  bar = 2;' +
  '}          '
].map(function(code) {
      return {
        code: code,
        args: [ 1, 'class', 'method' ],
        ecmaFeatures: { classes: true },
        errors: [{ message: 'properties should be defined in the beginning of the class.' }]
      };
    });

eslintTester.addRuleTest('./lib/rules/class-body', {
  valid: valid,
  invalid: invalidClass
});

ESLintTester.setDefaultConfig(initialConfig);
