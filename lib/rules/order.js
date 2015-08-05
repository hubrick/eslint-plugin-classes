'use strict';

module.exports = function(context) {

  var staticsFirst = context.options.indexOf('statics-first') >= 0;

  var memberDefs = {
    staticProp: {
      weight: 1,
      name: 'static properties',
      isThisIt: function(suspectedNode) {
        return suspectedNode.static && suspectedNode.type === 'ClassProperty';
      }
    },
    staticMethods: {
      weight: staticsFirst ? 2 : 3,
      name: 'static methods',
      isThisIt: function(suspectedNode) {
        return suspectedNode.static && suspectedNode.parent.type === 'MethodDefinition';
      }
    },
    props: {
      weight: staticsFirst ? 3 : 2,
      name: 'object properties',
      isThisIt: function(suspectedNode) {
        return !suspectedNode.static && suspectedNode.type === 'ClassProperty';
      }
    },
    methods: {
      weight: 4,
      name: 'object methods',
      isThisIt: function(suspectedNode) {
        return !suspectedNode.static && suspectedNode.parent.type === 'MethodDefinition';
      }
    }
  };

  /**
   * @param node
   * @returns {Number} The weight index of the given node. If the node is not one of our types, it returns 0.
   */
  function getWeightIndex(node) {
    for (var member in memberDefs) {
      if (member.isThisIt(node)) {
        return member.weight;
      }
    }
    return 0;
  }

  //function getSectionName(weightIndex) {
  //  for (var member in memberDefs) {
  //    if (weightIndex)
  //  }
  //}

  function checkMembersOrder(node) {

    var crtToken, crtNode, crtSection, nodeWeight;

    // go through the tokens of the class
    for (crtToken = context.getFirstToken(node), crtSection = 0;
         crtToken;
         crtToken = context.getTokenAfter(crtToken)) {

      // Weird enough, 'static' is not regarded as a keyword but as whatever it refers to
      // (at least by babel-eslint). Thus, it shouldn't be taken into account.
      if (crtToken.type === 'Identifier' && crtToken.value !== 'static') {

        crtNode = context.getNodeByRangeIndex(crtToken.start);
        nodeWeight = getWeightIndex(crtNode);

        if (nodeWeight) {  // if the identifier is one of our concerns...

          if (nodeWeight >= crtSection) {
            crtSection = nodeWeight;
          }
          else {
            context.report(
                node,
                memberDefs.' should be declared before methods.', {identifier: crtToken.value});
            break;
          }
        }
      }
    }
  }

  return {
    'ClassBody': checkMembersOrder
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

