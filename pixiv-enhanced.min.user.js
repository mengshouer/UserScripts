// ==UserScript==
// @name         Pixiv Enhanced
// @name:zh-CN   Pixiv 增强
// @author       mengshouer
// @version      0.2.0
// @description  Enhance Pixiv with download and more features. Settings available by hovering mouse to the bottom left corner or via Tampermonkey menu.
// @description:zh-CN  增强 Pixiv，提供下载等功能。鼠标移入浏览器左下角或油猴菜单可打开设置。
// @include      *://www.pixiv.net/artworks/*
// @include      *://pixiv.net/artworks/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @license      GPL-3.0 License
// @namespace    https://github.com/mengshouer/UserScripts
// ==/UserScript==

(function(){"use strict";var nt,m,Yt,L,qt,Kt,Jt,$t,rt,Y,Xt,It,Et,Tt,it={},st=[],Ge=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,lt=Array.isArray;function P(e,t){for(var o in t)e[o]=t[o];return e}function Pt(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function At(e,t,o){var n,i,r,s={};for(r in t)r=="key"?n=t[r]:r=="ref"?i=t[r]:s[r]=t[r];if(arguments.length>2&&(s.children=arguments.length>3?nt.call(arguments,2):o),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)s[r]===void 0&&(s[r]=e.defaultProps[r]);return at(e,s,n,i,null)}function at(e,t,o,n,i){var r={type:e,props:t,key:o,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Yt,__i:-1,__u:0};return i==null&&m.vnode!=null&&m.vnode(r),r}function q(e){return e.children}function ct(e,t){this.props=e,this.context=t}function D(e,t){if(t==null)return e.__?D(e.__,e.__i+1):null;for(var o;t<e.__k.length;t++)if((o=e.__k[t])!=null&&o.__e!=null)return o.__e;return typeof e.type=="function"?D(e):null}function Ye(e){if(e.__P&&e.__d){var t=e.__v,o=t.__e,n=[],i=[],r=P({},t);r.__v=t.__v+1,m.vnode&&m.vnode(r),Lt(e.__P,r,t,e.__n,e.__P.namespaceURI,32&t.__u?[o]:null,n,o??D(t),!!(32&t.__u),i),r.__v=t.__v,r.__.__k[r.__i]=r,ie(n,r,i),t.__e=t.__=null,r.__e!=o&&Zt(r)}}function Zt(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),Zt(e)}function Qt(e){(!e.__d&&(e.__d=!0)&&L.push(e)&&!dt.__r++||qt!=m.debounceRendering)&&((qt=m.debounceRendering)||Kt)(dt)}function dt(){try{for(var e,t=1;L.length;)L.length>t&&L.sort(Jt),e=L.shift(),t=L.length,Ye(e)}finally{L.length=dt.__r=0}}function te(e,t,o,n,i,r,s,a,d,c,f){var _,l,p,h,k,w,S=n&&n.__k||st,g=t.length;for(d=qe(o,t,S,d,g),_=0;_<g;_++)(p=o.__k[_])!=null&&(l=p.__i!=-1&&S[p.__i]||it,p.__i=_,w=Lt(e,p,l,i,r,s,a,d,c,f),h=p.__e,p.ref&&l.ref!=p.ref&&(l.ref&&Nt(l.ref,null,p),f.push(p.ref,p.__c||h,p)),k==null&&h!=null&&(k=h),4&p.__u?(d=ee(p,d,e),l.__e&&(l.__e=null)):typeof p.type=="function"&&w!==void 0?d=w:h&&(d=h.nextSibling),p.__u&=-7);return o.__e=k,d}function qe(e,t,o,n,i){var r,s,a,d,c,f=o.length,_=f,l=0;for(e.__k=new Array(i),r=0;r<i;r++)(s=t[r])!=null&&typeof s!="boolean"&&typeof s!="function"?(typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?s=e.__k[r]=at(null,s,null,null,null):lt(s)?s=e.__k[r]=at(q,{children:s},null,null,null):s.constructor===void 0&&s.__b>0?s=e.__k[r]=at(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):e.__k[r]=s,d=r+l,s.__=e,s.__b=e.__b+1,a=null,(c=s.__i=Ke(s,o,d,_))!=-1&&(_--,(a=o[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(i>f?l--:i<f&&l++),typeof s.type!="function"&&(s.__u|=4)):c!=d&&(c==d-1?l--:c==d+1?l++:(c>d?l--:l++,s.__u|=4))):e.__k[r]=null;if(_)for(r=0;r<f;r++)(a=o[r])!=null&&(2&a.__u)==0&&(a.__e==n&&(n=D(a)),le(a,a));return n}function ee(e,t,o){var n,i;if(typeof e.type=="function"){for(n=e.__k,i=0;n&&i<n.length;i++)n[i]&&(n[i].__=e,t=ee(n[i],t,o));return t}e.__e!=t&&(t&&e.type&&!t.parentNode&&(t=D(e)),t=o.insertBefore(e.__e,t||null));do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Ke(e,t,o,n){var i,r,s,a=e.key,d=e.type,c=t[o],f=c!=null&&(2&c.__u)==0;if(c===null&&a==null||f&&a==c.key&&d==c.type)return o;if(n>(f?1:0)){for(i=o-1,r=o+1;i>=0||r<t.length;)if((c=t[s=i>=0?i--:r++])!=null&&(2&c.__u)==0&&a==c.key&&d==c.type)return s}return-1}function oe(e,t,o){t[0]=="-"?e.setProperty(t,o??""):e[t]=o==null?"":typeof o!="number"||Ge.test(t)?o:o+"px"}function ut(e,t,o,n,i){var r,s;t:if(t=="style")if(typeof o=="string")e.style.cssText=o;else{if(typeof n=="string"&&(e.style.cssText=n=""),n)for(t in n)o&&t in o||oe(e.style,t,"");if(o)for(t in o)n&&o[t]==n[t]||oe(e.style,t,o[t])}else if(t[0]=="o"&&t[1]=="n")r=t!=(t=t.replace(Xt,"$1")),s=t.toLowerCase(),t=s in e||t=="onFocusOut"||t=="onFocusIn"?s.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+r]=o,o?n?o[Y]=n[Y]:(o[Y]=It,e.addEventListener(t,r?Tt:Et,r)):e.removeEventListener(t,r?Tt:Et,r);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=o??"";break t}catch{}typeof o=="function"||(o==null||o===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&o==1?"":o))}}function ne(e){return function(t){if(this.l){var o=this.l[t.type+e];if(t[rt]==null)t[rt]=It++;else if(t[rt]<o[Y])return;return o(m.event?m.event(t):t)}}}function Lt(e,t,o,n,i,r,s,a,d,c){var f,_,l,p,h,k,w,S,g,E,et,R,ot,We,Ct,Gt,T=t.type;if(t.constructor!==void 0)return null;128&o.__u&&(d=!!(32&o.__u),r=[a=t.__e=o.__e]),(f=m.__b)&&f(t);t:if(typeof T=="function"){_=s.length;try{if(g=t.props,E=T.prototype&&T.prototype.render,et=(f=T.contextType)&&n[f.__c],R=f?et?et.props.value:f.__:n,o.__c?S=(l=t.__c=o.__c).__=l.__E:(E?t.__c=l=new T(g,R):(t.__c=l=new ct(g,R),l.constructor=T,l.render=Xe),et&&et.sub(l),l.state||(l.state={}),l.__n=n,p=l.__d=!0,l.__h=[],l._sb=[]),E&&l.__s==null&&(l.__s=l.state),E&&T.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=P({},l.__s)),P(l.__s,T.getDerivedStateFromProps(g,l.__s))),h=l.props,k=l.state,l.__v=t,p)E&&T.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),E&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(E&&T.getDerivedStateFromProps==null&&g!==h&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(g,R),t.__v==o.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(g,l.__s,R)===!1){t.__v!=o.__v&&(l.props=g,l.state=l.__s,l.__d=!1),t.__e=o.__e,t.__k=o.__k,t.__k.some(function(G){G&&(G.__=t)}),st.push.apply(l.__h,l._sb),l._sb=[],l.__h.length&&s.push(l),a=D(o);break t}l.componentWillUpdate!=null&&l.componentWillUpdate(g,l.__s,R),E&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(h,k,w)})}if(l.context=R,l.props=g,l.__P=e,l.__e=!1,ot=m.__r,We=0,E)l.state=l.__s,l.__d=!1,ot&&ot(t),f=l.render(l.props,l.state,l.context),st.push.apply(l.__h,l._sb),l._sb=[];else do l.__d=!1,ot&&ot(t),f=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++We<25);l.state=l.__s,l.getChildContext!=null&&(n=P(P({},n),l.getChildContext())),E&&!p&&l.getSnapshotBeforeUpdate!=null&&(w=l.getSnapshotBeforeUpdate(h,k)),Ct=f!=null&&f.type===q&&f.key==null?se(f.props.children):f,a=te(e,lt(Ct)?Ct:[Ct],t,o,n,i,r,s,a,d,c),l.base=t.__e,t.__u&=-161,l.__h.length&&s.push(l),S&&(l.__E=l.__=null)}catch(G){if(s.length=_,t.__v=null,d||r!=null){if(G.then){for(t.__u|=d?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;r!=null&&(r[r.indexOf(a)]=null),t.__e=a}else if(r!=null)for(Gt=r.length;Gt--;)Pt(r[Gt])}else t.__e=o.__e;t.__k==null&&(t.__k=o.__k||[]),G.then||re(t),m.__e(G,t,o)}}else r==null&&t.__v==o.__v?(t.__k=o.__k,t.__e=o.__e):a=t.__e=Je(o.__e,t,o,n,i,r,s,d,c);return(f=m.diffed)&&f(t),128&t.__u?void 0:a}function re(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(re))}function ie(e,t,o){for(var n=0;n<o.length;n++)Nt(o[n],o[++n],o[++n]);m.__c&&m.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(r){r.call(i)})}catch(r){m.__e(r,i.__v)}})}function se(e){return typeof e!="object"||e==null||e.__b>0?e:lt(e)?e.map(se):e.constructor!==void 0?null:P({},e)}function Je(e,t,o,n,i,r,s,a,d){var c,f,_,l,p,h,k,w=o.props||it,S=t.props,g=t.type;if(g=="svg"?i="http://www.w3.org/2000/svg":g=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(c=0;c<r.length;c++)if((p=r[c])&&"setAttribute"in p==!!g&&(g?p.localName==g:p.nodeType==3)){e=p,r[c]=null;break}}if(e==null){if(g==null)return document.createTextNode(S);e=document.createElementNS(i,g,S.is&&S),a&&(m.__m&&m.__m(t,r),a=!1),r=null}if(g==null)w===S||a&&e.data==S||(e.data=S);else{if(r=g=="textarea"&&S.defaultValue!=null?null:r&&nt.call(e.childNodes),!a&&r!=null)for(w={},c=0;c<e.attributes.length;c++)w[(p=e.attributes[c]).name]=p.value;for(c in w)p=w[c],c=="dangerouslySetInnerHTML"?_=p:c=="children"||c in S||c=="value"&&"defaultValue"in S||c=="checked"&&"defaultChecked"in S||ut(e,c,null,p,i);for(c in S)p=S[c],c=="children"?l=p:c=="dangerouslySetInnerHTML"?f=p:c=="value"?h=p:c=="checked"?k=p:a&&typeof p!="function"||w[c]===p||ut(e,c,p,w[c],i);if(f)a||_&&(f.__html==_.__html||f.__html==e.innerHTML)||(e.innerHTML=f.__html),t.__k=[];else if(_&&(e.innerHTML=""),te(t.type=="template"?e.content:e,lt(l)?l:[l],t,o,n,g=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,s,r?r[0]:o.__k&&D(o,0),a,d),r!=null)for(c=r.length;c--;)Pt(r[c]);a&&g!="textarea"||(c="value",g=="progress"&&h==null?e.removeAttribute("value"):h!=null&&(h!==e[c]||g=="progress"&&!h||g=="option"&&h!=w[c])&&ut(e,c,h,w[c],i),c="checked",k!=null&&k!=e[c]&&ut(e,c,k,w[c],i))}return e}function Nt(e,t,o){try{if(typeof e=="function"){var n=typeof e.__u=="function";n&&e.__u(),n&&t==null||(e.__u=e(t))}else e.current=t}catch(i){m.__e(i,o)}}function le(e,t,o){var n,i;if(m.unmount&&m.unmount(e),(n=e.ref)&&(n.current&&n.current!=e.__e||Nt(n,null,t)),(n=e.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(r){m.__e(r,t)}n.base=n.__P=n.__n=null}if(n=e.__k)for(i=0;i<n.length;i++)n[i]&&le(n[i],t,o||typeof e.type!="function");o||Pt(e.__e),e.__c=e.__=e.__e=void 0}function Xe(e,t,o){return this.constructor(e,o)}function zt(e,t,o){var n,i,r,s;t==document&&(t=document.documentElement),m.__&&m.__(e,t),i=(n=!1)?null:t.__k,r=[],s=[],Lt(t,e=t.__k=At(q,null,[e]),i||it,it,t.namespaceURI,i?null:t.firstChild?nt.call(t.childNodes):null,r,i?i.__e:t.firstChild,n,s),ie(r,e,s),e.props.children=null}nt=st.slice,m={__e:function(e,t,o,n){for(var i,r,s;t=t.__;)if((i=t.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(e)),s=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,n||{}),s=i.__d),s)return i.__E=i}catch(a){e=a}throw e}},Yt=0,ct.prototype.setState=function(e,t){var o;o=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=P({},this.state),typeof e=="function"&&(e=e(P({},o),this.props)),e&&P(o,e),e!=null&&this.__v&&(t&&this._sb.push(t),Qt(this))},ct.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Qt(this))},ct.prototype.render=q,L=[],Kt=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Jt=function(e,t){return e.__v.__b-t.__v.__b},dt.__r=0,$t=Math.random().toString(8),rt="__d"+$t,Y="__a"+$t,Xt=/(PointerCapture)$|Capture$/i,It=0,Et=ne(!1),Tt=ne(!0);var Ze=0;function u(e,t,o,n,i,r){t||(t={});var s,a,d=t;if("ref"in d)for(a in d={},t)a=="ref"?s=t[a]:d[a]=t[a];var c={type:e,props:d,key:o,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ze,__i:-1,__u:0,__source:i,__self:r};if(typeof e=="function"&&(s=e.defaultProps))for(a in s)d[a]===void 0&&(d[a]=s[a]);return m.vnode&&m.vnode(c),c}const ft="m-userscript-settings",Ht="m-open-settings-panel",ae=`${ft}-changed`,Qe={...{messagePlacement:"top",messageAlertDuration:"3000"},fileName:"<%ArtworkId>_p<%PageIndex>_<%AuthorId>",showHoverButton:!0,buttonPositionVertical:"bottom",buttonPositionHorizontal:"right",buttonPositionVerticalValue:"8",buttonPositionHorizontalValue:"8"};var K,y,Dt,ce,pt=0,de=[],b=m,ue=b.__b,fe=b.__r,pe=b.diffed,_e=b.__c,he=b.unmount,ge=b.__;function Bt(e,t){b.__h&&b.__h(y,e,pt||t),pt=0;var o=y.__H||(y.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function $(e){return pt=1,to(ye,e)}function to(e,t,o){var n=Bt(K++,2);if(n.t=e,!n.__c&&(n.__=[ye(void 0,t),function(a){var d=n.__N?n.__N[0]:n.__[0],c=n.t(d,a);d!==c&&(n.__N=[c,n.__[1]],n.__c.setState({}))}],n.__c=y,!y.__f)){var i=function(a,d,c){if(!n.__c.__H)return!0;var f=!1,_=n.__c.props!==a;if(n.__c.__H.__.some(function(p){if(p.__N){f=!0;var h=p.__[0];p.__=p.__N,p.__N=void 0,h!==p.__[0]&&(_=!0)}}),r){var l=r.call(this,a,d,c);return f?l||_:l}return!f||_};y.__f=!0;var r=y.shouldComponentUpdate,s=y.componentWillUpdate;y.componentWillUpdate=function(a,d,c){if(this.__e){var f=r;r=void 0,i(a,d,c),r=f}s&&s.call(this,a,d,c)},y.shouldComponentUpdate=i}return n.__N||n.__}function N(e,t){var o=Bt(K++,3);!b.__s&&ve(o.__H,t)&&(o.__=e,o.u=t,y.__H.__h.push(o))}function _t(e){return pt=5,eo(function(){return{current:e}},[])}function eo(e,t){var o=Bt(K++,7);return ve(o.__H,t)&&(o.__=e(),o.__H=t,o.__h=e),o.__}function oo(){for(var e;e=de.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(ht),t.__h.some(Mt),t.__h=[]}catch(o){t.__h=[],b.__e(o,e.__v)}}}b.__b=function(e){y=null,ue&&ue(e)},b.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),ge&&ge(e,t)},b.__r=function(e){fe&&fe(e),K=0;var t=(y=e.__c).__H;t&&(Dt===y?(t.__h=[],y.__h=[],t.__.some(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})):(t.__h.some(ht),t.__h.some(Mt),t.__h=[],K=0)),Dt=y},b.diffed=function(e){pe&&pe(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(de.push(t)!==1&&ce===b.requestAnimationFrame||((ce=b.requestAnimationFrame)||no)(oo)),t.__H.__.some(function(o){o.u&&(o.__H=o.u,o.u=void 0)})),Dt=y=null},b.__c=function(e,t){t.some(function(o){try{o.__h.some(ht),o.__h=o.__h.filter(function(n){return!n.__||Mt(n)})}catch(n){t.some(function(i){i.__h&&(i.__h=[])}),t=[],b.__e(n,o.__v)}}),_e&&_e(e,t)},b.unmount=function(e){he&&he(e);var t,o=e.__c;o&&o.__H&&(o.__H.__.some(function(n){try{ht(n)}catch(i){t=i}}),o.__H=void 0,t&&b.__e(t,o.__v))};var me=typeof requestAnimationFrame=="function";function no(e){var t,o=function(){clearTimeout(n),me&&cancelAnimationFrame(t),setTimeout(e)},n=setTimeout(o,35);me&&(t=requestAnimationFrame(o))}function ht(e){var t=y,o=e.__c;typeof o=="function"&&(e.__c=void 0,o()),y=t}function Mt(e){var t=y;e.__c=e.__(),y=t}function ve(e,t){return!e||e.length!==t.length||t.some(function(o,n){return o!==e[n]})}function ye(e,t){return typeof t=="function"?t(e):t}class ro{constructor(t,o){this.storageKey=t,this.defaultSettings=o}loadSettings(){try{const t=localStorage.getItem(this.storageKey);if(t){const o=JSON.parse(t);return{...this.defaultSettings,...o}}}catch{}return{...this.defaultSettings}}saveSettings(t){const n={...this.loadSettings(),...t};try{localStorage.setItem(this.storageKey,JSON.stringify(n))}catch{}return n}resetSettings(){try{localStorage.removeItem(this.storageKey)}catch{}return{...this.defaultSettings}}}function gt(e){const t=e.trim();return/^\d+$/.test(t)?`${t}px`:t}let J=0;const be=e=>{e.preventDefault(),e.returnValue=""},X={add:()=>{J===0&&window.addEventListener("beforeunload",be),J++},remove:()=>{J--,J<=0&&(J=0,window.removeEventListener("beforeunload",be))}};async function io(e,t,o){return X.add(),new Promise((n,i)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:"blob",...o?.headers&&{headers:o.headers},onload:r=>{try{const s=r.response,a=URL.createObjectURL(s),d=document.createElement("a");d.href=a,d.download=t,d.style.display="none",document.body.appendChild(d),d.click(),setTimeout(()=>{d.remove(),URL.revokeObjectURL(a)},100),n()}catch(s){i(s)}finally{X.remove()}},onerror:r=>{X.remove(),i(r)}})})}let so={data:""},lo=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||so},ao=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,co=/\/\*[^]*?\*\/|  +/g,we=/\n+/g,z=(e,t)=>{let o="",n="",i="";for(let r in e){let s=e[r];r[0]=="@"?r[1]=="i"?o=r+" "+s+";":n+=r[1]=="f"?z(s,r):r+"{"+z(s,r[1]=="k"?"":t)+"}":typeof s=="object"?n+=z(s,t?t.replace(/([^,])+/g,a=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,a):a?a+" "+d:d)):r):s!=null&&(r=r[1]=="-"?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=z.p?z.p(r,s):r+":"+s+";")}return o+(t&&i?t+"{"+i+"}":i)+n},H={},xe=e=>{if(typeof e=="object"){let t="";for(let o in e)t+=o+xe(e[o]);return t}return e},uo=(e,t,o,n,i)=>{let r=xe(e),s=H[r]||(H[r]=(d=>{let c=0,f=11;for(;c<d.length;)f=101*f+d.charCodeAt(c++)>>>0;return"go"+f})(r));if(!H[s]){let d=r!==e?e:(c=>{let f,_,l=[{}];for(;f=ao.exec(c.replace(co,""));)f[4]?l.shift():f[3]?(_=f[3].replace(we," ").trim(),l.unshift(l[0][_]=l[0][_]||{})):l[0][f[1]]=f[2].replace(we," ").trim();return l[0]})(e);H[s]=z(i?{["@keyframes "+s]:d}:d,o?"":"."+s)}let a=o&&H.g;return o&&(H.g=H[s]),((d,c,f,_)=>{_?c.data=c.data.replace(_,d):c.data.indexOf(d)===-1&&(c.data=f?d+c.data:c.data+d)})(H[s],t,n,a),s},fo=(e,t,o)=>e.reduce((n,i,r)=>{let s=t[r];if(s&&s.call){let a=s(o),d=a&&a.props&&a.props.className||/^go/.test(a)&&a;s=d?"."+d:a&&typeof a=="object"?a.props?"":z(a,""):a===!1?"":a}return n+i+(s??"")},"");function Ut(e){let t=this||{},o=e.call?e(t.p):e;return uo(o.unshift?o.raw?fo(o,[].slice.call(arguments,1),t.p):o.reduce((n,i)=>Object.assign(n,i&&i.call?i(t.p):i),{}):o,lo(t.target),t.g,t.o,t.k)}let Se,Vt,Rt;Ut.bind({g:1});let po=Ut.bind({k:1});function _o(e,t,o,n){z.p=t,Se=e,Vt=o,Rt=n}function x(e,t){let o=this||{};return function(){let n=arguments;function i(r,s){let a=Object.assign({},r),d=a.className||i.className;o.p=Object.assign({theme:Vt&&Vt()},a),o.o=/go\d/.test(d),a.className=Ut.apply(o,n)+(d?" "+d:"");let c=e;return e[0]&&(c=a.as||e,delete a.as),Rt&&c[0]&&Rt(a),Se(c,a)}return i}}_o(At);const ho=x("div")`
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
`,go=x("span")`
  float: right;
  margin-left: 8px;
  font-weight: bold;
  opacity: 0.7;
  font-size: 16px;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;function mo({type:e="info",content:t,duration:o=3e3,onClose:n,onClick:i,className:r,style:s}){const a=_t(null),d=_t(0),c=_t(o),f=()=>{a.current&&(clearTimeout(a.current),a.current=null)},_=h=>{f(),h>0&&(d.current=Date.now(),a.current=window.setTimeout(()=>{n?.()},h))},l=()=>{if(a.current){const h=Date.now()-d.current;c.current=Math.max(0,c.current-h),f()}},p=()=>{c.current>0&&_(c.current)};return N(()=>(o>0&&(c.current=o,_(o)),f),[o,n]),u(ho,{className:`message-${e} ${r||""}`,style:s,onClick:()=>{i?.(),n?.()},onMouseEnter:l,onMouseLeave:p,children:[t,u(go,{children:"×"})]})}const ke=3e3,Ce=()=>{try{return JSON.parse(localStorage.getItem(ft)||"{}")}catch{return{}}},vo=()=>Ce().messagePlacement||"top",yo=()=>{const e=Ce().messageAlertDuration;if(e==null||e==="")return ke;const t=parseInt(String(e),10);return t>0?t:0},bo=e=>e==="warning"||e==="error"?yo():ke,Z=new Map;let wo=0;const xo=e=>{const[t,o]=e.split("-");let r=`${t}: 20px; display: flex; flex-direction: ${t==="bottom"?"column-reverse":"column"};`;return o?r+=` ${o}: 20px;`:r+=" left: 50%; transform: translateX(-50%);",r},So=(e="top")=>{if(!Z.has(e)){const t=document.createElement("div");t.id=`userscript-message-container-${e}`,t.style.cssText=`
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      ${xo(e)}
    `,document.body.appendChild(t),Z.set(e,t)}return Z.get(e)},ko=e=>{const t=e.placement||"top",o=So(t),n=`userscript-message-${++wo}`,i=document.createElement("div");i.id=n;const r=t.startsWith("bottom");i.style.cssText=`
    position: relative;
    margin-bottom: 8px;
    pointer-events: auto;
    animation: ${r?"messageSlideInBottom":"messageSlideIn"} 0.3s ease-out;
  `,o.appendChild(i);const s=()=>{if(i.parentNode){const a=t.startsWith("bottom");i.style.animation=`${a?"messageSlideOutBottom":"messageSlideOut"} 0.3s ease-in forwards`,setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},300)}};return zt(At(mo,{...e,onClose:s}),i),s},mt=e=>(t,o,n,i)=>ko({type:e,content:t,placement:n||vo(),duration:o??bo(e),...i&&{onClick:i}}),Co=mt("success"),$o=mt("error"),Io=mt("warning"),Eo=mt("info"),B={success:Co,error:$o,warning:Io,info:Eo,destroy:()=>{Z.forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)}),Z.clear()}},$e="userscript-message-styles";if(!document.getElementById($e)){const e=document.createElement("style");e.id=$e,e.textContent=`
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
`,document.head.appendChild(e)}const Ie="en",Ee="userscript-locale";let F=Ie;const vt={},yt=[],Te=()=>navigator?.language?.toLowerCase().startsWith("zh")?"zh":"en";try{F=localStorage.getItem(Ee)||Te()}catch{F=Te()}const Pe=(e,t)=>{const o={...e};for(const n of Object.keys(t))t[n]!==null&&typeof t[n]=="object"&&!Array.isArray(t[n])&&e[n]!==null&&typeof e[n]=="object"&&!Array.isArray(e[n])?o[n]=Pe(e[n],t[n]):o[n]=t[n];return o},Ae=(e,t)=>{let o=e;for(const n of t.split("."))if(o=o?.[n],!o)return;return typeof o=="string"?o:void 0},To=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,n)=>t[n]??"{"+n+"}"):e;function Po(e,t){const o=typeof e=="string"?e:e.key,n=typeof e=="string"?t:e.params,i=Ae(vt[F],o)||Ae(vt[Ie],o)||o;return To(i,n)}const I={addTranslations(e,t){vt[e]=Pe(vt[e]||{},t)},setLocale(e){if(F!==e){F=e;try{localStorage.setItem(Ee,e)}catch{}yt.forEach(t=>t())}},getLocale(){return F},t:Po,subscribe(e){return yt.push(e),()=>{const t=yt.indexOf(e);t>-1&&yt.splice(t,1)}}};function M(){const[e,t]=$(I.getLocale());N(()=>I.subscribe(()=>{t(I.getLocale())}),[]);const o=n=>I.setLocale(n);return{t:I.t,locale:e,setLocale:o}}function Ao(e){return{textColor:e?"#e1e8ed":"#333",backgroundColor:e?"#1e1e1e":"white",borderColor:e?"#38444d":"#ddd",secondaryTextColor:e?"#8b98a5":"#666",inputBackground:e?"#253341":"white",inputBorder:e?"#38444d":"#ddd",panelBackground:e?"#1e1e1e":"white"}}function A(){const[e,t]=$(()=>window.matchMedia?.("(prefers-color-scheme: dark)").matches||!1);return N(()=>{const o=window.matchMedia("(prefers-color-scheme: dark)"),n=i=>t(i.matches);if(o.addEventListener)return o.addEventListener("change",n),()=>o.removeEventListener("change",n);if(o.addListener)return o.addListener(n),()=>o.removeListener?.(n)},[]),{theme:Ao(e),isDark:e}}var Lo=Symbol.for("preact-signals");function Ft(){if(U>1)U--;else{var e,t=!1;for((function(){var i=xt;for(xt=void 0;i!==void 0;){var r=i.S;if(r.v===i.v)for(var s=r.t;s!==void 0;s=s.x)s.i===i.i&&(s.i=r.i);i=i.o}})();tt!==void 0;){var o=tt;for(tt=void 0,wt++;o!==void 0;){var n=o.u;if(o.u=void 0,o.f&=-3,!(8&o.f)&&ze(o))try{o.c()}catch(i){t||(e=i,t=!0)}o=n}}if(wt=0,U--,t)throw e}}var Q,v=void 0;function bt(e){var t=v,o=Q;v=void 0,Q=void 0;try{return e()}finally{v=t,Q=o}}var tt=void 0,U=0,wt=0,Le=0,xt=void 0,St=0;function Ne(e){if(v!==void 0){var t=e.n;if(t===void 0||t.t!==v)return t={i:0,S:e,p:v.s,n:void 0,t:v,e:void 0,x:void 0,r:t},v.s!==void 0&&(v.s.n=t),v.s=t,e.n=t,32&v.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=v.s,t.n=void 0,v.s.n=t,v.s=t),t}}function C(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}C.prototype.brand=Lo,C.prototype.h=function(){return!0},C.prototype.S=function(e){var t=this,o=this.t;o!==e&&e.e===void 0&&(e.x=o,this.t=e,o!==void 0?o.e=e:bt(function(){var n;(n=t.W)==null||n.call(t)}))},C.prototype.U=function(e){var t=this;if(this.t!==void 0){var o=e.e,n=e.x;o!==void 0&&(o.x=n,e.e=void 0),n!==void 0&&(n.e=o,e.x=void 0),e===this.t&&(this.t=n,n===void 0&&bt(function(){var i;(i=t.Z)==null||i.call(t)}))}},C.prototype.subscribe=function(e){var t=this;return Do(function(){var o=t.value;bt(function(){return e(o)})},{name:"sub"})},C.prototype.valueOf=function(){return this.value},C.prototype.toString=function(){return this.value+""},C.prototype.toJSON=function(){return this.value},C.prototype.peek=function(){var e=this;return bt(function(){return e.value})},Object.defineProperty(C.prototype,"value",{get:function(){var e=Ne(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(wt>100)throw new Error("Cycle detected");(function(o){U!==0&&wt===0&&o.l!==Le&&(o.l=Le,xt={S:o,v:o.v,i:o.i,o:xt})})(this),this.v=e,this.i++,St++,U++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Ft()}}}});function No(e,t){return new C(e,t)}function ze(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function He(e){for(var t=e.s;t!==void 0;t=t.n){var o=t.S.n;if(o!==void 0&&(t.r=o),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function De(e){for(var t=e.s,o=void 0;t!==void 0;){var n=t.p;t.i===-1?(t.S.U(t),n!==void 0&&(n.n=t.n),t.n!==void 0&&(t.n.p=n)):o=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=n}e.s=o}function V(e,t){C.call(this,void 0,t),this.x=e,this.s=void 0,this.g=St-1,this.f=4}V.prototype=new C,V.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===St))return!0;if(this.g=St,this.f|=1,this.i>0&&!ze(this))return this.f&=-2,!0;var e=v;try{He(this),v=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(o){this.v=o,this.f|=16,this.i++}return v=e,De(this),this.f&=-2,!0},V.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}C.prototype.S.call(this,e)},V.prototype.U=function(e){if(this.t!==void 0&&(C.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},V.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(V.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var e=Ne(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function zo(e,t){return new V(e,t)}function Be(e){var t=e.m;if(e.m=void 0,typeof t=="function"){U++;var o=v;v=void 0;try{t()}catch(n){throw e.f&=-2,e.f|=8,Ot(e),n}finally{v=o,Ft()}}}function Ot(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Be(e)}function Ho(e){if(v!==this)throw new Error("Out-of-order effect");De(this),v=e,this.f&=-2,8&this.f&&Ot(this),Ft()}function O(e,t){this.x=e,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=t?.name,Q&&Q.push(this)}O.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t=="function"&&(this.m=t)}finally{e()}},O.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Be(this),He(this),U++;var e=v;return v=this,Ho.bind(this,e)},O.prototype.N=function(){2&this.f||(this.f|=2,this.u=tt,tt=this)},O.prototype.d=function(){this.f|=8,1&this.f||Ot(this)},O.prototype.dispose=function(){this.d()};function Do(e,t){var o=new O(e,t);try{o.c()}catch(i){throw o.d(),i}var n=o.d.bind(o);return n[Symbol.dispose]=n,n}const Bo=x("button")`
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
`,Mo={primary:{"--bg":"#1da1f2","--color":"white","--border":"none"},secondary:e=>({"--bg":e.inputBackground,"--color":e.textColor,"--border":`1px solid ${e.borderColor}`}),danger:{"--bg":"#dc3545","--color":"white","--border":"none"}},Uo={small:{"--padding":"6px 12px","--font-size":"12px"},medium:{"--padding":"8px 16px","--font-size":"14px"},large:{"--padding":"12px 24px","--font-size":"16px"}};function j({children:e,onClick:t,disabled:o=!1,variant:n="primary",size:i="medium",className:r="",style:s={},type:a="button"}){const{theme:d}=A(),f={...(()=>{const _=Mo[n];return typeof _=="function"?_(d):_})(),...Uo[i],"--cursor":o?"not-allowed":"pointer","--opacity":o?"0.6":"1",...s};return u(Bo,{className:r,style:f,onClick:t,disabled:o,type:a,children:e})}const Vo=x("label")`
  display: flex;
  align-items: center;
  cursor: var(--cursor);
  color: var(--text-color);
  opacity: var(--opacity);
`,Ro=x("input")`
  margin-right: 8px;
  accent-color: #1da1f2;
  cursor: var(--cursor);
`;function Fo({checked:e,defaultChecked:t,disabled:o=!1,onChange:n,children:i,className:r="",style:s={}}){const{theme:a}=A(),d={"--cursor":o?"not-allowed":"pointer","--text-color":a.textColor,"--opacity":o?"0.6":"1",...s};return u(Vo,{className:r,style:d,children:[u(Ro,{type:"checkbox",checked:e,defaultChecked:t,disabled:o,onChange:c=>n?.(c.currentTarget.checked),style:{"--cursor":o?"not-allowed":"pointer"}}),i]})}const Oo=x("input")`
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
`;function kt({type:e="text",value:t,defaultValue:o,placeholder:n,disabled:i=!1,onChange:r,onBlur:s,onFocus:a,className:d="",style:c={}}){const{theme:f}=A(),_={"--input-border":f.inputBorder,"--input-bg":f.inputBackground,"--input-text":f.textColor,...c};return u(Oo,{type:e,value:t,defaultValue:o,placeholder:n,disabled:i,className:d,style:_,onChange:l=>r?.(l.currentTarget.value),onBlur:s,onFocus:a})}function jo({value:e,options:t,onChange:o,placeholder:n,className:i,style:r}){const{theme:s}=A(),a={padding:"6px 8px",borderRadius:"4px",border:`1px solid ${s.borderColor}`,backgroundColor:s.backgroundColor,color:s.textColor,fontSize:"14px",cursor:"pointer",outline:"none",...r};return u("select",{value:e,onChange:c=>{const f=c.target;o(f.value)},className:i,style:a,children:[n&&u("option",{value:"",disabled:!0,children:n}),t.map(c=>u("option",{value:c.value,children:c.label},c.value))]})}const Wo=x("div")`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }
`,Go=x("div")`
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-header-bg);
  border-radius: 12px 12px 0 0;
`,Yo=x("h3")`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
`,qo=x("div")`
  padding: 20px;
`;function jt({title:e,children:t,className:o="",style:n={}}){const{theme:i,isDark:r}=A(),s={"--card-bg":i.panelBackground,"--card-border":i.borderColor,"--card-header-bg":r?"rgba(255, 255, 255, 0.02)":"rgba(0, 0, 0, 0.01)","--card-title-color":i.textColor,...n};return u(Wo,{className:o,style:s,children:[e&&u(Go,{children:u(Yo,{children:e})}),u(qo,{children:t})]})}function Ko({placement:e,alertDuration:t,onPlacementChange:o,onAlertDurationChange:n}){const{theme:i}=A(),{t:r}=M(),s=[{value:"top",label:r("common.messagePlacement.top")},{value:"bottom",label:r("common.messagePlacement.bottom")},{value:"top-left",label:r("common.messagePlacement.topLeft")},{value:"top-right",label:r("common.messagePlacement.topRight")},{value:"bottom-left",label:r("common.messagePlacement.bottomLeft")},{value:"bottom-right",label:r("common.messagePlacement.bottomRight")}],a={marginBottom:"20px"},d={display:"block",marginBottom:"8px",fontWeight:500,fontSize:"14px",color:i.textColor},c={marginTop:"6px",fontSize:"12px",color:i.secondaryTextColor},f={width:"100%",boxSizing:"border-box"};return u(jt,{title:r("common.generalSettings.title"),children:[u("div",{style:a,children:[u("label",{style:d,children:r("common.messagePlacement.label")}),u(jo,{value:e,options:s,onChange:_=>o(_),style:f})]}),u("div",{children:[u("label",{style:d,children:r("common.messageAlertDuration.label")}),u(kt,{value:t,onChange:n,placeholder:r("common.messageAlertDuration.placeholder")}),u("div",{style:c,children:r("common.messageAlertDuration.help")})]})]})}const Jo={zh:"en",en:"zh"},Xo={zh:"中文",en:"English"};function Zo(){const{locale:e,setLocale:t}=M(),o=Jo[e];return u(j,{variant:"secondary",size:"small",onClick:()=>t(o),children:`🌐 ${Xo[o]}`})}const Qo=x("div")`
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
`,tn=x("div")`
  background: var(--modal-bg);
  color: var(--modal-text);
  border-radius: 12px;
  padding: 24px;
  min-width: 480px;
  width: auto;
  max-width: 50vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  @media (max-width: 640px) {
    min-width: auto;
    width: 90vw;
  }
`;function en({isOpen:e,onClose:t,title:o,headerActions:n,children:i,className:r="",style:s={}}){const{theme:a}=A();if(N(()=>{if(!e)return;const l=p=>{p.key==="Escape"&&t()};return document.addEventListener("keydown",l),()=>document.removeEventListener("keydown",l)},[e,t]),!e)return null;const d={"--modal-bg":a.panelBackground,"--modal-text":a.textColor,...s},c={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:o||n?"20px":"0"},f={margin:0,color:a.textColor,fontSize:"20px",fontWeight:600},_={background:"none",border:"none",cursor:"pointer",color:a.secondaryTextColor,padding:0,width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"4px",transition:"background-color 0.2s ease"};return u(Qo,{onClick:t,children:u(tn,{className:r,style:d,onClick:l=>l.stopPropagation(),children:[u("div",{style:c,children:[o&&u("h2",{style:f,children:o}),u("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexShrink:0},children:[n,u("button",{style:_,onClick:t,onMouseEnter:l=>{const p=l.currentTarget;p.style.backgroundColor=a.borderColor},onMouseLeave:l=>{const p=l.currentTarget;p.style.backgroundColor="transparent"},children:u("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:u("path",{d:"M6 6l12 12M18 6L6 18"})})})]})]}),u("div",{children:i})]})})}const on=4e3;function nn({onReset:e}){const{t}=M(),[o,n]=$(!1);return N(()=>{if(!o)return;const r=window.setTimeout(()=>n(!1),on);return()=>window.clearTimeout(r)},[o]),u(j,{variant:o?"danger":"secondary",onClick:()=>{if(!o){n(!0);return}n(!1),e()},children:t(o?"common.resetConfirm":"common.resetSettings")})}const rn=x("button")`
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
`,sn=x("svg")`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;function ln({onClick:e,isVisible:t,backgroundColor:o="#1da1f2"}){return u(rn,{style:{"--left-position":t?"10px":"-40px"},onClick:e,$bgColor:o,children:u(sn,{viewBox:"0 0 24 24",children:u("path",{d:"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})})})}function an({values:e,onChange:t}){const{theme:o}=A(),{t:n}=M(),i={display:"block",marginBottom:"8px",fontWeight:500,fontSize:"14px",color:o.textColor};return u(jt,{title:n("settings.position.title"),children:u("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[u("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap"},children:[u("div",{style:{flex:"1",minWidth:"120px"},children:[u("label",{style:i,children:n("settings.position.vertical")}),u("div",{style:{display:"flex",gap:"8px"},children:[u(j,{variant:e.buttonPositionVertical==="top"?"primary":"secondary",size:"small",onClick:()=>t("buttonPositionVertical","top"),children:n("settings.position.top")}),u(j,{variant:e.buttonPositionVertical==="bottom"?"primary":"secondary",size:"small",onClick:()=>t("buttonPositionVertical","bottom"),children:n("settings.position.bottom")})]})]}),u("div",{style:{flex:"1",minWidth:"120px"},children:[u("label",{style:i,children:n("settings.position.verticalValue")}),u(kt,{value:e.buttonPositionVerticalValue,onChange:r=>t("buttonPositionVerticalValue",r),placeholder:"8"})]})]}),u("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap"},children:[u("div",{style:{flex:"1",minWidth:"120px"},children:[u("label",{style:i,children:n("settings.position.horizontal")}),u("div",{style:{display:"flex",gap:"8px"},children:[u(j,{variant:e.buttonPositionHorizontal==="left"?"primary":"secondary",size:"small",onClick:()=>t("buttonPositionHorizontal","left"),children:n("settings.position.left")}),u(j,{variant:e.buttonPositionHorizontal==="right"?"primary":"secondary",size:"small",onClick:()=>t("buttonPositionHorizontal","right"),children:n("settings.position.right")})]})]}),u("div",{style:{flex:"1",minWidth:"120px"},children:[u("label",{style:i,children:n("settings.position.horizontalValue")}),u(kt,{value:e.buttonPositionHorizontalValue,onChange:r=>t("buttonPositionHorizontalValue",r),placeholder:"8"})]})]}),u("div",{style:{fontSize:"12px",color:o.secondaryTextColor},children:n("settings.position.valueHelp")})]})})}function cn(e,t){const o=new ro(e,t),n=No(o.loadSettings()),i=zo(()=>n.value),r=c=>{const f=o.saveSettings(c);n.value=f,window.dispatchEvent(new CustomEvent(ae))};return{get settings(){return i.value},updateSettings:r,resetSettings:()=>{const c=o.resetSettings();return n.value=c,window.dispatchEvent(new CustomEvent(ae)),c},getSetting:c=>n.value[c],setSetting:(c,f)=>{r({[c]:f})},signal:n}}const W=cn(ft,Qe);function Wt(){const[e,t]=$(W.signal.value);return N(()=>{const o=W.signal.subscribe(n=>{t(n)});return()=>o()},[]),{settings:e,setSetting:W.setSetting,updateSettings:W.updateSettings,resetSettings:W.resetSettings,getSetting:W.getSetting}}const dn={common:{ok:"确定",cancel:"取消",close:"关闭",reset:"重置",resetSettings:"重置为默认设置",resetConfirm:"确认重置？",save:"保存",loading:"加载中...",error:"错误",success:"成功",warning:"警告",info:"信息",generalSettings:{title:"通用设置"},messagePlacement:{label:"消息弹窗位置",top:"顶部居中",bottom:"底部居中",topLeft:"左上角",topRight:"右上角",bottomLeft:"左下角",bottomRight:"右下角"},messageAlertDuration:{label:"警告提示时长(ms)",placeholder:"3000",help:"警告/错误提示的停留时长（毫秒）。填 0 或负数则常驻不消失，需手动关闭。成功提示固定 3 秒。"}},button:{download:"下载",settings:"设置"},settings:{position:{title:"按钮位置设置",vertical:"垂直方向",horizontal:"水平方向",top:"上",bottom:"下",left:"左",right:"右",verticalValue:"垂直距离",horizontalValue:"水平距离",valueHelp:"纯数字默认 px，也可输入带单位的值如 1rem、10%"}}},un={common:{ok:"OK",cancel:"Cancel",close:"Close",reset:"Reset",resetSettings:"Reset to default settings",resetConfirm:"Confirm reset?",save:"Save",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Info",generalSettings:{title:"General Settings"},messagePlacement:{label:"Message Placement",top:"Top Center",bottom:"Bottom Center",topLeft:"Top Left",topRight:"Top Right",bottomLeft:"Bottom Left",bottomRight:"Bottom Right"},messageAlertDuration:{label:"Alert Duration (ms)",placeholder:"3000",help:"How long warning/error messages stay, in milliseconds. 0 or negative keeps them until dismissed. Success messages always stay 3s."}},button:{download:"Download",settings:"Settings"},settings:{position:{title:"Button Position",vertical:"Vertical",horizontal:"Horizontal",top:"Top",bottom:"Bottom",left:"Left",right:"Right",verticalValue:"Vertical Offset",horizontalValue:"Horizontal Offset",valueHelp:"Pure numbers default to px, also supports values like 1rem, 10%"}}},fn={title:"Pixiv Downloader 设置",settings:{image:{title:"图片下载设置",fileName:"图片文件名格式",fileNamePlaceholder:"<%ArtworkId>_p<%PageIndex>_<%AuthorId>",fileNameHelp:"可用变量：<%ArtworkId>、<%PageIndex>、<%AuthorId>、<%AuthorName>、<%ArtworkTitle>、<%Time>",showHoverButton:"显示悬停下载按钮",showHoverButtonHelp:"鼠标悬停在图片上时显示下载按钮"}},ui:{downloadImage:"下载图片",downloadAll:"下载全部",downloading:"下载中",downloadAllTitle:"下载作品的所有图片",downloadComplete:"下载完成 ({count} 张)",downloadFailed:"下载失败 ({count} 张)，点击定位",downloadSuccess:"下载成功",downloadError:"下载失败"}},pn={title:"Pixiv Downloader Settings",settings:{image:{title:"Image Download Settings",fileName:"Image filename format",fileNamePlaceholder:"<%ArtworkId>_p<%PageIndex>_<%AuthorId>",fileNameHelp:"Available variables: <%ArtworkId>, <%PageIndex>, <%AuthorId>, <%AuthorName>, <%ArtworkTitle>, <%Time>",showHoverButton:"Show hover download button",showHoverButtonHelp:"Show download button when hovering over images"}},ui:{downloadImage:"Download Image",downloadAll:"Download All",downloading:"Downloading",downloadAllTitle:"Download all images of this artwork",downloadComplete:"Download complete ({count} images)",downloadFailed:"Download failed ({count} images), click to locate",downloadSuccess:"Download successful",downloadError:"Download failed"}};I.addTranslations("zh",dn),I.addTranslations("zh",fn),I.addTranslations("en",un),I.addTranslations("en",pn);function _n({isOpen:e,onClose:t}){const{settings:o,setSetting:n,resetSettings:i}=Wt(),{t:r}=M(),{theme:s}=A(),[a,d]=$(0),c={marginBottom:"20px"},f={display:"block",marginBottom:"8px",fontWeight:500,fontSize:"14px",color:s.textColor},_={marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor,paddingLeft:"24px"};return u(en,{isOpen:e,onClose:t,title:r("title"),headerActions:u(Zo,{}),children:u("div",{children:[u(Ko,{placement:o.messagePlacement,alertDuration:o.messageAlertDuration,onPlacementChange:l=>n("messagePlacement",l),onAlertDurationChange:l=>n("messageAlertDuration",l)}),u(jt,{title:r("settings.image.title"),children:[u("div",{style:c,children:[u("label",{style:f,children:r("settings.image.fileName")}),u(kt,{value:o.fileName,onChange:l=>n("fileName",l),placeholder:r("settings.image.fileNamePlaceholder")}),u("div",{style:{marginTop:"6px",fontSize:"12px",color:s.secondaryTextColor},children:r("settings.image.fileNameHelp")})]}),u("div",{children:[u(Fo,{checked:o.showHoverButton,onChange:l=>n("showHoverButton",l),children:r("settings.image.showHoverButton")}),u("div",{style:_,children:r("settings.image.showHoverButtonHelp")})]})]}),u(an,{values:{buttonPositionVertical:o.buttonPositionVertical,buttonPositionHorizontal:o.buttonPositionHorizontal,buttonPositionVerticalValue:o.buttonPositionVerticalValue,buttonPositionHorizontalValue:o.buttonPositionHorizontalValue},onChange:(l,p)=>{n(l,p)}}),u("div",{style:{display:"flex",justifyContent:"flex-end"},children:u(nn,{onReset:()=>{i(),d(l=>l+1)}})})]},a)})}async function Me(){try{const e=window.location.pathname.match(/\/artworks\/(\d+)/)?.[1];if(!e)return null;const o=await(await fetch(`https://www.pixiv.net/ajax/illust/${e}`)).json();if(o.error)throw new Error("Failed to fetch artwork info");const n=o.body;return{artworkId:n.illustId,authorId:n.userId,authorName:n.userName,artworkTitle:n.illustTitle,pageCount:n.pageCount||1,currentPage:1}}catch{return null}}async function Ue(e){const o=await(await fetch(`https://www.pixiv.net/ajax/illust/${e}/pages`)).json();if(o.error)throw new Error("Failed to fetch artwork pages");return o.body.map(n=>n.urls.original)}async function hn(e,t){try{const o=e.closest('a[href*="i.pximg.net/img-original"]');if(o?.href){const s=o.href,a=s.split(".").pop()||"png",d=s.match(/_p(\d+)\./),c=d?parseInt(d[1]||"0",10):0;return{originalUrl:s,previewUrl:e.src,extension:a,pageIndex:c}}const n=await Ue(t),i=e.src.match(/_p(\d+)_/),r=i?parseInt(i[1]||"0",10):0;if(n[r]){const s=n[r],a=s.split(".").pop()||"png";return{originalUrl:s,previewUrl:e.src,extension:a,pageIndex:r}}return null}catch{return null}}async function gn(e){try{return(await Ue(e.artworkId)).map((o,n)=>({originalUrl:o,previewUrl:o.replace("img-original","img-master").replace(/\.(png|jpg|gif)$/,"_master1200.jpg"),extension:o.split(".").pop()||"png",pageIndex:n}))}catch{return[]}}function mn(e,t,o){const n={ArtworkId:t.artworkId,PageIndex:String(o),AuthorId:t.authorId,AuthorName:t.authorName,ArtworkTitle:t.artworkTitle,Time:String(Date.now())};let i=e;for(const[r,s]of Object.entries(n))i=i.replace(new RegExp(`<%${r}>`,"g"),s||"");return i=i.replace(/[<>:"/\\|?*]/g,"_"),i}async function Ve(e,t,o,n=!0){try{const i=mn(o.fileName,t,e.pageIndex);await io(e.originalUrl,`${i}.${e.extension}`,{headers:{Referer:"https://www.pixiv.net/"}}),n&&B.success(I.t("ui.downloadSuccess"))}catch(i){throw B.error(I.t("ui.downloadError")),i}}async function vn(e,t,o,n){const i=e.length,r={success:0,failed:[]};X.add();try{for(let s=0;s<i;s++){const a=e[s];if(a){n&&n(s+1,i);try{await Ve(a,t,o,!1),r.success++}catch(d){r.failed.push({pageIndex:a.pageIndex,error:d})}s<i-1&&await new Promise(d=>setTimeout(d,500))}}}finally{X.remove()}return r}const yn=po`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,bn=x("svg")`
  width: 20px;
  height: 20px;
  fill: white;
`,wn=x("svg")`
  width: 18px;
  height: 18px;
  animation: ${yn} 1s linear infinite;
  fill: none;
  stroke: white;
  stroke-width: 2;
`,Re=()=>u(bn,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:u("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})}),xn=()=>u(wn,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[u("circle",{cx:"12",cy:"12",r:"10","stroke-opacity":"0.25"}),u("path",{d:"M12 2 A10 10 0 0 1 22 12","stroke-linecap":"round"})]}),Sn=x("button")`
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
`;function kn({artworkInfo:e,isVisible:t,onDownloadingChange:o}){const[n,i]=$(!1),[r,s]=$({current:0,total:0}),{settings:a}=Wt(),{t:d}=M(),c=async l=>{if(l.preventDefault(),l.stopPropagation(),!n){i(!0),o?.(!0),s({current:0,total:0});try{const p=await gn(e);if(p.length===0)return;const h=await vn(p,e,a,(k,w)=>{s({current:k,total:w})});if(h.failed.length>0){const k=h.failed[0];B.error(d("ui.downloadFailed",{count:h.failed.length}),void 0,void 0,()=>{document.querySelector(`img[src*="i.pximg.net/img-master"][src*="_p${k?.pageIndex}"]`)?.scrollIntoView({behavior:"smooth",block:"center"})})}else B.success(d("ui.downloadComplete",{count:p.length}))}finally{i(!1),o?.(!1),s({current:0,total:0})}}},f=n?`${d("ui.downloading")} ${r.current}/${r.total}`:`${d("ui.downloadAll")} (${e.pageCount})`;return u(Sn,{style:{"--left-position":t?"10px":"-200px"},onClick:c,disabled:n,title:d("ui.downloadAllTitle"),children:[u(Re,{}),u("span",{children:f})]})}function Cn(){const[e,t]=$(!1),[o,n]=$(!1),[i,r]=$(!1),[s,a]=$(null),d=_t(null);N(()=>{const f=l=>{d.current===null&&(d.current=requestAnimationFrame(()=>{d.current=null;const p=l.clientX<100&&l.clientY>window.innerHeight*(2/3);n(p)}))},_=()=>t(!0);return document.addEventListener("mousemove",f),window.addEventListener(Ht,_),()=>{document.removeEventListener("mousemove",f),window.removeEventListener(Ht,_),d.current!==null&&cancelAnimationFrame(d.current)}},[]),N(()=>{Me().then(a)},[]);const c=o||e||i;return u(q,{children:[s&&u(kn,{artworkInfo:s,isVisible:c,onDownloadingChange:r}),u(ln,{onClick:()=>t(!0),isVisible:c,backgroundColor:"#0096fa"}),u(_n,{isOpen:e,onClose:()=>t(!1)})]})}const $n=x("button")`
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
`;function In({targetImage:e}){const{settings:t}=Wt(),[o,n]=$(!1),{t:i}=M();if(!t.showHoverButton)return null;const r=async a=>{if(a.preventDefault(),a.stopPropagation(),!o){n(!0);try{const d=await Me();if(!d){B.error(i("ui.downloadError"));return}const c=await hn(e,d.artworkId);if(!c){B.error(i("ui.downloadError"));return}await Ve(c,d,t)}catch{B.error(i("ui.downloadError"))}finally{n(!1)}}},s={};return t.buttonPositionVertical==="top"?s.top=gt(t.buttonPositionVerticalValue):s.bottom=gt(t.buttonPositionVerticalValue),t.buttonPositionHorizontal==="left"?s.left=gt(t.buttonPositionHorizontalValue):s.right=gt(t.buttonPositionHorizontalValue),u($n,{onClick:r,disabled:o,title:"下载图片",style:s,children:o?u(xn,{}):u(Re,{})})}function En(e){const t=e.closest('a[href*="i.pximg.net/img-original"]');if(t?.parentElement)return t.parentElement;let o=e.parentElement,n=0;for(;o&&n<5;){if(o.tagName==="DIV"&&o.style.position!=="static")return o;o=o.parentElement,n++}return e.parentElement}function Tn(e){window.getComputedStyle(e).position==="static"&&(e.style.position="relative")}GM_registerMenuCommand("⚙️ Settings / 设置",()=>{window.dispatchEvent(new CustomEvent(Ht))});const Pn='img[src*="i.pximg.net/img-master"]',Fe=new WeakSet,An=()=>JSON.parse(localStorage.getItem(ft)||"{}"),Ln=(e,t)=>{const o=document.createElement("div");o.style.display="none",e.appendChild(o),zt(u(In,{targetImage:t}),o);let n=!1,i=null;document.addEventListener("mousemove",r=>{i===null&&(i=requestAnimationFrame(()=>{i=null;const s=e.getBoundingClientRect(),a=r.clientX>=s.left&&r.clientX<=s.right&&r.clientY>=s.top&&r.clientY<=s.bottom;if(a&&!n){const d=An().showHoverButton!==!1;o.style.display=d?"block":"none"}else!a&&n&&(o.style.display="none");n=a}))})};function Oe(e){if(Fe.has(e))return;const t=En(e);t&&(Tn(t),Ln(t,e),Fe.add(e))}const Nn=e=>{e instanceof HTMLImageElement&&e.src.includes("i.pximg.net/img-master")?Oe(e):(e instanceof Element||e instanceof Document||e instanceof DocumentFragment)&&e.querySelectorAll(Pn).forEach(t=>Oe(t))};function zn(){const e=new Set;let t=null;const o=r=>{e.add(r),t===null&&(t=requestAnimationFrame(()=>{t=null,e.forEach(s=>{Nn(s)}),e.clear()}))};o(document);const n=new MutationObserver(r=>{r.forEach(s=>{s.addedNodes.forEach(a=>{o(a)})})});n.observe(document.body,{childList:!0,subtree:!0,attributes:!1,characterData:!1});const i=()=>{n.disconnect(),t!==null&&(cancelAnimationFrame(t),t=null),e.clear()};window.addEventListener("beforeunload",i)}function je(){const e=document.createElement("div");e.id="pixiv-enhanced-app",document.body.appendChild(e),zt(u(Cn,{}),e),zn()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",je):je()})();
