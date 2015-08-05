'use strict';

module.exports = function(context) {

  /**
   * @param token
   * @return String Possible values: 'method', 'function', 'var', 'property'
   */
  function getTypeForIdentifier(token) {
    //return crtToken.type === 'Identifier' && crtToken.
    //console.log('ancestors', context.getAncestors());
    //console.log('scope', context.getScope());
    console.log('TOKEN_NAME = ' + token.value, token);
    console.log('NODE: \n', context.getNodeByRangeIndex(token.start));
  }

  function propertiesFirst(node) {

    //var crtToken = context.getFirstToken(node),
    //    foundPropAfterMethod = false,
    //    foundMethod = false;
    //
    ////console.log(context.getFirstTokens(node, 10));
    //
    //while (crtToken = context.getTokenAfter(crtToken) && foundPropAfterMethod) {
    //
    //}


    for (var crtToken = context.getFirstToken(node), foundPropAfterMethod = false, foundMethod = false;
         crtToken && !foundPropAfterMethod;
         crtToken = context.getTokenAfter(crtToken)) {

      if (crtToken.type === 'Identifier') {
        getTypeForIdentifier(crtToken);
      }
    }


//    var paren = context.getTokenAfter(id);

//    if (id.range[1] !== paren.range[0]) {
//      context.report(node, 'properties should be declared on top');
//    }
  }

  return {
    'ClassBody': propertiesFirst
  };
};
