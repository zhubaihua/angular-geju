!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("haskell",function(e,r){function t(e,r,t){return r(t),t(e,r)}function n(e,r){if(e.eatWhile(p))return null;var n=e.next();if(h.test(n)){if("{"==n&&e.eat("-")){var o="comment";return e.eat("#")&&(o="meta"),t(e,r,a(o,1))}return null}if("'"==n)return e.eat("\\"),e.next(),e.eat("'")?"string":"string error";if('"'==n)return t(e,r,i);if(u.test(n))return e.eatWhile(d),e.eat(".")?"qualifier":"variable-2";if(l.test(n))return e.eatWhile(d),"variable";if(f.test(n)){if("0"==n){if(e.eat(/[xX]/))return e.eatWhile(s),"integer";if(e.eat(/[oO]/))return e.eatWhile(c),"number"}e.eatWhile(f);var o="number";return e.match(/^\.\d+/)&&(o="number"),e.eat(/[eE]/)&&(o="number",e.eat(/[-+]/),e.eatWhile(f)),o}if("."==n&&e.eat("."))return"keyword";if(m.test(n)){if("-"==n&&e.eat(/-/)&&(e.eatWhile(/-/),!e.eat(m)))return e.skipToEnd(),"comment";var o="variable";return":"==n&&(o="variable-2"),e.eatWhile(m),o}return"error"}function a(e,r){return 0==r?n:function(t,i){for(var o=r;!t.eol();){var l=t.next();if("{"==l&&t.eat("-"))++o;else if("-"==l&&t.eat("}")&&0==--o)return i(n),e}return i(a(e,o)),e}}function i(e,r){for(;!e.eol();){var t=e.next();if('"'==t)return r(n),"string";if("\\"==t){if(e.eol()||e.eat(p))return r(o),"string";e.eat("&")||e.next()}}return r(n),"string error"}function o(e,r){return e.eat("\\")?t(e,r,i):(e.next(),r(n),"error")}var l=/[a-z_]/,u=/[A-Z]/,f=/\d/,s=/[0-9A-Fa-f]/,c=/[0-7]/,d=/[a-z_A-Z0-9'\xa1-\uffff]/,m=/[-!#$%&*+.\/<=>?@\\^|~:]/,h=/[(),;[\]`{}]/,p=/[ \t\v\f]/,g=function(){function e(e){return function(){for(var r=0;r<arguments.length;r++)t[arguments[r]]=e}}var t={};e("keyword")("case","class","data","default","deriving","do","else","foreign","if","import","in","infix","infixl","infixr","instance","let","module","newtype","of","then","type","where","_"),e("keyword")("..",":","::","=","\\","<-","->","@","~","=>"),e("builtin")("!!","$!","$","&&","+","++","-",".","/","/=","<","<=","=<<","==",">",">=",">>",">>=","^","^^","||","*","**"),e("builtin")("Bool","Bounded","Char","Double","EQ","Either","Enum","Eq","False","FilePath","Float","Floating","Fractional","Functor","GT","IO","IOError","Int","Integer","Integral","Just","LT","Left","Maybe","Monad","Nothing","Num","Ord","Ordering","Rational","Read","ReadS","Real","RealFloat","RealFrac","Right","Show","ShowS","String","True"),e("builtin")("abs","acos","acosh","all","and","any","appendFile","asTypeOf","asin","asinh","atan","atan2","atanh","break","catch","ceiling","compare","concat","concatMap","const","cos","cosh","curry","cycle","decodeFloat","div","divMod","drop","dropWhile","either","elem","encodeFloat","enumFrom","enumFromThen","enumFromThenTo","enumFromTo","error","even","exp","exponent","fail","filter","flip","floatDigits","floatRadix","floatRange","floor","fmap","foldl","foldl1","foldr","foldr1","fromEnum","fromInteger","fromIntegral","fromRational","fst","gcd","getChar","getContents","getLine","head","id","init","interact","ioError","isDenormalized","isIEEE","isInfinite","isNaN","isNegativeZero","iterate","last","lcm","length","lex","lines","log","logBase","lookup","map","mapM","mapM_","max","maxBound","maximum","maybe","min","minBound","minimum","mod","negate","not","notElem","null","odd","or","otherwise","pi","pred","print","product","properFraction","putChar","putStr","putStrLn","quot","quotRem","read","readFile","readIO","readList","readLn","readParen","reads","readsPrec","realToFrac","recip","rem","repeat","replicate","return","reverse","round","scaleFloat","scanl","scanl1","scanr","scanr1","seq","sequence","sequence_","show","showChar","showList","showParen","showString","shows","showsPrec","significand","signum","sin","sinh","snd","span","splitAt","sqrt","subtract","succ","sum","tail","take","takeWhile","tan","tanh","toEnum","toInteger","toRational","truncate","uncurry","undefined","unlines","until","unwords","unzip","unzip3","userError","words","writeFile","zip","zip3","zipWith","zipWith3");var n=r.overrideKeywords;if(n)for(var a in n)n.hasOwnProperty(a)&&(t[a]=n[a]);return t}();return{startState:function(){return{f:n}},copyState:function(e){return{f:e.f}},token:function(e,r){var t=r.f(e,function(e){r.f=e}),n=e.current();return g.hasOwnProperty(n)?g[n]:t},blockCommentStart:"{-",blockCommentEnd:"-}",lineComment:"--"}}),e.defineMIME("text/x-haskell","haskell")});