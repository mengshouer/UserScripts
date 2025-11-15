// ==UserScript==
// @name         X(Twitter) Downloader
// @name:zh-CN   X（Twitter）下载器
// @author       mengshouer
// @version      1.0.5
// @description  For X(Twitter) add download buttons for images and videos.
// @description:zh-CN  为 X(Twitter) 的图片和视频添加下载按钮。
// @include      *://twitter.com/*
// @include      *://*.twitter.com/*
// @include      *://x.com/*
// @include      *://*.x.com/*
// @license      GPL-3.0 License
// @namespace    https://github.com/mengshouer/UserScripts
// ==/UserScript==

(function(){"use strict";var oe,y,Oe,R,ze,Ve,je,qe,ve,we,ye,G={},We=[],Xt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ne=Array.isArray;function N(t,e){for(var o in e)t[o]=e[o];return t}function be(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function xe(t,e,o){var n,i,r,s={};for(r in e)r=="key"?n=e[r]:r=="ref"?i=e[r]:s[r]=e[r];if(arguments.length>2&&(s.children=arguments.length>3?oe.call(arguments,2):o),typeof t=="function"&&t.defaultProps!=null)for(r in t.defaultProps)s[r]===void 0&&(s[r]=t.defaultProps[r]);return re(t,s,n,i,null)}function re(t,e,o,n,i){var r={type:t,props:e,key:o,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Oe,__i:-1,__u:0};return i==null&&y.vnode!=null&&y.vnode(r),r}function K(t){return t.children}function ie(t,e){this.props=t,this.context=e}function H(t,e){if(e==null)return t.__?H(t.__,t.__i+1):null;for(var o;e<t.__k.length;e++)if((o=t.__k[e])!=null&&o.__e!=null)return o.__e;return typeof t.type=="function"?H(t):null}function Ge(t){var e,o;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((o=t.__k[e])!=null&&o.__e!=null){t.__e=t.__c.base=o.__e;break}return Ge(t)}}function Ke(t){(!t.__d&&(t.__d=!0)&&R.push(t)&&!se.__r++||ze!=y.debounceRendering)&&((ze=y.debounceRendering)||Ve)(se)}function se(){for(var t,e,o,n,i,r,s,l=1;R.length;)R.length>l&&R.sort(je),t=R.shift(),l=R.length,t.__d&&(o=void 0,n=void 0,i=(n=(e=t).__v).__e,r=[],s=[],e.__P&&((o=N({},n)).__v=n.__v+1,y.vnode&&y.vnode(o),Se(e.__P,o,n,e.__n,e.__P.namespaceURI,32&n.__u?[i]:null,r,i??H(n),!!(32&n.__u),s),o.__v=n.__v,o.__.__k[o.__i]=o,Xe(r,o,s),n.__e=n.__=null,o.__e!=i&&Ge(o)));se.__r=0}function Ye(t,e,o,n,i,r,s,l,d,c,f){var a,u,p,h,x,b,v,m=n&&n.__k||We,E=e.length;for(d=eo(o,e,m,d,E),a=0;a<E;a++)(p=o.__k[a])!=null&&(u=p.__i==-1?G:m[p.__i]||G,p.__i=a,b=Se(t,p,u,i,r,s,l,d,c,f),h=p.__e,p.ref&&u.ref!=p.ref&&(u.ref&&Te(u.ref,null,p),f.push(p.ref,p.__c||h,p)),x==null&&h!=null&&(x=h),(v=!!(4&p.__u))||u.__k===p.__k?d=Je(p,d,t,v):typeof p.type=="function"&&b!==void 0?d=b:h&&(d=h.nextSibling),p.__u&=-7);return o.__e=x,d}function eo(t,e,o,n,i){var r,s,l,d,c,f=o.length,a=f,u=0;for(t.__k=new Array(i),r=0;r<i;r++)(s=e[r])!=null&&typeof s!="boolean"&&typeof s!="function"?(d=r+u,(s=t.__k[r]=typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?re(null,s,null,null,null):ne(s)?re(K,{children:s},null,null,null):s.constructor==null&&s.__b>0?re(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):s).__=t,s.__b=t.__b+1,l=null,(c=s.__i=to(s,o,d,a))!=-1&&(a--,(l=o[c])&&(l.__u|=2)),l==null||l.__v==null?(c==-1&&(i>f?u--:i<f&&u++),typeof s.type!="function"&&(s.__u|=4)):c!=d&&(c==d-1?u--:c==d+1?u++:(c>d?u--:u++,s.__u|=4))):t.__k[r]=null;if(a)for(r=0;r<f;r++)(l=o[r])!=null&&(2&l.__u)==0&&(l.__e==n&&(n=H(l)),tt(l,l));return n}function Je(t,e,o,n){var i,r;if(typeof t.type=="function"){for(i=t.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=t,e=Je(i[r],e,o,n));return e}t.__e!=e&&(n&&(e&&t.type&&!e.parentNode&&(e=H(t)),o.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function to(t,e,o,n){var i,r,s,l=t.key,d=t.type,c=e[o],f=c!=null&&(2&c.__u)==0;if(c===null&&t.key==null||f&&l==c.key&&d==c.type)return o;if(n>(f?1:0)){for(i=o-1,r=o+1;i>=0||r<e.length;)if((c=e[s=i>=0?i--:r++])!=null&&(2&c.__u)==0&&l==c.key&&d==c.type)return s}return-1}function Ze(t,e,o){e[0]=="-"?t.setProperty(e,o??""):t[e]=o==null?"":typeof o!="number"||Xt.test(e)?o:o+"px"}function ae(t,e,o,n,i){var r,s;e:if(e=="style")if(typeof o=="string")t.style.cssText=o;else{if(typeof n=="string"&&(t.style.cssText=n=""),n)for(e in n)o&&e in o||Ze(t.style,e,"");if(o)for(e in o)n&&o[e]==n[e]||Ze(t.style,e,o[e])}else if(e[0]=="o"&&e[1]=="n")r=e!=(e=e.replace(qe,"$1")),s=e.toLowerCase(),e=s in t||e=="onFocusOut"||e=="onFocusIn"?s.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+r]=o,o?n?o.u=n.u:(o.u=ve,t.addEventListener(e,r?ye:we,r)):t.removeEventListener(e,r?ye:we,r);else{if(i=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=o??"";break e}catch{}typeof o=="function"||(o==null||o===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&o==1?"":o))}}function Qe(t){return function(e){if(this.l){var o=this.l[e.type+t];if(e.t==null)e.t=ve++;else if(e.t<o.u)return;return o(y.event?y.event(e):e)}}}function Se(t,e,o,n,i,r,s,l,d,c){var f,a,u,p,h,x,b,v,m,E,L,M,ee,Qt,me,te,He,D=e.type;if(e.constructor!=null)return null;128&o.__u&&(d=!!(32&o.__u),r=[l=e.__e=o.__e]),(f=y.__b)&&f(e);e:if(typeof D=="function")try{if(v=e.props,m="prototype"in D&&D.prototype.render,E=(f=D.contextType)&&n[f.__c],L=f?E?E.props.value:f.__:n,o.__c?b=(a=e.__c=o.__c).__=a.__E:(m?e.__c=a=new D(v,L):(e.__c=a=new ie(v,L),a.constructor=D,a.render=no),E&&E.sub(a),a.props=v,a.state||(a.state={}),a.context=L,a.__n=n,u=a.__d=!0,a.__h=[],a._sb=[]),m&&a.__s==null&&(a.__s=a.state),m&&D.getDerivedStateFromProps!=null&&(a.__s==a.state&&(a.__s=N({},a.__s)),N(a.__s,D.getDerivedStateFromProps(v,a.__s))),p=a.props,h=a.state,a.__v=e,u)m&&D.getDerivedStateFromProps==null&&a.componentWillMount!=null&&a.componentWillMount(),m&&a.componentDidMount!=null&&a.__h.push(a.componentDidMount);else{if(m&&D.getDerivedStateFromProps==null&&v!==p&&a.componentWillReceiveProps!=null&&a.componentWillReceiveProps(v,L),!a.__e&&a.shouldComponentUpdate!=null&&a.shouldComponentUpdate(v,a.__s,L)===!1||e.__v==o.__v){for(e.__v!=o.__v&&(a.props=v,a.state=a.__s,a.__d=!1),e.__e=o.__e,e.__k=o.__k,e.__k.some(function(W){W&&(W.__=e)}),M=0;M<a._sb.length;M++)a.__h.push(a._sb[M]);a._sb=[],a.__h.length&&s.push(a);break e}a.componentWillUpdate!=null&&a.componentWillUpdate(v,a.__s,L),m&&a.componentDidUpdate!=null&&a.__h.push(function(){a.componentDidUpdate(p,h,x)})}if(a.context=L,a.props=v,a.__P=t,a.__e=!1,ee=y.__r,Qt=0,m){for(a.state=a.__s,a.__d=!1,ee&&ee(e),f=a.render(a.props,a.state,a.context),me=0;me<a._sb.length;me++)a.__h.push(a._sb[me]);a._sb=[]}else do a.__d=!1,ee&&ee(e),f=a.render(a.props,a.state,a.context),a.state=a.__s;while(a.__d&&++Qt<25);a.state=a.__s,a.getChildContext!=null&&(n=N(N({},n),a.getChildContext())),m&&!u&&a.getSnapshotBeforeUpdate!=null&&(x=a.getSnapshotBeforeUpdate(p,h)),te=f,f!=null&&f.type===K&&f.key==null&&(te=et(f.props.children)),l=Ye(t,ne(te)?te:[te],e,o,n,i,r,s,l,d,c),a.base=e.__e,e.__u&=-161,a.__h.length&&s.push(a),b&&(a.__E=a.__=null)}catch(W){if(e.__v=null,d||r!=null)if(W.then){for(e.__u|=d?160:128;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;r[r.indexOf(l)]=null,e.__e=l}else{for(He=r.length;He--;)be(r[He]);ke(e)}else e.__e=o.__e,e.__k=o.__k,W.then||ke(e);y.__e(W,e,o)}else r==null&&e.__v==o.__v?(e.__k=o.__k,e.__e=o.__e):l=e.__e=oo(o.__e,e,o,n,i,r,s,d,c);return(f=y.diffed)&&f(e),128&e.__u?void 0:l}function ke(t){t&&t.__c&&(t.__c.__e=!0),t&&t.__k&&t.__k.forEach(ke)}function Xe(t,e,o){for(var n=0;n<o.length;n++)Te(o[n],o[++n],o[++n]);y.__c&&y.__c(e,t),t.some(function(i){try{t=i.__h,i.__h=[],t.some(function(r){r.call(i)})}catch(r){y.__e(r,i.__v)}})}function et(t){return typeof t!="object"||t==null||t.__b&&t.__b>0?t:ne(t)?t.map(et):N({},t)}function oo(t,e,o,n,i,r,s,l,d){var c,f,a,u,p,h,x,b=o.props,v=e.props,m=e.type;if(m=="svg"?i="http://www.w3.org/2000/svg":m=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(c=0;c<r.length;c++)if((p=r[c])&&"setAttribute"in p==!!m&&(m?p.localName==m:p.nodeType==3)){t=p,r[c]=null;break}}if(t==null){if(m==null)return document.createTextNode(v);t=document.createElementNS(i,m,v.is&&v),l&&(y.__m&&y.__m(e,r),l=!1),r=null}if(m==null)b===v||l&&t.data==v||(t.data=v);else{if(r=r&&oe.call(t.childNodes),b=o.props||G,!l&&r!=null)for(b={},c=0;c<t.attributes.length;c++)b[(p=t.attributes[c]).name]=p.value;for(c in b)if(p=b[c],c!="children"){if(c=="dangerouslySetInnerHTML")a=p;else if(!(c in v)){if(c=="value"&&"defaultValue"in v||c=="checked"&&"defaultChecked"in v)continue;ae(t,c,null,p,i)}}for(c in v)p=v[c],c=="children"?u=p:c=="dangerouslySetInnerHTML"?f=p:c=="value"?h=p:c=="checked"?x=p:l&&typeof p!="function"||b[c]===p||ae(t,c,p,b[c],i);if(f)l||a&&(f.__html==a.__html||f.__html==t.innerHTML)||(t.innerHTML=f.__html),e.__k=[];else if(a&&(t.innerHTML=""),Ye(e.type=="template"?t.content:t,ne(u)?u:[u],e,o,n,m=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,s,r?r[0]:o.__k&&H(o,0),l,d),r!=null)for(c=r.length;c--;)be(r[c]);l||(c="value",m=="progress"&&h==null?t.removeAttribute("value"):h!=null&&(h!==t[c]||m=="progress"&&!h||m=="option"&&h!=b[c])&&ae(t,c,h,b[c],i),c="checked",x!=null&&x!=t[c]&&ae(t,c,x,b[c],i))}return t}function Te(t,e,o){try{if(typeof t=="function"){var n=typeof t.__u=="function";n&&t.__u(),n&&e==null||(t.__u=t(e))}else t.current=e}catch(i){y.__e(i,o)}}function tt(t,e,o){var n,i;if(y.unmount&&y.unmount(t),(n=t.ref)&&(n.current&&n.current!=t.__e||Te(n,null,e)),(n=t.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(r){y.__e(r,e)}n.base=n.__P=null}if(n=t.__k)for(i=0;i<n.length;i++)n[i]&&tt(n[i],e,o||typeof t.type!="function");o||be(t.__e),t.__c=t.__=t.__e=void 0}function no(t,e,o){return this.constructor(t,o)}function Y(t,e,o){var n,i,r,s;e==document&&(e=document.documentElement),y.__&&y.__(t,e),i=(n=!1)?null:e.__k,r=[],s=[],Se(e,t=e.__k=xe(K,null,[t]),i||G,G,e.namespaceURI,i?null:e.firstChild?oe.call(e.childNodes):null,r,i?i.__e:e.firstChild,n,s),Xe(r,t,s)}oe=We.slice,y={__e:function(t,e,o,n){for(var i,r,s;e=e.__;)if((i=e.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(t)),s=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(t,n||{}),s=i.__d),s)return i.__E=i}catch(l){t=l}throw t}},Oe=0,ie.prototype.setState=function(t,e){var o;o=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=N({},this.state),typeof t=="function"&&(t=t(N({},o),this.props)),t&&N(o,t),t!=null&&this.__v&&(e&&this._sb.push(e),Ke(this))},ie.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ke(this))},ie.prototype.render=K,R=[],Ve=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,je=function(t,e){return t.__v.__b-e.__v.__b},se.__r=0,qe=/(PointerCapture)$|Capture$/i,ve=0,we=Qe(!1),ye=Qe(!0);var ro=0;function _(t,e,o,n,i,r){e||(e={});var s,l,d=e;if("ref"in d)for(l in d={},e)l=="ref"?s=e[l]:d[l]=e[l];var c={type:t,props:d,key:o,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--ro,__i:-1,__u:0,__source:i,__self:r};if(typeof t=="function"&&(s=t.defaultProps))for(l in s)d[l]===void 0&&(d[l]=s[l]);return y.vnode&&y.vnode(c),c}var J,S,Ae,ot,le=0,nt=[],k=y,rt=k.__b,it=k.__r,st=k.diffed,at=k.__c,lt=k.unmount,ct=k.__;function Ce(t,e){k.__h&&k.__h(S,t,le||e),le=0;var o=S.__H||(S.__H={__:[],__h:[]});return t>=o.__.length&&o.__.push({}),o.__[t]}function I(t){return le=1,io(ft,t)}function io(t,e,o){var n=Ce(J++,2);if(n.t=t,!n.__c&&(n.__=[ft(void 0,e),function(l){var d=n.__N?n.__N[0]:n.__[0],c=n.t(d,l);d!==c&&(n.__N=[c,n.__[1]],n.__c.setState({}))}],n.__c=S,!S.__f)){var i=function(l,d,c){if(!n.__c.__H)return!0;var f=n.__c.__H.__.filter(function(u){return!!u.__c});if(f.every(function(u){return!u.__N}))return!r||r.call(this,l,d,c);var a=n.__c.props!==l;return f.forEach(function(u){if(u.__N){var p=u.__[0];u.__=u.__N,u.__N=void 0,p!==u.__[0]&&(a=!0)}}),r&&r.call(this,l,d,c)||a};S.__f=!0;var r=S.shouldComponentUpdate,s=S.componentWillUpdate;S.componentWillUpdate=function(l,d,c){if(this.__e){var f=r;r=void 0,i(l,d,c),r=f}s&&s.call(this,l,d,c)},S.shouldComponentUpdate=i}return n.__N||n.__}function F(t,e){var o=Ce(J++,3);!k.__s&&ut(o.__H,e)&&(o.__=t,o.u=e,S.__H.__h.push(o))}function Ee(t){return le=5,so(function(){return{current:t}},[])}function so(t,e){var o=Ce(J++,7);return ut(o.__H,e)&&(o.__=t(),o.__H=e,o.__h=t),o.__}function ao(){for(var t;t=nt.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(ce),t.__H.__h.forEach(Le),t.__H.__h=[]}catch(e){t.__H.__h=[],k.__e(e,t.__v)}}k.__b=function(t){S=null,rt&&rt(t)},k.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),ct&&ct(t,e)},k.__r=function(t){it&&it(t),J=0;var e=(S=t.__c).__H;e&&(Ae===S?(e.__h=[],S.__h=[],e.__.forEach(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})):(e.__h.forEach(ce),e.__h.forEach(Le),e.__h=[],J=0)),Ae=S},k.diffed=function(t){st&&st(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(nt.push(e)!==1&&ot===k.requestAnimationFrame||((ot=k.requestAnimationFrame)||lo)(ao)),e.__H.__.forEach(function(o){o.u&&(o.__H=o.u),o.u=void 0})),Ae=S=null},k.__c=function(t,e){e.some(function(o){try{o.__h.forEach(ce),o.__h=o.__h.filter(function(n){return!n.__||Le(n)})}catch(n){e.some(function(i){i.__h&&(i.__h=[])}),e=[],k.__e(n,o.__v)}}),at&&at(t,e)},k.unmount=function(t){lt&&lt(t);var e,o=t.__c;o&&o.__H&&(o.__H.__.forEach(function(n){try{ce(n)}catch(i){e=i}}),o.__H=void 0,e&&k.__e(e,o.__v))};var dt=typeof requestAnimationFrame=="function";function lo(t){var e,o=function(){clearTimeout(n),dt&&cancelAnimationFrame(e),setTimeout(t)},n=setTimeout(o,35);dt&&(e=requestAnimationFrame(o))}function ce(t){var e=S,o=t.__c;typeof o=="function"&&(t.__c=void 0,o()),S=e}function Le(t){var e=S;t.__c=t.__(),S=e}function ut(t,e){return!t||t.length!==e.length||e.some(function(o,n){return o!==t[n]})}function ft(t,e){return typeof e=="function"?e(t):e}let co={data:""},uo=t=>{if(typeof window=="object"){let e=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(t||document.head).appendChild(e),e.firstChild}return t||co},fo=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,_o=/\/\*[^]*?\*\/|  +/g,_t=/\n+/g,P=(t,e)=>{let o="",n="",i="";for(let r in t){let s=t[r];r[0]=="@"?r[1]=="i"?o=r+" "+s+";":n+=r[1]=="f"?P(s,r):r+"{"+P(s,r[1]=="k"?"":e)+"}":typeof s=="object"?n+=P(s,e?e.replace(/([^,])+/g,l=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,l):l?l+" "+d:d)):r):s!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=P.p?P.p(r,s):r+":"+s+";")}return o+(e&&i?e+"{"+i+"}":i)+n},$={},pt=t=>{if(typeof t=="object"){let e="";for(let o in t)e+=o+pt(t[o]);return e}return t},po=(t,e,o,n,i)=>{let r=pt(t),s=$[r]||($[r]=(d=>{let c=0,f=11;for(;c<d.length;)f=101*f+d.charCodeAt(c++)>>>0;return"go"+f})(r));if(!$[s]){let d=r!==t?t:(c=>{let f,a,u=[{}];for(;f=fo.exec(c.replace(_o,""));)f[4]?u.shift():f[3]?(a=f[3].replace(_t," ").trim(),u.unshift(u[0][a]=u[0][a]||{})):u[0][f[1]]=f[2].replace(_t," ").trim();return u[0]})(t);$[s]=P(i?{["@keyframes "+s]:d}:d,o?"":"."+s)}let l=o&&$.g?$.g:null;return o&&($.g=$[s]),((d,c,f,a)=>{a?c.data=c.data.replace(a,d):c.data.indexOf(d)===-1&&(c.data=f?d+c.data:c.data+d)})($[s],e,n,l),s},ho=(t,e,o)=>t.reduce((n,i,r)=>{let s=e[r];if(s&&s.call){let l=s(o),d=l&&l.props&&l.props.className||/^go/.test(l)&&l;s=d?"."+d:l&&typeof l=="object"?l.props?"":P(l,""):l===!1?"":l}return n+i+(s??"")},"");function Ie(t){let e=this||{},o=t.call?t(e.p):t;return po(o.unshift?o.raw?ho(o,[].slice.call(arguments,1),e.p):o.reduce((n,i)=>Object.assign(n,i&&i.call?i(e.p):i),{}):o,uo(e.target),e.g,e.o,e.k)}let ht,De,Ne;Ie.bind({g:1});let go=Ie.bind({k:1});function mo(t,e,o,n){P.p=e,ht=t,De=o,Ne=n}function T(t,e){let o=this||{};return function(){let n=arguments;function i(r,s){let l=Object.assign({},r),d=l.className||i.className;o.p=Object.assign({theme:De&&De()},l),o.o=/ *go\d+/.test(d),l.className=Ie.apply(o,n)+(d?" "+d:"");let c=t;return t[0]&&(c=l.as||t,delete l.as),Ne&&c[0]&&Ne(l),ht(c,l)}return i}}mo(xe);const vo=T("button")`
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
`,wo=T("svg")`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;function yo({onClick:t,isSettingsPanelOpen:e}){const[o,n]=I(!1);return F(()=>{const r=s=>{const l=s.clientX<100&&s.clientY>window.innerHeight*.6666666666666666;n(l)};return document.addEventListener("mousemove",r),()=>document.removeEventListener("mousemove",r)},[]),_(vo,{style:{"--left-position":o||e?"10px":"-40px"},onClick:t,children:_(wo,{viewBox:"0 0 24 24",children:_("path",{d:"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})})})}class bo{constructor(e,o){this.storageKey=e,this.defaultSettings=o}loadSettings(){try{const e=localStorage.getItem(this.storageKey);if(e){const o=JSON.parse(e);return{...this.defaultSettings,...o}}}catch{}return{...this.defaultSettings}}saveSettings(e){const n={...this.loadSettings(),...e};try{localStorage.setItem(this.storageKey,JSON.stringify(n))}catch{}return n}resetSettings(){try{localStorage.removeItem(this.storageKey)}catch{}return{...this.defaultSettings}}}function xo(t){t.stopPropagation(),t.preventDefault()}async function gt(t,e){try{const o=await fetch(t);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const n=await o.blob(),i=URL.createObjectURL(n),r=document.createElement("a");r.href=i,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}catch(o){throw o}}function So(t){const e=t.split("?")[0]?.split("/").pop()||"",o=t.includes("format=png")?"png":"jpg";return{picname:e,ext:o}}function mt(t,e){let o=t;for(const[n,i]of Object.entries(e))o=o.replace(new RegExp(`<%${n}>`,"g"),i||"");return o}function de(t){const e=/https:\/\/(twitter|x)\.com\//,o=t.replace(e,"").split("/");return{userid:o[0]||"unknown",tid:o[2]||"unknown",picno:o[4]||"1"}}const ko=T("div")`
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
`,To=T("span")`
  float: right;
  margin-left: 8px;
  font-weight: bold;
  opacity: 0.7;
  font-size: 16px;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;function Ao({type:t="info",content:e,duration:o=3e3,onClose:n,className:i,style:r}){const s=Ee(null),l=Ee(0),d=Ee(o),c=()=>{s.current&&(clearTimeout(s.current),s.current=null)},f=p=>{c(),p>0&&(l.current=Date.now(),s.current=window.setTimeout(()=>{n?.()},p))},a=()=>{if(s.current){const p=Date.now()-l.current;d.current=Math.max(0,d.current-p),c()}},u=()=>{d.current>0&&f(d.current)};return F(()=>(o>0&&(d.current=o,f(o)),c),[o,n]),_(ko,{className:`message-${t} ${i||""}`,style:r,onClick:n,onMouseEnter:a,onMouseLeave:u,children:[e,_(To,{children:"×"})]})}const Co=()=>{try{return JSON.parse(localStorage.getItem("x-downloader-settings")||"{}").messagePlacement||"top"}catch{return"top"}},Z=new Map;let Eo=0;const Lo=t=>{const[e,o]=t.split("-");let r=`${e}: 20px; display: flex; flex-direction: ${e==="bottom"?"column-reverse":"column"};`;return o?r+=` ${o}: 20px;`:r+=" left: 50%; transform: translateX(-50%);",r},Io=(t="top")=>{if(!Z.has(t)){const e=document.createElement("div");e.id=`userscript-message-container-${t}`,e.style.cssText=`
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      ${Lo(t)}
    `,document.body.appendChild(e),Z.set(t,e)}return Z.get(t)},Do=t=>{const e=t.placement||"top",o=Io(e),n=`userscript-message-${++Eo}`,i=document.createElement("div");i.id=n;const r=e.startsWith("bottom");i.style.cssText=`
    position: relative;
    margin-bottom: 8px;
    pointer-events: auto;
    animation: ${r?"messageSlideInBottom":"messageSlideIn"} 0.3s ease-out;
  `,o.appendChild(i);const s=()=>{if(i.parentNode){const l=e.startsWith("bottom");i.style.animation=`${l?"messageSlideOutBottom":"messageSlideOut"} 0.3s ease-in forwards`,setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},300)}};return Y(xe(Ao,{...t,onClose:s}),i),s},ue=t=>(e,o,n)=>Do({type:t,content:e,placement:n||Co(),...o!==void 0&&{duration:o}}),No=ue("success"),$o=ue("error"),Bo=ue("warning"),Po=ue("info"),A={success:No,error:$o,warning:Bo,info:Po,destroy:()=>{Z.forEach(t=>{t.parentNode&&t.parentNode.removeChild(t)}),Z.clear()}},vt=document.createElement("style");vt.textContent=`
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
`,document.head.appendChild(vt);const wt="en",yt="userscript-locale";let O=wt;const fe={},_e=[],bt=()=>navigator?.language?.toLowerCase().startsWith("zh")?"zh":"en";try{O=localStorage.getItem(yt)||bt()}catch{O=bt()}const xt=(t,e)=>{let o=t;for(const n of e.split("."))if(o=o?.[n],!o)return;return typeof o=="string"?o:void 0},Ro=(t,e)=>e?t.replace(/\{(\w+)\}/g,(o,n)=>e[n]??"{"+n+"}"):t;function Fo(t,e){const o=typeof t=="string"?t:t.key,n=typeof t=="string"?e:t.params,i=xt(fe[O],o)||xt(fe[wt],o)||o;return Ro(i,n)}const g={addTranslations(t,e){fe[t]=Object.assign(fe[t]||{},e)},setLocale(t){if(O!==t){O=t;try{localStorage.setItem(yt,t)}catch{}_e.forEach(e=>e())}},getLocale(){return O},t:Fo,subscribe(t){return _e.push(t),()=>{const e=_e.indexOf(t);e>-1&&_e.splice(e,1)}}};function $e(){const[t,e]=I(g.getLocale());F(()=>g.subscribe(()=>{e(g.getLocale())}),[]);const o=n=>g.setLocale(n);return{t:g.t,locale:t,setLocale:o}}async function St(t){try{let e=!1;if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(t),e=!0;else{const o=document.createElement("textarea");o.value=t,o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.focus(),o.select(),e=document.execCommand("copy"),document.body.removeChild(o)}return e?A.success(g.t("ui.copied")):A.error(g.t("ui.copyFailed")),e}catch{return A.error(g.t("ui.copyFailed")),!1}}function Uo(t){return{textColor:t?"#e1e8ed":"#333",backgroundColor:t?"#1e1e1e":"white",borderColor:t?"#38444d":"#ddd",secondaryTextColor:t?"#8b98a5":"#666",inputBackground:t?"#253341":"white",inputBorder:t?"#38444d":"#ddd",panelBackground:t?"#1e1e1e":"white"}}function B(){const[t,e]=I(()=>window.matchMedia?.("(prefers-color-scheme: dark)").matches||!1);return F(()=>{const o=window.matchMedia("(prefers-color-scheme: dark)"),n=i=>e(i.matches);if(o.addEventListener)return o.addEventListener("change",n),()=>o.removeEventListener("change",n);if(o.addListener)return o.addListener(n),()=>o.removeListener?.(n)},[]),{theme:Uo(t),isDark:t}}var Mo=Symbol.for("preact-signals");function Be(){if(z>1)z--;else{for(var t,e=!1;Q!==void 0;){var o=Q;for(Q=void 0,Pe++;o!==void 0;){var n=o.o;if(o.o=void 0,o.f&=-3,!(8&o.f)&&Ct(o))try{o.c()}catch(i){e||(t=i,e=!0)}o=n}}if(Pe=0,z--,e)throw t}}var w=void 0;function kt(t){var e=w;w=void 0;try{return t()}finally{w=e}}var Q=void 0,z=0,Pe=0,pe=0;function Tt(t){if(w!==void 0){var e=t.n;if(e===void 0||e.t!==w)return e={i:0,S:t,p:w.s,n:void 0,t:w,e:void 0,x:void 0,r:e},w.s!==void 0&&(w.s.n=e),w.s=e,t.n=e,32&w.f&&t.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=w.s,e.n=void 0,w.s.n=e,w.s=e),e}}function C(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e?.watched,this.Z=e?.unwatched,this.name=e?.name}C.prototype.brand=Mo,C.prototype.h=function(){return!0},C.prototype.S=function(t){var e=this,o=this.t;o!==t&&t.e===void 0&&(t.x=o,this.t=t,o!==void 0?o.e=t:kt(function(){var n;(n=e.W)==null||n.call(e)}))},C.prototype.U=function(t){var e=this;if(this.t!==void 0){var o=t.e,n=t.x;o!==void 0&&(o.x=n,t.e=void 0),n!==void 0&&(n.e=o,t.x=void 0),t===this.t&&(this.t=n,n===void 0&&kt(function(){var i;(i=e.Z)==null||i.call(e)}))}},C.prototype.subscribe=function(t){var e=this;return zo(function(){var o=e.value,n=w;w=void 0;try{t(o)}finally{w=n}},{name:"sub"})},C.prototype.valueOf=function(){return this.value},C.prototype.toString=function(){return this.value+""},C.prototype.toJSON=function(){return this.value},C.prototype.peek=function(){var t=w;w=void 0;try{return this.value}finally{w=t}},Object.defineProperty(C.prototype,"value",{get:function(){var t=Tt(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(Pe>100)throw new Error("Cycle detected");this.v=t,this.i++,pe++,z++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Be()}}}});function At(t,e){return new C(t,e)}function Ct(t){for(var e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Et(t){for(var e=t.s;e!==void 0;e=e.n){var o=e.S.n;if(o!==void 0&&(e.r=o),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Lt(t){for(var e=t.s,o=void 0;e!==void 0;){var n=e.p;e.i===-1?(e.S.U(e),n!==void 0&&(n.n=e.n),e.n!==void 0&&(e.n.p=n)):o=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=n}t.s=o}function U(t,e){C.call(this,void 0),this.x=t,this.s=void 0,this.g=pe-1,this.f=4,this.W=e?.watched,this.Z=e?.unwatched,this.name=e?.name}U.prototype=new C,U.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===pe))return!0;if(this.g=pe,this.f|=1,this.i>0&&!Ct(this))return this.f&=-2,!0;var t=w;try{Et(this),w=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(o){this.v=o,this.f|=16,this.i++}return w=t,Lt(this),this.f&=-2,!0},U.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}C.prototype.S.call(this,t)},U.prototype.U=function(t){if(this.t!==void 0&&(C.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}},U.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(U.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=Tt(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function Ho(t,e){return new U(t,e)}function It(t){var e=t.u;if(t.u=void 0,typeof e=="function"){z++;var o=w;w=void 0;try{e()}catch(n){throw t.f&=-2,t.f|=8,Re(t),n}finally{w=o,Be()}}}function Re(t){for(var e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,It(t)}function Oo(t){if(w!==this)throw new Error("Out-of-order effect");Lt(this),w=t,this.f&=-2,8&this.f&&Re(this),Be()}function V(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e?.name}V.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},V.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,It(this),Et(this),z++;var t=w;return w=this,Oo.bind(this,t)},V.prototype.N=function(){2&this.f||(this.f|=2,this.o=Q,Q=this)},V.prototype.d=function(){this.f|=8,1&this.f||Re(this)},V.prototype.dispose=function(){this.d()};function zo(t,e){var o=new V(t,e);try{o.c()}catch(i){throw o.d(),i}var n=o.d.bind(o);return n[Symbol.dispose]=n,n}const j=new Map;let Dt=!1;function Vo(t){if(!j.has(t)){const e=At(!1);return j.set(t,e),e}return j.get(t)}const jo=t=>{const e=j.get(t.key);e&&!e.value&&(e.value=!0)},qo=t=>{const e=j.get(t.key);e&&e.value&&(e.value=!1)},Wo=()=>{j.forEach(t=>{t.value&&(t.value=!1)})};function Go(){Dt||(window.addEventListener("keydown",jo),window.addEventListener("keyup",qo),window.addEventListener("blur",Wo),Dt=!0)}function Ko(t){const e=Vo(t),[o,n]=I(e.value);return F(()=>{Go();const i=e.subscribe(r=>{n(r)});return n(e.value),()=>{i()}},[t,e]),o??!1}const Yo=T("button")`
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
`,Jo={primary:{"--bg":"#1da1f2","--color":"white","--border":"none"},secondary:t=>({"--bg":t.inputBackground,"--color":t.textColor,"--border":`1px solid ${t.borderColor}`}),danger:{"--bg":"#dc3545","--color":"white","--border":"none"}},Zo={small:{"--padding":"6px 12px","--font-size":"12px"},medium:{"--padding":"8px 16px","--font-size":"14px"},large:{"--padding":"12px 24px","--font-size":"16px"}};function Qo({children:t,onClick:e,disabled:o=!1,variant:n="primary",size:i="medium",className:r="",style:s={},type:l="button"}){const{theme:d}=B(),f={...(()=>{const a=Jo[n];return typeof a=="function"?a(d):a})(),...Zo[i],"--cursor":o?"not-allowed":"pointer","--opacity":o?"0.6":"1",...s};return _(Yo,{className:r,style:f,onClick:e,disabled:o,type:l,children:t})}const Xo=T("label")`
  display: flex;
  align-items: center;
  cursor: var(--cursor);
  color: var(--text-color);
  opacity: var(--opacity);
`,en=T("input")`
  margin-right: 8px;
  accent-color: #1da1f2;
  cursor: var(--cursor);
`;function he({checked:t,defaultChecked:e,disabled:o=!1,onChange:n,children:i,className:r="",style:s={}}){const{theme:l}=B(),d={"--cursor":o?"not-allowed":"pointer","--text-color":l.textColor,"--opacity":o?"0.6":"1",...s};return _(Xo,{className:r,style:d,children:[_(en,{type:"checkbox",checked:t,defaultChecked:e,disabled:o,onChange:c=>n?.(c.currentTarget.checked),style:{"--cursor":o?"not-allowed":"pointer"}}),i]})}const tn=T("input")`
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
`;function Nt({type:t="text",value:e,defaultValue:o,placeholder:n,disabled:i=!1,onChange:r,onBlur:s,onFocus:l,className:d="",style:c={}}){const{theme:f}=B(),a={"--input-border":f.inputBorder,"--input-bg":f.inputBackground,"--input-text":f.textColor,...c};return _(tn,{type:t,value:e,defaultValue:o,placeholder:n,disabled:i,className:d,style:a,onChange:u=>r?.(u.currentTarget.value),onBlur:s,onFocus:l})}function $t({value:t,options:e,onChange:o,placeholder:n,className:i,style:r}){const{theme:s}=B(),l={padding:"6px 8px",borderRadius:"4px",border:`1px solid ${s.borderColor}`,backgroundColor:s.backgroundColor,color:s.textColor,fontSize:"14px",cursor:"pointer",outline:"none",...r};return _("select",{value:t,onChange:c=>{const f=c.target;o(f.value)},className:i,style:l,children:[n&&_("option",{value:"",disabled:!0,children:n}),e.map(c=>_("option",{value:c.value,children:c.label},c.value))]})}function on({className:t,style:e}){const{theme:o}=B(),{t:n,locale:i,setLocale:r}=$e(),s=[{value:"zh",label:"中文"},{value:"en",label:"English"}];return _("div",{className:t,style:{display:"flex",alignItems:"center",gap:"8px",...e},children:[_("label",{style:{fontSize:"14px",fontWeight:500,color:o.textColor,marginBottom:"0"},children:[n("common.language"),":"]}),_($t,{value:i,options:s,onChange:l=>r(l)})]})}function nn({value:t,onChange:e,className:o,style:n}){const{theme:i}=B(),{t:r}=$e(),s=[{value:"top",label:r("common.messagePlacement.top")},{value:"bottom",label:r("common.messagePlacement.bottom")},{value:"top-left",label:r("common.messagePlacement.topLeft")},{value:"top-right",label:r("common.messagePlacement.topRight")},{value:"bottom-left",label:r("common.messagePlacement.bottomLeft")},{value:"bottom-right",label:r("common.messagePlacement.bottomRight")}],l=d=>{e(d)};return _("div",{className:o,style:{display:"flex",alignItems:"center",gap:"8px",...n},children:[_("label",{style:{fontSize:"14px",fontWeight:500,color:i.textColor,marginBottom:"0"},children:[r("common.messagePlacement.label"),":"]}),_($t,{value:t,options:s,onChange:l})]})}const rn=T("div")`
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
`,sn=T("div")`
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
`;function an({isOpen:t,onClose:e,title:o,children:n,className:i="",style:r={}}){const{theme:s}=B();if(F(()=>{if(!t)return;const a=u=>{u.key==="Escape"&&e()};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[t,e]),!t)return null;const l={"--modal-bg":s.panelBackground,"--modal-text":s.textColor,...r},d={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:o?"20px":"0"},c={margin:0,color:s.textColor,fontSize:"20px",fontWeight:600},f={background:"none",border:"none",fontSize:"24px",cursor:"pointer",color:s.secondaryTextColor,padding:0,width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px",transition:"background-color 0.2s ease"};return _(rn,{onClick:e,children:_(sn,{className:i,style:l,onClick:a=>a.stopPropagation(),children:[_("div",{style:d,children:[o&&_("h2",{style:c,children:o}),_("button",{style:f,onClick:e,onMouseEnter:a=>{const u=a.target;u.style.backgroundColor=s.borderColor},onMouseLeave:a=>{const u=a.target;u.style.backgroundColor="transparent"},children:"×"})]}),_("div",{children:n})]})})}const ln=T("div")`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }
`,cn=T("div")`
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-header-bg);
  border-radius: 12px 12px 0 0;
`,dn=T("h3")`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
`,un=T("div")`
  padding: 20px;
`;function Fe({title:t,children:e,className:o="",style:n={}}){const{theme:i,isDark:r}=B(),s={"--card-bg":i.panelBackground,"--card-border":i.borderColor,"--card-header-bg":r?"rgba(255, 255, 255, 0.02)":"rgba(0, 0, 0, 0.01)","--card-title-color":i.textColor,...n};return _(ln,{className:o,style:s,children:[t&&_(cn,{children:_(dn,{children:t})}),_(un,{children:e})]})}function fn(t,e){const o=new bo(t,e),n=At(o.loadSettings()),i=Ho(()=>n.value),r=c=>{const f=o.saveSettings(c);n.value=f,window.dispatchEvent(new CustomEvent("x-downloader-settings-changed"))};return{get settings(){return i.value},updateSettings:r,resetSettings:()=>{const c=o.resetSettings();return n.value=c,window.dispatchEvent(new CustomEvent("x-downloader-settings-changed")),c},getSetting:c=>n.value[c],setSetting:(c,f)=>{r({[c]:f})},signal:n}}const _n=fn("x-downloader-settings",{fileName:"<%Userid> <%Tid>_p<%PicNo>",showDownloadButton:!0,videoFileName:"<%Userid> <%Tid>",showVideoDownloadButton:!1,showUniversalDownloadButton:!0,autoLikeOnDownload:!1,messagePlacement:"top"});function ge(){return _n}const pn={common:{ok:"确定",cancel:"取消",close:"关闭",reset:"重置",save:"保存",loading:"加载中...",error:"错误",success:"成功",warning:"警告",info:"信息",language:"语言",messagePlacement:{label:"消息弹窗位置",top:"顶部居中",bottom:"底部居中",topLeft:"左上角",topRight:"右上角",bottomLeft:"左下角",bottomRight:"右下角"}},button:{download:"下载",settings:"设置"}},hn={common:{ok:"OK",cancel:"Cancel",close:"Close",reset:"Reset",save:"Save",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Info",language:"Language",messagePlacement:{label:"Message Placement",top:"Top Center",bottom:"Bottom Center",topLeft:"Top Left",topRight:"Top Right",bottomLeft:"Bottom Left",bottomRight:"Bottom Right"}},button:{download:"Download",settings:"Settings"}},gn={title:"X(Twitter) Downloader 设置",settings:{image:{title:"图片下载设置",fileName:"图片文件名格式",fileNamePlaceholder:"<%Userid> <%Tid>_p<%PicNo>",fileNameHelp:"可用变量：<%Userid>、<%Tid>、<%Time>、<%PicName>、<%PicNo>",showButton:"显示图片下载按钮"},video:{title:"视频下载设置",fileName:"视频文件名格式",fileNamePlaceholder:"<%Userid> <%Tid>_video_<%Time>",fileNameHelp:"可用变量：<%Userid>、<%Tid>、<%Time>",showButton:"显示视频下载按钮"},universal:{title:"通用下载设置",showButton:"显示通用下载按钮",showButtonHelp:"在推文操作栏中显示统一的下载按钮，自动检测媒体类型",autoLike:"下载时自动点赞",autoLikeHelp:"下载图片或视频时自动为推文点赞"},reset:"重置为默认设置"},messages:{downloadStart:"开始下载",downloadSuccess:"下载成功",downloadError:"下载失败",noMediaFound:"未找到媒体文件",settingsReset:"设置已重置",imagesDownloadSuccess:"成功下载 {count} 张图片",videoDownloadSuccess:"视频下载成功",cannotRecognizeTweet:"无法识别推文，请重试",videoLinkNotFound:"未找到视频下载链接",tweetAlreadyLiked:"推文已点赞",likeSuccess:"点赞成功",likeButtonNotFound:"未找到点赞按钮",cannotGetAuthInfo:"无法获取认证信息",networkRequestFailed:"网络请求失败 ({status})",likeFailed:"点赞失败: {error}",likeResponseError:"点赞响应异常",downloadFailed:"下载失败",videoDownloadFailed:"视频下载失败",imageDownloadFailed:"图片下载失败"},ui:{downloading:"下载中...",downloadVideo:"下载视频",downloadImage:"下载原图",downloadImages:"下载 {count} 张图片",downloadVideos:"下载 {count} 个视频",copied:"已复制到剪贴板",copyFailed:"复制失败"}},mn={title:"X(Twitter) Downloader Settings",settings:{image:{title:"Image Download Settings",fileName:"Image filename format",fileNamePlaceholder:"<%Userid> <%Tid>_p<%PicNo>",fileNameHelp:"Available variables: <%Userid>, <%Tid>, <%Time>, <%PicName>, <%PicNo>",showButton:"Show image download button"},video:{title:"Video Download Settings",fileName:"Video filename format",fileNamePlaceholder:"<%Userid> <%Tid>_video_<%Time>",fileNameHelp:"Available variables: <%Userid>, <%Tid>, <%Time>",showButton:"Show video download button"},universal:{title:"Universal Download Settings",showButton:"Show universal download button",showButtonHelp:"Display unified download button in tweet actions, automatically detects media type",autoLike:"Auto-like on download",autoLikeHelp:"Automatically like the tweet when downloading images or videos"},reset:"Reset to default settings"},messages:{downloadStart:"Download started",downloadSuccess:"Download successful",downloadError:"Download failed",noMediaFound:"No media found",settingsReset:"Settings reset",imagesDownloadSuccess:"Successfully downloaded {count} images",videoDownloadSuccess:"Video download successful",cannotRecognizeTweet:"Cannot recognize tweet, please try again",videoLinkNotFound:"Video download link not found",tweetAlreadyLiked:"Tweet already liked",likeSuccess:"Like successful",likeButtonNotFound:"Like button not found",cannotGetAuthInfo:"Cannot get authentication info",networkRequestFailed:"Network request failed ({status})",likeFailed:"Like failed: {error}",likeResponseError:"Like response error",downloadFailed:"Download failed",videoDownloadFailed:"Video download failed",imageDownloadFailed:"Image download failed"},ui:{downloading:"Downloading...",downloadVideo:"Download Video",downloadImage:"Download Image",downloadImages:"Download {count} Images",downloadVideos:"Download {count} Videos",copied:"Copied to clipboard",copyFailed:"Copy failed"}};g.addTranslations("zh",{...pn,...gn}),g.addTranslations("en",{...hn,...mn});function vn({isOpen:t,onClose:e}){const{settings:o,setSetting:n,resetSettings:i}=ge(),{t:r}=$e(),{theme:s,isDark:l}=B(),[d,c]=I(0),f={display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"16px",padding:"16px",marginBottom:"20px",background:l?"rgba(255, 255, 255, 0.02)":"rgba(0, 0, 0, 0.01)",border:`1px solid ${s.borderColor}`,borderRadius:"8px"},a={marginBottom:"20px"},u={display:"block",marginBottom:"8px",fontWeight:500,fontSize:"14px",color:s.textColor},p={marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor,paddingLeft:"24px"};return _(an,{isOpen:t,onClose:e,title:r("title"),children:_("div",{children:[_("div",{style:f,children:[_("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap",flex:"1",minWidth:"0"},children:[_(on,{}),_(nn,{value:o.messagePlacement,onChange:h=>n("messagePlacement",h)})]}),_(Qo,{variant:"secondary",style:{flexShrink:0},onClick:()=>{i(),c(h=>h+1)},children:r("settings.reset")})]}),_(Fe,{title:r("settings.image.title"),children:[_("div",{style:a,children:[_("label",{style:u,children:r("settings.image.fileName")}),_(Nt,{value:o.fileName,onChange:h=>n("fileName",h),placeholder:r("settings.image.fileNamePlaceholder")}),_("div",{style:{marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor},children:r("settings.image.fileNameHelp")})]}),_(he,{checked:o.showDownloadButton,onChange:h=>n("showDownloadButton",h),children:r("settings.image.showButton")})]}),_(Fe,{title:r("settings.video.title"),children:[_("div",{style:a,children:[_("label",{style:u,children:r("settings.video.fileName")}),_(Nt,{value:o.videoFileName,onChange:h=>n("videoFileName",h),placeholder:r("settings.video.fileNamePlaceholder")}),_("div",{style:{marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor},children:r("settings.video.fileNameHelp")})]}),_(he,{checked:o.showVideoDownloadButton,onChange:h=>n("showVideoDownloadButton",h),children:r("settings.video.showButton")})]}),_(Fe,{title:r("settings.universal.title"),children:[_("div",{children:[_(he,{checked:o.showUniversalDownloadButton,onChange:h=>n("showUniversalDownloadButton",h),children:r("settings.universal.showButton")}),_("div",{style:p,children:r("settings.universal.showButtonHelp")})]}),_("div",{style:{marginTop:"16px"},children:[_(he,{checked:o.autoLikeOnDownload,onChange:h=>n("autoLikeOnDownload",h),children:r("settings.universal.autoLike")}),_("div",{style:p,children:r("settings.universal.autoLikeHelp")})]})]})]},d)})}function wn(){const[t,e]=I(!1);return _(K,{children:[_(yo,{onClick:()=>e(!t),isSettingsPanelOpen:t}),_(vn,{isOpen:t,onClose:()=>e(!1)})]})}const yn=go`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`,bn=T("button")`
  position: absolute;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.9);
  cursor: pointer;
  opacity: 0.8;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform: scale(1);
  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);

  &:hover:not(:disabled) {
    opacity: 1;
    transform: scale(1.05);
  }
`,Bt=T("svg")`
  width: var(--icon-width, 20px);
  height: var(--icon-height, 20px);
  fill: var(--icon-color, white);
`,xn=T("svg")`
  width: var(--icon-width, 18px);
  height: var(--icon-height, 18px);
  animation: ${yn} 1s linear infinite;
  fill: none;
  color: var(--icon-color, white);
`,Sn=_(Bt,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:_("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})}),kn=_(xn,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:_("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none",strokeDasharray:"31.416",strokeDashoffset:"15.708"})}),Tn=_(Bt,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:_("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"})});function Pt({title:t,isDownloading:e=!1,disabled:o=!1,icon:n=Sn,shiftIcon:i=Tn,loadingIcon:r=kn,style:s={},className:l="",onClick:d}){const c=o||e,f=Ko("Shift"),a=h=>{xo(h),!c&&d?.(h,f)},u=h=>{const x={};for(const[b,v]of Object.entries(h)){const m=`--${b.replace(/[A-Z]/g,"-$&").toLowerCase()}`;x[m]=v}return x},p={"--cursor":c?"not-allowed":"pointer","--opacity":e?"0.5":"0.8","--transform":e?"scale(0.95)":"scale(1)","--hover-transform":e?"scale(0.95)":"scale(1.05)",...!s.top&&!s.bottom&&{"--bottom":"8px"},...!s.right&&!s.left&&{"--right":"8px"},...u(s)};return _(bn,{className:l,style:p,onClick:a,onMouseDown:h=>(h.preventDefault(),!1),title:t,disabled:c,children:e?r:f&&i?i:n})}const An="https://x.com/i/api/graphql/_8aYOgEDz35BrBcBal1-_w/TweetDetail",Cn="Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",En={rweb_video_screen_enabled:!1,profile_label_improvements_pcf_label_in_post_enabled:!0,rweb_tipjar_consumption_enabled:!0,verified_phone_label_enabled:!1,creator_subscriptions_tweet_preview_api_enabled:!0,responsive_web_graphql_timeline_navigation_enabled:!0,responsive_web_graphql_skip_user_profile_image_extensions_enabled:!1,premium_content_api_read_enabled:!1,communities_web_enable_tweet_community_results_fetch:!0,c9s_tweet_anatomy_moderator_badge_enabled:!0,responsive_web_grok_analyze_button_fetch_trends_enabled:!1,responsive_web_grok_analyze_post_followups_enabled:!0,responsive_web_jetfuel_frame:!1,responsive_web_grok_share_attachment_enabled:!0,articles_preview_enabled:!0,responsive_web_edit_tweet_api_enabled:!0,graphql_is_translatable_rweb_tweet_is_translatable_enabled:!0,view_counts_everywhere_api_enabled:!0,longform_notetweets_consumption_enabled:!0,responsive_web_twitter_article_tweet_consumption_enabled:!0,tweet_awards_web_tipping_enabled:!1,responsive_web_grok_show_grok_translated_post:!1,responsive_web_grok_analysis_button_from_backend:!1,creator_subscriptions_quote_tweet_preview_enabled:!1,freedom_of_speech_not_reach_fetch_enabled:!0,standardized_nudges_misinfo:!0,tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled:!0,longform_notetweets_rich_text_read_enabled:!0,longform_notetweets_inline_media_enabled:!0,responsive_web_grok_image_annotation_enabled:!0,responsive_web_enhance_cards_enabled:!1},Ln={withArticlePlainText:!1,withArticleRichContentState:!0,withDisallowedReplyControls:!1,withGrokAnalyze:!1},In=encodeURIComponent(JSON.stringify(En)),Dn=encodeURIComponent(JSON.stringify(Ln)),Nn=`features=${In}&fieldToggles=${Dn}`,$n='","rankingMode":"Relevance","includePromotedContent":false,"withCommunity":false,"withQuickPromoteEligibilityTweetFields":false,"withBirdwatchNotes":false,"withVoice":false}',Bn=[["Authorization",Cn],["x-twitter-active-user","yes"],["Content-Type","application/json"]];let q;const Pn=t=>{const e=encodeURIComponent(`{"focalTweetId":"${t}${$n}`);return`${An}?${Nn}&variables=${e}`};function Rn(t){if(!Array.isArray(t)||t.length===0)return;const e=t.find(i=>i.type==="video"||i.type==="animated_gif");if(!e||!e.video_info||!Array.isArray(e.video_info.variants))return;const o=e.video_info.variants.filter(i=>i.content_type==="video/mp4"&&i.url);return o.length===0?void 0:o.reduce((i,r)=>(r.bitrate||0)>=(i.bitrate||0)?r:i).url}function Fn(t,e){try{const n=t.data.threaded_conversation_with_injections_v2.instructions.find(i=>i.type==="TimelineAddEntries");if(!n||!Array.isArray(n.entries))return[];for(const i of n.entries){const{content:r,entryId:s}=i,{entryType:l,itemContent:d}=r;if(s===`tweet-${e}`&&l==="TimelineTimelineItem"&&d?.itemType==="TimelineTweet"&&d.tweet_results?.result?.legacy?.extended_entities?.media)return d.tweet_results.result.legacy.extended_entities.media}return[]}catch{return[]}}function Un(){if(q)return q;const t=document.querySelector('meta[name="csrf-token"]');if(t){const o=t.getAttribute("content")||void 0;if(o)return q=o,o}const e=document.cookie.split(";");for(const o of e){const[n,i]=o.trim().split("=");if(n==="ct0"&&i)return q=decodeURIComponent(i),q}}async function Mn(t,e){const o=new Headers(Bn);o.set("x-csrf-token",e),o.set("User-Agent",navigator.userAgent);const n=await fetch(Pn(t),{method:"GET",headers:o,credentials:"include"});if(!n.ok)throw new Error(`Failed to fetch tweet data: ${n.status} ${n.statusText}`);return await n.json()}async function Hn(t){try{const e=Un();if(!e)throw new Error("Could not find CSRF token");const o=await Mn(t,e),n=Fn(o,t);return Rn(n)}catch(e){throw q=void 0,e}}function On(t){let e=t.parentElement;for(;e&&e.tagName!=="BODY";){if(e.hasAttribute("data-testid")&&e.getAttribute("data-testid")==="videoComponent")return e;e=e.parentElement}return null}function zn(t){let e=t.parentElement;for(;e&&e.tagName!=="BODY";){if(e.hasAttribute("data-testid")&&e.getAttribute("data-testid")==="videoPlayer")return e;e=e.parentElement}return null}function Vn(t){const o=`; ${document.cookie}`.split(`; ${t}=`);return o.length===2&&o.pop()?.split(";").shift()||null}const jn='button[data-testid="like"]',Ue='button[data-testid="unlike"]',qn=5,Wn=200,Gn="https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet",Kn="Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";async function Rt(t,e){try{if(t){const o=await Yn(t);if(o==="success"||o==="already-liked")return{success:!0}}return await Qn(e)}catch(o){const n=o instanceof Error?o.message:String(o);return{success:!1,message:g.t("messages.likeFailed",{error:n})}}}async function Yn(t){if(t.querySelector(Ue))return"already-liked";const o=t.querySelector(jn);if(!o)return"fallback";try{o.click()}catch{return"fallback"}return await Jn(t,o)?(A.info(g.t("messages.likeSuccess")),"success"):"fallback"}async function Jn(t,e){for(let i=0;i<qn;i++){if(t.querySelector(Ue))return!0;const s=e.getAttribute("data-testid"),l=e.getAttribute("aria-pressed");if(s==="unlike"||l==="true")return!0;await new Promise(d=>window.setTimeout(d,Wn))}return t.querySelector(Ue)||e.getAttribute("data-testid")==="unlike"?!0:e.getAttribute("aria-pressed")==="true"}function Zn(){const t=Vn("ct0"),e=document.cookie;return!t||!e?null:{accept:"*/*","accept-language":"en-US,en;q=0.9",authorization:Kn,"content-type":"application/json","x-csrf-token":t,"x-twitter-active-user":"yes","x-twitter-auth-type":"OAuth2Session","x-twitter-client-language":"en",cookie:e}}async function Qn(t){const e=Zn();if(!e)return{success:!1,message:g.t("messages.cannotGetAuthInfo")};const o={variables:{tweet_id:t},queryId:"lI07N6Otwv1PhnEgXILM7A"};try{const n=await fetch(Gn,{method:"POST",headers:e,body:JSON.stringify(o)});if(!n.ok)return{success:!1,message:g.t("messages.networkRequestFailed",{status:n.status})};const{errors:i,data:r}=await n.json();if(i&&i.length>0){const[s]=i,{code:l,name:d,message:c}=s||{};if(l===139&&d==="AuthorizationError")return A.info(g.t("messages.tweetAlreadyLiked")),{success:!0};const f=c||"未知错误";return{success:!1,message:g.t("messages.likeFailed",{error:f})}}return r?.favorite_tweet==="Done"?(A.info(g.t("messages.likeSuccess")),{success:!0}):{success:!1,message:g.t("messages.likeResponseError")}}catch(n){const i=n instanceof Error?n.message:String(n);return{success:!1,message:g.t("messages.likeFailed",{error:i})}}}function Ft(t,e=g.t("messages.downloadFailed")){const o=t instanceof Error?t.message:String(t);A.error(`${e}: ${o}`)}function Ut(t){let e=t;for(;e&&e.tagName!=="BODY";){if(e.tagName==="ARTICLE"&&e.getAttribute("data-testid")==="tweet"||e.getAttribute("role")==="dialog")return e;e=e.parentElement}return null}function Xn(t,e=""){let o=t;for(;o&&o.tagName!=="BODY";){if(o.tagName==="ARTICLE"&&o.hasAttribute("data-testid")&&o.getAttribute("data-testid")==="tweet"){const r=o.querySelectorAll(`a[href*="${e}/status/"]`);for(const s of Array.from(r)){const d=s.href.match(/\/status\/(\d+)/);if(d)return d[1]}}o=o.parentElement}const n=window.location.href.match(/\/status\/(\d+)/);if(n)return n[1]}function X(t){const e=t.closest('[role="link"]');if(e&&e.querySelector("time"))return!0;const o=t.closest('[id^="id"]:not([aria-labelledby])');return!!(o&&o.querySelector("time"))}function er(t){const e=t.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');return Array.from(e).some(o=>!X(o))}function tr(t){const e=t.querySelectorAll("video");return Array.from(e).some(o=>!X(o))}function Mt(t){const e=t.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');return Array.from(e).filter(o=>!X(o))}function Ht(t){const e=t.querySelectorAll("video");return Array.from(e).filter(o=>!X(o))}function or(t){try{const e=t.querySelector('[data-testid="User-Name"]');if(e){const n=e.querySelector('a[href^="/"]');if(n){const i=n.getAttribute("href");if(i&&i.startsWith("/")){const r=i.slice(1).split("/")[0];if(r)return r}}}const o=t.querySelector('a[href*="/status/"]');return o?de(o.href).userid:de(window.location.href).userid}catch{return}}function nr(t){let e=t;for(let o=0;o<20&&e;o++)if(e=e.parentElement,e?.tagName.toLowerCase()==="a")return e;return null}const Me=async({setIsDownloading:t,targetImage:e,settings:o,skipAutoLike:n=!1,imageIndex:i,isShiftPressed:r=!1,tweetContainer:s})=>{t(!0);const{picname:l,ext:d}=So(e.src);let c;if(window.location.href.includes("photo"))c=de(window.location.href);else{const p=nr(e);if(!p)return;c=de(p.href)}const f=i||parseInt(c.picno)-1,a=mt(o.fileName,{Userid:c.userid,Tid:c.tid,Time:`${Date.now()}`,PicName:l,PicNo:`${f}`}),u=`https://pbs.twimg.com/media/${l}?format=${d}&name=orig`;try{if(r){await St(u);return}if(await gt(u,`${a}.${d}`),o.autoLikeOnDownload&&c.tid&&!n){const p=await Rt(s,c.tid);!p.success&&p.message&&A.error(p.message)}}catch(p){Ft(p,g.t("messages.imageDownloadFailed"))}finally{t(!1)}};function rr({targetImage:t,tweetContainer:e}){const{settings:o}=ge(),[n,i]=I(!1);return o.showDownloadButton?_(Pt,{isDownloading:n,onClick:(r,s)=>Me({setIsDownloading:i,targetImage:t,settings:o,isShiftPressed:s,tweetContainer:e}),title:g.t("ui.downloadImage"),style:{bottom:"8px",right:"8px"}}):null}const Ot=async({setIsDownloading:t,src:e,tweetContainer:o,settings:n,skipAutoLike:i=!1,isShiftPressed:r=!1})=>{t(!0);try{const s=or(o),l=Xn(o,s);if(!l){A.error(g.t("messages.cannotRecognizeTweet"));return}const d=e&&e.startsWith("https://video.twimg.com")?e:await Hn(l);if(!d){A.error(g.t("messages.videoLinkNotFound"));return}if(r){await St(d);return}const c={userid:s,tid:l},f=mt(n.videoFileName,{Userid:c.userid||"unknown",Tid:c.tid,Time:`${Date.now()}`});if(await gt(d,`${f}.mp4`),n.autoLikeOnDownload&&l&&!i){const a=await Rt(o,l);!a.success&&a.message&&A.error(a.message)}}catch(s){Ft(s,g.t("messages.videoDownloadFailed"))}finally{t(!1)}};function ir({src:t,tweetContainer:e}){const{settings:o}=ge(),[n,i]=I(!1);return o.showVideoDownloadButton?_(Pt,{isDownloading:n,onClick:(r,s)=>Ot({setIsDownloading:i,src:t,tweetContainer:e,settings:o,isShiftPressed:s}),title:n?g.t("ui.downloading"):g.t("ui.downloadVideo"),style:{bottom:"70px",right:"8px"}}):null}const sr=T("button")`
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
`,ar=T("svg")`
  width: 18.75px;
  height: 18.75px;
  fill: currentColor;
`;function lr({tweetContainer:t}){const{settings:e}=ge(),[o,n]=I(!1),[i,r]=I("none"),s=window.location.href;if(F(()=>{let u=null;const p=()=>{if(er(t)){r("image");return}if(tr(t)){r("video");return}r("none")},h=()=>{u!==null&&clearTimeout(u),u=setTimeout(p,100)};p();const x=new MutationObserver(h);return x.observe(t,{childList:!0,subtree:!0,attributes:!1,characterData:!1}),()=>{x.disconnect(),u!==null&&clearTimeout(u)}},[t]),i==="none"||!e.showUniversalDownloadButton)return null;const l=()=>{},d=async u=>{if(s.includes("/photo/")&&u.nodeName!=="ARTICLE"){const m=s.match(/\/photo\/(\d+)/),E=m&&m[1]?parseInt(m[1])-1:0,L=u.querySelector('[aria-roledescription="carousel"]');if(L){const M=L.querySelectorAll(zt)[E];if(M){await Me({setIsDownloading:l,targetImage:M,settings:e,imageIndex:E,tweetContainer:u}),A.success(g.t("messages.imagesDownloadSuccess",{count:1}));return}}throw new Error("Image not found in preview mode")}const h=Mt(u).map((m,E)=>m?Me({setIsDownloading:l,targetImage:m,settings:e,skipAutoLike:E>0,imageIndex:E,tweetContainer:u}):Promise.resolve()),x=await Promise.allSettled(h),b=x.filter(m=>m.status==="rejected"),v=x.length-b.length;v===0?A.error(g.t("messages.imageDownloadFailed")):b.length>0?A.warning(g.t("messages.imagesDownloadSuccess",{count:`${v}/${x.length}`})):A.success(g.t("messages.imagesDownloadSuccess",{count:x.length}))},c=async u=>{const h=Ht(u)[0];h&&Ot({setIsDownloading:l,src:h.src,tweetContainer:u,settings:e}).then(()=>A.success(g.t("messages.videoDownloadSuccess")))};return _(sr,{onClick:async u=>{if(!o){u.stopPropagation(),n(!0);try{i==="image"?await d(t):i==="video"&&await c(t)}finally{n(!1)}}},disabled:o,title:(()=>{if(o)return g.t("ui.downloading");let u=Mt(t).length,p=Ht(t).length;return["/photo/","/video/"].some(h=>s.includes(h))&&(u=1,p=1),i==="image"?u>1?g.t("ui.downloadImages",{count:u}):g.t("ui.downloadImage"):p>1?g.t("ui.downloadVideos",{count:p}):g.t("ui.downloadVideo")})(),children:_(ar,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:_("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})})})}const zt='img[src^="https://pbs.twimg.com/media/"]',cr="video",Vt=new WeakSet,jt=new WeakSet,qt=new WeakSet,dr=()=>JSON.parse(localStorage.getItem("x-downloader-settings")||"{}"),Wt=(t,e,o)=>{const n=document.createElement("div");n.style.display="none",t.appendChild(n);const i=()=>{const r=dr()[e]!==!1;n.style.display=r?"block":"none",r&&o(n)};o(n),t.addEventListener("mouseenter",i),t.addEventListener("mouseleave",()=>n.style.display="none")},ur=t=>{getComputedStyle(t).position==="static"&&(t.style.position="relative")};function Gt(t){if(qt.has(t))return;const e=Array.from(t.querySelectorAll('div[role="group"]')).find(r=>{const s=r.getAttribute("aria-label");return s&&s.includes("likes")});if(!e)return;const o=document.createElement("div");o.style.cssText="display: inline-flex; align-items: center; margin-left: auto;",e.appendChild(o);const n=()=>Y(_(lr,{tweetContainer:t}),o);n();let i=null;e.addEventListener("mouseenter",()=>{i&&clearTimeout(i),i=window.setTimeout(n,50)}),qt.add(t)}const Kt=t=>!!t.src&&t.src.startsWith("https://pbs.twimg.com/media/");function Yt(t){if(Vt.has(t)||!Kt(t))return;const e=Ut(t);e&&Gt(e);const o=t.parentElement?.parentElement;o&&(ur(o),Wt(o,"showDownloadButton",n=>{Y(_(rr,{targetImage:t,tweetContainer:e}),n)}),Vt.add(t))}function Jt(t){if(jt.has(t)||X(t))return;const e=Ut(t);if(!e)return;Gt(e);const o=On(t)||zn(t);o&&(Wt(o,"showVideoDownloadButton",n=>{Y(_(ir,{src:t.src,tweetContainer:e}),n)}),jt.add(t))}const fr=t=>{t instanceof HTMLImageElement&&Kt(t)?Yt(t):t.firstChild instanceof HTMLVideoElement?Jt(t.firstChild):(t instanceof Element||t instanceof Document||t instanceof DocumentFragment)&&(t.querySelectorAll(zt).forEach(e=>Yt(e)),t.querySelectorAll(cr).forEach(e=>Jt(e)))};function _r(){const t=new Set;let e=null;const o=r=>{t.add(r),e===null&&(e=requestAnimationFrame(()=>{e=null,t.forEach(s=>{fr(s)}),t.clear()}))};o(document);const n=new MutationObserver(r=>{r.forEach(s=>{s.addedNodes.forEach(l=>{o(l)})})});n.observe(document.body,{childList:!0,subtree:!0,attributes:!1,characterData:!1});const i=()=>{n.disconnect(),e!==null&&(cancelAnimationFrame(e),e=null),t.clear()};window.addEventListener("beforeunload",i)}function Zt(){const t=document.createElement("div");t.id="x-downloader-app",document.body.appendChild(t),Y(_(wn,{}),t),_r()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Zt):Zt()})();
