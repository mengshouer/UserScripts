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

(function() {
  "use strict";
  var n$3, l$4, u$4, t$5, i$4, r$3, o$4, e$3, f$4, c$4, s$4, a$4, h$3, p$4 = {}, v$2 = [], y$2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, w$2 = Array.isArray;
  function d$3(n2, l2) {
    for (var u2 in l2) n2[u2] = l2[u2];
    return n2;
  }
  function g$3(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _$2(l2, u2, t2) {
    var i2, r2, o2, e2 = {};
    for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n$3.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return m$2(l2, e2, i2, r2, null);
  }
  function m$2(n2, t2, i2, r2, o2) {
    var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$4 : o2, __i: -1, __u: 0 };
    return null == o2 && null != l$4.vnode && l$4.vnode(e2), e2;
  }
  function b$3() {
    return { current: null };
  }
  function k$1(n2) {
    return n2.children;
  }
  function x$1(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function S(n2, l2) {
    if (null == l2) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C$1(n2) {
    var l2, u2;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
        n2.__e = n2.__c.base = u2.__e;
        break;
      }
      return C$1(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i$4.push(n2) && !$.__r++ || r$3 != l$4.debounceRendering) && ((r$3 = l$4.debounceRendering) || o$4)($);
  }
  function $() {
    for (var n2, u2, t2, r2, o2, f2, c2, s2 = 1; i$4.length; ) i$4.length > s2 && i$4.sort(e$3), n2 = i$4.shift(), s2 = i$4.length, n2.__d && (t2 = void 0, r2 = void 0, o2 = (r2 = (u2 = n2).__v).__e, f2 = [], c2 = [], u2.__P && ((t2 = d$3({}, r2)).__v = r2.__v + 1, l$4.vnode && l$4.vnode(t2), O(u2.__P, t2, r2, u2.__n, u2.__P.namespaceURI, 32 & r2.__u ? [o2] : null, f2, null == o2 ? S(r2) : o2, !!(32 & r2.__u), c2), t2.__v = r2.__v, t2.__.__k[t2.__i] = t2, N(f2, t2, c2), r2.__e = r2.__ = null, t2.__e != o2 && C$1(t2)));
    $.__r = 0;
  }
  function I(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, y2, w2, d2, g2, _2, m2 = t2 && t2.__k || v$2, b2 = l2.length;
    for (f2 = P$1(u2, l2, m2, f2, b2), a2 = 0; a2 < b2; a2++) null != (y2 = u2.__k[a2]) && (h2 = -1 == y2.__i ? p$4 : m2[y2.__i] || p$4, y2.__i = a2, g2 = O(n2, y2, h2, i2, r2, o2, e2, f2, c2, s2), w2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && B$1(h2.ref, null, y2), s2.push(y2.ref, y2.__c || w2, y2)), null == d2 && null != w2 && (d2 = w2), (_2 = !!(4 & y2.__u)) || h2.__k === y2.__k ? f2 = A$1(y2, f2, n2, _2) : "function" == typeof y2.type && void 0 !== g2 ? f2 = g2 : w2 && (f2 = w2.nextSibling), y2.__u &= -7);
    return u2.__e = d2, f2;
  }
  function P$1(n2, l2, u2, t2, i2) {
    var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
    for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? (f2 = r2 + h2, (o2 = n2.__k[r2] = "string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? m$2(null, o2, null, null, null) : w$2(o2) ? m$2(k$1, { children: o2 }, null, null, null) : null == o2.constructor && o2.__b > 0 ? m$2(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : o2).__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = L(o2, u2, f2, a2)) && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? h2-- : i2 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), D$1(e2, e2));
    return t2;
  }
  function A$1(n2, l2, u2, t2) {
    var i2, r2;
    if ("function" == typeof n2.type) {
      for (i2 = n2.__k, r2 = 0; i2 && r2 < i2.length; r2++) i2[r2] && (i2[r2].__ = n2, l2 = A$1(i2[r2], l2, u2, t2));
      return l2;
    }
    n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = S(n2)), u2.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function H(n2, l2) {
    return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (w$2(n2) ? n2.some(function(n3) {
      H(n3, l2);
    }) : l2.push(n2)), l2;
  }
  function L(n2, l2, u2, t2) {
    var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], s2 = null != c2 && 0 == (2 & c2.__u);
    if (null === c2 && null == n2.key || s2 && e2 == c2.key && f2 == c2.type) return u2;
    if (t2 > (s2 ? 1 : 0)) {
      for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
    }
    return -1;
  }
  function T$1(n2, l2, u2) {
    "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || y$2.test(l2) ? u2 : u2 + "px";
  }
  function j$2(n2, l2, u2, t2, i2) {
    var r2, o2;
    n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || T$1(n2.style, l2, "");
      if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || T$1(n2.style, l2, u2[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f$4, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2.u = t2.u : (u2.u = c$4, n2.addEventListener(l2, r2 ? a$4 : s$4, r2)) : n2.removeEventListener(l2, r2 ? a$4 : s$4, r2);
    else {
      if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
        n2[l2] = null == u2 ? "" : u2;
        break n;
      } catch (n3) {
      }
      "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
    }
  }
  function F$1(n2) {
    return function(u2) {
      if (this.l) {
        var t2 = this.l[u2.type + n2];
        if (null == u2.t) u2.t = c$4++;
        else if (u2.t < t2.u) return;
        return t2(l$4.event ? l$4.event(u2) : u2);
      }
    };
  }
  function O(n2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, v2, y2, _2, m2, b2, S2, C2, M2, $2, P2, A2, H2, L2, T2, j2 = u2.type;
    if (null != u2.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l$4.__b) && a2(u2);
    n: if ("function" == typeof j2) try {
      if (b2 = u2.props, S2 = "prototype" in j2 && j2.prototype.render, C2 = (a2 = j2.contextType) && i2[a2.__c], M2 = a2 ? C2 ? C2.props.value : a2.__ : i2, t2.__c ? m2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (S2 ? u2.__c = h2 = new j2(b2, M2) : (u2.__c = h2 = new x$1(b2, M2), h2.constructor = j2, h2.render = E$1), C2 && C2.sub(h2), h2.props = b2, h2.state || (h2.state = {}), h2.context = M2, h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), S2 && null == h2.__s && (h2.__s = h2.state), S2 && null != j2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = d$3({}, h2.__s)), d$3(h2.__s, j2.getDerivedStateFromProps(b2, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u2, p2) S2 && null == j2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), S2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (S2 && null == j2.getDerivedStateFromProps && b2 !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(b2, M2), !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(b2, h2.__s, M2) || u2.__v == t2.__v) {
          for (u2.__v != t2.__v && (h2.props = b2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
            n3 && (n3.__ = u2);
          }), $2 = 0; $2 < h2._sb.length; $2++) h2.__h.push(h2._sb[$2]);
          h2._sb = [], h2.__h.length && e2.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(b2, h2.__s, M2), S2 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(v2, y2, _2);
        });
      }
      if (h2.context = M2, h2.props = b2, h2.__P = n2, h2.__e = false, P2 = l$4.__r, A2 = 0, S2) {
        for (h2.state = h2.__s, h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), H2 = 0; H2 < h2._sb.length; H2++) h2.__h.push(h2._sb[H2]);
        h2._sb = [];
      } else do {
        h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++A2 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i2 = d$3(d$3({}, i2), h2.getChildContext())), S2 && !p2 && null != h2.getSnapshotBeforeUpdate && (_2 = h2.getSnapshotBeforeUpdate(v2, y2)), L2 = a2, null != a2 && a2.type === k$1 && null == a2.key && (L2 = V(a2.props.children)), f2 = I(n2, w$2(L2) ? L2 : [L2], u2, t2, i2, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), m2 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u2.__v = null, c2 || null != o2) if (n3.then) {
        for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
        o2[o2.indexOf(f2)] = null, u2.__e = f2;
      } else {
        for (T2 = o2.length; T2--; ) g$3(o2[T2]);
        z$1(u2);
      }
      else u2.__e = t2.__e, u2.__k = t2.__k, n3.then || z$1(u2);
      l$4.__e(n3, u2, t2);
    }
    else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = q$1(t2.__e, u2, t2, i2, r2, o2, e2, c2, s2);
    return (a2 = l$4.diffed) && a2(u2), 128 & u2.__u ? void 0 : f2;
  }
  function z$1(n2) {
    n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z$1);
  }
  function N(n2, u2, t2) {
    for (var i2 = 0; i2 < t2.length; i2++) B$1(t2[i2], t2[++i2], t2[++i2]);
    l$4.__c && l$4.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l$4.__e(n3, u3.__v);
      }
    });
  }
  function V(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w$2(n2) ? n2.map(V) : d$3({}, n2);
  }
  function q$1(u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, v2, y2, d2, _2, m2, b2 = i2.props, k2 = t2.props, x2 = t2.type;
    if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a2 = 0; a2 < e2.length; a2++) if ((d2 = e2[a2]) && "setAttribute" in d2 == !!x2 && (x2 ? d2.localName == x2 : 3 == d2.nodeType)) {
        u2 = d2, e2[a2] = null;
        break;
      }
    }
    if (null == u2) {
      if (null == x2) return document.createTextNode(k2);
      u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$4.__m && l$4.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null == x2) b2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
    else {
      if (e2 = e2 && n$3.call(u2.childNodes), b2 = i2.props || p$4, !c2 && null != e2) for (b2 = {}, a2 = 0; a2 < u2.attributes.length; a2++) b2[(d2 = u2.attributes[a2]).name] = d2.value;
      for (a2 in b2) if (d2 = b2[a2], "children" == a2) ;
      else if ("dangerouslySetInnerHTML" == a2) v2 = d2;
      else if (!(a2 in k2)) {
        if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
        j$2(u2, a2, null, d2, o2);
      }
      for (a2 in k2) d2 = k2[a2], "children" == a2 ? y2 = d2 : "dangerouslySetInnerHTML" == a2 ? h2 = d2 : "value" == a2 ? _2 = d2 : "checked" == a2 ? m2 = d2 : c2 && "function" != typeof d2 || b2[a2] === d2 || j$2(u2, a2, d2, b2[a2], o2);
      if (h2) c2 || v2 && (h2.__html == v2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
      else if (v2 && (u2.innerHTML = ""), I("template" == t2.type ? u2.content : u2, w$2(y2) ? y2 : [y2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && S(i2, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g$3(e2[a2]);
      c2 || (a2 = "value", "progress" == x2 && null == _2 ? u2.removeAttribute("value") : null != _2 && (_2 !== u2[a2] || "progress" == x2 && !_2 || "option" == x2 && _2 != b2[a2]) && j$2(u2, a2, _2, b2[a2], o2), a2 = "checked", null != m2 && m2 != u2[a2] && j$2(u2, a2, m2, b2[a2], o2));
    }
    return u2;
  }
  function B$1(n2, u2, t2) {
    try {
      if ("function" == typeof n2) {
        var i2 = "function" == typeof n2.__u;
        i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
      } else n2.current = u2;
    } catch (n3) {
      l$4.__e(n3, t2);
    }
  }
  function D$1(n2, u2, t2) {
    var i2, r2;
    if (l$4.unmount && l$4.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || B$1(i2, null, u2)), null != (i2 = n2.__c)) {
      if (i2.componentWillUnmount) try {
        i2.componentWillUnmount();
      } catch (n3) {
        l$4.__e(n3, u2);
      }
      i2.base = i2.__P = null;
    }
    if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && D$1(i2[r2], u2, t2 || "function" != typeof n2.type);
    t2 || g$3(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function E$1(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function G(u2, t2, i2) {
    var r2, o2, e2, f2;
    t2 == document && (t2 = document.documentElement), l$4.__ && l$4.__(u2, t2), o2 = (r2 = "function" == typeof i2) ? null : i2 && i2.__k || t2.__k, e2 = [], f2 = [], O(t2, u2 = (!r2 && i2 || t2).__k = _$2(k$1, null, [u2]), o2 || p$4, p$4, t2.namespaceURI, !r2 && i2 ? [i2] : o2 ? null : t2.firstChild ? n$3.call(t2.childNodes) : null, e2, !r2 && i2 ? i2 : o2 ? o2.__e : t2.firstChild, r2, f2), N(e2, u2, f2);
  }
  function J(n2, l2) {
    G(n2, l2, J);
  }
  function K(l2, u2, t2) {
    var i2, r2, o2, e2, f2 = d$3({}, l2.props);
    for (o2 in l2.type && l2.type.defaultProps && (e2 = l2.type.defaultProps), u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = void 0 === u2[o2] && null != e2 ? e2[o2] : u2[o2];
    return arguments.length > 2 && (f2.children = arguments.length > 3 ? n$3.call(arguments, 2) : t2), m$2(l2.type, f2, i2 || l2.key, r2 || l2.ref, null);
  }
  function Q(n2) {
    function l2(n3) {
      var u2, t2;
      return this.getChildContext || (u2 = /* @__PURE__ */ new Set(), (t2 = {})[l2.__c] = this, this.getChildContext = function() {
        return t2;
      }, this.componentWillUnmount = function() {
        u2 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value != n4.value && u2.forEach(function(n5) {
          n5.__e = true, M(n5);
        });
      }, this.sub = function(n4) {
        u2.add(n4);
        var l3 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u2 && u2.delete(n4), l3 && l3.call(n4);
        };
      }), n3.children;
    }
    return l2.__c = "__cC" + h$3++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
      return n3.children(l3);
    }).contextType = l2, l2;
  }
  n$3 = v$2.slice, l$4 = { __e: function(n2, l2, u2, t2) {
    for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
      if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u$4 = 0, t$5 = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x$1.prototype.setState = function(n2, l2) {
    var u2;
    u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d$3({}, this.state), "function" == typeof n2 && (n2 = n2(d$3({}, u2), this.props)), n2 && d$3(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M(this));
  }, x$1.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x$1.prototype.render = k$1, i$4 = [], o$4 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$3 = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, $.__r = 0, f$4 = /(PointerCapture)$|Capture$/i, c$4 = 0, s$4 = F$1(false), a$4 = F$1(true), h$3 = 0;
  var t$4 = /["&<]/;
  function n$2(r2) {
    if (0 === r2.length || false === t$4.test(r2)) return r2;
    for (var e2 = 0, n2 = 0, o2 = "", f2 = ""; n2 < r2.length; n2++) {
      switch (r2.charCodeAt(n2)) {
        case 34:
          f2 = "&quot;";
          break;
        case 38:
          f2 = "&amp;";
          break;
        case 60:
          f2 = "&lt;";
          break;
        default:
          continue;
      }
      n2 !== e2 && (o2 += r2.slice(e2, n2)), o2 += f2, e2 = n2 + 1;
    }
    return n2 !== e2 && (o2 += r2.slice(e2, n2)), o2;
  }
  var o$3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, f$3 = 0, i$3 = Array.isArray;
  function u$3(e2, t2, n2, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$3, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return l$4.vnode && l$4.vnode(l2), l2;
  }
  function a$3(r2) {
    var t2 = u$3(k$1, { tpl: r2, exprs: [].slice.call(arguments, 1) });
    return t2.key = t2.__v, t2;
  }
  var c$3 = {}, p$3 = /[A-Z]/g;
  function l$3(e2, t2) {
    if (l$4.attr) {
      var f2 = l$4.attr(e2, t2);
      if ("string" == typeof f2) return f2;
    }
    if (t2 = (function(r2) {
      return null !== r2 && "object" == typeof r2 && "function" == typeof r2.valueOf ? r2.valueOf() : r2;
    })(t2), "ref" === e2 || "key" === e2) return "";
    if ("style" === e2 && "object" == typeof t2) {
      var i2 = "";
      for (var u2 in t2) {
        var a2 = t2[u2];
        if (null != a2 && "" !== a2) {
          var l2 = "-" == u2[0] ? u2 : c$3[u2] || (c$3[u2] = u2.replace(p$3, "-$&").toLowerCase()), s2 = ";";
          "number" != typeof a2 || l2.startsWith("--") || o$3.test(l2) || (s2 = "px;"), i2 = i2 + l2 + ":" + a2 + s2;
        }
      }
      return e2 + '="' + n$2(i2) + '"';
    }
    return null == t2 || false === t2 || "function" == typeof t2 || "object" == typeof t2 ? "" : true === t2 ? e2 : e2 + '="' + n$2("" + t2) + '"';
  }
  function s$3(r2) {
    if (null == r2 || "boolean" == typeof r2 || "function" == typeof r2) return null;
    if ("object" == typeof r2) {
      if (void 0 === r2.constructor) return r2;
      if (i$3(r2)) {
        for (var e2 = 0; e2 < r2.length; e2++) r2[e2] = s$3(r2[e2]);
        return r2;
      }
    }
    return n$2("" + r2);
  }
  var t$3, r$2, u$2, i$2, o$2 = 0, f$2 = [], c$2 = l$4, e$2 = c$2.__b, a$2 = c$2.__r, v$1 = c$2.diffed, l$2 = c$2.__c, m$1 = c$2.unmount, s$2 = c$2.__;
  function p$2(n2, t2) {
    c$2.__h && c$2.__h(r$2, n2, o$2 || t2), o$2 = 0;
    var u2 = r$2.__H || (r$2.__H = { __: [], __h: [] });
    return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
  }
  function d$2(n2) {
    return o$2 = 1, h$2(D, n2);
  }
  function h$2(n2, u2, i2) {
    var o2 = p$2(t$3++, 2);
    if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : D(void 0, u2), function(n3) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r$2, !r$2.__f)) {
      var f2 = function(n3, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u3.every(function(n4) {
          return !n4.__N;
        })) return !c2 || c2.call(this, n3, t2, r2);
        var i3 = o2.__c.props !== n3;
        return u3.forEach(function(n4) {
          if (n4.__N) {
            var t3 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n3, t2, r2) || i3;
      };
      r$2.__f = true;
      var c2 = r$2.shouldComponentUpdate, e2 = r$2.componentWillUpdate;
      r$2.componentWillUpdate = function(n3, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n3, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n3, t2, r2);
      }, r$2.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y$1(n2, u2) {
    var i2 = p$2(t$3++, 3);
    !c$2.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$2.__H.__h.push(i2));
  }
  function _$1(n2, u2) {
    var i2 = p$2(t$3++, 4);
    !c$2.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$2.__h.push(i2));
  }
  function A(n2) {
    return o$2 = 5, T(function() {
      return { current: n2 };
    }, []);
  }
  function F(n2, t2, r2) {
    o$2 = 6, _$1(function() {
      if ("function" == typeof n2) {
        var r3 = n2(t2());
        return function() {
          n2(null), r3 && "function" == typeof r3 && r3();
        };
      }
      if (n2) return n2.current = t2(), function() {
        return n2.current = null;
      };
    }, null == r2 ? r2 : r2.concat(n2));
  }
  function T(n2, r2) {
    var u2 = p$2(t$3++, 7);
    return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
  }
  function q(n2, t2) {
    return o$2 = 8, T(function() {
      return n2;
    }, t2);
  }
  function x(n2) {
    var u2 = r$2.context[n2.__c], i2 = p$2(t$3++, 9);
    return i2.c = n2, u2 ? (null == i2.__ && (i2.__ = true, u2.sub(r$2)), u2.props.value) : n2.__;
  }
  function P(n2, t2) {
    c$2.useDebugValue && c$2.useDebugValue(t2 ? t2(n2) : n2);
  }
  function b$2(n2) {
    var u2 = p$2(t$3++, 10), i2 = d$2();
    return u2.__ = n2, r$2.componentDidCatch || (r$2.componentDidCatch = function(n3, t2) {
      u2.__ && u2.__(n3, t2), i2[1](n3);
    }), [i2[0], function() {
      i2[1](void 0);
    }];
  }
  function g$2() {
    var n2 = p$2(t$3++, 11);
    if (!n2.__) {
      for (var u2 = r$2.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
      var i2 = u2.__m || (u2.__m = [0, 0]);
      n2.__ = "P" + i2[0] + "-" + i2[1]++;
    }
    return n2.__;
  }
  function j$1() {
    for (var n2; n2 = f$2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z), n2.__H.__h.forEach(B), n2.__H.__h = [];
    } catch (t2) {
      n2.__H.__h = [], c$2.__e(t2, n2.__v);
    }
  }
  c$2.__b = function(n2) {
    r$2 = null, e$2 && e$2(n2);
  }, c$2.__ = function(n2, t2) {
    n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s$2 && s$2(n2, t2);
  }, c$2.__r = function(n2) {
    a$2 && a$2(n2), t$3 = 0;
    var i2 = (r$2 = n2.__c).__H;
    i2 && (u$2 === r$2 ? (i2.__h = [], r$2.__h = [], i2.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i2.__h.forEach(z), i2.__h.forEach(B), i2.__h = [], t$3 = 0)), u$2 = r$2;
  }, c$2.diffed = function(n2) {
    v$1 && v$1(n2);
    var t2 = n2.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f$2.push(t2) && i$2 === c$2.requestAnimationFrame || ((i$2 = c$2.requestAnimationFrame) || w$1)(j$1)), t2.__H.__.forEach(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u$2 = r$2 = null;
  }, c$2.__c = function(n2, t2) {
    t2.some(function(n3) {
      try {
        n3.__h.forEach(z), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B(n4);
        });
      } catch (r2) {
        t2.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t2 = [], c$2.__e(r2, n3.__v);
      }
    }), l$2 && l$2(n2, t2);
  }, c$2.unmount = function(n2) {
    m$1 && m$1(n2);
    var t2, r2 = n2.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n3) {
      try {
        z(n3);
      } catch (n4) {
        t2 = n4;
      }
    }), r2.__H = void 0, t2 && c$2.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w$1(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 35);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n2) {
    var t2 = r$2, u2 = n2.__c;
    "function" == typeof u2 && (n2.__c = void 0, u2()), r$2 = t2;
  }
  function B(n2) {
    var t2 = r$2;
    n2.__c = n2.__(), r$2 = t2;
  }
  function C(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  }
  function D(n2, t2) {
    return "function" == typeof t2 ? t2(n2) : t2;
  }
  let e$1 = { data: "" }, t$2 = (t2) => "object" == typeof window ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e$1, r$1 = (e2) => {
    let r2 = t$2(e2), l2 = r2.data;
    return r2.data = "", l2;
  }, l$1 = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a$1 = /\/\*[^]*?\*\/|  +/g, n$1 = /\n+/g, o$1 = (e2, t2) => {
    let r2 = "", l2 = "", a2 = "";
    for (let n2 in e2) {
      let c2 = e2[n2];
      "@" == n2[0] ? "i" == n2[1] ? r2 = n2 + " " + c2 + ";" : l2 += "f" == n2[1] ? o$1(c2, n2) : n2 + "{" + o$1(c2, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c2 ? l2 += o$1(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c2 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o$1.p ? o$1.p(n2, c2) : n2 + ":" + c2 + ";");
    }
    return r2 + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
  }, c$1 = {}, s$1 = (e2) => {
    if ("object" == typeof e2) {
      let t2 = "";
      for (let r2 in e2) t2 += r2 + s$1(e2[r2]);
      return t2;
    }
    return e2;
  }, i$1 = (e2, t2, r2, i2, p2) => {
    let u2 = s$1(e2), d2 = c$1[u2] || (c$1[u2] = ((e3) => {
      let t3 = 0, r3 = 11;
      for (; t3 < e3.length; ) r3 = 101 * r3 + e3.charCodeAt(t3++) >>> 0;
      return "go" + r3;
    })(u2));
    if (!c$1[d2]) {
      let t3 = u2 !== e2 ? e2 : ((e3) => {
        let t4, r3, o2 = [{}];
        for (; t4 = l$1.exec(e3.replace(a$1, "")); ) t4[4] ? o2.shift() : t4[3] ? (r3 = t4[3].replace(n$1, " ").trim(), o2.unshift(o2[0][r3] = o2[0][r3] || {})) : o2[0][t4[1]] = t4[2].replace(n$1, " ").trim();
        return o2[0];
      })(e2);
      c$1[d2] = o$1(p2 ? { ["@keyframes " + d2]: t3 } : t3, r2 ? "" : "." + d2);
    }
    let f2 = r2 && c$1.g ? c$1.g : null;
    return r2 && (c$1.g = c$1[d2]), ((e3, t3, r3, l2) => {
      l2 ? t3.data = t3.data.replace(l2, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r3 ? e3 + t3.data : t3.data + e3);
    })(c$1[d2], t2, i2, f2), d2;
  }, p$1 = (e2, t2, r2) => e2.reduce((e3, l2, a2) => {
    let n2 = t2[a2];
    if (n2 && n2.call) {
      let e4 = n2(r2), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
      n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o$1(e4, "") : false === e4 ? "" : e4;
    }
    return e3 + l2 + (null == n2 ? "" : n2);
  }, "");
  function u$1(e2) {
    let r2 = this || {}, l2 = e2.call ? e2(r2.p) : e2;
    return i$1(l2.unshift ? l2.raw ? p$1(l2, [].slice.call(arguments, 1), r2.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r2.p) : t2), {}) : l2, t$2(r2.target), r2.g, r2.o, r2.k);
  }
  let d$1, f$1, g$1, b$1 = u$1.bind({ g: 1 }), h$1 = u$1.bind({ k: 1 });
  function m(e2, t2, r2, l2) {
    o$1.p = t2, d$1 = e2, f$1 = r2, g$1 = l2;
  }
  function j(e2, t2) {
    let r2 = this || {};
    return function() {
      let l2 = arguments;
      function a2(n2, o2) {
        let c2 = Object.assign({}, n2), s2 = c2.className || a2.className;
        r2.p = Object.assign({ theme: f$1 && f$1() }, c2), r2.o = / *go\d+/.test(s2), c2.className = u$1.apply(r2, l2) + (s2 ? " " + s2 : ""), t2 && (c2.ref = o2);
        let i2 = e2;
        return e2[0] && (i2 = c2.as || e2, delete c2.as), g$1 && i2[0] && g$1(c2), d$1(i2, c2);
      }
      return t2 ? t2(a2) : a2;
    };
  }
  m(_$2);
  const StyledButton$2 = j("button")`
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
`;
  const SettingsIcon = j("svg")`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;
  function SettingsButton({ onClick, isSettingsPanelOpen }) {
    const [isMouseNearLeft, setIsMouseNearLeft] = d$2(false);
    y$1(() => {
      const handleMouseMove = (e2) => {
        const isNear = e2.clientX < 100 && e2.clientY > window.innerHeight * (2 / 3);
        setIsMouseNearLeft(isNear);
      };
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);
    const buttonStyle = {
      "--left-position": isMouseNearLeft || isSettingsPanelOpen ? "10px" : "-40px"
    };
    return /* @__PURE__ */ u$3(StyledButton$2, { style: buttonStyle, onClick, children: /* @__PURE__ */ u$3(SettingsIcon, { viewBox: "0 0 24 24", children: /* @__PURE__ */ u$3("path", { d: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" }) }) });
  }
  class StorageManager {
    constructor(storageKey, defaultSettings) {
      this.storageKey = storageKey;
      this.defaultSettings = defaultSettings;
    }
    /**
     * 加载设置
     */
    loadSettings() {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...this.defaultSettings, ...parsed };
        }
      } catch (error2) {
        /* @__PURE__ */ console.debug("Failed to load settings:", error2);
      }
      return { ...this.defaultSettings };
    }
    /**
     * 保存设置
     */
    saveSettings(newSettings) {
      const currentSettings = this.loadSettings();
      const updatedSettings = { ...currentSettings, ...newSettings };
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(updatedSettings));
      } catch (error2) {
        /* @__PURE__ */ console.debug("Failed to save settings:", error2);
      }
      return updatedSettings;
    }
    /**
     * 重置为默认设置
     */
    resetSettings() {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (error2) {
        /* @__PURE__ */ console.debug("Failed to reset settings:", error2);
      }
      return { ...this.defaultSettings };
    }
  }
  function preventEventPropagation(e2) {
    e2.stopPropagation();
    e2.preventDefault();
  }
  function waitForElement(selector, callback, options = {}) {
    const { interval = 300, maxAttempts = 100 } = options;
    let attempts = 0;
    const checkElements = () => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        callback(elements);
      }
      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(timer);
      }
    };
    checkElements();
    const timer = setInterval(checkElements, interval);
    return () => clearInterval(timer);
  }
  async function downloadFile(url, fileName) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error2) {
      console.error(`Download failed: ${fileName}`, error2);
      throw error2;
    }
  }
  function extractFileInfo(src) {
    const picname = src.split("?")[0]?.split("/").pop() || "";
    const ext = src.includes("format=png") ? "png" : "jpg";
    return { picname, ext };
  }
  function generateFileName(template, variables) {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`<%${key}>`, "g"), value || "");
    }
    return result;
  }
  function extractUrlInfo(url) {
    const urlRegex = /https:\/\/(twitter|x)\.com\//;
    const array = url.replace(urlRegex, "").split("/");
    return {
      userid: array[0] || "unknown",
      tid: array[2] || "unknown",
      picno: array[4] || "1"
    };
  }
  const MessageContainer = j("div")`
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
`;
  const CloseIcon = j("span")`
  float: right;
  margin-left: 8px;
  font-weight: bold;
  opacity: 0.7;
  font-size: 16px;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;
  function Message({
    type = "info",
    content,
    duration = 3e3,
    onClose,
    className,
    style: style2
  }) {
    const timerRef = A(null);
    const startTimeRef = A(0);
    const remainingTimeRef = A(duration);
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    const startTimer = (time) => {
      clearTimer();
      if (time > 0) {
        startTimeRef.current = Date.now();
        timerRef.current = window.setTimeout(() => {
          onClose?.();
        }, time);
      }
    };
    const pauseTimer = () => {
      if (timerRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
        clearTimer();
      }
    };
    const resumeTimer = () => {
      if (remainingTimeRef.current > 0) {
        startTimer(remainingTimeRef.current);
      }
    };
    y$1(() => {
      if (duration > 0) {
        remainingTimeRef.current = duration;
        startTimer(duration);
      }
      return clearTimer;
    }, [duration, onClose]);
    return /* @__PURE__ */ u$3(
      MessageContainer,
      {
        className: `message-${type} ${className || ""}`,
        style: style2,
        onClick: onClose,
        onMouseEnter: pauseTimer,
        onMouseLeave: resumeTimer,
        children: [
          content,
          /* @__PURE__ */ u$3(CloseIcon, { children: "×" })
        ]
      }
    );
  }
  const getUserMessagePlacement = () => {
    try {
      const settings = JSON.parse(localStorage.getItem("x-downloader-settings") || "{}");
      return settings.messagePlacement || "top";
    } catch {
      return "top";
    }
  };
  const containers = /* @__PURE__ */ new Map();
  let messageCount = 0;
  const getPositionStyle = (placement) => {
    const [vertical, horizontal] = placement.split("-");
    const isBottom = vertical === "bottom";
    const direction = isBottom ? "column-reverse" : "column";
    let position = `${vertical}: 20px; display: flex; flex-direction: ${direction};`;
    if (horizontal) {
      position += ` ${horizontal}: 20px;`;
    } else {
      position += " left: 50%; transform: translateX(-50%);";
    }
    return position;
  };
  const getContainer = (placement = "top") => {
    if (!containers.has(placement)) {
      const container = document.createElement("div");
      container.id = `userscript-message-container-${placement}`;
      container.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      ${getPositionStyle(placement)}
    `;
      document.body.appendChild(container);
      containers.set(placement, container);
    }
    return containers.get(placement);
  };
  const show = (config) => {
    const placement = config.placement || "top";
    const container = getContainer(placement);
    const messageId = `userscript-message-${++messageCount}`;
    const messageElement = document.createElement("div");
    messageElement.id = messageId;
    const isBottom = placement.startsWith("bottom");
    messageElement.style.cssText = `
    position: relative;
    margin-bottom: 8px;
    pointer-events: auto;
    animation: ${isBottom ? "messageSlideInBottom" : "messageSlideIn"} 0.3s ease-out;
  `;
    container.appendChild(messageElement);
    const onClose = () => {
      if (messageElement.parentNode) {
        const isBottom2 = placement.startsWith("bottom");
        messageElement.style.animation = `${isBottom2 ? "messageSlideOutBottom" : "messageSlideOut"} 0.3s ease-in forwards`;
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
          }
        }, 300);
      }
    };
    G(_$2(Message, { ...config, onClose }), messageElement);
    return onClose;
  };
  const createMessageMethod = (type) => (content, duration, placement) => show({
    type,
    content,
    placement: placement || getUserMessagePlacement(),
    ...duration !== void 0 && { duration }
  });
  const success = createMessageMethod("success");
  const error = createMessageMethod("error");
  const warning = createMessageMethod("warning");
  const info = createMessageMethod("info");
  const destroy = () => {
    containers.forEach((container) => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });
    containers.clear();
  };
  const message = { success, error, warning, info, destroy };
  const style = document.createElement("style");
  style.textContent = `
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
`;
  document.head.appendChild(style);
  function getThemeConfig(isDark) {
    return {
      textColor: isDark ? "#e1e8ed" : "#333",
      backgroundColor: isDark ? "#1e1e1e" : "white",
      borderColor: isDark ? "#38444d" : "#ddd",
      secondaryTextColor: isDark ? "#8b98a5" : "#666",
      inputBackground: isDark ? "#253341" : "white",
      inputBorder: isDark ? "#38444d" : "#ddd",
      panelBackground: isDark ? "#1e1e1e" : "white"
    };
  }
  function useTheme() {
    const [isDark, setIsDark] = d$2(
      () => window.matchMedia?.("(prefers-color-scheme: dark)").matches || false
    );
    y$1(() => {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e2) => setIsDark(e2.matches);
      if (media.addEventListener) {
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
      } else if (media.addListener) {
        media.addListener(handler);
        return () => media.removeListener?.(handler);
      }
      return void 0;
    }, []);
    return {
      theme: getThemeConfig(isDark),
      isDark
    };
  }
  const DEFAULT_LOCALE = "en";
  const STORAGE_KEY$1 = "userscript-locale";
  let currentLocale = DEFAULT_LOCALE;
  const translations = {};
  const listeners = [];
  const detectBrowserLocale = () => navigator?.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
  try {
    currentLocale = localStorage.getItem(STORAGE_KEY$1) || detectBrowserLocale();
  } catch {
    currentLocale = detectBrowserLocale();
  }
  const getNestedValue = (obj, path) => {
    let result = obj;
    for (const key of path.split(".")) {
      result = result?.[key];
      if (!result) return void 0;
    }
    return typeof result === "string" ? result : void 0;
  };
  const interpolate = (template, params) => {
    if (!params) return template;
    return template.replace(/\{(\w+)\}/g, (_2, key) => params[key] ?? "{" + key + "}");
  };
  function t$1(keyOrOptions, params) {
    const key = typeof keyOrOptions === "string" ? keyOrOptions : keyOrOptions.key;
    const actualParams = typeof keyOrOptions === "string" ? params : keyOrOptions.params;
    const text = getNestedValue(translations[currentLocale], key) || getNestedValue(translations[DEFAULT_LOCALE], key) || key;
    return interpolate(text, actualParams);
  }
  const i18n = {
    addTranslations(locale, data) {
      translations[locale] = Object.assign(translations[locale] || {}, data);
    },
    setLocale(locale) {
      if (currentLocale !== locale) {
        currentLocale = locale;
        try {
          localStorage.setItem(STORAGE_KEY$1, locale);
        } catch {
        }
        listeners.forEach((callback) => callback());
      }
    },
    getLocale() {
      return currentLocale;
    },
    t: t$1,
    subscribe(callback) {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
    }
  };
  function useI18n() {
    const [locale, setLocaleState] = d$2(i18n.getLocale());
    y$1(() => {
      const unsubscribe = i18n.subscribe(() => {
        setLocaleState(i18n.getLocale());
      });
      return unsubscribe;
    }, []);
    const setLocale = (newLocale) => i18n.setLocale(newLocale);
    return { t: i18n.t, locale, setLocale };
  }
  const StyledButton$1 = j("button")`
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
`;
  const buttonVariants = {
    primary: {
      "--bg": "#1da1f2",
      "--color": "white",
      "--border": "none"
    },
    secondary: (theme) => ({
      "--bg": theme.inputBackground,
      "--color": theme.textColor,
      "--border": `1px solid ${theme.borderColor}`
    }),
    danger: {
      "--bg": "#dc3545",
      "--color": "white",
      "--border": "none"
    }
  };
  const buttonSizes = {
    small: {
      "--padding": "6px 12px",
      "--font-size": "12px"
    },
    medium: {
      "--padding": "8px 16px",
      "--font-size": "14px"
    },
    large: {
      "--padding": "12px 24px",
      "--font-size": "16px"
    }
  };
  function Button({
    children,
    onClick,
    disabled = false,
    variant = "primary",
    size = "medium",
    className = "",
    style: style2 = {},
    type = "button"
  }) {
    const { theme } = useTheme();
    const variantStyles = (() => {
      const variantConfig = buttonVariants[variant];
      return typeof variantConfig === "function" ? variantConfig(theme) : variantConfig;
    })();
    const buttonStyle = {
      ...variantStyles,
      ...buttonSizes[size],
      "--cursor": disabled ? "not-allowed" : "pointer",
      "--opacity": disabled ? "0.6" : "1",
      ...style2
    };
    return /* @__PURE__ */ u$3(
      StyledButton$1,
      {
        className,
        style: buttonStyle,
        onClick,
        disabled,
        type,
        children
      }
    );
  }
  const Label = j("label")`
  display: flex;
  align-items: center;
  cursor: var(--cursor);
  color: var(--text-color);
  opacity: var(--opacity);
`;
  const CheckboxInput = j("input")`
  margin-right: 8px;
  accent-color: #1da1f2;
  cursor: var(--cursor);
`;
  function Checkbox({
    checked,
    defaultChecked,
    disabled = false,
    onChange,
    children,
    className = "",
    style: style2 = {}
  }) {
    const { theme } = useTheme();
    const checkboxStyle = {
      "--cursor": disabled ? "not-allowed" : "pointer",
      "--text-color": theme.textColor,
      "--opacity": disabled ? "0.6" : "1",
      ...style2
    };
    return /* @__PURE__ */ u$3(Label, { className, style: checkboxStyle, children: [
      /* @__PURE__ */ u$3(
        CheckboxInput,
        {
          type: "checkbox",
          checked,
          defaultChecked,
          disabled,
          onChange: (e2) => onChange?.(e2.currentTarget.checked),
          style: { "--cursor": disabled ? "not-allowed" : "pointer" }
        }
      ),
      children
    ] });
  }
  const StyledInput = j("input")`
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
`;
  function Input({
    type = "text",
    value,
    defaultValue,
    placeholder,
    disabled = false,
    onChange,
    onBlur,
    onFocus,
    className = "",
    style: style2 = {}
  }) {
    const { theme } = useTheme();
    const inputStyle = {
      "--input-border": theme.inputBorder,
      "--input-bg": theme.inputBackground,
      "--input-text": theme.textColor,
      ...style2
    };
    return /* @__PURE__ */ u$3(
      StyledInput,
      {
        type,
        value,
        defaultValue,
        placeholder,
        disabled,
        className,
        style: inputStyle,
        onChange: (e2) => onChange?.(e2.currentTarget.value),
        onBlur,
        onFocus
      }
    );
  }
  function Select({ value, options, onChange, placeholder, className, style: style2 }) {
    const { theme } = useTheme();
    const selectStyle = {
      padding: "6px 8px",
      borderRadius: "4px",
      border: `1px solid ${theme.borderColor}`,
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontSize: "14px",
      cursor: "pointer",
      outline: "none",
      ...style2
    };
    const handleChange = (event) => {
      const target = event.target;
      onChange(target.value);
    };
    return /* @__PURE__ */ u$3("select", { value, onChange: handleChange, className, style: selectStyle, children: [
      placeholder && /* @__PURE__ */ u$3("option", { value: "", disabled: true, children: placeholder }),
      options.map((option) => /* @__PURE__ */ u$3("option", { value: option.value, children: option.label }, option.value))
    ] });
  }
  function LanguageSelector({ className, style: style2 }) {
    const { theme } = useTheme();
    const { t: t2, locale, setLocale } = useI18n();
    const languages = [
      { value: "zh", label: "中文" },
      { value: "en", label: "English" }
    ];
    return /* @__PURE__ */ u$3(
      "div",
      {
        className,
        style: { display: "flex", alignItems: "center", gap: "8px", ...style2 },
        children: [
          /* @__PURE__ */ u$3(
            "label",
            {
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: theme.textColor,
                marginBottom: "0"
              },
              children: [
                t2("common.language"),
                ":"
              ]
            }
          ),
          /* @__PURE__ */ u$3(Select, { value: locale, options: languages, onChange: (value) => setLocale(value) })
        ]
      }
    );
  }
  function MessagePlacementSelector({
    value,
    onChange,
    className,
    style: style2
  }) {
    const { theme } = useTheme();
    const { t: t2 } = useI18n();
    const placements = [
      { value: "top", label: t2("common.messagePlacement.top") },
      { value: "bottom", label: t2("common.messagePlacement.bottom") },
      { value: "top-left", label: t2("common.messagePlacement.topLeft") },
      { value: "top-right", label: t2("common.messagePlacement.topRight") },
      { value: "bottom-left", label: t2("common.messagePlacement.bottomLeft") },
      { value: "bottom-right", label: t2("common.messagePlacement.bottomRight") }
    ];
    const handlePlacementChange = (newValue) => {
      onChange(newValue);
    };
    return /* @__PURE__ */ u$3(
      "div",
      {
        className,
        style: { display: "flex", alignItems: "center", gap: "8px", ...style2 },
        children: [
          /* @__PURE__ */ u$3(
            "label",
            {
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: theme.textColor,
                marginBottom: "0"
              },
              children: [
                t2("common.messagePlacement.label"),
                ":"
              ]
            }
          ),
          /* @__PURE__ */ u$3(Select, { value, options: placements, onChange: handlePlacementChange })
        ]
      }
    );
  }
  const Overlay = j("div")`
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
`;
  const ModalContainer = j("div")`
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
`;
  function Modal({
    isOpen,
    onClose,
    title,
    children,
    className = "",
    style: style2 = {}
  }) {
    const { theme } = useTheme();
    y$1(() => {
      if (!isOpen) return;
      const handleEsc = (e2) => {
        if (e2.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);
    if (!isOpen) return null;
    const cssVariables = {
      "--modal-bg": theme.panelBackground,
      "--modal-text": theme.textColor,
      ...style2
    };
    const headerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: title ? "20px" : "0"
    };
    const titleStyle = {
      margin: 0,
      color: theme.textColor,
      fontSize: "20px",
      fontWeight: 600
    };
    const closeButtonStyle = {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: theme.secondaryTextColor,
      padding: 0,
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
      transition: "background-color 0.2s ease"
    };
    return /* @__PURE__ */ u$3(Overlay, { onClick: onClose, children: /* @__PURE__ */ u$3(
      ModalContainer,
      {
        className,
        style: cssVariables,
        onClick: (e2) => e2.stopPropagation(),
        children: [
          /* @__PURE__ */ u$3("div", { style: headerStyle, children: [
            title && /* @__PURE__ */ u$3("h2", { style: titleStyle, children: title }),
            /* @__PURE__ */ u$3(
              "button",
              {
                style: closeButtonStyle,
                onClick: onClose,
                onMouseEnter: (e2) => {
                  const target = e2.target;
                  target.style.backgroundColor = theme.borderColor;
                },
                onMouseLeave: (e2) => {
                  const target = e2.target;
                  target.style.backgroundColor = "transparent";
                },
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ u$3("div", { children })
        ]
      }
    ) });
  }
  const Card = j("div")`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }
`;
  const CardHeader = j("div")`
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-header-bg);
  border-radius: 12px 12px 0 0;
`;
  const CardTitle = j("h3")`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
`;
  const CardContent = j("div")`
  padding: 20px;
`;
  function SettingsCard({ title, children, className = "", style: style2 = {} }) {
    const { theme, isDark } = useTheme();
    const cardStyle = {
      "--card-bg": theme.panelBackground,
      "--card-border": theme.borderColor,
      "--card-header-bg": isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
      "--card-title-color": theme.textColor,
      ...style2
    };
    return /* @__PURE__ */ u$3(Card, { className, style: cardStyle, children: [
      title && /* @__PURE__ */ u$3(CardHeader, { children: /* @__PURE__ */ u$3(CardTitle, { children: title }) }),
      /* @__PURE__ */ u$3(CardContent, { children })
    ] });
  }
  var i = Symbol.for("preact-signals");
  function t() {
    if (!(s > 1)) {
      var i2, t2 = false;
      while (void 0 !== h) {
        var r2 = h;
        h = void 0;
        f++;
        while (void 0 !== r2) {
          var o2 = r2.o;
          r2.o = void 0;
          r2.f &= -3;
          if (!(8 & r2.f) && c(r2)) try {
            r2.c();
          } catch (r3) {
            if (!t2) {
              i2 = r3;
              t2 = true;
            }
          }
          r2 = o2;
        }
      }
      f = 0;
      s--;
      if (t2) throw i2;
    } else s--;
  }
  function r(i2) {
    if (s > 0) return i2();
    s++;
    try {
      return i2();
    } finally {
      t();
    }
  }
  var o = void 0;
  function n(i2) {
    var t2 = o;
    o = void 0;
    try {
      return i2();
    } finally {
      o = t2;
    }
  }
  var h = void 0, s = 0, f = 0, v = 0;
  function e(i2) {
    if (void 0 !== o) {
      var t2 = i2.n;
      if (void 0 === t2 || t2.t !== o) {
        t2 = { i: 0, S: i2, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t2 };
        if (void 0 !== o.s) o.s.n = t2;
        o.s = t2;
        i2.n = t2;
        if (32 & o.f) i2.S(t2);
        return t2;
      } else if (-1 === t2.i) {
        t2.i = 0;
        if (void 0 !== t2.n) {
          t2.n.p = t2.p;
          if (void 0 !== t2.p) t2.p.n = t2.n;
          t2.p = o.s;
          t2.n = void 0;
          o.s.n = t2;
          o.s = t2;
        }
        return t2;
      }
    }
  }
  function u(i2, t2) {
    this.v = i2;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  u.prototype.brand = i;
  u.prototype.h = function() {
    return true;
  };
  u.prototype.S = function(i2) {
    var t2 = this, r2 = this.t;
    if (r2 !== i2 && void 0 === i2.e) {
      i2.x = r2;
      this.t = i2;
      if (void 0 !== r2) r2.e = i2;
      else n(function() {
        var i3;
        null == (i3 = t2.W) || i3.call(t2);
      });
    }
  };
  u.prototype.U = function(i2) {
    var t2 = this;
    if (void 0 !== this.t) {
      var r2 = i2.e, o2 = i2.x;
      if (void 0 !== r2) {
        r2.x = o2;
        i2.e = void 0;
      }
      if (void 0 !== o2) {
        o2.e = r2;
        i2.x = void 0;
      }
      if (i2 === this.t) {
        this.t = o2;
        if (void 0 === o2) n(function() {
          var i3;
          null == (i3 = t2.Z) || i3.call(t2);
        });
      }
    }
  };
  u.prototype.subscribe = function(i2) {
    var t2 = this;
    return E(function() {
      var r2 = t2.value, n2 = o;
      o = void 0;
      try {
        i2(r2);
      } finally {
        o = n2;
      }
    }, { name: "sub" });
  };
  u.prototype.valueOf = function() {
    return this.value;
  };
  u.prototype.toString = function() {
    return this.value + "";
  };
  u.prototype.toJSON = function() {
    return this.value;
  };
  u.prototype.peek = function() {
    var i2 = o;
    o = void 0;
    try {
      return this.value;
    } finally {
      o = i2;
    }
  };
  Object.defineProperty(u.prototype, "value", { get: function() {
    var i2 = e(this);
    if (void 0 !== i2) i2.i = this.i;
    return this.v;
  }, set: function(i2) {
    if (i2 !== this.v) {
      if (f > 100) throw new Error("Cycle detected");
      this.v = i2;
      this.i++;
      v++;
      s++;
      try {
        for (var r2 = this.t; void 0 !== r2; r2 = r2.x) r2.t.N();
      } finally {
        t();
      }
    }
  } });
  function d(i2, t2) {
    return new u(i2, t2);
  }
  function c(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
    return false;
  }
  function a(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) {
      var r2 = t2.S.n;
      if (void 0 !== r2) t2.r = r2;
      t2.S.n = t2;
      t2.i = -1;
      if (void 0 === t2.n) {
        i2.s = t2;
        break;
      }
    }
  }
  function l(i2) {
    var t2 = i2.s, r2 = void 0;
    while (void 0 !== t2) {
      var o2 = t2.p;
      if (-1 === t2.i) {
        t2.S.U(t2);
        if (void 0 !== o2) o2.n = t2.n;
        if (void 0 !== t2.n) t2.n.p = o2;
      } else r2 = t2;
      t2.S.n = t2.r;
      if (void 0 !== t2.r) t2.r = void 0;
      t2 = o2;
    }
    i2.s = r2;
  }
  function y(i2, t2) {
    u.call(this, void 0);
    this.x = i2;
    this.s = void 0;
    this.g = v - 1;
    this.f = 4;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  y.prototype = new u();
  y.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === v) return true;
    this.g = v;
    this.f |= 1;
    if (this.i > 0 && !c(this)) {
      this.f &= -2;
      return true;
    }
    var i2 = o;
    try {
      a(this);
      o = this;
      var t2 = this.x();
      if (16 & this.f || this.v !== t2 || 0 === this.i) {
        this.v = t2;
        this.f &= -17;
        this.i++;
      }
    } catch (i3) {
      this.v = i3;
      this.f |= 16;
      this.i++;
    }
    o = i2;
    l(this);
    this.f &= -2;
    return true;
  };
  y.prototype.S = function(i2) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
    }
    u.prototype.S.call(this, i2);
  };
  y.prototype.U = function(i2) {
    if (void 0 !== this.t) {
      u.prototype.U.call(this, i2);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
      }
    }
  };
  y.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
    }
  };
  Object.defineProperty(y.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i2 = e(this);
    this.h();
    if (void 0 !== i2) i2.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function w(i2, t2) {
    return new y(i2, t2);
  }
  function _(i2) {
    var r2 = i2.u;
    i2.u = void 0;
    if ("function" == typeof r2) {
      s++;
      var n2 = o;
      o = void 0;
      try {
        r2();
      } catch (t2) {
        i2.f &= -2;
        i2.f |= 8;
        b(i2);
        throw t2;
      } finally {
        o = n2;
        t();
      }
    }
  }
  function b(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    i2.x = void 0;
    i2.s = void 0;
    _(i2);
  }
  function g(i2) {
    if (o !== this) throw new Error("Out-of-order effect");
    l(this);
    o = i2;
    this.f &= -2;
    if (8 & this.f) b(this);
    t();
  }
  function p(i2, t2) {
    this.x = i2;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
    this.name = null == t2 ? void 0 : t2.name;
  }
  p.prototype.c = function() {
    var i2 = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t2 = this.x();
      if ("function" == typeof t2) this.u = t2;
    } finally {
      i2();
    }
  };
  p.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    _(this);
    a(this);
    s++;
    var i2 = o;
    o = this;
    return g.bind(this, i2);
  };
  p.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = h;
      h = this;
    }
  };
  p.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) b(this);
  };
  p.prototype.dispose = function() {
    this.d();
  };
  function E(i2, t2) {
    var r2 = new p(i2, t2);
    try {
      r2.c();
    } catch (i3) {
      r2.d();
      throw i3;
    }
    var o2 = r2.d.bind(r2);
    o2[Symbol.dispose] = o2;
    return o2;
  }
  function createSettingsHook(storageKey, defaultSettings) {
    const storageManager = new StorageManager(storageKey, defaultSettings);
    const settingsSignal = d(storageManager.loadSettings());
    const computedSettings = w(() => settingsSignal.value);
    const updateSettings = (newSettings) => {
      const updated = storageManager.saveSettings(newSettings);
      settingsSignal.value = updated;
      window.dispatchEvent(new CustomEvent("x-downloader-settings-changed"));
    };
    const resetSettings = () => {
      const reset = storageManager.resetSettings();
      settingsSignal.value = reset;
      window.dispatchEvent(new CustomEvent("x-downloader-settings-changed"));
      return reset;
    };
    const getSetting = (key) => {
      return settingsSignal.value[key];
    };
    const setSetting = (key, value) => {
      updateSettings({ [key]: value });
    };
    return {
      // 获取当前设置
      get settings() {
        return computedSettings.value;
      },
      // 更新设置
      updateSettings,
      // 重置设置
      resetSettings,
      // 获取单个设置项
      getSetting,
      // 设置单个设置项
      setSetting,
      // 响应式信号（用于组件订阅）
      signal: settingsSignal
    };
  }
  const DEFAULT_SETTINGS = {
    fileName: "<%Userid> <%Tid>_p<%PicNo>",
    showDownloadButton: true,
    videoFileName: "<%Userid> <%Tid>",
    showVideoDownloadButton: false,
    showUniversalDownloadButton: true,
    autoLikeOnDownload: false,
    messagePlacement: "top"
  };
  const STORAGE_KEY = "x-downloader-settings";
  const settingsHook = createSettingsHook(STORAGE_KEY, DEFAULT_SETTINGS);
  function useDownloaderSettings() {
    return settingsHook;
  }
  const zhTranslations$1 = {
    common: {
      ok: "确定",
      cancel: "取消",
      close: "关闭",
      reset: "重置",
      save: "保存",
      loading: "加载中...",
      error: "错误",
      success: "成功",
      warning: "警告",
      info: "信息",
      language: "语言",
      messagePlacement: {
        label: "消息弹窗位置",
        top: "顶部居中",
        bottom: "底部居中",
        topLeft: "左上角",
        topRight: "右上角",
        bottomLeft: "左下角",
        bottomRight: "右下角"
      }
    },
    button: {
      download: "下载",
      settings: "设置"
    }
  };
  const enTranslations$1 = {
    common: {
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      reset: "Reset",
      save: "Save",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Info",
      language: "Language",
      messagePlacement: {
        label: "Message Placement",
        top: "Top Center",
        bottom: "Bottom Center",
        topLeft: "Top Left",
        topRight: "Top Right",
        bottomLeft: "Bottom Left",
        bottomRight: "Bottom Right"
      }
    },
    button: {
      download: "Download",
      settings: "Settings"
    }
  };
  const zhTranslations = {
    title: "X(Twitter) Downloader 设置",
    settings: {
      image: {
        title: "图片下载设置",
        fileName: "图片文件名格式",
        fileNamePlaceholder: "<%Userid> <%Tid>_p<%PicNo>",
        fileNameHelp: "可用变量：<%Userid>、<%Tid>、<%Time>、<%PicName>、<%PicNo>",
        showButton: "显示图片下载按钮"
      },
      video: {
        title: "视频下载设置",
        fileName: "视频文件名格式",
        fileNamePlaceholder: "<%Userid> <%Tid>_video_<%Time>",
        fileNameHelp: "可用变量：<%Userid>、<%Tid>、<%Time>",
        showButton: "显示视频下载按钮"
      },
      universal: {
        title: "通用下载设置",
        showButton: "显示通用下载按钮",
        showButtonHelp: "在推文操作栏中显示统一的下载按钮，自动检测媒体类型",
        autoLike: "下载时自动点赞",
        autoLikeHelp: "下载图片或视频时自动为推文点赞（UI不会自动更新）"
      },
      reset: "重置为默认设置"
    },
    messages: {
      downloadStart: "开始下载",
      downloadSuccess: "下载成功",
      downloadError: "下载失败",
      noMediaFound: "未找到媒体文件",
      settingsReset: "设置已重置",
      imagesDownloadSuccess: "成功下载 {count} 张图片",
      videoDownloadSuccess: "视频下载成功",
      cannotRecognizeTweet: "无法识别推文，请重试",
      videoLinkNotFound: "未找到视频下载链接",
      tweetAlreadyLiked: "推文已点赞",
      likeSuccess: "点赞成功",
      cannotGetAuthInfo: "无法获取认证信息",
      networkRequestFailed: "网络请求失败 ({status})",
      likeFailed: "点赞失败: {error}",
      likeResponseError: "点赞响应异常",
      downloadFailed: "下载失败",
      videoDownloadFailed: "视频下载失败",
      imageDownloadFailed: "图片下载失败"
    },
    ui: {
      downloading: "下载中...",
      downloadVideo: "下载视频",
      downloadImage: "下载原图",
      downloadImages: "下载 {count} 张图片",
      downloadVideos: "下载 {count} 个视频"
    }
  };
  const enTranslations = {
    title: "X(Twitter) Downloader Settings",
    settings: {
      image: {
        title: "Image Download Settings",
        fileName: "Image filename format",
        fileNamePlaceholder: "<%Userid> <%Tid>_p<%PicNo>",
        fileNameHelp: "Available variables: <%Userid>, <%Tid>, <%Time>, <%PicName>, <%PicNo>",
        showButton: "Show image download button"
      },
      video: {
        title: "Video Download Settings",
        fileName: "Video filename format",
        fileNamePlaceholder: "<%Userid> <%Tid>_video_<%Time>",
        fileNameHelp: "Available variables: <%Userid>, <%Tid>, <%Time>",
        showButton: "Show video download button"
      },
      universal: {
        title: "Universal Download Settings",
        showButton: "Show universal download button",
        showButtonHelp: "Display unified download button in tweet actions, automatically detects media type",
        autoLike: "Auto-like on download",
        autoLikeHelp: "Automatically like the tweet when downloading images or videos (UI won't update automatically)"
      },
      reset: "Reset to default settings"
    },
    messages: {
      downloadStart: "Download started",
      downloadSuccess: "Download successful",
      downloadError: "Download failed",
      noMediaFound: "No media found",
      settingsReset: "Settings reset",
      imagesDownloadSuccess: "Successfully downloaded {count} images",
      videoDownloadSuccess: "Video download successful",
      cannotRecognizeTweet: "Cannot recognize tweet, please try again",
      videoLinkNotFound: "Video download link not found",
      tweetAlreadyLiked: "Tweet already liked",
      likeSuccess: "Like successful",
      cannotGetAuthInfo: "Cannot get authentication info",
      networkRequestFailed: "Network request failed ({status})",
      likeFailed: "Like failed: {error}",
      likeResponseError: "Like response error",
      downloadFailed: "Download failed",
      videoDownloadFailed: "Video download failed",
      imageDownloadFailed: "Image download failed"
    },
    ui: {
      downloading: "Downloading...",
      downloadVideo: "Download Video",
      downloadImage: "Download Image",
      downloadImages: "Download {count} Images",
      downloadVideos: "Download {count} Videos"
    }
  };
  i18n.addTranslations("zh", { ...zhTranslations$1, ...zhTranslations });
  i18n.addTranslations("en", { ...enTranslations$1, ...enTranslations });
  function SettingsPanel({ isOpen, onClose }) {
    const { settings, setSetting, resetSettings } = useDownloaderSettings();
    const { t: t2 } = useI18n();
    const { theme, isDark } = useTheme();
    const [resetKey, setResetKey] = d$2(0);
    const toolbarStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "16px",
      padding: "16px",
      marginBottom: "20px",
      background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
      border: `1px solid ${theme.borderColor}`,
      borderRadius: "8px"
    };
    const fieldStyle = {
      marginBottom: "20px"
    };
    const labelStyle = {
      display: "block",
      marginBottom: "8px",
      fontWeight: 500,
      fontSize: "14px",
      color: theme.textColor
    };
    const helpTextStyle = {
      marginTop: "6px",
      fontSize: "12px",
      color: theme.secondaryTextColor,
      paddingLeft: "24px"
    };
    return /* @__PURE__ */ u$3(Modal, { isOpen, onClose, title: t2("title"), children: /* @__PURE__ */ u$3("div", { children: [
      /* @__PURE__ */ u$3("div", { style: toolbarStyle, children: [
        /* @__PURE__ */ u$3(
          "div",
          {
            style: {
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
              flex: "1",
              minWidth: "0"
            },
            children: [
              /* @__PURE__ */ u$3(LanguageSelector, {}),
              /* @__PURE__ */ u$3(
                MessagePlacementSelector,
                {
                  value: settings.messagePlacement,
                  onChange: (placement) => setSetting("messagePlacement", placement)
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ u$3(
          Button,
          {
            variant: "secondary",
            style: { flexShrink: 0 },
            onClick: () => {
              resetSettings();
              setResetKey((prev) => prev + 1);
            },
            children: t2("settings.reset")
          }
        )
      ] }),
      /* @__PURE__ */ u$3(SettingsCard, { title: t2("settings.image.title"), children: [
        /* @__PURE__ */ u$3("div", { style: fieldStyle, children: [
          /* @__PURE__ */ u$3("label", { style: labelStyle, children: t2("settings.image.fileName") }),
          /* @__PURE__ */ u$3(
            Input,
            {
              value: settings.fileName,
              onChange: (value) => setSetting("fileName", value),
              placeholder: t2("settings.image.fileNamePlaceholder")
            }
          ),
          /* @__PURE__ */ u$3("div", { style: { marginTop: "6px", fontSize: "12px", color: theme.secondaryTextColor }, children: t2("settings.image.fileNameHelp") })
        ] }),
        /* @__PURE__ */ u$3(
          Checkbox,
          {
            checked: settings.showDownloadButton,
            onChange: (checked) => setSetting("showDownloadButton", checked),
            children: t2("settings.image.showButton")
          }
        )
      ] }),
      /* @__PURE__ */ u$3(SettingsCard, { title: t2("settings.video.title"), children: [
        /* @__PURE__ */ u$3("div", { style: fieldStyle, children: [
          /* @__PURE__ */ u$3("label", { style: labelStyle, children: t2("settings.video.fileName") }),
          /* @__PURE__ */ u$3(
            Input,
            {
              value: settings.videoFileName,
              onChange: (value) => setSetting("videoFileName", value),
              placeholder: t2("settings.video.fileNamePlaceholder")
            }
          ),
          /* @__PURE__ */ u$3("div", { style: { marginTop: "6px", fontSize: "12px", color: theme.secondaryTextColor }, children: t2("settings.video.fileNameHelp") })
        ] }),
        /* @__PURE__ */ u$3(
          Checkbox,
          {
            checked: settings.showVideoDownloadButton,
            onChange: (checked) => setSetting("showVideoDownloadButton", checked),
            children: t2("settings.video.showButton")
          }
        )
      ] }),
      /* @__PURE__ */ u$3(SettingsCard, { title: t2("settings.universal.title"), children: [
        /* @__PURE__ */ u$3("div", { children: [
          /* @__PURE__ */ u$3(
            Checkbox,
            {
              checked: settings.showUniversalDownloadButton,
              onChange: (checked) => setSetting("showUniversalDownloadButton", checked),
              children: t2("settings.universal.showButton")
            }
          ),
          /* @__PURE__ */ u$3("div", { style: helpTextStyle, children: t2("settings.universal.showButtonHelp") })
        ] }),
        /* @__PURE__ */ u$3("div", { style: { marginTop: "16px" }, children: [
          /* @__PURE__ */ u$3(
            Checkbox,
            {
              checked: settings.autoLikeOnDownload,
              onChange: (checked) => setSetting("autoLikeOnDownload", checked),
              children: t2("settings.universal.autoLike")
            }
          ),
          /* @__PURE__ */ u$3("div", { style: helpTextStyle, children: t2("settings.universal.autoLikeHelp") })
        ] })
      ] })
    ] }, resetKey) });
  }
  function App() {
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = d$2(false);
    return /* @__PURE__ */ u$3(k$1, { children: [
      /* @__PURE__ */ u$3(
        SettingsButton,
        {
          onClick: () => setIsSettingsPanelOpen(!isSettingsPanelOpen),
          isSettingsPanelOpen
        }
      ),
      /* @__PURE__ */ u$3(SettingsPanel, { isOpen: isSettingsPanelOpen, onClose: () => setIsSettingsPanelOpen(false) })
    ] });
  }
  const spin = h$1`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
  const StyledButton = j("button")`
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
`;
  const DownloadIcon$1 = j("svg")`
  width: var(--icon-width, 20px);
  height: var(--icon-height, 20px);
  fill: var(--icon-color, white);
`;
  const LoadingIcon = j("svg")`
  width: var(--icon-width, 18px);
  height: var(--icon-height, 18px);
  animation: ${spin} 1s linear infinite;
  fill: none;
  color: var(--icon-color, white);
`;
  const defaultDownloadIcon = /* @__PURE__ */ u$3(DownloadIcon$1, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ u$3("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" }) });
  const defaultLoadingIcon = /* @__PURE__ */ u$3(LoadingIcon, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ u$3(
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      strokeWidth: "4",
      fill: "none",
      strokeDasharray: "31.416",
      strokeDashoffset: "15.708"
    }
  ) });
  function DownloadButton({
    onDownload,
    title,
    isDownloading = false,
    disabled = false,
    icon = defaultDownloadIcon,
    loadingIcon = defaultLoadingIcon,
    style: style2 = {},
    className = ""
  }) {
    const isDisabled = disabled || isDownloading;
    const handleClick = async (e2) => {
      preventEventPropagation(e2);
      if (isDisabled) return;
      await onDownload(e2);
    };
    const convertStyleToCSSVars = (styles) => {
      const cssVars = {};
      for (const [key, value] of Object.entries(styles)) {
        const cssVarName = `--${key.replace(/[A-Z]/g, "-$&").toLowerCase()}`;
        cssVars[cssVarName] = value;
      }
      return cssVars;
    };
    const buttonStyle = {
      // 功能性 CSS 变量
      "--cursor": isDisabled ? "not-allowed" : "pointer",
      "--opacity": isDownloading ? "0.5" : "0.8",
      "--transform": isDownloading ? "scale(0.95)" : "scale(1)",
      "--hover-transform": isDownloading ? "scale(0.95)" : "scale(1.05)",
      ...!style2.top && !style2.bottom && { "--bottom": "8px" },
      ...!style2.right && !style2.left && { "--right": "8px" },
      ...convertStyleToCSSVars(style2)
    };
    return /* @__PURE__ */ u$3(
      StyledButton,
      {
        className,
        style: buttonStyle,
        onClick: handleClick,
        onMouseDown: (e2) => {
          e2.preventDefault();
          return false;
        },
        title,
        disabled: isDisabled,
        children: isDownloading ? loadingIcon : icon
      }
    );
  }
  const GRAPHQL_TWEET_DETAIL_ID = "_8aYOgEDz35BrBcBal1-_w";
  const GRAPHQL_ENDPOINT = `https://x.com/i/api/graphql/${GRAPHQL_TWEET_DETAIL_ID}/TweetDetail`;
  const GRAPHQL_AUTH_TOKEN = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
  const TWEET_FEATURE_FLAGS = {
    rweb_video_screen_enabled: false,
    profile_label_improvements_pcf_label_in_post_enabled: true,
    rweb_tipjar_consumption_enabled: true,
    verified_phone_label_enabled: false,
    creator_subscriptions_tweet_preview_api_enabled: true,
    responsive_web_graphql_timeline_navigation_enabled: true,
    responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
    premium_content_api_read_enabled: false,
    communities_web_enable_tweet_community_results_fetch: true,
    c9s_tweet_anatomy_moderator_badge_enabled: true,
    responsive_web_grok_analyze_button_fetch_trends_enabled: false,
    responsive_web_grok_analyze_post_followups_enabled: true,
    responsive_web_jetfuel_frame: false,
    responsive_web_grok_share_attachment_enabled: true,
    articles_preview_enabled: true,
    responsive_web_edit_tweet_api_enabled: true,
    graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
    view_counts_everywhere_api_enabled: true,
    longform_notetweets_consumption_enabled: true,
    responsive_web_twitter_article_tweet_consumption_enabled: true,
    tweet_awards_web_tipping_enabled: false,
    responsive_web_grok_show_grok_translated_post: false,
    responsive_web_grok_analysis_button_from_backend: false,
    creator_subscriptions_quote_tweet_preview_enabled: false,
    freedom_of_speech_not_reach_fetch_enabled: true,
    standardized_nudges_misinfo: true,
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
    longform_notetweets_rich_text_read_enabled: true,
    longform_notetweets_inline_media_enabled: true,
    responsive_web_grok_image_annotation_enabled: true,
    responsive_web_enhance_cards_enabled: false
  };
  const TWEET_FIELD_TOGGLES = {
    withArticlePlainText: false,
    withArticleRichContentState: true,
    withDisallowedReplyControls: false,
    withGrokAnalyze: false
  };
  const FEATURES_PARAM = encodeURIComponent(JSON.stringify(TWEET_FEATURE_FLAGS));
  const FIELD_TOGGLES_PARAM = encodeURIComponent(JSON.stringify(TWEET_FIELD_TOGGLES));
  const BASE_QUERY_SUFFIX = `features=${FEATURES_PARAM}&fieldToggles=${FIELD_TOGGLES_PARAM}`;
  const BASE_VARIABLES_SUFFIX = '","rankingMode":"Relevance","includePromotedContent":false,"withCommunity":false,"withQuickPromoteEligibilityTweetFields":false,"withBirdwatchNotes":false,"withVoice":false}';
  const GRAPHQL_BASE_HEADERS = [
    ["Authorization", GRAPHQL_AUTH_TOKEN],
    ["x-twitter-active-user", "yes"],
    ["Content-Type", "application/json"]
  ];
  let cachedCsrfToken;
  const buildTweetDetailUrl = (tweetId) => {
    const variables = encodeURIComponent(`{"focalTweetId":"${tweetId}${BASE_VARIABLES_SUFFIX}`);
    return `${GRAPHQL_ENDPOINT}?${BASE_QUERY_SUFFIX}&variables=${variables}`;
  };
  function getBestVideoUrl(medias) {
    if (!Array.isArray(medias) || medias.length === 0) {
      return void 0;
    }
    const videoMedia = medias.find(
      (media) => media.type === "video" || media.type === "animated_gif"
    );
    if (!videoMedia || !videoMedia.video_info || !Array.isArray(videoMedia.video_info.variants)) {
      return void 0;
    }
    const mp4Variants = videoMedia.video_info.variants.filter(
      (variant) => variant.content_type === "video/mp4" && variant.url
    );
    if (mp4Variants.length === 0) {
      return void 0;
    }
    const bestVariant = mp4Variants.reduce((prev, current) => {
      return (current.bitrate || 0) >= (prev.bitrate || 0) ? current : prev;
    });
    return bestVariant.url;
  }
  function extractMediaFromTweetData(tweetData, tweetId) {
    try {
      const instructions = tweetData.data.threaded_conversation_with_injections_v2.instructions;
      const timelineAddEntries = instructions.find((i2) => i2.type === "TimelineAddEntries");
      if (!timelineAddEntries || !Array.isArray(timelineAddEntries.entries)) {
        return [];
      }
      for (const entry of timelineAddEntries.entries) {
        const { content, entryId } = entry;
        const { entryType, itemContent } = content;
        if (entryId === `tweet-${tweetId}` && entryType === "TimelineTimelineItem" && itemContent?.itemType === "TimelineTweet" && itemContent.tweet_results?.result?.legacy?.extended_entities?.media) {
          return itemContent.tweet_results.result.legacy.extended_entities.media;
        }
      }
      return [];
    } catch (error2) {
      console.error("Error extracting media from tweet data:", error2);
      return [];
    }
  }
  function getCSRFToken() {
    if (cachedCsrfToken) {
      return cachedCsrfToken;
    }
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
      const token = metaTag.getAttribute("content") || void 0;
      if (token) {
        cachedCsrfToken = token;
        return token;
      }
    }
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "ct0" && value) {
        cachedCsrfToken = decodeURIComponent(value);
        return cachedCsrfToken;
      }
    }
    return void 0;
  }
  async function fetchTweetData(tweetId, csrfToken) {
    const headers = new Headers(GRAPHQL_BASE_HEADERS);
    headers.set("x-csrf-token", csrfToken);
    headers.set("User-Agent", navigator.userAgent);
    const response = await fetch(buildTweetDetailUrl(tweetId), {
      method: "GET",
      headers,
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch tweet data: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  }
  async function extractVideoUrl(tweetId) {
    try {
      const csrfToken = getCSRFToken();
      if (!csrfToken) {
        throw new Error("Could not find CSRF token");
      }
      const tweetData = await fetchTweetData(tweetId, csrfToken);
      const mediaArray = extractMediaFromTweetData(tweetData, tweetId);
      const videoUrl = getBestVideoUrl(mediaArray);
      return videoUrl;
    } catch (error2) {
      cachedCsrfToken = void 0;
      console.error("Error extracting video URL:", error2);
      throw error2;
    }
  }
  function findVideoContainer(videoElement) {
    let current = videoElement.parentElement;
    while (current && current.tagName !== "BODY") {
      if (current.hasAttribute("data-testid") && current.getAttribute("data-testid") === "videoComponent") {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }
  function findVideoPlayerContainer(videoElement) {
    let current = videoElement.parentElement;
    while (current && current.tagName !== "BODY") {
      if (current.hasAttribute("data-testid") && current.getAttribute("data-testid") === "videoPlayer") {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }
  const TWITTER_API_ENDPOINT = "https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet";
  const TWITTER_BEARER_TOKEN = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
  function getTwitterHeaders() {
    const csrfToken = getCookie("ct0");
    const cookies = document.cookie;
    if (!csrfToken || !cookies) {
      /* @__PURE__ */ console.debug("Unable to obtain necessary authentication information from cookies.");
      return null;
    }
    return {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      authorization: TWITTER_BEARER_TOKEN,
      "content-type": "application/json",
      "x-csrf-token": csrfToken,
      "x-twitter-active-user": "yes",
      "x-twitter-auth-type": "OAuth2Session",
      "x-twitter-client-language": "en",
      cookie: cookies
    };
  }
  async function likeTweet(tweetId) {
    try {
      const headers = getTwitterHeaders();
      if (!headers) {
        return { success: false, message: i18n.t("messages.cannotGetAuthInfo") };
      }
      const payload = {
        variables: {
          tweet_id: tweetId
        },
        queryId: "lI07N6Otwv1PhnEgXILM7A"
      };
      const response = await fetch(TWITTER_API_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        return {
          success: false,
          message: i18n.t("messages.networkRequestFailed", { status: response.status })
        };
      }
      const result = await response.json();
      const { errors, data } = result;
      if (errors && errors.length > 0) {
        const [error2] = errors;
        const { code, name, message: errorMessage } = error2 || {};
        if (code === 139 && name === "AuthorizationError") {
          /* @__PURE__ */ console.debug(`📋 Tweets liked: ${tweetId}`);
          message.info(i18n.t("messages.tweetAlreadyLiked"));
          return { success: true };
        }
        const errorMsg = errorMessage || "未知错误";
        return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
      }
      if (data?.favorite_tweet === "Done") {
        /* @__PURE__ */ console.debug(`✅ Successfully liked the tweet: ${tweetId}`);
        message.info(i18n.t("messages.likeSuccess"));
        return { success: true };
      }
      return { success: false, message: i18n.t("messages.likeResponseError") };
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : String(error2);
      return { success: false, message: i18n.t("messages.likeFailed", { error: errorMsg }) };
    }
  }
  function handleDownloadError(error2, prefix = i18n.t("messages.downloadFailed")) {
    console.error(`${prefix}:`, error2);
    const errorMessage = error2 instanceof Error ? error2.message : String(error2);
    message.error(`${prefix}: ${errorMessage}`);
  }
  function findTweetContainer(element) {
    let current = element;
    while (current && current.tagName !== "BODY") {
      if (current.tagName === "ARTICLE" && current.getAttribute("data-testid") === "tweet") {
        return current;
      }
      if (current.getAttribute("role") === "dialog") {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }
  function getTweetIdFromElement(element, username = "") {
    let current = element;
    while (current && current.tagName !== "BODY") {
      if (current.tagName === "ARTICLE" && current.hasAttribute("data-testid")) {
        const testId = current.getAttribute("data-testid");
        if (testId === "tweet") {
          const links = current.querySelectorAll(`a[href*="${username}/status/"]`);
          for (const link of Array.from(links)) {
            const href = link.href;
            const match = href.match(/\/status\/(\d+)/);
            if (match) {
              return match[1];
            }
          }
        }
      }
      current = current.parentElement;
    }
    const urlMatch = window.location.href.match(/\/status\/(\d+)/);
    if (urlMatch) {
      return urlMatch[1];
    }
    return void 0;
  }
  function isInsideQuoteTweet(element) {
    const roleLink = element.closest('[role="link"]');
    if (roleLink && roleLink.querySelector("time")) {
      return true;
    }
    const idContainer = element.closest('[id^="id"]:not([aria-labelledby])');
    if (idContainer && idContainer.querySelector("time")) {
      return true;
    }
    return false;
  }
  function tweetHasDownloadableImages(tweetContainer) {
    const images = tweetContainer.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');
    return Array.from(images).some((img) => !isInsideQuoteTweet(img));
  }
  function tweetHasDownloadableVideos(tweetContainer) {
    const videos = tweetContainer.querySelectorAll("video");
    return Array.from(videos).some((video) => !isInsideQuoteTweet(video));
  }
  function getDownloadableImages(tweetContainer) {
    const images = tweetContainer.querySelectorAll('img[src^="https://pbs.twimg.com/media/"]');
    return Array.from(images).filter(
      (img) => !isInsideQuoteTweet(img)
    );
  }
  function getDownloadableVideos(tweetContainer) {
    const videos = tweetContainer.querySelectorAll("video");
    return Array.from(videos).filter(
      (video) => !isInsideQuoteTweet(video)
    );
  }
  function getUserIdFromTweetContainer(tweetContainer) {
    try {
      const userNameElement = tweetContainer.querySelector('[data-testid="User-Name"]');
      if (userNameElement) {
        const linkElement = userNameElement.querySelector('a[href^="/"]');
        if (linkElement) {
          const href = linkElement.getAttribute("href");
          if (href && href.startsWith("/")) {
            const username = href.slice(1).split("/")[0];
            if (username) {
              return username;
            }
          }
        }
      }
      const tweetLink = tweetContainer.querySelector('a[href*="/status/"]');
      if (tweetLink) {
        return extractUrlInfo(tweetLink.href).userid;
      } else {
        return extractUrlInfo(window.location.href).userid;
      }
    } catch (error2) {
      console.error("获取用户名时出错:", error2);
      return void 0;
    }
  }
  function findFirstAnchor(node) {
    let current = node;
    for (let i2 = 0; i2 < 20 && current; i2++) {
      current = current.parentElement;
      if (current?.tagName.toLowerCase() === "a") {
        return current;
      }
    }
    return null;
  }
  const handleImageDownload = async ({
    setIsDownloading,
    targetImage,
    settings,
    skipAutoLike = false,
    imageIndex
  }) => {
    setIsDownloading(true);
    const { picname, ext } = extractFileInfo(targetImage.src);
    let urlInfo;
    if (window.location.href.includes("photo")) {
      urlInfo = extractUrlInfo(window.location.href);
    } else {
      const firstA = findFirstAnchor(targetImage);
      if (!firstA) return;
      urlInfo = extractUrlInfo(firstA.href);
    }
    const picNo = imageIndex ? imageIndex : parseInt(urlInfo.picno) - 1;
    const filename = generateFileName(settings.fileName, {
      Userid: urlInfo.userid,
      Tid: urlInfo.tid,
      Time: `${Date.now()}`,
      PicName: picname,
      PicNo: `${picNo}`
    });
    const downloadUrl = `https://pbs.twimg.com/media/${picname}?format=${ext}&name=orig`;
    try {
      await downloadFile(downloadUrl, `${filename}.${ext}`);
      if (settings.autoLikeOnDownload && urlInfo.tid && !skipAutoLike) {
        const likeResult = await likeTweet(urlInfo.tid);
        if (!likeResult.success && likeResult.message) {
          message.error(likeResult.message);
        }
      }
    } catch (error2) {
      handleDownloadError(error2, i18n.t("messages.imageDownloadFailed"));
    } finally {
      setIsDownloading(false);
    }
  };
  function ImageDownloadButton({ targetImage }) {
    const { settings } = useDownloaderSettings();
    const [isDownloading, setIsDownloading] = d$2(false);
    if (!settings.showDownloadButton) return null;
    return /* @__PURE__ */ u$3(
      DownloadButton,
      {
        isDownloading,
        onDownload: () => handleImageDownload({
          setIsDownloading,
          targetImage,
          settings
        }),
        title: i18n.t("ui.downloadImage"),
        style: { bottom: "8px", right: "8px" }
      }
    );
  }
  const handleVideoDownload = async ({
    setIsDownloading,
    src,
    tweetContainer,
    settings,
    skipAutoLike = false
  }) => {
    setIsDownloading(true);
    try {
      const username = getUserIdFromTweetContainer(tweetContainer);
      const tweetId = getTweetIdFromElement(tweetContainer, username);
      if (!tweetId) {
        message.error(i18n.t("messages.cannotRecognizeTweet"));
        return;
      }
      const videoUrl = src && src.startsWith("https://video.twimg.com") ? src : await extractVideoUrl(tweetId);
      if (!videoUrl) {
        message.error(i18n.t("messages.videoLinkNotFound"));
        return;
      }
      const urlInfo = { userid: username, tid: tweetId };
      const filename = generateFileName(settings.videoFileName, {
        Userid: urlInfo.userid || "unknown",
        Tid: urlInfo.tid,
        Time: `${Date.now()}`
      });
      await downloadFile(videoUrl, `${filename}.mp4`);
      if (settings.autoLikeOnDownload && tweetId && !skipAutoLike) {
        const likeResult = await likeTweet(tweetId);
        if (!likeResult.success && likeResult.message) {
          message.error(likeResult.message);
        }
      }
    } catch (error2) {
      handleDownloadError(error2, i18n.t("messages.videoDownloadFailed"));
    } finally {
      setIsDownloading(false);
    }
  };
  function VideoDownloadButton({ src, tweetContainer }) {
    const { settings } = useDownloaderSettings();
    const [isDownloading, setIsDownloading] = d$2(false);
    if (!settings.showVideoDownloadButton) {
      return null;
    }
    return /* @__PURE__ */ u$3(
      DownloadButton,
      {
        onDownload: () => {
          if (isDownloading) return;
          setIsDownloading(true);
          handleVideoDownload({
            setIsDownloading,
            src,
            tweetContainer,
            settings
          }).finally(() => {
            setIsDownloading(false);
          });
        },
        title: isDownloading ? i18n.t("ui.downloading") : i18n.t("ui.downloadVideo"),
        isDownloading,
        style: { bottom: "70px", right: "8px" }
      }
    );
  }
  const InlineButton = j("button")`
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
`;
  const DownloadIcon = j("svg")`
  width: 18.75px;
  height: 18.75px;
  fill: currentColor;
`;
  function UniversalDownloadButton({ tweetContainer }) {
    const { settings } = useDownloaderSettings();
    const [isDownloading, setIsDownloading] = d$2(false);
    const [mediaType, setMediaType] = d$2("none");
    const url = window.location.href;
    y$1(() => {
      let timeoutId = null;
      const detectMediaType = () => {
        if (tweetHasDownloadableImages(tweetContainer)) {
          setMediaType("image");
          return;
        }
        if (tweetHasDownloadableVideos(tweetContainer)) {
          setMediaType("video");
          return;
        }
        setMediaType("none");
      };
      const debouncedDetectMediaType = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(detectMediaType, 100);
      };
      detectMediaType();
      const observer = new MutationObserver(debouncedDetectMediaType);
      observer.observe(tweetContainer, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
      });
      return () => {
        observer.disconnect();
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
      };
    }, [tweetContainer]);
    if (mediaType === "none" || !settings.showUniversalDownloadButton) {
      return null;
    }
    const nopSetDownloading = () => {
    };
    const downloadImages = async (container) => {
      if (url.includes("/photo/") && container.nodeName !== "ARTICLE") {
        const photoMatch = url.match(/\/photo\/(\d+)/);
        const photoIndex = photoMatch && photoMatch[1] ? parseInt(photoMatch[1]) - 1 : 0;
        const carouselContainer = container.querySelector('[aria-roledescription="carousel"]');
        if (carouselContainer) {
          const targetImage = carouselContainer.querySelectorAll(IMAGE_SELECTOR)[photoIndex];
          if (targetImage) {
            await handleImageDownload({
              setIsDownloading: nopSetDownloading,
              targetImage,
              settings,
              imageIndex: photoIndex
            });
            message.success(i18n.t("messages.imagesDownloadSuccess", { count: 1 }));
            return;
          }
        }
        throw new Error("Image not found in preview mode");
      }
      const images = getDownloadableImages(container);
      const downloadPromises = images.map((img, index) => {
        if (!img) return Promise.resolve();
        return handleImageDownload({
          setIsDownloading: nopSetDownloading,
          targetImage: img,
          settings,
          skipAutoLike: index > 0,
          // 只有第一张图片允许点赞，其他跳过
          imageIndex: index
        });
      });
      const results = await Promise.allSettled(downloadPromises);
      const failed = results.filter((result) => result.status === "rejected");
      const successCount = results.length - failed.length;
      if (successCount === 0) {
        message.error(i18n.t("messages.imageDownloadFailed"));
      } else if (failed.length > 0) {
        message.warning(
          i18n.t("messages.imagesDownloadSuccess", { count: `${successCount}/${results.length}` })
        );
      } else {
        message.success(i18n.t("messages.imagesDownloadSuccess", { count: results.length }));
      }
    };
    const downloadVideo = async (container) => {
      const videos = getDownloadableVideos(container);
      const video = videos[0];
      if (!video) return;
      handleVideoDownload({
        setIsDownloading: nopSetDownloading,
        src: video.src,
        tweetContainer: container,
        settings
      }).then(() => message.success(i18n.t("messages.videoDownloadSuccess")));
    };
    const getTitle = () => {
      if (isDownloading) return i18n.t("ui.downloading");
      let imageCount = getDownloadableImages(tweetContainer).length;
      let videoCount = getDownloadableVideos(tweetContainer).length;
      if (["/photo/", "/video/"].some((segment) => url.includes(segment))) {
        imageCount = 1;
        videoCount = 1;
      }
      if (mediaType === "image") {
        return imageCount > 1 ? i18n.t("ui.downloadImages", { count: imageCount }) : i18n.t("ui.downloadImage");
      }
      return videoCount > 1 ? i18n.t("ui.downloadVideos", { count: videoCount }) : i18n.t("ui.downloadVideo");
    };
    const handleDownload = async (e2) => {
      if (isDownloading) return;
      e2.stopPropagation();
      setIsDownloading(true);
      try {
        if (mediaType === "image") {
          await downloadImages(tweetContainer);
        } else if (mediaType === "video") {
          await downloadVideo(tweetContainer);
        }
      } finally {
        setIsDownloading(false);
      }
    };
    return /* @__PURE__ */ u$3(InlineButton, { onClick: handleDownload, disabled: isDownloading, title: getTitle(), children: /* @__PURE__ */ u$3(DownloadIcon, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ u$3("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" }) }) });
  }
  const IMAGE_SELECTOR = 'img[src^="https://pbs.twimg.com/media/"]';
  const VIDEO_SELECTOR = "video";
  const processedImages = /* @__PURE__ */ new WeakSet();
  const processedVideos = /* @__PURE__ */ new WeakSet();
  const processedTweets = /* @__PURE__ */ new WeakSet();
  const getSettings = () => JSON.parse(localStorage.getItem("x-downloader-settings") || "{}");
  const mountHoverButton = (hostElement, settingKey, renderCallback) => {
    const container = document.createElement("div");
    container.style.display = "none";
    hostElement.appendChild(container);
    const showButton = () => {
      const shouldShow = getSettings()[settingKey] !== false;
      container.style.display = shouldShow ? "block" : "none";
      if (shouldShow) renderCallback(container);
    };
    renderCallback(container);
    hostElement.addEventListener("mouseenter", showButton);
    hostElement.addEventListener("mouseleave", () => container.style.display = "none");
  };
  const ensureRelativePosition = (element) => {
    const style2 = getComputedStyle(element);
    if (style2.position === "static") {
      element.style.position = "relative";
    }
  };
  function setupUniversalDownloadButton(tweetElement) {
    if (processedTweets.has(tweetElement)) return;
    const actionGroup = Array.from(tweetElement.querySelectorAll('div[role="group"]')).find(
      (group) => {
        const ariaLabel = group.getAttribute("aria-label");
        return ariaLabel && ariaLabel.includes("likes");
      }
    );
    if (!actionGroup) return;
    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = "display: inline-flex; align-items: center; margin-left: auto;";
    actionGroup.appendChild(buttonContainer);
    const renderButton = () => G(/* @__PURE__ */ u$3(UniversalDownloadButton, { tweetContainer: tweetElement }), buttonContainer);
    renderButton();
    let timeoutId = null;
    actionGroup.addEventListener("mouseenter", () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(renderButton, 50);
    });
    processedTweets.add(tweetElement);
  }
  const isTargetImage = (img) => Boolean(img.src) && img.src.startsWith("https://pbs.twimg.com/media/");
  function setupImageInteraction(img) {
    if (processedImages.has(img) || !isTargetImage(img)) return;
    const tweetContainer = findTweetContainer(img);
    if (tweetContainer) setupUniversalDownloadButton(tweetContainer);
    const imageContainer = img.parentElement?.parentElement;
    if (!imageContainer) return;
    ensureRelativePosition(imageContainer);
    mountHoverButton(imageContainer, "showDownloadButton", (container) => {
      G(/* @__PURE__ */ u$3(ImageDownloadButton, { targetImage: img }), container);
    });
    processedImages.add(img);
  }
  function setupVideoInteraction(video) {
    if (processedVideos.has(video)) return;
    if (isInsideQuoteTweet(video)) {
      return;
    }
    const tweetContainer = findTweetContainer(video);
    if (!tweetContainer) return;
    setupUniversalDownloadButton(tweetContainer);
    const videoContainer = findVideoContainer(video) || findVideoPlayerContainer(video);
    if (!videoContainer) return;
    mountHoverButton(videoContainer, "showVideoDownloadButton", (container) => {
      G(/* @__PURE__ */ u$3(VideoDownloadButton, { src: video.src, tweetContainer }), container);
    });
    processedVideos.add(video);
  }
  const scanNodeForMedia = (node) => {
    if (node instanceof HTMLImageElement && isTargetImage(node)) {
      setupImageInteraction(node);
    } else if (node.firstChild instanceof HTMLVideoElement) {
      setupVideoInteraction(node.firstChild);
    } else if (node instanceof Element || node instanceof Document || node instanceof DocumentFragment) {
      node.querySelectorAll(IMAGE_SELECTOR).forEach((img) => setupImageInteraction(img));
      node.querySelectorAll(VIDEO_SELECTOR).forEach((video) => setupVideoInteraction(video));
    }
  };
  function watchForMedia() {
    const pendingNodes = /* @__PURE__ */ new Set();
    let rafId = null;
    const scheduleScan = (node) => {
      pendingNodes.add(node);
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        pendingNodes.forEach((pendingNode) => {
          scanNodeForMedia(pendingNode);
        });
        pendingNodes.clear();
      });
    };
    scheduleScan(document);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          scheduleScan(node);
        });
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      // 不监听属性变化
      characterData: false
      // 不监听文本变化
    });
    const cleanup = () => {
      observer.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      pendingNodes.clear();
    };
    window.addEventListener("beforeunload", cleanup);
  }
  function initializeApp() {
    const appContainer = document.createElement("div");
    appContainer.id = "x-downloader-app";
    document.body.appendChild(appContainer);
    G(/* @__PURE__ */ u$3(App, {}), appContainer);
    watchForMedia();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }
})();
