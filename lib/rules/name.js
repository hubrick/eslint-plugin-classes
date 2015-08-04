'use strict';

module.exports = function(context) {

  function klass(node) {

    var ruleOptions = {
      nameCapitalised: {
        enabled: context.options.indexOf('class') >= 0,
        message: 'class name should start with upper case.'
      },
      nameRequired: {
        enabled: context.options.indexOf('name-required') >= 0,
        message: 'class name is required.'
      }
    };

    if (!ruleOptions.nameCapitalised.enabled && !ruleOptions.nameRequired.enabled) {
      return;
    }

    // look for the class name
    var crtToken = context.getFirstToken(node);
    while (crtToken.type !== 'Identifier' &&
        !(crtToken.type === 'Punctuator' && crtToken.value === '{') &&
        !(crtToken.type === 'Keyword' && crtToken.value === 'extends')) {
      crtToken = context.getTokenAfter(crtToken);
    }
    var firstLetter = crtToken.type === 'Identifier' && crtToken.value[0];

    if (ruleOptions.nameCapitalised.enabled && firstLetter && firstLetter !== firstLetter.toUpperCase()) {
      context.report(node, ruleOptions.nameCapitalised.message);
    }

    if (ruleOptions.nameRequired.enabled && crtToken.type !== 'Identifier') {
      context.report(node, ruleOptions.nameRequired.message);
    }
  }

  function method(node) {
    var message = 'method name should start with lower case.';

    if (context.options.indexOf('method') < 0) {
      return;
    }

    // walk for find id
    var id = context.getFirstToken(node);
    while (id.type !== 'Identifier') {
      id = context.getTokenAfter(id);
    }

    var first = id.value[0];
    if (first !== first.toLowerCase()) {
      context.report(node, message);
    }
  }

  return {
    'ClassDeclaration': klass,
    'MethodDefinition': method
  };
};
