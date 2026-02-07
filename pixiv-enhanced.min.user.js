// ==UserScript==
// @name         Pixiv Enhanced
// @name:zh-CN   Pixiv 增强
// @author       mengshouer
// @version      0.1.0
// @description  Enhance Pixiv with download and more features. Settings available by hovering mouse to the bottom left corner or via Tampermonkey menu.
// @description:zh-CN  增强 Pixiv，提供下载等功能。鼠标移入浏览器左下角或油猴菜单可打开设置。
// @include      *://www.pixiv.net/artworks/*
// @include      *://pixiv.net/artworks/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @license      GPL-3.0 License
// @namespace    https://github.com/mengshouer/UserScripts
// ==/UserScript==

(function(){"use strict";var et,m,Ut,z,Rt,Ft,jt,Ot,vt,yt,bt,O={},Wt=[],Ue=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ot=Array.isArray;function E(e,t){for(var o in t)e[o]=t[o];return e}function wt(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function xt(e,t,o){var n,i,r,s={};for(r in t)r=="key"?n=t[r]:r=="ref"?i=t[r]:s[r]=t[r];if(arguments.length>2&&(s.children=arguments.length>3?et.call(arguments,2):o),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)s[r]===void 0&&(s[r]=e.defaultProps[r]);return nt(e,s,n,i,null)}function nt(e,t,o,n,i){var r={type:e,props:t,key:o,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Ut,__i:-1,__u:0};return i==null&&m.vnode!=null&&m.vnode(r),r}function W(e){return e.children}function rt(e,t){this.props=e,this.context=t}function D(e,t){if(t==null)return e.__?D(e.__,e.__i+1):null;for(var o;t<e.__k.length;t++)if((o=e.__k[t])!=null&&o.__e!=null)return o.__e;return typeof e.type=="function"?D(e):null}function Yt(e){var t,o;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((o=e.__k[t])!=null&&o.__e!=null){e.__e=e.__c.base=o.__e;break}return Yt(e)}}function Gt(e){(!e.__d&&(e.__d=!0)&&z.push(e)&&!it.__r++||Rt!=m.debounceRendering)&&((Rt=m.debounceRendering)||Ft)(it)}function it(){for(var e,t,o,n,i,r,s,a=1;z.length;)z.length>a&&z.sort(jt),e=z.shift(),a=z.length,e.__d&&(o=void 0,n=void 0,i=(n=(t=e).__v).__e,r=[],s=[],t.__P&&((o=E({},n)).__v=n.__v+1,m.vnode&&m.vnode(o),St(t.__P,o,n,t.__n,t.__P.namespaceURI,32&n.__u?[i]:null,r,i??D(n),!!(32&n.__u),s),o.__v=n.__v,o.__.__k[o.__i]=o,Zt(r,o,s),n.__e=n.__=null,o.__e!=i&&Yt(o)));it.__r=0}function qt(e,t,o,n,i,r,s,a,d,c,f){var l,p,_,h,k,x,y,v=n&&n.__k||Wt,N=t.length;for(d=Re(o,t,v,d,N),l=0;l<N;l++)(_=o.__k[l])!=null&&(p=_.__i==-1?O:v[_.__i]||O,_.__i=l,x=St(e,_,p,i,r,s,a,d,c,f),h=_.__e,_.ref&&p.ref!=_.ref&&(p.ref&&Ct(p.ref,null,_),f.push(_.ref,_.__c||h,_)),k==null&&h!=null&&(k=h),(y=!!(4&_.__u))||p.__k===_.__k?d=Kt(_,d,e,y):typeof _.type=="function"&&x!==void 0?d=x:h&&(d=h.nextSibling),_.__u&=-7);return o.__e=k,d}function Re(e,t,o,n,i){var r,s,a,d,c,f=o.length,l=f,p=0;for(e.__k=new Array(i),r=0;r<i;r++)(s=t[r])!=null&&typeof s!="boolean"&&typeof s!="function"?(typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?s=e.__k[r]=nt(null,s,null,null,null):ot(s)?s=e.__k[r]=nt(W,{children:s},null,null,null):s.constructor===void 0&&s.__b>0?s=e.__k[r]=nt(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):e.__k[r]=s,d=r+p,s.__=e,s.__b=e.__b+1,a=null,(c=s.__i=Fe(s,o,d,l))!=-1&&(l--,(a=o[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(i>f?p--:i<f&&p++),typeof s.type!="function"&&(s.__u|=4)):c!=d&&(c==d-1?p--:c==d+1?p++:(c>d?p--:p++,s.__u|=4))):e.__k[r]=null;if(l)for(r=0;r<f;r++)(a=o[r])!=null&&(2&a.__u)==0&&(a.__e==n&&(n=D(a)),te(a,a));return n}function Kt(e,t,o,n){var i,r;if(typeof e.type=="function"){for(i=e.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=e,t=Kt(i[r],t,o,n));return t}e.__e!=t&&(n&&(t&&e.type&&!t.parentNode&&(t=D(e)),o.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Fe(e,t,o,n){var i,r,s,a=e.key,d=e.type,c=t[o],f=c!=null&&(2&c.__u)==0;if(c===null&&a==null||f&&a==c.key&&d==c.type)return o;if(n>(f?1:0)){for(i=o-1,r=o+1;i>=0||r<t.length;)if((c=t[s=i>=0?i--:r++])!=null&&(2&c.__u)==0&&a==c.key&&d==c.type)return s}return-1}function Jt(e,t,o){t[0]=="-"?e.setProperty(t,o??""):e[t]=o==null?"":typeof o!="number"||Ue.test(t)?o:o+"px"}function st(e,t,o,n,i){var r,s;t:if(t=="style")if(typeof o=="string")e.style.cssText=o;else{if(typeof n=="string"&&(e.style.cssText=n=""),n)for(t in n)o&&t in o||Jt(e.style,t,"");if(o)for(t in o)n&&o[t]==n[t]||Jt(e.style,t,o[t])}else if(t[0]=="o"&&t[1]=="n")r=t!=(t=t.replace(Ot,"$1")),s=t.toLowerCase(),t=s in e||t=="onFocusOut"||t=="onFocusIn"?s.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+r]=o,o?n?o.u=n.u:(o.u=vt,e.addEventListener(t,r?bt:yt,r)):e.removeEventListener(t,r?bt:yt,r);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=o??"";break t}catch{}typeof o=="function"||(o==null||o===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&o==1?"":o))}}function Xt(e){return function(t){if(this.l){var o=this.l[t.type+e];if(t.t==null)t.t=vt++;else if(t.t<o.u)return;return o(m.event?m.event(t):t)}}}function St(e,t,o,n,i,r,s,a,d,c){var f,l,p,_,h,k,x,y,v,N,M,gt,Q,Ve,mt,tt,Vt,P=t.type;if(t.constructor!==void 0)return null;128&o.__u&&(d=!!(32&o.__u),r=[a=t.__e=o.__e]),(f=m.__b)&&f(t);t:if(typeof P=="function")try{if(y=t.props,v="prototype"in P&&P.prototype.render,N=(f=P.contextType)&&n[f.__c],M=f?N?N.props.value:f.__:n,o.__c?x=(l=t.__c=o.__c).__=l.__E:(v?t.__c=l=new P(y,M):(t.__c=l=new rt(y,M),l.constructor=P,l.render=Oe),N&&N.sub(l),l.state||(l.state={}),l.__n=n,p=l.__d=!0,l.__h=[],l._sb=[]),v&&l.__s==null&&(l.__s=l.state),v&&P.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=E({},l.__s)),E(l.__s,P.getDerivedStateFromProps(y,l.__s))),_=l.props,h=l.state,l.__v=t,p)v&&P.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),v&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(v&&P.getDerivedStateFromProps==null&&y!==_&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(y,M),t.__v==o.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(y,l.__s,M)===!1){for(t.__v!=o.__v&&(l.props=y,l.state=l.__s,l.__d=!1),t.__e=o.__e,t.__k=o.__k,t.__k.some(function(j){j&&(j.__=t)}),gt=0;gt<l._sb.length;gt++)l.__h.push(l._sb[gt]);l._sb=[],l.__h.length&&s.push(l);break t}l.componentWillUpdate!=null&&l.componentWillUpdate(y,l.__s,M),v&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(_,h,k)})}if(l.context=M,l.props=y,l.__P=e,l.__e=!1,Q=m.__r,Ve=0,v){for(l.state=l.__s,l.__d=!1,Q&&Q(t),f=l.render(l.props,l.state,l.context),mt=0;mt<l._sb.length;mt++)l.__h.push(l._sb[mt]);l._sb=[]}else do l.__d=!1,Q&&Q(t),f=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++Ve<25);l.state=l.__s,l.getChildContext!=null&&(n=E(E({},n),l.getChildContext())),v&&!p&&l.getSnapshotBeforeUpdate!=null&&(k=l.getSnapshotBeforeUpdate(_,h)),tt=f,f!=null&&f.type===W&&f.key==null&&(tt=Qt(f.props.children)),a=qt(e,ot(tt)?tt:[tt],t,o,n,i,r,s,a,d,c),l.base=t.__e,t.__u&=-161,l.__h.length&&s.push(l),x&&(l.__E=l.__=null)}catch(j){if(t.__v=null,d||r!=null)if(j.then){for(t.__u|=d?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;r[r.indexOf(a)]=null,t.__e=a}else{for(Vt=r.length;Vt--;)wt(r[Vt]);kt(t)}else t.__e=o.__e,t.__k=o.__k,j.then||kt(t);m.__e(j,t,o)}else r==null&&t.__v==o.__v?(t.__k=o.__k,t.__e=o.__e):a=t.__e=je(o.__e,t,o,n,i,r,s,d,c);return(f=m.diffed)&&f(t),128&t.__u?void 0:a}function kt(e){e&&e.__c&&(e.__c.__e=!0),e&&e.__k&&e.__k.forEach(kt)}function Zt(e,t,o){for(var n=0;n<o.length;n++)Ct(o[n],o[++n],o[++n]);m.__c&&m.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(r){r.call(i)})}catch(r){m.__e(r,i.__v)}})}function Qt(e){return typeof e!="object"||e==null||e.__b&&e.__b>0?e:ot(e)?e.map(Qt):E({},e)}function je(e,t,o,n,i,r,s,a,d){var c,f,l,p,_,h,k,x=o.props||O,y=t.props,v=t.type;if(v=="svg"?i="http://www.w3.org/2000/svg":v=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(c=0;c<r.length;c++)if((_=r[c])&&"setAttribute"in _==!!v&&(v?_.localName==v:_.nodeType==3)){e=_,r[c]=null;break}}if(e==null){if(v==null)return document.createTextNode(y);e=document.createElementNS(i,v,y.is&&y),a&&(m.__m&&m.__m(t,r),a=!1),r=null}if(v==null)x===y||a&&e.data==y||(e.data=y);else{if(r=r&&et.call(e.childNodes),!a&&r!=null)for(x={},c=0;c<e.attributes.length;c++)x[(_=e.attributes[c]).name]=_.value;for(c in x)if(_=x[c],c!="children"){if(c=="dangerouslySetInnerHTML")l=_;else if(!(c in y)){if(c=="value"&&"defaultValue"in y||c=="checked"&&"defaultChecked"in y)continue;st(e,c,null,_,i)}}for(c in y)_=y[c],c=="children"?p=_:c=="dangerouslySetInnerHTML"?f=_:c=="value"?h=_:c=="checked"?k=_:a&&typeof _!="function"||x[c]===_||st(e,c,_,x[c],i);if(f)a||l&&(f.__html==l.__html||f.__html==e.innerHTML)||(e.innerHTML=f.__html),t.__k=[];else if(l&&(e.innerHTML=""),qt(t.type=="template"?e.content:e,ot(p)?p:[p],t,o,n,v=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,s,r?r[0]:o.__k&&D(o,0),a,d),r!=null)for(c=r.length;c--;)wt(r[c]);a||(c="value",v=="progress"&&h==null?e.removeAttribute("value"):h!=null&&(h!==e[c]||v=="progress"&&!h||v=="option"&&h!=x[c])&&st(e,c,h,x[c],i),c="checked",k!=null&&k!=e[c]&&st(e,c,k,x[c],i))}return e}function Ct(e,t,o){try{if(typeof e=="function"){var n=typeof e.__u=="function";n&&e.__u(),n&&t==null||(e.__u=e(t))}else e.current=t}catch(i){m.__e(i,o)}}function te(e,t,o){var n,i;if(m.unmount&&m.unmount(e),(n=e.ref)&&(n.current&&n.current!=e.__e||Ct(n,null,t)),(n=e.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(r){m.__e(r,t)}n.base=n.__P=null}if(n=e.__k)for(i=0;i<n.length;i++)n[i]&&te(n[i],t,o||typeof e.type!="function");o||wt(e.__e),e.__c=e.__=e.__e=void 0}function Oe(e,t,o){return this.constructor(e,o)}function $t(e,t,o){var n,i,r,s;t==document&&(t=document.documentElement),m.__&&m.__(e,t),i=(n=!1)?null:t.__k,r=[],s=[],St(t,e=t.__k=xt(W,null,[e]),i||O,O,t.namespaceURI,i?null:t.firstChild?et.call(t.childNodes):null,r,i?i.__e:t.firstChild,n,s),Zt(r,e,s)}et=Wt.slice,m={__e:function(e,t,o,n){for(var i,r,s;t=t.__;)if((i=t.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(e)),s=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,n||{}),s=i.__d),s)return i.__E=i}catch(a){e=a}throw e}},Ut=0,rt.prototype.setState=function(e,t){var o;o=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=E({},this.state),typeof e=="function"&&(e=e(E({},o),this.props)),e&&E(o,e),e!=null&&this.__v&&(t&&this._sb.push(t),Gt(this))},rt.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Gt(this))},rt.prototype.render=W,z=[],Ft=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,jt=function(e,t){return e.__v.__b-t.__v.__b},it.__r=0,Ot=/(PointerCapture)$|Capture$/i,vt=0,yt=Xt(!1),bt=Xt(!0);var We=0;function u(e,t,o,n,i,r){t||(t={});var s,a,d=t;if("ref"in d)for(a in d={},t)a=="ref"?s=t[a]:d[a]=t[a];var c={type:e,props:d,key:o,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--We,__i:-1,__u:0,__source:i,__self:r};if(typeof e=="function"&&(s=e.defaultProps))for(a in s)d[a]===void 0&&(d[a]=s[a]);return m.vnode&&m.vnode(c),c}const Ye={fileName:"<%ArtworkId>_p<%PageIndex>_<%AuthorId>",showHoverButton:!0,buttonPositionVertical:"bottom",buttonPositionHorizontal:"right",buttonPositionVerticalValue:"8",buttonPositionHorizontalValue:"8",messagePlacement:"top"};var Y,b,It,ee,at=0,oe=[],w=m,ne=w.__b,re=w.__r,ie=w.diffed,se=w.__c,ae=w.unmount,le=w.__;function Pt(e,t){w.__h&&w.__h(b,e,at||t),at=0;var o=b.__H||(b.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function $(e){return at=1,Ge(ue,e)}function Ge(e,t,o){var n=Pt(Y++,2);if(n.t=e,!n.__c&&(n.__=[ue(void 0,t),function(a){var d=n.__N?n.__N[0]:n.__[0],c=n.t(d,a);d!==c&&(n.__N=[c,n.__[1]],n.__c.setState({}))}],n.__c=b,!b.__f)){var i=function(a,d,c){if(!n.__c.__H)return!0;var f=n.__c.__H.__.filter(function(p){return!!p.__c});if(f.every(function(p){return!p.__N}))return!r||r.call(this,a,d,c);var l=n.__c.props!==a;return f.forEach(function(p){if(p.__N){var _=p.__[0];p.__=p.__N,p.__N=void 0,_!==p.__[0]&&(l=!0)}}),r&&r.call(this,a,d,c)||l};b.__f=!0;var r=b.shouldComponentUpdate,s=b.componentWillUpdate;b.componentWillUpdate=function(a,d,c){if(this.__e){var f=r;r=void 0,i(a,d,c),r=f}s&&s.call(this,a,d,c)},b.shouldComponentUpdate=i}return n.__N||n.__}function A(e,t){var o=Pt(Y++,3);!w.__s&&de(o.__H,t)&&(o.__=e,o.u=t,b.__H.__h.push(o))}function lt(e){return at=5,qe(function(){return{current:e}},[])}function qe(e,t){var o=Pt(Y++,7);return de(o.__H,t)&&(o.__=e(),o.__H=t,o.__h=e),o.__}function Ke(){for(var e;e=oe.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(ct),e.__H.__h.forEach(Et),e.__H.__h=[]}catch(t){e.__H.__h=[],w.__e(t,e.__v)}}w.__b=function(e){b=null,ne&&ne(e)},w.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),le&&le(e,t)},w.__r=function(e){re&&re(e),Y=0;var t=(b=e.__c).__H;t&&(It===b?(t.__h=[],b.__h=[],t.__.forEach(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})):(t.__h.forEach(ct),t.__h.forEach(Et),t.__h=[],Y=0)),It=b},w.diffed=function(e){ie&&ie(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(oe.push(t)!==1&&ee===w.requestAnimationFrame||((ee=w.requestAnimationFrame)||Je)(Ke)),t.__H.__.forEach(function(o){o.u&&(o.__H=o.u),o.u=void 0})),It=b=null},w.__c=function(e,t){t.some(function(o){try{o.__h.forEach(ct),o.__h=o.__h.filter(function(n){return!n.__||Et(n)})}catch(n){t.some(function(i){i.__h&&(i.__h=[])}),t=[],w.__e(n,o.__v)}}),se&&se(e,t)},w.unmount=function(e){ae&&ae(e);var t,o=e.__c;o&&o.__H&&(o.__H.__.forEach(function(n){try{ct(n)}catch(i){t=i}}),o.__H=void 0,t&&w.__e(t,o.__v))};var ce=typeof requestAnimationFrame=="function";function Je(e){var t,o=function(){clearTimeout(n),ce&&cancelAnimationFrame(t),setTimeout(e)},n=setTimeout(o,35);ce&&(t=requestAnimationFrame(o))}function ct(e){var t=b,o=e.__c;typeof o=="function"&&(e.__c=void 0,o()),b=t}function Et(e){var t=b;e.__c=e.__(),b=t}function de(e,t){return!e||e.length!==t.length||t.some(function(o,n){return o!==e[n]})}function ue(e,t){return typeof t=="function"?t(e):t}const dt="m-userscript-settings",Tt="m-open-settings-panel",fe=`${dt}-changed`;class Xe{constructor(t,o){this.storageKey=t,this.defaultSettings=o}loadSettings(){try{const t=localStorage.getItem(this.storageKey);if(t){const o=JSON.parse(t);return{...this.defaultSettings,...o}}}catch{}return{...this.defaultSettings}}saveSettings(t){const n={...this.loadSettings(),...t};try{localStorage.setItem(this.storageKey,JSON.stringify(n))}catch{}return n}resetSettings(){try{localStorage.removeItem(this.storageKey)}catch{}return{...this.defaultSettings}}}function ut(e){const t=e.trim();return/^\d+$/.test(t)?`${t}px`:t}let G=0;const pe=e=>{e.preventDefault(),e.returnValue=""},q={add:()=>{G===0&&window.addEventListener("beforeunload",pe),G++},remove:()=>{G--,G<=0&&(G=0,window.removeEventListener("beforeunload",pe))}};async function Ze(e,t,o){return q.add(),new Promise((n,i)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:"blob",...o?.headers&&{headers:o.headers},onload:r=>{try{const s=r.response,a=URL.createObjectURL(s),d=document.createElement("a");d.href=a,d.download=t,d.style.display="none",document.body.appendChild(d),d.click(),setTimeout(()=>{document.body.removeChild(d),URL.revokeObjectURL(a)},100),n()}catch(s){i(s)}finally{q.remove()}},onerror:r=>{q.remove(),i(r)}})})}let Qe={data:""},to=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Qe},eo=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,oo=/\/\*[^]*?\*\/|  +/g,_e=/\n+/g,H=(e,t)=>{let o="",n="",i="";for(let r in e){let s=e[r];r[0]=="@"?r[1]=="i"?o=r+" "+s+";":n+=r[1]=="f"?H(s,r):r+"{"+H(s,r[1]=="k"?"":t)+"}":typeof s=="object"?n+=H(s,t?t.replace(/([^,])+/g,a=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,a):a?a+" "+d:d)):r):s!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=H.p?H.p(r,s):r+":"+s+";")}return o+(t&&i?t+"{"+i+"}":i)+n},T={},he=e=>{if(typeof e=="object"){let t="";for(let o in e)t+=o+he(e[o]);return t}return e},no=(e,t,o,n,i)=>{let r=he(e),s=T[r]||(T[r]=(d=>{let c=0,f=11;for(;c<d.length;)f=101*f+d.charCodeAt(c++)>>>0;return"go"+f})(r));if(!T[s]){let d=r!==e?e:(c=>{let f,l,p=[{}];for(;f=eo.exec(c.replace(oo,""));)f[4]?p.shift():f[3]?(l=f[3].replace(_e," ").trim(),p.unshift(p[0][l]=p[0][l]||{})):p[0][f[1]]=f[2].replace(_e," ").trim();return p[0]})(e);T[s]=H(i?{["@keyframes "+s]:d}:d,o?"":"."+s)}let a=o&&T.g?T.g:null;return o&&(T.g=T[s]),((d,c,f,l)=>{l?c.data=c.data.replace(l,d):c.data.indexOf(d)===-1&&(c.data=f?d+c.data:c.data+d)})(T[s],t,n,a),s},ro=(e,t,o)=>e.reduce((n,i,r)=>{let s=t[r];if(s&&s.call){let a=s(o),d=a&&a.props&&a.props.className||/^go/.test(a)&&a;s=d?"."+d:a&&typeof a=="object"?a.props?"":H(a,""):a===!1?"":a}return n+i+(s??"")},"");function Lt(e){let t=this||{},o=e.call?e(t.p):e;return no(o.unshift?o.raw?ro(o,[].slice.call(arguments,1),t.p):o.reduce((n,i)=>Object.assign(n,i&&i.call?i(t.p):i),{}):o,to(t.target),t.g,t.o,t.k)}let ge,Ht,Nt;Lt.bind({g:1});let io=Lt.bind({k:1});function so(e,t,o,n){H.p=t,ge=e,Ht=o,Nt=n}function S(e,t){let o=this||{};return function(){let n=arguments;function i(r,s){let a=Object.assign({},r),d=a.className||i.className;o.p=Object.assign({theme:Ht&&Ht()},a),o.o=/ *go\d+/.test(d),a.className=Lt.apply(o,n)+(d?" "+d:"");let c=e;return e[0]&&(c=a.as||e,delete a.as),Nt&&c[0]&&Nt(a),ge(c,a)}return i}}so(xt);const ao=S("div")`
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
`,lo=S("span")`
  float: right;
  margin-left: 8px;
  font-weight: bold;
  opacity: 0.7;
  font-size: 16px;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;function co({type:e="info",content:t,duration:o=3e3,onClose:n,onClick:i,className:r,style:s}){const a=lt(null),d=lt(0),c=lt(o),f=()=>{a.current&&(clearTimeout(a.current),a.current=null)},l=h=>{f(),h>0&&(d.current=Date.now(),a.current=window.setTimeout(()=>{n?.()},h))},p=()=>{if(a.current){const h=Date.now()-d.current;c.current=Math.max(0,c.current-h),f()}},_=()=>{c.current>0&&l(c.current)};return A(()=>(o>0&&(c.current=o,l(o)),f),[o,n]),u(ao,{className:`message-${e} ${r||""}`,style:s,onClick:()=>{i?.(),n?.()},onMouseEnter:p,onMouseLeave:_,children:[t,u(lo,{children:"×"})]})}const uo=()=>{try{return JSON.parse(localStorage.getItem(dt)||"{}").messagePlacement||"top"}catch{return"top"}},K=new Map;let fo=0;const po=e=>{const[t,o]=e.split("-");let r=`${t}: 20px; display: flex; flex-direction: ${t==="bottom"?"column-reverse":"column"};`;return o?r+=` ${o}: 20px;`:r+=" left: 50%; transform: translateX(-50%);",r},_o=(e="top")=>{if(!K.has(e)){const t=document.createElement("div");t.id=`userscript-message-container-${e}`,t.style.cssText=`
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      ${po(e)}
    `,document.body.appendChild(t),K.set(e,t)}return K.get(e)},ho=e=>{const t=e.placement||"top",o=_o(t),n=`userscript-message-${++fo}`,i=document.createElement("div");i.id=n;const r=t.startsWith("bottom");i.style.cssText=`
    position: relative;
    margin-bottom: 8px;
    pointer-events: auto;
    animation: ${r?"messageSlideInBottom":"messageSlideIn"} 0.3s ease-out;
  `,o.appendChild(i);const s=()=>{if(i.parentNode){const a=t.startsWith("bottom");i.style.animation=`${a?"messageSlideOutBottom":"messageSlideOut"} 0.3s ease-in forwards`,setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},300)}};return $t(xt(co,{...e,onClose:s}),i),s},ft=e=>(t,o,n,i)=>ho({type:e,content:t,placement:n||uo(),...i&&{onClick:i},...o!==void 0&&{duration:o}}),go=ft("success"),mo=ft("error"),vo=ft("warning"),yo=ft("info"),me={success:go,error:mo,warning:vo,info:yo,destroy:()=>{K.forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)}),K.clear()}},ve="userscript-message-styles";if(!document.getElementById(ve)){const e=document.createElement("style");e.id=ve,e.textContent=`
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
`,document.head.appendChild(e)}const ye="en",be="userscript-locale";let V=ye;const pt={},_t=[],we=()=>navigator?.language?.toLowerCase().startsWith("zh")?"zh":"en";try{V=localStorage.getItem(be)||we()}catch{V=we()}const xe=(e,t)=>{const o={...e};for(const n of Object.keys(t))t[n]!==null&&typeof t[n]=="object"&&!Array.isArray(t[n])&&e[n]!==null&&typeof e[n]=="object"&&!Array.isArray(e[n])?o[n]=xe(e[n],t[n]):o[n]=t[n];return o},Se=(e,t)=>{let o=e;for(const n of t.split("."))if(o=o?.[n],!o)return;return typeof o=="string"?o:void 0},bo=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,n)=>t[n]??"{"+n+"}"):e;function wo(e,t){const o=typeof e=="string"?e:e.key,n=typeof e=="string"?t:e.params,i=Se(pt[V],o)||Se(pt[ye],o)||o;return bo(i,n)}const L={addTranslations(e,t){pt[e]=xe(pt[e]||{},t)},setLocale(e){if(V!==e){V=e;try{localStorage.setItem(be,e)}catch{}_t.forEach(t=>t())}},getLocale(){return V},t:wo,subscribe(e){return _t.push(e),()=>{const t=_t.indexOf(e);t>-1&&_t.splice(t,1)}}};function J(){const[e,t]=$(L.getLocale());A(()=>L.subscribe(()=>{t(L.getLocale())}),[]);const o=n=>L.setLocale(n);return{t:L.t,locale:e,setLocale:o}}function xo(e){return{textColor:e?"#e1e8ed":"#333",backgroundColor:e?"#1e1e1e":"white",borderColor:e?"#38444d":"#ddd",secondaryTextColor:e?"#8b98a5":"#666",inputBackground:e?"#253341":"white",inputBorder:e?"#38444d":"#ddd",panelBackground:e?"#1e1e1e":"white"}}function I(){const[e,t]=$(()=>window.matchMedia?.("(prefers-color-scheme: dark)").matches||!1);return A(()=>{const o=window.matchMedia("(prefers-color-scheme: dark)"),n=i=>t(i.matches);if(o.addEventListener)return o.addEventListener("change",n),()=>o.removeEventListener("change",n);if(o.addListener)return o.addListener(n),()=>o.removeListener?.(n)},[]),{theme:xo(e),isDark:e}}var So=Symbol.for("preact-signals");function zt(){if(U>1)U--;else{for(var e,t=!1;X!==void 0;){var o=X;for(X=void 0,At++;o!==void 0;){var n=o.o;if(o.o=void 0,o.f&=-3,!(8&o.f)&&$e(o))try{o.c()}catch(i){t||(e=i,t=!0)}o=n}}if(At=0,U--,t)throw e}}var g=void 0;function ke(e){var t=g;g=void 0;try{return e()}finally{g=t}}var X=void 0,U=0,At=0,ht=0;function Ce(e){if(g!==void 0){var t=e.n;if(t===void 0||t.t!==g)return t={i:0,S:e,p:g.s,n:void 0,t:g,e:void 0,x:void 0,r:t},g.s!==void 0&&(g.s.n=t),g.s=t,e.n=t,32&g.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=g.s,t.n=void 0,g.s.n=t,g.s=t),t}}function C(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}C.prototype.brand=So,C.prototype.h=function(){return!0},C.prototype.S=function(e){var t=this,o=this.t;o!==e&&e.e===void 0&&(e.x=o,this.t=e,o!==void 0?o.e=e:ke(function(){var n;(n=t.W)==null||n.call(t)}))},C.prototype.U=function(e){var t=this;if(this.t!==void 0){var o=e.e,n=e.x;o!==void 0&&(o.x=n,e.e=void 0),n!==void 0&&(n.e=o,e.x=void 0),e===this.t&&(this.t=n,n===void 0&&ke(function(){var i;(i=t.Z)==null||i.call(t)}))}},C.prototype.subscribe=function(e){var t=this;return Io(function(){var o=t.value,n=g;g=void 0;try{e(o)}finally{g=n}},{name:"sub"})},C.prototype.valueOf=function(){return this.value},C.prototype.toString=function(){return this.value+""},C.prototype.toJSON=function(){return this.value},C.prototype.peek=function(){var e=g;g=void 0;try{return this.value}finally{g=e}},Object.defineProperty(C.prototype,"value",{get:function(){var e=Ce(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(At>100)throw new Error("Cycle detected");this.v=e,this.i++,ht++,U++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{zt()}}}});function ko(e,t){return new C(e,t)}function $e(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Ie(e){for(var t=e.s;t!==void 0;t=t.n){var o=t.S.n;if(o!==void 0&&(t.r=o),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function Pe(e){for(var t=e.s,o=void 0;t!==void 0;){var n=t.p;t.i===-1?(t.S.U(t),n!==void 0&&(n.n=t.n),t.n!==void 0&&(t.n.p=n)):o=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=n}e.s=o}function B(e,t){C.call(this,void 0),this.x=e,this.s=void 0,this.g=ht-1,this.f=4,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}B.prototype=new C,B.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===ht))return!0;if(this.g=ht,this.f|=1,this.i>0&&!$e(this))return this.f&=-2,!0;var e=g;try{Ie(this),g=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(o){this.v=o,this.f|=16,this.i++}return g=e,Pe(this),this.f&=-2,!0},B.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}C.prototype.S.call(this,e)},B.prototype.U=function(e){if(this.t!==void 0&&(C.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},B.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(B.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var e=Ce(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function Co(e,t){return new B(e,t)}function Ee(e){var t=e.u;if(e.u=void 0,typeof t=="function"){U++;var o=g;g=void 0;try{t()}catch(n){throw e.f&=-2,e.f|=8,Bt(e),n}finally{g=o,zt()}}}function Bt(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Ee(e)}function $o(e){if(g!==this)throw new Error("Out-of-order effect");Pe(this),g=e,this.f&=-2,8&this.f&&Bt(this),zt()}function R(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t?.name}R.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}},R.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Ee(this),Ie(this),U++;var e=g;return g=this,$o.bind(this,e)},R.prototype.N=function(){2&this.f||(this.f|=2,this.o=X,X=this)},R.prototype.d=function(){this.f|=8,1&this.f||Bt(this)},R.prototype.dispose=function(){this.d()};function Io(e,t){var o=new R(e,t);try{o.c()}catch(i){throw o.d(),i}var n=o.d.bind(o);return n[Symbol.dispose]=n,n}const Po=S("button")`
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
`,Eo={primary:{"--bg":"#1da1f2","--color":"white","--border":"none"},secondary:e=>({"--bg":e.inputBackground,"--color":e.textColor,"--border":`1px solid ${e.borderColor}`}),danger:{"--bg":"#dc3545","--color":"white","--border":"none"}},To={small:{"--padding":"6px 12px","--font-size":"12px"},medium:{"--padding":"8px 16px","--font-size":"14px"},large:{"--padding":"12px 24px","--font-size":"16px"}};function Z({children:e,onClick:t,disabled:o=!1,variant:n="primary",size:i="medium",className:r="",style:s={},type:a="button"}){const{theme:d}=I(),f={...(()=>{const l=Eo[n];return typeof l=="function"?l(d):l})(),...To[i],"--cursor":o?"not-allowed":"pointer","--opacity":o?"0.6":"1",...s};return u(Po,{className:r,style:f,onClick:t,disabled:o,type:a,children:e})}const Lo=S("label")`
  display: flex;
  align-items: center;
  cursor: var(--cursor);
  color: var(--text-color);
  opacity: var(--opacity);
`,Ho=S("input")`
  margin-right: 8px;
  accent-color: #1da1f2;
  cursor: var(--cursor);
`;function No({checked:e,defaultChecked:t,disabled:o=!1,onChange:n,children:i,className:r="",style:s={}}){const{theme:a}=I(),d={"--cursor":o?"not-allowed":"pointer","--text-color":a.textColor,"--opacity":o?"0.6":"1",...s};return u(Lo,{className:r,style:d,children:[u(Ho,{type:"checkbox",checked:e,defaultChecked:t,disabled:o,onChange:c=>n?.(c.currentTarget.checked),style:{"--cursor":o?"not-allowed":"pointer"}}),i]})}const zo=S("input")`
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
`;function Mt({type:e="text",value:t,defaultValue:o,placeholder:n,disabled:i=!1,onChange:r,onBlur:s,onFocus:a,className:d="",style:c={}}){const{theme:f}=I(),l={"--input-border":f.inputBorder,"--input-bg":f.inputBackground,"--input-text":f.textColor,...c};return u(zo,{type:e,value:t,defaultValue:o,placeholder:n,disabled:i,className:d,style:l,onChange:p=>r?.(p.currentTarget.value),onBlur:s,onFocus:a})}function Te({value:e,options:t,onChange:o,placeholder:n,className:i,style:r}){const{theme:s}=I(),a={padding:"6px 8px",borderRadius:"4px",border:`1px solid ${s.borderColor}`,backgroundColor:s.backgroundColor,color:s.textColor,fontSize:"14px",cursor:"pointer",outline:"none",...r};return u("select",{value:e,onChange:c=>{const f=c.target;o(f.value)},className:i,style:a,children:[n&&u("option",{value:"",disabled:!0,children:n}),t.map(c=>u("option",{value:c.value,children:c.label},c.value))]})}function Ao({className:e,style:t}){const{theme:o}=I(),{t:n,locale:i,setLocale:r}=J(),s=[{value:"zh",label:"中文"},{value:"en",label:"English"}];return u("div",{className:e,style:{display:"flex",alignItems:"center",gap:"8px",...t},children:[u("label",{style:{fontSize:"14px",fontWeight:500,color:o.textColor,marginBottom:"0"},children:[n("common.language"),":"]}),u(Te,{value:i,options:s,onChange:a=>r(a)})]})}function Bo({value:e,onChange:t,className:o,style:n}){const{theme:i}=I(),{t:r}=J(),s=[{value:"top",label:r("common.messagePlacement.top")},{value:"bottom",label:r("common.messagePlacement.bottom")},{value:"top-left",label:r("common.messagePlacement.topLeft")},{value:"top-right",label:r("common.messagePlacement.topRight")},{value:"bottom-left",label:r("common.messagePlacement.bottomLeft")},{value:"bottom-right",label:r("common.messagePlacement.bottomRight")}],a=d=>{t(d)};return u("div",{className:o,style:{display:"flex",alignItems:"center",gap:"8px",...n},children:[u("label",{style:{fontSize:"14px",fontWeight:500,color:i.textColor,marginBottom:"0"},children:[r("common.messagePlacement.label"),":"]}),u(Te,{value:e,options:s,onChange:a})]})}const Mo=S("div")`
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
`,Do=S("div")`
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
`;function Vo({isOpen:e,onClose:t,title:o,children:n,className:i="",style:r={}}){const{theme:s}=I();if(A(()=>{if(!e)return;const l=p=>{p.key==="Escape"&&t()};return document.addEventListener("keydown",l),()=>document.removeEventListener("keydown",l)},[e,t]),!e)return null;const a={"--modal-bg":s.panelBackground,"--modal-text":s.textColor,...r},d={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:o?"20px":"0"},c={margin:0,color:s.textColor,fontSize:"20px",fontWeight:600},f={background:"none",border:"none",fontSize:"24px",cursor:"pointer",color:s.secondaryTextColor,padding:0,width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px",transition:"background-color 0.2s ease"};return u(Mo,{onClick:t,children:u(Do,{className:i,style:a,onClick:l=>l.stopPropagation(),children:[u("div",{style:d,children:[o&&u("h2",{style:c,children:o}),u("button",{style:f,onClick:t,onMouseEnter:l=>{const p=l.target;p.style.backgroundColor=s.borderColor},onMouseLeave:l=>{const p=l.target;p.style.backgroundColor="transparent"},children:"×"})]}),u("div",{children:n})]})})}const Uo=S("div")`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }
`,Ro=S("div")`
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-header-bg);
  border-radius: 12px 12px 0 0;
`,Fo=S("h3")`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
`,jo=S("div")`
  padding: 20px;
`;function Le({title:e,children:t,className:o="",style:n={}}){const{theme:i,isDark:r}=I(),s={"--card-bg":i.panelBackground,"--card-border":i.borderColor,"--card-header-bg":r?"rgba(255, 255, 255, 0.02)":"rgba(0, 0, 0, 0.01)","--card-title-color":i.textColor,...n};return u(Uo,{className:o,style:s,children:[e&&u(Ro,{children:u(Fo,{children:e})}),u(jo,{children:t})]})}const Oo=S("button")`
  position: fixed;
  left: var(--left-position);
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-color: ${e=>e.$bgColor};
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
`,Wo=S("svg")`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;function Yo({onClick:e,isVisible:t,backgroundColor:o="#1da1f2"}){return u(Oo,{style:{"--left-position":t?"10px":"-40px"},onClick:e,$bgColor:o,children:u(Wo,{viewBox:"0 0 24 24",children:u("path",{d:"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})})})}function Go({values:e,onChange:t}){const{theme:o}=I(),{t:n}=J(),i={display:"block",marginBottom:"8px",fontWeight:500,fontSize:"14px",color:o.textColor};return u(Le,{title:n("settings.position.title"),children:u("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[u("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap"},children:[u("div",{style:{flex:"1",minWidth:"120px"},children:[u("label",{style:i,children:n("settings.position.vertical")}),u("div",{style:{display:"flex",gap:"8px"},children:[u(Z,{variant:e.buttonPositionVertical==="top"?"primary":"secondary",size:"small",onClick:()=>t("buttonPositionVertical","top"),children:n("settings.position.top")}),u(Z,{variant:e.buttonPositionVertical==="bottom"?"primary":"secondary",size:"small",onClick:()=>t("buttonPositionVertical","bottom"),children:n("settings.position.bottom")})]})]}),u("div",{style:{flex:"1",minWidth:"120px"},children:[u("label",{style:i,children:n("settings.position.verticalValue")}),u(Mt,{value:e.buttonPositionVerticalValue,onChange:r=>t("buttonPositionVerticalValue",r),placeholder:"8"})]})]}),u("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap"},children:[u("div",{style:{flex:"1",minWidth:"120px"},children:[u("label",{style:i,children:n("settings.position.horizontal")}),u("div",{style:{display:"flex",gap:"8px"},children:[u(Z,{variant:e.buttonPositionHorizontal==="left"?"primary":"secondary",size:"small",onClick:()=>t("buttonPositionHorizontal","left"),children:n("settings.position.left")}),u(Z,{variant:e.buttonPositionHorizontal==="right"?"primary":"secondary",size:"small",onClick:()=>t("buttonPositionHorizontal","right"),children:n("settings.position.right")})]})]}),u("div",{style:{flex:"1",minWidth:"120px"},children:[u("label",{style:i,children:n("settings.position.horizontalValue")}),u(Mt,{value:e.buttonPositionHorizontalValue,onChange:r=>t("buttonPositionHorizontalValue",r),placeholder:"8"})]})]}),u("div",{style:{fontSize:"12px",color:o.secondaryTextColor},children:n("settings.position.valueHelp")})]})})}function qo(e,t){const o=new Xe(e,t),n=ko(o.loadSettings()),i=Co(()=>n.value),r=c=>{const f=o.saveSettings(c);n.value=f,window.dispatchEvent(new CustomEvent(fe))};return{get settings(){return i.value},updateSettings:r,resetSettings:()=>{const c=o.resetSettings();return n.value=c,window.dispatchEvent(new CustomEvent(fe)),c},getSetting:c=>n.value[c],setSetting:(c,f)=>{r({[c]:f})},signal:n}}const F=qo(dt,Ye);function Dt(){const[e,t]=$(F.signal.value);return A(()=>{const o=F.signal.subscribe(n=>{t(n)});return()=>o()},[]),{settings:e,setSetting:F.setSetting,updateSettings:F.updateSettings,resetSettings:F.resetSettings,getSetting:F.getSetting}}const Ko={common:{ok:"确定",cancel:"取消",close:"关闭",reset:"重置",save:"保存",loading:"加载中...",error:"错误",success:"成功",warning:"警告",info:"信息",language:"语言",messagePlacement:{label:"消息弹窗位置",top:"顶部居中",bottom:"底部居中",topLeft:"左上角",topRight:"右上角",bottomLeft:"左下角",bottomRight:"右下角"}},button:{download:"下载",settings:"设置"},settings:{position:{title:"按钮位置设置",vertical:"垂直方向",horizontal:"水平方向",top:"上",bottom:"下",left:"左",right:"右",verticalValue:"垂直距离",horizontalValue:"水平距离",valueHelp:"纯数字默认 px，也可输入带单位的值如 1rem、10%"}}},Jo={common:{ok:"OK",cancel:"Cancel",close:"Close",reset:"Reset",save:"Save",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Info",language:"Language",messagePlacement:{label:"Message Placement",top:"Top Center",bottom:"Bottom Center",topLeft:"Top Left",topRight:"Top Right",bottomLeft:"Bottom Left",bottomRight:"Bottom Right"}},button:{download:"Download",settings:"Settings"},settings:{position:{title:"Button Position",vertical:"Vertical",horizontal:"Horizontal",top:"Top",bottom:"Bottom",left:"Left",right:"Right",verticalValue:"Vertical Offset",horizontalValue:"Horizontal Offset",valueHelp:"Pure numbers default to px, also supports values like 1rem, 10%"}}},Xo={title:"Pixiv Downloader 设置",settings:{image:{title:"图片下载设置",fileName:"图片文件名格式",fileNamePlaceholder:"<%ArtworkId>_p<%PageIndex>_<%AuthorId>",fileNameHelp:"可用变量：<%ArtworkId>、<%PageIndex>、<%AuthorId>、<%AuthorName>、<%ArtworkTitle>、<%Time>",showHoverButton:"显示悬停下载按钮",showHoverButtonHelp:"鼠标悬停在图片上时显示下载按钮"},reset:"重置为默认设置"},ui:{downloadImage:"下载图片",downloadAll:"下载全部",downloading:"下载中",downloadAllTitle:"下载作品的所有图片",downloadComplete:"下载完成 ({count} 张)",downloadFailed:"下载失败 ({count} 张)，点击定位"}},Zo={title:"Pixiv Downloader Settings",settings:{image:{title:"Image Download Settings",fileName:"Image filename format",fileNamePlaceholder:"<%ArtworkId>_p<%PageIndex>_<%AuthorId>",fileNameHelp:"Available variables: <%ArtworkId>, <%PageIndex>, <%AuthorId>, <%AuthorName>, <%ArtworkTitle>, <%Time>",showHoverButton:"Show hover download button",showHoverButtonHelp:"Show download button when hovering over images"},reset:"Reset to default settings"},ui:{downloadImage:"Download Image",downloadAll:"Download All",downloading:"Downloading",downloadAllTitle:"Download all images of this artwork",downloadComplete:"Download complete ({count} images)",downloadFailed:"Download failed ({count} images), click to locate"}};L.addTranslations("zh",Ko),L.addTranslations("zh",Xo),L.addTranslations("en",Jo),L.addTranslations("en",Zo);function Qo({isOpen:e,onClose:t}){const{settings:o,setSetting:n,resetSettings:i}=Dt(),{t:r}=J(),{theme:s,isDark:a}=I(),[d,c]=$(0),f={display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"16px",padding:"16px",marginBottom:"20px",background:a?"rgba(255, 255, 255, 0.02)":"rgba(0, 0, 0, 0.01)",border:`1px solid ${s.borderColor}`,borderRadius:"8px"},l={marginBottom:"20px"},p={display:"block",marginBottom:"8px",fontWeight:500,fontSize:"14px",color:s.textColor},_={marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor,paddingLeft:"24px"};return u(Vo,{isOpen:e,onClose:t,title:r("title"),children:u("div",{children:[u("div",{style:f,children:[u("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap",flex:"1",minWidth:"0"},children:[u(Ao,{}),u(Bo,{value:o.messagePlacement,onChange:h=>n("messagePlacement",h)})]}),u(Z,{variant:"secondary",style:{flexShrink:0},onClick:()=>{i(),c(h=>h+1)},children:r("settings.reset")})]}),u(Le,{title:r("settings.image.title"),children:[u("div",{style:l,children:[u("label",{style:p,children:r("settings.image.fileName")}),u(Mt,{value:o.fileName,onChange:h=>n("fileName",h),placeholder:r("settings.image.fileNamePlaceholder")}),u("div",{style:{marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor},children:r("settings.image.fileNameHelp")})]}),u("div",{children:[u(No,{checked:o.showHoverButton,onChange:h=>n("showHoverButton",h),children:r("settings.image.showHoverButton")}),u("div",{style:_,children:r("settings.image.showHoverButtonHelp")})]})]}),u(Go,{values:{buttonPositionVertical:o.buttonPositionVertical,buttonPositionHorizontal:o.buttonPositionHorizontal,buttonPositionVerticalValue:o.buttonPositionVerticalValue,buttonPositionHorizontalValue:o.buttonPositionHorizontalValue},onChange:(h,k)=>{n(h,k)}})]},d)})}async function He(){try{const e=window.location.pathname.match(/\/artworks\/(\d+)/)?.[1];if(!e)return null;const o=await(await fetch(`https://www.pixiv.net/ajax/illust/${e}`)).json();if(o.error)throw new Error("Failed to fetch artwork info");const n=o.body;return{artworkId:n.illustId,authorId:n.userId,authorName:n.userName,artworkTitle:n.illustTitle,pageCount:n.pageCount||1,currentPage:1}}catch{return null}}async function Ne(e){const o=await(await fetch(`https://www.pixiv.net/ajax/illust/${e}/pages`)).json();if(o.error)throw new Error("Failed to fetch artwork pages");return o.body.map(n=>n.urls.original)}async function tn(e,t){try{const o=e.closest('a[href*="i.pximg.net/img-original"]');if(o?.href){const s=o.href,a=s.split(".").pop()||"png",d=s.match(/_p(\d+)\./),c=d?parseInt(d[1]||"0",10):0;return{originalUrl:s,previewUrl:e.src,extension:a,pageIndex:c}}const n=await Ne(t),i=e.src.match(/_p(\d+)_/),r=i?parseInt(i[1]||"0",10):0;if(n[r]){const s=n[r],a=s.split(".").pop()||"png";return{originalUrl:s,previewUrl:e.src,extension:a,pageIndex:r}}return null}catch{return null}}async function en(e){try{return(await Ne(e.artworkId)).map((o,n)=>({originalUrl:o,previewUrl:o.replace("img-original","img-master").replace(/\.(png|jpg|gif)$/,"_master1200.jpg"),extension:o.split(".").pop()||"png",pageIndex:n}))}catch{return[]}}function on(e,t,o){const n={ArtworkId:t.artworkId,PageIndex:String(o),AuthorId:t.authorId,AuthorName:t.authorName,ArtworkTitle:t.artworkTitle,Time:String(Date.now())};let i=e;for(const[r,s]of Object.entries(n))i=i.replace(new RegExp(`<%${r}>`,"g"),s||"");return i=i.replace(/[<>:"/\\|?*]/g,"_"),i}async function ze(e,t,o){try{const n=on(o.fileName,t,e.pageIndex);await Ze(e.originalUrl,`${n}.${e.extension}`,{headers:{Referer:"https://www.pixiv.net/"}})}catch(n){throw n}}async function nn(e,t,o,n){const i=e.length,r={success:0,failed:[]};q.add();try{for(let s=0;s<i;s++){const a=e[s];if(a){n&&n(s+1,i);try{await ze(a,t,o),r.success++}catch(d){r.failed.push({pageIndex:a.pageIndex,error:d})}s<i-1&&await new Promise(d=>setTimeout(d,500))}}}finally{q.remove()}return r}const rn=io`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,sn=S("svg")`
  width: 20px;
  height: 20px;
  fill: white;
`,an=S("svg")`
  width: 18px;
  height: 18px;
  animation: ${rn} 1s linear infinite;
  fill: none;
  stroke: white;
  stroke-width: 2;
`,Ae=()=>u(sn,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:u("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})}),ln=()=>u(an,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[u("circle",{cx:"12",cy:"12",r:"10","stroke-opacity":"0.25"}),u("path",{d:"M12 2 A10 10 0 0 1 22 12","stroke-linecap":"round"})]}),cn=S("button")`
  position: fixed;
  left: var(--left-position);
  bottom: 68px;
  height: 40px;
  padding: 0 16px;
  background-color: #0096fa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  z-index: 10000;
  color: white;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition:
    left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.2s ease,
    transform 0.2s ease;
  opacity: 0.9;
  border: none;

  &:hover:not(:disabled) {
    opacity: 1;
    transform: scale(1.02);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;function dn({artworkInfo:e,isVisible:t,onDownloadingChange:o}){const[n,i]=$(!1),[r,s]=$({current:0,total:0}),{settings:a}=Dt(),{t:d}=J(),c=async p=>{if(p.preventDefault(),p.stopPropagation(),!n){i(!0),o?.(!0),s({current:0,total:0});try{const _=await en(e);if(_.length===0)return;const h=await nn(_,e,a,(k,x)=>{s({current:k,total:x})});if(h.failed.length>0){const k=h.failed[0];me.error(d("ui.downloadFailed",{count:h.failed.length}),void 0,void 0,()=>{document.querySelector(`img[src*="i.pximg.net/img-master"][src*="_p${k?.pageIndex}"]`)?.scrollIntoView({behavior:"smooth",block:"center"})})}else me.success(d("ui.downloadComplete",{count:_.length}))}finally{i(!1),o?.(!1),s({current:0,total:0})}}},f=n?`${d("ui.downloading")} ${r.current}/${r.total}`:`${d("ui.downloadAll")} (${e.pageCount})`;return u(cn,{style:{"--left-position":t?"10px":"-200px"},onClick:c,disabled:n,title:d("ui.downloadAllTitle"),children:[u(Ae,{}),u("span",{children:f})]})}function un(){const[e,t]=$(!1),[o,n]=$(!1),[i,r]=$(!1),[s,a]=$(null),d=lt(null);A(()=>{const f=p=>{d.current===null&&(d.current=requestAnimationFrame(()=>{d.current=null;const _=p.clientX<100&&p.clientY>window.innerHeight*(2/3);n(_)}))},l=()=>t(!0);return document.addEventListener("mousemove",f),window.addEventListener(Tt,l),()=>{document.removeEventListener("mousemove",f),window.removeEventListener(Tt,l),d.current!==null&&cancelAnimationFrame(d.current)}},[]),A(()=>{He().then(a)},[]);const c=o||e||i;return u(W,{children:[s&&u(dn,{artworkInfo:s,isVisible:c,onDownloadingChange:r}),u(Yo,{onClick:()=>t(!0),isVisible:c,backgroundColor:"#0096fa"}),u(Qo,{isOpen:e,onClose:()=>t(!1)})]})}const fn=S("button")`
  position: absolute;
  z-index: 10000;
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

  &:hover:not(:disabled) {
    opacity: 1;
    transform: scale(1.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;function pn({targetImage:e}){const{settings:t}=Dt(),[o,n]=$(!1);if(!t.showHoverButton)return null;const i=async s=>{if(s.preventDefault(),s.stopPropagation(),!o){n(!0);try{const a=await He();if(!a)return;const d=await tn(e,a.artworkId);if(!d)return;await ze(d,a,t)}catch{}finally{n(!1)}}},r={};return t.buttonPositionVertical==="top"?r.top=ut(t.buttonPositionVerticalValue):r.bottom=ut(t.buttonPositionVerticalValue),t.buttonPositionHorizontal==="left"?r.left=ut(t.buttonPositionHorizontalValue):r.right=ut(t.buttonPositionHorizontalValue),u(fn,{onClick:i,disabled:o,title:"下载图片",style:r,children:o?u(ln,{}):u(Ae,{})})}function _n(e){const t=e.closest('a[href*="i.pximg.net/img-original"]');if(t?.parentElement)return t.parentElement;let o=e.parentElement,n=0;for(;o&&n<5;){if(o.tagName==="DIV"&&o.style.position!=="static")return o;o=o.parentElement,n++}return e.parentElement}function hn(e){window.getComputedStyle(e).position==="static"&&(e.style.position="relative")}GM_registerMenuCommand("⚙️ Settings / 设置",()=>{window.dispatchEvent(new CustomEvent(Tt))});const gn='img[src*="i.pximg.net/img-master"]',Be=new WeakSet,mn=()=>JSON.parse(localStorage.getItem(dt)||"{}"),vn=(e,t)=>{const o=document.createElement("div");o.style.display="none",e.appendChild(o),$t(u(pn,{targetImage:t}),o);let n=!1,i=null;document.addEventListener("mousemove",r=>{i===null&&(i=requestAnimationFrame(()=>{i=null;const s=e.getBoundingClientRect(),a=r.clientX>=s.left&&r.clientX<=s.right&&r.clientY>=s.top&&r.clientY<=s.bottom;if(a&&!n){const d=mn().showHoverButton!==!1;o.style.display=d?"block":"none"}else!a&&n&&(o.style.display="none");n=a}))})};function Me(e){if(Be.has(e))return;const t=_n(e);t&&(hn(t),vn(t,e),Be.add(e))}const yn=e=>{e instanceof HTMLImageElement&&e.src.includes("i.pximg.net/img-master")?Me(e):(e instanceof Element||e instanceof Document||e instanceof DocumentFragment)&&e.querySelectorAll(gn).forEach(t=>Me(t))};function bn(){const e=new Set;let t=null;const o=r=>{e.add(r),t===null&&(t=requestAnimationFrame(()=>{t=null,e.forEach(s=>{yn(s)}),e.clear()}))};o(document);const n=new MutationObserver(r=>{r.forEach(s=>{s.addedNodes.forEach(a=>{o(a)})})});n.observe(document.body,{childList:!0,subtree:!0,attributes:!1,characterData:!1});const i=()=>{n.disconnect(),t!==null&&(cancelAnimationFrame(t),t=null),e.clear()};window.addEventListener("beforeunload",i)}function De(){const e=document.createElement("div");e.id="pixiv-enhanced-app",document.body.appendChild(e),$t(u(un,{}),e),bn()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",De):De()})();
