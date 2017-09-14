angular.module("colorpicker.module",[]).factory("Helper",function(){"use strict";return{closestSlider:function(e){return(e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector).bind(e)("I")?e.parentNode:e},getOffset:function(e,o){for(var t=0,n=0,r=e.getBoundingClientRect();e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)o||"BODY"!==e.tagName?(t+=e.scrollLeft,n+=e.scrollTop):(t+=document.documentElement.scrollLeft||e.scrollLeft,n+=document.documentElement.scrollTop||e.scrollTop),e=e.offsetParent;return{top:r.top+window.pageYOffset,left:r.left+window.pageXOffset,scrollX:t,scrollY:n}},stringParsers:[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}}]}}).factory("Color",["Helper",function(e){"use strict";return{value:{h:1,s:1,b:1,a:1},rgb:function(){var e=this.toRGB();return"rgb("+e.r+","+e.g+","+e.b+")"},rgba:function(){var e=this.toRGB();return"rgba("+e.r+","+e.g+","+e.b+","+e.a+")"},hex:function(){return this.toHex()},RGBtoHSB:function(e,o,t,n){e/=255,o/=255,t/=255;var r,i,l,s;return l=Math.max(e,o,t),s=l-Math.min(e,o,t),r=0===s?null:l===e?(o-t)/s:l===o?(t-e)/s+2:(e-o)/s+4,r=(r+360)%6*60/360,i=0===s?0:s/l,{h:r||1,s:i,b:l,a:n||1}},setColor:function(o){o=o?o.toLowerCase():o;for(var t in e.stringParsers)if(e.stringParsers.hasOwnProperty(t)){var n=e.stringParsers[t],r=n.re.exec(o),i=r&&n.parse(r);if(i)return this.value=this.RGBtoHSB.apply(null,i),!1}},setHue:function(e){this.value.h=1-e},setSaturation:function(e){this.value.s=e},setLightness:function(e){this.value.b=1-e},setAlpha:function(e){this.value.a=parseInt(100*(1-e),10)/100},toRGB:function(e,o,t,n){e||(e=this.value.h,o=this.value.s,t=this.value.b),e*=360;var r,i,l,s,c;return e=e%360/60,c=t*o,s=c*(1-Math.abs(e%2-1)),r=i=l=t-c,e=~~e,r+=[c,s,0,0,s,c][e],i+=[s,c,c,s,0,0][e],l+=[0,0,s,c,c,s][e],{r:Math.round(255*r),g:Math.round(255*i),b:Math.round(255*l),a:n||this.value.a}},toHex:function(e,o,t,n){var r=this.toRGB(e,o,t,n);return"#"+(1<<24|parseInt(r.r,10)<<16|parseInt(r.g,10)<<8|parseInt(r.b,10)).toString(16).substr(1)}}}]).factory("Slider",["Helper",function(e){"use strict";var o={maxLeft:0,maxTop:0,callLeft:null,callTop:null,knob:{top:0,left:0}},t={};return{getSlider:function(){return o},getLeftPosition:function(e){return Math.max(0,Math.min(o.maxLeft,o.left+((e.pageX||t.left)-t.left)))},getTopPosition:function(e){return Math.max(0,Math.min(o.maxTop,o.top+((e.pageY||t.top)-t.top)))},setSlider:function(n,r){var i=e.closestSlider(n.target),l=e.getOffset(i,r),s=i.getBoundingClientRect(),c=n.clientX-s.left,a=n.clientY-s.top;o.knob=i.children[0].style,o.left=n.pageX-l.left-window.pageXOffset+l.scrollX,o.top=n.pageY-l.top-window.pageYOffset+l.scrollY,t={left:n.pageX-(c-o.left),top:n.pageY-(a-o.top)}},setSaturation:function(e,t,n){o={maxLeft:n,maxTop:n,callLeft:"setSaturation",callTop:"setLightness"},this.setSlider(e,t)},setHue:function(e,t,n){o={maxLeft:0,maxTop:n,callLeft:!1,callTop:"setHue"},this.setSlider(e,t)},setAlpha:function(e,t,n){o={maxLeft:0,maxTop:n,callLeft:!1,callTop:"setAlpha"},this.setSlider(e,t)},setKnob:function(e,t){o.knob.top=e+"px",o.knob.left=t+"px"}}}]).directive("colorpicker",["$document","$compile","Color","Slider","Helper",function(e,o,t,n,r){"use strict";return{require:"?ngModel",restrict:"A",link:function(i,l,s,c){function a(){e.on("mousemove",p),e.on("mouseup",f)}function u(){try{Y.css("backgroundColor",M[x]())}catch(e){Y.css("backgroundColor",M.toHex())}D.css("backgroundColor",M.toHex(M.value.h,1,1,1)),"rgba"===x&&(b.css.backgroundColor=M.toHex())}function p(e){var o=n.getLeftPosition(e),t=n.getTopPosition(e),r=n.getSlider();n.setKnob(t,o),r.callLeft&&M[r.callLeft].call(M,o/$),r.callTop&&M[r.callTop].call(M,t/$),u();var s=M[x]();return l.val(s),c&&i.$apply(c.$setViewValue(s)),L&&R.val(s),!1}function f(){m("colorpicker-selected"),e.off("mousemove",p),e.off("mouseup",f)}function d(e){M.value=A,M.setColor(l.val()),L&&!e&&R.val(l.val()),F.eq(0).css({left:M.value.s*$+"px",top:$-M.value.b*$+"px"}),F.eq(1).css("top",$*(1-M.value.h)+"px"),F.eq(2).css("top",$*(1-M.value.a)+"px"),A=M.value,u()}function h(){var e,o=r.getOffset(l[0]);return angular.isDefined(s.colorpickerParent)&&(o.left=0,o.top=0),"top"===w?e={top:o.top-147,left:o.left}:"right"===w?e={top:o.top,left:o.left+126}:"bottom"===w?e={top:o.top+l[0].offsetHeight+2,left:o.left}:"left"===w&&(e={top:o.top,left:o.left-150}),{top:e.top+"px",left:e.left+"px"}}function g(){v()}function k(){y.hasClass("colorpicker-visible")||(d(),y.addClass("colorpicker-visible").css(h()),m("colorpicker-shown"),!1===S&&e.on("mousedown",g),s.colorpickerIsOpen&&(i[s.colorpickerIsOpen]=!0,i.$$phase||i.$digest()))}function m(e){c&&i.$emit(e,{name:s.ngModel,value:c.$modelValue})}function v(){y.hasClass("colorpicker-visible")&&(y.removeClass("colorpicker-visible"),m("colorpicker-closed"),e.off("mousedown",g),s.colorpickerIsOpen&&(i[s.colorpickerIsOpen]=!1,i.$$phase||i.$digest()))}var b,x=s.colorpicker?s.colorpicker:"hex",w=angular.isDefined(s.colorpickerPosition)?s.colorpickerPosition:"bottom",S=!!angular.isDefined(s.colorpickerInline)&&s.colorpickerInline,I=!!angular.isDefined(s.colorpickerFixedPosition)&&s.colorpickerFixedPosition,C=angular.isDefined(s.colorpickerParent)?l.parent():angular.element(document.body),L=!!angular.isDefined(s.colorpickerWithInput)&&s.colorpickerWithInput,$=angular.isDefined(s.colorpickerSize)?s.colorpickerSize:100,P=$+"px",H=L?'<input type="text" name="colorpicker-input" spellcheck="false">':"",T=S?"":'<button type="button" class="close close-colorpicker">&times;</button>',O='<div class="colorpicker dropdown"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>'+H+T+"</div></div>",y=angular.element(O),M=t,A={h:1,s:1,b:1,a:1},B=y.find("colorpicker-hue"),D=y.find("colorpicker-saturation"),Y=y.find("colorpicker-preview"),F=y.find("i");if(o(y)(i),y.css("min-width",parseInt($)+29+"px"),D.css({width:P,height:P}),B.css("height",P),L){var R=y.find("input");R.css("width",P),R.on("mousedown",function(e){e.stopPropagation()}).on("keyup",function(){var e=this.value;l.val(e),c&&c.$modelValue!==e&&(i.$apply(c.$setViewValue(e)),d(!0))})}"rgba"===x&&(y.addClass("alpha"),b=y.find("colorpicker-alpha"),b.css("height",P),b.on("click",function(e){n.setAlpha(e,I,$),p(e)}).on("mousedown",function(e){n.setAlpha(e,I,$),a()}).on("mouseup",function(e){m("colorpicker-selected-alpha")})),B.on("click",function(e){n.setHue(e,I,$),p(e)}).on("mousedown",function(e){n.setHue(e,I,$),a()}).on("mouseup",function(e){m("colorpicker-selected-hue")}),D.on("click",function(e){n.setSaturation(e,I,$),p(e),angular.isDefined(s.colorpickerCloseOnSelect)&&v()}).on("mousedown",function(e){n.setSaturation(e,I,$),a()}).on("mouseup",function(e){m("colorpicker-selected-saturation")}),I&&y.addClass("colorpicker-fixed-position"),y.addClass("colorpicker-position-"+w),"true"===S&&y.addClass("colorpicker-inline"),C.append(y),c&&(c.$render=function(){l.val(c.$viewValue),d()}),l.on("blur keyup change",function(){d()}),l.on("$destroy",function(){y.remove()}),!1===S?l.on("click",k):k(),y.on("mousedown",function(e){e.stopPropagation(),e.preventDefault()}),y.find("button").on("click",function(){v()}),s.colorpickerIsOpen&&i.$watch(s.colorpickerIsOpen,function(e){!0===e?k():!1===e&&v()})}}}]);