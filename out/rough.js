var rough = function() {
  function d(b, a, e) {
    if (b && b.length) {
      a = _slicedToArray(a, 2);
      var c = a[0],
        f = a[1];
      e *= Math.PI / 180;
      var k = Math.cos(e),
        d = Math.sin(e);
      b.forEach(function(a) {
        var e = _slicedToArray(a, 2),
          b = e[0],
          e = e[1];
        a[0] = (b - c) * k - (e - f) * d + c;
        a[1] = (b - c) * d + (e - f) * k + f;
      });
    }
  }

  function h(b) {
    var a = b[0];
    b = b[1];
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }

  function l(b, a, e, c) {
    var f = a[1] - b[1];
    a = b[0] - a[0];
    b = f * b[0] + a * b[1];
    var k = c[1] - e[1];
    c = e[0] - c[0];
    e = k * e[0] + c * e[1];
    var d = f * c - k * a;
    return d ? [
      (c * b - a * e) / d,
      (f * e - k * b) / d
    ] : null;
  }

  function p(b, a, e) {
    var c = b.length;
    if (3 > c)
      return !1;
    var f = [
      Number.MAX_SAFE_INTEGER,
      e
    ];
    a = [
      a,
      e
    ];
    for (var k = e = 0; k < c; k++) {
      var d = b[k],
        g = b[(k + 1) % c];
      if (B(d, g, a, f)) {
        if (0 === z(d, a, g))
          return v(d, a, g);
        e++;
      }
    }
    return 1 == e % 2;
  }

  function v(b, a, e) {
    return a[0] <= Math.max(b[0], e[0]) && a[0] >= Math.min(b[0], e[0]) && a[1] <= Math.max(b[1], e[1]) && a[1] >= Math.min(b[1], e[1]);
  }

  function z(b, a, e) {
    b = (a[1] - b[1]) * (e[0] - a[0]) - (a[0] - b[0]) * (e[1] - a[1]);
    return 0 === b ? 0 : 0 < b ? 1 : 2;
  }

  function B(b, a, e, c) {
    var f = z(b, a, e),
      k = z(b, a, c),
      d = z(e, c, b),
      g = z(e, c, a);
    return f !== k && d !== g || !(0 !== f || !v(b, e, a)) || !(0 !== k || !v(b, c, a)) || !(0 !== d || !v(e, b, c)) || !(0 !== g || !v(e, a, c));
  }

  function C(b, a) {
    var e = [
        0,
        0
      ],
      c = Math.round(a.hachureAngle + 90);
    c && d(b, e, c);
    var f = function(a, e) {
      var c = _toConsumableArray(a);
      c[0].join(',') !== c[c.length - 1].join(',') && c.push([
        c[0][0],
        c[0][1]
      ]);
      var f = [];
      if (c && 2 < c.length) {
        var b = function() {
          var a = e.hachureGap;
          0 > a && (a = 4 * e.strokeWidth);
          for (var a = Math.max(a, 0.1), b = [], k = 0; k < c.length - 1; k++) {
            var g = c[k],
              d = c[k + 1];
            if (g[1] !== d[1]) {
              var n = Math.min(g[1], d[1]);
              b.push({
                ymin: n,
                ymax: Math.max(g[1], d[1]),
                x: n === g[1] ? g[0] : d[0],
                islope: (d[0] - g[0]) / (d[1] - g[1])
              });
            }
          }
          if (b.sort(function(a, c) {
              return a.ymin < c.ymin ? -1 : a.ymin > c.ymin ? 1 : a.x < c.x ? -1 : a.x > c.x ? 1 : a.ymax === c.ymax ? 0 : (a.ymax - c.ymax) / Math.abs(a.ymax - c.ymax);
            }), !b.length)
            return {
              v: f
            };
          for (var m = [], r = b[0].ymin; m.length || b.length;) {
            if (b.length) {
              k = -1;
              for (g = 0; g < b.length && !(b[g].ymin > r); g++)
                k = g;
              b.splice(0, k + 1).forEach(function(a) {
                m.push({
                  s: r,
                  edge: a
                });
              });
            }
            if (m = m.filter(function(a) {
                return !(a.edge.ymax <= r);
              }), m.sort(function(a, c) {
                return a.edge.x === c.edge.x ? 0 : (a.edge.x - c.edge.x) / Math.abs(a.edge.x - c.edge.x);
              }), 1 < m.length)
              for (k = 0; k < m.length; k += 2) {
                g = k + 1;
                if (g >= m.length)
                  break;
                f.push([
                  [
                    Math.round(m[k].edge.x),
                    r
                  ],
                  [
                    Math.round(m[g].edge.x),
                    r
                  ]
                ]);
              }
            r += a;
            m.forEach(function(c) {
              c.edge.x += a * c.edge.islope;
            });
          }
        }();
        if ('object' === _typeof(b))
          return b.v;
      }
      return f;
    }(b, a);
    return c && (d(b, e, -c), function(a, c, e) {
      var f = [];
      a.forEach(function(a) {
        return f.push.apply(f, _toConsumableArray(a));
      });
      d(f, c, e);
    }(f, e, -c)), f;
  }

  function H(b) {
    var a = [],
      e;
    a: {
      e = b;
      for (var c = [];
        '' !== e;) {
        if (!e.match(/^([ \t\r\n,]+)/))
          if (e.match(/^([aAcChHlLmMqQsStTvVzZ])/))
            c[c.length] = {
              type: 0,
              text: RegExp.$1
            };
          else {
            if (!e.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) {
              e = [];
              break a;
            }
            c[c.length] = {
              type: 1,
              text: ''.concat(parseFloat(RegExp.$1))
            };
          }
        e = e.substr(RegExp.$1.length);
      }
      e = (c[c.length] = {
        type: 2,
        text: ''
      }, c);
    }
    for (var c = 'BOD', f = 0, k = e[f]; 2 !== k.type;) {
      var d = 0,
        g = [];
      if ('BOD' === c) {
        if ('M' !== k.text && 'm' !== k.text)
          return H('M0,0' + b);
        f++;
        d = K[k.text];
        c = k.text;
      } else
        1 === k.type ? d = K[c] : (f++, d = K[k.text], c = k.text);
      if (!(f + d < e.length))
        throw Error('Path data ended short');
      for (k = f; k < f + d; k++) {
        var n = e[k];
        if (1 !== n.type)
          throw Error('Param not a number: ' + c + ',' + n.text);
        g[g.length] = +n.text;
      }
      if ('number' != typeof K[c])
        throw Error('Bad segment: ' + c);
      a.push({
        key: c,
        data: g
      });
      f += d;
      k = e[f];
      'M' === c && (c = 'L');
      'm' === c && (c = 'l');
    }
    return a;
  }

  function W(b) {
    var a, e, c, f, k, d, g = 0,
      n = 0,
      m = 0,
      x = 0,
      w = [];
    b = _createForOfIteratorHelper(b);
    var t;
    try {
      for (b.s(); !(t = b.n()).done;) {
        var h = t.value,
          q = h.data;
        switch (h.key) {
          case 'M':
            w.push({
              key: 'M',
              data: _toConsumableArray(q)
            });
            a = q;
            e = _slicedToArray(a, 2);
            g = e[0];
            n = e[1];
            a;
            c = q;
            f = _slicedToArray(c, 2);
            m = f[0];
            x = f[1];
            c;
            break;
          case 'm':
            g += q[0];
            n += q[1];
            w.push({
              key: 'M',
              data: [
                g,
                n
              ]
            });
            m = g;
            x = n;
            break;
          case 'L':
            w.push({
              key: 'L',
              data: _toConsumableArray(q)
            });
            k = q;
            d = _slicedToArray(k, 2);
            g = d[0];
            n = d[1];
            k;
            break;
          case 'l':
            g += q[0];
            n += q[1];
            w.push({
              key: 'L',
              data: [
                g,
                n
              ]
            });
            break;
          case 'C':
            w.push({
              key: 'C',
              data: _toConsumableArray(q)
            });
            g = q[4];
            n = q[5];
            break;
          case 'c':
            var l = q.map(function(a, c) {
              return c % 2 ? a + n : a + g;
            });
            w.push({
              key: 'C',
              data: l
            });
            g = l[4];
            n = l[5];
            break;
          case 'Q':
            w.push({
              key: 'Q',
              data: _toConsumableArray(q)
            });
            g = q[2];
            n = q[3];
            break;
          case 'q':
            var p = q.map(function(a, c) {
              return c % 2 ? a + n : a + g;
            });
            w.push({
              key: 'Q',
              data: p
            });
            g = p[2];
            n = p[3];
            break;
          case 'A':
            w.push({
              key: 'A',
              data: _toConsumableArray(q)
            });
            g = q[5];
            n = q[6];
            break;
          case 'a':
            g += q[5];
            n += q[6];
            w.push({
              key: 'A',
              data: [
                q[0],
                q[1],
                q[2],
                q[3],
                q[4],
                g,
                n
              ]
            });
            break;
          case 'H':
            w.push({
              key: 'H',
              data: _toConsumableArray(q)
            });
            g = q[0];
            break;
          case 'h':
            g += q[0];
            w.push({
              key: 'H',
              data: [g]
            });
            break;
          case 'V':
            w.push({
              key: 'V',
              data: _toConsumableArray(q)
            });
            n = q[0];
            break;
          case 'v':
            n += q[0];
            w.push({
              key: 'V',
              data: [n]
            });
            break;
          case 'S':
            w.push({
              key: 'S',
              data: _toConsumableArray(q)
            });
            g = q[2];
            n = q[3];
            break;
          case 's':
            var u = q.map(function(a, c) {
              return c % 2 ? a + n : a + g;
            });
            w.push({
              key: 'S',
              data: u
            });
            g = u[2];
            n = u[3];
            break;
          case 'T':
            w.push({
              key: 'T',
              data: _toConsumableArray(q)
            });
            g = q[0];
            n = q[1];
            break;
          case 't':
            g += q[0];
            n += q[1];
            w.push({
              key: 'T',
              data: [
                g,
                n
              ]
            });
            break;
          case 'Z':
          case 'z':
            w.push({
              key: 'Z',
              data: []
            }), g = m, n = x;
        }
      }
    } catch (y) {
      b.e(y);
    } finally {
      b.f();
    }
    return w;
  }

  function X(b) {
    var a, e, c, f, k, d, g = [],
      n = '',
      m = 0,
      x = 0,
      w = 0,
      t = 0,
      h = 0,
      q = 0;
    b = _createForOfIteratorHelper(b);
    var l;
    try {
      for (b.s(); !(l = b.n()).done;) {
        var p = l.value,
          u = p.key,
          y = p.data;
        switch (u) {
          case 'M':
            g.push({
              key: 'M',
              data: _toConsumableArray(y)
            });
            a = y;
            e = _slicedToArray(a, 2);
            m = e[0];
            x = e[1];
            a;
            c = y;
            f = _slicedToArray(c, 2);
            w = f[0];
            t = f[1];
            c;
            break;
          case 'C':
            g.push({
              key: 'C',
              data: _toConsumableArray(y)
            });
            m = y[4];
            x = y[5];
            h = y[2];
            q = y[3];
            break;
          case 'L':
            g.push({
              key: 'L',
              data: _toConsumableArray(y)
            });
            k = y;
            d = _slicedToArray(k, 2);
            m = d[0];
            x = d[1];
            k;
            break;
          case 'H':
            m = y[0];
            g.push({
              key: 'L',
              data: [
                m,
                x
              ]
            });
            break;
          case 'V':
            x = y[0];
            g.push({
              key: 'L',
              data: [
                m,
                x
              ]
            });
            break;
          case 'S':
            var F = 0,
              v = 0;
            'C' === n || 'S' === n ? (F = m + (m - h), v = x + (x - q)) : (F = m, v = x);
            g.push({
              key: 'C',
              data: [
                F,
                v
              ].concat(_toConsumableArray(y))
            });
            h = y[0];
            q = y[1];
            m = y[2];
            x = y[3];
            break;
          case 'T':
            var z = _slicedToArray(y, 2),
              A = z[0],
              B = z[1],
              v = F = 0;
            'Q' === n || 'T' === n ? (F = m + (m - h), v = x + (x - q)) : (F = m, v = x);
            g.push({
              key: 'C',
              data: [
                m + 2 * (F - m) / 3,
                x + 2 * (v - x) / 3,
                A + 2 * (F - A) / 3,
                B + 2 * (v - B) / 3,
                A,
                B
              ]
            });
            h = F;
            q = v;
            m = A;
            x = B;
            break;
          case 'Q':
            var C = _slicedToArray(y, 4),
              D = C[0],
              G = C[1],
              E = C[2],
              H = C[3];
            g.push({
              key: 'C',
              data: [
                m + 2 * (D - m) / 3,
                x + 2 * (G - x) / 3,
                E + 2 * (D - E) / 3,
                H + 2 * (G - H) / 3,
                E,
                H
              ]
            });
            h = D;
            q = G;
            m = E;
            x = H;
            break;
          case 'A':
            var I = Math.abs(y[0]),
              J = Math.abs(y[1]),
              K = y[2],
              N = y[3],
              O = y[4],
              L = y[5],
              M = y[6];
            if (0 === I || 0 === J)
              g.push({
                key: 'C',
                data: [
                  m,
                  x,
                  L,
                  M,
                  L,
                  M
                ]
              }), m = L, x = M;
            else if (m !== L || x !== M)
              Y(m, x, L, M, I, J, K, N, O).forEach(function(a) {
                g.push({
                  key: 'C',
                  data: a
                });
              }), m = L, x = M;
            break;
          case 'Z':
            g.push({
              key: 'Z',
              data: []
            }), m = w, x = t;
        }
        n = u;
      }
    } catch (ka) {
      b.e(ka);
    } finally {
      b.f();
    }
    return g;
  }

  function I(b, a, e) {
    return [
      b * Math.cos(e) - a * Math.sin(e),
      b * Math.sin(e) + a * Math.cos(e)
    ];
  }

  function Y(b, a, e, c, f, k, d, g, n, m) {
    var r = (w = d, Math.PI * w / 180),
      w;
    w = [];
    var t, h, q;
    if (m)
      q = _slicedToArray(m, 4), t = q[0], g = q[1], h = q[2], q = q[3];
    else {
      t = I(b, a, -r);
      a = _slicedToArray(t, 2);
      b = a[0];
      a = a[1];
      t;
      t = I(e, c, -r);
      c = _slicedToArray(t, 2);
      e = c[0];
      c = c[1];
      t;
      t = (b - e) / 2;
      h = (a - c) / 2;
      q = t * t / (f * f) + h * h / (k * k);
      1 < q && (q = Math.sqrt(q), f *= q, k *= q);
      q = f * f;
      var l = k * k;
      g = (g === n ? -1 : 1) * Math.sqrt(Math.abs((q * l - q * h * h - l * t * t) / (q * h * h + l * t * t)));
      h = g * f * h / k + (b + e) / 2;
      q = g * -k * t / f + (a + c) / 2;
      t = Math.asin(parseFloat(((a - q) / k).toFixed(9)));
      g = Math.asin(parseFloat(((c - q) / k).toFixed(9)));
      b < h && (t = Math.PI - t);
      e < h && (g = Math.PI - g);
      0 > t && (t = 2 * Math.PI + t);
      0 > g && (g = 2 * Math.PI + g);
      n && t > g && (t -= 2 * Math.PI);
      !n && g > t && (g -= 2 * Math.PI);
    }
    Math.abs(g - t) > 120 * Math.PI / 180 && (g = n && g > t ? t + 120 * Math.PI / 180 * 1 : t + 120 * Math.PI / 180 * -1, w = Y(e = h + f * Math.cos(g), c = q + k * Math.sin(g), e, c, f, k, d, 0, n, [
      g,
      g,
      h,
      q
    ]));
    d = Math.tan((g - t) / 4);
    f = 4 / 3 * f * d;
    d *= 4 / 3 * k;
    k = [
      b,
      a
    ];
    b = [
      b + f * Math.sin(t),
      a - d * Math.cos(t)
    ];
    a = [
      e + f * Math.sin(g),
      c - d * Math.cos(g)
    ];
    e = [
      e,
      c
    ];
    if (b[0] = 2 * k[0] - b[0], b[1] = 2 * k[1] - b[1], m)
      return [
        b,
        a,
        e
      ].concat(w);
    w = [
      b,
      a,
      e
    ].concat(w);
    m = [];
    for (e = 0; e < w.length; e += 3)
      c = I(w[e][0], w[e][1], r), b = I(w[e + 1][0], w[e + 1][1], r), a = I(w[e + 2][0], w[e + 2][1], r), m.push([
        c[0],
        c[1],
        b[0],
        b[1],
        a[0],
        a[1]
      ]);
    return m;
  }

  function N(b, a, e) {
    var c = (b || []).length;
    if (2 < c) {
      for (var f = [], k = 0; k < c - 1; k++)
        f.push.apply(f, _toConsumableArray(D(b[k][0], b[k][1], b[k + 1][0], b[k + 1][1], e)));
      return a && f.push.apply(f, _toConsumableArray(D(b[c - 1][0], b[c - 1][1], b[0][0], b[0][1], e))), {
        type: 'path',
        ops: f
      };
    }
    return 2 === c ? {
      type: 'path',
      ops: D(b[0][0], b[0][1], b[1][0], b[1][1], e)
    } : {
      type: 'path',
      ops: []
    };
  }

  function la(b, a) {
    var e = Z(b, 1 * (1 + 0.2 * a.roughness), a);
    if (!a.disableMultiStroke) {
      var c = 1.5 * (1 + 0.22 * a.roughness),
        f = Object.assign({}, a);
      f.randomizer = void 0;
      a.seed && (f.seed = a.seed + 1);
      c = Z(b, c, f);
      e = e.concat(c);
    }
    return {
      type: 'path',
      ops: e
    };
  }

  function aa(b, a, e) {
    var c = 2 * Math.PI / Math.max(e.curveStepCount, e.curveStepCount / Math.sqrt(200) * Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(b / 2, 2) + Math.pow(a / 2, 2)) / 2)));
    b = Math.abs(b / 2);
    a = Math.abs(a / 2);
    var f = 1 - e.curveFitting;
    return b += u(b * f, e), a += u(a * f, e), {
      increment: c,
      rx: b,
      ry: a
    };
  }

  function T(b, a, e, c) {
    var f = ba(c.increment, b, a, c.rx, c.ry, 1, c.increment * O(0.1, O(0.4, 1, e), e), e),
      k = _slicedToArray(f, 2),
      f = k[1],
      k = P(k[0], null, e);
    e.disableMultiStroke || (b = ba(c.increment, b, a, c.rx, c.ry, 1.5, 0, e), b = _slicedToArray(b, 1)[0], e = P(b, null, e), k = k.concat(e));
    return {
      estimatedPoints: f,
      opset: {
        type: 'path',
        ops: k
      }
    };
  }

  function ca(b, a, e, c, f, k, d, g, n) {
    e = Math.abs(e / 2);
    c = Math.abs(c / 2);
    e += u(0.01 * e, n);
    for (c += u(0.01 * c, n); 0 > f;)
      f += 2 * Math.PI, k += 2 * Math.PI;
    k - f > 2 * Math.PI && (f = 0, k = 2 * Math.PI);
    var m = Math.min(2 * Math.PI / n.curveStepCount / 2, (k - f) / 2),
      r = da(m, b, a, e, c, f, k, 1, n);
    n.disableMultiStroke || (m = da(m, b, a, e, c, f, k, 1.5, n), r.push.apply(r, _toConsumableArray(m)));
    return d && (g ? r.push.apply(r, _toConsumableArray(D(b, a, b + e * Math.cos(f), a + c * Math.sin(f), n)).concat(_toConsumableArray(D(b, a, b + e * Math.cos(k), a + c * Math.sin(k), n)))) : r.push({
      op: 'lineTo',
      data: [
        b,
        a
      ]
    }, {
      op: 'lineTo',
      data: [
        b + e * Math.cos(f),
        a + c * Math.sin(f)
      ]
    })), {
      type: 'path',
      ops: r
    };
  }

  function J(b, a) {
    var e = [];
    if (b.length) {
      var c = a.maxRandomnessOffset || 0,
        f = b.length;
      if (2 < f) {
        e.push({
          op: 'move',
          data: [
            b[0][0] + u(c, a),
            b[0][1] + u(c, a)
          ]
        });
        for (var k = 1; k < f; k++)
          e.push({
            op: 'lineTo',
            data: [
              b[k][0] + u(c, a),
              b[k][1] + u(c, a)
            ]
          });
      }
    }
    return {
      type: 'fillPath',
      ops: e
    };
  }

  function G(b, a) {
    var e = ma,
      c = a.fillStyle || 'hachure';
    if (!A[c])
      switch (c) {
        case 'zigzag':
          A[c] || (A[c] = new na(e));
          break;
        case 'cross-hatch':
          A[c] || (A[c] = new oa(e));
          break;
        case 'dots':
          A[c] || (A[c] = new pa(e));
          break;
        case 'dashed':
          A[c] || (A[c] = new qa(e));
          break;
        case 'zigzag-line':
          A[c] || (A[c] = new ra(e));
          break;
        default:
          c = 'hachure', A[c] || (A[c] = new U(e));
      }
    return A[c].fillPolygon(b, a);
  }

  function ea(b) {
    return b.randomizer || (b.randomizer = new sa(b.seed || 0)), b.randomizer.next();
  }

  function O(b, a, e) {
    return e.roughness * (3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 1) * (ea(e) * (a - b) + b);
  }

  function u(b, a) {
    return O(-b, b, a, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1);
  }

  function D(b, a, e, c, f) {
    var k = 5 < arguments.length && void 0 !== arguments[5] && arguments[5] ? f.disableMultiStrokeFill : f.disableMultiStroke,
      d = fa(b, a, e, c, f, !0, !1);
    if (k)
      return d;
    k = fa(b, a, e, c, f, !0, !0);
    return d.concat(k);
  }

  function fa(b, a, e, c, f, k, d) {
    var g = Math.pow(b - e, 2) + Math.pow(a - c, 2),
      n = Math.sqrt(g),
      m = 1,
      m = 200 > n ? 1 : 500 < n ? 0.4 : -0.0016668 * n + 1.233334,
      r = f.maxRandomnessOffset || 0;
    r * r * 100 > g && (r = n / 10);
    var h = r / 2,
      g = 0.2 + 0.2 * ea(f),
      n = f.bowing * f.maxRandomnessOffset * (c - a) / 200,
      t = f.bowing * f.maxRandomnessOffset * (b - e) / 200,
      n = u(n, f, m),
      t = u(t, f, m),
      l = [],
      q = function() {
        return u(h, f, m);
      },
      p = function() {
        return u(r, f, m);
      },
      v = f.preserveVertices;
    return k && (d ? l.push({
      op: 'move',
      data: [
        b + (v ? 0 : q()),
        a + (v ? 0 : q())
      ]
    }) : l.push({
      op: 'move',
      data: [
        b + (v ? 0 : u(r, f, m)),
        a + (v ? 0 : u(r, f, m))
      ]
    })), d ? l.push({
      op: 'bcurveTo',
      data: [
        n + b + (e - b) * g + q(),
        t + a + (c - a) * g + q(),
        n + b + 2 * (e - b) * g + q(),
        t + a + 2 * (c - a) * g + q(),
        e + (v ? 0 : q()),
        c + (v ? 0 : q())
      ]
    }) : l.push({
      op: 'bcurveTo',
      data: [
        n + b + (e - b) * g + p(),
        t + a + (c - a) * g + p(),
        n + b + 2 * (e - b) * g + p(),
        t + a + 2 * (c - a) * g + p(),
        e + (v ? 0 : p()),
        c + (v ? 0 : p())
      ]
    }), l;
  }

  function Z(b, a, e) {
    var c = [];
    c.push([
      b[0][0] + u(a, e),
      b[0][1] + u(a, e)
    ]);
    c.push([
      b[0][0] + u(a, e),
      b[0][1] + u(a, e)
    ]);
    for (var f = 1; f < b.length; f++)
      c.push([
        b[f][0] + u(a, e),
        b[f][1] + u(a, e)
      ]), f === b.length - 1 && c.push([
        b[f][0] + u(a, e),
        b[f][1] + u(a, e)
      ]);
    return P(c, null, e);
  }

  function P(b, a, e) {
    var c = b.length,
      f = [];
    if (3 < c) {
      var k = [],
        d = 1 - e.curveTightness;
      f.push({
        op: 'move',
        data: [
          b[1][0],
          b[1][1]
        ]
      });
      for (var g = 1; g + 2 < c; g++) {
        var n = b[g];
        k[0] = [
          n[0],
          n[1]
        ];
        k[1] = [
          n[0] + (d * b[g + 1][0] - d * b[g - 1][0]) / 6,
          n[1] + (d * b[g + 1][1] - d * b[g - 1][1]) / 6
        ];
        k[2] = [
          b[g + 1][0] + (d * b[g][0] - d * b[g + 2][0]) / 6,
          b[g + 1][1] + (d * b[g][1] - d * b[g + 2][1]) / 6
        ];
        k[3] = [
          b[g + 1][0],
          b[g + 1][1]
        ];
        f.push({
          op: 'bcurveTo',
          data: [
            k[1][0],
            k[1][1],
            k[2][0],
            k[2][1],
            k[3][0],
            k[3][1]
          ]
        });
      }
      a && 2 === a.length && (b = e.maxRandomnessOffset, f.push({
        op: 'lineTo',
        data: [
          a[0] + u(b, e),
          a[1] + u(b, e)
        ]
      }));
    } else
      3 === c ? (f.push({
        op: 'move',
        data: [
          b[1][0],
          b[1][1]
        ]
      }), f.push({
        op: 'bcurveTo',
        data: [
          b[1][0],
          b[1][1],
          b[2][0],
          b[2][1],
          b[2][0],
          b[2][1]
        ]
      })) : 2 === c && f.push.apply(f, _toConsumableArray(D(b[0][0], b[0][1], b[1][0], b[1][1], e)));
    return f;
  }

  function ba(b, a, e, c, f, k, d, g) {
    var n = [],
      m = [],
      r = u(0.5, g) - Math.PI / 2;
    m.push([
      u(k, g) + a + 0.9 * c * Math.cos(r - b),
      u(k, g) + e + 0.9 * f * Math.sin(r - b)
    ]);
    for (var h = r; h < 2 * Math.PI + r - 0.01; h += b) {
      var t = [
        u(k, g) + a + c * Math.cos(h),
        u(k, g) + e + f * Math.sin(h)
      ];
      n.push(t);
      m.push(t);
    }
    return m.push([
      u(k, g) + a + c * Math.cos(r + 2 * Math.PI + 0.5 * d),
      u(k, g) + e + f * Math.sin(r + 2 * Math.PI + 0.5 * d)
    ]), m.push([
      u(k, g) + a + 0.98 * c * Math.cos(r + d),
      u(k, g) + e + 0.98 * f * Math.sin(r + d)
    ]), m.push([
      u(k, g) + a + 0.9 * c * Math.cos(r + 0.5 * d),
      u(k, g) + e + 0.9 * f * Math.sin(r + 0.5 * d)
    ]), [
      m,
      n
    ];
  }

  function da(b, a, e, c, f, k, d, g, n) {
    var m = k + u(0.1, n);
    k = [];
    for (k.push([
        u(g, n) + a + 0.9 * c * Math.cos(m - b),
        u(g, n) + e + 0.9 * f * Math.sin(m - b)
      ]); m <= d; m += b)
      k.push([
        u(g, n) + a + c * Math.cos(m),
        u(g, n) + e + f * Math.sin(m)
      ]);
    return k.push([
      a + c * Math.cos(d),
      e + f * Math.sin(d)
    ]), k.push([
      a + c * Math.cos(d),
      e + f * Math.sin(d)
    ]), P(k, null, n);
  }

  function ta(b, a, e, c, f, d, r, g) {
    for (var k = [], m = [
        g.maxRandomnessOffset || 1,
        (g.maxRandomnessOffset || 1) + 0.3
      ], h, w = g.disableMultiStroke ? 1 : 2, t = g.preserveVertices, l = 0; l < w; l++)
      0 === l ? k.push({
        op: 'move',
        data: [
          r[0],
          r[1]
        ]
      }) : k.push({
        op: 'move',
        data: [
          r[0] + (t ? 0 : u(m[0], g)),
          r[1] + (t ? 0 : u(m[0], g))
        ]
      }), h = t ? [
        f,
        d
      ] : [
        f + u(m[l], g),
        d + u(m[l], g)
      ], k.push({
        op: 'bcurveTo',
        data: [
          b + u(m[l], g),
          a + u(m[l], g),
          e + u(m[l], g),
          c + u(m[l], g),
          h[0],
          h[1]
        ]
      });
    return k;
  }

  function Q(b, a) {
    return Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2);
  }

  function E(b, a, e) {
    return [
      b[0] + (a[0] - b[0]) * e,
      b[1] + (a[1] - b[1]) * e
    ];
  }

  function V(b, a, e, c) {
    c = c || [];
    var f = b[a + 0],
      d = b[a + 1],
      r = b[a + 2],
      g = b[a + 3],
      n = 3 * d[0] - 2 * f[0] - g[0],
      n = n * n,
      d = 3 * d[1] - 2 * f[1] - g[1],
      d = d * d,
      m = 3 * r[0] - 2 * g[0] - f[0],
      m = m * m,
      f = 3 * r[1] - 2 * g[1] - f[1];
    (f *= f, n < m && (n = m), d < f && (d = f), n + d) < e ? (e = b[a + 0], c.length ? 1 < (h = c[c.length - 1], l = e, Math.sqrt(Q(h, l))) && c.push(e) : c.push(e), c.push(b[a + 3])) : (h = b[a + 0], n = b[a + 1], l = b[a + 2], b = b[a + 3], a = E(h, n, 0.5), f = E(n, l, 0.5), l = E(l, b, 0.5), n = E(a, f, 0.5), f = E(f, l, 0.5), r = E(n, f, 0.5), V([
      h,
      a,
      n,
      r
    ], 0, e, c), V([
      r,
      f,
      l,
      b
    ], 0, e, c));
    var h, l;
    return c;
  }

  function R(b, a, e, c, f) {
    f = f || [];
    for (var d = b[a], r = b[e - 1], g = 0, n = 1, m = a + 1; m < e - 1; ++m) {
      var h;
      h = b[m];
      var l = d,
        t = r,
        p = Q(l, t);
      0 === p ? h = Q(h, l) : (p = ((h[0] - l[0]) * (t[0] - l[0]) + (h[1] - l[1]) * (t[1] - l[1])) / p, h = (p = Math.max(0, Math.min(1, p)), Q(h, E(l, t, p))));
      h > g && (g = h, n = m);
    }
    return Math.sqrt(g) > c ? (R(b, a, n + 1, c, f), R(b, n, e, c, f)) : (f.length || f.push(d), f.push(r)), f;
  }

  function ga(b) {
    for (var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0.15, e = 2 < arguments.length ? arguments[2] : void 0, c = [], f = (b.length - 1) / 3, d = 0; d < f; d++)
      V(b, 3 * d, a, c);
    return e && 0 < e ? R(c, 0, c.length, e) : c;
  }
  var U = function() {
      function b(a) {
        _classCallCheck(this, b);
        this.helper = a;
      }
      _createClass(b, [{
          key: 'fillPolygon',
          value: function(a, e) {
            return this._fillPolygon(a, e);
          }
        },
        {
          key: '_fillPolygon',
          value: function(a, e) {
            var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1,
              f = C(a, e);
            c && (c = this.connectingLines(a, f), f = f.concat(c));
            return {
              type: 'fillSketch',
              ops: this.renderLines(f, e)
            };
          }
        },
        {
          key: 'renderLines',
          value: function(a, e) {
            var c = [],
              f = _createForOfIteratorHelper(a),
              b;
            try {
              for (f.s(); !(b = f.n()).done;) {
                var d = b.value;
                c.push.apply(c, _toConsumableArray(this.helper.doubleLineOps(d[0][0], d[0][1], d[1][0], d[1][1], e)));
              }
            } catch (g) {
              f.e(g);
            } finally {
              f.f();
            }
            return c;
          }
        },
        {
          key: 'connectingLines',
          value: function(a, e) {
            var c = [];
            if (1 < e.length)
              for (var f = 1; f < e.length; f++) {
                var b = e[f - 1];
                3 > h(b) || (b = [
                  e[f][0],
                  b[1]
                ], 3 < h(b) && (b = this.splitOnIntersections(a, b), c.push.apply(c, _toConsumableArray(b))));
              }
            return c;
          }
        },
        {
          key: 'midPointInPolygon',
          value: function(a, e) {
            return p(a, (e[0][0] + e[1][0]) / 2, (e[0][1] + e[1][1]) / 2);
          }
        },
        {
          key: 'splitOnIntersections',
          value: function(a, e) {
            for (var c = Math.max(5, 0.1 * h(e)), b = [], d = 0; d < a.length; d++) {
              var r = a[d],
                g = a[(d + 1) % a.length];
              if (B.apply(void 0, [
                  r,
                  g
                ].concat(_toConsumableArray(e))) && (r = l(r, g, e[0], e[1]))) {
                var g = h([
                    r,
                    e[0]
                  ]),
                  n = h([
                    r,
                    e[1]
                  ]);
                g > c && n > c && b.push({
                  point: r,
                  distance: g
                });
              }
            }
            if (1 < b.length) {
              c = b.sort(function(a, c) {
                return a.distance - c.distance;
              }).map(function(a) {
                return a.point;
              });
              if (p.apply(void 0, [a].concat(_toConsumableArray(e[0]))) || c.shift(), p.apply(void 0, [a].concat(_toConsumableArray(e[1]))) || c.pop(), 1 >= c.length)
                return this.midPointInPolygon(a, e) ? [e] : [];
              c = [e[0]].concat(_toConsumableArray(c), [e[1]]);
              b = [];
              for (d = 0; d < c.length - 1; d += 2)
                r = [
                  c[d],
                  c[d + 1]
                ], this.midPointInPolygon(a, r) && b.push(r);
              return b;
            }
            return this.midPointInPolygon(a, e) ? [e] : [];
          }
        }
      ]);
      return b;
    }(),
    na = function(b) {
      function a() {
        _classCallCheck(this, a);
        return e.apply(this, arguments);
      }
      _inherits(a, b);
      var e = _createSuper(a);
      _createClass(a, [{
        key: 'fillPolygon',
        value: function(a, e) {
          return this._fillPolygon(a, e, !0);
        }
      }]);
      return a;
    }(U),
    oa = function(b) {
      function a() {
        _classCallCheck(this, a);
        return e.apply(this, arguments);
      }
      _inherits(a, b);
      var e = _createSuper(a);
      _createClass(a, [{
        key: 'fillPolygon',
        value: function(a, e) {
          var c = this._fillPolygon(a, e),
            b = Object.assign({}, e, {
              hachureAngle: e.hachureAngle + 90
            }),
            b = this._fillPolygon(a, b);
          return c.ops = c.ops.concat(b.ops), c;
        }
      }]);
      return a;
    }(U),
    pa = function() {
      function b(a) {
        _classCallCheck(this, b);
        this.helper = a;
      }
      _createClass(b, [{
          key: 'fillPolygon',
          value: function(a, e) {
            var c = C(a, e = Object.assign({}, e, {
              curveStepCount: 4,
              hachureAngle: 0,
              roughness: 1
            }));
            return this.dotsOnLines(c, e);
          }
        },
        {
          key: 'dotsOnLines',
          value: function(a, e) {
            var c = [],
              b = e.hachureGap;
            0 > b && (b = 4 * e.strokeWidth);
            var b = Math.max(b, 0.1),
              d = e.fillWeight;
            0 > d && (d = e.strokeWidth / 2);
            var r = b / 4,
              g = _createForOfIteratorHelper(a),
              n;
            try {
              for (g.s(); !(n = g.n()).done;)
                for (var m = n.value, l = h(m), w = Math.ceil(l / b) - 1, t = l - w * b, p = (m[0][0] + m[1][0]) / 2 - b / 4, q = Math.min(m[0][1], m[1][1]), u = 0; u < w; u++) {
                  var v = q + t + u * b,
                    z = this.helper.randOffsetWithRange(p - r, p + r, e),
                    y = this.helper.randOffsetWithRange(v - r, v + r, e),
                    F = this.helper.ellipse(z, y, d, d, e);
                  c.push.apply(c, _toConsumableArray(F.ops));
                }
            } catch (ha) {
              g.e(ha);
            } finally {
              g.f();
            }
            return {
              type: 'fillSketch',
              ops: c
            };
          }
        }
      ]);
      return b;
    }(),
    qa = function() {
      function b(a) {
        _classCallCheck(this, b);
        this.helper = a;
      }
      _createClass(b, [{
          key: 'fillPolygon',
          value: function(a, e) {
            var c = C(a, e);
            return {
              type: 'fillSketch',
              ops: this.dashedLine(c, e)
            };
          }
        },
        {
          key: 'dashedLine',
          value: function(a, e) {
            var c = this,
              b = 0 > e.dashOffset ? 0 > e.hachureGap ? 4 * e.strokeWidth : e.hachureGap : e.dashOffset,
              d = 0 > e.dashGap ? 0 > e.hachureGap ? 4 * e.strokeWidth : e.hachureGap : e.dashGap,
              r = [];
            return a.forEach(function(a) {
              var f = h(a),
                g = Math.floor(f / (b + d)),
                f = (f + d - g * (b + d)) / 2,
                k = a[0],
                l = a[1];
              k[0] > l[0] && (k = a[1], l = a[0]);
              a = Math.atan((l[1] - k[1]) / (l[0] - k[0]));
              for (l = 0; l < g; l++) {
                var t = l * (b + d),
                  p = t + b,
                  t = [
                    k[0] + t * Math.cos(a) + f * Math.cos(a),
                    k[1] + t * Math.sin(a) + f * Math.sin(a)
                  ],
                  p = [
                    k[0] + p * Math.cos(a) + f * Math.cos(a),
                    k[1] + p * Math.sin(a) + f * Math.sin(a)
                  ];
                r.push.apply(r, _toConsumableArray(c.helper.doubleLineOps(t[0], t[1], p[0], p[1], e)));
              }
            }), r;
          }
        }
      ]);
      return b;
    }(),
    ra = function() {
      function b(a) {
        _classCallCheck(this, b);
        this.helper = a;
      }
      _createClass(b, [{
          key: 'fillPolygon',
          value: function(a, e) {
            var c = 0 > e.hachureGap ? 4 * e.strokeWidth : e.hachureGap,
              b = 0 > e.zigzagOffset ? c : e.zigzagOffset,
              c = C(a, e = Object.assign({}, e, {
                hachureGap: c + b
              }));
            return {
              type: 'fillSketch',
              ops: this.zigzagLines(c, b, e)
            };
          }
        },
        {
          key: 'zigzagLines',
          value: function(a, e, c) {
            var b = this,
              d = [];
            return a.forEach(function(a) {
              var f = h(a),
                f = Math.round(f / (2 * e)),
                k = a[0],
                m = a[1];
              k[0] > m[0] && (k = a[1], m = a[0]);
              a = Math.atan((m[1] - k[1]) / (m[0] - k[0]));
              for (m = 0; m < f; m++) {
                var l = 2 * m * e,
                  r = 2 * (m + 1) * e,
                  t = Math.sqrt(2 * Math.pow(e, 2)),
                  l = [
                    k[0] + l * Math.cos(a),
                    k[1] + l * Math.sin(a)
                  ],
                  r = [
                    k[0] + r * Math.cos(a),
                    k[1] + r * Math.sin(a)
                  ],
                  t = [
                    l[0] + t * Math.cos(a + Math.PI / 4),
                    l[1] + t * Math.sin(a + Math.PI / 4)
                  ];
                d.push.apply(d, _toConsumableArray(b.helper.doubleLineOps(l[0], l[1], t[0], t[1], c)).concat(_toConsumableArray(b.helper.doubleLineOps(t[0], t[1], r[0], r[1], c))));
              }
            }), d;
          }
        }
      ]);
      return b;
    }(),
    A = {},
    sa = function() {
      function b(a) {
        _classCallCheck(this, b);
        this.seed = a;
      }
      _createClass(b, [{
        key: 'next',
        value: function() {
          return this.seed ? (Math.pow(2, 31) - 1 & (this.seed = Math.imul(48271, this.seed))) / Math.pow(2, 31) : Math.random();
        }
      }]);
      return b;
    }(),
    K = {
      A: 7,
      a: 7,
      C: 6,
      c: 6,
      H: 1,
      h: 1,
      L: 2,
      l: 2,
      M: 2,
      m: 2,
      Q: 4,
      q: 4,
      S: 4,
      s: 4,
      T: 2,
      t: 2,
      V: 1,
      v: 1,
      Z: 0,
      z: 0
    },
    ma = {
      randOffset: function(b, a) {
        return u(b, a);
      },
      randOffsetWithRange: function(b, a, e) {
        return O(b, a, e);
      },
      ellipse: function(b, a, e, c, d) {
        e = aa(e, c, d);
        return T(b, a, d, e).opset;
      },
      doubleLineOps: function(b, a, e, c, d) {
        return D(b, a, e, c, d, !0);
      }
    },
    S = function() {
      function b(a) {
        _classCallCheck(this, b);
        this.defaultOptions = {
          maxRandomnessOffset: 2,
          roughness: 1,
          bowing: 1,
          stroke: '#000',
          strokeWidth: 1,
          curveTightness: 0,
          curveFitting: 0.95,
          curveStepCount: 9,
          fillStyle: 'hachure',
          fillWeight: -1,
          hachureAngle: -41,
          hachureGap: -1,
          dashOffset: -1,
          dashGap: -1,
          zigzagOffset: -1,
          seed: 0,
          combineNestedSvgPaths: !1,
          disableMultiStroke: !1,
          disableMultiStrokeFill: !1,
          preserveVertices: !1
        };
        this.config = a || {};
        this.config.options && (this.defaultOptions = this._o(this.config.options));
      }
      _createClass(b, [{
          key: '_o',
          value: function(a) {
            return a ? Object.assign({}, this.defaultOptions, a) : this.defaultOptions;
          }
        },
        {
          key: '_d',
          value: function(a, e, c) {
            return {
              shape: a,
              sets: e || [],
              options: c || this.defaultOptions
            };
          }
        },
        {
          key: 'line',
          value: function(a, e, c, b, d) {
            d = this._o(d);
            return this._d('line', [{
              type: 'path',
              ops: D(a, e, c, b, d)
            }], d);
          }
        },
        {
          key: 'rectangle',
          value: function(a, e, c, b, d) {
            d = this._o(d);
            var f = [],
              g;
            g = N([
              [
                a,
                e
              ],
              [
                a + c,
                e
              ],
              [
                a + c,
                e + b
              ],
              [
                a,
                e + b
              ]
            ], !0, d);
            d.fill && (a = [
              [
                a,
                e
              ],
              [
                a + c,
                e
              ],
              [
                a + c,
                e + b
              ],
              [
                a,
                e + b
              ]
            ], 'solid' === d.fillStyle ? f.push(J(a, d)) : f.push(G(a, d)));
            return 'none' !== d.stroke && f.push(g), this._d('rectangle', f, d);
          }
        },
        {
          key: 'ellipse',
          value: function(a, e, c, b, d) {
            d = this._o(d);
            var f = [];
            b = aa(c, b, d);
            c = T(a, e, d, b);
            d.fill && ('solid' === d.fillStyle ? (a = T(a, e, d, b).opset, a.type = 'fillPath', f.push(a)) : f.push(G(c.estimatedPoints, d)));
            return 'none' !== d.stroke && f.push(c.opset), this._d('ellipse', f, d);
          }
        },
        {
          key: 'circle',
          value: function(a, e, c, b) {
            a = this.ellipse(a, e, c, c, b);
            return a.shape = 'circle', a;
          }
        },
        {
          key: 'linearPath',
          value: function(a, e) {
            var c = this._o(e);
            return this._d('linearPath', [N(a, !1, c)], c);
          }
        },
        {
          key: 'arc',
          value: function(a, e, c, b, d, h) {
            var f = 6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : !1,
              k = this._o(7 < arguments.length ? arguments[7] : void 0),
              m = [],
              l = ca(a, e, c, b, d, h, f, !0, k);
            f && k.fill && ('solid' === k.fillStyle ? (f = ca(a, e, c, b, d, h, !0, !1, k), f.type = 'fillPath', m.push(f)) : m.push(function(a, c, e, b, d, f, g) {
              e = Math.abs(e / 2);
              b = Math.abs(b / 2);
              e += u(0.01 * e, g);
              for (b += u(0.01 * b, g); 0 > d;)
                d += 2 * Math.PI, f += 2 * Math.PI;
              f - d > 2 * Math.PI && (d = 0, f = 2 * Math.PI);
              for (var k = (f - d) / g.curveStepCount, m = []; d <= f; d += k)
                m.push([
                  a + e * Math.cos(d),
                  c + b * Math.sin(d)
                ]);
              return m.push([
                a + e * Math.cos(f),
                c + b * Math.sin(f)
              ]), m.push([
                a,
                c
              ]), G(m, g);
            }(a, e, c, b, d, h, k)));
            return 'none' !== k.stroke && m.push(l), this._d('arc', m, k);
          }
        },
        {
          key: 'curve',
          value: function(a, e) {
            var c = this._o(e),
              b = [],
              d = la(a, c);
            if (c.fill && 'none' !== c.fill && 3 <= a.length) {
              var h = ga(function(a) {
                var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                  e = a.length;
                if (3 > e)
                  throw Error('A curve must have at least three points.');
                var b = [];
                if (3 === e)
                  b.push(_toConsumableArray(a[0]), _toConsumableArray(a[1]), _toConsumableArray(a[2]), _toConsumableArray(a[2]));
                else {
                  e = [];
                  e.push(a[0], a[0]);
                  for (var d = 1; d < a.length; d++)
                    e.push(a[d]), d === a.length - 1 && e.push(a[d]);
                  d = [];
                  c = 1 - c;
                  b.push(_toConsumableArray(e[0]));
                  for (var f = 1; f + 2 < e.length; f++) {
                    var g = e[f];
                    d[0] = [
                      g[0],
                      g[1]
                    ];
                    d[1] = [
                      g[0] + (c * e[f + 1][0] - c * e[f - 1][0]) / 6,
                      g[1] + (c * e[f + 1][1] - c * e[f - 1][1]) / 6
                    ];
                    d[2] = [
                      e[f + 1][0] + (c * e[f][0] - c * e[f + 2][0]) / 6,
                      e[f + 1][1] + (c * e[f][1] - c * e[f + 2][1]) / 6
                    ];
                    d[3] = [
                      e[f + 1][0],
                      e[f + 1][1]
                    ];
                    b.push(d[1], d[2], d[3]);
                  }
                }
                return b;
              }(a), 10, (1 + c.roughness) / 2);
              'solid' === c.fillStyle ? b.push(J(h, c)) : b.push(G(h, c));
            }
            return 'none' !== c.stroke && b.push(d), this._d('curve', b, c);
          }
        },
        {
          key: 'polygon',
          value: function(a, e) {
            var c = this._o(e),
              b = [],
              d = N(a, !0, c);
            return c.fill && ('solid' === c.fillStyle ? b.push(J(a, c)) : b.push(G(a, c))), 'none' !== c.stroke && b.push(d), this._d('polygon', b, c);
          }
        },
        {
          key: 'path',
          value: function(a, e) {
            var c = this._o(e),
              b = [];
            if (!a)
              return this._d('path', b, c);
            a = (a || '').replace(/\n/g, ' ').replace(/(-\s)/g, '-').replace('/(ss)/g', ' ');
            var d = c.fill && 'transparent' !== c.fill && 'none' !== c.fill,
              h = 'none' !== c.stroke,
              g = !!(c.simplification && 1 > c.simplification),
              l = function(a, c, e) {
                var b = X(W(H(a))),
                  d = [],
                  f = [];
                a = [
                  0,
                  0
                ];
                var g = [],
                  k = function() {
                    var a;
                    4 <= g.length && (a = f).push.apply(a, _toConsumableArray(ga(g, c)));
                    g = [];
                  },
                  h = function() {
                    k();
                    f.length && (d.push(f), f = []);
                  },
                  b = _createForOfIteratorHelper(b),
                  l;
                try {
                  for (b.s(); !(l = b.n()).done;) {
                    var m = l.value,
                      n = m.data;
                    switch (m.key) {
                      case 'M':
                        h();
                        a = [
                          n[0],
                          n[1]
                        ];
                        f.push(a);
                        break;
                      case 'L':
                        k();
                        f.push([
                          n[0],
                          n[1]
                        ]);
                        break;
                      case 'C':
                        if (!g.length) {
                          var r = f.length ? f[f.length - 1] : a;
                          g.push([
                            r[0],
                            r[1]
                          ]);
                        }
                        g.push([
                          n[0],
                          n[1]
                        ]);
                        g.push([
                          n[2],
                          n[3]
                        ]);
                        g.push([
                          n[4],
                          n[5]
                        ]);
                        break;
                      case 'Z':
                        k(), f.push([
                          a[0],
                          a[1]
                        ]);
                    }
                  }
                } catch (ja) {
                  b.e(ja);
                } finally {
                  b.f();
                }
                if (h(), !e)
                  return d;
                l = [];
                for (m = 0; m < d.length; m++)
                  n = d[m], n = R(n, 0, n.length, e), n.length && l.push(n);
                return l;
              }(a, 1, g ? 4 - 4 * c.simplification : (1 + c.roughness) / 2);
            if (d)
              if (c.combineNestedSvgPaths) {
                var m = [];
                l.forEach(function(a) {
                  return m.push.apply(m, _toConsumableArray(a));
                });
                'solid' === c.fillStyle ? b.push(J(m, c)) : b.push(G(m, c));
              } else
                l.forEach(function(a) {
                  'solid' === c.fillStyle ? b.push(J(a, c)) : b.push(G(a, c));
                });
            return h && (g ? l.forEach(function(a) {
              b.push(N(a, !1, c));
            }) : b.push(function(a, c) {
              var e = X(W(H(a))),
                b = [],
                d = [
                  0,
                  0
                ],
                f = [
                  0,
                  0
                ],
                e = _createForOfIteratorHelper(e),
                g;
              try {
                for (e.s(); !(g = e.n()).done;) {
                  var k = g.value,
                    h = k.data;
                  switch (k.key) {
                    case 'M':
                      if ('break' === function() {
                          var a = 1 * (c.maxRandomnessOffset || 0),
                            e = c.preserveVertices;
                          b.push({
                            op: 'move',
                            data: h.map(function(b) {
                              return b + (e ? 0 : u(a, c));
                            })
                          });
                          f = [
                            h[0],
                            h[1]
                          ];
                          d = [
                            h[0],
                            h[1]
                          ];
                          return 'break';
                        }())
                        break;
                    case 'L':
                      b.push.apply(b, _toConsumableArray(D(f[0], f[1], h[0], h[1], c)));
                      f = [
                        h[0],
                        h[1]
                      ];
                      break;
                    case 'C':
                      var l = _slicedToArray(h, 6),
                        m = l[4],
                        n = l[5];
                      b.push.apply(b, _toConsumableArray(ta(l[0], l[1], l[2], l[3], m, n, f, c)));
                      f = [
                        m,
                        n
                      ];
                      break;
                    case 'Z':
                      b.push.apply(b, _toConsumableArray(D(f[0], f[1], d[0], d[1], c))), f = [
                        d[0],
                        d[1]
                      ];
                  }
                }
              } catch (ia) {
                e.e(ia);
              } finally {
                e.f();
              }
              return {
                type: 'path',
                ops: b
              };
            }(a, c))), this._d('path', b, c);
          }
        },
        {
          key: 'opsToPath',
          value: function(a, e) {
            var c = '',
              b = _createForOfIteratorHelper(a.ops),
              d;
            try {
              for (b.s(); !(d = b.n()).done;) {
                var h = d.value,
                  g = 'number' == typeof e && 0 <= e ? h.data.map(function(a) {
                    return +a.toFixed(e);
                  }) : h.data;
                switch (h.op) {
                  case 'move':
                    c += 'M'.concat(g[0], ' ').concat(g[1], ' ');
                    break;
                  case 'bcurveTo':
                    c += 'C'.concat(g[0], ' ').concat(g[1], ', ').concat(g[2], ' ').concat(g[3], ', ').concat(g[4], ' ').concat(g[5], ' ');
                    break;
                  case 'lineTo':
                    c += 'L'.concat(g[0], ' ').concat(g[1], ' ');
                }
              }
            } catch (n) {
              b.e(n);
            } finally {
              b.f();
            }
            return c.trim();
          }
        },
        {
          key: 'toPaths',
          value: function(a) {
            var e = a.options || this.defaultOptions,
              c = [];
            a = _createForOfIteratorHelper(a.sets || []);
            var b;
            try {
              for (a.s(); !(b = a.n()).done;) {
                var d = b.value,
                  h = null;
                switch (d.type) {
                  case 'path':
                    h = {
                      d: this.opsToPath(d),
                      stroke: e.stroke,
                      strokeWidth: e.strokeWidth,
                      fill: 'none'
                    };
                    break;
                  case 'fillPath':
                    h = {
                      d: this.opsToPath(d),
                      stroke: 'none',
                      strokeWidth: 0,
                      fill: e.fill || 'none'
                    };
                    break;
                  case 'fillSketch':
                    h = this.fillSketch(d, e);
                }
                h && c.push(h);
              }
            } catch (g) {
              a.e(g);
            } finally {
              a.f();
            }
            return c;
          }
        },
        {
          key: 'fillSketch',
          value: function(a, e) {
            var c = e.fillWeight;
            return 0 > c && (c = e.strokeWidth / 2), {
              d: this.opsToPath(a),
              stroke: e.fill || 'none',
              strokeWidth: c,
              fill: 'none'
            };
          }
        }
      ], [{
        key: 'newSeed',
        value: function() {
          return Math.floor(Math.random() * Math.pow(2, 31));
        }
      }]);
      return b;
    }(),
    ua = function() {
      function b(a, e) {
        _classCallCheck(this, b);
        this.canvas = a;
        this.ctx = this.canvas.getContext('2d');
        this.gen = new S(e);
      }
      _createClass(b, [{
          key: 'draw',
          value: function(a) {
            var e = a.sets || [],
              c = a.options || this.getDefaultOptions(),
              b = this.ctx,
              e = _createForOfIteratorHelper(e),
              d;
            try {
              for (e.s(); !(d = e.n()).done;) {
                var h = d.value;
                switch (h.type) {
                  case 'path':
                    b.save();
                    b.strokeStyle = 'none' === c.stroke ? 'transparent' : c.stroke;
                    b.lineWidth = c.strokeWidth;
                    c.strokeLineDash && b.setLineDash(c.strokeLineDash);
                    c.strokeLineDashOffset && (b.lineDashOffset = c.strokeLineDashOffset);
                    this._drawToContext(b, h);
                    b.restore();
                    break;
                  case 'fillPath':
                    b.save();
                    b.fillStyle = c.fill || '';
                    this._drawToContext(b, h, 'curve' === a.shape || 'polygon' === a.shape ? 'evenodd' : 'nonzero');
                    b.restore();
                    break;
                  case 'fillSketch':
                    this.fillSketch(b, h, c);
                }
              }
            } catch (g) {
              e.e(g);
            } finally {
              e.f();
            }
          }
        },
        {
          key: 'fillSketch',
          value: function(a, e, c) {
            var b = c.fillWeight;
            0 > b && (b = c.strokeWidth / 2);
            a.save();
            c.fillLineDash && a.setLineDash(c.fillLineDash);
            c.fillLineDashOffset && (a.lineDashOffset = c.fillLineDashOffset);
            a.strokeStyle = c.fill || '';
            a.lineWidth = b;
            this._drawToContext(a, e);
            a.restore();
          }
        },
        {
          key: '_drawToContext',
          value: function(a, e) {
            var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 'nonzero';
            a.beginPath();
            var b = _createForOfIteratorHelper(e.ops),
              d;
            try {
              for (b.s(); !(d = b.n()).done;) {
                var h = d.value,
                  g = h.data;
                switch (h.op) {
                  case 'move':
                    a.moveTo(g[0], g[1]);
                    break;
                  case 'bcurveTo':
                    a.bezierCurveTo(g[0], g[1], g[2], g[3], g[4], g[5]);
                    break;
                  case 'lineTo':
                    a.lineTo(g[0], g[1]);
                }
              }
            } catch (n) {
              b.e(n);
            } finally {
              b.f();
            }
            'fillPath' === e.type ? a.fill(c) : a.stroke();
          }
        },
        {
          key: 'getDefaultOptions',
          value: function() {
            return this.gen.defaultOptions;
          }
        },
        {
          key: 'line',
          value: function(a, b, c, d, k) {
            a = this.gen.line(a, b, c, d, k);
            return this.draw(a), a;
          }
        },
        {
          key: 'rectangle',
          value: function(a, b, c, d, k) {
            a = this.gen.rectangle(a, b, c, d, k);
            return this.draw(a), a;
          }
        },
        {
          key: 'ellipse',
          value: function(a, b, c, d, k) {
            a = this.gen.ellipse(a, b, c, d, k);
            return this.draw(a), a;
          }
        },
        {
          key: 'circle',
          value: function(a, b, c, d) {
            a = this.gen.circle(a, b, c, d);
            return this.draw(a), a;
          }
        },
        {
          key: 'linearPath',
          value: function(a, b) {
            var c = this.gen.linearPath(a, b);
            return this.draw(c), c;
          }
        },
        {
          key: 'polygon',
          value: function(a, b) {
            var c = this.gen.polygon(a, b);
            return this.draw(c), c;
          }
        },
        {
          key: 'arc',
          value: function(a, b, c, d, k, h) {
            var e = this.gen.arc(a, b, c, d, k, h, 6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : !1, 7 < arguments.length ? arguments[7] : void 0);
            return this.draw(e), e;
          }
        },
        {
          key: 'curve',
          value: function(a, b) {
            var c = this.gen.curve(a, b);
            return this.draw(c), c;
          }
        },
        {
          key: 'path',
          value: function(a, b) {
            var c = this.gen.path(a, b);
            return this.draw(c), c;
          }
        },
        {
          key: 'generator',
          get: function() {
            return this.gen;
          }
        }
      ]);
      return b;
    }(),
    va = function() {
      function b(a, e) {
        _classCallCheck(this, b);
        this.svg = a;
        this.gen = new S(e);
      }
      _createClass(b, [{
          key: 'draw',
          value: function(a) {
            var b = a.sets || [],
              c = a.options || this.getDefaultOptions(),
              d = this.svg.ownerDocument || window.document,
              k = d.createElementNS('http://www.w3.org/2000/svg', 'g'),
              h = a.options.fixedDecimalPlaceDigits,
              b = _createForOfIteratorHelper(b),
              g;
            try {
              for (b.s(); !(g = b.n()).done;) {
                var l = g.value,
                  m = null;
                switch (l.type) {
                  case 'path':
                    m = d.createElementNS('http://www.w3.org/2000/svg', 'path');
                    m.setAttribute('d', this.opsToPath(l, h));
                    m.setAttribute('stroke', c.stroke);
                    m.setAttribute('stroke-width', c.strokeWidth + '');
                    m.setAttribute('fill', 'none');
                    c.strokeLineDash && m.setAttribute('stroke-dasharray', c.strokeLineDash.join(' ').trim());
                    c.strokeLineDashOffset && m.setAttribute('stroke-dashoffset', ''.concat(c.strokeLineDashOffset));
                    break;
                  case 'fillPath':
                    m = d.createElementNS('http://www.w3.org/2000/svg', 'path');
                    m.setAttribute('d', this.opsToPath(l, h));
                    m.setAttribute('stroke', 'none');
                    m.setAttribute('stroke-width', '0');
                    m.setAttribute('fill', c.fill || '');
                    'curve' !== a.shape && 'polygon' !== a.shape || m.setAttribute('fill-rule', 'evenodd');
                    break;
                  case 'fillSketch':
                    m = this.fillSketch(d, l, c);
                }
                m && k.appendChild(m);
              }
            } catch (x) {
              b.e(x);
            } finally {
              b.f();
            }
            return k;
          }
        },
        {
          key: 'fillSketch',
          value: function(a, b, c) {
            var e = c.fillWeight;
            0 > e && (e = c.strokeWidth / 2);
            a = a.createElementNS('http://www.w3.org/2000/svg', 'path');
            return a.setAttribute('d', this.opsToPath(b, c.fixedDecimalPlaceDigits)), a.setAttribute('stroke', c.fill || ''), a.setAttribute('stroke-width', e + ''), a.setAttribute('fill', 'none'), c.fillLineDash && a.setAttribute('stroke-dasharray', c.fillLineDash.join(' ').trim()), c.fillLineDashOffset && a.setAttribute('stroke-dashoffset', ''.concat(c.fillLineDashOffset)), a;
          }
        },
        {
          key: 'getDefaultOptions',
          value: function() {
            return this.gen.defaultOptions;
          }
        },
        {
          key: 'opsToPath',
          value: function(a, b) {
            return this.gen.opsToPath(a, b);
          }
        },
        {
          key: 'line',
          value: function(a, b, c, d, h) {
            a = this.gen.line(a, b, c, d, h);
            return this.draw(a);
          }
        },
        {
          key: 'rectangle',
          value: function(a, b, c, d, h) {
            a = this.gen.rectangle(a, b, c, d, h);
            return this.draw(a);
          }
        },
        {
          key: 'ellipse',
          value: function(a, b, c, d, h) {
            a = this.gen.ellipse(a, b, c, d, h);
            return this.draw(a);
          }
        },
        {
          key: 'circle',
          value: function(a, b, c, d) {
            a = this.gen.circle(a, b, c, d);
            return this.draw(a);
          }
        },
        {
          key: 'linearPath',
          value: function(a, b) {
            var c = this.gen.linearPath(a, b);
            return this.draw(c);
          }
        },
        {
          key: 'polygon',
          value: function(a, b) {
            var c = this.gen.polygon(a, b);
            return this.draw(c);
          }
        },
        {
          key: 'arc',
          value: function(a, b, c, d, h, l) {
            var e = this.gen.arc(a, b, c, d, h, l, 6 < arguments.length && void 0 !== arguments[6] ? arguments[6] : !1, 7 < arguments.length ? arguments[7] : void 0);
            return this.draw(e);
          }
        },
        {
          key: 'curve',
          value: function(a, b) {
            var c = this.gen.curve(a, b);
            return this.draw(c);
          }
        },
        {
          key: 'path',
          value: function(a, b) {
            var c = this.gen.path(a, b);
            return this.draw(c);
          }
        },
        {
          key: 'generator',
          get: function() {
            return this.gen;
          }
        }
      ]);
      return b;
    }();
  return {
    canvas: function(b, a) {
      return new ua(b, a);
    },
    svg: function(b, a) {
      return new va(b, a);
    },
    generator: function(b) {
      return new S(b);
    },
    newSeed: function() {
      return S.newSeed();
    }
  };
}();
(() => {
  'use strict';
  var t = {};

  function e(t, e, n, r = t => t) {
    return t * r(0.5 - e * (0.5 - n));
  }

  function n(t, e) {
    return [
      t[0] + e[0],
      t[1] + e[1]
    ];
  }

  function r(t, e) {
    return [
      t[0] - e[0],
      t[1] - e[1]
    ];
  }

  function i(t, e) {
    return [
      t[0] * e,
      t[1] * e
    ];
  }

  function u(t) {
    return [
      t[1],
      -t[0]
    ];
  }

  function o(t, e) {
    return t[0] * e[0] + t[1] * e[1];
  }

  function l(t, e) {
    return t[0] === e[0] && t[1] === e[1];
  }

  function s(t, e) {
    return function(t) {
      return t[0] * t[0] + t[1] * t[1];
    }(r(t, e));
  }

  function c(t) {
    return function(t, e) {
      return [
        t[0] / e,
        t[1] / e
      ];
    }(t, function(t) {
      return Math.hypot(t[0], t[1]);
    }(t));
  }

  function h(t, e) {
    return Math.hypot(t[1] - e[1], t[0] - e[0]);
  }

  function f(t, e, n) {
    let r = Math.sin(n),
      i = Math.cos(n),
      u = t[0] - e[0],
      o = t[1] - e[1],
      l = u * r + o * i;
    return [
      u * i - o * r + e[0],
      l + e[1]
    ];
  }

  function p(t, e, u) {
    return n(t, i(r(e, t), u));
  }

  function a(t, e, r) {
    return n(t, i(e, r));
  }
  t.g = function() {
    if ('object' == typeof globalThis)
      return globalThis;
    try {
      return this || new Function('return this')();
    } catch (t) {
      if ('object' == typeof window)
        return window;
    }
  }();
  var {
    min: g,
    PI: v
  } = Math, d = v + 0.0001;

  function M(t, v = {}) {
    return function(t, l = {}) {
      let {
        size: h = 16,
        smoothing: v = 0.5,
        thinning: M = 0.5,
        simulatePressure: m = !0,
        easing: y = t => t,
        start: w = {},
        end: P = {},
        last: F = !1
      } = l, {
        cap: b = !0,
        easing: x = t => t * (2 - t)
      } = w, {
        cap: L = !0,
        easing: j = t => --t * t * t + 1
      } = P;
      if (0 === t.length || h <= 0)
        return [];
      let S, k = t[t.length - 1].runningLength,
        z = !1 === w.taper ? 0 : !0 === w.taper ? Math.max(h, k) : w.taper,
        A = !1 === P.taper ? 0 : !0 === P.taper ? Math.max(h, k) : P.taper,
        T = Math.pow(h * v, 2),
        I = [],
        Q = [],
        Z = t.slice(0, 10).reduce((t, e) => {
          let n = e.pressure;
          if (m) {
            let r = g(1, e.distance / h),
              i = g(1, 1 - r);
            n = g(1, t + 0.275 * r * (i - t));
          }
          return (t + n) / 2;
        }, t[0].pressure),
        q = e(h, M, t[t.length - 1].pressure, y),
        B = t[0].vector,
        C = t[0].point,
        D = C,
        E = C,
        G = D;
      for (let l = 0; l < t.length; l++) {
        let {
          pressure: c
        } = t[l], {
          point: a,
          vector: v,
          distance: w,
          runningLength: P
        } = t[l];
        if (l < t.length - 1 && k - P < 3)
          continue;
        if (M) {
          if (m) {
            let t = g(1, w / h),
              e = g(1, 1 - t);
            c = g(1, Z + 0.275 * t * (e - Z));
          }
          q = e(h, M, c, y);
        } else
          q = h / 2;
        void 0 === S && (S = q);
        let F = P < z ? x(P / z) : 1,
          b = k - P < A ? j((k - P) / A) : 1;
        if (q = Math.max(0.01, q * Math.min(F, b)), l === t.length - 1) {
          let t = i(u(v), q);
          I.push(r(a, t)), Q.push(n(a, t));
          continue;
        }
        let L = t[l + 1].vector,
          H = o(v, L);
        if (H < 0) {
          let t = i(u(B), q);
          for (let e = 1 / 13, i = 0; i <= 1; i += e)
            E = f(r(a, t), a, d * i), I.push(E), G = f(n(a, t), a, d * -i), Q.push(G);
          C = E, D = G;
          continue;
        }
        let J = i(u(p(L, v, H)), q);
        E = r(a, J), (l <= 1 || s(C, E) > T) && (I.push(E), C = E), G = n(a, J), (l <= 1 || s(D, G) > T) && (Q.push(G), D = G), Z = c, B = v;
      }
      let H = t[0].point.slice(0, 2),
        J = t.length > 1 ? t[t.length - 1].point.slice(0, 2) : n(t[0].point, [
          1,
          1
        ]),
        K = [],
        N = [];
      if (1 === t.length) {
        if (!z && !A || F) {
          let t = a(H, c(u(r(H, J))), -(S || q)),
            e = [];
          for (let n = 1 / 13, r = n; r <= 1; r += n)
            e.push(f(t, H, 2 * d * r));
          return e;
        }
      } else {
        if (!(z || A && 1 === t.length))
          if (b)
            for (let t = 1 / 13, e = t; e <= 1; e += t) {
              let t = f(Q[0], H, d * e);
              K.push(t);
            }
        else {
          let t = r(I[0], Q[0]),
            e = i(t, 0.5),
            u = i(t, 0.51);
          K.push(r(H, e), r(H, u), n(H, u), n(H, e));
        }
        let e = u(function(t) {
          return [
            -t[0],
            -t[1]
          ];
        }(t[t.length - 1].vector));
        if (A || z && 1 === t.length)
          N.push(J);
        else if (L) {
          let t = a(J, e, q);
          for (let e = 1 / 29, n = e; n < 1; n += e)
            N.push(f(t, J, 3 * d * n));
        } else
          N.push(n(J, i(e, q)), n(J, i(e, 0.99 * q)), r(J, i(e, 0.99 * q)), r(J, i(e, q)));
      }
      return I.concat(N, Q.reverse(), K);
    }(function(t, e = {}) {
      var i;
      let {
        streamline: u = 0.5,
        size: o = 16,
        last: s = !1
      } = e;
      if (0 === t.length)
        return [];
      let f = 0.15 + 0.85 * (1 - u),
        a = Array.isArray(t[0]) ? t : t.map(({
          x: t,
          y: e,
          pressure: n = 0.5
        }) => [
          t,
          e,
          n
        ]);
      if (2 === a.length) {
        let t = a[1];
        a = a.slice(0, -1);
        for (let e = 1; e < 5; e++)
          a.push(p(a[0], t, e / 4));
      }
      1 === a.length && (a = [
        ...a,
        [
          ...n(a[0], [
            1,
            1
          ]),
          ...a[0].slice(2)
        ]
      ]);
      let g = [{
          point: [
            a[0][0],
            a[0][1]
          ],
          pressure: a[0][2] >= 0 ? a[0][2] : 0.25,
          vector: [
            1,
            1
          ],
          distance: 0,
          runningLength: 0
        }],
        v = !1,
        d = 0,
        M = g[0],
        m = a.length - 1;
      for (let t = 1; t < a.length; t++) {
        let e = s && t === m ? a[t].slice(0, 2) : p(M.point, a[t], f);
        if (l(M.point, e))
          continue;
        let n = h(e, M.point);
        if (d += n, t < m && !v) {
          if (d < o)
            continue;
          v = !0;
        }
        M = {
          point: e,
          pressure: a[t][2] >= 0 ? a[t][2] : 0.5,
          vector: c(r(M.point, e)),
          distance: n,
          runningLength: d
        }, g.push(M);
      }
      return g[0].vector = (null == (i = g[1]) ? void 0 : i.vector) || [
        0,
        0
      ], g;
    }(t, v), v);
  }
  t.g.PerfectFreehand = {}, PerfectFreehand.getStroke = function(t, e) {
    return M(t, e);
  }, PerfectFreehand.getSvgPathFromStroke = function(t, e) {
    let n = M(t, e);
    const r = n.reduce((t, [e, n], r, i) => {
      const [u, o] = i[(r + 1) % i.length];
      return t.push(e, n, (e + u) / 2, (n + o) / 2), t;
    }, [
      'M',
      ...n[0],
      'Q'
    ]);
    return r.push('Z'), r.join(' ');
  };
})();