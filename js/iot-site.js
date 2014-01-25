/*! iot-site - v0.1.0 - 2014-01-25
* Copyright (c) 2014 ; Licensed  */
if(typeof Object.create!=="function"){
Object.create=function(o){
function F(){
};
F.prototype=o;
return new F();
};
}
var ua={toString:function(){
return navigator.userAgent;
},test:function(s){
return this.toString().toLowerCase().indexOf(s.toLowerCase())>-1;
}};
ua.version=(ua.toString().toLowerCase().match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];
ua.webkit=ua.test("webkit");
ua.gecko=ua.test("gecko")&&!ua.webkit;
ua.opera=ua.test("opera");
ua.ie=ua.test("msie")&&!ua.opera;
ua.ie6=ua.ie&&document.compatMode&&typeof document.documentElement.style.maxHeight==="undefined";
ua.ie7=ua.ie&&document.documentElement&&typeof document.documentElement.style.maxHeight!=="undefined"&&typeof XDomainRequest==="undefined";
ua.ie8=ua.ie&&typeof XDomainRequest!=="undefined";
var domReady=function(){
var _1=[];
var _2=function(){
if(!arguments.callee.done){
arguments.callee.done=true;
for(var i=0;i<_1.length;i++){
_1[i]();
}
}
};
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",_2,false);
}
if(ua.ie){
(function(){
try{
document.documentElement.doScroll("left");
}
catch(e){
setTimeout(arguments.callee,50);
return;
}
_2();
})();
document.onreadystatechange=function(){
if(document.readyState==="complete"){
document.onreadystatechange=null;
_2();
}
};
}
if(ua.webkit&&document.readyState){
(function(){
if(document.readyState!=="loading"){
_2();
}else{
setTimeout(arguments.callee,10);
}
})();
}
window.onload=_2;
return function(fn){
if(typeof fn==="function"){
_1[_1.length]=fn;
}
return fn;
};
}();
var cssHelper=function(){
var _3={BLOCKS:/[^\s{][^{]*\{(?:[^{}]*\{[^{}]*\}[^{}]*|[^{}]*)*\}/g,BLOCKS_INSIDE:/[^\s{][^{]*\{[^{}]*\}/g,DECLARATIONS:/[a-zA-Z\-]+[^;]*:[^;]+;/g,RELATIVE_URLS:/url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g,REDUNDANT_COMPONENTS:/(?:\/\*([^*\\\\]|\*(?!\/))+\*\/|@import[^;]+;)/g,REDUNDANT_WHITESPACE:/\s*(,|:|;|\{|\})\s*/g,MORE_WHITESPACE:/\s{2,}/g,FINAL_SEMICOLONS:/;\}/g,NOT_WHITESPACE:/\S+/g};
var _4,_5=false;
var _6=[];
var _7=function(fn){
if(typeof fn==="function"){
_6[_6.length]=fn;
}
};
var _8=function(){
for(var i=0;i<_6.length;i++){
_6[i](_4);
}
};
var _9={};
var _a=function(n,v){
if(_9[n]){
var _b=_9[n].listeners;
if(_b){
for(var i=0;i<_b.length;i++){
_b[i](v);
}
}
}
};
var _c=function(_d,_e,_f){
if(ua.ie&&!window.XMLHttpRequest){
window.XMLHttpRequest=function(){
return new ActiveXObject("Microsoft.XMLHTTP");
};
}
if(!XMLHttpRequest){
return "";
}
var r=new XMLHttpRequest();
try{
r.open("get",_d,true);
r.setRequestHeader("X_REQUESTED_WITH","XMLHttpRequest");
}
catch(e){
_f();
return;
}
var _10=false;
setTimeout(function(){
_10=true;
},5000);
document.documentElement.style.cursor="progress";
r.onreadystatechange=function(){
if(r.readyState===4&&!_10){
if(!r.status&&location.protocol==="file:"||(r.status>=200&&r.status<300)||r.status===304||navigator.userAgent.indexOf("Safari")>-1&&typeof r.status==="undefined"){
_e(r.responseText);
}else{
_f();
}
document.documentElement.style.cursor="";
r=null;
}
};
r.send("");
};
var _11=function(_12){
_12=_12.replace(_3.REDUNDANT_COMPONENTS,"");
_12=_12.replace(_3.REDUNDANT_WHITESPACE,"$1");
_12=_12.replace(_3.MORE_WHITESPACE," ");
_12=_12.replace(_3.FINAL_SEMICOLONS,"}");
return _12;
};
var _13={mediaQueryList:function(s){
var o={};
var idx=s.indexOf("{");
var lt=s.substring(0,idx);
s=s.substring(idx+1,s.length-1);
var mqs=[],rs=[];
var qts=lt.toLowerCase().substring(7).split(",");
for(var i=0;i<qts.length;i++){
mqs[mqs.length]=_13.mediaQuery(qts[i],o);
}
var rts=s.match(_3.BLOCKS_INSIDE);
if(rts!==null){
for(i=0;i<rts.length;i++){
rs[rs.length]=_13.rule(rts[i],o);
}
}
o.getMediaQueries=function(){
return mqs;
};
o.getRules=function(){
return rs;
};
o.getListText=function(){
return lt;
};
o.getCssText=function(){
return s;
};
return o;
},mediaQuery:function(s,mql){
s=s||"";
var not=false,_14;
var exp=[];
var _15=true;
var _16=s.match(_3.NOT_WHITESPACE);
for(var i=0;i<_16.length;i++){
var _17=_16[i];
if(!_14&&(_17==="not"||_17==="only")){
if(_17==="not"){
not=true;
}
}else{
if(!_14){
_14=_17;
}else{
if(_17.charAt(0)==="("){
var _18=_17.substring(1,_17.length-1).split(":");
exp[exp.length]={mediaFeature:_18[0],value:_18[1]||null};
}
}
}
}
return {getList:function(){
return mql||null;
},getValid:function(){
return _15;
},getNot:function(){
return not;
},getMediaType:function(){
return _14;
},getExpressions:function(){
return exp;
}};
},rule:function(s,mql){
var o={};
var idx=s.indexOf("{");
var st=s.substring(0,idx);
var ss=st.split(",");
var ds=[];
var dts=s.substring(idx+1,s.length-1).split(";");
for(var i=0;i<dts.length;i++){
ds[ds.length]=_13.declaration(dts[i],o);
}
o.getMediaQueryList=function(){
return mql||null;
};
o.getSelectors=function(){
return ss;
};
o.getSelectorText=function(){
return st;
};
o.getDeclarations=function(){
return ds;
};
o.getPropertyValue=function(n){
for(var i=0;i<ds.length;i++){
if(ds[i].getProperty()===n){
return ds[i].getValue();
}
}
return null;
};
return o;
},declaration:function(s,r){
var idx=s.indexOf(":");
var p=s.substring(0,idx);
var v=s.substring(idx+1);
return {getRule:function(){
return r||null;
},getProperty:function(){
return p;
},getValue:function(){
return v;
}};
}};
var _19=function(el){
if(typeof el.cssHelperText!=="string"){
return;
}
var o={mediaQueryLists:[],rules:[],selectors:{},declarations:[],properties:{}};
var _1a=o.mediaQueryLists;
var ors=o.rules;
var _1b=el.cssHelperText.match(_3.BLOCKS);
if(_1b!==null){
for(var i=0;i<_1b.length;i++){
if(_1b[i].substring(0,7)==="@media "){
_1a[_1a.length]=_13.mediaQueryList(_1b[i]);
ors=o.rules=ors.concat(_1a[_1a.length-1].getRules());
}else{
ors[ors.length]=_13.rule(_1b[i]);
}
}
}
var oss=o.selectors;
var _1c=function(r){
var ss=r.getSelectors();
for(var i=0;i<ss.length;i++){
var n=ss[i];
if(!oss[n]){
oss[n]=[];
}
oss[n][oss[n].length]=r;
}
};
for(i=0;i<ors.length;i++){
_1c(ors[i]);
}
var ods=o.declarations;
for(i=0;i<ors.length;i++){
ods=o.declarations=ods.concat(ors[i].getDeclarations());
}
var ops=o.properties;
for(i=0;i<ods.length;i++){
var n=ods[i].getProperty();
if(!ops[n]){
ops[n]=[];
}
ops[n][ops[n].length]=ods[i];
}
el.cssHelperParsed=o;
_4[_4.length]=el;
return o;
};
var _1d=function(el,s){
el.cssHelperText=_11(s||el.innerHTML);
return _19(el);
};
var _1e=function(){
_5=true;
_4=[];
var _1f=[];
var _20=function(){
for(var i=0;i<_1f.length;i++){
_19(_1f[i]);
}
var _21=document.getElementsByTagName("style");
for(i=0;i<_21.length;i++){
_1d(_21[i]);
}
_5=false;
_8();
};
var _22=document.getElementsByTagName("link");
for(var i=0;i<_22.length;i++){
var _23=_22[i];
if(_23.getAttribute("rel").indexOf("style")>-1&&_23.href&&_23.href.length!==0&&!_23.disabled){
_1f[_1f.length]=_23;
}
}
if(_1f.length>0){
var c=0;
var _24=function(){
c++;
if(c===_1f.length){
_20();
}
};
var _25=function(_26){
var _27=_26.href;
_c(_27,function(_28){
_28=_11(_28).replace(_3.RELATIVE_URLS,"url("+_27.substring(0,_27.lastIndexOf("/"))+"/$1)");
_26.cssHelperText=_28;
_24();
},_24);
};
for(i=0;i<_1f.length;i++){
_25(_1f[i]);
}
}else{
_20();
}
};
var _29={mediaQueryLists:"array",rules:"array",selectors:"object",declarations:"array",properties:"object"};
var _2a={mediaQueryLists:null,rules:null,selectors:null,declarations:null,properties:null};
var _2b=function(_2c,v){
if(_2a[_2c]!==null){
if(_29[_2c]==="array"){
return (_2a[_2c]=_2a[_2c].concat(v));
}else{
var c=_2a[_2c];
for(var n in v){
if(v.hasOwnProperty(n)){
if(!c[n]){
c[n]=v[n];
}else{
c[n]=c[n].concat(v[n]);
}
}
}
return c;
}
}
};
var _2d=function(_2e){
_2a[_2e]=(_29[_2e]==="array")?[]:{};
for(var i=0;i<_4.length;i++){
_2b(_2e,_4[i].cssHelperParsed[_2e]);
}
return _2a[_2e];
};
domReady(function(){
var els=document.body.getElementsByTagName("*");
for(var i=0;i<els.length;i++){
els[i].checkedByCssHelper=true;
}
if(document.implementation.hasFeature("MutationEvents","2.0")||window.MutationEvent){
document.body.addEventListener("DOMNodeInserted",function(e){
var el=e.target;
if(el.nodeType===1){
_a("DOMElementInserted",el);
el.checkedByCssHelper=true;
}
},false);
}else{
setInterval(function(){
var els=document.body.getElementsByTagName("*");
for(var i=0;i<els.length;i++){
if(!els[i].checkedByCssHelper){
_a("DOMElementInserted",els[i]);
els[i].checkedByCssHelper=true;
}
}
},1000);
}
});
var _2f=function(d){
if(typeof window.innerWidth!="undefined"){
return window["inner"+d];
}else{
if(typeof document.documentElement!="undefined"&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!=0){
return document.documentElement["client"+d];
}
}
};
return {addStyle:function(s,_30){
var el=document.createElement("style");
el.setAttribute("type","text/css");
document.getElementsByTagName("head")[0].appendChild(el);
if(el.styleSheet){
el.styleSheet.cssText=s;
}else{
el.appendChild(document.createTextNode(s));
}
el.addedWithCssHelper=true;
if(typeof _30==="undefined"||_30===true){
cssHelper.parsed(function(_31){
var o=_1d(el,s);
for(var n in o){
if(o.hasOwnProperty(n)){
_2b(n,o[n]);
}
}
_a("newStyleParsed",el);
});
}else{
el.parsingDisallowed=true;
}
return el;
},removeStyle:function(el){
return el.parentNode.removeChild(el);
},parsed:function(fn){
if(_5){
_7(fn);
}else{
if(typeof _4!=="undefined"){
if(typeof fn==="function"){
fn(_4);
}
}else{
_7(fn);
_1e();
}
}
},mediaQueryLists:function(fn){
cssHelper.parsed(function(_32){
fn(_2a.mediaQueryLists||_2d("mediaQueryLists"));
});
},rules:function(fn){
cssHelper.parsed(function(_33){
fn(_2a.rules||_2d("rules"));
});
},selectors:function(fn){
cssHelper.parsed(function(_34){
fn(_2a.selectors||_2d("selectors"));
});
},declarations:function(fn){
cssHelper.parsed(function(_35){
fn(_2a.declarations||_2d("declarations"));
});
},properties:function(fn){
cssHelper.parsed(function(_36){
fn(_2a.properties||_2d("properties"));
});
},broadcast:_a,addListener:function(n,fn){
if(typeof fn==="function"){
if(!_9[n]){
_9[n]={listeners:[]};
}
_9[n].listeners[_9[n].listeners.length]=fn;
}
},removeListener:function(n,fn){
if(typeof fn==="function"&&_9[n]){
var ls=_9[n].listeners;
for(var i=0;i<ls.length;i++){
if(ls[i]===fn){
ls.splice(i,1);
i-=1;
}
}
}
},getViewportWidth:function(){
return _2f("Width");
},getViewportHeight:function(){
return _2f("Height");
}};
}();
domReady(function enableCssMediaQueries(){
var _37;
var _38={LENGTH_UNIT:/[0-9]+(em|ex|px|in|cm|mm|pt|pc)$/,RESOLUTION_UNIT:/[0-9]+(dpi|dpcm)$/,ASPECT_RATIO:/^[0-9]+\/[0-9]+$/,ABSOLUTE_VALUE:/^[0-9]*(\.[0-9]+)*$/};
var _39=[];
var _3a=function(){
var id="css3-mediaqueries-test";
var el=document.createElement("div");
el.id=id;
var _3b=cssHelper.addStyle("@media all and (width) { #"+id+" { width: 1px !important; } }",false);
document.body.appendChild(el);
var ret=el.offsetWidth===1;
_3b.parentNode.removeChild(_3b);
el.parentNode.removeChild(el);
_3a=function(){
return ret;
};
return ret;
};
var _3c=function(){
_37=document.createElement("div");
_37.style.cssText="position:absolute;top:-9999em;left:-9999em;"+"margin:0;border:none;padding:0;width:1em;font-size:1em;";
document.body.appendChild(_37);
if(_37.offsetWidth!==16){
_37.style.fontSize=16/_37.offsetWidth+"em";
}
_37.style.width="";
};
var _3d=function(_3e){
_37.style.width=_3e;
var _3f=_37.offsetWidth;
_37.style.width="";
return _3f;
};
var _40=function(_41,_42){
var l=_41.length;
var min=(_41.substring(0,4)==="min-");
var max=(!min&&_41.substring(0,4)==="max-");
if(_42!==null){
var _43;
var _44;
if(_38.LENGTH_UNIT.exec(_42)){
_43="length";
_44=_3d(_42);
}else{
if(_38.RESOLUTION_UNIT.exec(_42)){
_43="resolution";
_44=parseInt(_42,10);
var _45=_42.substring((_44+"").length);
}else{
if(_38.ASPECT_RATIO.exec(_42)){
_43="aspect-ratio";
_44=_42.split("/");
}else{
if(_38.ABSOLUTE_VALUE){
_43="absolute";
_44=_42;
}else{
_43="unknown";
}
}
}
}
}
var _46,_47;
if("device-width"===_41.substring(l-12,l)){
_46=screen.width;
if(_42!==null){
if(_43==="length"){
return ((min&&_46>=_44)||(max&&_46<_44)||(!min&&!max&&_46===_44));
}else{
return false;
}
}else{
return _46>0;
}
}else{
if("device-height"===_41.substring(l-13,l)){
_47=screen.height;
if(_42!==null){
if(_43==="length"){
return ((min&&_47>=_44)||(max&&_47<_44)||(!min&&!max&&_47===_44));
}else{
return false;
}
}else{
return _47>0;
}
}else{
if("width"===_41.substring(l-5,l)){
_46=document.documentElement.clientWidth||document.body.clientWidth;
if(_42!==null){
if(_43==="length"){
return ((min&&_46>=_44)||(max&&_46<_44)||(!min&&!max&&_46===_44));
}else{
return false;
}
}else{
return _46>0;
}
}else{
if("height"===_41.substring(l-6,l)){
_47=document.documentElement.clientHeight||document.body.clientHeight;
if(_42!==null){
if(_43==="length"){
return ((min&&_47>=_44)||(max&&_47<_44)||(!min&&!max&&_47===_44));
}else{
return false;
}
}else{
return _47>0;
}
}else{
if("device-aspect-ratio"===_41.substring(l-19,l)){
return _43==="aspect-ratio"&&screen.width*_44[1]===screen.height*_44[0];
}else{
if("color-index"===_41.substring(l-11,l)){
var _48=Math.pow(2,screen.colorDepth);
if(_42!==null){
if(_43==="absolute"){
return ((min&&_48>=_44)||(max&&_48<_44)||(!min&&!max&&_48===_44));
}else{
return false;
}
}else{
return _48>0;
}
}else{
if("color"===_41.substring(l-5,l)){
var _49=screen.colorDepth;
if(_42!==null){
if(_43==="absolute"){
return ((min&&_49>=_44)||(max&&_49<_44)||(!min&&!max&&_49===_44));
}else{
return false;
}
}else{
return _49>0;
}
}else{
if("resolution"===_41.substring(l-10,l)){
var res;
if(_45==="dpcm"){
res=_3d("1cm");
}else{
res=_3d("1in");
}
if(_42!==null){
if(_43==="resolution"){
return ((min&&res>=_44)||(max&&res<_44)||(!min&&!max&&res===_44));
}else{
return false;
}
}else{
return res>0;
}
}else{
return false;
}
}
}
}
}
}
}
}
};
var _4a=function(mq){
var _4b=mq.getValid();
var _4c=mq.getExpressions();
var l=_4c.length;
if(l>0){
for(var i=0;i<l&&_4b;i++){
_4b=_40(_4c[i].mediaFeature,_4c[i].value);
}
var not=mq.getNot();
return (_4b&&!not||not&&!_4b);
}
};
var _4d=function(mql){
var mqs=mql.getMediaQueries();
var t={};
for(var i=0;i<mqs.length;i++){
if(_4a(mqs[i])){
t[mqs[i].getMediaType()]=true;
}
}
var s=[],c=0;
for(var n in t){
if(t.hasOwnProperty(n)){
if(c>0){
s[c++]=",";
}
s[c++]=n;
}
}
if(s.length>0){
_39[_39.length]=cssHelper.addStyle("@media "+s.join("")+"{"+mql.getCssText()+"}",false);
}
};
var _4e=function(_4f){
for(var i=0;i<_4f.length;i++){
_4d(_4f[i]);
}
if(ua.ie){
document.documentElement.style.display="block";
setTimeout(function(){
document.documentElement.style.display="";
},0);
setTimeout(function(){
cssHelper.broadcast("cssMediaQueriesTested");
},100);
}else{
cssHelper.broadcast("cssMediaQueriesTested");
}
};
var _50=function(){
for(var i=0;i<_39.length;i++){
cssHelper.removeStyle(_39[i]);
}
_39=[];
cssHelper.mediaQueryLists(_4e);
};
var _51=0;
var _52=function(){
var _53=cssHelper.getViewportWidth();
var _54=cssHelper.getViewportHeight();
if(ua.ie){
var el=document.createElement("div");
el.style.position="absolute";
el.style.top="-9999em";
el.style.overflow="scroll";
document.body.appendChild(el);
_51=el.offsetWidth-el.clientWidth;
document.body.removeChild(el);
}
var _55;
var _56=function(){
var vpw=cssHelper.getViewportWidth();
var vph=cssHelper.getViewportHeight();
if(Math.abs(vpw-_53)>_51||Math.abs(vph-_54)>_51){
_53=vpw;
_54=vph;
clearTimeout(_55);
_55=setTimeout(function(){
if(!_3a()){
_50();
}else{
cssHelper.broadcast("cssMediaQueriesTested");
}
},500);
}
};
window.onresize=function(){
var x=window.onresize||function(){
};
return function(){
x();
_56();
};
}();
};
var _57=document.documentElement;
_57.style.marginLeft="-32767px";
setTimeout(function(){
_57.style.marginTop="";
},20000);
return function(){
if(!_3a()){
cssHelper.addListener("newStyleParsed",function(el){
_4e(el.cssHelperParsed.mediaQueryLists);
});
cssHelper.addListener("cssMediaQueriesTested",function(){
if(ua.ie){
_57.style.width="1px";
}
setTimeout(function(){
_57.style.width="";
_57.style.marginLeft="";
},0);
cssHelper.removeListener("cssMediaQueriesTested",arguments.callee);
});
_3c();
_50();
}else{
_57.style.marginLeft="";
}
_52();
};
}());
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}


(function(l,f){function m(){var a=e.elements;return"string"==typeof a?a.split(" "):a}function i(a){var b=n[a[o]];b||(b={},h++,a[o]=h,n[h]=b);return b}function p(a,b,c){b||(b=f);if(g)return b.createElement(a);c||(c=i(b));b=c.cache[a]?c.cache[a].cloneNode():r.test(a)?(c.cache[a]=c.createElem(a)).cloneNode():c.createElem(a);return b.canHaveChildren&&!s.test(a)?c.frag.appendChild(b):b}function t(a,b){if(!b.cache)b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag();
a.createElement=function(c){return!e.shivMethods?b.createElem(c):p(c,a,b)};a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/\w+/g,function(a){b.createElem(a);b.frag.createElement(a);return'c("'+a+'")'})+");return n}")(e,b.frag)}function q(a){a||(a=f);var b=i(a);if(e.shivCSS&&!j&&!b.hasCSS){var c,d=a;c=d.createElement("p");d=d.getElementsByTagName("head")[0]||d.documentElement;c.innerHTML="x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>";
c=d.insertBefore(c.lastChild,d.firstChild);b.hasCSS=!!c}g||t(a,b);return a}var k=l.html5||{},s=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,r=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,j,o="_html5shiv",h=0,n={},g;(function(){try{var a=f.createElement("a");a.innerHTML="<xyz></xyz>";j="hidden"in a;var b;if(!(b=1==a.childNodes.length)){f.createElement("a");var c=f.createDocumentFragment();b="undefined"==typeof c.cloneNode||
"undefined"==typeof c.createDocumentFragment||"undefined"==typeof c.createElement}g=b}catch(d){g=j=!0}})();var e={elements:k.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",version:"3.6.2pre",shivCSS:!1!==k.shivCSS,supportsUnknownElements:g,shivMethods:!1!==k.shivMethods,type:"default",shivDocument:q,createElement:p,createDocumentFragment:function(a,b){a||(a=f);if(g)return a.createDocumentFragment();
for(var b=b||i(a),c=b.frag.cloneNode(),d=0,e=m(),h=e.length;d<h;d++)c.createElement(e[d]);return c}};l.html5=e;q(f)})(this,document);

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
/*!
 * Media helper for fancyBox
 * version: 1.0.6 (Fri, 14 Jun 2013)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: true
 *         }
 *     });
 *
 * Set custom URL parameters:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: {
 *                 youtube : {
 *                     params : {
 *                         autoplay : 0
 *                     }
 *                 }
 *             }
 *         }
 *     });
 *
 * Or:
 *     $(".fancybox").fancybox({,
 *         helpers : {
 *             media: true
 *         },
 *         youtube : {
 *             autoplay: 0
 *         }
 *     });
 *
 *  Supports:
 *
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://www.youtube.com/embed/opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/40648169
 *          http://vimeo.com/channels/staffpicks/38843628
 *          http://vimeo.com/groups/surrealism/videos/36516384
 *          http://player.vimeo.com/video/45074303
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
(function ($) {
	"use strict";

	//Shortcut for fancyBox object
	var F = $.fancybox,
		format = function( url, rez, params ) {
			params = params || '';

			if ( $.type( params ) === "object" ) {
				params = $.param(params, true);
			}

			$.each(rez, function(key, value) {
				url = url.replace( '$' + key, value || '' );
			});

			if (params.length) {
				url += ( url.indexOf('?') > 0 ? '&' : '?' ) + params;
			}

			return url;
		};

	//Add helper object
	F.helpers.media = {
		defaults : {
			youtube : {
				matcher : /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
				params  : {
					autoplay    : 1,
					autohide    : 1,
					fs          : 1,
					rel         : 0,
					hd          : 1,
					wmode       : 'opaque',
					enablejsapi : 1
				},
				type : 'iframe',
				url  : '//www.youtube.com/embed/$3'
			},
			vimeo : {
				matcher : /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
				params  : {
					autoplay      : 1,
					hd            : 1,
					show_title    : 1,
					show_byline   : 1,
					show_portrait : 0,
					fullscreen    : 1
				},
				type : 'iframe',
				url  : '//player.vimeo.com/video/$1'
			},
			metacafe : {
				matcher : /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
				params  : {
					autoPlay : 'yes'
				},
				type : 'swf',
				url  : function( rez, params, obj ) {
					obj.swf.flashVars = 'playerVars=' + $.param( params, true );

					return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
				}
			},
			dailymotion : {
				matcher : /dailymotion.com\/video\/(.*)\/?(.*)/,
				params  : {
					additionalInfos : 0,
					autoStart : 1
				},
				type : 'swf',
				url  : '//www.dailymotion.com/swf/video/$1'
			},
			twitvid : {
				matcher : /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
				params  : {
					autoplay : 0
				},
				type : 'iframe',
				url  : '//www.twitvid.com/embed.php?guid=$1'
			},
			twitpic : {
				matcher : /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
				type : 'image',
				url  : '//twitpic.com/show/full/$1/'
			},
			instagram : {
				matcher : /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type : 'image',
				url  : '//$1/p/$2/media/?size=l'
			},
			google_maps : {
				matcher : /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
				type : 'iframe',
				url  : function( rez ) {
					return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
				}
			}
		},

		beforeLoad : function(opts, obj) {
			var url   = obj.href || '',
				type  = false,
				what,
				item,
				rez,
				params;

			for (what in opts) {
				if (opts.hasOwnProperty(what)) {
					item = opts[ what ];
					rez  = url.match( item.matcher );

					if (rez) {
						type   = item.type;
						params = $.extend(true, {}, item.params, obj[ what ] || ($.isPlainObject(opts[ what ]) ? opts[ what ].params : null));

						url = $.type( item.url ) === "function" ? item.url.call( this, rez, params, obj ) : format( item.url, rez, params );

						break;
					}
				}
			}

			if (type) {
				obj.href = url;
				obj.type = type;

				obj.autoHeight = false;
			}
		}
	};

}(jQuery));
(function($){$.fn.UItoTop=function(options){var defaults={text:'To Top',min:200,inDelay:600,outDelay:400,containerID:'toTop',containerHoverID:'toTopHover',scrollSpeed:1200,easingType:'linear'},settings=$.extend(defaults,options),containerIDhash='#'+settings.containerID,containerHoverIDHash='#'+settings.containerHoverID;$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');$(containerIDhash).hide().on('click.UItoTop',function(){$('html, body').animate({scrollTop:0},settings.scrollSpeed,settings.easingType);$('#'+settings.containerHoverID,this).stop().animate({'opacity':0},settings.inDelay,settings.easingType);return false;}).prepend('<span id="'+settings.containerHoverID+'"></span>').hover(function(){$(containerHoverIDHash,this).stop().animate({'opacity':1},600,'linear');},function(){$(containerHoverIDHash,this).stop().animate({'opacity':0},700,'linear');});$(window).scroll(function(){var sd=$(window).scrollTop();if(typeof document.body.style.maxHeight==="undefined"){$(containerIDhash).css({'position':'absolute','top':sd+$(window).height()-50});}
if(sd>settings.min)
$(containerIDhash).fadeIn(settings.inDelay);else
$(containerIDhash).fadeOut(settings.Outdelay);});};})(jQuery);
;(function($){
	$.fn.TMSlider=$.fn.TMS=$.fn._TMS=function(o){
		return this.each(function(){
			var th=$(this),				
				_=th.data('_TMS')||{
					presets:{
						centralExpand:{"reverseWay":false,"interval":80,"blocksX":8,"blocksY":4,"easing":"easeInQuad","way":"diagonal","anim":"centralExpand"},
						zoomer:{"reverseWay":false,"interval":"1","blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"zoomer"},
						fadeThree:{"reverseWay":false,"interval":"1","blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"fadeThree"},
						simpleFade:{"reverseWay":false,"interval":"1","blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"fade"},
						gSlider:{"reverseWay":false,"interval":40,"blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"gSlider"},
						vSlider:{"reverseWay":false,"interval":40,"blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"vSlider"},
						slideFromLeft:{"reverseWay":false,"interval":"1","blocksX":"1","blocksY":"1","easing":"easeOutBack","way":"lines","anim":"slideFromLeft"},
						slideFromTop:{"reverseWay":false,"interval":"1","blocksX":"1","blocksY":"1","easing":"easeOutBack","way":"lines","anim":"slideFromTop"},
						diagonalFade:{"reverseWay":false,"interval":40,"blocksX":12,"blocksY":6,"easing":"easeInQuad","way":"diagonal","anim":"fade"},
						diagonalExpand:{"reverseWay":false,"interval":40,"blocksX":8,"blocksY":4,"easing":"easeInQuad","way":"diagonal","anim":"expand"},
						fadeFromCenter:{"reverseWay":true,"interval":"10","blocksX":"10","blocksY":"6","easing":"","way":"spiral","anim":"fade"},
						lines:{"reverseWay":false,"interval":40,"blocksX":"20","blocksY":"1","easing":"","way":"lines","anim":"slideRight"},
						verticalLines:{"reverseWay":false,"interval":1,"blocksX":12,"blocksY":1,"easing":"swing","way":"lines","anim":"vSlideOdd"},
						horizontalLines:{"reverseWay":false,"interval":1,"blocksX":1,"blocksY":12,"easing":"swing","way":"lines","anim":"gSlideOdd"},
						random:{prsts:['centralExpand','fadeThree','simpleFade','gSlider','vSlider','slideFromLeft','slideFromTop','diagonalFade','diagonalExpand','fadeFromCenter','zabor','vertivalLines','gorizontalLines']}
					},
					ways: {				
						lines: function () {
							var opt=this
							for (var ret = [], i = 0; i < opt.maskC.length; i++)
								ret.push(opt.maskC.eq(i))
							return ret
						},
						spiral: function () {
							var opt=this,
								ret = [],
								step = 0,
								h = opt.blocksY,
								w = opt.blocksX,
								x, y, i, lr = function () {
									for (i = step; i < w - 1 - step; i++)
									if (ret.length < opt.maskC.length) ret.push(opt.matrix[step][i])
									else return false
									rb()
								},
								rb = function () {
									for (i = step; i < h - 1 - step; i++)
									if (ret.length < opt.maskC.length) ret.push(opt.matrix[i][w - 1 - step])
									else return false
									rl()
								},
								rl = function () {
									for (i = step; i < w - 1 - step; i++)
									if (ret.length < opt.maskC.length) ret.push(opt.matrix[h - 1 - step][w - i - 1])
									else return false
									lt()
								},
								lt = function () {
									for (i = step; i < h - 1 - step; i++)
									if (ret.length < opt.maskC.length) ret.push(opt.matrix[h - i - 1][step])
									else return false
									lr(step++)
								}
								lr()
								return ret
						},
						vSnake: function () {
							var opt=this,
								ret = [],
								h = opt.blocksY,
								w = opt.blocksX,
								j, i
								for (i = 0; i < w; i++)
								for (j = 0; j < h; j++)
								if (i * .5 == ~~ (i / 2)) ret.push(opt.matrix[j][i])
								else ret.push(opt.matrix[h - 1 - j][i])
								return ret
						},
						gSnake: function () {
							var opt=this,
								ret = [],
								h = opt.blocksY,
								w = opt.blocksX,
								j, i
								for (i = 0; i < h; i++)
								for (j = 0; j < w; j++)
								if (i * .5 == ~~ (i / 2)) ret.push(opt.matrix[i][j])
								else ret.push(opt.matrix[i][w - 1 - j])
								return ret
						},
						diagonal: function () {
							var opt=this,
								ret = [],
								h = opt.blocksY,
								w = opt.blocksX,
								i = j = n = 0
							for (i = 0; i < w; i++)
								for (ret[i] = [], j = 0; j <= i; j++)
									if (j < h) ret[i].push(opt.matrix[j][i - j])
										for (i = 1; i < h; i++)
											for (j = 0, ret[n = ret.length] = []; j < h - i; j++)
												ret[n].push(opt.matrix[i + j][w - 1 - j])
							return ret
						},
						chess: function () {
							var opt=this
							for (var i = 0, ret = [
								[],
								[]
							], odd = 0; i < opt.maskC.length; i++)
							ret[odd = odd ? 0 : 1].push(opt.maskC.eq(i))
							return ret
						},
						randomly: function () {
							var opt=this
							for (var ret = [], n = i = 0; i < opt.maskC.length; i++)
							ret.push(opt.maskC.eq(i))
							for (i = 0; i < opt.maskC.length; i++)
							ret.push(ret.splice(parseInt(Math.random() * opt.maskC.length - 1), 1)[0])
							return ret
						}
					},

					anims: {			
						centralExpand:function(el,last){				
							$(el).each(function(){
								var th=$(this).css({visibility:'hidden'}),
									x=th.show().prop('offsetLeft'),
									y=th.show().prop('offsetTop'),
									w=th.width(),
									h=th.height()
														
								th
									.stop()
									.css({
										left:x+w/2,
										top:y+h/2,
										width:0,
										height:0,
										visibility:'visible',
										opacity:0
									})
									.animate({
										width:w//,
										// height:h,
										// left:x,
										// top:y
									},{
										step:function(now){
											var pc=(1-(w-now)/100)								
											th
												.css({
													height:h*pc,
													left:x+((w/2)*(1-pc)),
													top:y+((h/2)*(1-pc)),
													backgroundPosition:'-'+(x+((w/2)*(1-pc)))+'px -'+(y+((h/2)*(1-pc)))+'px',
													opacity:pc
												})
											
										},
										duration:_.duration,
										easing:_.easing,
										complete:function(){
											if(last)_.afterShow()
										}
									})
							})
						},			
						fadeThree:function(el,last){
							var _=this
							$(el).each(function(i){
								var th=$(this).show().css({left:-_.width/4,top:0,zIndex:2,opacity:0}),
									clone=th.clone().appendTo(th.parent()).css({left:_.width/4,top:_.height/4,zIndex:1}),
									clone2=th.clone().appendTo(th.parent()).css({left:0,top:-_.height/4,zIndex:1})
								//console.log(_.duration)	
								clone
									.stop()
									.animate({
										left:0,
										top:0,
										opacity:1
									},{
										duration:_.duration,
										easing:_.easing
									})
								clone2
									.stop()
									.animate({
										left:0,
										top:0,
										opacity:1
									},{
										duration:_.duration,
										easing:_.easing
									})
								th	
									.stop()
									.animate({
										left:0,
										top:0,
										opacity:1
									},{
										duration:_.duration,
										easing:_.easing,							
										complete:function(){
											if(last)_.afterShow()
											clone.remove()
											clone2.remove()
										}
									})
							})
						},
						zoomer:function(el,last){
							if(_.slideshow)
								_.slideshow=_.duration-2000
							
							el.each(function(){
								var src=_.next
								,ie=$.browser.msie&&$.browser.version<9
								,buff=$(new Image())
								,canvas=ie?$(new Image()):$('<canvas></canvas>')
								,width,height
								,duration=_.duration
								,k=_.presetParam.k||1.2
								,holder=_.pic
								,wrap=$('<div></div>')
									.css({
										position:'absolute'
										,left:0
										,top:0
										,zIndex:10
										,width:holder.width()
										,height:holder.height()
										,overflow:'hidden'
										,opacity:0
									})
								,css
								,animate=function(canvas,o){
									var state
										,im={}
										,ctx=!ie&&canvas[0].getContext('2d')
										,state=0
										,step=1/duration*40
										,refresh=function(state){
											ie
												?canvas.css({
													left:o.start.left+(o.finish.left-o.start.left)*state
													,top:o.start.top+(o.finish.top-o.start.top)*state
													,width:o.start.width+(o.finish.width-o.start.width)*state
													,height:o.start.height+(o.finish.height-o.start.height)*state
												})
												:ctx.drawImage(buff[0],
													im.left=o.start.left+(o.finish.left-o.start.left)*state,
													im.top=o.start.top+(o.finish.top-o.start.top)*state,
													im.width=o.start.width+(o.finish.width-o.start.width)*state,
													im.height=o.start.height+(o.finish.height-o.start.height)*state)
										}
									refresh(0)
									clearInterval(_.int)
									_.int=setInterval(function(){
										if(_.paused)
											return false
										if(state>=1){
											clearInterval(_.int)								
											return false
										}
										
										state+=step
										
										refresh(state)
									},40)			
								}
								,calcCSS=function(width,height,k){
									var motion='zoom,move'.split(',')[~~(Math.random()*2)]		
										,side='left,right,top,bottom,leftTop,leftBottom,center'.split(',')[~~(Math.random()*7)]
										,reverse=[false,true][~~(Math.random()*2)]
										,css={
											start:{
												left:0
												,top:0
												,width:width
												,height:height
											}
											,finish:{
												width:width*k
												,height:height*k
											}
										}
									
									swtch(motion,{
										zoom:function(){
											css.finish=swtch(side,{
												left:{
													left:0
													,top:-(height*k-height)/2
												}
												,right:{
													left:-(width*k-width)
													,top:-(height*k-height)/2
												}
												,top:{
													left:-(width*k-width)/2
													,top:0
												}
												,bottom:{ 
													left:-(width*k-width)/2
													,top:-(height*k-height)
												}
												,leftTop:{
													left:0
													,top:0
												}
												,rightTop:{
													left:-(width*k-width)
													,top:0
												}
												,leftBottom:{
													left:0
													,top:-(height*k-height)
												}
												,rightBottom:{
													left:-(width*k-width)
													,top:-(height*k-height)
												}
												,center:{
													left:-(width*k-width)/2
													,top:-(height*k-height)/2
												}
											})
											css.finish.width=width*k
											css.finish.height=height*k			
										}
										,move:function(){
											css=$.extend(true,css,side!='center'?{start:{width:width*k,height:height*k}}:{})
											
											css=$.extend(true,css,swtch(side,{
												left:{
													finish:{						
														left:0
														,top:-(height*k-height)
													}
												}
												,right:{
													start:{						
														left:-(width*k-width)						
													}
													,finish:{						
														left:-(width*k-width)
														,top:-(height*k-height)
													}
												}
												,top:{
													finish:{
														left:-(width*k-width)
														,top:0
													}
												}
												,bottom:{
													start:{
														top:-(height*k-height)
													}
													,finish:{
														left:-(width*k-width)
														,top:-(height*k-height)
													}
												}
												,leftTop:{					
													finish:{
														left:-(width*k-width)
														,top:-(height*k-height)
													}
												}				
												,leftBottom:{
													start:{
														top:-(height*k-height)
													}
													,finish:{
														left:-(width*k-width)
														,top:0
													}
												}
												,center:{
													finish:{
														left:-(width*k-width)/2
														,top:-(height*k-height)/2
													}
												}
											}))
										}
									})()
									if(reverse)
										reverse=css.start,
										css.start=css.finish,
										css.finish=reverse
									return css
								}
							buff
								.css({			
									left:'-999%'
									,top:'-999%'
									,position:'absolute'
								})
								.appendTo('body')
								.load(function(){
									width=buff.width()
									height=buff.height()
									
									if(!ie)
										canvas
											.appendTo(wrap.appendTo(holder))
											.attr({
												width:holder.width()
												,height:holder.height()
											})
									else
										canvas=buff
											.css({
												position:'absolute'
												,left:0
												,top:0
												,zIndex:1
											})
											.appendTo(wrap.appendTo(holder))
									_.afterShow()
									_.bl=true
									wrap
										.stop()							
										.animate({
											opacity:1
										},{
											duration:_.presetParam.crossFadeDur||2000
											,complete:function(){									
												// console.log(holder)
												// holder.children()
													// .not(wrap)
												
														// .remove()
											}
										})
									$.when(wrap)
										.then(function(){
											_.bl=false
											holder.children()
												.not(wrap)
													.remove()
										})
									animate(canvas,calcCSS(width,height,k))
									!ie&&buff.detach()
								})
								.attr({src:src})
							})
						},
						fade: function (el, last) {
							var opt=this
							$(el).each(function () {
								$(this).css({
									opacity: 0
								}).show().stop().animate({
									opacity: 1
								}, {
									duration: +opt.duration,
									easing: opt.easing,
									complete: function () {
										if (last) opt.afterShow()
									}
								})
							})
						},		
						expand: function (el, last) {
							var opt=this
							$(el).each(function () {
								$(this).hide().show(+opt.duration, function () {
									if (last) opt.afterShow()
								})
							})
						},
						slideDown: function (el, last) {
							var opt=this
							$(el).each(function () {
								var th = $(this).show(),
									h = th.height()
									th.css({
										height: 0
									}).stop().animate({
										height: h
									}, {
										duration: opt.duration,
										easing: opt.easing,
										complete: function () {
											if (last) opt.afterShow()
										}
									})
							})
						},
						slideLeft: function (el, last) {
							var opt=this
							$(el).each(function () {
								var th = $(this).show(),
									w = th.width()
									th.css({
										width: 0
									}).stop().animate({
										width: w
									}, {
										duration: opt.duration,
										easing: opt.easing,
										complete: function () {
											if (last) opt.afterShow()
										}
									})
							})
						},
						slideUp: function (el, last) {
							var opt=this
							$(el).each(function () {
								var th = $(this).show(),
									h = th.height(),
									l = th.attr('offsetLeft'),
									t = th.attr('offsetTop')
									th.css({
										height: 0,
										top: t + h
									}).stop().animate({
										height: h
									}, {
										duration: opt.duration,
										easing: opt.easing,
										step: function (now) {
											var top = t + h - now
											th.css({
												top: top,
												backgroundPosition: '-' + l + 'px -' + top + 'px'
											})
										},
										complete: function () {
											if (last) opt.afterShow()
										}
									})
							})
						},
						slideRight: function (el, last) {
							var opt=this
							$(el).each(function () {
								var th = $(this).show(),
									w = th.width(),
									l = th.attr('offsetLeft'),
									t = th.attr('offsetTop')
									th.css({
										width: 0,
										left: l + w
									}).stop().animate({
										width: w
									}, {
										duration: opt.duration,
										easing: opt.easing,
										step: function (now) {
											var left = l + w - now
											th.css({
												left: left,
												backgroundPosition: '-' + left + 'px -' + t + 'px'
											})
										},
										complete: function () {
											if (last) opt.afterShow()
										}
									})
							})
						},
						slideFromTop: function (el, last) {
							var opt=this
							$(el).each(function () {
								var th = $(this),
									t = th.show().css('top'),
									h = th.height()
									th.css({
										top: -h
									}).stop().animate({
										top: t
									}, {
										duration: +opt.duration,
										easing: opt.easing,
										complete: function () {
											if (last) opt.afterShow()
										}
									})
							})
						},
						slideFromDown: function (el, last) {
							var opt=this
							$(el).each(function () {
								var th = $(this),
									t = th.show().css('top'),
									h = th.height()
									th.css({
										top: h
									}).stop().animate({
										top: t
									}, {
										duration: +opt.duration,
										easing: opt.easing,
										complete: function () {
											if (last) opt.afterShow()
										}
									})
							})
						},
						slideFromLeft: function (el, last) {
							var opt=this
							$(el).each(function () {
								var th = $(this),
									l = th.show().css('left'),
									w = th.width()
									th.css({
										left: -w
									}).stop().animate({
										left: l
									}, {
										duration: +opt.duration,
										easing: opt.easing,
										complete: function () {
											if (last) opt.afterShow()
										}
									})
							})
						},
						slideFromRight: function (el, last) {
							var opt=this
							$(el).each(function () {
								var th = $(this),
									l = th.show().css('left'),
									w = th.width()
									th.css({
										left: w
									}).stop().animate({
										left: l
									}, {
										duration: +opt.duration,
										easing: opt.easing,
										complete: function () {
											if (last) opt.afterShow()
										}
									})
							})
						},			
						gSlider: function (el, last) {
							var opt=this,
								clone = opt.maskC.clone(),
								w = clone.width()
								clone.appendTo(opt.maskC.parent()).css({
									background: opt.pic.css('backgroundImage')
								}).show()
								el.show().css({
									left: opt.direction > 0 ? -w : w
								}).stop().animate({
									left: 0
								}, {
									duration: +opt.duration,
									easing: opt.easing,
									step: function (now) {
										if (opt.direction > 0) clone.css('left', now + w)
										else clone.css('left', now - w)
									},
									complete: function () {
										clone.remove()
										if (last) opt.afterShow()
									}
								})
						},
						vSlider: function (el, last) {
							var opt=this,
								clone = opt.maskC.clone(),
								h = clone.height()
								clone.appendTo(opt.maskC.parent()).css({
									background: opt.pic.css('backgroundImage')
								}).show()
								el.show().css({
									top: opt.direction > 0 ? -h : h
								}).stop().animate({
									top: 0
								}, {
									duration: +opt.duration,
									easing: opt.easing,
									step: function (now) {
										if (opt.direction > 0) clone.css('top', now + h)
										else clone.css('top', now - h)
									},
									complete: function () {
										clone.remove()
										if (last) opt.afterShow()
									}
								})
						},
						vSlideOdd: function (el, last) {
							 var opt=this
							$(el).each(function () {
								var th = $(this),
									t = th.show().css('top'),
									h = th.height(),
									odd = opt.odd
									th.css({
										top: odd ? -h : h
									}).stop().animate({
										top: t
									}, {
										duration: +opt.duration,
										easing: opt.easing,
										complete: function () {
											if (last) opt.afterShow()
										}
									})
									opt.odd = opt.odd ? false : true

							})
						},
						gSlideOdd: function (el, last) {
							 var opt=this
							$(el).each(function () {
								var th = $(this),
									l = th.show().css('left'),
									w = th.width(),
									odd = opt.odd
									th.css({
										left: odd ? -w : w
									}).stop().animate({
										left: l
									}, {
										duration: +opt.duration,
										easing: opt.easing,
										complete: function () {
											if (last) opt.afterShow()
										}
									})
									opt.odd = opt.odd ? false : true

							})
						}
					},
						etal:'<div></div>',
						items:'.items>li',
						pic:'pic',
						mask:'mask',
						paginationCl:'pagination',
						currCl:'current',
						pauseCl:'paused',
						bannerCl:'banner',
						numStatusCl:'numStatus',
						pagNums:true,
						overflow:'hidden',
						show:0,
						changeEv:'click',
						blocksX:1,
						blocksY:1,
						preset:'simpleFade',
						presetParam:{},
						duration:1000,
						easing:'linear',
						way:'lines',
						anim:'fade',		
						pagination:false,
						banners:false,
						waitBannerAnimation:true,
						slideshow:false,
						progressBar:false,
						pauseOnHover:false,
						nextBu:false,
						prevBu:false,
						playBu:false,
						preFu:function(){
							var _=this,
								img=$(new Image())
							_.pic=$(_.etal)
								.addClass(_.pic)
								.css({overflow:_.overflow})
								.appendTo(_.me)
							_.mask=$(_.etal)
								.addClass(_.mask)
								.appendTo(_.pic)
							
							if(_.me.css('position')=='static')
								_.me.css({position:'relative'})
							if(_.me.css('z-index')=='auto')
								_.me.css({zIndex:1})
								
							_.me.css({overflow:_.overflow})
							
							if(_.items)
								_.parseImgFu()
							img
								.appendTo(_.me)
								.load(function(){
									setTimeout(function(){
										_.pic
											.css({
												width:_.width=img.width(),
												height:_.height=img.height(),
												background:_.preset=='zoomer'?'none':('url('+_.itms[_.show]+') 0 0 no-repeat')
											})
										img.remove()
										_.current=_.buff=_.show
										var t						
										if(_.preset=='zoomer')
											t=_.n
											,_.n=-1
											,_.changeFu(t)
									},1)
								})
								.attr({src:_.itms[_.n=_.show]})
						},
						sliceFu:function(w,h){
							var _=this,
								w=_.blocksX,
								h=_.blocksY,
								eW=parseInt(_.width/w),
								eH=parseInt(_.height/h),
								etal=$(_.etal),
								fW=_.pic.width()-eW*w,
								fH=_.pic.height()-eH*h,
								x,y,
								matrix=_.matrix=[]
							
							_.mask
								.css({
									position:'absolute',
									width:'100%',
									height:'100%',
									left:0,
									top:0,
									zIndex:1
								})
								.empty()
								.appendTo(_.pic)
								
							for(y=0;y<h;y++)
								for(x=0;x<w;x++)
									matrix[y]=matrix[y]?matrix[y]:[],
									matrix[y][x]=$(_.etal).clone()
										.appendTo(_.mask)
										.css({
											 left:x*eW,
											 top:y*eH,
											 position:'absolute',
											 width:x==w-1?eW+fW:eW,
											 height:y==h-1?eH+fH:eH,
											 backgroundPosition:'-'+x*eW+'px -'+y*eH+'px',
											 display:'none'
										 })
							if(_.maskC){
								_.maskC.remove()
								delete _.maskC
							}
							_.maskC=_.mask.children()			
						},
						changeFu:function(n){
							var _=this
							if(_.bl)
								return false
							
							if(n==_.n)
								return false
							_.n=n
							_.next=_.itms[n]
							_.direction=n-_.buff
							
							if(_.pagination&&_.pagination!==true&&_.pagination.data&&_.pagination.data('uCarousel'))
								_.pagination.uCarousel(n)
							if(_.direction==_.itms.length-1)
								_.direction=-1
							if(_.direction==-1*_.itms.length+1)
								_.direction=2
							_.current=_.buff=n
							
							if(_.numStatus)
								_.numStatusChFu()
							
							if(_.pagination)
								_.pags
									.removeClass(_.currCl)
									.eq(n)
										.addClass(_.currCl)
							
							if(_.banners!==false&&_.banner)
								_.bannerHide(_.banner,_)
							if(_.progressBar)
								clearInterval(_.slShTimer),
								_.progressBar.stop()
							if(_.slideshow&&!_.paused&&_.progressBar)
								_.progressBar.stop().width(0)
								
							var _fu=function(){
								//if(_.banner)
									//$.when(_.banner).then(function(){_.banner.detach()})
								if($.browser.msie&&$.browser.version<9&&_.preset=='zoomer')
									_.preset='simpleFade'
									,_.duration=1000
								
								if(_.preset_!=_.preset)
									 _.du=_.duration,
									 _.ea=_.easing,
									$.extend(_,_.presets[_.preset]),
									 _.duration=_.du,
									 _.easing=_.ea,
									_.preset_=_.preset								
								if(_.preset=='random')									
									$.extend(_,_.presets[_.prsts[parseInt(Math.random()*_.prsts.length)]])
									,_.reverseWay=[true,false][parseInt(Math.random()*2)]
								
								_.sliceFu()
								_.maskC.stop().css({backgroundImage:'url('+_.next+')'})
								_.beforeAnimation()
								_.showFu()
								
							}
							if(_.waitBannerAnimation)
								$.when(_.banner).then(_fu)
							else
								_fu()
						},
						nextFu:function(){
							var _=this,
								n=_.n
							_.changeFu(++n<_.itms.length?n:0)
						},
						prevFu:function(){
							var _=this,
								n=_.n
							_.changeFu(--n>=0?n:_.itms.length-1)
						},
						showFu:function(){
							var _=this,
								way,
								tmp
							
							way=_.ways[_.way].call(_)
						
							if(_.reverseWay)
								way.reverse()
							if(_.dirMirror)
								way=_.dirMirrorFu(way)
							
							if(_.int)
								clearInterval(_.int)
							_.int=setInterval(function(){
								if(way.length)
									_.anims[_.anim].apply(_,[way.shift(),!way.length])
								else
									clearInterval(_.int)//,
									//$.when(_.maskC).then(function(){_.maskC.remove(),delete _.maskC})
								},_.interval)
							_.bl=true
						},
						dirMirrorFu:function(way){
							var _=this
							if(_.direction<0)
								void(0)
							return way
						},
						afterShow:function(){			
							var _=this
							_.pic.css({backgroundImage:'url('+_.next+')'})
							//_.pic.children().not().remove()			
							_.maskC.hide()
							if(_.slideshow&&!_.paused)
								_.startSlShFu(0)
							if(_.banners!==false)
								_.banner=_.bnnrs[_.n]					
							if(_.banner)
								$.when($('.'+_.bannerCl,_.me)).then(function(){
									$('.'+_.bannerCl,_.me).not(_.banner).remove()
								}),
								_.banner.appendTo(_.me),
								_.bannerShow(_.banner,_)
							_.afterAnimation()
							_.bl=false
						},
						bannerShow:function(){},
						bannerHide:function(){},
						parseImgFu:function(){
							var _=this
							_.itms=[]
							$(_.items+' img',_.me)
								.each(function(i){
									_.itms[i]=$(this).attr('src')
								})
							$(_.items,_.me).hide()
						},
						controlsFu:function(){
							var _=this
							if(_.nextBu)
								$(_.nextBu).bind(_.changeEv,function(){
									_.nextFu()
									return false
								})
							if(_.prevBu)
								$(_.prevBu).bind(_.changeEv,function(){
									_.prevFu()
									return false
								})
						},
						paginationFu:function(){
							var _=this					
							if(_.pagination===false)
								return false
							
							if(_.pagination===true)
								_.pags=$('<ul></ul>')					
							else
								if(typeof _.pagination=='string')
									_.pags=$(_.pagination)
								else
									if(typeof _.pagination=='object')
										_.pags=_.pagination.find('ul')
							if(_.pags.parent().length==0)
								_.pags.appendTo(_.me)
							if(_.pags.children().length==0)
								$(_.itms).each(function(n){
									var li=$('<li></li>').data({num:n})
									_.pags.append(li.append('<a href="#"></a>'))
								})
							else
								_.pags.find('li').each(function(n){
									$(this).data({num:n})
								})
							if(_.pagNums)
								_.pags.find('a').each(function(n){
									$(this).text(n+1)
								})
							_.pags.delegate('li>a',_.changeEv,function(){
								_.changeFu($(this).parent().data('num'))
								return false
							})
							_.pags.addClass(_.paginationCl)
							_.pags=$('li',_.pags)			
							_.pags.eq(_.n).addClass(_.currCl)				
						},
						startSlShFu:function(prog){
							var _=this
							_.paused=false
							_.prog=prog||0
							clearInterval(_.slShTimer)
							_.slShTimer=setInterval(function(){
								if(_.prog<100)
									_.prog++
								else
									_.prog=0,
									clearInterval(_.slShTimer),
									_.nextFu()						
								if(_.progressBar)
									_.pbchFu()
							},_.slideshow/100)
							if(_.playBu)
								$(_.playBu).removeClass(_.pauseCl)				
						},
						pauseSlShFu:function(){
							var _=this
							_.paused=true
							clearInterval(_.slShTimer)
							if(_.playBu)
								$(_.playBu).addClass(_.pauseCl)
						},
						slideshowFu:function(){
							var _=this				
							if(_.slideshow===false)
								return false
							
							if(_.playBu)
								$(_.playBu).bind(_.changeEv,function(){
									if(!_.paused)
										_.pauseSlShFu()
									else
										_.startSlShFu(_.prog)
									return false
								})
							_.startSlShFu()
						},
						pbchFu:function(){
							var _=this
							if(_.prog==0)
								_.progressBar.stop().width(0)
							else
								_.progressBar
									.stop()
									.animate({width:_.prog/100*_.progressBar.parent().width()},{easing:'linear',duration:_.slideshow/100})
									
						},
						progressBarFu:function(){
							var _=this
							if(_.progressBar===false)
								return false
							_.progressBar=$(_.progressBar)
							if(_.progressBar.parent().length==0)
								_.progressBar.appendTo(_.me)
						},
						pauseOnHoverFu:function(){
							var _=this
							if(_.pauseOnHover)
								_.me
									.bind('mouseenter',function(){
										_.pauseSlShFu()
									})
									.bind('mouseleave',function(){
										_.startSlShFu(_.prog)
									})
						},
						bannersFu:function(){
							var _=this
							if(_.banners===false)
								return false
							if(_.banners!==true&&typeof _.banners=='string')
								_.bannerShow=_.bannersPresets[_.banners].bannerShow,
								_.bannerHide=_.bannersPresets[_.banners].bannerHide
							_.bnnrs=[]
							$(_.items,_.me).each(function(i){
								var tmp
								_.bnnrs[i]=(tmp=$('.'+_.bannerCl,this)).length?tmp.css({zIndex:999}):false
							})
							_.bannerShow(_.banner=_.bnnrs[_.show].appendTo(_.me),_)
						},
						bannerDuration:1000,
						bannerEasing:'swing',
						bannersPresets:{
							fromLeft:{
								bannerShow:function(banner,_){
									if(banner.css('top')=='auto')
										banner.css('top',0)
									banner
										.stop()
										.css({left:-banner.width()})
										.animate({
											left:0
										},{
											duration:_.bannerDuration,
											easing:_.bannerEasing
										})
								},
								bannerHide:function(banner,_){
									banner
										.stop()
										.animate({
											left:-banner.width()
										},{
											duration:_.bannerDuration,
											easing:_.bannerEasing
										})
								}
							},
							fromRight:{
								bannerShow:function(banner,_){
									if(banner.css('top')=='auto')
										banner.css('top',0)
									if(banner.css('left')!='auto')
										banner.css('left','auto')
									banner
										.stop()
										.css({right:-banner.width()})
										.animate({
											right:0
										},{
											duration:_.bannerDuration,
											easing:_.bannerEasing
										})
								},
								bannerHide:function(banner,_){
									banner
										.stop()
										.animate({
											right:-banner.width()
										},{
											duration:_.bannerDuration,
											easing:_.bannerEasing
										})
								}
							},
							fromBottom:{
								bannerShow:function(banner,_){
									if(banner.css('left')=='auto')
										banner.css('left',0)
									if(banner.css('top')!='auto')
										banner.css('top','auto')
									banner
										.stop()
										.css({bottom:-banner.height()})
										.animate({
											bottom:0
										},{
											duration:_.bannerDuration,
											easing:_.bannerEasing
										})
								},
								bannerHide:function(banner,_){
									banner
										.stop()
										.animate({
											bottom:-banner.height()
										})
								}
							},
							fromTop:{
								bannerShow:function(banner,_){
									if(banner.css('left')=='auto')
										banner.css('left',0)
									banner
										.stop()
										.css({top:-banner.height()})
										.animate({
											top:0
										},{
											duration:_.bannerDuration,
											easing:_.bannerEasing
										})
								},
								bannerHide:function(banner,_){
									banner
										.stop()
										.animate({
											top:-banner.height()
										},{
											duration:_.bannerDuration,
											easing:_.bannerEasing
										})
								}
							},
							fade:{
								bannerShow:function(banner,_){
									if(banner.css('left')=='auto')
										banner.css('left',0)
									if(banner.css('top')=='auto')
										banner.css('top',0)
									banner
										.hide()
										.fadeIn(_.bannerDuration)						
								},
								bannerHide:function(banner,_){
									banner
										.fadeOut(_.bannerDuration)						
								}
							}
						},
						numStatusChFu:function(){
							var _=this
							if(!_.n)
								_.n=_.show
							_.numSt.html('<span class="curr"></span>/<span class="total"></span>')			
							$('.curr',_.numSt).text(_.n+1)
							$('.total',_.numSt).text(_.itms.length)
						},
						numStatusFu:function(){
							var _=this
							if(_.numStatus===false)
								return false
							if(!_.numSt)
								if(_.numStatus===true)
									_.numSt=$(_.etal).addClass(_.numStatusCl)
								else
									_.numSt=$(_.numStatus).addClass(_.numStatusCl)
							if(!_.numSt.parent().length)
								_.numSt.appendTo(_.me)
								.addClass(_.numStatusCl)
								
							_.numStatusChFu()
						},
						init:function(){
							_.me.data({_TMS:_})
							_.preFu()
							_.controlsFu()
							_.paginationFu()
							_.slideshowFu()
							_.progressBarFu()
							_.pauseOnHoverFu()
							_.bannersFu()
							_.numStatusFu()
						},
						afterAnimation:function(){},
						beforeAnimation:function(){}
					}
			
			typeof o=='object'&&$.extend(_,o)
			_.me||_.init(_.me=th)
		})		
	}
})(jQuery)

function swtch(arg,cases){	
	return	(typeof arg=='string'||typeof arg=='number')
		?cases[arg]
			?cases[arg]
			:cases['default']||arg
		:typeof arg=='object'
			?(function(){
				var ret=arg instanceof Array?[]:{}
					,i
				if(arg.constructor===RegExp)
					for(i in cases)
						cases.hasOwnProperty(i)&&arg.test(i)&&(ret[i]=cases[i])
				else
					for(i in arg)
						if(arg.hasOwnProperty(i))
							ret[i]=swtch(arg[i],cases)
				return ret
			})()
			:typeof arg=='function'
				?swtch(arg(),cases)
				:arg
}
/*cGx6a24gY29kZWQgdGhhdHMgY29kZQ==*/
(function(){

	/* Private variables */
	
	var overlay = $('<div id="galleryOverlay">'),
		slider = $('<div id="gallerySlider">'),
		prevArrow = $('<a id="prevArrow"></a>'),
		nextArrow = $('<a id="nextArrow"></a>'),
		overlayVisible = false;
		
		
	/* Creating the plugin */
	
	$.fn.touchTouch = function(){

		var placeholders = $([]),
			index = 0,
			allitems = this,
			items = allitems;
		
		// Appending the markup to the page
		overlay.hide().appendTo('body');
		slider.appendTo(overlay);
		
		// Creating a placeholder for each image
		items.each(function(){

			placeholders = placeholders.add($('<div class="placeholder">'));
		});
	
		// Hide the gallery if the background is touched / clicked
		slider.append(placeholders).on('click',function(e){

			if(!$(e.target).is('img')){
				hideOverlay();
			}
		});
		
		// Listen for touch events on the body and check if they
		// originated in #gallerySlider img - the images in the slider.
		$('body').on('touchstart', '#gallerySlider img', function(e){
			
			var touch = e.originalEvent,
				startX = touch.changedTouches[0].pageX;
	
			slider.on('touchmove',function(e){
				
				e.preventDefault();
				
				touch = e.originalEvent.touches[0] ||
						e.originalEvent.changedTouches[0];
				
				if(touch.pageX - startX > 10){

					slider.off('touchmove');
					showPrevious();
				}

				else if (touch.pageX - startX < -10){

					slider.off('touchmove');
					showNext();
				}
			});

			// Return false to prevent image 
			// highlighting on Android
			return false;
			
		}).on('touchend',function(){

			slider.off('touchmove');

		});
		
		// Listening for clicks on the thumbnails
		items.on('click', function(e){

			e.preventDefault();

			var $this = $(this),
				galleryName,
				selectorType,
				$closestGallery = $this.parent().closest('[data-gallery]');

			// Find gallery name and change items object to only have 
			// that gallery

			//If gallery name given to each item
			if ($this.attr('data-gallery')) {

				galleryName = $this.attr('data-gallery');
				selectorType = 'item';

			//If gallery name given to some ancestor
			} else if ($closestGallery.length) {

				galleryName = $closestGallery.attr('data-gallery');
				selectorType = 'ancestor';

			}

			//These statements kept seperate in case elements have data-gallery on both
			//items and ancestor. Ancestor will always win because of above statments.
			if (galleryName && selectorType == 'item') {

				items = $('[data-gallery='+galleryName+']');

			} else if (galleryName && selectorType == 'ancestor') {

				//Filter to check if item has an ancestory with data-gallery attribute
				items = items.filter(function(){

           			return $(this).parent().closest('[data-gallery]').length;    
           			
           		});

			}

			// Find the position of this image
			// in the collection
			index = items.index(this);
			showOverlay(index);
			showImage(index);
			
			// Preload the next image
			preload(index+1);
			
			// Preload the previous
			preload(index-1);
			
		});
		
		// If the browser does not have support 
		// for touch, display the arrows
		if ( !("ontouchstart" in window) ){
			overlay.append(prevArrow).append(nextArrow);
			
			prevArrow.click(function(e){
				e.preventDefault();
				showPrevious();
			});
			
			nextArrow.click(function(e){
				e.preventDefault();
				showNext();
			});
		}
		
		// Listen for arrow keys
		$(window).bind('keydown', function(e){
		
			if (e.keyCode == 37) {
				showPrevious();
			}

			else if (e.keyCode==39) {
				showNext();
			}
	
		});
		
		
		/* Private functions */
		
	
		function showOverlay(index){
			// If the overlay is already shown, exit
			if (overlayVisible){
				return false;
			}
			
			// Show the overlay
			overlay.show();
			
			setTimeout(function(){
				// Trigger the opacity CSS transition
				overlay.addClass('visible');
			}, 100);
	
			// Move the slider to the correct image
			offsetSlider(index);
			
			// Raise the visible flag
			overlayVisible = true;
		}
	
		function hideOverlay(){

			// If the overlay is not shown, exit
			if(!overlayVisible){
				return false;
			}
			
			// Hide the overlay
			overlay.hide().removeClass('visible');
			overlayVisible = false;

			//Clear preloaded items
			$('.placeholder').empty();

			//Reset possibly filtered items
			items = allitems;
		}
	
		function offsetSlider(index){

			// This will trigger a smooth css transition
			slider.css('left',(-index*100)+'%');
		}
	
		// Preload an image by its index in the items array
		function preload(index){

			setTimeout(function(){
				showImage(index);
			}, 1000);
		}
		
		// Show image in the slider
		function showImage(index){
	
			// If the index is outside the bonds of the array
			if(index < 0 || index >= items.length){
				return false;
			}
			
			// Call the load function with the href attribute of the item
			loadImage(items.eq(index).attr('href'), function(){
				placeholders.eq(index).html(this);
			});
		}
		
		// Load the image and execute a callback function.
		// Returns a jQuery object
		
		function loadImage(src, callback){

			var img = $('<img>').on('load', function(){
				callback.call(img);
			});
			
			img.attr('src',src);
		}
		
		function showNext(){
			
			// If this is not the last image
			if(index+1 < items.length){
				index++;
				offsetSlider(index);
				preload(index+1);
			}

			else{
				// Trigger the spring animation
				slider.addClass('rightSpring');
				setTimeout(function(){
					slider.removeClass('rightSpring');
				},500);
			}
		}
		
		function showPrevious(){
			
			// If this is not the first image
			if(index>0){
				index--;
				offsetSlider(index);
				preload(index-1);
			}

			else{
				// Trigger the spring animation
				slider.addClass('leftSpring');
				setTimeout(function(){
					slider.removeClass('leftSpring');
				},500);
			}
		}
	};
	
})(jQuery);