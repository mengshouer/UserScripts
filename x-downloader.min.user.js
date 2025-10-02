// ==UserScript==
// @name         X(Twitter) Downloader
// @name:zh-CN   X（Twitter）下载器
// @author       mengshouer
// @version      1.0.1
// @description  For X(Twitter) add download buttons for images and videos.
// @description:zh-CN  为 X(Twitter) 的图片和视频添加下载按钮。
// @include      *://twitter.com/*
// @include      *://*.twitter.com/*
// @include      *://x.com/*
// @include      *://*.x.com/*
// @license      GPL-3.0 License
// @namespace    https://github.com/mengshouer/UserScripts
// ==/UserScript==

(function(){"use strict";var te,y,Me,R,He,ze,Oe,Ve,me,ve,we,q={},je=[],Gt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,oe=Array.isArray;function L(t,e){for(var o in e)t[o]=e[o];return t}function ye(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function be(t,e,o){var n,i,r,s={};for(r in e)r=="key"?n=e[r]:r=="ref"?i=e[r]:s[r]=e[r];if(arguments.length>2&&(s.children=arguments.length>3?te.call(arguments,2):o),typeof t=="function"&&t.defaultProps!=null)for(r in t.defaultProps)s[r]===void 0&&(s[r]=t.defaultProps[r]);return ne(t,s,n,i,null)}function ne(t,e,o,n,i){var r={type:t,props:e,key:o,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Me,__i:-1,__u:0};return i==null&&y.vnode!=null&&y.vnode(r),r}function G(t){return t.children}function re(t,e){this.props=t,this.context=e}function M(t,e){if(e==null)return t.__?M(t.__,t.__i+1):null;for(var o;e<t.__k.length;e++)if((o=t.__k[e])!=null&&o.__e!=null)return o.__e;return typeof t.type=="function"?M(t):null}function We(t){var e,o;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((o=t.__k[e])!=null&&o.__e!=null){t.__e=t.__c.base=o.__e;break}return We(t)}}function qe(t){(!t.__d&&(t.__d=!0)&&R.push(t)&&!ie.__r++||He!=y.debounceRendering)&&((He=y.debounceRendering)||ze)(ie)}function ie(){for(var t,e,o,n,i,r,s,l=1;R.length;)R.length>l&&R.sort(Oe),t=R.shift(),l=R.length,t.__d&&(o=void 0,n=void 0,i=(n=(e=t).__v).__e,r=[],s=[],e.__P&&((o=L({},n)).__v=n.__v+1,y.vnode&&y.vnode(o),xe(e.__P,o,n,e.__n,e.__P.namespaceURI,32&n.__u?[i]:null,r,i??M(n),!!(32&n.__u),s),o.__v=n.__v,o.__.__k[o.__i]=o,Ze(r,o,s),n.__e=n.__=null,o.__e!=i&&We(o)));ie.__r=0}function Ge(t,e,o,n,i,r,s,l,d,c,u){var a,f,p,h,S,b,w,g=n&&n.__k||je,C=e.length;for(d=Yt(o,e,g,d,C),a=0;a<C;a++)(p=o.__k[a])!=null&&(f=p.__i==-1?q:g[p.__i]||q,p.__i=a,b=xe(t,p,f,i,r,s,l,d,c,u),h=p.__e,p.ref&&f.ref!=p.ref&&(f.ref&&ke(f.ref,null,p),u.push(p.ref,p.__c||h,p)),S==null&&h!=null&&(S=h),(w=!!(4&p.__u))||f.__k===p.__k?d=Ye(p,d,t,w):typeof p.type=="function"&&b!==void 0?d=b:h&&(d=h.nextSibling),p.__u&=-7);return o.__e=S,d}function Yt(t,e,o,n,i){var r,s,l,d,c,u=o.length,a=u,f=0;for(t.__k=new Array(i),r=0;r<i;r++)(s=e[r])!=null&&typeof s!="boolean"&&typeof s!="function"?(d=r+f,(s=t.__k[r]=typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?ne(null,s,null,null,null):oe(s)?ne(G,{children:s},null,null,null):s.constructor==null&&s.__b>0?ne(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):s).__=t,s.__b=t.__b+1,l=null,(c=s.__i=Kt(s,o,d,a))!=-1&&(a--,(l=o[c])&&(l.__u|=2)),l==null||l.__v==null?(c==-1&&(i>u?f--:i<u&&f++),typeof s.type!="function"&&(s.__u|=4)):c!=d&&(c==d-1?f--:c==d+1?f++:(c>d?f--:f++,s.__u|=4))):t.__k[r]=null;if(a)for(r=0;r<u;r++)(l=o[r])!=null&&(2&l.__u)==0&&(l.__e==n&&(n=M(l)),Xe(l,l));return n}function Ye(t,e,o,n){var i,r;if(typeof t.type=="function"){for(i=t.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=t,e=Ye(i[r],e,o,n));return e}t.__e!=e&&(n&&(e&&t.type&&!e.parentNode&&(e=M(t)),o.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function Kt(t,e,o,n){var i,r,s,l=t.key,d=t.type,c=e[o],u=c!=null&&(2&c.__u)==0;if(c===null&&t.key==null||u&&l==c.key&&d==c.type)return o;if(n>(u?1:0)){for(i=o-1,r=o+1;i>=0||r<e.length;)if((c=e[s=i>=0?i--:r++])!=null&&(2&c.__u)==0&&l==c.key&&d==c.type)return s}return-1}function Ke(t,e,o){e[0]=="-"?t.setProperty(e,o??""):t[e]=o==null?"":typeof o!="number"||Gt.test(e)?o:o+"px"}function se(t,e,o,n,i){var r,s;e:if(e=="style")if(typeof o=="string")t.style.cssText=o;else{if(typeof n=="string"&&(t.style.cssText=n=""),n)for(e in n)o&&e in o||Ke(t.style,e,"");if(o)for(e in o)n&&o[e]==n[e]||Ke(t.style,e,o[e])}else if(e[0]=="o"&&e[1]=="n")r=e!=(e=e.replace(Ve,"$1")),s=e.toLowerCase(),e=s in t||e=="onFocusOut"||e=="onFocusIn"?s.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+r]=o,o?n?o.u=n.u:(o.u=me,t.addEventListener(e,r?we:ve,r)):t.removeEventListener(e,r?we:ve,r);else{if(i=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=o??"";break e}catch{}typeof o=="function"||(o==null||o===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&o==1?"":o))}}function Je(t){return function(e){if(this.l){var o=this.l[e.type+t];if(e.t==null)e.t=me++;else if(e.t<o.u)return;return o(y.event?y.event(e):e)}}}function xe(t,e,o,n,i,r,s,l,d,c){var u,a,f,p,h,S,b,w,g,C,I,F,X,qt,ge,ee,Fe,D=e.type;if(e.constructor!=null)return null;128&o.__u&&(d=!!(32&o.__u),r=[l=e.__e=o.__e]),(u=y.__b)&&u(e);e:if(typeof D=="function")try{if(w=e.props,g="prototype"in D&&D.prototype.render,C=(u=D.contextType)&&n[u.__c],I=u?C?C.props.value:u.__:n,o.__c?b=(a=e.__c=o.__c).__=a.__E:(g?e.__c=a=new D(w,I):(e.__c=a=new re(w,I),a.constructor=D,a.render=Zt),C&&C.sub(a),a.props=w,a.state||(a.state={}),a.context=I,a.__n=n,f=a.__d=!0,a.__h=[],a._sb=[]),g&&a.__s==null&&(a.__s=a.state),g&&D.getDerivedStateFromProps!=null&&(a.__s==a.state&&(a.__s=L({},a.__s)),L(a.__s,D.getDerivedStateFromProps(w,a.__s))),p=a.props,h=a.state,a.__v=e,f)g&&D.getDerivedStateFromProps==null&&a.componentWillMount!=null&&a.componentWillMount(),g&&a.componentDidMount!=null&&a.__h.push(a.componentDidMount);else{if(g&&D.getDerivedStateFromProps==null&&w!==p&&a.componentWillReceiveProps!=null&&a.componentWillReceiveProps(w,I),!a.__e&&a.shouldComponentUpdate!=null&&a.shouldComponentUpdate(w,a.__s,I)===!1||e.__v==o.__v){for(e.__v!=o.__v&&(a.props=w,a.state=a.__s,a.__d=!1),e.__e=o.__e,e.__k=o.__k,e.__k.some(function(W){W&&(W.__=e)}),F=0;F<a._sb.length;F++)a.__h.push(a._sb[F]);a._sb=[],a.__h.length&&s.push(a);break e}a.componentWillUpdate!=null&&a.componentWillUpdate(w,a.__s,I),g&&a.componentDidUpdate!=null&&a.__h.push(function(){a.componentDidUpdate(p,h,S)})}if(a.context=I,a.props=w,a.__P=t,a.__e=!1,X=y.__r,qt=0,g){for(a.state=a.__s,a.__d=!1,X&&X(e),u=a.render(a.props,a.state,a.context),ge=0;ge<a._sb.length;ge++)a.__h.push(a._sb[ge]);a._sb=[]}else do a.__d=!1,X&&X(e),u=a.render(a.props,a.state,a.context),a.state=a.__s;while(a.__d&&++qt<25);a.state=a.__s,a.getChildContext!=null&&(n=L(L({},n),a.getChildContext())),g&&!f&&a.getSnapshotBeforeUpdate!=null&&(S=a.getSnapshotBeforeUpdate(p,h)),ee=u,u!=null&&u.type===G&&u.key==null&&(ee=Qe(u.props.children)),l=Ge(t,oe(ee)?ee:[ee],e,o,n,i,r,s,l,d,c),a.base=e.__e,e.__u&=-161,a.__h.length&&s.push(a),b&&(a.__E=a.__=null)}catch(W){if(e.__v=null,d||r!=null)if(W.then){for(e.__u|=d?160:128;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;r[r.indexOf(l)]=null,e.__e=l}else{for(Fe=r.length;Fe--;)ye(r[Fe]);Se(e)}else e.__e=o.__e,e.__k=o.__k,W.then||Se(e);y.__e(W,e,o)}else r==null&&e.__v==o.__v?(e.__k=o.__k,e.__e=o.__e):l=e.__e=Jt(o.__e,e,o,n,i,r,s,d,c);return(u=y.diffed)&&u(e),128&e.__u?void 0:l}function Se(t){t&&t.__c&&(t.__c.__e=!0),t&&t.__k&&t.__k.forEach(Se)}function Ze(t,e,o){for(var n=0;n<o.length;n++)ke(o[n],o[++n],o[++n]);y.__c&&y.__c(e,t),t.some(function(i){try{t=i.__h,i.__h=[],t.some(function(r){r.call(i)})}catch(r){y.__e(r,i.__v)}})}function Qe(t){return typeof t!="object"||t==null||t.__b&&t.__b>0?t:oe(t)?t.map(Qe):L({},t)}function Jt(t,e,o,n,i,r,s,l,d){var c,u,a,f,p,h,S,b=o.props,w=e.props,g=e.type;if(g=="svg"?i="http://www.w3.org/2000/svg":g=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(c=0;c<r.length;c++)if((p=r[c])&&"setAttribute"in p==!!g&&(g?p.localName==g:p.nodeType==3)){t=p,r[c]=null;break}}if(t==null){if(g==null)return document.createTextNode(w);t=document.createElementNS(i,g,w.is&&w),l&&(y.__m&&y.__m(e,r),l=!1),r=null}if(g==null)b===w||l&&t.data==w||(t.data=w);else{if(r=r&&te.call(t.childNodes),b=o.props||q,!l&&r!=null)for(b={},c=0;c<t.attributes.length;c++)b[(p=t.attributes[c]).name]=p.value;for(c in b)if(p=b[c],c!="children"){if(c=="dangerouslySetInnerHTML")a=p;else if(!(c in w)){if(c=="value"&&"defaultValue"in w||c=="checked"&&"defaultChecked"in w)continue;se(t,c,null,p,i)}}for(c in w)p=w[c],c=="children"?f=p:c=="dangerouslySetInnerHTML"?u=p:c=="value"?h=p:c=="checked"?S=p:l&&typeof p!="function"||b[c]===p||se(t,c,p,b[c],i);if(u)l||a&&(u.__html==a.__html||u.__html==t.innerHTML)||(t.innerHTML=u.__html),e.__k=[];else if(a&&(t.innerHTML=""),Ge(e.type=="template"?t.content:t,oe(f)?f:[f],e,o,n,g=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,s,r?r[0]:o.__k&&M(o,0),l,d),r!=null)for(c=r.length;c--;)ye(r[c]);l||(c="value",g=="progress"&&h==null?t.removeAttribute("value"):h!=null&&(h!==t[c]||g=="progress"&&!h||g=="option"&&h!=b[c])&&se(t,c,h,b[c],i),c="checked",S!=null&&S!=t[c]&&se(t,c,S,b[c],i))}return t}function ke(t,e,o){try{if(typeof t=="function"){var n=typeof t.__u=="function";n&&t.__u(),n&&e==null||(t.__u=t(e))}else t.current=e}catch(i){y.__e(i,o)}}function Xe(t,e,o){var n,i;if(y.unmount&&y.unmount(t),(n=t.ref)&&(n.current&&n.current!=t.__e||ke(n,null,e)),(n=t.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(r){y.__e(r,e)}n.base=n.__P=null}if(n=t.__k)for(i=0;i<n.length;i++)n[i]&&Xe(n[i],e,o||typeof t.type!="function");o||ye(t.__e),t.__c=t.__=t.__e=void 0}function Zt(t,e,o){return this.constructor(t,o)}function Y(t,e,o){var n,i,r,s;e==document&&(e=document.documentElement),y.__&&y.__(t,e),i=(n=!1)?null:e.__k,r=[],s=[],xe(e,t=e.__k=be(G,null,[t]),i||q,q,e.namespaceURI,i?null:e.firstChild?te.call(e.childNodes):null,r,i?i.__e:e.firstChild,n,s),Ze(r,t,s)}te=je.slice,y={__e:function(t,e,o,n){for(var i,r,s;e=e.__;)if((i=e.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(t)),s=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(t,n||{}),s=i.__d),s)return i.__E=i}catch(l){t=l}throw t}},Me=0,re.prototype.setState=function(t,e){var o;o=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=L({},this.state),typeof t=="function"&&(t=t(L({},o),this.props)),t&&L(o,t),t!=null&&this.__v&&(e&&this._sb.push(e),qe(this))},re.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),qe(this))},re.prototype.render=G,R=[],ze=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Oe=function(t,e){return t.__v.__b-e.__v.__b},ie.__r=0,Ve=/(PointerCapture)$|Capture$/i,me=0,ve=Je(!1),we=Je(!0);var Qt=0;function _(t,e,o,n,i,r){e||(e={});var s,l,d=e;if("ref"in d)for(l in d={},e)l=="ref"?s=e[l]:d[l]=e[l];var c={type:t,props:d,key:o,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Qt,__i:-1,__u:0,__source:i,__self:r};if(typeof t=="function"&&(s=t.defaultProps))for(l in s)d[l]===void 0&&(d[l]=s[l]);return y.vnode&&y.vnode(c),c}var K,x,Te,et,ae=0,tt=[],k=y,ot=k.__b,nt=k.__r,rt=k.diffed,it=k.__c,st=k.unmount,at=k.__;function Ae(t,e){k.__h&&k.__h(x,t,ae||e),ae=0;var o=x.__H||(x.__H={__:[],__h:[]});return t>=o.__.length&&o.__.push({}),o.__[t]}function $(t){return ae=1,Xt(dt,t)}function Xt(t,e,o){var n=Ae(K++,2);if(n.t=t,!n.__c&&(n.__=[dt(void 0,e),function(l){var d=n.__N?n.__N[0]:n.__[0],c=n.t(d,l);d!==c&&(n.__N=[c,n.__[1]],n.__c.setState({}))}],n.__c=x,!x.__f)){var i=function(l,d,c){if(!n.__c.__H)return!0;var u=n.__c.__H.__.filter(function(f){return!!f.__c});if(u.every(function(f){return!f.__N}))return!r||r.call(this,l,d,c);var a=n.__c.props!==l;return u.forEach(function(f){if(f.__N){var p=f.__[0];f.__=f.__N,f.__N=void 0,p!==f.__[0]&&(a=!0)}}),r&&r.call(this,l,d,c)||a};x.__f=!0;var r=x.shouldComponentUpdate,s=x.componentWillUpdate;x.componentWillUpdate=function(l,d,c){if(this.__e){var u=r;r=void 0,i(l,d,c),r=u}s&&s.call(this,l,d,c)},x.shouldComponentUpdate=i}return n.__N||n.__}function H(t,e){var o=Ae(K++,3);!k.__s&&ct(o.__H,e)&&(o.__=t,o.u=e,x.__H.__h.push(o))}function Ce(t){return ae=5,eo(function(){return{current:t}},[])}function eo(t,e){var o=Ae(K++,7);return ct(o.__H,e)&&(o.__=t(),o.__H=e,o.__h=t),o.__}function to(){for(var t;t=tt.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(le),t.__H.__h.forEach(Ee),t.__H.__h=[]}catch(e){t.__H.__h=[],k.__e(e,t.__v)}}k.__b=function(t){x=null,ot&&ot(t)},k.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),at&&at(t,e)},k.__r=function(t){nt&&nt(t),K=0;var e=(x=t.__c).__H;e&&(Te===x?(e.__h=[],x.__h=[],e.__.forEach(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})):(e.__h.forEach(le),e.__h.forEach(Ee),e.__h=[],K=0)),Te=x},k.diffed=function(t){rt&&rt(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(tt.push(e)!==1&&et===k.requestAnimationFrame||((et=k.requestAnimationFrame)||oo)(to)),e.__H.__.forEach(function(o){o.u&&(o.__H=o.u),o.u=void 0})),Te=x=null},k.__c=function(t,e){e.some(function(o){try{o.__h.forEach(le),o.__h=o.__h.filter(function(n){return!n.__||Ee(n)})}catch(n){e.some(function(i){i.__h&&(i.__h=[])}),e=[],k.__e(n,o.__v)}}),it&&it(t,e)},k.unmount=function(t){st&&st(t);var e,o=t.__c;o&&o.__H&&(o.__H.__.forEach(function(n){try{le(n)}catch(i){e=i}}),o.__H=void 0,e&&k.__e(e,o.__v))};var lt=typeof requestAnimationFrame=="function";function oo(t){var e,o=function(){clearTimeout(n),lt&&cancelAnimationFrame(e),setTimeout(t)},n=setTimeout(o,35);lt&&(e=requestAnimationFrame(o))}function le(t){var e=x,o=t.__c;typeof o=="function"&&(t.__c=void 0,o()),x=e}function Ee(t){var e=x;t.__c=t.__(),x=e}function ct(t,e){return!t||t.length!==e.length||e.some(function(o,n){return o!==t[n]})}function dt(t,e){return typeof e=="function"?e(t):e}let no={data:""},ro=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||no,io=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,so=/\/\*[^]*?\*\/|  +/g,ut=/\n+/g,P=(t,e)=>{let o="",n="",i="";for(let r in t){let s=t[r];r[0]=="@"?r[1]=="i"?o=r+" "+s+";":n+=r[1]=="f"?P(s,r):r+"{"+P(s,r[1]=="k"?"":e)+"}":typeof s=="object"?n+=P(s,e?e.replace(/([^,])+/g,l=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,l):l?l+" "+d:d)):r):s!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=P.p?P.p(r,s):r+":"+s+";")}return o+(e&&i?e+"{"+i+"}":i)+n},N={},ft=t=>{if(typeof t=="object"){let e="";for(let o in t)e+=o+ft(t[o]);return e}return t},ao=(t,e,o,n,i)=>{let r=ft(t),s=N[r]||(N[r]=(d=>{let c=0,u=11;for(;c<d.length;)u=101*u+d.charCodeAt(c++)>>>0;return"go"+u})(r));if(!N[s]){let d=r!==t?t:(c=>{let u,a,f=[{}];for(;u=io.exec(c.replace(so,""));)u[4]?f.shift():u[3]?(a=u[3].replace(ut," ").trim(),f.unshift(f[0][a]=f[0][a]||{})):f[0][u[1]]=u[2].replace(ut," ").trim();return f[0]})(t);N[s]=P(i?{["@keyframes "+s]:d}:d,o?"":"."+s)}let l=o&&N.g?N.g:null;return o&&(N.g=N[s]),((d,c,u,a)=>{a?c.data=c.data.replace(a,d):c.data.indexOf(d)===-1&&(c.data=u?d+c.data:c.data+d)})(N[s],e,n,l),s},lo=(t,e,o)=>t.reduce((n,i,r)=>{let s=e[r];if(s&&s.call){let l=s(o),d=l&&l.props&&l.props.className||/^go/.test(l)&&l;s=d?"."+d:l&&typeof l=="object"?l.props?"":P(l,""):l===!1?"":l}return n+i+(s??"")},"");function Ie(t){let e=this||{},o=t.call?t(e.p):t;return ao(o.unshift?o.raw?lo(o,[].slice.call(arguments,1),e.p):o.reduce((n,i)=>Object.assign(n,i&&i.call?i(e.p):i),{}):o,ro(e.target),e.g,e.o,e.k)}let _t,De,Le;Ie.bind({g:1});let co=Ie.bind({k:1});function uo(t,e,o,n){P.p=e,_t=t,De=o,Le=n}function T(t,e){let o=this||{};return function(){let n=arguments;function i(r,s){let l=Object.assign({},r),d=l.className||i.className;o.p=Object.assign({theme:De&&De()},l),o.o=/ *go\d+/.test(d),l.className=Ie.apply(o,n)+(d?" "+d:"");let c=t;return t[0]&&(c=l.as||t,delete l.as),Le&&c[0]&&Le(l),_t(c,l)}return i}}uo(be);const fo=T("button")`
  position: fixed;
  left: var(--left-position);
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-color: #1da1f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10000;
  color: white;
  transition:
    left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.2s ease,
    transform 0.2s ease;
  opacity: 0.9;
  border: none;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`,_o=T("svg")`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;function po({onClick:t,isSettingsPanelOpen:e}){const[o,n]=$(!1);return H(()=>{const r=s=>{const l=s.clientX<100&&s.clientY>window.innerHeight*.6666666666666666;n(l)};return document.addEventListener("mousemove",r),()=>document.removeEventListener("mousemove",r)},[]),_(fo,{style:{"--left-position":o||e?"10px":"-40px"},onClick:t,children:_(_o,{viewBox:"0 0 24 24",children:_("path",{d:"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})})})}class ho{constructor(e,o){this.storageKey=e,this.defaultSettings=o}loadSettings(){try{const e=localStorage.getItem(this.storageKey);if(e){const o=JSON.parse(e);return{...this.defaultSettings,...o}}}catch{}return{...this.defaultSettings}}saveSettings(e){const n={...this.loadSettings(),...e};try{localStorage.setItem(this.storageKey,JSON.stringify(n))}catch{}return n}resetSettings(){try{localStorage.removeItem(this.storageKey)}catch{}return{...this.defaultSettings}}}function go(t){t.stopPropagation(),t.preventDefault()}async function pt(t,e){try{const o=await fetch(t);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const n=await o.blob(),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}catch(o){throw o}}function mo(t){const e=t.split("?")[0]?.split("/").pop()||"",o=t.includes("format=png")?"png":"jpg";return{picname:e,ext:o}}function ht(t,e){let o=t;for(const[n,i]of Object.entries(e))o=o.replace(new RegExp(`<%${n}>`,"g"),i||"");return o}function ce(t){const e=/https:\/\/(twitter|x)\.com\//,o=t.replace(e,"").split("/");return{userid:o[0]||"unknown",tid:o[2]||"unknown",picno:o[4]||"1"}}const vo=T("div")`
  position: relative;
  min-width: 250px;
  max-width: 400px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  color: #fff;

  &.message-success {
    --msg-color: 34, 197, 94;
  }

  &.message-error {
    --msg-color: 239, 68, 68;
  }

  &.message-warning {
    --msg-color: 245, 158, 11;
  }

  &.message-info {
    --msg-color: 59, 130, 246;
  }

  &[class*="message-"] {
    background-color: rgba(var(--msg-color), 0.4);
    border: 1px solid rgba(var(--msg-color), 0.7);
  }
`,wo=T("span")`
  float: right;
  margin-left: 8px;
  font-weight: bold;
  opacity: 0.7;
  font-size: 16px;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;function yo({type:t="info",content:e,duration:o=3e3,onClose:n,className:i,style:r}){const s=Ce(null),l=Ce(0),d=Ce(o),c=()=>{s.current&&(clearTimeout(s.current),s.current=null)},u=p=>{c(),p>0&&(l.current=Date.now(),s.current=window.setTimeout(()=>{n?.()},p))},a=()=>{if(s.current){const p=Date.now()-l.current;d.current=Math.max(0,d.current-p),c()}},f=()=>{d.current>0&&u(d.current)};return H(()=>(o>0&&(d.current=o,u(o)),c),[o,n]),_(vo,{className:`message-${t} ${i||""}`,style:r,onClick:n,onMouseEnter:a,onMouseLeave:f,children:[e,_(wo,{children:"×"})]})}const bo=()=>{try{return JSON.parse(localStorage.getItem("x-downloader-settings")||"{}").messagePlacement||"top"}catch{return"top"}},J=new Map;let xo=0;const So=t=>{const[e,o]=t.split("-");let r=`${e}: 20px; display: flex; flex-direction: ${e==="bottom"?"column-reverse":"column"};`;return o?r+=` ${o}: 20px;`:r+=" left: 50%; transform: translateX(-50%);",r},ko=(t="top")=>{if(!J.has(t)){const e=document.createElement("div");e.id=`userscript-message-container-${t}`,e.style.cssText=`
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      ${So(t)}
    `,document.body.appendChild(e),J.set(t,e)}return J.get(t)},To=t=>{const e=t.placement||"top",o=ko(e),n=`userscript-message-${++xo}`,i=document.createElement("div");i.id=n;const r=e.startsWith("bottom");i.style.cssText=`
    position: relative;
    margin-bottom: 8px;
    pointer-events: auto;
    animation: ${r?"messageSlideInBottom":"messageSlideIn"} 0.3s ease-out;
  `,o.appendChild(i);const s=()=>{if(i.parentNode){const l=e.startsWith("bottom");i.style.animation=`${l?"messageSlideOutBottom":"messageSlideOut"} 0.3s ease-in forwards`,setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},300)}};return Y(be(yo,{...t,onClose:s}),i),s},de=t=>(e,o,n)=>To({type:t,content:e,placement:n||bo(),...o!==void 0&&{duration:o}}),Ao=de("success"),Co=de("error"),Eo=de("warning"),Io=de("info"),E={success:Ao,error:Co,warning:Eo,info:Io,destroy:()=>{J.forEach(t=>{t.parentNode&&t.parentNode.removeChild(t)}),J.clear()}},gt=document.createElement("style");gt.textContent=`
  @keyframes messageSlideIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes messageSlideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes messageSlideInBottom {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes messageSlideOutBottom {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`,document.head.appendChild(gt);function Do(t){return{textColor:t?"#e1e8ed":"#333",backgroundColor:t?"#1e1e1e":"white",borderColor:t?"#38444d":"#ddd",secondaryTextColor:t?"#8b98a5":"#666",inputBackground:t?"#253341":"white",inputBorder:t?"#38444d":"#ddd",panelBackground:t?"#1e1e1e":"white"}}function B(){const[t,e]=$(()=>window.matchMedia?.("(prefers-color-scheme: dark)").matches||!1);return H(()=>{const o=window.matchMedia("(prefers-color-scheme: dark)"),n=i=>e(i.matches);if(o.addEventListener)return o.addEventListener("change",n),()=>o.removeEventListener("change",n);if(o.addListener)return o.addListener(n),()=>o.removeListener?.(n)},[]),{theme:Do(t),isDark:t}}const mt="en",vt="userscript-locale";let z=mt;const ue={},fe=[],wt=()=>navigator?.language?.toLowerCase().startsWith("zh")?"zh":"en";try{z=localStorage.getItem(vt)||wt()}catch{z=wt()}const yt=(t,e)=>{let o=t;for(const n of e.split("."))if(o=o?.[n],!o)return;return typeof o=="string"?o:void 0},Lo=(t,e)=>e?t.replace(/\{(\w+)\}/g,(o,n)=>e[n]??"{"+n+"}"):t;function $o(t,e){const o=typeof t=="string"?t:t.key,n=typeof t=="string"?e:t.params,i=yt(ue[z],o)||yt(ue[mt],o)||o;return Lo(i,n)}const m={addTranslations(t,e){ue[t]=Object.assign(ue[t]||{},e)},setLocale(t){if(z!==t){z=t;try{localStorage.setItem(vt,t)}catch{}fe.forEach(e=>e())}},getLocale(){return z},t:$o,subscribe(t){return fe.push(t),()=>{const e=fe.indexOf(t);e>-1&&fe.splice(e,1)}}};function $e(){const[t,e]=$(m.getLocale());H(()=>m.subscribe(()=>{e(m.getLocale())}),[]);const o=n=>m.setLocale(n);return{t:m.t,locale:t,setLocale:o}}const No=T("button")`
  /* Base styles */
  border-radius: 6px;
  font-weight: 500;
  outline: none;
  border: none;
  cursor: var(--cursor);
  opacity: var(--opacity);

  /* Size variants */
  padding: var(--padding);
  font-size: var(--font-size);

  /* Color variants */
  background: var(--bg);
  color: var(--color);
  border: var(--border);
`,Bo={primary:{"--bg":"#1da1f2","--color":"white","--border":"none"},secondary:t=>({"--bg":t.inputBackground,"--color":t.textColor,"--border":`1px solid ${t.borderColor}`}),danger:{"--bg":"#dc3545","--color":"white","--border":"none"}},Po={small:{"--padding":"6px 12px","--font-size":"12px"},medium:{"--padding":"8px 16px","--font-size":"14px"},large:{"--padding":"12px 24px","--font-size":"16px"}};function Ro({children:t,onClick:e,disabled:o=!1,variant:n="primary",size:i="medium",className:r="",style:s={},type:l="button"}){const{theme:d}=B(),u={...(()=>{const a=Bo[n];return typeof a=="function"?a(d):a})(),...Po[i],"--cursor":o?"not-allowed":"pointer","--opacity":o?"0.6":"1",...s};return _(No,{className:r,style:u,onClick:e,disabled:o,type:l,children:t})}const Uo=T("label")`
  display: flex;
  align-items: center;
  cursor: var(--cursor);
  color: var(--text-color);
  opacity: var(--opacity);
`,Fo=T("input")`
  margin-right: 8px;
  accent-color: #1da1f2;
  cursor: var(--cursor);
`;function _e({checked:t,defaultChecked:e,disabled:o=!1,onChange:n,children:i,className:r="",style:s={}}){const{theme:l}=B(),d={"--cursor":o?"not-allowed":"pointer","--text-color":l.textColor,"--opacity":o?"0.6":"1",...s};return _(Uo,{className:r,style:d,children:[_(Fo,{type:"checkbox",checked:t,defaultChecked:e,disabled:o,onChange:c=>n?.(c.currentTarget.checked),style:{"--cursor":o?"not-allowed":"pointer"}}),i]})}const Mo=T("input")`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--input-border);
  background: var(--input-bg);
  color: var(--input-text);
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #1da1f2;
  }
`;function bt({type:t="text",value:e,defaultValue:o,placeholder:n,disabled:i=!1,onChange:r,onBlur:s,onFocus:l,className:d="",style:c={}}){const{theme:u}=B(),a={"--input-border":u.inputBorder,"--input-bg":u.inputBackground,"--input-text":u.textColor,...c};return _(Mo,{type:t,value:e,defaultValue:o,placeholder:n,disabled:i,className:d,style:a,onChange:f=>r?.(f.currentTarget.value),onBlur:s,onFocus:l})}function xt({value:t,options:e,onChange:o,placeholder:n,className:i,style:r}){const{theme:s}=B(),l={padding:"6px 8px",borderRadius:"4px",border:`1px solid ${s.borderColor}`,backgroundColor:s.backgroundColor,color:s.textColor,fontSize:"14px",cursor:"pointer",outline:"none",...r};return _("select",{value:t,onChange:c=>{const u=c.target;o(u.value)},className:i,style:l,children:[n&&_("option",{value:"",disabled:!0,children:n}),e.map(c=>_("option",{value:c.value,children:c.label},c.value))]})}function Ho({className:t,style:e}){const{theme:o}=B(),{t:n,locale:i,setLocale:r}=$e(),s=[{value:"zh",label:"中文"},{value:"en",label:"English"}];return _("div",{className:t,style:{display:"flex",alignItems:"center",gap:"8px",...e},children:[_("label",{style:{fontSize:"14px",fontWeight:500,color:o.textColor,marginBottom:"0"},children:[n("common.language"),":"]}),_(xt,{value:i,options:s,onChange:l=>r(l)})]})}function zo({value:t,onChange:e,className:o,style:n}){const{theme:i}=B(),{t:r}=$e(),s=[{value:"top",label:r("common.messagePlacement.top")},{value:"bottom",label:r("common.messagePlacement.bottom")},{value:"top-left",label:r("common.messagePlacement.topLeft")},{value:"top-right",label:r("common.messagePlacement.topRight")},{value:"bottom-left",label:r("common.messagePlacement.bottomLeft")},{value:"bottom-right",label:r("common.messagePlacement.bottomRight")}],l=d=>{e(d)};return _("div",{className:o,style:{display:"flex",alignItems:"center",gap:"8px",...n},children:[_("label",{style:{fontSize:"14px",fontWeight:500,color:i.textColor,marginBottom:"0"},children:[r("common.messagePlacement.label"),":"]}),_(xt,{value:t,options:s,onChange:l})]})}const Oo=T("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
`,Vo=T("div")`
  background: var(--modal-bg);
  color: var(--modal-text);
  border-radius: 12px;
  padding: 24px;
  min-width: 480px;
  width: auto;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  @media (max-width: 640px) {
    min-width: auto;
    width: 90vw;
  }
`;function jo({isOpen:t,onClose:e,title:o,children:n,className:i="",style:r={}}){const{theme:s}=B();if(H(()=>{if(!t)return;const a=f=>{f.key==="Escape"&&e()};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[t,e]),!t)return null;const l={"--modal-bg":s.panelBackground,"--modal-text":s.textColor,...r},d={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:o?"20px":"0"},c={margin:0,color:s.textColor,fontSize:"20px",fontWeight:600},u={background:"none",border:"none",fontSize:"24px",cursor:"pointer",color:s.secondaryTextColor,padding:0,width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px",transition:"background-color 0.2s ease"};return _(Oo,{onClick:e,children:_(Vo,{className:i,style:l,onClick:a=>a.stopPropagation(),children:[_("div",{style:d,children:[o&&_("h2",{style:c,children:o}),_("button",{style:u,onClick:e,onMouseEnter:a=>{const f=a.target;f.style.backgroundColor=s.borderColor},onMouseLeave:a=>{const f=a.target;f.style.backgroundColor="transparent"},children:"×"})]}),_("div",{children:n})]})})}const Wo=T("div")`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }
`,qo=T("div")`
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-header-bg);
  border-radius: 12px 12px 0 0;
`,Go=T("h3")`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
`,Yo=T("div")`
  padding: 20px;
`;function Ne({title:t,children:e,className:o="",style:n={}}){const{theme:i,isDark:r}=B(),s={"--card-bg":i.panelBackground,"--card-border":i.borderColor,"--card-header-bg":r?"rgba(255, 255, 255, 0.02)":"rgba(0, 0, 0, 0.01)","--card-title-color":i.textColor,...n};return _(Wo,{className:o,style:s,children:[t&&_(qo,{children:_(Go,{children:t})}),_(Yo,{children:e})]})}var Ko=Symbol.for("preact-signals");function Be(){if(O>1)O--;else{for(var t,e=!1;Z!==void 0;){var o=Z;for(Z=void 0,Pe++;o!==void 0;){var n=o.o;if(o.o=void 0,o.f&=-3,!(8&o.f)&&Tt(o))try{o.c()}catch(i){e||(t=i,e=!0)}o=n}}if(Pe=0,O--,e)throw t}}var v=void 0;function St(t){var e=v;v=void 0;try{return t()}finally{v=e}}var Z=void 0,O=0,Pe=0,pe=0;function kt(t){if(v!==void 0){var e=t.n;if(e===void 0||e.t!==v)return e={i:0,S:t,p:v.s,n:void 0,t:v,e:void 0,x:void 0,r:e},v.s!==void 0&&(v.s.n=e),v.s=e,t.n=e,32&v.f&&t.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=v.s,e.n=void 0,v.s.n=e,v.s=e),e}}function A(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e?.watched,this.Z=e?.unwatched,this.name=e?.name}A.prototype.brand=Ko,A.prototype.h=function(){return!0},A.prototype.S=function(t){var e=this,o=this.t;o!==t&&t.e===void 0&&(t.x=o,this.t=t,o!==void 0?o.e=t:St(function(){var n;(n=e.W)==null||n.call(e)}))},A.prototype.U=function(t){var e=this;if(this.t!==void 0){var o=t.e,n=t.x;o!==void 0&&(o.x=n,t.e=void 0),n!==void 0&&(n.e=o,t.x=void 0),t===this.t&&(this.t=n,n===void 0&&St(function(){var i;(i=e.Z)==null||i.call(e)}))}},A.prototype.subscribe=function(t){var e=this;return Xo(function(){var o=e.value,n=v;v=void 0;try{t(o)}finally{v=n}},{name:"sub"})},A.prototype.valueOf=function(){return this.value},A.prototype.toString=function(){return this.value+""},A.prototype.toJSON=function(){return this.value},A.prototype.peek=function(){var t=v;v=void 0;try{return this.value}finally{v=t}},Object.defineProperty(A.prototype,"value",{get:function(){var t=kt(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(Pe>100)throw new Error("Cycle detected");this.v=t,this.i++,pe++,O++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Be()}}}});function Jo(t,e){return new A(t,e)}function Tt(t){for(var e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function At(t){for(var e=t.s;e!==void 0;e=e.n){var o=e.S.n;if(o!==void 0&&(e.r=o),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Ct(t){for(var e=t.s,o=void 0;e!==void 0;){var n=e.p;e.i===-1?(e.S.U(e),n!==void 0&&(n.n=e.n),e.n!==void 0&&(e.n.p=n)):o=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=n}t.s=o}function U(t,e){A.call(this,void 0),this.x=t,this.s=void 0,this.g=pe-1,this.f=4,this.W=e?.watched,this.Z=e?.unwatched,this.name=e?.name}U.prototype=new A,U.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===pe))return!0;if(this.g=pe,this.f|=1,this.i>0&&!Tt(this))return this.f&=-2,!0;var t=v;try{At(this),v=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(o){this.v=o,this.f|=16,this.i++}return v=t,Ct(this),this.f&=-2,!0},U.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}A.prototype.S.call(this,t)},U.prototype.U=function(t){if(this.t!==void 0&&(A.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}},U.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(U.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=kt(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function Zo(t,e){return new U(t,e)}function Et(t){var e=t.u;if(t.u=void 0,typeof e=="function"){O++;var o=v;v=void 0;try{e()}catch(n){throw t.f&=-2,t.f|=8,Re(t),n}finally{v=o,Be()}}}function Re(t){for(var e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Et(t)}function Qo(t){if(v!==this)throw new Error("Out-of-order effect");Ct(this),v=t,this.f&=-2,8&this.f&&Re(this),Be()}function V(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e?.name}V.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},V.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Et(this),At(this),O++;var t=v;return v=this,Qo.bind(this,t)},V.prototype.N=function(){2&this.f||(this.f|=2,this.o=Z,Z=this)},V.prototype.d=function(){this.f|=8,1&this.f||Re(this)},V.prototype.dispose=function(){this.d()};function Xo(t,e){var o=new V(t,e);try{o.c()}catch(i){throw o.d(),i}var n=o.d.bind(o);return n[Symbol.dispose]=n,n}function en(t,e){const o=new ho(t,e),n=Jo(o.loadSettings()),i=Zo(()=>n.value),r=c=>{const u=o.saveSettings(c);n.value=u,window.dispatchEvent(new CustomEvent("x-downloader-settings-changed"))};return{get settings(){return i.value},updateSettings:r,resetSettings:()=>{const c=o.resetSettings();return n.value=c,window.dispatchEvent(new CustomEvent("x-downloader-settings-changed")),c},getSetting:c=>n.value[c],setSetting:(c,u)=>{r({[c]:u})},signal:n}}const tn=en("x-downloader-settings",{fileName:"<%Userid> <%Tid>_p<%PicNo>",showDownloadButton:!0,videoFileName:"<%Userid> <%Tid>",showVideoDownloadButton:!1,showUniversalDownloadButton:!0,autoLikeOnDownload:!1,messagePlacement:"top"});function he(){return tn}const on={common:{ok:"确定",cancel:"取消",close:"关闭",reset:"重置",save:"保存",loading:"加载中...",error:"错误",success:"成功",warning:"警告",info:"信息",language:"语言",messagePlacement:{label:"消息弹窗位置",top:"顶部居中",bottom:"底部居中",topLeft:"左上角",topRight:"右上角",bottomLeft:"左下角",bottomRight:"右下角"}},button:{download:"下载",settings:"设置"}},nn={common:{ok:"OK",cancel:"Cancel",close:"Close",reset:"Reset",save:"Save",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Info",language:"Language",messagePlacement:{label:"Message Placement",top:"Top Center",bottom:"Bottom Center",topLeft:"Top Left",topRight:"Top Right",bottomLeft:"Bottom Left",bottomRight:"Bottom Right"}},button:{download:"Download",settings:"Settings"}},rn={title:"X(Twitter) Downloader 设置",settings:{image:{title:"图片下载设置",fileName:"图片文件名格式",fileNamePlaceholder:"<%Userid> <%Tid>_p<%PicNo>",fileNameHelp:"可用变量：<%Userid>、<%Tid>、<%Time>、<%PicName>、<%PicNo>",showButton:"显示图片下载按钮"},video:{title:"视频下载设置",fileName:"视频文件名格式",fileNamePlaceholder:"<%Userid> <%Tid>_video_<%Time>",fileNameHelp:"可用变量：<%Userid>、<%Tid>、<%Time>",showButton:"显示视频下载按钮"},universal:{title:"通用下载设置",showButton:"显示通用下载按钮",showButtonHelp:"在推文操作栏中显示统一的下载按钮，自动检测媒体类型",autoLike:"下载时自动点赞",autoLikeHelp:"下载图片或视频时自动为推文点赞（UI不会自动更新）"},reset:"重置为默认设置"},messages:{downloadStart:"开始下载",downloadSuccess:"下载成功",downloadError:"下载失败",noMediaFound:"未找到媒体文件",settingsReset:"设置已重置",imagesDownloadSuccess:"成功下载 {count} 张图片",videoDownloadSuccess:"视频下载成功",cannotRecognizeTweet:"无法识别推文，请重试",videoLinkNotFound:"未找到视频下载链接",tweetAlreadyLiked:"推文已点赞",likeSuccess:"点赞成功",cannotGetAuthInfo:"无法获取认证信息",networkRequestFailed:"网络请求失败 ({status})",likeFailed:"点赞失败: {error}",likeResponseError:"点赞响应异常",downloadFailed:"下载失败",videoDownloadFailed:"视频下载失败",imageDownloadFailed:"图片下载失败"},ui:{downloading:"下载中...",downloadVideo:"下载视频",downloadImage:"下载原图",downloadImages:"下载 {count} 张图片",downloadVideos:"下载 {count} 个视频"}},sn={title:"X(Twitter) Downloader Settings",settings:{image:{title:"Image Download Settings",fileName:"Image filename format",fileNamePlaceholder:"<%Userid> <%Tid>_p<%PicNo>",fileNameHelp:"Available variables: <%Userid>, <%Tid>, <%Time>, <%PicName>, <%PicNo>",showButton:"Show image download button"},video:{title:"Video Download Settings",fileName:"Video filename format",fileNamePlaceholder:"<%Userid> <%Tid>_video_<%Time>",fileNameHelp:"Available variables: <%Userid>, <%Tid>, <%Time>",showButton:"Show video download button"},universal:{title:"Universal Download Settings",showButton:"Show universal download button",showButtonHelp:"Display unified download button in tweet actions, automatically detects media type",autoLike:"Auto-like on download",autoLikeHelp:"Automatically like the tweet when downloading images or videos (UI won't update automatically)"},reset:"Reset to default settings"},messages:{downloadStart:"Download started",downloadSuccess:"Download successful",downloadError:"Download failed",noMediaFound:"No media found",settingsReset:"Settings reset",imagesDownloadSuccess:"Successfully downloaded {count} images",videoDownloadSuccess:"Video download successful",cannotRecognizeTweet:"Cannot recognize tweet, please try again",videoLinkNotFound:"Video download link not found",tweetAlreadyLiked:"Tweet already liked",likeSuccess:"Like successful",cannotGetAuthInfo:"Cannot get authentication info",networkRequestFailed:"Network request failed ({status})",likeFailed:"Like failed: {error}",likeResponseError:"Like response error",downloadFailed:"Download failed",videoDownloadFailed:"Video download failed",imageDownloadFailed:"Image download failed"},ui:{downloading:"Downloading...",downloadVideo:"Download Video",downloadImage:"Download Image",downloadImages:"Download {count} Images",downloadVideos:"Download {count} Videos"}};m.addTranslations("zh",{...on,...rn}),m.addTranslations("en",{...nn,...sn});function an({isOpen:t,onClose:e}){const{settings:o,setSetting:n,resetSettings:i}=he(),{t:r}=$e(),{theme:s,isDark:l}=B(),[d,c]=$(0),u={display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"16px",padding:"16px",marginBottom:"20px",background:l?"rgba(255, 255, 255, 0.02)":"rgba(0, 0, 0, 0.01)",border:`1px solid ${s.borderColor}`,borderRadius:"8px"},a={marginBottom:"20px"},f={display:"block",marginBottom:"8px",fontWeight:500,fontSize:"14px",color:s.textColor},p={marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor,paddingLeft:"24px"};return _(jo,{isOpen:t,onClose:e,title:r("title"),children:_("div",{children:[_("div",{style:u,children:[_("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap",flex:"1",minWidth:"0"},children:[_(Ho,{}),_(zo,{value:o.messagePlacement,onChange:h=>n("messagePlacement",h)})]}),_(Ro,{variant:"secondary",style:{flexShrink:0},onClick:()=>{i(),c(h=>h+1)},children:r("settings.reset")})]}),_(Ne,{title:r("settings.image.title"),children:[_("div",{style:a,children:[_("label",{style:f,children:r("settings.image.fileName")}),_(bt,{value:o.fileName,onChange:h=>n("fileName",h),placeholder:r("settings.image.fileNamePlaceholder")}),_("div",{style:{marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor},children:r("settings.image.fileNameHelp")})]}),_(_e,{checked:o.showDownloadButton,onChange:h=>n("showDownloadButton",h),children:r("settings.image.showButton")})]}),_(Ne,{title:r("settings.video.title"),children:[_("div",{style:a,children:[_("label",{style:f,children:r("settings.video.fileName")}),_(bt,{value:o.videoFileName,onChange:h=>n("videoFileName",h),placeholder:r("settings.video.fileNamePlaceholder")}),_("div",{style:{marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor},children:r("settings.video.fileNameHelp")})]}),_(_e,{checked:o.showVideoDownloadButton,onChange:h=>n("showVideoDownloadButton",h),children:r("settings.video.showButton")})]}),_(Ne,{title:r("settings.universal.title"),children:[_("div",{children:[_(_e,{checked:o.showUniversalDownloadButton,onChange:h=>n("showUniversalDownloadButton",h),children:r("settings.universal.showButton")}),_("div",{style:p,children:r("settings.universal.showButtonHelp")})]}),_("div",{style:{marginTop:"16px"},children:[_(_e,{checked:o.autoLikeOnDownload,onChange:h=>n("autoLikeOnDownload",h),children:r("settings.universal.autoLike")}),_("div",{style:p,children:r("settings.universal.autoLikeHelp")})]})]})]},d)})}function ln(){const[t,e]=$(!1);return _(G,{children:[_(po,{onClick:()=>e(!t),isSettingsPanelOpen:t}),_(an,{isOpen:t,onClose:()=>e(!1)})]})}const cn=co`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`,dn=T("button")`
  position: absolute;
  z-index: var(--z-index, 1000);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--width, 36px);
  height: var(--height, 36px);
  border-radius: var(--border-radius, 50%);
  background: var(--background, rgba(0, 0, 0, 0.8));
  border: var(--border, 2px solid rgba(255, 255, 255, 0.9));
  cursor: var(--cursor);
  opacity: var(--opacity);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform: var(--transform);

  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);

  &:hover:not(:disabled) {
    opacity: 1;
    transform: var(--hover-transform);
  }
`,un=T("svg")`
  width: var(--icon-width, 20px);
  height: var(--icon-height, 20px);
  fill: var(--icon-color, white);
`,fn=T("svg")`
  width: var(--icon-width, 18px);
  height: var(--icon-height, 18px);
  animation: ${cn} 1s linear infinite;
  fill: none;
  color: var(--icon-color, white);
`,_n=_(un,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:_("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})}),pn=_(fn,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:_("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none",strokeDasharray:"31.416",strokeDashoffset:"15.708"})});function It({onDownload:t,title:e,isDownloading:o=!1,disabled:n=!1,icon:i=_n,loadingIcon:r=pn,style:s={},className:l=""}){const d=n||o,c=async f=>{go(f),!d&&await t(f)},u=f=>{const p={};for(const[h,S]of Object.entries(f)){const b=`--${h.replace(/[A-Z]/g,"-$&").toLowerCase()}`;p[b]=S}return p},a={"--cursor":d?"not-allowed":"pointer","--opacity":o?"0.5":"0.8","--transform":o?"scale(0.95)":"scale(1)","--hover-transform":o?"scale(0.95)":"scale(1.05)",...!s.top&&!s.bottom&&{"--bottom":"8px"},...!s.right&&!s.left&&{"--right":"8px"},...u(s)};return _(dn,{className:l,style:a,onClick:c,onMouseDown:f=>(f.preventDefault(),!1),title:e,disabled:d,children:o?r:i})}const hn="https://x.com/i/api/graphql/_8aYOgEDz35BrBcBal1-_w/TweetDetail",gn="Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",mn={rweb_video_screen_enabled:!1,profile_label_improvements_pcf_label_in_post_enabled:!0,rweb_tipjar_consumption_enabled:!0,verified_phone_label_enabled:!1,creator_subscriptions_tweet_preview_api_enabled:!0,responsive_web_graphql_timeline_navigation_enabled:!0,responsive_web_graphql_skip_user_profile_image_extensions_enabled:!1,premium_content_api_read_enabled:!1,communities_web_enable_tweet_community_results_fetch:!0,c9s_tweet_anatomy_moderator_badge_enabled:!0,responsive_web_grok_analyze_button_fetch_trends_enabled:!1,responsive_web_grok_analyze_post_followups_enabled:!0,responsive_web_jetfuel_frame:!1,responsive_web_grok_share_attachment_enabled:!0,articles_preview_enabled:!0,responsive_web_edit_tweet_api_enabled:!0,graphql_is_translatable_rweb_tweet_is_translatable_enabled:!0,view_counts_everywhere_api_enabled:!0,longform_notetweets_consumption_enabled:!0,responsive_web_twitter_article_tweet_consumption_enabled:!0,tweet_awards_web_tipping_enabled:!1,responsive_web_grok_show_grok_translated_post:!1,responsive_web_grok_analysis_button_from_backend:!1,creator_subscriptions_quote_tweet_preview_enabled:!1,freedom_of_speech_not_reach_fetch_enabled:!0,standardized_nudges_misinfo:!0,tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled:!0,longform_notetweets_rich_text_read_enabled:!0,longform_notetweets_inline_media_enabled:!0,responsive_web_grok_image_annotation_enabled:!0,responsive_web_enhance_cards_enabled:!1},vn={withArticlePlainText:!1,withArticleRichContentState:!0,withDisallowedReplyControls:!1,withGrokAnalyze:!1},wn=encodeURIComponent(JSON.stringify(mn)),yn=encodeURIComponent(JSON.stringify(vn)),bn=`features=${wn}&fieldToggles=${yn}`,xn='","rankingMode":"Relevance","includePromotedContent":false,"withCommunity":false,"withQuickPromoteEligibilityTweetFields":false,"withBirdwatchNotes":false,"withVoice":false}',Sn=[["Authorization",gn],["x-twitter-active-user","yes"],["Content-Type","application/json"]];let j;const kn=t=>{const e=encodeURIComponent(`{"focalTweetId":"${t}${xn}`);return`${hn}?${bn}&variables=${e}`};function Tn(t){if(!Array.isArray(t)||t.length===0)return;const e=t.find(i=>i.type==="video"||i.type==="animated_gif");if(!e||!e.video_info||!Array.isArray(e.video_info.variants))return;const o=e.video_info.variants.filter(i=>i.content_type==="video/mp4"&&i.url);return o.length===0?void 0:o.reduce((i,r)=>(r.bitrate||0)>=(i.bitrate||0)?r:i).url}function An(t,e){try{const n=t.data.threaded_conversation_with_injections_v2.instructions.find(i=>i.type==="TimelineAddEntries");if(!n||!Array.isArray(n.entries))return[];for(const i of n.entries){const{content:r,entryId:s}=i,{entryType:l,itemContent:d}=r;if(s===`tweet-${e}`&&l==="TimelineTimelineItem"&&d?.itemType==="TimelineTweet"&&d.tweet_results?.result?.legacy?.extended_entities?.media)return d.tweet_results.result.legacy.extended_entities.media}return[]}catch{return[]}}function Cn(){if(j)return j;const t=document.querySelector('meta[name="csrf-token"]');if(t){const o=t.getAttribute("content")||void 0;if(o)return j=o,o}const e=document.cookie.split(";");for(const o of e){const[n,i]=o.trim().split("=");if(n==="ct0"&&i)return j=decodeURIComponent(i),j}}async function En(t,e){const o=new Headers(Sn);o.set("x-csrf-token",e),o.set("User-Agent",navigator.userAgent);const n=await fetch(kn(t),{method:"GET",headers:o,credentials:"include"});if(!n.ok)throw new Error(`Failed to fetch tweet data: ${n.status} ${n.statusText}`);return await n.json()}async function In(t){try{const e=Cn();if(!e)throw new Error("Could not find CSRF token");const o=await En(t,e),n=An(o,t);return Tn(n)}catch(e){throw j=void 0,e}}function Dn(t){let e=t.parentElement;for(;e&&e.tagName!=="BODY";){if(e.hasAttribute("data-testid")&&e.getAttribute("data-testid")==="videoComponent")return e;e=e.parentElement}return null}function Ln(t){let e=t.parentElement;for(;e&&e.tagName!=="BODY";){if(e.hasAttribute("data-testid")&&e.getAttribute("data-testid")==="videoPlayer")return e;e=e.parentElement}return null}function $n(t){const o=`; ${document.cookie}`.split(`; ${t}=`);return o.length===2&&o.pop()?.split(";").shift()||null}const Nn="https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet",Bn="Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";function Pn(){const t=$n("ct0"),e=document.cookie;return!t||!e?null:{accept:"*/*","accept-language":"en-US,en;q=0.9",authorization:Bn,"content-type":"application/json","x-csrf-token":t,"x-twitter-active-user":"yes","x-twitter-auth-type":"OAuth2Session","x-twitter-client-language":"en",cookie:e}}async function Dt(t){try{const e=Pn();if(!e)return{success:!1,message:m.t("messages.cannotGetAuthInfo")};const n=await fetch(Nn,{method:"POST",headers:e,body:JSON.stringify({variables:{tweet_id:t},queryId:"lI07N6Otwv1PhnEgXILM7A"})});if(!n.ok)return{success:!1,message:m.t("messages.networkRequestFailed",{status:n.status})};const i=await n.json(),{errors:r,data:s}=i;if(r&&r.length>0){const[l]=r,{code:d,name:c,message:u}=l||{};if(d===139&&c==="AuthorizationError")return E.info(m.t("messages.tweetAlreadyLiked")),{success:!0};const a=u||"未知错误";return{success:!1,message:m.t("messages.likeFailed",{error:a})}}return s?.favorite_tweet==="Done"?(E.info(m.t("messages.likeSuccess")),{success:!0}):{success:!1,message:m.t("messages.likeResponseError")}}catch(e){const o=e instanceof Error?e.message:String(e);return{success:!1,message:m.t("messages.likeFailed",{error:o})}}}function Lt(t,e=m.t("messages.downloadFailed")){const o=t instanceof Error?t.message:String(t);E.error(`${e}: ${o}`)}function $t(t){let e=t;for(;e&&e.tagName!=="BODY";){if(e.tagName==="ARTICLE"&&e.getAttribute("data-testid")==="tweet"||e.getAttribute("role")==="dialog")return e;e=e.parentElement}return null}function Rn(t,e=""){let o=t;for(;o&&o.tagName!=="BODY";){if(o.tagName==="ARTICLE"&&o.hasAttribute("data-testid")&&o.getAttribute("data-testid")==="tweet"){const r=o.querySelectorAll(`a[href*="${e}/status/"]`);for(const s of Array.from(r)){const d=s.href.match(/\/status\/(\d+)/);if(d)return d[1]}}o=o.parentElement}const n=window.location.href.match(/\/status\/(\d+)/);if(n)return n[1]}function Q(t){const e=t.closest('[role="link"]');if(e&&e.querySelector("time"))return!0;const o=t.closest('[id^="id"]:not([aria-labelledby])');return!!(o&&o.querySelector("time"))}function Un(t){const e=t.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');return Array.from(e).some(o=>!Q(o))}function Fn(t){const e=t.querySelectorAll("video");return Array.from(e).some(o=>!Q(o))}function Nt(t){const e=t.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');return Array.from(e).filter(o=>!Q(o))}function Bt(t){const e=t.querySelectorAll("video");return Array.from(e).filter(o=>!Q(o))}function Mn(t){try{const e=t.querySelector('[data-testid="User-Name"]');if(e){const n=e.querySelector('a[href^="/"]');if(n){const i=n.getAttribute("href");if(i&&i.startsWith("/")){const r=i.slice(1).split("/")[0];if(r)return r}}}const o=t.querySelector('a[href*="/status/"]');return o?ce(o.href).userid:ce(window.location.href).userid}catch{return}}function Hn(t){let e=t;for(let o=0;o<20&&e;o++)if(e=e.parentElement,e?.tagName.toLowerCase()==="a")return e;return null}const Ue=async({setIsDownloading:t,targetImage:e,settings:o,skipAutoLike:n=!1,imageIndex:i})=>{t(!0);const{picname:r,ext:s}=mo(e.src);let l;if(window.location.href.includes("photo"))l=ce(window.location.href);else{const a=Hn(e);if(!a)return;l=ce(a.href)}const d=i||parseInt(l.picno)-1,c=ht(o.fileName,{Userid:l.userid,Tid:l.tid,Time:`${Date.now()}`,PicName:r,PicNo:`${d}`}),u=`https://pbs.twimg.com/media/${r}?format=${s}&name=orig`;try{if(await pt(u,`${c}.${s}`),o.autoLikeOnDownload&&l.tid&&!n){const a=await Dt(l.tid);!a.success&&a.message&&E.error(a.message)}}catch(a){Lt(a,m.t("messages.imageDownloadFailed"))}finally{t(!1)}};function zn({targetImage:t}){const{settings:e}=he(),[o,n]=$(!1);return e.showDownloadButton?_(It,{isDownloading:o,onDownload:()=>Ue({setIsDownloading:n,targetImage:t,settings:e}),title:m.t("ui.downloadImage"),style:{bottom:"8px",right:"8px"}}):null}const Pt=async({setIsDownloading:t,src:e,tweetContainer:o,settings:n,skipAutoLike:i=!1})=>{t(!0);try{const r=Mn(o),s=Rn(o,r);if(!s){E.error(m.t("messages.cannotRecognizeTweet"));return}const l=e&&e.startsWith("https://video.twimg.com")?e:await In(s);if(!l){E.error(m.t("messages.videoLinkNotFound"));return}const d={userid:r,tid:s},c=ht(n.videoFileName,{Userid:d.userid||"unknown",Tid:d.tid,Time:`${Date.now()}`});if(await pt(l,`${c}.mp4`),n.autoLikeOnDownload&&s&&!i){const u=await Dt(s);!u.success&&u.message&&E.error(u.message)}}catch(r){Lt(r,m.t("messages.videoDownloadFailed"))}finally{t(!1)}};function On({src:t,tweetContainer:e}){const{settings:o}=he(),[n,i]=$(!1);return o.showVideoDownloadButton?_(It,{onDownload:()=>{n||(i(!0),Pt({setIsDownloading:i,src:t,tweetContainer:e,settings:o}).finally(()=>{i(!1)}))},title:n?m.t("ui.downloading"):m.t("ui.downloadVideo"),isDownloading:n,style:{bottom:"70px",right:"8px"}}):null}const Vn=T("button")`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34.75px;
  height: 34.75px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: rgb(113, 118, 123);

  &:hover:not(:disabled) {
    background-color: rgba(29, 155, 240, 0.1);
    color: rgb(29, 155, 240);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`,jn=T("svg")`
  width: 18.75px;
  height: 18.75px;
  fill: currentColor;
`;function Wn({tweetContainer:t}){const{settings:e}=he(),[o,n]=$(!1),[i,r]=$("none"),s=window.location.href;if(H(()=>{let f=null;const p=()=>{if(Un(t)){r("image");return}if(Fn(t)){r("video");return}r("none")},h=()=>{f!==null&&clearTimeout(f),f=setTimeout(p,100)};p();const S=new MutationObserver(h);return S.observe(t,{childList:!0,subtree:!0,attributes:!1,characterData:!1}),()=>{S.disconnect(),f!==null&&clearTimeout(f)}},[t]),i==="none"||!e.showUniversalDownloadButton)return null;const l=()=>{},d=async f=>{if(s.includes("/photo/")&&f.nodeName!=="ARTICLE"){const g=s.match(/\/photo\/(\d+)/),C=g&&g[1]?parseInt(g[1])-1:0,I=f.querySelector('[aria-roledescription="carousel"]');if(I){const F=I.querySelectorAll(Rt)[C];if(F){await Ue({setIsDownloading:l,targetImage:F,settings:e,imageIndex:C}),E.success(m.t("messages.imagesDownloadSuccess",{count:1}));return}}throw new Error("Image not found in preview mode")}const h=Nt(f).map((g,C)=>g?Ue({setIsDownloading:l,targetImage:g,settings:e,skipAutoLike:C>0,imageIndex:C}):Promise.resolve()),S=await Promise.allSettled(h),b=S.filter(g=>g.status==="rejected"),w=S.length-b.length;w===0?E.error(m.t("messages.imageDownloadFailed")):b.length>0?E.warning(m.t("messages.imagesDownloadSuccess",{count:`${w}/${S.length}`})):E.success(m.t("messages.imagesDownloadSuccess",{count:S.length}))},c=async f=>{const h=Bt(f)[0];h&&Pt({setIsDownloading:l,src:h.src,tweetContainer:f,settings:e}).then(()=>E.success(m.t("messages.videoDownloadSuccess")))};return _(Vn,{onClick:async f=>{if(!o){f.stopPropagation(),n(!0);try{i==="image"?await d(t):i==="video"&&await c(t)}finally{n(!1)}}},disabled:o,title:(()=>{if(o)return m.t("ui.downloading");let f=Nt(t).length,p=Bt(t).length;return["/photo/","/video/"].some(h=>s.includes(h))&&(f=1,p=1),i==="image"?f>1?m.t("ui.downloadImages",{count:f}):m.t("ui.downloadImage"):p>1?m.t("ui.downloadVideos",{count:p}):m.t("ui.downloadVideo")})(),children:_(jn,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:_("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})})})}const Rt='img[src^="https://pbs.twimg.com/media/"]',qn="video",Ut=new WeakSet,Ft=new WeakSet,Mt=new WeakSet,Gn=()=>JSON.parse(localStorage.getItem("x-downloader-settings")||"{}"),Ht=(t,e,o)=>{const n=document.createElement("div");n.style.display="none",t.appendChild(n);const i=()=>{const r=Gn()[e]!==!1;n.style.display=r?"block":"none",r&&o(n)};o(n),t.addEventListener("mouseenter",i),t.addEventListener("mouseleave",()=>n.style.display="none")},Yn=t=>{getComputedStyle(t).position==="static"&&(t.style.position="relative")};function zt(t){if(Mt.has(t))return;const e=Array.from(t.querySelectorAll('div[role="group"]')).find(r=>{const s=r.getAttribute("aria-label");return s&&s.includes("likes")});if(!e)return;const o=document.createElement("div");o.style.cssText="display: inline-flex; align-items: center; margin-left: auto;",e.appendChild(o);const n=()=>Y(_(Wn,{tweetContainer:t}),o);n();let i=null;e.addEventListener("mouseenter",()=>{i&&clearTimeout(i),i=window.setTimeout(n,50)}),Mt.add(t)}const Ot=t=>!!t.src&&t.src.startsWith("https://pbs.twimg.com/media/");function Vt(t){if(Ut.has(t)||!Ot(t))return;const e=$t(t);e&&zt(e);const o=t.parentElement?.parentElement;o&&(Yn(o),Ht(o,"showDownloadButton",n=>{Y(_(zn,{targetImage:t}),n)}),Ut.add(t))}function jt(t){if(Ft.has(t)||Q(t))return;const e=$t(t);if(!e)return;zt(e);const o=Dn(t)||Ln(t);o&&(Ht(o,"showVideoDownloadButton",n=>{Y(_(On,{src:t.src,tweetContainer:e}),n)}),Ft.add(t))}const Kn=t=>{t instanceof HTMLImageElement&&Ot(t)?Vt(t):t.firstChild instanceof HTMLVideoElement?jt(t.firstChild):(t instanceof Element||t instanceof Document||t instanceof DocumentFragment)&&(t.querySelectorAll(Rt).forEach(e=>Vt(e)),t.querySelectorAll(qn).forEach(e=>jt(e)))};function Jn(){const t=new Set;let e=null;const o=r=>{t.add(r),e===null&&(e=requestAnimationFrame(()=>{e=null,t.forEach(s=>{Kn(s)}),t.clear()}))};o(document);const n=new MutationObserver(r=>{r.forEach(s=>{s.addedNodes.forEach(l=>{o(l)})})});n.observe(document.body,{childList:!0,subtree:!0,attributes:!1,characterData:!1});const i=()=>{n.disconnect(),e!==null&&(cancelAnimationFrame(e),e=null),t.clear()};window.addEventListener("beforeunload",i)}function Wt(){const t=document.createElement("div");t.id="x-downloader-app",document.body.appendChild(t),Y(_(ln,{}),t),Jn()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Wt):Wt()})();
