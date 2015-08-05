'use strict';

module.exports = function(context) {

  var staticsFirst = context.options.indexOf('statics-first') >= 0;

  // some data about the members
  var staticProps = {
      name: 'static properties',
      isThisIt: function(node) {
        return node.static && node.type === 'ClassProperty';
      }
    },
    staticMethods = {
      name: 'static methods',
      isThisIt: function(node) {
        //if (node.parent.type === 'MethodDefinition') console.log('NODE:\n', node);
        return node.parent.static && node.parent.type === 'MethodDefinition';
      }
    },
    props = {
      name: 'object properties',
      isThisIt: function(node) {
        return !node.static && node.type === 'ClassProperty';
      }
    },
    methods = {
      name: 'object methods',
      isThisIt: function(node) {
        return !node.parent.static && node.parent.type === 'MethodDefinition';
      }
    };

  // the right order
  var membersOrder = staticsFirst ?
      [staticProps, staticMethods, props, methods] :
      [staticProps, props, staticMethods, methods];

  /**
   * @param node
   * @returns {Number} The weight index of the given node. If the node is not one of our types, it returns -1.
   */
  function getWeightIndex(node) {
    for (var idx = 0; idx < membersOrder.length; idx++) {
      if (membersOrder[idx].isThisIt(node)) {
        return idx;
      }
    }
    return -1;
  }

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

        if (nodeWeight >= 0) {  // if the identifier is one of our concerns...

          if (nodeWeight >= crtSection) {
            crtSection = nodeWeight;
          }
          else {
            context.report(
                node,
                membersOrder[nodeWeight].name + ' should be declared before ' + membersOrder[crtSection].name + '.',
                { identifier: crtToken.value }
            );
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
