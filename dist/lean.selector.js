/*
 * Lean CSS Selector Engine
 *
 * Copyright 2014 Michael Alt <lean@michael-alt.info>
 * Released under the ISC License
 * See provided license.txt file.
 *
 * Date: 10/09/2014
 */

// Universal Module Definition (https://github.com/umdjs/umd/blob/master/returnExports.js)
(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    if( typeof root.lean === 'undefined') {
      root.lean = {};
    }
    root.lean.cq = factory();
  }
}(this, function () {
  'use strict';

  var rSimpleQuery;

  // simply identify ID, ELEMENT oder CLASS queries
  rSimpleQuery = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

  // The CSS query function
  function cssQuery(selectorString, contextElement) {

    var selector = selectorString.trim();
    var context = contextElement || document;

    var simpleQuery;
    if ((simpleQuery = rSimpleQuery.exec(selector)) !== null) {

      if (typeof (simpleQuery[1]) !== 'undefined') {
        return context.getElementById(simpleQuery[1]);
      }
      if (typeof (simpleQuery[2]) !== 'undefined') {
        return context.getElementsByTagName(simpleQuery[2]);
      }
      return context.getElementsByClassName(simpleQuery[3]);
    }

    return context.querySelectorAll(selector);
  }

  return cssQuery;

}));
