var ul = Object.defineProperty;
var hl = (t, e, r) =>
  e in t
    ? ul(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (t[e] = r);
var x = (t, e, r) => hl(t, typeof e != "symbol" ? e + "" : e, r);
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const n of s)
      if (n.type === "childList")
        for (const o of n.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(s) {
    const n = {};
    return (
      s.integrity && (n.integrity = s.integrity),
      s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const n = r(s);
    fetch(s.href, n);
  }
})();
var cl = Object.defineProperty,
  a = (t, e) => cl(t, "name", { value: e, configurable: !0 }),
  dl = (() => {
    for (var t = new Uint8Array(128), e = 0; e < 64; e++)
      t[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
    return (r) => {
      for (
        var i = r.length,
          s = new Uint8Array(
            (((i - (r[i - 1] == "=") - (r[i - 2] == "=")) * 3) / 4) | 0
          ),
          n = 0,
          o = 0;
        n < i;

      ) {
        var h = t[r.charCodeAt(n++)],
          l = t[r.charCodeAt(n++)],
          c = t[r.charCodeAt(n++)],
          u = t[r.charCodeAt(n++)];
        (s[o++] = (h << 2) | (l >> 4)),
          (s[o++] = (l << 4) | (c >> 2)),
          (s[o++] = (c << 6) | u);
      }
      return s;
    };
  })(),
  $,
  J =
    (($ = class {
      constructor(e, r, i) {
        x(this, "r", 255);
        x(this, "g", 255);
        x(this, "b", 255);
        (this.r = Je(e, 0, 255)),
          (this.g = Je(r, 0, 255)),
          (this.b = Je(i, 0, 255));
      }
      static fromArray(e) {
        return new $(e[0], e[1], e[2]);
      }
      static fromHex(e) {
        if (typeof e == "number")
          return new $((e >> 16) & 255, (e >> 8) & 255, (e >> 0) & 255);
        if (typeof e == "string") {
          let r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
          if (!r) throw new Error("Invalid hex color format");
          return new $(
            parseInt(r[1], 16),
            parseInt(r[2], 16),
            parseInt(r[3], 16)
          );
        } else throw new Error("Invalid hex color format");
      }
      static fromHSL(e, r, i) {
        if (r == 0) return new $(255 * i, 255 * i, 255 * i);
        let s = a(
            (u, d, g) => (
              g < 0 && (g += 1),
              g > 1 && (g -= 1),
              g < 1 / 6
                ? u + (d - u) * 6 * g
                : g < 1 / 2
                ? d
                : g < 2 / 3
                ? u + (d - u) * (2 / 3 - g) * 6
                : u
            ),
            "hue2rgb"
          ),
          n = i < 0.5 ? i * (1 + r) : i + r - i * r,
          o = 2 * i - n,
          h = s(o, n, e + 1 / 3),
          l = s(o, n, e),
          c = s(o, n, e - 1 / 3);
        return new $(
          Math.round(h * 255),
          Math.round(l * 255),
          Math.round(c * 255)
        );
      }
      clone() {
        return new $(this.r, this.g, this.b);
      }
      lighten(e) {
        return new $(this.r + e, this.g + e, this.b + e);
      }
      darken(e) {
        return this.lighten(-e);
      }
      invert() {
        return new $(255 - this.r, 255 - this.g, 255 - this.b);
      }
      mult(e) {
        return new $(
          (this.r * e.r) / 255,
          (this.g * e.g) / 255,
          (this.b * e.b) / 255
        );
      }
      lerp(e, r) {
        return new $(
          Ue(this.r, e.r, r),
          Ue(this.g, e.g, r),
          Ue(this.b, e.b, r)
        );
      }
      toHSL() {
        let e = this.r / 255,
          r = this.g / 255,
          i = this.b / 255,
          s = Math.max(e, r, i),
          n = Math.min(e, r, i),
          o = (s + n) / 2,
          h = o,
          l = o;
        if (s == n) o = h = 0;
        else {
          let c = s - n;
          switch (((h = l > 0.5 ? c / (2 - s - n) : c / (s + n)), s)) {
            case e:
              o = (r - i) / c + (r < i ? 6 : 0);
              break;
            case r:
              o = (i - e) / c + 2;
              break;
            case i:
              o = (e - r) / c + 4;
              break;
          }
          o /= 6;
        }
        return [o, h, l];
      }
      eq(e) {
        return this.r === e.r && this.g === e.g && this.b === e.b;
      }
      toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
      }
      toHex() {
        return (
          "#" +
          ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
            .toString(16)
            .slice(1)
        );
      }
      toArray() {
        return [this.r, this.g, this.b];
      }
    }),
    a($, "Color"),
    x($, "RED", new $(255, 0, 0)),
    x($, "GREEN", new $(0, 255, 0)),
    x($, "BLUE", new $(0, 0, 255)),
    x($, "YELLOW", new $(255, 255, 0)),
    x($, "MAGENTA", new $(255, 0, 255)),
    x($, "CYAN", new $(0, 255, 255)),
    x($, "WHITE", new $(255, 255, 255)),
    x($, "BLACK", new $(0, 0, 0)),
    $);
function se(...t) {
  if (t.length === 0) return new J(255, 255, 255);
  if (t.length === 1) {
    if (t[0] instanceof J) return t[0].clone();
    if (typeof t[0] == "string") return J.fromHex(t[0]);
    if (Array.isArray(t[0]) && t[0].length === 3) return J.fromArray(t[0]);
  } else if (t.length === 2) {
    if (t[0] instanceof J) return t[0].clone();
  } else if (t.length === 3 || t.length === 4) return new J(t[0], t[1], t[2]);
  throw new Error("Invalid color arguments");
}
a(se, "rgb");
var fl = a((t, e, r) => J.fromHSL(t, e, r), "hsl2rgb");
function ge(t) {
  return (t * Math.PI) / 180;
}
a(ge, "deg2rad");
function wt(t) {
  return (t * 180) / Math.PI;
}
a(wt, "rad2deg");
function Je(t, e, r) {
  return e > r ? Je(t, r, e) : Math.min(Math.max(t, e), r);
}
a(Je, "clamp");
function Ue(t, e, r) {
  if (typeof t == "number" && typeof e == "number") return t + (e - t) * r;
  if ((t instanceof S && e instanceof S) || (t instanceof J && e instanceof J))
    return t.lerp(e, r);
  throw new Error(
    `Bad value for lerp(): ${t}, ${e}. Only number, Vec2 and Color is supported.`
  );
}
a(Ue, "lerp");
function Ke(t, e, r, i, s) {
  return i + ((t - e) / (r - e)) * (s - i);
}
a(Ke, "map");
function Hs(t, e, r, i, s) {
  return Je(Ke(t, e, r, i, s), i, s);
}
a(Hs, "mapc");
var oe,
  S =
    ((oe = class {
      constructor(e = 0, r = e) {
        x(this, "x", 0);
        x(this, "y", 0);
        (this.x = e), (this.y = r);
      }
      static fromAngle(e) {
        let r = ge(e);
        return new oe(Math.cos(r), Math.sin(r));
      }
      static fromArray(e) {
        return new oe(e[0], e[1]);
      }
      clone() {
        return new oe(this.x, this.y);
      }
      add(...e) {
        let r = b(...e);
        return new oe(this.x + r.x, this.y + r.y);
      }
      sub(...e) {
        let r = b(...e);
        return new oe(this.x - r.x, this.y - r.y);
      }
      scale(...e) {
        let r = b(...e);
        return new oe(this.x * r.x, this.y * r.y);
      }
      dist(...e) {
        let r = b(...e);
        return this.sub(r).len();
      }
      sdist(...e) {
        let r = b(...e);
        return this.sub(r).slen();
      }
      len() {
        return Math.sqrt(this.dot(this));
      }
      slen() {
        return this.dot(this);
      }
      unit() {
        let e = this.len();
        return e === 0 ? new oe(0) : this.scale(1 / e);
      }
      normal() {
        return new oe(this.y, -this.x);
      }
      reflect(e) {
        return this.sub(e.scale(2 * this.dot(e)));
      }
      project(e) {
        return e.scale(e.dot(this) / e.len());
      }
      reject(e) {
        return this.sub(this.project(e));
      }
      dot(e) {
        return this.x * e.x + this.y * e.y;
      }
      cross(e) {
        return this.x * e.y - this.y * e.x;
      }
      angle(...e) {
        let r = b(...e);
        return wt(Math.atan2(this.y - r.y, this.x - r.x));
      }
      angleBetween(...e) {
        let r = b(...e);
        return wt(Math.atan2(this.cross(r), this.dot(r)));
      }
      lerp(e, r) {
        return new oe(Ue(this.x, e.x, r), Ue(this.y, e.y, r));
      }
      slerp(e, r) {
        let i = this.dot(e),
          s = this.cross(e),
          n = Math.atan2(s, i);
        return this.scale(Math.sin((1 - r) * n))
          .add(e.scale(Math.sin(r * n)))
          .scale(1 / s);
      }
      isZero() {
        return this.x === 0 && this.y === 0;
      }
      toFixed(e) {
        return new oe(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
      }
      transform(e) {
        return e.multVec2(this);
      }
      eq(e) {
        return this.x === e.x && this.y === e.y;
      }
      bbox() {
        return new me(this, 0, 0);
      }
      toString() {
        return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
      }
      toArray() {
        return [this.x, this.y];
      }
    }),
    a(oe, "Vec2"),
    x(oe, "LEFT", new oe(-1, 0)),
    x(oe, "RIGHT", new oe(1, 0)),
    x(oe, "UP", new oe(0, -1)),
    x(oe, "DOWN", new oe(0, 1)),
    oe);
function b(...t) {
  if (t.length === 1) {
    if (t[0] instanceof S) return new S(t[0].x, t[0].y);
    if (Array.isArray(t[0]) && t[0].length === 2) return new S(...t[0]);
  }
  return new S(...t);
}
a(b, "vec2");
var ft,
  ae =
    ((ft = class {
      constructor(e, r, i, s) {
        x(this, "x", 0);
        x(this, "y", 0);
        x(this, "w", 1);
        x(this, "h", 1);
        (this.x = e), (this.y = r), (this.w = i), (this.h = s);
      }
      scale(e) {
        return new ft(
          this.x + this.w * e.x,
          this.y + this.h * e.y,
          this.w * e.w,
          this.h * e.h
        );
      }
      pos() {
        return new S(this.x, this.y);
      }
      clone() {
        return new ft(this.x, this.y, this.w, this.h);
      }
      eq(e) {
        return (
          this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h
        );
      }
      toString() {
        return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
      }
    }),
    a(ft, "Quad"),
    ft);
function de(t, e, r, i) {
  return new ae(t, e, r, i);
}
a(de, "quad");
var Ge,
  Kr =
    ((Ge = class {
      constructor(e, r, i, s) {
        x(this, "a");
        x(this, "b");
        x(this, "c");
        x(this, "d");
        (this.a = e), (this.b = r), (this.c = i), (this.d = s);
      }
      mul(e) {
        return new Ge(
          this.a * e.a + this.b * e.c,
          this.a * e.b + this.b * e.d,
          this.c * e.a + this.d * e.c,
          this.c * e.b + this.d * e.d
        );
      }
      transform(e) {
        return b(this.a * e.x + this.b * e.y, this.c * e.x + this.d * e.y);
      }
      get inverse() {
        let e = this.det;
        return new Ge(this.d / e, -this.b / e, -this.c / e, this.a / e);
      }
      get transpose() {
        return new Ge(this.a, this.c, this.b, this.d);
      }
      get eigenvalues() {
        let e = this.trace / 2,
          r = this.det,
          i = e + Math.sqrt(e * e - r),
          s = e - Math.sqrt(e * e - r);
        return [i, s];
      }
      eigenvectors(e, r) {
        return this.c != 0
          ? [
              [e - this.d, this.c],
              [r - this.d, this.c],
            ]
          : this.b != 0
          ? [
              [this.b, e - this.a],
              [this.b, r - this.a],
            ]
          : Math.abs(this.transform(b(1, 0)).x - e) < Number.EPSILON
          ? [
              [1, 0],
              [0, 1],
            ]
          : [
              [0, 1],
              [1, 0],
            ];
      }
      get det() {
        return this.a * this.d - this.b * this.c;
      }
      get trace() {
        return this.a + this.d;
      }
      static rotation(e) {
        let r = Math.cos(e),
          i = Math.sin(e);
        return new Ge(r, i, -i, r);
      }
      static scale(e, r) {
        return new Ge(e, 0, 0, r);
      }
    }),
    a(Ge, "Mat2"),
    Ge),
  Qe,
  gr =
    ((Qe = class {
      constructor(e, r, i, s, n, o, h, l, c) {
        x(this, "m11");
        x(this, "m12");
        x(this, "m13");
        x(this, "m21");
        x(this, "m22");
        x(this, "m23");
        x(this, "m31");
        x(this, "m32");
        x(this, "m33");
        (this.m11 = e),
          (this.m12 = r),
          (this.m13 = i),
          (this.m21 = s),
          (this.m22 = n),
          (this.m23 = o),
          (this.m31 = h),
          (this.m32 = l),
          (this.m33 = c);
      }
      static fromMat2(e) {
        return new Qe(e.a, e.b, 0, e.c, e.d, 0, 0, 0, 1);
      }
      toMat2() {
        return new Kr(this.m11, this.m12, this.m21, this.m22);
      }
      mul(e) {
        return new Qe(
          this.m11 * e.m11 + this.m12 * e.m21 + this.m13 * e.m31,
          this.m11 * e.m12 + this.m12 * e.m22 + this.m13 * e.m32,
          this.m11 * e.m13 + this.m12 * e.m23 + this.m13 * e.m33,
          this.m21 * e.m11 + this.m22 * e.m21 + this.m23 * e.m31,
          this.m21 * e.m12 + this.m22 * e.m22 + this.m23 * e.m32,
          this.m21 * e.m13 + this.m22 * e.m23 + this.m23 * e.m33,
          this.m31 * e.m11 + this.m32 * e.m21 + this.m33 * e.m31,
          this.m31 * e.m12 + this.m32 * e.m22 + this.m33 * e.m32,
          this.m31 * e.m13 + this.m32 * e.m23 + this.m33 * e.m33
        );
      }
      get det() {
        return (
          this.m11 * this.m22 * this.m33 +
          this.m12 * this.m23 * this.m31 +
          this.m13 * this.m21 * this.m32 -
          this.m13 * this.m22 * this.m31 -
          this.m12 * this.m21 * this.m33 -
          this.m11 * this.m23 * this.m32
        );
      }
      rotate(e) {
        let r = Math.cos(e),
          i = Math.sin(e),
          s = this.m11,
          n = this.m12;
        return (
          (this.m11 = r * this.m11 + i * this.m21),
          (this.m12 = r * this.m12 + i * this.m22),
          (this.m21 = r * this.m21 - i * s),
          (this.m22 = r * this.m22 - i * n),
          this
        );
      }
      scale(e, r) {
        return (
          (this.m11 *= e),
          (this.m12 *= e),
          (this.m21 *= r),
          (this.m22 *= r),
          this
        );
      }
      get inverse() {
        let e = this.det;
        return new Qe(
          (this.m22 * this.m33 - this.m23 * this.m32) / e,
          (this.m13 * this.m32 - this.m12 * this.m33) / e,
          (this.m12 * this.m23 - this.m13 * this.m22) / e,
          (this.m23 * this.m31 - this.m21 * this.m33) / e,
          (this.m11 * this.m33 - this.m13 * this.m31) / e,
          (this.m13 * this.m21 - this.m11 * this.m23) / e,
          (this.m21 * this.m32 - this.m22 * this.m31) / e,
          (this.m12 * this.m31 - this.m11 * this.m32) / e,
          (this.m11 * this.m22 - this.m12 * this.m21) / e
        );
      }
      get transpose() {
        return new Qe(
          this.m11,
          this.m21,
          this.m31,
          this.m12,
          this.m22,
          this.m32,
          this.m13,
          this.m23,
          this.m33
        );
      }
    }),
    a(Qe, "Mat3"),
    Qe),
  Ve,
  Ze =
    ((Ve = class {
      constructor(e) {
        x(this, "m", [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        e && (this.m = e);
      }
      static translate(e) {
        return new Ve([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
      }
      static scale(e) {
        return new Ve([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      }
      static rotateX(e) {
        e = ge(-e);
        let r = Math.cos(e),
          i = Math.sin(e);
        return new Ve([1, 0, 0, 0, 0, r, -i, 0, 0, i, r, 0, 0, 0, 0, 1]);
      }
      static rotateY(e) {
        e = ge(-e);
        let r = Math.cos(e),
          i = Math.sin(e);
        return new Ve([r, 0, i, 0, 0, 1, 0, 0, -i, 0, r, 0, 0, 0, 0, 1]);
      }
      static rotateZ(e) {
        e = ge(-e);
        let r = Math.cos(e),
          i = Math.sin(e);
        return new Ve([r, -i, 0, 0, i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      }
      translate(e) {
        return (
          (this.m[12] += this.m[0] * e.x + this.m[4] * e.y),
          (this.m[13] += this.m[1] * e.x + this.m[5] * e.y),
          (this.m[14] += this.m[2] * e.x + this.m[6] * e.y),
          (this.m[15] += this.m[3] * e.x + this.m[7] * e.y),
          this
        );
      }
      scale(e) {
        return (
          (this.m[0] *= e.x),
          (this.m[4] *= e.y),
          (this.m[1] *= e.x),
          (this.m[5] *= e.y),
          (this.m[2] *= e.x),
          (this.m[6] *= e.y),
          (this.m[3] *= e.x),
          (this.m[7] *= e.y),
          this
        );
      }
      rotate(e) {
        e = ge(-e);
        let r = Math.cos(e),
          i = Math.sin(e),
          s = this.m[0],
          n = this.m[1],
          o = this.m[4],
          h = this.m[5];
        return (
          (this.m[0] = s * r + n * i),
          (this.m[1] = -s * i + n * r),
          (this.m[4] = o * r + h * i),
          (this.m[5] = -o * i + h * r),
          this
        );
      }
      mult(e) {
        let r = [];
        for (let i = 0; i < 4; i++)
          for (let s = 0; s < 4; s++)
            r[i * 4 + s] =
              this.m[0 * 4 + s] * e.m[i * 4 + 0] +
              this.m[1 * 4 + s] * e.m[i * 4 + 1] +
              this.m[2 * 4 + s] * e.m[i * 4 + 2] +
              this.m[3 * 4 + s] * e.m[i * 4 + 3];
        return new Ve(r);
      }
      multVec2(e) {
        return new S(
          e.x * this.m[0] + e.y * this.m[4] + this.m[12],
          e.x * this.m[1] + e.y * this.m[5] + this.m[13]
        );
      }
      getTranslation() {
        return new S(this.m[12], this.m[13]);
      }
      getScale() {
        if (this.m[0] != 0 || this.m[1] != 0) {
          let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
            r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
          return new S(r, e / r);
        } else if (this.m[4] != 0 || this.m[5] != 0) {
          let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
            r = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
          return new S(e / r, r);
        } else return new S(0, 0);
      }
      getRotation() {
        if (this.m[0] != 0 || this.m[1] != 0) {
          let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
          return wt(
            this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e)
          );
        } else if (this.m[4] != 0 || this.m[5] != 0) {
          let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
          return wt(
            Math.PI / 2 -
              (this.m[5] > 0
                ? Math.acos(-this.m[4] / e)
                : -Math.acos(this.m[4] / e))
          );
        } else return 0;
      }
      getSkew() {
        if (this.m[0] != 0 || this.m[1] != 0) {
          let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
          return new S(
            Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e),
            0
          );
        } else if (this.m[4] != 0 || this.m[5] != 0) {
          let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
          return new S(
            0,
            Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e)
          );
        } else return new S(0, 0);
      }
      invert() {
        let e = [],
          r = this.m[10] * this.m[15] - this.m[14] * this.m[11],
          i = this.m[9] * this.m[15] - this.m[13] * this.m[11],
          s = this.m[9] * this.m[14] - this.m[13] * this.m[10],
          n = this.m[8] * this.m[15] - this.m[12] * this.m[11],
          o = this.m[8] * this.m[14] - this.m[12] * this.m[10],
          h = this.m[8] * this.m[13] - this.m[12] * this.m[9],
          l = this.m[6] * this.m[15] - this.m[14] * this.m[7],
          c = this.m[5] * this.m[15] - this.m[13] * this.m[7],
          u = this.m[5] * this.m[14] - this.m[13] * this.m[6],
          d = this.m[4] * this.m[15] - this.m[12] * this.m[7],
          g = this.m[4] * this.m[14] - this.m[12] * this.m[6],
          w = this.m[5] * this.m[15] - this.m[13] * this.m[7],
          m = this.m[4] * this.m[13] - this.m[12] * this.m[5],
          y = this.m[6] * this.m[11] - this.m[10] * this.m[7],
          V = this.m[5] * this.m[11] - this.m[9] * this.m[7],
          R = this.m[5] * this.m[10] - this.m[9] * this.m[6],
          k = this.m[4] * this.m[11] - this.m[8] * this.m[7],
          q = this.m[4] * this.m[10] - this.m[8] * this.m[6],
          Y = this.m[4] * this.m[9] - this.m[8] * this.m[5];
        (e[0] = this.m[5] * r - this.m[6] * i + this.m[7] * s),
          (e[4] = -(this.m[4] * r - this.m[6] * n + this.m[7] * o)),
          (e[8] = this.m[4] * i - this.m[5] * n + this.m[7] * h),
          (e[12] = -(this.m[4] * s - this.m[5] * o + this.m[6] * h)),
          (e[1] = -(this.m[1] * r - this.m[2] * i + this.m[3] * s)),
          (e[5] = this.m[0] * r - this.m[2] * n + this.m[3] * o),
          (e[9] = -(this.m[0] * i - this.m[1] * n + this.m[3] * h)),
          (e[13] = this.m[0] * s - this.m[1] * o + this.m[2] * h),
          (e[2] = this.m[1] * l - this.m[2] * c + this.m[3] * u),
          (e[6] = -(this.m[0] * l - this.m[2] * d + this.m[3] * g)),
          (e[10] = this.m[0] * w - this.m[1] * d + this.m[3] * m),
          (e[14] = -(this.m[0] * u - this.m[1] * g + this.m[2] * m)),
          (e[3] = -(this.m[1] * y - this.m[2] * V + this.m[3] * R)),
          (e[7] = this.m[0] * y - this.m[2] * k + this.m[3] * q),
          (e[11] = -(this.m[0] * V - this.m[1] * k + this.m[3] * Y)),
          (e[15] = this.m[0] * R - this.m[1] * q + this.m[2] * Y);
        let F =
          this.m[0] * e[0] +
          this.m[1] * e[4] +
          this.m[2] * e[8] +
          this.m[3] * e[12];
        for (let A = 0; A < 4; A++)
          for (let v = 0; v < 4; v++) e[A * 4 + v] *= 1 / F;
        return new Ve(e);
      }
      clone() {
        return new Ve([...this.m]);
      }
      toString() {
        return this.m.toString();
      }
    }),
    a(Ve, "Mat4"),
    Ve);
function ki(t, e, r, i = (s) => -Math.cos(s)) {
  return t + ((i(r) + 1) / 2) * (e - t);
}
a(ki, "wave");
var pl = 1103515245,
  gl = 12345,
  qs = 2147483648,
  qt,
  zs =
    ((qt = class {
      constructor(e) {
        x(this, "seed");
        this.seed = e;
      }
      gen() {
        return (this.seed = (pl * this.seed + gl) % qs), this.seed / qs;
      }
      genNumber(e, r) {
        return e + this.gen() * (r - e);
      }
      genVec2(e, r) {
        return new S(this.genNumber(e.x, r.x), this.genNumber(e.y, r.y));
      }
      genColor(e, r) {
        return new J(
          this.genNumber(e.r, r.r),
          this.genNumber(e.g, r.g),
          this.genNumber(e.b, r.b)
        );
      }
      genAny(...e) {
        if (e.length === 0) return this.gen();
        if (e.length === 1) {
          if (typeof e[0] == "number") return this.genNumber(0, e[0]);
          if (e[0] instanceof S) return this.genVec2(b(0, 0), e[0]);
          if (e[0] instanceof J) return this.genColor(se(0, 0, 0), e[0]);
        } else if (e.length === 2) {
          if (typeof e[0] == "number" && typeof e[1] == "number")
            return this.genNumber(e[0], e[1]);
          if (e[0] instanceof S && e[1] instanceof S)
            return this.genVec2(e[0], e[1]);
          if (e[0] instanceof J && e[1] instanceof J)
            return this.genColor(e[0], e[1]);
        }
        throw new Error("More than 2 arguments not supported");
      }
    }),
    a(qt, "RNG"),
    qt),
  Vi = new zs(Date.now());
function Qs(t) {
  return t != null && (Vi.seed = t), Vi.seed;
}
a(Qs, "randSeed");
function ye(...t) {
  return Vi.genAny(...t);
}
a(ye, "rand");
function Ui(...t) {
  return Math.floor(ye(...t));
}
a(Ui, "randi");
function Ws(t) {
  return ye() <= t;
}
a(Ws, "chance");
function Oi(t) {
  for (let e = t.length - 1; e > 0; e--) {
    let r = Math.floor(Math.random() * (e + 1));
    [t[e], t[r]] = [t[r], t[e]];
  }
  return t;
}
a(Oi, "shuffle");
function Xs(t, e) {
  return t.length <= e ? t.slice() : Oi(t.slice()).slice(0, e);
}
a(Xs, "chooseMultiple");
function Js(t) {
  return t[Ui(t.length)];
}
a(Js, "choose");
function Ni(t, e) {
  return (
    t.pos.x + t.width > e.pos.x &&
    t.pos.x < e.pos.x + e.width &&
    t.pos.y + t.height > e.pos.y &&
    t.pos.y < e.pos.y + e.height
  );
}
a(Ni, "testRectRect");
function Zs(t, e) {
  if (
    (t.p1.x === t.p2.x && t.p1.y === t.p2.y) ||
    (e.p1.x === e.p2.x && e.p1.y === e.p2.y)
  )
    return null;
  let r =
    (e.p2.y - e.p1.y) * (t.p2.x - t.p1.x) -
    (e.p2.x - e.p1.x) * (t.p2.y - t.p1.y);
  if (r === 0) return null;
  let i =
      ((e.p2.x - e.p1.x) * (t.p1.y - e.p1.y) -
        (e.p2.y - e.p1.y) * (t.p1.x - e.p1.x)) /
      r,
    s =
      ((t.p2.x - t.p1.x) * (t.p1.y - e.p1.y) -
        (t.p2.y - t.p1.y) * (t.p1.x - e.p1.x)) /
      r;
  return i < 0 || i > 1 || s < 0 || s > 1 ? null : i;
}
a(Zs, "testLineLineT");
function Zr(t, e) {
  let r = Zs(t, e);
  return r
    ? b(t.p1.x + r * (t.p2.x - t.p1.x), t.p1.y + r * (t.p2.y - t.p1.y))
    : null;
}
a(Zr, "testLineLine");
function _r(t, e) {
  let r = e.p2.sub(e.p1),
    i = Number.NEGATIVE_INFINITY,
    s = Number.POSITIVE_INFINITY;
  if (r.x != 0) {
    let n = (t.pos.x - e.p1.x) / r.x,
      o = (t.pos.x + t.width - e.p1.x) / r.x;
    (i = Math.max(i, Math.min(n, o))), (s = Math.min(s, Math.max(n, o)));
  }
  if (r.y != 0) {
    let n = (t.pos.y - e.p1.y) / r.y,
      o = (t.pos.y + t.height - e.p1.y) / r.y;
    (i = Math.max(i, Math.min(n, o))), (s = Math.min(s, Math.max(n, o)));
  }
  return s >= i && s >= 0 && i <= 1;
}
a(_r, "testRectLine");
function $r(t, e) {
  return (
    e.x > t.pos.x &&
    e.x < t.pos.x + t.width &&
    e.y > t.pos.y &&
    e.y < t.pos.y + t.height
  );
}
a($r, "testRectPoint");
function Li(t, e) {
  let r = Math.max(t.pos.x, Math.min(e.center.x, t.pos.x + t.width)),
    i = Math.max(t.pos.y, Math.min(e.center.y, t.pos.y + t.height));
  return b(r, i).sdist(e.center) <= e.radius * e.radius;
}
a(Li, "testRectCircle");
function qi(t, e) {
  return Gi(e, new Le(t.points()));
}
a(qi, "testRectPolygon");
function ei(t, e) {
  let r = e.sub(t.p1),
    i = t.p2.sub(t.p1);
  if (Math.abs(r.cross(i)) > Number.EPSILON) return !1;
  let s = r.dot(i) / i.dot(i);
  return s >= 0 && s <= 1;
}
a(ei, "testLinePoint");
function hr(t, e) {
  let r = t.p2.sub(t.p1),
    i = r.dot(r),
    s = t.p1.sub(e.center),
    n = 2 * r.dot(s),
    o = s.dot(s) - e.radius * e.radius,
    h = n * n - 4 * i * o;
  if (i <= Number.EPSILON || h < 0) return !1;
  if (h == 0) {
    let l = -n / (2 * i);
    if (l >= 0 && l <= 1) return !0;
  } else {
    let l = (-n + Math.sqrt(h)) / (2 * i),
      c = (-n - Math.sqrt(h)) / (2 * i);
    if ((l >= 0 && l <= 1) || (c >= 0 && c <= 1)) return !0;
  }
  return Pr(e, t.p1);
}
a(hr, "testLineCircle");
function ti(t, e) {
  if (it(e, t.p1) || it(e, t.p2)) return !0;
  for (let r = 0; r < e.pts.length; r++) {
    let i = e.pts[r],
      s = e.pts[(r + 1) % e.pts.length];
    if (Zr(t, new De(i, s))) return !0;
  }
  return !1;
}
a(ti, "testLinePolygon");
function Pr(t, e) {
  return t.center.sdist(e) < t.radius * t.radius;
}
a(Pr, "testCirclePoint");
function _s(t, e) {
  return (
    t.center.sdist(e.center) < (t.radius + e.radius) * (t.radius + e.radius)
  );
}
a(_s, "testCircleCircle");
function Ir(t, e) {
  let r = e.pts[e.pts.length - 1];
  for (let i of e.pts) {
    if (hr(new De(r, i), t)) return !0;
    r = i;
  }
  return Pr(t, e.pts[0]) ? !0 : it(e, t.center);
}
a(Ir, "testCirclePolygon");
function Gi(t, e) {
  for (let r = 0; r < t.pts.length; r++)
    if (ti(new De(t.pts[r], t.pts[(r + 1) % t.pts.length]), e)) return !0;
  return !!(t.pts.some((r) => it(e, r)) || e.pts.some((r) => it(t, r)));
}
a(Gi, "testPolygonPolygon");
function it(t, e) {
  let r = !1,
    i = t.pts;
  for (let s = 0, n = i.length - 1; s < i.length; n = s++)
    i[s].y > e.y != i[n].y > e.y &&
      e.x < ((i[n].x - i[s].x) * (e.y - i[s].y)) / (i[n].y - i[s].y) + i[s].x &&
      (r = !r);
  return r;
}
a(it, "testPolygonPoint");
function ri(t, e) {
  e = e.sub(t.center);
  let r = ge(t.angle),
    i = Math.cos(r),
    s = Math.sin(r),
    n = e.x * i + e.y * s,
    o = -e.x * s + e.y * i;
  return (
    (n * n) / (t.radiusX * t.radiusX) + (o * o) / (t.radiusY * t.radiusY) < 1
  );
}
a(ri, "testEllipsePoint");
function vr(t, e) {
  let r = e.center.sub(t.center),
    i = ge(t.angle),
    s = Math.cos(i),
    n = Math.sin(i),
    o = r.x * s + r.y * n,
    h = -r.x * n + r.y * s;
  return ri(
    new st(b(), t.radiusX + e.radius, t.radiusY + e.radius, 0),
    b(o, h)
  );
}
a(vr, "testEllipseCircle");
function ji(t, e) {
  let r = t.toMat2().inverse;
  return (
    (e = new De(
      r.transform(e.p1.sub(t.center)),
      r.transform(e.p2.sub(t.center))
    )),
    hr(e, new Oe(b(), 1))
  );
}
a(ji, "testEllipseLine");
function $s(t, e) {
  if (t.radiusX === t.radiusY) return vr(e, new Oe(t.center, t.radiusX));
  if (e.radiusX === e.radiusY) return vr(t, new Oe(e.center, e.radiusX));
  let r = new gr(1 / t.radiusX ** 2, 0, 0, 0, 1 / t.radiusY ** 2, 0, 0, 0, -1),
    i = new gr(1 / e.radiusX ** 2, 0, 0, 0, 1 / e.radiusY ** 2, 0, 0, 0, -1),
    s = t.center.x,
    n = t.center.y,
    o = e.center.x,
    h = e.center.y,
    l = ge(t.angle),
    c = ge(e.angle),
    u = new gr(
      Math.cos(l),
      -Math.sin(l),
      s,
      Math.sin(l),
      Math.cos(l),
      n,
      0,
      0,
      1
    ),
    d = new gr(
      Math.cos(c),
      -Math.sin(c),
      o,
      Math.sin(c),
      Math.cos(c),
      h,
      0,
      0,
      1
    ),
    g = u.inverse,
    w = d.inverse,
    m = g.transpose.mul(r).mul(g),
    y = w.transpose.mul(i).mul(w),
    V = m.m11,
    R = m.m12,
    k = m.m13,
    q = m.m21,
    Y = m.m22,
    F = m.m23,
    A = m.m31,
    v = m.m32,
    B = m.m33,
    I = y.m11,
    U = y.m12,
    N = y.m13,
    G = y.m21,
    H = y.m22,
    z = y.m23,
    ne = y.m31,
    Z = y.m32,
    X = y.m33,
    ee = V * Y * B - V * F * v - R * q * B + R * F * A + k * q * v - k * Y * A,
    _ =
      (V * Y * X -
        V * F * Z -
        V * v * z +
        V * B * H -
        R * q * X +
        R * F * ne +
        R * A * z -
        R * B * G +
        k * q * Z -
        k * Y * ne -
        k * A * H +
        k * v * G +
        q * v * N -
        q * B * U -
        Y * A * N +
        Y * B * I +
        F * A * U -
        F * v * I) /
      ee,
    C =
      (V * H * X -
        V * z * Z -
        R * G * X +
        R * z * ne +
        k * G * Z -
        k * H * ne -
        q * U * X +
        q * N * Z +
        Y * I * X -
        Y * N * ne -
        F * I * Z +
        F * U * ne +
        A * U * z -
        A * N * H -
        v * I * z +
        v * N * G +
        B * I * H -
        B * U * G) /
      ee,
    K =
      (I * H * X -
        I * z * Z -
        U * G * X +
        U * z * ne +
        N * G * Z -
        N * H * ne) /
      ee;
  if (_ >= 0) {
    let O = -3 * C + _ ** 2,
      te = 3 * _ * K + C * _ ** 2 - 4 * C ** 2,
      ce =
        -27 * K ** 2 +
        18 * K * _ * C +
        _ ** 2 * C ** 2 -
        4 * _ ** 3 * K -
        4 * C ** 3;
    return !(O > 0 && te < 0 && ce > 0);
  } else {
    let O = -3 * C + _ ** 2,
      te =
        -27 * K ** 2 +
        18 * K * _ * C +
        _ ** 2 * C ** 2 -
        4 * _ ** 3 * K -
        4 * C ** 3;
    return !(O > 0 && te > 0);
  }
}
a($s, "testEllipseEllipse");
function Ki(t, e) {
  return ii(t, new Le(e.points()));
}
a(Ki, "testEllipseRect");
function ii(t, e) {
  let r = t.toMat2().inverse;
  return (
    (e = new Le(e.pts.map((i) => r.transform(i.sub(t.center))))),
    Ir(new Oe(b(), 1), e)
  );
}
a(ii, "testEllipsePolygon");
function en(t, e) {
  return t.x === e.x && t.y === e.y;
}
a(en, "testPointPoint");
function tn(t, e) {
  return e instanceof S
    ? en(e, t.pt)
    : e instanceof Oe
    ? Pr(e, t.pt)
    : e instanceof De
    ? ei(e, t.pt)
    : e instanceof me
    ? $r(e, t.pt)
    : e instanceof Le
    ? it(e, t.pt)
    : e instanceof st
    ? ri(e, t.pt)
    : !1;
}
a(tn, "testPointShape");
function rn(t, e) {
  return e instanceof S
    ? ei(t, e)
    : e instanceof Oe
    ? hr(t, e)
    : e instanceof De
    ? Zr(t, e) != null
    : e instanceof me
    ? _r(e, t)
    : e instanceof Le
    ? ti(t, e)
    : e instanceof st
    ? ji(e, t)
    : !1;
}
a(rn, "testLineShape");
function sn(t, e) {
  return e instanceof S
    ? Pr(t, e)
    : e instanceof Oe
    ? _s(t, e)
    : e instanceof De
    ? hr(e, t)
    : e instanceof me
    ? Li(e, t)
    : e instanceof Le
    ? Ir(t, e)
    : e instanceof st
    ? vr(e, t)
    : !1;
}
a(sn, "testCircleShape");
function nn(t, e) {
  return e instanceof S
    ? $r(t, e)
    : e instanceof Oe
    ? Li(t, e)
    : e instanceof De
    ? _r(t, e)
    : e instanceof me
    ? Ni(t, e)
    : e instanceof Le
    ? qi(t, e)
    : e instanceof st
    ? Ki(e, t)
    : !1;
}
a(nn, "testRectShape");
function on(t, e) {
  return e instanceof S
    ? it(t, e)
    : e instanceof Oe
    ? Ir(e, t)
    : e instanceof De
    ? ti(e, t)
    : e instanceof me
    ? qi(e, t)
    : e instanceof Le
    ? Gi(e, t)
    : e instanceof st
    ? ii(e, t)
    : !1;
}
a(on, "testPolygonShape");
function an(t, e) {
  return e instanceof S
    ? ri(t, e)
    : e instanceof Oe
    ? vr(t, e)
    : e instanceof De
    ? ji(t, e)
    : e instanceof me
    ? Ki(t, e)
    : e instanceof Le
    ? ii(t, e)
    : e instanceof st
    ? $s(e, t)
    : !1;
}
a(an, "testEllipseShape");
function Yi(t, e, r) {
  let i = t,
    s = r.p1,
    n = r.p2,
    o = e,
    h = n.sub(s),
    l = o.cross(h);
  if (Math.abs(l) < Number.EPSILON) return null;
  let c = s.sub(i),
    u = c.cross(h) / l;
  if (u <= 0 || u >= 1) return null;
  let d = c.cross(o) / l;
  if (d <= 0 || d >= 1) return null;
  let g = h.normal().unit();
  return (
    e.dot(g) > 0 && ((g.x *= -1), (g.y *= -1)),
    { point: i.add(o.scale(u)), normal: g, fraction: u }
  );
}
a(Yi, "raycastLine");
function ln(t, e, r) {
  let i = Number.NEGATIVE_INFINITY,
    s = Number.POSITIVE_INFINITY,
    n;
  if (t.x != 0) {
    let o = (r.pos.x - t.x) / e.x,
      h = (r.pos.x + r.width - t.x) / e.x;
    (n = b(-Math.sign(e.x), 0)),
      (i = Math.max(i, Math.min(o, h))),
      (s = Math.min(s, Math.max(o, h)));
  }
  if (t.y != 0) {
    let o = (r.pos.y - t.y) / e.y,
      h = (r.pos.y + r.height - t.y) / e.y;
    Math.min(o, h) > i && (n = b(0, -Math.sign(e.y))),
      (i = Math.max(i, Math.min(o, h))),
      (s = Math.min(s, Math.max(o, h)));
  }
  return s >= i && i >= 0 && i <= 1
    ? { point: t.add(e.scale(i)), normal: n, fraction: i }
    : null;
}
a(ln, "raycastRect");
function Hi(t, e, r) {
  let i = t,
    s = r.center,
    n = e,
    o = n.dot(n),
    h = i.sub(s),
    l = 2 * n.dot(h),
    c = h.dot(h) - r.radius * r.radius,
    u = l * l - 4 * o * c;
  if (o <= Number.EPSILON || u < 0) return null;
  if (u == 0) {
    let d = -l / (2 * o);
    if (d >= 0 && d <= 1) {
      let g = i.add(n.scale(d));
      return { point: g, normal: g.sub(s), fraction: d };
    }
  } else {
    let d = (-l + Math.sqrt(u)) / (2 * o),
      g = (-l - Math.sqrt(u)) / (2 * o),
      w = null;
    if (
      (d >= 0 && d <= 1 && (w = d),
      g >= 0 && g <= 1 && (w = Math.min(g, w ?? g)),
      w != null)
    ) {
      let m = i.add(n.scale(w));
      return { point: m, normal: m.sub(s).unit(), fraction: w };
    }
  }
  return null;
}
a(Hi, "raycastCircle");
function un(t, e, r) {
  let i = r.pts,
    s = null,
    n = i[i.length - 1];
  for (let o = 0; o < i.length; o++) {
    let h = i[o],
      l = Yi(t, e, new De(n, h));
    l && (!s || s.fraction > l.fraction) && (s = l), (n = h);
  }
  return s;
}
a(un, "raycastPolygon");
function hn(t, e, r) {
  let i = r.toMat2(),
    s = i.inverse,
    n = s.transform(t.sub(r.center)),
    o = s.transform(e),
    h = Hi(n, o, new Oe(b(), 1));
  if (h) {
    let l = Kr.rotation(ge(-r.angle)),
      c = Kr.scale(r.radiusX, r.radiusY).transform(h.point),
      u = i.transform(h.point).add(r.center),
      d = u.dist(t) / e.len();
    return {
      point: u,
      normal: l.transform(b(r.radiusY ** 2 * c.x, r.radiusX ** 2 * c.y)).unit(),
      fraction: d,
    };
  }
  return h;
}
a(hn, "raycastEllipse");
function cn(t, e, r, i = 64) {
  let s = t,
    n = e.len(),
    o = e.scale(1 / n),
    h = 0,
    l = b(Math.floor(t.x), Math.floor(t.y)),
    c = b(o.x > 0 ? 1 : -1, o.y > 0 ? 1 : -1),
    u = b(Math.abs(1 / o.x), Math.abs(1 / o.y)),
    d = b(
      c.x > 0 ? l.x + 1 - t.x : t.x - l.x,
      c.y > 0 ? l.y + 1 - t.y : t.y - l.y
    ),
    g = b(u.x < 1 / 0 ? u.x * d.x : 1 / 0, u.y < 1 / 0 ? u.y * d.y : 1 / 0),
    w = -1;
  for (; h <= i; ) {
    let m = r(l);
    if (m === !0)
      return {
        point: s.add(o.scale(h)),
        normal: b(w === 0 ? -c.x : 0, w === 1 ? -c.y : 0),
        fraction: h / n,
        gridPos: l,
      };
    if (m) return m;
    g.x < g.y
      ? ((l.x += c.x), (h = g.x), (g.x += u.x), (w = 0))
      : ((l.y += c.y), (h = g.y), (g.y += u.y), (w = 1));
  }
  return null;
}
a(cn, "raycastGrid");
var pt,
  ml =
    ((pt = class {
      constructor(e) {
        x(this, "pt");
        this.pt = e.clone();
      }
      transform(e) {
        return new pt(e.multVec2(this.pt));
      }
      bbox() {
        return new me(this.pt, 0, 0);
      }
      area() {
        return 0;
      }
      clone() {
        return new pt(this.pt);
      }
      collides(e) {
        return tn(this, e);
      }
      contains(e) {
        return this.pt.eq(e);
      }
      raycast(e, r) {
        return null;
      }
      random() {
        return this.pt.clone();
      }
    }),
    a(pt, "Point"),
    pt),
  gt,
  De =
    ((gt = class {
      constructor(e, r) {
        x(this, "p1");
        x(this, "p2");
        (this.p1 = e.clone()), (this.p2 = r.clone());
      }
      transform(e) {
        return new gt(e.multVec2(this.p1), e.multVec2(this.p2));
      }
      bbox() {
        return me.fromPoints(this.p1, this.p2);
      }
      area() {
        return this.p1.dist(this.p2);
      }
      clone() {
        return new gt(this.p1, this.p2);
      }
      collides(e) {
        return rn(this, e);
      }
      contains(e) {
        return this.collides(e);
      }
      raycast(e, r) {
        return Yi(e, r, this);
      }
      random() {
        return this.p1.add(this.p2.sub(this.p1).scale(ye(1)));
      }
    }),
    a(gt, "Line"),
    gt),
  mt,
  me =
    ((mt = class {
      constructor(e, r, i) {
        x(this, "pos");
        x(this, "width");
        x(this, "height");
        (this.pos = e.clone()), (this.width = r), (this.height = i);
      }
      static fromPoints(e, r) {
        return new mt(e.clone(), r.x - e.x, r.y - e.y);
      }
      center() {
        return new S(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
      }
      points() {
        return [
          this.pos,
          this.pos.add(this.width, 0),
          this.pos.add(this.width, this.height),
          this.pos.add(0, this.height),
        ];
      }
      transform(e) {
        return new Le(this.points().map((r) => e.multVec2(r)));
      }
      bbox() {
        return this.clone();
      }
      area() {
        return this.width * this.height;
      }
      clone() {
        return new mt(this.pos.clone(), this.width, this.height);
      }
      distToPoint(e) {
        return Math.sqrt(this.sdistToPoint(e));
      }
      sdistToPoint(e) {
        let r = this.pos,
          i = this.pos.add(this.width, this.height),
          s = Math.max(r.x - e.x, 0, e.x - i.x),
          n = Math.max(r.y - e.y, 0, e.y - i.y);
        return s * s + n * n;
      }
      collides(e) {
        return nn(this, e);
      }
      contains(e) {
        return this.collides(e);
      }
      raycast(e, r) {
        return ln(e, r, this);
      }
      random() {
        return this.pos.add(ye(this.width), ye(this.height));
      }
    }),
    a(mt, "Rect"),
    mt),
  Mt,
  Oe =
    ((Mt = class {
      constructor(e, r) {
        x(this, "center");
        x(this, "radius");
        (this.center = e.clone()), (this.radius = r);
      }
      transform(e) {
        return new st(this.center, this.radius, this.radius).transform(e);
      }
      bbox() {
        return me.fromPoints(
          this.center.sub(b(this.radius)),
          this.center.add(b(this.radius))
        );
      }
      area() {
        return this.radius * this.radius * Math.PI;
      }
      clone() {
        return new Mt(this.center, this.radius);
      }
      collides(e) {
        return sn(this, e);
      }
      contains(e) {
        return this.collides(e);
      }
      raycast(e, r) {
        return Hi(e, r, this);
      }
      random() {
        return this.center.add(S.fromAngle(ye(360)).scale(ye(this.radius)));
      }
    }),
    a(Mt, "Circle"),
    Mt),
  je,
  st =
    ((je = class {
      constructor(e, r, i, s = 0) {
        x(this, "center");
        x(this, "radiusX");
        x(this, "radiusY");
        x(this, "angle");
        (this.center = e.clone()),
          (this.radiusX = r),
          (this.radiusY = i),
          (this.angle = s);
      }
      static fromMat2(e) {
        let r = e.inverse,
          i = r.transpose.mul(r),
          [s, n] = i.eigenvalues,
          [o, h] = i.eigenvectors(s, n),
          [l, c] = [1 / Math.sqrt(s), 1 / Math.sqrt(n)];
        return l > c
          ? new je(b(), l, c, wt(Math.atan2(-o[1], o[0])))
          : new je(b(), c, l, wt(Math.atan2(-h[1], h[0])));
      }
      toMat2() {
        let e = ge(this.angle),
          r = Math.cos(e),
          i = Math.sin(e);
        return new Kr(
          r * this.radiusX,
          -i * this.radiusY,
          i * this.radiusX,
          r * this.radiusY
        );
      }
      transform(e) {
        if (this.angle == 0 && e.getRotation() == 0)
          return new je(
            e.multVec2(this.center),
            e.m[0] * this.radiusX,
            e.m[5] * this.radiusY
          );
        {
          let r = this.toMat2(),
            i = e.getRotation(),
            s = e.getScale();
          r = gr.fromMat2(r).scale(s.x, s.y).rotate(i).toMat2();
          let n = je.fromMat2(r);
          return (n.center = e.multVec2(this.center)), n;
        }
      }
      bbox() {
        if (this.angle == 0)
          return me.fromPoints(
            this.center.sub(b(this.radiusX, this.radiusY)),
            this.center.add(b(this.radiusX, this.radiusY))
          );
        {
          let e = ge(this.angle),
            r = Math.cos(e),
            i = Math.sin(e),
            s = this.radiusX * r,
            n = this.radiusX * i,
            o = this.radiusY * i,
            h = this.radiusY * r,
            l = Math.sqrt(s * s + o * o),
            c = Math.sqrt(n * n + h * h);
          return me.fromPoints(
            this.center.sub(b(l, c)),
            this.center.add(b(l, c))
          );
        }
      }
      area() {
        return this.radiusX * this.radiusY * Math.PI;
      }
      clone() {
        return new je(this.center, this.radiusX, this.radiusY, this.angle);
      }
      collides(e) {
        return an(this, e);
      }
      contains(e) {
        e = e.sub(this.center);
        let r = ge(this.angle),
          i = Math.cos(r),
          s = Math.sin(r),
          n = e.x * i + e.y * s,
          o = -e.x * s + e.y * i;
        return (
          (n * n) / (this.radiusX * this.radiusX) +
            (o * o) / (this.radiusY * this.radiusY) <
          1
        );
      }
      raycast(e, r) {
        return hn(e, r, this);
      }
      random() {
        return this.center;
      }
    }),
    a(je, "Ellipse"),
    je);
function dn(t, e, r, i) {
  let s = e.sub(t),
    n = i.sub(r),
    o = s.cross(n);
  return (o < 1e-5 && o > -1e-5) ||
    ((o = r.sub(t).cross(n) / o), o < 0 || o > 1)
    ? null
    : t.add(s.scale(o));
}
a(dn, "segmentLineIntersection");
var We,
  Le =
    ((We = class {
      constructor(e) {
        x(this, "pts");
        if (e.length < 3)
          throw new Error("Polygons should have at least 3 vertices");
        this.pts = e;
      }
      transform(e) {
        return new We(this.pts.map((r) => e.multVec2(r)));
      }
      bbox() {
        let e = b(Number.MAX_VALUE),
          r = b(-Number.MAX_VALUE);
        for (let i of this.pts)
          (e.x = Math.min(e.x, i.x)),
            (r.x = Math.max(r.x, i.x)),
            (e.y = Math.min(e.y, i.y)),
            (r.y = Math.max(r.y, i.y));
        return me.fromPoints(e, r);
      }
      area() {
        let e = 0,
          r = this.pts.length;
        for (let i = 0; i < r; i++) {
          let s = this.pts[i],
            n = this.pts[(i + 1) % r];
          (e += s.x * n.y * 0.5), (e -= n.x * s.y * 0.5);
        }
        return Math.abs(e);
      }
      clone() {
        return new We(this.pts.map((e) => e.clone()));
      }
      collides(e) {
        return on(this, e);
      }
      contains(e) {
        return this.collides(e);
      }
      raycast(e, r) {
        return un(e, r, this);
      }
      random() {
        return b();
      }
      cut(e, r) {
        new De(e, r);
        let i = [],
          s = [],
          n = r.sub(e),
          o = this.pts[this.pts.length - 1],
          h = o.sub(e),
          l = n.cross(h) > 0;
        return (
          this.pts.forEach((c) => {
            h = c.sub(e);
            let u = n.cross(h) > 0;
            if (l != u) {
              let d = dn(o, c, e, r);
              i.push(d), s.push(d), (l = u);
            }
            (u ? i : s).push(c), (o = c);
          }),
          [i.length ? new We(i) : null, s.length ? new We(s) : null]
        );
      }
    }),
    a(We, "Polygon"),
    We);
function fn(t, e, r, i) {
  let s = i * i,
    n = 1 - i,
    o = n * n;
  return t
    .scale(o)
    .add(e.scale(2 * n * i))
    .add(r.scale(s));
}
a(fn, "evaluateQuadratic");
function pn(t, e, r, i) {
  let s = 1 - i;
  return e
    .sub(t)
    .scale(2 * s)
    .add(r.sub(e).scale(2 * i));
}
a(pn, "evaluateQuadraticFirstDerivative");
function gn(t, e, r, i) {
  return r.sub(e.scale(2)).add(t).scale(2);
}
a(gn, "evaluateQuadraticSecondDerivative");
function si(t, e, r, i, s) {
  let n = s * s,
    o = n * s,
    h = 1 - s,
    l = h * h,
    c = l * h;
  return t
    .scale(c)
    .add(e.scale(3 * l * s))
    .add(r.scale(3 * h * n))
    .add(i.scale(o));
}
a(si, "evaluateBezier");
function mn(t, e, r, i, s) {
  let n = s * s,
    o = 1 - s,
    h = o * o;
  return e
    .sub(t)
    .scale(3 * h)
    .add(r.sub(e).scale(6 * o * s))
    .add(i.sub(r).scale(3 * n));
}
a(mn, "evaluateBezierFirstDerivative");
function wn(t, e, r, i, s) {
  let n = 1 - s;
  return r
    .sub(e.scale(2))
    .add(t)
    .scale(6 * n)
    .add(
      i
        .sub(r.scale(2))
        .add(e)
        .scale(6 * s)
    );
}
a(wn, "evaluateBezierSecondDerivative");
function yn(t, e, r, i, s) {
  let n = 0.5 * (((-s + 2) * s - 1) * s),
    o = 0.5 * ((3 * s - 5) * s * s + 2),
    h = 0.5 * (((-3 * s + 4) * s + 1) * s),
    l = 0.5 * ((s - 1) * s * s);
  return t.scale(n).add(e.scale(o)).add(r.scale(h)).add(i.scale(l));
}
a(yn, "evaluateCatmullRom");
function An(t, e, r, i, s) {
  let n = 0.5 * ((-3 * s + 4) * s - 1),
    o = 0.5 * ((9 * s - 10) * s),
    h = 0.5 * ((-9 * s + 8) * s + 1),
    l = 0.5 * ((3 * s - 2) * s);
  return t.scale(n).add(e.scale(o)).add(r.scale(h)).add(i.scale(l));
}
a(An, "evaluateCatmullRomFirstDerivative");
function vn(t) {
  let e = zi(t),
    r = e(1);
  return (i) => {
    let s = i * r,
      n = e(s, !0);
    return t(n);
  };
}
a(vn, "normalizedCurve");
function zi(t, e = 10, r = 10) {
  let i = [0],
    s = [0],
    n = 1 / (e - 1) / r,
    o = 0,
    h = t(0),
    l = 0;
  for (let c = 1; c < e; c++) {
    for (let u = 0; u < r; u++) {
      l += n;
      let d = t(l),
        g = d.dist(h);
      (o += g), (h = d);
    }
    (i[c] = o), (s[c] = l);
  }
  return (
    (s[e - 1] = 1),
    (c, u = !1) => {
      if (u) {
        let d = c;
        if (d <= 0) return 0;
        if (d >= o) return 1;
        let g = 0;
        for (; i[g + 1] < d; ) g++;
        let w = s[g],
          m = s[g + 1],
          y = i[g],
          V = i[g + 1],
          R = (d - y) / (V - y);
        return w + (m - w) * R;
      } else {
        if (c <= 0) return 0;
        if (c >= 1) return i[e - 1];
        let d = 0;
        for (; s[d + 1] < c; ) d++;
        let g = s[d],
          w = s[d + 1],
          m = i[d],
          y = i[d + 1],
          V = (c - g) / (w - g);
        return m + (y - m) * V;
      }
    }
  );
}
a(zi, "curveLengthApproximation");
function cr(t, e, r, i) {
  let s = 2 * t + e - 2 * i + r,
    n = -3 * t + 3 * i - 2 * e - r,
    o = e,
    h = t;
  return (l) => {
    let c = l * l,
      u = c * l;
    return s * u + n * c + o * l + h;
  };
}
a(cr, "hermite");
function Qi(t, e, r, i, s, n = cr) {
  let o = n(e.x, (1 - s) * (r.x - t.x), (1 - s) * (i.x - e.x), r.x),
    h = n(e.y, (1 - s) * (r.y - t.y), (1 - s) * (i.y - e.y), r.y);
  return (l) => new S(o(l), h(l));
}
a(Qi, "cardinal");
function xr(t, e, r, i, s = cr) {
  return Qi(t, e, r, i, 0.5, s);
}
a(xr, "catmullRom");
function xn(t, e, r, i, s = cr) {
  return xr(i.add(t.sub(e).scale(6)), t, i, t.add(i.sub(r).scale(6)), s);
}
a(xn, "bezier");
function Vn(t, e, r, i, s, n, o, h = cr) {
  let l = h(
      e.x,
      0.5 * (1 - s) * (1 + o) * (1 + n) * (e.x - t.x) +
        0.5 * (1 - s) * (1 - o) * (1 - n) * (r.x - e.x),
      0.5 * (1 - s) * (1 + o) * (1 - n) * (r.x - e.x) +
        0.5 * (1 - s) * (1 - o) * (1 + n) * (i.x - r.x),
      r.x
    ),
    c = h(
      e.y,
      0.5 * (1 - s) * (1 + o) * (1 + n) * (e.y - t.y) +
        0.5 * (1 - s) * (1 - o) * (1 - n) * (r.y - e.y),
      0.5 * (1 - s) * (1 + o) * (1 - n) * (r.y - e.y) +
        0.5 * (1 - s) * (1 - o) * (1 + n) * (i.y - r.y),
      r.y
    );
  return (u) => new S(l(u), c(u));
}
a(Vn, "kochanekBartels");
function bn(t, e, r, i) {
  let s = 2 * t + e - 2 * i + r,
    n = -3 * t + 3 * i - 2 * e + r,
    o = e;
  return (h) => {
    let l = h * h;
    return 3 * s * l + 2 * n * h + o;
  };
}
a(bn, "hermiteFirstDerivative");
function Ct(t) {
  return 0 <= t && t <= 1;
}
a(Ct, "inZeroOneDomain");
function Lr(t, e) {
  return Math.abs(t - e) <= Number.EPSILON;
}
a(Lr, "approximately");
function kt(t) {
  return t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
}
a(kt, "cubeRoot");
function En(t, e, r, i) {
  let s = 3 * t - 6 * e + 3 * r,
    n = -3 * t + 3 * e,
    o = t,
    h = -t + 3 * e - 3 * r + i;
  if (Lr(h, 0)) {
    if (Lr(s, 0)) return Lr(n, 0) ? [] : [-o / n].filter(Ct);
    let V = Math.sqrt(n * n - 4 * s * o),
      R = 2 * s;
    return [(V - n) / R, (-n - V) / R].filter(Ct);
  }
  (s /= h), (n /= h), (o /= h);
  let l = (3 * n - s * s) / 3,
    c = l / 3,
    u = (2 * s * s * s - 9 * s * n + 27 * o) / 27,
    d = u / 2,
    g = d * d + c * c * c;
  if (g < 0) {
    let V = -l / 3,
      R = V * V * V,
      k = Math.sqrt(R),
      q = -u / (2 * k),
      Y = q < -1 ? -1 : q > 1 ? 1 : q,
      F = Math.acos(Y),
      A = 2 * kt(k),
      v = A * Math.cos(F / 3) - s / 3,
      B = A * Math.cos((F + 2 * Math.PI) / 3) - s / 3,
      I = A * Math.cos((F + 4 * Math.PI) / 3) - s / 3;
    return [v, B, I].filter(Ct);
  }
  if (g === 0) {
    let V = d < 0 ? kt(-d) : -kt(d),
      R = 2 * V - s / 3,
      k = -V - s / 3;
    return [R, k].filter(Ct);
  }
  let w = Math.sqrt(g),
    m = kt(w - d),
    y = kt(w + d);
  return [m - y - s / 3].filter(Ct);
}
a(En, "getCubicRoots");
function Sn(t, e, r, i, s) {
  let n = En(t.x - s, e.x - s, r.x - s, i.x - s);
  return n.length > 0 ? si(t, e, r, i, n[0]).y : NaN;
}
a(Sn, "cubicBezierYforX");
function Mn(t) {
  if (!t || t.length == 0)
    throw new Error("Need at least one point for easingLinear.");
  let e = t.length;
  return (r) => {
    if (r <= 0 || t.length == 1 || r <= t[0].x) return t[0].y;
    for (let i = 0; i < e; i++)
      if (t[i].x >= r) return Ke(r, t[i - 1].x, t[i].x, t[i - 1].y, t[i].y);
    return t[t.length - 1].y;
  };
}
a(Mn, "easingLinear");
function Rn(t, e) {
  return (r) => Sn(b(0, 0), t, e, b(1, 1), r);
}
a(Rn, "easingCubicBezier");
function Bn(t, e = "jump-end") {
  let r = 1 / t,
    i = e == "jump-start" || e == "jump-both",
    s = e == "jump-end" || e == "jump-both",
    n = 1 / (t + (s ? 1 : 0)),
    o = i ? n : 0;
  return (h) => {
    let l = Math.floor(h / r);
    return o + l * n;
  };
}
a(Bn, "easingSteps");
function Pn(t, e) {
  let r = Number.MAX_VALUE,
    i = { normal: b(0), distance: 0 };
  for (let s of [t, e])
    for (let n = 0; n < s.pts.length; n++) {
      let o = s.pts[n],
        h = s.pts[(n + 1) % s.pts.length].sub(o).normal().unit(),
        l = Number.MAX_VALUE,
        c = -Number.MAX_VALUE;
      for (let w = 0; w < t.pts.length; w++) {
        let m = t.pts[w].dot(h);
        (l = Math.min(l, m)), (c = Math.max(c, m));
      }
      let u = Number.MAX_VALUE,
        d = -Number.MAX_VALUE;
      for (let w = 0; w < e.pts.length; w++) {
        let m = e.pts[w].dot(h);
        (u = Math.min(u, m)), (d = Math.max(d, m));
      }
      let g = Math.min(c, d) - Math.max(l, u);
      if (g < 0) return null;
      if (g < Math.abs(r)) {
        let w = d - l,
          m = u - c;
        (r = Math.abs(w) < Math.abs(m) ? w : m),
          (i.normal = h),
          (i.distance = r);
      }
    }
  return i;
}
a(Pn, "sat");
function Wi(t, e, r) {
  return (e.x - t.x) * (r.y - t.y) - (e.y - t.y) * (r.x - t.x) >= 0;
}
a(Wi, "isOrientedCcw");
function In(t) {
  let e = 0,
    r = t[t.length - 1];
  for (let i = 0; i < t.length; i++)
    (e += (t[i].x - r.x) * (t[i].y + r.y)), (r = t[i]);
  return e < 0;
}
a(In, "isOrientedCcwPolygon");
function qr(t, e, r, i) {
  let s = i.x - r.x,
    n = i.y - r.y,
    o = s * (t.y - r.y) - n * (t.x - r.x),
    h = s * (e.y - r.y) - n * (e.x - r.x);
  return o * h >= 0;
}
a(qr, "onSameSide");
function Tn(t, e, r, i) {
  return qr(t, e, r, i) && qr(t, r, e, i) && qr(t, i, e, r);
}
a(Tn, "pointInTriangle");
function Dn(t, e, r, i) {
  for (let s of t)
    if (s !== e && s !== r && s !== i && Tn(s, e, r, i)) return !0;
  return !1;
}
a(Dn, "someInTriangle");
function Fn(t, e, r, i) {
  return Wi(t, e, r) && !Dn(i, t, e, r);
}
a(Fn, "isEar");
function Xi(t) {
  if (t.length < 3) return [];
  if (t.length == 3) return [t];
  let e = [],
    r = [],
    i = 0;
  for (let d = 0; d < t.length; d++) {
    let g = t[i],
      w = t[d];
    (w.x < g.x || (w.x == g.x && w.y < g.y)) && (i = i),
      (e[d] = d + 1),
      (r[d] = d - 1);
  }
  (e[e.length - 1] = 0), (r[0] = r.length - 1), In(t) || ([e, r] = [r, e]);
  let s = [];
  for (let d = 0; d < t.length; ++d) Wi(t[r[d]], t[d], t[e[d]]) || s.push(t[d]);
  let n = [],
    o = t.length,
    h = 1,
    l = 0,
    c,
    u;
  for (; o > 3; ) {
    (c = e[h]), (u = r[h]);
    let d = t[u],
      g = t[h],
      w = t[c];
    if (Fn(d, g, w, s))
      n.push([d, g, w]),
        (e[u] = c),
        (r[c] = u),
        s.splice(s.indexOf(g), 1),
        --o,
        (l = 0);
    else if (++l > o) return [];
    h = c;
  }
  return (c = e[h]), (u = r[h]), n.push([t[u], t[h], t[c]]), n;
}
a(Xi, "triangulate");
function Cn(t) {
  if (t.length < 3) return !1;
  let e = t.length - 2,
    r = t.length - 1,
    i = 0,
    s = t[r].sub(t[e]),
    n = t[i].sub(t[r]),
    o = s.cross(n);
  for (; i + 1 < t.length; )
    if (
      ((e = r),
      (r = i),
      i++,
      (s = t[r].sub(t[e])),
      (n = t[i].sub(t[r])),
      s.cross(n) * o < 0)
    )
      return !1;
  return !0;
}
a(Cn, "isConvex");
var wl = a((t) => t[0] instanceof J, "arrayIsColor"),
  yl = a((t) => t[0] instanceof S, "arrayIsVec2"),
  Al = a((t) => typeof t[0] == "number", "arrayIsNumber");
function kn(t) {
  return (
    (t == null ? void 0 : t.prototype) &&
    Object.getOwnPropertyDescriptor(t.prototype, "constructor") !== void 0
  );
}
a(kn, "isClass");
var Gt,
  Un =
    ((Gt = class {
      constructor(e = (r, i) => r < i) {
        x(this, "_items");
        x(this, "_compareFn");
        (this._compareFn = e), (this._items = []);
      }
      insert(e) {
        this._items.push(e), this.moveUp(this._items.length - 1);
      }
      remove() {
        if (this._items.length === 0) return null;
        let e = this._items[0],
          r = this._items.pop();
        return (
          this._items.length !== 0 && ((this._items[0] = r), this.moveDown(0)),
          e
        );
      }
      clear() {
        this._items.splice(0, this._items.length);
      }
      moveUp(e) {
        for (; e > 0; ) {
          let r = Math.floor((e - 1) / 2);
          if (
            !this._compareFn(this._items[e], this._items[r]) &&
            this._items[e] >= this._items[r]
          )
            break;
          this.swap(e, r), (e = r);
        }
      }
      moveDown(e) {
        for (; e < Math.floor(this._items.length / 2); ) {
          let r = 2 * e + 1;
          if (
            (r < this._items.length - 1 &&
              !this._compareFn(this._items[r], this._items[r + 1]) &&
              ++r,
            this._compareFn(this._items[e], this._items[r]))
          )
            break;
          this.swap(e, r), (e = r);
        }
      }
      swap(e, r) {
        [this._items[e], this._items[r]] = [this._items[r], this._items[e]];
      }
      get length() {
        return this._items.length;
      }
    }),
    a(Gt, "BinaryHeap"),
    Gt);
function On(t) {
  let e = window.atob(t),
    r = e.length,
    i = new Uint8Array(r);
  for (let s = 0; s < r; s++) i[s] = e.charCodeAt(s);
  return i.buffer;
}
a(On, "base64ToArrayBuffer");
function Nn(t) {
  return On(t.split(",")[1]);
}
a(Nn, "dataURLToArrayBuffer");
function ni(t, e) {
  let r = document.createElement("a");
  (r.href = e), (r.download = t), r.click();
}
a(ni, "download");
function Ji(t, e) {
  ni(t, "data:text/plain;charset=utf-8," + e);
}
a(Ji, "downloadText");
function Ln(t, e) {
  Ji(t, JSON.stringify(e));
}
a(Ln, "downloadJSON");
function bi(t, e) {
  let r = URL.createObjectURL(e);
  ni(t, r), URL.revokeObjectURL(r);
}
a(bi, "downloadBlob");
var qn = a((t) => t.match(/^data:\w+\/\w+;base64,.+/), "isDataURL"),
  vl = a((t) => t.split(".").slice(0, -1).join("."), "getFileName");
function oi(t, e) {
  if (t === e) return !0;
  let r = typeof t,
    i = typeof e;
  if (r !== i) return !1;
  if (r === "object" && i === "object" && t !== null && e !== null) {
    if (Array.isArray(t) !== Array.isArray(e)) return !1;
    let s = Object.keys(t),
      n = Object.keys(e);
    if (s.length !== n.length) return !1;
    for (let o of s) {
      let h = t[o],
        l = e[o];
      if (!oi(h, l)) return !1;
    }
    return !0;
  }
  return !1;
}
a(oi, "deepEq");
var jt,
  Gn =
    ((jt = class extends Map {
      constructor() {
        super(...arguments);
        x(this, "lastID", 0);
      }
      push(r) {
        let i = this.lastID;
        return this.set(i, r), this.lastID++, i;
      }
      pushd(r) {
        let i = this.push(r);
        return () => this.delete(i);
      }
    }),
    a(jt, "Registry"),
    jt),
  Rt,
  dr =
    ((Rt = class {
      constructor(e) {
        x(this, "paused", !1);
        x(this, "cancel");
        this.cancel = e;
      }
      static join(e) {
        let r = new Rt(() => e.forEach((i) => i.cancel()));
        return (
          Object.defineProperty(r, "paused", {
            get: a(() => e[0].paused, "get"),
            set: a((i) => e.forEach((s) => (s.paused = i)), "set"),
          }),
          (r.paused = !1),
          r
        );
      }
    }),
    a(Rt, "KEventController"),
    Rt),
  Kt,
  Be =
    ((Kt = class {
      constructor() {
        x(this, "handlers", new Gn());
      }
      add(e) {
        let r = this.handlers.pushd((...s) => {
            i.paused || e(...s);
          }),
          i = new dr(r);
        return i;
      }
      addOnce(e) {
        let r = this.add((...i) => {
          r.cancel(), e(...i);
        });
        return r;
      }
      next() {
        return new Promise((e) => this.addOnce(e));
      }
      trigger(...e) {
        this.handlers.forEach((r) => r(...e));
      }
      numListeners() {
        return this.handlers.size;
      }
      clear() {
        this.handlers.clear();
      }
    }),
    a(Kt, "KEvent"),
    Kt),
  Yt,
  Vr =
    ((Yt = class {
      constructor() {
        x(this, "handlers", {});
        x(this, "registers", {});
      }
      on(e, r) {
        return (
          this.handlers[e] || (this.handlers[e] = new Be()),
          this.handlers[e].add(r)
        );
      }
      onOnce(e, r) {
        let i = this.on(e, (...s) => {
          i.cancel(), r(...s);
        });
        return i;
      }
      next(e) {
        return new Promise((r) => {
          this.onOnce(e, (...i) => r(i[0]));
        });
      }
      trigger(e, ...r) {
        this.handlers[e] && this.handlers[e].trigger(...r);
      }
      remove(e) {
        delete this.handlers[e];
      }
      clear() {
        this.handlers = {};
      }
      numListeners(e) {
        var r;
        return (
          ((r = this.handlers[e]) == null ? void 0 : r.numListeners()) ?? 0
        );
      }
    }),
    a(Yt, "KEventHandler"),
    Yt),
  xl = a(
    (t) => (t instanceof Error ? t.message : String(t)),
    "getErrorMessage"
  );
function Yr(t, e) {
  return Number(t.toFixed(e));
}
a(Yr, "toFixed");
function fe(t, e) {
  return (...r) => {
    let i = r.length;
    if (i === t.length) return t(...r);
    if (i === e.length) return e(...r);
  };
}
a(fe, "overload2");
var Vl = Object.freeze([
  776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520,
]);
function jn(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  let e = [],
    r = 0,
    i = 0;
  for (; r < t.length; ) {
    if (
      ((i += Kn(r + i, t)),
      Jn(t[r + i]) && i++,
      Qn(t[r + i]) && i++,
      Wn(t[r + i]) && i++,
      Zn(t[r + i]))
    ) {
      i++;
      continue;
    }
    e.push(t.substring(r, r + i)), (r += i), (i = 0);
  }
  return e;
}
a(jn, "runes");
function Kn(t, e) {
  let r = e[t];
  if (!Yn(r) || t === e.length - 1) return 1;
  let i = r + e[t + 1],
    s = e.substring(t + 2, t + 5);
  return Ei(i) && Ei(s)
    ? 4
    : Hn(i) && Xn(s)
    ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2
    : zn(s)
    ? 4
    : 2;
}
a(Kn, "nextUnits");
function Yn(t) {
  return t && bt(t[0].charCodeAt(0), 55296, 56319);
}
a(Yn, "isFirstOfSurrogatePair");
function Ei(t) {
  return bt(ai(t), 127462, 127487);
}
a(Ei, "isRegionalIndicator");
function Hn(t) {
  return bt(ai(t), 127988, 127988);
}
a(Hn, "isSubdivisionFlag");
function zn(t) {
  return bt(ai(t), 127995, 127999);
}
a(zn, "isFitzpatrickModifier");
function Qn(t) {
  return typeof t == "string" && bt(t.charCodeAt(0), 65024, 65039);
}
a(Qn, "isVariationSelector");
function Wn(t) {
  return typeof t == "string" && bt(t.charCodeAt(0), 8400, 8447);
}
a(Wn, "isDiacriticalMark");
function Xn(t) {
  let e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && bt(e, 917504, 917631);
}
a(Xn, "isSupplementarySpecialpurposePlane");
function Jn(t) {
  return typeof t == "string" && Vl.includes(t.charCodeAt(0));
}
a(Jn, "isGrapheme");
function Zn(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
a(Zn, "isZeroWidthJoiner");
function ai(t) {
  let e = t.charCodeAt(0) - 55296,
    r = t.charCodeAt(1) - 56320;
  return (e << 10) + r + 65536;
}
a(ai, "codePointFromSurrogatePair");
function bt(t, e, r) {
  return t >= e && t <= r;
}
a(bt, "betweenInclusive");
var Fe = a(
    (t, e) =>
      Array.isArray(t) ? (t == null ? void 0 : t.includes(e)) : t === e,
    "isEqOrIncludes"
  ),
  He = a(
    (t, e) => (Array.isArray(e) ? e.some((r) => t.has(r)) : t.has(e)),
    "setHasOrIncludes"
  ),
  vi = a((t, e, r) => {
    var i;
    t.has(e) ? (i = t.get(e)) == null || i.push(r) : t.set(e, [r]);
  }, "mapAddOrPush"),
  bl = (() => {
    let t = 0;
    return () => t++;
  })(),
  Gs = {
    "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
        17: "capture",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
    "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        9: "select",
        10: "lstick",
        16: "start",
      },
      sticks: { left: { x: 0, y: 1 } },
    },
    "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        9: "start",
        10: "lstick",
        16: "select",
      },
      sticks: { left: { x: 0, y: 1 } },
    },
    "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
        17: "capture",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
    default: {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
  },
  El = a(() => Ut.lastInputDevice, "getLastInputDeviceType"),
  Sl = a(() => {
    let t = Ut.buttons;
    for (let e in t) {
      let r = t[e].keyboard && [t[e].keyboard].flat(),
        i = t[e].gamepad && [t[e].gamepad].flat(),
        s = t[e].mouse && [t[e].mouse].flat();
      r &&
        r.forEach((n) => {
          vi(Ut.buttonsByKey, n, e);
        }),
        i &&
          i.forEach((n) => {
            vi(Ut.buttonsByGamepad, n, e);
          }),
        s &&
          s.forEach((n) => {
            vi(Ut.buttonsByMouse, n, e);
          });
    }
  }, "parseButtonBindings"),
  Ht,
  mr =
    ((Ht = class {
      constructor() {
        x(this, "pressed", new Set([]));
        x(this, "pressedRepeat", new Set([]));
        x(this, "released", new Set([]));
        x(this, "down", new Set([]));
      }
      update() {
        this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
      }
      press(e) {
        this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
      }
      pressRepeat(e) {
        this.pressedRepeat.add(e);
      }
      release(e) {
        this.down.delete(e), this.pressed.delete(e), this.released.add(e);
      }
    }),
    a(Ht, "ButtonState"),
    Ht),
  zt,
  Ml =
    ((zt = class {
      constructor() {
        x(this, "buttonState", new mr());
        x(this, "stickState", new Map());
      }
    }),
    a(zt, "GamepadState"),
    zt),
  Qt,
  Rl =
    ((Qt = class {
      constructor() {
        x(this, "dts", []);
        x(this, "timer", 0);
        x(this, "fps", 0);
      }
      tick(e) {
        this.dts.push(e),
          (this.timer += e),
          this.timer >= 1 &&
            ((this.timer = 0),
            (this.fps = Math.round(
              1 / (this.dts.reduce((r, i) => r + i) / this.dts.length)
            )),
            (this.dts = []));
      }
    }),
    a(Qt, "FPSCounter"),
    Qt),
  Ut,
  Bl = a((t) => {
    let e = t.buttons ?? {};
    return {
      canvas: t.canvas,
      buttons: e,
      buttonsByKey: new Map(),
      buttonsByMouse: new Map(),
      buttonsByGamepad: new Map(),
      loopID: null,
      stopped: !1,
      dt: 0,
      fixedDt: 1 / 50,
      restDt: 0,
      time: 0,
      realTime: 0,
      fpsCounter: new Rl(),
      timeScale: 1,
      skipTime: !1,
      isHidden: !1,
      numFrames: 0,
      mousePos: new S(0),
      mouseDeltaPos: new S(0),
      keyState: new mr(),
      mouseState: new mr(),
      mergedGamepadState: new Ml(),
      gamepadStates: new Map(),
      lastInputDevice: null,
      buttonState: new mr(),
      gamepads: [],
      charInputted: [],
      isMouseMoved: !1,
      lastWidth: t.canvas.offsetWidth,
      lastHeight: t.canvas.offsetHeight,
      events: new Vr(),
    };
  }, "initAppState"),
  Pl = a((t) => {
    if (!t.canvas) throw new Error("Please provide a canvas");
    let e = Bl(t);
    (Ut = e), Sl();
    function r() {
      return e.dt * e.timeScale;
    }
    a(r, "dt");
    function i() {
      return e.fixedDt * e.timeScale;
    }
    a(i, "fixedDt");
    function s() {
      return e.restDt * e.timeScale;
    }
    a(s, "restDt");
    function n() {
      return e.isHidden;
    }
    a(n, "isHidden");
    function o() {
      return e.time;
    }
    a(o, "time");
    function h() {
      return e.fpsCounter.fps;
    }
    a(h, "fps");
    function l() {
      return e.numFrames;
    }
    a(l, "numFrames");
    function c() {
      return e.canvas.toDataURL();
    }
    a(c, "screenshot");
    function u(p) {
      e.canvas.style.cursor = p;
    }
    a(u, "setCursor");
    function d() {
      return e.canvas.style.cursor;
    }
    a(d, "getCursor");
    function g(p) {
      if (p)
        try {
          let E = e.canvas.requestPointerLock();
          E.catch && E.catch((T) => console.error(T));
        } catch (E) {
          console.error(E);
        }
      else document.exitPointerLock();
    }
    a(g, "setCursorLocked");
    function w() {
      return !!document.pointerLockElement;
    }
    a(w, "isCursorLocked");
    function m(p) {
      p.requestFullscreen
        ? p.requestFullscreen()
        : p.webkitRequestFullscreen && p.webkitRequestFullscreen();
    }
    a(m, "enterFullscreen");
    function y() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    a(y, "exitFullscreen");
    function V(p = !0) {
      p ? m(e.canvas) : y();
    }
    a(V, "setFullscreen");
    function R() {
      return (
        document.fullscreenElement === e.canvas ||
        document.webkitFullscreenElement === e.canvas
      );
    }
    a(R, "isFullscreen");
    function k() {
      e.stopped = !0;
      let p = Object.entries(Ee),
        E = Object.entries(Ai),
        T = Object.entries(Or);
      for (let [L, Q] of p) e.canvas.removeEventListener(L, Q);
      for (let [L, Q] of E) document.removeEventListener(L, Q);
      for (let [L, Q] of T) window.removeEventListener(L, Q);
      Ls.disconnect();
    }
    a(k, "quit");
    function q(p, E) {
      e.loopID !== null && cancelAnimationFrame(e.loopID);
      let T = 0,
        L = 0,
        Q = a((et) => {
          if (e.stopped) return;
          if (document.visibilityState !== "visible") {
            e.loopID = requestAnimationFrame(Q);
            return;
          }
          let Se = et / 1e3,
            Me = Math.min(Se - e.realTime, 0.25),
            le = t.maxFPS ? 1 / t.maxFPS : 0;
          if (((e.realTime = Se), (L += Me), L > le)) {
            if (!e.skipTime) {
              for (T += L, e.dt = e.fixedDt, e.restDt = 0; T > e.fixedDt; )
                (T -= e.fixedDt), T < e.fixedDt && (e.restDt = T), p();
              (e.restDt = T),
                (e.dt = L),
                (e.time += r()),
                e.fpsCounter.tick(e.dt);
            }
            (L = 0), (e.skipTime = !1), e.numFrames++, Ds(), E(), Fs();
          }
          e.loopID = requestAnimationFrame(Q);
        }, "frame");
      Q(0);
    }
    a(q, "run");
    function Y() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    a(Y, "isTouchscreen");
    function F() {
      return e.mousePos.clone();
    }
    a(F, "mousePos");
    function A() {
      return e.mouseDeltaPos.clone();
    }
    a(A, "mouseDeltaPos");
    function v(p = "left") {
      return e.mouseState.pressed.has(p);
    }
    a(v, "isMousePressed");
    function B(p = "left") {
      return e.mouseState.down.has(p);
    }
    a(B, "isMouseDown");
    function I(p = "left") {
      return e.mouseState.released.has(p);
    }
    a(I, "isMouseReleased");
    function U() {
      return e.isMouseMoved;
    }
    a(U, "isMouseMoved");
    function N(p) {
      return p === void 0
        ? e.keyState.pressed.size > 0
        : He(e.keyState.pressed, p);
    }
    a(N, "isKeyPressed");
    function G(p) {
      return p === void 0
        ? e.keyState.pressedRepeat.size > 0
        : He(e.keyState.pressedRepeat, p);
    }
    a(G, "isKeyPressedRepeat");
    function H(p) {
      return p === void 0 ? e.keyState.down.size > 0 : He(e.keyState.down, p);
    }
    a(H, "isKeyDown");
    function z(p) {
      return p === void 0
        ? e.keyState.released.size > 0
        : He(e.keyState.released, p);
    }
    a(z, "isKeyReleased");
    function ne(p) {
      return p === void 0
        ? e.mergedGamepadState.buttonState.pressed.size > 0
        : He(e.mergedGamepadState.buttonState.pressed, p);
    }
    a(ne, "isGamepadButtonPressed");
    function Z(p) {
      return p === void 0
        ? e.mergedGamepadState.buttonState.down.size > 0
        : He(e.mergedGamepadState.buttonState.down, p);
    }
    a(Z, "isGamepadButtonDown");
    function X(p) {
      return p === void 0
        ? e.mergedGamepadState.buttonState.released.size > 0
        : He(e.mergedGamepadState.buttonState.released, p);
    }
    a(X, "isGamepadButtonReleased");
    function ee(p) {
      return p === void 0
        ? e.buttonState.pressed.size > 0
        : He(e.buttonState.pressed, p);
    }
    a(ee, "isButtonPressed");
    function _(p) {
      return p === void 0
        ? e.buttonState.down.size > 0
        : He(e.buttonState.down, p);
    }
    a(_, "isButtonDown");
    function C(p) {
      return p === void 0
        ? e.buttonState.released.size > 0
        : He(e.buttonState.released, p);
    }
    a(C, "isButtonReleased");
    function K(p) {
      var E;
      return (E = e.buttons) == null ? void 0 : E[p];
    }
    a(K, "getButton");
    function O(p, E) {
      e.buttons[p] = { ...e.buttons[p], ...E };
    }
    a(O, "setButton");
    function te(p) {
      return e.events.on("resize", p);
    }
    a(te, "onResize");
    let ce = fe(
        (p) => e.events.on("keyDown", p),
        (p, E) => e.events.on("keyDown", (T) => Fe(p, T) && E(T))
      ),
      re = fe(
        (p) => e.events.on("keyPress", (E) => p(E)),
        (p, E) => e.events.on("keyPress", (T) => Fe(p, T) && E(T))
      ),
      xe = fe(
        (p) => e.events.on("keyPressRepeat", p),
        (p, E) => e.events.on("keyPressRepeat", (T) => Fe(p, T) && E(T))
      ),
      at = fe(
        (p) => e.events.on("keyRelease", p),
        (p, E) => e.events.on("keyRelease", (T) => Fe(p, T) && E(T))
      ),
      pi = fe(
        (p) => e.events.on("mouseDown", (E) => p(E)),
        (p, E) => e.events.on("mouseDown", (T) => Fe(p, T) && E(T))
      ),
      gi = fe(
        (p) => e.events.on("mousePress", (E) => p(E)),
        (p, E) => e.events.on("mousePress", (T) => Fe(p, T) && E(T))
      ),
      mi = fe(
        (p) => e.events.on("mouseRelease", (E) => p(E)),
        (p, E) => e.events.on("mouseRelease", (T) => T === p && E(T))
      );
    function kr(p) {
      return e.events.on("mouseMove", () => p(F(), A()));
    }
    a(kr, "onMouseMove");
    function fr(p) {
      return e.events.on("charInput", p);
    }
    a(fr, "onCharInput");
    function qe(p) {
      return e.events.on("touchStart", p);
    }
    a(qe, "onTouchStart");
    function $e(p) {
      return e.events.on("touchMove", p);
    }
    a($e, "onTouchMove");
    function pr(p) {
      return e.events.on("touchEnd", p);
    }
    a(pr, "onTouchEnd");
    function be(p) {
      return e.events.on("scroll", p);
    }
    a(be, "onScroll");
    function Dt(p) {
      return e.events.on("hide", p);
    }
    a(Dt, "onHide");
    function Ye(p) {
      return e.events.on("show", p);
    }
    a(Ye, "onShow");
    let Ur = fe(
        (p) => e.events.on("gamepadButtonPress", (E) => p(E)),
        (p, E) => e.events.on("gamepadButtonPress", (T) => Fe(p, T) && E(T))
      ),
      il = fe(
        (p) => e.events.on("gamepadButtonDown", (E) => p(E)),
        (p, E) => e.events.on("gamepadButtonDown", (T) => Fe(p, T) && E(T))
      ),
      sl = fe(
        (p) => e.events.on("gamepadButtonRelease", (E) => p(E)),
        (p, E) => e.events.on("gamepadButtonRelease", (T) => Fe(p, T) && E(T))
      );
    function Rs(p, E) {
      return e.events.on("gamepadStick", (T, L) => T === p && E(L));
    }
    a(Rs, "onGamepadStick");
    function Bs(p) {
      e.events.on("gamepadConnect", p);
    }
    a(Bs, "onGamepadConnect");
    function Ps(p) {
      e.events.on("gamepadDisconnect", p);
    }
    a(Ps, "onGamepadDisconnect");
    function Is(p) {
      return e.mergedGamepadState.stickState.get(p) || new S(0);
    }
    a(Is, "getGamepadStick");
    function Ts() {
      return [...e.charInputted];
    }
    a(Ts, "charInputted");
    function wi() {
      return [...e.gamepads];
    }
    a(wi, "getGamepads");
    let nl = fe(
        (p) => e.events.on("buttonPress", (E) => p(E)),
        (p, E) => e.events.on("buttonPress", (T) => Fe(p, T) && E(T))
      ),
      ol = fe(
        (p) => e.events.on("buttonDown", (E) => p(E)),
        (p, E) => e.events.on("buttonDown", (T) => Fe(p, T) && E(T))
      ),
      al = fe(
        (p) => e.events.on("buttonRelease", (E) => p(E)),
        (p, E) => e.events.on("buttonRelease", (T) => Fe(p, T) && E(T))
      );
    function Ds() {
      e.events.trigger("input"),
        e.keyState.down.forEach((p) => e.events.trigger("keyDown", p)),
        e.mouseState.down.forEach((p) => e.events.trigger("mouseDown", p)),
        e.buttonState.down.forEach((p) => e.events.trigger("buttonDown", p)),
        ks();
    }
    a(Ds, "processInput");
    function Fs() {
      e.keyState.update(),
        e.mouseState.update(),
        e.buttonState.update(),
        e.mergedGamepadState.buttonState.update(),
        e.mergedGamepadState.stickState.forEach((p, E) => {
          e.mergedGamepadState.stickState.set(E, new S(0));
        }),
        (e.charInputted = []),
        (e.isMouseMoved = !1),
        (e.mouseDeltaPos = new S(0)),
        e.gamepadStates.forEach((p) => {
          p.buttonState.update(),
            p.stickState.forEach((E, T) => {
              p.stickState.set(T, new S(0));
            });
        });
    }
    a(Fs, "resetInput");
    function yi(p) {
      let E = {
        index: p.index,
        isPressed: a((T) => {
          var L;
          return (
            ((L = e.gamepadStates.get(p.index)) == null
              ? void 0
              : L.buttonState.pressed.has(T)) || !1
          );
        }, "isPressed"),
        isDown: a((T) => {
          var L;
          return (
            ((L = e.gamepadStates.get(p.index)) == null
              ? void 0
              : L.buttonState.down.has(T)) || !1
          );
        }, "isDown"),
        isReleased: a((T) => {
          var L;
          return (
            ((L = e.gamepadStates.get(p.index)) == null
              ? void 0
              : L.buttonState.released.has(T)) || !1
          );
        }, "isReleased"),
        getStick: a((T) => {
          var L;
          return (
            ((L = e.gamepadStates.get(p.index)) == null
              ? void 0
              : L.stickState.get(T)) || b()
          );
        }, "getStick"),
      };
      return (
        e.gamepads.push(E),
        e.gamepadStates.set(p.index, {
          buttonState: new mr(),
          stickState: new Map([
            ["left", new S(0)],
            ["right", new S(0)],
          ]),
        }),
        E
      );
    }
    a(yi, "registerGamepad");
    function Cs(p) {
      (e.gamepads = e.gamepads.filter((E) => E.index !== p.index)),
        e.gamepadStates.delete(p.index);
    }
    a(Cs, "removeGamepad");
    function ks() {
      var p, E, T;
      for (let L of navigator.getGamepads())
        L && !e.gamepadStates.has(L.index) && yi(L);
      for (let L of e.gamepads) {
        let Q = navigator.getGamepads()[L.index];
        if (!Q) continue;
        let et = (t.gamepads ?? {})[Q.id] ?? Gs[Q.id] ?? Gs.default,
          Se = e.gamepadStates.get(L.index);
        if (Se) {
          for (let Me = 0; Me < Q.buttons.length; Me++) {
            let le = et.buttons[Me],
              Re = Q.buttons[Me],
              Et = e.buttonsByGamepad.has(le);
            Re.pressed
              ? (Se.buttonState.down.has(le) ||
                  ((e.lastInputDevice = "gamepad"),
                  Et &&
                    ((p = e.buttonsByGamepad.get(le)) == null ||
                      p.forEach((lt) => {
                        e.buttonState.press(lt),
                          e.events.trigger("buttonPress", lt);
                      })),
                  e.mergedGamepadState.buttonState.press(le),
                  Se.buttonState.press(le),
                  e.events.trigger("gamepadButtonPress", le)),
                Et &&
                  ((E = e.buttonsByGamepad.get(le)) == null ||
                    E.forEach((lt) => {
                      e.buttonState.press(lt),
                        e.events.trigger("buttonDown", lt);
                    })),
                e.events.trigger("gamepadButtonDown", le))
              : Se.buttonState.down.has(le) &&
                (Et &&
                  ((T = e.buttonsByGamepad.get(le)) == null ||
                    T.forEach((lt) => {
                      e.buttonState.release(lt),
                        e.events.trigger("buttonRelease", lt);
                    })),
                e.mergedGamepadState.buttonState.release(le),
                Se.buttonState.release(le),
                e.events.trigger("gamepadButtonRelease", le));
          }
          for (let Me in et.sticks) {
            let le = et.sticks[Me];
            if (!le) continue;
            let Re = new S(Q.axes[le.x], Q.axes[le.y]);
            Se.stickState.set(Me, Re),
              e.mergedGamepadState.stickState.set(Me, Re),
              e.events.trigger("gamepadStick", Me, Re);
          }
        }
      }
    }
    a(ks, "processGamepad");
    let Ee = {},
      Ai = {},
      Or = {},
      Us = t.pixelDensity || window.devicePixelRatio || 1;
    Ee.mousemove = (p) => {
      let E = new S(p.offsetX, p.offsetY),
        T = new S(p.movementX, p.movementY);
      if (R()) {
        let L = e.canvas.width / Us,
          Q = e.canvas.height / Us,
          et = window.innerWidth,
          Se = window.innerHeight,
          Me = et / Se,
          le = L / Q;
        if (Me > le) {
          let Re = Se / Q,
            Et = (et - L * Re) / 2;
          (E.x = Ke(p.offsetX - Et, 0, L * Re, 0, L)),
            (E.y = Ke(p.offsetY, 0, Q * Re, 0, Q));
        } else {
          let Re = et / L,
            Et = (Se - Q * Re) / 2;
          (E.x = Ke(p.offsetX, 0, L * Re, 0, L)),
            (E.y = Ke(p.offsetY - Et, 0, Q * Re, 0, Q));
        }
      }
      e.events.onOnce("input", () => {
        (e.isMouseMoved = !0),
          (e.mousePos = E),
          (e.mouseDeltaPos = T),
          e.events.trigger("mouseMove");
      });
    };
    let Os = ["left", "middle", "right", "back", "forward"];
    (Ee.mousedown = (p) => {
      e.events.onOnce("input", () => {
        var T;
        let E = Os[p.button];
        E &&
          ((e.lastInputDevice = "mouse"),
          e.buttonsByMouse.has(E) &&
            ((T = e.buttonsByMouse.get(E)) == null ||
              T.forEach((L) => {
                e.buttonState.press(L), e.events.trigger("buttonPress", L);
              })),
          e.mouseState.press(E),
          e.events.trigger("mousePress", E));
      });
    }),
      (Ee.mouseup = (p) => {
        e.events.onOnce("input", () => {
          var T;
          let E = Os[p.button];
          E &&
            (e.buttonsByMouse.has(E) &&
              ((T = e.buttonsByMouse.get(E)) == null ||
                T.forEach((L) => {
                  e.buttonState.release(L),
                    e.events.trigger("buttonRelease", L);
                })),
            e.mouseState.release(E),
            e.events.trigger("mouseRelease", E));
        });
      });
    let ll = new Set([
        " ",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ]),
      Ns = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
        " ": "space",
      };
    (Ee.keydown = (p) => {
      ll.has(p.key) && p.preventDefault(),
        e.events.onOnce("input", () => {
          var T;
          let E = Ns[p.key] || p.key.toLowerCase();
          if (E === void 0) throw new Error(`Unknown key: ${p.key}`);
          E.length === 1
            ? (e.events.trigger("charInput", E), e.charInputted.push(E))
            : E === "space" &&
              (e.events.trigger("charInput", " "), e.charInputted.push(" ")),
            p.repeat
              ? (e.keyState.pressRepeat(E),
                e.events.trigger("keyPressRepeat", E))
              : ((e.lastInputDevice = "keyboard"),
                e.buttonsByKey.has(E) &&
                  ((T = e.buttonsByKey.get(E)) == null ||
                    T.forEach((L) => {
                      e.buttonState.press(L),
                        e.events.trigger("buttonPress", L);
                    })),
                e.keyState.press(E),
                e.events.trigger("keyPressRepeat", E),
                e.events.trigger("keyPress", E));
        });
    }),
      (Ee.keyup = (p) => {
        e.events.onOnce("input", () => {
          var T;
          let E = Ns[p.key] || p.key.toLowerCase();
          e.buttonsByKey.has(E) &&
            ((T = e.buttonsByKey.get(E)) == null ||
              T.forEach((L) => {
                e.buttonState.release(L), e.events.trigger("buttonRelease", L);
              })),
            e.keyState.release(E),
            e.events.trigger("keyRelease", E);
        });
      }),
      (Ee.touchstart = (p) => {
        p.preventDefault(),
          e.events.onOnce("input", () => {
            var L;
            let E = [...p.changedTouches],
              T = e.canvas.getBoundingClientRect();
            t.touchToMouse !== !1 &&
              ((e.mousePos = new S(E[0].clientX - T.x, E[0].clientY - T.y)),
              (e.lastInputDevice = "mouse"),
              e.buttonsByMouse.has("left") &&
                ((L = e.buttonsByMouse.get("left")) == null ||
                  L.forEach((Q) => {
                    e.buttonState.press(Q), e.events.trigger("buttonPress", Q);
                  })),
              e.mouseState.press("left"),
              e.events.trigger("mousePress", "left")),
              E.forEach((Q) => {
                e.events.trigger(
                  "touchStart",
                  new S(Q.clientX - T.x, Q.clientY - T.y),
                  Q
                );
              });
          });
      }),
      (Ee.touchmove = (p) => {
        p.preventDefault(),
          e.events.onOnce("input", () => {
            let E = [...p.changedTouches],
              T = e.canvas.getBoundingClientRect();
            if (t.touchToMouse !== !1) {
              let L = e.mousePos;
              (e.mousePos = new S(E[0].clientX - T.x, E[0].clientY - T.y)),
                (e.mouseDeltaPos = e.mousePos.sub(L)),
                e.events.trigger("mouseMove");
            }
            E.forEach((L) => {
              e.events.trigger(
                "touchMove",
                new S(L.clientX - T.x, L.clientY - T.y),
                L
              );
            });
          });
      }),
      (Ee.touchend = (p) => {
        e.events.onOnce("input", () => {
          var L;
          let E = [...p.changedTouches],
            T = e.canvas.getBoundingClientRect();
          t.touchToMouse !== !1 &&
            ((e.mousePos = new S(E[0].clientX - T.x, E[0].clientY - T.y)),
            (e.mouseDeltaPos = new S(0, 0)),
            e.buttonsByMouse.has("left") &&
              ((L = e.buttonsByMouse.get("left")) == null ||
                L.forEach((Q) => {
                  e.buttonState.release(Q),
                    e.events.trigger("buttonRelease", Q);
                })),
            e.mouseState.release("left"),
            e.events.trigger("mouseRelease", "left")),
            E.forEach((Q) => {
              e.events.trigger(
                "touchEnd",
                new S(Q.clientX - T.x, Q.clientY - T.y),
                Q
              );
            });
        });
      }),
      (Ee.touchcancel = (p) => {
        e.events.onOnce("input", () => {
          let E = [...p.changedTouches],
            T = e.canvas.getBoundingClientRect();
          t.touchToMouse !== !1 &&
            ((e.mousePos = new S(E[0].clientX - T.x, E[0].clientY - T.y)),
            e.mouseState.release("left"),
            e.events.trigger("mouseRelease", "left")),
            E.forEach((L) => {
              e.events.trigger(
                "touchEnd",
                new S(L.clientX - T.x, L.clientY - T.y),
                L
              );
            });
        });
      }),
      (Ee.wheel = (p) => {
        p.preventDefault(),
          e.events.onOnce("input", () => {
            e.events.trigger("scroll", new S(p.deltaX, p.deltaY));
          });
      }),
      (Ee.contextmenu = (p) => p.preventDefault()),
      (Ai.visibilitychange = () => {
        document.visibilityState === "visible"
          ? ((e.skipTime = !0), (e.isHidden = !1), e.events.trigger("show"))
          : ((e.isHidden = !0), e.events.trigger("hide"));
      }),
      (Or.gamepadconnected = (p) => {
        let E = yi(p.gamepad);
        e.events.onOnce("input", () => {
          e.events.trigger("gamepadConnect", E);
        });
      }),
      (Or.gamepaddisconnected = (p) => {
        let E = wi().filter((T) => T.index === p.gamepad.index)[0];
        Cs(p.gamepad),
          e.events.onOnce("input", () => {
            e.events.trigger("gamepadDisconnect", E);
          });
      });
    for (let [p, E] of Object.entries(Ee)) e.canvas.addEventListener(p, E);
    for (let [p, E] of Object.entries(Ai)) document.addEventListener(p, E);
    for (let [p, E] of Object.entries(Or)) window.addEventListener(p, E);
    let Ls = new ResizeObserver((p) => {
      for (let E of p)
        if (E.target === e.canvas) {
          if (
            e.lastWidth === e.canvas.offsetWidth &&
            e.lastHeight === e.canvas.offsetHeight
          )
            return;
          (e.lastWidth = e.canvas.offsetWidth),
            (e.lastHeight = e.canvas.offsetHeight),
            e.events.onOnce("input", () => {
              e.events.trigger("resize");
            });
        }
    });
    return (
      Ls.observe(e.canvas),
      {
        dt: r,
        fixedDt: i,
        restDt: s,
        time: o,
        run: q,
        canvas: e.canvas,
        fps: h,
        numFrames: l,
        quit: k,
        isHidden: n,
        setFullscreen: V,
        isFullscreen: R,
        setCursor: u,
        screenshot: c,
        getGamepads: wi,
        getCursor: d,
        setCursorLocked: g,
        isCursorLocked: w,
        isTouchscreen: Y,
        mousePos: F,
        mouseDeltaPos: A,
        isKeyDown: H,
        isKeyPressed: N,
        isKeyPressedRepeat: G,
        isKeyReleased: z,
        isMouseDown: B,
        isMousePressed: v,
        isMouseReleased: I,
        isMouseMoved: U,
        isGamepadButtonPressed: ne,
        isGamepadButtonDown: Z,
        isGamepadButtonReleased: X,
        getGamepadStick: Is,
        isButtonPressed: ee,
        isButtonDown: _,
        isButtonReleased: C,
        setButton: O,
        getButton: K,
        charInputted: Ts,
        onResize: te,
        onKeyDown: ce,
        onKeyPress: re,
        onKeyPressRepeat: xe,
        onKeyRelease: at,
        onMouseDown: pi,
        onMousePress: gi,
        onMouseRelease: mi,
        onMouseMove: kr,
        onCharInput: fr,
        onTouchStart: qe,
        onTouchMove: $e,
        onTouchEnd: pr,
        onScroll: be,
        onHide: Dt,
        onShow: Ye,
        onGamepadButtonDown: il,
        onGamepadButtonPress: Ur,
        onGamepadButtonRelease: sl,
        onGamepadStick: Rs,
        onGamepadConnect: Bs,
        onGamepadDisconnect: Ps,
        onButtonPress: nl,
        onButtonDown: ol,
        onButtonRelease: al,
        getLastInputDeviceType: El,
        events: e.events,
      }
    );
  }, "initApp");
function nt() {
  return D.dt() * ie.timeScale;
}
a(nt, "dt");
function _n() {
  return D.fixedDt() * ie.timeScale;
}
a(_n, "fixedDt");
function $n() {
  return D.restDt() * ie.timeScale;
}
a($n, "restDt");
function Tt(t) {
  switch (t) {
    case "topleft":
      return new S(-1, -1);
    case "top":
      return new S(0, -1);
    case "topright":
      return new S(1, -1);
    case "left":
      return new S(-1, 0);
    case "center":
      return new S(0, 0);
    case "right":
      return new S(1, 0);
    case "botleft":
      return new S(-1, 1);
    case "bot":
      return new S(0, 1);
    case "botright":
      return new S(1, 1);
    default:
      return t;
  }
}
a(Tt, "anchorPt");
function eo(t) {
  switch (t) {
    case "left":
      return 0;
    case "center":
      return 0.5;
    case "right":
      return 1;
    default:
      return 0;
  }
}
a(eo, "alignPt");
function to(t) {
  return t.createBuffer(1, 1, 44100);
}
a(to, "createEmptyAudioBuffer");
var Nr = 2.5949095,
  js = 1.70158 + 1,
  Ks = (2 * Math.PI) / 3,
  Ys = (2 * Math.PI) / 4.5,
  Gr = {
    linear: a((t) => t, "linear"),
    easeInSine: a((t) => 1 - Math.cos((t * Math.PI) / 2), "easeInSine"),
    easeOutSine: a((t) => Math.sin((t * Math.PI) / 2), "easeOutSine"),
    easeInOutSine: a((t) => -(Math.cos(Math.PI * t) - 1) / 2, "easeInOutSine"),
    easeInQuad: a((t) => t * t, "easeInQuad"),
    easeOutQuad: a((t) => 1 - (1 - t) * (1 - t), "easeOutQuad"),
    easeInOutQuad: a(
      (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
      "easeInOutQuad"
    ),
    easeInCubic: a((t) => t * t * t, "easeInCubic"),
    easeOutCubic: a((t) => 1 - Math.pow(1 - t, 3), "easeOutCubic"),
    easeInOutCubic: a(
      (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      "easeInOutCubic"
    ),
    easeInQuart: a((t) => t * t * t * t, "easeInQuart"),
    easeOutQuart: a((t) => 1 - Math.pow(1 - t, 4), "easeOutQuart"),
    easeInOutQuart: a(
      (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
      "easeInOutQuart"
    ),
    easeInQuint: a((t) => t * t * t * t * t, "easeInQuint"),
    easeOutQuint: a((t) => 1 - Math.pow(1 - t, 5), "easeOutQuint"),
    easeInOutQuint: a(
      (t) =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
      "easeInOutQuint"
    ),
    easeInExpo: a(
      (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
      "easeInExpo"
    ),
    easeOutExpo: a(
      (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      "easeOutExpo"
    ),
    easeInOutExpo: a(
      (t) =>
        t === 0
          ? 0
          : t === 1
          ? 1
          : t < 0.5
          ? Math.pow(2, 20 * t - 10) / 2
          : (2 - Math.pow(2, -20 * t + 10)) / 2,
      "easeInOutExpo"
    ),
    easeInCirc: a((t) => 1 - Math.sqrt(1 - Math.pow(t, 2)), "easeInCirc"),
    easeOutCirc: a((t) => Math.sqrt(1 - Math.pow(t - 1, 2)), "easeOutCirc"),
    easeInOutCirc: a(
      (t) =>
        t < 0.5
          ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
          : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
      "easeInOutCirc"
    ),
    easeInBack: a((t) => js * t * t * t - 1.70158 * t * t, "easeInBack"),
    easeOutBack: a(
      (t) => 1 + js * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2),
      "easeOutBack"
    ),
    easeInOutBack: a(
      (t) =>
        t < 0.5
          ? (Math.pow(2 * t, 2) * ((Nr + 1) * 2 * t - Nr)) / 2
          : (Math.pow(2 * t - 2, 2) * ((Nr + 1) * (t * 2 - 2) + Nr) + 2) / 2,
      "easeInOutBack"
    ),
    easeInElastic: a(
      (t) =>
        t === 0
          ? 0
          : t === 1
          ? 1
          : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * Ks),
      "easeInElastic"
    ),
    easeOutElastic: a(
      (t) =>
        t === 0
          ? 0
          : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * Ks) + 1,
      "easeOutElastic"
    ),
    easeInOutElastic: a(
      (t) =>
        t === 0
          ? 0
          : t === 1
          ? 1
          : t < 0.5
          ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * Ys)) / 2
          : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * Ys)) / 2 +
            1,
      "easeInOutElastic"
    ),
    easeInBounce: a((t) => 1 - Gr.easeOutBounce(1 - t), "easeInBounce"),
    easeOutBounce: a(
      (t) =>
        t < 1 / 2.75
          ? 7.5625 * t * t
          : t < 2 / 2.75
          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
          : t < 2.5 / 2.75
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375,
      "easeOutBounce"
    ),
    easeInOutBounce: a(
      (t) =>
        t < 0.5
          ? (1 - Gr.easeOutBounce(1 - 2 * t)) / 2
          : (1 + Gr.easeOutBounce(2 * t - 1)) / 2,
      "easeInOutBounce"
    ),
  },
  br = Gr;
function ro(t, e, r) {
  let i = [],
    s = e;
  for (i.push(s); s !== t; ) {
    if (((s = r.get(s)), s == null)) return null;
    i.push(s);
  }
  return i.reverse();
}
a(ro, "buildPath");
function io(t, e, r) {
  var o;
  let i = new Un((h, l) => h.cost < l.cost);
  i.insert({ cost: 0, node: e });
  let s = new Map();
  s.set(e, e);
  let n = new Map();
  for (n.set(e, 0); i.length !== 0; ) {
    let h = (o = i.remove()) == null ? void 0 : o.node;
    if (h === r) break;
    let l = t.getNeighbours(h);
    for (let c of l) {
      let u = (n.get(h) || 0) + t.getCost(h, c) + t.getHeuristic(c, r);
      (!n.has(c) || u < n.get(c)) &&
        (n.set(c, u), i.insert({ cost: u, node: c }), s.set(c, h));
    }
  }
  return ro(e, r, s);
}
a(io, "aStarSearch");
var Wt,
  Il =
    ((Wt = class {
      constructor(e, r, i) {
        x(this, "a");
        x(this, "b");
        x(this, "polygon");
        (this.a = e), (this.b = r), (this.polygon = new WeakRef(i));
      }
      isLeft(e, r) {
        return (
          (this.b.x - this.a.x) * (r - this.a.y) -
          (e - this.a.x) * (this.b.y - this.a.y)
        );
      }
      get middle() {
        return this.a.add(this.b).scale(0.5);
      }
    }),
    a(Wt, "NavEdge"),
    Wt),
  Xt,
  Tl =
    ((Xt = class {
      constructor(e) {
        x(this, "_edges");
        x(this, "_centroid");
        x(this, "_id");
        this._id = e;
      }
      get id() {
        return this._id;
      }
      set edges(e) {
        this._edges = e;
        let r = 0,
          i = 0,
          s = 0;
        for (let n of this._edges) {
          n.polygon = new WeakRef(this);
          let o = n.a.x * n.b.y - n.a.y * n.b.x;
          (r += (n.a.x + n.b.x) * o), (i += (n.a.y + n.b.y) * o), (s += o);
        }
        (s /= 2), (this._centroid = b(r / (6 * s), i / (6 * s)));
      }
      get edges() {
        return this._edges;
      }
      get centroid() {
        return this._centroid;
      }
      contains(e) {
        let r = !1;
        for (let i of this.edges)
          i.b.y > e.y != i.a.y > e.y &&
            e.x < ((i.a.x - i.b.x) * (e.y - i.b.y)) / (i.a.y - i.b.y) + i.b.x &&
            (r = !r);
        return r;
      }
    }),
    a(Xt, "NavPolygon"),
    Xt),
  Jt,
  Dl =
    ((Jt = class {
      constructor() {
        x(this, "_polygons");
        x(this, "_pointCache");
        x(this, "_edgeCache");
        (this._polygons = []), (this._pointCache = {}), (this._edgeCache = {});
      }
      _addPoint(e) {
        let r = this._pointCache[`${e.x}_${e.y}`];
        return (
          r || ((r = e.clone()), (this._pointCache[`${e.x}_${e.y}`] = r), r)
        );
      }
      _addEdge(e) {
        let r = `${e.a.x}_${e.a.y}-${e.b.x}_${e.b.y}`;
        return (this._edgeCache[r] = e), e;
      }
      _findEdge(e, r) {
        let i = `${e.x}_${e.y}-${r.x}_${r.y}`;
        return this._edgeCache[i];
      }
      _findCommonEdge(e, r) {
        for (let i of e.edges) {
          let s = this._findEdge(i.b, i.a);
          if (s && s.polygon.deref().id === r.id) return s;
        }
        return null;
      }
      addPolygon(e) {
        let r = new Tl(this._polygons.length),
          i = e.map((s, n) => new Il(s, e[(n + 1) % e.length], r));
        (r.edges = i), this._polygons.push(r);
        for (let s of r.edges) this._addEdge(s);
        return r;
      }
      addRect(e, r) {
        let i = this._addPoint(e),
          s = this._addPoint(e.add(r.x, 0)),
          n = this._addPoint(e.add(r)),
          o = this._addPoint(e.add(0, r.y));
        return this.addPolygon([i, s, n, o]);
      }
      _getLocation(e) {
        for (let r of this._polygons) if (r.contains(e)) return r;
        return null;
      }
      getNeighbours(e) {
        let r = [];
        for (let i of this._polygons[e].edges) {
          let s = this._findEdge(i.b, i.a);
          if (s) {
            let n = s.polygon.deref();
            n && r.push(n.id);
          }
        }
        return r;
      }
      getCost(e, r) {
        return 1;
      }
      getHeuristic(e, r) {
        let i = this._polygons[e],
          s = this._polygons[r],
          n = i.centroid.x - s.centroid.x,
          o = i.centroid.y - s.centroid.y;
        return Math.sqrt(n * n + o * o);
      }
      getPath(e, r) {
        return e === void 0 || r === void 0
          ? []
          : e === r
          ? [e, r]
          : io(this, e, r);
      }
      getWaypointPath(e, r, i) {
        let s = (i == null ? void 0 : i.type) || "centroids",
          n = this._getLocation(e),
          o = this._getLocation(r);
        if (n === void 0 || o === void 0) return [];
        let h = this.getPath(n.id, o.id);
        if (!h) return [];
        if (s === "edges") {
          let l = [];
          for (let c = 1; c < h.length; c++) {
            let u = this._polygons[h[c - 1]],
              d = this._polygons[h[c]],
              g = this._findCommonEdge(u, d);
            l.push(g.middle.add(d.centroid.sub(g.middle).unit().scale(4)));
          }
          return [e, ...l, r];
        } else
          return [
            e,
            ...h.slice(1, -1).map((l) => this._polygons[l].centroid),
            r,
          ];
      }
    }),
    a(Jt, "NavMesh"),
    Jt);
function wr(t) {
  let e = new Ze();
  return (
    t.pos && e.translate(t.pos),
    t.scale && e.scale(t.scale),
    t.angle && e.rotate(t.angle),
    t.parent ? e.mult(t.parent.transform) : e
  );
}
a(wr, "calcTransform");
function so(t) {
  return new S((t.x / Ae()) * 2 - 1, (-t.y / ve()) * 2 + 1);
}
a(so, "screen2ndc");
function Ot(t, e, r, i, s, n = 1) {
  (i = ge(i % 360)), (s = ge(s % 360)), s <= i && (s += Math.PI * 2);
  let o = [],
    h = Math.ceil(((s - i) / ge(8)) * n),
    l = (s - i) / h,
    c = b(Math.cos(i), Math.sin(i)),
    u = b(Math.cos(l), Math.sin(l));
  for (let d = 0; d <= h; d++)
    o.push(t.add(e * c.x, r * c.y)),
      (c = b(c.x * u.x - c.y * u.y, c.x * u.y + c.y * u.x));
  return o;
}
a(Ot, "getArcPts");
function no(...t) {
  let e = se(...t),
    r = t[3] ?? 1;
  (P.bgColor = e),
    (P.bgAlpha = r),
    P.ggl.gl.clearColor(e.r / 255, e.g / 255, e.b / 255, r);
}
a(no, "setBackground");
function oo() {
  var t, e;
  return (
    ((e = (t = P.bgColor) == null ? void 0 : t.clone) == null
      ? void 0
      : e.call(t)) ?? null
  );
}
a(oo, "getBackground");
function he(...t) {
  if (t[0] === void 0) return;
  let e = b(...t);
  (e.x === 0 && e.y === 0) || P.transform.translate(e);
}
a(he, "pushTranslate");
function Ce() {
  P.transformStack.push(P.transform.clone());
}
a(Ce, "pushTransform");
function ao(t) {
  P.transform = t.clone();
}
a(ao, "pushMatrix");
function lr(...t) {
  if (t[0] === void 0) return;
  let e = b(...t);
  (e.x === 1 && e.y === 1) || P.transform.scale(e);
}
a(lr, "pushScale");
function It(t) {
  t && P.transform.rotate(t);
}
a(It, "pushRotate");
function Pe() {
  P.transformStack.length > 0 && (P.transform = P.transformStack.pop());
}
a(Pe, "popTransform");
function Ie() {
  P.renderer.flush();
}
a(Ie, "flush");
function Ae() {
  return P.width;
}
a(Ae, "width");
function ve() {
  return P.height;
}
a(ve, "height");
function Zi() {
  return (P.viewport.width + P.viewport.height) / (P.width + P.height);
}
a(Zi, "getViewportScale");
function lo(t) {
  return new S(
    (t.x * P.viewport.width) / P.width,
    (t.y * P.viewport.height) / P.height
  );
}
a(lo, "contentToView");
function uo(t) {
  return new S(
    ((t.x - P.viewport.x) * Ae()) / P.viewport.width,
    ((t.y - P.viewport.y) * ve()) / P.viewport.height
  );
}
a(uo, "windowToContent");
function _i() {
  return uo(D.mousePos());
}
a(_i, "mousePos");
function Er() {
  return b(Ae() / 2, ve() / 2);
}
a(Er, "center");
var ho =
    " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  li = "topleft",
  Fl = "monospace",
  Hr = "monospace",
  Si = "linear",
  $i = [
    { name: "a_pos", size: 2 },
    { name: "a_uv", size: 2 },
    { name: "a_color", size: 4 },
  ],
  Cl = $i.reduce((t, e) => t + e.size, 0),
  co = 2048,
  kl = co * 4 * Cl,
  Ul = co * 6,
  Ol = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`,
  Nl = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`,
  Mi = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`,
  Ri = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`,
  Ll = new Set(["id", "require"]),
  ql = new Set([
    "add",
    "fixedUpdate",
    "update",
    "draw",
    "destroy",
    "inspect",
    "drawInspect",
  ]),
  Gl = /^\w+$/,
  jl = 200,
  Kl = 640,
  Yl = 65536,
  Zt,
  Hl =
    ((Zt = class {
      constructor(e, r, i) {
        x(this, "textures", []);
        x(this, "bigTextures", []);
        x(this, "canvas");
        x(this, "c2d");
        x(this, "x", 0);
        x(this, "y", 0);
        x(this, "curHeight", 0);
        x(this, "gfx");
        (this.gfx = e),
          (this.canvas = document.createElement("canvas")),
          (this.canvas.width = r),
          (this.canvas.height = i),
          (this.textures = [ct.fromImage(e, this.canvas)]),
          (this.bigTextures = []);
        let s = this.canvas.getContext("2d");
        if (!s) throw new Error("Failed to get 2d context");
        this.c2d = s;
      }
      add(e) {
        if (e.width > this.canvas.width || e.height > this.canvas.height) {
          let s = ct.fromImage(this.gfx, e);
          return this.bigTextures.push(s), [s, new ae(0, 0, 1, 1)];
        }
        this.x + e.width > this.canvas.width &&
          ((this.x = 0), (this.y += this.curHeight), (this.curHeight = 0)),
          this.y + e.height > this.canvas.height &&
            (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height),
            this.textures.push(ct.fromImage(this.gfx, this.canvas)),
            (this.x = 0),
            (this.y = 0),
            (this.curHeight = 0));
        let r = this.textures[this.textures.length - 1],
          i = new S(this.x, this.y);
        return (
          (this.x += e.width),
          e.height > this.curHeight && (this.curHeight = e.height),
          e instanceof ImageData
            ? this.c2d.putImageData(e, i.x, i.y)
            : this.c2d.drawImage(e, i.x, i.y),
          r.update(this.canvas),
          [
            r,
            new ae(
              i.x / this.canvas.width,
              i.y / this.canvas.height,
              e.width / this.canvas.width,
              e.height / this.canvas.height
            ),
          ]
        );
      }
      free() {
        for (let e of this.textures) e.free();
        for (let e of this.bigTextures) e.free();
      }
    }),
    a(Zt, "TexPacker"),
    Zt);
function Te(t) {
  return typeof t != "string" || qn(t) ? t : W.urlPrefix + t;
}
a(Te, "fixURL");
var Bt,
  Ne =
    ((Bt = class {
      constructor(e) {
        x(this, "loaded", !1);
        x(this, "data", null);
        x(this, "error", null);
        x(this, "onLoadEvents", new Be());
        x(this, "onErrorEvents", new Be());
        x(this, "onFinishEvents", new Be());
        e.then((r) => {
          (this.loaded = !0), (this.data = r), this.onLoadEvents.trigger(r);
        })
          .catch((r) => {
            if (((this.error = r), this.onErrorEvents.numListeners() > 0))
              this.onErrorEvents.trigger(r);
            else throw r;
          })
          .finally(() => {
            this.onFinishEvents.trigger(), (this.loaded = !0);
          });
      }
      static loaded(e) {
        let r = new Bt(Promise.resolve(e));
        return (r.data = e), (r.loaded = !0), r;
      }
      onLoad(e) {
        return (
          this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e),
          this
        );
      }
      onError(e) {
        return (
          this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e),
          this
        );
      }
      onFinish(e) {
        return this.loaded ? e() : this.onFinishEvents.add(e), this;
      }
      then(e) {
        return this.onLoad(e);
      }
      catch(e) {
        return this.onError(e);
      }
      finally(e) {
        return this.onFinish(e);
      }
    }),
    a(Bt, "Asset"),
    Bt),
  _t,
  Ft =
    ((_t = class {
      constructor() {
        x(this, "assets", new Map());
        x(this, "lastUID", 0);
      }
      add(e, r) {
        let i = e ?? this.lastUID++ + "",
          s = new Ne(r);
        return this.assets.set(i, s), s;
      }
      addLoaded(e, r) {
        let i = e ?? this.lastUID++ + "",
          s = Ne.loaded(r);
        return this.assets.set(i, s), s;
      }
      get(e) {
        return this.assets.get(e);
      }
      progress() {
        if (this.assets.size === 0) return 1;
        let e = 0;
        return (
          this.assets.forEach((r) => {
            r.loaded && e++;
          }),
          e / this.assets.size
        );
      }
    }),
    a(_t, "AssetBucket"),
    _t);
function ui(t) {
  return fetch(t).then((e) => {
    if (!e.ok) throw new Error(`Failed to fetch "${t}"`);
    return e;
  });
}
a(ui, "fetchURL");
function Tr(t) {
  return ui(t).then((e) => e.json());
}
a(Tr, "fetchJSON");
function fo(t) {
  return ui(t).then((e) => e.text());
}
a(fo, "fetchText");
function po(t) {
  return ui(t).then((e) => e.arrayBuffer());
}
a(po, "fetchArrayBuffer");
function go(t) {
  return t !== void 0 && (W.urlPrefix = t), W.urlPrefix;
}
a(go, "loadRoot");
function mo(t, e) {
  return W.custom.add(t, Tr(Te(e)));
}
a(mo, "loadJSON");
function Dr(t) {
  let e = new Image();
  return (
    (e.crossOrigin = "anonymous"),
    (e.src = t),
    new Promise((r, i) => {
      (e.onload = () => r(e)),
        (e.onerror = () => i(new Error(`Failed to load image from "${t}"`)));
    })
  );
}
a(Dr, "loadImg");
function yt() {
  let t = [W.sprites, W.sounds, W.shaders, W.fonts, W.bitmapFonts, W.custom];
  return t.reduce((e, r) => e + r.progress(), 0) / t.length;
}
a(yt, "loadProgress");
function wo(t) {
  return W.custom.get(t) ?? null;
}
a(wo, "getAsset");
function zr(t) {
  return W.custom.add(null, t);
}
a(zr, "load");
var zl = a(
    (t) => ({
      urlPrefix: "",
      sprites: new Ft(),
      fonts: new Ft(),
      bitmapFonts: new Ft(),
      sounds: new Ft(),
      shaders: new Ft(),
      custom: new Ft(),
      music: {},
      packer: new Hl(t, 2048, 2048),
      loaded: !1,
    }),
    "initAssets"
  ),
  Ql =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==",
  Xe,
  At =
    ((Xe = class {
      constructor(e, r, i = {}, s = null) {
        x(this, "tex");
        x(this, "frames", [new ae(0, 0, 1, 1)]);
        x(this, "anims", {});
        x(this, "slice9", null);
        (this.tex = e),
          r && (this.frames = r),
          (this.anims = i),
          (this.slice9 = s);
      }
      get width() {
        return this.tex.width * this.frames[0].w;
      }
      get height() {
        return this.tex.height * this.frames[0].h;
      }
      static from(e, r = {}) {
        return typeof e == "string"
          ? Xe.fromURL(e, r)
          : Promise.resolve(Xe.fromImage(e, r));
      }
      static fromImage(e, r = {}) {
        let [i, s] = W.packer.add(e),
          n = r.frames
            ? r.frames.map(
                (o) =>
                  new ae(s.x + o.x * s.w, s.y + o.y * s.h, o.w * s.w, o.h * s.h)
              )
            : ts(r.sliceX || 1, r.sliceY || 1, s.x, s.y, s.w, s.h);
        return new Xe(i, n, r.anims, r.slice9);
      }
      static fromURL(e, r = {}) {
        return Dr(e).then((i) => Xe.fromImage(i, r));
      }
    }),
    a(Xe, "SpriteData"),
    Xe);
function yr(t) {
  if (typeof t == "string") {
    let e = es(t);
    if (e) return e;
    if (yt() < 1) return null;
    throw new Error(`Sprite not found: ${t}`);
  } else {
    if (t instanceof At) return Ne.loaded(t);
    if (t instanceof Ne) return t;
    throw new Error(`Invalid sprite: ${t}`);
  }
}
a(yr, "resolveSprite");
function es(t) {
  return W.sprites.get(t) ?? null;
}
a(es, "getSprite");
function Lt(t, e, r = { sliceX: 1, sliceY: 1, anims: {} }) {
  return (
    (e = Te(e)),
    Array.isArray(e)
      ? e.some((i) => typeof i == "string")
        ? W.sprites.add(
            t,
            Promise.all(
              e.map((i) => (typeof i == "string" ? Dr(i) : Promise.resolve(i)))
            ).then((i) => Bi(i, r))
          )
        : W.sprites.addLoaded(t, Bi(e, r))
      : typeof e == "string"
      ? W.sprites.add(t, At.from(e, r))
      : W.sprites.addLoaded(t, At.fromImage(e, r))
  );
}
a(Lt, "loadSprite");
function ts(t = 1, e = 1, r = 0, i = 0, s = 1, n = 1) {
  let o = [],
    h = s / t,
    l = n / e;
  for (let c = 0; c < e; c++)
    for (let u = 0; u < t; u++) o.push(new ae(r + u * h, i + c * l, h, l));
  return o;
}
a(ts, "slice");
function Bi(t, e = {}) {
  let r = document.createElement("canvas"),
    i = t[0].width,
    s = t[0].height;
  (r.width = i * t.length), (r.height = s);
  let n = r.getContext("2d");
  if (!n) throw new Error("Failed to create canvas context");
  t.forEach((h, l) => {
    h instanceof ImageData
      ? n.putImageData(h, l * i, 0)
      : n.drawImage(h, l * i, 0);
  });
  let o = n.getImageData(0, 0, t.length * i, s);
  return At.fromImage(o, { ...e, sliceX: t.length, sliceY: 1 });
}
a(Bi, "createSpriteSheet");
function yo(t = "bean") {
  return Lt(t, Ql);
}
a(yo, "loadBean");
function Ao(t, e, r) {
  (e = Te(e)), (r = Te(r)), typeof e == "string" && !r && (r = vl(e) + ".json");
  let i = typeof r == "string" ? Tr(r) : Promise.resolve(r);
  return W.sprites.add(
    t,
    i.then((s) => {
      let n = s.meta.size,
        o = s.frames.map(
          (l) =>
            new ae(
              l.frame.x / n.w,
              l.frame.y / n.h,
              l.frame.w / n.w,
              l.frame.h / n.h
            )
        ),
        h = {};
      for (let l of s.meta.frameTags)
        l.from === l.to
          ? (h[l.name] = l.from)
          : (h[l.name] = {
              from: l.from,
              to: l.to,
              speed: 10,
              loop: !0,
              pingpong: l.direction === "pingpong",
            });
      return At.from(e, { frames: o, anims: h });
    })
  );
}
a(Ao, "loadAseprite");
var $t,
  jr =
    (($t = class {
      constructor(e, r = {}) {
        x(this, "fontface");
        x(this, "filter", Si);
        x(this, "outline", null);
        x(this, "size", 64);
        if (
          ((this.fontface = e),
          (this.filter = r.filter ?? Si),
          (this.size = r.size ?? 64),
          this.size > 256)
        )
          throw new Error("Max font size: 256");
        r.outline &&
          ((this.outline = { width: 1, color: se(0, 0, 0) }),
          typeof r.outline == "number"
            ? (this.outline.width = r.outline)
            : typeof r.outline == "object" &&
              (r.outline.width && (this.outline.width = r.outline.width),
              r.outline.color && (this.outline.color = r.outline.color)));
      }
    }),
    a($t, "FontData"),
    $t);
function rs(t) {
  if (!t) return rs(ue.font ?? Fl);
  if (typeof t == "string") {
    let e = ss(t),
      r = is(t);
    if (e) return e.data ?? e;
    if (r) return r.data ?? r;
    if (document.fonts.check(`64px ${t}`)) return t;
    if (yt() < 1) return null;
    throw new Error(`Font not found: ${t}`);
  } else if (t instanceof Ne) return t.data ? t.data : t;
  return t;
}
a(rs, "resolveFont");
function is(t) {
  return W.fonts.get(t) ?? null;
}
a(is, "getFont");
function vo(t, e, r = {}) {
  let i = Te(e),
    s = new FontFace(t, typeof e == "string" ? `url(${i})` : i);
  return (
    document.fonts.add(s),
    W.fonts.add(
      t,
      s
        .load()
        .catch((n) => {
          throw new Error(`Failed to load font from "${i}": ${n}`);
        })
        .then((n) => new jr(n, r))
    )
  );
}
a(vo, "loadFont");
function xo(t, e, r, i) {
  let s = t.width / e,
    n = {},
    o = i.split("").entries();
  for (let [h, l] of o) n[l] = new ae((h % s) * e, Math.floor(h / s) * r, e, r);
  return { tex: t, map: n, size: r };
}
a(xo, "makeFont");
function ss(t) {
  return W.bitmapFonts.get(t) ?? null;
}
a(ss, "getBitmapFont");
function Vo(t, e, r, i, s = {}) {
  let n = Te(e);
  return W.bitmapFonts.add(
    t,
    Dr(n).then((o) => xo(ct.fromImage(P.ggl, o, s), r, i, s.chars ?? ho))
  );
}
a(Vo, "loadBitmapFont");
function bo(t, e) {
  return (
    (e = Te(e)),
    W.sprites.add(
      t,
      new Promise(async (r) => {
        let i = typeof e == "string" ? await Tr(e) : e,
          s = await Promise.all(i.frames.map(Dr)),
          n = document.createElement("canvas");
        (n.width = i.width), (n.height = i.height * i.frames.length);
        let o = n.getContext("2d");
        if (!o) throw new Error("Failed to create canvas context");
        s.forEach((l, c) => {
          o.drawImage(l, 0, c * i.height);
        });
        let h = await Lt(null, n, { sliceY: i.frames.length, anims: i.anims });
        r(h);
      })
    )
  );
}
a(bo, "loadPedit");
var er,
  Wl =
    ((er = class {
      constructor(e, r, i, s) {
        x(this, "ctx");
        x(this, "glProgram");
        (this.ctx = e), e.onDestroy(() => this.free());
        let n = e.gl,
          o = n.createShader(n.VERTEX_SHADER),
          h = n.createShader(n.FRAGMENT_SHADER);
        if (!o || !h) throw new Error("Failed to create shader");
        n.shaderSource(o, r),
          n.shaderSource(h, i),
          n.compileShader(o),
          n.compileShader(h);
        let l = n.createProgram();
        if (
          ((this.glProgram = l),
          n.attachShader(l, o),
          n.attachShader(l, h),
          s.forEach((c, u) => n.bindAttribLocation(l, u, c)),
          n.linkProgram(l),
          !n.getProgramParameter(l, n.LINK_STATUS))
        ) {
          let c = n.getShaderInfoLog(o);
          if (c) throw new Error("VERTEX SHADER " + c);
          let u = n.getShaderInfoLog(h);
          if (u) throw new Error("FRAGMENT SHADER " + u);
        }
        n.deleteShader(o), n.deleteShader(h);
      }
      bind() {
        this.ctx.pushProgram(this.glProgram);
      }
      unbind() {
        this.ctx.popProgram();
      }
      send(e) {
        let r = this.ctx.gl;
        for (let i in e) {
          let s = e[i],
            n = r.getUniformLocation(this.glProgram, i);
          if (typeof s == "number") r.uniform1f(n, s);
          else if (s instanceof Ze)
            r.uniformMatrix4fv(n, !1, new Float32Array(s.m));
          else if (s instanceof J) r.uniform3f(n, s.r, s.g, s.b);
          else if (s instanceof S) r.uniform2f(n, s.x, s.y);
          else if (Array.isArray(s))
            s[0],
              Al(s)
                ? r.uniform1fv(n, s)
                : yl(s)
                ? r.uniform2fv(n, s.map((o) => [o.x, o.y]).flat())
                : wl(s) &&
                  r.uniform3fv(n, s.map((o) => [o.r, o.g, o.b]).flat());
          else throw new Error("Unsupported uniform data type");
        }
      }
      free() {
        this.ctx.gl.deleteProgram(this.glProgram);
      }
    }),
    a(er, "Shader"),
    er);
function hi(t, e = Mi, r = Ri) {
  let i = Ol.replace("{{user}}", e ?? Mi),
    s = Nl.replace("{{user}}", r ?? Ri);
  try {
    return new Wl(
      t,
      i,
      s,
      $i.map((n) => n.name)
    );
  } catch (n) {
    let o = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/,
      h = xl(n).match(o);
    if (!(h != null && h.groups)) throw n;
    let l = Number(h.groups.line) - 14,
      c = h.groups.msg.trim(),
      u = h.groups.type.toLowerCase();
    throw new Error(`${u} shader line ${l}: ${c}`);
  }
}
a(hi, "makeShader");
function Eo(t) {
  if (!t) return P.defShader;
  if (typeof t == "string") {
    let e = ns(t);
    if (e) return e.data ?? e;
    if (yt() < 1) return null;
    throw new Error(`Shader not found: ${t}`);
  } else if (t instanceof Ne) return t.data ? t.data : t;
  return t;
}
a(Eo, "resolveShader");
function ns(t) {
  return W.shaders.get(t) ?? null;
}
a(ns, "getShader");
function So(t, e, r) {
  return W.shaders.addLoaded(t, hi(P.ggl, e, r));
}
a(So, "loadShader");
function Mo(t, e, r) {
  (e = Te(e)), (r = Te(r));
  let i = a((n) => (n ? fo(n) : Promise.resolve(null)), "resolveUrl"),
    s = Promise.all([i(e), i(r)]).then(([n, o]) => hi(P.ggl, n, o));
  return W.shaders.add(t, s);
}
a(Mo, "loadShaderURL");
var rt,
  Sr =
    ((rt = class {
      constructor(e) {
        x(this, "buf");
        this.buf = e;
      }
      static fromArrayBuffer(e) {
        return new Promise((r, i) => pe.ctx.decodeAudioData(e, r, i)).then(
          (r) => new rt(r)
        );
      }
      static fromURL(e) {
        return qn(e)
          ? rt.fromArrayBuffer(Nn(e))
          : po(e).then((r) => rt.fromArrayBuffer(r));
      }
    }),
    a(rt, "SoundData"),
    rt);
function Ro(t) {
  if (typeof t == "string") {
    let e = os(t);
    if (e) return e;
    if (yt() < 1) return null;
    throw new Error(`Sound not found: ${t}`);
  } else {
    if (t instanceof Sr) return Ne.loaded(t);
    if (t instanceof Ne) return t;
    throw new Error(`Invalid sound: ${t}`);
  }
}
a(Ro, "resolveSound");
function os(t) {
  return W.sounds.get(t) ?? null;
}
a(os, "getSound");
function Bo(t, e) {
  return (
    (e = Te(e)),
    W.sounds.add(
      t,
      typeof e == "string" ? Sr.fromURL(e) : Sr.fromArrayBuffer(e)
    )
  );
}
a(Bo, "loadSound");
function Po(t, e) {
  let r = Te(e),
    i = new Audio(r);
  return (i.preload = "auto"), (W.music[t] = r);
}
a(Po, "loadMusic");
function as(t, e) {
  return (
    (t = Te(t)),
    zr(
      typeof e == "string"
        ? new Promise((r, i) => {
            Tr(e).then((s) => {
              as(t, s).then(r).catch(i);
            });
          })
        : At.from(t).then((r) => {
            let i = {};
            for (let s in e) {
              let n = e[s],
                o = r.frames[0],
                h = 2048 * o.w,
                l = 2048 * o.h,
                c = n.frames
                  ? n.frames.map(
                      (d) =>
                        new ae(
                          o.x + ((n.x + d.x) / h) * o.w,
                          o.y + ((n.y + d.y) / l) * o.h,
                          (d.w / h) * o.w,
                          (d.h / l) * o.h
                        )
                    )
                  : ts(
                      n.sliceX || 1,
                      n.sliceY || 1,
                      o.x + (n.x / h) * o.w,
                      o.y + (n.y / l) * o.h,
                      (n.width / h) * o.w,
                      (n.height / l) * o.h
                    ),
                u = new At(r.tex, c, n.anims);
              W.sprites.addLoaded(s, u), (i[s] = u);
            }
            return i;
          })
    )
  );
}
a(as, "loadSpriteAtlas");
function ot(t, e, r = !1, i, s, n = {}) {
  let o = i ?? P.defTex,
    h = s ?? P.defShader,
    l = Eo(h);
  if (!l || l instanceof Ne) return;
  let c = P.fixed || r ? P.transform : M.cam.transform.mult(P.transform),
    u = [];
  for (let d of t) {
    let g = so(c.multVec2(d.pos));
    u.push(
      g.x,
      g.y,
      d.uv.x,
      d.uv.y,
      d.color.r / 255,
      d.color.g / 255,
      d.color.b / 255,
      d.opacity
    );
  }
  P.renderer.push(P.ggl.gl.TRIANGLES, u, e, l, o, n);
}
a(ot, "drawRaw");
function ht(t) {
  if (!t.pts) throw new Error('drawPolygon() requires property "pts".');
  let e = t.pts.length;
  if (!(e < 3)) {
    if (
      (Ce(), he(t.pos), lr(t.scale), It(t.angle), he(t.offset), t.fill !== !1)
    ) {
      let r = t.color ?? J.WHITE,
        i = t.pts.map((n, o) => ({
          pos: new S(n.x, n.y),
          uv: t.uv ? t.uv[o] : new S(0, 0),
          color: t.colors && t.colors[o] ? t.colors[o].mult(r) : r,
          opacity: t.opacity ?? 1,
        })),
        s;
      t.triangulate
        ? (s = Xi(t.pts)
            .map((n) => n.map((o) => t.pts.indexOf(o)))
            .flat())
        : (s = [...Array(e - 2).keys()].map((n) => [0, n + 1, n + 2]).flat()),
        ot(
          i,
          t.indices ?? s,
          t.fixed,
          t.uv ? t.tex : P.defTex,
          t.shader,
          t.uniform ?? void 0
        );
    }
    t.outline &&
      ci({
        pts: [...t.pts, t.pts[0]],
        radius: t.radius,
        width: t.outline.width,
        color: t.outline.color,
        join: t.outline.join,
        uniform: t.uniform,
        fixed: t.fixed,
        opacity: t.opacity ?? t.outline.opacity,
      }),
      Pe();
  }
}
a(ht, "drawPolygon");
function ls(t) {
  if (t.radiusX === void 0 || t.radiusY === void 0)
    throw new Error(
      'drawEllipse() requires properties "radiusX" and "radiusY".'
    );
  if (t.radiusX === 0 || t.radiusY === 0) return;
  let e = t.start ?? 0,
    r = t.end ?? 360,
    i = Tt(t.anchor ?? "center").scale(new S(-t.radiusX, -t.radiusY)),
    s = Ot(i, t.radiusX, t.radiusY, e, r, t.resolution);
  s.unshift(i);
  let n = Object.assign({}, t, {
    pts: s,
    radius: 0,
    ...(t.gradient
      ? { colors: [t.gradient[0], ...Array(s.length - 1).fill(t.gradient[1])] }
      : {}),
  });
  if (r - e >= 360 && t.outline) {
    t.fill !== !1 && ht(Object.assign({}, n, { outline: null })),
      ht(Object.assign({}, n, { pts: s.slice(1), fill: !1 }));
    return;
  }
  ht(n);
}
a(ls, "drawEllipse");
function Fr(t) {
  if (typeof t.radius != "number")
    throw new Error('drawCircle() requires property "radius".');
  t.radius !== 0 &&
    ls(
      Object.assign({}, t, { radiusX: t.radius, radiusY: t.radius, angle: 0 })
    );
}
a(Fr, "drawCircle");
function Nt(t) {
  let { p1: e, p2: r } = t;
  if (!e || !r)
    throw new Error('drawLine() requires properties "p1" and "p2".');
  let i = t.width || 1,
    s = r
      .sub(e)
      .unit()
      .normal()
      .scale(i * 0.5),
    n = [e.sub(s), e.add(s), r.add(s), r.sub(s)].map((o) => ({
      pos: new S(o.x, o.y),
      uv: new S(0),
      color: t.color ?? J.WHITE,
      opacity: t.opacity ?? 1,
    }));
  ot(n, [0, 1, 3, 1, 2, 3], t.fixed, P.defTex, t.shader, t.uniform ?? void 0);
}
a(Nt, "drawLine");
function Io(t) {
  let e = t.pts,
    r = [],
    i = (t.width || 1) * 0.5,
    s = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
    n = t.pos || b(0, 0),
    o;
  s ? (o = e[0].sub(e[e.length - 2])) : (o = e[1].sub(e[0]));
  let h = o.len(),
    l = o.normal().scale(-i / h),
    c,
    u = e[0];
  if (!s)
    switch (t.cap) {
      case "square": {
        let m = o.scale(-i / h);
        r.push(u.add(m).add(l)), r.push(u.add(m).sub(l));
        break;
      }
      case "round": {
        let m = Math.max(i, 10),
          y = Math.PI / m,
          V = l.scale(-1),
          R = Math.cos(y),
          k = Math.sin(y);
        for (let q = 0; q < m; q++)
          r.push(u),
            r.push(u.sub(V)),
            (V = b(V.x * R - V.y * k, V.x * k + V.y * R));
      }
    }
  for (let m = 1; m < e.length; m++) {
    if (u === e[m] || u.eq(e[m])) continue;
    (c = u), (u = e[m]);
    let y = u.sub(c),
      V = y.len(),
      R = y.normal().scale(-i / V),
      k = o.cross(y);
    if (Math.abs(k) / (h * V) < 0.05) {
      r.push(c.add(l)),
        r.push(c.sub(l)),
        o.dot(y) < 0 && (r.push(c.sub(l)), r.push(c.add(l))),
        (o = y),
        (h = V),
        (l = R);
      continue;
    }
    let q = R.sub(l).cross(y) / k,
      Y = l.add(o.scale(q));
    k > 0
      ? (r.push(c.add(Y)), r.push(c.sub(l)), r.push(c.add(Y)), r.push(c.sub(R)))
      : (r.push(c.add(l)),
        r.push(c.sub(Y)),
        r.push(c.add(R)),
        r.push(c.sub(Y))),
      (o = y),
      (h = V),
      (l = R);
  }
  if (!s)
    switch ((r.push(u.add(l)), r.push(u.sub(l)), t.cap)) {
      case "square": {
        let m = o.scale(i / h);
        r.push(u.add(m).add(l)), r.push(u.add(m).sub(l));
        break;
      }
      case "round": {
        let m = Math.max(i, 10),
          y = Math.PI / m,
          V = l.scale(1),
          R = Math.cos(y),
          k = Math.sin(y);
        for (let q = 0; q < m; q++)
          (V = b(V.x * R - V.y * k, V.x * k + V.y * R)),
            r.push(u),
            r.push(u.sub(V));
      }
    }
  if (r.length < 4) return;
  let d = r.map((m) => ({
      pos: n.add(m),
      uv: b(),
      color: t.color || J.WHITE,
      opacity: t.opacity ?? 1,
    })),
    g = [],
    w = 0;
  for (let m = 0; m < r.length - 2; m += 2)
    (g[w++] = m + 1),
      (g[w++] = m),
      (g[w++] = m + 2),
      (g[w++] = m + 2),
      (g[w++] = m + 3),
      (g[w++] = m + 1);
  s &&
    ((g[w++] = r.length - 1),
    (g[w++] = r.length - 2),
    (g[w++] = 0),
    (g[w++] = 0),
    (g[w++] = 1),
    (g[w++] = r.length - 1)),
    ot(d, g, t.fixed, P.defTex, t.shader, t.uniform ?? void 0);
}
a(Io, "_drawLinesBevel");
function To(t) {
  let e = t.pts,
    r = [],
    i = (t.width || 1) * 0.5,
    s = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
    n = t.pos || b(0, 0),
    o;
  s ? (o = e[0].sub(e[e.length - 2])) : (o = e[1].sub(e[0]));
  let h = o.len(),
    l = o.normal().scale(-i / h),
    c,
    u = e[0];
  if (!s)
    switch (t.cap) {
      case "square": {
        let m = o.scale(-i / h);
        r.push(u.add(m).add(l)), r.push(u.add(m).sub(l));
        break;
      }
      case "round": {
        let m = Math.max(i, 10),
          y = Math.PI / m,
          V = l.scale(-1),
          R = Math.cos(y),
          k = Math.sin(y);
        for (let q = 0; q < m; q++)
          r.push(u),
            r.push(u.sub(V)),
            (V = b(V.x * R - V.y * k, V.x * k + V.y * R));
      }
    }
  for (let m = 1; m < e.length; m++) {
    if (u === e[m] || u.eq(e[m])) continue;
    (c = u), (u = e[m]);
    let y = u.sub(c),
      V = y.len(),
      R = y.normal().scale(-i / V),
      k = o.cross(y);
    if (Math.abs(k) / (h * V) < 0.05) {
      r.push(c.add(l)),
        r.push(c.sub(l)),
        o.dot(y) < 0 && (r.push(c.sub(l)), r.push(c.add(l))),
        (o = y),
        (h = V),
        (l = R);
      continue;
    }
    let q = R.sub(l).cross(y) / k,
      Y = l.add(o.scale(q));
    if (k > 0) {
      let F = c.add(Y),
        A = Math.max(i, 10),
        v = ge(l.angleBetween(R) / A),
        B = l,
        I = Math.cos(v),
        U = Math.sin(v);
      for (let N = 0; N < A; N++)
        r.push(F),
          r.push(c.sub(B)),
          (B = b(B.x * I - B.y * U, B.x * U + B.y * I));
    } else {
      let F = c.sub(Y),
        A = Math.max(i, 10),
        v = ge(l.angleBetween(R) / A),
        B = l,
        I = Math.cos(v),
        U = Math.sin(v);
      for (let N = 0; N < A; N++)
        r.push(c.add(B)),
          r.push(F),
          (B = b(B.x * I - B.y * U, B.x * U + B.y * I));
    }
    (o = y), (h = V), (l = R);
  }
  if (!s)
    switch ((r.push(u.add(l)), r.push(u.sub(l)), t.cap)) {
      case "square": {
        let m = o.scale(i / h);
        r.push(u.add(m).add(l)), r.push(u.add(m).sub(l));
        break;
      }
      case "round": {
        let m = Math.max(i, 10),
          y = Math.PI / m,
          V = l.scale(1),
          R = Math.cos(y),
          k = Math.sin(y);
        for (let q = 0; q < m; q++)
          (V = b(V.x * R - V.y * k, V.x * k + V.y * R)),
            r.push(u),
            r.push(u.sub(V));
      }
    }
  if (r.length < 4) return;
  let d = r.map((m) => ({
      pos: n.add(m),
      uv: b(),
      color: t.color || J.WHITE,
      opacity: t.opacity ?? 1,
    })),
    g = [],
    w = 0;
  for (let m = 0; m < r.length - 2; m += 2)
    (g[w++] = m + 1),
      (g[w++] = m),
      (g[w++] = m + 2),
      (g[w++] = m + 2),
      (g[w++] = m + 3),
      (g[w++] = m + 1);
  s &&
    ((g[w++] = r.length - 1),
    (g[w++] = r.length - 2),
    (g[w++] = 0),
    (g[w++] = 0),
    (g[w++] = 1),
    (g[w++] = r.length - 1)),
    ot(d, g, t.fixed, P.defTex, t.shader, t.uniform ?? void 0);
}
a(To, "_drawLinesRound");
function Do(t) {
  let e = t.pts,
    r = [],
    i = (t.width || 1) * 0.5,
    s = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
    n = t.pos || b(0, 0),
    o;
  s ? (o = e[0].sub(e[e.length - 2])) : (o = e[1].sub(e[0]));
  let h = o.len(),
    l = o.normal().scale(-i / h),
    c,
    u = e[0];
  if (!s)
    switch (t.cap) {
      case "square": {
        let m = o.scale(-i / h);
        r.push(u.add(m).add(l)), r.push(u.add(m).sub(l));
        break;
      }
      case "round": {
        let m = Math.max(i, 10),
          y = Math.PI / m,
          V = l.scale(-1),
          R = Math.cos(y),
          k = Math.sin(y);
        for (let q = 0; q < m; q++)
          r.push(u),
            r.push(u.sub(V)),
            (V = b(V.x * R - V.y * k, V.x * k + V.y * R));
      }
    }
  for (let m = 1; m < e.length; m++) {
    if (u === e[m] || u.eq(e[m])) continue;
    (c = u), (u = e[m]);
    let y = u.sub(c),
      V = y.len(),
      R = y.normal().scale(-i / V),
      k = o.cross(y);
    if (Math.abs(k) / (h * V) < 0.05) {
      r.push(c.add(l)),
        r.push(c.sub(l)),
        o.dot(y) < 0 && (r.push(c.sub(l)), r.push(c.add(l))),
        (o = y),
        (h = V),
        (l = R);
      continue;
    }
    let q = R.sub(l).cross(y) / k,
      Y = l.add(o.scale(q));
    r.push(c.add(Y)), r.push(c.sub(Y)), (o = y), (h = V), (l = R);
  }
  if (!s)
    switch ((r.push(u.add(l)), r.push(u.sub(l)), t.cap)) {
      case "square": {
        let m = o.scale(i / h);
        r.push(u.add(m).add(l)), r.push(u.add(m).sub(l));
        break;
      }
      case "round": {
        let m = Math.max(i, 10),
          y = Math.PI / m,
          V = l.scale(1),
          R = Math.cos(y),
          k = Math.sin(y);
        for (let q = 0; q < m; q++)
          (V = b(V.x * R - V.y * k, V.x * k + V.y * R)),
            r.push(u),
            r.push(u.sub(V));
      }
    }
  if (r.length < 4) return;
  let d = r.map((m) => ({
      pos: n.add(m),
      uv: b(),
      color: t.color || J.WHITE,
      opacity: t.opacity ?? 1,
    })),
    g = [],
    w = 0;
  for (let m = 0; m < r.length - 2; m += 2)
    (g[w++] = m + 1),
      (g[w++] = m),
      (g[w++] = m + 2),
      (g[w++] = m + 2),
      (g[w++] = m + 3),
      (g[w++] = m + 1);
  s &&
    ((g[w++] = r.length - 1),
    (g[w++] = r.length - 2),
    (g[w++] = 0),
    (g[w++] = 0),
    (g[w++] = 1),
    (g[w++] = r.length - 1)),
    ot(d, g, t.fixed, P.defTex, t.shader, t.uniform ?? void 0);
}
a(Do, "_drawLinesMiter");
function ci(t) {
  let e = t.pts,
    r = t.width ?? 1;
  if (!e) throw new Error('drawLines() requires property "pts".');
  if (!(e.length < 2)) {
    if (e.length > 2)
      switch (t.join) {
        case "bevel":
          return Io(t);
        case "round":
          return To(t);
        case "miter":
          return Do(t);
      }
    if (t.radius && e.length >= 3) {
      Nt(Object.assign({}, t, { p1: e[0], p2: e[1] }));
      for (let i = 1; i < e.length - 2; i++) {
        let s = e[i],
          n = e[i + 1];
        Nt(Object.assign({}, t, { p1: s, p2: n }));
      }
      Nt(Object.assign({}, t, { p1: e[e.length - 2], p2: e[e.length - 1] }));
    } else
      for (let i = 0; i < e.length - 1; i++)
        Nt(Object.assign({}, t, { p1: e[i], p2: e[i + 1] })),
          t.join !== "none" &&
            Fr(Object.assign({}, t, { pos: e[i], radius: r / 2 }));
  }
}
a(ci, "drawLines");
function us(t, e) {
  let r = e.segments ?? 16,
    i = [];
  for (let s = 0; s <= r; s++) i.push(t(s / r));
  ci({
    pts: i,
    width: e.width || 1,
    pos: e.pos,
    color: e.color,
    opacity: e.opacity,
  });
}
a(us, "drawCurve");
function Fo(t) {
  us((e) => si(t.pt1, t.pt2, t.pt3, t.pt4, e), t);
}
a(Fo, "drawBezier");
var Pt,
  ct =
    ((Pt = class {
      constructor(e, r, i, s = {}) {
        x(this, "ctx");
        x(this, "src", null);
        x(this, "glTex");
        x(this, "width");
        x(this, "height");
        this.ctx = e;
        let n = e.gl,
          o = e.gl.createTexture();
        if (!o) throw new Error("Failed to create texture");
        (this.glTex = o),
          e.onDestroy(() => this.free()),
          (this.width = r),
          (this.height = i);
        let h = { linear: n.LINEAR, nearest: n.NEAREST }[
            s.filter ?? e.opts.texFilter ?? "nearest"
          ],
          l = { repeat: n.REPEAT, clampToEdge: n.CLAMP_TO_EDGE }[
            s.wrap ?? "clampToEdge"
          ];
        this.bind(),
          r &&
            i &&
            n.texImage2D(
              n.TEXTURE_2D,
              0,
              n.RGBA,
              r,
              i,
              0,
              n.RGBA,
              n.UNSIGNED_BYTE,
              null
            ),
          n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, h),
          n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, h),
          n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, l),
          n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, l),
          this.unbind();
      }
      static fromImage(e, r, i = {}) {
        let s = new Pt(e, r.width, r.height, i);
        return s.update(r), (s.src = r), s;
      }
      update(e, r = 0, i = 0) {
        let s = this.ctx.gl;
        this.bind(),
          s.texSubImage2D(s.TEXTURE_2D, 0, r, i, s.RGBA, s.UNSIGNED_BYTE, e),
          this.unbind();
      }
      bind() {
        this.ctx.pushTexture2D(this.glTex);
      }
      unbind() {
        this.ctx.popTexture2D();
      }
      free() {
        this.ctx.gl.deleteTexture(this.glTex);
      }
    }),
    a(Pt, "Texture"),
    Pt),
  tr,
  Qr =
    ((tr = class {
      constructor(e, r, i, s = {}) {
        x(this, "ctx");
        x(this, "tex");
        x(this, "glFramebuffer");
        x(this, "glRenderbuffer");
        this.ctx = e;
        let n = e.gl;
        e.onDestroy(() => this.free()), (this.tex = new ct(e, r, i, s));
        let o = n.createFramebuffer(),
          h = n.createRenderbuffer();
        if (!o || !h) throw new Error("Failed to create framebuffer");
        (this.glFramebuffer = o),
          (this.glRenderbuffer = h),
          this.bind(),
          n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, r, i),
          n.framebufferTexture2D(
            n.FRAMEBUFFER,
            n.COLOR_ATTACHMENT0,
            n.TEXTURE_2D,
            this.tex.glTex,
            0
          ),
          n.framebufferRenderbuffer(
            n.FRAMEBUFFER,
            n.DEPTH_STENCIL_ATTACHMENT,
            n.RENDERBUFFER,
            this.glRenderbuffer
          ),
          this.unbind();
      }
      get width() {
        return this.tex.width;
      }
      get height() {
        return this.tex.height;
      }
      toImageData() {
        let e = this.ctx.gl,
          r = new Uint8ClampedArray(this.width * this.height * 4);
        this.bind(),
          e.readPixels(
            0,
            0,
            this.width,
            this.height,
            e.RGBA,
            e.UNSIGNED_BYTE,
            r
          ),
          this.unbind();
        let i = this.width * 4,
          s = new Uint8Array(i);
        for (let n = 0; n < ((this.height / 2) | 0); n++) {
          let o = n * i,
            h = (this.height - n - 1) * i;
          s.set(r.subarray(o, o + i)), r.copyWithin(o, h, h + i), r.set(s, h);
        }
        return new ImageData(r, this.width, this.height);
      }
      toDataURL() {
        let e = document.createElement("canvas"),
          r = e.getContext("2d");
        if (((e.width = this.width), (e.height = this.height), !r))
          throw new Error("Failed to get 2d context");
        return r.putImageData(this.toImageData(), 0, 0), e.toDataURL();
      }
      clear() {
        let e = this.ctx.gl;
        e.clear(e.COLOR_BUFFER_BIT);
      }
      draw(e) {
        this.bind(), e(), this.unbind();
      }
      bind() {
        this.ctx.pushFramebuffer(this.glFramebuffer),
          this.ctx.pushRenderbuffer(this.glRenderbuffer),
          this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
      }
      unbind() {
        this.ctx.popFramebuffer(),
          this.ctx.popRenderbuffer(),
          this.ctx.popViewport();
      }
      free() {
        let e = this.ctx.gl;
        e.deleteFramebuffer(this.glFramebuffer),
          e.deleteRenderbuffer(this.glRenderbuffer),
          this.tex.free();
      }
    }),
    a(tr, "FrameBuffer"),
    tr),
  rr,
  Xl =
    ((rr = class {
      constructor(e, r, i, s) {
        x(this, "ctx");
        x(this, "glVBuf");
        x(this, "glIBuf");
        x(this, "vqueue", []);
        x(this, "iqueue", []);
        x(this, "stride");
        x(this, "maxVertices");
        x(this, "maxIndices");
        x(this, "vertexFormat");
        x(this, "numDraws", 0);
        x(this, "curPrimitive", null);
        x(this, "curTex", null);
        x(this, "curShader", null);
        x(this, "curUniform", {});
        let n = e.gl;
        (this.vertexFormat = r),
          (this.ctx = e),
          (this.stride = r.reduce((h, l) => h + l.size, 0)),
          (this.maxVertices = i),
          (this.maxIndices = s);
        let o = n.createBuffer();
        if (!o) throw new Error("Failed to create vertex buffer");
        (this.glVBuf = o),
          e.pushArrayBuffer(this.glVBuf),
          n.bufferData(n.ARRAY_BUFFER, i * 4, n.DYNAMIC_DRAW),
          e.popArrayBuffer(),
          (this.glIBuf = n.createBuffer()),
          e.pushElementArrayBuffer(this.glIBuf),
          n.bufferData(n.ELEMENT_ARRAY_BUFFER, s * 4, n.DYNAMIC_DRAW),
          e.popElementArrayBuffer();
      }
      push(e, r, i, s, n = null, o = {}) {
        (e !== this.curPrimitive ||
          n !== this.curTex ||
          s !== this.curShader ||
          !oi(this.curUniform, o) ||
          this.vqueue.length + r.length * this.stride > this.maxVertices ||
          this.iqueue.length + i.length > this.maxIndices) &&
          this.flush();
        let h = this.vqueue.length / this.stride;
        for (let l of r) this.vqueue.push(l);
        for (let l of i) this.iqueue.push(l + h);
        (this.curPrimitive = e),
          (this.curShader = s),
          (this.curTex = n),
          (this.curUniform = o);
      }
      flush() {
        var r, i;
        if (
          !this.curPrimitive ||
          !this.curShader ||
          this.vqueue.length === 0 ||
          this.iqueue.length === 0
        )
          return;
        let e = this.ctx.gl;
        this.ctx.pushArrayBuffer(this.glVBuf),
          e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)),
          this.ctx.pushElementArrayBuffer(this.glIBuf),
          e.bufferSubData(
            e.ELEMENT_ARRAY_BUFFER,
            0,
            new Uint16Array(this.iqueue)
          ),
          this.ctx.setVertexFormat(this.vertexFormat),
          this.curShader.bind(),
          this.curShader.send(this.curUniform),
          (r = this.curTex) == null || r.bind(),
          e.drawElements(
            this.curPrimitive,
            this.iqueue.length,
            e.UNSIGNED_SHORT,
            0
          ),
          (i = this.curTex) == null || i.unbind(),
          this.curShader.unbind(),
          this.ctx.popArrayBuffer(),
          this.ctx.popElementArrayBuffer(),
          (this.vqueue = []),
          (this.iqueue = []),
          this.numDraws++;
      }
      free() {
        let e = this.ctx.gl;
        e.deleteBuffer(this.glVBuf), e.deleteBuffer(this.glIBuf);
      }
    }),
    a(rr, "BatchRenderer"),
    rr);
function ut(t) {
  let e = [],
    r = a((n) => {
      e.push(n), t(n);
    }, "push"),
    i = a(() => {
      e.pop(), t(s() ?? null);
    }, "pop"),
    s = a(() => e[e.length - 1], "cur");
  return [r, i, s];
}
a(ut, "genStack");
function Co(t, e = {}) {
  let r = [];
  function i(F) {
    r.push(F);
  }
  a(i, "onDestroy");
  function s() {
    r.forEach((A) => A());
    let F = t.getExtension("WEBGL_lose_context");
    F && F.loseContext();
  }
  a(s, "destroy");
  let n = null;
  function o(F) {
    if (oi(F, n)) return;
    n = F;
    let A = F.reduce((v, B) => v + B.size, 0);
    F.reduce(
      (v, B, I) => (
        t.vertexAttribPointer(I, B.size, t.FLOAT, !1, A * 4, v),
        t.enableVertexAttribArray(I),
        v + B.size * 4
      ),
      0
    );
  }
  a(o, "setVertexFormat");
  let [h, l] = ut((F) => t.bindTexture(t.TEXTURE_2D, F)),
    [c, u] = ut((F) => t.bindBuffer(t.ARRAY_BUFFER, F)),
    [d, g] = ut((F) => t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, F)),
    [w, m] = ut((F) => t.bindFramebuffer(t.FRAMEBUFFER, F)),
    [y, V] = ut((F) => t.bindRenderbuffer(t.RENDERBUFFER, F)),
    [R, k] = ut((F) => {
      if (!F) return;
      let { x: A, y: v, w: B, h: I } = F;
      t.viewport(A, v, B, I);
    }),
    [q, Y] = ut((F) => t.useProgram(F));
  return (
    R({ x: 0, y: 0, w: t.drawingBufferWidth, h: t.drawingBufferHeight }),
    {
      gl: t,
      opts: e,
      onDestroy: i,
      destroy: s,
      pushTexture2D: h,
      popTexture2D: l,
      pushArrayBuffer: c,
      popArrayBuffer: u,
      pushElementArrayBuffer: d,
      popElementArrayBuffer: g,
      pushFramebuffer: w,
      popFramebuffer: m,
      pushRenderbuffer: y,
      popRenderbuffer: V,
      pushViewport: R,
      popViewport: k,
      pushProgram: q,
      popProgram: Y,
      setVertexFormat: o,
    }
  );
}
a(Co, "initGfx");
var xi = {};
function Pi(t, e) {
  e.pos && (t.pos = t.pos.add(e.pos)),
    e.scale && (t.scale = t.scale.scale(b(e.scale))),
    e.angle && (t.angle += e.angle),
    e.color && t.ch.length === 1 && (t.color = t.color.mult(e.color)),
    e.opacity && (t.opacity *= e.opacity);
}
a(Pi, "applyCharTransform");
function hs(t) {
  let e = {},
    r = "",
    i = [],
    s = 0,
    n = 0;
  for (let o = 0; o < t.length; o++)
    if (
      (o !== s + 1 && (n += o - s),
      (s = o),
      !(t[o] === "\\" && t[o + 1] === "["))
    ) {
      if ((o === 0 || t[o - 1] !== "\\") && t[o] === "[") {
        let h = o;
        o++;
        let l = t[o] === "/",
          c = "";
        for (l && o++; o < t.length && t[o] !== "]"; ) c += t[o++];
        if (
          !Gl.test(c) ||
          o >= t.length ||
          t[o] !== "]" ||
          (l && (i.length === 0 || i[i.length - 1][0] !== c))
        )
          o = h;
        else {
          l ? i.pop() : i.push([c, h]);
          continue;
        }
      }
      (r += t[o]), i.length > 0 && (e[o - n] = i.map(([h]) => h));
    }
  if (i.length > 0) {
    for (; i.length > 0; ) {
      let [o, h] = i.pop();
      t = t.substring(0, h) + "\\" + t.substring(h);
    }
    return hs(t);
  }
  return { charStyleMap: e, text: r };
}
a(hs, "compileStyledText");
function vt(t) {
  var k, q, Y;
  if (t.text === void 0)
    throw new Error('formatText() requires property "text".');
  let e = rs(t.font);
  if (t.text === "" || e instanceof Ne || !e)
    return { width: 0, height: 0, chars: [], opt: t };
  let { charStyleMap: r, text: i } = hs(t.text + ""),
    s = jn(i);
  if (e instanceof jr || typeof e == "string") {
    let F = e instanceof jr ? e.fontface.family : e,
      A =
        e instanceof jr
          ? { outline: e.outline, filter: e.filter }
          : { outline: null, filter: Si },
      v = xi[F] ?? {
        font: {
          tex: new ct(P.ggl, 2048, 2048, { filter: A.filter }),
          map: {},
          size: 64,
        },
        cursor: new S(0),
        outline: A.outline,
      };
    xi[F] || (xi[F] = v), (e = v.font);
    for (let B of s)
      if (!v.font.map[B]) {
        let I = $a;
        if (!I) throw new Error("fontCacheC2d is not defined.");
        if (!St) throw new Error("fontCacheCanvas is not defined.");
        I.clearRect(0, 0, St.width, St.height),
          (I.font = `${e.size}px ${F}`),
          (I.textBaseline = "top"),
          (I.textAlign = "left"),
          (I.fillStyle = "#ffffff");
        let U = I.measureText(B),
          N = Math.ceil(U.width);
        if (!N) continue;
        let G = e.size;
        v.outline &&
          v.outline.width &&
          v.outline.color &&
          ((I.lineJoin = "round"),
          (I.lineWidth = v.outline.width * 2),
          (I.strokeStyle = v.outline.color.toHex()),
          I.strokeText(B, v.outline.width, v.outline.width),
          (N += v.outline.width * 2),
          (G += v.outline.width * 3)),
          I.fillText(
            B,
            ((k = v.outline) == null ? void 0 : k.width) ?? 0,
            ((q = v.outline) == null ? void 0 : q.width) ?? 0
          );
        let H = I.getImageData(0, 0, N, G);
        if (
          v.cursor.x + N > 2048 &&
          ((v.cursor.x = 0), (v.cursor.y += G), v.cursor.y > 2048)
        )
          throw new Error("Font atlas exceeds character limit");
        e.tex.update(H, v.cursor.x, v.cursor.y),
          (e.map[B] = new ae(v.cursor.x, v.cursor.y, N, G)),
          (v.cursor.x += N);
      }
  }
  let n = t.size || e.size,
    o = b(t.scale ?? 1).scale(n / e.size),
    h = t.lineSpacing ?? 0,
    l = t.letterSpacing ?? 0,
    c = 0,
    u = 0,
    d = 0,
    g = [],
    w = [],
    m = 0,
    y = null,
    V = 0;
  for (; m < s.length; ) {
    let F = s[m];
    if (
      F ===
      `
`
    )
      (d += n + h),
        g.push({ width: c - l, chars: w }),
        (y = null),
        (V = 0),
        (c = 0),
        (w = []);
    else {
      let A = e.map[F];
      if (A) {
        let v = A.w * o.x;
        t.width &&
          c + v > t.width &&
          ((d += n + h),
          y != null &&
            ((m -= w.length - y),
            (F = s[m]),
            (A = e.map[F]),
            (v = A.w * o.x),
            (w = w.slice(0, y - 1)),
            (c = V)),
          (y = null),
          (V = 0),
          g.push({ width: c - l, chars: w }),
          (c = 0),
          (w = [])),
          w.push({
            tex: e.tex,
            width: A.w,
            height: A.h,
            quad: new ae(
              A.x / e.tex.width,
              A.y / e.tex.height,
              A.w / e.tex.width,
              A.h / e.tex.height
            ),
            ch: F,
            pos: new S(c, d),
            opacity: t.opacity ?? 1,
            color: t.color ?? J.WHITE,
            scale: b(o),
            angle: 0,
          }),
          F === " " && ((y = w.length), (V = c)),
          (c += v),
          (u = Math.max(u, c)),
          (c += l);
      }
    }
    m++;
  }
  g.push({ width: c - l, chars: w }), (d += n), t.width && (u = t.width);
  let R = [];
  for (let F = 0; F < g.length; F++) {
    let A = (u - g[F].width) * eo(t.align ?? "left");
    for (let v of g[F].chars) {
      let B = e.map[v.ch],
        I = R.length + F;
      if (
        ((v.pos = v.pos.add(A, 0).add(B.w * o.x * 0.5, B.h * o.y * 0.5)),
        t.transform)
      ) {
        let U =
          typeof t.transform == "function" ? t.transform(I, v.ch) : t.transform;
        U && Pi(v, U);
      }
      if (r[I]) {
        let U = r[I];
        for (let N of U) {
          let G = (Y = t.styles) == null ? void 0 : Y[N],
            H = typeof G == "function" ? G(I, v.ch) : G;
          H && Pi(v, H);
        }
      }
      R.push(v);
    }
  }
  return { width: u, height: d, chars: R, opt: t };
}
a(vt, "formatText");
function ur(t) {
  if (t.width === void 0 || t.height === void 0)
    throw new Error('drawUVQuad() requires property "width" and "height".');
  if (t.width <= 0 || t.height <= 0) return;
  let e = t.width,
    r = t.height,
    i = Tt(t.anchor || li).scale(new S(e, r).scale(-0.5)),
    s = t.quad || new ae(0, 0, 1, 1),
    n = t.color || se(255, 255, 255),
    o = t.opacity ?? 1,
    h = t.tex ? 0.1 / t.tex.width : 0,
    l = t.tex ? 0.1 / t.tex.height : 0,
    c = s.x + h,
    u = s.y + l,
    d = s.w - h * 2,
    g = s.h - l * 2;
  Ce(),
    he(t.pos),
    It(t.angle),
    lr(t.scale),
    he(i),
    ot(
      [
        {
          pos: new S(-e / 2, r / 2),
          uv: new S(t.flipX ? c + d : c, t.flipY ? u : u + g),
          color: n,
          opacity: o,
        },
        {
          pos: new S(-e / 2, -r / 2),
          uv: new S(t.flipX ? c + d : c, t.flipY ? u + g : u),
          color: n,
          opacity: o,
        },
        {
          pos: new S(e / 2, -r / 2),
          uv: new S(t.flipX ? c : c + d, t.flipY ? u + g : u),
          color: n,
          opacity: o,
        },
        {
          pos: new S(e / 2, r / 2),
          uv: new S(t.flipX ? c : c + d, t.flipY ? u : u + g),
          color: n,
          opacity: o,
        },
      ],
      [0, 1, 3, 1, 2, 3],
      t.fixed,
      t.tex,
      t.shader,
      t.uniform ?? void 0
    ),
    Pe();
}
a(ur, "drawUVQuad");
function xt(t) {
  Ce(),
    he(t.opt.pos),
    It(t.opt.angle),
    he(
      Tt(t.opt.anchor ?? "topleft")
        .add(1, 1)
        .scale(t.width, t.height)
        .scale(-0.5)
    ),
    t.chars.forEach((e) => {
      ur({
        tex: e.tex,
        width: e.width,
        height: e.height,
        pos: e.pos,
        scale: e.scale,
        angle: e.angle,
        color: e.color,
        opacity: e.opacity,
        quad: e.quad,
        anchor: "center",
        uniform: t.opt.uniform,
        shader: t.opt.shader,
        fixed: t.opt.fixed,
      });
    }),
    Pe();
}
a(xt, "drawFormattedText");
function ke(t) {
  if (t.width === void 0 || t.height === void 0)
    throw new Error('drawRect() requires property "width" and "height".');
  if (t.width <= 0 || t.height <= 0) return;
  let e = t.width,
    r = t.height,
    i = Tt(t.anchor || li)
      .add(1, 1)
      .scale(new S(e, r).scale(-0.5)),
    s = [new S(0, 0), new S(e, 0), new S(e, r), new S(0, r)];
  if (t.radius) {
    let n = Math.min(e, r) / 2,
      o = Array.isArray(t.radius)
        ? t.radius.map((h) => Math.min(n, h))
        : new Array(4).fill(Math.min(n, t.radius));
    s = [
      new S(o[0], 0),
      ...(o[1] ? Ot(new S(e - o[1], o[1]), o[1], o[1], 270, 360) : [b(e, 0)]),
      ...(o[2] ? Ot(new S(e - o[2], r - o[2]), o[2], o[2], 0, 90) : [b(e, r)]),
      ...(o[3] ? Ot(new S(o[3], r - o[3]), o[3], o[3], 90, 180) : [b(0, r)]),
      ...(o[0] ? Ot(new S(o[0], o[0]), o[0], o[0], 180, 270) : []),
    ];
  }
  ht(
    Object.assign({}, t, {
      offset: i,
      pts: s,
      ...(t.gradient
        ? {
            colors: t.horizontal
              ? [t.gradient[0], t.gradient[1], t.gradient[1], t.gradient[0]]
              : [t.gradient[0], t.gradient[0], t.gradient[1], t.gradient[1]],
          }
        : {}),
    })
  );
}
a(ke, "drawRect");
function tt(t) {
  Ie();
  let e = P.width,
    r = P.height;
  (P.width = P.viewport.width),
    (P.height = P.viewport.height),
    t(),
    Ie(),
    (P.width = e),
    (P.height = r);
}
a(tt, "drawUnscaled");
function Ii(t, e) {
  tt(() => {
    let r = b(8);
    Ce(), he(t);
    let i = vt({
        text: e,
        font: Hr,
        size: 16,
        pos: r,
        color: se(255, 255, 255),
        fixed: !0,
      }),
      s = i.width + r.x * 2,
      n = i.height + r.x * 2;
    t.x + s >= Ae() && he(b(-s, 0)),
      t.y + n >= ve() && he(b(0, -n)),
      ke({
        width: s,
        height: n,
        color: se(0, 0, 0),
        radius: 4,
        opacity: 0.8,
        fixed: !0,
      }),
      xt(i),
      Pe();
  });
}
a(Ii, "drawInspectText");
function cs(t) {
  if (!t.p1 || !t.p2 || !t.p3)
    throw new Error('drawTriangle() requires properties "p1", "p2" and "p3".');
  return ht(Object.assign({}, t, { pts: [t.p1, t.p2, t.p3] }));
}
a(cs, "drawTriangle");
function ko() {
  if (ie.inspect) {
    let t = null;
    for (let e of M.root.get("*", { recursive: !0 }))
      if (e.c("area") && e.isHovering()) {
        t = e;
        break;
      }
    if ((M.root.drawInspect(), t)) {
      let e = [],
        r = t.inspect();
      for (let i in r) r[i] ? e.push(`${r[i]}`) : e.push(`${i}`);
      Ii(
        lo(_i()),
        e.join(`
`)
      );
    }
    Ii(b(8), `FPS: ${ie.fps()}`);
  }
  ie.paused &&
    tt(() => {
      Ce(), he(Ae(), 0), he(-8, 8);
      let t = 32;
      ke({
        width: t,
        height: t,
        anchor: "topright",
        color: se(0, 0, 0),
        opacity: 0.8,
        radius: 4,
        fixed: !0,
      });
      for (let e = 1; e <= 2; e++)
        ke({
          width: 4,
          height: t * 0.6,
          anchor: "center",
          pos: b((-t / 3) * e, t * 0.5),
          color: se(255, 255, 255),
          radius: 2,
          fixed: !0,
        });
      Pe();
    }),
    ie.timeScale !== 1 &&
      tt(() => {
        Ce(), he(Ae(), ve()), he(-8, -8);
        let t = 8,
          e = vt({
            text: ie.timeScale.toFixed(1),
            font: Hr,
            size: 16,
            color: se(255, 255, 255),
            pos: b(-t),
            anchor: "botright",
            fixed: !0,
          });
        ke({
          width: e.width + t * 2 + t * 4,
          height: e.height + t * 2,
          anchor: "botright",
          color: se(0, 0, 0),
          opacity: 0.8,
          radius: 4,
          fixed: !0,
        });
        for (let r = 0; r < 2; r++) {
          let i = ie.timeScale < 1;
          cs({
            p1: b(-e.width - t * (i ? 2 : 3.5), -t),
            p2: b(-e.width - t * (i ? 2 : 3.5), -t - e.height),
            p3: b(-e.width - t * (i ? 3.5 : 2), -t - e.height / 2),
            pos: b(-r * t * 1 + (i ? -t * 0.5 : 0), 0),
            color: se(255, 255, 255),
            fixed: !0,
          });
        }
        xt(e), Pe();
      }),
    ie.curRecording &&
      tt(() => {
        Ce(),
          he(0, ve()),
          he(24, -24),
          Fr({
            radius: 12,
            color: se(255, 0, 0),
            opacity: ki(0, 1, D.time() * 4),
            fixed: !0,
          }),
          Pe();
      }),
    ie.showLog &&
      M.logs.length > 0 &&
      tt(() => {
        var i;
        Ce(), he(0, ve()), he(8, -8);
        let t = 8,
          e = [];
        for (let s of M.logs) {
          let n = "",
            o = s.msg instanceof Error ? "error" : "info";
          (n += `[time]${s.time.toFixed(2)}[/time]`),
            (n += " "),
            (n += `[${o}]${
              (i = s.msg) != null && i.toString ? s.msg.toString() : s.msg
            }[/${o}]`),
            e.push(n);
        }
        M.logs = M.logs.filter((s) => D.time() - s.time < (ue.logTime || 4));
        let r = vt({
          text: e.join(`
`),
          font: Hr,
          pos: b(t, -t),
          anchor: "botleft",
          size: 16,
          width: Ae() * 0.6,
          lineSpacing: t / 2,
          fixed: !0,
          styles: {
            time: { color: se(127, 127, 127) },
            info: { color: se(255, 255, 255) },
            error: { color: se(255, 0, 127) },
          },
        });
        ke({
          width: r.width + t * 2,
          height: r.height + t * 2,
          anchor: "botleft",
          color: se(0, 0, 0),
          radius: 4,
          opacity: 0.8,
          fixed: !0,
        }),
          xt(r),
          Pe();
      });
}
a(ko, "drawDebug");
function Uo() {
  let t = M.cam,
    e = S.fromAngle(ye(0, 360)).scale(t.shake);
  (t.shake = Ue(t.shake, 0, 5 * nt())),
    (t.transform = new Ze()
      .translate(Er())
      .scale(t.scale)
      .rotate(t.angle)
      .translate((t.pos ?? Er()).scale(-1).add(e))),
    M.root.draw(),
    Ie();
}
a(Uo, "drawFrame");
function Oo() {
  let t = yt();
  M.events.numListeners("loading") > 0
    ? M.events.trigger("loading", t)
    : tt(() => {
        let e = Ae() / 2,
          r = 24,
          i = b(Ae() / 2, ve() / 2).sub(b(e / 2, r / 2));
        ke({ pos: b(0), width: Ae(), height: ve(), color: se(0, 0, 0) }),
          ke({ pos: i, width: e, height: r, fill: !1, outline: { width: 4 } }),
          ke({ pos: i, width: e * t, height: r });
      });
}
a(Oo, "drawLoadScreen");
function ds(t, e, r) {
  let i = P.ggl.gl;
  Ie(),
    i.clear(i.STENCIL_BUFFER_BIT),
    i.enable(i.STENCIL_TEST),
    i.stencilFunc(i.NEVER, 1, 255),
    i.stencilOp(i.REPLACE, i.REPLACE, i.REPLACE),
    e(),
    Ie(),
    i.stencilFunc(r, 1, 255),
    i.stencilOp(i.KEEP, i.KEEP, i.KEEP),
    t(),
    Ie(),
    i.disable(i.STENCIL_TEST);
}
a(ds, "drawStenciled");
function No(t, e) {
  let r = P.ggl.gl;
  ds(t, e, r.EQUAL);
}
a(No, "drawMasked");
function Mr(t) {
  if (!t.tex) throw new Error('drawTexture() requires property "tex".');
  let e = t.quad ?? new ae(0, 0, 1, 1),
    r = t.tex.width * e.w,
    i = t.tex.height * e.h,
    s = new S(1);
  if (t.tiled) {
    let n = Tt(t.anchor || li)
        .add(new S(1, 1))
        .scale(0.5)
        .scale(t.width || r, t.height || i),
      o = (t.width || r) / r,
      h = (t.height || i) / i,
      l = Math.floor(o),
      c = Math.floor(h),
      u = o - l,
      d = h - c,
      g = (l + u ? 1 : 0) * (c + d ? 1 : 0),
      w = new Array(g * 6),
      m = new Array(g * 4),
      y = 0,
      V = a((R, k, q, Y, F) => {
        (w[y * 6 + 0] = y * 4 + 0),
          (w[y * 6 + 1] = y * 4 + 1),
          (w[y * 6 + 2] = y * 4 + 3),
          (w[y * 6 + 3] = y * 4 + 1),
          (w[y * 6 + 4] = y * 4 + 2),
          (w[y * 6 + 5] = y * 4 + 3),
          (m[y * 4 + 0] = {
            pos: new S(R - n.x, k - n.y),
            uv: new S(F.x, F.y),
            color: t.color || J.WHITE,
            opacity: t.opacity || 1,
          }),
          (m[y * 4 + 1] = {
            pos: new S(R + q - n.x, k - n.y),
            uv: new S(F.x + F.w, F.y),
            color: t.color || J.WHITE,
            opacity: t.opacity || 1,
          }),
          (m[y * 4 + 2] = {
            pos: new S(R + q - n.x, k + Y - n.y),
            uv: new S(F.x + F.w, F.y + F.h),
            color: t.color || J.WHITE,
            opacity: t.opacity || 1,
          }),
          (m[y * 4 + 3] = {
            pos: new S(R - n.x, k + Y - n.y),
            uv: new S(F.x, F.y + F.h),
            color: t.color || J.WHITE,
            opacity: t.opacity || 1,
          }),
          y++;
      }, "addQuad");
    for (let R = 0; R < c; R++) {
      for (let k = 0; k < l; k++) V(k * r, R * i, r, i, e);
      u && V(l * r, R * i, r * u, i, new ae(e.x, e.y, e.w * u, e.h));
    }
    if (d) {
      for (let R = 0; R < l; R++)
        V(R * r, c * i, r, i * d, new ae(e.x, e.y, e.w, e.h * d));
      u && V(l * r, c * i, r * u, i * d, new ae(e.x, e.y, e.w * u, e.h * d));
    }
    ot(m, w, t.fixed, t.tex, t.shader, t.uniform ?? void 0);
  } else
    t.width && t.height
      ? ((s.x = t.width / r), (s.y = t.height / i))
      : t.width
      ? ((s.x = t.width / r), (s.y = s.x))
      : t.height && ((s.y = t.height / i), (s.x = s.y)),
      ur(
        Object.assign({}, t, {
          scale: s.scale(t.scale || new S(1)),
          tex: t.tex,
          quad: e,
          width: r,
          height: i,
        })
      );
}
a(Mr, "drawTexture");
function Lo(t) {
  if (!t.sprite) throw new Error('drawSprite() requires property "sprite"');
  let e = yr(t.sprite);
  if (!e || !e.data) return;
  let r = e.data.frames[t.frame ?? 0];
  if (!r) throw new Error(`Frame not found: ${t.frame ?? 0}`);
  Mr(
    Object.assign({}, t, {
      tex: e.data.tex,
      quad: r.scale(t.quad ?? new ae(0, 0, 1, 1)),
    })
  );
}
a(Lo, "drawSprite");
function qo(t, e) {
  let r = P.ggl.gl;
  ds(t, e, r.NOTEQUAL);
}
a(qo, "drawSubtracted");
function Ti(t) {
  xt(vt(t));
}
a(Ti, "drawText");
var Jl = a((t, e) => {
  let r = hi(e, Mi, Ri),
    i = window.devicePixelRatio || window.devicePixelRatio,
    s = t.scale ?? 1,
    { gl: n } = e,
    o = ct.fromImage(
      e,
      new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
    ),
    h =
      t.width && t.height
        ? new Qr(e, t.width * i * s, t.height * i * s)
        : new Qr(e, n.drawingBufferWidth, n.drawingBufferHeight),
    l = null,
    c = 1;
  t.background &&
    (typeof t.background == "string"
      ? (l = se(t.background))
      : ((l = se(...t.background)), (c = t.background[3] ?? 1)),
    n.clearColor(l.r / 255, l.g / 255, l.b / 255, c ?? 1)),
    n.enable(n.BLEND),
    n.blendFuncSeparate(
      n.SRC_ALPHA,
      n.ONE_MINUS_SRC_ALPHA,
      n.ONE,
      n.ONE_MINUS_SRC_ALPHA
    );
  let u = new Xl(e, $i, kl, Ul),
    d = ct.fromImage(
      e,
      new ImageData(
        new Uint8ClampedArray([
          128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128,
          128, 255,
        ]),
        2,
        2
      ),
      { wrap: "repeat", filter: "nearest" }
    );
  return {
    lastDrawCalls: 0,
    ggl: e,
    defShader: r,
    defTex: o,
    frameBuffer: h,
    postShader: null,
    postShaderUniform: null,
    renderer: u,
    transform: new Ze(),
    transformStack: [],
    bgTex: d,
    bgColor: l,
    bgAlpha: c,
    width: t.width ?? n.drawingBufferWidth / i / s,
    height: t.height ?? n.drawingBufferHeight / i / s,
    viewport: {
      x: 0,
      y: 0,
      width: n.drawingBufferWidth,
      height: n.drawingBufferHeight,
    },
    fixed: !1,
  };
}, "initAppGfx");
function fs() {
  let t = ze,
    e = P.ggl.gl.drawingBufferWidth / t,
    r = P.ggl.gl.drawingBufferHeight / t;
  if (ue.letterbox) {
    if (!ue.width || !ue.height)
      throw new Error("Letterboxing requires width and height defined.");
    let i = e / r,
      s = ue.width / ue.height;
    if (i > s) {
      let n = r * s,
        o = (e - n) / 2;
      P.viewport = { x: o, y: 0, width: n, height: r };
    } else {
      let n = e / s,
        o = (r - n) / 2;
      P.viewport = { x: 0, y: o, width: e, height: n };
    }
    return;
  }
  if (ue.stretch && (!ue.width || !ue.height))
    throw new Error("Stretching requires width and height defined.");
  P.viewport = { x: 0, y: 0, width: e, height: r };
}
a(fs, "updateViewport");
function dt(t) {
  return t.fixed ? !0 : t.parent ? dt(t.parent) : !1;
}
a(dt, "isFixed");
function Vt(t) {
  return {
    color: t.color,
    opacity: t.opacity,
    anchor: t.anchor,
    outline: t.outline,
    shader: t.shader,
    uniform: t.uniform,
  };
}
a(Vt, "getRenderProps");
function Go(t, e = {}) {
  return {
    id: "circle",
    radius: t,
    draw() {
      Fr(Object.assign(Vt(this), { radius: this.radius, fill: e.fill }));
    },
    renderArea() {
      return new me(
        new S(this.anchor ? 0 : -this.radius),
        this.radius * 2,
        this.radius * 2
      );
    },
    inspect() {
      return `radius: ${Math.ceil(this.radius)}`;
    },
  };
}
a(Go, "circle");
function ps(...t) {
  return {
    id: "color",
    color: se(...t),
    inspect() {
      return `color: ${this.color.toString()}`;
    },
  };
}
a(ps, "color");
function jo(t) {
  return {
    add() {
      this.canvas = t;
    },
  };
}
a(jo, "drawon");
function Ko(t = 1) {
  let e,
    r = 0,
    i = !1;
  return {
    require: ["opacity"],
    add() {
      (e = this.opacity), (this.opacity = 0);
    },
    update() {
      i ||
        ((r += nt()),
        (this.opacity = Ke(r, 0, t, 0, e)),
        r >= t && ((this.opacity = e), (i = !0)));
    },
  };
}
a(Ko, "fadeIn");
function Yo(t = "intersect") {
  return { id: "mask", mask: t };
}
a(Yo, "mask");
function gs(t) {
  return {
    id: "opacity",
    opacity: t ?? 1,
    fadeIn(e = 1, r = j.easings.linear) {
      return M.root.tween(0, this.opacity, e, (i) => (this.opacity = i), r);
    },
    fadeOut(e = 1, r = j.easings.linear) {
      return M.root.tween(this.opacity, 0, e, (i) => (this.opacity = i), r);
    },
    inspect() {
      return `opacity: ${Yr(this.opacity, 1)}`;
    },
  };
}
a(gs, "opacity");
function Ho(t = 1, e = se(0, 0, 0), r = 1, i = "miter", s = 10, n = "butt") {
  return {
    id: "outline",
    outline: { width: t, color: e, opacity: r, join: i, miterLimit: s, cap: n },
    inspect() {
      return `outline: ${this.outline.width}px, ${this.outline.color}`;
    },
  };
}
a(Ho, "outline");
var ir,
  Zl =
    ((ir = class {
      constructor() {
        x(this, "pos", b(0));
        x(this, "vel", b(0));
        x(this, "acc", b(0));
        x(this, "angle", 0);
        x(this, "angularVelocity", 0);
        x(this, "damping", 0);
        x(this, "t");
        x(this, "lt", null);
        x(this, "gc");
        (this.t = 0), (this.gc = !0);
      }
      get progress() {
        return this.lt ? this.t / this.lt : this.t;
      }
    }),
    a(ir, "Particle"),
    ir);
function zo(t, e) {
  let r = e.lifetime,
    i = [],
    s = t.colors || [J.WHITE],
    n = t.opacities || [1],
    o = t.quads || [new ae(0, 0, 1, 1)],
    h = t.scales || [1],
    l = t.lifeTime,
    c = e.direction,
    u = e.spread,
    d = t.speed || [0, 0],
    g = t.angle || [0, 0],
    w = t.angularVelocity || [0, 0],
    m = t.acceleration || [b(0), b(0)],
    y = t.damping || [0, 0],
    V = [],
    R = new Array(t.max),
    k = 0,
    q = 0;
  for (let A = 0; A < t.max; A++) {
    (V[A * 6 + 0] = A * 4 + 0),
      (V[A * 6 + 1] = A * 4 + 1),
      (V[A * 6 + 2] = A * 4 + 3),
      (V[A * 6 + 3] = A * 4 + 1),
      (V[A * 6 + 4] = A * 4 + 2),
      (V[A * 6 + 5] = A * 4 + 3);
    for (let v = 0; v < 4; v++)
      R[A * 4 + v] = {
        pos: new S(0, 0),
        uv: new S(0, 0),
        color: se(255, 255, 255),
        opacity: 1,
      };
    i[A] = new Zl();
  }
  let Y = new Be();
  function F(A = 0) {
    for (; A < t.max; ) {
      if (i[A].gc) return A;
      A++;
    }
    return null;
  }
  return (
    a(F, "nextFree"),
    {
      id: "particles",
      emit(A) {
        let v = 0;
        for (let B = 0; B < A; B++) {
          if (((v = F(v)), v == null)) return;
          let I = ye(c - u, c + u),
            U = S.fromAngle(I).scale(ye(d[0], d[1])),
            N = ye(g[0], g[1]),
            G = ye(w[0], w[1]),
            H = b(ye(m[0].x, m[1].x), ye(m[0].y, m[1].y)),
            z = ye(y[0], y[1]),
            ne = l ? ye(l[0], l[1]) : null,
            Z = e.shape ? e.shape.random() : b(),
            X = i[v];
          (X.lt = ne),
            (X.pos = Z),
            (X.vel = U),
            (X.acc = H),
            (X.angle = N),
            (X.angularVelocity = G),
            (X.damping = z),
            (X.angularVelocity = G),
            (X.gc = !1);
        }
        k += A;
      },
      update() {
        if (r !== void 0 && r <= 0) return;
        let A = nt();
        for (let v of i)
          if (!v.gc) {
            if (((v.t += A), v.lt && v.t >= v.lt)) {
              (v.gc = !0), k--;
              continue;
            }
            (v.vel = v.vel.add(v.acc.scale(A)).scale(1 - v.damping * A)),
              (v.pos = v.pos.add(v.vel.scale(A))),
              (v.angle += v.angularVelocity * A);
          }
        for (
          r !== void 0 && ((r -= A), r <= 0 && Y.trigger()), q += A;
          k < t.max && e.rate && q > e.rate;

        )
          this.emit(1), k++, (q -= e.rate);
      },
      draw() {
        if (!(r !== void 0 && r <= 0)) {
          for (let A = 0; A < i.length; A++) {
            let v = i[A];
            if (v.gc) continue;
            let B = v.progress,
              I = Math.floor(v.progress * s.length),
              U =
                I < s.length - 1
                  ? Ue(
                      s[I],
                      s[I + 1],
                      Ke(B, I / s.length, (I + 1) / s.length, 0, 1)
                    )
                  : s[I],
              N = Math.floor(v.progress * n.length),
              G =
                N < n.length - 1
                  ? Ue(
                      n[N],
                      n[N + 1],
                      Ke(B, N / n.length, (N + 1) / n.length, 0, 1)
                    )
                  : n[N],
              H = Math.floor(v.progress * o.length),
              z = o[H],
              ne = Math.floor(v.progress * h.length),
              Z = h[ne],
              X = Math.cos((v.angle * Math.PI) / 180),
              ee = Math.sin((v.angle * Math.PI) / 180),
              _ = ((t.texture ? t.texture.width : 10) * z.w) / 2,
              C = ((t.texture ? t.texture.height : 10) * z.h) / 2,
              K = A * 4,
              O = R[K];
            (O.pos.x = v.pos.x + -_ * Z * X - -C * Z * ee),
              (O.pos.y = v.pos.y + -_ * Z * ee + -C * Z * X),
              (O.uv.x = z.x),
              (O.uv.y = z.y),
              (O.color.r = U.r),
              (O.color.g = U.g),
              (O.color.b = U.b),
              (O.opacity = G),
              (O = R[K + 1]),
              (O.pos.x = v.pos.x + _ * Z * X - -C * Z * ee),
              (O.pos.y = v.pos.y + _ * Z * ee + -C * Z * X),
              (O.uv.x = z.x + z.w),
              (O.uv.y = z.y),
              (O.color.r = U.r),
              (O.color.g = U.g),
              (O.color.b = U.b),
              (O.opacity = G),
              (O = R[K + 2]),
              (O.pos.x = v.pos.x + _ * Z * X - C * Z * ee),
              (O.pos.y = v.pos.y + _ * Z * ee + C * Z * X),
              (O.uv.x = z.x + z.w),
              (O.uv.y = z.y + z.h),
              (O.color.r = U.r),
              (O.color.g = U.g),
              (O.color.b = U.b),
              (O.opacity = G),
              (O = R[K + 3]),
              (O.pos.x = v.pos.x + -_ * Z * X - C * Z * ee),
              (O.pos.y = v.pos.y + -_ * Z * ee + C * Z * X),
              (O.uv.x = z.x),
              (O.uv.y = z.y + z.h),
              (O.color.r = U.r),
              (O.color.g = U.g),
              (O.color.b = U.b),
              (O.opacity = G);
          }
          ot(R, V, this.fixed, t.texture, this.shader, this.uniform);
        }
      },
      onEnd(A) {
        return Y.add(A);
      },
      inspect() {
        return `count: ${k}/${t.max}`;
      },
    }
  );
}
a(zo, "particles");
function Qo(t, e = {}) {
  if (t.length < 3)
    throw new Error(
      `Polygon's need more than two points, ${t.length} points provided`
    );
  return {
    id: "polygon",
    pts: t,
    colors: e.colors,
    uv: e.uv,
    tex: e.tex,
    radius: e.radius,
    draw() {
      ht(
        Object.assign(Vt(this), {
          pts: this.pts,
          colors: this.colors,
          uv: this.uv,
          tex: this.tex,
          radius: this.radius,
          fill: e.fill,
          triangulate: e.triangulate,
        })
      );
    },
    renderArea() {
      return new Le(this.pts);
    },
    inspect() {
      return `polygon: ${this.pts.map((r) => `[${r.x},${r.y}]`).join(",")}`;
    },
  };
}
a(Qo, "polygon");
function ms(t, e, r) {
  let i;
  return (
    M.root.get("area").forEach((s) => {
      if (r && r.some((o) => s.is(o))) return;
      let n = s.worldArea().raycast(t, e);
      n &&
        (i
          ? n.fraction < i.fraction && ((i = n), (i.object = s))
          : ((i = n), (i.object = s)));
    }),
    i
  );
}
a(ms, "raycast");
function ws(t, e, r = {}) {
  return {
    id: "rect",
    width: t,
    height: e,
    radius: r.radius || 0,
    draw() {
      ke(
        Object.assign(Vt(this), {
          width: this.width,
          height: this.height,
          radius: this.radius,
          fill: r.fill,
        })
      );
    },
    renderArea() {
      return new me(b(0), this.width, this.height);
    },
    inspect() {
      return `rect: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)}h)`;
    },
  };
}
a(ws, "rect");
function Wo(t, e) {
  return {
    id: "shader",
    shader: t,
    ...(typeof e == "function"
      ? {
          uniform: e(),
          update() {
            this.uniform = e();
          },
        }
      : { uniform: e }),
    inspect() {
      return `shader: ${t}`;
    },
  };
}
a(Wo, "shader");
function Xo(...t) {
  return (
    t.length > 0 && (M.cam.pos = b(...t)), M.cam.pos ? M.cam.pos.clone() : Er()
  );
}
a(Xo, "camPos");
function Jo(...t) {
  return t.length > 0 && (M.cam.scale = b(...t)), M.cam.scale.clone();
}
a(Jo, "camScale");
function Zo(t) {
  return t !== void 0 && (M.cam.angle = t), M.cam.angle;
}
a(Zo, "camRot");
function _o(t = se(255, 255, 255), e = 1) {
  let r = M.root.add([ws(Ae(), ve()), ps(t), gs(1), Ms()]),
    i = r.fadeOut(e);
  return i.onEnd(() => xs(r)), i;
}
a(_o, "camFlash");
function $o() {
  return M.cam.transform.clone();
}
a($o, "camTransform");
function ea(t = 12) {
  M.cam.shake += t;
}
a(ea, "shake");
function ta(t) {
  return M.cam.transform.multVec2(t);
}
a(ta, "toScreen");
function ra(t) {
  return M.cam.transform.invert().multVec2(t);
}
a(ra, "toWorld");
function ia(t, e) {
  if (!e.tileWidth || !e.tileHeight)
    throw new Error("Must provide tileWidth and tileHeight.");
  let r = M.root.add([Rr(e.pos ?? b(0))]),
    i = t.length,
    s = 0,
    n = null,
    o = null,
    h = null,
    l = null,
    c = a((A) => A.x + A.y * s, "tile2Hash"),
    u = a((A) => b(Math.floor(A % s), Math.floor(A / s)), "hash2Tile"),
    d = a(() => {
      n = [];
      for (let A of r.children) g(A);
    }, "createSpatialMap"),
    g = a((A) => {
      let v = c(A.tilePos);
      n[v] ? n[v].push(A) : (n[v] = [A]);
    }, "insertIntoSpatialMap"),
    w = a((A) => {
      let v = c(A.tilePos);
      if (n[v]) {
        let B = n[v].indexOf(A);
        B >= 0 && n[v].splice(B, 1);
      }
    }, "removeFromSpatialMap"),
    m = a(() => {
      let A = !1;
      for (let v of r.children) {
        let B = r.pos2Tile(v.pos);
        (v.tilePos.x != B.x || v.tilePos.y != B.y) &&
          ((A = !0), w(v), (v.tilePos.x = B.x), (v.tilePos.y = B.y), g(v));
      }
      A && r.trigger("spatialMapChanged");
    }, "updateSpatialMap"),
    y = a(() => {
      let A = r.getSpatialMap(),
        v = r.numRows() * r.numColumns();
      o ? (o.length = v) : (o = new Array(v)), o.fill(1, 0, v);
      for (let B = 0; B < A.length; B++) {
        let I = A[B];
        if (I) {
          let U = 0;
          for (let N of I)
            if (N.isObstacle) {
              U = 1 / 0;
              break;
            } else U += N.cost;
          o[B] = U || 1;
        }
      }
    }, "createCostMap"),
    V = a(() => {
      let A = r.getSpatialMap(),
        v = r.numRows() * r.numColumns();
      h ? (h.length = v) : (h = new Array(v)), h.fill(15, 0, v);
      for (let B = 0; B < A.length; B++) {
        let I = A[B];
        if (I) {
          let U = I.length,
            N = 15;
          for (let G = 0; G < U; G++) N |= I[G].edgeMask;
          h[B] = N;
        }
      }
    }, "createEdgeMap"),
    R = a(() => {
      let A = r.numRows() * r.numColumns(),
        v = a((I, U) => {
          let N = [];
          for (N.push(I); N.length > 0; ) {
            let G = N.pop();
            Y(G).forEach((H) => {
              l[H] < 0 && ((l[H] = U), N.push(H));
            });
          }
        }, "traverse");
      l ? (l.length = A) : (l = new Array(A)), l.fill(-1, 0, A);
      let B = 0;
      for (let I = 0; I < o.length; I++) {
        if (l[I] >= 0) {
          B++;
          continue;
        }
        v(I, B), B++;
      }
    }, "createConnectivityMap"),
    k = a((A, v) => o[v], "getCost"),
    q = a((A, v) => {
      let B = u(A),
        I = u(v);
      return B.dist(I);
    }, "getHeuristic"),
    Y = a((A, v) => {
      let B = [],
        I = Math.floor(A % s),
        U = I > 0 && h[A] & 1 && o[A - 1] !== 1 / 0,
        N = A >= s && h[A] & 2 && o[A - s] !== 1 / 0,
        G = I < s - 1 && h[A] & 4 && o[A + 1] !== 1 / 0,
        H = A < s * i - s - 1 && h[A] & 8 && o[A + s] !== 1 / 0;
      return (
        v
          ? (U &&
              (N && B.push(A - s - 1), B.push(A - 1), H && B.push(A + s - 1)),
            N && B.push(A - s),
            G &&
              (N && B.push(A - s + 1), B.push(A + 1), H && B.push(A + s + 1)),
            H && B.push(A + s))
          : (U && B.push(A - 1),
            N && B.push(A - s),
            G && B.push(A + 1),
            H && B.push(A + s)),
        B
      );
    }, "getNeighbours"),
    F = {
      id: "level",
      tileWidth() {
        return e.tileWidth;
      },
      tileHeight() {
        return e.tileHeight;
      },
      spawn(A, ...v) {
        let B = b(...v),
          I = (() => {
            if (typeof A == "string") {
              if (e.tiles[A]) {
                if (typeof e.tiles[A] != "function")
                  throw new Error(
                    "Level symbol def must be a function returning a component list"
                  );
                return e.tiles[A](B);
              } else if (e.wildcardTile) return e.wildcardTile(A, B);
            } else {
              if (Array.isArray(A)) return A;
              throw new Error("Expected a symbol or a component list");
            }
          })();
        if (!I) return null;
        let U = !1,
          N = !1;
        for (let H of I)
          H.id === "tile" && (N = !0), H.id === "pos" && (U = !0);
        U || I.push(Rr()), N || I.push(Vs());
        let G = r.add(I);
        return (
          U && (G.tilePosOffset = G.pos.clone()),
          (G.tilePos = B),
          n &&
            (g(G),
            this.trigger("spatialMapChanged"),
            this.trigger("navigationMapInvalid")),
          G
        );
      },
      numColumns() {
        return s;
      },
      numRows() {
        return i;
      },
      levelWidth() {
        return s * this.tileWidth();
      },
      levelHeight() {
        return i * this.tileHeight();
      },
      tile2Pos(...A) {
        return b(...A).scale(this.tileWidth(), this.tileHeight());
      },
      pos2Tile(...A) {
        let v = b(...A);
        return b(
          Math.floor(v.x / this.tileWidth()),
          Math.floor(v.y / this.tileHeight())
        );
      },
      getSpatialMap() {
        return n || d(), n;
      },
      onSpatialMapChanged(A) {
        return this.on("spatialMapChanged", A);
      },
      onNavigationMapInvalid(A) {
        return this.on("navigationMapInvalid", A);
      },
      getAt(A) {
        n || d();
        let v = c(A);
        return n[v] || [];
      },
      raycast(A, v) {
        let B = A.scale(1 / this.tileWidth(), 1 / this.tileHeight()),
          I = cn(
            B,
            v,
            (U) => {
              let N = this.getAt(U);
              if (N.some((H) => H.isObstacle)) return !0;
              let G = null;
              for (let H of N)
                if (H.is("area")) {
                  let z = H.worldArea().raycast(A, v);
                  z &&
                    (G
                      ? z.fraction < G.fraction && ((G = z), (G.object = H))
                      : ((G = z), (G.object = H)));
                }
              return G || !1;
            },
            64
          );
        return (
          I && (I.point = I.point.scale(this.tileWidth(), this.tileHeight())), I
        );
      },
      update() {
        n && m();
      },
      invalidateNavigationMap() {
        (o = null), (h = null), (l = null);
      },
      onNavigationMapChanged(A) {
        return this.on("navigationMapChanged", A);
      },
      getTilePath(A, v, B = {}) {
        var X;
        if (
          (o || y(),
          h || V(),
          l || R(),
          A.x < 0 ||
            A.x >= s ||
            A.y < 0 ||
            A.y >= i ||
            v.x < 0 ||
            v.x >= s ||
            v.y < 0 ||
            v.y >= i)
        )
          return null;
        let I = c(A),
          U = c(v);
        if (o[U] === 1 / 0) return null;
        if (I === U) return [];
        if (l[I] != -1 && l[I] !== l[U]) return null;
        let N = new Un((ee, _) => ee.cost < _.cost);
        N.insert({ cost: 0, node: I });
        let G = new Map();
        G.set(I, I);
        let H = new Map();
        for (H.set(I, 0); N.length !== 0; ) {
          let ee = (X = N.remove()) == null ? void 0 : X.node;
          if (ee === U) break;
          let _ = Y(ee, B.allowDiagonals);
          for (let C of _) {
            let K = (H.get(ee) || 0) + k(ee, C) + q(C, U);
            (!H.has(C) || K < H.get(C)) &&
              (H.set(C, K), N.insert({ cost: K, node: C }), G.set(C, ee));
          }
        }
        let z = [],
          ne = U,
          Z = u(ne);
        for (z.push(Z); ne !== I; ) {
          let ee = G.get(ne);
          if (!ee) throw new Error("Bug in pathfinding algorithm");
          ne = ee;
          let _ = u(ne);
          z.push(_);
        }
        return z.reverse();
      },
      getPath(A, v, B = {}) {
        let I = this.tileWidth(),
          U = this.tileHeight(),
          N = this.getTilePath(this.pos2Tile(A), this.pos2Tile(v), B);
        return N
          ? [
              A,
              ...N.slice(1, -1).map((G) => G.scale(I, U).add(I / 2, U / 2)),
              v,
            ]
          : null;
      },
    };
  return (
    r.use(F),
    r.onNavigationMapInvalid(() => {
      r.invalidateNavigationMap(), r.trigger("navigationMapChanged");
    }),
    t.forEach((A, v) => {
      let B = A.split("");
      (s = Math.max(B.length, s)),
        B.forEach((I, U) => {
          r.spawn(I, b(U, v));
        });
    }),
    r
  );
}
a(ia, "addLevel");
function _e(t, e, r) {
  return (
    M.objEvents.registers[t] || (M.objEvents.registers[t] = new Gn()),
    M.objEvents.on(t, (i, ...s) => {
      i.is(e) && r(i, ...s);
    })
  );
}
a(_e, "on");
var _l = fe(
    (t) => {
      let e = M.root.add([{ update: t }]);
      return {
        get paused() {
          return e.paused;
        },
        set paused(r) {
          e.paused = r;
        },
        cancel: a(() => e.destroy(), "cancel"),
      };
    },
    (t, e) => _e("fixedUpdate", t, e)
  ),
  $l = fe(
    (t) => {
      let e = M.root.add([{ update: t }]);
      return {
        get paused() {
          return e.paused;
        },
        set paused(r) {
          e.paused = r;
        },
        cancel: a(() => e.destroy(), "cancel"),
      };
    },
    (t, e) => _e("update", t, e)
  ),
  eu = fe(
    (t) => {
      let e = M.root.add([{ draw: t }]);
      return {
        get paused() {
          return e.hidden;
        },
        set paused(r) {
          e.hidden = r;
        },
        cancel: a(() => e.destroy(), "cancel"),
      };
    },
    (t, e) => _e("draw", t, e)
  ),
  sa = fe(
    (t) => M.events.on("add", t),
    (t, e) => _e("add", t, e)
  ),
  tu = fe(
    (t) => M.events.on("destroy", t),
    (t, e) => _e("destroy", t, e)
  );
function na(t, e, r) {
  return _e("collide", t, (i, s, n) => s.is(e) && r(i, s, n));
}
a(na, "onCollide");
function oa(t, e, r) {
  return _e("collideUpdate", t, (i, s, n) => s.is(e) && r(i, s, n));
}
a(oa, "onCollideUpdate");
function aa(t, e, r) {
  return _e("collideEnd", t, (i, s, n) => s.is(e) && r(i, s, n));
}
a(aa, "onCollideEnd");
function Cr(t, e) {
  M.root.get(t, { recursive: !0 }).forEach(e), sa(t, e);
}
a(Cr, "forAllCurrentAndFuture");
var ru = fe(
  (t) => D.onMousePress(t),
  (t, e) => {
    let r = [];
    return (
      Cr(t, (i) => {
        if (!i.area)
          throw new Error(
            "onClick() requires the object to have area() component"
          );
        r.push(i.onClick(() => e(i)));
      }),
      dr.join(r)
    );
  }
);
function la(t, e) {
  let r = [];
  return (
    Cr(t, (i) => {
      if (!i.area)
        throw new Error(
          "onHover() requires the object to have area() component"
        );
      r.push(i.onHover(() => e(i)));
    }),
    dr.join(r)
  );
}
a(la, "onHover");
function ua(t, e) {
  let r = [];
  return (
    Cr(t, (i) => {
      if (!i.area)
        throw new Error(
          "onHoverUpdate() requires the object to have area() component"
        );
      r.push(i.onHoverUpdate(() => e(i)));
    }),
    dr.join(r)
  );
}
a(ua, "onHoverUpdate");
function ha(t, e) {
  let r = [];
  return (
    Cr(t, (i) => {
      if (!i.area)
        throw new Error(
          "onHoverEnd() requires the object to have area() component"
        );
      r.push(i.onHoverEnd(() => e(i)));
    }),
    dr.join(r)
  );
}
a(ha, "onHoverEnd");
function ca(t) {
  M.events.on("loading", t);
}
a(ca, "onLoading");
function da(t) {
  D.onResize(t);
}
a(da, "onResize");
function fa(t) {
  M.events.on("error", t);
}
a(fa, "onError");
function di(t) {
  W.loaded ? t() : M.events.on("load", t);
}
a(di, "onLoad");
function fi(t = []) {
  let e = new Map(),
    r = [],
    i = {},
    s = new Vr(),
    n = [],
    o = null,
    h = !1,
    l = {
      id: bl(),
      hidden: !1,
      transform: new Ze(),
      children: [],
      parent: null,
      set paused(u) {
        if (u !== h) {
          h = u;
          for (let d of n) d.paused = u;
        }
      },
      get paused() {
        return h;
      },
      get tags() {
        let u = [];
        for (let [d, g] of e.entries()) Object.keys(g).length == 1 && u.push(d);
        return u;
      },
      add(u) {
        let d = Array.isArray(u) ? fi(u) : u;
        if (d.parent)
          throw new Error("Cannot add a game obj that already has a parent.");
        return (
          (d.parent = this),
          (d.transform = wr(d)),
          this.children.push(d),
          d.trigger("add", d),
          M.events.trigger("add", d),
          d
        );
      },
      readd(u) {
        let d = this.children.indexOf(u);
        return (
          d !== -1 && (this.children.splice(d, 1), this.children.push(u)), u
        );
      },
      remove(u) {
        let d = this.children.indexOf(u);
        if (d !== -1) {
          (u.parent = null), this.children.splice(d, 1);
          let g = a((w) => {
            w.trigger("destroy"),
              M.events.trigger("destroy", w),
              w.children.forEach((m) => g(m));
          }, "trigger");
          g(u);
        }
      },
      removeAll(u) {
        if (u) this.get(u).forEach((d) => this.remove(d));
        else for (let d of [...this.children]) this.remove(d);
      },
      fixedUpdate() {
        this.paused ||
          (this.children.forEach((u) => u.fixedUpdate()),
          this.trigger("fixedUpdate"));
      },
      update() {
        this.paused ||
          (this.children.forEach((u) => u.update()), this.trigger("update"));
      },
      draw() {
        if (this.hidden) return;
        this.canvas && (Ie(), this.canvas.bind());
        let u = P.fixed;
        this.fixed && (P.fixed = !0),
          Ce(),
          he(this.pos),
          lr(this.scale),
          It(this.angle);
        let d = this.children.sort((g, w) => {
          let m = g.layerIndex ?? M.defaultLayerIndex,
            y = w.layerIndex ?? M.defaultLayerIndex;
          return m - y || (g.z ?? 0) - (w.z ?? 0);
        });
        if (this.mask) {
          let g = { intersect: j.drawMasked, subtract: j.drawSubtracted }[
            this.mask
          ];
          if (!g) throw new Error(`Invalid mask func: "${this.mask}"`);
          g(
            () => {
              d.forEach((w) => w.draw());
            },
            () => {
              this.trigger("draw");
            }
          );
        } else this.trigger("draw"), d.forEach((g) => g.draw());
        Pe(), (P.fixed = u), this.canvas && (Ie(), this.canvas.unbind());
      },
      drawInspect() {
        this.hidden ||
          (Ce(),
          he(this.pos),
          lr(this.scale),
          It(this.angle),
          this.children.forEach((u) => u.drawInspect()),
          this.trigger("drawInspect"),
          Pe());
      },
      use(u) {
        if (!u) return;
        if ((kn(u) && (u = new u(this)), typeof u == "function"))
          return this.use(u(this));
        if (typeof u == "string") return this.use({ id: u });
        let d = [];
        u.id
          ? (this.unuse(u.id), (i[u.id] = []), (d = i[u.id]), e.set(u.id, u))
          : r.push(u);
        for (let w in u) {
          if (Ll.has(w)) continue;
          let m = Object.getOwnPropertyDescriptor(u, w);
          if (m)
            if (
              (typeof m.value == "function" && (u[w] = u[w].bind(this)),
              m.set && Object.defineProperty(u, w, { set: m.set.bind(this) }),
              m.get && Object.defineProperty(u, w, { get: m.get.bind(this) }),
              ql.has(w))
            ) {
              let y =
                w === "add"
                  ? () => {
                      var V;
                      (o = a((R) => d.push(R), "onCurCompCleanup")),
                        (V = u[w]) == null || V.call(u),
                        (o = null);
                    }
                  : u[w];
              d.push(this.on(w, y).cancel);
            } else if (this[w] === void 0)
              Object.defineProperty(this, w, {
                get: a(() => u[w], "get"),
                set: a((y) => (u[w] = y), "set"),
                configurable: !0,
                enumerable: !0,
              }),
                d.push(() => delete this[w]);
            else throw new Error(`Duplicate component property: "${w}"`);
        }
        let g = a(() => {
          if (u.require) {
            for (let w of u.require)
              if (!this.c(w))
                throw new Error(
                  `Component "${u.id}" requires component "${w}"`
                );
          }
        }, "checkDeps");
        u.destroy && d.push(u.destroy.bind(this)),
          this.exists()
            ? (g(),
              u.add &&
                ((o = a((w) => d.push(w), "onCurCompCleanup")),
                u.add.call(this),
                (o = null)))
            : u.require && d.push(this.on("add", g).cancel);
      },
      unuse(u) {
        if (e.has(u)) {
          for (let d of e.values())
            if (d.require && d.require.includes(u))
              throw new Error(
                `Can't unuse. Component "${d.id}" requires component "${u}"`
              );
          e.delete(u);
        }
        i[u] && (i[u].forEach((d) => d()), delete i[u]);
      },
      c(u) {
        return e.get(u) ?? null;
      },
      get(u, d = {}) {
        let g = d.recursive
          ? this.children.flatMap(
              a(function w(m) {
                return [m, ...m.children.flatMap(w)];
              }, "recurse")
            )
          : this.children;
        if (((g = g.filter((w) => (u ? w.is(u) : !0))), d.liveUpdate)) {
          let w = a(
              (y) => (d.recursive ? this.isAncestorOf(y) : y.parent === this),
              "isChild"
            ),
            m = [];
          m.push(
            j.onAdd((y) => {
              w(y) && y.is(u) && g.push(y);
            })
          ),
            m.push(
              j.onDestroy((y) => {
                if (w(y) && y.is(u)) {
                  let V = g.findIndex((R) => R.id === y.id);
                  V !== -1 && g.splice(V, 1);
                }
              })
            ),
            this.onDestroy(() => {
              for (let y of m) y.cancel();
            });
        }
        return g;
      },
      query(u) {
        let d = u.hierarchy || "children",
          g = u.include,
          w = u.exclude,
          m = [];
        switch (d) {
          case "children":
            m = this.children;
            break;
          case "siblings":
            m = this.parent
              ? this.parent.children.filter((V) => V !== this)
              : [];
            break;
          case "ancestors":
            let y = this.parent;
            for (; y; ) m.push(y), (y = y.parent);
            break;
          case "descendants":
            m = this.children.flatMap(
              a(function V(R) {
                return [R, ...R.children.flatMap(V)];
              }, "recurse")
            );
            break;
        }
        if (
          (g &&
            ((u.includeOp || "and") === "and" || !Array.isArray(u.include)
              ? (m = m.filter((y) => y.is(g)))
              : (m = m.filter((y) => u.include.some((V) => y.is(V))))),
          w &&
            ((u.includeOp || "and") === "and" || !Array.isArray(u.include)
              ? (m = m.filter((y) => !y.is(w)))
              : (m = m.filter((y) => !u.exclude.some((V) => y.is(V))))),
          u.visible === !0 && (m = m.filter((y) => y.visible)),
          u.distance)
        ) {
          if (!this.pos)
            throw Error("Can't do a distance query from an object without pos");
          let y = u.distanceOp || "near",
            V = u.distance * u.distance;
          y === "near"
            ? (m = m.filter((R) => R.pos && this.pos.sdist(R.pos) <= V))
            : (m = m.filter((R) => R.pos && this.pos.sdist(R.pos) > V));
        }
        return u.name && (m = m.filter((y) => y.name === u.name)), m;
      },
      isAncestorOf(u) {
        return u.parent ? u.parent === this || this.isAncestorOf(u.parent) : !1;
      },
      exists() {
        return M.root.isAncestorOf(this);
      },
      is(u) {
        if (u === "*") return !0;
        if (Array.isArray(u)) {
          for (let d of u) if (!this.c(d)) return !1;
          return !0;
        } else return this.c(u) != null;
      },
      on(u, d) {
        let g = s.on(u, d.bind(this));
        return o && o(() => g.cancel()), g;
      },
      trigger(u, ...d) {
        s.trigger(u, ...d), M.objEvents.trigger(u, this, ...d);
      },
      destroy() {
        this.parent && this.parent.remove(this);
      },
      inspect() {
        var d;
        let u = {};
        for (let [g, w] of e)
          u[g] = ((d = w.inspect) == null ? void 0 : d.call(w)) ?? null;
        for (let [g, w] of r.entries()) {
          if (w.inspect) {
            u[g] = w.inspect();
            continue;
          }
          for (let [m, y] of Object.entries(w))
            typeof y != "function" && (u[m] = `${m}: ${y}`);
        }
        return u;
      },
      onAdd(u) {
        return this.on("add", u);
      },
      onFixedUpdate(u) {
        return this.on("fixedUpdate", u);
      },
      onUpdate(u) {
        return this.on("update", u);
      },
      onDraw(u) {
        return this.on("draw", u);
      },
      onDestroy(u) {
        return this.on("destroy", u);
      },
      clearEvents() {
        s.clear();
      },
    },
    c = [
      "onKeyPress",
      "onKeyPressRepeat",
      "onKeyDown",
      "onKeyRelease",
      "onMousePress",
      "onMouseDown",
      "onMouseRelease",
      "onMouseMove",
      "onCharInput",
      "onMouseMove",
      "onTouchStart",
      "onTouchMove",
      "onTouchEnd",
      "onScroll",
      "onGamepadButtonPress",
      "onGamepadButtonDown",
      "onGamepadButtonRelease",
      "onGamepadStick",
      "onButtonPress",
      "onButtonDown",
      "onButtonRelease",
    ];
  for (let u of c)
    l[u] = (...d) => {
      var w;
      let g = (w = D[u]) == null ? void 0 : w.call(D, ...d);
      return n.push(g), l.onDestroy(() => g.cancel()), g;
    };
  for (let u of t) l.use(u);
  return l;
}
a(fi, "make");
var iu = a(
  () => ({
    events: new Vr(),
    objEvents: new Vr(),
    root: fi([]),
    gravity: null,
    scenes: {},
    currentScene: null,
    layers: null,
    defaultLayerIndex: 0,
    logs: [],
    cam: {
      pos: null,
      scale: new S(1),
      angle: 0,
      shake: 0,
      transform: new Ze(),
    },
  }),
  "initGame"
);
function pa(t) {
  M.gravity = t ? (M.gravity || b(0, 1)).unit().scale(t) : null;
}
a(pa, "setGravity");
function ga() {
  return M.gravity ? M.gravity.len() : 0;
}
a(ga, "getGravity");
function ma(t) {
  M.gravity = t.unit().scale(M.gravity ? M.gravity.len() : 1);
}
a(ma, "setGravityDirection");
function wa() {
  return M.gravity ? M.gravity.unit() : b(0, 1);
}
a(wa, "getGravityDirection");
var su = dl(
    "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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
  ),
  nu = a(
    () =>
      (() => {
        let t = new (window.AudioContext || window.webkitAudioContext)(),
          e = t.createGain();
        e.connect(t.destination);
        let r = new Sr(to(t));
        return (
          t
            .decodeAudioData(su.buffer.slice(0))
            .then((i) => {
              r.buf = i;
            })
            .catch((i) => {
              console.error("Failed to load burp: ", i);
            }),
          { ctx: t, masterNode: e, burpSnd: r }
        );
      })(),
    "initAudio"
  );
function ya(t, e = {}) {
  let r = new Be(),
    i = new Audio(t);
  pe.ctx.createMediaElementSource(i).connect(pe.masterNode);
  function s() {
    ie.paused || (D.isHidden() && !ue.backgroundAudio) || pe.ctx.resume();
  }
  a(s, "resumeAudioCtx");
  function n() {
    s(), i.play();
  }
  return (
    a(n, "play"),
    e.paused || n(),
    (i.onended = () => r.trigger()),
    {
      play() {
        n();
      },
      seek(o) {
        i.currentTime = o;
      },
      stop() {
        i.pause(), this.seek(0);
      },
      set loop(o) {
        i.loop = o;
      },
      get loop() {
        return i.loop;
      },
      set paused(o) {
        o ? i.pause() : n();
      },
      get paused() {
        return i.paused;
      },
      time() {
        return i.currentTime;
      },
      duration() {
        return i.duration;
      },
      set volume(o) {
        i.volume = Je(o, 0, 1);
      },
      get volume() {
        return i.volume;
      },
      set speed(o) {
        i.playbackRate = Math.max(o, 0);
      },
      get speed() {
        return i.playbackRate;
      },
      set detune(o) {},
      get detune() {
        return 0;
      },
      onEnd(o) {
        return r.add(o);
      },
      then(o) {
        return this.onEnd(o);
      },
    }
  );
}
a(ya, "playMusic");
function ys(t, e = {}) {
  if (typeof t == "string" && W.music[t]) return ya(W.music[t], e);
  let r = pe.ctx,
    i = e.paused ?? !1,
    s = r.createBufferSource(),
    n = new Be(),
    o = r.createGain(),
    h = e.seek ?? 0,
    l = 0,
    c = 0,
    u = !1;
  (s.loop = !!e.loop),
    (s.detune.value = e.detune ?? 0),
    (s.playbackRate.value = e.speed ?? 1),
    s.connect(o),
    (s.onended = () => {
      var y;
      w() >=
        (((y = s.buffer) == null ? void 0 : y.duration) ??
          Number.POSITIVE_INFINITY) && n.trigger();
    }),
    o.connect(pe.masterNode),
    (o.gain.value = e.volume ?? 1);
  let d = a((y) => {
      (s.buffer = y.buf), i || ((l = r.currentTime), s.start(0, h), (u = !0));
    }, "start"),
    g = Ro(t);
  g instanceof Ne && g.onLoad(d);
  let w = a(() => {
      if (!s.buffer) return 0;
      let y = i ? c - l : r.currentTime - l,
        V = s.buffer.duration;
      return s.loop ? y % V : Math.min(y, V);
    }, "getTime"),
    m = a((y) => {
      let V = r.createBufferSource();
      return (
        (V.buffer = y.buffer),
        (V.loop = y.loop),
        (V.playbackRate.value = y.playbackRate.value),
        (V.detune.value = y.detune.value),
        (V.onended = y.onended),
        V.connect(o),
        V
      );
    }, "cloneNode");
  return {
    stop() {
      (this.paused = !0), this.seek(0);
    },
    set paused(y) {
      if (i !== y)
        if (((i = y), y)) u && (s.stop(), (u = !1)), (c = r.currentTime);
        else {
          s = m(s);
          let V = c - l;
          s.start(0, V), (u = !0), (l = r.currentTime - V), (c = 0);
        }
    },
    get paused() {
      return i;
    },
    play(y = 0) {
      this.seek(y), (this.paused = !1);
    },
    seek(y) {
      var V;
      (V = s.buffer) != null &&
        V.duration &&
        (y > s.buffer.duration ||
          (i
            ? ((s = m(s)), (l = c - y))
            : (s.stop(),
              (s = m(s)),
              (l = r.currentTime - y),
              s.start(0, y),
              (u = !0),
              (c = 0))));
    },
    set speed(y) {
      s.playbackRate.value = y;
    },
    get speed() {
      return s.playbackRate.value;
    },
    set detune(y) {
      s.detune.value = y;
    },
    get detune() {
      return s.detune.value;
    },
    set volume(y) {
      o.gain.value = Math.max(y, 0);
    },
    get volume() {
      return o.gain.value;
    },
    set loop(y) {
      s.loop = y;
    },
    get loop() {
      return s.loop;
    },
    duration() {
      var y;
      return ((y = s.buffer) == null ? void 0 : y.duration) ?? 0;
    },
    time() {
      return w() % this.duration();
    },
    onEnd(y) {
      return n.add(y);
    },
    then(y) {
      return this.onEnd(y);
    },
  };
}
a(ys, "play");
function As(t) {
  return ys(pe.burpSnd, t);
}
a(As, "burp");
function Aa(t) {
  return (
    t !== void 0 && (pe.masterNode.gain.value = t), pe.masterNode.gain.value
  );
}
a(Aa, "volume");
function vs() {
  D.onHide(() => {
    ue.backgroundAudio || pe.ctx.suspend();
  }),
    D.onShow(() => {
      !ue.backgroundAudio && !ie.paused && pe.ctx.resume();
    }),
    D.onResize(() => {
      if (D.isFullscreen()) return;
      let t = ue.width && ue.height;
      (t && !ue.stretch && !ue.letterbox) ||
        ((we.width = we.offsetWidth * ze),
        (we.height = we.offsetHeight * ze),
        fs(),
        t ||
          (P.frameBuffer.free(),
          (P.frameBuffer = new Qr(
            P.ggl,
            P.ggl.gl.drawingBufferWidth,
            P.ggl.gl.drawingBufferHeight
          )),
          (P.width = P.ggl.gl.drawingBufferWidth / ze / Ar),
          (P.height = P.ggl.gl.drawingBufferHeight / ze / Ar)));
    }),
    ue.debug !== !1 &&
      (D.onKeyPress(ue.debugKey ?? "f1", () => (ie.inspect = !ie.inspect)),
      D.onKeyPress("f2", () => ie.clearLog()),
      D.onKeyPress("f8", () => (ie.paused = !ie.paused)),
      D.onKeyPress("f7", () => {
        ie.timeScale = Yr(Je(ie.timeScale - 0.2, 0, 2), 1);
      }),
      D.onKeyPress("f9", () => {
        ie.timeScale = Yr(Je(ie.timeScale + 0.2, 0, 2), 1);
      }),
      D.onKeyPress("f10", () => ie.stepFrame())),
    ue.burp && D.onKeyPress("b", () => As());
}
a(vs, "initEvents");
function va(t, e = {}) {
  let r = M.root.add([Rr(t), Ss()]),
    i = (e.speed || 1) * 5,
    s = e.scale || 1;
  r.add([Wr(tl), Br(0), Jr("center"), Fi(i, s), ...(e.comps ?? [])]);
  let n = r.add([Wr(el), Br(0), Jr("center"), Xr(), ...(e.comps ?? [])]);
  return (
    n.wait(0.4 / i, () => n.use(Fi(i, s))), n.onDestroy(() => r.destroy()), r
  );
}
a(va, "addKaboom");
var ou = a(function (t, e) {
  if (M.layers) throw Error("Layers can only be assigned once.");
  let r = t.indexOf(e);
  if (r == -1)
    throw Error("The default layer name should be present in the layers list.");
  (M.layers = t), (M.defaultLayerIndex = r);
}, "layers");
function xs(t) {
  t.destroy();
}
a(xs, "destroy");
function xa() {
  return M.root;
}
a(xa, "getTreeRoot");
function Va(t, e) {
  M.scenes[t] = e;
}
a(Va, "scene");
function ba(t, ...e) {
  if (!M.scenes[t]) throw new Error(`Scene not found: ${t}`);
  M.events.onOnce("frameEnd", () => {
    M.events.trigger("sceneLeave", t),
      D.events.clear(),
      M.events.clear(),
      M.objEvents.clear(),
      [...M.root.children].forEach((r) => {
        (!r.stay || (r.scenesToStay && !r.scenesToStay.includes(t))) &&
          M.root.remove(r);
      }),
      M.root.clearEvents(),
      vs(),
      (M.cam = {
        pos: null,
        scale: b(1),
        angle: 0,
        shake: 0,
        transform: new Ze(),
      }),
      M.scenes[t](...e);
  }),
    (M.currentScene = t);
}
a(ba, "go");
function Ea(t) {
  return M.events.on("sceneLeave", t);
}
a(Ea, "onSceneLeave");
function Sa() {
  return M.currentScene;
}
a(Sa, "getSceneName");
function Wr(t, e = {}) {
  let r = null,
    i = null,
    s = null,
    n = new Be();
  if (!t) throw new Error("Please pass the resource name or data to sprite()");
  let o = a((l, c, u, d) => {
      let g = b(1, 1);
      return (
        u && d
          ? ((g.x = u / (l.width * c.w)), (g.y = d / (l.height * c.h)))
          : u
          ? ((g.x = u / (l.width * c.w)), (g.y = g.x))
          : d && ((g.y = d / (l.height * c.h)), (g.x = g.y)),
        g
      );
    }, "calcTexScale"),
    h = a((l, c) => {
      if (!c) return;
      let u = c.frames[0].clone();
      e.quad && (u = u.scale(e.quad));
      let d = o(c.tex, u, e.width, e.height);
      (l.width = c.tex.width * u.w * d.x),
        (l.height = c.tex.height * u.h * d.y),
        e.anim && l.play(e.anim),
        (r = c),
        n.trigger(r);
    }, "setSpriteData");
  return {
    id: "sprite",
    width: 0,
    height: 0,
    frame: e.frame || 0,
    quad: e.quad || new ae(0, 0, 1, 1),
    animSpeed: e.animSpeed ?? 1,
    flipX: e.flipX ?? !1,
    flipY: e.flipY ?? !1,
    get sprite() {
      return t.toString();
    },
    set sprite(l) {
      let c = yr(l);
      c && c.onLoad((u) => h(this, u));
    },
    draw() {
      if (!r) return;
      let l = r.frames[this.frame ?? 0];
      if (!l) throw new Error(`Frame not found: ${this.frame ?? 0}`);
      if (r.slice9) {
        let { left: c, right: u, top: d, bottom: g } = r.slice9,
          w = r.tex.width * l.w,
          m = r.tex.height * l.h,
          y = this.width - c - u,
          V = this.height - d - g,
          R = c / w,
          k = u / w,
          q = 1 - R - k,
          Y = d / m,
          F = g / m,
          A = 1 - Y - F,
          v = [
            de(0, 0, R, Y),
            de(R, 0, q, Y),
            de(R + q, 0, k, Y),
            de(0, Y, R, A),
            de(R, Y, q, A),
            de(R + q, Y, k, A),
            de(0, Y + A, R, F),
            de(R, Y + A, q, F),
            de(R + q, Y + A, k, F),
            de(0, 0, c, d),
            de(c, 0, y, d),
            de(c + y, 0, u, d),
            de(0, d, c, V),
            de(c, d, y, V),
            de(c + y, d, u, V),
            de(0, d + V, c, g),
            de(c, d + V, y, g),
            de(c + y, d + V, u, g),
          ];
        for (let B = 0; B < 9; B++) {
          let I = v[B],
            U = v[B + 9];
          Mr(
            Object.assign(Vt(this), {
              pos: U.pos(),
              tex: r.tex,
              quad: l.scale(I),
              flipX: this.flipX,
              flipY: this.flipY,
              tiled: e.tiled,
              width: U.w,
              height: U.h,
            })
          );
        }
      } else
        Mr(
          Object.assign(Vt(this), {
            tex: r.tex,
            quad: l.scale(this.quad ?? new ae(0, 0, 1, 1)),
            flipX: this.flipX,
            flipY: this.flipY,
            tiled: e.tiled,
            width: this.width,
            height: this.height,
          })
        );
    },
    add() {
      let l = yr(t);
      l ? l.onLoad((c) => h(this, c)) : di(() => h(this, yr(t).data));
    },
    update() {
      if (!r || !i || s === null) return;
      let l = r.anims[i.name];
      if (typeof l == "number") {
        this.frame = l;
        return;
      }
      if (l.speed === 0) throw new Error("Sprite anim speed cannot be 0");
      (i.timer += nt() * this.animSpeed),
        i.timer >= 1 / i.speed &&
          ((i.timer = 0),
          (this.frame += s),
          (this.frame < Math.min(l.from, l.to) ||
            this.frame > Math.max(l.from, l.to)) &&
            (i.loop
              ? i.pingpong
                ? ((this.frame -= s), (s *= -1), (this.frame += s))
                : (this.frame = l.from)
              : i.pingpong
              ? s === Math.sign(l.to - l.from)
                ? ((this.frame = l.to), (s *= -1), (this.frame += s))
                : ((this.frame = l.from), i.onEnd(), this.stop())
              : ((this.frame = l.to), i.onEnd(), this.stop())));
    },
    play(l, c = {}) {
      if (!r) {
        n.add(() => this.play(l, c));
        return;
      }
      let u = r.anims[l];
      if (u === void 0) throw new Error(`Anim not found: ${l}`);
      i && this.stop(),
        (i =
          typeof u == "number"
            ? {
                name: l,
                timer: 0,
                loop: !1,
                pingpong: !1,
                speed: 0,
                onEnd: a(() => {}, "onEnd"),
              }
            : {
                name: l,
                timer: 0,
                loop: c.loop ?? u.loop ?? !1,
                pingpong: c.pingpong ?? u.pingpong ?? !1,
                speed: c.speed ?? u.speed ?? 10,
                onEnd: c.onEnd ?? (() => {}),
              }),
        (s = typeof u == "number" ? null : u.from < u.to ? 1 : -1),
        (this.frame = typeof u == "number" ? u : u.from),
        this.trigger("animStart", l);
    },
    stop() {
      if (!i) return;
      let l = i.name;
      (i = null), this.trigger("animEnd", l);
    },
    numFrames() {
      return (r == null ? void 0 : r.frames.length) ?? 0;
    },
    getCurAnim() {
      return i;
    },
    curAnim() {
      return i == null ? void 0 : i.name;
    },
    getAnim(l) {
      return (r == null ? void 0 : r.anims[l]) ?? null;
    },
    hasAnim(l) {
      return !!this.getAnim(l);
    },
    onAnimEnd(l) {
      return this.on("animEnd", l);
    },
    onAnimStart(l) {
      return this.on("animStart", l);
    },
    renderArea() {
      return new me(b(0), this.width, this.height);
    },
    inspect() {
      return typeof t == "string" ? `sprite: "${t}"` : null;
    },
  };
}
a(Wr, "sprite");
function Ma(t, e = {}) {
  function r(s) {
    var o, h;
    let n = vt(
      Object.assign(Vt(s), {
        text: s.text + "",
        size: s.textSize,
        font: s.font,
        width: e.width && s.width,
        align: s.align,
        letterSpacing: s.letterSpacing,
        lineSpacing: s.lineSpacing,
        transform: s.textTransform,
        styles: s.textStyles,
      })
    );
    return (
      e.width ||
        (s.width = n.width / (((o = s.scale) == null ? void 0 : o.x) || 1)),
      (s.height = n.height / (((h = s.scale) == null ? void 0 : h.y) || 1)),
      n
    );
  }
  a(r, "update");
  let i = {
    id: "text",
    set text(s) {
      (t = s), r(this);
    },
    get text() {
      return t;
    },
    textSize: e.size ?? 36,
    font: e.font,
    width: e.width ?? 0,
    height: 0,
    align: e.align,
    lineSpacing: e.lineSpacing,
    letterSpacing: e.letterSpacing,
    textTransform: e.transform,
    textStyles: e.styles,
    add() {
      di(() => r(this));
    },
    draw() {
      xt(r(this));
    },
    renderArea() {
      return new me(b(0), this.width, this.height);
    },
  };
  return r(i), i;
}
a(Ma, "text");
function Ra(t, e) {
  return {
    id: "rect",
    width: t,
    height: e,
    draw() {
      ur(Object.assign(Vt(this), { width: this.width, height: this.height }));
    },
    renderArea() {
      return new me(b(0), this.width, this.height);
    },
    inspect() {
      return `uvquad: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)})h`;
    },
  };
}
a(Ra, "uvquad");
function Ba(t = {}) {
  let e = null,
    r = null,
    i = null,
    s = null;
  return {
    id: "agent",
    require: ["pos", "tile"],
    agentSpeed: t.speed ?? 100,
    allowDiagonals: t.allowDiagonals ?? !0,
    getDistanceToTarget() {
      return e ? this.pos.dist(e) : 0;
    },
    getNextLocation() {
      return r && i ? r[i] : null;
    },
    getPath() {
      return r ? r.slice() : null;
    },
    getTarget() {
      return e;
    },
    isNavigationFinished() {
      return r ? i === null : !0;
    },
    isTargetReachable() {
      return r !== null;
    },
    isTargetReached() {
      return e ? this.pos.eq(e) : !0;
    },
    setTarget(n) {
      (e = n),
        (r = this.getLevel().getPath(this.pos, e, {
          allowDiagonals: this.allowDiagonals,
        })),
        (i = r ? 0 : null),
        r && i !== null
          ? (s ||
              ((s = this.getLevel().onNavigationMapChanged(() => {
                e &&
                  r &&
                  i !== null &&
                  ((r = this.getLevel().getPath(this.pos, e, {
                    allowDiagonals: this.allowDiagonals,
                  })),
                  r
                    ? ((i = 0), this.trigger("navigationNext", this, r[i]))
                    : ((i = null), this.trigger("navigationEnded", this)));
              })),
              this.onDestroy(() => (s == null ? void 0 : s.cancel()))),
            this.trigger("navigationStarted", this),
            this.trigger("navigationNext", this, r[i]))
          : this.trigger("navigationEnded", this);
    },
    update() {
      if (e && r && i !== null) {
        if (this.pos.sdist(r[i]) < 2)
          if (i === r.length - 1) {
            (this.pos = e.clone()),
              (i = null),
              this.trigger("navigationEnded", this),
              this.trigger("targetReached", this);
            return;
          } else i++, this.trigger("navigationNext", this, r[i]);
        this.moveTo(r[i], this.agentSpeed);
      }
    },
    onNavigationStarted(n) {
      return this.on("navigationStarted", n);
    },
    onNavigationNext(n) {
      return this.on("navigationNext", n);
    },
    onNavigationEnded(n) {
      return this.on("navigationEnded", n);
    },
    onTargetReached(n) {
      return this.on("targetReached", n);
    },
    inspect() {
      return (
        "agent: " +
        JSON.stringify({ target: JSON.stringify(e), path: JSON.stringify(r) })
      );
    },
  };
}
a(Ba, "agent");
function Pa(t) {
  let e = t.graph;
  return {
    id: "navigator",
    require: ["pos"],
    navigateTo(r) {
      var i;
      return (i = this.graph) == null
        ? void 0
        : i.getWaypointPath(this.pos, r, t.navigationOpt);
    },
    get graph() {
      if (e) return e;
      let r = this.parent;
      for (; r; ) {
        if (r.is("navigatormap")) return r.graph;
        r = r.parent;
      }
    },
    set graph(r) {
      e = r;
    },
  };
}
a(Pa, "navigation");
function Ia(t = {}) {
  let e = t.waypoints,
    r = t.speed || 100,
    i = t.endBehavior || "stop",
    s = 0,
    n = e != null;
  return {
    id: "patrol",
    require: ["pos"],
    get patrolSpeed() {
      return r;
    },
    set patrolSpeed(o) {
      r = o;
    },
    get waypoints() {
      return e;
    },
    set waypoints(o) {
      (e = o), (s = 0), (n = !1);
    },
    get nextLocation() {
      return e ? e[s] : void 0;
    },
    update() {
      let o = this.nextLocation;
      if (!(!e || !o || n) && (this.moveTo(o, r), this.pos.sdist(o) < 9))
        switch (i) {
          case "loop":
            s = (s + 1) % e.length;
            break;
          case "ping-pong":
            (s = s + 1), s == e.length && (e.reverse(), (s = 0));
            break;
          case "stop":
            (s = Math.min(s + 1, e.length - 1)),
              s == e.length - 1 && ((n = !0), this.trigger("patrolFinished"));
            break;
        }
    },
    onPatrolFinished(o) {
      return this.on("patrolFinished", o);
    },
  };
}
a(Ia, "patrol");
function Ta(t, e = {}) {
  let r = typeof t == "function" ? t : () => M.root.query(t),
    i = e.checkFrequency || 1,
    s = typeof e.direction == "number" ? S.fromAngle(e.direction) : e.direction,
    n = 0;
  return {
    id: "sentry",
    require: ["pos"],
    direction:
      typeof e.direction == "number" ? S.fromAngle(e.direction) : e.direction,
    spotted: [],
    set directionAngle(o) {
      this.direction = o !== void 0 ? S.fromAngle(o) : void 0;
    },
    get directionAngle() {
      return this.direction ? this.direction.angle() : void 0;
    },
    fieldOfView: e.fieldOfView || 200,
    isWithinFieldOfView(o, h, l) {
      let c = (typeof h == "number" ? S.fromAngle(h) : h) || s,
        u = l || e.fieldOfView;
      if (!c || !u || u >= 360) return !0;
      let d = u / 2;
      return o.pos && c.angleBetween(o.pos.sub(this.pos)) <= d;
    },
    hasLineOfSight(o) {
      let h = ms(this.pos, o.pos.sub(this.pos), e.raycastExclude);
      return h != null && h.object === o;
    },
    update() {
      if (((n += nt()), n > i)) {
        n -= i;
        let o = r();
        if (o.length && s && this.fieldOfView && this.fieldOfView < 360) {
          let h = this.fieldOfView / 2;
          o = o.filter(
            (l) => l.pos && s.angleBetween(l.pos.sub(this.pos)) <= h
          );
        }
        o.length &&
          e.lineOfSight &&
          (o = o.filter((h) => h.pos && this.hasLineOfSight(h))),
          o.length > 0 &&
            ((this.spotted = o), this.trigger("objectSpotted", o));
      }
    },
    onObjectsSpotted(o) {
      return this.on("objectSpotted", o);
    },
  };
}
a(Ta, "sentry");
function Vs(t = {}) {
  let e = b(0),
    r = t.isObstacle ?? !1,
    i = t.cost ?? 0,
    s = t.edges ?? [],
    n = a(() => {
      let h = { left: 1, top: 2, right: 4, bottom: 8 };
      return s.map((l) => h[l] || 0).reduce((l, c) => l | c, 0);
    }, "getEdgeMask"),
    o = n();
  return {
    id: "tile",
    tilePosOffset: t.offset ?? b(0),
    set tilePos(h) {
      let l = this.getLevel();
      (e = h.clone()),
        (this.pos = b(
          this.tilePos.x * l.tileWidth(),
          this.tilePos.y * l.tileHeight()
        ).add(this.tilePosOffset));
    },
    get tilePos() {
      return e;
    },
    set isObstacle(h) {
      r !== h && ((r = h), this.getLevel().invalidateNavigationMap());
    },
    get isObstacle() {
      return r;
    },
    set cost(h) {
      i !== h && ((i = h), this.getLevel().invalidateNavigationMap());
    },
    get cost() {
      return i;
    },
    set edges(h) {
      (s = h), (o = n()), this.getLevel().invalidateNavigationMap();
    },
    get edges() {
      return s;
    },
    get edgeMask() {
      return o;
    },
    getLevel() {
      return this.parent;
    },
    moveLeft() {
      this.tilePos = this.tilePos.add(b(-1, 0));
    },
    moveRight() {
      this.tilePos = this.tilePos.add(b(1, 0));
    },
    moveUp() {
      this.tilePos = this.tilePos.add(b(0, -1));
    },
    moveDown() {
      this.tilePos = this.tilePos.add(b(0, 1));
    },
  };
}
a(Vs, "tile");
var sr,
  bs =
    ((sr = class {
      constructor(e, r, i) {
        x(this, "name");
        x(this, "duration");
        x(this, "loops");
        x(this, "direction");
        x(this, "easing");
        x(this, "interpolation");
        x(this, "isFinished");
        x(this, "timing");
        x(this, "easings");
        x(this, "relative");
        (this.name = e),
          (this.duration = r.duration),
          (this.loops = r.loops || 0),
          (this.direction = r.direction || "forward"),
          (this.easing = r.easing || br.linear),
          (this.interpolation = r.interpolation || "linear"),
          (this.isFinished = !1),
          (this.timing = r.timing),
          (this.easings = r.easings),
          (this.relative = i);
      }
      update(e, r) {
        return !0;
      }
      getLowerKeyIndexAndRelativeTime(e, r, i) {
        let s = r - 1,
          n = e / this.duration;
        if (this.loops !== 0 && n >= this.loops) return [s, 0];
        let o = Math.trunc(n);
        if (
          ((n -= o),
          (this.direction == "reverse" ||
            (this.direction == "ping-pong" && o & 1)) &&
            (n = 1 - n),
          i)
        ) {
          let h = 0;
          for (; i[h + 1] !== void 0 && i[h + 1] < n; ) h++;
          return h >= s ? [s, 0] : [h, (n - i[h]) / (i[h + 1] - i[h])];
        } else {
          let h = Math.floor((r - 1) * n);
          return [h, (n - h / s) * s];
        }
      }
      setValue(e, r, i) {
        if (this.relative)
          switch (r) {
            case "pos":
              e.pos = e.base.pos.add(i);
              break;
            case "angle":
              e.angle = e.base.angle + i;
              break;
            case "scale":
              e.scale = e.base.scale.scale(i);
              break;
            case "opacity":
              e.opacity = e.base.opacity * i;
              break;
            default:
              e[r] = i;
          }
        else e[r] = i;
      }
      serialize() {
        let e = { duration: this.duration, keys: [] };
        return (
          this.loops && (e.loops = this.loops),
          this.direction !== "forward" && (e.direction = this.direction),
          this.easing != br.linear && (e.easing = this.easing.name),
          this.interpolation !== "linear" &&
            (e.interpolation = this.interpolation),
          this.timing && (e.timing = this.timing),
          this.easings &&
            (e.easings = this.easings.map((r) => this.easing.name)),
          e
        );
      }
    }),
    a(sr, "AnimateChannel"),
    sr);
function Di(t, e) {
  return e.add(e.sub(t));
}
a(Di, "reflect");
var nr,
  au =
    ((nr = class extends bs {
      constructor(r, i, s, n) {
        super(r, s, n);
        x(this, "keys");
        this.keys = i;
      }
      update(r, i) {
        let [s, n] = this.getLowerKeyIndexAndRelativeTime(
          i,
          this.keys.length,
          this.timing
        );
        if (n == 0 || this.interpolation === "none")
          this.setValue(r, this.name, this.keys[s]);
        else {
          let o = this.easings ? this.easings[s] : this.easing;
          this.setValue(r, this.name, Ue(this.keys[s], this.keys[s + 1], o(n)));
        }
        return n == 1;
      }
      serialize() {
        return Object.assign(super.serialize(), { keys: this.keys });
      }
    }),
    a(nr, "AnimateChannelNumber"),
    nr),
  or,
  lu =
    ((or = class extends bs {
      constructor(r, i, s, n, o) {
        var h;
        super(r, s, n);
        x(this, "keys");
        x(this, "curves");
        x(this, "dcurves");
        if (((this.keys = i), this.interpolation === "spline")) {
          (this.curves = []), o && (this.dcurves = []);
          for (let l = 0; l < this.keys.length - 1; l++) {
            let c = this.keys[l],
              u = l + 1,
              d = this.keys[u],
              g = l > 0 ? this.keys[l - 1] : Di(d, c),
              w = u < this.keys.length - 1 ? this.keys[u + 1] : Di(c, d);
            this.curves.push(xr(g, c, d, w)),
              o && ((h = this.dcurves) == null || h.push(xr(g, c, d, w, bn)));
          }
        }
      }
      update(r, i) {
        let [s, n] = this.getLowerKeyIndexAndRelativeTime(
          i,
          this.keys.length,
          this.timing
        );
        if (n == 0 || this.interpolation === "none")
          this.setValue(r, this.name, this.keys[s]);
        else {
          let o = this.easings ? this.easings[s] : this.easing;
          switch (this.interpolation) {
            case "linear":
              this.setValue(
                r,
                this.name,
                this.keys[s].lerp(this.keys[s + 1], o(n))
              );
              break;
            case "slerp":
              this.setValue(
                r,
                this.name,
                this.keys[s].slerp(this.keys[s + 1], o(n))
              );
              break;
            case "spline":
              if (this.curves) {
                this.setValue(r, this.name, this.curves[s](o(n))),
                  this.dcurves &&
                    this.setValue(r, "angle", this.dcurves[s](o(n)).angle());
                break;
              }
          }
        }
        return n == 1;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          keys: this.keys.map((r) => [r.x, r.y]),
        });
      }
    }),
    a(or, "AnimateChannelVec2"),
    or),
  ar,
  uu =
    ((ar = class extends bs {
      constructor(r, i, s, n) {
        super(r, s, n);
        x(this, "keys");
        this.keys = i;
      }
      update(r, i) {
        let [s, n] = this.getLowerKeyIndexAndRelativeTime(
          i,
          this.keys.length,
          this.timing
        );
        if (n == 0 || this.interpolation == "none")
          this.setValue(r, this.name, this.keys[s]);
        else {
          let o = this.easings ? this.easings[s] : this.easing;
          this.setValue(
            r,
            this.name,
            this.keys[s].lerp(this.keys[s + 1], o(n))
          );
        }
        return n == 1;
      }
      serialize() {
        return Object.assign(super.serialize(), { keys: this.keys });
      }
    }),
    a(ar, "AnimateChannelColor"),
    ar);
function Da(t = {}) {
  let e = [],
    r = 0,
    i = !1;
  return {
    id: "animate",
    require: t.followMotion ? ["rotate"] : void 0,
    base: { pos: b(0, 0), angle: 0, scale: b(1, 1), opacity: 1 },
    add() {
      t.relative &&
        (this.is("pos") && (this.base.pos = this.pos.clone()),
        this.is("rotate") && (this.base.angle = this.angle),
        this.is("scale") && (this.base.scale = this.scale),
        this.is("opacity") && (this.base.opacity = this.opacity));
    },
    update() {
      let s = !0,
        n;
      r += nt();
      for (let o of e)
        (n = o.update(this, r)),
          n &&
            !o.isFinished &&
            ((o.isFinished = !0),
            this.trigger("animateChannelFinished", o.name)),
          s && (s = n);
      s && !i && ((i = !0), this.trigger("animateFinished"));
    },
    animate(s, n, o) {
      (i = !1),
        this.unanimate(s),
        typeof n[0] == "number"
          ? e.push(new au(s, n, o, t.relative || !1))
          : n[0] instanceof S
          ? e.push(
              new lu(
                s,
                n,
                o,
                t.relative || !1,
                s === "pos" && (t.followMotion || !1)
              )
            )
          : n[0] instanceof J && e.push(new uu(s, n, o, t.relative || !1));
    },
    unanimate(s) {
      let n = e.findIndex((o) => o.name === s);
      n >= 0 && e.splice(n, 1);
    },
    unanimateAll() {
      e.splice(0, e.length);
    },
    onAnimateFinished(s) {
      return this.on("animateFinished", s);
    },
    onAnimateChannelFinished(s) {
      return this.on("animateChannelFinished", s);
    },
    serializeAnimationChannels() {
      return e.reduce((s, n) => ((s[n.name] = n.serialize()), s), {});
    },
    serializeAnimationOptions() {
      let s = {};
      return (
        t.followMotion && (s.followMotion = !0),
        t.relative && (s.relative = !0),
        s
      );
    },
  };
}
a(Da, "animate");
function Es(t, e) {
  let r = { name: t.name };
  return (
    t.is("animate") &&
      ((r.channels = t.serializeAnimationChannels()),
      Object.assign(r, t.serializeAnimationOptions())),
    t.children.length > 0 &&
      (r.children = t.children
        .filter((i) => i.is("named"))
        .map((i) => Es(i, i.name))),
    r
  );
}
a(Es, "serializeAnimation");
function Fi(t = 2, e = 1) {
  let r = 0;
  return {
    require: ["scale"],
    update() {
      let i = Math.sin(r * t) * e;
      i < 0 && this.destroy(), (this.scale = b(i)), (r += nt());
    },
  };
}
a(Fi, "boom");
function Fa(t, e) {
  if (t == null) throw new Error("health() requires the initial amount of hp");
  return {
    id: "health",
    hurt(r = 1) {
      this.setHP(t - r), this.trigger("hurt", r);
    },
    heal(r = 1) {
      let i = t;
      this.setHP(t + r), this.trigger("heal", t - i);
    },
    hp() {
      return t;
    },
    maxHP() {
      return e ?? null;
    },
    setMaxHP(r) {
      e = r;
    },
    setHP(r) {
      (t = e ? Math.min(e, r) : r), t <= 0 && this.trigger("death");
    },
    onHurt(r) {
      return this.on("hurt", r);
    },
    onHeal(r) {
      return this.on("heal", r);
    },
    onDeath(r) {
      return this.on("death", r);
    },
    inspect() {
      return `health: ${t}`;
    },
  };
}
a(Fa, "health");
function Ca(t, e = {}) {
  if (t == null) throw new Error("lifespan() requires time");
  let r = e.fade ?? 0;
  return {
    id: "lifespan",
    require: ["opacity"],
    async add() {
      await M.root.wait(t),
        (this.opacity = this.opacity ?? 1),
        r > 0 &&
          (await M.root.tween(
            this.opacity,
            0,
            r,
            (i) => (this.opacity = i),
            br.linear
          )),
        this.destroy();
    },
  };
}
a(Ca, "lifespan");
function ka(t) {
  return { id: "named", name: t };
}
a(ka, "named");
function Ua(t, e, r) {
  if (!t) throw new Error("state() requires an initial state");
  let i = {};
  function s(l) {
    i[l] ||
      (i[l] = {
        enter: new Be(),
        end: new Be(),
        update: new Be(),
        draw: new Be(),
      });
  }
  a(s, "initStateEvents");
  function n(l, c, u) {
    return s(c), i[c][l].add(u);
  }
  a(n, "on");
  function o(l, c, ...u) {
    s(c), i[c][l].trigger(...u);
  }
  a(o, "trigger");
  let h = !1;
  return {
    id: "state",
    state: t,
    enterState(l, ...c) {
      if (((h = !0), e && !e.includes(l)))
        throw new Error(`State not found: ${l}`);
      let u = this.state;
      if (r) {
        if (!(r != null && r[u])) return;
        let d = typeof r[u] == "string" ? [r[u]] : r[u];
        if (!d.includes(l))
          throw new Error(
            `Cannot transition state from "${u}" to "${l}". Available transitions: ${d
              .map((g) => `"${g}"`)
              .join(", ")}`
          );
      }
      o("end", u, ...c),
        (this.state = l),
        o("enter", l, ...c),
        o("enter", `${u} -> ${l}`, ...c);
    },
    onStateTransition(l, c, u) {
      return n("enter", `${l} -> ${c}`, u);
    },
    onStateEnter(l, c) {
      return n("enter", l, c);
    },
    onStateUpdate(l, c) {
      return n("update", l, c);
    },
    onStateDraw(l, c) {
      return n("draw", l, c);
    },
    onStateEnd(l, c) {
      return n("end", l, c);
    },
    update() {
      h || (o("enter", t), (h = !0)), o("update", this.state);
    },
    draw() {
      o("draw", this.state);
    },
    inspect() {
      return `state: ${this.state}`;
    },
  };
}
a(Ua, "state");
function Ss(t) {
  return { id: "stay", stay: !0, scenesToStay: t };
}
a(Ss, "stay");
function Oa(t = !0, e) {
  let r, i;
  return {
    id: "textInput",
    hasFocus: t,
    require: ["text"],
    add() {
      (r = j.onCharInput((s) => {
        this.hasFocus &&
          (!e || this.text.length < e) &&
          (j.isKeyDown("shift")
            ? (this.text += s.toUpperCase())
            : (this.text += s));
      })),
        (i = j.onKeyPress("backspace", () => {
          this.hasFocus && (this.text = this.text.slice(0, -1));
        }));
    },
    destroy() {
      r.cancel(), i.cancel();
    },
  };
}
a(Oa, "textInput");
function Xr() {
  return {
    id: "timer",
    wait(t, e) {
      let r = [];
      e && r.push(e);
      let i = 0,
        s = this.onUpdate(() => {
          (i += j.dt()), i >= t && (r.forEach((n) => n()), s.cancel());
        });
      return {
        get paused() {
          return s.paused;
        },
        set paused(n) {
          s.paused = n;
        },
        cancel: s.cancel,
        onEnd(n) {
          r.push(n);
        },
        then(n) {
          return this.onEnd(n), this;
        },
      };
    },
    loop(t, e) {
      let r = null,
        i = a(() => {
          (r = this.wait(t, i)), e();
        }, "newAction");
      return (
        (r = this.wait(0, i)),
        {
          get paused() {
            return (r == null ? void 0 : r.paused) ?? !1;
          },
          set paused(s) {
            r && (r.paused = s);
          },
          cancel: a(() => (r == null ? void 0 : r.cancel()), "cancel"),
        }
      );
    },
    tween(t, e, r, i, s = br.linear) {
      let n = 0,
        o = [],
        h = this.onUpdate(() => {
          n += j.dt();
          let l = Math.min(n / r, 1);
          i(Ue(t, e, s(l))),
            l === 1 && (h.cancel(), i(e), o.forEach((c) => c()));
        });
      return {
        get paused() {
          return h.paused;
        },
        set paused(l) {
          h.paused = l;
        },
        onEnd(l) {
          o.push(l);
        },
        then(l) {
          return this.onEnd(l), this;
        },
        cancel() {
          h.cancel();
        },
        finish() {
          h.cancel(), i(e), o.forEach((l) => l());
        },
      };
    },
  };
}
a(Xr, "timer");
var Ci = 0;
function Na() {
  return Ci > 0;
}
a(Na, "usesArea");
function La(t = {}) {
  let e = {},
    r = new Set();
  return {
    id: "area",
    collisionIgnore: t.collisionIgnore ?? [],
    add() {
      Ci++,
        this.area.cursor && this.onHover(() => D.setCursor(this.area.cursor)),
        this.onCollideUpdate((i, s) => {
          if (!i.id)
            throw new Error("area() requires the object to have an id");
          e[i.id] || this.trigger("collide", i, s),
            s && ((e[i.id] = s), r.add(i.id));
        });
    },
    destroy() {
      Ci--;
    },
    update() {
      for (let i in e)
        r.has(Number(i)) ||
          (this.trigger("collideEnd", e[i].target), delete e[i]);
      r.clear();
    },
    drawInspect() {
      let i = this.localArea();
      j.pushTransform(),
        j.pushScale(this.area.scale),
        j.pushTranslate(this.area.offset);
      let s = {
        outline: { width: 4 / Zi(), color: se(0, 0, 255) },
        anchor: this.anchor,
        fill: !1,
        fixed: dt(this),
      };
      i instanceof j.Rect
        ? j.drawRect({ ...s, pos: i.pos, width: i.width, height: i.height })
        : i instanceof j.Polygon
        ? j.drawPolygon({ ...s, pts: i.pts })
        : i instanceof j.Circle &&
          j.drawCircle({ ...s, pos: i.center, radius: i.radius }),
        j.popTransform();
    },
    area: {
      shape: t.shape ?? null,
      scale: t.scale ? b(t.scale) : b(1),
      offset: t.offset ?? b(0),
      cursor: t.cursor ?? null,
    },
    isClicked() {
      return D.isMousePressed() && this.isHovering();
    },
    isHovering() {
      let i = dt(this) ? j.mousePos() : j.toWorld(j.mousePos());
      return this.hasPoint(i);
    },
    checkCollision(i) {
      if (!i.id)
        throw new Error("checkCollision() requires the object to have an id");
      return e[i.id] ?? null;
    },
    getCollisions() {
      return Object.values(e);
    },
    isColliding(i) {
      if (!i.id)
        throw new Error("isColliding() requires the object to have an id");
      return !!e[i.id];
    },
    isOverlapping(i) {
      if (!i.id)
        throw new Error("isOverlapping() requires the object to have an id");
      let s = e[i.id];
      return s && s.hasOverlap();
    },
    onClick(i, s = "left") {
      let n = D.onMousePress(s, () => {
        this.isHovering() && i();
      });
      return this.onDestroy(() => n.cancel()), n;
    },
    onHover(i) {
      let s = !1;
      return this.onUpdate(() => {
        s ? (s = this.isHovering()) : this.isHovering() && ((s = !0), i());
      });
    },
    onHoverUpdate(i) {
      return this.onUpdate(() => {
        this.isHovering() && i();
      });
    },
    onHoverEnd(i) {
      let s = !1;
      return this.onUpdate(() => {
        s ? this.isHovering() || ((s = !1), i()) : (s = this.isHovering());
      });
    },
    onCollide(i, s) {
      if (typeof i == "function" && s === void 0) return this.on("collide", i);
      if (typeof i == "string")
        return this.onCollide((n, o) => {
          n.is(i) && (s == null || s(n, o));
        });
      throw new Error("onCollide() requires either a function or a tag");
    },
    onCollideUpdate(i, s) {
      if (typeof i == "function" && s === void 0)
        return this.on("collideUpdate", i);
      if (typeof i == "string")
        return this.on(
          "collideUpdate",
          (n, o) => n.is(i) && (s == null ? void 0 : s(n, o))
        );
      throw new Error("onCollideUpdate() requires either a function or a tag");
    },
    onCollideEnd(i, s) {
      if (typeof i == "function" && s === void 0)
        return this.on("collideEnd", i);
      if (typeof i == "string")
        return this.on(
          "collideEnd",
          (n) => n.is(i) && (s == null ? void 0 : s(n))
        );
      throw new Error("onCollideEnd() requires either a function or a tag");
    },
    hasPoint(i) {
      return it(this.worldArea(), i);
    },
    resolveCollision(i) {
      let s = this.checkCollision(i);
      s &&
        !s.resolved &&
        ((this.pos = this.pos.add(s.displacement)), (s.resolved = !0));
    },
    localArea() {
      return this.area.shape ? this.area.shape : this.renderArea();
    },
    worldArea() {
      let i = this.localArea();
      if (!(i instanceof j.Polygon || i instanceof j.Rect))
        throw new Error("Only support polygon and rect shapes for now");
      let s = this.transform
        .clone()
        .scale(b(this.area.scale ?? 1))
        .translate(this.area.offset);
      if (i instanceof j.Rect) {
        let n = Tt(this.anchor || li)
          .add(1, 1)
          .scale(-0.5)
          .scale(i.width, i.height);
        s.translate(n);
      }
      return i.transform(s);
    },
    screenArea() {
      let i = this.worldArea();
      return dt(this) ? i : i.transform(M.cam.transform);
    },
    inspect() {
      return this.area.scale.x == this.area.scale.y
        ? `area: ${this.area.scale.x.toFixed(1)}x`
        : `area: (${this.area.scale.x.toFixed(1)}x, ${this.area.scale.y.toFixed(
            1
          )}y)`;
    },
  };
}
a(La, "area");
function qa(t = {}) {
  let e = null,
    r = null,
    i = !1,
    s = b(0),
    n = null,
    o = null,
    h;
  return {
    id: "body",
    require: ["pos"],
    vel: b(0),
    drag: t.drag ?? 0,
    jumpForce: t.jumpForce ?? Kl,
    gravityScale: t.gravityScale ?? 1,
    isStatic: t.isStatic ?? !1,
    mass: t.mass ?? 1,
    add() {
      if (
        ((n = this.pos.clone()),
        (o = this.pos.clone()),
        (h = this.pos.clone()),
        this.mass === 0)
      )
        throw new Error("Can't set body mass to 0");
      this.is("area") &&
        (this.onCollideUpdate((l, c) => {
          if (!c || !l.is("body") || c.resolved) return;
          this.trigger("beforePhysicsResolve", c);
          let u = c.reverse();
          if (
            (l.trigger("beforePhysicsResolve", u),
            !(c.resolved || u.resolved) && !(this.isStatic && l.isStatic))
          ) {
            if (!this.isStatic && !l.isStatic) {
              let d = this.mass + l.mass;
              (this.pos = this.pos.add(c.displacement.scale(l.mass / d))),
                (l.pos = l.pos.add(c.displacement.scale(-this.mass / d))),
                (this.transform = wr(this)),
                (l.transform = wr(l));
            } else {
              let d = !this.isStatic && l.isStatic ? c : c.reverse();
              (d.source.pos = d.source.pos.add(d.displacement)),
                (d.source.transform = wr(d.source));
            }
            (c.resolved = !0),
              this.trigger("physicsResolve", c),
              l.trigger("physicsResolve", c.reverse());
          }
        }),
        this.onPhysicsResolve((l) => {
          M.gravity &&
            (l.isBottom() && this.isFalling()
              ? ((this.vel = this.vel.reject(M.gravity.unit())),
                (e = l.target),
                (r = l.target.pos),
                i
                  ? (i = !1)
                  : (this.trigger("ground", e), l.target.trigger("land", this)))
              : l.isTop() &&
                this.isJumping() &&
                ((this.vel = this.vel.reject(M.gravity.unit())),
                this.trigger("headbutt", l.target),
                l.target.trigger("headbutted", this)));
        }));
    },
    update() {
      e &&
        (!this.isColliding(e) || !e.exists() || !e.is("body")
          ? (i = !0)
          : (r &&
              !e.pos.eq(r) &&
              t.stickToPlatform !== !1 &&
              this.moveBy(e.pos.sub(r)),
            (r = e.pos)));
      let l = j.restDt();
      l &&
        this.pos.eq(h) &&
        ((this.pos = j.lerp(n, o, l / j.fixedDt())), (h = this.pos.clone()));
    },
    fixedUpdate() {
      if (
        (n && (this.pos.eq(h) && (this.pos = n), (n = null)),
        M.gravity && !this.isStatic)
      ) {
        i && ((e = null), (r = null), this.trigger("fallOff"), (i = !1));
        let l = !0;
        if ((e && (l = !1), l)) {
          let c = this.vel.clone();
          this.vel = this.vel.add(M.gravity.scale(this.gravityScale * j.dt()));
          let u = t.maxVelocity ?? Yl;
          this.vel.slen() > u * u && (this.vel = this.vel.unit().scale(u)),
            c.dot(M.gravity) < 0 &&
              this.vel.dot(M.gravity) >= 0 &&
              this.trigger("fall");
        }
      }
      if (
        ((this.vel.x += s.x * j.dt()),
        (this.vel.y += s.y * j.dt()),
        (this.vel.x *= 1 - this.drag * j.dt()),
        (this.vel.y *= 1 - this.drag * j.dt()),
        this.move(this.vel),
        j.restDt())
      ) {
        n = this.pos.clone();
        let l = this.vel.add(s.scale(j.dt()));
        (o = this.pos.add(l.scale(j.dt()))), (h = this.pos.clone());
      }
      (s.x = 0), (s.y = 0);
    },
    onPhysicsResolve(l) {
      return this.on("physicsResolve", l);
    },
    onBeforePhysicsResolve(l) {
      return this.on("beforePhysicsResolve", l);
    },
    curPlatform() {
      return e;
    },
    isGrounded() {
      return e !== null;
    },
    isFalling() {
      return this.vel.dot(j.getGravityDirection()) > 0;
    },
    isJumping() {
      return this.vel.dot(j.getGravityDirection()) < 0;
    },
    applyImpulse(l) {
      this.vel = this.vel.add(l);
    },
    addForce(l) {
      (s.x += l.x / this.mass), (s.y += l.y / this.mass);
    },
    jump(l) {
      (e = null),
        (r = null),
        (this.vel = j.getGravityDirection().scale(-l || -this.jumpForce));
    },
    onGround(l) {
      return this.on("ground", l);
    },
    onFall(l) {
      return this.on("fall", l);
    },
    onFallOff(l) {
      return this.on("fallOff", l);
    },
    onHeadbutt(l) {
      return this.on("headbutt", l);
    },
    onLand(l) {
      return this.on("land", l);
    },
    onHeadbutted(l) {
      return this.on("headbutted", l);
    },
    inspect() {
      return `gravityScale: ${this.gravityScale}x`;
    },
  };
}
a(qa, "body");
function Ga(t = 2) {
  let e = t;
  return {
    id: "doubleJump",
    require: ["body"],
    numJumps: t,
    add() {
      this.onGround(() => {
        e = this.numJumps;
      });
    },
    doubleJump(r) {
      e <= 0 ||
        (e < this.numJumps && this.trigger("doubleJump"), e--, this.jump(r));
    },
    onDoubleJump(r) {
      return this.on("doubleJump", r);
    },
    inspect() {
      return `jumpsLeft: ${e}`;
    },
  };
}
a(Ga, "doubleJump");
function ja(t) {
  return {
    id: "surfaceEffector",
    require: ["area"],
    speed: t.speed,
    speedVariation: t.speedVariation ?? 0,
    forceScale: t.speedVariation ?? 0.9,
    add() {
      this.onCollideUpdate((e, r) => {
        var o;
        let i = r == null ? void 0 : r.normal.normal(),
          s = e.vel.project(i),
          n =
            (o = i == null ? void 0 : i.scale(this.speed)) == null
              ? void 0
              : o.sub(s);
        e.addForce(n == null ? void 0 : n.scale(e.mass * this.forceScale));
      });
    },
  };
}
a(ja, "surfaceEffector");
function Ka(t) {
  return {
    id: "areaEffector",
    require: ["area"],
    useGlobalAngle: t.useGlobalAngle || !1,
    forceAngle: t.forceAngle,
    forceMagnitude: t.forceMagnitude,
    forceVariation: t.forceVariation ?? 0,
    linearDrag: t.linearDrag ?? 0,
    add() {
      this.onCollideUpdate((e, r) => {
        let i = S.fromAngle(this.forceAngle).scale(this.forceMagnitude);
        e.addForce(i),
          this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    },
  };
}
a(Ka, "areaEffector");
function Ya(t) {
  return {
    id: "pointEffector",
    require: ["area", "pos"],
    forceMagnitude: t.forceMagnitude,
    forceVariation: t.forceVariation ?? 0,
    distanceScale: t.distanceScale ?? 1,
    forceMode: t.forceMode || "inverseLinear",
    linearDrag: t.linearDrag ?? 0,
    add() {
      this.onCollideUpdate((e, r) => {
        let i = this.pos.sub(e.pos),
          s = i.len(),
          n = (s * this.distanceScale) / 10,
          o =
            this.forceMode === "constant"
              ? 1
              : this.forceMode === "inverseLinear"
              ? 1 / n
              : 1 / n ** 2,
          h = i.scale((this.forceMagnitude * o) / s);
        e.addForce(h),
          this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    },
  };
}
a(Ya, "pointEffector");
function Ha(t) {
  return {
    id: "constantForce",
    require: ["body"],
    force: t.force,
    update() {
      this.force && this.addForce(this.force);
    },
  };
}
a(Ha, "constantForce");
function za(t) {
  return {
    id: "buoyancyEffector",
    require: ["area"],
    surfaceLevel: t.surfaceLevel,
    density: t.density ?? 1,
    linearDrag: t.linearDrag ?? 1,
    angularDrag: t.angularDrag ?? 0.2,
    flowAngle: t.flowAngle ?? 0,
    flowMagnitude: t.flowMagnitude ?? 0,
    flowVariation: t.flowVariation ?? 0,
    add() {
      this.onCollideUpdate((e, r) => {
        let i = e,
          s = i.worldArea(),
          [n, o] = s.cut(b(-100, this.surfaceLevel), b(100, this.surfaceLevel));
        n && (this.applyBuoyancy(i, n), this.applyDrag(i, n)),
          this.flowMagnitude &&
            i.addForce(S.fromAngle(this.flowAngle).scale(this.flowMagnitude));
      });
    },
    applyBuoyancy(e, r) {
      let i = this.density * r.area(),
        s = b(0, 1).scale(-i);
      e.addForce(s);
    },
    applyDrag(e, r) {
      let i = e.vel,
        s = this.density * this.linearDrag,
        n = i.scale(-s);
      e.addForce(n);
    },
  };
}
a(za, "buoyancyEffector");
function Jr(t) {
  if (!t) throw new Error("Please define an anchor");
  return {
    id: "anchor",
    anchor: t,
    inspect() {
      return typeof this.anchor == "string"
        ? "anchor: " + this.anchor
        : "anchor: " + this.anchor.toString();
    },
  };
}
a(Jr, "anchor");
function Ms() {
  return { id: "fixed", fixed: !0 };
}
a(Ms, "fixed");
function Qa(t, e) {
  return {
    id: "follow",
    require: ["pos"],
    follow: { obj: t, offset: e ?? b(0) },
    add() {
      t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    },
    update() {
      t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    },
  };
}
a(Qa, "follow");
function Wa(t) {
  var r;
  let e = (r = M.layers) == null ? void 0 : r.indexOf(t);
  return {
    id: "layer",
    get layerIndex() {
      return e ?? null;
    },
    get layer() {
      var i;
      return e ? ((i = M.layers) == null ? void 0 : i[e]) ?? null : null;
    },
    set layer(i) {
      var s;
      if (((e = (s = M.layers) == null ? void 0 : s.indexOf(i)), e == -1))
        throw Error("Invalid layer name");
    },
    inspect() {
      return `layer: ${this.layer}`;
    },
  };
}
a(Wa, "layer");
function Xa(t, e) {
  let r = typeof t == "number" ? S.fromAngle(t) : t.unit();
  return {
    id: "move",
    require: ["pos"],
    update() {
      this.move(r.scale(e));
    },
  };
}
a(Xa, "move");
function Ja(t = {}) {
  let e = t.distance ?? jl,
    r = !1;
  return {
    id: "offscreen",
    require: ["pos"],
    isOffScreen() {
      let i = this.screenPos();
      if (!i) return !1;
      let s = new me(b(0), j.width(), j.height());
      return !j.testRectPoint(s, i) && s.sdistToPoint(i) > e * e;
    },
    onExitScreen(i) {
      return this.on("exitView", i);
    },
    onEnterScreen(i) {
      return this.on("enterView", i);
    },
    update() {
      this.isOffScreen()
        ? (r || (this.trigger("exitView"), (r = !0)),
          t.hide && (this.hidden = !0),
          t.pause && (this.paused = !0),
          t.destroy && this.destroy())
        : (r && (this.trigger("enterView"), (r = !1)),
          t.hide && (this.hidden = !1),
          t.pause && (this.paused = !1));
    },
  };
}
a(Ja, "offscreen");
function Rr(...t) {
  return {
    id: "pos",
    pos: b(...t),
    moveBy(...e) {
      this.pos = this.pos.add(b(...e));
    },
    move(...e) {
      this.moveBy(b(...e).scale(j.dt()));
    },
    moveTo(...e) {
      if (typeof e[0] == "number" && typeof e[1] == "number")
        return this.moveTo(b(e[0], e[1]), e[2]);
      let r = e[0],
        i = e[1];
      if (i === void 0) {
        this.pos = b(r);
        return;
      }
      let s = r.sub(this.pos);
      if (s.len() <= i * j.dt()) {
        this.pos = b(r);
        return;
      }
      this.move(s.unit().scale(i));
    },
    worldPos(e = null) {
      return e
        ? ((this.pos = this.pos.add(this.fromWorld(e))), null)
        : this.parent
        ? this.parent.transform.multVec2(this.pos)
        : this.pos;
    },
    toWorld(e) {
      return this.parent
        ? this.parent.transform.multVec2(this.pos.add(e))
        : this.pos.add(e);
    },
    fromWorld(e) {
      return this.parent
        ? this.parent.transform.invert().multVec2(e).sub(this.pos)
        : e.sub(this.pos);
    },
    screenPos(e = null) {
      if (e) return (this.pos = this.pos.add(this.fromScreen(e))), null;
      {
        let r = this.worldPos();
        return r ? (dt(this) ? r : j.toScreen(r)) : null;
      }
    },
    toScreen(e) {
      let r = this.toWorld(e);
      return dt(this) ? r : j.toScreen(r);
    },
    fromScreen(e) {
      return dt(this) ? this.fromWorld(e) : this.fromWorld(j.toWorld(e));
    },
    toOther(e, r) {
      return e.fromWorld(this.toWorld(r));
    },
    fromOther(e, r) {
      return e.toOther(this, r);
    },
    inspect() {
      return `pos: (${Math.round(this.pos.x)}x, ${Math.round(this.pos.y)}y)`;
    },
    drawInspect() {
      j.drawCircle({ color: j.rgb(255, 0, 0), radius: 4 / Zi() });
    },
  };
}
a(Rr, "pos");
function Za(t) {
  return {
    id: "rotate",
    angle: t ?? 0,
    rotateBy(e) {
      this.angle += e;
    },
    rotateTo(e) {
      this.angle = e;
    },
    inspect() {
      return `angle: ${Math.round(this.angle)}`;
    },
  };
}
a(Za, "rotate");
function Br(...t) {
  if (t.length === 0) return Br(1);
  let e = b(...t);
  return {
    id: "scale",
    set scale(r) {
      if (!(r instanceof S))
        throw Error(
          "The scale property on scale is a vector. Use scaleTo or scaleBy to set the scale with a number."
        );
      e = b(r);
    },
    get scale() {
      return e;
    },
    scaleTo(...r) {
      e = b(...r);
    },
    scaleBy(...r) {
      e = e.scale(b(...r));
    },
    inspect() {
      return e.x == e.y
        ? `scale: ${e.x.toFixed(1)}x`
        : `scale: (${e.x.toFixed(1)}x, ${e.y.toFixed(1)}y)`;
    },
  };
}
a(Br, "scale");
function _a(t) {
  return {
    id: "z",
    z: t,
    inspect() {
      return `z: ${this.z}`;
    },
  };
}
a(_a, "z");
var hu =
    "data:image/png;base64,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",
  cu =
    "data:image/png;base64,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",
  du = "3001.0.0",
  j,
  ue,
  P,
  M,
  D,
  W,
  St,
  $a,
  ie,
  pe,
  ze,
  we,
  Ar,
  el,
  tl,
  fu = a((t = {}) => {
    ue = t;
    let e = t.root ?? document.body;
    e === document.body &&
      ((document.body.style.width = "100%"),
      (document.body.style.height = "100%"),
      (document.body.style.margin = "0px"),
      (document.documentElement.style.width = "100%"),
      (document.documentElement.style.height = "100%")),
      (we = t.canvas ?? e.appendChild(document.createElement("canvas"))),
      (Ar = t.scale ?? 1);
    let r = t.width && t.height && !t.stretch && !t.letterbox;
    r
      ? ((we.width = t.width * Ar), (we.height = t.height * Ar))
      : ((we.width = we.parentElement.offsetWidth),
        (we.height = we.parentElement.offsetHeight));
    let i = ["outline: none", "cursor: default"];
    if (r) {
      let C = we.width,
        K = we.height;
      i.push(`width: ${C}px`), i.push(`height: ${K}px`);
    } else i.push("width: 100%"), i.push("height: 100%");
    t.crisp &&
      (i.push("image-rendering: pixelated"),
      i.push("image-rendering: crisp-edges")),
      (we.style.cssText = i.join(";")),
      (ze = t.pixelDensity || window.devicePixelRatio),
      (we.width *= ze),
      (we.height *= ze),
      (we.tabIndex = 0),
      (St = document.createElement("canvas")),
      (St.width = 256),
      (St.height = 256),
      ($a = St.getContext("2d", { willReadFrequently: !0 })),
      (D = Pl({
        canvas: we,
        touchToMouse: t.touchToMouse,
        gamepads: t.gamepads,
        pixelDensity: t.pixelDensity,
        maxFPS: t.maxFPS,
        buttons: t.buttons,
      }));
    let s = [],
      n = D.canvas.getContext("webgl", {
        antialias: !0,
        depth: !0,
        stencil: !0,
        alpha: !0,
        preserveDrawingBuffer: !0,
      });
    if (!n) throw new Error("WebGL not supported");
    let o = n,
      h = Co(o, { texFilter: t.texFilter });
    (P = Jl(t, h)), (pe = nu()), (W = zl(h)), (M = iu()), M.root.use(Xr());
    function l(C, K) {
      let O = new Qr(h, C, K);
      return {
        clear: a(() => O.clear(), "clear"),
        free: a(() => O.free(), "free"),
        toDataURL: a(() => O.toDataURL(), "toDataURL"),
        toImageData: a(() => O.toImageData(), "toImageData"),
        width: O.width,
        height: O.height,
        draw: a((te) => {
          Ie(), O.bind(), te(), Ie(), O.unbind();
        }, "draw"),
      };
    }
    a(l, "makeCanvas");
    function c() {
      o.clear(o.COLOR_BUFFER_BIT),
        P.frameBuffer.bind(),
        o.clear(o.COLOR_BUFFER_BIT),
        P.bgColor ||
          tt(() => {
            ur({
              width: Ae(),
              height: ve(),
              quad: new ae(0, 0, Ae() / 64, ve() / 64),
              tex: P.bgTex,
              fixed: !0,
            });
          }),
        (P.renderer.numDraws = 0),
        (P.fixed = !1),
        (P.transformStack.length = 0),
        (P.transform = new Ze());
    }
    a(c, "frameStart");
    function u(C, K) {
      (P.postShader = C), (P.postShaderUniform = K ?? null);
    }
    a(u, "usePostEffect");
    function d() {
      Ie(),
        (P.lastDrawCalls = P.renderer.numDraws),
        P.frameBuffer.unbind(),
        o.viewport(0, 0, o.drawingBufferWidth, o.drawingBufferHeight);
      let C = P.width,
        K = P.height;
      (P.width = o.drawingBufferWidth / ze),
        (P.height = o.drawingBufferHeight / ze),
        Mr({
          flipY: !0,
          tex: P.frameBuffer.tex,
          pos: new S(P.viewport.x, P.viewport.y),
          width: P.viewport.width,
          height: P.viewport.height,
          shader: P.postShader,
          uniform:
            typeof P.postShaderUniform == "function"
              ? P.postShaderUniform()
              : P.postShaderUniform,
          fixed: !0,
        }),
        Ie(),
        (P.width = C),
        (P.height = K);
    }
    a(d, "frameEnd");
    let g = !1;
    ie = {
      inspect: !1,
      timeScale: 1,
      showLog: !0,
      fps: a(() => D.fps(), "fps"),
      numFrames: a(() => D.numFrames(), "numFrames"),
      stepFrame: N,
      drawCalls: a(() => P.lastDrawCalls, "drawCalls"),
      clearLog: a(() => (M.logs = []), "clearLog"),
      log: a((C) => {
        let K = t.logMax ?? 8;
        M.logs.unshift({ msg: C, time: D.time() }),
          M.logs.length > K && (M.logs = M.logs.slice(0, K));
      }, "log"),
      error: a(
        (C) => ie.log(new Error(C.toString ? C.toString() : C)),
        "error"
      ),
      curRecording: null,
      numObjects: a(() => F("*", { recursive: !0 }).length, "numObjects"),
      get paused() {
        return g;
      },
      set paused(C) {
        (g = C), C ? pe.ctx.suspend() : pe.ctx.resume();
      },
    };
    function w(C, K) {
      try {
        return JSON.parse(window.localStorage[C]);
      } catch {
        return K ? (m(C, K), K) : null;
      }
    }
    a(w, "getData");
    function m(C, K) {
      window.localStorage[C] = JSON.stringify(K);
    }
    a(m, "setData");
    function y(C, ...K) {
      let O = C(j),
        te;
      typeof O == "function" ? (te = O(...K)(j)) : (te = O);
      for (let ce in te)
        (j[ce] = te[ce]), t.global !== !1 && (window[ce] = te[ce]);
      return j;
    }
    a(y, "plug");
    function V(C) {
      let K = D.canvas.captureStream(C),
        O = pe.ctx.createMediaStreamDestination();
      pe.masterNode.connect(O);
      let te = new MediaRecorder(K),
        ce = [];
      return (
        (te.ondataavailable = (re) => {
          re.data.size > 0 && ce.push(re.data);
        }),
        (te.onerror = () => {
          pe.masterNode.disconnect(O), K.getTracks().forEach((re) => re.stop());
        }),
        te.start(),
        {
          resume() {
            te.resume();
          },
          pause() {
            te.pause();
          },
          stop() {
            return (
              te.stop(),
              pe.masterNode.disconnect(O),
              K.getTracks().forEach((re) => re.stop()),
              new Promise((re) => {
                te.onstop = () => {
                  re(new Blob(ce, { type: "video/mp4" }));
                };
              })
            );
          },
          download(re = "kaboom.mp4") {
            this.stop().then((xe) => bi(re, xe));
          },
        }
      );
    }
    a(V, "record");
    function R() {
      return document.activeElement === D.canvas;
    }
    a(R, "isFocused");
    let k = M.root.add.bind(M.root),
      q = M.root.readd.bind(M.root),
      Y = M.root.removeAll.bind(M.root),
      F = M.root.get.bind(M.root),
      A = M.root.wait.bind(M.root),
      v = M.root.loop.bind(M.root),
      B = M.root.query.bind(M.root),
      I = M.root.tween.bind(M.root);
    (el = Lt(null, cu)), (tl = Lt(null, hu));
    function U() {
      M.root.fixedUpdate();
    }
    a(U, "fixedUpdateFrame");
    function N() {
      M.root.update();
    }
    a(N, "updateFrame");
    const _ = class _ {
      constructor(K, O, te, ce, re = !1) {
        x(this, "source");
        x(this, "target");
        x(this, "normal");
        x(this, "distance");
        x(this, "resolved", !1);
        (this.source = K),
          (this.target = O),
          (this.normal = te),
          (this.distance = ce),
          (this.resolved = re);
      }
      get displacement() {
        return this.normal.scale(this.distance);
      }
      reverse() {
        return new _(
          this.target,
          this.source,
          this.normal.scale(-1),
          this.distance,
          this.resolved
        );
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.cross(M.gravity || b(0, 1)) > 0;
      }
      isRight() {
        return this.displacement.cross(M.gravity || b(0, 1)) < 0;
      }
      isTop() {
        return this.displacement.dot(M.gravity || b(0, 1)) > 0;
      }
      isBottom() {
        return this.displacement.dot(M.gravity || b(0, 1)) < 0;
      }
      preventResolution() {
        this.resolved = !0;
      }
    };
    a(_, "Collision");
    let G = _;
    function H() {
      if (!Na()) return;
      let C = {},
        K = t.hashGridSize || 64,
        O = new Ze(),
        te = [];
      function ce(re) {
        if (
          (te.push(O.clone()),
          re.pos && O.translate(re.pos),
          re.scale && O.scale(re.scale),
          re.angle && O.rotate(re.angle),
          (re.transform = O.clone()),
          re.c("area") && !re.paused)
        ) {
          let xe = re,
            at = xe.worldArea().bbox(),
            pi = Math.floor(at.pos.x / K),
            gi = Math.floor(at.pos.y / K),
            mi = Math.ceil((at.pos.x + at.width) / K),
            kr = Math.ceil((at.pos.y + at.height) / K),
            fr = new Set();
          for (let qe = pi; qe <= mi; qe++)
            for (let $e = gi; $e <= kr; $e++)
              if (!C[qe]) (C[qe] = {}), (C[qe][$e] = [xe]);
              else if (!C[qe][$e]) C[qe][$e] = [xe];
              else {
                let pr = C[qe][$e];
                e: for (let be of pr) {
                  if (be.paused || !be.exists() || fr.has(be.id)) continue;
                  for (let Ye of xe.collisionIgnore) if (be.is(Ye)) continue e;
                  for (let Ye of be.collisionIgnore) if (xe.is(Ye)) continue e;
                  let Dt = Pn(xe.worldArea(), be.worldArea());
                  if (Dt) {
                    let Ye = new G(xe, be, Dt.normal, Dt.distance);
                    xe.trigger("collideUpdate", be, Ye);
                    let Ur = Ye.reverse();
                    (Ur.resolved = Ye.resolved),
                      be.trigger("collideUpdate", xe, Ur);
                  }
                  fr.add(be.id);
                }
                pr.push(xe);
              }
        }
        re.children.forEach(ce), (O = te.pop());
      }
      a(ce, "checkObj"), ce(M.root);
    }
    a(H, "checkFrame");
    function z(C) {
      console.error(C), pe.ctx.suspend();
      let K =
        C.message ?? String(C) ?? "Unknown error, check console for more info";
      D.run(
        () => {},
        () => {
          c(),
            tt(() => {
              let O = Ae(),
                te = ve(),
                ce = {
                  size: 36,
                  width: O - 32 * 2,
                  letterSpacing: 4,
                  lineSpacing: 4,
                  font: Hr,
                  fixed: !0,
                };
              ke({ width: O, height: te, color: se(0, 0, 255), fixed: !0 });
              let re = vt({
                ...ce,
                text: "Error",
                pos: b(32),
                color: se(255, 128, 0),
                fixed: !0,
              });
              xt(re),
                Ti({
                  ...ce,
                  text: K,
                  pos: b(32, 32 + re.height + 16),
                  fixed: !0,
                }),
                Pe(),
                M.events.trigger("error", C);
            }),
            d();
        }
      );
    }
    a(z, "handleErr");
    function ne(C) {
      s.push(C);
    }
    a(ne, "onCleanup");
    function Z() {
      M.events.onOnce("frameEnd", () => {
        D.quit(),
          o.clear(
            o.COLOR_BUFFER_BIT | o.DEPTH_BUFFER_BIT | o.STENCIL_BUFFER_BIT
          );
        let C = o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS);
        for (let K = 0; K < C; K++)
          o.activeTexture(o.TEXTURE0 + K),
            o.bindTexture(o.TEXTURE_2D, null),
            o.bindTexture(o.TEXTURE_CUBE_MAP, null);
        o.bindBuffer(o.ARRAY_BUFFER, null),
          o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, null),
          o.bindRenderbuffer(o.RENDERBUFFER, null),
          o.bindFramebuffer(o.FRAMEBUFFER, null),
          h.destroy(),
          s.forEach((K) => K());
      });
    }
    a(Z, "quit");
    let X = !0;
    D.run(
      () => {
        try {
          W.loaded && (H(), ie.paused || U());
        } catch (C) {
          z(C);
        }
      },
      () => {
        try {
          W.loaded ||
            (yt() === 1 && !X && ((W.loaded = !0), M.events.trigger("load"))),
            (!W.loaded && t.loadingScreen !== !1) || X
              ? (c(), Oo(), d())
              : (ie.paused || N(), H(), c(), Uo(), t.debug !== !1 && ko(), d()),
            X && (X = !1),
            M.events.trigger("frameEnd");
        } catch (C) {
          z(C);
        }
      }
    ),
      fs(),
      vs(),
      (j = {
        VERSION: du,
        loadRoot: go,
        loadProgress: yt,
        loadSprite: Lt,
        loadSpriteAtlas: as,
        loadSound: Bo,
        loadMusic: Po,
        loadBitmapFont: Vo,
        loadFont: vo,
        loadShader: So,
        loadShaderURL: Mo,
        loadAseprite: Ao,
        loadPedit: bo,
        loadBean: yo,
        loadJSON: mo,
        load: zr,
        getSound: os,
        getFont: is,
        getBitmapFont: ss,
        getSprite: es,
        getShader: ns,
        getAsset: wo,
        Asset: Ne,
        SpriteData: At,
        SoundData: Sr,
        width: Ae,
        height: ve,
        center: Er,
        dt: nt,
        fixedDt: _n,
        restDt: $n,
        time: D.time,
        screenshot: D.screenshot,
        record: V,
        isFocused: R,
        setCursor: D.setCursor,
        getCursor: D.getCursor,
        setCursorLocked: D.setCursorLocked,
        isCursorLocked: D.isCursorLocked,
        setFullscreen: D.setFullscreen,
        isFullscreen: D.isFullscreen,
        isTouchscreen: D.isTouchscreen,
        onLoad: di,
        onLoading: ca,
        onResize: da,
        onGamepadConnect: D.onGamepadConnect,
        onGamepadDisconnect: D.onGamepadDisconnect,
        onError: fa,
        onCleanup: ne,
        camPos: Xo,
        camScale: Jo,
        camFlash: _o,
        camRot: Zo,
        camTransform: $o,
        shake: ea,
        toScreen: ta,
        toWorld: ra,
        setGravity: pa,
        getGravity: ga,
        setGravityDirection: ma,
        getGravityDirection: wa,
        setBackground: no,
        getBackground: oo,
        getGamepads: D.getGamepads,
        getTreeRoot: xa,
        add: k,
        make: fi,
        destroy: xs,
        destroyAll: Y,
        get: F,
        query: B,
        readd: q,
        pos: Rr,
        scale: Br,
        rotate: Za,
        color: ps,
        opacity: gs,
        anchor: Jr,
        area: La,
        sprite: Wr,
        text: Ma,
        polygon: Qo,
        rect: ws,
        circle: Go,
        uvquad: Ra,
        outline: Ho,
        particles: zo,
        body: qa,
        surfaceEffector: ja,
        areaEffector: Ka,
        pointEffector: Ya,
        buoyancyEffector: za,
        constantForce: Ha,
        doubleJump: Ga,
        shader: Wo,
        textInput: Oa,
        timer: Xr,
        fixed: Ms,
        stay: Ss,
        health: Fa,
        lifespan: Ca,
        named: ka,
        state: Ua,
        z: _a,
        layer: Wa,
        move: Xa,
        offscreen: Ja,
        follow: Qa,
        fadeIn: Ko,
        mask: Yo,
        drawon: jo,
        raycast: ms,
        tile: Vs,
        animate: Da,
        serializeAnimation: Es,
        agent: Ba,
        sentry: Ta,
        patrol: Ia,
        navigation: Pa,
        on: _e,
        onFixedUpdate: _l,
        onUpdate: $l,
        onDraw: eu,
        onAdd: sa,
        onDestroy: tu,
        onClick: ru,
        onCollide: na,
        onCollideUpdate: oa,
        onCollideEnd: aa,
        onHover: la,
        onHoverUpdate: ua,
        onHoverEnd: ha,
        onKeyDown: D.onKeyDown,
        onKeyPress: D.onKeyPress,
        onKeyPressRepeat: D.onKeyPressRepeat,
        onKeyRelease: D.onKeyRelease,
        onMouseDown: D.onMouseDown,
        onMousePress: D.onMousePress,
        onMouseRelease: D.onMouseRelease,
        onMouseMove: D.onMouseMove,
        onCharInput: D.onCharInput,
        onTouchStart: D.onTouchStart,
        onTouchMove: D.onTouchMove,
        onTouchEnd: D.onTouchEnd,
        onScroll: D.onScroll,
        onHide: D.onHide,
        onShow: D.onShow,
        onGamepadButtonDown: D.onGamepadButtonDown,
        onGamepadButtonPress: D.onGamepadButtonPress,
        onGamepadButtonRelease: D.onGamepadButtonRelease,
        onGamepadStick: D.onGamepadStick,
        onButtonPress: D.onButtonPress,
        onButtonDown: D.onButtonDown,
        onButtonRelease: D.onButtonRelease,
        mousePos: _i,
        mouseDeltaPos: D.mouseDeltaPos,
        isKeyDown: D.isKeyDown,
        isKeyPressed: D.isKeyPressed,
        isKeyPressedRepeat: D.isKeyPressedRepeat,
        isKeyReleased: D.isKeyReleased,
        isMouseDown: D.isMouseDown,
        isMousePressed: D.isMousePressed,
        isMouseReleased: D.isMouseReleased,
        isMouseMoved: D.isMouseMoved,
        isGamepadButtonPressed: D.isGamepadButtonPressed,
        isGamepadButtonDown: D.isGamepadButtonDown,
        isGamepadButtonReleased: D.isGamepadButtonReleased,
        getGamepadStick: D.getGamepadStick,
        isButtonPressed: D.isButtonPressed,
        isButtonDown: D.isButtonDown,
        isButtonReleased: D.isButtonReleased,
        setButton: D.setButton,
        getButton: D.getButton,
        getLastInputDeviceType: D.getLastInputDeviceType,
        charInputted: D.charInputted,
        loop: v,
        wait: A,
        play: ys,
        volume: Aa,
        burp: As,
        audioCtx: pe.ctx,
        Line: De,
        Rect: me,
        Circle: Oe,
        Ellipse: st,
        Point: ml,
        Polygon: Le,
        Vec2: S,
        Color: J,
        Mat4: Ze,
        Quad: ae,
        RNG: zs,
        rand: ye,
        randi: Ui,
        randSeed: Qs,
        vec2: b,
        rgb: se,
        hsl2rgb: fl,
        quad: de,
        choose: Js,
        chooseMultiple: Xs,
        shuffle: Oi,
        chance: Ws,
        lerp: Ue,
        tween: I,
        easings: br,
        map: Ke,
        mapc: Hs,
        wave: ki,
        deg2rad: ge,
        rad2deg: wt,
        clamp: Je,
        evaluateQuadratic: fn,
        evaluateQuadraticFirstDerivative: pn,
        evaluateQuadraticSecondDerivative: gn,
        evaluateBezier: si,
        evaluateBezierFirstDerivative: mn,
        evaluateBezierSecondDerivative: wn,
        evaluateCatmullRom: yn,
        evaluateCatmullRomFirstDerivative: An,
        curveLengthApproximation: zi,
        normalizedCurve: vn,
        hermite: cr,
        cardinal: Qi,
        catmullRom: xr,
        bezier: xn,
        kochanekBartels: Vn,
        easingSteps: Bn,
        easingLinear: Mn,
        easingCubicBezier: Rn,
        testLineLine: Zr,
        testRectRect: Ni,
        testRectLine: _r,
        testRectPoint: $r,
        testCirclePolygon: Ir,
        testLinePoint: ei,
        testLineCircle: hr,
        isConvex: Cn,
        triangulate: Xi,
        NavMesh: Dl,
        drawSprite: Lo,
        drawText: Ti,
        formatText: vt,
        drawRect: ke,
        drawLine: Nt,
        drawLines: ci,
        drawTriangle: cs,
        drawCircle: Fr,
        drawEllipse: ls,
        drawUVQuad: ur,
        drawPolygon: ht,
        drawCurve: us,
        drawBezier: Fo,
        drawFormattedText: xt,
        drawMasked: No,
        drawSubtracted: qo,
        pushTransform: Ce,
        popTransform: Pe,
        pushTranslate: he,
        pushScale: lr,
        pushRotate: It,
        pushMatrix: ao,
        usePostEffect: u,
        makeCanvas: l,
        debug: ie,
        scene: Va,
        getSceneName: Sa,
        go: ba,
        onSceneLeave: Ea,
        layers: ou,
        addLevel: ia,
        getData: w,
        setData: m,
        download: ni,
        downloadJSON: Ln,
        downloadText: Ji,
        downloadBlob: bi,
        plug: y,
        ASCII_CHARS: ho,
        canvas: D.canvas,
        addKaboom: va,
        LEFT: S.LEFT,
        RIGHT: S.RIGHT,
        UP: S.UP,
        DOWN: S.DOWN,
        RED: J.RED,
        GREEN: J.GREEN,
        BLUE: J.BLUE,
        YELLOW: J.YELLOW,
        MAGENTA: J.MAGENTA,
        CYAN: J.CYAN,
        WHITE: J.WHITE,
        BLACK: J.BLACK,
        quit: Z,
        KEvent: Be,
        KEventHandler: Vr,
        KEventController: dr,
      });
    let ee = t.plugins;
    if ((ee && ee.forEach(y), t.global !== !1))
      for (let C in j) window[C] = j[C];
    return t.focus !== !1 && D.canvas.focus(), j;
  }, "kaplay"),
  pu = fu;
const f = pu({
  width: 1920,
  height: 1080,
  letterbox: !0,
  background: [0, 0, 0],
  global: !1,
  buttons: { jump: { keyboard: ["space"], mouse: "left" } },
  touchToMouse: !0,
  debug: !1,
});
function gu() {
  f.add([
    f.text("Snail Ruuun", { font: "mania", size: 65 }),
    f.pos(100, 100),
    f.color(255, 255, 255),
    f.area(),
  ]),
    f.add([
      f.text("Telegram: /snailcto", { font: "mania", size: 65 }),
      f.pos(1350, 100),
      f.color(255, 255, 255),
      f.area(),
      "link",
    ]),
    f.onClick("link", () => {
      window.open("https://t.me/snailcto", "_blank");
    }),
    f.add([
      f.text("Press Space/Click/Touch to Start The Game", {
        font: "mania",
        size: 64,
      }),
      f.anchor("center"),
      f.pos(f.center()),
    ]),
    f.onButtonPress("jump", () => f.go("main-menu"));
}
function rl(t) {
  const e = f.add([
    f.sprite("sonic", { anim: "run" }),
    f.scale(4),
    f.area(),
    f.anchor("center"),
    f.pos(t),
    f.body({ jumpForce: 1700 }),
    {
      ringCollectUI: null,
      setControls() {
        f.onButtonPress("jump", () => {
          this.isGrounded() &&
            (this.play("jump"), this.jump(), f.play("jump", { volume: 0.5 }));
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);
  return (
    (e.ringCollectUI = e.add([
      f.text("", { font: "mania", size: 24 }),
      f.color(255, 255, 0),
      f.anchor("center"),
      f.pos(30, -10),
    ])),
    e
  );
}
function mu(t) {
  return f.add([
    f.sprite("motobug", { anim: "run" }),
    f.area({ shape: new f.Rect(f.vec2(-5, 0), 32, 32) }),
    f.scale(4),
    f.anchor("center"),
    f.pos(t),
    f.offscreen(),
    "enemy",
  ]);
}
function wu(t) {
  return f.add([
    f.sprite("ring", { anim: "spin" }),
    f.area(),
    f.scale(4),
    f.anchor("center"),
    f.pos(t),
    f.offscreen(),
    "ring",
  ]);
}
function yu() {
  const t = f.play("city", { volume: 0.2, loop: !0 });
  f.setGravity(3100);
  const e = 1920,
    r = [
      f.add([f.sprite("chemical-bg"), f.pos(0, 0), f.scale(2), f.opacity(50)]),
      f.add([f.sprite("chemical-bg"), f.pos(e, 1), f.scale(5), f.opacity(0.8)]),
    ],
    i = [
      f.add([f.sprite("platforms"), f.pos(0, 450), f.scale(4)]),
      f.add([f.sprite("platforms"), f.pos(384, 450), f.scale(4)]),
    ],
    s = rl(f.vec2(200, 745));
  s.setControls(), s.setEvents();
  const n = f.add([
      f.text("Press Space/Click/Touch to Jump!", { font: "mania", size: 64 }),
      f.anchor("center"),
      f.pos(f.center()),
    ]),
    o = f.onButtonPress("jump", () => {
      f.destroy(n), o.cancel();
    }),
    h = f.add([
      f.text("SCORE : 0", { font: "mania", size: 72, fontColor: "black" }),
      f.pos(20, 20),
    ]);
  let l = 0,
    c = 0;
  s.onCollide("ring", (w) => {
    f.play("ring", { volume: 0.5 }),
      f.destroy(w),
      l++,
      (h.text = `SCORE : ${l}`),
      (s.ringCollectUI.text = "+1"),
      f.wait(1, () => {
        s.ringCollectUI.text = "";
      });
  }),
    s.onCollide("enemy", (w) => {
      if (!s.isGrounded()) {
        f.play("destroy", { volume: 0.5 }),
          f.play("hyper-ring", { volume: 0.5 }),
          f.destroy(w),
          s.play("jump"),
          s.jump(),
          (c += 1),
          (l += 10 * c),
          (h.text = `SCORE : ${l}`),
          c === 1 && (s.ringCollectUI.text = `+${10 * c}`),
          c > 1 && (s.ringCollectUI.text = `x${c}`),
          f.wait(1, () => {
            s.ringCollectUI.text = "";
          });
        return;
      }
      f.play("hurt", { volume: 0.5 }),
        f.setData("current-score", l),
        f.go("gameover", t);
    });
  let u = 300;
  f.loop(1, () => {
    u += 50;
  });
  const d = () => {
    const w = mu(f.vec2(1950, 773));
    w.onUpdate(() => {
      if (u < 3e3) {
        w.move(-(u + 300), 0);
        return;
      }
      w.move(-u, 0);
    }),
      w.onExitScreen(() => {
        w.pos.x < 0 && f.destroy(w);
      });
    const m = f.rand(0.5, 2.5);
    f.wait(m, d);
  };
  d();
  const g = () => {
    const w = wu(f.vec2(1950, 745));
    w.onUpdate(() => {
      w.move(-u, 0);
    }),
      w.onExitScreen(() => {
        w.pos.x < 0 && f.destroy(w);
      });
    const m = f.rand(0.5, 3);
    f.wait(m, g);
  };
  g(),
    f.add([
      f.rect(1920, 300),
      f.opacity(0),
      f.area(),
      f.pos(0, 832),
      f.body({ isStatic: !0 }),
      "platform",
    ]),
    f.onUpdate(() => {
      s.isGrounded() && (c = 0),
        r[1].pos.x < 0 &&
          (r[0].moveTo(r[1].pos.x + e * 2, 0), r.push(r.shift())),
        r[0].move(-100, 0),
        r[1].moveTo(r[0].pos.x + e * 2, 0),
        r[0].moveTo(r[0].pos.x, -s.pos.y / 10 - 50),
        r[1].moveTo(r[1].pos.x, -s.pos.y / 10 - 50),
        i[1].pos.x < 0 &&
          (i[0].moveTo(i[1].pos.x + i[1].width * 4, 450), i.push(i.shift())),
        i[0].move(-u, 0),
        i[1].moveTo(i[0].pos.x + i[1].width * 4, 450);
    });
}
function Au(t) {
  t.paused = !0;
  let e = f.getData("best-score");
  const r = f.getData("current-score"),
    i = ["F", "E", "D", "C", "B", "A", "S"],
    s = [50, 80, 100, 200, 300, 400, 500];
  let n = "F",
    o = "F";
  for (let c = 0; c < s.length; c++)
    s[c] < r && (n = i[c]), s[c] < e && (o = i[c]);
  e < r && (f.setData("best-score", r), (e = r), (o = n)),
    f.add([
      f.text("GAME OVER", { font: "mania", size: 96 }),
      f.anchor("center"),
      f.pos(f.center().x, f.center().y - 300),
    ]),
    f.add([
      f.text(`BEST SCORE : ${e}`, { font: "mania", size: 64 }),
      f.anchor("center"),
      f.pos(f.center().x - 400, f.center().y - 200),
    ]),
    f.add([
      f.text(`CURRENT SCORE : ${r}`, { font: "mania", size: 64 }),
      f.anchor("center"),
      f.pos(f.center().x + 400, f.center().y - 200),
    ]),
    f
      .add([
        f.rect(400, 400, { radius: 4 }),
        f.color(0, 0, 0),
        f.area(),
        f.anchor("center"),
        f.outline(6, f.Color.fromArray([255, 255, 255])),
        f.pos(f.center().x - 400, f.center().y + 50),
      ])
      .add([f.text(o, { font: "mania", size: 100 }), f.anchor("center")]),
    f
      .add([
        f.rect(400, 400, { radius: 4 }),
        f.color(0, 0, 0),
        f.area(),
        f.anchor("center"),
        f.outline(6, f.Color.fromArray([255, 255, 255])),
        f.pos(f.center().x + 400, f.center().y + 50),
      ])
      .add([f.text(n, { font: "mania", size: 100 }), f.anchor("center")]),
    f.wait(1, () => {
      f.add([
        f.text("Press Space/Click/Touch to Play Again", {
          font: "mania",
          size: 64,
        }),
        f.anchor("center"),
        f.pos(f.center().x, f.center().y + 350),
      ]),
        f.onButtonPress("jump", () => f.go("game"));
    });
}
function vu() {
  f.getData("best-score") || f.setData("best-score", 0),
    f.onButtonPress("jump", () => f.go("game"));
  const t = 1920,
    e = [
      f.add([f.sprite("chemical-bg"), f.pos(0, 0), f.scale(2), f.opacity(0.8)]),
      f.add([
        f.sprite("chemical-bg"),
        f.pos(1920, 0),
        f.scale(2),
        f.opacity(0.8),
      ]),
    ],
    r = [
      f.add([f.sprite("platforms"), f.pos(0, 450), f.scale(4)]),
      f.add([f.sprite("platforms"), f.pos(384, 450), f.scale(4)]),
    ];
  f.add([
    f.text("Running Snail", { font: "mania", size: 96 }),
    f.anchor("center"),
    f.pos(f.center().x, 200),
  ]),
    f.add([
      f.text("Press Space/Click/Touch to Play", { font: "mania", size: 32 }),
      f.anchor("center"),
      f.pos(f.center().x, f.center().y - 200),
    ]),
    rl(f.vec2(200, 745));
  const i = 4e3;
  f.onUpdate(() => {
    e[1].pos.x < 0 && (e[0].moveTo(e[1].pos.x + t * 2, 0), e.push(e.shift())),
      e[0].move(-100, 0),
      e[1].moveTo(e[0].pos.x + t * 2, 0),
      r[1].pos.x < 0 &&
        (r[0].moveTo(r[1].pos.x + r[1].width * 4, 450), r.push(r.shift())),
      r[0].move(-i, 0),
      r[1].moveTo(r[0].pos.x + r[1].width * 4, 450);
  });
}
f.loadSprite("chemical-bg", "graphics/chemical-bg.png");
f.loadSprite("platforms", "graphics/platforms.png");
f.loadSprite("sonic", "graphics/sonic.png", {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 1, loop: !0, speed: 5 },
    jump: { from: 8, to: 8, loop: !0, speed: 100 },
  },
});
f.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: { spin: { from: 0, to: 1, loop: !0, speed: 5 } },
});
f.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5,
  sliceY: 1,
  anims: { run: { from: 0, to: 4, loop: !0, speed: 8 } },
});
f.loadFont("mania", "fonts/mania.ttf");
f.loadSound("destroy", "sounds/Destroy.wav");
f.loadSound("hurt", "sounds/Hurt.wav");
f.loadSound("hyper-ring", "sounds/HyperRing.wav");
f.loadSound("jump", "sounds/Jump.wav");
f.loadSound("ring", "sounds/Ring.wav");
f.loadSound("city", "sounds/city.mp3");
f.scene("disclaimer", gu);
f.scene("main-menu", vu);
f.scene("game", yu);
f.scene("gameover", Au);
f.go("disclaimer");
