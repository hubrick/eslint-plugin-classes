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

var validWithoutStatics = [

  'class Foo {' +
  '  bar = 3; ' +
  '}          ',

  'class Foo {' +
  '  static alpha = 1;' +
  '  beta = 2;' +
  '  gamma() {}' +
  '}          ',

  'class Foo {' +
  '  static alpha = 1;' +
  '  static beta() {}' +
  '  gamma() {}' +
  '}          ',

  'class Foo {' +
  '  /* comments allowed */' +
  '  bar = 2;' +
  '  baz() {}' +
  '}          ',

  'class Foo {' +
  '  static alpha = 1;' +
  '  gamma = 2;' +
  '  static beta() {}' +
  '  delta() {}' +
  '}          ',

  'class Foo {' +
  '  static bar = 1;' +
  '  baz() {}' +
  '}          ',

  'class Foo {' +
  '  bar = 2;' +
  '  baz   () {} /* <-- note the spaces */' +
  '}          '
].map(function(code) {
      return {
        code: code,
        args: [ 1 ],
        ecmaFeatures: { classes: true }
      };
    });

var validWithStatics = [

  'class Foo {' +
  '  static alpha = 1;' +
  '  static beta() {}' +
  '  gamma = 2;' +
  '}          ',

  'class Foo {' +
  '  static alpha = 1;' +
  '  static beta() {}' +
  '  gamma = 2;' +
  '  delta() {}' +
  '}          ',

  'class Foo {' +
  '  static staticProp = 1;' +
  '  static staticMethod() {' +
  '    var simpleVar = 3;' +
  '  }' +
  '  prop = 2;' +
  '  method() {' +
  '    var simpleVar = 3;' +
  '    globalVar = 4;' +
  '    function simpleFunction() { ' +
  '       var anotherSimpleVar;' +
  '    }' +
  '  }' +
  '}          '
].map(function(code) {
      return {
        code: code,
        args: [ 1, 'statics-first' ],
        ecmaFeatures: { classes: true }
      };
    });



var invalidWithoutStatics1 = [

  'class Foo {' +
  '  static alpha = 1;' +
  '  static beta() {}' +
  '  delta() {}' +
  '  gamma = 2;' +
  '}          ',

  'class Foo {' +
  '  delta() {}' +
  '  gamma = 2;' +
  '}          ',

  'class Foo {' +
  '  static alpha = 1;' +
  '  gamma = 2;' +
  '  static beta() {};' +
  '  delta() {}' +
  '  gamma2 = 3' +
  '}          '
].map(function(code) {
      return {
        code: code,
        args: [ 1 ],
        ecmaFeatures: { classes: true },
        errors: [{ message: 'object properties should be declared before object methods.' }]
      };
    });

var invalidWithoutStatics2 = [{
    code:
      'class Foo {' +
      '  static beta() {}' +
      '  static alpha = 1;' +
      '}          ',
    args: [ 1 ],
    ecmaFeatures: { classes: true },
    errors: [{ message: 'static properties should be declared before static methods.' }]
  }, {
    code:
      'class Foo {' +
      '  beta() {}' +
      '  static alpha = 1;' +
      '}          ',
    args: [ 1 ],
    ecmaFeatures: { classes: true },
    errors: [{ message: 'static properties should be declared before object methods.' }]
  }];

var invalidWithStatics1 = [

  'class Foo {' +
  '  static alpha = 1;' +
  '  gamma = 2;' +
  '  static beta() {};' +
  '  delta() {}' +
  '}          ',

  'class Foo {' +
  '  static alpha = 1;' +
  '  static beta() {}' +
  '  gamma = 2;' +
  '  delta() {}' +
  '  static beta2 = 3;' +
  '}          '
].map(function(code) {
      return {
        code: code,
        args: [ 1, 'statics-first' ],
        ecmaFeatures: { classes: true },
        errors: [{ message: 'static methods should be declared before object properties.' }]
      };
    });

var invalidWithStatics = [{
    code:
      'class Foo {' +
      '  static beta() {}' +
      '  static alpha = 1;' +
      '}          ',
    args: [ 1, 'statics-first' ],
    ecmaFeatures: { classes: true },
    errors: [{ message: 'static properties should be declared before static methods.' }]
  }, {
    code:
      'class Foo {' +
      '  static alpha = 1;' +
      '  gamma = 2;' +
      '  static beta() {};' +
      '  delta() {}' +
      '}          ',
    args: [ 1, 'statics-first' ],
    ecmaFeatures: { classes: true },
    errors: [{ message: 'static methods should be declared before object properties.' }]
  },{
    code:
      'class Foo {' +
      '  static alpha = 1;' +
      '  static beta() {}' +
      '  gamma = 2;' +
      '  delta() {}' +
      '  static beta2 = 3;' +
      '}          ',
    args: [ 1, 'statics-first' ],
    ecmaFeatures: { classes: true },
    errors: [{ message: 'static properties should be declared before object methods.' }]
  }];

eslintTester.addRuleTest('./lib/rules/order', {
  valid: validWithoutStatics.concat(validWithStatics),
  invalid: invalidWithoutStatics1.concat(invalidWithoutStatics2).concat(invalidWithStatics)
});

ESLintTester.setDefaultConfig(initialConfig);
