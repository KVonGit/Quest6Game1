(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var r;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var da=ca(this);function t(a,b){if(b)a:{for(var c=da,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];if(!(f in c))break a;c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ba(c,d,{configurable:!0,writable:!0,value:f})}}
t("Symbol",function(a){function b(e){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c("jscomp_symbol_"+(e||"")+"_"+d++,e)}
function c(e,f){this.f=e;ba(this,"description",{configurable:!0,writable:!0,value:f})}
if(a)return a;c.prototype.toString=function(){return this.f};
var d=0;return b});
t("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=da[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ha(aa(this))}})}return a});
function ha(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
function u(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
function ia(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}
var ja="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},ka;
if("function"==typeof Object.setPrototypeOf)ka=Object.setPrototypeOf;else{var ma;a:{var na={a:!0},oa={};try{oa.__proto__=na;ma=oa.a;break a}catch(a){}ma=!1}ka=ma?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var pa=ka;
function x(a,b){a.prototype=ja(b.prototype);a.prototype.constructor=a;if(pa)pa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.A=b.prototype}
function qa(){this.o=!1;this.i=null;this.l=void 0;this.f=1;this.j=this.m=0;this.B=this.h=null}
function ra(a){if(a.o)throw new TypeError("Generator is already running");a.o=!0}
qa.prototype.u=function(a){this.l=a};
function ua(a,b){a.h={W:b,X:!0};a.f=a.m||a.j}
qa.prototype["return"]=function(a){this.h={"return":a};this.f=this.j};
function z(a,b,c){a.f=c;return{value:b}}
qa.prototype.D=function(a){this.f=a};
function va(a,b,c){a.m=b;void 0!=c&&(a.j=c)}
function wa(a){a.m=0;var b=a.h.W;a.h=null;return b}
function xa(a){this.f=new qa;this.h=a}
function za(a,b){ra(a.f);var c=a.f.i;if(c)return Aa(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.f["return"]);
a.f["return"](b);return Ba(a)}
function Aa(a,b,c,d){try{var e=b.call(a.f.i,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.f.o=!1,e;var f=e.value}catch(g){return a.f.i=null,ua(a.f,g),Ba(a)}a.f.i=null;d.call(a.f,f);return Ba(a)}
function Ba(a){for(;a.f.f;)try{var b=a.h(a.f);if(b)return a.f.o=!1,{value:b.value,done:!1}}catch(c){a.f.l=void 0,ua(a.f,c)}a.f.o=!1;if(a.f.h){b=a.f.h;a.f.h=null;if(b.X)throw b.W;return{value:b["return"],done:!0}}return{value:void 0,done:!0}}
function Ca(a){this.next=function(b){ra(a.f);a.f.i?b=Aa(a,a.f.i.next,b,a.f.u):(a.f.u(b),b=Ba(a));return b};
this["throw"]=function(b){ra(a.f);a.f.i?b=Aa(a,a.f.i["throw"],b,a.f.u):(ua(a.f,b),b=Ba(a));return b};
this["return"]=function(b){return za(a,b)};
this[Symbol.iterator]=function(){return this}}
function Da(a,b){var c=new Ca(new xa(b));pa&&a.prototype&&pa(c,a.prototype);return c}
t("Reflect.setPrototypeOf",function(a){return a?a:pa?function(b,c){try{return pa(b,c),!0}catch(d){return!1}}:null});
t("Object.setPrototypeOf",function(a){return a||pa});
function A(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var Ha="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)A(d,e)&&(a[e]=d[e])}return a};
t("Object.assign",function(a){return a||Ha});
t("Promise",function(a){function b(g){this.f=0;this.i=void 0;this.h=[];this.o=!1;var h=this.j();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.f=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.h=function(g){if(null==this.f){this.f=[];var h=this;this.i(function(){h.l()})}this.f.push(g)};
var e=da.setTimeout;c.prototype.i=function(g){e(g,0)};
c.prototype.l=function(){for(;this.f&&this.f.length;){var g=this.f;this.f=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.j(l)}}}this.f=null};
c.prototype.j=function(g){this.i(function(){throw g;})};
b.prototype.j=function(){function g(l){return function(m){k||(k=!0,l.call(h,m))}}
var h=this,k=!1;return{resolve:g(this.ha),reject:g(this.l)}};
b.prototype.ha=function(g){if(g===this)this.l(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.ja(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.ga(g):this.m(g)}};
b.prototype.ga=function(g){var h=void 0;try{h=g.then}catch(k){this.l(k);return}"function"==typeof h?this.ka(h,g):this.m(g)};
b.prototype.l=function(g){this.u(2,g)};
b.prototype.m=function(g){this.u(1,g)};
b.prototype.u=function(g,h){if(0!=this.f)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.f);this.f=g;this.i=h;2===this.f&&this.ia();this.B()};
b.prototype.ia=function(){var g=this;e(function(){if(g.J()){var h=da.console;"undefined"!==typeof h&&h.error(g.i)}},1)};
b.prototype.J=function(){if(this.o)return!1;var g=da.CustomEvent,h=da.Event,k=da.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof g?g=new g("unhandledrejection",{cancelable:!0}):"function"===typeof h?g=new h("unhandledrejection",{cancelable:!0}):(g=da.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.i;return k(g)};
b.prototype.B=function(){if(null!=this.h){for(var g=0;g<this.h.length;++g)f.h(this.h[g]);this.h=null}};
var f=new c;b.prototype.ja=function(g){var h=this.j();g.N(h.resolve,h.reject)};
b.prototype.ka=function(g,h){var k=this.j();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(q,p){return"function"==typeof q?function(v){try{l(q(v))}catch(w){m(w)}}:p}
var l,m,n=new b(function(q,p){l=q;m=p});
this.N(k(g,l),k(h,m));return n};
b.prototype["catch"]=function(g){return this.then(void 0,g)};
b.prototype.N=function(g,h){function k(){switch(l.f){case 1:g(l.i);break;case 2:h(l.i);break;default:throw Error("Unexpected state: "+l.f);}}
var l=this;null==this.h?f.h(k):this.h.push(k);this.o=!0};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=u(g),m=l.next();!m.done;m=l.next())d(m.value).N(h,k)})};
b.all=function(g){var h=u(g),k=h.next();return k.done?d([]):new b(function(l,m){function n(v){return function(w){q[v]=w;p--;0==p&&l(q)}}
var q=[],p=0;do q.push(void 0),p++,d(k.value).N(n(q.length-1),m),k=h.next();while(!k.done)})};
return b});
function Ia(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
t("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=Ia(this,b,"endsWith");b+="";void 0===c&&(c=d.length);for(var e=Math.max(0,Math.min(c|0,d.length)),f=b.length;0<f&&0<e;)if(d[--e]!=b[--f])return!1;return 0>=f}});
t("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Ia(this,b,"startsWith");b+="";for(var e=d.length,f=b.length,g=Math.max(0,Math.min(c|0,d.length)),h=0;h<f&&g<e;)if(d[g++]!=b[h++])return!1;return h>=f}});
function Ja(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};
e[Symbol.iterator]=function(){return e};
return e}
t("Array.prototype.entries",function(a){return a?a:function(){return Ja(this,function(b,c){return[b,c]})}});
t("Array.prototype.keys",function(a){return a?a:function(){return Ja(this,function(b){return b})}});
t("Array.prototype.values",function(a){return a?a:function(){return Ja(this,function(b,c){return c})}});
t("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
t("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length,f=c||0;for(0>f&&(f=Math.max(f+e,0));f<e;f++){var g=d[f];if(g===b||Object.is(g,b))return!0}return!1}});
t("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==Ia(this,b,"includes").indexOf(b,c||0)}});
t("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)A(b,d)&&c.push([d,b[d]]);return c}});
t("WeakMap",function(a){function b(k){this.f=(h+=Math.random()+1).toString();if(k){k=u(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}
function e(k){if(!A(k,g)){var l=new c;ba(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(m){if(m instanceof c)return m;Object.isExtensible(m)&&e(m);return l(m)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),m=new a([[k,2],[l,3]]);if(2!=m.get(k)||3!=m.get(l))return!1;m["delete"](k);m.set(l,4);return!m.has(k)&&4==m.get(l)}catch(n){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!A(k,g))throw Error("WeakMap key fail: "+k);k[g][this.f]=l;return this};
b.prototype.get=function(k){return d(k)&&A(k,g)?k[g][this.f]:void 0};
b.prototype.has=function(k){return d(k)&&A(k,g)&&A(k[g],this.f)};
b.prototype["delete"]=function(k){return d(k)&&A(k,g)&&A(k[g],this.f)?delete k[g][this.f]:!1};
return b});
t("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h.f;return ha(function(){if(l){for(;l.head!=h.f;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var m=h.h[l];if(m&&A(h.h,l))for(var n=0;n<m.length;n++){var q=m[n];if(k!==k&&q.key!==q.key||k===q.key)return{id:l,list:m,index:n,s:q}}return{id:l,list:m,index:-1,s:void 0}}
function e(h){this.h={};this.f=b();this.size=0;if(h){h=u(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(u([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),m=l.next();if(m.done||m.value[0]!=h||"s"!=m.value[1])return!1;m=l.next();return m.done||4!=m.value[0].x||"t"!=m.value[1]||!l.next().done?!1:!0}catch(n){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var l=d(this,h);l.list||(l.list=this.h[l.id]=[]);l.s?l.s.value=k:(l.s={next:this.f,previous:this.f.previous,head:this.f,key:h,value:k},l.list.push(l.s),this.f.previous.next=l.s,this.f.previous=l.s,this.size++);return this};
e.prototype["delete"]=function(h){h=d(this,h);return h.s&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.h[h.id],h.s.previous.next=h.s.next,h.s.next.previous=h.s.previous,h.s.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.h={};this.f=this.f.previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).s};
e.prototype.get=function(h){return(h=d(this,h).s)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),m;!(m=l.next()).done;)m=m.value,h.call(k,m[1],m[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
t("Set",function(a){function b(c){this.f=new Map;if(c){c=u(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.f.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(u([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=0===c?0:c;this.f.set(c,c);this.size=this.f.size;return this};
b.prototype["delete"]=function(c){c=this.f["delete"](c);this.size=this.f.size;return c};
b.prototype.clear=function(){this.f.clear();this.size=0};
b.prototype.has=function(c){return this.f.has(c)};
b.prototype.entries=function(){return this.f.entries()};
b.prototype.values=function(){return this.f.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.f.forEach(function(f){return c.call(d,f,f,e)})};
return b});
var B=this||self;function C(a,b){for(var c=a.split("."),d=b||B,e=0;e<c.length;e++)if(d=d[c[e]],null==d)return null;return d}
function Ka(){}
function La(a){var b=typeof a;b="object"!=b?b:a?Array.isArray(a)?"array":b:"null";return"array"==b||"object"==b&&"number"==typeof a.length}
function D(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Ma(a){return Object.prototype.hasOwnProperty.call(a,Na)&&a[Na]||(a[Na]=++Oa)}
var Na="closure_uid_"+(1E9*Math.random()>>>0),Oa=0;function Pa(a,b,c){return a.call.apply(a.bind,arguments)}
function Qa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function Ra(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Ra=Pa:Ra=Qa;return Ra.apply(null,arguments)}
function E(a,b){var c=a.split("."),d=B;c[0]in d||"undefined"==typeof d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]&&d[e]!==Object.prototype[e]?d=d[e]:d=d[e]={}:d[e]=b}
function F(a,b){function c(){}
c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.La=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
function Sa(a){return a}
;function Ta(a,b){var c=void 0;return new (c||(c=Promise))(function(d,e){function f(k){try{h(b.next(k))}catch(l){e(l)}}
function g(k){try{h(b["throw"](k))}catch(l){e(l)}}
function h(k){k.done?d(k.value):(new c(function(l){l(k.value)})).then(f,g)}
h((b=b.apply(a,void 0)).next())})}
;function Xa(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Xa);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
F(Xa,Error);Xa.prototype.name="CustomError";var Ya=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},G=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Za=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
G(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function $a(a,b){a:{var c=a.length;for(var d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:"string"===typeof a?a.charAt(c):a[c]}
function ab(a,b){var c=Ya(a,b),d;(d=0<=c)&&Array.prototype.splice.call(a,c,1);return d}
function bb(a){return Array.prototype.concat.apply([],arguments)}
function cb(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function db(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(La(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function eb(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;function fb(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function gb(a){var b=hb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function ib(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function jb(a){if(!a||"object"!==typeof a)return a;if("function"===typeof a.clone)return a.clone();var b=Array.isArray(a)?[]:"function"!==typeof ArrayBuffer||"function"!==typeof ArrayBuffer.isView||!ArrayBuffer.isView(a)||a instanceof DataView?{}:new a.constructor(a.length),c;for(c in a)b[c]=jb(a[c]);return b}
var kb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function lb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<kb.length;f++)c=kb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var mb;var nb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},ob=/&/g,pb=/</g,vb=/>/g,wb=/"/g,xb=/'/g,yb=/\x00/g,zb=/[\x00&<>"']/;
function Ab(a,b){return a<b?-1:a>b?1:0}
;var H;a:{var Bb=B.navigator;if(Bb){var Cb=Bb.userAgent;if(Cb){H=Cb;break a}}H=""}function I(a){return-1!=H.indexOf(a)}
;function Db(){}
;function Eb(a){Eb[" "](a);return a}
Eb[" "]=Ka;var Fb=I("Opera"),Gb=I("Trident")||I("MSIE"),Hb=I("Edge"),Ib=I("Gecko")&&!(-1!=H.toLowerCase().indexOf("webkit")&&!I("Edge"))&&!(I("Trident")||I("MSIE"))&&!I("Edge"),Jb=-1!=H.toLowerCase().indexOf("webkit")&&!I("Edge");function Kb(){var a=B.document;return a?a.documentMode:void 0}
var Lb;a:{var Mb="",Nb=function(){var a=H;if(Ib)return/rv:([^\);]+)(\)|;)/.exec(a);if(Hb)return/Edge\/([\d\.]+)/.exec(a);if(Gb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Jb)return/WebKit\/(\S+)/.exec(a);if(Fb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
Nb&&(Mb=Nb?Nb[1]:"");if(Gb){var Ob=Kb();if(null!=Ob&&Ob>parseFloat(Mb)){Lb=String(Ob);break a}}Lb=Mb}var Pb=Lb,Qb={},Rb;if(B.document&&Gb){var Sb=Kb();Rb=Sb?Sb:parseInt(Pb,10)||void 0}else Rb=void 0;var Tb=Rb;var Ub=I("Firefox")||I("FxiOS"),Vb=I("iPhone")&&!I("iPod")&&!I("iPad")||I("iPod"),Wb=I("iPad");var Xb={},Yb=null;var J=window;function Zb(a){var b=C("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(g){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||B.$googDebugFname||b}catch(g){e="Not available",c=!0}b=$b(a);if(!(!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name)){c=a.message;if(null==
c){if(a.constructor&&a.constructor instanceof Function){if(a.constructor.name)c=a.constructor.name;else if(c=a.constructor,ac[c])c=ac[c];else{c=String(c);if(!ac[c]){var f=/function\s+([^\(]+)/m.exec(c);ac[c]=f?f[1]:"[Anonymous]"}c=ac[c]}c='Unknown Error of type "'+c+'"'}else c="Unknown Error of unknown type";"function"===typeof a.toString&&Object.prototype.toString!==a.toString&&(c+=": "+a.toString())}return{message:c,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:b||"Not available"}}a.stack=
b;return a}
function $b(a,b){b||(b={});b[bc(a)]=!0;var c=a.stack||"",d=a.Ma;d&&!b[bc(d)]&&(c+="\nCaused by: ",d.stack&&0==d.stack.indexOf(d.toString())||(c+="string"===typeof d?d:d.message+"\n"),c+=$b(d,b));return c}
function bc(a){var b="";"function"===typeof a.toString&&(b=""+a);return b+a.stack}
var ac={};function cc(a){this.f=a||{cookie:""}}
r=cc.prototype;r.isEnabled=function(){return navigator.cookieEnabled};
r.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.Ua;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.Y}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===h&&(h=-1);this.f.cookie=a+"="+b+(f?";domain="+f:"")+(g?";path="+g:"")+(0>h?"":0==h?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+1E3*h)).toUTCString())+(d?";secure":"")+(null!=e?";samesite="+e:"")};
r.get=function(a,b){for(var c=a+"=",d=(this.f.cookie||"").split(";"),e=0,f;e<d.length;e++){f=nb(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
r.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{Y:0,path:b,domain:c});return d};
r.isEmpty=function(){return!this.f.cookie};
r.clear=function(){for(var a=(this.f.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=nb(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var mc=new cc("undefined"==typeof document?null:document);function nc(a,b){this.width=a;this.height=b}
r=nc.prototype;r.clone=function(){return new nc(this.width,this.height)};
r.aspectRatio=function(){return this.width/this.height};
r.isEmpty=function(){return!(this.width*this.height)};
r.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
r.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
r.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function oc(){var a=document;var b="IFRAME";"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}
function pc(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;var qc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function rc(a){return a?decodeURI(a):a}
function sc(a){return rc(a.match(qc)[3]||null)}
function tc(a){var b=a.match(qc);a=b[1];var c=b[2],d=b[3];b=b[4];var e="";a&&(e+=a+":");d&&(e+="//",c&&(e+=c+"@"),e+=d,b&&(e+=":"+b));return e}
function uc(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)uc(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function vc(a){var b=[],c;for(c in a)uc(c,a[c],b);return b.join("&")}
var wc=/#|$/;function xc(a){var b=yc;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
function zc(){var a=[];xc(function(b){a.push(b)});
return a}
var yc={ya:"allow-forms",za:"allow-modals",Aa:"allow-orientation-lock",Ba:"allow-pointer-lock",Ca:"allow-popups",Da:"allow-popups-to-escape-sandbox",Ea:"allow-presentation",Fa:"allow-same-origin",Ga:"allow-scripts",Ha:"allow-top-navigation",Ia:"allow-top-navigation-by-user-activation"},Ac=eb(function(){return zc()});
function Bc(){var a=oc(),b={};G(Ac(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
;function Cc(){this.i=this.i;this.j=this.j}
Cc.prototype.i=!1;Cc.prototype.dispose=function(){this.i||(this.i=!0,this.K())};
Cc.prototype.K=function(){if(this.j)for(;this.j.length;)this.j.shift()()};var Dc={};function Ec(a){if(a!==Dc)throw Error("Bad secret");}
;function Fc(){var a="undefined"!==typeof window?window.trustedTypes:void 0;return null!==a&&void 0!==a?a:null}
;var Gc;function Hc(){}
function Ic(a,b){Ec(b);this.f=a}
x(Ic,Hc);Ic.prototype.toString=function(){return this.f.toString()};
var Jc=null===(Gc=Fc())||void 0===Gc?void 0:Gc.emptyHTML;new Ic(null!==Jc&&void 0!==Jc?Jc:"",Dc);var Kc;function Lc(){}
function Mc(a,b){Ec(b);this.f=a}
x(Mc,Lc);Mc.prototype.toString=function(){return this.f.toString()};
var Nc=null===(Kc=Fc())||void 0===Kc?void 0:Kc.emptyScript;new Mc(null!==Nc&&void 0!==Nc?Nc:"",Dc);function Oc(){}
function Pc(a,b){Ec(b);this.f=a}
x(Pc,Oc);Pc.prototype.toString=function(){return this.f};new Pc("about:blank",Dc);new Pc("about:invalid#zTSz",Dc);var Qc=(new Date).getTime();function Rc(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"moz-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a&&"chrome-untrusted"!==a&&"chrome"!==a&&"app"!==a&&"devtools"!==a)throw Error("Invalid URI scheme in origin: "+
a);c="";var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;function Sc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
function b(n){for(var q=g,p=0;64>p;p+=4)q[p/4]=n[p]<<24|n[p+1]<<16|n[p+2]<<8|n[p+3];for(p=16;80>p;p++)n=q[p-3]^q[p-8]^q[p-14]^q[p-16],q[p]=(n<<1|n>>>31)&4294967295;n=e[0];var v=e[1],w=e[2],y=e[3],la=e[4];for(p=0;80>p;p++){if(40>p)if(20>p){var L=y^v&(w^y);var ya=1518500249}else L=v^w^y,ya=1859775393;else 60>p?(L=v&w|y&(v|w),ya=2400959708):(L=v^w^y,ya=3395469782);L=((n<<5|n>>>27)&4294967295)+L+la+ya+q[p]&4294967295;la=y;y=w;w=(v<<30|v>>>2)&4294967295;v=n;n=L}e[0]=e[0]+n&4294967295;e[1]=e[1]+v&4294967295;
e[2]=e[2]+w&4294967295;e[3]=e[3]+y&4294967295;e[4]=e[4]+la&4294967295}
function c(n,q){if("string"===typeof n){n=unescape(encodeURIComponent(n));for(var p=[],v=0,w=n.length;v<w;++v)p.push(n.charCodeAt(v));n=p}q||(q=n.length);p=0;if(0==l)for(;p+64<q;)b(n.slice(p,p+64)),p+=64,m+=64;for(;p<q;)if(f[l++]=n[p++],m++,64==l)for(l=0,b(f);p+64<q;)b(n.slice(p,p+64)),p+=64,m+=64}
function d(){var n=[],q=8*m;56>l?c(h,56-l):c(h,64-(l-56));for(var p=63;56<=p;p--)f[p]=q&255,q>>>=8;b(f);for(p=q=0;5>p;p++)for(var v=24;0<=v;v-=8)n[q++]=e[p]>>v&255;return n}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var l,m;a();return{reset:a,update:c,digest:d,la:function(){for(var n=d(),q="",p=0;p<n.length;p++)q+="0123456789ABCDEF".charAt(Math.floor(n[p]/16))+"0123456789ABCDEF".charAt(n[p]%16);return q}}}
;function Tc(a,b,c){var d=[],e=[];if(1==(Array.isArray(c)?2:1))return e=[b,a],G(d,function(h){e.push(h)}),Uc(e.join(" "));
var f=[],g=[];G(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];G(d,function(h){e.push(h)});
a=Uc(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function Uc(a){var b=Sc();b.update(a);return b.la().toLowerCase()}
;function Vc(a){var b=Rc(String(B.location.href)),c;(c=B.__SAPISID||B.__APISID||B.__OVERRIDE_SID)?c=!0:(c=new cc(document),c=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID"),c=!!c);if(c&&(c=(b=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:")||0==b.indexOf("moz-extension:"))?B.__SAPISID:B.__APISID,c||(c=new cc(document),c=c.get(b?"SAPISID":"APISID")||c.get("__Secure-3PAPISID")),c)){b=b?"SAPISIDHASH":"APISIDHASH";var d=String(B.location.href);return d&&c&&b?[b,Tc(Rc(d),
c,a||null)].join(" "):null}return null}
;function Wc(){this.h=[];this.f=-1}
Wc.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.h[a]!=b&&(this.h[a]=b,this.f=-1)};
Wc.prototype.get=function(a){return!!this.h[a]};
function Xc(a){-1==a.f&&(a.f=Za(a.h,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.f}
;function Yc(a,b){this.i=a;this.j=b;this.h=0;this.f=null}
Yc.prototype.get=function(){if(0<this.h){this.h--;var a=this.f;this.f=a.next;a.next=null}else a=this.i();return a};
function Zc(a,b){a.j(b);100>a.h&&(a.h++,b.next=a.f,a.f=b)}
;function $c(a){B.setTimeout(function(){throw a;},0)}
var ad;function bd(){var a=B.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!I("Presto")&&(a=function(){var e=oc();e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var g="callImmediate"+Math.random(),h="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=Ra(function(k){if(("*"==h||k.origin==h)&&k.data==g)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(g,h)}}});
if("undefined"!==typeof a&&!I("Trident")&&!I("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.U;c.U=null;e()}};
return function(e){d.next={U:e};d=d.next;b.port2.postMessage(0)}}return function(e){B.setTimeout(e,0)}}
;function cd(){this.h=this.f=null}
var ed=new Yc(function(){return new dd},function(a){a.reset()});
cd.prototype.add=function(a,b){var c=ed.get();c.set(a,b);this.h?this.h.next=c:this.f=c;this.h=c};
cd.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.h=null),a.next=null);return a};
function dd(){this.next=this.scope=this.f=null}
dd.prototype.set=function(a,b){this.f=a;this.scope=b;this.next=null};
dd.prototype.reset=function(){this.next=this.scope=this.f=null};function fd(a,b){gd||hd();id||(gd(),id=!0);jd.add(a,b)}
var gd;function hd(){if(B.Promise&&B.Promise.resolve){var a=B.Promise.resolve(void 0);gd=function(){a.then(kd)}}else gd=function(){var b=kd;
"function"!==typeof B.setImmediate||B.Window&&B.Window.prototype&&!I("Edge")&&B.Window.prototype.setImmediate==B.setImmediate?(ad||(ad=bd()),ad(b)):B.setImmediate(b)}}
var id=!1,jd=new cd;function kd(){for(var a;a=jd.remove();){try{a.f.call(a.scope)}catch(b){$c(b)}Zc(ed,a)}id=!1}
;function ld(){this.h=-1}
;function md(){this.h=64;this.f=[];this.m=[];this.o=[];this.j=[];this.j[0]=128;for(var a=1;a<this.h;++a)this.j[a]=0;this.l=this.i=0;this.reset()}
F(md,ld);md.prototype.reset=function(){this.f[0]=1732584193;this.f[1]=4023233417;this.f[2]=2562383102;this.f[3]=271733878;this.f[4]=3285377520;this.l=this.i=0};
function nd(a,b,c){c||(c=0);var d=a.o;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.f[0];c=a.f[1];var g=a.f[2],h=a.f[3],k=a.f[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
(f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.f[0]=a.f[0]+b&4294967295;a.f[1]=a.f[1]+c&4294967295;a.f[2]=a.f[2]+g&4294967295;a.f[3]=a.f[3]+h&4294967295;a.f[4]=a.f[4]+k&4294967295}
md.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.h,d=0,e=this.m,f=this.i;d<b;){if(0==f)for(;d<=c;)nd(this,a,d),d+=this.h;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.h){nd(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.h){nd(this,e);f=0;break}}this.i=f;this.l+=b}};
md.prototype.digest=function(){var a=[],b=8*this.l;56>this.i?this.update(this.j,56-this.i):this.update(this.j,this.h-(this.i-56));for(var c=this.h-1;56<=c;c--)this.m[c]=b&255,b/=256;nd(this,this.m);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.f[c]>>d&255,++b;return a};var od="StopIteration"in B?B.StopIteration:{message:"StopIteration",stack:""};function pd(){}
pd.prototype.next=function(){throw od;};
pd.prototype.C=function(){return this};
function qd(a){if(a instanceof pd)return a;if("function"==typeof a.C)return a.C(!1);if(La(a)){var b=0,c=new pd;c.next=function(){for(;;){if(b>=a.length)throw od;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function rd(a,b){if(La(a))try{G(a,b,void 0)}catch(c){if(c!==od)throw c;}else{a=qd(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==od)throw c;}}}
function sd(a){if(La(a))return cb(a);a=qd(a);var b=[];rd(a,function(c){b.push(c)});
return b}
;function td(a,b){this.i={};this.f=[];this.j=this.h=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof td)for(c=ud(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function ud(a){Pd(a);return a.f.concat()}
r=td.prototype;r.equals=function(a,b){if(this===a)return!0;if(this.h!=a.h)return!1;var c=b||Qd;Pd(this);for(var d,e=0;d=this.f[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function Qd(a,b){return a===b}
r.isEmpty=function(){return 0==this.h};
r.clear=function(){this.i={};this.j=this.h=this.f.length=0};
r.remove=function(a){return Object.prototype.hasOwnProperty.call(this.i,a)?(delete this.i[a],this.h--,this.j++,this.f.length>2*this.h&&Pd(this),!0):!1};
function Pd(a){if(a.h!=a.f.length){for(var b=0,c=0;b<a.f.length;){var d=a.f[b];Object.prototype.hasOwnProperty.call(a.i,d)&&(a.f[c++]=d);b++}a.f.length=c}if(a.h!=a.f.length){var e={};for(c=b=0;b<a.f.length;)d=a.f[b],Object.prototype.hasOwnProperty.call(e,d)||(a.f[c++]=d,e[d]=1),b++;a.f.length=c}}
r.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.i,a)?this.i[a]:b};
r.set=function(a,b){Object.prototype.hasOwnProperty.call(this.i,a)||(this.h++,this.f.push(a),this.j++);this.i[a]=b};
r.forEach=function(a,b){for(var c=ud(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
r.clone=function(){return new td(this)};
r.C=function(a){Pd(this);var b=0,c=this.j,d=this,e=new pd;e.next=function(){if(c!=d.j)throw Error("The map has changed since the iterator was created");if(b>=d.f.length)throw od;var f=d.f[b++];return a?f:d.i[f]};
return e};var Rd=!Gb||9<=Number(Tb),Sd;
if(Sd=Gb){var Td;if(Object.prototype.hasOwnProperty.call(Qb,"9"))Td=Qb["9"];else{for(var Ud=0,Vd=nb(String(Pb)).split("."),Wd=nb("9").split("."),Xd=Math.max(Vd.length,Wd.length),Yd=0;0==Ud&&Yd<Xd;Yd++){var Zd=Vd[Yd]||"",$d=Wd[Yd]||"";do{var ae=/(\d*)(\D*)(.*)/.exec(Zd)||["","","",""],be=/(\d*)(\D*)(.*)/.exec($d)||["","","",""];if(0==ae[0].length&&0==be[0].length)break;Ud=Ab(0==ae[1].length?0:parseInt(ae[1],10),0==be[1].length?0:parseInt(be[1],10))||Ab(0==ae[2].length,0==be[2].length)||Ab(ae[2],be[2]);
Zd=ae[3];$d=be[3]}while(0==Ud)}Td=Qb["9"]=0<=Ud}Sd=!Td}var ce=Sd,de=function(){if(!B.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{B.addEventListener("test",Ka,b),B.removeEventListener("test",Ka,b)}catch(c){}return a}();function ee(a,b){this.type=a;this.f=this.target=b;this.defaultPrevented=this.h=!1}
ee.prototype.stopPropagation=function(){this.h=!0};
ee.prototype.preventDefault=function(){this.defaultPrevented=!0};function fe(a,b){ee.call(this,a?a.type:"");this.relatedTarget=this.f=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.i=null;a&&this.init(a,b)}
F(fe,ee);var ge={2:"touch",3:"pen",4:"mouse"};
fe.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.f=b;var e=a.relatedTarget;if(e){if(Ib){a:{try{Eb(e.nodeName);var f=!0;break a}catch(g){}f=!1}f||(e=null)}}else"mouseover"==c?e=a.fromElement:"mouseout"==c&&(e=a.toElement);this.relatedTarget=e;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||
0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:ge[a.pointerType]||"";this.state=a.state;
this.i=a;a.defaultPrevented&&this.preventDefault()};
fe.prototype.stopPropagation=function(){fe.A.stopPropagation.call(this);this.i.stopPropagation?this.i.stopPropagation():this.i.cancelBubble=!0};
fe.prototype.preventDefault=function(){fe.A.preventDefault.call(this);var a=this.i;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,ce)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var he="closure_listenable_"+(1E6*Math.random()|0),ie=0;function je(a,b,c,d,e){this.listener=a;this.f=null;this.src=b;this.type=c;this.capture=!!d;this.O=e;this.key=++ie;this.I=this.M=!1}
function ke(a){a.I=!0;a.listener=null;a.f=null;a.src=null;a.O=null}
;function le(a){this.src=a;this.listeners={};this.f=0}
le.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.f++);var g=me(a,b,d,e);-1<g?(b=a[g],c||(b.M=!1)):(b=new je(b,this.src,f,!!d,e),b.M=c,a.push(b));return b};
le.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=me(e,b,c,d);return-1<b?(ke(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.listeners[a],this.f--),!0):!1};
function ne(a,b){var c=b.type;c in a.listeners&&ab(a.listeners[c],b)&&(ke(b),0==a.listeners[c].length&&(delete a.listeners[c],a.f--))}
function me(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.I&&f.listener==b&&f.capture==!!c&&f.O==d)return e}return-1}
;var oe="closure_lm_"+(1E6*Math.random()|0),pe={},qe=0;function re(a,b,c,d,e){if(d&&d.once)se(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)re(a,b[f],c,d,e);else c=te(c),a&&a[he]?a.f.add(String(b),c,!1,D(d)?!!d.capture:!!d,e):ue(a,b,c,!1,d,e)}
function ue(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=D(e)?!!e.capture:!!e,h=ve(a);h||(a[oe]=h=new le(a));c=h.add(b,c,d,g,f);if(!c.f){d=we();c.f=d;d.src=a;d.listener=c;if(a.addEventListener)de||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(xe(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");qe++}}
function we(){var a=ye,b=Rd?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);
if(!c)return c};
return b}
function se(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)se(a,b[f],c,d,e);else c=te(c),a&&a[he]?a.f.add(String(b),c,!0,D(d)?!!d.capture:!!d,e):ue(a,b,c,!0,d,e)}
function ze(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)ze(a,b[f],c,d,e);else(d=D(d)?!!d.capture:!!d,c=te(c),a&&a[he])?a.f.remove(String(b),c,d,e):a&&(a=ve(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=me(b,c,d,e)),(c=-1<a?b[a]:null)&&Ae(c))}
function Ae(a){if("number"!==typeof a&&a&&!a.I){var b=a.src;if(b&&b[he])ne(b.f,a);else{var c=a.type,d=a.f;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(xe(c),d):b.addListener&&b.removeListener&&b.removeListener(d);qe--;(c=ve(b))?(ne(c,a),0==c.f&&(c.src=null,b[oe]=null)):ke(a)}}}
function xe(a){return a in pe?pe[a]:pe[a]="on"+a}
function Be(a,b,c,d){var e=!0;if(a=ve(a))if(b=a.listeners[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.I&&(f=Ce(f,d),e=e&&!1!==f)}return e}
function Ce(a,b){var c=a.listener,d=a.O||a.src;a.M&&Ae(a);return c.call(d,b)}
function ye(a,b){if(a.I)return!0;if(!Rd){var c=b||C("window.event"),d=new fe(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(k){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.f;f;f=f.parentNode)c.push(f);f=a.type;for(var g=c.length-1;!d.h&&0<=g;g--){d.f=c[g];var h=Be(c[g],f,!0,d);e=e&&h}for(g=0;!d.h&&g<c.length;g++)d.f=c[g],h=Be(c[g],f,!1,d),e=e&&h}return e}return Ce(a,new fe(b,this))}
function ve(a){a=a[oe];return a instanceof le?a:null}
var De="__closure_events_fn_"+(1E9*Math.random()>>>0);function te(a){if("function"===typeof a)return a;a[De]||(a[De]=function(b){return a.handleEvent(b)});
return a[De]}
;function K(){Cc.call(this);this.f=new le(this);this.o=this;this.l=null}
F(K,Cc);K.prototype[he]=!0;K.prototype.addEventListener=function(a,b,c,d){re(this,a,b,c,d)};
K.prototype.removeEventListener=function(a,b,c,d){ze(this,a,b,c,d)};
K.prototype.dispatchEvent=function(a){var b=this.l;if(b){var c=[];for(var d=1;b;b=b.l)c.push(b),++d}b=this.o;d=a.type||a;if("string"===typeof a)a=new ee(a,b);else if(a instanceof ee)a.target=a.target||b;else{var e=a;a=new ee(d,b);lb(a,e)}e=!0;if(c)for(var f=c.length-1;!a.h&&0<=f;f--){var g=a.f=c[f];e=Ee(g,d,!0,a)&&e}a.h||(g=a.f=b,e=Ee(g,d,!0,a)&&e,a.h||(e=Ee(g,d,!1,a)&&e));if(c)for(f=0;!a.h&&f<c.length;f++)g=a.f=c[f],e=Ee(g,d,!1,a)&&e;return e};
K.prototype.K=function(){K.A.K.call(this);if(this.f){var a=this.f,b=0,c;for(c in a.listeners){for(var d=a.listeners[c],e=0;e<d.length;e++)++b,ke(d[e]);delete a.listeners[c];a.f--}}this.l=null};
function Ee(a,b,c,d){b=a.f.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.I&&g.capture==c){var h=g.listener,k=g.O||g.src;g.M&&ne(a.f,g);e=!1!==h.call(k,d)&&e}}return e&&!d.defaultPrevented}
;var Fe=B.JSON.stringify;function Ge(a){this.f=0;this.o=void 0;this.j=this.h=this.i=null;this.l=this.m=!1;if(a!=Ka)try{var b=this;a.call(void 0,function(c){He(b,2,c)},function(c){He(b,3,c)})}catch(c){He(this,3,c)}}
function Ie(){this.next=this.context=this.onRejected=this.h=this.f=null;this.i=!1}
Ie.prototype.reset=function(){this.context=this.onRejected=this.h=this.f=null;this.i=!1};
var Je=new Yc(function(){return new Ie},function(a){a.reset()});
function Ke(a,b,c){var d=Je.get();d.h=a;d.onRejected=b;d.context=c;return d}
Ge.prototype.then=function(a,b,c){return Le(this,"function"===typeof a?a:null,"function"===typeof b?b:null,c)};
Ge.prototype.$goog_Thenable=!0;Ge.prototype.cancel=function(a){if(0==this.f){var b=new Me(a);fd(function(){Ne(this,b)},this)}};
function Ne(a,b){if(0==a.f)if(a.i){var c=a.i;if(c.h){for(var d=0,e=null,f=null,g=c.h;g&&(g.i||(d++,g.f==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.f&&1==d?Ne(c,b):(f?(d=f,d.next==c.j&&(c.j=d),d.next=d.next.next):Oe(c),Pe(c,e,3,b)))}a.i=null}else He(a,3,b)}
function Qe(a,b){a.h||2!=a.f&&3!=a.f||Re(a);a.j?a.j.next=b:a.h=b;a.j=b}
function Le(a,b,c,d){var e=Ke(null,null,null);e.f=new Ge(function(f,g){e.h=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.onRejected=c?function(h){try{var k=c.call(d,h);void 0===k&&h instanceof Me?g(h):f(k)}catch(l){g(l)}}:g});
e.f.i=a;Qe(a,e);return e.f}
Ge.prototype.B=function(a){this.f=0;He(this,2,a)};
Ge.prototype.J=function(a){this.f=0;He(this,3,a)};
function He(a,b,c){if(0==a.f){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.f=1;a:{var d=c,e=a.B,f=a.J;if(d instanceof Ge){Qe(d,Ke(e||Ka,f||null,a));var g=!0}else{if(d)try{var h=!!d.$goog_Thenable}catch(l){h=!1}else h=!1;if(h)d.then(e,f,a),g=!0;else{if(D(d))try{var k=d.then;if("function"===typeof k){Se(d,k,e,f,a);g=!0;break a}}catch(l){f.call(a,l);g=!0;break a}g=!1}}}g||(a.o=c,a.f=b,a.i=null,Re(a),3!=b||c instanceof Me||Te(a,c))}}
function Se(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function Re(a){a.m||(a.m=!0,fd(a.u,a))}
function Oe(a){var b=null;a.h&&(b=a.h,a.h=b.next,b.next=null);a.h||(a.j=null);return b}
Ge.prototype.u=function(){for(var a;a=Oe(this);)Pe(this,a,this.f,this.o);this.m=!1};
function Pe(a,b,c,d){if(3==c&&b.onRejected&&!b.i)for(;a&&a.l;a=a.i)a.l=!1;if(b.f)b.f.i=null,Ue(b,c,d);else try{b.i?b.h.call(b.context):Ue(b,c,d)}catch(e){Ve.call(null,e)}Zc(Je,b)}
function Ue(a,b,c){2==b?a.h.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function Te(a,b){a.l=!0;fd(function(){a.l&&Ve.call(null,b)})}
var Ve=$c;function Me(a){Xa.call(this,a)}
F(Me,Xa);Me.prototype.name="cancel";function M(a){Cc.call(this);this.o=1;this.l=[];this.m=0;this.f=[];this.h={};this.u=!!a}
F(M,Cc);r=M.prototype;r.subscribe=function(a,b,c){var d=this.h[a];d||(d=this.h[a]=[]);var e=this.o;this.f[e]=a;this.f[e+1]=b;this.f[e+2]=c;this.o=e+3;d.push(e);return e};
function We(a,b,c){var d=Xe;if(a=d.h[a]){var e=d.f;(a=$a(a,function(f){return e[f+1]==b&&e[f+2]==c}))&&d.L(a)}}
r.L=function(a){var b=this.f[a];if(b){var c=this.h[b];0!=this.m?(this.l.push(a),this.f[a+1]=Ka):(c&&ab(c,a),delete this.f[a],delete this.f[a+1],delete this.f[a+2])}return!!b};
r.H=function(a,b){var c=this.h[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.u)for(e=0;e<c.length;e++){var g=c[e];Ye(this.f[g+1],this.f[g+2],d)}else{this.m++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.f[g+1].apply(this.f[g+2],d)}finally{if(this.m--,0<this.l.length&&0==this.m)for(;c=this.l.pop();)this.L(c)}}return 0!=e}return!1};
function Ye(a,b,c){fd(function(){a.apply(b,c)})}
r.clear=function(a){if(a){var b=this.h[a];b&&(G(b,this.L,this),delete this.h[a])}else this.f.length=0,this.h={}};
r.K=function(){M.A.K.call(this);this.clear();this.l.length=0};function Ze(a){this.f=a}
Ze.prototype.set=function(a,b){void 0===b?this.f.remove(a):this.f.set(a,Fe(b))};
Ze.prototype.get=function(a){try{var b=this.f.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Ze.prototype.remove=function(a){this.f.remove(a)};function $e(a){this.f=a}
F($e,Ze);function af(a){this.data=a}
function bf(a){return void 0===a||a instanceof af?a:new af(a)}
$e.prototype.set=function(a,b){$e.A.set.call(this,a,bf(b))};
$e.prototype.h=function(a){a=$e.A.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
$e.prototype.get=function(a){if(a=this.h(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function cf(a){this.f=a}
F(cf,$e);cf.prototype.set=function(a,b,c){if(b=bf(b)){if(c){if(c<Date.now()){cf.prototype.remove.call(this,a);return}b.expiration=c}b.creation=Date.now()}cf.A.set.call(this,a,b)};
cf.prototype.h=function(a){var b=cf.A.h.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<Date.now()||c&&c>Date.now())cf.prototype.remove.call(this,a);else return b}};function df(){}
;function ef(){}
F(ef,df);ef.prototype.clear=function(){var a=sd(this.C(!0)),b=this;G(a,function(c){b.remove(c)})};function ff(a){this.f=a}
F(ff,ef);r=ff.prototype;r.isAvailable=function(){if(!this.f)return!1;try{return this.f.setItem("__sak","1"),this.f.removeItem("__sak"),!0}catch(a){return!1}};
r.set=function(a,b){try{this.f.setItem(a,b)}catch(c){if(0==this.f.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
r.get=function(a){a=this.f.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
r.remove=function(a){this.f.removeItem(a)};
r.C=function(a){var b=0,c=this.f,d=new pd;d.next=function(){if(b>=c.length)throw od;var e=c.key(b++);if(a)return e;e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
r.clear=function(){this.f.clear()};
r.key=function(a){return this.f.key(a)};function gf(){var a=null;try{a=window.localStorage||null}catch(b){}this.f=a}
F(gf,ff);function hf(a,b){this.h=a;this.f=null;if(Gb&&!(9<=Number(Tb))){jf||(jf=new td);this.f=jf.get(a);this.f||(b?this.f=document.getElementById(b):(this.f=document.createElement("userdata"),this.f.addBehavior("#default#userData"),document.body.appendChild(this.f)),jf.set(a,this.f));try{this.f.load(this.h)}catch(c){this.f=null}}}
F(hf,ef);var kf={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},jf=null;function lf(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return kf[b]})}
r=hf.prototype;r.isAvailable=function(){return!!this.f};
r.set=function(a,b){this.f.setAttribute(lf(a),b);mf(this)};
r.get=function(a){a=this.f.getAttribute(lf(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
r.remove=function(a){this.f.removeAttribute(lf(a));mf(this)};
r.C=function(a){var b=0,c=this.f.XMLDocument.documentElement.attributes,d=new pd;d.next=function(){if(b>=c.length)throw od;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
r.clear=function(){for(var a=this.f.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);mf(this)};
function mf(a){try{a.f.save(a.h)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function nf(a,b){this.h=a;this.f=b+"::"}
F(nf,ef);nf.prototype.set=function(a,b){this.h.set(this.f+a,b)};
nf.prototype.get=function(a){return this.h.get(this.f+a)};
nf.prototype.remove=function(a){this.h.remove(this.f+a)};
nf.prototype.C=function(a){var b=this.h.C(!0),c=this,d=new pd;d.next=function(){for(var e=b.next();e.substr(0,c.f.length)!=c.f;)e=b.next();return a?e.substr(c.f.length):c.h.get(e)};
return d};var of=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};E("yt.config_",of);function pf(a){var b=arguments;1<b.length?of[b[0]]=b[1]:1===b.length&&Object.assign(of,b[0])}
function O(a,b){return a in of?of[a]:b}
;var qf=[];function rf(a){qf.forEach(function(b){return b(a)})}
function sf(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){tf(b),rf(b)}}:a}
function tf(a){var b=C("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0):(b=O("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0]),pf("ERRORS",b))}
function uf(a){var b=C("yt.logging.errors.log");b?b(a,"WARNING",void 0,void 0,void 0):(b=O("ERRORS",[]),b.push([a,"WARNING",void 0,void 0,void 0]),pf("ERRORS",b))}
;var vf=0;E("ytDomDomGetNextId",C("ytDomDomGetNextId")||function(){return++vf});var wf={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function xf(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in wf||(this[b]=a[b]);var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==
this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey}}catch(e){}}
xf.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
xf.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
xf.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var hb=B.ytEventsEventsListeners||{};E("ytEventsEventsListeners",hb);var yf=B.ytEventsEventsCounter||{count:0};E("ytEventsEventsCounter",yf);
function zf(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return gb(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,g=D(e[4])&&D(d)&&ib(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
function Af(a){a&&("string"==typeof a&&(a=[a]),G(a,function(b){if(b in hb){var c=hb[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?Bf()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete hb[b]}}))}
var Bf=eb(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function Cf(a,b,c){var d=void 0===d?{}:d;if(a&&(a.addEventListener||a.attachEvent)){var e=zf(a,b,c,d);if(!e){e=++yf.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new xf(h);if(!pc(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new xf(h);
h.currentTarget=a;return c.call(a,h)};
g=sf(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),Bf()||"boolean"===typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);hb[e]=[a,b,c,g,d]}}}
;function Df(a,b){"function"===typeof a&&(a=sf(a));return window.setTimeout(a,b)}
function Ef(a){"function"===typeof a&&(a=sf(a));return window.setInterval(a,250)}
;var Ff={q:!0,search_query:!0};function Gf(a){var b=[];fb(a,function(c,d){var e=encodeURIComponent(String(d)),f;Array.isArray(c)?f=c:f=[c];G(f,function(g){""==g?b.push(e):b.push(e+"="+encodeURIComponent(String(g)))})});
return b.join("&")}
function Hf(a){"?"==a.charAt(0)&&(a=a.substr(1));for(var b=a.split("&"),c={},d=0,e=b.length;d<e;d++){var f=b[d].split("=");if(1==f.length&&f[0]||2==f.length)try{var g=decodeURIComponent((f[0]||"").replace(/\+/g," ")),h=decodeURIComponent((f[1]||"").replace(/\+/g," "));g in c?Array.isArray(c[g])?db(c[g],h):c[g]=[c[g],h]:c[g]=h}catch(k){Ff.hasOwnProperty(f[0])||(k.args=[{key:f[0],value:f[1],query:a}],tf(k))}}return c}
function If(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=Hf(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);b=a;a=vc(e);a?(c=b.indexOf("#"),0>c&&(c=b.length),f=b.indexOf("?"),0>f||f>c?(f=c,e=""):e=b.substring(f+1,c),b=[b.substr(0,f),e,b.substr(c)],c=b[1],b[1]=a?c?c+"&"+a:a:c,a=b[0]+(b[1]?"?"+b[1]:"")+b[2]):a=b;return a+d}
;var Jf={};function Kf(a){return Jf[a]||(Jf[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var Lf={},Mf=[],Xe=new M,Nf={};function Of(){for(var a=u(Mf),b=a.next();!b.done;b=a.next())b=b.value,b()}
function Pf(a,b){var c;"yt:"==a.tagName.toLowerCase().substr(0,3)?c=a.getAttribute(b):c=a?a.dataset?a.dataset[Kf(b)]:a.getAttribute("data-"+b):null;return c}
function Qf(a,b){Xe.H.apply(Xe,arguments)}
;function Rf(a){this.h=a||{};this.i=this.f=!1;a=document.getElementById("www-widgetapi-script");if(this.f=!!("https:"==document.location.protocol||a&&0==a.src.indexOf("https:"))){a=[this.h,window.YTConfig||{}];for(var b=0;b<a.length;b++)a[b].host&&(a[b].host=a[b].host.replace("http://","https://"))}}
function P(a,b){for(var c=[a.h,window.YTConfig||{}],d=0;d<c.length;d++){var e=c[d][b];if(void 0!=e)return e}return null}
function Sf(a,b,c){Tf||(Tf={},Cf(window,"message",Ra(a.j,a)));Tf[c]=b}
Rf.prototype.j=function(a){if(a.origin==P(this,"host")||a.origin==P(this,"host").replace(/^http:/,"https:")){try{var b=JSON.parse(a.data)}catch(c){return}this.i=!0;this.f||0!=a.origin.indexOf("https:")||(this.f=!0);if(a=Tf[b.id])a.u=!0,a.u&&(G(a.o,a.T,a),a.o.length=0),a.ea(b)}};
var Tf=null;function Q(a){a=Uf(a);return"string"===typeof a&&"false"===a?!1:!!a}
function Vf(a,b){var c=Uf(a);return void 0===c&&void 0!==b?b:Number(c||0)}
function Uf(a){var b=O("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:O("EXPERIMENT_FLAGS",{})[a]}
;function Wf(){}
function Xf(a){var b=5E3;isNaN(b)&&(b=void 0);var c=C("yt.scheduler.instance.addJob");c?c(a,0,b):void 0===b?a():Df(a,b||0)}
;function Yf(){}
x(Yf,Wf);Yf.prototype.start=function(){var a=C("yt.scheduler.instance.start");a&&a()};
Yf.f=void 0;Yf.h=function(){Yf.f||(Yf.f=new Yf)};
Yf.h();var Zf=B.ytPubsubPubsubInstance||new M,$f=B.ytPubsubPubsubSubscribedKeys||{},Fg=B.ytPubsubPubsubTopicToKeys||{},Gg=B.ytPubsubPubsubIsSynchronous||{};M.prototype.subscribe=M.prototype.subscribe;M.prototype.unsubscribeByKey=M.prototype.L;M.prototype.publish=M.prototype.H;M.prototype.clear=M.prototype.clear;E("ytPubsubPubsubInstance",Zf);E("ytPubsubPubsubTopicToKeys",Fg);E("ytPubsubPubsubIsSynchronous",Gg);E("ytPubsubPubsubSubscribedKeys",$f);var Hg=window,T=Hg.ytcsi&&Hg.ytcsi.now?Hg.ytcsi.now:Hg.performance&&Hg.performance.timing&&Hg.performance.now&&Hg.performance.timing.navigationStart?function(){return Hg.performance.timing.navigationStart+Hg.performance.now()}:function(){return(new Date).getTime()};var Ig=Vf("initial_gel_batch_timeout",1E3),Jg=Math.pow(2,16)-1,Kg=null,Lg=0,Mg=void 0,Ng=0,Og=0,Pg=0,Qg=!0,Rg=B.ytLoggingTransportGELQueue_||new Map;E("ytLoggingTransportGELQueue_",Rg);var Sg=B.ytLoggingTransportTokensToCttTargetIds_||{};E("ytLoggingTransportTokensToCttTargetIds_",Sg);function Tg(a){a=void 0===a?!1:a;return new Ge(function(b){window.clearTimeout(Ng);window.clearTimeout(Og);Og=0;Mg&&Mg.isReady()?(Ug(b,a),Rg.clear()):(Vg(),b())})}
function Vg(){Q("web_gel_timeout_cap")&&!Og&&(Og=Df(Tg,6E4));window.clearTimeout(Ng);var a=O("LOGGING_BATCH_TIMEOUT",Vf("web_gel_debounce_ms",1E4));Q("shorten_initial_gel_batch_timeout")&&Qg&&(a=Ig);Ng=Df(Tg,a)}
function Ug(a,b){var c=Mg;b=void 0===b?!1:b;for(var d=Math.round(T()),e=Rg.size,f=u(Rg),g=f.next();!g.done;g=f.next()){var h=u(g.value);g=h.next().value;var k=h.next().value;h=jb({context:Wg(c.f||Xg())});h.events=k;(k=Sg[g])&&Yg(h,g,k);delete Sg[g];Zg(h,d);$g(c,"log_event",h,{retry:!0,onSuccess:function(){e--;e||a();Lg=Math.round(T()-d)},
onError:function(){e--;e||a()},
xa:b});Qg=!1}}
function Zg(a,b){a.requestTimeMs=String(b);Q("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);var c=O("EVENT_ID",void 0);if(c){var d=O("BATCH_CLIENT_COUNTER",void 0)||0;!d&&Q("web_client_counter_random_seed")&&(d=Math.floor(Math.random()*Jg/2));d++;d>Jg&&(d=1);pf("BATCH_CLIENT_COUNTER",d);c={serializedEventId:c,clientCounter:String(d)};a.serializedClientEventId=c;Kg&&Lg&&Q("log_gel_rtt_web")&&(a.previousBatchInfo={serializedClientEventId:Kg,roundtripMs:String(Lg)});Kg=c;Lg=0}}
function Yg(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
;var ah=B.ytLoggingGelSequenceIdObj_||{};E("ytLoggingGelSequenceIdObj_",ah);function bh(a){var b=ch;a=void 0===a?C("yt.ads.biscotti.lastId_")||"":a;b=Object.assign(dh(b),eh(b));b.ca_type="image";a&&(b.bid=a);return b}
function dh(a){var b={};b.dt=Qc;b.flash="0";a:{try{var c=a.f.top.location.href}catch(f){a=2;break a}a=c?c===a.h.location.href?0:1:2}b=(b.frm=a,b);b.u_tz=-(new Date).getTimezoneOffset();var d=void 0===d?J:d;try{var e=d.history.length}catch(f){e=0}b.u_his=e;b.u_java=!!J.navigator&&"unknown"!==typeof J.navigator.javaEnabled&&!!J.navigator.javaEnabled&&J.navigator.javaEnabled();J.screen&&(b.u_h=J.screen.height,b.u_w=J.screen.width,b.u_ah=J.screen.availHeight,b.u_aw=J.screen.availWidth,b.u_cd=J.screen.colorDepth);
J.navigator&&J.navigator.plugins&&(b.u_nplug=J.navigator.plugins.length);J.navigator&&J.navigator.mimeTypes&&(b.u_nmime=J.navigator.mimeTypes.length);return b}
function eh(a){var b=a.f;try{var c=b.screenX;var d=b.screenY}catch(n){}try{var e=b.outerWidth;var f=b.outerHeight}catch(n){}try{var g=b.innerWidth;var h=b.innerHeight}catch(n){}b=[b.screenLeft,b.screenTop,c,d,b.screen?b.screen.availWidth:void 0,b.screen?b.screen.availTop:void 0,e,f,g,h];c=a.f.top;try{var k=(c||window).document,l="CSS1Compat"==k.compatMode?k.documentElement:k.body;var m=(new nc(l.clientWidth,l.clientHeight)).round()}catch(n){m=new nc(-12245933,-12245933)}k=m;m={};l=new Wc;B.SVGElement&&
B.document.createElementNS&&l.set(0);c=Bc();c["allow-top-navigation-by-user-activation"]&&l.set(1);c["allow-popups-to-escape-sandbox"]&&l.set(2);B.crypto&&B.crypto.subtle&&l.set(3);B.TextDecoder&&B.TextEncoder&&l.set(4);l=Xc(l);m.bc=l;m.bih=k.height;m.biw=k.width;m.brdim=b.join();a=a.h;return m.vis={visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[a.visibilityState||a.webkitVisibilityState||a.mozVisibilityState||""]||0,m.wgl=!!J.WebGLRenderingContext,m}
var ch=new function(){var a=window.document;this.f=window;this.h=a};
E("yt.ads_.signals_.getAdSignalsString",function(a){return Gf(bh(a))});var fh="XMLHttpRequest"in B?function(){return new XMLHttpRequest}:null;
function gh(){if(!fh)return null;var a=fh();return"open"in a?a:null}
;var hh={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Delegation-Context":"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},ih="app debugcss debugjs expflag force_ad_params force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address client_dev_root_url".split(" "),
jh=!1;
function kh(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=a.match(qc)[1]||null,e=sc(a);d&&e?(d=c,c=a.match(qc),d=d.match(qc),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?sc(c)==e&&(Number(c.match(qc)[4]||null)||null)==(Number(a.match(qc)[4]||null)||null):!0;d=Q("web_ajax_ignore_global_headers_if_set");for(var f in hh)e=O(hh[f]),!e||!c&&sc(a)||d&&void 0!==b[f]||(b[f]=e);if(c||!sc(a))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());(c||!sc(a))&&(f="undefined"!=typeof Intl?(new Intl.DateTimeFormat).resolvedOptions().timeZone:
null)&&(b["X-YouTube-Time-Zone"]=f);if(c||!sc(a))b["X-YouTube-Ad-Signals"]=Gf(bh(void 0));return b}
function lh(a){var b=window.location.search,c=sc(a),d=rc(a.match(qc)[5]||null);d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=Hf(b),f={};G(ih,function(g){e[g]&&(f[g]=e[g])});
return If(a,f||{},!1)}
function mh(a,b){if(window.fetch&&"XML"!=b.format){var c={method:b.method||"GET",credentials:"same-origin"};b.headers&&(c.headers=b.headers);a=nh(a,b);var d=oh(a,b);d&&(c.body=d);b.withCredentials&&(c.credentials="include");var e=!1,f;fetch(a,c).then(function(g){if(!e){e=!0;f&&window.clearTimeout(f);var h=g.ok,k=function(l){l=l||{};var m=b.context||B;h?b.onSuccess&&b.onSuccess.call(m,l,g):b.onError&&b.onError.call(m,l,g);b.R&&b.R.call(m,l,g)};
"JSON"==(b.format||"JSON")&&(h||400<=g.status&&500>g.status)?g.json().then(k,function(){k(null)}):k(null)}});
b.ba&&0<b.timeout&&(f=Df(function(){e||(e=!0,window.clearTimeout(f),b.ba.call(b.context||B))},b.timeout))}else ph(a,b)}
function ph(a,b){var c=b.format||"JSON";a=nh(a,b);var d=oh(a,b),e=!1,f=qh(a,function(k){if(!e){e=!0;h&&window.clearTimeout(h);a:switch(k&&"status"in k?k.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:var l=!0;break a;default:l=!1}var m=null,n=400<=k.status&&500>k.status,q=500<=k.status&&600>k.status;if(l||n||q)m=rh(a,c,k,b.Na);if(l)a:if(k&&204==k.status)l=!0;else{switch(c){case "XML":l=0==parseInt(m&&m.return_code,10);break a;case "RAW":l=!0;break a}l=!!m}m=m||
{};n=b.context||B;l?b.onSuccess&&b.onSuccess.call(n,k,m):b.onError&&b.onError.call(n,k,m);b.R&&b.R.call(n,k,m)}},b.method,d,b.headers,b.responseType,b.withCredentials);
if(b.P&&0<b.timeout){var g=b.P;var h=Df(function(){e||(e=!0,f.abort(),window.clearTimeout(h),g.call(b.context||B,f))},b.timeout)}}
function nh(a,b){b.Ra&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=O("XSRF_FIELD_NAME",void 0),d=b.wa;d&&(d[c]&&delete d[c],a=If(a,d||{},!0));return a}
function oh(a,b){var c=O("XSRF_FIELD_NAME",void 0),d=O("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.v,g=O("XSRF_FIELD_NAME",void 0),h;b.headers&&(h=b.headers["Content-Type"]);b.Qa||sc(a)&&!b.withCredentials&&sc(a)!=document.location.hostname||"POST"!=b.method||h&&"application/x-www-form-urlencoded"!=h||b.v&&b.v[g]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=Hf(e),lb(e,f),e=b.da&&"JSON"==b.da?JSON.stringify(e):vc(e));if(!(c=e)&&(c=f)){a:{for(var k in f){f=!1;break a}f=!0}c=!f}!jh&&c&&"POST"!=b.method&&
(jh=!0,tf(Error("AJAX request with postData should use POST")));return e}
function rh(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,uf(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&0<=a.indexOf("json")&&(")]}'\n"===f.substring(0,5)&&(f=f.substring(5)),e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?sh(a):null)e={},G(a.getElementsByTagName("*"),function(g){e[g.tagName]=th(g)})}d&&uh(e);
return e}
function uh(a){if(D(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=a[b];if(void 0===mb){var e=null;var f=B.trustedTypes;if(f&&f.createPolicy){try{e=f.createPolicy("goog#html",{createHTML:Sa,createScript:Sa,createScriptURL:Sa})}catch(g){B.console&&B.console.error(g.message)}mb=e}else mb=e}(e=mb)&&e.createHTML(d);a[c]=new Db}else uh(a[b])}}
function sh(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function th(a){var b="";G(a.childNodes,function(c){b+=c.nodeValue});
return b}
function qh(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&sf(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=gh();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;Q("debug_forward_web_query_parameters")&&(a=lh(a));k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=kh(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;function vh(){for(var a={},b=u(Object.entries(Hf(O("DEVICE","")))),c=b.next();!c.done;c=b.next()){var d=u(c.value);c=d.next().value;d=d.next().value;"cbrand"===c?a.deviceMake=d:"cmodel"===c?a.deviceModel=d:"cbr"===c?a.browserName=d:"cbrver"===c?a.browserVersion=d:"cos"===c?a.osName=d:"cosver"===c?a.osVersion=d:"cplatform"===c&&(a.platform=d)}return a}
;function wh(){return"INNERTUBE_API_KEY"in of&&"INNERTUBE_API_VERSION"in of}
function Xg(){return{innertubeApiKey:O("INNERTUBE_API_KEY",void 0),innertubeApiVersion:O("INNERTUBE_API_VERSION",void 0),ma:O("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),na:O("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:O("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),pa:O("INNERTUBE_CONTEXT_HL",void 0),oa:O("INNERTUBE_CONTEXT_GL",void 0),qa:O("INNERTUBE_HOST_OVERRIDE",void 0)||"",sa:!!O("INNERTUBE_USE_THIRD_PARTY_AUTH",!1),ra:!!O("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT",
!1),appInstallData:O("SERIALIZED_CLIENT_CONFIG_DATA",void 0)}}
function Wg(a){var b={client:{hl:a.pa,gl:a.oa,clientName:a.na,clientVersion:a.innertubeContextClientVersion,configInfo:a.ma}},c=window.devicePixelRatio;c&&1!=c&&(b.client.screenDensityFloat=String(c));c=O("EXPERIMENTS_TOKEN","");""!==c&&(b.client.experimentsToken=c);c=[];var d=O("EXPERIMENTS_FORCED_FLAGS",{});for(e in d)c.push({key:e,value:String(d[e])});var e=O("EXPERIMENT_FLAGS",{});for(var f in e)f.startsWith("force_")&&void 0===d[f]&&c.push({key:f,value:String(e[f])});0<c.length&&(b.request={internalExperimentFlags:c});
a.appInstallData&&Q("web_log_app_install_experiments")&&(b.client.configInfo=b.client.configInfo||{},b.client.configInfo.appInstallData=a.appInstallData);O("DELEGATED_SESSION_ID")&&!Q("pageid_as_header_web")&&(b.user={onBehalfOfUser:O("DELEGATED_SESSION_ID")});b.client=Object.assign(b.client,vh());return b}
function xh(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||O("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.Ka||O("AUTHORIZATION"))||(a?b="Bearer "+C("gapi.auth.getToken")().Ja:b=Vc([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=O("SESSION_INDEX",0),Q("pageid_as_header_web")&&(d["X-Goog-PageId"]=O("DELEGATED_SESSION_ID")));return d}
;function yh(a){a=Object.assign({},a);delete a.Authorization;var b=Vc();if(b){var c=new md;c.update(O("INNERTUBE_API_KEY",void 0));c.update(b);b=c.digest();c=3;La(b);void 0===c&&(c=0);if(!Yb){Yb={};for(var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var g=d.concat(e[f].split(""));Xb[f]=g;for(var h=0;h<g.length;h++){var k=g[h];void 0===Yb[k]&&(Yb[k]=h)}}}c=Xb[c];d=[];for(e=0;e<b.length;e+=3){var l=b[e],m=(f=e+1<b.length)?
b[e+1]:0;k=(g=e+2<b.length)?b[e+2]:0;h=l>>2;l=(l&3)<<4|m>>4;m=(m&15)<<2|k>>6;k&=63;g||(k=64,f||(m=64));d.push(c[h],c[l],c[m]||"",c[k]||"")}a.hash=d.join("")}return a}
;function zh(){var a=new gf;(a=a.isAvailable()?new nf(a,"yt.innertube"):null)||(a=new hf("yt.innertube"),a=a.isAvailable()?a:null);this.f=a?new cf(a):null;this.h=document.domain||window.location.hostname}
zh.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.f)try{this.f.set(a,b,Date.now()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(Fe(b))}catch(f){return}else e=escape(b);b=this.h;mc.set(""+a,e,{Y:c,path:"/",domain:void 0===b?"youtube.com":b,secure:!1})};
zh.prototype.get=function(a,b){var c=void 0,d=!this.f;if(!d)try{c=this.f.get(a)}catch(e){d=!0}if(d&&(c=mc.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
zh.prototype.remove=function(a){this.f&&this.f.remove(a);var b=this.h;mc.remove(""+a,"/",void 0===b?"youtube.com":b)};var Ah;function Bh(){Ah||(Ah=new zh);return Ah}
function Ch(a,b,c,d){if(d)return null;d=Bh().get("nextId",!0)||1;var e=Bh().get("requests",!0)||{};e[d]={method:a,request:b,authState:yh(c),requestTime:Math.round(T())};Bh().set("nextId",d+1,86400,!0);Bh().set("requests",e,86400,!0);return d}
function Dh(a){var b=Bh().get("requests",!0)||{};delete b[a];Bh().set("requests",b,86400,!0)}
function Eh(a){var b=Bh().get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(T())-d.requestTime)){var e=d.authState,f=yh(xh(!1));ib(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(T())),$g(a,d.method,e,{}));delete b[c]}}Bh().set("requests",b,86400,!0)}}
;var Fh=C("ytPubsub2Pubsub2Instance")||new M;M.prototype.subscribe=M.prototype.subscribe;M.prototype.unsubscribeByKey=M.prototype.L;M.prototype.publish=M.prototype.H;M.prototype.clear=M.prototype.clear;E("ytPubsub2Pubsub2Instance",Fh);E("ytPubsub2Pubsub2SubscribedKeys",C("ytPubsub2Pubsub2SubscribedKeys")||{});E("ytPubsub2Pubsub2TopicToKeys",C("ytPubsub2Pubsub2TopicToKeys")||{});E("ytPubsub2Pubsub2IsAsync",C("ytPubsub2Pubsub2IsAsync")||{});E("ytPubsub2Pubsub2SkipSubKey",null);var Gh=[],Hh=!1;function Ih(a,b){Hh||(Gh.push({type:"EVENT",eventType:a,payload:b}),10<Gh.length&&Gh.shift())}
;function Jh(a){if(!a)throw Error();throw a;}
function Kh(a){return a}
function U(a){var b=this;this.h=a;this.state={status:"PENDING"};this.f=[];this.onRejected=[];this.h(function(c){if("PENDING"===b.state.status){b.state={status:"FULFILLED",value:c};c=u(b.f);for(var d=c.next();!d.done;d=c.next())d=d.value,d()}},function(c){if("PENDING"===b.state.status){b.state={status:"REJECTED",
reason:c};c=u(b.onRejected);for(var d=c.next();!d.done;d=c.next())d=d.value,d()}})}
U.all=function(a){return new U(function(b,c){var d=[],e=a.length;0===e&&b(d);for(var f={G:0};f.G<a.length;f={G:f.G},++f.G)Lh(U.resolve(a[f.G]).then(function(g){return function(h){d[g.G]=h;e--;0===e&&b(d)}}(f)),function(g){c(g)})})};
U.resolve=function(a){return new U(function(b,c){a instanceof U?a.then(b,c):b(a)})};
U.reject=function(a){return new U(function(b,c){c(a)})};
U.prototype.then=function(a,b){var c=this,d=null!==a&&void 0!==a?a:Kh,e=null!==b&&void 0!==b?b:Jh;return new U(function(f,g){"PENDING"===c.state.status?(c.f.push(function(){Mh(c,c,d,f,g)}),c.onRejected.push(function(){Nh(c,c,e,f,g)})):"FULFILLED"===c.state.status?Mh(c,c,d,f,g):"REJECTED"===c.state.status&&Nh(c,c,e,f,g)})};
function Lh(a,b){a.then(void 0,b)}
function Mh(a,b,c,d,e){try{if("FULFILLED"!==a.state.status)throw Error("calling handleResolve before the promise is fulfilled.");var f=c(a.state.value);f instanceof U?Oh(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Nh(a,b,c,d,e){try{if("REJECTED"!==a.state.status)throw Error("calling handleReject before the promise is rejected.");var f=c(a.state.reason);f instanceof U?Oh(a,b,f,d,e):d(f)}catch(g){e(g)}}
function Oh(a,b,c,d,e){b===c?e(new TypeError("Circular promise chain detected.")):c.then(function(f){f instanceof U?Oh(a,b,f,d,e):d(f)},function(f){e(f)})}
;function Ph(a,b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){try{a.removeEventListener("success",e),a.removeEventListener("error",d)}catch(g){}}
a.addEventListener("success",e);a.addEventListener("error",d)}
function Qh(a){return new Promise(function(b,c){Ph(a,b,c)})}
function V(a){return new U(function(b,c){Ph(a,b,c)})}
;function Rh(a,b){return new U(function(c,d){function e(){var f=a?b(a):null;f?f.then(function(g){a=g;e()},d):c()}
e()})}
;function Sh(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];d=Error.call(this,a);this.message=d.message;"stack"in d&&(this.stack=d.stack);this.args=[].concat(c instanceof Array?c:ia(u(c)))}
x(Sh,Error);var Th={},Uh=(Th.AUTH_INVALID="No user identifier specified.",Th.EXPLICIT_ABORT="Transaction was explicitly aborted.",Th.IDB_NOT_SUPPORTED="IndexedDB is not supported.",Th.MISSING_OBJECT_STORE="Object store not created.",Th.UNKNOWN_ABORT="Transaction was aborted for unknown reasons.",Th.QUOTA_EXCEEDED="The current transaction exceeded its quota limitations.",Th.QUOTA_MAYBE_EXCEEDED="The current transaction may have failed because of exceeding quota limitations.",Th);
function Vh(a,b,c){b=void 0===b?{}:b;c=void 0===c?Uh[a]:c;Sh.call(this,c,Object.assign({name:"YtIdbKnownError",isSw:void 0===self.document,isIframe:self!==self.top,type:a},b));this.type=a;this.message=c;Object.setPrototypeOf(this,Vh.prototype);Hh||(Gh.push({type:"ERROR",payload:this}),10<Gh.length&&Gh.shift())}
x(Vh,Sh);function Wh(a,b,c){Vh.call(this,"UNKNOWN_ABORT",{objectStoreNames:a,dbName:b,mode:c});Object.setPrototypeOf(this,Wh.prototype)}
x(Wh,Vh);function Xh(a){Vh.call(this,"MISSING_OBJECT_STORE",{Sa:a},Uh.MISSING_OBJECT_STORE);Object.setPrototypeOf(this,Xh.prototype)}
x(Xh,Vh);function Yh(a,b){this.f=a;this.options=b;this.transactionCount=0;this.i=Math.round(T());this.h=!1}
r=Yh.prototype;r.add=function(a,b,c){return Zh(this,[a],"readwrite",function(d){return $h(d,a).add(b,c)})};
r.clear=function(a){return Zh(this,[a],"readwrite",function(b){return $h(b,a).clear()})};
r.close=function(){var a;this.f.close();(null===(a=this.options)||void 0===a?0:a.closed)&&this.options.closed()};
r.count=function(a,b){return Zh(this,[a],"readonly",function(c){return $h(c,a).count(b)})};
r["delete"]=function(a,b){return Zh(this,[a],"readwrite",function(c){return $h(c,a)["delete"](b)})};
r.get=function(a,b){return Zh(this,[a],"readwrite",function(c){return $h(c,a).get(b)})};
function Zh(a,b,c,d){c=void 0===c?"readonly":c;a.transactionCount++;var e=a.f.transaction(b,c);e=new ai(e);d=bi(e,d);ci(a,d,b.join(),c);return d}
function ci(a,b,c,d){Ta(a,function f(){var g,h,k=this,l,m,n;return Da(f,function(q){if(1==q.f)return g=Math.round(T()),va(q,2),z(q,b,4);if(2!=q.f)h=Math.round(T()),di(k,!0,c,h-g),q.f=0,q.m=0;else{l=wa(q);m=Math.round(T());var p=l,v=k.f.name,w=k.transactionCount,y;"QuotaExceededError"===p.name?y=new Vh("QUOTA_EXCEEDED",{objectStoreNames:c,dbName:v,mode:d}):"UnknownError"===p.name&&(y=new Vh("QUOTA_MAYBE_EXCEEDED",{objectStoreNames:c,dbName:v,mode:d}));y&&Ih("QUOTA_EXCEEDED",{dbName:v,objectStoreNames:c,
transactionCount:w,transactionMode:d});n=m-g;l instanceof Wh&&(Ih("TRANSACTION_UNEXPECTEDLY_ABORTED",{objectStoreNames:c,transactionDuration:n,transactionCount:k.transactionCount,dbDuration:m-k.i}),k.h=!0);di(k,!1,c,n);q.f=0}})})}
function di(a,b,c,d){Ih("TRANSACTION_ENDED",{objectStoreNames:c,connectionHasUnknownAbortedTransaction:a.h,duration:d,isSuccessful:b})}
function ei(a){this.f=a}
r=ei.prototype;r.add=function(a,b){return V(this.f.add(a,b))};
r.clear=function(){return V(this.f.clear()).then(function(){})};
r.count=function(a){return V(this.f.count(a))};
function fi(a,b){return gi(a,{query:b},function(c){return c["delete"]().then(function(){return c["continue"]()})}).then(function(){})}
r["delete"]=function(a){return a instanceof IDBKeyRange?fi(this,a):V(this.f["delete"](a))};
r.get=function(a){return V(this.f.get(a))};
r.index=function(a){return new hi(this.f.index(a))};
r.getName=function(){return this.f.name};
function gi(a,b,c){a=a.f.openCursor(b.query,b.direction);return ii(a).then(function(d){return Rh(d,c)})}
function ai(a){var b=this;this.f=a;this.h=new Map;this.aborted=!1;this.done=new Promise(function(c,d){b.f.addEventListener("complete",function(){c()});
b.f.addEventListener("error",function(e){e.currentTarget===e.target&&d(b.f.error)});
b.f.addEventListener("abort",function(){var e=b.f.error;if(e)d(e);else if(!b.aborted){e=Wh;for(var f=b.f.objectStoreNames,g=[],h=0;h<f.length;h++){var k=f.item(h);if(null===k)throw Error("Invariant: item in DOMStringList is null");g.push(k)}e=new e(g.join(),b.f.db.name,b.f.mode);d(e)}})})}
function bi(a,b){var c=new Promise(function(d,e){Lh(b(a).then(function(f){a.commit();d(f)}),e)});
return Promise.all([c,a.done]).then(function(d){return u(d).next().value})}
ai.prototype.abort=function(){this.f.abort();this.aborted=!0;throw new Vh("EXPLICIT_ABORT");};
ai.prototype.commit=function(){var a=this.f;a.commit&&!this.aborted&&a.commit()};
function $h(a,b){var c=a.f.objectStore(b),d=a.h.get(c);d||(d=new ei(c),a.h.set(c,d));return d}
function hi(a){this.f=a}
hi.prototype.count=function(a){return V(this.f.count(a))};
hi.prototype["delete"]=function(a){return ji(this,{query:a},function(b){return b["delete"]().then(function(){return b["continue"]()})})};
hi.prototype.get=function(a){return V(this.f.get(a))};
hi.prototype.getKey=function(a){return V(this.f.getKey(a))};
function ji(a,b,c){a=a.f.openCursor(void 0===b.query?null:b.query,void 0===b.direction?"next":b.direction);return ii(a).then(function(d){return Rh(d,c)})}
function ki(a,b){this.request=a;this.cursor=b}
function ii(a){return V(a).then(function(b){return null===b?null:new ki(a,b)})}
r=ki.prototype;r.advance=function(a){this.cursor.advance(a);return ii(this.request)};
r["continue"]=function(a){this.cursor["continue"](a);return ii(this.request)};
r["delete"]=function(){return V(this.cursor["delete"]()).then(function(){})};
r.getKey=function(){return this.cursor.key};
r.update=function(a){return V(this.cursor.update(a))};function li(a,b,c){return Ta(this,function e(){var f,g,h,k,l,m,n,q,p,v;return Da(e,function(w){if(1==w.f)return f=self.indexedDB.open(a,b),g=c,h=g.blocked,k=g.blocking,l=g.va,m=g.upgrade,n=g.closed,p=function(){q||(q=new Yh(f.result,{closed:n}));return q},f.addEventListener("upgradeneeded",function(y){if(null===y.newVersion)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
if(null===f.transaction)throw Error("Invariant: transaction on IDbOpenDbRequest is null");y.dataLoss&&"none"!==y.dataLoss&&Ih("IDB_DATA_CORRUPTED",{reason:y.dataLossMessage||"unknown reason",dbName:a});var la=p(),L=new ai(f.transaction);m&&m(la,y.oldVersion,y.newVersion,L)}),h&&f.addEventListener("blocked",function(){h()}),z(w,Qh(f),2);
v=w.l;k&&v.addEventListener("versionchange",function(){k(p())});
v.addEventListener("close",function(){Ih("IDB_UNEXPECTEDLY_CLOSED",{dbName:a,dbVersion:v.version});l&&l()});
return w["return"](p())})})}
function mi(a,b,c){c=void 0===c?{}:c;return li(a,b,c)}
function ni(a,b){b=void 0===b?{}:b;return Ta(this,function d(){var e,f,g;return Da(d,function(h){e=self.indexedDB.deleteDatabase(a);f=b;(g=f.blocked)&&e.addEventListener("blocked",function(){g()});
return z(h,Qh(e),0)})})}
;var oi=Vb||Wb;function pi(a){this.name="YtIdbMeta";this.options=a;this.h=!1}
function qi(a,b,c){c=void 0===c?{}:c;return mi(a,b,c)}
pi.prototype["delete"]=function(a){a=void 0===a?{}:a;return ni(this.name,a)};
pi.prototype.open=function(){var a=this;if(!this.f){var b,c=function(){a.f===b&&(a.f=void 0)},d={blocking:function(f){f.close()},
closed:c,va:c,upgrade:this.options.upgrade},e=function(){return Ta(a,function g(){var h=this,k,l,m;return Da(g,function(n){switch(n.f){case 1:return va(n,2),z(n,qi(h.name,h.options.version,d),4);case 4:k=n.l;if(!Ub){n.D(5);break}a:{var q=u(Object.keys(h.options.ua));for(var p=q.next();!p.done;p=q.next())if(p=p.value,!k.f.objectStoreNames.contains(p)){q=p;break a}q=void 0}l=q;if(void 0===l){n.D(5);break}if(!Ub||h.h){n.D(7);break}h.h=!0;return z(n,h["delete"](),8);case 8:return n["return"](e());case 7:throw new Xh(l);
case 5:return n["return"](k);case 2:m=wa(n);if(m instanceof DOMException?"VersionError"===m.name:"DOMError"in self&&m instanceof DOMError?"VersionError"===m.name:m instanceof Object&&"message"in m&&"An attempt was made to open a database using a lower version than the existing version."===m.message)return n["return"](qi(h.name,void 0,Object.assign(Object.assign({},d),{upgrade:void 0})));c();throw m;}})})};
this.f=b=e()}return this.f};var ri=new pi({ua:{databases:!0},upgrade:function(a,b){1>b&&a.f.createObjectStore("databases",{keyPath:"actualName"})}});
function si(a){return Ta(this,function c(){var d;return Da(c,function(e){if(1==e.f)return z(e,ri.open(),2);d=e.l;return e["return"](Zh(d,["databases"],"readwrite",function(f){var g=$h(f,"databases");return g.get(a.actualName).then(function(h){if(h?a.actualName!==h.actualName||a.publicName!==h.publicName||a.userIdentifier!==h.userIdentifier||a.signedIn!==h.signedIn||a.clearDataOnAuthChange!==h.clearDataOnAuthChange:1)return V(g.f.put(a,void 0)).then(function(){})})}))})})}
function ti(){return Ta(this,function b(){var c;return Da(b,function(d){if(1==d.f)return z(d,ri.open(),2);c=d.l;return d["return"](c["delete"]("databases","yt-idb-test-do-not-use"))})})}
;new K;var ui;
function vi(){return Ta(this,function b(){var c,d,e;return Da(b,function(f){switch(f.f){case 1:var g;if(g=oi)g=/WebKit\/([0-9]+)/.exec(H),g=!!(g&&600<=parseInt(g[1],10));g&&(g=/WebKit\/([0-9]+)/.exec(H),g=!(g&&602<=parseInt(g[1],10)));if(g&&!Q("ytidb_allow_on_ios_safari_v8_and_v9")||Hb)return f["return"](!1);try{if(c=self,!(c.indexedDB&&c.IDBIndex&&c.IDBKeyRange&&c.IDBObjectStore))return f["return"](!1)}catch(h){return f["return"](!1)}if(!("IDBTransaction"in self&&"objectStoreNames"in IDBTransaction.prototype))return f["return"](!1);if(!Q("ytidb_new_supported_check_with_delete")){f.D(2);
break}va(f,3);return z(f,ti(),5);case 5:return f["return"](!0);case 3:return wa(f),f["return"](!1);case 2:if(!Q("ytidb_new_supported_check_with_add_and_delete")){f.D(6);break}va(f,7);d={actualName:"yt-idb-test-do-not-use",publicName:"yt-idb-test-do-not-use",userIdentifier:void 0,signedIn:!1};return z(f,si(d),9);case 9:return z(f,ti(),10);case 10:return f["return"](!0);case 7:return wa(f),f["return"](!1);case 6:return va(f,11,12),z(f,mi("yt-idb-test-do-not-use"),14);case 14:if(e=f.l,!e)return f["return"](!1);
case 12:f.B=[f.h];f.m=0;f.j=0;if(e)try{e.close()}catch(h){}g=f.B.splice(0)[0];(g=f.h=f.h||g)?g.X?f.f=f.m||f.j:void 0!=g.D&&f.j<g.D?(f.f=g.D,f.h=null):f.f=f.j:f.f=13;break;case 11:return wa(f),f["return"](!1);case 13:return f["return"](!0)}})})}
function wi(){if(void 0!==ui)return ui;var a=T();Hh=!0;return ui=vi().then(function(b){Hh=!1;Ih("IS_SUPPORTED_COMPLETED",{duration:Math.round(T()-a),isSupported:b});return b})}
;function xi(){K.call(this);this.m=!1;this.h=yi();zi(this);Ai(this)}
x(xi,K);function yi(){var a=window.navigator.onLine;return void 0===a?!0:a}
function Ai(a){window.addEventListener("online",function(){a.h=!0;Bi(a)})}
function zi(a){window.addEventListener("offline",function(){a.h=!1;Bi(a)})}
function Bi(a){a.m&&(uf(new Sh("NetworkStatusManager state did not match poll",T()-0)),a.m=!1)}
;function Ci(a,b){b=void 0===b?{}:b;wi().then(function(){xi.f||(xi.f=new xi);xi.f.h!==yi()&&uf(new Sh("NetworkStatusManager isOnline does not match window status"));ph(a,b)})}
function Di(a,b){b=void 0===b?{}:b;wi().then(function(){ph(a,b)})}
;function Ei(a){var b=this;this.f=null;a?this.f=a:wh()&&(this.f=Xg());Xf(function(){Eh(b)})}
Ei.prototype.isReady=function(){!this.f&&wh()&&(this.f=Xg());return!!this.f};
function $g(a,b,c,d){!O("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&uf(new Sh("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady()){var e=new Sh("innertube xhrclient not ready",b,c,d);tf(e);e.sampleWeight=0;throw e;}var f={headers:{"Content-Type":"application/json"},method:"POST",v:c,da:"JSON",P:function(){d.P()},
ba:d.P,onSuccess:function(n,q){if(d.onSuccess)d.onSuccess(q)},
aa:function(n){if(d.onSuccess)d.onSuccess(n)},
onError:function(n,q){if(d.onError)d.onError(q)},
Ta:function(n){if(d.onError)d.onError(n)},
timeout:d.timeout,withCredentials:!0},g="";(e=a.f.qa)&&(g=e);var h=a.f.sa||!1,k=xh(h,g,d);Object.assign(f.headers,k);f.headers.Authorization&&!g&&(f.headers["x-origin"]=window.location.origin);e="/youtubei/"+a.f.innertubeApiVersion+"/"+b;var l={alt:"json"};a.f.ra&&f.headers.Authorization||(l.key=a.f.innertubeApiKey);var m=If(""+g+e,l||{},!0);wi().then(function(n){if(d.retry&&Q("retry_web_logging_batches")&&"www.youtube-nocookie.com"!=g){if(Q("networkless_gel")&&!n||!Q("networkless_gel"))var q=Ch(b,
c,k,h);if(q){var p=f.onSuccess,v=f.aa;f.onSuccess=function(w,y){Dh(q);p(w,y)};
c.aa=function(w,y){Dh(q);v(w,y)}}}try{Q("use_fetch_for_op_xhr")?mh(m,f):Q("networkless_gel")&&d.retry?(f.method="POST",!d.xa&&Q("nwl_send_fast_on_unload")?Di(m,f):Ci(m,f)):(f.method="POST",f.v||(f.v={}),ph(m,f))}catch(w){if("InvalidAccessError"==w.name)q&&(Dh(q),q=0),uf(Error("An extension is blocking network request."));
else throw w;}q&&Xf(function(){Eh(a)})})}
;var Fi=[{Z:function(a){return"Cannot read property '"+a.key+"'"},
S:{TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]}],Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}]}},{Z:function(a){return"Cannot call '"+a.key+"'"},
S:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/([^ ]+) called on (null or undefined)/,groups:["key","value"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,groups:["key"]}]}}];function Gi(){this.f=[];this.h=[]}
var Hi;var Ii=new M;function Ji(a,b,c,d){c+="."+a;a=Ki(b);d[c]=a;return c.length+a.length}
function Ki(a){return("string"===typeof a?a:String(JSON.stringify(a))).substr(0,500)}
;var Li=new Set,Mi=0,Ni=["PhantomJS","Googlebot","TO STOP THIS SECURITY SCAN go/scan"];function Y(a,b,c){this.m=this.f=this.h=null;this.l=Ma(this);this.i=0;this.u=!1;this.o=[];this.j=null;this.B=c;this.J={};c=document;if(a="string"===typeof a?c.getElementById(a):a)if(c="iframe"==a.tagName.toLowerCase(),b.host||(b.host=c?tc(a.src):"https://www.youtube.com"),this.h=new Rf(b),c||(b=Oi(this,a),this.m=a,(c=a.parentNode)&&c.replaceChild(b,a),a=b),this.f=a,this.f.id||(this.f.id="widget"+Ma(this.f)),Lf[this.f.id]=this,window.postMessage){this.j=new M;Pi(this);b=P(this.h,"events");for(var d in b)b.hasOwnProperty(d)&&
this.addEventListener(d,b[d]);for(var e in Nf)Qi(this,e)}}
r=Y.prototype;r.setSize=function(a,b){this.f.width=a;this.f.height=b;return this};
r.ta=function(){return this.f};
r.ea=function(a){Ri(this,a.event,a)};
r.addEventListener=function(a,b){var c=b;"string"==typeof b&&(c=function(){window[b].apply(window,arguments)});
if(!c)return this;this.j.subscribe(a,c);Si(this,a);return this};
function Qi(a,b){var c=b.split(".");if(2==c.length){var d=c[1];a.B==c[0]&&Si(a,d)}}
r.destroy=function(){this.f.id&&(Lf[this.f.id]=null);var a=this.j;a&&"function"==typeof a.dispose&&a.dispose();if(this.m){a=this.f;var b=a.parentNode;b&&b.replaceChild(this.m,a)}else(a=this.f)&&a.parentNode&&a.parentNode.removeChild(a);Tf&&(Tf[this.l]=null);this.h=null;a=this.f;for(var c in hb)hb[c][0]==a&&Af(c);this.m=this.f=null};
r.V=function(){return{}};
function Ti(a,b,c){c=c||[];c=Array.prototype.slice.call(c);b={event:"command",func:b,args:c};a.u?a.T(b):a.o.push(b)}
function Ri(a,b,c){a.j.i||(c={target:a,data:c},a.j.H(b,c),Qf(a.B+"."+b,c))}
function Oi(a,b){for(var c=document.createElement("iframe"),d=b.attributes,e=0,f=d.length;e<f;e++){var g=d[e].value;null!=g&&""!=g&&"null"!=g&&c.setAttribute(d[e].name,g)}c.setAttribute("frameBorder",0);c.setAttribute("allowfullscreen",1);c.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");c.setAttribute("title","YouTube "+P(a.h,"title"));(d=P(a.h,"width"))&&c.setAttribute("width",d);(d=P(a.h,"height"))&&c.setAttribute("height",d);var h=
a.V();h.enablejsapi=window.postMessage?1:0;window.location.host&&(h.origin=window.location.protocol+"//"+window.location.host);h.widgetid=a.l;window.location.href&&G(["debugjs","debugcss"],function(k){var l=window.location.href;var m=l.search(wc);b:{var n=0;for(var q=k.length;0<=(n=l.indexOf(k,n))&&n<m;){var p=l.charCodeAt(n-1);if(38==p||63==p)if(p=l.charCodeAt(n+q),!p||61==p||38==p||35==p)break b;n+=q+1}n=-1}if(0>n)l=null;else{q=l.indexOf("&",n);if(0>q||q>m)q=m;n+=k.length+1;l=decodeURIComponent(l.substr(n,
q-n).replace(/\+/g," "))}null!==l&&(h[k]=l)});
c.src=P(a.h,"host")+("/embed/"+P(a.h,"videoId"))+"?"+vc(h);return c}
r.ca=function(){this.f&&this.f.contentWindow?this.T({event:"listening"}):window.clearInterval(this.i)};
function Pi(a){Sf(a.h,a,a.l);a.i=Ef(Ra(a.ca,a));Cf(a.f,"load",Ra(function(){window.clearInterval(this.i);this.i=Ef(Ra(this.ca,this))},a))}
function Si(a,b){a.J[b]||(a.J[b]=!0,Ti(a,"addEventListener",[b]))}
r.T=function(a){a.id=this.l;a.channel="widget";var b=Fe(a),c=this.h,d=tc(this.f.src||"");var e=0==d.indexOf("https:")?[d]:c.f?[d.replace("http:","https:")]:c.i?[d]:[d,d.replace("http:","https:")];if(this.f.contentWindow)for(var f=0;f<e.length;f++)try{this.f.contentWindow.postMessage(b,e[f])}catch(Ua){if(Ua.name&&"SyntaxError"==Ua.name){if(!(Ua.message&&0<Ua.message.indexOf("target origin ''"))){var g=void 0,h=void 0,k=Ua;h=void 0===h?{}:h;h.name=O("INNERTUBE_CONTEXT_CLIENT_NAME",1);h.version=O("INNERTUBE_CONTEXT_CLIENT_VERSION",
void 0);var l=h||{},m="WARNING";m=void 0===m?"ERROR":m;g=void 0===g?!1:g;if(k){if(Q("console_log_js_exceptions")){var n=k,q=[];q.push("Name: "+n.name);q.push("Message: "+n.message);n.hasOwnProperty("params")&&q.push("Error Params: "+JSON.stringify(n.params));q.push("File name: "+n.fileName);q.push("Stacktrace: "+n.stack);window.console.log(q.join("\n"),n)}if((window&&window.yterr||g)&&!(5<=Mi)&&0!==k.sampleWeight){var p=k,v=l,w=Zb(p),y=w.message||"Unknown Error",la=w.name||"UnknownError",L=w.stack||
p.f||"Not available";if(Q("kevlar_js_fixes")&&L.startsWith(la+": "+y)){var ya=L.split("\n");ya.shift();L=ya.join("\n")}var Yi=w.lineNumber||"Not available",Zi=w.fileName||"Not available",$i=L,dc=void 0,ea=p,R=v;if(ea.hasOwnProperty("args")&&ea.args&&ea.args.length)for(var sa=0,ec=0;ec<ea.args.length;ec++){var S=ea.args[ec],Ea="params."+ec;sa+=Ea.length;if(S)if(Array.isArray(S)){for(var aj=R,vd=sa,qb=0;qb<S.length&&!(S[qb]&&(vd+=Ji(qb,S[qb],Ea,aj),500<vd));qb++);sa=vd}else if("object"===typeof S){var fc=
void 0,bj=R,wd=sa;for(fc in S)if(S[fc]&&(wd+=Ji(fc,S[fc],Ea,bj),500<wd))break;sa=wd}else R[Ea]=Ki(S),sa+=R[Ea].length;else R[Ea]=Ki(S),sa+=R[Ea].length;if(500<=sa)break}else if(ea.hasOwnProperty("params")&&ea.params){var gc=ea.params;if("object"===typeof ea.params){var ag=0;for(dc in gc)if(gc[dc]){var bg="params."+dc,cg=Ki(gc[dc]);R[bg]=cg;ag+=bg.length+cg.length;if(500<ag)break}}else R.params=Ki(gc)}navigator.vendor&&!R.hasOwnProperty("vendor")&&(R.vendor=navigator.vendor);var xd={message:y,name:la,
lineNumber:Yi,fileName:Zi,stack:$i,params:R},dg=Number(p.columnNumber);isNaN(dg)||(xd.lineNumber=xd.lineNumber+":"+dg);for(var W,Fa=xd,eg=u(Fi),yd=eg.next();!yd.done;yd=eg.next()){var zd=yd.value;if(zd.S[Fa.name])for(var fg=u(zd.S[Fa.name]),Ad=fg.next();!Ad.done;Ad=fg.next()){var gg=Ad.value,hc=Fa.message.match(gg.regexp);if(hc){Fa.params["error.original"]=hc[0];for(var Bd=gg.groups,hg={},Va=0;Va<Bd.length;Va++)hg[Bd[Va]]=hc[Va+1],Fa.params["error."+Bd[Va]]=hc[Va+1];Fa.message=zd.Z(hg);break}}}W=
Fa;window.yterr&&"function"===typeof window.yterr&&window.yterr(W);if(!(Li.has(W.message)||0<=W.stack.indexOf("/YouTubeCenter.js")||0<=W.stack.indexOf("/mytube.js"))){"ERROR"===m?Ii.H("handleError",W):"WARNING"===m&&Ii.H("handleWarning",W);if(Q("kevlar_gel_error_routing")){var ic=void 0,ig=m,N=W;a:{for(var jg=u(Ni),Cd=jg.next();!Cd.done;Cd=jg.next()){var kg=H;if(kg&&0<=kg.toLowerCase().indexOf(Cd.value.toLowerCase())){var lg=!0;break a}}lg=!1}if(!lg){var rb={stackTrace:N.stack};N.fileName&&(rb.filename=
N.fileName);var fa=N.lineNumber&&N.lineNumber.split?N.lineNumber.split(":"):[];0!==fa.length&&(1!==fa.length||isNaN(Number(fa[0]))?2!==fa.length||isNaN(Number(fa[0]))||isNaN(Number(fa[1]))||(rb.lineNumber=Number(fa[0]),rb.columnNumber=Number(fa[1])):rb.lineNumber=Number(fa[0]));Hi||(Hi=new Gi);var jc=Hi;var cj=N.message,dj=N.name;a:{for(var mg=u(jc.h),Dd=mg.next();!Dd.done;Dd=mg.next()){var ng=Dd.value;if(N.message&&N.message.match(ng.f)){var Ed=ng.weight;break a}}for(var og=u(jc.f),Fd=og.next();!Fd.done;Fd=
og.next()){var pg=Fd.value;if(pg.f(N)){Ed=pg.weight;break a}}Ed=1}var Gd={level:"ERROR_LEVEL_UNKNOWN",message:cj,errorClassName:dj,sampleWeight:Ed};"ERROR"===ig?Gd.level="ERROR_LEVEL_ERROR":"WARNING"===ig&&(Gd.level="ERROR_LEVEL_WARNNING");var ej={isObfuscated:!0,browserStackInfo:rb},Wa={pageUrl:window.location.href};O("FEXP_EXPERIMENTS")&&(Wa.experimentIds=O("FEXP_EXPERIMENTS"));Wa.kvPairs=[{key:"client.params.errorServiceSignature",value:"msg="+jc.h.length+"&cb="+jc.f.length},{key:"client.params.serviceWorker",
value:"false"}];var Hd=N.params;if(Hd)for(var qg=u(Object.keys(Hd)),Id=qg.next();!Id.done;Id=qg.next()){var rg=Id.value;Wa.kvPairs.push({key:"client."+rg,value:String(Hd[rg])})}var sg=O("SERVER_NAME",void 0),tg=O("SERVER_VERSION",void 0);sg&&tg&&(Wa.kvPairs.push({key:"server.name",value:sg}),Wa.kvPairs.push({key:"server.version",value:tg}));var fj={errorMetadata:Wa,stackTrace:ej,logMessage:Gd};ic=void 0===ic?{}:ic;var ug=Ei;O("ytLoggingEventsDefaultDisabled",!1)&&Ei==Ei&&(ug=null);var gj=ug,X=ic;
X=void 0===X?{}:X;var sb={};sb.eventTimeMs=Math.round(X.timestamp||T());sb.clientError=fj;var vg=C("_lact",window);var wg=null==vg?-1:Math.max(Date.now()-vg,0);sb.context={lastActivityMs:String(X.timestamp||!isFinite(wg)?-1:wg)};if(Q("log_sequence_info_on_gel_web")&&X.fa){var hj=sb.context,tb=X.fa;ah[tb]=tb in ah?ah[tb]+1:0;hj.sequence={index:ah[tb],groupKey:tb};X.Pa&&delete ah[X.fa]}var ij=sb,kc=X.Oa,xg=gj,Jd="";if(kc){var lc=kc,Kd={};lc.videoId?Kd.videoId=lc.videoId:lc.playlistId&&(Kd.playlistId=
lc.playlistId);Sg[kc.token]=Kd;Jd=kc.token}var Ld=Rg.get(Jd)||[];Rg.set(Jd,Ld);Ld.push(ij);xg&&(Mg=new xg);var jj=Vf("web_logging_max_batch")||100,yg=T();Ld.length>=jj?Tg(!0):10<=yg-Pg&&(Vg(),Pg=yg);Tg()}}if(!Q("suppress_error_204_logging")){var Md,Ga=W,ub=Ga.params||{},ta={wa:{a:"logerror",t:"jserror",type:Ga.name,msg:Ga.message.substr(0,250),line:Ga.lineNumber,level:m,"client.name":ub.name},v:{url:O("PAGE_NAME",window.location.href),file:Ga.fileName},method:"POST"};ub.version&&(ta["client.version"]=
ub.version);if(ta.v){Ga.stack&&(ta.v.stack=Ga.stack);for(var zg=u(Object.keys(ub)),Nd=zg.next();!Nd.done;Nd=zg.next()){var Ag=Nd.value;ta.v["client."+Ag]=ub[Ag]}if(Md=O("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(var Bg=u(Object.keys(Md)),Od=Bg.next();!Od.done;Od=Bg.next()){var Cg=Od.value;ta.v[Cg]=Md[Cg]}var Dg=O("SERVER_NAME",void 0),Eg=O("SERVER_VERSION",void 0);Dg&&Eg&&(ta.v["server.name"]=Dg,ta.v["server.version"]=Eg)}ph(O("ECATCHER_REPORT_HOST","")+"/error_204",ta)}Li.add(W.message);
Mi++}}}}}else throw Ua;}else console&&console.warn&&console.warn("The YouTube player is not attached to the DOM. API calls should be made after the onReady event. See more: https://developers.google.com/youtube/iframe_api_reference#Events")};function Ui(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
function Vi(a){return 0===a.search("get")||0===a.search("is")}
;function Z(a,b){if(!a)throw Error("YouTube player element ID required.");var c={title:"video player",videoId:"",width:640,height:360};if(b)for(var d in b)c[d]=b[d];Y.call(this,a,c,"player");this.F={};this.playerInfo={}}
x(Z,Y);r=Z.prototype;r.V=function(){var a=P(this.h,"playerVars");if(a){var b={},c;for(c in a)b[c]=a[c];a=b}else a={};window!=window.top&&document.referrer&&(a.widget_referrer=document.referrer.substring(0,256));if(c=P(this.h,"embedConfig")){if(D(c))try{c=JSON.stringify(c)}catch(d){console.error("Invalid embed config JSON",d)}a.embed_config=c}return a};
r.ea=function(a){var b=a.event;a=a.info;switch(b){case "apiInfoDelivery":if(D(a))for(var c in a)this.F[c]=a[c];break;case "infoDelivery":Wi(this,a);break;case "initialDelivery":window.clearInterval(this.i);this.playerInfo={};this.F={};Xi(this,a.apiInterface);Wi(this,a);break;default:Ri(this,b,a)}};
function Wi(a,b){if(D(b))for(var c in b)a.playerInfo[c]=b[c]}
function Xi(a,b){G(b,function(c){this[c]||("getCurrentTime"==c?this[c]=function(){var d=this.playerInfo.currentTime;if(1==this.playerInfo.playerState){var e=(Date.now()/1E3-this.playerInfo.currentTimeLastUpdated_)*this.playerInfo.playbackRate;0<e&&(d+=Math.min(e,1))}return d}:Ui(c)?this[c]=function(){this.playerInfo={};
this.F={};Ti(this,c,arguments);return this}:Vi(c)?this[c]=function(){var d=0;
0===c.search("get")?d=3:0===c.search("is")&&(d=2);return this.playerInfo[c.charAt(d).toLowerCase()+c.substr(d+1)]}:this[c]=function(){Ti(this,c,arguments);
return this})},a)}
r.getVideoEmbedCode=function(){var a=parseInt(P(this.h,"width"),10),b=parseInt(P(this.h,"height"),10),c=P(this.h,"host")+("/embed/"+P(this.h,"videoId"));zb.test(c)&&(-1!=c.indexOf("&")&&(c=c.replace(ob,"&amp;")),-1!=c.indexOf("<")&&(c=c.replace(pb,"&lt;")),-1!=c.indexOf(">")&&(c=c.replace(vb,"&gt;")),-1!=c.indexOf('"')&&(c=c.replace(wb,"&quot;")),-1!=c.indexOf("'")&&(c=c.replace(xb,"&#39;")),-1!=c.indexOf("\x00")&&(c=c.replace(yb,"&#0;")));return'<iframe width="'+a+'" height="'+b+'" src="'+c+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'};
r.getOptions=function(a){return this.F.namespaces?a?this.F[a].options||[]:this.F.namespaces||[]:[]};
r.getOption=function(a,b){if(this.F.namespaces&&a&&b)return this.F[a][b]};
function kj(a){if("iframe"!=a.tagName.toLowerCase()){var b=Pf(a,"videoid");b&&(b={videoId:b,width:Pf(a,"width"),height:Pf(a,"height")},new Z(a,b))}}
;E("YT.PlayerState.UNSTARTED",-1);E("YT.PlayerState.ENDED",0);E("YT.PlayerState.PLAYING",1);E("YT.PlayerState.PAUSED",2);E("YT.PlayerState.BUFFERING",3);E("YT.PlayerState.CUED",5);E("YT.get",function(a){return Lf[a]});
E("YT.scan",Of);E("YT.subscribe",function(a,b,c){Xe.subscribe(a,b,c);Nf[a]=!0;for(var d in Lf)Qi(Lf[d],a)});
E("YT.unsubscribe",function(a,b,c){We(a,b,c)});
E("YT.Player",Z);Y.prototype.destroy=Y.prototype.destroy;Y.prototype.setSize=Y.prototype.setSize;Y.prototype.getIframe=Y.prototype.ta;Y.prototype.addEventListener=Y.prototype.addEventListener;Z.prototype.getVideoEmbedCode=Z.prototype.getVideoEmbedCode;Z.prototype.getOptions=Z.prototype.getOptions;Z.prototype.getOption=Z.prototype.getOption;
Mf.push(function(a){var b=a;b||(b=document);a=cb(b.getElementsByTagName("yt:player"));var c=b||document;if(c.querySelectorAll&&c.querySelector)b=c.querySelectorAll(".yt-player");else{var d;c=document;b=b||c;if(b.querySelectorAll&&b.querySelector)b=b.querySelectorAll(".yt-player");else if(b.getElementsByClassName){var e=b.getElementsByClassName("yt-player");b=e}else{e=b.getElementsByTagName("*");var f={};for(c=d=0;b=e[c];c++){var g=b.className,h;if(h="function"==typeof g.split)h=0<=Ya(g.split(/\s+/),
"yt-player");h&&(f[d++]=b)}f.length=d;b=f}}b=cb(b);G(bb(a,b),kj)});
"undefined"!=typeof YTConfig&&YTConfig.parsetags&&"onload"!=YTConfig.parsetags||Of();var lj=B.onYTReady;lj&&lj();var mj=B.onYouTubeIframeAPIReady;mj&&mj();var nj=B.onYouTubePlayerAPIReady;nj&&nj();}).call(this);
