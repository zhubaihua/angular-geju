!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed"],t):t(CodeMirror)}(function(t){"use strict";var e=["template","literal","msg","fallbackmsg","let","if","elseif","else","switch","case","default","foreach","ifempty","for","call","param","deltemplate","delcall","log"];t.defineMode("soy",function(a){function n(t){return t[t.length-1]}function s(t,e,a){if(t.sol()){for(var s=0;s<e.indent&&t.eat(/\s/);s++);if(s)return null}var r=t.string,l=a.exec(r.substr(t.pos));l&&(t.string=r.substr(0,t.pos+l.index));var i=t.hideFirstChars(e.indent,function(){var a=n(e.localStates);return a.mode.token(t,a.state)});return t.string=r,i}function r(t,e){for(;t;){if(t.element===e)return!0;t=t.next}return!1}function l(t,e){return{element:e,next:t}}function i(t,e,a){return r(t,e)?"variable-2":a?"variable":"variable-2 error"}function o(t){t.scopes&&(t.variables=t.scopes.element,t.scopes=t.scopes.next)}var c=t.getMode(a,"text/plain"),m={html:t.getMode(a,{name:"text/html",multilineTagIndentFactor:2,multilineTagIndentPastTag:!1}),attributes:c,text:c,uri:c,css:t.getMode(a,"text/css"),js:t.getMode(a,{name:"text/javascript",statementIndent:2*a.indentUnit})};return{startState:function(){return{kind:[],kindTag:[],soyState:[],templates:null,variables:null,scopes:null,indent:0,localStates:[{mode:m.html,state:t.startState(m.html)}]}},copyState:function(e){return{tag:e.tag,kind:e.kind.concat([]),kindTag:e.kindTag.concat([]),soyState:e.soyState.concat([]),templates:e.templates,variables:e.variables,scopes:e.scopes,indent:e.indent,localStates:e.localStates.map(function(e){return{mode:e.mode,state:t.copyState(e.mode,e.state)}})}},token:function(r,c){var d;switch(n(c.soyState)){case"comment":return r.match(/^.*?\*\//)?c.soyState.pop():r.skipToEnd(),"comment";case"templ-def":return(d=r.match(/^\.?([\w]+(?!\.[\w]+)*)/))?(c.templates=l(c.templates,d[1]),c.scopes=l(c.scopes,c.variables),c.soyState.pop(),"def"):(r.next(),null);case"templ-ref":return(d=r.match(/^\.?([\w]+)/))?(c.soyState.pop(),"."==d[0][0]?i(c.templates,d[1],!0):"variable"):(r.next(),null);case"param-def":return(d=r.match(/^([\w]+)(?=:)/))?(c.variables=l(c.variables,d[1]),c.soyState.pop(),c.soyState.push("param-type"),"def"):(r.next(),null);case"param-type":return"}"==r.peek()?(c.soyState.pop(),null):r.eatWhile(/^[\w]+/)?"variable-3":(r.next(),null);case"var-def":return(d=r.match(/^\$([\w]+)/))?(c.variables=l(c.variables,d[1]),c.soyState.pop(),"def"):(r.next(),null);case"tag":if(r.match(/^\/?}/))return"/template"==c.tag||"/deltemplate"==c.tag?(o(c),c.indent=0):("/for"!=c.tag&&"/foreach"!=c.tag||o(c),c.indent-=a.indentUnit*("/}"==r.current()||-1==e.indexOf(c.tag)?2:1)),c.soyState.pop(),"keyword";if(r.match(/^([\w?]+)(?==)/)){if("kind"==r.current()&&(d=r.match(/^="([^"]+)/,!1))){var p=d[1];c.kind.push(p),c.kindTag.push(c.tag);var u=m[p]||m.html,f=n(c.localStates);c.indent+=f.mode.indent(f.state,""),c.localStates.push({mode:u,state:t.startState(u)})}return"attribute"}return r.match(/^"/)?(c.soyState.push("string"),"string"):(d=r.match(/^\$([\w]+)/))?i(c.variables,d[1]):(d=r.match(/^\w+/))?/^(?:as|and|or|not|in)$/.test(d[0])?"keyword":null:(r.next(),null);case"literal":return r.match(/^(?=\{\/literal})/)?(c.indent-=a.indentUnit,c.soyState.pop(),this.token(r,c)):s(r,c,/\{\/literal}/);case"string":var d=r.match(/^.*?("|\\[\s\S])/);return d?'"'==d[1]&&c.soyState.pop():r.skipToEnd(),"string"}if(r.match(/^\/\*/))return c.soyState.push("comment"),"comment";if(r.match(r.sol()?/^\s*\/\/.*/:/^\s+\/\/.*/))return"comment";if(r.match(/^\{literal}/))return c.indent+=a.indentUnit,c.soyState.push("literal"),"keyword";if(d=r.match(/^\{([\/@\\]?[\w?]*)/)){if("/switch"!=d[1]&&(c.indent+=(/^(\/|(else|elseif|ifempty|case|fallbackmsg|default)$)/.test(d[1])&&"switch"!=c.tag?1:2)*a.indentUnit),c.tag=d[1],c.tag=="/"+n(c.kindTag)){c.kind.pop(),c.kindTag.pop(),c.localStates.pop();var f=n(c.localStates);c.indent-=f.mode.indent(f.state,"")}return c.soyState.push("tag"),"template"!=c.tag&&"deltemplate"!=c.tag||c.soyState.push("templ-def"),"call"!=c.tag&&"delcall"!=c.tag||c.soyState.push("templ-ref"),"let"==c.tag&&c.soyState.push("var-def"),"for"!=c.tag&&"foreach"!=c.tag||(c.scopes=l(c.scopes,c.variables),c.soyState.push("var-def")),c.tag.match(/^@(?:param\??|inject)/)&&c.soyState.push("param-def"),"keyword"}return s(r,c,/\{|\s+\/\/|\/\*/)},indent:function(e,s){var r=e.indent,l=n(e.soyState);if("comment"==l)return t.Pass;if("literal"==l)/^\{\/literal}/.test(s)&&(r-=a.indentUnit);else{if(/^\s*\{\/(template|deltemplate)\b/.test(s))return 0;/^\{(\/|(fallbackmsg|elseif|else|ifempty)\b)/.test(s)&&(r-=a.indentUnit),"switch"!=e.tag&&/^\{(case|default)\b/.test(s)&&(r-=a.indentUnit),/^\{\/switch\b/.test(s)&&(r-=a.indentUnit)}var i=n(e.localStates);return r&&i.mode.indent&&(r+=i.mode.indent(i.state,s)),r},innerMode:function(t){return t.soyState.length&&"literal"!=n(t.soyState)?null:n(t.localStates)},electricInput:/^\s*\{(\/|\/template|\/deltemplate|\/switch|fallbackmsg|elseif|else|case|default|ifempty|\/literal\})$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",useInnerComments:!1,fold:"indent"}},"htmlmixed"),t.registerHelper("hintWords","soy",e.concat(["delpackage","namespace","alias","print","css","debugger"])),t.defineMIME("text/x-soy","soy")});