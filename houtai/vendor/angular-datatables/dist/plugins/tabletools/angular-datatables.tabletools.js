"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.tabletools"),function(o,e,t,n){"use strict";function s(o){function e(o){function e(o,e){function s(o){console.warn("The tabletools extension has been retired. Please use the select and buttons extensions instead: https://datatables.net/extensions/select/ and https://datatables.net/extensions/buttons/");return i.dom=i.dom?i.dom:t.fn.dataTable.defaults.sDom,-1===i.dom.indexOf("T")&&(i.dom="T"+i.dom),i.hasTableTools=!0,n.isString(o)&&i.withTableToolsOption("sSwfPath",o),i}function a(o,e){return n.isString(o)&&(i.oTableTools=i.oTableTools&&null!==i.oTableTools?i.oTableTools:{},i.oTableTools[o]=e),i}function l(o){return n.isArray(o)&&i.withTableToolsOption("aButtons",o),i}var i=o(e);return i.withTableTools=s,i.withTableToolsOption=a,i.withTableToolsButtons=l,i}var s=o.newOptions,a=o.fromSource,l=o.fromFnPromise;return o.newOptions=function(){return e(s)},o.fromSource=function(o){return e(a,o)},o.fromFnPromise=function(o){return e(l,o)},o}o.decorator("DTOptionsBuilder",e),e.$inject=["$delegate"]}n.module("datatables.tabletools",["datatables"]).config(s),s.$inject=["$provide"]}(window,document,jQuery,angular);