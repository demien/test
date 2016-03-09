var jsdom = require('jsdom');
window = jsdom.jsdom().defaultView;
var $ = require('jquery');
html = '<ul class="toc-list"> <li> <a href="#attr1">.attr( attributeName )</a><ul><li><a href="#attr-attributeName">.attr( attributeName )</a></li></ul> </li> <li> <a href="#attr2">.attr( attributeName, value )</a><ul> <li><a href="#attr-attributeName-value">.attr( attributeName, value )</a></li> <li><a href="#attr-attributes">.attr( attributes )</a></li> <li><a href="#attr-attributeName-function">.attr( attributeName, function )</a></li> </ul> </li> </ul>'
console.log($('a', html)[0].innerHTML)
