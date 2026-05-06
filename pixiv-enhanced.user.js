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

(function() {
  "use strict";
  var n$3, l$4, u$4, t$5, i$4, r$3, o$4, e$3, f$4, c$4, s$4, a$4, h$3, p$4, v$2, y$2, d$3 = {}, w$3 = [], _$2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g$3 = Array.isArray;
  function m$3(n2, l2) {
    for (var u2 in l2) n2[u2] = l2[u2];
    return n2;
  }
  function b$3(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k$2(l2, u2, t2) {
    var i2, r2, o2, e2 = {};
    for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n$3.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return x$2(l2, e2, i2, r2, null);
  }
  function x$2(n2, t2, i2, r2, o2) {
    var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$4 : o2, __i: -1, __u: 0 };
    return null == o2 && null != l$4.vnode && l$4.vnode(e2), e2;
  }
  function M() {
    return { current: null };
  }
  function S$1(n2) {
    return n2.children;
  }
  function C$2(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function $(n2, l2) {
    if (null == l2) return n2.__ ? $(n2.__, n2.__i + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
    return "function" == typeof n2.type ? $(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u2 = n2.__v, t2 = u2.__e, i2 = [], r2 = [], o2 = m$3({}, u2);
      o2.__v = u2.__v + 1, l$4.vnode && l$4.vnode(o2), q$1(n2.__P, o2, u2, n2.__n, n2.__P.namespaceURI, 32 & u2.__u ? [t2] : null, i2, null == t2 ? $(u2) : t2, !!(32 & u2.__u), r2), o2.__v = u2.__v, o2.__.__k[o2.__i] = o2, D$1(i2, o2, r2), u2.__e = u2.__ = null, o2.__e != t2 && P$1(o2);
    }
  }
  function P$1(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l2) {
      if (null != l2 && null != l2.__e) return n2.__e = n2.__c.base = l2.__e;
    }), P$1(n2);
  }
  function A$1(n2) {
    (!n2.__d && (n2.__d = true) && i$4.push(n2) && !H.__r++ || r$3 != l$4.debounceRendering) && ((r$3 = l$4.debounceRendering) || o$4)(H);
  }
  function H() {
    try {
      for (var n2, l2 = 1; i$4.length; ) i$4.length > l2 && i$4.sort(e$3), n2 = i$4.shift(), l2 = i$4.length, I(n2);
    } finally {
      i$4.length = H.__r = 0;
    }
  }
  function L(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, v2, y2, _2, g2, m2 = t2 && t2.__k || w$3, b2 = l2.length;
    for (f2 = T$2(u2, l2, m2, f2, b2), a2 = 0; a2 < b2; a2++) null != (p2 = u2.__k[a2]) && (h2 = -1 != p2.__i && m2[p2.__i] || d$3, p2.__i = a2, _2 = q$1(n2, p2, h2, i2, r2, o2, e2, f2, c2, s2), v2 = p2.__e, p2.ref && h2.ref != p2.ref && (h2.ref && J(h2.ref, null, p2), s2.push(p2.ref, p2.__c || v2, p2)), null == y2 && null != v2 && (y2 = v2), (g2 = !!(4 & p2.__u)) || h2.__k === p2.__k ? (f2 = j$2(p2, f2, n2, g2), g2 && h2.__e && (h2.__e = null)) : "function" == typeof p2.type && void 0 !== _2 ? f2 = _2 : v2 && (f2 = v2.nextSibling), p2.__u &= -7);
    return u2.__e = y2, f2;
  }
  function T$2(n2, l2, u2, t2, i2) {
    var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
    for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? ("string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? o2 = n2.__k[r2] = x$2(null, o2, null, null, null) : g$3(o2) ? o2 = n2.__k[r2] = x$2(S$1, { children: o2 }, null, null, null) : void 0 === o2.constructor && o2.__b > 0 ? o2 = n2.__k[r2] = x$2(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f2 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = O$1(o2, u2, f2, a2)) && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? h2-- : i2 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = $(e2)), K(e2, e2));
    return t2;
  }
  function j$2(n2, l2, u2, t2) {
    var i2, r2;
    if ("function" == typeof n2.type) {
      for (i2 = n2.__k, r2 = 0; i2 && r2 < i2.length; r2++) i2[r2] && (i2[r2].__ = n2, l2 = j$2(i2[r2], l2, u2, t2));
      return l2;
    }
    n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = $(n2)), u2.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function F$1(n2, l2) {
    return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (g$3(n2) ? n2.some(function(n3) {
      F$1(n3, l2);
    }) : l2.push(n2)), l2;
  }
  function O$1(n2, l2, u2, t2) {
    var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], s2 = null != c2 && 0 == (2 & c2.__u);
    if (null === c2 && null == e2 || s2 && e2 == c2.key && f2 == c2.type) return u2;
    if (t2 > (s2 ? 1 : 0)) {
      for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
    }
    return -1;
  }
  function z$1(n2, l2, u2) {
    "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || _$2.test(l2) ? u2 : u2 + "px";
  }
  function N(n2, l2, u2, t2, i2) {
    var r2, o2;
    n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || z$1(n2.style, l2, "");
      if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || z$1(n2.style, l2, u2[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(a$4, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2[s$4] = t2[s$4] : (u2[s$4] = h$3, n2.addEventListener(l2, r2 ? v$2 : p$4, r2)) : n2.removeEventListener(l2, r2 ? v$2 : p$4, r2);
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
  function V(n2) {
    return function(u2) {
      if (this.l) {
        var t2 = this.l[u2.type + n2];
        if (null == u2[c$4]) u2[c$4] = h$3++;
        else if (u2[c$4] < t2[s$4]) return;
        return t2(l$4.event ? l$4.event(u2) : u2);
      }
    };
  }
  function q$1(n2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, v2, y2, d2, _2, k2, x2, M2, $2, I2, P2, A2, H2, T2 = u2.type;
    if (void 0 !== u2.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l$4.__b) && a2(u2);
    n: if ("function" == typeof T2) try {
      if (k2 = u2.props, x2 = T2.prototype && T2.prototype.render, M2 = (a2 = T2.contextType) && i2[a2.__c], $2 = a2 ? M2 ? M2.props.value : a2.__ : i2, t2.__c ? _2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (x2 ? u2.__c = h2 = new T2(k2, $2) : (u2.__c = h2 = new C$2(k2, $2), h2.constructor = T2, h2.render = Q), M2 && M2.sub(h2), h2.state || (h2.state = {}), h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), x2 && null == h2.__s && (h2.__s = h2.state), x2 && null != T2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = m$3({}, h2.__s)), m$3(h2.__s, T2.getDerivedStateFromProps(k2, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u2, p2) x2 && null == T2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), x2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (x2 && null == T2.getDerivedStateFromProps && k2 !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(k2, $2), u2.__v == t2.__v || !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(k2, h2.__s, $2)) {
          u2.__v != t2.__v && (h2.props = k2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
            n3 && (n3.__ = u2);
          }), w$3.push.apply(h2.__h, h2._sb), h2._sb = [], h2.__h.length && e2.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(k2, h2.__s, $2), x2 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(v2, y2, d2);
        });
      }
      if (h2.context = $2, h2.props = k2, h2.__P = n2, h2.__e = false, I2 = l$4.__r, P2 = 0, x2) h2.state = h2.__s, h2.__d = false, I2 && I2(u2), a2 = h2.render(h2.props, h2.state, h2.context), w$3.push.apply(h2.__h, h2._sb), h2._sb = [];
      else do {
        h2.__d = false, I2 && I2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++P2 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i2 = m$3(m$3({}, i2), h2.getChildContext())), x2 && !p2 && null != h2.getSnapshotBeforeUpdate && (d2 = h2.getSnapshotBeforeUpdate(v2, y2)), A2 = null != a2 && a2.type === S$1 && null == a2.key ? E$1(a2.props.children) : a2, f2 = L(n2, g$3(A2) ? A2 : [A2], u2, t2, i2, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), _2 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u2.__v = null, c2 || null != o2) if (n3.then) {
        for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
        o2[o2.indexOf(f2)] = null, u2.__e = f2;
      } else {
        for (H2 = o2.length; H2--; ) b$3(o2[H2]);
        B$1(u2);
      }
      else u2.__e = t2.__e, u2.__k = t2.__k, n3.then || B$1(u2);
      l$4.__e(n3, u2, t2);
    }
    else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = G(t2.__e, u2, t2, i2, r2, o2, e2, c2, s2);
    return (a2 = l$4.diffed) && a2(u2), 128 & u2.__u ? void 0 : f2;
  }
  function B$1(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B$1));
  }
  function D$1(n2, u2, t2) {
    for (var i2 = 0; i2 < t2.length; i2++) J(t2[i2], t2[++i2], t2[++i2]);
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
  function E$1(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g$3(n2) ? n2.map(E$1) : m$3({}, n2);
  }
  function G(u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, v2, y2, w2, _2, m2 = i2.props || d$3, k2 = t2.props, x2 = t2.type;
    if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a2 = 0; a2 < e2.length; a2++) if ((y2 = e2[a2]) && "setAttribute" in y2 == !!x2 && (x2 ? y2.localName == x2 : 3 == y2.nodeType)) {
        u2 = y2, e2[a2] = null;
        break;
      }
    }
    if (null == u2) {
      if (null == x2) return document.createTextNode(k2);
      u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$4.__m && l$4.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null == x2) m2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
    else {
      if (e2 = e2 && n$3.call(u2.childNodes), !c2 && null != e2) for (m2 = {}, a2 = 0; a2 < u2.attributes.length; a2++) m2[(y2 = u2.attributes[a2]).name] = y2.value;
      for (a2 in m2) y2 = m2[a2], "dangerouslySetInnerHTML" == a2 ? p2 = y2 : "children" == a2 || a2 in k2 || "value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2 || N(u2, a2, null, y2, o2);
      for (a2 in k2) y2 = k2[a2], "children" == a2 ? v2 = y2 : "dangerouslySetInnerHTML" == a2 ? h2 = y2 : "value" == a2 ? w2 = y2 : "checked" == a2 ? _2 = y2 : c2 && "function" != typeof y2 || m2[a2] === y2 || N(u2, a2, y2, m2[a2], o2);
      if (h2) c2 || p2 && (h2.__html == p2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
      else if (p2 && (u2.innerHTML = ""), L("template" == t2.type ? u2.content : u2, g$3(v2) ? v2 : [v2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && $(i2, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) b$3(e2[a2]);
      c2 || (a2 = "value", "progress" == x2 && null == w2 ? u2.removeAttribute("value") : null != w2 && (w2 !== u2[a2] || "progress" == x2 && !w2 || "option" == x2 && w2 != m2[a2]) && N(u2, a2, w2, m2[a2], o2), a2 = "checked", null != _2 && _2 != u2[a2] && N(u2, a2, _2, m2[a2], o2));
    }
    return u2;
  }
  function J(n2, u2, t2) {
    try {
      if ("function" == typeof n2) {
        var i2 = "function" == typeof n2.__u;
        i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
      } else n2.current = u2;
    } catch (n3) {
      l$4.__e(n3, t2);
    }
  }
  function K(n2, u2, t2) {
    var i2, r2;
    if (l$4.unmount && l$4.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || J(i2, null, u2)), null != (i2 = n2.__c)) {
      if (i2.componentWillUnmount) try {
        i2.componentWillUnmount();
      } catch (n3) {
        l$4.__e(n3, u2);
      }
      i2.base = i2.__P = null;
    }
    if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && K(i2[r2], u2, t2 || "function" != typeof n2.type);
    t2 || b$3(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function R(u2, t2, i2) {
    var r2, o2, e2, f2;
    t2 == document && (t2 = document.documentElement), l$4.__ && l$4.__(u2, t2), o2 = (r2 = "function" == typeof i2) ? null : i2 && i2.__k || t2.__k, e2 = [], f2 = [], q$1(t2, u2 = (!r2 && i2 || t2).__k = k$2(S$1, null, [u2]), o2 || d$3, d$3, t2.namespaceURI, !r2 && i2 ? [i2] : o2 ? null : t2.firstChild ? n$3.call(t2.childNodes) : null, e2, !r2 && i2 ? i2 : o2 ? o2.__e : t2.firstChild, r2, f2), D$1(e2, u2, f2);
  }
  function U(n2, l2) {
    R(n2, l2, U);
  }
  function W(l2, u2, t2) {
    var i2, r2, o2, e2, f2 = m$3({}, l2.props);
    for (o2 in l2.type && l2.type.defaultProps && (e2 = l2.type.defaultProps), u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = void 0 === u2[o2] && null != e2 ? e2[o2] : u2[o2];
    return arguments.length > 2 && (f2.children = arguments.length > 3 ? n$3.call(arguments, 2) : t2), x$2(l2.type, f2, i2 || l2.key, r2 || l2.ref, null);
  }
  function X(n2) {
    function l2(n3) {
      var u2, t2;
      return this.getChildContext || (u2 = /* @__PURE__ */ new Set(), (t2 = {})[l2.__c] = this, this.getChildContext = function() {
        return t2;
      }, this.componentWillUnmount = function() {
        u2 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value != n4.value && u2.forEach(function(n5) {
          n5.__e = true, A$1(n5);
        });
      }, this.sub = function(n4) {
        u2.add(n4);
        var l3 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u2 && u2.delete(n4), l3 && l3.call(n4);
        };
      }), n3.children;
    }
    return l2.__c = "__cC" + y$2++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
      return n3.children(l3);
    }).contextType = l2, l2;
  }
  n$3 = w$3.slice, l$4 = { __e: function(n2, l2, u2, t2) {
    for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
      if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u$4 = 0, t$5 = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, C$2.prototype.setState = function(n2, l2) {
    var u2;
    u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$3({}, this.state), "function" == typeof n2 && (n2 = n2(m$3({}, u2), this.props)), n2 && m$3(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), A$1(this));
  }, C$2.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), A$1(this));
  }, C$2.prototype.render = S$1, i$4 = [], o$4 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$3 = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, H.__r = 0, f$4 = Math.random().toString(8), c$4 = "__d" + f$4, s$4 = "__a" + f$4, a$4 = /(PointerCapture)$|Capture$/i, h$3 = 0, p$4 = V(false), v$2 = V(true), y$2 = 0;
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
    var t2 = u$3(S$1, { tpl: r2, exprs: [].slice.call(arguments, 1) });
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
  const DEFAULT_SETTINGS = {
    fileName: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
    showHoverButton: true,
    buttonPositionVertical: "bottom",
    buttonPositionHorizontal: "right",
    buttonPositionVerticalValue: "8",
    buttonPositionHorizontalValue: "8",
    messagePlacement: "top"
  };
  var t$3, r$2, u$2, i$2, o$2 = 0, f$2 = [], c$2 = l$4, e$2 = c$2.__b, a$2 = c$2.__r, v$1 = c$2.diffed, l$2 = c$2.__c, m$2 = c$2.unmount, s$2 = c$2.__;
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
          return n4.__c;
        });
        if (u3.every(function(n4) {
          return !n4.__N;
        })) return !c2 || c2.call(this, n3, t2, r2);
        var i3 = o2.__c.props !== n3;
        return u3.some(function(n4) {
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
    !c$2.__s && C$1(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$2.__H.__h.push(i2));
  }
  function _$1(n2, u2) {
    var i2 = p$2(t$3++, 4);
    !c$2.__s && C$1(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$2.__h.push(i2));
  }
  function A(n2) {
    return o$2 = 5, T$1(function() {
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
  function T$1(n2, r2) {
    var u2 = p$2(t$3++, 7);
    return C$1(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
  }
  function q(n2, t2) {
    return o$2 = 8, T$1(function() {
      return n2;
    }, t2);
  }
  function x$1(n2) {
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
    for (var n2; n2 = f$2.shift(); ) {
      var t2 = n2.__H;
      if (n2.__P && t2) try {
        t2.__h.some(z), t2.__h.some(B), t2.__h = [];
      } catch (r2) {
        t2.__h = [], c$2.__e(r2, n2.__v);
      }
    }
  }
  c$2.__b = function(n2) {
    r$2 = null, e$2 && e$2(n2);
  }, c$2.__ = function(n2, t2) {
    n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s$2 && s$2(n2, t2);
  }, c$2.__r = function(n2) {
    a$2 && a$2(n2), t$3 = 0;
    var i2 = (r$2 = n2.__c).__H;
    i2 && (u$2 === r$2 ? (i2.__h = [], r$2.__h = [], i2.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i2.__h.some(z), i2.__h.some(B), i2.__h = [], t$3 = 0)), u$2 = r$2;
  }, c$2.diffed = function(n2) {
    v$1 && v$1(n2);
    var t2 = n2.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f$2.push(t2) && i$2 === c$2.requestAnimationFrame || ((i$2 = c$2.requestAnimationFrame) || w$2)(j$1)), t2.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u$2 = r$2 = null;
  }, c$2.__c = function(n2, t2) {
    t2.some(function(n3) {
      try {
        n3.__h.some(z), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B(n4);
        });
      } catch (r2) {
        t2.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t2 = [], c$2.__e(r2, n3.__v);
      }
    }), l$2 && l$2(n2, t2);
  }, c$2.unmount = function(n2) {
    m$2 && m$2(n2);
    var t2, r2 = n2.__c;
    r2 && r2.__H && (r2.__H.__.some(function(n3) {
      try {
        z(n3);
      } catch (n4) {
        t2 = n4;
      }
    }), r2.__H = void 0, t2 && c$2.__e(t2, r2.__v));
  };
  var k$1 = "function" == typeof requestAnimationFrame;
  function w$2(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), k$1 && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 35);
    k$1 && (t2 = requestAnimationFrame(r2));
  }
  function z(n2) {
    var t2 = r$2, u2 = n2.__c;
    "function" == typeof u2 && (n2.__c = void 0, u2()), r$2 = t2;
  }
  function B(n2) {
    var t2 = r$2;
    n2.__c = n2.__(), r$2 = t2;
  }
  function C$1(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  }
  function D(n2, t2) {
    return "function" == typeof t2 ? t2(n2) : t2;
  }
  const STORAGE_KEY$1 = "m-userscript-settings";
  const OPEN_SETTINGS_EVENT = "m-open-settings-panel";
  const SETTINGS_CHANGE_EVENT = `${STORAGE_KEY$1}-changed`;
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
  function formatPositionValue(value) {
    const trimmed = value.trim();
    if (/^\d+$/.test(trimmed)) {
      return `${trimmed}px`;
    }
    return trimmed;
  }
  function preventEventPropagation(e2) {
    e2.stopPropagation();
    e2.preventDefault();
  }
  let downloadCount = 0;
  const beforeUnloadHandler = (e2) => {
    e2.preventDefault();
    e2.returnValue = "";
  };
  const downloadGuard = {
    add: () => {
      if (downloadCount === 0) {
        window.addEventListener("beforeunload", beforeUnloadHandler);
      }
      downloadCount++;
    },
    remove: () => {
      downloadCount--;
      if (downloadCount <= 0) {
        downloadCount = 0;
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
    }
  };
  async function downloadFile(url, fileName) {
    downloadGuard.add();
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
    } finally {
      downloadGuard.remove();
    }
  }
  async function gmDownloadFile(url, fileName, options) {
    downloadGuard.add();
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url,
        responseType: "blob",
        ...options?.headers && { headers: options.headers },
        onload: (response) => {
          try {
            const blob = response.response;
            const blobUrl = URL.createObjectURL(blob);
            const a2 = document.createElement("a");
            a2.href = blobUrl;
            a2.download = fileName;
            a2.style.display = "none";
            document.body.appendChild(a2);
            a2.click();
            setTimeout(() => {
              document.body.removeChild(a2);
              URL.revokeObjectURL(blobUrl);
            }, 100);
            resolve();
          } catch (error2) {
            reject(error2);
          } finally {
            downloadGuard.remove();
          }
        },
        onerror: (error2) => {
          downloadGuard.remove();
          reject(error2);
        }
      });
    });
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
  let e$1 = { data: "" }, t$2 = (t2) => {
    if ("object" == typeof window) {
      let e2 = (t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign(document.createElement("style"), { innerHTML: " ", id: "_goober" });
      return e2.nonce = window.__nonce__, e2.parentNode || (t2 || document.head).appendChild(e2), e2.firstChild;
    }
    return t2 || e$1;
  }, r$1 = (e2) => {
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
  function m$1(e2, t2, r2, l2) {
    o$1.p = t2, d$1 = e2, f$1 = r2, g$1 = l2;
  }
  function w$1(e2, t2) {
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
  m$1(k$2);
  const MessageContainer = w$1("div")`
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
  const CloseIcon = w$1("span")`
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
    onClick,
    className,
    style
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
        style,
        onClick: () => {
          onClick?.();
          onClose?.();
        },
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
      const settings = JSON.parse(localStorage.getItem(STORAGE_KEY$1) || "{}");
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
    R(k$2(Message, { ...config, onClose }), messageElement);
    return onClose;
  };
  const createMessageMethod = (type) => (content, duration, placement, onClick) => show({
    type,
    content,
    placement: placement || getUserMessagePlacement(),
    ...onClick && { onClick },
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
  const MESSAGE_STYLE_ID = "userscript-message-styles";
  if (!document.getElementById(MESSAGE_STYLE_ID)) {
    const style = document.createElement("style");
    style.id = MESSAGE_STYLE_ID;
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
  }
  const DEFAULT_LOCALE = "en";
  const STORAGE_KEY = "userscript-locale";
  let currentLocale = DEFAULT_LOCALE;
  const translations = {};
  const listeners = [];
  const detectBrowserLocale = () => navigator?.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
  try {
    currentLocale = localStorage.getItem(STORAGE_KEY) || detectBrowserLocale();
  } catch {
    currentLocale = detectBrowserLocale();
  }
  const deepMerge = (target, source) => {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] !== null && typeof source[key] === "object" && !Array.isArray(source[key]) && target[key] !== null && typeof target[key] === "object" && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  };
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
      translations[locale] = deepMerge(translations[locale] || {}, data);
    },
    setLocale(locale) {
      if (currentLocale !== locale) {
        currentLocale = locale;
        try {
          localStorage.setItem(STORAGE_KEY, locale);
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
  async function copyToClipboard(text) {
    try {
      let successful = false;
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        successful = true;
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        successful = document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      if (successful) {
        message.success(i18n.t("ui.copied"));
      } else {
        message.error(i18n.t("ui.copyFailed"));
      }
      return successful;
    } catch (error2) {
      console.error("Failed to copy to clipboard:", error2);
      message.error(i18n.t("ui.copyFailed"));
      return false;
    }
  }
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
  var i = /* @__PURE__ */ Symbol.for("preact-signals");
  function t() {
    if (!(s > 1)) {
      var i2, t2 = false;
      !(function() {
        var i3 = c;
        c = void 0;
        while (void 0 !== i3) {
          if (i3.S.v === i3.v) i3.S.i = i3.i;
          i3 = i3.o;
        }
      })();
      while (void 0 !== h) {
        var n2 = h;
        h = void 0;
        v++;
        while (void 0 !== n2) {
          var r2 = n2.u;
          n2.u = void 0;
          n2.f &= -3;
          if (!(8 & n2.f) && w(n2)) try {
            n2.c();
          } catch (n3) {
            if (!t2) {
              i2 = n3;
              t2 = true;
            }
          }
          n2 = r2;
        }
      }
      v = 0;
      s--;
      if (t2) throw i2;
    } else s--;
  }
  function n(i2) {
    if (s > 0) return i2();
    e = ++u;
    s++;
    try {
      return i2();
    } finally {
      t();
    }
  }
  var r = void 0;
  function o(i2) {
    var t2 = r;
    r = void 0;
    try {
      return i2();
    } finally {
      r = t2;
    }
  }
  var f, h = void 0, s = 0, v = 0, u = 0, e = 0, c = void 0, d = 0;
  function a(i2) {
    if (void 0 !== r) {
      var t2 = i2.n;
      if (void 0 === t2 || t2.t !== r) {
        t2 = { i: 0, S: i2, p: r.s, n: void 0, t: r, e: void 0, x: void 0, r: t2 };
        if (void 0 !== r.s) r.s.n = t2;
        r.s = t2;
        i2.n = t2;
        if (32 & r.f) i2.S(t2);
        return t2;
      } else if (-1 === t2.i) {
        t2.i = 0;
        if (void 0 !== t2.n) {
          t2.n.p = t2.p;
          if (void 0 !== t2.p) t2.p.n = t2.n;
          t2.p = r.s;
          t2.n = void 0;
          r.s.n = t2;
          r.s = t2;
        }
        return t2;
      }
    }
  }
  function l(i2, t2) {
    this.v = i2;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.l = 0;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  l.prototype.brand = i;
  l.prototype.h = function() {
    return true;
  };
  l.prototype.S = function(i2) {
    var t2 = this, n2 = this.t;
    if (n2 !== i2 && void 0 === i2.e) {
      i2.x = n2;
      this.t = i2;
      if (void 0 !== n2) n2.e = i2;
      else o(function() {
        var i3;
        null == (i3 = t2.W) || i3.call(t2);
      });
    }
  };
  l.prototype.U = function(i2) {
    var t2 = this;
    if (void 0 !== this.t) {
      var n2 = i2.e, r2 = i2.x;
      if (void 0 !== n2) {
        n2.x = r2;
        i2.e = void 0;
      }
      if (void 0 !== r2) {
        r2.e = n2;
        i2.x = void 0;
      }
      if (i2 === this.t) {
        this.t = r2;
        if (void 0 === r2) o(function() {
          var i3;
          null == (i3 = t2.Z) || i3.call(t2);
        });
      }
    }
  };
  l.prototype.subscribe = function(i2) {
    var t2 = this;
    return j(function() {
      var n2 = t2.value, o2 = r;
      r = void 0;
      try {
        i2(n2);
      } finally {
        r = o2;
      }
    }, { name: "sub" });
  };
  l.prototype.valueOf = function() {
    return this.value;
  };
  l.prototype.toString = function() {
    return this.value + "";
  };
  l.prototype.toJSON = function() {
    return this.value;
  };
  l.prototype.peek = function() {
    var i2 = r;
    r = void 0;
    try {
      return this.value;
    } finally {
      r = i2;
    }
  };
  Object.defineProperty(l.prototype, "value", { get: function() {
    var i2 = a(this);
    if (void 0 !== i2) i2.i = this.i;
    return this.v;
  }, set: function(i2) {
    if (i2 !== this.v) {
      if (v > 100) throw new Error("Cycle detected");
      !(function(i3) {
        if (0 !== s && 0 === v) {
          if (i3.l !== e) {
            i3.l = e;
            c = { S: i3, v: i3.v, i: i3.i, o: c };
          }
        }
      })(this);
      this.v = i2;
      this.i++;
      d++;
      s++;
      try {
        for (var n2 = this.t; void 0 !== n2; n2 = n2.x) n2.t.N();
      } finally {
        t();
      }
    }
  } });
  function y(i2, t2) {
    return new l(i2, t2);
  }
  function w(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
    return false;
  }
  function _(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) {
      var n2 = t2.S.n;
      if (void 0 !== n2) t2.r = n2;
      t2.S.n = t2;
      t2.i = -1;
      if (void 0 === t2.n) {
        i2.s = t2;
        break;
      }
    }
  }
  function b(i2) {
    var t2 = i2.s, n2 = void 0;
    while (void 0 !== t2) {
      var r2 = t2.p;
      if (-1 === t2.i) {
        t2.S.U(t2);
        if (void 0 !== r2) r2.n = t2.n;
        if (void 0 !== t2.n) t2.n.p = r2;
      } else n2 = t2;
      t2.S.n = t2.r;
      if (void 0 !== t2.r) t2.r = void 0;
      t2 = r2;
    }
    i2.s = n2;
  }
  function p(i2, t2) {
    l.call(this, void 0);
    this.x = i2;
    this.s = void 0;
    this.g = d - 1;
    this.f = 4;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  p.prototype = new l();
  p.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === d) return true;
    this.g = d;
    this.f |= 1;
    if (this.i > 0 && !w(this)) {
      this.f &= -2;
      return true;
    }
    var i2 = r;
    try {
      _(this);
      r = this;
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
    r = i2;
    b(this);
    this.f &= -2;
    return true;
  };
  p.prototype.S = function(i2) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
    }
    l.prototype.S.call(this, i2);
  };
  p.prototype.U = function(i2) {
    if (void 0 !== this.t) {
      l.prototype.U.call(this, i2);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
      }
    }
  };
  p.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
    }
  };
  Object.defineProperty(p.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i2 = a(this);
    this.h();
    if (void 0 !== i2) i2.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function g(i2, t2) {
    return new p(i2, t2);
  }
  function S(i2) {
    var n2 = i2.m;
    i2.m = void 0;
    if ("function" == typeof n2) {
      s++;
      var o2 = r;
      r = void 0;
      try {
        n2();
      } catch (t2) {
        i2.f &= -2;
        i2.f |= 8;
        m(i2);
        throw t2;
      } finally {
        r = o2;
        t();
      }
    }
  }
  function m(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    i2.x = void 0;
    i2.s = void 0;
    S(i2);
  }
  function x(i2) {
    if (r !== this) throw new Error("Out-of-order effect");
    b(this);
    r = i2;
    this.f &= -2;
    if (8 & this.f) m(this);
    t();
  }
  function E(i2, t2) {
    this.x = i2;
    this.m = void 0;
    this.s = void 0;
    this.u = void 0;
    this.f = 32;
    this.name = null == t2 ? void 0 : t2.name;
    if (f) f.push(this);
  }
  E.prototype.c = function() {
    var i2 = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t2 = this.x();
      if ("function" == typeof t2) this.m = t2;
    } finally {
      i2();
    }
  };
  E.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    S(this);
    _(this);
    s++;
    var i2 = r;
    r = this;
    return x.bind(this, i2);
  };
  E.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.u = h;
      h = this;
    }
  };
  E.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) m(this);
  };
  E.prototype.dispose = function() {
    this.d();
  };
  function j(i2, t2) {
    var n2 = new E(i2, t2);
    try {
      n2.c();
    } catch (i3) {
      n2.d();
      throw i3;
    }
    var r2 = n2.d.bind(n2);
    r2[Symbol.dispose] = r2;
    return r2;
  }
  function C(i2) {
    return function() {
      var t2 = arguments, r2 = this;
      return n(function() {
        return o(function() {
          return i2.apply(r2, [].slice.call(t2));
        });
      });
    };
  }
  function O() {
    var i2 = f;
    f = [];
    return function() {
      var t2 = f;
      if (f && i2) i2 = i2.concat(f);
      f = i2;
      return t2;
    };
  }
  var k = function(i2) {
    for (var t2 in i2) {
      var n2 = i2[t2];
      if ("function" == typeof n2) i2[t2] = C(n2);
      else if ("object" == typeof n2 && null !== n2 && !("brand" in n2)) k(n2);
    }
  };
  function T(i2) {
    return function() {
      var t2, n2, r2 = O();
      try {
        n2 = i2.apply(void 0, [].slice.call(arguments));
      } catch (i3) {
        f = void 0;
        throw i3;
      } finally {
        t2 = r2();
      }
      k(n2);
      n2[Symbol.dispose] = C(function() {
        if (t2) for (var i3 = 0; i3 < t2.length; i3++) t2[i3].dispose();
        t2 = void 0;
      });
      return n2;
    };
  }
  const keySignals = /* @__PURE__ */ new Map();
  let globalEventListenersAttached = false;
  function getKeySignal(key) {
    if (!keySignals.has(key)) {
      const newSignal = y(false);
      keySignals.set(key, newSignal);
      return newSignal;
    }
    return keySignals.get(key);
  }
  const handleKeyDown = (e2) => {
    const keySignal = keySignals.get(e2.key);
    if (keySignal && !keySignal.value) {
      keySignal.value = true;
    }
  };
  const handleKeyUp = (e2) => {
    const keySignal = keySignals.get(e2.key);
    if (keySignal && keySignal.value) {
      keySignal.value = false;
    }
  };
  const handleBlur = () => {
    keySignals.forEach((keySignal) => {
      if (keySignal.value) {
        keySignal.value = false;
      }
    });
  };
  function attachGlobalEventListeners() {
    if (!globalEventListenersAttached) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("blur", handleBlur);
      globalEventListenersAttached = true;
    }
  }
  function useGlobalKey(key) {
    const keySignal = getKeySignal(key);
    const [keyState, setKeyState] = d$2(keySignal.value);
    y$1(() => {
      attachGlobalEventListeners();
      const unsubscribe = keySignal.subscribe((value) => {
        setKeyState(value);
      });
      setKeyState(keySignal.value);
      return () => {
        unsubscribe();
      };
    }, [key, keySignal]);
    return keyState ?? false;
  }
  const StyledButton$3 = w$1("button")`
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
    style = {},
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
      ...style
    };
    return /* @__PURE__ */ u$3(
      StyledButton$3,
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
  const Label = w$1("label")`
  display: flex;
  align-items: center;
  cursor: var(--cursor);
  color: var(--text-color);
  opacity: var(--opacity);
`;
  const CheckboxInput = w$1("input")`
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
    style = {}
  }) {
    const { theme } = useTheme();
    const checkboxStyle = {
      "--cursor": disabled ? "not-allowed" : "pointer",
      "--text-color": theme.textColor,
      "--opacity": disabled ? "0.6" : "1",
      ...style
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
  const StyledInput = w$1("input")`
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
    style = {}
  }) {
    const { theme } = useTheme();
    const inputStyle = {
      "--input-border": theme.inputBorder,
      "--input-bg": theme.inputBackground,
      "--input-text": theme.textColor,
      ...style
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
  function Select({ value, options, onChange, placeholder, className, style }) {
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
      ...style
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
  function LanguageSelector({ className, style }) {
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
        style: { display: "flex", alignItems: "center", gap: "8px", ...style },
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
    style
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
        style: { display: "flex", alignItems: "center", gap: "8px", ...style },
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
  const Overlay = w$1("div")`
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
  const ModalContainer = w$1("div")`
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
    style = {}
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
      ...style
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
  const Card = w$1("div")`
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
  const CardHeader = w$1("div")`
  padding: 16px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card-header-bg);
  border-radius: 12px 12px 0 0;
`;
  const CardTitle = w$1("h3")`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
`;
  const CardContent = w$1("div")`
  padding: 20px;
`;
  function SettingsCard({ title, children, className = "", style = {} }) {
    const { theme, isDark } = useTheme();
    const cardStyle = {
      "--card-bg": theme.panelBackground,
      "--card-border": theme.borderColor,
      "--card-header-bg": isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
      "--card-title-color": theme.textColor,
      ...style
    };
    return /* @__PURE__ */ u$3(Card, { className, style: cardStyle, children: [
      title && /* @__PURE__ */ u$3(CardHeader, { children: /* @__PURE__ */ u$3(CardTitle, { children: title }) }),
      /* @__PURE__ */ u$3(CardContent, { children })
    ] });
  }
  const StyledButton$2 = w$1("button")`
  position: fixed;
  left: var(--left-position);
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.$bgColor};
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
  const SettingsIcon = w$1("svg")`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;
  function SettingsButton({
    onClick,
    isVisible,
    backgroundColor = "#1da1f2"
  }) {
    const buttonStyle = {
      "--left-position": isVisible ? "10px" : "-40px"
    };
    return /* @__PURE__ */ u$3(StyledButton$2, { style: buttonStyle, onClick, $bgColor: backgroundColor, children: /* @__PURE__ */ u$3(SettingsIcon, { viewBox: "0 0 24 24", children: /* @__PURE__ */ u$3("path", { d: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" }) }) });
  }
  function ButtonPositionSettings({ values, onChange }) {
    const { theme } = useTheme();
    const { t: t2 } = useI18n();
    const labelStyle = {
      display: "block",
      marginBottom: "8px",
      fontWeight: 500,
      fontSize: "14px",
      color: theme.textColor
    };
    return /* @__PURE__ */ u$3(SettingsCard, { title: t2("settings.position.title"), children: /* @__PURE__ */ u$3("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
      /* @__PURE__ */ u$3("div", { style: { display: "flex", gap: "24px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ u$3("div", { style: { flex: "1", minWidth: "120px" }, children: [
          /* @__PURE__ */ u$3("label", { style: labelStyle, children: t2("settings.position.vertical") }),
          /* @__PURE__ */ u$3("div", { style: { display: "flex", gap: "8px" }, children: [
            /* @__PURE__ */ u$3(
              Button,
              {
                variant: values.buttonPositionVertical === "top" ? "primary" : "secondary",
                size: "small",
                onClick: () => onChange("buttonPositionVertical", "top"),
                children: t2("settings.position.top")
              }
            ),
            /* @__PURE__ */ u$3(
              Button,
              {
                variant: values.buttonPositionVertical === "bottom" ? "primary" : "secondary",
                size: "small",
                onClick: () => onChange("buttonPositionVertical", "bottom"),
                children: t2("settings.position.bottom")
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ u$3("div", { style: { flex: "1", minWidth: "120px" }, children: [
          /* @__PURE__ */ u$3("label", { style: labelStyle, children: t2("settings.position.verticalValue") }),
          /* @__PURE__ */ u$3(
            Input,
            {
              value: values.buttonPositionVerticalValue,
              onChange: (value) => onChange("buttonPositionVerticalValue", value),
              placeholder: "8"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u$3("div", { style: { display: "flex", gap: "24px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ u$3("div", { style: { flex: "1", minWidth: "120px" }, children: [
          /* @__PURE__ */ u$3("label", { style: labelStyle, children: t2("settings.position.horizontal") }),
          /* @__PURE__ */ u$3("div", { style: { display: "flex", gap: "8px" }, children: [
            /* @__PURE__ */ u$3(
              Button,
              {
                variant: values.buttonPositionHorizontal === "left" ? "primary" : "secondary",
                size: "small",
                onClick: () => onChange("buttonPositionHorizontal", "left"),
                children: t2("settings.position.left")
              }
            ),
            /* @__PURE__ */ u$3(
              Button,
              {
                variant: values.buttonPositionHorizontal === "right" ? "primary" : "secondary",
                size: "small",
                onClick: () => onChange("buttonPositionHorizontal", "right"),
                children: t2("settings.position.right")
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ u$3("div", { style: { flex: "1", minWidth: "120px" }, children: [
          /* @__PURE__ */ u$3("label", { style: labelStyle, children: t2("settings.position.horizontalValue") }),
          /* @__PURE__ */ u$3(
            Input,
            {
              value: values.buttonPositionHorizontalValue,
              onChange: (value) => onChange("buttonPositionHorizontalValue", value),
              placeholder: "8"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u$3("div", { style: { fontSize: "12px", color: theme.secondaryTextColor }, children: t2("settings.position.valueHelp") })
    ] }) });
  }
  function createSettingsHook(storageKey, defaultSettings) {
    const storageManager = new StorageManager(storageKey, defaultSettings);
    const settingsSignal = y(storageManager.loadSettings());
    const computedSettings = g(() => settingsSignal.value);
    const updateSettings = (newSettings) => {
      const updated = storageManager.saveSettings(newSettings);
      settingsSignal.value = updated;
      window.dispatchEvent(new CustomEvent(SETTINGS_CHANGE_EVENT));
    };
    const resetSettings = () => {
      const reset = storageManager.resetSettings();
      settingsSignal.value = reset;
      window.dispatchEvent(new CustomEvent(SETTINGS_CHANGE_EVENT));
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
  const settingsHook = createSettingsHook(STORAGE_KEY$1, DEFAULT_SETTINGS);
  function usePixivDownloaderSettings() {
    const [settings, setSettings] = d$2(settingsHook.signal.value);
    y$1(() => {
      const unsubscribe = settingsHook.signal.subscribe((value) => {
        setSettings(value);
      });
      return () => unsubscribe();
    }, []);
    return {
      settings,
      setSetting: settingsHook.setSetting,
      updateSettings: settingsHook.updateSettings,
      resetSettings: settingsHook.resetSettings,
      getSetting: settingsHook.getSetting
    };
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
    },
    settings: {
      position: {
        title: "按钮位置设置",
        vertical: "垂直方向",
        horizontal: "水平方向",
        top: "上",
        bottom: "下",
        left: "左",
        right: "右",
        verticalValue: "垂直距离",
        horizontalValue: "水平距离",
        valueHelp: "纯数字默认 px，也可输入带单位的值如 1rem、10%"
      }
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
    },
    settings: {
      position: {
        title: "Button Position",
        vertical: "Vertical",
        horizontal: "Horizontal",
        top: "Top",
        bottom: "Bottom",
        left: "Left",
        right: "Right",
        verticalValue: "Vertical Offset",
        horizontalValue: "Horizontal Offset",
        valueHelp: "Pure numbers default to px, also supports values like 1rem, 10%"
      }
    }
  };
  const zhTranslations = {
    title: "Pixiv Downloader 设置",
    settings: {
      image: {
        title: "图片下载设置",
        fileName: "图片文件名格式",
        fileNamePlaceholder: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
        fileNameHelp: "可用变量：<%ArtworkId>、<%PageIndex>、<%AuthorId>、<%AuthorName>、<%ArtworkTitle>、<%Time>",
        showHoverButton: "显示悬停下载按钮",
        showHoverButtonHelp: "鼠标悬停在图片上时显示下载按钮"
      },
      reset: "重置为默认设置"
    },
    ui: {
      downloadImage: "下载图片",
      downloadAll: "下载全部",
      downloading: "下载中",
      downloadAllTitle: "下载作品的所有图片",
      downloadComplete: "下载完成 ({count} 张)",
      downloadFailed: "下载失败 ({count} 张)，点击定位"
    }
  };
  const enTranslations = {
    title: "Pixiv Downloader Settings",
    settings: {
      image: {
        title: "Image Download Settings",
        fileName: "Image filename format",
        fileNamePlaceholder: "<%ArtworkId>_p<%PageIndex>_<%AuthorId>",
        fileNameHelp: "Available variables: <%ArtworkId>, <%PageIndex>, <%AuthorId>, <%AuthorName>, <%ArtworkTitle>, <%Time>",
        showHoverButton: "Show hover download button",
        showHoverButtonHelp: "Show download button when hovering over images"
      },
      reset: "Reset to default settings"
    },
    ui: {
      downloadImage: "Download Image",
      downloadAll: "Download All",
      downloading: "Downloading",
      downloadAllTitle: "Download all images of this artwork",
      downloadComplete: "Download complete ({count} images)",
      downloadFailed: "Download failed ({count} images), click to locate"
    }
  };
  i18n.addTranslations("zh", zhTranslations$1);
  i18n.addTranslations("zh", zhTranslations);
  i18n.addTranslations("en", enTranslations$1);
  i18n.addTranslations("en", enTranslations);
  function SettingsPanel({ isOpen, onClose }) {
    const { settings, setSetting, resetSettings } = usePixivDownloaderSettings();
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
        /* @__PURE__ */ u$3("div", { children: [
          /* @__PURE__ */ u$3(
            Checkbox,
            {
              checked: settings.showHoverButton,
              onChange: (checked) => setSetting("showHoverButton", checked),
              children: t2("settings.image.showHoverButton")
            }
          ),
          /* @__PURE__ */ u$3("div", { style: helpTextStyle, children: t2("settings.image.showHoverButtonHelp") })
        ] })
      ] }),
      /* @__PURE__ */ u$3(
        ButtonPositionSettings,
        {
          values: {
            buttonPositionVertical: settings.buttonPositionVertical,
            buttonPositionHorizontal: settings.buttonPositionHorizontal,
            buttonPositionVerticalValue: settings.buttonPositionVerticalValue,
            buttonPositionHorizontalValue: settings.buttonPositionHorizontalValue
          },
          onChange: (key, value) => {
            setSetting(key, value);
          }
        }
      )
    ] }, resetKey) });
  }
  async function extractArtworkInfo() {
    try {
      const artworkId = window.location.pathname.match(/\/artworks\/(\d+)/)?.[1];
      if (!artworkId) {
        console.warn("[Pixiv Downloader] 无法从 URL 提取作品ID");
        return null;
      }
      const response = await fetch(`https://www.pixiv.net/ajax/illust/${artworkId}`);
      const json = await response.json();
      if (json.error) {
        throw new Error("Failed to fetch artwork info");
      }
      const body = json.body;
      return {
        artworkId: body.illustId,
        authorId: body.userId,
        authorName: body.userName,
        artworkTitle: body.illustTitle,
        pageCount: body.pageCount || 1,
        currentPage: 1
      };
    } catch (error2) {
      console.error("[Pixiv Downloader] 提取作品信息失败:", error2);
      return null;
    }
  }
  async function fetchOriginalUrls(artworkId) {
    const response = await fetch(`https://www.pixiv.net/ajax/illust/${artworkId}/pages`);
    const json = await response.json();
    if (json.error) {
      throw new Error("Failed to fetch artwork pages");
    }
    return json.body.map((page) => page.urls.original);
  }
  async function getImageUrlInfo(img, artworkId) {
    try {
      const anchor = img.closest('a[href*="i.pximg.net/img-original"]');
      if (anchor?.href) {
        const originalUrl = anchor.href;
        const extension = originalUrl.split(".").pop() || "png";
        const pageIndexMatch2 = originalUrl.match(/_p(\d+)\./);
        const pageIndex2 = pageIndexMatch2 ? parseInt(pageIndexMatch2[1] || "0", 10) : 0;
        return {
          originalUrl,
          previewUrl: img.src,
          extension,
          pageIndex: pageIndex2
        };
      }
      const originalUrls = await fetchOriginalUrls(artworkId);
      const pageIndexMatch = img.src.match(/_p(\d+)_/);
      const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1] || "0", 10) : 0;
      if (originalUrls[pageIndex]) {
        const originalUrl = originalUrls[pageIndex];
        const extension = originalUrl.split(".").pop() || "png";
        return {
          originalUrl,
          previewUrl: img.src,
          extension,
          pageIndex
        };
      }
      return null;
    } catch (error2) {
      console.error("[Pixiv Downloader] 获取图片URL信息失败:", error2);
      return null;
    }
  }
  async function getAllImageUrls(artworkInfo) {
    try {
      const originalUrls = await fetchOriginalUrls(artworkInfo.artworkId);
      return originalUrls.map((url, index) => ({
        originalUrl: url,
        previewUrl: url.replace("img-original", "img-master").replace(/\.(png|jpg|gif)$/, "_master1200.jpg"),
        extension: url.split(".").pop() || "png",
        pageIndex: index
      }));
    } catch (error2) {
      console.error("[Pixiv Downloader] 获取所有图片URL失败:", error2);
      return [];
    }
  }
  function generatePixivFileName(template, artworkInfo, pageIndex) {
    const variables = {
      ArtworkId: artworkInfo.artworkId,
      PageIndex: String(pageIndex),
      AuthorId: artworkInfo.authorId,
      AuthorName: artworkInfo.authorName,
      ArtworkTitle: artworkInfo.artworkTitle,
      Time: String(Date.now())
    };
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`<%${key}>`, "g"), value || "");
    }
    result = result.replace(/[<>:"/\\|?*]/g, "_");
    return result;
  }
  async function downloadSingleImage(imageInfo, artworkInfo, settings) {
    try {
      const filename = generatePixivFileName(settings.fileName, artworkInfo, imageInfo.pageIndex);
      await gmDownloadFile(imageInfo.originalUrl, `${filename}.${imageInfo.extension}`, {
        headers: { Referer: "https://www.pixiv.net/" }
      });
      /* @__PURE__ */ console.log("[Pixiv Downloader] 下载成功:", filename);
    } catch (error2) {
      console.error("[Pixiv Downloader] 下载失败:", error2);
      throw error2;
    }
  }
  async function downloadAllImages(imageUrls, artworkInfo, settings, onProgress) {
    const total = imageUrls.length;
    const result = { success: 0, failed: [] };
    downloadGuard.add();
    try {
      for (let i2 = 0; i2 < total; i2++) {
        const imageInfo = imageUrls[i2];
        if (!imageInfo) continue;
        if (onProgress) {
          onProgress(i2 + 1, total);
        }
        try {
          await downloadSingleImage(imageInfo, artworkInfo, settings);
          result.success++;
        } catch (error2) {
          result.failed.push({ pageIndex: imageInfo.pageIndex, error: error2 });
        }
        if (i2 < total - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    } finally {
      downloadGuard.remove();
    }
    /* @__PURE__ */ console.log(
      `[Pixiv Downloader] 下载完成: 成功 ${result.success} 张, 失败 ${result.failed.length} 张`
    );
    return result;
  }
  const spin = h$1`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
  const StyledDownloadIcon = w$1("svg")`
  width: 20px;
  height: 20px;
  fill: white;
`;
  const StyledLoadingIcon = w$1("svg")`
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
  fill: none;
  stroke: white;
  stroke-width: 2;
`;
  const DownloadIcon = () => /* @__PURE__ */ u$3(StyledDownloadIcon, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ u$3("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" }) });
  const LoadingIcon = () => /* @__PURE__ */ u$3(StyledLoadingIcon, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ u$3("circle", { cx: "12", cy: "12", r: "10", "stroke-opacity": "0.25" }),
    /* @__PURE__ */ u$3("path", { d: "M12 2 A10 10 0 0 1 22 12", "stroke-linecap": "round" })
  ] });
  const StyledButton$1 = w$1("button")`
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
`;
  function DownloadAllButton({
    artworkInfo,
    isVisible,
    onDownloadingChange
  }) {
    const [isDownloading, setIsDownloading] = d$2(false);
    const [progress, setProgress] = d$2({ current: 0, total: 0 });
    const { settings } = usePixivDownloaderSettings();
    const { t: t2 } = useI18n();
    const handleDownload = async (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
      if (isDownloading) return;
      setIsDownloading(true);
      onDownloadingChange?.(true);
      setProgress({ current: 0, total: 0 });
      try {
        const imageUrls = await getAllImageUrls(artworkInfo);
        if (imageUrls.length === 0) return;
        const result = await downloadAllImages(imageUrls, artworkInfo, settings, (current, total) => {
          setProgress({ current, total });
        });
        if (result.failed.length > 0) {
          const firstFailed = result.failed[0];
          message.error(
            t2("ui.downloadFailed", { count: result.failed.length }),
            void 0,
            void 0,
            () => {
              const img = document.querySelector(
                `img[src*="i.pximg.net/img-master"][src*="_p${firstFailed?.pageIndex}"]`
              );
              img?.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          );
        } else {
          message.success(t2("ui.downloadComplete", { count: imageUrls.length }));
        }
      } finally {
        setIsDownloading(false);
        onDownloadingChange?.(false);
        setProgress({ current: 0, total: 0 });
      }
    };
    const buttonText = isDownloading ? `${t2("ui.downloading")} ${progress.current}/${progress.total}` : `${t2("ui.downloadAll")} (${artworkInfo.pageCount})`;
    const buttonStyle = {
      "--left-position": isVisible ? "10px" : "-200px"
    };
    return /* @__PURE__ */ u$3(
      StyledButton$1,
      {
        style: buttonStyle,
        onClick: handleDownload,
        disabled: isDownloading,
        title: t2("ui.downloadAllTitle"),
        children: [
          /* @__PURE__ */ u$3(DownloadIcon, {}),
          /* @__PURE__ */ u$3("span", { children: buttonText })
        ]
      }
    );
  }
  function App() {
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = d$2(false);
    const [isMouseNearLeft, setIsMouseNearLeft] = d$2(false);
    const [isDownloading, setIsDownloading] = d$2(false);
    const [artworkInfo, setArtworkInfo] = d$2(null);
    const rafIdRef = A(null);
    y$1(() => {
      const handleMouseMove = (e2) => {
        if (rafIdRef.current !== null) return;
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          const isNear = e2.clientX < 100 && e2.clientY > window.innerHeight * (2 / 3);
          setIsMouseNearLeft(isNear);
        });
      };
      const handleOpenSettings = () => setIsSettingsPanelOpen(true);
      document.addEventListener("mousemove", handleMouseMove);
      window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
    }, []);
    y$1(() => {
      extractArtworkInfo().then(setArtworkInfo);
    }, []);
    const isVisible = isMouseNearLeft || isSettingsPanelOpen || isDownloading;
    return /* @__PURE__ */ u$3(S$1, { children: [
      artworkInfo && /* @__PURE__ */ u$3(
        DownloadAllButton,
        {
          artworkInfo,
          isVisible,
          onDownloadingChange: setIsDownloading
        }
      ),
      /* @__PURE__ */ u$3(
        SettingsButton,
        {
          onClick: () => setIsSettingsPanelOpen(true),
          isVisible,
          backgroundColor: "#0096fa"
        }
      ),
      /* @__PURE__ */ u$3(SettingsPanel, { isOpen: isSettingsPanelOpen, onClose: () => setIsSettingsPanelOpen(false) })
    ] });
  }
  const StyledButton = w$1("button")`
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
`;
  function HoverDownloadButton({ targetImage }) {
    const { settings } = usePixivDownloaderSettings();
    const [isDownloading, setIsDownloading] = d$2(false);
    if (!settings.showHoverButton) return null;
    const handleDownload = async (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
      if (isDownloading) return;
      setIsDownloading(true);
      try {
        const artworkInfo = await extractArtworkInfo();
        if (!artworkInfo) {
          console.error("[Pixiv Downloader] 无法提取作品信息");
          return;
        }
        const imageInfo = await getImageUrlInfo(targetImage, artworkInfo.artworkId);
        if (!imageInfo) {
          console.error("[Pixiv Downloader] 无法获取图片URL信息");
          return;
        }
        await downloadSingleImage(imageInfo, artworkInfo, settings);
      } catch (error2) {
        console.error("[Pixiv Downloader] 下载失败:", error2);
      } finally {
        setIsDownloading(false);
      }
    };
    const positionStyle = {};
    if (settings.buttonPositionVertical === "top") {
      positionStyle.top = formatPositionValue(settings.buttonPositionVerticalValue);
    } else {
      positionStyle.bottom = formatPositionValue(settings.buttonPositionVerticalValue);
    }
    if (settings.buttonPositionHorizontal === "left") {
      positionStyle.left = formatPositionValue(settings.buttonPositionHorizontalValue);
    } else {
      positionStyle.right = formatPositionValue(settings.buttonPositionHorizontalValue);
    }
    return /* @__PURE__ */ u$3(
      StyledButton,
      {
        onClick: handleDownload,
        disabled: isDownloading,
        title: "下载图片",
        style: positionStyle,
        children: isDownloading ? /* @__PURE__ */ u$3(LoadingIcon, {}) : /* @__PURE__ */ u$3(DownloadIcon, {})
      }
    );
  }
  function findImageContainer(img) {
    const anchor = img.closest('a[href*="i.pximg.net/img-original"]');
    if (anchor?.parentElement) {
      return anchor.parentElement;
    }
    let current = img.parentElement;
    let depth = 0;
    while (current && depth < 5) {
      if (current.tagName === "DIV" && current.style.position !== "static") {
        return current;
      }
      current = current.parentElement;
      depth++;
    }
    return img.parentElement;
  }
  function ensureRelativePosition(element) {
    const position = window.getComputedStyle(element).position;
    if (position === "static") {
      element.style.position = "relative";
    }
  }
  GM_registerMenuCommand("⚙️ Settings / 设置", () => {
    window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
  });
  const IMAGE_SELECTOR = 'img[src*="i.pximg.net/img-master"]';
  const processedImages = /* @__PURE__ */ new WeakSet();
  const getSettings = () => JSON.parse(localStorage.getItem(STORAGE_KEY$1) || "{}");
  const mountHoverButton = (hostElement, targetImage) => {
    const container = document.createElement("div");
    container.style.display = "none";
    hostElement.appendChild(container);
    R(/* @__PURE__ */ u$3(HoverDownloadButton, { targetImage }), container);
    let isInside = false;
    let rafId = null;
    document.addEventListener("mousemove", (e2) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = hostElement.getBoundingClientRect();
        const inside = e2.clientX >= rect.left && e2.clientX <= rect.right && e2.clientY >= rect.top && e2.clientY <= rect.bottom;
        if (inside && !isInside) {
          const shouldShow = getSettings().showHoverButton !== false;
          container.style.display = shouldShow ? "block" : "none";
        } else if (!inside && isInside) {
          container.style.display = "none";
        }
        isInside = inside;
      });
    });
  };
  function setupImageInteraction(img) {
    if (processedImages.has(img)) return;
    const imageContainer = findImageContainer(img);
    if (!imageContainer) return;
    ensureRelativePosition(imageContainer);
    mountHoverButton(imageContainer, img);
    processedImages.add(img);
  }
  const scanNodeForMedia = (node) => {
    if (node instanceof HTMLImageElement && node.src.includes("i.pximg.net/img-master")) {
      setupImageInteraction(node);
    } else if (node instanceof Element || node instanceof Document || node instanceof DocumentFragment) {
      node.querySelectorAll(IMAGE_SELECTOR).forEach((img) => setupImageInteraction(img));
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
      characterData: false
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
    /* @__PURE__ */ console.log("[Pixiv Downloader] 初始化中...");
    const appContainer = document.createElement("div");
    appContainer.id = "pixiv-enhanced-app";
    document.body.appendChild(appContainer);
    R(/* @__PURE__ */ u$3(App, {}), appContainer);
    watchForMedia();
    /* @__PURE__ */ console.log("[Pixiv Downloader] 初始化完成");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }
})();
