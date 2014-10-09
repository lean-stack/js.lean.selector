/*
 * Lean CSS Selector Engine
 *
 * Copyright 2014 Michael Alt <lean@michael-alt.info>
 * Released under the ISC License
 * See provided license.txt file.
 *
 * Date: 09/29/2014
 */

// Revealing module pattern with loose augmentation
var lean = (function(window, module) {
  'use strict';

  var rSimpleQuery;

  // simply identify ID, ELEMENT oder CLASS queries
  rSimpleQuery = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

  // The CSS query function
  function cq(selectorString, contextElement) {

    var selector = selectorString.trim();
    var context = contextElement || window.document;

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

  module.cq = cq;
  return module;

}(this, lean || {}));
