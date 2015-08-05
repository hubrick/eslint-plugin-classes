'use strict';

module.exports = function(context) {

  var member = {
    staticProps: 1,
    staticMethods: 2,
    props: 3,
    methods: 4
  };

  function propertiesOnTop(node) {

    if (context.options.indexOf('on-top') < 0) {
      return;
    }

    for (var crtToken = context.getFirstToken(node), propSectionEnded = false;
         crtToken;
         crtToken = context.getTokenAfter(crtToken)) {

      if (crtToken.type === 'Identifier') {

        if (context.getNodeByRangeIndex(crtToken.start).type !== 'ClassProperty') {
          propSectionEnded = true;
        }
        else if (propSectionEnded) {
          // Weird enough, 'static' is not regarded as a keyword but as class property (at least by babel-eslint)
          // Shouldn't report the error twice, though
          if (crtToken.value !== 'static') {
            context.report(node, 'properties should be declared berfore methods.', {identifier: crtToken.value});
            break;
          }
        }
      }
    }
  }

  return {
    'ClassBody': propertiesOnTop
  };
};

/*
Some info on distinguishing the types of identifiers, for further reference...
  Property:
    node.type === 'ClassProperty'
  Method:
    node.parent.type === 'MethodDefinition'
  Variable:
    node.parent.type === 'VariableDeclarator'
  Function:
    node.parent.type === 'FunctionDeclaration'
  Global var - not a reliable method, but in many use case, enough:
    node.parent.type === 'AssignmentExpression'
*/

