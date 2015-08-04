'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);


var valid = [
  'class Foo {' +
  '}          ',

  'class Foo {' +
  '  bar() {} ' +
  '}          '
].map(function(code) {
  return {
    code: code,
    args: [ 1, 'class', 'method' ],
    ecmaFeatures: { classes: true }
  };
});

var invalidClass = [
  'class foo {' +
  '}          '
].map(function(code) {
  return {
    code: code,
    args: [ 1, 'class', 'method' ],
    ecmaFeatures: { classes: true },
    errors: [{ message: 'class name should start with upper case.' }]
  };
});

var missingClass = [
  'class {' +
  '}          ',
  'class extends Bar {' +
  '}          '
].map(function(code) {
  return {
    code: code,
    args: [ 1, 'class', 'name-required' ],
    ecmaFeatures: { classes: true },
    errors: [{ message: 'class name is required.' }]
  };
});

var method = 'method name should start with lower case.';

var invalidMethod = [
  'class Foo {' +
  '  Bar(){}  ' +
  '}          '
].map(function(code) {
  return {
    code: code,
    args: [ 1, 'class', 'method' ],
    ecmaFeatures: { classes: true },
    errors: [{ message: method }]
  };
});

eslintTester.addRuleTest('./lib/rules/name', {
  valid: valid,
  invalid: invalidClass.concat(missingClass).concat(invalidMethod)
});
