var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
};

// node_modules/chroma-js/chroma.js
var require_chroma = __commonJS((exports, module) => {
  /**
   * chroma.js - JavaScript library for color conversions
   *
   * Copyright (c) 2011-2019, Gregor Aisch
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice, this
   * list of conditions and the following disclaimer.
   *
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   * this list of conditions and the following disclaimer in the documentation
   * and/or other materials provided with the distribution.
   *
   * 3. The name Gregor Aisch may not be used to endorse or promote products
   * derived from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
   * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
   * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   * -------------------------------------------------------
   *
   * chroma.js includes colors from colorbrewer2.org, which are released under
   * the following license:
   *
   * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
   * and The Pennsylvania State University.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing,
   * software distributed under the License is distributed on an
   * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
   * either express or implied. See the License for the specific
   * language governing permissions and limitations under the License.
   *
   * ------------------------------------------------------
   *
   * Named colors are taken from X11 Color Names.
   * http://www.w3.org/TR/css3-color/#svg-color
   *
   * @preserve
   */
  (function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.chroma = factory();
  })(exports, function() {
    "use strict";
    var limit = function(x, min5, max5) {
      if (min5 === void 0)
        min5 = 0;
      if (max5 === void 0)
        max5 = 1;
      return x < min5 ? min5 : x > max5 ? max5 : x;
    };
    var clip_rgb = function(rgb) {
      rgb._clipped = false;
      rgb._unclipped = rgb.slice(0);
      for (var i2 = 0; i2 <= 3; i2++) {
        if (i2 < 3) {
          if (rgb[i2] < 0 || rgb[i2] > 255) {
            rgb._clipped = true;
          }
          rgb[i2] = limit(rgb[i2], 0, 255);
        } else if (i2 === 3) {
          rgb[i2] = limit(rgb[i2], 0, 1);
        }
      }
      return rgb;
    };
    var classToType = {};
    for (var i = 0, list = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]; i < list.length; i += 1) {
      var name = list[i];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    var type = function(obj) {
      return classToType[Object.prototype.toString.call(obj)] || "object";
    };
    var unpack = function(args, keyOrder) {
      if (keyOrder === void 0)
        keyOrder = null;
      if (args.length >= 3) {
        return Array.prototype.slice.call(args);
      }
      if (type(args[0]) == "object" && keyOrder) {
        return keyOrder.split("").filter(function(k) {
          return args[0][k] !== void 0;
        }).map(function(k) {
          return args[0][k];
        });
      }
      return args[0];
    };
    var last = function(args) {
      if (args.length < 2) {
        return null;
      }
      var l = args.length - 1;
      if (type(args[l]) == "string") {
        return args[l].toLowerCase();
      }
      return null;
    };
    var PI = Math.PI;
    var utils = {
      clip_rgb,
      limit,
      type,
      unpack,
      last,
      PI,
      TWOPI: PI * 2,
      PITHIRD: PI / 3,
      DEG2RAD: PI / 180,
      RAD2DEG: 180 / PI
    };
    var input = {
      format: {},
      autodetect: []
    };
    var last$1 = utils.last;
    var clip_rgb$1 = utils.clip_rgb;
    var type$1 = utils.type;
    var Color = function Color2() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var me = this;
      if (type$1(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
        return args[0];
      }
      var mode = last$1(args);
      var autodetect = false;
      if (!mode) {
        autodetect = true;
        if (!input.sorted) {
          input.autodetect = input.autodetect.sort(function(a, b) {
            return b.p - a.p;
          });
          input.sorted = true;
        }
        for (var i2 = 0, list2 = input.autodetect; i2 < list2.length; i2 += 1) {
          var chk = list2[i2];
          mode = chk.test.apply(chk, args);
          if (mode) {
            break;
          }
        }
      }
      if (input.format[mode]) {
        var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
        me._rgb = clip_rgb$1(rgb);
      } else {
        throw new Error("unknown format: " + args);
      }
      if (me._rgb.length === 3) {
        me._rgb.push(1);
      }
    };
    Color.prototype.toString = function toString() {
      if (type$1(this.hex) == "function") {
        return this.hex();
      }
      return "[" + this._rgb.join(",") + "]";
    };
    var Color_1 = Color;
    var chroma3 = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(chroma3.Color, [null].concat(args)))();
    };
    chroma3.Color = Color_1;
    chroma3.version = "2.1.1";
    var chroma_1 = chroma3;
    var unpack$1 = utils.unpack;
    var max4 = Math.max;
    var rgb2cmyk = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$1(args, "rgb");
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      r = r / 255;
      g = g / 255;
      b = b / 255;
      var k = 1 - max4(r, max4(g, b));
      var f = k < 1 ? 1 / (1 - k) : 0;
      var c = (1 - r - k) * f;
      var m = (1 - g - k) * f;
      var y = (1 - b - k) * f;
      return [c, m, y, k];
    };
    var rgb2cmyk_1 = rgb2cmyk;
    var unpack$2 = utils.unpack;
    var cmyk2rgb = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$2(args, "cmyk");
      var c = args[0];
      var m = args[1];
      var y = args[2];
      var k = args[3];
      var alpha = args.length > 4 ? args[4] : 1;
      if (k === 1) {
        return [0, 0, 0, alpha];
      }
      return [
        c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
        m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
        y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
        alpha
      ];
    };
    var cmyk2rgb_1 = cmyk2rgb;
    var unpack$3 = utils.unpack;
    var type$2 = utils.type;
    Color_1.prototype.cmyk = function() {
      return rgb2cmyk_1(this._rgb);
    };
    chroma_1.cmyk = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["cmyk"])))();
    };
    input.format.cmyk = cmyk2rgb_1;
    input.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len5 = arguments.length;
        while (len5--)
          args[len5] = arguments[len5];
        args = unpack$3(args, "cmyk");
        if (type$2(args) === "array" && args.length === 4) {
          return "cmyk";
        }
      }
    });
    var unpack$4 = utils.unpack;
    var last$2 = utils.last;
    var rnd = function(a) {
      return Math.round(a * 100) / 100;
    };
    var hsl2css = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var hsla = unpack$4(args, "hsla");
      var mode = last$2(args) || "lsa";
      hsla[0] = rnd(hsla[0] || 0);
      hsla[1] = rnd(hsla[1] * 100) + "%";
      hsla[2] = rnd(hsla[2] * 100) + "%";
      if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
        hsla[3] = hsla.length > 3 ? hsla[3] : 1;
        mode = "hsla";
      } else {
        hsla.length = 3;
      }
      return mode + "(" + hsla.join(",") + ")";
    };
    var hsl2css_1 = hsl2css;
    var unpack$5 = utils.unpack;
    var rgb2hsl = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$5(args, "rgba");
      var r = args[0];
      var g = args[1];
      var b = args[2];
      r /= 255;
      g /= 255;
      b /= 255;
      var min5 = Math.min(r, g, b);
      var max5 = Math.max(r, g, b);
      var l = (max5 + min5) / 2;
      var s, h;
      if (max5 === min5) {
        s = 0;
        h = Number.NaN;
      } else {
        s = l < 0.5 ? (max5 - min5) / (max5 + min5) : (max5 - min5) / (2 - max5 - min5);
      }
      if (r == max5) {
        h = (g - b) / (max5 - min5);
      } else if (g == max5) {
        h = 2 + (b - r) / (max5 - min5);
      } else if (b == max5) {
        h = 4 + (r - g) / (max5 - min5);
      }
      h *= 60;
      if (h < 0) {
        h += 360;
      }
      if (args.length > 3 && args[3] !== void 0) {
        return [h, s, l, args[3]];
      }
      return [h, s, l];
    };
    var rgb2hsl_1 = rgb2hsl;
    var unpack$6 = utils.unpack;
    var last$3 = utils.last;
    var round4 = Math.round;
    var rgb2css = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var rgba = unpack$6(args, "rgba");
      var mode = last$3(args) || "rgb";
      if (mode.substr(0, 3) == "hsl") {
        return hsl2css_1(rgb2hsl_1(rgba), mode);
      }
      rgba[0] = round4(rgba[0]);
      rgba[1] = round4(rgba[1]);
      rgba[2] = round4(rgba[2]);
      if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = "rgba";
      }
      return mode + "(" + rgba.slice(0, mode === "rgb" ? 3 : 4).join(",") + ")";
    };
    var rgb2css_1 = rgb2css;
    var unpack$7 = utils.unpack;
    var round$1 = Math.round;
    var hsl2rgb = function() {
      var assign;
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$7(args, "hsl");
      var h = args[0];
      var s = args[1];
      var l = args[2];
      var r, g, b;
      if (s === 0) {
        r = g = b = l * 255;
      } else {
        var t3 = [0, 0, 0];
        var c = [0, 0, 0];
        var t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var t1 = 2 * l - t2;
        var h_ = h / 360;
        t3[0] = h_ + 1 / 3;
        t3[1] = h_;
        t3[2] = h_ - 1 / 3;
        for (var i2 = 0; i2 < 3; i2++) {
          if (t3[i2] < 0) {
            t3[i2] += 1;
          }
          if (t3[i2] > 1) {
            t3[i2] -= 1;
          }
          if (6 * t3[i2] < 1) {
            c[i2] = t1 + (t2 - t1) * 6 * t3[i2];
          } else if (2 * t3[i2] < 1) {
            c[i2] = t2;
          } else if (3 * t3[i2] < 2) {
            c[i2] = t1 + (t2 - t1) * (2 / 3 - t3[i2]) * 6;
          } else {
            c[i2] = t1;
          }
        }
        assign = [round$1(c[0] * 255), round$1(c[1] * 255), round$1(c[2] * 255)], r = assign[0], g = assign[1], b = assign[2];
      }
      if (args.length > 3) {
        return [r, g, b, args[3]];
      }
      return [r, g, b, 1];
    };
    var hsl2rgb_1 = hsl2rgb;
    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var round$2 = Math.round;
    var css2rgb = function(css2) {
      css2 = css2.toLowerCase().trim();
      var m;
      if (input.format.named) {
        try {
          return input.format.named(css2);
        } catch (e) {
        }
      }
      if (m = css2.match(RE_RGB)) {
        var rgb = m.slice(1, 4);
        for (var i2 = 0; i2 < 3; i2++) {
          rgb[i2] = +rgb[i2];
        }
        rgb[3] = 1;
        return rgb;
      }
      if (m = css2.match(RE_RGBA)) {
        var rgb$12 = m.slice(1, 5);
        for (var i$12 = 0; i$12 < 4; i$12++) {
          rgb$12[i$12] = +rgb$12[i$12];
        }
        return rgb$12;
      }
      if (m = css2.match(RE_RGB_PCT)) {
        var rgb$2 = m.slice(1, 4);
        for (var i$2 = 0; i$2 < 3; i$2++) {
          rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
        }
        rgb$2[3] = 1;
        return rgb$2;
      }
      if (m = css2.match(RE_RGBA_PCT)) {
        var rgb$3 = m.slice(1, 5);
        for (var i$3 = 0; i$3 < 3; i$3++) {
          rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
        }
        rgb$3[3] = +rgb$3[3];
        return rgb$3;
      }
      if (m = css2.match(RE_HSL)) {
        var hsl = m.slice(1, 4);
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        var rgb$4 = hsl2rgb_1(hsl);
        rgb$4[3] = 1;
        return rgb$4;
      }
      if (m = css2.match(RE_HSLA)) {
        var hsl$12 = m.slice(1, 4);
        hsl$12[1] *= 0.01;
        hsl$12[2] *= 0.01;
        var rgb$5 = hsl2rgb_1(hsl$12);
        rgb$5[3] = +m[4];
        return rgb$5;
      }
    };
    css2rgb.test = function(s) {
      return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
    };
    var css2rgb_1 = css2rgb;
    var type$3 = utils.type;
    Color_1.prototype.css = function(mode) {
      return rgb2css_1(this._rgb, mode);
    };
    chroma_1.css = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["css"])))();
    };
    input.format.css = css2rgb_1;
    input.autodetect.push({
      p: 5,
      test: function(h) {
        var rest = [], len5 = arguments.length - 1;
        while (len5-- > 0)
          rest[len5] = arguments[len5 + 1];
        if (!rest.length && type$3(h) === "string" && css2rgb_1.test(h)) {
          return "css";
        }
      }
    });
    var unpack$8 = utils.unpack;
    input.format.gl = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var rgb = unpack$8(args, "rgba");
      rgb[0] *= 255;
      rgb[1] *= 255;
      rgb[2] *= 255;
      return rgb;
    };
    chroma_1.gl = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["gl"])))();
    };
    Color_1.prototype.gl = function() {
      var rgb = this._rgb;
      return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
    };
    var unpack$9 = utils.unpack;
    var rgb2hcg = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$9(args, "rgb");
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      var min5 = Math.min(r, g, b);
      var max5 = Math.max(r, g, b);
      var delta = max5 - min5;
      var c = delta * 100 / 255;
      var _g = min5 / (255 - delta) * 100;
      var h;
      if (delta === 0) {
        h = Number.NaN;
      } else {
        if (r === max5) {
          h = (g - b) / delta;
        }
        if (g === max5) {
          h = 2 + (b - r) / delta;
        }
        if (b === max5) {
          h = 4 + (r - g) / delta;
        }
        h *= 60;
        if (h < 0) {
          h += 360;
        }
      }
      return [h, c, _g];
    };
    var rgb2hcg_1 = rgb2hcg;
    var unpack$a = utils.unpack;
    var floor4 = Math.floor;
    var hcg2rgb = function() {
      var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$a(args, "hcg");
      var h = args[0];
      var c = args[1];
      var _g = args[2];
      var r, g, b;
      _g = _g * 255;
      var _c = c * 255;
      if (c === 0) {
        r = g = b = _g;
      } else {
        if (h === 360) {
          h = 0;
        }
        if (h > 360) {
          h -= 360;
        }
        if (h < 0) {
          h += 360;
        }
        h /= 60;
        var i2 = floor4(h);
        var f = h - i2;
        var p = _g * (1 - c);
        var q = p + _c * (1 - f);
        var t = p + _c * f;
        var v = p + _c;
        switch (i2) {
          case 0:
            assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
            break;
          case 1:
            assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
            break;
          case 2:
            assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
            break;
          case 3:
            assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
            break;
          case 4:
            assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
            break;
          case 5:
            assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
            break;
        }
      }
      return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    var hcg2rgb_1 = hcg2rgb;
    var unpack$b = utils.unpack;
    var type$4 = utils.type;
    Color_1.prototype.hcg = function() {
      return rgb2hcg_1(this._rgb);
    };
    chroma_1.hcg = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hcg"])))();
    };
    input.format.hcg = hcg2rgb_1;
    input.autodetect.push({
      p: 1,
      test: function() {
        var args = [], len5 = arguments.length;
        while (len5--)
          args[len5] = arguments[len5];
        args = unpack$b(args, "hcg");
        if (type$4(args) === "array" && args.length === 3) {
          return "hcg";
        }
      }
    });
    var unpack$c = utils.unpack;
    var last$4 = utils.last;
    var round$3 = Math.round;
    var rgb2hex = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$c(args, "rgba");
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      var a = ref[3];
      var mode = last$4(args) || "auto";
      if (a === void 0) {
        a = 1;
      }
      if (mode === "auto") {
        mode = a < 1 ? "rgba" : "rgb";
      }
      r = round$3(r);
      g = round$3(g);
      b = round$3(b);
      var u = r << 16 | g << 8 | b;
      var str6 = "000000" + u.toString(16);
      str6 = str6.substr(str6.length - 6);
      var hxa = "0" + round$3(a * 255).toString(16);
      hxa = hxa.substr(hxa.length - 2);
      switch (mode.toLowerCase()) {
        case "rgba":
          return "#" + str6 + hxa;
        case "argb":
          return "#" + hxa + str6;
        default:
          return "#" + str6;
      }
    };
    var rgb2hex_1 = rgb2hex;
    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
    var hex2rgb = function(hex) {
      if (hex.match(RE_HEX)) {
        if (hex.length === 4 || hex.length === 7) {
          hex = hex.substr(1);
        }
        if (hex.length === 3) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        var u = parseInt(hex, 16);
        var r = u >> 16;
        var g = u >> 8 & 255;
        var b = u & 255;
        return [r, g, b, 1];
      }
      if (hex.match(RE_HEXA)) {
        if (hex.length === 5 || hex.length === 9) {
          hex = hex.substr(1);
        }
        if (hex.length === 4) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        var u$1 = parseInt(hex, 16);
        var r$1 = u$1 >> 24 & 255;
        var g$1 = u$1 >> 16 & 255;
        var b$1 = u$1 >> 8 & 255;
        var a = Math.round((u$1 & 255) / 255 * 100) / 100;
        return [r$1, g$1, b$1, a];
      }
      throw new Error("unknown hex color: " + hex);
    };
    var hex2rgb_1 = hex2rgb;
    var type$5 = utils.type;
    Color_1.prototype.hex = function(mode) {
      return rgb2hex_1(this._rgb, mode);
    };
    chroma_1.hex = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hex"])))();
    };
    input.format.hex = hex2rgb_1;
    input.autodetect.push({
      p: 4,
      test: function(h) {
        var rest = [], len5 = arguments.length - 1;
        while (len5-- > 0)
          rest[len5] = arguments[len5 + 1];
        if (!rest.length && type$5(h) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
          return "hex";
        }
      }
    });
    var unpack$d = utils.unpack;
    var TWOPI = utils.TWOPI;
    var min4 = Math.min;
    var sqrt = Math.sqrt;
    var acos = Math.acos;
    var rgb2hsi = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$d(args, "rgb");
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      r /= 255;
      g /= 255;
      b /= 255;
      var h;
      var min_ = min4(r, g, b);
      var i2 = (r + g + b) / 3;
      var s = i2 > 0 ? 1 - min_ / i2 : 0;
      if (s === 0) {
        h = NaN;
      } else {
        h = (r - g + (r - b)) / 2;
        h /= sqrt((r - g) * (r - g) + (r - b) * (g - b));
        h = acos(h);
        if (b > g) {
          h = TWOPI - h;
        }
        h /= TWOPI;
      }
      return [h * 360, s, i2];
    };
    var rgb2hsi_1 = rgb2hsi;
    var unpack$e = utils.unpack;
    var limit$1 = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos = Math.cos;
    var hsi2rgb = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$e(args, "hsi");
      var h = args[0];
      var s = args[1];
      var i2 = args[2];
      var r, g, b;
      if (isNaN(h)) {
        h = 0;
      }
      if (isNaN(s)) {
        s = 0;
      }
      if (h > 360) {
        h -= 360;
      }
      if (h < 0) {
        h += 360;
      }
      h /= 360;
      if (h < 1 / 3) {
        b = (1 - s) / 3;
        r = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
        g = 1 - (b + r);
      } else if (h < 2 / 3) {
        h -= 1 / 3;
        r = (1 - s) / 3;
        g = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
        b = 1 - (r + g);
      } else {
        h -= 2 / 3;
        g = (1 - s) / 3;
        b = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
        r = 1 - (g + b);
      }
      r = limit$1(i2 * r * 3);
      g = limit$1(i2 * g * 3);
      b = limit$1(i2 * b * 3);
      return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
    };
    var hsi2rgb_1 = hsi2rgb;
    var unpack$f = utils.unpack;
    var type$6 = utils.type;
    Color_1.prototype.hsi = function() {
      return rgb2hsi_1(this._rgb);
    };
    chroma_1.hsi = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hsi"])))();
    };
    input.format.hsi = hsi2rgb_1;
    input.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len5 = arguments.length;
        while (len5--)
          args[len5] = arguments[len5];
        args = unpack$f(args, "hsi");
        if (type$6(args) === "array" && args.length === 3) {
          return "hsi";
        }
      }
    });
    var unpack$g = utils.unpack;
    var type$7 = utils.type;
    Color_1.prototype.hsl = function() {
      return rgb2hsl_1(this._rgb);
    };
    chroma_1.hsl = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hsl"])))();
    };
    input.format.hsl = hsl2rgb_1;
    input.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len5 = arguments.length;
        while (len5--)
          args[len5] = arguments[len5];
        args = unpack$g(args, "hsl");
        if (type$7(args) === "array" && args.length === 3) {
          return "hsl";
        }
      }
    });
    var unpack$h = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;
    var rgb2hsl$1 = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$h(args, "rgb");
      var r = args[0];
      var g = args[1];
      var b = args[2];
      var min_ = min$1(r, g, b);
      var max_ = max$1(r, g, b);
      var delta = max_ - min_;
      var h, s, v;
      v = max_ / 255;
      if (max_ === 0) {
        h = Number.NaN;
        s = 0;
      } else {
        s = delta / max_;
        if (r === max_) {
          h = (g - b) / delta;
        }
        if (g === max_) {
          h = 2 + (b - r) / delta;
        }
        if (b === max_) {
          h = 4 + (r - g) / delta;
        }
        h *= 60;
        if (h < 0) {
          h += 360;
        }
      }
      return [h, s, v];
    };
    var rgb2hsv = rgb2hsl$1;
    var unpack$i = utils.unpack;
    var floor$1 = Math.floor;
    var hsv2rgb = function() {
      var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$i(args, "hsv");
      var h = args[0];
      var s = args[1];
      var v = args[2];
      var r, g, b;
      v *= 255;
      if (s === 0) {
        r = g = b = v;
      } else {
        if (h === 360) {
          h = 0;
        }
        if (h > 360) {
          h -= 360;
        }
        if (h < 0) {
          h += 360;
        }
        h /= 60;
        var i2 = floor$1(h);
        var f = h - i2;
        var p = v * (1 - s);
        var q = v * (1 - s * f);
        var t = v * (1 - s * (1 - f));
        switch (i2) {
          case 0:
            assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
            break;
          case 1:
            assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
            break;
          case 2:
            assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
            break;
          case 3:
            assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
            break;
          case 4:
            assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
            break;
          case 5:
            assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
            break;
        }
      }
      return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    var hsv2rgb_1 = hsv2rgb;
    var unpack$j = utils.unpack;
    var type$8 = utils.type;
    Color_1.prototype.hsv = function() {
      return rgb2hsv(this._rgb);
    };
    chroma_1.hsv = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hsv"])))();
    };
    input.format.hsv = hsv2rgb_1;
    input.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len5 = arguments.length;
        while (len5--)
          args[len5] = arguments[len5];
        args = unpack$j(args, "hsv");
        if (type$8(args) === "array" && args.length === 3) {
          return "hsv";
        }
      }
    });
    var labConstants = {
      Kn: 18,
      Xn: 0.95047,
      Yn: 1,
      Zn: 1.08883,
      t0: 0.137931034,
      t1: 0.206896552,
      t2: 0.12841855,
      t3: 8856452e-9
    };
    var unpack$k = utils.unpack;
    var pow2 = Math.pow;
    var rgb2lab = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$k(args, "rgb");
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      var ref$1 = rgb2xyz(r, g, b);
      var x = ref$1[0];
      var y = ref$1[1];
      var z = ref$1[2];
      var l = 116 * y - 16;
      return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };
    var rgb_xyz = function(r) {
      if ((r /= 255) <= 0.04045) {
        return r / 12.92;
      }
      return pow2((r + 0.055) / 1.055, 2.4);
    };
    var xyz_lab = function(t) {
      if (t > labConstants.t3) {
        return pow2(t, 1 / 3);
      }
      return t / labConstants.t2 + labConstants.t0;
    };
    var rgb2xyz = function(r, g, b) {
      r = rgb_xyz(r);
      g = rgb_xyz(g);
      b = rgb_xyz(b);
      var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
      var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / labConstants.Yn);
      var z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / labConstants.Zn);
      return [x, y, z];
    };
    var rgb2lab_1 = rgb2lab;
    var unpack$l = utils.unpack;
    var pow$1 = Math.pow;
    var lab2rgb = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$l(args, "lab");
      var l = args[0];
      var a = args[1];
      var b = args[2];
      var x, y, z, r, g, b_;
      y = (l + 16) / 116;
      x = isNaN(a) ? y : y + a / 500;
      z = isNaN(b) ? y : y - b / 200;
      y = labConstants.Yn * lab_xyz(y);
      x = labConstants.Xn * lab_xyz(x);
      z = labConstants.Zn * lab_xyz(z);
      r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
      g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
      b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
      return [r, g, b_, args.length > 3 ? args[3] : 1];
    };
    var xyz_rgb = function(r) {
      return 255 * (r <= 304e-5 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055);
    };
    var lab_xyz = function(t) {
      return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0);
    };
    var lab2rgb_1 = lab2rgb;
    var unpack$m = utils.unpack;
    var type$9 = utils.type;
    Color_1.prototype.lab = function() {
      return rgb2lab_1(this._rgb);
    };
    chroma_1.lab = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["lab"])))();
    };
    input.format.lab = lab2rgb_1;
    input.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len5 = arguments.length;
        while (len5--)
          args[len5] = arguments[len5];
        args = unpack$m(args, "lab");
        if (type$9(args) === "array" && args.length === 3) {
          return "lab";
        }
      }
    });
    var unpack$n = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$1 = Math.sqrt;
    var atan2 = Math.atan2;
    var round$4 = Math.round;
    var lab2lch = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$n(args, "lab");
      var l = ref[0];
      var a = ref[1];
      var b = ref[2];
      var c = sqrt$1(a * a + b * b);
      var h = (atan2(b, a) * RAD2DEG + 360) % 360;
      if (round$4(c * 1e4) === 0) {
        h = Number.NaN;
      }
      return [l, c, h];
    };
    var lab2lch_1 = lab2lch;
    var unpack$o = utils.unpack;
    var rgb2lch = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$o(args, "rgb");
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      var ref$1 = rgb2lab_1(r, g, b);
      var l = ref$1[0];
      var a = ref$1[1];
      var b_ = ref$1[2];
      return lab2lch_1(l, a, b_);
    };
    var rgb2lch_1 = rgb2lch;
    var unpack$p = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin = Math.sin;
    var cos$1 = Math.cos;
    var lch2lab = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$p(args, "lch");
      var l = ref[0];
      var c = ref[1];
      var h = ref[2];
      if (isNaN(h)) {
        h = 0;
      }
      h = h * DEG2RAD;
      return [l, cos$1(h) * c, sin(h) * c];
    };
    var lch2lab_1 = lch2lab;
    var unpack$q = utils.unpack;
    var lch2rgb = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      args = unpack$q(args, "lch");
      var l = args[0];
      var c = args[1];
      var h = args[2];
      var ref = lch2lab_1(l, c, h);
      var L = ref[0];
      var a = ref[1];
      var b_ = ref[2];
      var ref$1 = lab2rgb_1(L, a, b_);
      var r = ref$1[0];
      var g = ref$1[1];
      var b = ref$1[2];
      return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    var lch2rgb_1 = lch2rgb;
    var unpack$r = utils.unpack;
    var hcl2rgb = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var hcl = unpack$r(args, "hcl").reverse();
      return lch2rgb_1.apply(void 0, hcl);
    };
    var hcl2rgb_1 = hcl2rgb;
    var unpack$s = utils.unpack;
    var type$a = utils.type;
    Color_1.prototype.lch = function() {
      return rgb2lch_1(this._rgb);
    };
    Color_1.prototype.hcl = function() {
      return rgb2lch_1(this._rgb).reverse();
    };
    chroma_1.lch = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["lch"])))();
    };
    chroma_1.hcl = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hcl"])))();
    };
    input.format.lch = lch2rgb_1;
    input.format.hcl = hcl2rgb_1;
    ["lch", "hcl"].forEach(function(m) {
      return input.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len5 = arguments.length;
          while (len5--)
            args[len5] = arguments[len5];
          args = unpack$s(args, m);
          if (type$a(args) === "array" && args.length === 3) {
            return m;
          }
        }
      });
    });
    var w3cx11 = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflower: "#6495ed",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      laserlemon: "#ffff54",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrod: "#fafad2",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      maroon2: "#7f0000",
      maroon3: "#b03060",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      purple2: "#7f007f",
      purple3: "#a020f0",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    };
    var w3cx11_1 = w3cx11;
    var type$b = utils.type;
    Color_1.prototype.name = function() {
      var hex = rgb2hex_1(this._rgb, "rgb");
      for (var i2 = 0, list2 = Object.keys(w3cx11_1); i2 < list2.length; i2 += 1) {
        var n = list2[i2];
        if (w3cx11_1[n] === hex) {
          return n.toLowerCase();
        }
      }
      return hex;
    };
    input.format.named = function(name2) {
      name2 = name2.toLowerCase();
      if (w3cx11_1[name2]) {
        return hex2rgb_1(w3cx11_1[name2]);
      }
      throw new Error("unknown color name: " + name2);
    };
    input.autodetect.push({
      p: 5,
      test: function(h) {
        var rest = [], len5 = arguments.length - 1;
        while (len5-- > 0)
          rest[len5] = arguments[len5 + 1];
        if (!rest.length && type$b(h) === "string" && w3cx11_1[h.toLowerCase()]) {
          return "named";
        }
      }
    });
    var unpack$t = utils.unpack;
    var rgb2num = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var ref = unpack$t(args, "rgb");
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      return (r << 16) + (g << 8) + b;
    };
    var rgb2num_1 = rgb2num;
    var type$c = utils.type;
    var num2rgb = function(num) {
      if (type$c(num) == "number" && num >= 0 && num <= 16777215) {
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return [r, g, b, 1];
      }
      throw new Error("unknown num color: " + num);
    };
    var num2rgb_1 = num2rgb;
    var type$d = utils.type;
    Color_1.prototype.num = function() {
      return rgb2num_1(this._rgb);
    };
    chroma_1.num = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["num"])))();
    };
    input.format.num = num2rgb_1;
    input.autodetect.push({
      p: 5,
      test: function() {
        var args = [], len5 = arguments.length;
        while (len5--)
          args[len5] = arguments[len5];
        if (args.length === 1 && type$d(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
          return "num";
        }
      }
    });
    var unpack$u = utils.unpack;
    var type$e = utils.type;
    var round$5 = Math.round;
    Color_1.prototype.rgb = function(rnd2) {
      if (rnd2 === void 0)
        rnd2 = true;
      if (rnd2 === false) {
        return this._rgb.slice(0, 3);
      }
      return this._rgb.slice(0, 3).map(round$5);
    };
    Color_1.prototype.rgba = function(rnd2) {
      if (rnd2 === void 0)
        rnd2 = true;
      return this._rgb.slice(0, 4).map(function(v, i2) {
        return i2 < 3 ? rnd2 === false ? v : round$5(v) : v;
      });
    };
    chroma_1.rgb = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["rgb"])))();
    };
    input.format.rgb = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var rgba = unpack$u(args, "rgba");
      if (rgba[3] === void 0) {
        rgba[3] = 1;
      }
      return rgba;
    };
    input.autodetect.push({
      p: 3,
      test: function() {
        var args = [], len5 = arguments.length;
        while (len5--)
          args[len5] = arguments[len5];
        args = unpack$u(args, "rgba");
        if (type$e(args) === "array" && (args.length === 3 || args.length === 4 && type$e(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
          return "rgb";
        }
      }
    });
    var log = Math.log;
    var temperature2rgb = function(kelvin) {
      var temp = kelvin / 100;
      var r, g, b;
      if (temp < 66) {
        r = 255;
        g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
        b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
      } else {
        r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
        g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
        b = 255;
      }
      return [r, g, b, 1];
    };
    var temperature2rgb_1 = temperature2rgb;
    var unpack$v = utils.unpack;
    var round$6 = Math.round;
    var rgb2temperature = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      var rgb = unpack$v(args, "rgb");
      var r = rgb[0], b = rgb[2];
      var minTemp = 1e3;
      var maxTemp = 4e4;
      var eps = 0.4;
      var temp;
      while (maxTemp - minTemp > eps) {
        temp = (maxTemp + minTemp) * 0.5;
        var rgb$12 = temperature2rgb_1(temp);
        if (rgb$12[2] / rgb$12[0] >= b / r) {
          maxTemp = temp;
        } else {
          minTemp = temp;
        }
      }
      return round$6(temp);
    };
    var rgb2temperature_1 = rgb2temperature;
    Color_1.prototype.temp = Color_1.prototype.kelvin = Color_1.prototype.temperature = function() {
      return rgb2temperature_1(this._rgb);
    };
    chroma_1.temp = chroma_1.kelvin = chroma_1.temperature = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["temp"])))();
    };
    input.format.temp = input.format.kelvin = input.format.temperature = temperature2rgb_1;
    var type$f = utils.type;
    Color_1.prototype.alpha = function(a, mutate) {
      if (mutate === void 0)
        mutate = false;
      if (a !== void 0 && type$f(a) === "number") {
        if (mutate) {
          this._rgb[3] = a;
          return this;
        }
        return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], "rgb");
      }
      return this._rgb[3];
    };
    Color_1.prototype.clipped = function() {
      return this._rgb._clipped || false;
    };
    Color_1.prototype.darken = function(amount) {
      if (amount === void 0)
        amount = 1;
      var me = this;
      var lab = me.lab();
      lab[0] -= labConstants.Kn * amount;
      return new Color_1(lab, "lab").alpha(me.alpha(), true);
    };
    Color_1.prototype.brighten = function(amount) {
      if (amount === void 0)
        amount = 1;
      return this.darken(-amount);
    };
    Color_1.prototype.darker = Color_1.prototype.darken;
    Color_1.prototype.brighter = Color_1.prototype.brighten;
    Color_1.prototype.get = function(mc) {
      var ref = mc.split(".");
      var mode = ref[0];
      var channel = ref[1];
      var src = this[mode]();
      if (channel) {
        var i2 = mode.indexOf(channel);
        if (i2 > -1) {
          return src[i2];
        }
        throw new Error("unknown channel " + channel + " in mode " + mode);
      } else {
        return src;
      }
    };
    var type$g = utils.type;
    var pow$2 = Math.pow;
    var EPS = 1e-7;
    var MAX_ITER = 20;
    Color_1.prototype.luminance = function(lum) {
      if (lum !== void 0 && type$g(lum) === "number") {
        if (lum === 0) {
          return new Color_1([0, 0, 0, this._rgb[3]], "rgb");
        }
        if (lum === 1) {
          return new Color_1([255, 255, 255, this._rgb[3]], "rgb");
        }
        var cur_lum = this.luminance();
        var mode = "rgb";
        var max_iter = MAX_ITER;
        var test = function(low, high) {
          var mid = low.interpolate(high, 0.5, mode);
          var lm = mid.luminance();
          if (Math.abs(lum - lm) < EPS || !max_iter--) {
            return mid;
          }
          return lm > lum ? test(low, mid) : test(mid, high);
        };
        var rgb = (cur_lum > lum ? test(new Color_1([0, 0, 0]), this) : test(this, new Color_1([255, 255, 255]))).rgb();
        return new Color_1(rgb.concat([this._rgb[3]]));
      }
      return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
    };
    var rgb2luminance = function(r, g, b) {
      r = luminance_x(r);
      g = luminance_x(g);
      b = luminance_x(b);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    var luminance_x = function(x) {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : pow$2((x + 0.055) / 1.055, 2.4);
    };
    var interpolator = {};
    var type$h = utils.type;
    var mix = function(col1, col2, f) {
      if (f === void 0)
        f = 0.5;
      var rest = [], len5 = arguments.length - 3;
      while (len5-- > 0)
        rest[len5] = arguments[len5 + 3];
      var mode = rest[0] || "lrgb";
      if (!interpolator[mode] && !rest.length) {
        mode = Object.keys(interpolator)[0];
      }
      if (!interpolator[mode]) {
        throw new Error("interpolation mode " + mode + " is not defined");
      }
      if (type$h(col1) !== "object") {
        col1 = new Color_1(col1);
      }
      if (type$h(col2) !== "object") {
        col2 = new Color_1(col2);
      }
      return interpolator[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };
    Color_1.prototype.mix = Color_1.prototype.interpolate = function(col2, f) {
      if (f === void 0)
        f = 0.5;
      var rest = [], len5 = arguments.length - 2;
      while (len5-- > 0)
        rest[len5] = arguments[len5 + 2];
      return mix.apply(void 0, [this, col2, f].concat(rest));
    };
    Color_1.prototype.premultiply = function(mutate) {
      if (mutate === void 0)
        mutate = false;
      var rgb = this._rgb;
      var a = rgb[3];
      if (mutate) {
        this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
        return this;
      } else {
        return new Color_1([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], "rgb");
      }
    };
    Color_1.prototype.saturate = function(amount) {
      if (amount === void 0)
        amount = 1;
      var me = this;
      var lch = me.lch();
      lch[1] += labConstants.Kn * amount;
      if (lch[1] < 0) {
        lch[1] = 0;
      }
      return new Color_1(lch, "lch").alpha(me.alpha(), true);
    };
    Color_1.prototype.desaturate = function(amount) {
      if (amount === void 0)
        amount = 1;
      return this.saturate(-amount);
    };
    var type$i = utils.type;
    Color_1.prototype.set = function(mc, value, mutate) {
      if (mutate === void 0)
        mutate = false;
      var ref = mc.split(".");
      var mode = ref[0];
      var channel = ref[1];
      var src = this[mode]();
      if (channel) {
        var i2 = mode.indexOf(channel);
        if (i2 > -1) {
          if (type$i(value) == "string") {
            switch (value.charAt(0)) {
              case "+":
                src[i2] += +value;
                break;
              case "-":
                src[i2] += +value;
                break;
              case "*":
                src[i2] *= +value.substr(1);
                break;
              case "/":
                src[i2] /= +value.substr(1);
                break;
              default:
                src[i2] = +value;
            }
          } else if (type$i(value) === "number") {
            src[i2] = value;
          } else {
            throw new Error("unsupported value for Color.set");
          }
          var out = new Color_1(src, mode);
          if (mutate) {
            this._rgb = out._rgb;
            return this;
          }
          return out;
        }
        throw new Error("unknown channel " + channel + " in mode " + mode);
      } else {
        return src;
      }
    };
    var rgb$1 = function(col1, col2, f) {
      var xyz0 = col1._rgb;
      var xyz1 = col2._rgb;
      return new Color_1(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "rgb");
    };
    interpolator.rgb = rgb$1;
    var sqrt$2 = Math.sqrt;
    var pow$3 = Math.pow;
    var lrgb = function(col1, col2, f) {
      var ref = col1._rgb;
      var x1 = ref[0];
      var y1 = ref[1];
      var z1 = ref[2];
      var ref$1 = col2._rgb;
      var x2 = ref$1[0];
      var y2 = ref$1[1];
      var z2 = ref$1[2];
      return new Color_1(sqrt$2(pow$3(x1, 2) * (1 - f) + pow$3(x2, 2) * f), sqrt$2(pow$3(y1, 2) * (1 - f) + pow$3(y2, 2) * f), sqrt$2(pow$3(z1, 2) * (1 - f) + pow$3(z2, 2) * f), "rgb");
    };
    interpolator.lrgb = lrgb;
    var lab$1 = function(col1, col2, f) {
      var xyz0 = col1.lab();
      var xyz1 = col2.lab();
      return new Color_1(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "lab");
    };
    interpolator.lab = lab$1;
    var _hsx = function(col1, col2, f, m) {
      var assign, assign$1;
      var xyz0, xyz1;
      if (m === "hsl") {
        xyz0 = col1.hsl();
        xyz1 = col2.hsl();
      } else if (m === "hsv") {
        xyz0 = col1.hsv();
        xyz1 = col2.hsv();
      } else if (m === "hcg") {
        xyz0 = col1.hcg();
        xyz1 = col2.hcg();
      } else if (m === "hsi") {
        xyz0 = col1.hsi();
        xyz1 = col2.hsi();
      } else if (m === "lch" || m === "hcl") {
        m = "hcl";
        xyz0 = col1.hcl();
        xyz1 = col2.hcl();
      }
      var hue0, hue1, sat0, sat1, lbv0, lbv1;
      if (m.substr(0, 1) === "h") {
        assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2];
        assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2];
      }
      var sat, hue, lbv, dh;
      if (!isNaN(hue0) && !isNaN(hue1)) {
        if (hue1 > hue0 && hue1 - hue0 > 180) {
          dh = hue1 - (hue0 + 360);
        } else if (hue1 < hue0 && hue0 - hue1 > 180) {
          dh = hue1 + 360 - hue0;
        } else {
          dh = hue1 - hue0;
        }
        hue = hue0 + f * dh;
      } else if (!isNaN(hue0)) {
        hue = hue0;
        if ((lbv1 == 1 || lbv1 == 0) && m != "hsv") {
          sat = sat0;
        }
      } else if (!isNaN(hue1)) {
        hue = hue1;
        if ((lbv0 == 1 || lbv0 == 0) && m != "hsv") {
          sat = sat1;
        }
      } else {
        hue = Number.NaN;
      }
      if (sat === void 0) {
        sat = sat0 + f * (sat1 - sat0);
      }
      lbv = lbv0 + f * (lbv1 - lbv0);
      return new Color_1([hue, sat, lbv], m);
    };
    var lch$1 = function(col1, col2, f) {
      return _hsx(col1, col2, f, "lch");
    };
    interpolator.lch = lch$1;
    interpolator.hcl = lch$1;
    var num$1 = function(col1, col2, f) {
      var c1 = col1.num();
      var c2 = col2.num();
      return new Color_1(c1 + f * (c2 - c1), "num");
    };
    interpolator.num = num$1;
    var hcg$1 = function(col1, col2, f) {
      return _hsx(col1, col2, f, "hcg");
    };
    interpolator.hcg = hcg$1;
    var hsi$1 = function(col1, col2, f) {
      return _hsx(col1, col2, f, "hsi");
    };
    interpolator.hsi = hsi$1;
    var hsl$1 = function(col1, col2, f) {
      return _hsx(col1, col2, f, "hsl");
    };
    interpolator.hsl = hsl$1;
    var hsv$1 = function(col1, col2, f) {
      return _hsx(col1, col2, f, "hsv");
    };
    interpolator.hsv = hsv$1;
    var clip_rgb$2 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$3 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$1 = Math.sin;
    var atan2$1 = Math.atan2;
    var average = function(colors, mode, weights) {
      if (mode === void 0)
        mode = "lrgb";
      if (weights === void 0)
        weights = null;
      var l = colors.length;
      if (!weights) {
        weights = Array.from(new Array(l)).map(function() {
          return 1;
        });
      }
      var k = l / weights.reduce(function(a, b) {
        return a + b;
      });
      weights.forEach(function(w, i3) {
        weights[i3] *= k;
      });
      colors = colors.map(function(c) {
        return new Color_1(c);
      });
      if (mode === "lrgb") {
        return _average_lrgb(colors, weights);
      }
      var first = colors.shift();
      var xyz = first.get(mode);
      var cnt = [];
      var dx = 0;
      var dy = 0;
      for (var i2 = 0; i2 < xyz.length; i2++) {
        xyz[i2] = (xyz[i2] || 0) * weights[0];
        cnt.push(isNaN(xyz[i2]) ? 0 : weights[0]);
        if (mode.charAt(i2) === "h" && !isNaN(xyz[i2])) {
          var A = xyz[i2] / 180 * PI$1;
          dx += cos$2(A) * weights[0];
          dy += sin$1(A) * weights[0];
        }
      }
      var alpha = first.alpha() * weights[0];
      colors.forEach(function(c, ci) {
        var xyz2 = c.get(mode);
        alpha += c.alpha() * weights[ci + 1];
        for (var i3 = 0; i3 < xyz.length; i3++) {
          if (!isNaN(xyz2[i3])) {
            cnt[i3] += weights[ci + 1];
            if (mode.charAt(i3) === "h") {
              var A2 = xyz2[i3] / 180 * PI$1;
              dx += cos$2(A2) * weights[ci + 1];
              dy += sin$1(A2) * weights[ci + 1];
            } else {
              xyz[i3] += xyz2[i3] * weights[ci + 1];
            }
          }
        }
      });
      for (var i$12 = 0; i$12 < xyz.length; i$12++) {
        if (mode.charAt(i$12) === "h") {
          var A$1 = atan2$1(dy / cnt[i$12], dx / cnt[i$12]) / PI$1 * 180;
          while (A$1 < 0) {
            A$1 += 360;
          }
          while (A$1 >= 360) {
            A$1 -= 360;
          }
          xyz[i$12] = A$1;
        } else {
          xyz[i$12] = xyz[i$12] / cnt[i$12];
        }
      }
      alpha /= l;
      return new Color_1(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };
    var _average_lrgb = function(colors, weights) {
      var l = colors.length;
      var xyz = [0, 0, 0, 0];
      for (var i2 = 0; i2 < colors.length; i2++) {
        var col = colors[i2];
        var f = weights[i2] / l;
        var rgb = col._rgb;
        xyz[0] += pow$4(rgb[0], 2) * f;
        xyz[1] += pow$4(rgb[1], 2) * f;
        xyz[2] += pow$4(rgb[2], 2) * f;
        xyz[3] += rgb[3] * f;
      }
      xyz[0] = sqrt$3(xyz[0]);
      xyz[1] = sqrt$3(xyz[1]);
      xyz[2] = sqrt$3(xyz[2]);
      if (xyz[3] > 0.9999999) {
        xyz[3] = 1;
      }
      return new Color_1(clip_rgb$2(xyz));
    };
    var type$j = utils.type;
    var pow$5 = Math.pow;
    var scale6 = function(colors) {
      var _mode = "rgb";
      var _nacol = chroma_1("#ccc");
      var _spread = 0;
      var _domain = [0, 1];
      var _pos = [];
      var _padding = [0, 0];
      var _classes = false;
      var _colors = [];
      var _out = false;
      var _min = 0;
      var _max = 1;
      var _correctLightness = false;
      var _colorCache = {};
      var _useCache = true;
      var _gamma = 1;
      var setColors = function(colors2) {
        colors2 = colors2 || ["#fff", "#000"];
        if (colors2 && type$j(colors2) === "string" && chroma_1.brewer && chroma_1.brewer[colors2.toLowerCase()]) {
          colors2 = chroma_1.brewer[colors2.toLowerCase()];
        }
        if (type$j(colors2) === "array") {
          if (colors2.length === 1) {
            colors2 = [colors2[0], colors2[0]];
          }
          colors2 = colors2.slice(0);
          for (var c = 0; c < colors2.length; c++) {
            colors2[c] = chroma_1(colors2[c]);
          }
          _pos.length = 0;
          for (var c$1 = 0; c$1 < colors2.length; c$1++) {
            _pos.push(c$1 / (colors2.length - 1));
          }
        }
        resetCache();
        return _colors = colors2;
      };
      var getClass = function(value) {
        if (_classes != null) {
          var n = _classes.length - 1;
          var i2 = 0;
          while (i2 < n && value >= _classes[i2]) {
            i2++;
          }
          return i2 - 1;
        }
        return 0;
      };
      var tMapLightness = function(t) {
        return t;
      };
      var tMapDomain = function(t) {
        return t;
      };
      var getColor = function(val, bypassMap) {
        var col, t;
        if (bypassMap == null) {
          bypassMap = false;
        }
        if (isNaN(val) || val === null) {
          return _nacol;
        }
        if (!bypassMap) {
          if (_classes && _classes.length > 2) {
            var c = getClass(val);
            t = c / (_classes.length - 2);
          } else if (_max !== _min) {
            t = (val - _min) / (_max - _min);
          } else {
            t = 1;
          }
        } else {
          t = val;
        }
        t = tMapDomain(t);
        if (!bypassMap) {
          t = tMapLightness(t);
        }
        if (_gamma !== 1) {
          t = pow$5(t, _gamma);
        }
        t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
        t = Math.min(1, Math.max(0, t));
        var k = Math.floor(t * 1e4);
        if (_useCache && _colorCache[k]) {
          col = _colorCache[k];
        } else {
          if (type$j(_colors) === "array") {
            for (var i2 = 0; i2 < _pos.length; i2++) {
              var p = _pos[i2];
              if (t <= p) {
                col = _colors[i2];
                break;
              }
              if (t >= p && i2 === _pos.length - 1) {
                col = _colors[i2];
                break;
              }
              if (t > p && t < _pos[i2 + 1]) {
                t = (t - p) / (_pos[i2 + 1] - p);
                col = chroma_1.interpolate(_colors[i2], _colors[i2 + 1], t, _mode);
                break;
              }
            }
          } else if (type$j(_colors) === "function") {
            col = _colors(t);
          }
          if (_useCache) {
            _colorCache[k] = col;
          }
        }
        return col;
      };
      var resetCache = function() {
        return _colorCache = {};
      };
      setColors(colors);
      var f = function(v) {
        var c = chroma_1(getColor(v));
        if (_out && c[_out]) {
          return c[_out]();
        } else {
          return c;
        }
      };
      f.classes = function(classes) {
        if (classes != null) {
          if (type$j(classes) === "array") {
            _classes = classes;
            _domain = [classes[0], classes[classes.length - 1]];
          } else {
            var d = chroma_1.analyze(_domain);
            if (classes === 0) {
              _classes = [d.min, d.max];
            } else {
              _classes = chroma_1.limits(d, "e", classes);
            }
          }
          return f;
        }
        return _classes;
      };
      f.domain = function(domain) {
        if (!arguments.length) {
          return _domain;
        }
        _min = domain[0];
        _max = domain[domain.length - 1];
        _pos = [];
        var k = _colors.length;
        if (domain.length === k && _min !== _max) {
          for (var i2 = 0, list2 = Array.from(domain); i2 < list2.length; i2 += 1) {
            var d = list2[i2];
            _pos.push((d - _min) / (_max - _min));
          }
        } else {
          for (var c = 0; c < k; c++) {
            _pos.push(c / (k - 1));
          }
          if (domain.length > 2) {
            var tOut = domain.map(function(d2, i3) {
              return i3 / (domain.length - 1);
            });
            var tBreaks = domain.map(function(d2) {
              return (d2 - _min) / (_max - _min);
            });
            if (!tBreaks.every(function(val, i3) {
              return tOut[i3] === val;
            })) {
              tMapDomain = function(t) {
                if (t <= 0 || t >= 1) {
                  return t;
                }
                var i3 = 0;
                while (t >= tBreaks[i3 + 1]) {
                  i3++;
                }
                var f2 = (t - tBreaks[i3]) / (tBreaks[i3 + 1] - tBreaks[i3]);
                var out = tOut[i3] + f2 * (tOut[i3 + 1] - tOut[i3]);
                return out;
              };
            }
          }
        }
        _domain = [_min, _max];
        return f;
      };
      f.mode = function(_m) {
        if (!arguments.length) {
          return _mode;
        }
        _mode = _m;
        resetCache();
        return f;
      };
      f.range = function(colors2, _pos2) {
        setColors(colors2, _pos2);
        return f;
      };
      f.out = function(_o) {
        _out = _o;
        return f;
      };
      f.spread = function(val) {
        if (!arguments.length) {
          return _spread;
        }
        _spread = val;
        return f;
      };
      f.correctLightness = function(v) {
        if (v == null) {
          v = true;
        }
        _correctLightness = v;
        resetCache();
        if (_correctLightness) {
          tMapLightness = function(t) {
            var L0 = getColor(0, true).lab()[0];
            var L1 = getColor(1, true).lab()[0];
            var pol = L0 > L1;
            var L_actual = getColor(t, true).lab()[0];
            var L_ideal = L0 + (L1 - L0) * t;
            var L_diff = L_actual - L_ideal;
            var t0 = 0;
            var t1 = 1;
            var max_iter = 20;
            while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
              (function() {
                if (pol) {
                  L_diff *= -1;
                }
                if (L_diff < 0) {
                  t0 = t;
                  t += (t1 - t) * 0.5;
                } else {
                  t1 = t;
                  t += (t0 - t) * 0.5;
                }
                L_actual = getColor(t, true).lab()[0];
                return L_diff = L_actual - L_ideal;
              })();
            }
            return t;
          };
        } else {
          tMapLightness = function(t) {
            return t;
          };
        }
        return f;
      };
      f.padding = function(p) {
        if (p != null) {
          if (type$j(p) === "number") {
            p = [p, p];
          }
          _padding = p;
          return f;
        } else {
          return _padding;
        }
      };
      f.colors = function(numColors, out) {
        if (arguments.length < 2) {
          out = "hex";
        }
        var result = [];
        if (arguments.length === 0) {
          result = _colors.slice(0);
        } else if (numColors === 1) {
          result = [f(0.5)];
        } else if (numColors > 1) {
          var dm = _domain[0];
          var dd = _domain[1] - dm;
          result = __range__(0, numColors, false).map(function(i3) {
            return f(dm + i3 / (numColors - 1) * dd);
          });
        } else {
          colors = [];
          var samples = [];
          if (_classes && _classes.length > 2) {
            for (var i2 = 1, end = _classes.length, asc = 1 <= end; asc ? i2 < end : i2 > end; asc ? i2++ : i2--) {
              samples.push((_classes[i2 - 1] + _classes[i2]) * 0.5);
            }
          } else {
            samples = _domain;
          }
          result = samples.map(function(v) {
            return f(v);
          });
        }
        if (chroma_1[out]) {
          result = result.map(function(c) {
            return c[out]();
          });
        }
        return result;
      };
      f.cache = function(c) {
        if (c != null) {
          _useCache = c;
          return f;
        } else {
          return _useCache;
        }
      };
      f.gamma = function(g) {
        if (g != null) {
          _gamma = g;
          return f;
        } else {
          return _gamma;
        }
      };
      f.nodata = function(d) {
        if (d != null) {
          _nacol = chroma_1(d);
          return f;
        } else {
          return _nacol;
        }
      };
      return f;
    };
    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i2 = left; ascending ? i2 < end : i2 > end; ascending ? i2++ : i2--) {
        range.push(i2);
      }
      return range;
    }
    var bezier2 = function(colors) {
      var assign, assign$1, assign$2;
      var I, lab0, lab1, lab2;
      colors = colors.map(function(c) {
        return new Color_1(c);
      });
      if (colors.length === 2) {
        assign = colors.map(function(c) {
          return c.lab();
        }), lab0 = assign[0], lab1 = assign[1];
        I = function(t) {
          var lab = [0, 1, 2].map(function(i2) {
            return lab0[i2] + t * (lab1[i2] - lab0[i2]);
          });
          return new Color_1(lab, "lab");
        };
      } else if (colors.length === 3) {
        assign$1 = colors.map(function(c) {
          return c.lab();
        }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2];
        I = function(t) {
          var lab = [0, 1, 2].map(function(i2) {
            return (1 - t) * (1 - t) * lab0[i2] + 2 * (1 - t) * t * lab1[i2] + t * t * lab2[i2];
          });
          return new Color_1(lab, "lab");
        };
      } else if (colors.length === 4) {
        var lab3;
        assign$2 = colors.map(function(c) {
          return c.lab();
        }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3];
        I = function(t) {
          var lab = [0, 1, 2].map(function(i2) {
            return (1 - t) * (1 - t) * (1 - t) * lab0[i2] + 3 * (1 - t) * (1 - t) * t * lab1[i2] + 3 * (1 - t) * t * t * lab2[i2] + t * t * t * lab3[i2];
          });
          return new Color_1(lab, "lab");
        };
      } else if (colors.length === 5) {
        var I0 = bezier2(colors.slice(0, 3));
        var I1 = bezier2(colors.slice(2, 5));
        I = function(t) {
          if (t < 0.5) {
            return I0(t * 2);
          } else {
            return I1((t - 0.5) * 2);
          }
        };
      }
      return I;
    };
    var bezier_1 = function(colors) {
      var f = bezier2(colors);
      f.scale = function() {
        return scale6(f);
      };
      return f;
    };
    var blend = function(bottom, top, mode) {
      if (!blend[mode]) {
        throw new Error("unknown blend mode " + mode);
      }
      return blend[mode](bottom, top);
    };
    var blend_f = function(f) {
      return function(bottom, top) {
        var c0 = chroma_1(top).rgb();
        var c1 = chroma_1(bottom).rgb();
        return chroma_1.rgb(f(c0, c1));
      };
    };
    var each = function(f) {
      return function(c0, c1) {
        var out = [];
        out[0] = f(c0[0], c1[0]);
        out[1] = f(c0[1], c1[1]);
        out[2] = f(c0[2], c1[2]);
        return out;
      };
    };
    var normal = function(a) {
      return a;
    };
    var multiply6 = function(a, b) {
      return a * b / 255;
    };
    var darken$1 = function(a, b) {
      return a > b ? b : a;
    };
    var lighten = function(a, b) {
      return a > b ? a : b;
    };
    var screen = function(a, b) {
      return 255 * (1 - (1 - a / 255) * (1 - b / 255));
    };
    var overlay = function(a, b) {
      return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    };
    var burn = function(a, b) {
      return 255 * (1 - (1 - b / 255) / (a / 255));
    };
    var dodge = function(a, b) {
      if (a === 255) {
        return 255;
      }
      a = 255 * (b / 255) / (1 - a / 255);
      return a > 255 ? 255 : a;
    };
    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply6));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken$1));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    var blend_1 = blend;
    var type$k = utils.type;
    var clip_rgb$3 = utils.clip_rgb;
    var TWOPI$2 = utils.TWOPI;
    var pow$6 = Math.pow;
    var sin$2 = Math.sin;
    var cos$3 = Math.cos;
    var cubehelix = function(start, rotations, hue, gamma, lightness) {
      if (start === void 0)
        start = 300;
      if (rotations === void 0)
        rotations = -1.5;
      if (hue === void 0)
        hue = 1;
      if (gamma === void 0)
        gamma = 1;
      if (lightness === void 0)
        lightness = [0, 1];
      var dh = 0, dl;
      if (type$k(lightness) === "array") {
        dl = lightness[1] - lightness[0];
      } else {
        dl = 0;
        lightness = [lightness, lightness];
      }
      var f = function(fract) {
        var a = TWOPI$2 * ((start + 120) / 360 + rotations * fract);
        var l = pow$6(lightness[0] + dl * fract, gamma);
        var h = dh !== 0 ? hue[0] + fract * dh : hue;
        var amp = h * l * (1 - l) / 2;
        var cos_a = cos$3(a);
        var sin_a = sin$2(a);
        var r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
        var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
        var b = l + amp * (1.97294 * cos_a);
        return chroma_1(clip_rgb$3([r * 255, g * 255, b * 255, 1]));
      };
      f.start = function(s) {
        if (s == null) {
          return start;
        }
        start = s;
        return f;
      };
      f.rotations = function(r) {
        if (r == null) {
          return rotations;
        }
        rotations = r;
        return f;
      };
      f.gamma = function(g) {
        if (g == null) {
          return gamma;
        }
        gamma = g;
        return f;
      };
      f.hue = function(h) {
        if (h == null) {
          return hue;
        }
        hue = h;
        if (type$k(hue) === "array") {
          dh = hue[1] - hue[0];
          if (dh === 0) {
            hue = hue[1];
          }
        } else {
          dh = 0;
        }
        return f;
      };
      f.lightness = function(h) {
        if (h == null) {
          return lightness;
        }
        if (type$k(h) === "array") {
          lightness = h;
          dl = h[1] - h[0];
        } else {
          lightness = [h, h];
          dl = 0;
        }
        return f;
      };
      f.scale = function() {
        return chroma_1.scale(f);
      };
      f.hue(hue);
      return f;
    };
    var digits = "0123456789abcdef";
    var floor$2 = Math.floor;
    var random5 = Math.random;
    var random_1 = function() {
      var code = "#";
      for (var i2 = 0; i2 < 6; i2++) {
        code += digits.charAt(floor$2(random5() * 16));
      }
      return new Color_1(code, "hex");
    };
    var log$1 = Math.log;
    var pow$7 = Math.pow;
    var floor$3 = Math.floor;
    var abs = Math.abs;
    var analyze = function(data, key2) {
      if (key2 === void 0)
        key2 = null;
      var r = {
        min: Number.MAX_VALUE,
        max: Number.MAX_VALUE * -1,
        sum: 0,
        values: [],
        count: 0
      };
      if (type(data) === "object") {
        data = Object.values(data);
      }
      data.forEach(function(val) {
        if (key2 && type(val) === "object") {
          val = val[key2];
        }
        if (val !== void 0 && val !== null && !isNaN(val)) {
          r.values.push(val);
          r.sum += val;
          if (val < r.min) {
            r.min = val;
          }
          if (val > r.max) {
            r.max = val;
          }
          r.count += 1;
        }
      });
      r.domain = [r.min, r.max];
      r.limits = function(mode, num) {
        return limits(r, mode, num);
      };
      return r;
    };
    var limits = function(data, mode, num) {
      if (mode === void 0)
        mode = "equal";
      if (num === void 0)
        num = 7;
      if (type(data) == "array") {
        data = analyze(data);
      }
      var min5 = data.min;
      var max5 = data.max;
      var values = data.values.sort(function(a, b) {
        return a - b;
      });
      if (num === 1) {
        return [min5, max5];
      }
      var limits2 = [];
      if (mode.substr(0, 1) === "c") {
        limits2.push(min5);
        limits2.push(max5);
      }
      if (mode.substr(0, 1) === "e") {
        limits2.push(min5);
        for (var i2 = 1; i2 < num; i2++) {
          limits2.push(min5 + i2 / num * (max5 - min5));
        }
        limits2.push(max5);
      } else if (mode.substr(0, 1) === "l") {
        if (min5 <= 0) {
          throw new Error("Logarithmic scales are only possible for values > 0");
        }
        var min_log = Math.LOG10E * log$1(min5);
        var max_log = Math.LOG10E * log$1(max5);
        limits2.push(min5);
        for (var i$12 = 1; i$12 < num; i$12++) {
          limits2.push(pow$7(10, min_log + i$12 / num * (max_log - min_log)));
        }
        limits2.push(max5);
      } else if (mode.substr(0, 1) === "q") {
        limits2.push(min5);
        for (var i$2 = 1; i$2 < num; i$2++) {
          var p = (values.length - 1) * i$2 / num;
          var pb = floor$3(p);
          if (pb === p) {
            limits2.push(values[pb]);
          } else {
            var pr = p - pb;
            limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
          }
        }
        limits2.push(max5);
      } else if (mode.substr(0, 1) === "k") {
        var cluster;
        var n = values.length;
        var assignments = new Array(n);
        var clusterSizes = new Array(num);
        var repeat = true;
        var nb_iters = 0;
        var centroids = null;
        centroids = [];
        centroids.push(min5);
        for (var i$3 = 1; i$3 < num; i$3++) {
          centroids.push(min5 + i$3 / num * (max5 - min5));
        }
        centroids.push(max5);
        while (repeat) {
          for (var j = 0; j < num; j++) {
            clusterSizes[j] = 0;
          }
          for (var i$4 = 0; i$4 < n; i$4++) {
            var value = values[i$4];
            var mindist = Number.MAX_VALUE;
            var best = void 0;
            for (var j$1 = 0; j$1 < num; j$1++) {
              var dist4 = abs(centroids[j$1] - value);
              if (dist4 < mindist) {
                mindist = dist4;
                best = j$1;
              }
              clusterSizes[best]++;
              assignments[i$4] = best;
            }
          }
          var newCentroids = new Array(num);
          for (var j$2 = 0; j$2 < num; j$2++) {
            newCentroids[j$2] = null;
          }
          for (var i$5 = 0; i$5 < n; i$5++) {
            cluster = assignments[i$5];
            if (newCentroids[cluster] === null) {
              newCentroids[cluster] = values[i$5];
            } else {
              newCentroids[cluster] += values[i$5];
            }
          }
          for (var j$3 = 0; j$3 < num; j$3++) {
            newCentroids[j$3] *= 1 / clusterSizes[j$3];
          }
          repeat = false;
          for (var j$4 = 0; j$4 < num; j$4++) {
            if (newCentroids[j$4] !== centroids[j$4]) {
              repeat = true;
              break;
            }
          }
          centroids = newCentroids;
          nb_iters++;
          if (nb_iters > 200) {
            repeat = false;
          }
        }
        var kClusters = {};
        for (var j$5 = 0; j$5 < num; j$5++) {
          kClusters[j$5] = [];
        }
        for (var i$6 = 0; i$6 < n; i$6++) {
          cluster = assignments[i$6];
          kClusters[cluster].push(values[i$6]);
        }
        var tmpKMeansBreaks = [];
        for (var j$6 = 0; j$6 < num; j$6++) {
          tmpKMeansBreaks.push(kClusters[j$6][0]);
          tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
        }
        tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
          return a - b;
        });
        limits2.push(tmpKMeansBreaks[0]);
        for (var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2) {
          var v = tmpKMeansBreaks[i$7];
          if (!isNaN(v) && limits2.indexOf(v) === -1) {
            limits2.push(v);
          }
        }
      }
      return limits2;
    };
    var analyze_1 = {analyze, limits};
    var contrast = function(a, b) {
      a = new Color_1(a);
      b = new Color_1(b);
      var l1 = a.luminance();
      var l2 = b.luminance();
      return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };
    var sqrt$4 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var abs$1 = Math.abs;
    var cos$4 = Math.cos;
    var PI$2 = Math.PI;
    var deltaE = function(a, b, L, C) {
      if (L === void 0)
        L = 1;
      if (C === void 0)
        C = 1;
      a = new Color_1(a);
      b = new Color_1(b);
      var ref = Array.from(a.lab());
      var L1 = ref[0];
      var a1 = ref[1];
      var b1 = ref[2];
      var ref$1 = Array.from(b.lab());
      var L2 = ref$1[0];
      var a2 = ref$1[1];
      var b2 = ref$1[2];
      var c1 = sqrt$4(a1 * a1 + b1 * b1);
      var c2 = sqrt$4(a2 * a2 + b2 * b2);
      var sl = L1 < 16 ? 0.511 : 0.040975 * L1 / (1 + 0.01765 * L1);
      var sc = 0.0638 * c1 / (1 + 0.0131 * c1) + 0.638;
      var h1 = c1 < 1e-6 ? 0 : atan2$2(b1, a1) * 180 / PI$2;
      while (h1 < 0) {
        h1 += 360;
      }
      while (h1 >= 360) {
        h1 -= 360;
      }
      var t = h1 >= 164 && h1 <= 345 ? 0.56 + abs$1(0.2 * cos$4(PI$2 * (h1 + 168) / 180)) : 0.36 + abs$1(0.4 * cos$4(PI$2 * (h1 + 35) / 180));
      var c4 = c1 * c1 * c1 * c1;
      var f = sqrt$4(c4 / (c4 + 1900));
      var sh = sc * (f * t + 1 - f);
      var delL = L1 - L2;
      var delC = c1 - c2;
      var delA = a1 - a2;
      var delB = b1 - b2;
      var dH2 = delA * delA + delB * delB - delC * delC;
      var v1 = delL / (L * sl);
      var v2 = delC / (C * sc);
      var v3 = sh;
      return sqrt$4(v1 * v1 + v2 * v2 + dH2 / (v3 * v3));
    };
    var distance4 = function(a, b, mode) {
      if (mode === void 0)
        mode = "lab";
      a = new Color_1(a);
      b = new Color_1(b);
      var l1 = a.get(mode);
      var l2 = b.get(mode);
      var sum_sq = 0;
      for (var i2 in l1) {
        var d = (l1[i2] || 0) - (l2[i2] || 0);
        sum_sq += d * d;
      }
      return Math.sqrt(sum_sq);
    };
    var valid = function() {
      var args = [], len5 = arguments.length;
      while (len5--)
        args[len5] = arguments[len5];
      try {
        new (Function.prototype.bind.apply(Color_1, [null].concat(args)))();
        return true;
      } catch (e) {
        return false;
      }
    };
    var scales = {
      cool: function cool() {
        return scale6([chroma_1.hsl(180, 1, 0.9), chroma_1.hsl(250, 0.7, 0.4)]);
      },
      hot: function hot() {
        return scale6(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1]).mode("rgb");
      }
    };
    var colorbrewer = {
      OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
      PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
      BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
      Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
      BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
      YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
      YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
      Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
      RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
      Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
      YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
      Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
      GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
      Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
      YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
      PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
      Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
      PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
      Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
      Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
      RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
      RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
      PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
      PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
      RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
      BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
      RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
      PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
      Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
      Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
      Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
      Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
      Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
      Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
      Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
      Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
    };
    for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
      var key = list$1[i$1];
      colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }
    var colorbrewer_1 = colorbrewer;
    chroma_1.average = average;
    chroma_1.bezier = bezier_1;
    chroma_1.blend = blend_1;
    chroma_1.cubehelix = cubehelix;
    chroma_1.mix = chroma_1.interpolate = mix;
    chroma_1.random = random_1;
    chroma_1.scale = scale6;
    chroma_1.analyze = analyze_1.analyze;
    chroma_1.contrast = contrast;
    chroma_1.deltaE = deltaE;
    chroma_1.distance = distance4;
    chroma_1.limits = analyze_1.limits;
    chroma_1.valid = valid;
    chroma_1.scales = scales;
    chroma_1.colors = w3cx11_1;
    chroma_1.brewer = colorbrewer_1;
    var chroma_js = chroma_1;
    return chroma_js;
  });
});

// node_modules/@dekkai/env/build/lib/moduleLoader.js
var require_moduleLoader = __commonJS((exports, module) => {
  __markAsModule(exports);
  __export(exports, {
    loadModule: () => loadModule3,
    supportsDynamicImport: () => supportsDynamicImport
  });
  function checkDynamicImport() {
    try {
      import(`${null}`).catch(() => false);
      return true;
    } catch {
      return false;
    }
  }
  var kSupportsDynamicImport = checkDynamicImport();
  function supportsDynamicImport() {
    return kSupportsDynamicImport;
  }
  async function loadModule3(mod) {
    if (kSupportsDynamicImport) {
      return await import(mod.toString());
    } else if (isNodeJS()) {
      return typeof module !== "undefined" && typeof module.require === "function" && require(mod.toString()) || typeof __non_webpack_require__ === "function" && __non_webpack_require__(mod.toString()) || require(mod.toString());
    }
    throw "ERROR: Can't load modules dynamically on this platform";
  }
});

// node_modules/tweakpane/dist/tweakpane.js
var require_tweakpane = __commonJS((exports, module) => {
  /*! Tweakpane 2.4.0 (c) 2016 cocopon, licensed under the MIT license. */
  (function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Tweakpane = factory());
  })(exports, function() {
    "use strict";
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    }
    function forceCast(v) {
      return v;
    }
    function isEmpty(value) {
      return value === null || value === void 0;
    }
    function deepEqualsArray(a1, a2) {
      if (a1.length !== a2.length) {
        return false;
      }
      for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
          return false;
        }
      }
      return true;
    }
    var CREATE_MESSAGE_MAP = {
      alreadydisposed: function() {
        return "View has been already disposed";
      },
      invalidparams: function(context) {
        return "Invalid parameters for '" + context.name + "'";
      },
      nomatchingcontroller: function(context) {
        return "No matching controller for '" + context.key + "'";
      },
      nomatchingview: function(context) {
        return "No matching view for '" + JSON.stringify(context.params) + "'";
      },
      notbindable: function() {
        return "Value is not bindable";
      },
      propertynotfound: function(context) {
        return "Property '" + context.name + "' not found";
      },
      shouldneverhappen: function() {
        return "This error should never happen";
      }
    };
    var TpError = function() {
      function TpError2(config) {
        var _a2;
        this.message = (_a2 = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a2 !== void 0 ? _a2 : "Unexpected error";
        this.name = this.constructor.name;
        this.stack = new Error(this.message).stack;
        this.type = config.type;
      }
      TpError2.alreadyDisposed = function() {
        return new TpError2({type: "alreadydisposed"});
      };
      TpError2.notBindable = function() {
        return new TpError2({
          type: "notbindable"
        });
      };
      TpError2.propertyNotFound = function(name) {
        return new TpError2({
          type: "propertynotfound",
          context: {
            name
          }
        });
      };
      TpError2.shouldNeverHappen = function() {
        return new TpError2({type: "shouldneverhappen"});
      };
      return TpError2;
    }();
    TpError.prototype = Object.create(Error.prototype);
    TpError.prototype.constructor = TpError;
    var Emitter = function() {
      function Emitter2() {
        this.observers_ = {};
      }
      Emitter2.prototype.on = function(eventName, handler) {
        var observers = this.observers_[eventName];
        if (!observers) {
          observers = this.observers_[eventName] = [];
        }
        observers.push({
          handler
        });
        return this;
      };
      Emitter2.prototype.off = function(eventName, handler) {
        var observers = this.observers_[eventName];
        if (observers) {
          this.observers_[eventName] = observers.filter(function(observer) {
            return observer.handler !== handler;
          });
        }
        return this;
      };
      Emitter2.prototype.emit = function(eventName, event) {
        var observers = this.observers_[eventName];
        if (!observers) {
          return;
        }
        observers.forEach(function(observer) {
          observer.handler(event);
        });
      };
      return Emitter2;
    }();
    var Blade = function() {
      function Blade2() {
        this.emitter = new Emitter();
        this.positions_ = [];
      }
      Object.defineProperty(Blade2.prototype, "positions", {
        get: function() {
          return this.positions_;
        },
        set: function(positions) {
          if (deepEqualsArray(positions, this.positions_)) {
            return;
          }
          this.positions_ = positions;
          this.emitter.emit("change", {
            propertyName: "positions",
            sender: this
          });
        },
        enumerable: false,
        configurable: true
      });
      return Blade2;
    }();
    var PREFIX = "tp";
    function ClassName(viewName) {
      var fn = function(opt_elementName, opt_modifier) {
        return [
          PREFIX,
          "-",
          viewName,
          "v",
          opt_elementName ? "_" + opt_elementName : "",
          opt_modifier ? "-" + opt_modifier : ""
        ].join("");
      };
      return fn;
    }
    function compose(h1, h2) {
      return function(input) {
        return h2(h1(input));
      };
    }
    function extractValue(ev) {
      return ev.rawValue;
    }
    function applyClass(elem, className2, active) {
      if (active) {
        elem.classList.add(className2);
      } else {
        elem.classList.remove(className2);
      }
    }
    function valueToClassName(elem, className2) {
      return function(value) {
        applyClass(elem, className2, value);
      };
    }
    var className$p = ClassName("");
    function valueToModifier(elem, modifier) {
      return valueToClassName(elem, className$p(void 0, modifier));
    }
    function bindValue(value, applyValue) {
      value.emitter.on("change", compose(extractValue, applyValue));
      applyValue(value.rawValue);
    }
    function bindValueMap(valueMap, key, applyValue) {
      bindValue(valueMap.value(key), applyValue);
    }
    function bindClassModifier(viewProps, elem) {
      bindValueMap(viewProps, "disabled", valueToModifier(elem, "disabled"));
      bindValueMap(viewProps, "hidden", valueToModifier(elem, "hidden"));
    }
    function bindDisabled(viewProps, target) {
      bindValueMap(viewProps, "disabled", function(disabled) {
        target.disabled = disabled;
      });
    }
    function bindTabIndex(viewProps, elem) {
      bindValueMap(viewProps, "disabled", function(disabled) {
        elem.tabIndex = disabled ? -1 : 0;
      });
    }
    function bindTextContent(valueMap, key, elem) {
      bindValueMap(valueMap, key, function(text) {
        elem.textContent = text !== null && text !== void 0 ? text : "";
      });
    }
    function bindDisposed(viewProps, callback) {
      viewProps.value("disposed").emitter.on("change", function(disposed) {
        if (disposed) {
          callback();
        }
      });
    }
    function disposeElement(elem) {
      if (elem && elem.parentElement) {
        elem.parentElement.removeChild(elem);
      }
      return null;
    }
    function getAllBladePositions() {
      return ["veryfirst", "first", "last", "verylast"];
    }
    var className$o = ClassName("");
    var POS_TO_CLASS_NAME_MAP = {
      veryfirst: "vfst",
      first: "fst",
      last: "lst",
      verylast: "vlst"
    };
    var BladeController = function() {
      function BladeController2(config) {
        var _this = this;
        this.parent_ = null;
        this.blade = config.blade;
        this.view = config.view;
        this.viewProps = config.viewProps;
        var elem = this.view.element;
        this.blade.emitter.on("change", function(ev) {
          if (ev.propertyName === "positions") {
            getAllBladePositions().forEach(function(pos) {
              elem.classList.remove(className$o(void 0, POS_TO_CLASS_NAME_MAP[pos]));
            });
            _this.blade.positions.forEach(function(pos) {
              elem.classList.add(className$o(void 0, POS_TO_CLASS_NAME_MAP[pos]));
            });
          }
        });
        bindDisposed(this.viewProps, function() {
          if (_this.view.onDispose) {
            console.warn("View.onDispose is deprecated. Use ViewProps.value('disposed').emitter instead.");
            _this.view.onDispose();
          }
          disposeElement(elem);
        });
      }
      Object.defineProperty(BladeController2.prototype, "parent", {
        get: function() {
          return this.parent_;
        },
        enumerable: false,
        configurable: true
      });
      return BladeController2;
    }();
    var SVG_NS = "http://www.w3.org/2000/svg";
    function forceReflow(element) {
      element.offsetHeight;
    }
    function disableTransitionTemporarily(element, callback) {
      var t = element.style.transition;
      element.style.transition = "none";
      callback();
      element.style.transition = t;
    }
    function supportsTouch(doc) {
      return doc.ontouchstart !== void 0;
    }
    function getGlobalObject() {
      return new Function("return this")();
    }
    function getWindowDocument() {
      var globalObj = forceCast(getGlobalObject());
      return globalObj.document;
    }
    function isBrowser() {
      return "document" in getGlobalObject();
    }
    function getCanvasContext(canvasElement) {
      return isBrowser() ? canvasElement.getContext("2d") : null;
    }
    var ICON_ID_TO_INNER_HTML_MAP = {
      check: '<path d="M2 8l4 4l8 -8"/>',
      dropdown: '<path d="M5 7h6l-3 3 z"/>',
      p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
    };
    function createSvgIconElement(document2, iconId) {
      var elem = document2.createElementNS(SVG_NS, "svg");
      elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
      return elem;
    }
    function insertElementAt(parentElement, element, index) {
      parentElement.insertBefore(element, parentElement.children[index]);
    }
    function removeElement(element) {
      if (element.parentElement) {
        element.parentElement.removeChild(element);
      }
    }
    function removeChildElements(element) {
      while (element.children.length > 0) {
        element.removeChild(element.children[0]);
      }
    }
    function removeChildNodes(element) {
      while (element.childNodes.length > 0) {
        element.removeChild(element.childNodes[0]);
      }
    }
    function findNextTarget(ev) {
      if (ev.relatedTarget) {
        return forceCast(ev.relatedTarget);
      }
      if ("explicitOriginalTarget" in ev) {
        return ev.explicitOriginalTarget;
      }
      return null;
    }
    var className$n = ClassName("lbl");
    function createLabelNode(doc, label) {
      var frag = doc.createDocumentFragment();
      var lineNodes = label.split("\n").map(function(line) {
        return doc.createTextNode(line);
      });
      lineNodes.forEach(function(lineNode, index) {
        if (index > 0) {
          frag.appendChild(doc.createElement("br"));
        }
        frag.appendChild(lineNode);
      });
      return frag;
    }
    var LabelView = function() {
      function LabelView2(doc, config) {
        var _this = this;
        this.element = doc.createElement("div");
        this.element.classList.add(className$n());
        bindClassModifier(config.viewProps, this.element);
        var labelElem = doc.createElement("div");
        labelElem.classList.add(className$n("l"));
        bindValueMap(config.props, "label", function(value) {
          if (isEmpty(value)) {
            _this.element.classList.add(className$n(void 0, "nol"));
          } else {
            _this.element.classList.remove(className$n(void 0, "nol"));
            removeChildNodes(labelElem);
            labelElem.appendChild(createLabelNode(doc, value));
          }
        });
        this.element.appendChild(labelElem);
        this.labelElement = labelElem;
        var valueElem = doc.createElement("div");
        valueElem.classList.add(className$n("v"));
        this.element.appendChild(valueElem);
        this.valueElement = valueElem;
      }
      return LabelView2;
    }();
    var LabelController = function(_super) {
      __extends(LabelController2, _super);
      function LabelController2(doc, config) {
        var _this = this;
        var viewProps = config.valueController.viewProps;
        _this = _super.call(this, __assign(__assign({}, config), {view: new LabelView(doc, {
          props: config.props,
          viewProps
        }), viewProps})) || this;
        _this.props = config.props;
        _this.valueController = config.valueController;
        _this.view.valueElement.appendChild(_this.valueController.view.element);
        bindDisposed(_this.viewProps, function() {
          var vc = _this.valueController;
          if (vc.onDispose) {
            console.warn("Controller.onDispose is deprecated. Use ViewProps.value('disposed').emitter instead.");
            vc.onDispose();
          }
          if (vc.view.onDispose) {
            console.warn("View.onDispose is deprecated. Use ViewProps.value('disposed').emitter instead.");
            vc.view.onDispose();
          }
        });
        return _this;
      }
      return LabelController2;
    }(BladeController);
    var InputBindingController = function(_super) {
      __extends(InputBindingController2, _super);
      function InputBindingController2(doc, config) {
        var _this = _super.call(this, doc, config) || this;
        _this.binding = config.binding;
        return _this;
      }
      return InputBindingController2;
    }(LabelController);
    var InputBinding = function() {
      function InputBinding2(config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.reader = config.reader;
        this.writer = config.writer;
        this.emitter = new Emitter();
        this.value = config.value;
        this.value.emitter.on("change", this.onValueChange_);
        this.target = config.target;
        this.read();
      }
      InputBinding2.prototype.read = function() {
        var targetValue = this.target.read();
        if (targetValue !== void 0) {
          this.value.rawValue = this.reader(targetValue);
        }
      };
      InputBinding2.prototype.write_ = function(rawValue) {
        this.writer(this.target, rawValue);
      };
      InputBinding2.prototype.onValueChange_ = function(ev) {
        this.write_(ev.rawValue);
        this.emitter.emit("change", {
          rawValue: ev.rawValue,
          sender: this
        });
      };
      return InputBinding2;
    }();
    var BoundValue = function() {
      function BoundValue2(initialValue, config) {
        var _a2;
        this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
        this.equals_ = (_a2 = config === null || config === void 0 ? void 0 : config.equals) !== null && _a2 !== void 0 ? _a2 : function(v1, v2) {
          return v1 === v2;
        };
        this.emitter = new Emitter();
        this.rawValue_ = initialValue;
      }
      Object.defineProperty(BoundValue2.prototype, "constraint", {
        get: function() {
          return this.constraint_;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(BoundValue2.prototype, "rawValue", {
        get: function() {
          return this.rawValue_;
        },
        set: function(rawValue) {
          var constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
          var changed = !this.equals_(this.rawValue_, constrainedValue);
          if (changed) {
            this.rawValue_ = constrainedValue;
            this.emitter.emit("change", {
              rawValue: constrainedValue,
              sender: this
            });
          }
        },
        enumerable: false,
        configurable: true
      });
      return BoundValue2;
    }();
    var PrimitiveValue = function() {
      function PrimitiveValue2(initialValue) {
        this.emitter = new Emitter();
        this.value_ = initialValue;
      }
      Object.defineProperty(PrimitiveValue2.prototype, "rawValue", {
        get: function() {
          return this.value_;
        },
        set: function(value) {
          if (this.value_ === value) {
            return;
          }
          this.value_ = value;
          this.emitter.emit("change", {
            sender: this,
            rawValue: this.value_
          });
        },
        enumerable: false,
        configurable: true
      });
      return PrimitiveValue2;
    }();
    var ValueMap = function() {
      function ValueMap2(initialValue) {
        var _this = this;
        this.emitter = new Emitter();
        var keys = Object.keys(initialValue);
        var props = keys.map(function(key) {
          return new PrimitiveValue(initialValue[key]);
        });
        props.forEach(function(prop, index) {
          prop.emitter.on("change", function() {
            _this.emitter.emit("change", {
              key: keys[index],
              sender: _this
            });
          });
        });
        this.valMap_ = keys.reduce(function(o, key, index) {
          var _a2;
          return Object.assign(o, (_a2 = {}, _a2[key] = props[index], _a2));
        }, {});
      }
      ValueMap2.prototype.get = function(key) {
        return this.valMap_[key].rawValue;
      };
      ValueMap2.prototype.set = function(key, value) {
        this.valMap_[key].rawValue = value;
      };
      ValueMap2.prototype.value = function(key) {
        return this.valMap_[key];
      };
      ValueMap2.prototype.valueEmitter = function(key) {
        console.warn("ValueMap.valueEmitter is deprecated. Use ValueMap.value.emitter instead.\nThis polyfill will be removed in the next major version.");
        return this.valMap_[key].emitter;
      };
      return ValueMap2;
    }();
    function createViewProps(opt_initialValue) {
      var _a2, _b;
      var initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
      return new ValueMap({
        disabled: (_a2 = initialValue.disabled) !== null && _a2 !== void 0 ? _a2 : false,
        disposed: false,
        hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false
      });
    }
    var CompositeConstraint = function() {
      function CompositeConstraint2(constraints) {
        this.constraints = constraints;
      }
      CompositeConstraint2.prototype.constrain = function(value) {
        return this.constraints.reduce(function(result, c) {
          return c.constrain(result);
        }, value);
      };
      return CompositeConstraint2;
    }();
    function findConstraint(c, constraintClass) {
      if (c instanceof constraintClass) {
        return c;
      }
      if (c instanceof CompositeConstraint) {
        var result = c.constraints.reduce(function(tmpResult, sc) {
          if (tmpResult) {
            return tmpResult;
          }
          return sc instanceof constraintClass ? sc : null;
        }, null);
        if (result) {
          return result;
        }
      }
      return null;
    }
    var ListConstraint = function() {
      function ListConstraint2(options) {
        this.options = options;
      }
      ListConstraint2.prototype.constrain = function(value) {
        var opts = this.options;
        if (opts.length === 0) {
          return value;
        }
        var matched = opts.filter(function(item) {
          return item.value === value;
        }).length > 0;
        return matched ? value : opts[0].value;
      };
      return ListConstraint2;
    }();
    var StepConstraint = function() {
      function StepConstraint2(step) {
        this.step = step;
      }
      StepConstraint2.prototype.constrain = function(value) {
        var r = value < 0 ? -Math.round(-value / this.step) : Math.round(value / this.step);
        return r * this.step;
      };
      return StepConstraint2;
    }();
    function mapRange(value, start1, end1, start2, end2) {
      var p = (value - start1) / (end1 - start1);
      return start2 + p * (end2 - start2);
    }
    function getDecimalDigits(value) {
      var text = String(value.toFixed(10));
      var frac = text.split(".")[1];
      return frac.replace(/0+$/, "").length;
    }
    function constrainRange(value, min4, max4) {
      return Math.min(Math.max(value, min4), max4);
    }
    function loopRange(value, max4) {
      return (value % max4 + max4) % max4;
    }
    function normalizeListOptions(options) {
      if (Array.isArray(options)) {
        return options;
      }
      var items = [];
      Object.keys(options).forEach(function(text) {
        items.push({text, value: options[text]});
      });
      return items;
    }
    function createListConstraint(params) {
      if ("options" in params && params.options !== void 0) {
        return new ListConstraint(normalizeListOptions(forceCast(params.options)));
      }
      return null;
    }
    function findListItems(constraint) {
      var c = constraint ? findConstraint(constraint, ListConstraint) : null;
      if (!c) {
        return null;
      }
      return c.options;
    }
    function findStep(constraint) {
      var c = constraint ? findConstraint(constraint, StepConstraint) : null;
      if (!c) {
        return null;
      }
      return c.step;
    }
    function getSuitableDecimalDigits(constraint, rawValue) {
      var sc = constraint && findConstraint(constraint, StepConstraint);
      if (sc) {
        return getDecimalDigits(sc.step);
      }
      return Math.max(getDecimalDigits(rawValue), 2);
    }
    function getBaseStep(constraint) {
      var step = findStep(constraint);
      return step !== null && step !== void 0 ? step : 1;
    }
    function getSuitableDraggingScale(constraint, rawValue) {
      var _a2;
      var sc = constraint && findConstraint(constraint, StepConstraint);
      var base = Math.abs((_a2 = sc === null || sc === void 0 ? void 0 : sc.step) !== null && _a2 !== void 0 ? _a2 : rawValue);
      return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
    }
    function polyfillViewProps(controller, pluginId) {
      if (!controller.viewProps) {
        controller.viewProps = createViewProps();
        console.warn("Missing controller.viewProps (plugin: '" + pluginId + "')\nThis polyfill will be removed in the next major version.");
      }
    }
    function createInputBindingController(plugin, args) {
      var initialValue = plugin.accept(args.target.read(), args.params);
      if (initialValue === null) {
        return null;
      }
      var valueArgs = {
        target: args.target,
        initialValue,
        params: args.params
      };
      var reader = plugin.binding.reader(valueArgs);
      var constraint = plugin.binding.constraint ? plugin.binding.constraint(valueArgs) : void 0;
      var value = new BoundValue(reader(initialValue), {
        constraint,
        equals: plugin.binding.equals
      });
      var binding = new InputBinding({
        reader,
        target: args.target,
        value,
        writer: plugin.binding.writer(valueArgs)
      });
      var controller = plugin.controller({
        constraint,
        document: args.document,
        initialValue,
        params: args.params,
        value: binding.value,
        viewProps: createViewProps({
          disabled: args.params.disabled
        })
      });
      polyfillViewProps(controller, plugin.id);
      var blade = new Blade();
      return new InputBindingController(args.document, {
        binding,
        blade,
        props: new ValueMap({
          label: args.params.label || args.target.key
        }),
        valueController: controller
      });
    }
    var MonitorBindingController = function(_super) {
      __extends(MonitorBindingController2, _super);
      function MonitorBindingController2(doc, config) {
        var _this = _super.call(this, doc, config) || this;
        _this.binding = config.binding;
        bindDisabled(_this.viewProps, _this.binding.ticker);
        bindDisposed(_this.viewProps, function() {
          _this.binding.dispose();
        });
        return _this;
      }
      return MonitorBindingController2;
    }(LabelController);
    function fillBuffer(buffer, bufferSize) {
      while (buffer.length < bufferSize) {
        buffer.push(void 0);
      }
    }
    function initializeBuffer(bufferSize) {
      var buffer = [];
      fillBuffer(buffer, bufferSize);
      return new BoundValue(buffer);
    }
    function createTrimmedBuffer(buffer) {
      var index = buffer.indexOf(void 0);
      return forceCast(index < 0 ? buffer : buffer.slice(0, index));
    }
    function createPushedBuffer(buffer, newValue) {
      var newBuffer = __spreadArrays(createTrimmedBuffer(buffer), [newValue]);
      if (newBuffer.length > buffer.length) {
        newBuffer.splice(0, newBuffer.length - buffer.length);
      } else {
        fillBuffer(newBuffer, buffer.length);
      }
      return newBuffer;
    }
    var MonitorBinding = function() {
      function MonitorBinding2(config) {
        this.onTick_ = this.onTick_.bind(this);
        this.reader_ = config.reader;
        this.target = config.target;
        this.emitter = new Emitter();
        this.value = config.value;
        this.ticker = config.ticker;
        this.ticker.emitter.on("tick", this.onTick_);
        this.read();
      }
      MonitorBinding2.prototype.dispose = function() {
        this.ticker.dispose();
      };
      MonitorBinding2.prototype.read = function() {
        var targetValue = this.target.read();
        if (targetValue === void 0) {
          return;
        }
        var buffer = this.value.rawValue;
        var newValue = this.reader_(targetValue);
        this.value.rawValue = createPushedBuffer(buffer, newValue);
        this.emitter.emit("update", {
          rawValue: newValue,
          sender: this
        });
      };
      MonitorBinding2.prototype.onTick_ = function(_) {
        this.read();
      };
      return MonitorBinding2;
    }();
    var IntervalTicker = function() {
      function IntervalTicker2(doc, interval) {
        this.disabled_ = false;
        this.timerId_ = null;
        this.onTick_ = this.onTick_.bind(this);
        this.doc_ = doc;
        this.emitter = new Emitter();
        this.interval_ = interval;
        this.setTimer_();
      }
      Object.defineProperty(IntervalTicker2.prototype, "disabled", {
        get: function() {
          return this.disabled_;
        },
        set: function(inactive) {
          this.disabled_ = inactive;
          if (this.disabled_) {
            this.clearTimer_();
          } else {
            this.setTimer_();
          }
        },
        enumerable: false,
        configurable: true
      });
      IntervalTicker2.prototype.dispose = function() {
        this.clearTimer_();
      };
      IntervalTicker2.prototype.clearTimer_ = function() {
        if (this.timerId_ === null) {
          return;
        }
        var win = this.doc_.defaultView;
        if (win) {
          win.clearInterval(this.timerId_);
        }
        this.timerId_ = null;
      };
      IntervalTicker2.prototype.setTimer_ = function() {
        this.clearTimer_();
        if (this.interval_ <= 0) {
          return;
        }
        var win = this.doc_.defaultView;
        if (win) {
          this.timerId_ = win.setInterval(this.onTick_, this.interval_);
        }
      };
      IntervalTicker2.prototype.onTick_ = function() {
        if (this.disabled_) {
          return;
        }
        this.emitter.emit("tick", {
          sender: this
        });
      };
      return IntervalTicker2;
    }();
    var ManualTicker = function() {
      function ManualTicker2() {
        this.disabled = false;
        this.emitter = new Emitter();
      }
      ManualTicker2.prototype.dispose = function() {
      };
      ManualTicker2.prototype.tick = function() {
        if (this.disabled) {
          return;
        }
        this.emitter.emit("tick", {
          sender: this
        });
      };
      return ManualTicker2;
    }();
    var Constants = {
      monitor: {
        defaultInterval: 200,
        defaultLineCount: 3
      }
    };
    function createTicker(document2, interval) {
      return interval === 0 ? new ManualTicker() : new IntervalTicker(document2, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
    }
    function createMonitorBindingController(plugin, args) {
      var _a2, _b;
      var initialValue = plugin.accept(args.target.read(), args.params);
      if (initialValue === null) {
        return null;
      }
      var valueArgs = {
        target: args.target,
        initialValue,
        params: args.params
      };
      var reader = plugin.binding.reader(valueArgs);
      var bufferSize = (_b = (_a2 = args.params.bufferSize) !== null && _a2 !== void 0 ? _a2 : plugin.binding.defaultBufferSize && plugin.binding.defaultBufferSize(args.params)) !== null && _b !== void 0 ? _b : 1;
      var binding = new MonitorBinding({
        reader,
        target: args.target,
        ticker: createTicker(args.document, args.params.interval),
        value: initializeBuffer(bufferSize)
      });
      var controller = plugin.controller({
        document: args.document,
        params: args.params,
        value: binding.value,
        viewProps: createViewProps({
          disabled: args.params.disabled
        })
      });
      polyfillViewProps(controller, plugin.id);
      var blade = new Blade();
      return new MonitorBindingController(args.document, {
        binding,
        blade,
        props: new ValueMap({
          label: args.params.label || args.target.key
        }),
        valueController: controller
      });
    }
    var BladeApi = function() {
      function BladeApi2(controller) {
        this.controller_ = controller;
      }
      Object.defineProperty(BladeApi2.prototype, "disabled", {
        get: function() {
          return this.controller_.viewProps.get("disabled");
        },
        set: function(disabled) {
          this.controller_.viewProps.set("disabled", disabled);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(BladeApi2.prototype, "hidden", {
        get: function() {
          return this.controller_.viewProps.get("hidden");
        },
        set: function(hidden) {
          this.controller_.viewProps.set("hidden", hidden);
        },
        enumerable: false,
        configurable: true
      });
      BladeApi2.prototype.dispose = function() {
        this.controller_.viewProps.set("disposed", true);
      };
      return BladeApi2;
    }();
    var TpEvent = function() {
      function TpEvent2(target) {
        this.target = target;
      }
      return TpEvent2;
    }();
    var TpChangeEvent = function(_super) {
      __extends(TpChangeEvent2, _super);
      function TpChangeEvent2(target, value, presetKey) {
        var _this = _super.call(this, target) || this;
        _this.value = value;
        _this.presetKey = presetKey;
        return _this;
      }
      return TpChangeEvent2;
    }(TpEvent);
    var TpUpdateEvent = function(_super) {
      __extends(TpUpdateEvent2, _super);
      function TpUpdateEvent2(target, value, presetKey) {
        var _this = _super.call(this, target) || this;
        _this.value = value;
        _this.presetKey = presetKey;
        return _this;
      }
      return TpUpdateEvent2;
    }(TpEvent);
    var TpFoldEvent = function(_super) {
      __extends(TpFoldEvent2, _super);
      function TpFoldEvent2(target, expanded) {
        var _this = _super.call(this, target) || this;
        _this.expanded = expanded;
        return _this;
      }
      return TpFoldEvent2;
    }(TpEvent);
    var InputBindingApi = function(_super) {
      __extends(InputBindingApi2, _super);
      function InputBindingApi2(controller) {
        var _this = _super.call(this, controller) || this;
        _this.onBindingChange_ = _this.onBindingChange_.bind(_this);
        _this.emitter_ = new Emitter();
        _this.controller_.binding.emitter.on("change", _this.onBindingChange_);
        return _this;
      }
      InputBindingApi2.prototype.on = function(eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function(ev) {
          bh(ev.event);
        });
        return this;
      };
      InputBindingApi2.prototype.refresh = function() {
        this.controller_.binding.read();
      };
      InputBindingApi2.prototype.onBindingChange_ = function(ev) {
        var value = ev.sender.target.read();
        this.emitter_.emit("change", {
          event: new TpChangeEvent(this, forceCast(value), this.controller_.binding.target.presetKey)
        });
      };
      return InputBindingApi2;
    }(BladeApi);
    var MonitorBindingApi = function(_super) {
      __extends(MonitorBindingApi2, _super);
      function MonitorBindingApi2(controller) {
        var _this = _super.call(this, controller) || this;
        _this.onBindingUpdate_ = _this.onBindingUpdate_.bind(_this);
        _this.emitter_ = new Emitter();
        _this.controller_.binding.emitter.on("update", _this.onBindingUpdate_);
        return _this;
      }
      MonitorBindingApi2.prototype.on = function(eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function(ev) {
          bh(ev.event);
        });
        return this;
      };
      MonitorBindingApi2.prototype.refresh = function() {
        this.controller_.binding.read();
      };
      MonitorBindingApi2.prototype.onBindingUpdate_ = function(ev) {
        var value = ev.sender.target.read();
        this.emitter_.emit("update", {
          event: new TpUpdateEvent(this, forceCast(value), this.controller_.binding.target.presetKey)
        });
      };
      return MonitorBindingApi2;
    }(BladeApi);
    function createParamFinder(test) {
      return function(params, key) {
        if (!(key in params)) {
          return;
        }
        var value = params[key];
        return test(value) ? value : void 0;
      };
    }
    var findBooleanParam = createParamFinder(function(value) {
      return typeof value === "boolean";
    });
    var findNumberParam = createParamFinder(function(value) {
      return typeof value === "number";
    });
    var findStringParam = createParamFinder(function(value) {
      return typeof value === "string";
    });
    var findFunctionParam = createParamFinder(function(value) {
      return typeof value === "function";
    });
    function isObject(value) {
      if (value === null) {
        return false;
      }
      return typeof value === "object";
    }
    var findObjectParam = createParamFinder(isObject);
    function createArrayParamFinder(test) {
      return createParamFinder(function(value) {
        if (!Array.isArray(value)) {
          return false;
        }
        for (var i = 0; i < value.length; i++) {
          if (!test(value[i])) {
            return false;
          }
        }
        return true;
      });
    }
    var findObjectArrayParam = createArrayParamFinder(isObject);
    function createBladeController(plugin, args) {
      var ac = plugin.accept(args.params);
      if (!ac) {
        return null;
      }
      var disabled = findBooleanParam(args.params, "disabled");
      var hidden = findBooleanParam(args.params, "hidden");
      return plugin.controller({
        blade: new Blade(),
        document: args.document,
        params: forceCast(__assign(__assign({}, ac.params), {disabled, hidden})),
        viewProps: createViewProps({
          disabled,
          hidden
        })
      });
    }
    function addButtonAsBlade(api, params) {
      return api.addBlade_v3_(__assign(__assign({}, params), {view: "button"}));
    }
    function addFolderAsBlade(api, params) {
      return api.addBlade_v3_(__assign(__assign({}, params), {view: "folder"}));
    }
    function addSeparatorAsBlade(api, opt_params) {
      var params = opt_params || {};
      return api.addBlade_v3_(__assign(__assign({}, params), {view: "separator"}));
    }
    function addTabAsBlade(api, params) {
      return api.addBlade_v3_(__assign(__assign({}, params), {view: "tab"}));
    }
    var RackLikeApi = function(_super) {
      __extends(RackLikeApi2, _super);
      function RackLikeApi2(controller, rackApi) {
        var _this = _super.call(this, controller) || this;
        _this.rackApi_ = rackApi;
        return _this;
      }
      return RackLikeApi2;
    }(BladeApi);
    var BindingTarget = function() {
      function BindingTarget2(obj, key, opt_id) {
        this.obj_ = obj;
        this.key_ = key;
        this.presetKey_ = opt_id !== null && opt_id !== void 0 ? opt_id : key;
      }
      BindingTarget2.isBindable = function(obj) {
        if (obj === null) {
          return false;
        }
        if (typeof obj !== "object") {
          return false;
        }
        return true;
      };
      Object.defineProperty(BindingTarget2.prototype, "key", {
        get: function() {
          return this.key_;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(BindingTarget2.prototype, "presetKey", {
        get: function() {
          return this.presetKey_;
        },
        enumerable: false,
        configurable: true
      });
      BindingTarget2.prototype.read = function() {
        return this.obj_[this.key_];
      };
      BindingTarget2.prototype.write = function(value) {
        this.obj_[this.key_] = value;
      };
      BindingTarget2.prototype.writeProperty = function(name, value) {
        var valueObj = this.read();
        if (!BindingTarget2.isBindable(valueObj)) {
          throw TpError.notBindable();
        }
        if (!(name in valueObj)) {
          throw TpError.propertyNotFound(name);
        }
        valueObj[name] = value;
      };
      return BindingTarget2;
    }();
    function createBindingTarget(obj, key, opt_id) {
      if (!BindingTarget.isBindable(obj)) {
        throw TpError.notBindable();
      }
      return new BindingTarget(obj, key, opt_id);
    }
    function registerPlugin(r) {
      if (r.type === "blade") {
        Plugins.blades.unshift(r.plugin);
      } else if (r.type === "input") {
        Plugins.inputs.unshift(r.plugin);
      } else if (r.type === "monitor") {
        Plugins.monitors.unshift(r.plugin);
      }
    }
    var NestedOrderedSet = function() {
      function NestedOrderedSet2(extract) {
        this.emitter = new Emitter();
        this.items_ = [];
        this.cache_ = new Set();
        this.onSubListAdd_ = this.onSubListAdd_.bind(this);
        this.onSubListRemove_ = this.onSubListRemove_.bind(this);
        this.extract_ = extract;
      }
      Object.defineProperty(NestedOrderedSet2.prototype, "items", {
        get: function() {
          return this.items_;
        },
        enumerable: false,
        configurable: true
      });
      NestedOrderedSet2.prototype.allItems = function() {
        return Array.from(this.cache_);
      };
      NestedOrderedSet2.prototype.find = function(callback) {
        for (var _i = 0, _a2 = this.allItems(); _i < _a2.length; _i++) {
          var item = _a2[_i];
          if (callback(item)) {
            return item;
          }
        }
        return null;
      };
      NestedOrderedSet2.prototype.includes = function(item) {
        return this.cache_.has(item);
      };
      NestedOrderedSet2.prototype.add = function(item, opt_index) {
        var _this = this;
        if (this.includes(item)) {
          throw TpError.shouldNeverHappen();
        }
        var index = opt_index !== void 0 ? opt_index : this.items_.length;
        this.items_.splice(index, 0, item);
        this.cache_.add(item);
        var subList = this.extract_(item);
        if (subList) {
          subList.emitter.on("add", this.onSubListAdd_);
          subList.emitter.on("remove", this.onSubListRemove_);
          subList.allItems().forEach(function(item2) {
            _this.cache_.add(item2);
          });
        }
        this.emitter.emit("add", {
          index,
          item,
          root: this,
          target: this
        });
      };
      NestedOrderedSet2.prototype.remove = function(item) {
        var index = this.items_.indexOf(item);
        if (index < 0) {
          return;
        }
        this.items_.splice(index, 1);
        this.cache_.delete(item);
        var subList = this.extract_(item);
        if (subList) {
          subList.emitter.off("add", this.onSubListAdd_);
          subList.emitter.off("remove", this.onSubListRemove_);
        }
        this.emitter.emit("remove", {
          index,
          item,
          root: this,
          target: this
        });
      };
      NestedOrderedSet2.prototype.onSubListAdd_ = function(ev) {
        this.cache_.add(ev.item);
        this.emitter.emit("add", {
          index: ev.index,
          item: ev.item,
          root: this,
          target: ev.target
        });
      };
      NestedOrderedSet2.prototype.onSubListRemove_ = function(ev) {
        this.cache_.delete(ev.item);
        this.emitter.emit("remove", {
          index: ev.index,
          item: ev.item,
          root: this,
          target: ev.target
        });
      };
      return NestedOrderedSet2;
    }();
    function findSubBladeApiSet(api) {
      if (api instanceof RackApi) {
        return api["apiSet_"];
      }
      if (api instanceof RackLikeApi) {
        return api["rackApi_"]["apiSet_"];
      }
      return null;
    }
    function getApiByController(apiSet, controller) {
      var api = apiSet.find(function(api2) {
        return api2.controller_ === controller;
      });
      if (!api) {
        throw TpError.shouldNeverHappen();
      }
      return api;
    }
    var RackApi = function(_super) {
      __extends(RackApi2, _super);
      function RackApi2(controller) {
        var _this = _super.call(this, controller) || this;
        _this.onRackAdd_ = _this.onRackAdd_.bind(_this);
        _this.onRackRemove_ = _this.onRackRemove_.bind(_this);
        _this.onRackInputChange_ = _this.onRackInputChange_.bind(_this);
        _this.onRackMonitorUpdate_ = _this.onRackMonitorUpdate_.bind(_this);
        _this.emitter_ = new Emitter();
        _this.apiSet_ = new NestedOrderedSet(findSubBladeApiSet);
        var rack = _this.controller_.rack;
        rack.emitter.on("add", _this.onRackAdd_);
        rack.emitter.on("remove", _this.onRackRemove_);
        rack.emitter.on("inputchange", _this.onRackInputChange_);
        rack.emitter.on("monitorupdate", _this.onRackMonitorUpdate_);
        rack.children.forEach(function(bc) {
          _this.setUpApi_(bc);
        });
        return _this;
      }
      Object.defineProperty(RackApi2.prototype, "children", {
        get: function() {
          var _this = this;
          return this.controller_.rack.children.map(function(bc) {
            return getApiByController(_this.apiSet_, bc);
          });
        },
        enumerable: false,
        configurable: true
      });
      RackApi2.prototype.addInput = function(object, key, opt_params) {
        var params = opt_params || {};
        var doc = this.controller_.view.element.ownerDocument;
        var bc = createInput(doc, createBindingTarget(object, key, params.presetKey), params);
        var api = new InputBindingApi(bc);
        return this.add(api, params.index);
      };
      RackApi2.prototype.addMonitor = function(object, key, opt_params) {
        var params = opt_params || {};
        var doc = this.controller_.view.element.ownerDocument;
        var bc = createMonitor(doc, createBindingTarget(object, key), params);
        var api = new MonitorBindingApi(bc);
        return forceCast(this.add(api, params.index));
      };
      RackApi2.prototype.addFolder = function(params) {
        return addFolderAsBlade(this, params);
      };
      RackApi2.prototype.addButton = function(params) {
        return addButtonAsBlade(this, params);
      };
      RackApi2.prototype.addSeparator = function(opt_params) {
        return addSeparatorAsBlade(this, opt_params);
      };
      RackApi2.prototype.addTab = function(params) {
        return addTabAsBlade(this, params);
      };
      RackApi2.prototype.add = function(api, opt_index) {
        this.controller_.rack.add(api.controller_, opt_index);
        var gapi = this.apiSet_.find(function(a) {
          return a.controller_ === api.controller_;
        });
        if (gapi) {
          this.apiSet_.remove(gapi);
        }
        this.apiSet_.add(api);
        return api;
      };
      RackApi2.prototype.remove = function(api) {
        this.controller_.rack.remove(api.controller_);
      };
      RackApi2.prototype.addBlade_v3_ = function(opt_params) {
        var params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
        var doc = this.controller_.view.element.ownerDocument;
        var bc = createBlade(doc, params);
        var api = createBladeApi(bc);
        return this.add(api, params.index);
      };
      RackApi2.prototype.on = function(eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function(ev) {
          bh(ev.event);
        });
        return this;
      };
      RackApi2.prototype.setUpApi_ = function(bc) {
        var api = this.apiSet_.find(function(api2) {
          return api2.controller_ === bc;
        });
        if (!api) {
          this.apiSet_.add(createBladeApi(bc));
        }
      };
      RackApi2.prototype.onRackAdd_ = function(ev) {
        this.setUpApi_(ev.bladeController);
      };
      RackApi2.prototype.onRackRemove_ = function(ev) {
        if (ev.isRoot) {
          var api = getApiByController(this.apiSet_, ev.bladeController);
          this.apiSet_.remove(api);
        }
      };
      RackApi2.prototype.onRackInputChange_ = function(ev) {
        var api = getApiByController(this.apiSet_, ev.bindingController);
        var binding = ev.bindingController.binding;
        this.emitter_.emit("change", {
          event: new TpChangeEvent(api, forceCast(binding.target.read()), binding.target.presetKey)
        });
      };
      RackApi2.prototype.onRackMonitorUpdate_ = function(ev) {
        var api = getApiByController(this.apiSet_, ev.bindingController);
        var binding = ev.bindingController.binding;
        this.emitter_.emit("update", {
          event: new TpUpdateEvent(api, forceCast(binding.target.read()), binding.target.presetKey)
        });
      };
      return RackApi2;
    }(BladeApi);
    var PlainView = function() {
      function PlainView2(doc, config) {
        var className2 = ClassName(config.viewName);
        this.element = doc.createElement("div");
        this.element.classList.add(className2());
        bindClassModifier(config.viewProps, this.element);
      }
      return PlainView2;
    }();
    var RackLikeController = function(_super) {
      __extends(RackLikeController2, _super);
      function RackLikeController2(config) {
        var _this = _super.call(this, {
          blade: config.blade,
          view: config.view,
          viewProps: config.rackController.viewProps
        }) || this;
        _this.rackController = config.rackController;
        return _this;
      }
      return RackLikeController2;
    }(BladeController);
    function findInputBindingController(bcs, b) {
      for (var i = 0; i < bcs.length; i++) {
        var bc = bcs[i];
        if (bc instanceof InputBindingController && bc.binding === b) {
          return bc;
        }
      }
      return null;
    }
    function findMonitorBindingController(bcs, b) {
      for (var i = 0; i < bcs.length; i++) {
        var bc = bcs[i];
        if (bc instanceof MonitorBindingController && bc.binding === b) {
          return bc;
        }
      }
      return null;
    }
    function findSubRack(bc) {
      if (bc instanceof RackController) {
        return bc.rack;
      }
      if (bc instanceof RackLikeController) {
        return bc.rackController.rack;
      }
      return null;
    }
    function findSubBladeControllerSet(bc) {
      var rack = findSubRack(bc);
      return rack ? rack["bcSet_"] : null;
    }
    var BladeRack = function() {
      function BladeRack2(blade) {
        var _a2;
        this.onBladeChange_ = this.onBladeChange_.bind(this);
        this.onSetAdd_ = this.onSetAdd_.bind(this);
        this.onSetRemove_ = this.onSetRemove_.bind(this);
        this.onChildDispose_ = this.onChildDispose_.bind(this);
        this.onChildLayout_ = this.onChildLayout_.bind(this);
        this.onChildInputChange_ = this.onChildInputChange_.bind(this);
        this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this);
        this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
        this.onDescendantLayout_ = this.onDescendantLayout_.bind(this);
        this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this);
        this.onDescendaantMonitorUpdate_ = this.onDescendaantMonitorUpdate_.bind(this);
        this.emitter = new Emitter();
        this.blade_ = blade !== null && blade !== void 0 ? blade : null;
        (_a2 = this.blade_) === null || _a2 === void 0 ? void 0 : _a2.emitter.on("change", this.onBladeChange_);
        this.bcSet_ = new NestedOrderedSet(findSubBladeControllerSet);
        this.bcSet_.emitter.on("add", this.onSetAdd_);
        this.bcSet_.emitter.on("remove", this.onSetRemove_);
      }
      Object.defineProperty(BladeRack2.prototype, "children", {
        get: function() {
          return this.bcSet_.items;
        },
        enumerable: false,
        configurable: true
      });
      BladeRack2.prototype.add = function(bc, opt_index) {
        if (bc.parent) {
          bc.parent.remove(bc);
        }
        bc["parent_"] = this;
        this.bcSet_.add(bc, opt_index);
      };
      BladeRack2.prototype.remove = function(bc) {
        bc["parent_"] = null;
        this.bcSet_.remove(bc);
      };
      BladeRack2.prototype.find = function(controllerClass) {
        return forceCast(this.bcSet_.allItems().filter(function(bc) {
          return bc instanceof controllerClass;
        }));
      };
      BladeRack2.prototype.onSetAdd_ = function(ev) {
        this.updatePositions_();
        var isRoot = ev.target === ev.root;
        this.emitter.emit("add", {
          bladeController: ev.item,
          index: ev.index,
          isRoot,
          sender: this
        });
        if (!isRoot) {
          return;
        }
        var bc = ev.item;
        bc.viewProps.emitter.on("change", this.onChildViewPropsChange_);
        bc.blade.emitter.on("change", this.onChildLayout_);
        bindDisposed(bc.viewProps, this.onChildDispose_);
        if (bc instanceof InputBindingController) {
          bc.binding.emitter.on("change", this.onChildInputChange_);
        } else if (bc instanceof MonitorBindingController) {
          bc.binding.emitter.on("update", this.onChildMonitorUpdate_);
        } else {
          var rack = findSubRack(bc);
          if (rack) {
            var emitter = rack.emitter;
            emitter.on("layout", this.onDescendantLayout_);
            emitter.on("inputchange", this.onDescendantInputChange_);
            emitter.on("monitorupdate", this.onDescendaantMonitorUpdate_);
          }
        }
      };
      BladeRack2.prototype.onSetRemove_ = function(ev) {
        this.updatePositions_();
        var isRoot = ev.target === ev.root;
        this.emitter.emit("remove", {
          bladeController: ev.item,
          isRoot,
          sender: this
        });
        if (!isRoot) {
          return;
        }
        var bc = ev.item;
        if (bc instanceof InputBindingController) {
          bc.binding.emitter.off("change", this.onChildInputChange_);
        } else if (bc instanceof MonitorBindingController) {
          bc.binding.emitter.off("update", this.onChildMonitorUpdate_);
        } else {
          var rack = findSubRack(bc);
          if (rack) {
            var emitter = rack.emitter;
            emitter.off("layout", this.onDescendantLayout_);
            emitter.off("inputchange", this.onDescendantInputChange_);
            emitter.off("monitorupdate", this.onDescendaantMonitorUpdate_);
          }
        }
      };
      BladeRack2.prototype.updatePositions_ = function() {
        var _this = this;
        var visibleItems = this.bcSet_.items.filter(function(bc) {
          return !bc.viewProps.get("hidden");
        });
        var firstVisibleItem = visibleItems[0];
        var lastVisibleItem = visibleItems[visibleItems.length - 1];
        this.bcSet_.items.forEach(function(bc) {
          var ps = [];
          if (bc === firstVisibleItem) {
            ps.push("first");
            if (!_this.blade_ || _this.blade_.positions.includes("veryfirst")) {
              ps.push("veryfirst");
            }
          }
          if (bc === lastVisibleItem) {
            ps.push("last");
            if (!_this.blade_ || _this.blade_.positions.includes("verylast")) {
              ps.push("verylast");
            }
          }
          bc.blade.positions = ps;
        });
      };
      BladeRack2.prototype.onChildLayout_ = function(ev) {
        if (ev.propertyName === "positions") {
          this.updatePositions_();
          this.emitter.emit("layout", {
            sender: this
          });
        }
      };
      BladeRack2.prototype.onChildViewPropsChange_ = function(_ev) {
        this.updatePositions_();
        this.emitter.emit("layout", {
          sender: this
        });
      };
      BladeRack2.prototype.onChildDispose_ = function() {
        var _this = this;
        var disposedUcs = this.bcSet_.items.filter(function(bc) {
          return bc.viewProps.get("disposed");
        });
        disposedUcs.forEach(function(bc) {
          _this.bcSet_.remove(bc);
        });
      };
      BladeRack2.prototype.onChildInputChange_ = function(ev) {
        var ibc = findInputBindingController(this.find(InputBindingController), ev.sender);
        if (!ibc) {
          throw TpError.shouldNeverHappen();
        }
        this.emitter.emit("inputchange", {
          bindingController: ibc,
          sender: this
        });
      };
      BladeRack2.prototype.onChildMonitorUpdate_ = function(ev) {
        var mbc = findMonitorBindingController(this.find(MonitorBindingController), ev.sender);
        if (!mbc) {
          throw TpError.shouldNeverHappen();
        }
        this.emitter.emit("monitorupdate", {
          bindingController: mbc,
          sender: this
        });
      };
      BladeRack2.prototype.onDescendantLayout_ = function(_) {
        this.updatePositions_();
        this.emitter.emit("layout", {
          sender: this
        });
      };
      BladeRack2.prototype.onDescendantInputChange_ = function(ev) {
        this.emitter.emit("inputchange", {
          bindingController: ev.bindingController,
          sender: this
        });
      };
      BladeRack2.prototype.onDescendaantMonitorUpdate_ = function(ev) {
        this.emitter.emit("monitorupdate", {
          bindingController: ev.bindingController,
          sender: this
        });
      };
      BladeRack2.prototype.onBladeChange_ = function(ev) {
        if (ev.propertyName === "positions") {
          this.updatePositions_();
        }
      };
      return BladeRack2;
    }();
    var RackController = function(_super) {
      __extends(RackController2, _super);
      function RackController2(doc, config) {
        var _this = _super.call(this, __assign(__assign({}, config), {view: new PlainView(doc, {
          viewName: "brk",
          viewProps: config.viewProps
        })})) || this;
        _this.onRackAdd_ = _this.onRackAdd_.bind(_this);
        _this.onRackRemove_ = _this.onRackRemove_.bind(_this);
        var rack = new BladeRack(config.root ? void 0 : config.blade);
        rack.emitter.on("add", _this.onRackAdd_);
        rack.emitter.on("remove", _this.onRackRemove_);
        _this.rack = rack;
        bindDisposed(_this.viewProps, function() {
          for (var i = _this.rack.children.length - 1; i >= 0; i--) {
            var bc = _this.rack.children[i];
            bc.viewProps.set("disposed", true);
          }
        });
        return _this;
      }
      RackController2.prototype.onRackAdd_ = function(ev) {
        if (!ev.isRoot) {
          return;
        }
        insertElementAt(this.view.element, ev.bladeController.view.element, ev.index);
      };
      RackController2.prototype.onRackRemove_ = function(ev) {
        if (!ev.isRoot) {
          return;
        }
        removeElement(ev.bladeController.view.element);
      };
      return RackController2;
    }(BladeController);
    var Plugins = {
      blades: [],
      inputs: [],
      monitors: []
    };
    function getAllPlugins() {
      return __spreadArrays(Plugins.blades, Plugins.inputs, Plugins.monitors);
    }
    function createInput(document2, target, params) {
      var initialValue = target.read();
      if (isEmpty(initialValue)) {
        throw new TpError({
          context: {
            key: target.key
          },
          type: "nomatchingcontroller"
        });
      }
      var bc = Plugins.inputs.reduce(function(result, plugin) {
        return result || createInputBindingController(plugin, {
          document: document2,
          target,
          params
        });
      }, null);
      if (bc) {
        return bc;
      }
      throw new TpError({
        context: {
          key: target.key
        },
        type: "nomatchingcontroller"
      });
    }
    function createMonitor(document2, target, params) {
      var bc = Plugins.monitors.reduce(function(result, plugin) {
        return result || createMonitorBindingController(plugin, {
          document: document2,
          params,
          target
        });
      }, null);
      if (bc) {
        return bc;
      }
      throw new TpError({
        context: {
          key: target.key
        },
        type: "nomatchingcontroller"
      });
    }
    function createBlade(document2, params) {
      var bc = Plugins.blades.reduce(function(result, plugin) {
        return result || createBladeController(plugin, {
          document: document2,
          params
        });
      }, null);
      if (!bc) {
        throw new TpError({
          type: "nomatchingview",
          context: {
            params
          }
        });
      }
      return bc;
    }
    function createBladeApi(bc) {
      if (bc instanceof InputBindingController) {
        return new InputBindingApi(bc);
      }
      if (bc instanceof MonitorBindingController) {
        return new MonitorBindingApi(bc);
      }
      if (bc instanceof RackController) {
        return new RackApi(bc);
      }
      var api = Plugins.blades.reduce(function(result, plugin) {
        return result || plugin.api(bc);
      }, null);
      if (!api) {
        throw TpError.shouldNeverHappen();
      }
      return api;
    }
    var className$m = ClassName("lst");
    var ListView = function() {
      function ListView2(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.props_ = config.props;
        this.element = doc.createElement("div");
        this.element.classList.add(className$m());
        bindClassModifier(config.viewProps, this.element);
        var selectElem = doc.createElement("select");
        selectElem.classList.add(className$m("s"));
        bindValueMap(this.props_, "options", function(opts) {
          removeChildElements(selectElem);
          opts.forEach(function(item, index) {
            var optionElem = doc.createElement("option");
            optionElem.dataset.index = String(index);
            optionElem.textContent = item.text;
            optionElem.value = String(item.value);
            selectElem.appendChild(optionElem);
          });
        });
        bindDisabled(config.viewProps, selectElem);
        this.element.appendChild(selectElem);
        this.selectElement = selectElem;
        var markElem = doc.createElement("div");
        markElem.classList.add(className$m("m"));
        markElem.appendChild(createSvgIconElement(doc, "dropdown"));
        this.element.appendChild(markElem);
        config.value.emitter.on("change", this.onValueChange_);
        this.value_ = config.value;
        this.update_();
      }
      ListView2.prototype.update_ = function() {
        this.selectElement.value = String(this.value_.rawValue);
      };
      ListView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      return ListView2;
    }();
    var ListController = function() {
      function ListController2(doc, config) {
        this.onSelectChange_ = this.onSelectChange_.bind(this);
        this.props = config.props;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new ListView(doc, {
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        });
        this.view.selectElement.addEventListener("change", this.onSelectChange_);
      }
      ListController2.prototype.onSelectChange_ = function(e) {
        var selectElem = forceCast(e.currentTarget);
        var optElem = selectElem.selectedOptions.item(0);
        if (!optElem) {
          return;
        }
        var itemIndex = Number(optElem.dataset.index);
        this.value.rawValue = this.props.get("options")[itemIndex].value;
      };
      return ListController2;
    }();
    var ListApi = function(_super) {
      __extends(ListApi2, _super);
      function ListApi2(controller) {
        var _this = _super.call(this, controller) || this;
        _this.emitter_ = new Emitter();
        _this.controller_.valueController.value.emitter.on("change", function(ev) {
          _this.emitter_.emit("change", {
            event: new TpChangeEvent(_this, ev.rawValue)
          });
        });
        return _this;
      }
      Object.defineProperty(ListApi2.prototype, "label", {
        get: function() {
          return this.controller_.props.get("label");
        },
        set: function(label) {
          this.controller_.props.set("label", label);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ListApi2.prototype, "options", {
        get: function() {
          return this.controller_.valueController.props.get("options");
        },
        set: function(options) {
          this.controller_.valueController.props.set("options", options);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ListApi2.prototype, "value", {
        get: function() {
          return this.controller_.valueController.value.rawValue;
        },
        set: function(value) {
          this.controller_.valueController.value.rawValue = value;
        },
        enumerable: false,
        configurable: true
      });
      ListApi2.prototype.on = function(eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function(ev) {
          bh(ev.event);
        });
        return this;
      };
      return ListApi2;
    }(BladeApi);
    var ListBladePlugin = function() {
      return {
        id: "list",
        accept: function(params) {
          if (findStringParam(params, "view") !== "list") {
            return null;
          }
          var value = params["value"];
          var options = findObjectParam(params, "options");
          if (isEmpty(value) || !options) {
            return null;
          }
          return {
            params: {
              label: findStringParam(params, "label"),
              options: forceCast(options),
              value: forceCast(value),
              view: "list"
            }
          };
        },
        controller: function(args) {
          var ic = new ListController(args.document, {
            props: new ValueMap({
              options: normalizeListOptions(args.params.options)
            }),
            value: new PrimitiveValue(args.params.value),
            viewProps: args.viewProps
          });
          return new LabelController(args.document, {
            blade: args.blade,
            props: new ValueMap({
              label: args.params.label
            }),
            valueController: ic
          });
        },
        api: function(controller) {
          if (!(controller instanceof LabelController)) {
            return null;
          }
          if (!(controller.valueController instanceof ListController)) {
            return null;
          }
          return new ListApi(controller);
        }
      };
    }();
    var ButtonApi = function(_super) {
      __extends(ButtonApi2, _super);
      function ButtonApi2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(ButtonApi2.prototype, "disabled", {
        get: function() {
          return this.controller_.viewProps.get("disabled");
        },
        set: function(disabled) {
          this.controller_.viewProps.set("disabled", disabled);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ButtonApi2.prototype, "hidden", {
        get: function() {
          return this.controller_.viewProps.get("hidden");
        },
        set: function(hidden) {
          this.controller_.viewProps.set("hidden", hidden);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ButtonApi2.prototype, "label", {
        get: function() {
          return this.controller_.props.get("label");
        },
        set: function(label) {
          this.controller_.props.set("label", label);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ButtonApi2.prototype, "title", {
        get: function() {
          return this.controller_.valueController.props.get("title");
        },
        set: function(title) {
          this.controller_.valueController.props.set("title", title);
        },
        enumerable: false,
        configurable: true
      });
      ButtonApi2.prototype.on = function(eventName, handler) {
        var emitter = this.controller_.valueController.emitter;
        emitter.on(eventName, forceCast(handler.bind(this)));
        return this;
      };
      return ButtonApi2;
    }(BladeApi);
    var className$l = ClassName("btn");
    var ButtonView = function() {
      function ButtonView2(doc, config) {
        this.element = doc.createElement("div");
        this.element.classList.add(className$l());
        bindClassModifier(config.viewProps, this.element);
        var buttonElem = doc.createElement("button");
        buttonElem.classList.add(className$l("b"));
        bindDisabled(config.viewProps, buttonElem);
        bindTextContent(config.props, "title", buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
      }
      return ButtonView2;
    }();
    var ButtonController = function() {
      function ButtonController2(doc, config) {
        this.emitter = new Emitter();
        this.onClick_ = this.onClick_.bind(this);
        this.props = config.props;
        this.viewProps = config.viewProps;
        this.view = new ButtonView(doc, {
          props: this.props,
          viewProps: this.viewProps
        });
        this.view.buttonElement.addEventListener("click", this.onClick_);
      }
      ButtonController2.prototype.onClick_ = function() {
        this.emitter.emit("click", {
          sender: this
        });
      };
      return ButtonController2;
    }();
    var ButtonBladePlugin = {
      id: "button",
      accept: function(params) {
        if (findStringParam(params, "view") !== "button") {
          return null;
        }
        var title = findStringParam(params, "title");
        if (title === void 0) {
          return null;
        }
        return {
          params: {
            label: findStringParam(params, "label"),
            title,
            view: "button"
          }
        };
      },
      controller: function(args) {
        return new LabelController(args.document, {
          blade: args.blade,
          props: new ValueMap({
            label: args.params.label
          }),
          valueController: new ButtonController(args.document, {
            props: new ValueMap({
              title: args.params.title
            }),
            viewProps: args.viewProps
          })
        });
      },
      api: function(controller) {
        if (!(controller instanceof LabelController)) {
          return null;
        }
        if (!(controller.valueController instanceof ButtonController)) {
          return null;
        }
        return new ButtonApi(controller);
      }
    };
    var FolderApi = function(_super) {
      __extends(FolderApi2, _super);
      function FolderApi2(controller) {
        var _this = _super.call(this, controller, new RackApi(controller.rackController)) || this;
        _this.onFolderChange_ = _this.onFolderChange_.bind(_this);
        _this.emitter_ = new Emitter();
        _this.controller_.folder.emitter.on("change", _this.onFolderChange_);
        _this.rackApi_.on("change", function(ev) {
          _this.emitter_.emit("change", {
            event: ev
          });
        });
        _this.rackApi_.on("update", function(ev) {
          _this.emitter_.emit("update", {
            event: ev
          });
        });
        return _this;
      }
      Object.defineProperty(FolderApi2.prototype, "expanded", {
        get: function() {
          return this.controller_.folder.expanded;
        },
        set: function(expanded) {
          this.controller_.folder.expanded = expanded;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FolderApi2.prototype, "title", {
        get: function() {
          return this.controller_.props.get("title");
        },
        set: function(title) {
          this.controller_.props.set("title", title);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FolderApi2.prototype, "children", {
        get: function() {
          return this.rackApi_.children;
        },
        enumerable: false,
        configurable: true
      });
      FolderApi2.prototype.addInput = function(object, key, opt_params) {
        return this.rackApi_.addInput(object, key, opt_params);
      };
      FolderApi2.prototype.addMonitor = function(object, key, opt_params) {
        return this.rackApi_.addMonitor(object, key, opt_params);
      };
      FolderApi2.prototype.addFolder = function(params) {
        return this.rackApi_.addFolder(params);
      };
      FolderApi2.prototype.addButton = function(params) {
        return this.rackApi_.addButton(params);
      };
      FolderApi2.prototype.addSeparator = function(opt_params) {
        return this.rackApi_.addSeparator(opt_params);
      };
      FolderApi2.prototype.addTab = function(params) {
        return this.rackApi_.addTab(params);
      };
      FolderApi2.prototype.add = function(api, opt_index) {
        return this.rackApi_.add(api, opt_index);
      };
      FolderApi2.prototype.remove = function(api) {
        this.rackApi_.remove(api);
      };
      FolderApi2.prototype.addBlade_v3_ = function(opt_params) {
        return this.rackApi_.addBlade_v3_(opt_params);
      };
      FolderApi2.prototype.on = function(eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function(ev) {
          bh(ev.event);
        });
        return this;
      };
      FolderApi2.prototype.onFolderChange_ = function(ev) {
        if (ev.propertyName !== "expanded") {
          return;
        }
        this.emitter_.emit("fold", {
          event: new TpFoldEvent(this, ev.sender.expanded)
        });
      };
      return FolderApi2;
    }(RackLikeApi);
    var Folder = function() {
      function Folder2(expanded) {
        this.emitter = new Emitter();
        this.expanded_ = expanded;
        this.expandedHeight_ = null;
        this.temporaryExpanded_ = null;
        this.shouldFixHeight_ = false;
      }
      Object.defineProperty(Folder2.prototype, "expanded", {
        get: function() {
          return this.expanded_;
        },
        set: function(expanded) {
          var changed = this.expanded_ !== expanded;
          if (!changed) {
            return;
          }
          this.emitter.emit("beforechange", {
            propertyName: "expanded",
            sender: this
          });
          this.expanded_ = expanded;
          this.emitter.emit("change", {
            propertyName: "expanded",
            sender: this
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Folder2.prototype, "temporaryExpanded", {
        get: function() {
          return this.temporaryExpanded_;
        },
        set: function(expanded) {
          var changed = this.temporaryExpanded_ !== expanded;
          if (!changed) {
            return;
          }
          this.emitter.emit("beforechange", {
            propertyName: "temporaryExpanded",
            sender: this
          });
          this.temporaryExpanded_ = expanded;
          this.emitter.emit("change", {
            propertyName: "temporaryExpanded",
            sender: this
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Folder2.prototype, "expandedHeight", {
        get: function() {
          return this.expandedHeight_;
        },
        set: function(expandedHeight) {
          var changed = this.expandedHeight_ !== expandedHeight;
          if (!changed) {
            return;
          }
          this.emitter.emit("beforechange", {
            propertyName: "expandedHeight",
            sender: this
          });
          this.expandedHeight_ = expandedHeight;
          this.emitter.emit("change", {
            propertyName: "expandedHeight",
            sender: this
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Folder2.prototype, "shouldFixHeight", {
        get: function() {
          return this.shouldFixHeight_;
        },
        set: function(shouldFixHeight) {
          var changed = this.shouldFixHeight_ !== shouldFixHeight;
          if (!changed) {
            return;
          }
          this.emitter.emit("beforechange", {
            propertyName: "shouldFixHeight",
            sender: this
          });
          this.shouldFixHeight_ = shouldFixHeight;
          this.emitter.emit("change", {
            propertyName: "shouldFixHeight",
            sender: this
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Folder2.prototype, "styleExpanded", {
        get: function() {
          var _a2;
          return (_a2 = this.temporaryExpanded) !== null && _a2 !== void 0 ? _a2 : this.expanded;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Folder2.prototype, "styleHeight", {
        get: function() {
          if (!this.styleExpanded) {
            return "0";
          }
          if (this.shouldFixHeight && !isEmpty(this.expandedHeight)) {
            return this.expandedHeight + "px";
          }
          return "auto";
        },
        enumerable: false,
        configurable: true
      });
      return Folder2;
    }();
    var bladeContainerClassName = ClassName("cnt");
    var FolderView = function() {
      function FolderView2(doc, config) {
        var _this = this;
        this.onFolderChange_ = this.onFolderChange_.bind(this);
        this.folder_ = config.folder;
        this.folder_.emitter.on("change", this.onFolderChange_);
        this.className_ = ClassName(config.viewName || "fld");
        this.element = doc.createElement("div");
        this.element.classList.add(this.className_(), bladeContainerClassName());
        bindClassModifier(config.viewProps, this.element);
        var buttonElem = doc.createElement("button");
        buttonElem.classList.add(this.className_("b"));
        bindValueMap(config.props, "title", function(title) {
          if (isEmpty(title)) {
            _this.element.classList.add(_this.className_(void 0, "not"));
          } else {
            _this.element.classList.remove(_this.className_(void 0, "not"));
          }
        });
        bindDisabled(config.viewProps, buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var titleElem = doc.createElement("div");
        titleElem.classList.add(this.className_("t"));
        bindTextContent(config.props, "title", titleElem);
        this.buttonElement.appendChild(titleElem);
        this.titleElement = titleElem;
        var markElem = doc.createElement("div");
        markElem.classList.add(this.className_("m"));
        this.buttonElement.appendChild(markElem);
        var containerElem = config.containerElement;
        containerElem.classList.add(this.className_("c"));
        this.element.appendChild(containerElem);
        this.containerElement = containerElem;
        this.applyModel_();
      }
      FolderView2.prototype.applyModel_ = function() {
        var expanded = this.folder_.styleExpanded;
        var expandedClass = this.className_(void 0, "expanded");
        if (expanded) {
          this.element.classList.add(expandedClass);
        } else {
          this.element.classList.remove(expandedClass);
        }
        this.containerElement.style.height = this.folder_.styleHeight;
      };
      FolderView2.prototype.onFolderChange_ = function() {
        this.applyModel_();
      };
      return FolderView2;
    }();
    function computeExpandedFolderHeight(folder, containerElement) {
      var height = 0;
      disableTransitionTemporarily(containerElement, function() {
        folder.expandedHeight = null;
        folder.temporaryExpanded = true;
        forceReflow(containerElement);
        height = containerElement.clientHeight;
        folder.temporaryExpanded = null;
        forceReflow(containerElement);
      });
      return height;
    }
    var FolderController = function(_super) {
      __extends(FolderController2, _super);
      function FolderController2(doc, config) {
        var _a2;
        var _this = this;
        var folder = new Folder((_a2 = config.expanded) !== null && _a2 !== void 0 ? _a2 : true);
        var rc = new RackController(doc, {
          blade: config.blade,
          root: config.root,
          viewProps: config.viewProps
        });
        _this = _super.call(this, __assign(__assign({}, config), {rackController: rc, view: new FolderView(doc, {
          containerElement: rc.view.element,
          folder,
          props: config.props,
          viewName: config.root ? "rot" : void 0,
          viewProps: config.viewProps
        })})) || this;
        _this.onContainerTransitionEnd_ = _this.onContainerTransitionEnd_.bind(_this);
        _this.onFolderBeforeChange_ = _this.onFolderBeforeChange_.bind(_this);
        _this.onTitleClick_ = _this.onTitleClick_.bind(_this);
        _this.props = config.props;
        _this.folder = folder;
        _this.folder.emitter.on("beforechange", _this.onFolderBeforeChange_);
        _this.view.buttonElement.addEventListener("click", _this.onTitleClick_);
        _this.view.containerElement.addEventListener("transitionend", _this.onContainerTransitionEnd_);
        return _this;
      }
      Object.defineProperty(FolderController2.prototype, "document", {
        get: function() {
          return this.view.element.ownerDocument;
        },
        enumerable: false,
        configurable: true
      });
      FolderController2.prototype.onFolderBeforeChange_ = function(ev) {
        if (ev.propertyName !== "expanded") {
          return;
        }
        if (isEmpty(this.folder.expandedHeight)) {
          this.folder.expandedHeight = computeExpandedFolderHeight(this.folder, this.view.containerElement);
        }
        this.folder.shouldFixHeight = true;
        forceReflow(this.view.containerElement);
      };
      FolderController2.prototype.onTitleClick_ = function() {
        this.folder.expanded = !this.folder.expanded;
      };
      FolderController2.prototype.onContainerTransitionEnd_ = function(ev) {
        if (ev.propertyName !== "height") {
          return;
        }
        this.folder.shouldFixHeight = false;
        this.folder.expandedHeight = null;
      };
      return FolderController2;
    }(RackLikeController);
    var FolderBladePlugin = {
      id: "button",
      accept: function(params) {
        var title = findStringParam(params, "title");
        if (title === void 0 || findStringParam(params, "view") !== "folder") {
          return null;
        }
        return {
          params: {
            expanded: findBooleanParam(params, "expanded"),
            title,
            view: "folder"
          }
        };
      },
      controller: function(args) {
        return new FolderController(args.document, {
          blade: args.blade,
          expanded: args.params.expanded,
          props: new ValueMap({
            title: args.params.title
          }),
          viewProps: args.viewProps
        });
      },
      api: function(controller) {
        if (!(controller instanceof FolderController)) {
          return null;
        }
        return new FolderApi(controller);
      }
    };
    var SeparatorApi = function(_super) {
      __extends(SeparatorApi2, _super);
      function SeparatorApi2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return SeparatorApi2;
    }(BladeApi);
    var className$k = ClassName("spr");
    var SeparatorView = function() {
      function SeparatorView2(doc, config) {
        this.element = doc.createElement("div");
        this.element.classList.add(className$k());
        bindClassModifier(config.viewProps, this.element);
        var hrElem = doc.createElement("hr");
        hrElem.classList.add(className$k("r"));
        this.element.appendChild(hrElem);
      }
      return SeparatorView2;
    }();
    var SeparatorController = function(_super) {
      __extends(SeparatorController2, _super);
      function SeparatorController2(doc, config) {
        return _super.call(this, __assign(__assign({}, config), {view: new SeparatorView(doc, {
          viewProps: config.viewProps
        })})) || this;
      }
      return SeparatorController2;
    }(BladeController);
    var SeparatorBladePlugin = {
      id: "separator",
      accept: function(params) {
        if (findStringParam(params, "view") !== "separator") {
          return null;
        }
        return {
          params: {
            view: "separator"
          }
        };
      },
      controller: function(args) {
        return new SeparatorController(args.document, {
          blade: args.blade,
          viewProps: args.viewProps
        });
      },
      api: function(controller) {
        if (!(controller instanceof SeparatorController)) {
          return null;
        }
        return new SeparatorApi(controller);
      }
    };
    function exportPresetJson(targets) {
      return targets.reduce(function(result, target) {
        var _a2;
        return Object.assign(result, (_a2 = {}, _a2[target.presetKey] = target.read(), _a2));
      }, {});
    }
    function importPresetJson(targets, preset) {
      targets.forEach(function(target) {
        var value = preset[target.presetKey];
        if (value !== void 0) {
          target.write(value);
        }
      });
    }
    var RootApi = function(_super) {
      __extends(RootApi2, _super);
      function RootApi2(controller) {
        return _super.call(this, controller) || this;
      }
      RootApi2.registerPlugin = function(r) {
        registerPlugin(r);
      };
      Object.defineProperty(RootApi2.prototype, "element", {
        get: function() {
          return this.controller_.view.element;
        },
        enumerable: false,
        configurable: true
      });
      RootApi2.prototype.importPreset = function(preset) {
        var targets = this.controller_.rackController.rack.find(InputBindingController).map(function(ibc) {
          return ibc.binding.target;
        });
        importPresetJson(targets, preset);
        this.refresh();
      };
      RootApi2.prototype.exportPreset = function() {
        var targets = this.controller_.rackController.rack.find(InputBindingController).map(function(ibc) {
          return ibc.binding.target;
        });
        return exportPresetJson(targets);
      };
      RootApi2.prototype.refresh = function() {
        this.controller_.rackController.rack.find(InputBindingController).forEach(function(ibc) {
          ibc.binding.read();
        });
        this.controller_.rackController.rack.find(MonitorBindingController).forEach(function(mbc) {
          mbc.binding.read();
        });
      };
      return RootApi2;
    }(FolderApi);
    function registerDefaultPlugins$1() {
      [ButtonBladePlugin, FolderBladePlugin, SeparatorBladePlugin].forEach(function(p) {
        registerPlugin({
          type: "blade",
          plugin: p
        });
      });
    }
    registerDefaultPlugins$1();
    var RootController = function(_super) {
      __extends(RootController2, _super);
      function RootController2(doc, config) {
        return _super.call(this, doc, {
          expanded: config.expanded,
          blade: config.blade,
          props: config.props,
          root: true,
          viewProps: config.viewProps
        }) || this;
      }
      return RootController2;
    }(FolderController);
    var NumberLiteralNode = function() {
      function NumberLiteralNode2(text) {
        this.text = text;
      }
      NumberLiteralNode2.prototype.evaluate = function() {
        return Number(this.text);
      };
      NumberLiteralNode2.prototype.toString = function() {
        return this.text;
      };
      return NumberLiteralNode2;
    }();
    var BINARY_OPERATION_MAP = {
      "**": function(v1, v2) {
        return Math.pow(v1, v2);
      },
      "*": function(v1, v2) {
        return v1 * v2;
      },
      "/": function(v1, v2) {
        return v1 / v2;
      },
      "%": function(v1, v2) {
        return v1 % v2;
      },
      "+": function(v1, v2) {
        return v1 + v2;
      },
      "-": function(v1, v2) {
        return v1 - v2;
      },
      "<<": function(v1, v2) {
        return v1 << v2;
      },
      ">>": function(v1, v2) {
        return v1 >> v2;
      },
      ">>>": function(v1, v2) {
        return v1 >>> v2;
      },
      "&": function(v1, v2) {
        return v1 & v2;
      },
      "^": function(v1, v2) {
        return v1 ^ v2;
      },
      "|": function(v1, v2) {
        return v1 | v2;
      }
    };
    var BinaryOperationNode = function() {
      function BinaryOperationNode2(operator, left, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
      }
      BinaryOperationNode2.prototype.evaluate = function() {
        var op = BINARY_OPERATION_MAP[this.operator];
        if (!op) {
          throw new Error("unexpected binary operator: '" + this.operator);
        }
        return op(this.left.evaluate(), this.right.evaluate());
      };
      BinaryOperationNode2.prototype.toString = function() {
        return [
          "b(",
          this.left.toString(),
          this.operator,
          this.right.toString(),
          ")"
        ].join(" ");
      };
      return BinaryOperationNode2;
    }();
    var UNARY_OPERATION_MAP = {
      "+": function(v) {
        return v;
      },
      "-": function(v) {
        return -v;
      },
      "~": function(v) {
        return ~v;
      }
    };
    var UnaryOperationNode = function() {
      function UnaryOperationNode2(operator, expr) {
        this.operator = operator;
        this.expression = expr;
      }
      UnaryOperationNode2.prototype.evaluate = function() {
        var op = UNARY_OPERATION_MAP[this.operator];
        if (!op) {
          throw new Error("unexpected unary operator: '" + this.operator);
        }
        return op(this.expression.evaluate());
      };
      UnaryOperationNode2.prototype.toString = function() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
      };
      return UnaryOperationNode2;
    }();
    function combineReader(parsers) {
      return function(text, cursor) {
        for (var i = 0; i < parsers.length; i++) {
          var result = parsers[i](text, cursor);
          if (result !== "") {
            return result;
          }
        }
        return "";
      };
    }
    function readWhitespace(text, cursor) {
      var _a2;
      var m = text.substr(cursor).match(/^\s+/);
      return (_a2 = m && m[0]) !== null && _a2 !== void 0 ? _a2 : "";
    }
    function readNonZeroDigit(text, cursor) {
      var ch = text.substr(cursor, 1);
      return ch.match(/^[1-9]$/) ? ch : "";
    }
    function readDecimalDigits(text, cursor) {
      var _a2;
      var m = text.substr(cursor).match(/^[0-9]+/);
      return (_a2 = m && m[0]) !== null && _a2 !== void 0 ? _a2 : "";
    }
    function readSignedInteger(text, cursor) {
      var ds = readDecimalDigits(text, cursor);
      if (ds !== "") {
        return ds;
      }
      var sign = text.substr(cursor, 1);
      cursor += 1;
      if (sign !== "-" && sign !== "+") {
        return "";
      }
      var sds = readDecimalDigits(text, cursor);
      if (sds === "") {
        return "";
      }
      return sign + sds;
    }
    function readExponentPart(text, cursor) {
      var e = text.substr(cursor, 1);
      cursor += 1;
      if (e.toLowerCase() !== "e") {
        return "";
      }
      var si = readSignedInteger(text, cursor);
      if (si === "") {
        return "";
      }
      return e + si;
    }
    function readDecimalIntegerLiteral(text, cursor) {
      var ch = text.substr(cursor, 1);
      if (ch === "0") {
        return ch;
      }
      var nzd = readNonZeroDigit(text, cursor);
      cursor += nzd.length;
      if (nzd === "") {
        return "";
      }
      return nzd + readDecimalDigits(text, cursor);
    }
    function readDecimalLiteral1(text, cursor) {
      var dil = readDecimalIntegerLiteral(text, cursor);
      cursor += dil.length;
      if (dil === "") {
        return "";
      }
      var dot5 = text.substr(cursor, 1);
      cursor += dot5.length;
      if (dot5 !== ".") {
        return "";
      }
      var dds = readDecimalDigits(text, cursor);
      cursor += dds.length;
      return dil + dot5 + dds + readExponentPart(text, cursor);
    }
    function readDecimalLiteral2(text, cursor) {
      var dot5 = text.substr(cursor, 1);
      cursor += dot5.length;
      if (dot5 !== ".") {
        return "";
      }
      var dds = readDecimalDigits(text, cursor);
      cursor += dds.length;
      if (dds === "") {
        return "";
      }
      return dot5 + dds + readExponentPart(text, cursor);
    }
    function readDecimalLiteral3(text, cursor) {
      var dil = readDecimalIntegerLiteral(text, cursor);
      cursor += dil.length;
      if (dil === "") {
        return "";
      }
      return dil + readExponentPart(text, cursor);
    }
    var readDecimalLiteral = combineReader([
      readDecimalLiteral1,
      readDecimalLiteral2,
      readDecimalLiteral3
    ]);
    function parseBinaryDigits(text, cursor) {
      var _a2;
      var m = text.substr(cursor).match(/^[01]+/);
      return (_a2 = m && m[0]) !== null && _a2 !== void 0 ? _a2 : "";
    }
    function readBinaryIntegerLiteral(text, cursor) {
      var prefix = text.substr(cursor, 2);
      cursor += prefix.length;
      if (prefix.toLowerCase() !== "0b") {
        return "";
      }
      var bds = parseBinaryDigits(text, cursor);
      if (bds === "") {
        return "";
      }
      return prefix + bds;
    }
    function readOctalDigits(text, cursor) {
      var _a2;
      var m = text.substr(cursor).match(/^[0-7]+/);
      return (_a2 = m && m[0]) !== null && _a2 !== void 0 ? _a2 : "";
    }
    function readOctalIntegerLiteral(text, cursor) {
      var prefix = text.substr(cursor, 2);
      cursor += prefix.length;
      if (prefix.toLowerCase() !== "0o") {
        return "";
      }
      var ods = readOctalDigits(text, cursor);
      if (ods === "") {
        return "";
      }
      return prefix + ods;
    }
    function readHexDigits(text, cursor) {
      var _a2;
      var m = text.substr(cursor).match(/^[0-9a-f]+/i);
      return (_a2 = m && m[0]) !== null && _a2 !== void 0 ? _a2 : "";
    }
    function readHexIntegerLiteral(text, cursor) {
      var prefix = text.substr(cursor, 2);
      cursor += prefix.length;
      if (prefix.toLowerCase() !== "0x") {
        return "";
      }
      var hds = readHexDigits(text, cursor);
      if (hds === "") {
        return "";
      }
      return prefix + hds;
    }
    var readNonDecimalIntegerLiteral = combineReader([
      readBinaryIntegerLiteral,
      readOctalIntegerLiteral,
      readHexIntegerLiteral
    ]);
    var readNumericLiteral = combineReader([
      readNonDecimalIntegerLiteral,
      readDecimalLiteral
    ]);
    function parseLiteral(text, cursor) {
      var num = readNumericLiteral(text, cursor);
      cursor += num.length;
      if (num === "") {
        return null;
      }
      return {
        evaluable: new NumberLiteralNode(num),
        cursor
      };
    }
    function parseParenthesizedExpression(text, cursor) {
      var op = text.substr(cursor, 1);
      cursor += op.length;
      if (op !== "(") {
        return null;
      }
      var expr = parseExpression(text, cursor);
      if (!expr) {
        return null;
      }
      cursor = expr.cursor;
      cursor += readWhitespace(text, cursor).length;
      var cl = text.substr(cursor, 1);
      cursor += cl.length;
      if (cl !== ")") {
        return null;
      }
      return {
        evaluable: expr.evaluable,
        cursor
      };
    }
    function parsePrimaryExpression(text, cursor) {
      return parseLiteral(text, cursor) || parseParenthesizedExpression(text, cursor);
    }
    function parseUnaryExpression(text, cursor) {
      var expr = parsePrimaryExpression(text, cursor);
      if (expr) {
        return expr;
      }
      var op = text.substr(cursor, 1);
      cursor += op.length;
      if (op !== "+" && op !== "-" && op !== "~") {
        return null;
      }
      var num = parseUnaryExpression(text, cursor);
      if (!num) {
        return null;
      }
      cursor = num.cursor;
      return {
        cursor,
        evaluable: new UnaryOperationNode(op, num.evaluable)
      };
    }
    function readBinaryOperator(ops, text, cursor) {
      cursor += readWhitespace(text, cursor).length;
      var op = ops.filter(function(op2) {
        return text.startsWith(op2, cursor);
      })[0];
      if (!op) {
        return null;
      }
      cursor += op.length;
      cursor += readWhitespace(text, cursor).length;
      return {
        cursor,
        operator: op
      };
    }
    function createBinaryOperationExpressionParser(exprParser, ops) {
      return function(text, cursor) {
        var firstExpr = exprParser(text, cursor);
        if (!firstExpr) {
          return null;
        }
        cursor = firstExpr.cursor;
        var expr = firstExpr.evaluable;
        for (; ; ) {
          var op = readBinaryOperator(ops, text, cursor);
          if (!op) {
            break;
          }
          cursor = op.cursor;
          var nextExpr = exprParser(text, cursor);
          if (!nextExpr) {
            return null;
          }
          cursor = nextExpr.cursor;
          expr = new BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
        }
        return expr ? {
          cursor,
          evaluable: expr
        } : null;
      };
    }
    var parseBinaryOperationExpression = [
      ["**"],
      ["*", "/", "%"],
      ["+", "-"],
      ["<<", ">>>", ">>"],
      ["&"],
      ["^"],
      ["|"]
    ].reduce(function(parser, ops) {
      return createBinaryOperationExpressionParser(parser, ops);
    }, parseUnaryExpression);
    function parseExpression(text, cursor) {
      cursor += readWhitespace(text, cursor).length;
      return parseBinaryOperationExpression(text, cursor);
    }
    function parseEcmaNumberExpression(text) {
      var expr = parseExpression(text, 0);
      if (!expr) {
        return null;
      }
      var cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
      if (cursor !== text.length) {
        return null;
      }
      return expr.evaluable;
    }
    function parseNumber(text) {
      var _a2;
      var r = parseEcmaNumberExpression(text);
      return (_a2 = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a2 !== void 0 ? _a2 : null;
    }
    function numberFromUnknown(value) {
      if (typeof value === "number") {
        return value;
      }
      if (typeof value === "string") {
        var pv = parseNumber(value);
        if (!isEmpty(pv)) {
          return pv;
        }
      }
      return 0;
    }
    function numberToString(value) {
      return String(value);
    }
    function createNumberFormatter(digits) {
      return function(value) {
        return value.toFixed(Math.max(Math.min(digits, 20), 0));
      };
    }
    var className$j = ClassName("sldtxt");
    var SliderTextView = function() {
      function SliderTextView2(doc, config) {
        this.element = doc.createElement("div");
        this.element.classList.add(className$j());
        var sliderElem = doc.createElement("div");
        sliderElem.classList.add(className$j("s"));
        this.sliderView_ = config.sliderView;
        sliderElem.appendChild(this.sliderView_.element);
        this.element.appendChild(sliderElem);
        var textElem = doc.createElement("div");
        textElem.classList.add(className$j("t"));
        this.textView_ = config.textView;
        textElem.appendChild(this.textView_.element);
        this.element.appendChild(textElem);
      }
      return SliderTextView2;
    }();
    function getStepForKey(baseStep, keys) {
      var step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
      if (keys.upKey) {
        return +step;
      } else if (keys.downKey) {
        return -step;
      }
      return 0;
    }
    function getVerticalStepKeys(ev) {
      return {
        altKey: ev.altKey,
        downKey: ev.key === "ArrowDown",
        shiftKey: ev.shiftKey,
        upKey: ev.key === "ArrowUp"
      };
    }
    function getHorizontalStepKeys(ev) {
      return {
        altKey: ev.altKey,
        downKey: ev.key === "ArrowLeft",
        shiftKey: ev.shiftKey,
        upKey: ev.key === "ArrowRight"
      };
    }
    function isVerticalArrowKey(key) {
      return key === "ArrowUp" || key === "ArrowDown";
    }
    function isArrowKey(key) {
      return isVerticalArrowKey(key) || key === "ArrowLeft" || key === "ArrowRight";
    }
    function computeOffset(ev, elem) {
      var win = elem.ownerDocument.defaultView;
      var rect = elem.getBoundingClientRect();
      return {
        x: ev.pageX - ((win && win.scrollX || 0) + rect.left),
        y: ev.pageY - ((win && win.scrollY || 0) + rect.top)
      };
    }
    var PointerHandler = function() {
      function PointerHandler2(element) {
        this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
        this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
        this.onMouseDown_ = this.onMouseDown_.bind(this);
        this.onTouchEnd_ = this.onTouchEnd_.bind(this);
        this.onTouchMove_ = this.onTouchMove_.bind(this);
        this.onTouchStart_ = this.onTouchStart_.bind(this);
        this.elem_ = element;
        this.emitter = new Emitter();
        var doc = this.elem_.ownerDocument;
        if (supportsTouch(doc)) {
          element.addEventListener("touchstart", this.onTouchStart_);
          element.addEventListener("touchmove", this.onTouchMove_);
          element.addEventListener("touchend", this.onTouchEnd_);
        } else {
          element.addEventListener("mousedown", this.onMouseDown_);
        }
      }
      PointerHandler2.prototype.computePosition_ = function(offset) {
        var rect = this.elem_.getBoundingClientRect();
        return {
          bounds: {
            width: rect.width,
            height: rect.height
          },
          point: offset ? {
            x: offset.x,
            y: offset.y
          } : null
        };
      };
      PointerHandler2.prototype.onMouseDown_ = function(e) {
        var _a2;
        e.preventDefault();
        (_a2 = e.currentTarget) === null || _a2 === void 0 ? void 0 : _a2.focus();
        var doc = this.elem_.ownerDocument;
        doc.addEventListener("mousemove", this.onDocumentMouseMove_);
        doc.addEventListener("mouseup", this.onDocumentMouseUp_);
        this.emitter.emit("down", {
          data: this.computePosition_(computeOffset(e, this.elem_)),
          sender: this
        });
      };
      PointerHandler2.prototype.onDocumentMouseMove_ = function(e) {
        this.emitter.emit("move", {
          data: this.computePosition_(computeOffset(e, this.elem_)),
          sender: this
        });
      };
      PointerHandler2.prototype.onDocumentMouseUp_ = function(e) {
        var doc = this.elem_.ownerDocument;
        doc.removeEventListener("mousemove", this.onDocumentMouseMove_);
        doc.removeEventListener("mouseup", this.onDocumentMouseUp_);
        this.emitter.emit("up", {
          data: this.computePosition_(computeOffset(e, this.elem_)),
          sender: this
        });
      };
      PointerHandler2.prototype.onTouchStart_ = function(e) {
        e.preventDefault();
        var touch = e.targetTouches.item(0);
        var rect = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
          data: this.computePosition_(touch ? {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          } : void 0),
          sender: this
        });
      };
      PointerHandler2.prototype.onTouchMove_ = function(e) {
        var touch = e.targetTouches.item(0);
        var rect = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
          data: this.computePosition_(touch ? {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          } : void 0),
          sender: this
        });
      };
      PointerHandler2.prototype.onTouchEnd_ = function(e) {
        var touch = e.targetTouches.item(0);
        var rect = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
          data: this.computePosition_(touch ? {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          } : void 0),
          sender: this
        });
      };
      return PointerHandler2;
    }();
    var className$i = ClassName("txt");
    var NumberTextView = function() {
      function NumberTextView2(doc, config) {
        this.onChange_ = this.onChange_.bind(this);
        this.props_ = config.props;
        this.props_.emitter.on("change", this.onChange_);
        this.element = doc.createElement("div");
        this.element.classList.add(className$i(), className$i(void 0, "num"));
        if (config.arrayPosition) {
          this.element.classList.add(className$i(void 0, config.arrayPosition));
        }
        bindClassModifier(config.viewProps, this.element);
        var inputElem = doc.createElement("input");
        inputElem.classList.add(className$i("i"));
        inputElem.type = "text";
        bindDisabled(config.viewProps, inputElem);
        this.element.appendChild(inputElem);
        this.inputElement = inputElem;
        this.onDraggingChange_ = this.onDraggingChange_.bind(this);
        this.dragging_ = config.dragging;
        this.dragging_.emitter.on("change", this.onDraggingChange_);
        this.element.classList.add(className$i());
        this.inputElement.classList.add(className$i("i"));
        var knobElem = doc.createElement("div");
        knobElem.classList.add(className$i("k"));
        this.element.appendChild(knobElem);
        this.knobElement = knobElem;
        var guideElem = doc.createElementNS(SVG_NS, "svg");
        guideElem.classList.add(className$i("g"));
        this.knobElement.appendChild(guideElem);
        var bodyElem = doc.createElementNS(SVG_NS, "path");
        bodyElem.classList.add(className$i("gb"));
        guideElem.appendChild(bodyElem);
        this.guideBodyElem_ = bodyElem;
        var headElem = doc.createElementNS(SVG_NS, "path");
        headElem.classList.add(className$i("gh"));
        guideElem.appendChild(headElem);
        this.guideHeadElem_ = headElem;
        var tooltipElem = doc.createElement("div");
        tooltipElem.classList.add(ClassName("tt")());
        this.knobElement.appendChild(tooltipElem);
        this.tooltipElem_ = tooltipElem;
        config.value.emitter.on("change", this.onChange_);
        this.value = config.value;
        this.refresh();
      }
      NumberTextView2.prototype.onDraggingChange_ = function(ev) {
        if (ev.rawValue === null) {
          this.element.classList.remove(className$i(void 0, "drg"));
          return;
        }
        this.element.classList.add(className$i(void 0, "drg"));
        var x = ev.rawValue / this.props_.get("draggingScale");
        var aox = x + (x > 0 ? -1 : x < 0 ? 1 : 0);
        var adx = constrainRange(-aox, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", ["M " + (aox + adx) + ",0 L" + aox + ",4 L" + (aox + adx) + ",8", "M " + x + ",-1 L" + x + ",9"].join(" "));
        this.guideBodyElem_.setAttributeNS(null, "d", "M 0,4 L" + x + ",4");
        var formatter = this.props_.get("formatter");
        this.tooltipElem_.textContent = formatter(this.value.rawValue);
        this.tooltipElem_.style.left = x + "px";
      };
      NumberTextView2.prototype.refresh = function() {
        var formatter = this.props_.get("formatter");
        this.inputElement.value = formatter(this.value.rawValue);
      };
      NumberTextView2.prototype.onChange_ = function() {
        this.refresh();
      };
      return NumberTextView2;
    }();
    var NumberTextController = function() {
      function NumberTextController2(doc, config) {
        this.originRawValue_ = 0;
        this.onInputChange_ = this.onInputChange_.bind(this);
        this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.baseStep_ = config.baseStep;
        this.parser_ = config.parser;
        this.props = config.props;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.dragging_ = new BoundValue(null);
        this.view = new NumberTextView(doc, {
          arrayPosition: config.arrayPosition,
          dragging: this.dragging_,
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        });
        this.view.inputElement.addEventListener("change", this.onInputChange_);
        this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_);
        var ph = new PointerHandler(this.view.knobElement);
        ph.emitter.on("down", this.onPointerDown_);
        ph.emitter.on("move", this.onPointerMove_);
        ph.emitter.on("up", this.onPointerUp_);
      }
      NumberTextController2.prototype.onInputChange_ = function(e) {
        var inputElem = forceCast(e.currentTarget);
        var value = inputElem.value;
        var parsedValue = this.parser_(value);
        if (!isEmpty(parsedValue)) {
          this.value.rawValue = parsedValue;
        }
        this.view.refresh();
      };
      NumberTextController2.prototype.onInputKeyDown_ = function(e) {
        var step = getStepForKey(this.baseStep_, getVerticalStepKeys(e));
        if (step !== 0) {
          this.value.rawValue += step;
        }
      };
      NumberTextController2.prototype.onPointerDown_ = function() {
        this.originRawValue_ = this.value.rawValue;
        this.dragging_.rawValue = 0;
      };
      NumberTextController2.prototype.onPointerMove_ = function(ev) {
        if (!ev.data.point) {
          return;
        }
        var dx = ev.data.point.x - ev.data.bounds.width / 2;
        this.value.rawValue = this.originRawValue_ + dx * this.props.get("draggingScale");
        this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
      };
      NumberTextController2.prototype.onPointerUp_ = function() {
        this.dragging_.rawValue = null;
      };
      return NumberTextController2;
    }();
    var className$h = ClassName("sld");
    var SliderView = function() {
      function SliderView2(doc, config) {
        this.onChange_ = this.onChange_.bind(this);
        this.props_ = config.props;
        this.props_.emitter.on("change", this.onChange_);
        this.element = doc.createElement("div");
        this.element.classList.add(className$h());
        bindClassModifier(config.viewProps, this.element);
        var trackElem = doc.createElement("div");
        trackElem.classList.add(className$h("t"));
        bindTabIndex(config.viewProps, trackElem);
        this.element.appendChild(trackElem);
        this.trackElement = trackElem;
        var knobElem = doc.createElement("div");
        knobElem.classList.add(className$h("k"));
        this.trackElement.appendChild(knobElem);
        this.knobElement = knobElem;
        config.value.emitter.on("change", this.onChange_);
        this.value = config.value;
        this.update_();
      }
      SliderView2.prototype.update_ = function() {
        var p = constrainRange(mapRange(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
        this.knobElement.style.width = p + "%";
      };
      SliderView2.prototype.onChange_ = function() {
        this.update_();
      };
      return SliderView2;
    }();
    var SliderController = function() {
      function SliderController2(doc, config) {
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onPoint_ = this.onPoint_.bind(this);
        this.baseStep_ = config.baseStep;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.props = config.props;
        this.view = new SliderView(doc, {
          props: this.props,
          value: this.value,
          viewProps: this.viewProps
        });
        this.ptHandler_ = new PointerHandler(this.view.trackElement);
        this.ptHandler_.emitter.on("down", this.onPoint_);
        this.ptHandler_.emitter.on("move", this.onPoint_);
        this.ptHandler_.emitter.on("up", this.onPoint_);
        this.view.trackElement.addEventListener("keydown", this.onKeyDown_);
      }
      SliderController2.prototype.handlePointerEvent_ = function(d) {
        if (!d.point) {
          return;
        }
        this.value.rawValue = mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get("minValue"), this.props.get("maxValue"));
      };
      SliderController2.prototype.onPoint_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      SliderController2.prototype.onKeyDown_ = function(ev) {
        this.value.rawValue += getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
      };
      return SliderController2;
    }();
    var SliderTextController = function() {
      function SliderTextController2(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.sliderC_ = new SliderController(doc, {
          baseStep: config.baseStep,
          props: config.sliderProps,
          value: config.value,
          viewProps: this.viewProps
        });
        this.textC_ = new NumberTextController(doc, {
          baseStep: config.baseStep,
          parser: config.parser,
          props: config.textProps,
          value: config.value,
          viewProps: config.viewProps
        });
        this.view = new SliderTextView(doc, {
          sliderView: this.sliderC_.view,
          textView: this.textC_.view
        });
      }
      Object.defineProperty(SliderTextController2.prototype, "sliderController", {
        get: function() {
          return this.sliderC_;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SliderTextController2.prototype, "textController", {
        get: function() {
          return this.textC_;
        },
        enumerable: false,
        configurable: true
      });
      return SliderTextController2;
    }();
    var SliderApi = function(_super) {
      __extends(SliderApi2, _super);
      function SliderApi2(controller) {
        var _this = _super.call(this, controller) || this;
        _this.emitter_ = new Emitter();
        _this.controller_.valueController.value.emitter.on("change", function(ev) {
          _this.emitter_.emit("change", {
            event: new TpChangeEvent(_this, ev.rawValue)
          });
        });
        return _this;
      }
      Object.defineProperty(SliderApi2.prototype, "label", {
        get: function() {
          return this.controller_.props.get("label");
        },
        set: function(label) {
          this.controller_.props.set("label", label);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SliderApi2.prototype, "maxValue", {
        get: function() {
          return this.controller_.valueController.sliderController.props.get("maxValue");
        },
        set: function(maxValue) {
          this.controller_.valueController.sliderController.props.set("maxValue", maxValue);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SliderApi2.prototype, "minValue", {
        get: function() {
          return this.controller_.valueController.sliderController.props.get("minValue");
        },
        set: function(minValue) {
          this.controller_.valueController.sliderController.props.set("minValue", minValue);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SliderApi2.prototype, "value", {
        get: function() {
          return this.controller_.valueController.value.rawValue;
        },
        set: function(value) {
          this.controller_.valueController.value.rawValue = value;
        },
        enumerable: false,
        configurable: true
      });
      SliderApi2.prototype.on = function(eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function(ev) {
          bh(ev.event);
        });
        return this;
      };
      return SliderApi2;
    }(BladeApi);
    var SliderBladePlugin = {
      id: "slider",
      accept: function(params) {
        if (findStringParam(params, "view") !== "slider") {
          return null;
        }
        var max4 = findNumberParam(params, "max");
        var min4 = findNumberParam(params, "min");
        if (max4 === void 0 || min4 === void 0) {
          return null;
        }
        return {
          params: {
            format: forceCast(findFunctionParam(params, "format")),
            label: findStringParam(params, "label"),
            max: max4,
            min: min4,
            value: findNumberParam(params, "value"),
            view: "slider"
          }
        };
      },
      controller: function(args) {
        var _a2, _b;
        var v = (_a2 = args.params.value) !== null && _a2 !== void 0 ? _a2 : 0;
        var vc = new SliderTextController(args.document, {
          baseStep: 1,
          parser: parseNumber,
          sliderProps: new ValueMap({
            maxValue: args.params.max,
            minValue: args.params.min
          }),
          textProps: new ValueMap({
            draggingScale: getSuitableDraggingScale(void 0, v),
            formatter: (_b = args.params.format) !== null && _b !== void 0 ? _b : numberToString
          }),
          value: new PrimitiveValue(v),
          viewProps: args.viewProps
        });
        return new LabelController(args.document, {
          blade: args.blade,
          props: new ValueMap({
            label: args.params.label
          }),
          valueController: vc
        });
      },
      api: function(controller) {
        if (!(controller instanceof LabelController)) {
          return null;
        }
        if (!(controller.valueController instanceof SliderTextController)) {
          return null;
        }
        return new SliderApi(controller);
      }
    };
    var className$g = ClassName("tbi");
    var TabItemView = function() {
      function TabItemView2(doc, config) {
        var _this = this;
        this.element = doc.createElement("div");
        this.element.classList.add(className$g());
        bindClassModifier(config.viewProps, this.element);
        bindValueMap(config.props, "selected", function(selected) {
          if (selected) {
            _this.element.classList.add(className$g(void 0, "sel"));
          } else {
            _this.element.classList.remove(className$g(void 0, "sel"));
          }
        });
        var buttonElem = doc.createElement("button");
        buttonElem.classList.add(className$g("b"));
        bindDisabled(config.viewProps, buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var titleElem = doc.createElement("div");
        titleElem.classList.add(className$g("t"));
        bindTextContent(config.props, "title", titleElem);
        this.buttonElement.appendChild(titleElem);
        this.titleElement = titleElem;
      }
      return TabItemView2;
    }();
    var TabItemController = function() {
      function TabItemController2(doc, config) {
        this.emitter = new Emitter();
        this.onClick_ = this.onClick_.bind(this);
        this.props = config.props;
        this.viewProps = config.viewProps;
        this.view = new TabItemView(doc, {
          props: config.props,
          viewProps: config.viewProps
        });
        this.view.buttonElement.addEventListener("click", this.onClick_);
      }
      TabItemController2.prototype.onClick_ = function() {
        this.emitter.emit("click", {
          sender: this
        });
      };
      return TabItemController2;
    }();
    var TabPageController = function() {
      function TabPageController2(doc, config) {
        var _this = this;
        this.onItemClick_ = this.onItemClick_.bind(this);
        this.ic_ = new TabItemController(doc, {
          props: config.itemProps,
          viewProps: createViewProps()
        });
        this.ic_.emitter.on("click", this.onItemClick_);
        this.cc_ = new RackController(doc, {
          blade: new Blade(),
          viewProps: createViewProps()
        });
        this.props = config.props;
        bindValueMap(this.props, "selected", function(selected) {
          _this.itemController.props.set("selected", selected);
          _this.contentController.viewProps.set("hidden", !selected);
        });
      }
      Object.defineProperty(TabPageController2.prototype, "itemController", {
        get: function() {
          return this.ic_;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TabPageController2.prototype, "contentController", {
        get: function() {
          return this.cc_;
        },
        enumerable: false,
        configurable: true
      });
      TabPageController2.prototype.onItemClick_ = function() {
        this.props.set("selected", true);
      };
      return TabPageController2;
    }();
    var TabPageApi = function() {
      function TabPageApi2(controller, contentRackApi) {
        this.controller_ = controller;
        this.rackApi_ = contentRackApi;
      }
      Object.defineProperty(TabPageApi2.prototype, "title", {
        get: function() {
          return this.controller_.itemController.props.get("title");
        },
        set: function(title) {
          this.controller_.itemController.props.set("title", title);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TabPageApi2.prototype, "selected", {
        get: function() {
          return this.controller_.props.get("selected");
        },
        set: function(selected) {
          this.controller_.props.set("selected", selected);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TabPageApi2.prototype, "children", {
        get: function() {
          return this.rackApi_.children;
        },
        enumerable: false,
        configurable: true
      });
      TabPageApi2.prototype.addButton = function(params) {
        return this.rackApi_.addButton(params);
      };
      TabPageApi2.prototype.addFolder = function(params) {
        return this.rackApi_.addFolder(params);
      };
      TabPageApi2.prototype.addSeparator = function(opt_params) {
        return this.rackApi_.addSeparator(opt_params);
      };
      TabPageApi2.prototype.addTab = function(params) {
        return this.rackApi_.addTab(params);
      };
      TabPageApi2.prototype.add = function(api, opt_index) {
        this.rackApi_.add(api, opt_index);
      };
      TabPageApi2.prototype.remove = function(api) {
        this.rackApi_.remove(api);
      };
      TabPageApi2.prototype.addInput = function(object, key, opt_params) {
        return this.rackApi_.addInput(object, key, opt_params);
      };
      TabPageApi2.prototype.addMonitor = function(object, key, opt_params) {
        return this.rackApi_.addMonitor(object, key, opt_params);
      };
      TabPageApi2.prototype.addBlade_v3_ = function(opt_params) {
        return this.rackApi_.addBlade_v3_(opt_params);
      };
      return TabPageApi2;
    }();
    var TabApi = function(_super) {
      __extends(TabApi2, _super);
      function TabApi2(controller) {
        var _this = _super.call(this, controller, new RackApi(controller.rackController)) || this;
        _this.onPageAdd_ = _this.onPageAdd_.bind(_this);
        _this.onPageRemove_ = _this.onPageRemove_.bind(_this);
        _this.emitter_ = new Emitter();
        _this.pageApiMap_ = new Map();
        _this.rackApi_.on("change", function(ev) {
          _this.emitter_.emit("change", {
            event: ev
          });
        });
        _this.rackApi_.on("update", function(ev) {
          _this.emitter_.emit("update", {
            event: ev
          });
        });
        _this.controller_.pageSet.emitter.on("add", _this.onPageAdd_);
        _this.controller_.pageSet.emitter.on("remove", _this.onPageRemove_);
        _this.controller_.pageSet.items.forEach(function(pc) {
          _this.setUpPageApi_(pc);
        });
        return _this;
      }
      Object.defineProperty(TabApi2.prototype, "pages", {
        get: function() {
          var _this = this;
          return this.controller_.pageSet.items.map(function(pc) {
            var api = _this.pageApiMap_.get(pc);
            if (!api) {
              throw TpError.shouldNeverHappen();
            }
            return api;
          });
        },
        enumerable: false,
        configurable: true
      });
      TabApi2.prototype.addPage = function(params) {
        var doc = this.controller_.view.element.ownerDocument;
        var pc = new TabPageController(doc, {
          itemProps: new ValueMap({
            selected: false,
            title: params.title
          }),
          props: new ValueMap({
            selected: false
          })
        });
        this.controller_.add(pc, params.index);
        var api = this.pageApiMap_.get(pc);
        if (!api) {
          throw TpError.shouldNeverHappen();
        }
        return api;
      };
      TabApi2.prototype.removePage = function(index) {
        this.controller_.remove(index);
      };
      TabApi2.prototype.on = function(eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function(ev) {
          bh(ev.event);
        });
        return this;
      };
      TabApi2.prototype.setUpPageApi_ = function(pc) {
        var rackApi = this.rackApi_["apiSet_"].find(function(api2) {
          return api2.controller_ === pc.contentController;
        });
        if (!rackApi) {
          throw TpError.shouldNeverHappen();
        }
        var api = new TabPageApi(pc, rackApi);
        this.pageApiMap_.set(pc, api);
      };
      TabApi2.prototype.onPageAdd_ = function(ev) {
        this.setUpPageApi_(ev.item);
      };
      TabApi2.prototype.onPageRemove_ = function(ev) {
        var api = this.pageApiMap_.get(ev.item);
        if (!api) {
          throw TpError.shouldNeverHappen();
        }
        this.pageApiMap_.delete(ev.item);
      };
      return TabApi2;
    }(RackLikeApi);
    var className$f = ClassName("tab");
    var TabView = function() {
      function TabView2(doc, config) {
        this.element = doc.createElement("div");
        this.element.classList.add(className$f(), bladeContainerClassName());
        bindClassModifier(config.viewProps, this.element);
        bindValue(config.empty, valueToClassName(this.element, className$f(void 0, "nop")));
        var itemsElem = doc.createElement("div");
        itemsElem.classList.add(className$f("i"));
        this.element.appendChild(itemsElem);
        this.itemsElement = itemsElem;
        var contentsElem = config.contentsElement;
        contentsElem.classList.add(className$f("c"));
        this.element.appendChild(contentsElem);
        this.contentsElement = contentsElem;
      }
      return TabView2;
    }();
    var TabController = function(_super) {
      __extends(TabController2, _super);
      function TabController2(doc, config) {
        var _this = this;
        var cr = new RackController(doc, {
          blade: config.blade,
          viewProps: config.viewProps
        });
        var empty = new PrimitiveValue(true);
        _this = _super.call(this, {
          blade: config.blade,
          rackController: cr,
          view: new TabView(doc, {
            contentsElement: cr.view.element,
            empty,
            viewProps: config.viewProps
          })
        }) || this;
        _this.onPageAdd_ = _this.onPageAdd_.bind(_this);
        _this.onPageRemove_ = _this.onPageRemove_.bind(_this);
        _this.onPageSelectedChange_ = _this.onPageSelectedChange_.bind(_this);
        _this.pageSet_ = new NestedOrderedSet(function() {
          return null;
        });
        _this.pageSet_.emitter.on("add", _this.onPageAdd_);
        _this.pageSet_.emitter.on("remove", _this.onPageRemove_);
        _this.empty_ = empty;
        _this.applyPages_();
        return _this;
      }
      Object.defineProperty(TabController2.prototype, "pageSet", {
        get: function() {
          return this.pageSet_;
        },
        enumerable: false,
        configurable: true
      });
      TabController2.prototype.add = function(pc, opt_index) {
        this.pageSet_.add(pc, opt_index !== null && opt_index !== void 0 ? opt_index : this.pageSet_.items.length);
      };
      TabController2.prototype.remove = function(index) {
        this.pageSet_.remove(this.pageSet_.items[index]);
      };
      TabController2.prototype.applyPages_ = function() {
        this.keepSelection_();
        this.empty_.rawValue = this.pageSet_.items.length === 0;
      };
      TabController2.prototype.onPageAdd_ = function(ev) {
        var pc = ev.item;
        insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
        this.rackController.rack.add(pc.contentController, ev.index);
        pc.props.value("selected").emitter.on("change", this.onPageSelectedChange_);
        this.applyPages_();
      };
      TabController2.prototype.onPageRemove_ = function(ev) {
        var pc = ev.item;
        removeElement(pc.itemController.view.element);
        this.rackController.rack.remove(pc.contentController);
        pc.props.value("selected").emitter.off("change", this.onPageSelectedChange_);
        this.applyPages_();
      };
      TabController2.prototype.keepSelection_ = function() {
        if (this.pageSet_.items.length === 0) {
          return;
        }
        var firstSelIndex = this.pageSet_.items.findIndex(function(pc) {
          return pc.props.get("selected");
        });
        if (firstSelIndex < 0) {
          this.pageSet_.items.forEach(function(pc, i) {
            pc.props.set("selected", i === 0);
          });
        } else {
          this.pageSet_.items.forEach(function(pc, i) {
            pc.props.set("selected", i === firstSelIndex);
          });
        }
      };
      TabController2.prototype.onPageSelectedChange_ = function(ev) {
        if (ev.rawValue) {
          var index_1 = this.pageSet_.items.findIndex(function(pc) {
            return pc.props.value("selected") === ev.sender;
          });
          this.pageSet_.items.forEach(function(pc, i) {
            pc.props.set("selected", i === index_1);
          });
        } else {
          this.keepSelection_();
        }
      };
      return TabController2;
    }(RackLikeController);
    var TabBladePlugin = {
      id: "tab",
      accept: function(params) {
        var pageObjs = findObjectArrayParam(params, "pages");
        if (findStringParam(params, "view") !== "tab" || !pageObjs) {
          return null;
        }
        var pages = [];
        for (var i = 0; i < pageObjs.length; i++) {
          var title = findStringParam(pageObjs[i], "title");
          if (isEmpty(title)) {
            return null;
          }
          pages.push({
            title
          });
        }
        if (pages.length === 0) {
          return null;
        }
        return {
          params: {
            pages,
            view: "tab"
          }
        };
      },
      controller: function(args) {
        var c = new TabController(args.document, {
          blade: args.blade,
          viewProps: args.viewProps
        });
        args.params.pages.forEach(function(p) {
          var pc = new TabPageController(args.document, {
            itemProps: new ValueMap({
              selected: false,
              title: p.title
            }),
            props: new ValueMap({
              selected: false
            })
          });
          c.add(pc);
        });
        return c;
      },
      api: function(controller) {
        if (!(controller instanceof TabController)) {
          return null;
        }
        return new TabApi(controller);
      }
    };
    var className$e = ClassName("txt");
    var TextView = function() {
      function TextView2(doc, config) {
        this.onChange_ = this.onChange_.bind(this);
        this.element = doc.createElement("div");
        this.element.classList.add(className$e());
        bindClassModifier(config.viewProps, this.element);
        this.props_ = config.props;
        this.props_.emitter.on("change", this.onChange_);
        var inputElem = doc.createElement("input");
        inputElem.classList.add(className$e("i"));
        inputElem.type = "text";
        bindDisabled(config.viewProps, inputElem);
        this.element.appendChild(inputElem);
        this.inputElement = inputElem;
        config.value.emitter.on("change", this.onChange_);
        this.value_ = config.value;
        this.refresh();
      }
      TextView2.prototype.refresh = function() {
        var formatter = this.props_.get("formatter");
        this.inputElement.value = formatter(this.value_.rawValue);
      };
      TextView2.prototype.onChange_ = function() {
        this.refresh();
      };
      return TextView2;
    }();
    var TextController = function() {
      function TextController2(doc, config) {
        this.onInputChange_ = this.onInputChange_.bind(this);
        this.parser_ = config.parser;
        this.props = config.props;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new TextView(doc, {
          props: config.props,
          value: this.value,
          viewProps: this.viewProps
        });
        this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      TextController2.prototype.onInputChange_ = function(e) {
        var inputElem = forceCast(e.currentTarget);
        var value = inputElem.value;
        var parsedValue = this.parser_(value);
        if (!isEmpty(parsedValue)) {
          this.value.rawValue = parsedValue;
        }
        this.view.refresh();
      };
      return TextController2;
    }();
    var TextApi = function(_super) {
      __extends(TextApi2, _super);
      function TextApi2(controller) {
        var _this = _super.call(this, controller) || this;
        _this.emitter_ = new Emitter();
        _this.controller_.valueController.value.emitter.on("change", function(ev) {
          _this.emitter_.emit("change", {
            event: new TpChangeEvent(_this, ev.rawValue)
          });
        });
        return _this;
      }
      Object.defineProperty(TextApi2.prototype, "label", {
        get: function() {
          return this.controller_.props.get("label");
        },
        set: function(label) {
          this.controller_.props.set("label", label);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TextApi2.prototype, "formatter", {
        get: function() {
          return this.controller_.valueController.props.get("formatter");
        },
        set: function(formatter) {
          this.controller_.valueController.props.set("formatter", formatter);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TextApi2.prototype, "value", {
        get: function() {
          return this.controller_.valueController.value.rawValue;
        },
        set: function(value) {
          this.controller_.valueController.value.rawValue = value;
        },
        enumerable: false,
        configurable: true
      });
      TextApi2.prototype.on = function(eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function(ev) {
          bh(ev.event);
        });
        return this;
      };
      return TextApi2;
    }(BladeApi);
    var TextBladePlugin = function() {
      return {
        id: "text",
        accept: function(params) {
          if (findStringParam(params, "view") !== "text") {
            return null;
          }
          var parser = findFunctionParam(params, "parse");
          var value = params["value"];
          if (!parser || !value) {
            return null;
          }
          return {
            params: {
              format: forceCast(findFunctionParam(params, "format")),
              label: findStringParam(params, "label"),
              parse: forceCast(parser),
              value: forceCast(value),
              view: "text"
            }
          };
        },
        controller: function(args) {
          var _a2;
          var ic = new TextController(args.document, {
            parser: args.params.parse,
            props: new ValueMap({
              formatter: (_a2 = args.params.format) !== null && _a2 !== void 0 ? _a2 : function(v) {
                return String(v);
              }
            }),
            value: new PrimitiveValue(args.params.value),
            viewProps: args.viewProps
          });
          return new LabelController(args.document, {
            blade: args.blade,
            props: new ValueMap({
              label: args.params.label
            }),
            valueController: ic
          });
        },
        api: function(controller) {
          if (!(controller instanceof LabelController)) {
            return null;
          }
          if (!(controller.valueController instanceof TextController)) {
            return null;
          }
          return new TextApi(controller);
        }
      };
    }();
    function boolToString(value) {
      return String(value);
    }
    function boolFromUnknown(value) {
      if (value === "false") {
        return false;
      }
      return !!value;
    }
    function BooleanFormatter(value) {
      return boolToString(value);
    }
    function writePrimitive(target, value) {
      target.write(value);
    }
    var className$d = ClassName("ckb");
    var CheckboxView = function() {
      function CheckboxView2(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.element = doc.createElement("div");
        this.element.classList.add(className$d());
        bindClassModifier(config.viewProps, this.element);
        var labelElem = doc.createElement("label");
        labelElem.classList.add(className$d("l"));
        this.element.appendChild(labelElem);
        var inputElem = doc.createElement("input");
        inputElem.classList.add(className$d("i"));
        inputElem.type = "checkbox";
        labelElem.appendChild(inputElem);
        this.inputElement = inputElem;
        bindDisabled(config.viewProps, this.inputElement);
        var wrapperElem = doc.createElement("div");
        wrapperElem.classList.add(className$d("w"));
        labelElem.appendChild(wrapperElem);
        var markElem = createSvgIconElement(doc, "check");
        wrapperElem.appendChild(markElem);
        config.value.emitter.on("change", this.onValueChange_);
        this.value = config.value;
        this.update_();
      }
      CheckboxView2.prototype.update_ = function() {
        this.inputElement.checked = this.value.rawValue;
      };
      CheckboxView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      return CheckboxView2;
    }();
    var CheckboxController = function() {
      function CheckboxController2(doc, config) {
        this.onInputChange_ = this.onInputChange_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new CheckboxView(doc, {
          value: this.value,
          viewProps: this.viewProps
        });
        this.view.inputElement.addEventListener("change", this.onInputChange_);
      }
      CheckboxController2.prototype.onInputChange_ = function(e) {
        var inputElem = forceCast(e.currentTarget);
        this.value.rawValue = inputElem.checked;
      };
      return CheckboxController2;
    }();
    function createConstraint$5(params) {
      var constraints = [];
      var lc = createListConstraint(params);
      if (lc) {
        constraints.push(lc);
      }
      return new CompositeConstraint(constraints);
    }
    var BooleanInputPlugin = {
      id: "input-bool",
      accept: function(value) {
        return typeof value === "boolean" ? value : null;
      },
      binding: {
        reader: function(_args) {
          return boolFromUnknown;
        },
        constraint: function(args) {
          return createConstraint$5(args.params);
        },
        writer: function(_args) {
          return writePrimitive;
        }
      },
      controller: function(args) {
        var _a2;
        var doc = args.document;
        var value = args.value;
        var c = args.constraint;
        if (c && findConstraint(c, ListConstraint)) {
          return new ListController(doc, {
            props: new ValueMap({
              options: (_a2 = findListItems(c)) !== null && _a2 !== void 0 ? _a2 : []
            }),
            value,
            viewProps: args.viewProps
          });
        }
        return new CheckboxController(doc, {
          value,
          viewProps: args.viewProps
        });
      }
    };
    var className$c = ClassName("clswtxt");
    var ColorSwatchTextView = function() {
      function ColorSwatchTextView2(doc, config) {
        this.element = doc.createElement("div");
        this.element.classList.add(className$c());
        var swatchElem = doc.createElement("div");
        swatchElem.classList.add(className$c("s"));
        this.swatchView_ = config.swatchView;
        swatchElem.appendChild(this.swatchView_.element);
        this.element.appendChild(swatchElem);
        var textElem = doc.createElement("div");
        textElem.classList.add(className$c("t"));
        this.textView = config.textView;
        textElem.appendChild(this.textView.element);
        this.element.appendChild(textElem);
      }
      return ColorSwatchTextView2;
    }();
    var PickedColor = function() {
      function PickedColor2(value) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.mode_ = value.rawValue.mode;
        this.value = value;
        this.value.emitter.on("change", this.onValueChange_);
        this.emitter = new Emitter();
      }
      Object.defineProperty(PickedColor2.prototype, "mode", {
        get: function() {
          return this.mode_;
        },
        set: function(mode) {
          if (this.mode_ === mode) {
            return;
          }
          this.mode_ = mode;
          this.emitter.emit("change", {
            propertyName: "mode",
            sender: this
          });
        },
        enumerable: false,
        configurable: true
      });
      PickedColor2.prototype.onValueChange_ = function() {
        this.emitter.emit("change", {
          propertyName: "value",
          sender: this
        });
      };
      return PickedColor2;
    }();
    var innerFormatter = createNumberFormatter(0);
    function formatPercentage(value) {
      return innerFormatter(value) + "%";
    }
    function rgbToHsl(r, g, b) {
      var rp = constrainRange(r / 255, 0, 1);
      var gp = constrainRange(g / 255, 0, 1);
      var bp = constrainRange(b / 255, 0, 1);
      var cmax = Math.max(rp, gp, bp);
      var cmin = Math.min(rp, gp, bp);
      var c = cmax - cmin;
      var h = 0;
      var s = 0;
      var l = (cmin + cmax) / 2;
      if (c !== 0) {
        s = c / (1 - Math.abs(cmax + cmin - 1));
        if (rp === cmax) {
          h = (gp - bp) / c;
        } else if (gp === cmax) {
          h = 2 + (bp - rp) / c;
        } else {
          h = 4 + (rp - gp) / c;
        }
        h = h / 6 + (h < 0 ? 1 : 0);
      }
      return [h * 360, s * 100, l * 100];
    }
    function hslToRgb(h, s, l) {
      var _a2, _b, _c, _d, _e, _f;
      var hp = (h % 360 + 360) % 360;
      var sp = constrainRange(s / 100, 0, 1);
      var lp = constrainRange(l / 100, 0, 1);
      var c = (1 - Math.abs(2 * lp - 1)) * sp;
      var x = c * (1 - Math.abs(hp / 60 % 2 - 1));
      var m = lp - c / 2;
      var rp, gp, bp;
      if (hp >= 0 && hp < 60) {
        _a2 = [c, x, 0], rp = _a2[0], gp = _a2[1], bp = _a2[2];
      } else if (hp >= 60 && hp < 120) {
        _b = [x, c, 0], rp = _b[0], gp = _b[1], bp = _b[2];
      } else if (hp >= 120 && hp < 180) {
        _c = [0, c, x], rp = _c[0], gp = _c[1], bp = _c[2];
      } else if (hp >= 180 && hp < 240) {
        _d = [0, x, c], rp = _d[0], gp = _d[1], bp = _d[2];
      } else if (hp >= 240 && hp < 300) {
        _e = [x, 0, c], rp = _e[0], gp = _e[1], bp = _e[2];
      } else {
        _f = [c, 0, x], rp = _f[0], gp = _f[1], bp = _f[2];
      }
      return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
    }
    function rgbToHsv(r, g, b) {
      var rp = constrainRange(r / 255, 0, 1);
      var gp = constrainRange(g / 255, 0, 1);
      var bp = constrainRange(b / 255, 0, 1);
      var cmax = Math.max(rp, gp, bp);
      var cmin = Math.min(rp, gp, bp);
      var d = cmax - cmin;
      var h;
      if (d === 0) {
        h = 0;
      } else if (cmax === rp) {
        h = 60 * (((gp - bp) / d % 6 + 6) % 6);
      } else if (cmax === gp) {
        h = 60 * ((bp - rp) / d + 2);
      } else {
        h = 60 * ((rp - gp) / d + 4);
      }
      var s = cmax === 0 ? 0 : d / cmax;
      var v = cmax;
      return [h, s * 100, v * 100];
    }
    function hsvToRgb(h, s, v) {
      var _a2, _b, _c, _d, _e, _f;
      var hp = loopRange(h, 360);
      var sp = constrainRange(s / 100, 0, 1);
      var vp = constrainRange(v / 100, 0, 1);
      var c = vp * sp;
      var x = c * (1 - Math.abs(hp / 60 % 2 - 1));
      var m = vp - c;
      var rp, gp, bp;
      if (hp >= 0 && hp < 60) {
        _a2 = [c, x, 0], rp = _a2[0], gp = _a2[1], bp = _a2[2];
      } else if (hp >= 60 && hp < 120) {
        _b = [x, c, 0], rp = _b[0], gp = _b[1], bp = _b[2];
      } else if (hp >= 120 && hp < 180) {
        _c = [0, c, x], rp = _c[0], gp = _c[1], bp = _c[2];
      } else if (hp >= 180 && hp < 240) {
        _d = [0, x, c], rp = _d[0], gp = _d[1], bp = _d[2];
      } else if (hp >= 240 && hp < 300) {
        _e = [x, 0, c], rp = _e[0], gp = _e[1], bp = _e[2];
      } else {
        _f = [c, 0, x], rp = _f[0], gp = _f[1], bp = _f[2];
      }
      return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
    }
    function hslToHsv(h, s, l) {
      var sd = l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100);
      return [
        h,
        sd !== 0 ? s * (100 - Math.abs(2 * l - 100)) / sd : 0,
        l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100)
      ];
    }
    function hsvToHsl(h, s, v) {
      var sd = 100 - Math.abs(v * (200 - s) / 100 - 100);
      return [h, sd !== 0 ? s * v / sd : 0, v * (200 - s) / (2 * 100)];
    }
    function removeAlphaComponent(comps) {
      return [comps[0], comps[1], comps[2]];
    }
    function appendAlphaComponent(comps, alpha) {
      return [comps[0], comps[1], comps[2], alpha];
    }
    var MODE_CONVERTER_MAP = {
      hsl: {
        hsl: function(h, s, l) {
          return [h, s, l];
        },
        hsv: hslToHsv,
        rgb: hslToRgb
      },
      hsv: {
        hsl: hsvToHsl,
        hsv: function(h, s, v) {
          return [h, s, v];
        },
        rgb: hsvToRgb
      },
      rgb: {
        hsl: rgbToHsl,
        hsv: rgbToHsv,
        rgb: function(r, g, b) {
          return [r, g, b];
        }
      }
    };
    function convertColorMode(components, fromMode, toMode) {
      var _a2;
      return (_a2 = MODE_CONVERTER_MAP[fromMode])[toMode].apply(_a2, components);
    }
    var CONSTRAINT_MAP = {
      hsl: function(comps) {
        var _a2;
        return [
          loopRange(comps[0], 360),
          constrainRange(comps[1], 0, 100),
          constrainRange(comps[2], 0, 100),
          constrainRange((_a2 = comps[3]) !== null && _a2 !== void 0 ? _a2 : 1, 0, 1)
        ];
      },
      hsv: function(comps) {
        var _a2;
        return [
          loopRange(comps[0], 360),
          constrainRange(comps[1], 0, 100),
          constrainRange(comps[2], 0, 100),
          constrainRange((_a2 = comps[3]) !== null && _a2 !== void 0 ? _a2 : 1, 0, 1)
        ];
      },
      rgb: function(comps) {
        var _a2;
        return [
          constrainRange(comps[0], 0, 255),
          constrainRange(comps[1], 0, 255),
          constrainRange(comps[2], 0, 255),
          constrainRange((_a2 = comps[3]) !== null && _a2 !== void 0 ? _a2 : 1, 0, 1)
        ];
      }
    };
    function isRgbColorComponent(obj, key) {
      if (typeof obj !== "object" || isEmpty(obj)) {
        return false;
      }
      return key in obj && typeof obj[key] === "number";
    }
    var Color = function() {
      function Color2(comps, mode) {
        this.mode_ = mode;
        this.comps_ = CONSTRAINT_MAP[mode](comps);
      }
      Color2.black = function() {
        return new Color2([0, 0, 0], "rgb");
      };
      Color2.fromObject = function(obj) {
        var comps = "a" in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
        return new Color2(comps, "rgb");
      };
      Color2.toRgbaObject = function(color) {
        return color.toRgbaObject();
      };
      Color2.isRgbColorObject = function(obj) {
        return isRgbColorComponent(obj, "r") && isRgbColorComponent(obj, "g") && isRgbColorComponent(obj, "b");
      };
      Color2.isRgbaColorObject = function(obj) {
        return this.isRgbColorObject(obj) && isRgbColorComponent(obj, "a");
      };
      Color2.isColorObject = function(obj) {
        return this.isRgbColorObject(obj);
      };
      Color2.equals = function(v1, v2) {
        if (v1.mode_ !== v2.mode_) {
          return false;
        }
        var comps1 = v1.comps_;
        var comps2 = v2.comps_;
        for (var i = 0; i < comps1.length; i++) {
          if (comps1[i] !== comps2[i]) {
            return false;
          }
        }
        return true;
      };
      Object.defineProperty(Color2.prototype, "mode", {
        get: function() {
          return this.mode_;
        },
        enumerable: false,
        configurable: true
      });
      Color2.prototype.getComponents = function(opt_mode) {
        return appendAlphaComponent(convertColorMode(removeAlphaComponent(this.comps_), this.mode_, opt_mode || this.mode_), this.comps_[3]);
      };
      Color2.prototype.toRgbaObject = function() {
        var rgbComps = this.getComponents("rgb");
        return {
          r: rgbComps[0],
          g: rgbComps[1],
          b: rgbComps[2],
          a: rgbComps[3]
        };
      };
      return Color2;
    }();
    function parseCssNumberOrPercentage(text, maxValue) {
      var m = text.match(/^(.+)%$/);
      if (!m) {
        return Math.min(parseFloat(text), maxValue);
      }
      return Math.min(parseFloat(m[1]) * 0.01 * maxValue, maxValue);
    }
    var ANGLE_TO_DEG_MAP = {
      deg: function(angle3) {
        return angle3;
      },
      grad: function(angle3) {
        return angle3 * 360 / 400;
      },
      rad: function(angle3) {
        return angle3 * 360 / (2 * Math.PI);
      },
      turn: function(angle3) {
        return angle3 * 360;
      }
    };
    function parseCssNumberOrAngle(text) {
      var m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
      if (!m) {
        return parseFloat(text);
      }
      var angle3 = parseFloat(m[1]);
      var unit = m[2];
      return ANGLE_TO_DEG_MAP[unit](angle3);
    }
    var NOTATION_TO_PARSER_MAP = {
      "func.rgb": function(text) {
        var m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
          return null;
        }
        var comps = [
          parseCssNumberOrPercentage(m[1], 255),
          parseCssNumberOrPercentage(m[2], 255),
          parseCssNumberOrPercentage(m[3], 255)
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
          return null;
        }
        return new Color(comps, "rgb");
      },
      "func.rgba": function(text) {
        var m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
          return null;
        }
        var comps = [
          parseCssNumberOrPercentage(m[1], 255),
          parseCssNumberOrPercentage(m[2], 255),
          parseCssNumberOrPercentage(m[3], 255),
          parseCssNumberOrPercentage(m[4], 1)
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
          return null;
        }
        return new Color(comps, "rgb");
      },
      "func.hsl": function(text) {
        var m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
          return null;
        }
        var comps = [
          parseCssNumberOrAngle(m[1]),
          parseCssNumberOrPercentage(m[2], 100),
          parseCssNumberOrPercentage(m[3], 100)
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
          return null;
        }
        return new Color(comps, "hsl");
      },
      "func.hsla": function(text) {
        var m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
          return null;
        }
        var comps = [
          parseCssNumberOrAngle(m[1]),
          parseCssNumberOrPercentage(m[2], 100),
          parseCssNumberOrPercentage(m[3], 100),
          parseCssNumberOrPercentage(m[4], 1)
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
          return null;
        }
        return new Color(comps, "hsl");
      },
      "hex.rgb": function(text) {
        var mRrggbb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
        if (mRrggbb) {
          return new Color([
            parseInt(mRrggbb[1] + mRrggbb[1], 16),
            parseInt(mRrggbb[2] + mRrggbb[2], 16),
            parseInt(mRrggbb[3] + mRrggbb[3], 16)
          ], "rgb");
        }
        var mRgb = text.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
        if (mRgb) {
          return new Color([parseInt(mRgb[1], 16), parseInt(mRgb[2], 16), parseInt(mRgb[3], 16)], "rgb");
        }
        return null;
      },
      "hex.rgba": function(text) {
        var mRrggbb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
        if (mRrggbb) {
          return new Color([
            parseInt(mRrggbb[1] + mRrggbb[1], 16),
            parseInt(mRrggbb[2] + mRrggbb[2], 16),
            parseInt(mRrggbb[3] + mRrggbb[3], 16),
            mapRange(parseInt(mRrggbb[4] + mRrggbb[4], 16), 0, 255, 0, 1)
          ], "rgb");
        }
        var mRgb = text.match(/^#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
        if (mRgb) {
          return new Color([
            parseInt(mRgb[1], 16),
            parseInt(mRgb[2], 16),
            parseInt(mRgb[3], 16),
            mapRange(parseInt(mRgb[4], 16), 0, 255, 0, 1)
          ], "rgb");
        }
        return null;
      }
    };
    function getColorNotation(text) {
      var notations = Object.keys(NOTATION_TO_PARSER_MAP);
      return notations.reduce(function(result, notation) {
        if (result) {
          return result;
        }
        var subparser = NOTATION_TO_PARSER_MAP[notation];
        return subparser(text) ? notation : null;
      }, null);
    }
    var CompositeColorParser = function(text) {
      var notation = getColorNotation(text);
      return notation ? NOTATION_TO_PARSER_MAP[notation](text) : null;
    };
    function hasAlphaComponent(notation) {
      return notation === "func.hsla" || notation === "func.rgba" || notation === "hex.rgba";
    }
    function colorFromString(value) {
      if (typeof value === "string") {
        var cv = CompositeColorParser(value);
        if (cv) {
          return cv;
        }
      }
      return Color.black();
    }
    function zerofill(comp) {
      var hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }
    function colorToHexRgbString(value) {
      var hexes = removeAlphaComponent(value.getComponents("rgb")).map(zerofill).join("");
      return "#" + hexes;
    }
    function colorToHexRgbaString(value) {
      var rgbaComps = value.getComponents("rgb");
      var hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join("");
      return "#" + hexes;
    }
    function colorToFunctionalRgbString(value) {
      var formatter = createNumberFormatter(0);
      var comps = removeAlphaComponent(value.getComponents("rgb")).map(function(comp) {
        return formatter(comp);
      });
      return "rgb(" + comps.join(", ") + ")";
    }
    function colorToFunctionalRgbaString(value) {
      var aFormatter = createNumberFormatter(2);
      var rgbFormatter = createNumberFormatter(0);
      var comps = value.getComponents("rgb").map(function(comp, index) {
        var formatter = index === 3 ? aFormatter : rgbFormatter;
        return formatter(comp);
      });
      return "rgba(" + comps.join(", ") + ")";
    }
    function colorToFunctionalHslString(value) {
      var formatters = [
        createNumberFormatter(0),
        formatPercentage,
        formatPercentage
      ];
      var comps = removeAlphaComponent(value.getComponents("hsl")).map(function(comp, index) {
        return formatters[index](comp);
      });
      return "hsl(" + comps.join(", ") + ")";
    }
    function colorToFunctionalHslaString(value) {
      var formatters = [
        createNumberFormatter(0),
        formatPercentage,
        formatPercentage,
        createNumberFormatter(2)
      ];
      var comps = value.getComponents("hsl").map(function(comp, index) {
        return formatters[index](comp);
      });
      return "hsla(" + comps.join(", ") + ")";
    }
    var NOTATION_TO_STRINGIFIER_MAP = {
      "func.hsl": colorToFunctionalHslString,
      "func.hsla": colorToFunctionalHslaString,
      "func.rgb": colorToFunctionalRgbString,
      "func.rgba": colorToFunctionalRgbaString,
      "hex.rgb": colorToHexRgbString,
      "hex.rgba": colorToHexRgbaString
    };
    function getColorStringifier(notation) {
      return NOTATION_TO_STRINGIFIER_MAP[notation];
    }
    var className$b = ClassName("clsw");
    var ColorSwatchView = function() {
      function ColorSwatchView2(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        config.value.emitter.on("change", this.onValueChange_);
        this.value = config.value;
        this.element = doc.createElement("div");
        this.element.classList.add(className$b());
        bindClassModifier(config.viewProps, this.element);
        var swatchElem = doc.createElement("div");
        swatchElem.classList.add(className$b("sw"));
        this.element.appendChild(swatchElem);
        this.swatchElem_ = swatchElem;
        var buttonElem = doc.createElement("button");
        buttonElem.classList.add(className$b("b"));
        bindDisabled(config.viewProps, buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var pickerElem = doc.createElement("div");
        pickerElem.classList.add(className$b("p"));
        this.pickerView_ = config.pickerView;
        pickerElem.appendChild(this.pickerView_.element);
        this.element.appendChild(pickerElem);
        this.update_();
      }
      ColorSwatchView2.prototype.update_ = function() {
        var value = this.value.rawValue;
        this.swatchElem_.style.backgroundColor = colorToHexRgbaString(value);
      };
      ColorSwatchView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      return ColorSwatchView2;
    }();
    var RangeConstraint = function() {
      function RangeConstraint2(config) {
        this.maxValue = config.max;
        this.minValue = config.min;
      }
      RangeConstraint2.prototype.constrain = function(value) {
        var result = value;
        if (!isEmpty(this.minValue)) {
          result = Math.max(result, this.minValue);
        }
        if (!isEmpty(this.maxValue)) {
          result = Math.min(result, this.maxValue);
        }
        return result;
      };
      return RangeConstraint2;
    }();
    function connectValues(_a2) {
      var primary = _a2.primary, secondary = _a2.secondary, forward = _a2.forward, backward = _a2.backward;
      var changing = false;
      function preventFeedback(callback) {
        if (changing) {
          return;
        }
        changing = true;
        callback();
        changing = false;
      }
      primary.emitter.on("change", function() {
        preventFeedback(function() {
          secondary.rawValue = forward(primary, secondary);
        });
      });
      secondary.emitter.on("change", function() {
        preventFeedback(function() {
          primary.rawValue = backward(primary, secondary);
        });
        preventFeedback(function() {
          secondary.rawValue = forward(primary, secondary);
        });
      });
      preventFeedback(function() {
        secondary.rawValue = forward(primary, secondary);
      });
    }
    var className$a = ClassName("clp");
    var ColorPickerView = function() {
      function ColorPickerView2(doc, config) {
        this.alphaViews_ = null;
        this.onFoldableChange_ = this.onFoldableChange_.bind(this);
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.pickedColor = config.pickedColor;
        this.pickedColor.value.emitter.on("change", this.onValueChange_);
        this.expanded_ = config.expanded;
        this.expanded_.emitter.on("change", this.onFoldableChange_);
        this.element = doc.createElement("div");
        this.element.classList.add(className$a());
        var hsvElem = doc.createElement("div");
        hsvElem.classList.add(className$a("hsv"));
        var svElem = doc.createElement("div");
        svElem.classList.add(className$a("sv"));
        this.svPaletteView_ = config.svPaletteView;
        svElem.appendChild(this.svPaletteView_.element);
        hsvElem.appendChild(svElem);
        var hElem = doc.createElement("div");
        hElem.classList.add(className$a("h"));
        this.hPaletteView_ = config.hPaletteView;
        hElem.appendChild(this.hPaletteView_.element);
        hsvElem.appendChild(hElem);
        this.element.appendChild(hsvElem);
        var rgbElem = doc.createElement("div");
        rgbElem.classList.add(className$a("rgb"));
        this.textView_ = config.textView;
        rgbElem.appendChild(this.textView_.element);
        this.element.appendChild(rgbElem);
        if (config.alphaViews) {
          this.alphaViews_ = {
            palette: config.alphaViews.palette,
            text: config.alphaViews.text
          };
          var aElem = doc.createElement("div");
          aElem.classList.add(className$a("a"));
          var apElem = doc.createElement("div");
          apElem.classList.add(className$a("ap"));
          apElem.appendChild(this.alphaViews_.palette.element);
          aElem.appendChild(apElem);
          var atElem = doc.createElement("div");
          atElem.classList.add(className$a("at"));
          atElem.appendChild(this.alphaViews_.text.element);
          aElem.appendChild(atElem);
          this.element.appendChild(aElem);
        }
        this.update_();
      }
      Object.defineProperty(ColorPickerView2.prototype, "allFocusableElements", {
        get: function() {
          var elems = __spreadArrays([
            this.svPaletteView_.element,
            this.hPaletteView_.element
          ], this.textView_.textViews.map(function(v) {
            return v.inputElement;
          }));
          if (this.alphaViews_) {
            elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
          }
          return forceCast(elems);
        },
        enumerable: false,
        configurable: true
      });
      ColorPickerView2.prototype.update_ = function() {
        if (this.expanded_.rawValue) {
          this.element.classList.add(className$a(void 0, "expanded"));
        } else {
          this.element.classList.remove(className$a(void 0, "expanded"));
        }
      };
      ColorPickerView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      ColorPickerView2.prototype.onFoldableChange_ = function() {
        this.update_();
      };
      return ColorPickerView2;
    }();
    function getBaseStepForColor(forAlpha) {
      return forAlpha ? 0.1 : 1;
    }
    var className$9 = ClassName("apl");
    var APaletteView = function() {
      function APaletteView2(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.value = config.value;
        this.value.emitter.on("change", this.onValueChange_);
        this.element = doc.createElement("div");
        this.element.classList.add(className$9());
        bindTabIndex(config.viewProps, this.element);
        var barElem = doc.createElement("div");
        barElem.classList.add(className$9("b"));
        this.element.appendChild(barElem);
        var colorElem = doc.createElement("div");
        colorElem.classList.add(className$9("c"));
        barElem.appendChild(colorElem);
        this.colorElem_ = colorElem;
        var markerElem = doc.createElement("div");
        markerElem.classList.add(className$9("m"));
        this.element.appendChild(markerElem);
        this.markerElem_ = markerElem;
        var previewElem = doc.createElement("div");
        previewElem.classList.add(className$9("p"));
        this.markerElem_.appendChild(previewElem);
        this.previewElem_ = previewElem;
        this.update_();
      }
      APaletteView2.prototype.update_ = function() {
        var c = this.value.rawValue;
        var rgbaComps = c.getComponents("rgb");
        var leftColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], "rgb");
        var rightColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], "rgb");
        var gradientComps = [
          "to right",
          colorToFunctionalRgbaString(leftColor),
          colorToFunctionalRgbaString(rightColor)
        ];
        this.colorElem_.style.background = "linear-gradient(" + gradientComps.join(",") + ")";
        this.previewElem_.style.backgroundColor = colorToFunctionalRgbaString(c);
        var left = mapRange(rgbaComps[3], 0, 1, 0, 100);
        this.markerElem_.style.left = left + "%";
      };
      APaletteView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      return APaletteView2;
    }();
    var APaletteController = function() {
      function APaletteController2(doc, config) {
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new APaletteView(doc, {
          value: this.value,
          viewProps: this.viewProps
        });
        this.ptHandler_ = new PointerHandler(this.view.element);
        this.ptHandler_.emitter.on("down", this.onPointerDown_);
        this.ptHandler_.emitter.on("move", this.onPointerMove_);
        this.ptHandler_.emitter.on("up", this.onPointerUp_);
        this.view.element.addEventListener("keydown", this.onKeyDown_);
      }
      APaletteController2.prototype.handlePointerEvent_ = function(d) {
        if (!d.point) {
          return;
        }
        var alpha = d.point.x / d.bounds.width;
        var c = this.value.rawValue;
        var _a2 = c.getComponents("hsv"), h = _a2[0], s = _a2[1], v = _a2[2];
        this.value.rawValue = new Color([h, s, v, alpha], "hsv");
      };
      APaletteController2.prototype.onPointerDown_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      APaletteController2.prototype.onPointerMove_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      APaletteController2.prototype.onPointerUp_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      APaletteController2.prototype.onKeyDown_ = function(ev) {
        var step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
        var c = this.value.rawValue;
        var _a2 = c.getComponents("hsv"), h = _a2[0], s = _a2[1], v = _a2[2], a = _a2[3];
        this.value.rawValue = new Color([h, s, v, a + step], "hsv");
      };
      return APaletteController2;
    }();
    var className$8 = ClassName("cltxt");
    function createModeSelectElement(doc) {
      var selectElem = doc.createElement("select");
      var items = [
        {text: "RGB", value: "rgb"},
        {text: "HSL", value: "hsl"},
        {text: "HSV", value: "hsv"}
      ];
      selectElem.appendChild(items.reduce(function(frag, item) {
        var optElem = doc.createElement("option");
        optElem.textContent = item.text;
        optElem.value = item.value;
        frag.appendChild(optElem);
        return frag;
      }, doc.createDocumentFragment()));
      return selectElem;
    }
    var ColorTextView = function() {
      function ColorTextView2(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.element = doc.createElement("div");
        this.element.classList.add(className$8());
        var modeElem = doc.createElement("div");
        modeElem.classList.add(className$8("m"));
        this.modeElem_ = createModeSelectElement(doc);
        this.modeElem_.classList.add(className$8("ms"));
        modeElem.appendChild(this.modeSelectElement);
        var modeMarkerElem = doc.createElement("div");
        modeMarkerElem.classList.add(className$8("mm"));
        modeMarkerElem.appendChild(createSvgIconElement(doc, "dropdown"));
        modeElem.appendChild(modeMarkerElem);
        this.element.appendChild(modeElem);
        var textsElem = doc.createElement("div");
        textsElem.classList.add(className$8("w"));
        this.element.appendChild(textsElem);
        this.textsElem_ = textsElem;
        this.textViews_ = config.textViews;
        this.applyTextViews_();
        this.pickedColor = config.pickedColor;
        this.pickedColor.emitter.on("change", this.onValueChange_);
        this.update_();
      }
      Object.defineProperty(ColorTextView2.prototype, "modeSelectElement", {
        get: function() {
          return this.modeElem_;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ColorTextView2.prototype, "textViews", {
        get: function() {
          return this.textViews_;
        },
        set: function(textViews) {
          this.textViews_ = textViews;
          this.applyTextViews_();
        },
        enumerable: false,
        configurable: true
      });
      ColorTextView2.prototype.update_ = function() {
        this.modeElem_.value = this.pickedColor.mode;
      };
      ColorTextView2.prototype.applyTextViews_ = function() {
        var _this = this;
        removeChildElements(this.textsElem_);
        var doc = this.element.ownerDocument;
        this.textViews_.forEach(function(v) {
          var compElem = doc.createElement("div");
          compElem.classList.add(className$8("c"));
          compElem.appendChild(v.element);
          _this.textsElem_.appendChild(compElem);
        });
      };
      ColorTextView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      return ColorTextView2;
    }();
    var FORMATTER = createNumberFormatter(0);
    var MODE_TO_CONSTRAINT_MAP = {
      rgb: function() {
        return new RangeConstraint({min: 0, max: 255});
      },
      hsl: function(index) {
        return index === 0 ? new RangeConstraint({min: 0, max: 360}) : new RangeConstraint({min: 0, max: 100});
      },
      hsv: function(index) {
        return index === 0 ? new RangeConstraint({min: 0, max: 360}) : new RangeConstraint({min: 0, max: 100});
      }
    };
    function createComponentController(doc, config, index) {
      return new NumberTextController(doc, {
        arrayPosition: index === 0 ? "fst" : index === 3 - 1 ? "lst" : "mid",
        baseStep: getBaseStepForColor(false),
        parser: config.parser,
        props: new ValueMap({
          draggingScale: 1,
          formatter: FORMATTER
        }),
        value: new BoundValue(0, {
          constraint: MODE_TO_CONSTRAINT_MAP[config.colorMode](index)
        }),
        viewProps: config.viewProps
      });
    }
    var ColorTextController = function() {
      function ColorTextController2(doc, config) {
        this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
        this.parser_ = config.parser;
        this.pickedColor = config.pickedColor;
        this.viewProps = config.viewProps;
        this.ccs_ = this.createComponentControllers_(doc);
        this.view = new ColorTextView(doc, {
          pickedColor: this.pickedColor,
          textViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view]
        });
        this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_);
      }
      Object.defineProperty(ColorTextController2.prototype, "value", {
        get: function() {
          return this.pickedColor.value;
        },
        enumerable: false,
        configurable: true
      });
      ColorTextController2.prototype.createComponentControllers_ = function(doc) {
        var _this = this;
        var cc = {
          colorMode: this.pickedColor.mode,
          parser: this.parser_,
          viewProps: this.viewProps
        };
        var ccs = [
          createComponentController(doc, cc, 0),
          createComponentController(doc, cc, 1),
          createComponentController(doc, cc, 2)
        ];
        ccs.forEach(function(cs, index) {
          connectValues({
            primary: _this.value,
            secondary: cs.value,
            forward: function(p) {
              return p.rawValue.getComponents(_this.pickedColor.mode)[index];
            },
            backward: function(p, s) {
              var pickedMode = _this.pickedColor.mode;
              var comps = p.rawValue.getComponents(pickedMode);
              comps[index] = s.rawValue;
              return new Color(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode);
            }
          });
        });
        return ccs;
      };
      ColorTextController2.prototype.onModeSelectChange_ = function(ev) {
        var selectElem = ev.currentTarget;
        this.pickedColor.mode = selectElem.value;
        this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
        this.view.textViews = [
          this.ccs_[0].view,
          this.ccs_[1].view,
          this.ccs_[2].view
        ];
      };
      return ColorTextController2;
    }();
    var className$7 = ClassName("hpl");
    var HPaletteView = function() {
      function HPaletteView2(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.value = config.value;
        this.value.emitter.on("change", this.onValueChange_);
        this.element = doc.createElement("div");
        this.element.classList.add(className$7());
        bindTabIndex(config.viewProps, this.element);
        var colorElem = doc.createElement("div");
        colorElem.classList.add(className$7("c"));
        this.element.appendChild(colorElem);
        var markerElem = doc.createElement("div");
        markerElem.classList.add(className$7("m"));
        this.element.appendChild(markerElem);
        this.markerElem_ = markerElem;
        this.update_();
      }
      HPaletteView2.prototype.update_ = function() {
        var c = this.value.rawValue;
        var h = c.getComponents("hsv")[0];
        this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new Color([h, 100, 100], "hsv"));
        var left = mapRange(h, 0, 360, 0, 100);
        this.markerElem_.style.left = left + "%";
      };
      HPaletteView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      return HPaletteView2;
    }();
    var HPaletteController = function() {
      function HPaletteController2(doc, config) {
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new HPaletteView(doc, {
          value: this.value,
          viewProps: this.viewProps
        });
        this.ptHandler_ = new PointerHandler(this.view.element);
        this.ptHandler_.emitter.on("down", this.onPointerDown_);
        this.ptHandler_.emitter.on("move", this.onPointerMove_);
        this.ptHandler_.emitter.on("up", this.onPointerUp_);
        this.view.element.addEventListener("keydown", this.onKeyDown_);
      }
      HPaletteController2.prototype.handlePointerEvent_ = function(d) {
        if (!d.point) {
          return;
        }
        var hue = mapRange(d.point.x, 0, d.bounds.width, 0, 360);
        var c = this.value.rawValue;
        var _a2 = c.getComponents("hsv"), s = _a2[1], v = _a2[2], a = _a2[3];
        this.value.rawValue = new Color([hue, s, v, a], "hsv");
      };
      HPaletteController2.prototype.onPointerDown_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      HPaletteController2.prototype.onPointerMove_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      HPaletteController2.prototype.onPointerUp_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      HPaletteController2.prototype.onKeyDown_ = function(ev) {
        var step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
        var c = this.value.rawValue;
        var _a2 = c.getComponents("hsv"), h = _a2[0], s = _a2[1], v = _a2[2], a = _a2[3];
        this.value.rawValue = new Color([h + step, s, v, a], "hsv");
      };
      return HPaletteController2;
    }();
    var className$6 = ClassName("svp");
    var CANVAS_RESOL = 64;
    var SvPaletteView = function() {
      function SvPaletteView2(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.value = config.value;
        this.value.emitter.on("change", this.onValueChange_);
        this.element = doc.createElement("div");
        this.element.classList.add(className$6());
        bindTabIndex(config.viewProps, this.element);
        var canvasElem = doc.createElement("canvas");
        canvasElem.height = CANVAS_RESOL;
        canvasElem.width = CANVAS_RESOL;
        canvasElem.classList.add(className$6("c"));
        this.element.appendChild(canvasElem);
        this.canvasElement = canvasElem;
        var markerElem = doc.createElement("div");
        markerElem.classList.add(className$6("m"));
        this.element.appendChild(markerElem);
        this.markerElem_ = markerElem;
        this.update_();
      }
      SvPaletteView2.prototype.update_ = function() {
        var ctx = getCanvasContext(this.canvasElement);
        if (!ctx) {
          return;
        }
        var c = this.value.rawValue;
        var hsvComps = c.getComponents("hsv");
        var width = this.canvasElement.width;
        var height = this.canvasElement.height;
        var imgData = ctx.getImageData(0, 0, width, height);
        var data = imgData.data;
        for (var iy = 0; iy < height; iy++) {
          for (var ix = 0; ix < width; ix++) {
            var s = mapRange(ix, 0, width, 0, 100);
            var v = mapRange(iy, 0, height, 100, 0);
            var rgbComps = hsvToRgb(hsvComps[0], s, v);
            var i = (iy * width + ix) * 4;
            data[i] = rgbComps[0];
            data[i + 1] = rgbComps[1];
            data[i + 2] = rgbComps[2];
            data[i + 3] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        var left = mapRange(hsvComps[1], 0, 100, 0, 100);
        this.markerElem_.style.left = left + "%";
        var top = mapRange(hsvComps[2], 0, 100, 100, 0);
        this.markerElem_.style.top = top + "%";
      };
      SvPaletteView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      return SvPaletteView2;
    }();
    var SvPaletteController = function() {
      function SvPaletteController2(doc, config) {
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new SvPaletteView(doc, {
          value: this.value,
          viewProps: this.viewProps
        });
        this.ptHandler_ = new PointerHandler(this.view.element);
        this.ptHandler_.emitter.on("down", this.onPointerDown_);
        this.ptHandler_.emitter.on("move", this.onPointerMove_);
        this.ptHandler_.emitter.on("up", this.onPointerUp_);
        this.view.element.addEventListener("keydown", this.onKeyDown_);
      }
      SvPaletteController2.prototype.handlePointerEvent_ = function(d) {
        if (!d.point) {
          return;
        }
        var saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
        var value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
        var _a2 = this.value.rawValue.getComponents("hsv"), h = _a2[0], a = _a2[3];
        this.value.rawValue = new Color([h, saturation, value, a], "hsv");
      };
      SvPaletteController2.prototype.onPointerDown_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      SvPaletteController2.prototype.onPointerMove_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      SvPaletteController2.prototype.onPointerUp_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      SvPaletteController2.prototype.onKeyDown_ = function(ev) {
        if (isArrowKey(ev.key)) {
          ev.preventDefault();
        }
        var _a2 = this.value.rawValue.getComponents("hsv"), h = _a2[0], s = _a2[1], v = _a2[2], a = _a2[3];
        var baseStep = getBaseStepForColor(false);
        this.value.rawValue = new Color([
          h,
          s + getStepForKey(baseStep, getHorizontalStepKeys(ev)),
          v + getStepForKey(baseStep, getVerticalStepKeys(ev)),
          a
        ], "hsv");
      };
      return SvPaletteController2;
    }();
    var ColorPickerController = function() {
      function ColorPickerController2(doc, config) {
        var _this = this;
        this.triggerElement = null;
        this.onFocusableElementBlur_ = this.onFocusableElementBlur_.bind(this);
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.pickedColor = config.pickedColor;
        this.viewProps = config.viewProps;
        this.expanded = new PrimitiveValue(false);
        this.hPaletteIc_ = new HPaletteController(doc, {
          value: this.pickedColor.value,
          viewProps: this.viewProps
        });
        this.svPaletteIc_ = new SvPaletteController(doc, {
          value: this.pickedColor.value,
          viewProps: this.viewProps
        });
        this.alphaIcs_ = config.supportsAlpha ? {
          palette: new APaletteController(doc, {
            value: this.pickedColor.value,
            viewProps: this.viewProps
          }),
          text: new NumberTextController(doc, {
            parser: parseNumber,
            baseStep: 0.1,
            props: new ValueMap({
              draggingScale: 0.01,
              formatter: createNumberFormatter(2)
            }),
            value: new BoundValue(0, {
              constraint: new RangeConstraint({min: 0, max: 1})
            }),
            viewProps: this.viewProps
          })
        } : null;
        if (this.alphaIcs_) {
          connectValues({
            primary: this.pickedColor.value,
            secondary: this.alphaIcs_.text.value,
            forward: function(p) {
              return p.rawValue.getComponents()[3];
            },
            backward: function(p, s) {
              var comps = p.rawValue.getComponents();
              comps[3] = s.rawValue;
              return new Color(comps, p.rawValue.mode);
            }
          });
        }
        this.tc_ = new ColorTextController(doc, {
          parser: parseNumber,
          pickedColor: this.pickedColor,
          viewProps: this.viewProps
        });
        this.view = new ColorPickerView(doc, {
          alphaViews: this.alphaIcs_ ? {
            palette: this.alphaIcs_.palette.view,
            text: this.alphaIcs_.text.view
          } : null,
          expanded: this.expanded,
          hPaletteView: this.hPaletteIc_.view,
          pickedColor: this.pickedColor,
          supportsAlpha: config.supportsAlpha,
          svPaletteView: this.svPaletteIc_.view,
          textView: this.tc_.view
        });
        this.view.element.addEventListener("keydown", this.onKeyDown_);
        this.view.allFocusableElements.forEach(function(elem) {
          elem.addEventListener("blur", _this.onFocusableElementBlur_);
        });
      }
      Object.defineProperty(ColorPickerController2.prototype, "value", {
        get: function() {
          return this.pickedColor.value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ColorPickerController2.prototype, "textController", {
        get: function() {
          return this.tc_;
        },
        enumerable: false,
        configurable: true
      });
      ColorPickerController2.prototype.onFocusableElementBlur_ = function(ev) {
        var elem = this.view.element;
        var nextTarget = findNextTarget(ev);
        if (nextTarget && elem.contains(nextTarget)) {
          return;
        }
        if (nextTarget && nextTarget === this.triggerElement && !supportsTouch(elem.ownerDocument)) {
          return;
        }
        this.expanded.rawValue = false;
      };
      ColorPickerController2.prototype.onKeyDown_ = function(ev) {
        if (ev.key === "Escape") {
          this.expanded.rawValue = false;
        }
      };
      return ColorPickerController2;
    }();
    var ColorSwatchController = function() {
      function ColorSwatchController2(doc, config) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this);
        this.onButtonClick_ = this.onButtonClick_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.pickerIc_ = new ColorPickerController(doc, {
          pickedColor: new PickedColor(this.value),
          supportsAlpha: config.supportsAlpha,
          viewProps: this.viewProps
        });
        this.view = new ColorSwatchView(doc, {
          pickerView: this.pickerIc_.view,
          value: this.value,
          viewProps: this.viewProps
        });
        this.view.buttonElement.addEventListener("blur", this.onButtonBlur_);
        this.view.buttonElement.addEventListener("click", this.onButtonClick_);
        this.pickerIc_.triggerElement = this.view.buttonElement;
      }
      ColorSwatchController2.prototype.onButtonBlur_ = function(e) {
        var elem = this.view.element;
        var nextTarget = forceCast(e.relatedTarget);
        if (!nextTarget || !elem.contains(nextTarget)) {
          this.pickerIc_.expanded.rawValue = false;
        }
      };
      ColorSwatchController2.prototype.onButtonClick_ = function() {
        this.pickerIc_.expanded.rawValue = !this.pickerIc_.expanded.rawValue;
        if (this.pickerIc_.expanded.rawValue) {
          this.pickerIc_.view.allFocusableElements[0].focus();
        }
      };
      return ColorSwatchController2;
    }();
    var ColorSwatchTextController = function() {
      function ColorSwatchTextController2(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.swatchIc_ = new ColorSwatchController(doc, {
          supportsAlpha: config.supportsAlpha,
          value: this.value,
          viewProps: this.viewProps
        });
        this.textIc_ = new TextController(doc, {
          parser: config.parser,
          props: new ValueMap({
            formatter: config.formatter
          }),
          value: this.value,
          viewProps: this.viewProps
        });
        this.view = new ColorSwatchTextView(doc, {
          swatchView: this.swatchIc_.view,
          textView: this.textIc_.view
        });
      }
      return ColorSwatchTextController2;
    }();
    function colorFromObject(value) {
      if (Color.isColorObject(value)) {
        return Color.fromObject(value);
      }
      return Color.black();
    }
    function colorToRgbNumber(value) {
      return removeAlphaComponent(value.getComponents("rgb")).reduce(function(result, comp) {
        return result << 8 | Math.floor(comp) & 255;
      }, 0);
    }
    function colorToRgbaNumber(value) {
      return value.getComponents("rgb").reduce(function(result, comp, index) {
        var hex = Math.floor(index === 3 ? comp * 255 : comp) & 255;
        return result << 8 | hex;
      }, 0) >>> 0;
    }
    function numberToRgbColor(num) {
      return new Color([num >> 16 & 255, num >> 8 & 255, num & 255], "rgb");
    }
    function numberToRgbaColor(num) {
      return new Color([
        num >> 24 & 255,
        num >> 16 & 255,
        num >> 8 & 255,
        mapRange(num & 255, 0, 255, 0, 1)
      ], "rgb");
    }
    function colorFromRgbNumber(value) {
      if (typeof value !== "number") {
        return Color.black();
      }
      return numberToRgbColor(value);
    }
    function colorFromRgbaNumber(value) {
      if (typeof value !== "number") {
        return Color.black();
      }
      return numberToRgbaColor(value);
    }
    function createColorStringWriter(notation) {
      var stringify = getColorStringifier(notation);
      return function(target, value) {
        writePrimitive(target, stringify(value));
      };
    }
    function createColorNumberWriter(supportsAlpha) {
      var colorToNumber = supportsAlpha ? colorToRgbaNumber : colorToRgbNumber;
      return function(target, value) {
        writePrimitive(target, colorToNumber(value));
      };
    }
    function writeRgbaColorObject(target, value) {
      var obj = value.toRgbaObject();
      target.writeProperty("r", obj.r);
      target.writeProperty("g", obj.g);
      target.writeProperty("b", obj.b);
      target.writeProperty("a", obj.a);
    }
    function writeRgbColorObject(target, value) {
      var obj = value.toRgbaObject();
      target.writeProperty("r", obj.r);
      target.writeProperty("g", obj.g);
      target.writeProperty("b", obj.b);
    }
    function createColorObjectWriter(supportsAlpha) {
      return supportsAlpha ? writeRgbaColorObject : writeRgbColorObject;
    }
    function shouldSupportAlpha$1(inputParams) {
      return "input" in inputParams && inputParams.input === "color.rgba";
    }
    var NumberColorInputPlugin = {
      id: "input-color-number",
      accept: function(value, params) {
        if (typeof value !== "number") {
          return null;
        }
        if (!("input" in params)) {
          return null;
        }
        if (params.input !== "color" && params.input !== "color.rgb" && params.input !== "color.rgba") {
          return null;
        }
        return value;
      },
      binding: {
        reader: function(args) {
          return shouldSupportAlpha$1(args.params) ? colorFromRgbaNumber : colorFromRgbNumber;
        },
        equals: Color.equals,
        writer: function(args) {
          return createColorNumberWriter(shouldSupportAlpha$1(args.params));
        }
      },
      controller: function(args) {
        var supportsAlpha = shouldSupportAlpha$1(args.params);
        var formatter = supportsAlpha ? colorToHexRgbaString : colorToHexRgbString;
        return new ColorSwatchTextController(args.document, {
          formatter,
          parser: CompositeColorParser,
          supportsAlpha,
          value: args.value,
          viewProps: args.viewProps
        });
      }
    };
    function shouldSupportAlpha(initialValue) {
      return Color.isRgbaColorObject(initialValue);
    }
    var ObjectColorInputPlugin = {
      id: "input-color-object",
      accept: function(value, _params) {
        return Color.isColorObject(value) ? value : null;
      },
      binding: {
        reader: function(_args) {
          return colorFromObject;
        },
        equals: Color.equals,
        writer: function(args) {
          return createColorObjectWriter(shouldSupportAlpha(args.initialValue));
        }
      },
      controller: function(args) {
        var supportsAlpha = Color.isRgbaColorObject(args.initialValue);
        var formatter = supportsAlpha ? colorToHexRgbaString : colorToHexRgbString;
        return new ColorSwatchTextController(args.document, {
          formatter,
          parser: CompositeColorParser,
          supportsAlpha,
          value: args.value,
          viewProps: args.viewProps
        });
      }
    };
    var StringColorInputPlugin = {
      id: "input-color-string",
      accept: function(value, params) {
        if (typeof value !== "string") {
          return null;
        }
        if ("input" in params && params.input === "string") {
          return null;
        }
        var notation = getColorNotation(value);
        if (!notation) {
          return null;
        }
        return value;
      },
      binding: {
        reader: function(_args) {
          return colorFromString;
        },
        equals: Color.equals,
        writer: function(args) {
          var notation = getColorNotation(args.initialValue);
          if (!notation) {
            throw TpError.shouldNeverHappen();
          }
          return createColorStringWriter(notation);
        }
      },
      controller: function(args) {
        var notation = getColorNotation(args.initialValue);
        if (!notation) {
          throw TpError.shouldNeverHappen();
        }
        var stringifier = getColorStringifier(notation);
        return new ColorSwatchTextController(args.document, {
          formatter: stringifier,
          parser: CompositeColorParser,
          supportsAlpha: hasAlphaComponent(notation),
          value: args.value,
          viewProps: args.viewProps
        });
      }
    };
    function createStepConstraint(params) {
      if ("step" in params && !isEmpty(params.step)) {
        return new StepConstraint(params.step);
      }
      return null;
    }
    function createRangeConstraint(params) {
      if ("max" in params && !isEmpty(params.max) || "min" in params && !isEmpty(params.min)) {
        return new RangeConstraint({
          max: params.max,
          min: params.min
        });
      }
      return null;
    }
    function createConstraint$4(params) {
      var constraints = [];
      var sc = createStepConstraint(params);
      if (sc) {
        constraints.push(sc);
      }
      var rc = createRangeConstraint(params);
      if (rc) {
        constraints.push(rc);
      }
      var lc = createListConstraint(params);
      if (lc) {
        constraints.push(lc);
      }
      return new CompositeConstraint(constraints);
    }
    function findRange(constraint) {
      var c = constraint ? findConstraint(constraint, RangeConstraint) : null;
      if (!c) {
        return [void 0, void 0];
      }
      return [c.minValue, c.maxValue];
    }
    function estimateSuitableRange(constraint) {
      var _a2 = findRange(constraint), min4 = _a2[0], max4 = _a2[1];
      return [min4 !== null && min4 !== void 0 ? min4 : 0, max4 !== null && max4 !== void 0 ? max4 : 100];
    }
    var NumberInputPlugin = {
      id: "input-number",
      accept: function(value) {
        return typeof value === "number" ? value : null;
      },
      binding: {
        reader: function(_args) {
          return numberFromUnknown;
        },
        constraint: function(args) {
          return createConstraint$4(args.params);
        },
        writer: function(_args) {
          return writePrimitive;
        }
      },
      controller: function(args) {
        var _a2, _b;
        var value = args.value;
        var c = args.constraint;
        if (c && findConstraint(c, ListConstraint)) {
          return new ListController(args.document, {
            props: new ValueMap({
              options: (_a2 = findListItems(c)) !== null && _a2 !== void 0 ? _a2 : []
            }),
            value,
            viewProps: args.viewProps
          });
        }
        var formatter = (_b = "format" in args.params ? args.params.format : void 0) !== null && _b !== void 0 ? _b : createNumberFormatter(getSuitableDecimalDigits(c, value.rawValue));
        if (c && findConstraint(c, RangeConstraint)) {
          var _c = estimateSuitableRange(c), min4 = _c[0], max4 = _c[1];
          return new SliderTextController(args.document, {
            baseStep: getBaseStep(c),
            parser: parseNumber,
            sliderProps: new ValueMap({
              maxValue: max4,
              minValue: min4
            }),
            textProps: new ValueMap({
              draggingScale: getSuitableDraggingScale(c, value.rawValue),
              formatter
            }),
            value,
            viewProps: args.viewProps
          });
        }
        return new NumberTextController(args.document, {
          baseStep: getBaseStep(c),
          parser: parseNumber,
          props: new ValueMap({
            draggingScale: getSuitableDraggingScale(c, value.rawValue),
            formatter
          }),
          value,
          viewProps: args.viewProps
        });
      }
    };
    var PointNdConstraint = function() {
      function PointNdConstraint2(config) {
        this.components = config.components;
        this.asm_ = config.assembly;
      }
      PointNdConstraint2.prototype.constrain = function(value) {
        var _this = this;
        var comps = this.asm_.toComponents(value).map(function(comp, index) {
          var _a2, _b;
          return (_b = (_a2 = _this.components[index]) === null || _a2 === void 0 ? void 0 : _a2.constrain(comp)) !== null && _b !== void 0 ? _b : comp;
        });
        return this.asm_.fromComponents(comps);
      };
      return PointNdConstraint2;
    }();
    var className$5 = ClassName("pndtxt");
    var PointNdTextView = function() {
      function PointNdTextView2(doc, config) {
        var _this = this;
        this.textViews = config.textViews;
        this.element = doc.createElement("div");
        this.element.classList.add(className$5());
        this.textViews.forEach(function(v) {
          var axisElem = doc.createElement("div");
          axisElem.classList.add(className$5("a"));
          axisElem.appendChild(v.element);
          _this.element.appendChild(axisElem);
        });
      }
      return PointNdTextView2;
    }();
    function createAxisController(doc, config, index) {
      return new NumberTextController(doc, {
        arrayPosition: index === 0 ? "fst" : index === config.axes.length - 1 ? "lst" : "mid",
        baseStep: config.axes[index].baseStep,
        parser: config.parser,
        props: config.axes[index].textProps,
        value: new BoundValue(0, {
          constraint: config.axes[index].constraint
        }),
        viewProps: config.viewProps
      });
    }
    var PointNdTextController = function() {
      function PointNdTextController2(doc, config) {
        var _this = this;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.acs_ = config.axes.map(function(_, index) {
          return createAxisController(doc, config, index);
        });
        this.acs_.forEach(function(c, index) {
          connectValues({
            primary: _this.value,
            secondary: c.value,
            forward: function(p) {
              return config.assembly.toComponents(p.rawValue)[index];
            },
            backward: function(p, s) {
              var comps = config.assembly.toComponents(p.rawValue);
              comps[index] = s.rawValue;
              return config.assembly.fromComponents(comps);
            }
          });
        });
        this.view = new PointNdTextView(doc, {
          textViews: this.acs_.map(function(ac) {
            return ac.view;
          })
        });
      }
      return PointNdTextController2;
    }();
    var Point2d = function() {
      function Point2d2(x, y) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        this.x = x;
        this.y = y;
      }
      Point2d2.prototype.getComponents = function() {
        return [this.x, this.y];
      };
      Point2d2.isObject = function(obj) {
        if (isEmpty(obj)) {
          return false;
        }
        var x = obj.x;
        var y = obj.y;
        if (typeof x !== "number" || typeof y !== "number") {
          return false;
        }
        return true;
      };
      Point2d2.equals = function(v1, v2) {
        return v1.x === v2.x && v1.y === v2.y;
      };
      Point2d2.prototype.toObject = function() {
        return {
          x: this.x,
          y: this.y
        };
      };
      return Point2d2;
    }();
    var Point2dAssembly = {
      toComponents: function(p) {
        return p.getComponents();
      },
      fromComponents: function(comps) {
        return new (Point2d.bind.apply(Point2d, __spreadArrays([void 0], comps)))();
      }
    };
    var className$4 = ClassName("p2dpadtxt");
    var Point2dPadTextView = function() {
      function Point2dPadTextView2(doc, config) {
        this.element = doc.createElement("div");
        this.element.classList.add(className$4());
        bindClassModifier(config.viewProps, this.element);
        var padWrapperElem = doc.createElement("div");
        padWrapperElem.classList.add(className$4("w"));
        this.element.appendChild(padWrapperElem);
        var buttonElem = doc.createElement("button");
        buttonElem.classList.add(className$4("b"));
        buttonElem.appendChild(createSvgIconElement(doc, "p2dpad"));
        bindDisabled(config.viewProps, buttonElem);
        padWrapperElem.appendChild(buttonElem);
        this.padButtonElem_ = buttonElem;
        var padElem = doc.createElement("div");
        padElem.classList.add(className$4("p"));
        padWrapperElem.appendChild(padElem);
        this.padView_ = config.padView;
        padElem.appendChild(this.padView_.element);
        var textElem = doc.createElement("div");
        textElem.classList.add(className$4("t"));
        this.textView_ = config.textView;
        textElem.appendChild(this.textView_.element);
        this.element.appendChild(textElem);
      }
      Object.defineProperty(Point2dPadTextView2.prototype, "padButtonElement", {
        get: function() {
          return this.padButtonElem_;
        },
        enumerable: false,
        configurable: true
      });
      return Point2dPadTextView2;
    }();
    var className$3 = ClassName("p2dpad");
    var Point2dPadView = function() {
      function Point2dPadView2(doc, config) {
        this.onFoldableChange_ = this.onFoldableChange_.bind(this);
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.expanded_ = config.expanded;
        this.expanded_.emitter.on("change", this.onFoldableChange_);
        this.invertsY_ = config.invertsY;
        this.maxValue_ = config.maxValue;
        this.element = doc.createElement("div");
        this.element.classList.add(className$3());
        var padElem = doc.createElement("div");
        padElem.classList.add(className$3("p"));
        bindTabIndex(config.viewProps, padElem);
        this.element.appendChild(padElem);
        this.padElement = padElem;
        var svgElem = doc.createElementNS(SVG_NS, "svg");
        svgElem.classList.add(className$3("g"));
        this.padElement.appendChild(svgElem);
        this.svgElem_ = svgElem;
        var xAxisElem = doc.createElementNS(SVG_NS, "line");
        xAxisElem.classList.add(className$3("ax"));
        xAxisElem.setAttributeNS(null, "x1", "0");
        xAxisElem.setAttributeNS(null, "y1", "50%");
        xAxisElem.setAttributeNS(null, "x2", "100%");
        xAxisElem.setAttributeNS(null, "y2", "50%");
        this.svgElem_.appendChild(xAxisElem);
        var yAxisElem = doc.createElementNS(SVG_NS, "line");
        yAxisElem.classList.add(className$3("ax"));
        yAxisElem.setAttributeNS(null, "x1", "50%");
        yAxisElem.setAttributeNS(null, "y1", "0");
        yAxisElem.setAttributeNS(null, "x2", "50%");
        yAxisElem.setAttributeNS(null, "y2", "100%");
        this.svgElem_.appendChild(yAxisElem);
        var lineElem = doc.createElementNS(SVG_NS, "line");
        lineElem.classList.add(className$3("l"));
        lineElem.setAttributeNS(null, "x1", "50%");
        lineElem.setAttributeNS(null, "y1", "50%");
        this.svgElem_.appendChild(lineElem);
        this.lineElem_ = lineElem;
        var markerElem = doc.createElementNS(SVG_NS, "circle");
        markerElem.classList.add(className$3("m"));
        markerElem.setAttributeNS(null, "r", "2px");
        this.svgElem_.appendChild(markerElem);
        this.markerElem_ = markerElem;
        config.value.emitter.on("change", this.onValueChange_);
        this.value = config.value;
        this.update_();
      }
      Object.defineProperty(Point2dPadView2.prototype, "allFocusableElements", {
        get: function() {
          return [this.padElement];
        },
        enumerable: false,
        configurable: true
      });
      Point2dPadView2.prototype.update_ = function() {
        if (this.expanded_.rawValue) {
          this.element.classList.add(className$3(void 0, "expanded"));
        } else {
          this.element.classList.remove(className$3(void 0, "expanded"));
        }
        var _a2 = this.value.rawValue.getComponents(), x = _a2[0], y = _a2[1];
        var max4 = this.maxValue_;
        var px = mapRange(x, -max4, +max4, 0, 100);
        var py = mapRange(y, -max4, +max4, 0, 100);
        var ipy = this.invertsY_ ? 100 - py : py;
        this.lineElem_.setAttributeNS(null, "x2", px + "%");
        this.lineElem_.setAttributeNS(null, "y2", ipy + "%");
        this.markerElem_.setAttributeNS(null, "cx", px + "%");
        this.markerElem_.setAttributeNS(null, "cy", ipy + "%");
      };
      Point2dPadView2.prototype.onValueChange_ = function() {
        this.update_();
      };
      Point2dPadView2.prototype.onFoldableChange_ = function() {
        this.update_();
      };
      return Point2dPadView2;
    }();
    var Point2dPadController = function() {
      function Point2dPadController2(doc, config) {
        var _this = this;
        this.triggerElement = null;
        this.onFocusableElementBlur_ = this.onFocusableElementBlur_.bind(this);
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.expanded = new PrimitiveValue(false);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.baseSteps_ = config.baseSteps;
        this.maxValue_ = config.maxValue;
        this.invertsY_ = config.invertsY;
        this.view = new Point2dPadView(doc, {
          expanded: this.expanded,
          invertsY: this.invertsY_,
          maxValue: this.maxValue_,
          value: this.value,
          viewProps: this.viewProps
        });
        this.ptHandler_ = new PointerHandler(this.view.padElement);
        this.ptHandler_.emitter.on("down", this.onPointerDown_);
        this.ptHandler_.emitter.on("move", this.onPointerMove_);
        this.ptHandler_.emitter.on("up", this.onPointerUp_);
        this.view.padElement.addEventListener("keydown", this.onPadKeyDown_);
        this.view.element.addEventListener("keydown", this.onKeyDown_);
        this.view.allFocusableElements.forEach(function(elem) {
          elem.addEventListener("blur", _this.onFocusableElementBlur_);
        });
      }
      Point2dPadController2.prototype.handlePointerEvent_ = function(d) {
        if (!d.point) {
          return;
        }
        var max4 = this.maxValue_;
        var px = mapRange(d.point.x, 0, d.bounds.width, -max4, +max4);
        var py = mapRange(this.invertsY_ ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max4, +max4);
        this.value.rawValue = new Point2d(px, py);
      };
      Point2dPadController2.prototype.onPointerDown_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      Point2dPadController2.prototype.onPointerMove_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      Point2dPadController2.prototype.onPointerUp_ = function(ev) {
        this.handlePointerEvent_(ev.data);
      };
      Point2dPadController2.prototype.onPadKeyDown_ = function(ev) {
        if (isArrowKey(ev.key)) {
          ev.preventDefault();
        }
        this.value.rawValue = new Point2d(this.value.rawValue.x + getStepForKey(this.baseSteps_[0], getHorizontalStepKeys(ev)), this.value.rawValue.y + getStepForKey(this.baseSteps_[1], getVerticalStepKeys(ev)) * (this.invertsY_ ? 1 : -1));
      };
      Point2dPadController2.prototype.onFocusableElementBlur_ = function(ev) {
        var elem = this.view.element;
        var nextTarget = findNextTarget(ev);
        if (nextTarget && elem.contains(nextTarget)) {
          return;
        }
        if (nextTarget && nextTarget === this.triggerElement && !supportsTouch(elem.ownerDocument)) {
          return;
        }
        this.expanded.rawValue = false;
      };
      Point2dPadController2.prototype.onKeyDown_ = function(ev) {
        if (ev.key === "Escape") {
          this.expanded.rawValue = false;
        }
      };
      return Point2dPadController2;
    }();
    var Point2dPadTextController = function() {
      function Point2dPadTextController2(doc, config) {
        this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
        this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.padIc_ = new Point2dPadController(doc, {
          baseSteps: [config.axes[0].baseStep, config.axes[1].baseStep],
          invertsY: config.invertsY,
          maxValue: config.maxValue,
          value: this.value,
          viewProps: this.viewProps
        });
        this.textIc_ = new PointNdTextController(doc, {
          assembly: Point2dAssembly,
          axes: config.axes,
          parser: config.parser,
          value: this.value,
          viewProps: this.viewProps
        });
        this.view = new Point2dPadTextView(doc, {
          padView: this.padIc_.view,
          textView: this.textIc_.view,
          viewProps: this.viewProps
        });
        this.view.padButtonElement.addEventListener("blur", this.onPadButtonBlur_);
        this.view.padButtonElement.addEventListener("click", this.onPadButtonClick_);
        this.padIc_.triggerElement = this.view.padButtonElement;
      }
      Point2dPadTextController2.prototype.onPadButtonBlur_ = function(e) {
        var elem = this.view.element;
        var nextTarget = forceCast(e.relatedTarget);
        if (!nextTarget || !elem.contains(nextTarget)) {
          this.padIc_.expanded.rawValue = false;
        }
      };
      Point2dPadTextController2.prototype.onPadButtonClick_ = function() {
        this.padIc_.expanded.rawValue = !this.padIc_.expanded.rawValue;
        if (this.padIc_.expanded.rawValue) {
          this.padIc_.view.allFocusableElements[0].focus();
        }
      };
      return Point2dPadTextController2;
    }();
    function point2dFromUnknown(value) {
      return Point2d.isObject(value) ? new Point2d(value.x, value.y) : new Point2d();
    }
    function writePoint2d(target, value) {
      target.writeProperty("x", value.x);
      target.writeProperty("y", value.y);
    }
    function createDimensionConstraint$2(params) {
      if (!params) {
        return void 0;
      }
      var constraints = [];
      if (!isEmpty(params.step)) {
        constraints.push(new StepConstraint(params.step));
      }
      if (!isEmpty(params.max) || !isEmpty(params.min)) {
        constraints.push(new RangeConstraint({
          max: params.max,
          min: params.min
        }));
      }
      return new CompositeConstraint(constraints);
    }
    function createConstraint$3(params) {
      return new PointNdConstraint({
        assembly: Point2dAssembly,
        components: [
          createDimensionConstraint$2("x" in params ? params.x : void 0),
          createDimensionConstraint$2("y" in params ? params.y : void 0)
        ]
      });
    }
    function getSuitableMaxDimensionValue(constraint, rawValue) {
      var rc = constraint && findConstraint(constraint, RangeConstraint);
      if (rc) {
        return Math.max(Math.abs(rc.minValue || 0), Math.abs(rc.maxValue || 0));
      }
      var step = getBaseStep(constraint);
      return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
    }
    function getSuitableMaxValue(initialValue, constraint) {
      var xc = constraint instanceof PointNdConstraint ? constraint.components[0] : void 0;
      var yc = constraint instanceof PointNdConstraint ? constraint.components[1] : void 0;
      var xr = getSuitableMaxDimensionValue(xc, initialValue.x);
      var yr = getSuitableMaxDimensionValue(yc, initialValue.y);
      return Math.max(xr, yr);
    }
    function createAxis$2(initialValue, constraint) {
      return {
        baseStep: getBaseStep(constraint),
        constraint,
        textProps: new ValueMap({
          draggingScale: getSuitableDraggingScale(constraint, initialValue),
          formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
        })
      };
    }
    function shouldInvertY(params) {
      if (!("y" in params)) {
        return false;
      }
      var yParams = params.y;
      if (!yParams) {
        return false;
      }
      return "inverted" in yParams ? !!yParams.inverted : false;
    }
    var Point2dInputPlugin = {
      id: "input-point2d",
      accept: function(value, _params) {
        return Point2d.isObject(value) ? value : null;
      },
      binding: {
        reader: function(_args) {
          return point2dFromUnknown;
        },
        constraint: function(args) {
          return createConstraint$3(args.params);
        },
        equals: Point2d.equals,
        writer: function(_args) {
          return writePoint2d;
        }
      },
      controller: function(args) {
        var doc = args.document;
        var value = args.value;
        var c = args.constraint;
        if (!(c instanceof PointNdConstraint)) {
          throw TpError.shouldNeverHappen();
        }
        return new Point2dPadTextController(doc, {
          axes: [
            createAxis$2(value.rawValue.x, c.components[0]),
            createAxis$2(value.rawValue.y, c.components[1])
          ],
          invertsY: shouldInvertY(args.params),
          maxValue: getSuitableMaxValue(value.rawValue, c),
          parser: parseNumber,
          value,
          viewProps: args.viewProps
        });
      }
    };
    var Point3d = function() {
      function Point3d2(x, y, z) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        if (z === void 0) {
          z = 0;
        }
        this.x = x;
        this.y = y;
        this.z = z;
      }
      Point3d2.prototype.getComponents = function() {
        return [this.x, this.y, this.z];
      };
      Point3d2.isObject = function(obj) {
        if (isEmpty(obj)) {
          return false;
        }
        var x = obj.x;
        var y = obj.y;
        var z = obj.z;
        if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
          return false;
        }
        return true;
      };
      Point3d2.equals = function(v1, v2) {
        return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
      };
      Point3d2.prototype.toObject = function() {
        return {
          x: this.x,
          y: this.y,
          z: this.z
        };
      };
      return Point3d2;
    }();
    var Point3dAssembly = {
      toComponents: function(p) {
        return p.getComponents();
      },
      fromComponents: function(comps) {
        return new (Point3d.bind.apply(Point3d, __spreadArrays([void 0], comps)))();
      }
    };
    function point3dFromUnknown(value) {
      return Point3d.isObject(value) ? new Point3d(value.x, value.y, value.z) : new Point3d();
    }
    function writePoint3d(target, value) {
      target.writeProperty("x", value.x);
      target.writeProperty("y", value.y);
      target.writeProperty("z", value.z);
    }
    function createDimensionConstraint$1(params) {
      if (!params) {
        return void 0;
      }
      var constraints = [];
      if (!isEmpty(params.step)) {
        constraints.push(new StepConstraint(params.step));
      }
      if (!isEmpty(params.max) || !isEmpty(params.min)) {
        constraints.push(new RangeConstraint({
          max: params.max,
          min: params.min
        }));
      }
      return new CompositeConstraint(constraints);
    }
    function createConstraint$2(params) {
      return new PointNdConstraint({
        assembly: Point3dAssembly,
        components: [
          createDimensionConstraint$1("x" in params ? params.x : void 0),
          createDimensionConstraint$1("y" in params ? params.y : void 0),
          createDimensionConstraint$1("z" in params ? params.z : void 0)
        ]
      });
    }
    function createAxis$1(initialValue, constraint) {
      return {
        baseStep: getBaseStep(constraint),
        constraint,
        textProps: new ValueMap({
          draggingScale: getSuitableDraggingScale(constraint, initialValue),
          formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
        })
      };
    }
    var Point3dInputPlugin = {
      id: "input-point3d",
      accept: function(value, _params) {
        return Point3d.isObject(value) ? value : null;
      },
      binding: {
        reader: function(_args) {
          return point3dFromUnknown;
        },
        constraint: function(args) {
          return createConstraint$2(args.params);
        },
        equals: Point3d.equals,
        writer: function(_args) {
          return writePoint3d;
        }
      },
      controller: function(args) {
        var value = args.value;
        var c = args.constraint;
        if (!(c instanceof PointNdConstraint)) {
          throw TpError.shouldNeverHappen();
        }
        return new PointNdTextController(args.document, {
          assembly: Point3dAssembly,
          axes: [
            createAxis$1(value.rawValue.x, c.components[0]),
            createAxis$1(value.rawValue.y, c.components[1]),
            createAxis$1(value.rawValue.z, c.components[2])
          ],
          parser: parseNumber,
          value,
          viewProps: args.viewProps
        });
      }
    };
    var Point4d = function() {
      function Point4d2(x, y, z, w) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        if (z === void 0) {
          z = 0;
        }
        if (w === void 0) {
          w = 0;
        }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      }
      Point4d2.prototype.getComponents = function() {
        return [this.x, this.y, this.z, this.w];
      };
      Point4d2.isObject = function(obj) {
        if (isEmpty(obj)) {
          return false;
        }
        var x = obj.x;
        var y = obj.y;
        var z = obj.z;
        var w = obj.w;
        if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number" || typeof w !== "number") {
          return false;
        }
        return true;
      };
      Point4d2.equals = function(v1, v2) {
        return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
      };
      Point4d2.prototype.toObject = function() {
        return {
          x: this.x,
          y: this.y,
          z: this.z,
          w: this.w
        };
      };
      return Point4d2;
    }();
    var Point4dAssembly = {
      toComponents: function(p) {
        return p.getComponents();
      },
      fromComponents: function(comps) {
        return new (Point4d.bind.apply(Point4d, __spreadArrays([void 0], comps)))();
      }
    };
    function point4dFromUnknown(value) {
      return Point4d.isObject(value) ? new Point4d(value.x, value.y, value.z, value.w) : new Point4d();
    }
    function writePoint4d(target, value) {
      target.writeProperty("x", value.x);
      target.writeProperty("y", value.y);
      target.writeProperty("z", value.z);
      target.writeProperty("w", value.w);
    }
    function createDimensionConstraint(params) {
      if (!params) {
        return void 0;
      }
      var constraints = [];
      if (!isEmpty(params.step)) {
        constraints.push(new StepConstraint(params.step));
      }
      if (!isEmpty(params.max) || !isEmpty(params.min)) {
        constraints.push(new RangeConstraint({
          max: params.max,
          min: params.min
        }));
      }
      return new CompositeConstraint(constraints);
    }
    function createConstraint$1(params) {
      return new PointNdConstraint({
        assembly: Point4dAssembly,
        components: [
          createDimensionConstraint("x" in params ? params.x : void 0),
          createDimensionConstraint("y" in params ? params.y : void 0),
          createDimensionConstraint("z" in params ? params.z : void 0),
          createDimensionConstraint("w" in params ? params.w : void 0)
        ]
      });
    }
    function createAxis(initialValue, constraint) {
      return {
        baseStep: getBaseStep(constraint),
        constraint,
        textProps: new ValueMap({
          draggingScale: getSuitableDraggingScale(constraint, initialValue),
          formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
        })
      };
    }
    var Point4dInputPlugin = {
      id: "input-point4d",
      accept: function(value, _params) {
        return Point4d.isObject(value) ? value : null;
      },
      binding: {
        reader: function(_args) {
          return point4dFromUnknown;
        },
        constraint: function(args) {
          return createConstraint$1(args.params);
        },
        equals: Point4d.equals,
        writer: function(_args) {
          return writePoint4d;
        }
      },
      controller: function(args) {
        var value = args.value;
        var c = args.constraint;
        if (!(c instanceof PointNdConstraint)) {
          throw TpError.shouldNeverHappen();
        }
        return new PointNdTextController(args.document, {
          assembly: Point4dAssembly,
          axes: value.rawValue.getComponents().map(function(comp, index) {
            return createAxis(comp, c.components[index]);
          }),
          parser: parseNumber,
          value,
          viewProps: args.viewProps
        });
      }
    };
    function stringFromUnknown(value) {
      return String(value);
    }
    function formatString(value) {
      return value;
    }
    function createConstraint(params) {
      var constraints = [];
      var lc = createListConstraint(params);
      if (lc) {
        constraints.push(lc);
      }
      return new CompositeConstraint(constraints);
    }
    var StringInputPlugin = {
      id: "input-string",
      accept: function(value, _params) {
        return typeof value === "string" ? value : null;
      },
      binding: {
        reader: function(_args) {
          return stringFromUnknown;
        },
        constraint: function(args) {
          return createConstraint(args.params);
        },
        writer: function(_args) {
          return writePrimitive;
        }
      },
      controller: function(args) {
        var _a2;
        var doc = args.document;
        var value = args.value;
        var c = args.constraint;
        if (c && findConstraint(c, ListConstraint)) {
          return new ListController(doc, {
            props: new ValueMap({
              options: (_a2 = findListItems(c)) !== null && _a2 !== void 0 ? _a2 : []
            }),
            value,
            viewProps: args.viewProps
          });
        }
        return new TextController(doc, {
          parser: function(v) {
            return v;
          },
          props: new ValueMap({
            formatter: formatString
          }),
          value,
          viewProps: args.viewProps
        });
      }
    };
    var Semver = function() {
      function Semver2(text) {
        var _a2 = text.split("-"), core = _a2[0], prerelease = _a2[1];
        var coreComps = core.split(".");
        this.major = parseInt(coreComps[0], 10);
        this.minor = parseInt(coreComps[1], 10);
        this.patch = parseInt(coreComps[2], 10);
        this.prerelease = prerelease !== null && prerelease !== void 0 ? prerelease : null;
      }
      Semver2.prototype.toString = function() {
        var core = [this.major, this.minor, this.patch].join(".");
        return this.prerelease !== null ? [core, this.prerelease].join("-") : core;
      };
      return Semver2;
    }();
    var className$2 = ClassName("mll");
    var MultiLogView = function() {
      function MultiLogView2(doc, config) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this);
        this.formatter_ = config.formatter;
        this.element = doc.createElement("div");
        this.element.classList.add(className$2());
        bindClassModifier(config.viewProps, this.element);
        var textareaElem = doc.createElement("textarea");
        textareaElem.classList.add(className$2("i"));
        textareaElem.style.height = "calc(var(--bld-h) * " + config.lineCount + ")";
        textareaElem.readOnly = true;
        bindDisabled(config.viewProps, textareaElem);
        this.element.appendChild(textareaElem);
        this.textareaElem_ = textareaElem;
        config.value.emitter.on("change", this.onValueUpdate_);
        this.value = config.value;
        this.update_();
      }
      MultiLogView2.prototype.update_ = function() {
        var _this = this;
        var elem = this.textareaElem_;
        var shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
        var lines = [];
        this.value.rawValue.forEach(function(value) {
          if (value !== void 0) {
            lines.push(_this.formatter_(value));
          }
        });
        elem.textContent = lines.join("\n");
        if (shouldScroll) {
          elem.scrollTop = elem.scrollHeight;
        }
      };
      MultiLogView2.prototype.onValueUpdate_ = function() {
        this.update_();
      };
      return MultiLogView2;
    }();
    var MultiLogController = function() {
      function MultiLogController2(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new MultiLogView(doc, {
          formatter: config.formatter,
          lineCount: config.lineCount,
          value: this.value,
          viewProps: this.viewProps
        });
      }
      return MultiLogController2;
    }();
    var className$1 = ClassName("sgl");
    var SingleLogView = function() {
      function SingleLogView2(doc, config) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this);
        this.formatter_ = config.formatter;
        this.element = doc.createElement("div");
        this.element.classList.add(className$1());
        bindClassModifier(config.viewProps, this.element);
        var inputElem = doc.createElement("input");
        inputElem.classList.add(className$1("i"));
        inputElem.readOnly = true;
        inputElem.type = "text";
        bindDisabled(config.viewProps, inputElem);
        this.element.appendChild(inputElem);
        this.inputElem_ = inputElem;
        config.value.emitter.on("change", this.onValueUpdate_);
        this.value = config.value;
        this.update_();
      }
      SingleLogView2.prototype.update_ = function() {
        var values = this.value.rawValue;
        var lastValue = values[values.length - 1];
        this.inputElem_.value = lastValue !== void 0 ? this.formatter_(lastValue) : "";
      };
      SingleLogView2.prototype.onValueUpdate_ = function() {
        this.update_();
      };
      return SingleLogView2;
    }();
    var SingleLogMonitorController = function() {
      function SingleLogMonitorController2(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new SingleLogView(doc, {
          formatter: config.formatter,
          value: this.value,
          viewProps: this.viewProps
        });
      }
      return SingleLogMonitorController2;
    }();
    var BooleanMonitorPlugin = {
      id: "monitor-bool",
      accept: function(value, _params) {
        return typeof value === "boolean" ? value : null;
      },
      binding: {
        reader: function(_args) {
          return boolFromUnknown;
        }
      },
      controller: function(args) {
        var _a2;
        if (args.value.rawValue.length === 1) {
          return new SingleLogMonitorController(args.document, {
            formatter: BooleanFormatter,
            value: args.value,
            viewProps: args.viewProps
          });
        }
        return new MultiLogController(args.document, {
          formatter: BooleanFormatter,
          lineCount: (_a2 = args.params.lineCount) !== null && _a2 !== void 0 ? _a2 : Constants.monitor.defaultLineCount,
          value: args.value,
          viewProps: args.viewProps
        });
      }
    };
    var GraphCursor = function() {
      function GraphCursor2() {
        this.emitter = new Emitter();
        this.index_ = -1;
      }
      Object.defineProperty(GraphCursor2.prototype, "index", {
        get: function() {
          return this.index_;
        },
        set: function(index) {
          var changed = this.index_ !== index;
          if (changed) {
            this.index_ = index;
            this.emitter.emit("change", {
              index,
              sender: this
            });
          }
        },
        enumerable: false,
        configurable: true
      });
      return GraphCursor2;
    }();
    var className = ClassName("grl");
    var GraphLogView = function() {
      function GraphLogView2(doc, config) {
        this.onCursorChange_ = this.onCursorChange_.bind(this);
        this.onValueUpdate_ = this.onValueUpdate_.bind(this);
        this.element = doc.createElement("div");
        this.element.classList.add(className());
        bindClassModifier(config.viewProps, this.element);
        this.formatter_ = config.formatter;
        this.minValue_ = config.minValue;
        this.maxValue_ = config.maxValue;
        this.cursor_ = config.cursor;
        this.cursor_.emitter.on("change", this.onCursorChange_);
        var svgElem = doc.createElementNS(SVG_NS, "svg");
        svgElem.classList.add(className("g"));
        svgElem.style.height = "calc(var(--bld-h) * " + config.lineCount + ")";
        this.element.appendChild(svgElem);
        this.svgElem_ = svgElem;
        var lineElem = doc.createElementNS(SVG_NS, "polyline");
        this.svgElem_.appendChild(lineElem);
        this.lineElem_ = lineElem;
        var tooltipElem = doc.createElement("div");
        tooltipElem.classList.add(className("t"), ClassName("tt")());
        this.element.appendChild(tooltipElem);
        this.tooltipElem_ = tooltipElem;
        config.value.emitter.on("change", this.onValueUpdate_);
        this.value = config.value;
        this.update_();
      }
      Object.defineProperty(GraphLogView2.prototype, "graphElement", {
        get: function() {
          return this.svgElem_;
        },
        enumerable: false,
        configurable: true
      });
      GraphLogView2.prototype.update_ = function() {
        var bounds = this.svgElem_.getBoundingClientRect();
        var maxIndex = this.value.rawValue.length - 1;
        var min4 = this.minValue_;
        var max4 = this.maxValue_;
        var points = [];
        this.value.rawValue.forEach(function(v, index) {
          if (v === void 0) {
            return;
          }
          var x = mapRange(index, 0, maxIndex, 0, bounds.width);
          var y = mapRange(v, min4, max4, bounds.height, 0);
          points.push([x, y].join(","));
        });
        this.lineElem_.setAttributeNS(null, "points", points.join(" "));
        var tooltipElem = this.tooltipElem_;
        var value = this.value.rawValue[this.cursor_.index];
        if (value === void 0) {
          tooltipElem.classList.remove(className("t", "a"));
          return;
        }
        var tx = mapRange(this.cursor_.index, 0, maxIndex, 0, bounds.width);
        var ty = mapRange(value, min4, max4, bounds.height, 0);
        tooltipElem.style.left = tx + "px";
        tooltipElem.style.top = ty + "px";
        tooltipElem.textContent = "" + this.formatter_(value);
        if (!tooltipElem.classList.contains(className("t", "a"))) {
          tooltipElem.classList.add(className("t", "a"), className("t", "in"));
          forceReflow(tooltipElem);
          tooltipElem.classList.remove(className("t", "in"));
        }
      };
      GraphLogView2.prototype.onValueUpdate_ = function() {
        this.update_();
      };
      GraphLogView2.prototype.onCursorChange_ = function() {
        this.update_();
      };
      return GraphLogView2;
    }();
    var GraphLogController = function() {
      function GraphLogController2(doc, config) {
        this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
        this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
        this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
        this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
        this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.cursor_ = new GraphCursor();
        this.view = new GraphLogView(doc, {
          cursor: this.cursor_,
          formatter: config.formatter,
          lineCount: config.lineCount,
          maxValue: config.maxValue,
          minValue: config.minValue,
          value: this.value,
          viewProps: this.viewProps
        });
        if (!supportsTouch(doc)) {
          this.view.element.addEventListener("mousemove", this.onGraphMouseMove_);
          this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        } else {
          var ph = new PointerHandler(this.view.element);
          ph.emitter.on("down", this.onGraphPointerDown_);
          ph.emitter.on("move", this.onGraphPointerMove_);
          ph.emitter.on("up", this.onGraphPointerUp_);
        }
      }
      GraphLogController2.prototype.onGraphMouseLeave_ = function() {
        this.cursor_.index = -1;
      };
      GraphLogController2.prototype.onGraphMouseMove_ = function(ev) {
        var bounds = this.view.element.getBoundingClientRect();
        this.cursor_.index = Math.floor(mapRange(ev.offsetX, 0, bounds.width, 0, this.value.rawValue.length));
      };
      GraphLogController2.prototype.onGraphPointerDown_ = function(ev) {
        this.onGraphPointerMove_(ev);
      };
      GraphLogController2.prototype.onGraphPointerMove_ = function(ev) {
        if (!ev.data.point) {
          this.cursor_.index = -1;
          return;
        }
        this.cursor_.index = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
      };
      GraphLogController2.prototype.onGraphPointerUp_ = function() {
        this.cursor_.index = -1;
      };
      return GraphLogController2;
    }();
    function createFormatter() {
      return createNumberFormatter(2);
    }
    function createTextMonitor(args) {
      var _a2;
      if (args.value.rawValue.length === 1) {
        return new SingleLogMonitorController(args.document, {
          formatter: createFormatter(),
          value: args.value,
          viewProps: args.viewProps
        });
      }
      return new MultiLogController(args.document, {
        formatter: createFormatter(),
        lineCount: (_a2 = args.params.lineCount) !== null && _a2 !== void 0 ? _a2 : Constants.monitor.defaultLineCount,
        value: args.value,
        viewProps: args.viewProps
      });
    }
    function createGraphMonitor(args) {
      var _a2, _b, _c;
      return new GraphLogController(args.document, {
        formatter: createFormatter(),
        lineCount: (_a2 = args.params.lineCount) !== null && _a2 !== void 0 ? _a2 : Constants.monitor.defaultLineCount,
        maxValue: (_b = "max" in args.params ? args.params.max : null) !== null && _b !== void 0 ? _b : 100,
        minValue: (_c = "min" in args.params ? args.params.min : null) !== null && _c !== void 0 ? _c : 0,
        value: args.value,
        viewProps: args.viewProps
      });
    }
    function shouldShowGraph(params) {
      return "view" in params && params.view === "graph";
    }
    var NumberMonitorPlugin = {
      id: "monitor-number",
      accept: function(value, _params) {
        return typeof value === "number" ? value : null;
      },
      binding: {
        defaultBufferSize: function(params) {
          return shouldShowGraph(params) ? 64 : 1;
        },
        reader: function(_args) {
          return numberFromUnknown;
        }
      },
      controller: function(args) {
        if (shouldShowGraph(args.params)) {
          return createGraphMonitor(args);
        }
        return createTextMonitor(args);
      }
    };
    var StringMonitorPlugin = {
      id: "monitor-string",
      accept: function(value, _params) {
        return typeof value === "string" ? value : null;
      },
      binding: {
        reader: function(_args) {
          return stringFromUnknown;
        }
      },
      controller: function(args) {
        var _a2;
        var value = args.value;
        var multiline = value.rawValue.length > 1 || "multiline" in args.params && args.params.multiline;
        if (multiline) {
          return new MultiLogController(args.document, {
            formatter: formatString,
            lineCount: (_a2 = args.params.lineCount) !== null && _a2 !== void 0 ? _a2 : Constants.monitor.defaultLineCount,
            value,
            viewProps: args.viewProps
          });
        }
        return new SingleLogMonitorController(args.document, {
          formatter: formatString,
          value,
          viewProps: args.viewProps
        });
      }
    };
    function createDefaultWrapperElement(doc) {
      var elem = doc.createElement("div");
      elem.classList.add(ClassName("dfw")());
      if (doc.body) {
        doc.body.appendChild(elem);
      }
      return elem;
    }
    function embedStyle(doc, id, css2) {
      if (doc.querySelector("style[data-tp-style=" + id + "]")) {
        return;
      }
      var styleElem = doc.createElement("style");
      styleElem.dataset.tpStyle = id;
      styleElem.textContent = css2;
      doc.head.appendChild(styleElem);
    }
    function embedDefaultStyleIfNeeded(doc) {
      embedStyle(doc, "default", ".tp-lstv_s,.tp-btnv_b,.tp-p2dpadtxtv_b,.tp-fldv_b,.tp-rotv_b,.tp-clswv_sw,.tp-p2dpadv_p,.tp-txtv_i,.tp-grlv_g,.tp-sglv_i,.tp-mllv_i,.tp-ckbv_i,.tp-cltxtv_ms,.tp-tbiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-fldv_c>.tp-cntv.tp-v-lst,.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst{margin-bottom:calc(-1 * var(--cnt-v-p))}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c>*:not(.tp-v-fst),.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-fldv_c>.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv{margin-left:4px}.tp-fldv_c>.tp-fldv>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c .tp-fldv>.tp-fldv_c,.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-tabv>.tp-tabv_i,.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_i{border-top-left-radius:var(--elm-br)}.tp-fldv_c .tp-tabv>.tp-tabv_c,.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-lstv_s,.tp-btnv_b,.tp-p2dpadtxtv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-h);line-height:var(--bld-h);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-lstv_s:hover,.tp-btnv_b:hover,.tp-p2dpadtxtv_b:hover{background-color:var(--btn-bg-h)}.tp-lstv_s:focus,.tp-btnv_b:focus,.tp-p2dpadtxtv_b:focus{background-color:var(--btn-bg-f)}.tp-lstv_s:active,.tp-btnv_b:active,.tp-p2dpadtxtv_b:active{background-color:var(--btn-bg-a)}.tp-lstv_s:disabled,.tp-btnv_b:disabled,.tp-p2dpadtxtv_b:disabled{opacity:0.5}.tp-fldv_b,.tp-rotv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-h) + 4px);line-height:calc(var(--bld-h) + 4px);overflow:hidden;padding-left:calc(var(--cnt-h-p) + 8px);padding-right:calc(2px * 2 + var(--bld-h) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-fldv_b:hover,.tp-rotv_b:hover{background-color:var(--cnt-bg-h)}.tp-fldv_b:focus,.tp-rotv_b:focus{background-color:var(--cnt-bg-f)}.tp-fldv_b:active,.tp-rotv_b:active{background-color:var(--cnt-bg-a)}.tp-fldv_b:disabled,.tp-rotv_b:disabled{opacity:0.5}.tp-fldv_m,.tp-rotv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:'';display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-h) + 4px - 6px) / 2 - 2px);margin:auto;opacity:0.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m,.tp-rotv.tp-rotv-expanded .tp-rotv_m{transform:none}.tp-fldv_c,.tp-rotv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-fldv.tp-fldv-expanded>.tp-fldv_c,.tp-rotv.tp-rotv-expanded .tp-rotv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-clswv_sw,.tp-p2dpadv_p,.tp-txtv_i{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-h);line-height:var(--bld-h);min-width:0;width:100%}.tp-clswv_sw:hover,.tp-p2dpadv_p:hover,.tp-txtv_i:hover{background-color:var(--in-bg-h)}.tp-clswv_sw:focus,.tp-p2dpadv_p:focus,.tp-txtv_i:focus{background-color:var(--in-bg-f)}.tp-clswv_sw:active,.tp-p2dpadv_p:active,.tp-txtv_i:active{background-color:var(--in-bg-a)}.tp-clswv_sw:disabled,.tp-p2dpadv_p:disabled,.tp-txtv_i:disabled{opacity:0.5}.tp-cltxtv_m,.tp-lstv{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-cltxtv_mm,.tp-lstv_m{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-cltxtv_mm svg,.tp-lstv_m svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-cltxtv_mm svg path,.tp-lstv_m svg path{fill:currentColor}.tp-grlv_g,.tp-sglv_i,.tp-mllv_i{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-h);width:100%}.tp-clpv,.tp-p2dpadv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:relative;visibility:hidden;z-index:1000}.tp-clpv.tp-clpv-expanded,.tp-p2dpadv.tp-p2dpadv-expanded{display:block;visibility:visible}.tp-cltxtv_w,.tp-pndtxtv{display:flex}.tp-cltxtv_c,.tp-pndtxtv_a{width:100%}.tp-cltxtv_c+.tp-cltxtv_c,.tp-pndtxtv_a+.tp-cltxtv_c,.tp-cltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-pndtxtv_a{margin-left:2px}.tp-btnv_b{width:100%}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-h);position:relative;width:var(--bld-h)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:0.5}.tp-clpv_h,.tp-clpv_ap{margin-left:6px;margin-right:6px}.tp-clpv_h{margin-top:var(--bld-s)}.tp-clpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-clpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-clpv_a:before{background-color:var(--grv-fg);content:'';height:2px;left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:0}.tp-clpv_ap{align-items:center;display:flex;flex:3}.tp-clpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-h) * 4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0,0,0,0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-h);outline:none;position:relative}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,0.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-h);outline:none;position:relative;width:100%}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,0.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-clswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br)}.tp-clswv.tp-v-disabled{opacity:0.5}.tp-clswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;cursor:pointer;display:block;height:var(--bld-h);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-h)}.tp-clswv_b:focus::after{border:rgba(255,255,255,0.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:'';display:block;left:0;position:absolute;right:0;top:0}.tp-clswv_p{left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:var(--bld-h)}.tp-clswtxtv{display:flex;position:relative}.tp-clswtxtv_s{flex-grow:0;flex-shrink:0;width:var(--bld-h)}.tp-clswtxtv_t{flex:1;margin-left:4px}.tp-cltxtv{display:flex;width:100%}.tp-cltxtv_m{margin-right:4px}.tp-cltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-h);line-height:var(--bld-h);padding:0 18px 0 4px}.tp-cltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-cltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-cltxtv_ms:active{background-color:var(--in-bg-a)}.tp-cltxtv_mm{color:var(--lbl-fg)}.tp-cltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_c{border-left:var(--cnt-bg) solid 4px}.tp-fldv_b:hover+.tp-fldv_c{border-left-color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_c{border-left-color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_c{border-left-color:var(--cnt-bg-a)}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-h) * 3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left 0.05s, top 0.05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:0.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:0.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--value-width)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv.tp-v-disabled .tp-lstv_s{opacity:0.5}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:0.5}.tp-mllv_i{display:block;height:calc(var(--bld-h) * 3);line-height:var(--bld-h);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:0.5}.tp-p2dpadv{padding-left:calc(var(--cnt-h-p) + 4px + var(--bld-h))}.tp-p2dpadv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpadv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpadv_ax{opacity:0.1;stroke:var(--in-fg)}.tp-p2dpadv_l{stroke:var(--in-fg);stroke-dasharray:2px 2px}.tp-p2dpadv_m{fill:var(--in-fg)}.tp-p2dpadtxtv{display:flex;position:relative}.tp-p2dpadtxtv_b{height:var(--bld-h);position:relative;width:var(--bld-h)}.tp-p2dpadtxtv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dpadtxtv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dpadtxtv_b svg circle{fill:currentColor}.tp-p2dpadtxtv_p{left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:var(--bld-h)}.tp-p2dpadtxtv_t{margin-left:4px}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono,Source Code Pro,Menlo,Courier,monospace);--bs-br: var(--tp-base-border-radius-v3, 6px);--cnt-h-p: var(--tp-container-horizontal-padding-v3, 4px);--cnt-v-p: var(--tp-container-vertical-padding-v3, 4px);--elm-br: var(--tp-element-border-radius-v3, 2px);--bld-h: var(--tp-blade-height-v3, 20px);--bld-s: var(--tp-blade-spacing-v3, 4px);--value-width: var(--tp-value-width-v3, 160px);--bs-bg: var(--tp-base-background-color, #2f3137);--bs-sh: var(--tp-base-shadow-color, rgba(0,0,0,0.2));--btn-bg: var(--tp-button-background-color, #adafb8);--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, #2f3137);--cnt-bg: var(--tp-container-background-color, var(--tp-folder-background-color, rgba(187,188,196,0.1)));--cnt-bg-a: var(--tp-container-background-color-active, var(--tp-folder-background-color-active, rgba(187,188,196,0.25)));--cnt-bg-f: var(--tp-container-background-color-focus, var(--tp-folder-background-color-focus, rgba(187,188,196,0.2)));--cnt-bg-h: var(--tp-container-background-color-hover, var(--tp-folder-background-color-hover, rgba(187,188,196,0.15)));--cnt-fg: var(--tp-container-foreground-color, var(--tp-folder-foreground-color, #bbbcc4));--in-bg: var(--tp-input-background-color, rgba(0,0,0,0.2));--in-bg-a: var(--tp-input-background-color-active, rgba(0,0,0,0.35));--in-bg-f: var(--tp-input-background-color-focus, rgba(0,0,0,0.3));--in-bg-h: var(--tp-input-background-color-hover, rgba(0,0,0,0.25));--in-fg: var(--tp-input-foreground-color, #bbbcc4);--lbl-fg: var(--tp-label-foreground-color, rgba(187,188,196,0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0,0,0,0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187,188,196,0.7));--grv-fg: var(--tp-groove-foreground-color, var(--tp-separator-color, rgba(0,0,0,0.2)));--button-background-color: var(--btn-bg);--button-background-color-active: var(--btn-bg-a);--button-background-color-focus: var(--btn-bg-f);--button-background-color-hover: var(--btn-bg-h);--button-foreground-color: var(--btn-fg);--folder-background-color: var(--cnt-bg);--folder-background-color-active: var(--cnt-bg-a);--folder-background-color-focus: var(--cnt-bg-f);--folder-background-color-hover: var(--cnt-bg-h);--folder-foreground-color: var(--cnt-fg);--input-background-color: var(--in-bg);--input-background-color-active: var(--in-bg-a);--input-background-color-focus: var(--in-bg-f);--input-background-color-hover: var(--in-bg-h);--input-foreground-color: var(--in-fg);--label-foregound-color: var(--lbl-fg);--monitor-background-color: var(--mo-bg);--monitor-foreground-color: var(--mo-fg);--separator-color: var(--grv-fg);--unit-size: var(--bld-h)}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(2px * 2 + var(--bld-h) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c,.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_i{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sldv.tp-v-disabled{opacity:0.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-h);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:'';display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv.tp-v-disabled{opacity:0.5}.tp-tabv_i{align-items:flex-end;display:flex;overflow:hidden}.tp-tabv.tp-tabv-nop .tp-tabv_i{height:calc(var(--bld-h) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_i::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:0;position:absolute;right:0}.tp-tabv_c{border-left:var(--cnt-bg) solid 4px;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p)}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:-2px;position:absolute;width:2px}.tp-tbiv_b{background-color:var(--cnt-bg);display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);width:100%}.tp-tbiv_b:hover{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active{background-color:var(--cnt-bg-a)}.tp-tbiv_b:disabled{opacity:0.5}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-h) + 4px);line-height:calc(var(--bld-h) + 4px);opacity:0.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:0.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';height:calc(var(--bld-h) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:0.1;position:absolute;top:0;transition:border-radius 0.1s, height 0.1s, transform 0.1s, width 0.1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:2px 2px}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) transparent transparent transparent;border-style:solid;border-width:2px;box-sizing:border-box;content:'';font-size:0.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}");
      getAllPlugins().forEach(function(plugin) {
        if (plugin.css) {
          embedStyle(doc, "plugin-" + plugin.id, plugin.css);
        }
      });
    }
    var Tweakpane2 = function(_super) {
      __extends(Tweakpane3, _super);
      function Tweakpane3(opt_config) {
        var _a2;
        var _this = this;
        var config = opt_config || {};
        var doc = (_a2 = config.document) !== null && _a2 !== void 0 ? _a2 : getWindowDocument();
        var rootController = new RootController(doc, {
          expanded: config.expanded,
          blade: new Blade(),
          props: new ValueMap({
            title: config.title
          }),
          viewProps: createViewProps()
        });
        _this = _super.call(this, rootController) || this;
        _this.containerElem_ = config.container || createDefaultWrapperElement(doc);
        _this.containerElem_.appendChild(_this.element);
        _this.doc_ = doc;
        _this.usesDefaultWrapper_ = !config.container;
        embedDefaultStyleIfNeeded(_this.document);
        return _this;
      }
      Object.defineProperty(Tweakpane3.prototype, "document", {
        get: function() {
          if (!this.doc_) {
            throw TpError.alreadyDisposed();
          }
          return this.doc_;
        },
        enumerable: false,
        configurable: true
      });
      Tweakpane3.prototype.dispose = function() {
        var containerElem = this.containerElem_;
        if (!containerElem) {
          throw TpError.alreadyDisposed();
        }
        if (this.usesDefaultWrapper_) {
          var parentElem = containerElem.parentElement;
          if (parentElem) {
            parentElem.removeChild(containerElem);
          }
        }
        this.containerElem_ = null;
        this.doc_ = null;
        _super.prototype.dispose.call(this);
      };
      Tweakpane3.version = new Semver("2.4.0");
      return Tweakpane3;
    }(RootApi);
    function registerDefaultPlugins() {
      [
        Point2dInputPlugin,
        Point3dInputPlugin,
        Point4dInputPlugin,
        StringInputPlugin,
        NumberInputPlugin,
        StringColorInputPlugin,
        ObjectColorInputPlugin,
        NumberColorInputPlugin,
        BooleanInputPlugin
      ].forEach(function(p) {
        registerPlugin({
          type: "input",
          plugin: p
        });
      });
      [BooleanMonitorPlugin, StringMonitorPlugin, NumberMonitorPlugin].forEach(function(p) {
        registerPlugin({
          type: "monitor",
          plugin: p
        });
      });
      [SliderBladePlugin, ListBladePlugin, TabBladePlugin, TextBladePlugin].forEach(function(p) {
        registerPlugin({
          type: "blade",
          plugin: p
        });
      });
    }
    registerDefaultPlugins();
    return Tweakpane2;
  });
});

// node_modules/picogl/build/module/constants.js
var GL = {
  DEPTH_BUFFER_BIT: 256,
  STENCIL_BUFFER_BIT: 1024,
  COLOR_BUFFER_BIT: 16384,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  ZERO: 0,
  ONE: 1,
  SRC_COLOR: 768,
  ONE_MINUS_SRC_COLOR: 769,
  SRC_ALPHA: 770,
  ONE_MINUS_SRC_ALPHA: 771,
  DST_ALPHA: 772,
  ONE_MINUS_DST_ALPHA: 773,
  DST_COLOR: 774,
  ONE_MINUS_DST_COLOR: 775,
  SRC_ALPHA_SATURATE: 776,
  FUNC_ADD: 32774,
  BLEND_EQUATION: 32777,
  BLEND_EQUATION_RGB: 32777,
  BLEND_EQUATION_ALPHA: 34877,
  FUNC_SUBTRACT: 32778,
  FUNC_REVERSE_SUBTRACT: 32779,
  BLEND_DST_RGB: 32968,
  BLEND_SRC_RGB: 32969,
  BLEND_DST_ALPHA: 32970,
  BLEND_SRC_ALPHA: 32971,
  CONSTANT_COLOR: 32769,
  ONE_MINUS_CONSTANT_COLOR: 32770,
  CONSTANT_ALPHA: 32771,
  ONE_MINUS_CONSTANT_ALPHA: 32772,
  BLEND_COLOR: 32773,
  ARRAY_BUFFER: 34962,
  ELEMENT_ARRAY_BUFFER: 34963,
  ARRAY_BUFFER_BINDING: 34964,
  ELEMENT_ARRAY_BUFFER_BINDING: 34965,
  STREAM_DRAW: 35040,
  STATIC_DRAW: 35044,
  DYNAMIC_DRAW: 35048,
  BUFFER_SIZE: 34660,
  BUFFER_USAGE: 34661,
  CURRENT_VERTEX_ATTRIB: 34342,
  FRONT: 1028,
  BACK: 1029,
  FRONT_AND_BACK: 1032,
  CULL_FACE: 2884,
  BLEND: 3042,
  DITHER: 3024,
  STENCIL_TEST: 2960,
  DEPTH_TEST: 2929,
  SCISSOR_TEST: 3089,
  POLYGON_OFFSET_FILL: 32823,
  SAMPLE_ALPHA_TO_COVERAGE: 32926,
  SAMPLE_COVERAGE: 32928,
  NO_ERROR: 0,
  INVALID_ENUM: 1280,
  INVALID_VALUE: 1281,
  INVALID_OPERATION: 1282,
  OUT_OF_MEMORY: 1285,
  CW: 2304,
  CCW: 2305,
  LINE_WIDTH: 2849,
  ALIASED_POINT_SIZE_RANGE: 33901,
  ALIASED_LINE_WIDTH_RANGE: 33902,
  CULL_FACE_MODE: 2885,
  FRONT_FACE: 2886,
  DEPTH_RANGE: 2928,
  DEPTH_WRITEMASK: 2930,
  DEPTH_CLEAR_VALUE: 2931,
  DEPTH_FUNC: 2932,
  STENCIL_CLEAR_VALUE: 2961,
  STENCIL_FUNC: 2962,
  STENCIL_FAIL: 2964,
  STENCIL_PASS_DEPTH_FAIL: 2965,
  STENCIL_PASS_DEPTH_PASS: 2966,
  STENCIL_REF: 2967,
  STENCIL_VALUE_MASK: 2963,
  STENCIL_WRITEMASK: 2968,
  STENCIL_BACK_FUNC: 34816,
  STENCIL_BACK_FAIL: 34817,
  STENCIL_BACK_PASS_DEPTH_FAIL: 34818,
  STENCIL_BACK_PASS_DEPTH_PASS: 34819,
  STENCIL_BACK_REF: 36003,
  STENCIL_BACK_VALUE_MASK: 36004,
  STENCIL_BACK_WRITEMASK: 36005,
  VIEWPORT: 2978,
  SCISSOR_BOX: 3088,
  COLOR_CLEAR_VALUE: 3106,
  COLOR_WRITEMASK: 3107,
  UNPACK_ALIGNMENT: 3317,
  PACK_ALIGNMENT: 3333,
  MAX_TEXTURE_SIZE: 3379,
  MAX_VIEWPORT_DIMS: 3386,
  SUBPIXEL_BITS: 3408,
  RED_BITS: 3410,
  GREEN_BITS: 3411,
  BLUE_BITS: 3412,
  ALPHA_BITS: 3413,
  DEPTH_BITS: 3414,
  STENCIL_BITS: 3415,
  POLYGON_OFFSET_UNITS: 10752,
  POLYGON_OFFSET_FACTOR: 32824,
  TEXTURE_BINDING_2D: 32873,
  SAMPLE_BUFFERS: 32936,
  SAMPLES: 32937,
  SAMPLE_COVERAGE_VALUE: 32938,
  SAMPLE_COVERAGE_INVERT: 32939,
  COMPRESSED_TEXTURE_FORMATS: 34467,
  DONT_CARE: 4352,
  FASTEST: 4353,
  NICEST: 4354,
  GENERATE_MIPMAP_HINT: 33170,
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  DEPTH_COMPONENT: 6402,
  ALPHA: 6406,
  RGB: 6407,
  RGBA: 6408,
  LUMINANCE: 6409,
  LUMINANCE_ALPHA: 6410,
  UNSIGNED_SHORT_4_4_4_4: 32819,
  UNSIGNED_SHORT_5_5_5_1: 32820,
  UNSIGNED_SHORT_5_6_5: 33635,
  FRAGMENT_SHADER: 35632,
  VERTEX_SHADER: 35633,
  MAX_VERTEX_ATTRIBS: 34921,
  MAX_VERTEX_UNIFORM_VECTORS: 36347,
  MAX_VARYING_VECTORS: 36348,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
  MAX_TEXTURE_IMAGE_UNITS: 34930,
  MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
  SHADER_TYPE: 35663,
  DELETE_STATUS: 35712,
  LINK_STATUS: 35714,
  VALIDATE_STATUS: 35715,
  ATTACHED_SHADERS: 35717,
  ACTIVE_UNIFORMS: 35718,
  ACTIVE_ATTRIBUTES: 35721,
  SHADING_LANGUAGE_VERSION: 35724,
  CURRENT_PROGRAM: 35725,
  NEVER: 512,
  LESS: 513,
  EQUAL: 514,
  LEQUAL: 515,
  GREATER: 516,
  NOTEQUAL: 517,
  GEQUAL: 518,
  ALWAYS: 519,
  KEEP: 7680,
  REPLACE: 7681,
  INCR: 7682,
  DECR: 7683,
  INVERT: 5386,
  INCR_WRAP: 34055,
  DECR_WRAP: 34056,
  VENDOR: 7936,
  RENDERER: 7937,
  VERSION: 7938,
  NEAREST: 9728,
  LINEAR: 9729,
  NEAREST_MIPMAP_NEAREST: 9984,
  LINEAR_MIPMAP_NEAREST: 9985,
  NEAREST_MIPMAP_LINEAR: 9986,
  LINEAR_MIPMAP_LINEAR: 9987,
  TEXTURE_MAG_FILTER: 10240,
  TEXTURE_MIN_FILTER: 10241,
  TEXTURE_WRAP_S: 10242,
  TEXTURE_WRAP_T: 10243,
  TEXTURE_2D: 3553,
  TEXTURE: 5890,
  TEXTURE_CUBE_MAP: 34067,
  TEXTURE_BINDING_CUBE_MAP: 34068,
  TEXTURE_CUBE_MAP_POSITIVE_X: 34069,
  TEXTURE_CUBE_MAP_NEGATIVE_X: 34070,
  TEXTURE_CUBE_MAP_POSITIVE_Y: 34071,
  TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072,
  TEXTURE_CUBE_MAP_POSITIVE_Z: 34073,
  TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074,
  MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
  TEXTURE0: 33984,
  TEXTURE1: 33985,
  TEXTURE2: 33986,
  TEXTURE3: 33987,
  TEXTURE4: 33988,
  TEXTURE5: 33989,
  TEXTURE6: 33990,
  TEXTURE7: 33991,
  TEXTURE8: 33992,
  TEXTURE9: 33993,
  TEXTURE10: 33994,
  TEXTURE11: 33995,
  TEXTURE12: 33996,
  TEXTURE13: 33997,
  TEXTURE14: 33998,
  TEXTURE15: 33999,
  TEXTURE16: 34e3,
  TEXTURE17: 34001,
  TEXTURE18: 34002,
  TEXTURE19: 34003,
  TEXTURE20: 34004,
  TEXTURE21: 34005,
  TEXTURE22: 34006,
  TEXTURE23: 34007,
  TEXTURE24: 34008,
  TEXTURE25: 34009,
  TEXTURE26: 34010,
  TEXTURE27: 34011,
  TEXTURE28: 34012,
  TEXTURE29: 34013,
  TEXTURE30: 34014,
  TEXTURE31: 34015,
  ACTIVE_TEXTURE: 34016,
  REPEAT: 10497,
  CLAMP_TO_EDGE: 33071,
  MIRRORED_REPEAT: 33648,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  INT_VEC2: 35667,
  INT_VEC3: 35668,
  INT_VEC4: 35669,
  BOOL: 35670,
  BOOL_VEC2: 35671,
  BOOL_VEC3: 35672,
  BOOL_VEC4: 35673,
  FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  SAMPLER_2D: 35678,
  SAMPLER_CUBE: 35680,
  VERTEX_ATTRIB_ARRAY_ENABLED: 34338,
  VERTEX_ATTRIB_ARRAY_SIZE: 34339,
  VERTEX_ATTRIB_ARRAY_STRIDE: 34340,
  VERTEX_ATTRIB_ARRAY_TYPE: 34341,
  VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922,
  VERTEX_ATTRIB_ARRAY_POINTER: 34373,
  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975,
  IMPLEMENTATION_COLOR_READ_TYPE: 35738,
  IMPLEMENTATION_COLOR_READ_FORMAT: 35739,
  COMPILE_STATUS: 35713,
  LOW_FLOAT: 36336,
  MEDIUM_FLOAT: 36337,
  HIGH_FLOAT: 36338,
  LOW_INT: 36339,
  MEDIUM_INT: 36340,
  HIGH_INT: 36341,
  FRAMEBUFFER: 36160,
  RENDERBUFFER: 36161,
  RGBA4: 32854,
  RGB5_A1: 32855,
  RGB565: 36194,
  DEPTH_COMPONENT16: 33189,
  STENCIL_INDEX: 6401,
  STENCIL_INDEX8: 36168,
  DEPTH_STENCIL: 34041,
  RENDERBUFFER_WIDTH: 36162,
  RENDERBUFFER_HEIGHT: 36163,
  RENDERBUFFER_INTERNAL_FORMAT: 36164,
  RENDERBUFFER_RED_SIZE: 36176,
  RENDERBUFFER_GREEN_SIZE: 36177,
  RENDERBUFFER_BLUE_SIZE: 36178,
  RENDERBUFFER_ALPHA_SIZE: 36179,
  RENDERBUFFER_DEPTH_SIZE: 36180,
  RENDERBUFFER_STENCIL_SIZE: 36181,
  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048,
  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051,
  COLOR_ATTACHMENT0: 36064,
  DEPTH_ATTACHMENT: 36096,
  STENCIL_ATTACHMENT: 36128,
  DEPTH_STENCIL_ATTACHMENT: 33306,
  NONE: 0,
  FRAMEBUFFER_COMPLETE: 36053,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054,
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055,
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057,
  FRAMEBUFFER_UNSUPPORTED: 36061,
  FRAMEBUFFER_BINDING: 36006,
  RENDERBUFFER_BINDING: 36007,
  MAX_RENDERBUFFER_SIZE: 34024,
  INVALID_FRAMEBUFFER_OPERATION: 1286,
  UNPACK_FLIP_Y_WEBGL: 37440,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441,
  CONTEXT_LOST_WEBGL: 37442,
  UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443,
  BROWSER_DEFAULT_WEBGL: 37444,
  READ_BUFFER: 3074,
  UNPACK_ROW_LENGTH: 3314,
  UNPACK_SKIP_ROWS: 3315,
  UNPACK_SKIP_PIXELS: 3316,
  PACK_ROW_LENGTH: 3330,
  PACK_SKIP_ROWS: 3331,
  PACK_SKIP_PIXELS: 3332,
  COLOR: 6144,
  DEPTH: 6145,
  STENCIL: 6146,
  RED: 6403,
  RGB8: 32849,
  RGBA8: 32856,
  RGB10_A2: 32857,
  TEXTURE_BINDING_3D: 32874,
  UNPACK_SKIP_IMAGES: 32877,
  UNPACK_IMAGE_HEIGHT: 32878,
  TEXTURE_3D: 32879,
  TEXTURE_WRAP_R: 32882,
  MAX_3D_TEXTURE_SIZE: 32883,
  UNSIGNED_INT_2_10_10_10_REV: 33640,
  MAX_ELEMENTS_VERTICES: 33e3,
  MAX_ELEMENTS_INDICES: 33001,
  TEXTURE_MIN_LOD: 33082,
  TEXTURE_MAX_LOD: 33083,
  TEXTURE_BASE_LEVEL: 33084,
  TEXTURE_MAX_LEVEL: 33085,
  MIN: 32775,
  MAX: 32776,
  DEPTH_COMPONENT24: 33190,
  MAX_TEXTURE_LOD_BIAS: 34045,
  TEXTURE_COMPARE_MODE: 34892,
  TEXTURE_COMPARE_FUNC: 34893,
  CURRENT_QUERY: 34917,
  QUERY_RESULT: 34918,
  QUERY_RESULT_AVAILABLE: 34919,
  STREAM_READ: 35041,
  STREAM_COPY: 35042,
  STATIC_READ: 35045,
  STATIC_COPY: 35046,
  DYNAMIC_READ: 35049,
  DYNAMIC_COPY: 35050,
  MAX_DRAW_BUFFERS: 34852,
  DRAW_BUFFER0: 34853,
  DRAW_BUFFER1: 34854,
  DRAW_BUFFER2: 34855,
  DRAW_BUFFER3: 34856,
  DRAW_BUFFER4: 34857,
  DRAW_BUFFER5: 34858,
  DRAW_BUFFER6: 34859,
  DRAW_BUFFER7: 34860,
  DRAW_BUFFER8: 34861,
  DRAW_BUFFER9: 34862,
  DRAW_BUFFER10: 34863,
  DRAW_BUFFER11: 34864,
  DRAW_BUFFER12: 34865,
  DRAW_BUFFER13: 34866,
  DRAW_BUFFER14: 34867,
  DRAW_BUFFER15: 34868,
  MAX_FRAGMENT_UNIFORM_COMPONENTS: 35657,
  MAX_VERTEX_UNIFORM_COMPONENTS: 35658,
  SAMPLER_3D: 35679,
  SAMPLER_2D_SHADOW: 35682,
  FRAGMENT_SHADER_DERIVATIVE_HINT: 35723,
  PIXEL_PACK_BUFFER: 35051,
  PIXEL_UNPACK_BUFFER: 35052,
  PIXEL_PACK_BUFFER_BINDING: 35053,
  PIXEL_UNPACK_BUFFER_BINDING: 35055,
  FLOAT_MAT2x3: 35685,
  FLOAT_MAT2x4: 35686,
  FLOAT_MAT3x2: 35687,
  FLOAT_MAT3x4: 35688,
  FLOAT_MAT4x2: 35689,
  FLOAT_MAT4x3: 35690,
  SRGB: 35904,
  SRGB8: 35905,
  SRGB8_ALPHA8: 35907,
  COMPARE_REF_TO_TEXTURE: 34894,
  RGBA32F: 34836,
  RGB32F: 34837,
  RGBA16F: 34842,
  RGB16F: 34843,
  VERTEX_ATTRIB_ARRAY_INTEGER: 35069,
  MAX_ARRAY_TEXTURE_LAYERS: 35071,
  MIN_PROGRAM_TEXEL_OFFSET: 35076,
  MAX_PROGRAM_TEXEL_OFFSET: 35077,
  MAX_VARYING_COMPONENTS: 35659,
  TEXTURE_2D_ARRAY: 35866,
  TEXTURE_BINDING_2D_ARRAY: 35869,
  R11F_G11F_B10F: 35898,
  UNSIGNED_INT_10F_11F_11F_REV: 35899,
  RGB9_E5: 35901,
  UNSIGNED_INT_5_9_9_9_REV: 35902,
  TRANSFORM_FEEDBACK_BUFFER_MODE: 35967,
  MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 35968,
  TRANSFORM_FEEDBACK_VARYINGS: 35971,
  TRANSFORM_FEEDBACK_BUFFER_START: 35972,
  TRANSFORM_FEEDBACK_BUFFER_SIZE: 35973,
  TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 35976,
  RASTERIZER_DISCARD: 35977,
  MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 35978,
  MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 35979,
  INTERLEAVED_ATTRIBS: 35980,
  SEPARATE_ATTRIBS: 35981,
  TRANSFORM_FEEDBACK_BUFFER: 35982,
  TRANSFORM_FEEDBACK_BUFFER_BINDING: 35983,
  RGBA32UI: 36208,
  RGB32UI: 36209,
  RGBA16UI: 36214,
  RGB16UI: 36215,
  RGBA8UI: 36220,
  RGB8UI: 36221,
  RGBA32I: 36226,
  RGB32I: 36227,
  RGBA16I: 36232,
  RGB16I: 36233,
  RGBA8I: 36238,
  RGB8I: 36239,
  RED_INTEGER: 36244,
  RGB_INTEGER: 36248,
  RGBA_INTEGER: 36249,
  SAMPLER_2D_ARRAY: 36289,
  SAMPLER_2D_ARRAY_SHADOW: 36292,
  SAMPLER_CUBE_SHADOW: 36293,
  UNSIGNED_INT_VEC2: 36294,
  UNSIGNED_INT_VEC3: 36295,
  UNSIGNED_INT_VEC4: 36296,
  INT_SAMPLER_2D: 36298,
  INT_SAMPLER_3D: 36299,
  INT_SAMPLER_CUBE: 36300,
  INT_SAMPLER_2D_ARRAY: 36303,
  UNSIGNED_INT_SAMPLER_2D: 36306,
  UNSIGNED_INT_SAMPLER_3D: 36307,
  UNSIGNED_INT_SAMPLER_CUBE: 36308,
  UNSIGNED_INT_SAMPLER_2D_ARRAY: 36311,
  DEPTH_COMPONENT32F: 36012,
  DEPTH32F_STENCIL8: 36013,
  FLOAT_32_UNSIGNED_INT_24_8_REV: 36269,
  FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 33296,
  FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 33297,
  FRAMEBUFFER_ATTACHMENT_RED_SIZE: 33298,
  FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 33299,
  FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 33300,
  FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 33301,
  FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 33302,
  FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 33303,
  FRAMEBUFFER_DEFAULT: 33304,
  UNSIGNED_INT_24_8: 34042,
  DEPTH24_STENCIL8: 35056,
  UNSIGNED_NORMALIZED: 35863,
  DRAW_FRAMEBUFFER_BINDING: 36006,
  READ_FRAMEBUFFER: 36008,
  DRAW_FRAMEBUFFER: 36009,
  READ_FRAMEBUFFER_BINDING: 36010,
  RENDERBUFFER_SAMPLES: 36011,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 36052,
  MAX_COLOR_ATTACHMENTS: 36063,
  COLOR_ATTACHMENT1: 36065,
  COLOR_ATTACHMENT2: 36066,
  COLOR_ATTACHMENT3: 36067,
  COLOR_ATTACHMENT4: 36068,
  COLOR_ATTACHMENT5: 36069,
  COLOR_ATTACHMENT6: 36070,
  COLOR_ATTACHMENT7: 36071,
  COLOR_ATTACHMENT8: 36072,
  COLOR_ATTACHMENT9: 36073,
  COLOR_ATTACHMENT10: 36074,
  COLOR_ATTACHMENT11: 36075,
  COLOR_ATTACHMENT12: 36076,
  COLOR_ATTACHMENT13: 36077,
  COLOR_ATTACHMENT14: 36078,
  COLOR_ATTACHMENT15: 36079,
  FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 36182,
  MAX_SAMPLES: 36183,
  HALF_FLOAT: 5131,
  RG: 33319,
  RG_INTEGER: 33320,
  R8: 33321,
  RG8: 33323,
  R16F: 33325,
  R32F: 33326,
  RG16F: 33327,
  RG32F: 33328,
  R8I: 33329,
  R8UI: 33330,
  R16I: 33331,
  R16UI: 33332,
  R32I: 33333,
  R32UI: 33334,
  RG8I: 33335,
  RG8UI: 33336,
  RG16I: 33337,
  RG16UI: 33338,
  RG32I: 33339,
  RG32UI: 33340,
  VERTEX_ARRAY_BINDING: 34229,
  R8_SNORM: 36756,
  RG8_SNORM: 36757,
  RGB8_SNORM: 36758,
  RGBA8_SNORM: 36759,
  SIGNED_NORMALIZED: 36764,
  COPY_READ_BUFFER: 36662,
  COPY_WRITE_BUFFER: 36663,
  COPY_READ_BUFFER_BINDING: 36662,
  COPY_WRITE_BUFFER_BINDING: 36663,
  UNIFORM_BUFFER: 35345,
  UNIFORM_BUFFER_BINDING: 35368,
  UNIFORM_BUFFER_START: 35369,
  UNIFORM_BUFFER_SIZE: 35370,
  MAX_VERTEX_UNIFORM_BLOCKS: 35371,
  MAX_FRAGMENT_UNIFORM_BLOCKS: 35373,
  MAX_COMBINED_UNIFORM_BLOCKS: 35374,
  MAX_UNIFORM_BUFFER_BINDINGS: 35375,
  MAX_UNIFORM_BLOCK_SIZE: 35376,
  MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 35377,
  MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 35379,
  UNIFORM_BUFFER_OFFSET_ALIGNMENT: 35380,
  ACTIVE_UNIFORM_BLOCKS: 35382,
  UNIFORM_TYPE: 35383,
  UNIFORM_SIZE: 35384,
  UNIFORM_BLOCK_INDEX: 35386,
  UNIFORM_OFFSET: 35387,
  UNIFORM_ARRAY_STRIDE: 35388,
  UNIFORM_MATRIX_STRIDE: 35389,
  UNIFORM_IS_ROW_MAJOR: 35390,
  UNIFORM_BLOCK_BINDING: 35391,
  UNIFORM_BLOCK_DATA_SIZE: 35392,
  UNIFORM_BLOCK_ACTIVE_UNIFORMS: 35394,
  UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 35395,
  UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 35396,
  UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 35398,
  INVALID_INDEX: 4294967295,
  MAX_VERTEX_OUTPUT_COMPONENTS: 37154,
  MAX_FRAGMENT_INPUT_COMPONENTS: 37157,
  MAX_SERVER_WAIT_TIMEOUT: 37137,
  OBJECT_TYPE: 37138,
  SYNC_CONDITION: 37139,
  SYNC_STATUS: 37140,
  SYNC_FLAGS: 37141,
  SYNC_FENCE: 37142,
  SYNC_GPU_COMMANDS_COMPLETE: 37143,
  UNSIGNALED: 37144,
  SIGNALED: 37145,
  ALREADY_SIGNALED: 37146,
  TIMEOUT_EXPIRED: 37147,
  CONDITION_SATISFIED: 37148,
  WAIT_FAILED: 37149,
  SYNC_FLUSH_COMMANDS_BIT: 1,
  VERTEX_ATTRIB_ARRAY_DIVISOR: 35070,
  ANY_SAMPLES_PASSED: 35887,
  ANY_SAMPLES_PASSED_CONSERVATIVE: 36202,
  SAMPLER_BINDING: 35097,
  RGB10_A2UI: 36975,
  INT_2_10_10_10_REV: 36255,
  TRANSFORM_FEEDBACK: 36386,
  TRANSFORM_FEEDBACK_PAUSED: 36387,
  TRANSFORM_FEEDBACK_ACTIVE: 36388,
  TRANSFORM_FEEDBACK_BINDING: 36389,
  TEXTURE_IMMUTABLE_FORMAT: 37167,
  MAX_ELEMENT_INDEX: 36203,
  TEXTURE_IMMUTABLE_LEVELS: 33503,
  TIMEOUT_IGNORED: -1,
  MAX_CLIENT_WAIT_TIMEOUT_WEBGL: 37447,
  QUERY_COUNTER_BITS_EXT: 34916,
  TIME_ELAPSED_EXT: 35007,
  TIMESTAMP_EXT: 36392,
  GPU_DISJOINT_EXT: 36795,
  TEXTURE_MAX_ANISOTROPY_EXT: 34046,
  MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047,
  UNMASKED_VENDOR_WEBGL: 37445,
  UNMASKED_RENDERER_WEBGL: 37446,
  COMPLETION_STATUS_KHR: 37297,
  COMPRESSED_RGB_S3TC_DXT1_EXT: 33776,
  COMPRESSED_RGBA_S3TC_DXT1_EXT: 33777,
  COMPRESSED_RGBA_S3TC_DXT3_EXT: 33778,
  COMPRESSED_RGBA_S3TC_DXT5_EXT: 33779,
  COMPRESSED_SRGB_S3TC_DXT1_EXT: 35916,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: 35917,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: 35918,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: 35919,
  COMPRESSED_R11_EAC: 37488,
  COMPRESSED_SIGNED_R11_EAC: 37489,
  COMPRESSED_RG11_EAC: 37490,
  COMPRESSED_SIGNED_RG11_EAC: 37491,
  COMPRESSED_RGB8_ETC2: 37492,
  COMPRESSED_SRGB8_ETC2: 37493,
  COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37494,
  COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37495,
  COMPRESSED_RGBA8_ETC2_EAC: 37496,
  COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 37497,
  COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 35840,
  COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 35841,
  COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 35842,
  COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 35843,
  COMPRESSED_RGBA_ASTC_4x4_KHR: 37808,
  COMPRESSED_RGBA_ASTC_5x4_KHR: 37809,
  COMPRESSED_RGBA_ASTC_5x5_KHR: 37810,
  COMPRESSED_RGBA_ASTC_6x5_KHR: 37811,
  COMPRESSED_RGBA_ASTC_6x6_KHR: 37812,
  COMPRESSED_RGBA_ASTC_8x5_KHR: 37813,
  COMPRESSED_RGBA_ASTC_8x6_KHR: 37814,
  COMPRESSED_RGBA_ASTC_8x8_KHR: 37815,
  COMPRESSED_RGBA_ASTC_10x5_KHR: 37816,
  COMPRESSED_RGBA_ASTC_10x6_KHR: 37817,
  COMPRESSED_RGBA_ASTC_10x8_KHR: 37818,
  COMPRESSED_RGBA_ASTC_10x10_KHR: 37819,
  COMPRESSED_RGBA_ASTC_12x10_KHR: 37820,
  COMPRESSED_RGBA_ASTC_12x12_KHR: 37821,
  COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR: 37840,
  COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR: 37841,
  COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR: 37842,
  COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR: 37843,
  COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR: 37844,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR: 37845,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR: 37846,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR: 37847,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR: 37848,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR: 37849,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR: 37850,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR: 37851,
  COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR: 37852,
  COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR: 37853
};
var TYPE_SIZE = {
  [GL.BYTE]: 1,
  [GL.UNSIGNED_BYTE]: 1,
  [GL.SHORT]: 2,
  [GL.UNSIGNED_SHORT]: 2,
  [GL.INT]: 4,
  [GL.UNSIGNED_INT]: 4,
  [GL.FLOAT]: 4
};
var TEXTURE_FORMATS = {
  [GL.R8]: [GL.RED, GL.UNSIGNED_BYTE],
  [GL.R8_SNORM]: [GL.RED, GL.BYTE],
  [GL.R16F]: [GL.RED, GL.FLOAT],
  [GL.R32F]: [GL.RED, GL.FLOAT],
  [GL.R8UI]: [GL.RED_INTEGER, GL.UNSIGNED_BYTE],
  [GL.R8I]: [GL.RED_INTEGER, GL.BYTE],
  [GL.R16UI]: [GL.RED_INTEGER, GL.UNSIGNED_SHORT],
  [GL.R16I]: [GL.RED_INTEGER, GL.SHORT],
  [GL.R32UI]: [GL.RED_INTEGER, GL.UNSIGNED_INT],
  [GL.R32I]: [GL.RED_INTEGER, GL.INT],
  [GL.RG8]: [GL.RG, GL.UNSIGNED_BYTE],
  [GL.RG8_SNORM]: [GL.RG, GL.BYTE],
  [GL.RG16F]: [GL.RG, GL.FLOAT],
  [GL.RG32F]: [GL.RG, GL.FLOAT],
  [GL.RG8UI]: [GL.RG_INTEGER, GL.UNSIGNED_BYTE],
  [GL.RG8I]: [GL.RG_INTEGER, GL.BYTE],
  [GL.RG16UI]: [GL.RG_INTEGER, GL.UNSIGNED_SHORT],
  [GL.RG16I]: [GL.RG_INTEGER, GL.SHORT],
  [GL.RG32UI]: [GL.RG_INTEGER, GL.UNSIGNED_INT],
  [GL.RG32I]: [GL.RG_INTEGER, GL.INT],
  [GL.RGB8]: [GL.RGB, GL.UNSIGNED_BYTE],
  [GL.SRGB8]: [GL.RGB, GL.UNSIGNED_BYTE],
  [GL.RGB565]: [GL.RGB, GL.UNSIGNED_SHORT_5_6_5],
  [GL.RGB8_SNORM]: [GL.RGB, GL.BYTE],
  [GL.R11F_G11F_B10F]: [GL.RGB, GL.UNSIGNED_INT_10F_11F_11F_REV],
  [GL.RGB9_E5]: [GL.RGB, GL.UNSIGNED_INT_5_9_9_9_REV],
  [GL.RGB16F]: [GL.RGB, GL.FLOAT],
  [GL.RGB32F]: [GL.RGB, GL.FLOAT],
  [GL.RGB8UI]: [GL.RGB_INTEGER, GL.UNSIGNED_BYTE],
  [GL.RGB8I]: [GL.RGB_INTEGER, GL.BYTE],
  [GL.RGB16UI]: [GL.RGB_INTEGER, GL.UNSIGNED_SHORT],
  [GL.RGB16I]: [GL.RGB_INTEGER, GL.SHORT],
  [GL.RGB32UI]: [GL.RGB_INTEGER, GL.UNSIGNED_INT],
  [GL.RGB32I]: [GL.RGB_INTEGER, GL.INT],
  [GL.RGBA8]: [GL.RGBA, GL.UNSIGNED_BYTE],
  [GL.SRGB8_ALPHA8]: [GL.RGBA, GL.UNSIGNED_BYTE],
  [GL.RGBA8_SNORM]: [GL.RGBA, GL.BYTE],
  [GL.RGB5_A1]: [GL.RGBA, GL.UNSIGNED_SHORT_5_5_5_1],
  [GL.RGBA4]: [GL.RGBA, GL.UNSIGNED_SHORT_4_4_4_4],
  [GL.RGB10_A2]: [GL.RGBA, GL.UNSIGNED_INT_2_10_10_10_REV],
  [GL.RGBA16F]: [GL.RGBA, GL.FLOAT],
  [GL.RGBA32F]: [GL.RGBA, GL.FLOAT],
  [GL.RGBA8UI]: [GL.RGBA_INTEGER, GL.UNSIGNED_BYTE],
  [GL.RGBA8I]: [GL.RGBA_INTEGER, GL.BYTE],
  [GL.RGB10_A2UI]: [GL.RGBA_INTEGER, GL.UNSIGNED_INT_2_10_10_10_REV],
  [GL.RGBA16UI]: [GL.RGBA_INTEGER, GL.UNSIGNED_SHORT],
  [GL.RGBA16I]: [GL.RGBA_INTEGER, GL.SHORT],
  [GL.RGBA32I]: [GL.RGBA_INTEGER, GL.INT],
  [GL.RGBA32UI]: [GL.RGBA_INTEGER, GL.UNSIGNED_INT],
  [GL.DEPTH_COMPONENT16]: [GL.DEPTH_COMPONENT, GL.UNSIGNED_SHORT],
  [GL.DEPTH_COMPONENT24]: [GL.DEPTH_COMPONENT, GL.UNSIGNED_INT],
  [GL.DEPTH_COMPONENT32F]: [GL.DEPTH_COMPONENT, GL.FLOAT],
  [GL.DEPTH24_STENCIL8]: [GL.DEPTH_STENCIL, GL.UNSIGNED_INT_24_8],
  [GL.DEPTH32F_STENCIL8]: [GL.DEPTH_STENCIL, GL.FLOAT_32_UNSIGNED_INT_24_8_REV]
};
var COMPRESSED_TEXTURE_TYPES = {
  [GL.COMPRESSED_RGB_S3TC_DXT1_EXT]: true,
  [GL.COMPRESSED_RGBA_S3TC_DXT1_EXT]: true,
  [GL.COMPRESSED_RGBA_S3TC_DXT3_EXT]: true,
  [GL.COMPRESSED_RGBA_S3TC_DXT5_EXT]: true,
  [GL.COMPRESSED_SRGB_S3TC_DXT1_EXT]: true,
  [GL.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT]: true,
  [GL.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT]: true,
  [GL.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT]: true,
  [GL.COMPRESSED_R11_EAC]: true,
  [GL.COMPRESSED_SIGNED_R11_EAC]: true,
  [GL.COMPRESSED_RG11_EAC]: true,
  [GL.COMPRESSED_SIGNED_RG11_EAC]: true,
  [GL.COMPRESSED_RGB8_ETC2]: true,
  [GL.COMPRESSED_SRGB8_ETC2]: true,
  [GL.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2]: true,
  [GL.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2]: true,
  [GL.COMPRESSED_RGBA8_ETC2_EAC]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC]: true,
  [GL.COMPRESSED_RGBA_ASTC_4x4_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_5x4_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_5x5_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_6x5_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_6x6_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_8x5_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_8x6_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_8x8_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_10x5_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_10x6_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_10x8_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_10x10_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_12x10_KHR]: true,
  [GL.COMPRESSED_RGBA_ASTC_12x12_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR]: true,
  [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR]: true,
  [GL.COMPRESSED_RGB_PVRTC_4BPPV1_IMG]: true,
  [GL.COMPRESSED_RGB_PVRTC_2BPPV1_IMG]: true,
  [GL.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG]: true,
  [GL.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG]: true
};
var WEBGL_INFO = {};
var DUMMY_UNIT_ARRAY = new Array(1);
var DUMMY_OBJECT = {};
var TEXTURE_FORMAT_DEFAULTS = {
  [GL.UNSIGNED_BYTE]: {
    [GL.RED]: GL.R8,
    [GL.RG]: GL.RG8,
    [GL.RGB]: GL.RGB8,
    [GL.RGBA]: GL.RGBA8
  },
  [GL.UNSIGNED_SHORT]: {
    [GL.DEPTH_COMPONENT]: GL.DEPTH_COMPONENT16
  },
  [GL.FLOAT]: {
    [GL.RED]: GL.R16F,
    [GL.RG]: GL.RG16F,
    [GL.RGB]: GL.RGB16F,
    [GL.RGBA]: GL.RGBA16F,
    [GL.DEPTH_COMPONENT]: GL.DEPTH_COMPONENT32F
  }
};

// node_modules/picogl/build/module/cubemap.js
var Cubemap = class {
  constructor(gl, appState, options) {
    this.gl = gl;
    this.texture = null;
    this.appState = appState;
    this.compressed = COMPRESSED_TEXTURE_TYPES[options.internalFormat];
    if (options.format !== void 0) {
      console.warn("Cubemap option 'format' is deprecated and will be removed. Use 'internalFormat' with a sized format instead.");
      this.compressed = Boolean(COMPRESSED_TEXTURE_TYPES[options.format]);
      if (options.type === void 0) {
        options.type = options.format === GL.DEPTH_COMPONENT ? GL.UNSIGNED_SHORT : GL.UNSIGNED_BYTE;
      }
      if (options.internalFormat === void 0) {
        if (this.compressed) {
          options.internalFormat = options.format;
        } else {
          options.internalFormat = TEXTURE_FORMAT_DEFAULTS[options.type][options.format];
        }
      }
    }
    if (this.compressed) {
      this.internalFormat = options.internalFormat;
      this.format = options.internalFormat;
      this.type = GL.UNSIGNED_BYTE;
    } else {
      this.internalFormat = options.internalFormat !== void 0 ? options.internalFormat : GL.RGBA8;
      let formatInfo = TEXTURE_FORMATS[this.internalFormat];
      this.format = formatInfo[0];
      this.type = options.type !== void 0 ? options.type : formatInfo[1];
    }
    this.currentUnit = -1;
    let arrayData = Array.isArray(options.negX);
    let negX = arrayData ? options.negX[0] : options.negX;
    let {
      width = negX.width,
      height = negX.height,
      flipY = false,
      premultiplyAlpha = false,
      minFilter = negX ? GL.LINEAR_MIPMAP_NEAREST : GL.NEAREST,
      magFilter = negX ? GL.LINEAR : GL.NEAREST,
      wrapS = GL.REPEAT,
      wrapT = GL.REPEAT,
      compareMode = GL.NONE,
      compareFunc = GL.LEQUAL,
      minLOD = null,
      maxLOD = null,
      baseLevel = null,
      maxLevel = null,
      maxAnisotropy = 1
    } = options;
    this.width = width;
    this.height = height;
    this.flipY = flipY;
    this.premultiplyAlpha = premultiplyAlpha;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.compareMode = compareMode;
    this.compareFunc = compareFunc;
    this.minLOD = minLOD;
    this.maxLOD = maxLOD;
    this.baseLevel = baseLevel;
    this.maxLevel = maxLevel;
    this.maxAnisotropy = Math.min(maxAnisotropy, WEBGL_INFO.MAX_TEXTURE_ANISOTROPY);
    this.mipmaps = minFilter === GL.LINEAR_MIPMAP_NEAREST || minFilter === GL.LINEAR_MIPMAP_LINEAR;
    this.miplevelsProvided = arrayData && options.negX.length > 1;
    this.levels = this.mipmaps ? Math.floor(Math.log2(Math.min(this.width, this.height))) + 1 : 1;
    this.restore(options);
  }
  restore(options = DUMMY_OBJECT) {
    this.texture = this.gl.createTexture();
    if (this.currentUnit !== -1) {
      this.appState.textures[this.currentUnit] = null;
    }
    this.bind(0);
    this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, this.magFilter);
    this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, this.minFilter);
    this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, this.wrapS);
    this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, this.wrapT);
    this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_COMPARE_FUNC, this.compareFunc);
    this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_COMPARE_MODE, this.compareMode);
    if (this.baseLevel !== null) {
      this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_BASE_LEVEL, this.baseLevel);
    }
    if (this.maxLevel !== null) {
      this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAX_LEVEL, this.maxLevel);
    }
    if (this.minLOD !== null) {
      this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_LOD, this.minLOD);
    }
    if (this.maxLOD !== null) {
      this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAX_LOD, this.maxLOD);
    }
    if (this.maxAnisotropy > 1) {
      this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
    }
    this.gl.texStorage2D(GL.TEXTURE_CUBE_MAP, this.levels, this.internalFormat, this.width, this.height);
    let {negX, posX, negY, posY, negZ, posZ} = options;
    if (negX) {
      this.faceData(GL.TEXTURE_CUBE_MAP_NEGATIVE_X, negX);
      this.faceData(GL.TEXTURE_CUBE_MAP_POSITIVE_X, posX);
      this.faceData(GL.TEXTURE_CUBE_MAP_NEGATIVE_Y, negY);
      this.faceData(GL.TEXTURE_CUBE_MAP_POSITIVE_Y, posY);
      this.faceData(GL.TEXTURE_CUBE_MAP_NEGATIVE_Z, negZ);
      this.faceData(GL.TEXTURE_CUBE_MAP_POSITIVE_Z, posZ);
    }
    if (this.mipmaps && !this.miplevelsProvided) {
      this.gl.generateMipmap(GL.TEXTURE_CUBE_MAP);
    }
    return this;
  }
  delete() {
    if (this.texture) {
      this.gl.deleteTexture(this.texture);
      this.texture = null;
      this.appState.textures[this.currentUnit] = null;
      this.currentUnit = -1;
    }
    return this;
  }
  faceData(face, data) {
    if (!Array.isArray(data)) {
      DUMMY_UNIT_ARRAY[0] = data;
      data = DUMMY_UNIT_ARRAY;
    }
    let numLevels = this.mipmaps ? data.length : 1;
    let width = this.width;
    let height = this.height;
    let i;
    this.gl.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, this.flipY);
    this.gl.pixelStorei(GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
    if (this.compressed) {
      for (i = 0; i < numLevels; ++i) {
        this.gl.compressedTexSubImage2D(face, i, 0, 0, width, height, this.format, data[i]);
        width = Math.max(width >> 1, 1);
        height = Math.max(height >> 1, 1);
      }
    } else {
      for (i = 0; i < numLevels; ++i) {
        this.gl.texSubImage2D(face, i, 0, 0, width, height, this.format, this.type, data[i]);
        width = Math.max(width >> 1, 1);
        height = Math.max(height >> 1, 1);
      }
    }
    return this;
  }
  bind(unit) {
    let currentTexture = this.appState.textures[unit];
    if (this.appState.activeTexture !== unit) {
      this.gl.activeTexture(GL.TEXTURE0 + unit);
      this.appState.activeTexture = unit;
    }
    if (currentTexture !== this) {
      if (currentTexture) {
        currentTexture.currentUnit = -1;
      }
      if (this.currentUnit !== -1) {
        this.appState.textures[this.currentUnit] = null;
      }
      this.gl.bindTexture(GL.TEXTURE_CUBE_MAP, this.texture);
      this.appState.textures[unit] = this;
      this.currentUnit = unit;
    }
    return this;
  }
};

// node_modules/picogl/build/module/draw-call.js
var DrawCall = class {
  constructor(gl, appState, program, vertexArray = null, primitive) {
    this.gl = gl;
    this.currentProgram = program;
    this.drawPrimitive = GL.TRIANGLES;
    this.currentVertexArray = vertexArray;
    this.currentTransformFeedback = null;
    this.appState = appState;
    this.uniformIndices = {};
    this.uniformNames = new Array(WEBGL_INFO.MAX_UNIFORMS);
    this.uniformValues = new Array(WEBGL_INFO.MAX_UNIFORMS);
    this.uniformCount = 0;
    this.uniformBuffers = new Array(WEBGL_INFO.MAX_UNIFORM_BUFFERS);
    this.uniformBlockNames = new Array(WEBGL_INFO.MAX_UNIFORM_BUFFERS);
    this.uniformBlockCount = 0;
    this.textures = new Array(WEBGL_INFO.MAX_TEXTURE_UNITS);
    this.textureCount = 0;
    this.offsets = new Int32Array(1);
    this.numElements = new Int32Array(1);
    this.numInstances = new Int32Array(1);
    this.numDraws = 1;
    this.drawCountsFromVertexArray = true;
    if (primitive !== void 0) {
      console.warn("Primitive argument to 'App.createDrawCall' is deprecated and will be removed. Use 'DrawCall.primitive' instead.");
      this.primitive(primitive);
    }
  }
  primitive(primitive) {
    this.drawPrimitive = primitive;
    return this;
  }
  transformFeedback(transformFeedback) {
    this.currentTransformFeedback = transformFeedback;
    return this;
  }
  uniform(name, value) {
    let index = this.uniformIndices[name];
    if (index === void 0) {
      index = this.uniformCount++;
      this.uniformIndices[name] = index;
      this.uniformNames[index] = name;
    }
    this.uniformValues[index] = value;
    return this;
  }
  texture(name, texture) {
    let unit = this.currentProgram.samplers[name];
    this.textures[unit] = texture;
    return this;
  }
  uniformBlock(name, buffer) {
    let base = this.currentProgram.uniformBlocks[name];
    this.uniformBuffers[base] = buffer;
    return this;
  }
  drawRanges(...counts) {
    this.numDraws = counts.length;
    if (this.offsets.length < this.numDraws) {
      this.offsets = new Int32Array(this.numDraws);
    }
    if (this.numElements.length < this.numDraws) {
      this.numElements = new Int32Array(this.numDraws);
    }
    if (this.numInstances.length < this.numDraws) {
      this.numInstances = new Int32Array(this.numDraws);
    }
    for (let i = 0; i < this.numDraws; ++i) {
      let count = counts[i];
      this.offsets[i] = count[0];
      this.numElements[i] = count[1];
      this.numInstances[i] = count[2] || 1;
    }
    this.drawCountsFromVertexArray = false;
    return this;
  }
  draw() {
    let uniformNames = this.uniformNames;
    let uniformValues = this.uniformValues;
    let uniformBuffers = this.uniformBuffers;
    let uniformBlockCount = this.currentProgram.uniformBlockCount;
    let textures = this.textures;
    let textureCount = this.currentProgram.samplerCount;
    let indexed = false;
    this.currentProgram.bind();
    if (this.currentVertexArray) {
      this.currentVertexArray.bind();
      indexed = this.currentVertexArray.indexed;
      if (this.drawCountsFromVertexArray) {
        this.numElements[0] = this.currentVertexArray.numElements;
        this.numInstances[0] = this.currentVertexArray.numInstances;
      }
    }
    for (let uIndex = 0; uIndex < this.uniformCount; ++uIndex) {
      this.currentProgram.uniform(uniformNames[uIndex], uniformValues[uIndex]);
    }
    for (let base = 0; base < uniformBlockCount; ++base) {
      uniformBuffers[base].bind(base);
    }
    for (let tIndex = 0; tIndex < textureCount; ++tIndex) {
      textures[tIndex].bind(tIndex);
    }
    if (this.currentTransformFeedback) {
      this.currentTransformFeedback.bind();
      this.gl.beginTransformFeedback(this.drawPrimitive);
    } else if (this.appState.transformFeedback) {
      this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, null);
      this.appState.transformFeedback = null;
    }
    if (WEBGL_INFO.MULTI_DRAW_INSTANCED) {
      let ext = this.appState.extensions.multiDrawInstanced;
      if (indexed) {
        ext.multiDrawElementsInstancedWEBGL(this.drawPrimitive, this.numElements, 0, this.currentVertexArray.indexType, this.offsets, 0, this.numInstances, 0, this.numDraws);
      } else {
        ext.multiDrawArraysInstancedWEBGL(this.drawPrimitive, this.offsets, 0, this.numElements, 0, this.numInstances, 0, this.numDraws);
      }
    } else if (indexed) {
      for (let i = 0; i < this.numDraws; ++i) {
        this.gl.drawElementsInstanced(this.drawPrimitive, this.numElements[i], this.currentVertexArray.indexType, this.offsets[i], this.numInstances[i]);
      }
    } else {
      for (let i = 0; i < this.numDraws; ++i) {
        this.gl.drawArraysInstanced(this.drawPrimitive, this.offsets[i], this.numElements[i], this.numInstances[i]);
      }
    }
    if (this.currentTransformFeedback) {
      this.gl.endTransformFeedback();
    }
    return this;
  }
};

// node_modules/picogl/build/module/texture.js
var Texture = class {
  constructor(gl, appState, binding, image, width = image.width, height = image.height, depth, is3D, options = DUMMY_OBJECT) {
    this.gl = gl;
    this.binding = binding;
    this.texture = null;
    this.width = width || 0;
    this.height = height || 0;
    this.depth = depth || 0;
    this.is3D = is3D;
    this.appState = appState;
    this.compressed = Boolean(COMPRESSED_TEXTURE_TYPES[options.internalFormat]);
    if (options.format !== void 0) {
      console.warn("Texture option 'format' is deprecated and will be removed. Use 'internalFormat' with a sized format instead.");
      this.compressed = Boolean(COMPRESSED_TEXTURE_TYPES[options.format]);
      if (options.type === void 0) {
        options.type = options.format === GL.DEPTH_COMPONENT ? GL.UNSIGNED_SHORT : GL.UNSIGNED_BYTE;
      }
      if (options.internalFormat === void 0) {
        if (this.compressed) {
          options.internalFormat = options.format;
        } else {
          options.internalFormat = TEXTURE_FORMAT_DEFAULTS[options.type][options.format];
        }
      }
    }
    if (this.compressed) {
      this.internalFormat = options.internalFormat;
      this.format = this.internalFormat;
      this.type = GL.UNSIGNED_BYTE;
    } else {
      this.internalFormat = options.internalFormat !== void 0 ? options.internalFormat : GL.RGBA8;
      let formatInfo = TEXTURE_FORMATS[this.internalFormat];
      this.format = formatInfo[0];
      this.type = options.type !== void 0 ? options.type : formatInfo[1];
    }
    this.currentUnit = -1;
    let {
      minFilter = image ? GL.LINEAR_MIPMAP_NEAREST : GL.NEAREST,
      magFilter = image ? GL.LINEAR : GL.NEAREST,
      wrapS = GL.REPEAT,
      wrapT = GL.REPEAT,
      wrapR = GL.REPEAT,
      compareMode = GL.NONE,
      compareFunc = GL.LEQUAL,
      minLOD = null,
      maxLOD = null,
      baseLevel = null,
      maxLevel = null,
      maxAnisotropy = 1,
      flipY = false,
      premultiplyAlpha = false
    } = options;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.wrapR = wrapR;
    this.compareMode = compareMode;
    this.compareFunc = compareFunc;
    this.minLOD = minLOD;
    this.maxLOD = maxLOD;
    this.baseLevel = baseLevel;
    this.maxLevel = maxLevel;
    this.maxAnisotropy = Math.min(maxAnisotropy, WEBGL_INFO.MAX_TEXTURE_ANISOTROPY);
    this.flipY = flipY;
    this.premultiplyAlpha = premultiplyAlpha;
    this.mipmaps = minFilter === GL.LINEAR_MIPMAP_NEAREST || minFilter === GL.LINEAR_MIPMAP_LINEAR;
    this.restore(image);
  }
  restore(image) {
    this.texture = null;
    this.resize(this.width, this.height, this.depth);
    if (image) {
      this.data(image);
    }
    return this;
  }
  resize(width, height, depth) {
    depth = depth || 0;
    if (this.texture && width === this.width && height === this.height && depth === this.depth) {
      return this;
    }
    this.gl.deleteTexture(this.texture);
    if (this.currentUnit !== -1) {
      this.appState.textures[this.currentUnit] = null;
    }
    this.texture = this.gl.createTexture();
    this.bind(Math.max(this.currentUnit, 0));
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.gl.texParameteri(this.binding, GL.TEXTURE_MIN_FILTER, this.minFilter);
    this.gl.texParameteri(this.binding, GL.TEXTURE_MAG_FILTER, this.magFilter);
    this.gl.texParameteri(this.binding, GL.TEXTURE_WRAP_S, this.wrapS);
    this.gl.texParameteri(this.binding, GL.TEXTURE_WRAP_T, this.wrapT);
    this.gl.texParameteri(this.binding, GL.TEXTURE_WRAP_R, this.wrapR);
    this.gl.texParameteri(this.binding, GL.TEXTURE_COMPARE_FUNC, this.compareFunc);
    this.gl.texParameteri(this.binding, GL.TEXTURE_COMPARE_MODE, this.compareMode);
    if (this.minLOD !== null) {
      this.gl.texParameterf(this.binding, GL.TEXTURE_MIN_LOD, this.minLOD);
    }
    if (this.maxLOD !== null) {
      this.gl.texParameterf(this.binding, GL.TEXTURE_MAX_LOD, this.maxLOD);
    }
    if (this.baseLevel !== null) {
      this.gl.texParameteri(this.binding, GL.TEXTURE_BASE_LEVEL, this.baseLevel);
    }
    if (this.maxLevel !== null) {
      this.gl.texParameteri(this.binding, GL.TEXTURE_MAX_LEVEL, this.maxLevel);
    }
    if (this.maxAnisotropy > 1) {
      this.gl.texParameteri(this.binding, GL.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
    }
    let levels;
    if (this.is3D) {
      if (this.mipmaps) {
        levels = Math.floor(Math.log2(Math.max(Math.max(this.width, this.height), this.depth))) + 1;
      } else {
        levels = 1;
      }
      this.gl.texStorage3D(this.binding, levels, this.internalFormat, this.width, this.height, this.depth);
    } else {
      if (this.mipmaps) {
        levels = Math.floor(Math.log2(Math.max(this.width, this.height))) + 1;
      } else {
        levels = 1;
      }
      this.gl.texStorage2D(this.binding, levels, this.internalFormat, this.width, this.height);
    }
    return this;
  }
  data(data) {
    if (!Array.isArray(data)) {
      DUMMY_UNIT_ARRAY[0] = data;
      data = DUMMY_UNIT_ARRAY;
    }
    let numLevels = this.mipmaps ? data.length : 1;
    let width = this.width;
    let height = this.height;
    let depth = this.depth;
    let generateMipmaps = this.mipmaps && data.length === 1;
    let i;
    this.bind(Math.max(this.currentUnit, 0));
    this.gl.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, this.flipY);
    this.gl.pixelStorei(GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
    if (this.compressed) {
      if (this.is3D) {
        for (i = 0; i < numLevels; ++i) {
          this.gl.compressedTexSubImage3D(this.binding, i, 0, 0, 0, width, height, depth, this.format, data[i]);
          width = Math.max(width >> 1, 1);
          height = Math.max(height >> 1, 1);
          depth = Math.max(depth >> 1, 1);
        }
      } else {
        for (i = 0; i < numLevels; ++i) {
          this.gl.compressedTexSubImage2D(this.binding, i, 0, 0, width, height, this.format, data[i]);
          width = Math.max(width >> 1, 1);
          height = Math.max(height >> 1, 1);
        }
      }
    } else if (this.is3D) {
      for (i = 0; i < numLevels; ++i) {
        this.gl.texSubImage3D(this.binding, i, 0, 0, 0, width, height, depth, this.format, this.type, data[i]);
        width = Math.max(width >> 1, 1);
        height = Math.max(height >> 1, 1);
        depth = Math.max(depth >> 1, 1);
      }
    } else {
      for (i = 0; i < numLevels; ++i) {
        this.gl.texSubImage2D(this.binding, i, 0, 0, width, height, this.format, this.type, data[i]);
        width = Math.max(width >> 1, 1);
        height = Math.max(height >> 1, 1);
      }
    }
    if (generateMipmaps) {
      this.gl.generateMipmap(this.binding);
    }
    return this;
  }
  delete() {
    if (this.texture) {
      this.gl.deleteTexture(this.texture);
      this.texture = null;
      if (this.currentUnit !== -1 && this.appState.textures[this.currentUnit] === this) {
        this.appState.textures[this.currentUnit] = null;
        this.currentUnit = -1;
      }
    }
    return this;
  }
  bind(unit) {
    let currentTexture = this.appState.textures[unit];
    if (this.appState.activeTexture !== unit) {
      this.gl.activeTexture(GL.TEXTURE0 + unit);
      this.appState.activeTexture = unit;
    }
    if (currentTexture !== this) {
      if (currentTexture) {
        currentTexture.currentUnit = -1;
      }
      if (this.currentUnit !== -1) {
        this.appState.textures[this.currentUnit] = null;
      }
      this.gl.bindTexture(this.binding, this.texture);
      this.appState.textures[unit] = this;
      this.currentUnit = unit;
    }
    return this;
  }
};

// node_modules/picogl/build/module/renderbuffer.js
var Renderbuffer = class {
  constructor(gl, width, height, internalFormat, samples = 0) {
    this.gl = gl;
    this.renderbuffer = null;
    this.width = width;
    this.height = height;
    this.internalFormat = internalFormat;
    this.samples = samples;
    this.restore();
  }
  restore() {
    this.renderbuffer = this.gl.createRenderbuffer();
    this.resize(this.width, this.height);
    return this;
  }
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.gl.bindRenderbuffer(GL.RENDERBUFFER, this.renderbuffer);
    this.gl.renderbufferStorageMultisample(GL.RENDERBUFFER, this.samples, this.internalFormat, this.width, this.height);
    this.gl.bindRenderbuffer(GL.RENDERBUFFER, null);
    return this;
  }
  delete() {
    this.gl.deleteRenderbuffer(this.renderbuffer);
    this.renderbuffer = null;
    return this;
  }
};

// node_modules/picogl/build/module/framebuffer.js
var Framebuffer = class {
  constructor(gl, appState) {
    this.gl = gl;
    this.framebuffer = null;
    this.appState = appState;
    this.numColorTargets = 0;
    this.colorAttachments = [];
    this.colorAttachmentEnums = [];
    this.colorAttachmentTargets = [];
    this.depthAttachment = null;
    this.depthAttachmentTarget = null;
    this.width = 0;
    this.height = 0;
    this.restore();
  }
  restore() {
    let currentFramebuffers = this.appState.framebuffers;
    for (let binding in currentFramebuffers) {
      if (currentFramebuffers[binding] === this) {
        currentFramebuffers[binding] = null;
      }
    }
    this.framebuffer = this.gl.createFramebuffer();
    return this;
  }
  colorTarget(index, attachment, target = attachment.is3D ? 0 : GL.TEXTURE_2D) {
    if (index >= this.numColorTargets) {
      let numColorTargets = index + 1;
      this.colorAttachmentEnums.length = numColorTargets;
      this.colorAttachments.length = numColorTargets;
      this.colorAttachmentTargets.length = numColorTargets;
      for (let i = this.numColorTargets; i < numColorTargets - 1; ++i) {
        this.colorAttachmentEnums[i] = GL.NONE;
        this.colorAttachments[i] = null;
        this.colorAttachmentTargets[i] = 0;
      }
      this.numColorTargets = numColorTargets;
    }
    this.colorAttachmentEnums[index] = GL.COLOR_ATTACHMENT0 + index;
    this.colorAttachments[index] = attachment;
    this.colorAttachmentTargets[index] = target;
    let currentFramebuffer = this.bindAndCaptureState();
    let binding = this.appState.drawFramebufferBinding;
    if (attachment instanceof Renderbuffer) {
      this.gl.framebufferRenderbuffer(binding, this.colorAttachmentEnums[index], GL.RENDERBUFFER, attachment.renderbuffer);
    } else if (attachment.is3D) {
      this.gl.framebufferTextureLayer(binding, this.colorAttachmentEnums[index], attachment.texture, 0, target);
    } else {
      this.gl.framebufferTexture2D(binding, this.colorAttachmentEnums[index], target, attachment.texture, 0);
    }
    this.gl.drawBuffers(this.colorAttachmentEnums);
    this.width = attachment.width;
    this.height = attachment.height;
    this.restoreState(currentFramebuffer);
    return this;
  }
  depthTarget(attachment, target = attachment.is3D ? 0 : GL.TEXTURE_2D) {
    let currentFramebuffer = this.bindAndCaptureState();
    let binding = this.appState.drawFramebufferBinding;
    this.depthAttachment = attachment;
    this.depthAttachmentTarget = target;
    if (attachment instanceof Renderbuffer) {
      this.gl.framebufferRenderbuffer(binding, GL.DEPTH_ATTACHMENT, GL.RENDERBUFFER, attachment.renderbuffer);
    } else if (attachment.is3D) {
      this.gl.framebufferTextureLayer(binding, GL.DEPTH_ATTACHMENT, attachment.texture, 0, target);
    } else {
      this.gl.framebufferTexture2D(binding, GL.DEPTH_ATTACHMENT, target, attachment.texture, 0);
    }
    this.width = attachment.width;
    this.height = attachment.height;
    this.restoreState(currentFramebuffer);
    return this;
  }
  resize(width = this.gl.drawingBufferWidth, height = this.gl.drawingBufferHeight) {
    let currentFramebuffer = this.bindAndCaptureState();
    let binding = this.appState.drawFramebufferBinding;
    for (let i = 0; i < this.numColorTargets; ++i) {
      let attachment = this.colorAttachments[i];
      if (!attachment) {
        continue;
      }
      attachment.resize(width, height);
      if (attachment instanceof Texture) {
        if (attachment.is3D) {
          this.gl.framebufferTextureLayer(binding, this.colorAttachmentEnums[i], attachment.texture, 0, this.colorAttachmentTargets[i]);
        } else {
          this.gl.framebufferTexture2D(binding, this.colorAttachmentEnums[i], this.colorAttachmentTargets[i], attachment.texture, 0);
        }
      }
    }
    if (this.depthAttachment) {
      this.depthAttachment.resize(width, height);
      if (this.depthAttachment instanceof Texture) {
        if (this.depthAttachment.is3D) {
          this.gl.framebufferTextureLayer(binding, GL.DEPTH_ATTACHMENT, this.depthAttachment.texture, 0, this.depthAttachmentTarget);
        } else {
          this.gl.framebufferTexture2D(binding, GL.DEPTH_ATTACHMENT, this.depthAttachmentTarget, this.depthAttachment.texture, 0);
        }
      }
    }
    this.width = width;
    this.height = height;
    this.restoreState(currentFramebuffer);
    return this;
  }
  delete() {
    if (this.framebuffer) {
      this.gl.deleteFramebuffer(this.framebuffer);
      this.framebuffer = null;
      let currentFramebuffers = this.appState.framebuffers;
      for (let binding in currentFramebuffers) {
        if (currentFramebuffers[binding] === this) {
          this.gl.bindFramebuffer(binding, null);
          currentFramebuffers[binding] = null;
        }
      }
    }
    return this;
  }
  getStatus() {
    let currentFramebuffer = this.bindAndCaptureState();
    let binding = this.appState.drawFramebufferBinding;
    let status = this.gl.checkFramebufferStatus(binding);
    this.restoreState(currentFramebuffer);
    return status;
  }
  bindForDraw() {
    let binding = this.appState.drawFramebufferBinding;
    let currentFramebuffers = this.appState.framebuffers;
    if (currentFramebuffers[binding] !== this) {
      this.gl.bindFramebuffer(binding, this.framebuffer);
      currentFramebuffers[binding] = this;
    }
    return this;
  }
  bindForRead() {
    let binding = this.appState.readFramebufferBinding;
    let currentFramebuffers = this.appState.framebuffers;
    if (currentFramebuffers[binding] !== this) {
      this.gl.bindFramebuffer(binding, this.framebuffer);
      currentFramebuffers[binding] = this;
    }
    return this;
  }
  bindAndCaptureState() {
    let binding = this.appState.drawFramebufferBinding;
    let currentFramebuffer = this.appState.framebuffers[binding];
    if (currentFramebuffer !== this) {
      this.gl.bindFramebuffer(binding, this.framebuffer);
    }
    return currentFramebuffer;
  }
  restoreState(framebuffer) {
    if (framebuffer !== this) {
      let binding = this.appState.drawFramebufferBinding;
      this.gl.bindFramebuffer(binding, framebuffer ? framebuffer.framebuffer : null);
    }
    return this;
  }
  get colorTextures() {
    console.error("Framebuffer.colorTextures is deprecated and will be removed. Please use Framebuffer.colorAttachments.");
    return this.colorAttachments;
  }
  get depthTexture() {
    console.error("Framebuffer.depthTexture is deprecated and will be removed. Please use Framebuffer.depthAttachment.");
    return this.depthAttachment;
  }
};

// node_modules/picogl/build/module/shader.js
var Shader = class {
  constructor(gl, appState, type, source) {
    this.gl = gl;
    this.appState = appState;
    this.shader = null;
    this.type = type;
    this.source = source.trim();
    this.restore();
  }
  restore() {
    this.shader = this.gl.createShader(this.type);
    this.gl.shaderSource(this.shader, this.source);
    this.gl.compileShader(this.shader);
    return this;
  }
  translatedSource() {
    if (WEBGL_INFO.DEBUG_SHADERS) {
      return this.appState.extensions.debugShaders.getTranslatedShaderSource(this.shader);
    } else {
      return "(Unavailable)";
    }
  }
  delete() {
    if (this.shader) {
      this.gl.deleteShader(this.shader);
      this.shader = null;
    }
    return this;
  }
  checkCompilation() {
    if (!this.gl.getShaderParameter(this.shader, GL.COMPILE_STATUS)) {
      let i, lines;
      console.error(this.gl.getShaderInfoLog(this.shader));
      lines = this.source.split("\n");
      for (i = 0; i < lines.length; ++i) {
        console.error(`${i + 1}: ${lines[i]}`);
      }
    }
    return this;
  }
};

// node_modules/picogl/build/module/uniforms.js
var UNIFORM_FUNC_NAME = {};
UNIFORM_FUNC_NAME[GL.BOOL] = "uniform1i";
UNIFORM_FUNC_NAME[GL.INT] = "uniform1i";
UNIFORM_FUNC_NAME[GL.SAMPLER_2D] = "uniform1i";
UNIFORM_FUNC_NAME[GL.INT_SAMPLER_2D] = "uniform1i";
UNIFORM_FUNC_NAME[GL.UNSIGNED_INT_SAMPLER_2D] = "uniform1i";
UNIFORM_FUNC_NAME[GL.SAMPLER_2D_SHADOW] = "uniform1i";
UNIFORM_FUNC_NAME[GL.SAMPLER_2D_ARRAY] = "uniform1i";
UNIFORM_FUNC_NAME[GL.INT_SAMPLER_2D_ARRAY] = "uniform1i";
UNIFORM_FUNC_NAME[GL.UNSIGNED_INT_SAMPLER_2D_ARRAY] = "uniform1i";
UNIFORM_FUNC_NAME[GL.SAMPLER_2D_ARRAY_SHADOW] = "uniform1i";
UNIFORM_FUNC_NAME[GL.SAMPLER_CUBE] = "uniform1i";
UNIFORM_FUNC_NAME[GL.INT_SAMPLER_CUBE] = "uniform1i";
UNIFORM_FUNC_NAME[GL.UNSIGNED_INT_SAMPLER_CUBE] = "uniform1i";
UNIFORM_FUNC_NAME[GL.SAMPLER_CUBE_SHADOW] = "uniform1i";
UNIFORM_FUNC_NAME[GL.SAMPLER_3D] = "uniform1i";
UNIFORM_FUNC_NAME[GL.INT_SAMPLER_3D] = "uniform1i";
UNIFORM_FUNC_NAME[GL.UNSIGNED_INT_SAMPLER_3D] = "uniform1i";
UNIFORM_FUNC_NAME[GL.UNSIGNED_INT] = "uniform1ui";
UNIFORM_FUNC_NAME[GL.FLOAT] = "uniform1f";
UNIFORM_FUNC_NAME[GL.FLOAT_VEC2] = "uniform2f";
UNIFORM_FUNC_NAME[GL.FLOAT_VEC3] = "uniform3f";
UNIFORM_FUNC_NAME[GL.FLOAT_VEC4] = "uniform4f";
UNIFORM_FUNC_NAME[GL.INT_VEC2] = "uniform2i";
UNIFORM_FUNC_NAME[GL.INT_VEC3] = "uniform3i";
UNIFORM_FUNC_NAME[GL.INT_VEC4] = "uniform4i";
UNIFORM_FUNC_NAME[GL.UNSIGNED_INT_VEC2] = "uniform2ui";
UNIFORM_FUNC_NAME[GL.UNSIGNED_INT_VEC3] = "uniform3ui";
UNIFORM_FUNC_NAME[GL.UNSIGNED_INT_VEC4] = "uniform4ui";
UNIFORM_FUNC_NAME[GL.BOOL_VEC2] = "uniform2i";
UNIFORM_FUNC_NAME[GL.BOOL_VEC3] = "uniform3i";
UNIFORM_FUNC_NAME[GL.BOOL_VEC4] = "uniform4i";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT2] = "uniformMatrix2fv";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT3] = "uniformMatrix3fv";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT4] = "uniformMatrix4fv";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT2x3] = "uniformMatrix2x3fv";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT2x4] = "uniformMatrix2x4fv";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT3x2] = "uniformMatrix3x2fv";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT3x4] = "uniformMatrix3x4fv";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT4x2] = "uniformMatrix4x2fv";
UNIFORM_FUNC_NAME[GL.FLOAT_MAT4x3] = "uniformMatrix4x3fv";
var UNIFORM_COMPONENT_COUNT = {};
UNIFORM_COMPONENT_COUNT[GL.BOOL] = 1;
UNIFORM_COMPONENT_COUNT[GL.INT] = 1;
UNIFORM_COMPONENT_COUNT[GL.SAMPLER_2D] = 1;
UNIFORM_COMPONENT_COUNT[GL.INT_SAMPLER_2D] = 1;
UNIFORM_COMPONENT_COUNT[GL.UNSIGNED_INT_SAMPLER_2D] = 1;
UNIFORM_COMPONENT_COUNT[GL.SAMPLER_2D_SHADOW] = 1;
UNIFORM_COMPONENT_COUNT[GL.SAMPLER_2D_ARRAY] = 1;
UNIFORM_COMPONENT_COUNT[GL.INT_SAMPLER_2D_ARRAY] = 1;
UNIFORM_COMPONENT_COUNT[GL.UNSIGNED_INT_SAMPLER_2D_ARRAY] = 1;
UNIFORM_COMPONENT_COUNT[GL.SAMPLER_2D_ARRAY_SHADOW] = 1;
UNIFORM_COMPONENT_COUNT[GL.SAMPLER_CUBE] = 1;
UNIFORM_COMPONENT_COUNT[GL.INT_SAMPLER_CUBE] = 1;
UNIFORM_COMPONENT_COUNT[GL.UNSIGNED_INT_SAMPLER_CUBE] = 1;
UNIFORM_COMPONENT_COUNT[GL.SAMPLER_CUBE_SHADOW] = 1;
UNIFORM_COMPONENT_COUNT[GL.SAMPLER_3D] = 1;
UNIFORM_COMPONENT_COUNT[GL.INT_SAMPLER_3D] = 1;
UNIFORM_COMPONENT_COUNT[GL.UNSIGNED_INT_SAMPLER_3D] = 1;
UNIFORM_COMPONENT_COUNT[GL.UNSIGNED_INT] = 1;
UNIFORM_COMPONENT_COUNT[GL.FLOAT] = 1;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_VEC2] = 2;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_VEC3] = 3;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_VEC4] = 4;
UNIFORM_COMPONENT_COUNT[GL.INT_VEC2] = 2;
UNIFORM_COMPONENT_COUNT[GL.INT_VEC3] = 3;
UNIFORM_COMPONENT_COUNT[GL.INT_VEC4] = 4;
UNIFORM_COMPONENT_COUNT[GL.UNSIGNED_INT_VEC2] = 2;
UNIFORM_COMPONENT_COUNT[GL.UNSIGNED_INT_VEC3] = 3;
UNIFORM_COMPONENT_COUNT[GL.UNSIGNED_INT_VEC4] = 4;
UNIFORM_COMPONENT_COUNT[GL.BOOL_VEC2] = 2;
UNIFORM_COMPONENT_COUNT[GL.BOOL_VEC3] = 3;
UNIFORM_COMPONENT_COUNT[GL.BOOL_VEC4] = 4;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT2] = 4;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT3] = 9;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT4] = 16;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT2x3] = 6;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT2x4] = 8;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT3x2] = 6;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT3x4] = 12;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT4x2] = 8;
UNIFORM_COMPONENT_COUNT[GL.FLOAT_MAT4x3] = 12;
var UNIFORM_CACHE_CLASS = {};
UNIFORM_CACHE_CLASS[GL.INT] = Int32Array;
UNIFORM_CACHE_CLASS[GL.SAMPLER_2D] = Int32Array;
UNIFORM_CACHE_CLASS[GL.INT_SAMPLER_2D] = Int32Array;
UNIFORM_CACHE_CLASS[GL.UNSIGNED_INT_SAMPLER_2D] = Int32Array;
UNIFORM_CACHE_CLASS[GL.SAMPLER_2D_SHADOW] = Int32Array;
UNIFORM_CACHE_CLASS[GL.SAMPLER_2D_ARRAY] = Int32Array;
UNIFORM_CACHE_CLASS[GL.INT_SAMPLER_2D_ARRAY] = Int32Array;
UNIFORM_CACHE_CLASS[GL.UNSIGNED_INT_SAMPLER_2D_ARRAY] = Int32Array;
UNIFORM_CACHE_CLASS[GL.SAMPLER_2D_ARRAY_SHADOW] = Int32Array;
UNIFORM_CACHE_CLASS[GL.SAMPLER_CUBE] = Int32Array;
UNIFORM_CACHE_CLASS[GL.INT_SAMPLER_CUBE] = Int32Array;
UNIFORM_CACHE_CLASS[GL.UNSIGNED_INT_SAMPLER_CUBE] = Int32Array;
UNIFORM_CACHE_CLASS[GL.SAMPLER_CUBE_SHADOW] = Int32Array;
UNIFORM_CACHE_CLASS[GL.SAMPLER_3D] = Int32Array;
UNIFORM_CACHE_CLASS[GL.INT_SAMPLER_3D] = Int32Array;
UNIFORM_CACHE_CLASS[GL.UNSIGNED_INT_SAMPLER_3D] = Int32Array;
UNIFORM_CACHE_CLASS[GL.UNSIGNED_INT] = Uint32Array;
UNIFORM_CACHE_CLASS[GL.FLOAT] = Float32Array;
UNIFORM_CACHE_CLASS[GL.FLOAT_VEC2] = Float32Array;
UNIFORM_CACHE_CLASS[GL.FLOAT_VEC3] = Float32Array;
UNIFORM_CACHE_CLASS[GL.FLOAT_VEC4] = Float32Array;
UNIFORM_CACHE_CLASS[GL.INT_VEC2] = Int32Array;
UNIFORM_CACHE_CLASS[GL.INT_VEC3] = Int32Array;
UNIFORM_CACHE_CLASS[GL.INT_VEC4] = Int32Array;
UNIFORM_CACHE_CLASS[GL.UNSIGNED_INT_VEC2] = Uint32Array;
UNIFORM_CACHE_CLASS[GL.UNSIGNED_INT_VEC3] = Uint32Array;
UNIFORM_CACHE_CLASS[GL.UNSIGNED_INT_VEC4] = Uint32Array;
var SingleComponentUniform = class {
  constructor(gl, handle, type) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = UNIFORM_FUNC_NAME[type];
    this.cache = type === GL.BOOL ? false : 0;
  }
  set(value) {
    if (this.cache !== value) {
      this.gl[this.glFuncName](this.handle, value);
      this.cache = value;
    }
  }
};
var MultiNumericUniform = class {
  constructor(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = UNIFORM_FUNC_NAME[type] + "v";
    this.count = count;
    this.cache = new UNIFORM_CACHE_CLASS[type](UNIFORM_COMPONENT_COUNT[type] * count);
  }
  set(value) {
    for (let i = 0, len5 = value.length; i < len5; ++i) {
      if (this.cache[i] !== value[i]) {
        this.gl[this.glFuncName](this.handle, value);
        this.cache.set(value);
        return;
      }
    }
  }
};
var MultiBoolUniform = class {
  constructor(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = UNIFORM_FUNC_NAME[type] + "v";
    this.count = count;
    this.cache = new Array(UNIFORM_COMPONENT_COUNT[type] * count).fill(false);
  }
  set(value) {
    for (let i = 0, len5 = value.length; i < len5; ++i) {
      if (this.cache[i] !== value[i]) {
        this.gl[this.glFuncName](this.handle, value);
        for (let j = i; j < len5; j++) {
          this.cache[j] = value[j];
        }
        return;
      }
    }
  }
};
var MatrixUniform = class {
  constructor(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = UNIFORM_FUNC_NAME[type];
    this.count = count;
    this.cache = new Float32Array(UNIFORM_COMPONENT_COUNT[type] * count);
  }
  set(value) {
    for (let i = 0, len5 = value.length; i < len5; ++i) {
      if (this.cache[i] !== value[i]) {
        this.gl[this.glFuncName](this.handle, false, value);
        this.cache.set(value);
        return;
      }
    }
  }
};

// node_modules/picogl/build/module/program.js
var Program = class {
  constructor(gl, appState, vsSource, fsSource, xformFeebackVars, attributeLocations, transformFeedbackMode) {
    this.gl = gl;
    this.appState = appState;
    this.program = null;
    this.transformFeedbackVaryings = xformFeebackVars || null;
    this.transformFeedbackMode = transformFeedbackMode || GL.SEPARATE_ATTRIBS;
    this.attributeLocations = attributeLocations || null;
    this.uniforms = {};
    this.uniformBlocks = {};
    this.uniformBlockCount = 0;
    this.samplers = {};
    this.samplerCount = 0;
    this.vertexSource = null;
    this.vertexShader = null;
    this.fragmentSource = null;
    this.fragmentShader = null;
    this.linked = false;
    if (typeof vsSource === "string") {
      this.vertexSource = vsSource;
    } else {
      this.vertexShader = vsSource;
    }
    if (typeof fsSource === "string") {
      this.fragmentSource = fsSource;
    } else {
      this.fragmentShader = fsSource;
    }
    this.initialize();
  }
  restore() {
    this.initialize();
    this.link();
    this.checkLinkage();
    return this;
  }
  translatedVertexSource() {
    if (this.vertexShader) {
      return this.vertexShader.translatedSource();
    } else {
      let vertexShader = new Shader(this.gl, this.appState, GL.VERTEX_SHADER, this.vertexSource);
      let translatedSource = vertexShader.translatedSource();
      vertexShader.delete();
      return translatedSource;
    }
  }
  translatedFragmentSource() {
    if (this.fragmentShader) {
      return this.fragmentShader.translatedSource();
    } else {
      let fragmentShader = new Shader(this.gl, this.appState, GL.FRAGMENT_SHADER, this.fragmentSource);
      let translatedSource = fragmentShader.translatedSource();
      fragmentShader.delete();
      return translatedSource;
    }
  }
  delete() {
    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
      if (this.appState.program === this) {
        this.gl.useProgram(null);
        this.appState.program = null;
      }
    }
    return this;
  }
  initialize() {
    if (this.appState.program === this) {
      this.gl.useProgram(null);
      this.appState.program = null;
    }
    this.linked = false;
    this.uniformBlockCount = 0;
    this.samplerCount = 0;
    if (this.vertexSource) {
      this.vertexShader = new Shader(this.gl, this.appState, GL.VERTEX_SHADER, this.vertexSource);
    }
    if (this.fragmentSource) {
      this.fragmentShader = new Shader(this.gl, this.appState, GL.FRAGMENT_SHADER, this.fragmentSource);
    }
    this.program = this.gl.createProgram();
    return this;
  }
  link() {
    this.gl.attachShader(this.program, this.vertexShader.shader);
    this.gl.attachShader(this.program, this.fragmentShader.shader);
    if (this.transformFeedbackVaryings) {
      this.gl.transformFeedbackVaryings(this.program, this.transformFeedbackVaryings, this.transformFeedbackMode);
    }
    if (this.attributeLocations) {
      for (let name in this.attributeLocations) {
        this.gl.bindAttribLocation(this.program, this.attributeLocations[name], name);
      }
    }
    this.gl.linkProgram(this.program);
    return this;
  }
  checkCompletion() {
    if (WEBGL_INFO.PARALLEL_SHADER_COMPILE) {
      return this.gl.getProgramParameter(this.program, GL.COMPLETION_STATUS_KHR);
    }
    return true;
  }
  checkLinkage() {
    if (this.linked) {
      return this;
    }
    if (this.gl.getProgramParameter(this.program, GL.LINK_STATUS)) {
      this.linked = true;
      this.initVariables();
    } else {
      console.error(this.gl.getProgramInfoLog(this.program));
      this.vertexShader.checkCompilation();
      this.fragmentShader.checkCompilation();
    }
    if (this.vertexSource) {
      this.vertexShader.delete();
      this.vertexShader = null;
    }
    if (this.fragmentSource) {
      this.fragmentShader.delete();
      this.fragmentShader = null;
    }
    return this;
  }
  initVariables() {
    this.bind();
    let numUniforms = this.gl.getProgramParameter(this.program, GL.ACTIVE_UNIFORMS);
    let textureUnit;
    for (let i = 0; i < numUniforms; ++i) {
      let uniformInfo = this.gl.getActiveUniform(this.program, i);
      let uniformHandle = this.gl.getUniformLocation(this.program, uniformInfo.name);
      let UniformClass = null;
      let type = uniformInfo.type;
      let numElements = uniformInfo.size;
      switch (type) {
        case GL.SAMPLER_2D:
        case GL.INT_SAMPLER_2D:
        case GL.UNSIGNED_INT_SAMPLER_2D:
        case GL.SAMPLER_2D_SHADOW:
        case GL.SAMPLER_2D_ARRAY:
        case GL.INT_SAMPLER_2D_ARRAY:
        case GL.UNSIGNED_INT_SAMPLER_2D_ARRAY:
        case GL.SAMPLER_2D_ARRAY_SHADOW:
        case GL.SAMPLER_CUBE:
        case GL.INT_SAMPLER_CUBE:
        case GL.UNSIGNED_INT_SAMPLER_CUBE:
        case GL.SAMPLER_CUBE_SHADOW:
        case GL.SAMPLER_3D:
        case GL.INT_SAMPLER_3D:
        case GL.UNSIGNED_INT_SAMPLER_3D:
          textureUnit = this.samplerCount++;
          this.samplers[uniformInfo.name] = textureUnit;
          this.gl.uniform1i(uniformHandle, textureUnit);
          break;
        case GL.INT:
        case GL.UNSIGNED_INT:
        case GL.FLOAT:
          UniformClass = numElements > 1 ? MultiNumericUniform : SingleComponentUniform;
          break;
        case GL.BOOL:
          UniformClass = numElements > 1 ? MultiBoolUniform : SingleComponentUniform;
          break;
        case GL.FLOAT_VEC2:
        case GL.INT_VEC2:
        case GL.UNSIGNED_INT_VEC2:
        case GL.FLOAT_VEC3:
        case GL.INT_VEC3:
        case GL.UNSIGNED_INT_VEC3:
        case GL.FLOAT_VEC4:
        case GL.INT_VEC4:
        case GL.UNSIGNED_INT_VEC4:
          UniformClass = MultiNumericUniform;
          break;
        case GL.BOOL_VEC2:
        case GL.BOOL_VEC3:
        case GL.BOOL_VEC4:
          UniformClass = MultiBoolUniform;
          break;
        case GL.FLOAT_MAT2:
        case GL.FLOAT_MAT3:
        case GL.FLOAT_MAT4:
        case GL.FLOAT_MAT2x3:
        case GL.FLOAT_MAT2x4:
        case GL.FLOAT_MAT3x2:
        case GL.FLOAT_MAT3x4:
        case GL.FLOAT_MAT4x2:
        case GL.FLOAT_MAT4x3:
          UniformClass = MatrixUniform;
          break;
        default:
          console.error("Unrecognized type for uniform ", uniformInfo.name);
          break;
      }
      if (UniformClass) {
        this.uniforms[uniformInfo.name] = new UniformClass(this.gl, uniformHandle, type, numElements);
      }
    }
    let numUniformBlocks = this.gl.getProgramParameter(this.program, GL.ACTIVE_UNIFORM_BLOCKS);
    for (let i = 0; i < numUniformBlocks; ++i) {
      let blockName = this.gl.getActiveUniformBlockName(this.program, i);
      let blockIndex = this.gl.getUniformBlockIndex(this.program, blockName);
      let uniformBlockBase = this.uniformBlockCount++;
      this.gl.uniformBlockBinding(this.program, blockIndex, uniformBlockBase);
      this.uniformBlocks[blockName] = uniformBlockBase;
    }
  }
  uniform(name, value) {
    if (this.uniforms[name]) {
      this.uniforms[name].set(value);
    }
    return this;
  }
  bind() {
    if (this.appState.program !== this) {
      this.gl.useProgram(this.program);
      this.appState.program = this;
    }
    return this;
  }
};

// node_modules/picogl/build/module/query.js
var Query = class {
  constructor(gl, target) {
    this.gl = gl;
    this.query = null;
    this.target = target;
    this.active = false;
    this.result = null;
    this.restore();
  }
  restore() {
    this.query = this.gl.createQuery();
    this.active = false;
    this.result = null;
    return this;
  }
  begin() {
    if (!this.active) {
      this.gl.beginQuery(this.target, this.query);
      this.result = null;
    }
    return this;
  }
  end() {
    if (!this.active) {
      this.gl.endQuery(this.target);
      this.active = true;
    }
    return this;
  }
  ready() {
    if (this.active && this.gl.getQueryParameter(this.query, GL.QUERY_RESULT_AVAILABLE)) {
      this.active = false;
      this.result = Number(this.gl.getQueryParameter(this.query, GL.QUERY_RESULT));
      return true;
    }
    return false;
  }
  delete() {
    if (this.query) {
      this.gl.deleteQuery(this.query);
      this.query = null;
    }
    return this;
  }
};

// node_modules/picogl/build/module/timer.js
var Timer = class {
  constructor(gl) {
    this.gl = gl;
    this.cpuTimer = window.performance || window.Date;
    this.gpuTimerQuery = null;
    this.cpuStartTime = 0;
    this.cpuTime = 0;
    this.gpuTime = 0;
    this.restore();
  }
  restore() {
    if (WEBGL_INFO.GPU_TIMER) {
      if (this.gpuTimerQuery) {
        this.gpuTimerQuery.restore();
      } else {
        this.gpuTimerQuery = new Query(this.gl, GL.TIME_ELAPSED_EXT);
      }
    }
    this.cpuStartTime = 0;
    this.cpuTime = 0;
    this.gpuTime = 0;
    return this;
  }
  start() {
    if (WEBGL_INFO.GPU_TIMER) {
      if (!this.gpuTimerQuery.active) {
        this.gpuTimerQuery.begin();
        this.cpuStartTime = this.cpuTimer.now();
      }
    } else {
      this.cpuStartTime = this.cpuTimer.now();
    }
    return this;
  }
  end() {
    if (WEBGL_INFO.GPU_TIMER) {
      if (!this.gpuTimerQuery.active) {
        this.gpuTimerQuery.end();
        this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
      }
    } else {
      this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
    }
    return this;
  }
  ready() {
    if (WEBGL_INFO.GPU_TIMER) {
      if (!this.gpuTimerQuery.active) {
        return false;
      }
      var gpuTimerAvailable = this.gpuTimerQuery.ready();
      var gpuTimerDisjoint = this.gl.getParameter(GL.GPU_DISJOINT_EXT);
      if (gpuTimerAvailable && !gpuTimerDisjoint) {
        this.gpuTime = this.gpuTimerQuery.result / 1e6;
        return true;
      } else {
        return false;
      }
    } else {
      return Boolean(this.cpuStartTime);
    }
  }
  delete() {
    if (this.gpuTimerQuery) {
      this.gpuTimerQuery.delete();
      this.gpuTimerQuery = null;
    }
    return this;
  }
};

// node_modules/picogl/build/module/transform-feedback.js
var TransformFeedback = class {
  constructor(gl, appState) {
    this.gl = gl;
    this.appState = appState;
    this.transformFeedback = null;
    this.restore();
  }
  restore() {
    if (this.appState.transformFeedback === this) {
      this.appState.transformFeedback = null;
    }
    this.transformFeedback = this.gl.createTransformFeedback();
    return this;
  }
  feedbackBuffer(index, buffer) {
    this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, this.transformFeedback);
    this.gl.bindBufferBase(GL.TRANSFORM_FEEDBACK_BUFFER, index, buffer.buffer);
    this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, null);
    this.gl.bindBufferBase(GL.TRANSFORM_FEEDBACK_BUFFER, index, null);
    return this;
  }
  delete() {
    if (this.transformFeedback) {
      this.gl.deleteTransformFeedback(this.transformFeedback);
      this.transformFeedback = null;
      if (this.appState.transformFeedback === this) {
        this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, null);
        this.appState.transformFeedback = null;
      }
    }
    return this;
  }
  bind() {
    if (this.appState.transformFeedback !== this) {
      this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, this.transformFeedback);
      this.appState.transformFeedback = this;
    }
    return this;
  }
};

// node_modules/picogl/build/module/uniform-buffer.js
var UniformBuffer = class {
  constructor(gl, appState, layout, usage = gl.DYNAMIC_DRAW) {
    this.gl = gl;
    this.buffer = null;
    this.dataViews = {};
    this.offsets = new Array(layout.length);
    this.sizes = new Array(layout.length);
    this.types = new Array(layout.length);
    this.size = 0;
    this.usage = usage;
    this.appState = appState;
    this.currentBase = -1;
    for (let i = 0, len5 = layout.length; i < len5; ++i) {
      let type = layout[i];
      switch (type) {
        case GL.FLOAT:
        case GL.INT:
        case GL.UNSIGNED_INT:
        case GL.BOOL:
          this.offsets[i] = this.size;
          this.sizes[i] = 1;
          if (type === GL.INT) {
            this.types[i] = GL.INT;
          } else if (type === GL.UNSIGNED_INT) {
            this.types[i] = GL.UNSIGNED_INT;
          } else {
            this.types[i] = GL.FLOAT;
          }
          this.size++;
          break;
        case GL.FLOAT_VEC2:
        case GL.INT_VEC2:
        case GL.UNSIGNED_INT_VEC2:
        case GL.BOOL_VEC2:
          this.size += this.size % 2;
          this.offsets[i] = this.size;
          this.sizes[i] = 2;
          if (type === GL.INT_VEC2) {
            this.types[i] = GL.INT;
          } else if (type === GL.UNSIGNED_INT_VEC2) {
            this.types[i] = GL.UNSIGNED_INT;
          } else {
            this.types[i] = GL.FLOAT;
          }
          this.size += 2;
          break;
        case GL.FLOAT_VEC3:
        case GL.INT_VEC3:
        case GL.UNSIGNED_INT_VEC3:
        case GL.BOOL_VEC3:
        case GL.FLOAT_VEC4:
        case GL.INT_VEC4:
        case GL.UNSIGNED_INT_VEC4:
        case GL.BOOL_VEC4:
          this.size += (4 - this.size % 4) % 4;
          this.offsets[i] = this.size;
          this.sizes[i] = 4;
          if (type === GL.INT_VEC4 || type === GL.INT_VEC3) {
            this.types[i] = GL.INT;
          } else if (type === GL.UNSIGNED_INT_VEC4 || type === GL.UNSIGNED_INT_VEC3) {
            this.types[i] = GL.UNSIGNED_INT;
          } else {
            this.types[i] = GL.FLOAT;
          }
          this.size += 4;
          break;
        case GL.FLOAT_MAT2:
        case GL.FLOAT_MAT2x3:
        case GL.FLOAT_MAT2x4:
          this.size += (4 - this.size % 4) % 4;
          this.offsets[i] = this.size;
          this.sizes[i] = 8;
          this.types[i] = GL.FLOAT;
          this.size += 8;
          break;
        case GL.FLOAT_MAT3:
        case GL.FLOAT_MAT3x2:
        case GL.FLOAT_MAT3x4:
          this.size += (4 - this.size % 4) % 4;
          this.offsets[i] = this.size;
          this.sizes[i] = 12;
          this.types[i] = GL.FLOAT;
          this.size += 12;
          break;
        case GL.FLOAT_MAT4:
        case GL.FLOAT_MAT4x2:
        case GL.FLOAT_MAT4x3:
          this.size += (4 - this.size % 4) % 4;
          this.offsets[i] = this.size;
          this.sizes[i] = 16;
          this.types[i] = GL.FLOAT;
          this.size += 16;
          break;
        default:
          console.error("Unsupported type for uniform buffer.");
      }
    }
    this.size += (4 - this.size % 4) % 4;
    this.data = new Float32Array(this.size);
    this.dataViews[GL.FLOAT] = this.data;
    this.dataViews[GL.INT] = new Int32Array(this.data.buffer);
    this.dataViews[GL.UNSIGNED_INT] = new Uint32Array(this.data.buffer);
    this.dirtyStart = this.size;
    this.dirtyEnd = 0;
    this.restore();
  }
  restore() {
    if (this.currentBase !== -1 && this.appState.uniformBuffers[this.currentBase] === this) {
      this.appState.uniformBuffers[this.currentBase] = null;
    }
    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(GL.UNIFORM_BUFFER, this.buffer);
    this.gl.bufferData(GL.UNIFORM_BUFFER, this.size * 4, this.usage);
    this.gl.bindBuffer(GL.UNIFORM_BUFFER, null);
    return this;
  }
  set(index, value) {
    let view = this.dataViews[this.types[index]];
    let offset = this.offsets[index];
    let size = this.sizes[index];
    if (this.sizes[index] === 1) {
      view[offset] = value;
    } else {
      view.set(value, offset);
    }
    if (offset < this.dirtyStart) {
      this.dirtyStart = offset;
    }
    if (this.dirtyEnd < offset + size) {
      this.dirtyEnd = offset + size;
    }
    return this;
  }
  update() {
    if (this.dirtyStart >= this.dirtyEnd) {
      return this;
    }
    let data = this.data.subarray(this.dirtyStart, this.dirtyEnd);
    let offset = this.dirtyStart * 4;
    this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
    this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, offset, data);
    this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);
    this.dirtyStart = this.size;
    this.dirtyEnd = 0;
    return this;
  }
  delete() {
    if (this.buffer) {
      this.gl.deleteBuffer(this.buffer);
      this.buffer = null;
      if (this.currentBase !== -1 && this.appState.uniformBuffers[this.currentBase] === this) {
        this.appState.uniformBuffers[this.currentBase] = null;
      }
      this.currentBase = -1;
    }
    return this;
  }
  bind(base) {
    let currentBuffer = this.appState.uniformBuffers[base];
    if (currentBuffer !== this) {
      if (currentBuffer) {
        currentBuffer.currentBase = -1;
      }
      if (this.currentBase !== -1) {
        this.appState.uniformBuffers[this.currentBase] = null;
      }
      this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);
      this.appState.uniformBuffers[base] = this;
      this.currentBase = base;
    }
    return this;
  }
};

// node_modules/picogl/build/module/vertex-array.js
var VertexArray = class {
  constructor(gl, appState) {
    this.gl = gl;
    this.appState = appState;
    this.vertexArray = null;
    this.indexType = null;
    this.indexed = false;
    this.numElements = 0;
    this.numInstances = 1;
    this.offsets = 0;
    this.numDraws = 1;
  }
  restore() {
    if (this.appState.vertexArray === this) {
      this.appState.vertexArray = null;
    }
    if (this.vertexArray !== null) {
      this.vertexArray = this.gl.createVertexArray();
    }
    return this;
  }
  vertexAttributeBuffer(attributeIndex, vertexBuffer, options = DUMMY_OBJECT) {
    this.attributeBuffer(attributeIndex, vertexBuffer, options, false);
    return this;
  }
  instanceAttributeBuffer(attributeIndex, vertexBuffer, options = DUMMY_OBJECT) {
    this.attributeBuffer(attributeIndex, vertexBuffer, options, true);
    return this;
  }
  indexBuffer(vertexBuffer) {
    if (this.vertexArray === null) {
      this.vertexArray = this.gl.createVertexArray();
    }
    this.bind();
    this.gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vertexBuffer.buffer);
    this.numElements = vertexBuffer.numItems * 3;
    this.indexType = vertexBuffer.type;
    this.indexed = true;
    return this;
  }
  delete() {
    if (this.vertexArray) {
      this.gl.deleteVertexArray(this.vertexArray);
      this.vertexArray = null;
      if (this.appState.vertexArray === this) {
        this.gl.bindVertexArray(null);
        this.appState.vertexArray = null;
      }
    }
    return this;
  }
  bind() {
    if (this.appState.vertexArray !== this) {
      this.gl.bindVertexArray(this.vertexArray);
      this.appState.vertexArray = this;
    }
    return this;
  }
  attributeBuffer(attributeIndex, vertexBuffer, options = {}, instanced) {
    if (this.vertexArray === null) {
      this.vertexArray = this.gl.createVertexArray();
    }
    this.bind();
    this.gl.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer.buffer);
    let {
      type = vertexBuffer.type,
      size = vertexBuffer.itemSize,
      stride = 0,
      offset = 0,
      normalized = false,
      integer = Boolean(vertexBuffer.integer && !normalized)
    } = options;
    let numColumns = vertexBuffer.numColumns;
    if (stride === 0) {
      stride = numColumns * size * TYPE_SIZE[type];
    }
    let numItems = Math.ceil((vertexBuffer.byteLength - offset) / stride);
    for (let i = 0; i < numColumns; ++i) {
      if (integer) {
        this.gl.vertexAttribIPointer(attributeIndex + i, size, type, stride, offset + i * size * TYPE_SIZE[type]);
      } else {
        this.gl.vertexAttribPointer(attributeIndex + i, size, type, normalized, stride, offset + i * size * TYPE_SIZE[type]);
      }
      if (instanced) {
        this.gl.vertexAttribDivisor(attributeIndex + i, 1);
      }
      this.gl.enableVertexAttribArray(attributeIndex + i);
    }
    if (this.numDraws === 1) {
      if (instanced) {
        this.numInstances = numItems;
      } else if (!this.indexed) {
        this.numElements = numItems;
      }
    }
    this.gl.bindBuffer(GL.ARRAY_BUFFER, null);
    return this;
  }
};

// node_modules/picogl/build/module/vertex-buffer.js
var INTEGER_TYPES = {
  [GL.BYTE]: true,
  [GL.UNSIGNED_BYTE]: true,
  [GL.SHORT]: true,
  [GL.UNSIGNED_SHORT]: true,
  [GL.INT]: true,
  [GL.UNSIGNED_INT]: true
};
var VertexBuffer = class {
  constructor(gl, appState, type, itemSize, data, usage = gl.STATIC_DRAW, indexArray) {
    let numColumns;
    switch (type) {
      case GL.FLOAT_MAT4:
      case GL.FLOAT_MAT4x2:
      case GL.FLOAT_MAT4x3:
        numColumns = 4;
        break;
      case GL.FLOAT_MAT3:
      case GL.FLOAT_MAT3x2:
      case GL.FLOAT_MAT3x4:
        numColumns = 3;
        break;
      case GL.FLOAT_MAT2:
      case GL.FLOAT_MAT2x3:
      case GL.FLOAT_MAT2x4:
        numColumns = 2;
        break;
      default:
        numColumns = 1;
    }
    switch (type) {
      case GL.FLOAT_MAT4:
      case GL.FLOAT_MAT3x4:
      case GL.FLOAT_MAT2x4:
        itemSize = 4;
        type = GL.FLOAT;
        break;
      case GL.FLOAT_MAT3:
      case GL.FLOAT_MAT4x3:
      case GL.FLOAT_MAT2x3:
        itemSize = 3;
        type = GL.FLOAT;
        break;
      case GL.FLOAT_MAT2:
      case GL.FLOAT_MAT3x2:
      case GL.FLOAT_MAT4x2:
        itemSize = 2;
        type = GL.FLOAT;
        break;
    }
    let dataLength;
    let byteLength;
    if (typeof data === "number") {
      dataLength = data;
      if (type) {
        data *= TYPE_SIZE[type];
      }
      byteLength = data;
    } else {
      dataLength = data.length;
      byteLength = data.byteLength;
    }
    this.gl = gl;
    this.buffer = null;
    this.appState = appState;
    this.type = type;
    this.itemSize = itemSize;
    this.numItems = type ? dataLength / (itemSize * numColumns) : byteLength / itemSize;
    this.numColumns = numColumns;
    this.byteLength = byteLength;
    this.usage = usage;
    this.indexArray = Boolean(indexArray);
    this.integer = Boolean(INTEGER_TYPES[this.type]);
    this.binding = this.indexArray ? GL.ELEMENT_ARRAY_BUFFER : GL.ARRAY_BUFFER;
    this.restore(data);
  }
  restore(data) {
    if (!data) {
      data = this.byteLength;
    }
    if (this.appState.vertexArray) {
      this.gl.bindVertexArray(null);
      this.appState.vertexArray = null;
    }
    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.binding, this.buffer);
    this.gl.bufferData(this.binding, data, this.usage);
    this.gl.bindBuffer(this.binding, null);
    return this;
  }
  data(data, offset = 0) {
    if (this.appState.vertexArray) {
      this.gl.bindVertexArray(null);
      this.appState.vertexArray = null;
    }
    this.gl.bindBuffer(this.binding, this.buffer);
    this.gl.bufferSubData(this.binding, offset, data);
    this.gl.bindBuffer(this.binding, null);
    return this;
  }
  delete() {
    if (this.buffer) {
      this.gl.deleteBuffer(this.buffer);
      this.buffer = null;
    }
    return this;
  }
};

// node_modules/picogl/build/module/app.js
var App = class {
  constructor(gl) {
    this.gl = gl;
    this.canvas = gl.canvas;
    this.width = this.gl.drawingBufferWidth;
    this.height = this.gl.drawingBufferHeight;
    this.viewportX = 0;
    this.viewportY = 0;
    this.viewportWidth = 0;
    this.viewportHeight = 0;
    this.currentDrawCalls = null;
    this.emptyFragmentShader = null;
    this.state = {
      program: null,
      vertexArray: null,
      transformFeedback: null,
      activeTexture: -1,
      textures: new Array(WEBGL_INFO.MAX_TEXTURE_UNITS),
      uniformBuffers: new Array(WEBGL_INFO.MAX_UNIFORM_BUFFERS),
      freeUniformBufferBases: [],
      framebuffers: {},
      drawFramebufferBinding: GL.DRAW_FRAMEBUFFER,
      readFramebufferBinding: GL.READ_FRAMEBUFFER,
      extensions: {}
    };
    this.clearBits = this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT;
    this.cpuTime = 0;
    this.gpuTime = 0;
    this.viewport(0, 0, this.width, this.height);
    this.contextLostExt = null;
    this.contextLostListener = null;
    this.contextRestoredListener = null;
    this.contextRestoredHandler = null;
    this.initExtensions();
  }
  loseContext() {
    if (this.contextLostExt) {
      this.contextLostExt.loseContext();
    }
    return this;
  }
  restoreContext() {
    if (this.contextLostExt) {
      this.contextLostExt.restoreContext();
    }
    return this;
  }
  onContextRestored(fn) {
    this.contextRestoredHandler = fn;
    this.initContextListeners();
    return this;
  }
  enable(cap) {
    this.gl.enable(cap);
    return this;
  }
  disable(cap) {
    this.gl.disable(cap);
    return this;
  }
  colorMask(r, g, b, a) {
    this.gl.colorMask(r, g, b, a);
    return this;
  }
  clearColor(r, g, b, a) {
    this.gl.clearColor(r, g, b, a);
    return this;
  }
  clearMask(mask) {
    this.clearBits = mask;
    return this;
  }
  clear() {
    this.gl.clear(this.clearBits);
    return this;
  }
  drawFramebuffer(framebuffer) {
    framebuffer.bindForDraw();
    return this;
  }
  readFramebuffer(framebuffer) {
    framebuffer.bindForRead();
    return this;
  }
  defaultDrawFramebuffer() {
    let binding = this.state.drawFramebufferBinding;
    if (this.state.framebuffers[binding] !== null) {
      this.gl.bindFramebuffer(binding, null);
      this.state.framebuffers[binding] = null;
    }
    return this;
  }
  defaultReadFramebuffer() {
    let binding = this.state.readFramebufferBinding;
    if (this.state.framebuffers[binding] !== null) {
      this.gl.bindFramebuffer(binding, null);
      this.state.framebuffers[binding] = null;
    }
    return this;
  }
  blitFramebuffer(mask, options = DUMMY_OBJECT) {
    let readBinding = this.state.readFramebufferBinding;
    let drawBinding = this.state.drawFramebufferBinding;
    let readFramebuffer = this.state.framebuffers[readBinding];
    let drawFramebuffer = this.state.framebuffers[drawBinding];
    let defaultReadWidth = readFramebuffer ? readFramebuffer.width : this.width;
    let defaultReadHeight = readFramebuffer ? readFramebuffer.height : this.height;
    let defaultDrawWidth = drawFramebuffer ? drawFramebuffer.width : this.width;
    let defaultDrawHeight = drawFramebuffer ? drawFramebuffer.height : this.height;
    let {
      srcStartX = 0,
      srcStartY = 0,
      srcEndX = defaultReadWidth,
      srcEndY = defaultReadHeight,
      dstStartX = 0,
      dstStartY = 0,
      dstEndX = defaultDrawWidth,
      dstEndY = defaultDrawHeight,
      filter = GL.NEAREST
    } = options;
    this.gl.blitFramebuffer(srcStartX, srcStartY, srcEndX, srcEndY, dstStartX, dstStartY, dstEndX, dstEndY, mask, filter);
    return this;
  }
  depthRange(near, far) {
    this.gl.depthRange(near, far);
    return this;
  }
  depthMask(mask) {
    this.gl.depthMask(mask);
    return this;
  }
  depthFunc(func) {
    this.gl.depthFunc(func);
    return this;
  }
  blendFunc(src, dest) {
    this.gl.blendFunc(src, dest);
    return this;
  }
  blendFuncSeparate(csrc, cdest, asrc, adest) {
    this.gl.blendFuncSeparate(csrc, cdest, asrc, adest);
    return this;
  }
  blendEquation(mode) {
    this.gl.blendEquation(mode);
    return this;
  }
  stencilMask(mask) {
    this.gl.stencilMask(mask);
    return this;
  }
  stencilMaskSeparate(face, mask) {
    this.gl.stencilMaskSeparate(face, mask);
    return this;
  }
  stencilFunc(func, ref, mask) {
    this.gl.stencilFunc(func, ref, mask);
    return this;
  }
  stencilFuncSeparate(face, func, ref, mask) {
    this.gl.stencilFuncSeparate(face, func, ref, mask);
    return this;
  }
  stencilOp(stencilFail, depthFail, pass) {
    this.gl.stencilOp(stencilFail, depthFail, pass);
    return this;
  }
  stencilOpSeparate(face, stencilFail, depthFail, pass) {
    this.gl.stencilOpSeparate(face, stencilFail, depthFail, pass);
    return this;
  }
  scissor(x, y, width, height) {
    this.gl.scissor(x, y, width, height);
    return this;
  }
  polygonOffset(factor, units) {
    this.gl.polygonOffset(factor, units);
    return this;
  }
  readPixel(x, y, outColor, options = DUMMY_OBJECT) {
    let {
      format = GL.RGBA,
      type = GL.UNSIGNED_BYTE
    } = options;
    this.gl.readPixels(x, y, 1, 1, format, type, outColor);
    return this;
  }
  viewport(x, y, width, height) {
    if (this.viewportWidth !== width || this.viewportHeight !== height || this.viewportX !== x || this.viewportY !== y) {
      this.viewportX = x;
      this.viewportY = y;
      this.viewportWidth = width;
      this.viewportHeight = height;
      this.gl.viewport(x, y, this.viewportWidth, this.viewportHeight);
    }
    return this;
  }
  defaultViewport() {
    this.viewport(0, 0, this.width, this.height);
    return this;
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = this.gl.drawingBufferWidth;
    this.height = this.gl.drawingBufferHeight;
    this.viewport(0, 0, this.width, this.height);
    return this;
  }
  createProgram(vsSource, fsSource, opts = {}) {
    let {transformFeedbackVaryings, attributeLocations, transformFeedbackMode} = opts;
    return new Program(this.gl, this.state, vsSource, fsSource, transformFeedbackVaryings, attributeLocations, transformFeedbackMode).link().checkLinkage();
  }
  createPrograms(...sources) {
    return new Promise((resolve, reject) => {
      let numPrograms = sources.length;
      let programs = new Array(numPrograms);
      let pendingPrograms = new Array(numPrograms);
      let numPending = numPrograms;
      for (let i = 0; i < numPrograms; ++i) {
        let source = sources[i];
        let vsSource = source[0];
        let fsSource = source[1];
        let opts = source[2] || {};
        let {transformFeedbackVaryings, attributeLocations, transformFeedbackMode} = opts;
        programs[i] = new Program(this.gl, this.state, vsSource, fsSource, transformFeedbackVaryings, attributeLocations, transformFeedbackMode);
        pendingPrograms[i] = programs[i];
      }
      for (let i = 0; i < numPrograms; ++i) {
        programs[i].link();
      }
      let poll = () => {
        let linked = 0;
        for (let i = 0; i < numPending; ++i) {
          if (pendingPrograms[i].checkCompletion()) {
            pendingPrograms[i].checkLinkage();
            if (pendingPrograms[i].linked) {
              ++linked;
            } else {
              reject(new Error("Program linkage failed"));
              return;
            }
          } else {
            pendingPrograms[i - linked] = pendingPrograms[i];
          }
        }
        numPending -= linked;
        if (numPending === 0) {
          resolve(programs);
        } else {
          requestAnimationFrame(poll);
        }
      };
      poll();
    });
  }
  restorePrograms(...programs) {
    return new Promise((resolve, reject) => {
      let numPrograms = programs.length;
      let pendingPrograms = programs.slice();
      let numPending = numPrograms;
      for (let i = 0; i < numPrograms; ++i) {
        programs[i].initialize();
      }
      for (let i = 0; i < numPrograms; ++i) {
        programs[i].link();
      }
      for (let i = 0; i < numPrograms; ++i) {
        programs[i].checkCompletion();
      }
      let poll = () => {
        let linked = 0;
        for (let i = 0; i < numPending; ++i) {
          if (pendingPrograms[i].checkCompletion()) {
            pendingPrograms[i].checkLinkage();
            if (pendingPrograms[i].linked) {
              ++linked;
            } else {
              reject(new Error("Program linkage failed"));
              return;
            }
          } else {
            pendingPrograms[i - linked] = pendingPrograms[i];
          }
        }
        numPending -= linked;
        if (numPending === 0) {
          resolve();
        } else {
          requestAnimationFrame(poll);
        }
      };
      poll();
    });
  }
  createShader(type, source) {
    return new Shader(this.gl, this.state, type, source);
  }
  createVertexArray() {
    return new VertexArray(this.gl, this.state);
  }
  createTransformFeedback() {
    return new TransformFeedback(this.gl, this.state);
  }
  createVertexBuffer(type, itemSize, data, usage) {
    return new VertexBuffer(this.gl, this.state, type, itemSize, data, usage);
  }
  createMatrixBuffer(type, data, usage) {
    return new VertexBuffer(this.gl, this.state, type, 0, data, usage);
  }
  createInterleavedBuffer(bytesPerVertex, data, usage) {
    return new VertexBuffer(this.gl, this.state, null, bytesPerVertex, data, usage);
  }
  createIndexBuffer(type, itemSize, data, usage) {
    if (ArrayBuffer.isView(itemSize)) {
      usage = data;
      data = itemSize;
      itemSize = 3;
    }
    return new VertexBuffer(this.gl, this.state, type, itemSize, data, usage, true);
  }
  createUniformBuffer(layout, usage) {
    return new UniformBuffer(this.gl, this.state, layout, usage);
  }
  createTexture2D(image, width, height, options) {
    if (typeof image === "number") {
      options = height;
      height = width;
      width = image;
      image = null;
    } else if (height === void 0) {
      options = width;
      width = image.width;
      height = image.height;
    }
    return new Texture(this.gl, this.state, this.gl.TEXTURE_2D, image, width, height, void 0, false, options);
  }
  createTextureArray(image, width, height, depth, options) {
    if (typeof image === "number") {
      options = depth;
      depth = height;
      height = width;
      width = image;
      image = null;
    }
    return new Texture(this.gl, this.state, this.gl.TEXTURE_2D_ARRAY, image, width, height, depth, true, options);
  }
  createTexture3D(image, width, height, depth, options) {
    if (typeof image === "number") {
      options = depth;
      depth = height;
      height = width;
      width = image;
      image = null;
    }
    return new Texture(this.gl, this.state, this.gl.TEXTURE_3D, image, width, height, depth, true, options);
  }
  createCubemap(options) {
    return new Cubemap(this.gl, this.state, options);
  }
  createRenderbuffer(width, height, internalFormat, samples = 0) {
    return new Renderbuffer(this.gl, width, height, internalFormat, samples);
  }
  createFramebuffer() {
    return new Framebuffer(this.gl, this.state);
  }
  createQuery(target) {
    return new Query(this.gl, target);
  }
  createTimer() {
    return new Timer(this.gl);
  }
  createDrawCall(program, vertexArray, primitive) {
    return new DrawCall(this.gl, this.state, program, vertexArray, primitive);
  }
  initExtensions() {
    this.gl.getExtension("EXT_color_buffer_float");
    this.gl.getExtension("OES_texture_float_linear");
    this.gl.getExtension("WEBGL_compressed_texture_s3tc");
    this.gl.getExtension("WEBGL_compressed_texture_s3tc_srgb");
    this.gl.getExtension("WEBGL_compressed_texture_etc");
    this.gl.getExtension("WEBGL_compressed_texture_astc");
    this.gl.getExtension("WEBGL_compressed_texture_pvrtc");
    this.gl.getExtension("EXT_disjoint_timer_query_webgl2");
    this.gl.getExtension("EXT_disjoint_timer_query");
    this.gl.getExtension("EXT_texture_filter_anisotropic");
    this.state.extensions.debugShaders = this.gl.getExtension("WEBGL_debug_shaders");
    this.contextLostExt = this.gl.getExtension("WEBGL_lose_context");
    this.gl.getExtension("KHR_parallel_shader_compile");
    this.state.extensions.multiDrawInstanced = this.gl.getExtension("WEBGL_multi_draw_instanced");
  }
  initContextListeners() {
    if (this.contextRestoredHandler) {
      this.contextLostListener = (e) => {
        e.preventDefault();
      };
      this.contextRestoredListener = () => {
        this.initExtensions();
        this.contextRestoredHandler();
      };
      this.canvas.addEventListener("webglcontextlost", this.contextLostListener);
      this.canvas.addEventListener("webglcontextrestored", this.contextRestoredListener);
    } else {
      this.canvas.removeEventListener("webglcontextlost", this.contextLostListener);
      this.canvas.removeEventListener("webglcontextrestored", this.contextRestoredListener);
      this.contextLostListener = null;
      this.contextRestoredListener = null;
    }
  }
  depthTest() {
    console.warn("App.depthTest is deprecated. Use App.enable(PicoGL.DEPTH_TEST) instead.");
    this.enable(GL.DEPTH_TEST);
    return this;
  }
  noDepthTest() {
    console.warn("App.noDepthTest is deprecated. Use App.disable(PicoGL.DEPTH_TEST) instead.");
    this.disable(GL.DEPTH_TEST);
    return this;
  }
  blend() {
    console.warn("App.blend is deprecated. Use App.enable(PicoGL.BLEND) instead.");
    this.enable(GL.BLEND);
    return this;
  }
  noBlend() {
    console.warn("App.noBlend is deprecated. Use App.disable(PicoGL.BLEND) instead.");
    this.disable(GL.BLEND);
    return this;
  }
  stencilTest() {
    console.warn("App.stencilTest is deprecated. Use App.enable(PicoGL.STENCIL_TEST) instead.");
    this.enable(GL.STENCIL_TEST);
    return this;
  }
  noStencilTest() {
    console.warn("App.noStencilTest is deprecated. Use App.disable(PicoGL.STENCIL_TEST) instead.");
    this.disable(GL.STENCIL_TEST);
    return this;
  }
  scissorTest() {
    console.warn("App.scissorTest is deprecated. Use App.enable(PicoGL.SCISSOR_TEST) instead.");
    this.enable(GL.SCISSOR_TEST);
    return this;
  }
  noScissorTest() {
    console.warn("App.noScissorTest is deprecated. Use App.disable(PicoGL.SCISSOR_TEST) instead.");
    this.disable(GL.SCISSOR_TEST);
    return this;
  }
  rasterize() {
    console.warn("App.noRasterize is deprecated. Use App.disable(PicoGL.RASTERIZER_DISCARD) instead.");
    this.disable(GL.RASTERIZER_DISCARD);
    return this;
  }
  noRasterize() {
    console.warn("App.rasterize is deprecated. Use App.enable(PicoGL.RASTERIZER_DISCARD) instead.");
    this.enable(GL.RASTERIZER_DISCARD);
    return this;
  }
  cullBackfaces() {
    console.warn("App.cullBackfaces is deprecated. Use App.enable(PicoGL.CULL_FACE) instead.");
    this.enable(GL.CULL_FACE);
    return this;
  }
  drawBackfaces() {
    console.warn("App.drawBackfaces is deprecated. Use App.disable(PicoGL.CULL_FACE) instead.");
    this.disable(GL.CULL_FACE);
    return this;
  }
};

// node_modules/picogl/build/module/picogl.js
var webglInfoInitialized = false;
var PicoGL = Object.assign({
  version: "0.17.7",
  WEBGL_INFO,
  createApp(gl, contextAttributes) {
    if (gl.tagName === "CANVAS") {
      gl = gl.getContext("webgl2", contextAttributes);
    }
    if (!webglInfoInitialized) {
      WEBGL_INFO.MAX_TEXTURE_UNITS = gl.getParameter(GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
      WEBGL_INFO.MAX_UNIFORM_BUFFERS = gl.getParameter(GL.MAX_UNIFORM_BUFFER_BINDINGS);
      WEBGL_INFO.MAX_UNIFORMS = Math.min(gl.getParameter(GL.MAX_VERTEX_UNIFORM_VECTORS), gl.getParameter(GL.MAX_FRAGMENT_UNIFORM_VECTORS));
      WEBGL_INFO.SAMPLES = gl.getParameter(GL.SAMPLES);
      WEBGL_INFO.VENDOR = "(Unknown)";
      WEBGL_INFO.RENDERER = "(Unknown)";
      WEBGL_INFO.FLOAT_RENDER_TARGETS = Boolean(gl.getExtension("EXT_color_buffer_float"));
      WEBGL_INFO.LINEAR_FLOAT_TEXTURES = Boolean(gl.getExtension("OES_texture_float_linear"));
      WEBGL_INFO.S3TC_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_s3tc"));
      WEBGL_INFO.S3TC_SRGB_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_s3tc_srgb"));
      WEBGL_INFO.ETC_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_etc"));
      WEBGL_INFO.ASTC_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_astc"));
      WEBGL_INFO.PVRTC_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_pvrtc"));
      WEBGL_INFO.LOSE_CONTEXT = Boolean(gl.getExtension("WEBGL_lose_context"));
      WEBGL_INFO.DEBUG_SHADERS = Boolean(gl.getExtension("WEBGL_debug_shaders"));
      WEBGL_INFO.GPU_TIMER = Boolean(gl.getExtension("EXT_disjoint_timer_query_webgl2") || gl.getExtension("EXT_disjoint_timer_query"));
      WEBGL_INFO.TEXTURE_ANISOTROPY = Boolean(gl.getExtension("EXT_texture_filter_anisotropic"));
      WEBGL_INFO.MAX_TEXTURE_ANISOTROPY = WEBGL_INFO.TEXTURE_ANISOTROPY ? gl.getParameter(GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1;
      WEBGL_INFO.DEBUG_RENDERER_INFO = Boolean(gl.getExtension("WEBGL_debug_renderer_info"));
      if (WEBGL_INFO.DEBUG_RENDERER_INFO) {
        WEBGL_INFO.VENDOR = gl.getParameter(GL.UNMASKED_VENDOR_WEBGL);
        WEBGL_INFO.RENDERER = gl.getParameter(GL.UNMASKED_RENDERER_WEBGL);
      }
      WEBGL_INFO.PARALLEL_SHADER_COMPILE = Boolean(gl.getExtension("KHR_parallel_shader_compile"));
      WEBGL_INFO.MULTI_DRAW_INSTANCED = Boolean(gl.getExtension("WEBGL_multi_draw_instanced"));
      webglInfoInitialized = true;
    }
    return new App(gl);
  }
}, GL);
var picogl_default = PicoGL;

// node_modules/gl-matrix/esm/common.js
var EPSILON = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var degree = Math.PI / 180;
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };

// node_modules/gl-matrix/esm/mat3.js
function create() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}

// node_modules/gl-matrix/esm/mat4.js
var mat4_exports = {};
__export(mat4_exports, {
  add: () => add,
  adjoint: () => adjoint,
  clone: () => clone,
  copy: () => copy,
  create: () => create2,
  determinant: () => determinant,
  equals: () => equals,
  exactEquals: () => exactEquals,
  frob: () => frob,
  fromQuat: () => fromQuat,
  fromQuat2: () => fromQuat2,
  fromRotation: () => fromRotation,
  fromRotationTranslation: () => fromRotationTranslation,
  fromRotationTranslationScale: () => fromRotationTranslationScale,
  fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
  fromScaling: () => fromScaling,
  fromTranslation: () => fromTranslation,
  fromValues: () => fromValues,
  fromXRotation: () => fromXRotation,
  fromYRotation: () => fromYRotation,
  fromZRotation: () => fromZRotation,
  frustum: () => frustum,
  getRotation: () => getRotation,
  getScaling: () => getScaling,
  getTranslation: () => getTranslation,
  identity: () => identity,
  invert: () => invert,
  lookAt: () => lookAt,
  mul: () => mul,
  multiply: () => multiply,
  multiplyScalar: () => multiplyScalar,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd,
  ortho: () => ortho,
  perspective: () => perspective,
  perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
  rotate: () => rotate,
  rotateX: () => rotateX,
  rotateY: () => rotateY,
  rotateZ: () => rotateZ,
  scale: () => scale,
  set: () => set,
  str: () => str,
  sub: () => sub,
  subtract: () => subtract,
  targetTo: () => targetTo,
  translate: () => translate,
  transpose: () => transpose
});
function create2() {
  var out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a03 = a[3];
    var a12 = a[6], a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}
function invert(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
function multiply(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function translate(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}
function scale(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function rotate(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len5 = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len5 < EPSILON) {
    return null;
  }
  len5 = 1 / len5;
  x *= len5;
  y *= len5;
  z *= len5;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  if (a !== out) {
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotation(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len5 = Math.hypot(x, y, z);
  var s, c, t;
  if (len5 < EPSILON) {
    return null;
  }
  len5 = 1 / len5;
  x *= len5;
  y *= len5;
  z *= len5;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotationTranslation(out, q, v) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
function perspective(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  var xScale = 2 / (leftTan + rightTan);
  var yScale = 2 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = yScale;
  out[6] = 0;
  out[7] = 0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near / (near - far);
  out[15] = 0;
  return out;
}
function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len5;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len5 = 1 / Math.hypot(z0, z1, z2);
  z0 *= len5;
  z1 *= len5;
  z2 *= len5;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len5 = Math.hypot(x0, x1, x2);
  if (!len5) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len5 = 1 / len5;
    x0 *= len5;
    x1 *= len5;
    x2 *= len5;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len5 = Math.hypot(y0, y1, y2);
  if (!len5) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len5 = 1 / len5;
    y0 *= len5;
    y1 *= len5;
    y2 *= len5;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len5 = z0 * z0 + z1 * z1 + z2 * z2;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
    z0 *= len5;
    z1 *= len5;
    z2 *= len5;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len5 = x0 * x0 + x1 * x1 + x2 * x2;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
    x0 *= len5;
    x1 *= len5;
    x2 *= len5;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale6) {
  out[0] = a[0] + b[0] * scale6;
  out[1] = a[1] + b[1] * scale6;
  out[2] = a[2] + b[2] * scale6;
  out[3] = a[3] + b[3] * scale6;
  out[4] = a[4] + b[4] * scale6;
  out[5] = a[5] + b[5] * scale6;
  out[6] = a[6] + b[6] * scale6;
  out[7] = a[7] + b[7] * scale6;
  out[8] = a[8] + b[8] * scale6;
  out[9] = a[9] + b[9] * scale6;
  out[10] = a[10] + b[10] * scale6;
  out[11] = a[11] + b[11] * scale6;
  out[12] = a[12] + b[12] * scale6;
  out[13] = a[13] + b[13] * scale6;
  out[14] = a[14] + b[14] * scale6;
  out[15] = a[15] + b[15] * scale6;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var mul = multiply;
var sub = subtract;

// node_modules/gl-matrix/esm/quat.js
var quat_exports = {};
__export(quat_exports, {
  add: () => add4,
  calculateW: () => calculateW,
  clone: () => clone4,
  conjugate: () => conjugate,
  copy: () => copy4,
  create: () => create5,
  dot: () => dot3,
  equals: () => equals4,
  exactEquals: () => exactEquals4,
  exp: () => exp,
  fromEuler: () => fromEuler,
  fromMat3: () => fromMat3,
  fromValues: () => fromValues4,
  getAngle: () => getAngle,
  getAxisAngle: () => getAxisAngle,
  identity: () => identity2,
  invert: () => invert2,
  len: () => len3,
  length: () => length3,
  lerp: () => lerp3,
  ln: () => ln,
  mul: () => mul4,
  multiply: () => multiply4,
  normalize: () => normalize3,
  pow: () => pow,
  random: () => random3,
  rotateX: () => rotateX3,
  rotateY: () => rotateY3,
  rotateZ: () => rotateZ3,
  rotationTo: () => rotationTo,
  scale: () => scale4,
  set: () => set4,
  setAxes: () => setAxes,
  setAxisAngle: () => setAxisAngle,
  slerp: () => slerp,
  sqlerp: () => sqlerp,
  sqrLen: () => sqrLen3,
  squaredLength: () => squaredLength3,
  str: () => str4
});

// node_modules/gl-matrix/esm/vec3.js
var vec3_exports = {};
__export(vec3_exports, {
  add: () => add2,
  angle: () => angle,
  bezier: () => bezier,
  ceil: () => ceil,
  clone: () => clone2,
  copy: () => copy2,
  create: () => create3,
  cross: () => cross,
  dist: () => dist,
  distance: () => distance,
  div: () => div,
  divide: () => divide,
  dot: () => dot,
  equals: () => equals2,
  exactEquals: () => exactEquals2,
  floor: () => floor,
  forEach: () => forEach,
  fromValues: () => fromValues2,
  hermite: () => hermite,
  inverse: () => inverse,
  len: () => len,
  length: () => length,
  lerp: () => lerp,
  max: () => max,
  min: () => min,
  mul: () => mul2,
  multiply: () => multiply2,
  negate: () => negate,
  normalize: () => normalize,
  random: () => random,
  rotateX: () => rotateX2,
  rotateY: () => rotateY2,
  rotateZ: () => rotateZ2,
  round: () => round,
  scale: () => scale2,
  scaleAndAdd: () => scaleAndAdd,
  set: () => set2,
  sqrDist: () => sqrDist,
  sqrLen: () => sqrLen,
  squaredDistance: () => squaredDistance,
  squaredLength: () => squaredLength,
  str: () => str2,
  sub: () => sub2,
  subtract: () => subtract2,
  transformMat3: () => transformMat3,
  transformMat4: () => transformMat4,
  transformQuat: () => transformQuat,
  zero: () => zero
});
function create3() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function clone2(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
function fromValues2(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set2(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply2(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
function scale2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale6) {
  out[0] = a[0] + b[0] * scale6;
  out[1] = a[1] + b[1] * scale6;
  out[2] = a[2] + b[2] * scale6;
  return out;
}
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
function inverse(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len5 = x * x + y * y + z * z;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = a[0] * len5;
  out[1] = a[1] * len5;
  out[2] = a[2] * len5;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2];
  var bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function random(out, scale6) {
  scale6 = scale6 || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale6;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale6;
  return out;
}
function transformMat4(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
function transformMat3(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
function transformQuat(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var x = a[0], y = a[1], z = a[2];
  var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
function rotateX2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateY2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateZ2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function angle(a, b) {
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str2(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals2(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals2(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub2 = subtract2;
var mul2 = multiply2;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
  var vec = create3();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/vec4.js
var vec4_exports = {};
__export(vec4_exports, {
  add: () => add3,
  ceil: () => ceil2,
  clone: () => clone3,
  copy: () => copy3,
  create: () => create4,
  cross: () => cross2,
  dist: () => dist2,
  distance: () => distance2,
  div: () => div2,
  divide: () => divide2,
  dot: () => dot2,
  equals: () => equals3,
  exactEquals: () => exactEquals3,
  floor: () => floor2,
  forEach: () => forEach2,
  fromValues: () => fromValues3,
  inverse: () => inverse2,
  len: () => len2,
  length: () => length2,
  lerp: () => lerp2,
  max: () => max2,
  min: () => min2,
  mul: () => mul3,
  multiply: () => multiply3,
  negate: () => negate2,
  normalize: () => normalize2,
  random: () => random2,
  round: () => round2,
  scale: () => scale3,
  scaleAndAdd: () => scaleAndAdd2,
  set: () => set3,
  sqrDist: () => sqrDist2,
  sqrLen: () => sqrLen2,
  squaredDistance: () => squaredDistance2,
  squaredLength: () => squaredLength2,
  str: () => str3,
  sub: () => sub3,
  subtract: () => subtract3,
  transformMat4: () => transformMat42,
  transformQuat: () => transformQuat2,
  zero: () => zero2
});
function create4() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}
function clone3(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues3(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set3(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract3(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function multiply3(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
function divide2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
function ceil2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
function floor2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
function min2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
function max2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
function round2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
function scale3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function scaleAndAdd2(out, a, b, scale6) {
  out[0] = a[0] + b[0] * scale6;
  out[1] = a[1] + b[1] * scale6;
  out[2] = a[2] + b[2] * scale6;
  out[3] = a[3] + b[3] * scale6;
  return out;
}
function distance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
function squaredDistance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
function length2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
function squaredLength2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
function negate2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
function inverse2(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  out[3] = 1 / a[3];
  return out;
}
function normalize2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len5 = x * x + y * y + z * z + w * w;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = x * len5;
  out[1] = y * len5;
  out[2] = z * len5;
  out[3] = w * len5;
  return out;
}
function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross2(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
function lerp2(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
function random2(out, scale6) {
  scale6 = scale6 || 1;
  var v1, v2, v3, v4;
  var s1, s2;
  do {
    v1 = RANDOM() * 2 - 1;
    v2 = RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = RANDOM() * 2 - 1;
    v4 = RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale6 * v1;
  out[1] = scale6 * v2;
  out[2] = scale6 * v3 * d;
  out[3] = scale6 * v4 * d;
  return out;
}
function transformMat42(out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
function transformQuat2(out, a, q) {
  var x = a[0], y = a[1], z = a[2];
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
function zero2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}
function str3(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals3(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var sub3 = subtract3;
var mul3 = multiply3;
var div2 = divide2;
var dist2 = distance2;
var sqrDist2 = squaredDistance2;
var len2 = length2;
var sqrLen2 = squaredLength2;
var forEach2 = function() {
  var vec = create4();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/quat.js
function create5() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}
function identity2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2;
  var s = Math.sin(rad / 2);
  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}
function getAngle(a, b) {
  var dotproduct = dot3(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
function multiply4(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function rotateX3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
function rotateY3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var by = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
function rotateZ3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bz = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
function calculateW(out, a) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
  return out;
}
function exp(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
function ln(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
function pow(out, a, b) {
  ln(out, a);
  scale4(out, out, b);
  exp(out, out);
  return out;
}
function slerp(out, a, b, t) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  var omega, cosom, sinom, scale0, scale1;
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  if (cosom < 0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (1 - cosom > EPSILON) {
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    scale0 = 1 - t;
    scale1 = t;
  }
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
function random3(out) {
  var u1 = RANDOM();
  var u2 = RANDOM();
  var u3 = RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
  return out;
}
function invert2(out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var dot5 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot5 ? 1 / dot5 : 0;
  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
function fromMat3(out, m) {
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;
  if (fTrace > 0) {
    fRoot = Math.sqrt(fTrace + 1);
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    var i = 0;
    if (m[4] > m[0])
      i = 1;
    if (m[8] > m[i * 3 + i])
      i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out;
}
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
function str4(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone4 = clone3;
var fromValues4 = fromValues3;
var copy4 = copy3;
var set4 = set3;
var add4 = add3;
var mul4 = multiply4;
var scale4 = scale3;
var dot3 = dot2;
var lerp3 = lerp2;
var length3 = length2;
var len3 = length3;
var squaredLength3 = squaredLength2;
var sqrLen3 = squaredLength3;
var normalize3 = normalize2;
var exactEquals4 = exactEquals3;
var equals4 = equals3;
var rotationTo = function() {
  var tmpvec3 = create3();
  var xUnitVec3 = fromValues2(1, 0, 0);
  var yUnitVec3 = fromValues2(0, 1, 0);
  return function(out, a, b) {
    var dot5 = dot(a, b);
    if (dot5 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 1e-6)
        cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot5 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot5;
      return normalize3(out, out);
    }
  };
}();
var sqlerp = function() {
  var temp1 = create5();
  var temp2 = create5();
  return function(out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
var setAxes = function() {
  var matr = create();
  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize3(out, fromMat3(out, matr));
  };
}();

// node_modules/gl-matrix/esm/vec2.js
var vec2_exports = {};
__export(vec2_exports, {
  add: () => add5,
  angle: () => angle2,
  ceil: () => ceil3,
  clone: () => clone5,
  copy: () => copy5,
  create: () => create6,
  cross: () => cross3,
  dist: () => dist3,
  distance: () => distance3,
  div: () => div3,
  divide: () => divide3,
  dot: () => dot4,
  equals: () => equals5,
  exactEquals: () => exactEquals5,
  floor: () => floor3,
  forEach: () => forEach3,
  fromValues: () => fromValues5,
  inverse: () => inverse3,
  len: () => len4,
  length: () => length4,
  lerp: () => lerp4,
  max: () => max3,
  min: () => min3,
  mul: () => mul5,
  multiply: () => multiply5,
  negate: () => negate3,
  normalize: () => normalize4,
  random: () => random4,
  rotate: () => rotate2,
  round: () => round3,
  scale: () => scale5,
  scaleAndAdd: () => scaleAndAdd3,
  set: () => set5,
  sqrDist: () => sqrDist3,
  sqrLen: () => sqrLen4,
  squaredDistance: () => squaredDistance3,
  squaredLength: () => squaredLength4,
  str: () => str5,
  sub: () => sub4,
  subtract: () => subtract4,
  transformMat2: () => transformMat2,
  transformMat2d: () => transformMat2d,
  transformMat3: () => transformMat32,
  transformMat4: () => transformMat43,
  zero: () => zero3
});
function create6() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function clone5(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function fromValues5(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
function copy5(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function set5(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
function add5(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function multiply5(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
function divide3(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
function ceil3(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
function floor3(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
function min3(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
function max3(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
function round3(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
function scale5(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function scaleAndAdd3(out, a, b, scale6) {
  out[0] = a[0] + b[0] * scale6;
  out[1] = a[1] + b[1] * scale6;
  return out;
}
function distance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return Math.hypot(x, y);
}
function squaredDistance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return x * x + y * y;
}
function length4(a) {
  var x = a[0], y = a[1];
  return Math.hypot(x, y);
}
function squaredLength4(a) {
  var x = a[0], y = a[1];
  return x * x + y * y;
}
function negate3(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
function inverse3(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  return out;
}
function normalize4(out, a) {
  var x = a[0], y = a[1];
  var len5 = x * x + y * y;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = a[0] * len5;
  out[1] = a[1] * len5;
  return out;
}
function dot4(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function cross3(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
function lerp4(out, a, b, t) {
  var ax = a[0], ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
function random4(out, scale6) {
  scale6 = scale6 || 1;
  var r = RANDOM() * 2 * Math.PI;
  out[0] = Math.cos(r) * scale6;
  out[1] = Math.sin(r) * scale6;
  return out;
}
function transformMat2(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
function transformMat2d(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
function transformMat32(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
function transformMat43(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
function rotate2(out, a, b, rad) {
  var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
function angle2(a, b) {
  var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero3(out) {
  out[0] = 0;
  out[1] = 0;
  return out;
}
function str5(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals5(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals5(a, b) {
  var a0 = a[0], a1 = a[1];
  var b0 = b[0], b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len4 = length4;
var sub4 = subtract4;
var mul5 = multiply5;
var div3 = divide3;
var dist3 = distance3;
var sqrDist3 = squaredDistance3;
var sqrLen4 = squaredLength4;
var forEach3 = function() {
  var vec = create6();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 2;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }
    return a;
  };
}();

// node_modules/@uncharted.software/grafer/build/lib/renderer/Renderable.js
var RenderMode;
(function(RenderMode2) {
  RenderMode2[RenderMode2["DRAFT"] = 0] = "DRAFT";
  RenderMode2[RenderMode2["MEDIUM"] = 1] = "MEDIUM";
  RenderMode2[RenderMode2["HIGH_PASS_1"] = 2] = "HIGH_PASS_1";
  RenderMode2[RenderMode2["HIGH_PASS_2"] = 3] = "HIGH_PASS_2";
  RenderMode2[RenderMode2["PICKING"] = 4] = "PICKING";
})(RenderMode || (RenderMode = {}));
var GL_TYPE_SIZE = {
  [picogl_default.BYTE]: 1,
  [picogl_default.UNSIGNED_BYTE]: 1,
  [picogl_default.SHORT]: 2,
  [picogl_default.UNSIGNED_SHORT]: 2,
  [picogl_default.INT]: 4,
  [picogl_default.UNSIGNED_INT]: 4,
  [picogl_default.FLOAT]: 4
};
var GL_TYPE_GETTER = {
  [picogl_default.BYTE]: (view, offset) => view.getInt8(offset),
  [picogl_default.UNSIGNED_BYTE]: (view, offset) => view.getUint8(offset),
  [picogl_default.SHORT]: (view, offset) => view.getInt16(offset, true),
  [picogl_default.UNSIGNED_SHORT]: (view, offset) => view.getUint16(offset, true),
  [picogl_default.INT]: (view, offset) => view.getInt32(offset, true),
  [picogl_default.UNSIGNED_INT]: (view, offset) => view.getUint32(offset, true),
  [picogl_default.FLOAT]: (view, offset) => view.getFloat32(offset, true)
};
var GL_TYPE_SETTER = {
  [picogl_default.BYTE]: (view, offset, value) => view.setInt8(offset, value),
  [picogl_default.UNSIGNED_BYTE]: (view, offset, value) => view.setUint8(offset, value),
  [picogl_default.SHORT]: (view, offset, value) => view.setInt16(offset, value, true),
  [picogl_default.UNSIGNED_SHORT]: (view, offset, value) => view.setUint16(offset, value, true),
  [picogl_default.INT]: (view, offset, value) => view.setInt32(offset, value, true),
  [picogl_default.UNSIGNED_INT]: (view, offset, value) => view.setUint32(offset, value, true),
  [picogl_default.FLOAT]: (view, offset, value) => view.setFloat32(offset, value, true)
};
function glDataTypeSize(type) {
  return Array.isArray(type) ? GL_TYPE_SIZE[type[0]] * type.length : GL_TYPE_SIZE[type];
}
function glIntegerType(type) {
  return type === picogl_default.FLOAT ? 0 : 1;
}
function glDataTypesInfo(types4) {
  const mappingsKeys = Object.keys(types4);
  const keys = [];
  let stride = 0;
  for (let i = 0, n = mappingsKeys.length; i < n; ++i) {
    if (types4[mappingsKeys[i]]) {
      stride += glDataTypeSize(types4[mappingsKeys[i]]);
      keys.push(mappingsKeys[i]);
    }
  }
  return {
    keys,
    stride
  };
}
function setDrawCallUniforms(drawCall, uniforms) {
  for (const [key, value] of Object.entries(uniforms)) {
    if (value.texture) {
      drawCall.texture(key, value);
    } else {
      drawCall.uniform(key, value);
    }
  }
}
function configureVAO(vao, vbo, types4, typesInfo, attrIndex = 0, instanced = false) {
  const functionKey = instanced ? "instanceAttributeBuffer" : "vertexAttributeBuffer";
  const stride = typesInfo.stride;
  let offset = 0;
  for (let i = 0, n = typesInfo.keys.length; i < n; ++i) {
    const type = types4[typesInfo.keys[i]];
    const glType = Array.isArray(type) ? type[0] : type;
    const size = Array.isArray(type) ? type.length : 1;
    vao[functionKey](attrIndex + i, vbo, {
      type: glType,
      integer: glIntegerType(glType),
      size,
      stride,
      offset
    });
    offset += glDataTypeSize(type);
  }
}

// node_modules/@uncharted.software/grafer/build/lib/renderer/Camera.js
var Camera = class {
  constructor(viewportSize, position = vec3_exports.fromValues(0, 0, -1)) {
    this._aovRad = 0;
    this._aov = 0;
    this._nearPlane = 1;
    this._farPlane = 1e3;
    this._position = vec3_exports.create();
    vec3_exports.copy(this._position, position);
    this._rotation = quat_exports.fromEuler(quat_exports.create(), 0, 0, 0);
    this._viewMatrix = mat4_exports.create();
    this._projectionMatrix = mat4_exports.create();
    this._viewportSize = vec2_exports.copy(vec2_exports.create(), viewportSize);
    this._aspect = this._viewportSize[0] / this._viewportSize[1];
    this.aov = 45;
    this.calculateProjectionMatrix();
  }
  get aovRad() {
    return this._aovRad;
  }
  set aovRad(value) {
    this._aovRad = value;
    this._aov = value * 57.29577951308232;
    this.calculateProjectionMatrix();
  }
  get aov() {
    return this._aov;
  }
  set aov(value) {
    this._aov = value;
    this._aovRad = value * 0.017453292519943295;
    this.calculateProjectionMatrix();
  }
  get nearPlane() {
    return this._nearPlane;
  }
  set nearPlane(value) {
    this._nearPlane = value;
    this.calculateProjectionMatrix();
  }
  get farPlane() {
    return this._farPlane;
  }
  set farPlane(value) {
    this._farPlane = value;
    this.calculateProjectionMatrix();
  }
  get viewportSize() {
    return this._viewportSize;
  }
  set viewportSize(value) {
    vec2_exports.copy(this._viewportSize, value);
    this._aspect = this._viewportSize[0] / this._viewportSize[1];
    this.calculateProjectionMatrix();
  }
  get position() {
    return this._position;
  }
  set position(value) {
    vec3_exports.copy(this._position, value);
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    quat_exports.copy(this._rotation, value);
  }
  get target() {
    return this._target;
  }
  set target(value) {
    vec3_exports.copy(this._target, value);
  }
  get aspect() {
    return this._aspect;
  }
  get viewMatrix() {
    mat4_exports.fromQuat(this._viewMatrix, this._rotation);
    mat4_exports.translate(this._viewMatrix, this._viewMatrix, this._position);
    return this._viewMatrix;
  }
  get projectionMatrix() {
    return this._projectionMatrix;
  }
  rotate(rotation) {
    quat_exports.mul(this._rotation, rotation, this._rotation);
  }
  calculateProjectionMatrix() {
    mat4_exports.perspective(this._projectionMatrix, this._aovRad, this._aspect, this._nearPlane, this._farPlane);
  }
};

// node_modules/@dekkai/event-emitter/build/lib/EventEmitter.js
var kOmniEvent = Symbol("EventEmitter::omni::event");
var EventEmitterMixin = class {
  static mixin(Parent) {
    const ParentConstructor = Parent;
    class EventEmitter2 extends ParentConstructor {
      constructor() {
        super(...arguments);
        this.listeners = new Map();
      }
      static get omniEvent() {
        return kOmniEvent;
      }
      on(type, callback) {
        const queue = this.listeners.get(type);
        if (queue) {
          queue.add(callback);
        } else {
          this.listeners.set(type, new Set([callback]));
        }
      }
      off(type, callback) {
        const queue = this.listeners.get(type);
        if (queue) {
          queue.delete(callback);
        }
      }
      emit(type, ...args) {
        if (type === kOmniEvent) {
          return;
        }
        if (this.listeners.has(type)) {
          const stack = new Set(this.listeners.get(type));
          for (const callback of stack) {
            callback.call(this, type, ...args);
          }
        }
        if (this.listeners.has(kOmniEvent)) {
          const omni = new Set(this.listeners.get(kOmniEvent));
          for (const callback of omni) {
            callback.call(this, type, ...args);
          }
        }
      }
    }
    return EventEmitter2;
  }
};
var EventEmitter = class extends EventEmitterMixin.mixin(EventEmitterMixin) {
};

// node_modules/@uncharted.software/grafer/build/lib/UX/UXModule.js
var UXModule = class {
  constructor() {
    this._enabled = false;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    if (value !== this._enabled) {
      this._enabled = value;
      if (this._enabled) {
        this.hookEvents();
      } else {
        this.unhookEvents();
      }
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/mouse/MouseHandler.js
var kEvents = {
  move: Symbol("Grafer::UX::MouseHandler::move"),
  down: Symbol("Grafer::UX::MouseHandler::down"),
  up: Symbol("Grafer::UX::MouseHandler::up"),
  click: Symbol("Grafer::UX::MouseHandler::click"),
  wheel: Symbol("Grafer::UX::MouseHandler::wheel")
};
Object.freeze(kEvents);
var kButton2Index = {
  primary: 1,
  secondary: 2,
  auxiliary: 4,
  fourth: 8,
  fifth: 16
};
Object.freeze(kButton2Index);
var kIndex2Button = {
  1: "primary",
  2: "secondary",
  4: "auxiliary",
  8: "fourth",
  16: "fifth"
};
Object.freeze(kIndex2Button);
var MouseHandler = class extends EventEmitter.mixin(UXModule) {
  constructor(canvas, rect, pixelRatio, enabled = true) {
    super();
    this.boundHandler = this.handleMouseEvent.bind(this);
    this.disableContextMenu = (e) => e.preventDefault();
    this.canvas = canvas;
    this.rect = rect;
    this.pixelRatio = pixelRatio;
    this.state = {
      valid: false,
      clientCoords: vec2_exports.create(),
      canvasCoords: vec2_exports.create(),
      glCoords: vec2_exports.create(),
      deltaCoords: vec2_exports.create(),
      wheel: 0,
      buttons: {
        primary: false,
        secondary: false,
        auxiliary: false,
        fourth: false,
        fifth: false
      }
    };
    this.newState = {
      valid: false,
      clientCoords: vec2_exports.create(),
      canvasCoords: vec2_exports.create(),
      glCoords: vec2_exports.create(),
      deltaCoords: vec2_exports.create(),
      wheel: 0,
      buttons: {
        primary: false,
        secondary: false,
        auxiliary: false,
        fourth: false,
        fifth: false
      }
    };
    this.enabled = enabled;
  }
  static get events() {
    return kEvents;
  }
  on(type, callback) {
    super.on(type, callback);
  }
  off(type, callback) {
    super.off(type, callback);
  }
  resize(rect, pixelRatio) {
    this.rect = rect;
    this.pixelRatio = pixelRatio;
    this.syntheticUpdate(kEvents.move);
  }
  hookEvents() {
    this.canvas.addEventListener("mouseenter", this.boundHandler);
    this.canvas.addEventListener("mouseleave", this.boundHandler);
    this.canvas.addEventListener("mousemove", this.boundHandler);
    this.canvas.addEventListener("mousedown", this.boundHandler);
    this.canvas.addEventListener("mouseup", this.boundHandler);
    this.canvas.addEventListener("click", this.boundHandler);
    this.canvas.addEventListener("wheel", this.boundHandler);
    this.canvas.addEventListener("contextmenu", this.disableContextMenu);
  }
  unhookEvents() {
    this.canvas.removeEventListener("mouseenter", this.boundHandler);
    this.canvas.removeEventListener("mouseleave", this.boundHandler);
    this.canvas.removeEventListener("mousemove", this.boundHandler);
    this.canvas.removeEventListener("mousedown", this.boundHandler);
    this.canvas.removeEventListener("mouseup", this.boundHandler);
    this.canvas.removeEventListener("click", this.boundHandler);
    this.canvas.removeEventListener("wheel", this.boundHandler);
    this.canvas.removeEventListener("contextmenu", this.disableContextMenu);
  }
  syntheticUpdate(event, buttonIndex) {
    switch (event) {
      case kEvents.up:
      case kEvents.down:
      case kEvents.click:
        this.emitEvents([{
          event,
          args: [buttonIndex, kIndex2Button[buttonIndex]]
        }]);
        break;
      case kEvents.move:
        this.emitEvents([{
          event,
          args: [vec2_exports.fromValues(0, 0), this.state.canvasCoords]
        }]);
        break;
      default:
        break;
    }
  }
  update(state) {
    const events = [];
    if (state.deltaCoords[0] !== 0 || state.deltaCoords[1] !== 0) {
      if (state.valid) {
        events.push({
          event: kEvents.move,
          args: [state.deltaCoords, state.canvasCoords]
        });
      }
    }
    const buttonKeys = Object.keys(state.buttons);
    for (let i = 0, n = buttonKeys.length; i < n; ++i) {
      const key = buttonKeys[i];
      const pressed = state.valid && state.buttons[key];
      if (this.state.buttons[key] !== pressed) {
        this.state.buttons[key] = pressed;
        events.push({
          event: pressed ? kEvents.down : kEvents.up,
          args: [kButton2Index[key], key, pressed]
        });
      }
    }
    this.setMouseState(state);
    this.emitEvents(events);
  }
  emitEvents(entries) {
    for (let i = 0, n = entries.length; i < n; ++i) {
      this.emit(entries[i].event, this.state, ...entries[i].args);
    }
  }
  setMouseState(state) {
    this.state.valid = state.valid;
    vec2_exports.copy(this.state.clientCoords, state.clientCoords);
    vec2_exports.copy(this.state.canvasCoords, state.canvasCoords);
    vec2_exports.copy(this.state.glCoords, state.glCoords);
    vec2_exports.copy(this.state.deltaCoords, state.deltaCoords);
    this.state.wheel = state.wheel;
    Object.assign(this.state.buttons, state.buttons);
  }
  handleClickEvent(e, state) {
    this.setMouseState(state);
    this.emitEvents([{
      event: kEvents.click,
      args: [e.button, kIndex2Button[e.button]]
    }]);
  }
  handleWheelEvent(e, state) {
    this.setMouseState(state);
    let delta;
    if ("wheelDeltaY" in e) {
      delta = -e.wheelDeltaY / 120;
    } else {
      delta = e.deltaY < 1 ? -1 : 1;
    }
    this.emitEvents([{
      event: kEvents.wheel,
      args: [delta]
    }]);
  }
  handleMouseEvent(e) {
    const client = this.newState.clientCoords;
    const canvas = this.newState.canvasCoords;
    const gl = this.newState.glCoords;
    const delta = this.newState.deltaCoords;
    const rect = this.rect;
    vec2_exports.set(client, e.clientX, e.clientY);
    vec2_exports.set(canvas, e.clientX - rect.left, e.clientY - rect.top);
    vec2_exports.set(gl, (e.clientX - rect.left) * this.pixelRatio, (rect.bottom - e.clientY) * this.pixelRatio);
    if (e.type === "mousemove") {
      vec2_exports.set(delta, e.movementX, e.movementY);
    } else {
      vec2_exports.set(delta, 0, 0);
    }
    this.newState.valid = Boolean(canvas[0] >= rect.left && canvas[0] <= rect.right && canvas[1] >= 0 && canvas[1] <= rect.height);
    this.newState.buttons.primary = Boolean(e.buttons & 1);
    this.newState.buttons.secondary = Boolean(e.buttons & 2);
    this.newState.buttons.auxiliary = Boolean(e.buttons & 4);
    this.newState.buttons.fourth = Boolean(e.buttons & 8);
    this.newState.buttons.fifth = Boolean(e.buttons & 16);
    switch (e.type) {
      case "click":
        this.handleClickEvent(e, this.newState);
        break;
      case "wheel":
        this.handleWheelEvent(e, this.newState);
        break;
      case "mouseleave":
        this.newState.valid = false;
      default:
        this.update(this.newState);
        break;
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/renderer/ColorRegistry.js
var import_chroma_js = __toModule(require_chroma());
var ColorRegistry = class {
  constructor(context, initialCapacity = 1024) {
    this.dirty = false;
    this.context = context;
    this.colorMap = new Map();
    this.textureSize = vec2_exports.create();
    this.resizeTexture(initialCapacity);
  }
  get texture() {
    this.update();
    return this._texture;
  }
  get capacity() {
    return this.textureSize[0] * this.textureSize[1];
  }
  get length() {
    return this.colorMap.size;
  }
  update() {
    if (this.dirty) {
      if (this.colorMap.size > this.capacity) {
        this.resizeTexture(this.colorMap.size);
      }
      const buffer = new Uint8Array(this.capacity * 4);
      let offset = 0;
      for (const color of this.colorMap.keys()) {
        const rgba = import_chroma_js.default.hex(color).rgba();
        buffer[offset] = rgba[0];
        ++offset;
        buffer[offset] = rgba[1];
        ++offset;
        buffer[offset] = rgba[2];
        ++offset;
        buffer[offset] = Math.round(rgba[3] * 255);
        ++offset;
      }
      this._texture.data(buffer);
    }
    this.dirty = false;
  }
  registerColor(color) {
    const hex = (0, import_chroma_js.default)(color).hex();
    if (!this.colorMap.has(hex)) {
      this.colorMap.set(hex, this.colorMap.size);
      this.dirty = true;
    }
    return this.colorMap.get(hex);
  }
  resizeTexture(capacity) {
    if (this.capacity < capacity) {
      const textureWidth = Math.pow(2, Math.ceil(Math.log2(Math.ceil(Math.sqrt(capacity)))));
      const textureHeight = Math.pow(2, Math.ceil(Math.log2(Math.ceil(capacity / textureWidth))));
      this.textureSize = vec2_exports.fromValues(textureWidth, textureHeight);
      if (this._texture) {
        this._texture.resize(textureWidth, textureHeight);
      } else {
        this._texture = this.context.createTexture2D(textureWidth, textureHeight);
      }
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/renderer/RectObserver.js
var POLLING_RATE = 400;
var RectObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe(element) {
    this.elementTarget = element;
    this.elementTarget.addEventListener("mouseenter", this.handleMouseEnter.bind(this), false);
    this.elementTarget.addEventListener("mouseleave", this.handleMouseLeave.bind(this), false);
    this.rect = this.elementTarget.getBoundingClientRect();
  }
  disconnect() {
    clearInterval(this.poll);
    this.elementTarget.removeEventListener("mouseenter", this.handleMouseEnter.bind(this), false);
    this.elementTarget.removeEventListener("mouseleave", this.handleMouseLeave.bind(this), false);
  }
  handleMouseEnter() {
    this.pollElement();
    this.poll = setInterval(this.pollElement.bind(this), POLLING_RATE);
  }
  pollElement() {
    const rect = this.elementTarget.getBoundingClientRect();
    if (!this.rectEqual(this.rect, rect)) {
      this.rect = rect;
      this.callback(this.rect);
    }
  }
  handleMouseLeave() {
    this.pollElement();
    clearInterval(this.poll);
  }
  rectEqual(prev, curr) {
    return prev.width === curr.width && prev.height === curr.height && prev.top === curr.top && prev.left === curr.left;
  }
};
var RectObserver_default = RectObserver;

// node_modules/@uncharted.software/grafer/build/lib/renderer/Viewport.js
var Viewport = class {
  constructor(element) {
    this._clearColor = vec4_exports.create();
    this.animationFrameID = 0;
    this.timeoutID = 0;
    this.boundDelayedRender = this.delayedRender.bind(this);
    const pixelRatio = window.devicePixelRatio;
    this.element = element;
    if (this.element instanceof HTMLCanvasElement) {
      this.canvas = this.element;
    } else {
      this.canvas = document.createElement("canvas");
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.element.appendChild(this.canvas);
    }
    this.rect = this.canvas.getBoundingClientRect();
    this.canvas.width = this.rect.width * pixelRatio;
    this.canvas.height = this.rect.height * pixelRatio;
    this.context = PicoGL.createApp(this.canvas, {
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true
    });
    this.clearColor = [0.141176471, 0.160784314, 0.2, 1];
    this.context.clearMask(PicoGL.COLOR_BUFFER_BIT | PicoGL.DEPTH_BUFFER_BIT);
    this.context.enable(PicoGL.DEPTH_TEST);
    this.context.depthFunc(PicoGL.LESS);
    this.context.pixelRatio = pixelRatio;
    this.mouseHandler = new MouseHandler(this.canvas, this.rect, this.pixelRatio);
    this.size = vec2_exports.fromValues(this.canvas.width, this.canvas.height);
    this.camera = new Camera(this.size);
    const resizeObserver = new RectObserver_default((rect) => {
      this.rect = rect;
      this.context.resize(this.rect.width * this.pixelRatio, this.rect.height * this.pixelRatio);
      vec2_exports.set(this.size, this.canvas.width, this.canvas.height);
      this.camera.viewportSize = this.size;
      this.mouseHandler.resize(this.rect, this.pixelRatio);
      this.graph.resize(this.context);
      this.render();
    });
    resizeObserver.observe(this.canvas);
    this.colorRegisrty = new ColorRegistry(this.context);
  }
  get clearColor() {
    return this._clearColor;
  }
  set clearColor(value) {
    vec4_exports.copy(this._clearColor, value);
    this.context.clearColor(...this._clearColor);
  }
  get pixelRatio() {
    return this.context.pixelRatio;
  }
  resetContextFlags() {
    this.context.blendFuncSeparate(PicoGL.SRC_ALPHA, PicoGL.ONE_MINUS_SRC_ALPHA, PicoGL.ONE, PicoGL.ONE);
    this.context.defaultDrawFramebuffer();
    this.context.defaultReadFramebuffer();
    this.context.disable(PicoGL.BLEND);
    this.context.enable(PicoGL.DEPTH_TEST);
    this.context.depthFunc(PicoGL.LESS);
    this.context.depthMask(true);
    this.context.depthRange(0, 1);
    this.context.clearColor(...this._clearColor);
  }
  render() {
    if (!this.animationFrameID) {
      this.renderMode = RenderMode.DRAFT;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
        this.timeoutID = 0;
      }
      this.animationFrameID = requestAnimationFrame(() => this._render());
    }
  }
  scheduleRender(delay) {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = window.setTimeout(this.boundDelayedRender, delay);
  }
  delayedRender() {
    this.timeoutID = 0;
    this._render();
  }
  _render() {
    const uniforms = {
      uViewMatrix: this.camera.viewMatrix,
      uSceneMatrix: this.graph.matrix,
      uProjectionMatrix: this.camera.projectionMatrix,
      uViewportSize: this.size,
      uPixelRatio: this.pixelRatio,
      uClearColor: this._clearColor,
      uColorPalette: this.colorRegisrty.texture,
      uRenderMode: this.renderMode
    };
    this.resetContextFlags();
    this.context.clear();
    if (this.graph && this.graph.enabled) {
      this.graph.render(this.context, this.renderMode, uniforms);
      switch (this.renderMode) {
        case RenderMode.DRAFT:
          uniforms.uRenderMode = RenderMode.PICKING;
          this.graph.render(this.context, RenderMode.PICKING, uniforms);
          this.renderMode = RenderMode.MEDIUM;
          this.scheduleRender(85);
          break;
        case RenderMode.MEDIUM:
          this.renderMode = RenderMode.HIGH_PASS_1;
          this.scheduleRender(120);
          break;
        case RenderMode.HIGH_PASS_1:
          uniforms.uRenderMode = RenderMode.HIGH_PASS_2;
          this.graph.render(this.context, RenderMode.HIGH_PASS_2, uniforms);
          break;
      }
    }
    this.animationFrameID = 0;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/renderer/OffscreenBuffer.js
var OffscreenBuffer = class {
  constructor(context) {
    this._clearColor = vec4_exports.create();
    this.context = context;
    this.resize(context);
  }
  get clearColor() {
    return this._clearColor;
  }
  set clearColor(value) {
    vec4_exports.copy(this._clearColor, value);
  }
  resize(context) {
    if (this.frameBuffer) {
      this.frameBuffer.delete();
    }
    if (this.colorTarget) {
      this.colorTarget.delete();
    }
    if (this.depthTarget) {
      this.depthTarget.delete();
    }
    this.colorTarget = context.createTexture2D(context.width, context.height);
    this.depthTarget = context.createRenderbuffer(context.width, context.height, PicoGL.DEPTH_COMPONENT16);
    this.frameBuffer = context.createFramebuffer().colorTarget(0, this.colorTarget).depthTarget(this.depthTarget);
  }
  prepareContext(context) {
    context.depthMask(true);
    context.readFramebuffer(this.frameBuffer);
    context.drawFramebuffer(this.frameBuffer).clearMask(PicoGL.COLOR_BUFFER_BIT | PicoGL.DEPTH_BUFFER_BIT).clearColor(...this._clearColor).clear().depthMask(true);
  }
  blitToBuffer(context, target, mask = PicoGL.COLOR_BUFFER_BIT) {
    context.drawFramebuffer(target.frameBuffer);
    context.readFramebuffer(this.frameBuffer);
    context.blitFramebuffer(mask);
  }
  blitToScreen(context, mask = PicoGL.COLOR_BUFFER_BIT) {
    context.defaultDrawFramebuffer();
    context.readFramebuffer(this.frameBuffer);
    context.blitFramebuffer(mask);
  }
  readPixel(x, y, buffer) {
    this.context.defaultDrawFramebuffer().readFramebuffer(this.frameBuffer).readPixel(x, y, buffer);
  }
};

// node_modules/@uncharted.software/grafer/build/lib/data/DataTools.js
var kDataMappingFlatten = Symbol("graffer:data::mapping::flatten::key");
var kDataEntryNeedsFlatten = Symbol("graffer:data::tools::needs::flatten");
function* dataIterator(data, mappings) {
  const keys = Reflect.ownKeys(mappings);
  for (let i = 0, n = data.length; i < n; ++i) {
    const entry = {};
    for (const key of keys) {
      if (mappings[key] !== null) {
        entry[key] = mappings[key](data[i], i);
      }
    }
    yield [i, entry];
  }
}
function concatenateData(data, mappings) {
  const result = [];
  for (let i = 0, n = data.length; i < n; ++i) {
    for (const [, entry] of dataIterator(data[i], mappings)) {
      result.push(entry);
    }
  }
  return result;
}
function computeDataTypes(types4, mappings) {
  const keys = Object.keys(types4);
  const result = {};
  for (let i = 0, n = keys.length; i < n; ++i) {
    if (keys[i] in mappings && mappings[keys[i]] !== null) {
      result[keys[i]] = types4[keys[i]];
    }
  }
  return result;
}
function writeValueToDataView(view, value, type, offset) {
  if (Array.isArray(value)) {
    let writeOffset = 0;
    for (let i = 0, n = value.length; i < n; ++i) {
      GL_TYPE_SETTER[type[i]](view, offset + writeOffset, value[i]);
      writeOffset += GL_TYPE_SIZE[type[i]];
    }
    return writeOffset;
  }
  GL_TYPE_SETTER[type](view, offset, value);
  return GL_TYPE_SIZE[type];
}
function flattenEntry(entry, types4, typesInfo, mappings, view, offset) {
  const flatMappings = {};
  let flattenLength = 0;
  for (let i = 0, n = typesInfo.keys.length; i < n; ++i) {
    const key = typesInfo.keys[i];
    if (entry[kDataEntryNeedsFlatten].has(key)) {
      flatMappings[key] = mappings[key][kDataMappingFlatten] ?? ((entry2, i2) => entry2[key][i2]);
      flattenLength = entry[key].length;
    } else {
      flatMappings[key] = mappings[key][kDataMappingFlatten] ?? ((entry2) => entry2[key]);
    }
  }
  let flatOffset = 0;
  for (let i = 0; i < flattenLength; ++i) {
    for (let ii = 0, n = typesInfo.keys.length; ii < n; ++ii) {
      const key = typesInfo.keys[ii];
      flatOffset += writeValueToDataView(view, flatMappings[key](entry, i, flattenLength), types4[key], offset + flatOffset);
    }
  }
  return flatOffset;
}
function packData(data, mappings, types4, potLength, cb) {
  const typesInfo = glDataTypesInfo(computeDataTypes(types4, mappings));
  const entries = [];
  let dataLength = 0;
  const cb1 = Array.isArray(cb) ? cb[0] : cb;
  const cb2 = Array.isArray(cb) ? cb[1] : null;
  for (const [index, entry] of dataIterator(data, mappings)) {
    let entryLength = 1;
    for (let i = 0, n = typesInfo.keys.length; i < n; ++i) {
      const value = entry[typesInfo.keys[i]];
      if (Array.isArray(value) && (!Array.isArray(types4[typesInfo.keys[i]]) || mappings[typesInfo.keys[i]][kDataMappingFlatten])) {
        if (!entry[kDataEntryNeedsFlatten]) {
          entry[kDataEntryNeedsFlatten] = new Set();
        }
        entry[kDataEntryNeedsFlatten].add(typesInfo.keys[i]);
        entryLength = Math.max(entryLength, value.length);
      }
    }
    entries.push(entry);
    dataLength += entryLength;
    if (cb1) {
      cb1(index, entry);
    }
  }
  dataLength = potLength ? Math.pow(2, Math.ceil(Math.log2(dataLength))) : dataLength;
  const buffer = new ArrayBuffer(typesInfo.stride * dataLength);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0, n = entries.length; i < n; ++i) {
    const entry = entries[i];
    if (cb2) {
      cb2(i, entry);
    }
    if (entry[kDataEntryNeedsFlatten]) {
      offset += flattenEntry(entry, types4, typesInfo, mappings, view, offset);
    } else {
      for (let i2 = 0, n2 = typesInfo.keys.length; i2 < n2; ++i2) {
        offset += writeValueToDataView(view, entry[typesInfo.keys[i2]], types4[typesInfo.keys[i2]], offset);
      }
    }
  }
  return buffer;
}
function printDataGL(context, vbo, count, types4) {
  const gl = context.gl;
  const typesInfo = glDataTypesInfo(types4);
  const result = new ArrayBuffer(typesInfo.stride * count);
  const view = new DataView(result);
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo.buffer);
  gl.getBufferSubData(gl.ARRAY_BUFFER, 0, view);
  let off = 0;
  for (let i = 0; i < count; ++i) {
    for (let ii = 0, nn = typesInfo.keys.length; ii < nn; ++ii) {
      const type = Array.isArray(types4[typesInfo.keys[ii]]) ? types4[typesInfo.keys[ii]] : [types4[typesInfo.keys[ii]]];
      const values = [];
      for (let iii = 0, nnn = type.length; iii < nnn; ++iii) {
        values.push(GL_TYPE_GETTER[type[iii]](view, off));
        off += GL_TYPE_SIZE[type[iii]];
      }
      console.log(`ELEMENT[${i}] ATTR[${ii}]: ${values}`);
    }
  }
}

// node_modules/@uncharted.software/grafer/build/lib/data/GraphPoints.js
var GraphPoints_test_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in uint aIndex;\n\nuniform sampler2D uDataTexture;\n\nflat out vec3 vPosition;\nflat out float vRadius;\nflat out float vYolo;\n\nvec4 getValueByIndexFromTexture(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nvoid main() {\n    vec4 value = getValueByIndexFromTexture(uDataTexture, int(aIndex));\n    vPosition = value.xyz;\n    vRadius = value.w;\n    vYolo = value.w / 10.0;\n}\n";
var noop_fs_default = "#version 300 es\n#define GLSLIFY 1\nvoid main() {}\n";
var kDefaultMappings = {
  id: (entry, i) => "id" in entry ? entry.id : i,
  x: (entry) => entry.x,
  y: (entry) => entry.y,
  z: (entry) => "z" in entry ? entry.z : 0,
  radius: (entry) => "radius" in entry ? entry.radius : 0
};
var kGLTypes = {
  x: picogl_default.FLOAT,
  y: picogl_default.FLOAT,
  z: picogl_default.FLOAT,
  radius: picogl_default.FLOAT
};
var GraphPoints = class {
  static createGraphFromNodes(context, nodes, mappings = {}) {
    let pointIndex = 0;
    const dataMappings = Object.assign({}, kDefaultMappings, {
      id: () => pointIndex++
    }, mappings);
    const points = concatenateData(nodes, dataMappings);
    return new this(context, points);
  }
  get dataTexture() {
    return this._dataTexture;
  }
  get dataBuffer() {
    return this._dataBuffer;
  }
  get dataView() {
    return this._dataView;
  }
  constructor(context, data, mappings = {}) {
    this.map = new Map();
    this.bb = {
      min: vec3_exports.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
      max: vec3_exports.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
    };
    this.bbCorner = vec3_exports.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    const dataMappings = Object.assign({}, kDefaultMappings, mappings);
    this._dataBuffer = packData(data, dataMappings, kGLTypes, true, (i, entry) => {
      this.map.set(entry.id, i);
      this.bb.min[0] = Math.min(this.bb.min[0], entry.x);
      this.bb.min[1] = Math.min(this.bb.min[1], entry.y);
      this.bb.min[2] = Math.min(this.bb.min[2], entry.z);
      this.bb.max[0] = Math.max(this.bb.max[0], entry.x);
      this.bb.max[1] = Math.max(this.bb.max[1], entry.y);
      this.bb.max[2] = Math.max(this.bb.max[2], entry.z);
      this.bbCorner[0] = Math.max(this.bbCorner[0], Math.abs(entry.x));
      this.bbCorner[1] = Math.max(this.bbCorner[1], Math.abs(entry.y));
      this.bbCorner[2] = Math.max(this.bbCorner[2], Math.abs(entry.z));
    });
    this._dataView = new DataView(this._dataBuffer);
    this.bbCornerLength = vec3_exports.length(this.bbCorner);
    const textureWidth = Math.pow(2, Math.ceil(Math.log2(Math.ceil(Math.sqrt(data.length)))));
    const textureHeight = Math.pow(2, Math.ceil(Math.log2(Math.ceil(data.length / textureWidth))));
    this._dataTexture = context.createTexture2D(textureWidth, textureHeight, {
      internalFormat: picogl_default.RGBA32F
    });
    const float32 = new Float32Array(this._dataBuffer);
    this._dataTexture.data(float32);
  }
  destroy() {
    this._dataTexture.delete();
    this.map.clear();
    this._dataTexture = null;
    this._dataBuffer = null;
    this.map = null;
  }
  getPointIndex(id) {
    return this.map.get(id);
  }
  testFeedback(context) {
    const program = context.createProgram(GraphPoints_test_vs_default, noop_fs_default, {transformFeedbackVaryings: ["vPosition", "vRadius", "vYolo"], transformFeedbackMode: picogl_default.INTERLEAVED_ATTRIBS});
    const pointsTarget = context.createVertexBuffer(picogl_default.FLOAT, 4, 40);
    const pointsIndices = context.createVertexBuffer(picogl_default.UNSIGNED_BYTE, 1, new Uint8Array([
      0,
      1,
      2,
      3,
      4,
      5
    ]));
    const transformFeedback = context.createTransformFeedback().feedbackBuffer(0, pointsTarget);
    const vertexArray = context.createVertexArray().vertexAttributeBuffer(0, pointsIndices);
    const drawCall = context.createDrawCall(program, vertexArray).transformFeedback(transformFeedback);
    drawCall.primitive(picogl_default.POINTS);
    drawCall.texture("uDataTexture", this._dataTexture);
    context.enable(picogl_default.RASTERIZER_DISCARD);
    drawCall.draw();
    context.disable(picogl_default.RASTERIZER_DISCARD);
    printDataGL(context, pointsTarget, 6, {
      position: [picogl_default.FLOAT, picogl_default.FLOAT, picogl_default.FLOAT],
      radius: picogl_default.FLOAT,
      yolo: picogl_default.FLOAT
    });
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/Graph.js
var Graph = class extends GraphPoints {
  constructor(context, data, mappings = {}) {
    super(context, data, mappings);
    this.enabled = true;
    this._layers = [];
    this._rotation = quat_exports.create();
    this._translation = vec3_exports.create();
    this._matrix = mat4_exports.create();
  }
  get matrix() {
    mat4_exports.fromRotationTranslation(this._matrix, this._rotation, this._translation);
    return this._matrix;
  }
  get layers() {
    return this._layers;
  }
  get rotation() {
    return this._rotation;
  }
  get translation() {
    return this._translation;
  }
  render(context, mode, uniforms) {
    if (mode === RenderMode.PICKING && this.picking && this.picking.enabled) {
      this.picking.offscreenBuffer.prepareContext(context);
    }
    for (let i = 0, n = this._layers.length; i < n; ++i) {
      if (this._layers[i].enabled) {
        this._layers[i].render(context, mode, uniforms);
      }
    }
  }
  resize(context) {
    if (this.picking) {
      this.picking.offscreenBuffer.resize(context);
    }
  }
  rotate(rotation) {
    quat_exports.mul(this._rotation, rotation, this._rotation);
  }
  addLayer(layer) {
    this._layers.push(layer);
  }
  addLayerAt(layer, index) {
    if (index >= 0 && index <= this._layers.length) {
      this._layers.splice(index, 0, layer);
    }
  }
  removeLayer(layer) {
    const i = this._layers.indexOf(layer);
    if (i !== -1) {
      this._layers.splice(i, 1);
    }
  }
  removeLayerAt(index) {
    if (index >= 0 && index < this._layers.length) {
      this._layers.splice(index, 1);
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/mod.js
var mod_exports = {};
__export(mod_exports, {
  Circle: () => Circle,
  Cross: () => Cross,
  Nodes: () => Nodes,
  Octagon: () => Octagon,
  Pentagon: () => Pentagon,
  Plus: () => Plus,
  Ring: () => Ring,
  Star: () => Star,
  Triangle: () => Triangle,
  kBasicNodeDataTypes: () => kBasicNodeDataTypes,
  kBasicNodeMappings: () => kBasicNodeMappings,
  kGLCircleNodeTypes: () => kGLCircleNodeTypes,
  types: () => types
});

// node_modules/@uncharted.software/grafer/build/lib/data/PointsReader.js
var noop_fs_default2 = "#version 300 es\n#define GLSLIFY 1\nvoid main() {}\n";
var PointsReader = class {
  get dataTexture() {
    return this.points.dataTexture;
  }
  constructor(...args) {
    this.initialize(...args);
  }
  initialize(context, points, data, mappings) {
    this.points = points;
    this.ingestData(context, data, mappings);
    this.initializeTargetBuffers(context, this.dataBuffer.byteLength / this.dataStride);
    this.initializeDataDrawCall(context);
  }
  ingestData(context, data, mappings) {
    const dataMappings = this.computeMappings(mappings);
    const types4 = computeDataTypes(this.getGLSourceTypes(), dataMappings);
    this.dataBuffer = packData(data, dataMappings, types4, false, this.packDataCB());
    this.dataView = new DataView(this.dataBuffer);
    const typesInfo = glDataTypesInfo(types4);
    this.dataStride = typesInfo.stride;
    this.sourceVBO = context.createInterleavedBuffer(this.dataStride, this.dataView);
    this.sourceVAO = context.createVertexArray();
    configureVAO(this.sourceVAO, this.sourceVBO, types4, typesInfo);
  }
  initializeTargetBuffers(context, dataLength) {
    const targetTypes = this.getGLTargetTypes();
    const stride = glDataTypesInfo(targetTypes).stride;
    this.targetVBO = context.createInterleavedBuffer(stride, dataLength * stride);
    this.targetTFO = context.createTransformFeedback().feedbackBuffer(0, this.targetVBO);
  }
  initializeDataDrawCall(context) {
    const dataShader = this.getDataShader();
    this.dataProgram = context.createProgram(dataShader.vs, noop_fs_default2, {
      transformFeedbackVaryings: dataShader.varyings,
      transformFeedbackMode: PicoGL.INTERLEAVED_ATTRIBS
    });
    this.dataDrawCall = context.createDrawCall(this.dataProgram, this.sourceVAO).transformFeedback(this.targetTFO);
    this.dataDrawCall.primitive(PicoGL.POINTS);
  }
  compute(context, uniforms) {
    setDrawCallUniforms(this.dataDrawCall, uniforms);
    context.enable(PicoGL.RASTERIZER_DISCARD);
    this.dataDrawCall.draw();
    context.disable(PicoGL.RASTERIZER_DISCARD);
  }
  configureTargetVAO(vao, attrIndex = 1) {
    const types4 = this.getGLTargetTypes();
    const typesInfo = glDataTypesInfo(types4);
    configureVAO(vao, this.targetVBO, types4, typesInfo, attrIndex, true);
  }
  packDataCB() {
    return () => null;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/LayerRenderable.js
var LayerRenderableBlendMode;
(function(LayerRenderableBlendMode2) {
  LayerRenderableBlendMode2[LayerRenderableBlendMode2["NONE"] = 0] = "NONE";
  LayerRenderableBlendMode2[LayerRenderableBlendMode2["NORMAL"] = 1] = "NORMAL";
  LayerRenderableBlendMode2[LayerRenderableBlendMode2["ADDITIVE"] = 2] = "ADDITIVE";
})(LayerRenderableBlendMode || (LayerRenderableBlendMode = {}));
var PointsReaderEmitter = EventEmitter.mixin(PointsReader);
var LayerRenderable = class extends PointsReaderEmitter {
  constructor(...args) {
    super(...args);
    this.enabled = true;
    this.nearDepth = 0;
    this.farDepth = 1;
    this.blendMode = 1;
  }
  static get defaultMappings() {
    return void 0;
  }
  get alpha() {
    return this.localUniforms.uAlpha;
  }
  set alpha(value) {
    this.localUniforms.uAlpha = value;
  }
  get fade() {
    return this.localUniforms.uFade;
  }
  set fade(value) {
    this.localUniforms.uFade = value;
  }
  get desaturate() {
    return this.localUniforms.uDesaturate;
  }
  set desaturate(value) {
    this.localUniforms.uDesaturate = value;
  }
  initialize(context, points, data, mappings, pickingManager) {
    this.pickingManager = pickingManager;
    this.picking = true;
    this.localUniforms = Object.assign({}, this.localUniforms, {
      uAlpha: 1,
      uFade: 0,
      uDesaturate: 0
    });
    super.initialize(context, points, data, mappings);
  }
  configureRenderContext(context, renderMode) {
    context.depthRange(this.nearDepth, this.farDepth);
    switch (renderMode) {
      case RenderMode.PICKING:
        context.depthMask(true);
        context.disable(PicoGL.BLEND);
        break;
      case RenderMode.HIGH_PASS_2:
        context.depthMask(false);
        context.enable(PicoGL.BLEND);
        if (this.blendMode === 2) {
          context.blendFuncSeparate(PicoGL.SRC_ALPHA, PicoGL.ONE, PicoGL.ONE, PicoGL.ONE);
        } else {
          context.blendFuncSeparate(PicoGL.SRC_ALPHA, PicoGL.ONE_MINUS_SRC_ALPHA, PicoGL.ONE, PicoGL.ONE);
        }
        break;
      default:
        if (this.localUniforms.uAlpha >= 1 || this.blendMode === 0) {
          context.disable(PicoGL.BLEND);
          context.depthMask(true);
        } else {
          context.enable(PicoGL.BLEND);
          context.depthMask(false);
          if (this.blendMode === 2) {
            context.blendFuncSeparate(PicoGL.SRC_ALPHA, PicoGL.ONE, PicoGL.ONE, PicoGL.ONE);
          } else {
            context.blendFuncSeparate(PicoGL.SRC_ALPHA, PicoGL.ONE_MINUS_SRC_ALPHA, PicoGL.ONE, PicoGL.ONE);
          }
        }
        break;
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/Nodes.js
var kBasicNodeMappings = {
  id: (entry, i) => "id" in entry ? entry.id : i,
  point: (entry, i) => "point" in entry ? entry.point : i,
  color: (entry) => "color" in entry ? entry.color : 0,
  radius: null
};
var kBasicNodeDataTypes = {
  point: picogl_default.UNSIGNED_INT,
  color: picogl_default.UNSIGNED_INT,
  radius: picogl_default.FLOAT
};
var Nodes = class extends LayerRenderable {
  static get defaultMappings() {
    return kBasicNodeMappings;
  }
  get constraintSize() {
    return this.localUniforms.uConstraintSize;
  }
  set constraintSize(value) {
    this.localUniforms.uConstraintSize = value;
  }
  get minSize() {
    return this.localUniforms.uMinSize;
  }
  set minSize(value) {
    this.localUniforms.uMinSize = value;
  }
  get maxSize() {
    return this.localUniforms.uMaxSize;
  }
  set maxSize(value) {
    this.localUniforms.uMaxSize = value;
  }
  get pixelSizing() {
    return this.localUniforms.uPixelSizing;
  }
  set pixelSizing(value) {
    this.localUniforms.uPixelSizing = value;
  }
  get billboard() {
    return this.localUniforms.uBillboard;
  }
  set billboard(value) {
    this.localUniforms.uBillboard = value;
  }
  initialize(...args) {
    this.localUniforms = Object.assign({}, this.localUniforms, {
      uConstraintSize: true,
      uMinSize: 1,
      uMaxSize: 4,
      uPixelSizing: false,
      uBillboard: true
    });
    super.initialize(...args);
  }
  computeMappings(mappings) {
    const nodesMappings = Object.assign({}, kBasicNodeMappings, mappings);
    const pointMapping = nodesMappings.point;
    nodesMappings.point = (entry, i) => {
      return this.points.getPointIndex(pointMapping(entry, i));
    };
    return nodesMappings;
  }
  ingestData(context, data, mappings) {
    this.map = new Map();
    this.idArray = [];
    super.ingestData(context, data, mappings);
  }
  packDataCB() {
    return (i, entry) => {
      this.map.set(entry.id, entry.point);
      this.idArray.push(entry.id);
    };
  }
  getEntryPointID(id) {
    return this.map.get(id);
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/picking/PickingManager.js
var kEvents2 = {
  hoverOn: Symbol("grafer_hover_on"),
  hoverOff: Symbol("grafer_hover_off"),
  click: Symbol("grafer_click")
};
Object.freeze(kEvents2);
var PickingManager = class extends EventEmitter.mixin(UXModule) {
  constructor(context, mouseHandler, enabled = true) {
    super();
    this.boundMouseHandler = this.handleMouse.bind(this);
    this.colorBuffer = new ArrayBuffer(4);
    this.colorBufferUint8 = new Uint8Array(this.colorBuffer);
    this.colorBufferView = new DataView(this.colorBuffer);
    this.colorHoverID = 0;
    this._offscreenBuffer = new OffscreenBuffer(context);
    this.mouseHandler = mouseHandler;
    this.availableIndices = [{
      start: 0,
      end: 4026531839
    }];
    this.enabled = enabled;
  }
  static get events() {
    return kEvents2;
  }
  get offscreenBuffer() {
    return this._offscreenBuffer;
  }
  on(type, callback) {
    super.on(type, callback);
  }
  off(type, callback) {
    super.off(type, callback);
  }
  allocatePickingColors(count) {
    const colors = new Uint8Array(count * 4);
    const ranges = [];
    const map = new Map();
    let offset = 0;
    let left = count;
    for (let i = 0, n = this.availableIndices.length; i < n && left > 0; ++i) {
      const availableRange = this.availableIndices[i];
      const rangeLength = availableRange.end - availableRange.start;
      if (rangeLength > left) {
        const range = {start: availableRange.start, end: availableRange.start + left};
        offset = this.pickingColorsForIndices(colors, offset, range);
        this.mapPickingColorIDs(map, count - left, range);
        ranges.push(range);
        availableRange.start += left;
        left = 0;
      } else {
        offset = this.pickingColorsForIndices(colors, offset, availableRange);
        this.mapPickingColorIDs(map, count - left, availableRange);
        ranges.push(availableRange);
        left -= rangeLength;
        this.availableIndices.splice(i--, 1);
      }
    }
    return {
      colors,
      ranges,
      map
    };
  }
  deallocatePickingColors(colors) {
    for (let i = 0, n = colors.ranges.length; i < n; ++i) {
      this.deallocatePickingRange(colors.ranges[i]);
    }
    colors.colors = new Uint8Array([]);
    colors.ranges.length = 0;
    colors.map.clear();
  }
  hookEvents() {
    this.mouseHandler.on(MouseHandler.events.move, this.boundMouseHandler);
    this.mouseHandler.on(MouseHandler.events.click, this.boundMouseHandler);
  }
  unhookEvents() {
    this.mouseHandler.off(MouseHandler.events.move, this.boundMouseHandler);
    this.mouseHandler.off(MouseHandler.events.click, this.boundMouseHandler);
  }
  handleMouse(event, state) {
    const glCoords = state.glCoords;
    this._offscreenBuffer.readPixel(glCoords[0], glCoords[1], this.colorBufferUint8);
    const colorID = this.colorBufferView.getUint32(0);
    switch (event) {
      case MouseHandler.events.move:
        if (colorID !== this.colorHoverID) {
          if (this.colorHoverID !== 0) {
            this.emit(kEvents2.hoverOff, this.colorHoverID >> 1);
          }
          this.colorHoverID = colorID;
          if (this.colorHoverID !== 0) {
            this.emit(kEvents2.hoverOn, this.colorHoverID >> 1);
          }
        }
        break;
      case MouseHandler.events.click:
        if (colorID !== 0) {
          this.emit(kEvents2.click, colorID >> 1);
        }
        break;
    }
  }
  deallocatePickingRange(range) {
    for (let i = 0, n = this.availableIndices.length; i < n; ++i) {
      const availableRange = this.availableIndices[i];
      if (availableRange.start > range.start) {
        if (availableRange.start === range.end) {
          availableRange.start = range.start;
        } else {
          this.availableIndices.splice(i, 0, {
            start: range.start,
            end: range.end
          });
        }
        break;
      }
    }
  }
  mapPickingColorIDs(out, idStart, range) {
    for (let i = 0, n = range.end - range.start; i < n; ++i) {
      out.set(range.start + i, idStart + i);
    }
  }
  pickingColorsForIndices(out, offset, range) {
    for (let i = range.start; i < range.end; ++i) {
      const color = this.pickingColorForNumber(i);
      out[offset++] = color[0];
      out[offset++] = color[1];
      out[offset++] = color[2];
      out[offset++] = color[3];
    }
    return offset;
  }
  pickingColorForNumber(num) {
    const pickingNumber = num << 1 | 1;
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, pickingNumber);
    return new Uint8Array(buffer);
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/circle/Circle.js
var Circle_vs_default = '#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in vec3 aVertex;\nlayout(location=1) in vec3 iPosition;\nlayout(location=2) in float iRadius;\nlayout(location=3) in uint iColor;\nlayout(location=4) in uvec4 iPickingColor;\n\n//layout(std140) uniform RenderUniforms {\n    uniform mat4 uViewMatrix;\n    uniform mat4 uSceneMatrix;\n    uniform mat4 uProjectionMatrix;\n    uniform vec2 uViewportSize;\n    uniform float uPixelRatio;\n    uniform sampler2D uColorPalette;\n//};\n\nuniform float uMinSize;\nuniform float uMaxSize;\nuniform bool uPixelSizing;\nuniform bool uBillboard;\n\nuniform bool uPicking;\n\nflat out vec4 fColor;\nflat out float fPixelLength;\nout vec2 vFromCenter;\n\nvec4 getColorByIndexFromTexture(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nvoid main() {\n    // claculate the offset matrix, done as a matrix to be able to compute "billboard" vertices in the shader\n    mat4 offsetMatrix = mat4(1.0);\n    offsetMatrix[3] = vec4(iPosition, 1.0);\n\n    // reset the rotation of the model-view matrix\n    mat4 modelMatrix = uViewMatrix * uSceneMatrix * offsetMatrix;\n    mat4 lookAtMatrix = mat4(modelMatrix);\n    lookAtMatrix[0] = vec4(1.0, 0.0, 0.0, lookAtMatrix[0][3]);\n    lookAtMatrix[1] = vec4(0.0, 1.0, 0.0, lookAtMatrix[1][3]);\n    lookAtMatrix[2] = vec4(0.0, 0.0, 1.0, lookAtMatrix[2][3]);\n\n    // the on-screen center of this node\n    vec4 quadCenter = uProjectionMatrix * lookAtMatrix * vec4(0.0, 0.0, 0.0, 1.0);\n    vec2 screenQuadCenter = quadCenter.xy / quadCenter.w;\n\n    // the on-screen position of a side of this quad\n    vec4 quadSide = uProjectionMatrix * lookAtMatrix * vec4(iRadius, 0.0, 0.0, 1.0);\n    vec2 screenQuadSide = quadSide.xy / quadSide.w;\n\n    // compute the pixel radius of this node for a size of 1 in world coordinates\n    float pixelRadius = max(1.0, length((screenQuadSide - screenQuadCenter) * uViewportSize * 0.5));\n\n    // calculate the desired pixel radius for the size mode\n    float desiredPixelRadius = (uPixelSizing ? iRadius : pixelRadius);\n\n    // calculate the pixel radius multiplier needed to acomplish the desired pixel radius\n    float pixelRadiusMult = desiredPixelRadius / pixelRadius;\n\n    // calculate the render matrix\n    mat4 renderMatrix = uBillboard ? uProjectionMatrix * lookAtMatrix : uProjectionMatrix * modelMatrix;\n\n    // compute the vertex position and its screen position\n    vec4 worldVertex = renderMatrix * vec4(aVertex * iRadius * pixelRadiusMult, 1.0);\n\n    // send the render color to the fragment shader\n    fColor = uPicking ? vec4(iPickingColor) / 255.0 : getColorByIndexFromTexture(uColorPalette, int(iColor));\n    // send the normalized length of a single pixel to the fragment shader\n    fPixelLength = 1.0 / desiredPixelRadius;\n    // send the normalized distance from the center to the fragment shader\n    vFromCenter = aVertex.xy;\n\n    // set the render vertex location\n    gl_Position = worldVertex;\n}\n';
var Circle_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform float uPixelRatio;\nuniform uint uRenderMode;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float antialias = fPixelLength * 1.5;\n    float sd = sdCircle(vFromCenter, 1.0);\n    float outline = opOnion(sd, min(0.15, fPixelLength * 6.0 * uPixelRatio));\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float distance = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (sd > distance) {\n        discard;\n    }\n\n    vec3 color = fColor.rgb * (1.0 - 0.25 * smoothstep(antialias, 0.0, outline));\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (sd < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(color, smoothstep(0.0, antialias, abs(sd))));\n    } else {\n        fragColor = outputColor(vec4(color, 1.0));\n    }\n}\n";
var Circle_data_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in uint aPositionIndex;\nlayout(location=1) in uint aColor;\nlayout(location=2) in float aRadius; // optional atthe end\n\nuniform sampler2D uGraphPoints;\nuniform bool uUsePointRadius;\n\nout vec3 vPosition;\nout float vRadius;\nflat out uint vColor;\n\nvec4 getValueByIndexFromTexture(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nvoid main() {\n    vec4 value = getValueByIndexFromTexture(uGraphPoints, int(aPositionIndex));\n    vPosition = value.xyz;\n\n    if (uUsePointRadius) {\n        vRadius = value.w;\n    } else {\n        vRadius = aRadius;\n    }\n\n    vColor = aColor;\n}\n";
var Circle_picking_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float fromCenter = length(vFromCenter);\n    if (fromCenter > 1.0) {\n        discard;\n    }\n    fragColor = fColor;\n}\n";
var kGLCircleNodeTypes = {
  position: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  radius: PicoGL.FLOAT,
  color: PicoGL.UNSIGNED_INT
};
var Circle = class extends Nodes {
  constructor(...args) {
    super(...args);
  }
  initialize(context, points, data, mappings, pickingManager) {
    super.initialize(context, points, data, mappings, pickingManager);
    this.verticesVBO = context.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1
    ]));
    this.pickingHandler = this.handlePickingEvent.bind(this);
    this.pickingColors = this.pickingManager.allocatePickingColors(data.length);
    this.pickingVBO = context.createVertexBuffer(PicoGL.UNSIGNED_BYTE, 4, this.pickingColors.colors);
    this.nodesVAO = context.createVertexArray().vertexAttributeBuffer(0, this.verticesVBO);
    this.configureTargetVAO(this.nodesVAO);
    this.nodesVAO.instanceAttributeBuffer(4, this.pickingVBO);
    const shaders = this.getDrawShaders();
    this.program = context.createProgram(shaders.vs, shaders.fs);
    this.drawCall = context.createDrawCall(this.program, this.nodesVAO).primitive(PicoGL.TRIANGLE_STRIP);
    const pickingShaders = this.getPickingShaders();
    this.pickingProgram = context.createProgram(pickingShaders.vs, pickingShaders.fs);
    this.pickingDrawCall = context.createDrawCall(this.pickingProgram, this.nodesVAO).primitive(PicoGL.TRIANGLE_STRIP);
    const computedMappings = this.computeMappings(mappings);
    this.usePointRadius = computedMappings.radius === null;
    this.compute(context, {
      uGraphPoints: this.dataTexture,
      uUsePointRadius: this.usePointRadius
    });
    this.pickingManager.on(PickingManager.events.hoverOn, this.pickingHandler);
    this.pickingManager.on(PickingManager.events.hoverOff, this.pickingHandler);
    this.pickingManager.on(PickingManager.events.click, this.pickingHandler);
  }
  destroy() {
  }
  render(context, mode, uniforms) {
    this.configureRenderContext(context, mode);
    switch (mode) {
      case RenderMode.PICKING:
        if (this.picking) {
          setDrawCallUniforms(this.pickingDrawCall, uniforms);
          setDrawCallUniforms(this.pickingDrawCall, this.localUniforms);
          this.pickingDrawCall.uniform("uPicking", true);
          this.pickingDrawCall.draw();
        }
        break;
      case RenderMode.HIGH_PASS_2:
        context.depthMask(false);
      default:
        setDrawCallUniforms(this.drawCall, uniforms);
        setDrawCallUniforms(this.drawCall, this.localUniforms);
        this.drawCall.uniform("uPicking", false);
        this.drawCall.draw();
        break;
    }
  }
  getDrawShaders() {
    return {
      vs: Circle_vs_default,
      fs: Circle_fs_default
    };
  }
  getPickingShaders() {
    return {
      vs: Circle_vs_default,
      fs: Circle_picking_fs_default
    };
  }
  getGLSourceTypes() {
    return kBasicNodeDataTypes;
  }
  getGLTargetTypes() {
    return kGLCircleNodeTypes;
  }
  getDataShader() {
    return {
      vs: Circle_data_vs_default,
      varyings: ["vPosition", "vRadius", "vColor"]
    };
  }
  handlePickingEvent(event, colorID) {
    if (this.picking && this.pickingColors.map.has(colorID)) {
      const id = this.idArray[this.pickingColors.map.get(colorID)];
      this.emit(event, id);
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/ring/Ring.js
var Ring_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform float uPixelRatio;\nuniform uint uRenderMode;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float thickness = max(fPixelLength, min(0.05, fPixelLength * 1.5 * uPixelRatio));\n    float antialias = min(thickness, fPixelLength * 1.5);\n    float radius = 1.0 - thickness;\n    float ring = opOnion(sdCircle(vFromCenter, radius), thickness);\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float distance = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (ring > distance) {\n        discard;\n    }\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (ring < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(fColor.rgb, smoothstep(0.0, antialias, abs(ring))));\n    } else {\n        fragColor = outputColor(vec4(fColor.rgb, 1.0));\n    }\n}\n";
var Ring = class extends Circle {
  getDrawShaders() {
    const shaders = super.getDrawShaders();
    shaders.fs = Ring_fs_default;
    return shaders;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/triangle/Triangle.js
var Triangle_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform float uPixelRatio;\nuniform uint uRenderMode;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float antialias = fPixelLength * 1.5;\n    float sd = sdEquilateralTriangle(vFromCenter, 0.85);\n    float outline = opOnion(sd, min(0.15, fPixelLength * 6.0 * uPixelRatio));\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float distance = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (sd > distance) {\n        discard;\n    }\n\n    vec3 color = fColor.rgb * (1.0 - 0.25 * smoothstep(antialias, 0.0, outline));\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (sd < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(color, smoothstep(0.0, antialias, abs(sd))));\n    } else {\n        fragColor = outputColor(vec4(color, 1.0));\n    }\n}\n";
var Triangle_picking_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float sd = sdEquilateralTriangle(vFromCenter, 1.0);\n    if (sd > 0.0) {\n        discard;\n    }\n    fragColor = fColor;\n}\n";
var Triangle = class extends Circle {
  getDrawShaders() {
    const shaders = super.getDrawShaders();
    shaders.fs = Triangle_fs_default;
    return shaders;
  }
  getPickingShaders() {
    const shaders = super.getPickingShaders();
    shaders.fs = Triangle_picking_fs_default;
    return shaders;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/pentagon/Pentagon.js
var Pentagon_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform float uPixelRatio;\nuniform uint uRenderMode;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float antialias = fPixelLength * 1.5;\n    float sd = sdPentagon(vFromCenter, 1.0);\n    float outline = opOnion(sd, min(0.15, fPixelLength * 6.0 * uPixelRatio));\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float distance = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (sd > distance) {\n        discard;\n    }\n\n    vec3 color = fColor.rgb * (1.0 - 0.25 * smoothstep(antialias, 0.0, outline));\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (sd < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(color, smoothstep(0.0, antialias, abs(sd))));\n    } else {\n        fragColor = outputColor(vec4(color, 1.0));\n    }\n}\n";
var Pentagon_picking_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float sd = sdPentagon(vFromCenter, 1.0);\n    if (sd > 0.0) {\n        discard;\n    }\n    fragColor = fColor;\n}\n";
var Pentagon = class extends Circle {
  getDrawShaders() {
    const shaders = super.getDrawShaders();
    shaders.fs = Pentagon_fs_default;
    return shaders;
  }
  getPickingShaders() {
    const shaders = super.getPickingShaders();
    shaders.fs = Pentagon_picking_fs_default;
    return shaders;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/octagon/Octagon.js
var Octagon_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform float uPixelRatio;\nuniform uint uRenderMode;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float antialias = fPixelLength * 1.5;\n    float sd = sdOctagon(vFromCenter, 1.0);\n    float outline = opOnion(sd, min(0.15, fPixelLength * 6.0 * uPixelRatio));\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float distance = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (sd > distance) {\n        discard;\n    }\n\n    vec3 color = fColor.rgb * (1.0 - 0.25 * smoothstep(antialias, 0.0, outline));\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (sd < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(color, smoothstep(0.0, antialias, abs(sd))));\n    } else {\n        fragColor = outputColor(vec4(color, 1.0));\n    }\n}\n";
var Octagon_picking_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float sd = sdOctagon(vFromCenter, 1.0);\n    if (sd > 0.0) {\n        discard;\n    }\n    fragColor = fColor;\n}\n";
var Octagon = class extends Circle {
  getDrawShaders() {
    const shaders = super.getDrawShaders();
    shaders.fs = Octagon_fs_default;
    return shaders;
  }
  getPickingShaders() {
    const shaders = super.getPickingShaders();
    shaders.fs = Octagon_picking_fs_default;
    return shaders;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/star/Star.js
var Star_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform float uPixelRatio;\nuniform uint uRenderMode;\nuniform uint uSides;\nuniform float uAngleDivisor;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float antialias = fPixelLength * 1.5;\n    float sd = sdStar(vFromCenter, 1.0, uSides, uAngleDivisor);\n    float outline = opOnion(sd, min(0.15, fPixelLength * 6.0 * uPixelRatio));\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float distance = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (sd > distance) {\n        discard;\n    }\n\n    vec3 color = fColor.rgb * (1.0 - 0.25 * smoothstep(antialias, 0.0, outline));\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (sd < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(color, smoothstep(0.0, antialias, abs(sd))));\n    } else {\n        fragColor = outputColor(vec4(color, 1.0));\n    }\n}\n";
var Star_picking_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform uint uSides;\nuniform float uAngleDivisor;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float sd = sdStar(vFromCenter, 1.0, uSides, uAngleDivisor);\n    if (sd > 0.0) {\n        discard;\n    }\n    fragColor = fColor;\n}\n";
var Star = class extends Circle {
  get sides() {
    return this.localUniforms.uSides;
  }
  set sides(value) {
    this.localUniforms.uSides = value;
  }
  get angleDivisor() {
    return this.localUniforms.uAngleDivisor;
  }
  set angleDivisor(value) {
    this.localUniforms.uAngleDivisor = value;
  }
  constructor(context, points, data, mappings, pickingManager, sides = 5, angleDivisor = 3) {
    super(context, points, data, mappings, pickingManager, sides, angleDivisor);
  }
  initialize(context, points, data, mappings, pickingManager, sides, angleDivisor) {
    super.initialize(context, points, data, mappings, pickingManager);
    this.localUniforms.uSides = sides;
    this.localUniforms.uAngleDivisor = angleDivisor;
  }
  getDrawShaders() {
    const shaders = super.getDrawShaders();
    shaders.fs = Star_fs_default;
    return shaders;
  }
  getPickingShaders() {
    const shaders = super.getPickingShaders();
    shaders.fs = Star_picking_fs_default;
    return shaders;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/cross/Cross.js
var Cross_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform float uPixelRatio;\nuniform uint uRenderMode;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float antialias = fPixelLength * 1.5;\n    float sd = sdCross(vFromCenter, 1.0, 0.3);\n    float outline = opOnion(sd, min(0.15, fPixelLength * 6.0 * uPixelRatio));\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float distance = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (sd > distance) {\n        discard;\n    }\n\n    vec3 color = fColor.rgb * (1.0 - 0.25 * smoothstep(antialias, 0.0, outline));\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (sd < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(color, smoothstep(0.0, antialias, abs(sd))));\n    } else {\n        fragColor = outputColor(vec4(color, 1.0));\n    }\n}\n";
var Cross_picking_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float sd = sdCross(vFromCenter, 1.0, 0.3);\n    if (sd > 0.0) {\n        discard;\n    }\n    fragColor = fColor;\n}\n";
var Cross = class extends Circle {
  getDrawShaders() {
    const shaders = super.getDrawShaders();
    shaders.fs = Cross_fs_default;
    return shaders;
  }
  getPickingShaders() {
    const shaders = super.getPickingShaders();
    shaders.fs = Cross_picking_fs_default;
    return shaders;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/plus/Plus.js
var Plus_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform float uPixelRatio;\nuniform uint uRenderMode;\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float antialias = fPixelLength * 1.5;\n    float sd = sdPlus(vFromCenter, vec2(0.9, 0.3), 0.0);\n    float outline = opOnion(sd, min(0.15, fPixelLength * 6.0 * uPixelRatio));\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float distance = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (sd > distance) {\n        discard;\n    }\n\n    vec3 color = fColor.rgb * (1.0 - 0.25 * smoothstep(antialias, 0.0, outline));\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (sd < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(color, smoothstep(0.0, antialias, abs(sd))));\n    } else {\n        fragColor = outputColor(vec4(color, 1.0));\n    }\n}\n";
var Plus_picking_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nflat in vec4 fColor;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nvoid main() {\n    float sd = sdPlus(vFromCenter, vec2(1.0, 0.3), 0.0);\n    if (sd > 0.0) {\n        discard;\n    }\n    fragColor = fColor;\n}\n";
var Plus = class extends Circle {
  getDrawShaders() {
    const shaders = super.getDrawShaders();
    shaders.fs = Plus_fs_default;
    return shaders;
  }
  getPickingShaders() {
    const shaders = super.getPickingShaders();
    shaders.fs = Plus_picking_fs_default;
    return shaders;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/nodes/mod.js
var types = {
  Circle,
  Ring,
  Triangle,
  Pentagon,
  Octagon,
  Star,
  Cross,
  Plus
};

// node_modules/@uncharted.software/grafer/build/lib/graph/edges/mod.js
var mod_exports2 = {};
__export(mod_exports2, {
  ClusterBundle: () => ClusterBundle,
  CurvedPath: () => CurvedPath,
  Dashed: () => Dashed,
  Edges: () => Edges,
  Gravity: () => Gravity,
  Straight: () => Straight,
  kBasicEdgeDataTypes: () => kBasicEdgeDataTypes,
  kBasicEdgeMappings: () => kBasicEdgeMappings,
  kClusterBundleEdgeDataTypes: () => kClusterBundleEdgeDataTypes,
  kClusterBundleEdgeMappings: () => kClusterBundleEdgeMappings,
  kGLClusterBundleEdgeTypes: () => kGLClusterBundleEdgeTypes,
  kGLGravityEdgeTypes: () => kGLGravityEdgeTypes,
  kGLPathEdgeTypes: () => kGLPathEdgeTypes,
  kGLStraightEdgeTypes: () => kGLStraightEdgeTypes,
  kPathEdgeDataTypes: () => kPathEdgeDataTypes,
  kPathEdgeMappings: () => kPathEdgeMappings,
  types: () => types2
});

// node_modules/@uncharted.software/grafer/build/lib/graph/edges/Edges.js
var kBasicEdgeMappings = {
  id: (entry, i) => "id" in entry ? entry.id : i,
  source: (entry) => entry.source,
  target: (entry) => entry.target,
  sourceColor: (entry) => "sourceColor" in entry ? entry.sourceColor : 0,
  targetColor: (entry) => "targetColor" in entry ? entry.targetColor : 0
};
var kBasicEdgeDataTypes = {
  source: picogl_default.UNSIGNED_INT,
  target: picogl_default.UNSIGNED_INT,
  sourceColor: picogl_default.UNSIGNED_INT,
  targetColor: picogl_default.UNSIGNED_INT
};
var Edges = class extends LayerRenderable {
  static get defaultMappings() {
    return kBasicEdgeMappings;
  }
  get lineWidth() {
    return this.localUniforms.uLineWidth;
  }
  set lineWidth(value) {
    this.localUniforms.uLineWidth = value;
  }
  initialize(...args) {
    this.localUniforms = Object.assign({}, this.localUniforms, {
      uLineWidth: 1.5
    });
    super.initialize(...args);
  }
  constructor(...args) {
    super(...args);
  }
  computeMappings(mappings) {
    const edgesMappings = Object.assign({}, kBasicEdgeMappings, mappings);
    const sourceMapping = edgesMappings.source;
    edgesMappings.source = (entry, i) => {
      return this.points.getPointIndex(sourceMapping(entry, i));
    };
    const targetMapping = edgesMappings.target;
    edgesMappings.target = (entry, i) => {
      return this.points.getPointIndex(targetMapping(entry, i));
    };
    return edgesMappings;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/edges/straight/Straight.js
var Straight_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in vec3 aVertex;\nlayout(location=1) in vec3 iOffsetA;\nlayout(location=2) in vec3 iOffsetB;\nlayout(location=3) in uint iColorA;\nlayout(location=4) in uint iColorB;\n\nuniform mat4 uViewMatrix;\nuniform mat4 uSceneMatrix;\nuniform mat4 uProjectionMatrix;\nuniform vec2 uViewportSize;\nuniform float uPixelRatio;\nuniform sampler2D uColorPalette;\n\nuniform float uLineWidth;\n\nflat out float fLineWidth;\nout vec3 vColor;\nout vec2 vProjectedPosition;\nout float vProjectedW;\n\nvec4 getColorByIndexFromTexture(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nvoid main() {\n    float multA = aVertex.y;\n    float multB = 1.0 - aVertex.y;\n\n    vec4 colorA = getColorByIndexFromTexture(uColorPalette, int(iColorA));\n    vec4 colorB = getColorByIndexFromTexture(uColorPalette, int(iColorB));\n\n    vColor = colorA.rgb * multA + colorB.rgb * multB;\n\n    mat4 renderMatrix = uProjectionMatrix * uViewMatrix * uSceneMatrix;\n\n    vec4 aProjected = renderMatrix * vec4(iOffsetA, 1.0);\n    vec2 aScreen = aProjected.xy / aProjected.w * uViewportSize * 0.5;\n\n    vec4 bProjected = renderMatrix * vec4(iOffsetB, 1.0);\n    vec2 bScreen = bProjected.xy / bProjected.w * uViewportSize * 0.5;\n\n    vec2 direction = normalize(bScreen - aScreen);\n    vec2 perp = vec2(-direction.y, direction.x);\n\n    fLineWidth = uLineWidth * uPixelRatio;\n    float offsetWidth = fLineWidth + 0.5;\n    vec4 position = aProjected * multA + bProjected * multB;\n    vec4 offset = vec4(((aVertex.x * perp * offsetWidth) / uViewportSize) * position.w, 0.0, 0.0);\n    gl_Position = position + offset;\n\n    vProjectedPosition = position.xy;\n    vProjectedW = position.w;\n}\n";
var Straight_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x_1540259130(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l_1540259130(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x_1540259130(color.r);\n    float g = luminance_x_1540259130(color.g);\n    float b = luminance_x_1540259130(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x_1540259130(color.r) * 0.2126;\n    float g = luminance_x_1540259130(color.g) * 0.7152;\n    float b = luminance_x_1540259130(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l_1540259130(tr / 0.2126);\n    float rg = color_l_1540259130(tg / 0.7152);\n    float rb = color_l_1540259130(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n#define ONE_ALPHA 0.00392156862 // 1.0 / 255.0\n\nfloat lineAlpha(vec2 position, float w, vec2 viewportSize, float lineWidth) {\n    vec2 lineCenter = ((position / w) * 0.5 + 0.5) * viewportSize;\n    float distOffset = (lineWidth - 1.0) * 0.5;\n    float dist = smoothstep(lineWidth * 0.5 - 0.5, lineWidth * 0.5 + 0.5, distance(lineCenter, gl_FragCoord.xy));\n    return (1.0 - dist);\n}\n\nvec4 lineColor(vec3 color, vec2 position, float w, vec2 viewportSize, uint mode, float lineWidth) {\n    if (mode < MODE_HIGH_PASS_1) {\n        return outputColor(vec4(color, 1.0));\n    }\n\n    float a = lineAlpha(position, w, viewportSize, lineWidth);\n\n    if (mode == MODE_HIGH_PASS_1) {\n        if (a == 1.0) {\n            return outputColor(vec4(color, a));\n        } else {\n            discard;\n        }\n    }\n\n    // Possible optimization.\n    // Edges run into fill rate issues because too many of them overlap, discarging pixels below a certain alpha\n    // threshold might help speed things up a bit.\n    if (a < ONE_ALPHA) {\n        discard;\n    }\n\n    return outputColor(vec4(color, a));\n}\n\nuniform vec2 uViewportSize;\nuniform uint uRenderMode;\n\nflat in float fLineWidth;\nin vec3 vColor;\nin vec2 vProjectedPosition;\nin float vProjectedW;\n\nout vec4 fragColor;\n\nvoid main() {\n    fragColor = lineColor(vColor, vProjectedPosition, vProjectedW, uViewportSize, uRenderMode, fLineWidth);\n}\n";
var Straight_data_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in uint aSourceIndex;\nlayout(location=1) in uint aTargetIndex;\nlayout(location=2) in uint aSourceColor;\nlayout(location=3) in uint aTargetColor;\n\nuniform sampler2D uGraphPoints;\n\nout vec3 vSource;\nout vec3 vTarget;\nflat out uint vSourceColor;\nflat out uint vTargetColor;\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\nvoid main() {\n    vec4 source = valueForIndex(uGraphPoints, int(aSourceIndex));\n    vec4 target = valueForIndex(uGraphPoints, int(aTargetIndex));\n\n    vec3 direction = normalize(target.xyz - source.xyz);\n\n    vSource = source.xyz + direction * source[3];\n    vTarget = target.xyz - direction * target[3];\n\n    vSourceColor = aSourceColor;\n    vTargetColor = aTargetColor;\n}\n";
var kGLStraightEdgeTypes = {
  source: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  target: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  sourceColor: PicoGL.UNSIGNED_INT,
  targetColor: PicoGL.UNSIGNED_INT
};
var Straight = class extends Edges {
  initialize(context, points, data, mappings, pickingManager) {
    super.initialize(context, points, data, mappings, pickingManager);
    this.verticesVBO = context.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
      -1,
      0,
      1,
      0,
      -1,
      1,
      1,
      1
    ]));
    this.edgesVAO = context.createVertexArray().vertexAttributeBuffer(0, this.verticesVBO);
    this.configureTargetVAO(this.edgesVAO);
    const shaders = this.getDrawShaders();
    this.program = context.createProgram(shaders.vs, shaders.fs);
    this.drawCall = context.createDrawCall(this.program, this.edgesVAO).primitive(PicoGL.TRIANGLE_STRIP);
    this.compute(context, {
      uGraphPoints: this.dataTexture
    });
  }
  destroy() {
  }
  render(context, mode, uniforms) {
    this.configureRenderContext(context, mode);
    setDrawCallUniforms(this.drawCall, uniforms);
    setDrawCallUniforms(this.drawCall, this.localUniforms);
    switch (mode) {
      case RenderMode.PICKING:
        break;
      default:
        this.drawCall.draw();
        break;
    }
  }
  getDrawShaders() {
    return {
      vs: Straight_vs_default,
      fs: Straight_fs_default
    };
  }
  getPickingShaders() {
    return {
      vs: Straight_vs_default,
      fs: null
    };
  }
  getGLSourceTypes() {
    return kBasicEdgeDataTypes;
  }
  getGLTargetTypes() {
    return kGLStraightEdgeTypes;
  }
  getDataShader() {
    return {
      vs: Straight_data_vs_default,
      varyings: ["vSource", "vTarget", "vSourceColor", "vTargetColor"]
    };
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/edges/dashed/Dashed.js
var Dashed_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in vec3 aVertex;\nlayout(location=1) in vec3 iOffsetA;\nlayout(location=2) in vec3 iOffsetB;\nlayout(location=3) in uint iColorA;\nlayout(location=4) in uint iColorB;\n\nuniform mat4 uViewMatrix;\nuniform mat4 uSceneMatrix;\nuniform mat4 uProjectionMatrix;\nuniform vec2 uViewportSize;\nuniform float uPixelRatio;\nuniform sampler2D uColorPalette;\nuniform uint uDashLength;\n\nuniform float uLineWidth;\n\nflat out float fLineWidth;\nout vec3 vColor;\nout float vDashLength;\nout vec2 vProjectedPosition;\nout float vProjectedW;\n\nvec4 getColorByIndexFromTexture(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nvoid main() {\n    float multA = aVertex.y;\n    float multB = 1.0 - aVertex.y;\n\n    vec4 colorA = getColorByIndexFromTexture(uColorPalette, int(iColorA));\n    vec4 colorB = getColorByIndexFromTexture(uColorPalette, int(iColorB));\n\n    vColor = colorA.rgb * multA + colorB.rgb * multB;\n\n    mat4 renderMatrix = uProjectionMatrix * uViewMatrix * uSceneMatrix;\n\n    vec4 aProjected = renderMatrix * vec4(iOffsetA, 1.0);\n    vec2 aScreen = (aProjected.xy / aProjected.w) * (uViewportSize / 2.0);\n\n    vec4 bProjected = renderMatrix * vec4(iOffsetB, 1.0);\n    vec2 bScreen = (bProjected.xy / bProjected.w) * (uViewportSize / 2.0);\n\n    vec2 direction = normalize(bScreen - aScreen);\n    vec2 perp = vec2(-direction.y, direction.x);\n\n    fLineWidth = uLineWidth * uPixelRatio;\n    float offsetWidth = fLineWidth + 0.5;\n    vec4 position = aProjected * multA + bProjected * multB;\n    vec4 offset = vec4(((aVertex.x * perp * offsetWidth) / uViewportSize) * position.w, 0.0, 0.0);\n    gl_Position = position + offset;\n\n    vProjectedPosition = position.xy;\n    vProjectedW = position.w;\n\n    float screenDistance = distance(aScreen, bScreen);\n    vDashLength = (screenDistance / float(uDashLength)) * aVertex.y;\n}\n";
var Dashed_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x_1540259130(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l_1540259130(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x_1540259130(color.r);\n    float g = luminance_x_1540259130(color.g);\n    float b = luminance_x_1540259130(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x_1540259130(color.r) * 0.2126;\n    float g = luminance_x_1540259130(color.g) * 0.7152;\n    float b = luminance_x_1540259130(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l_1540259130(tr / 0.2126);\n    float rg = color_l_1540259130(tg / 0.7152);\n    float rb = color_l_1540259130(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n#define ONE_ALPHA 0.00392156862 // 1.0 / 255.0\n\nfloat lineAlpha(vec2 position, float w, vec2 viewportSize, float lineWidth) {\n    vec2 lineCenter = ((position / w) * 0.5 + 0.5) * viewportSize;\n    float distOffset = (lineWidth - 1.0) * 0.5;\n    float dist = smoothstep(lineWidth * 0.5 - 0.5, lineWidth * 0.5 + 0.5, distance(lineCenter, gl_FragCoord.xy));\n    return (1.0 - dist);\n}\n\nvec4 lineColor(vec3 color, vec2 position, float w, vec2 viewportSize, uint mode, float lineWidth) {\n    if (mode < MODE_HIGH_PASS_1) {\n        return outputColor(vec4(color, 1.0));\n    }\n\n    float a = lineAlpha(position, w, viewportSize, lineWidth);\n\n    if (mode == MODE_HIGH_PASS_1) {\n        if (a == 1.0) {\n            return outputColor(vec4(color, a));\n        } else {\n            discard;\n        }\n    }\n\n    // Possible optimization.\n    // Edges run into fill rate issues because too many of them overlap, discarging pixels below a certain alpha\n    // threshold might help speed things up a bit.\n    if (a < ONE_ALPHA) {\n        discard;\n    }\n\n    return outputColor(vec4(color, a));\n}\n\nuniform vec2 uViewportSize;\nuniform uint uRenderMode;\n\nflat in float fLineWidth;\nin vec3 vColor;\nin float vDashLength;\nin vec2 vProjectedPosition;\nin float vProjectedW;\n\nout vec4 fragColor;\n\nvoid main() {\n    if (int(vDashLength) % 2 == 1) {\n        discard;\n    }\n    fragColor = lineColor(vColor, vProjectedPosition, vProjectedW, uViewportSize, uRenderMode, fLineWidth);\n}\n";
var Dashed = class extends Straight {
  get dashLength() {
    return this.localUniforms.uDashLength;
  }
  set dashLength(value) {
    this.localUniforms.uDashLength = value;
  }
  initialize(context, points, data, mappings, pickingManager) {
    super.initialize(context, points, data, mappings, pickingManager);
    this.localUniforms.uDashLength = 10;
  }
  getDrawShaders() {
    return {
      vs: Dashed_vs_default,
      fs: Dashed_fs_default
    };
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/edges/gravity/Gravity.js
var Gravity_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in vec3 aVertex;\nlayout(location=1) in vec3 iOffsetA;\nlayout(location=2) in vec3 iOffsetB;\nlayout(location=3) in uint iColorA;\nlayout(location=4) in uint iColorB;\n\nuniform mat4 uViewMatrix;\nuniform mat4 uSceneMatrix;\nuniform mat4 uProjectionMatrix;\nuniform vec2 uViewportSize;\nuniform float uPixelRatio;\nuniform float uGravity;\nuniform sampler2D uColorPalette;\n\nout vec3 vColor;\nout vec2 vProjectedPosition;\nout float vProjectedW;\n\nvec4 getColorByIndexFromTexture(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nvoid main() {\n    float multA = aVertex.x;\n    float multB = 1.0 - aVertex.x;\n\n    vec4 colorA = getColorByIndexFromTexture(uColorPalette, int(iColorA));\n    vec4 colorB = getColorByIndexFromTexture(uColorPalette, int(iColorB));\n\n    vColor = colorA.rgb * multA + colorB.rgb * multB;\n\n    vec3 direction = iOffsetB - iOffsetA;\n    vec3 middle = iOffsetA + direction * 0.5;\n    float distance = length(direction);\n\n    float toCenter = length(middle);\n    vec3 towardsCenter = (middle * -1.0) / toCenter;\n\n    vec3 gravity = middle + towardsCenter * min(toCenter, distance * uGravity);\n    vec3 position = gravity + pow(multB, 2.0) * (iOffsetB - gravity) + pow(multA, 2.0) * (iOffsetA - gravity);\n\n    mat4 renderMatrix = uProjectionMatrix * uViewMatrix * uSceneMatrix;\n    gl_Position = renderMatrix * vec4(position, 1.0);\n\n    vProjectedPosition = gl_Position.xy;\n    vProjectedW = gl_Position.w;\n}\n";
var Gravity_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x_1540259130(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l_1540259130(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x_1540259130(color.r);\n    float g = luminance_x_1540259130(color.g);\n    float b = luminance_x_1540259130(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x_1540259130(color.r) * 0.2126;\n    float g = luminance_x_1540259130(color.g) * 0.7152;\n    float b = luminance_x_1540259130(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l_1540259130(tr / 0.2126);\n    float rg = color_l_1540259130(tg / 0.7152);\n    float rb = color_l_1540259130(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n#define ONE_ALPHA 0.00392156862 // 1.0 / 255.0\n\nfloat lineAlpha(vec2 position, float w, vec2 viewportSize, float lineWidth) {\n    vec2 lineCenter = ((position / w) * 0.5 + 0.5) * viewportSize;\n    float distOffset = (lineWidth - 1.0) * 0.5;\n    float dist = smoothstep(lineWidth * 0.5 - 0.5, lineWidth * 0.5 + 0.5, distance(lineCenter, gl_FragCoord.xy));\n    return (1.0 - dist);\n}\n\nvec4 lineColor(vec3 color, vec2 position, float w, vec2 viewportSize, uint mode, float lineWidth) {\n    if (mode < MODE_HIGH_PASS_1) {\n        return outputColor(vec4(color, 1.0));\n    }\n\n    float a = lineAlpha(position, w, viewportSize, lineWidth);\n\n    if (mode == MODE_HIGH_PASS_1) {\n        if (a == 1.0) {\n            return outputColor(vec4(color, a));\n        } else {\n            discard;\n        }\n    }\n\n    // Possible optimization.\n    // Edges run into fill rate issues because too many of them overlap, discarging pixels below a certain alpha\n    // threshold might help speed things up a bit.\n    if (a < ONE_ALPHA) {\n        discard;\n    }\n\n    return outputColor(vec4(color, a));\n}\n\nuniform vec2 uViewportSize;\nuniform uint uRenderMode;\n\nin vec3 vColor;\nin vec2 vProjectedPosition;\nin float vProjectedW;\n\nout vec4 fragColor;\n\nvoid main() {\n    fragColor = lineColor(vColor, vProjectedPosition, vProjectedW, uViewportSize, uRenderMode);\n}\n";
var Gravity_data_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in uint aSourceIndex;\nlayout(location=1) in uint aTargetIndex;\nlayout(location=2) in uint aSourceColor;\nlayout(location=3) in uint aTargetColor;\n\nuniform sampler2D uGraphPoints;\n\nout vec3 vSource;\nout vec3 vTarget;\nflat out uint vSourceColor;\nflat out uint vTargetColor;\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\nvoid main() {\n    vec4 source = valueForIndex(uGraphPoints, int(aSourceIndex));\n    vSource = source.xyz;\n\n    vec4 target = valueForIndex(uGraphPoints, int(aTargetIndex));\n    vTarget = target.xyz;\n\n    vSourceColor = aSourceColor;\n    vTargetColor = aTargetColor;\n}\n";
var kGLGravityEdgeTypes = {
  source: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  target: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  sourceColor: PicoGL.UNSIGNED_INT,
  targetColor: PicoGL.UNSIGNED_INT
};
var Gravity = class extends Edges {
  get gravity() {
    return this.localUniforms.uGravity;
  }
  set gravity(value) {
    this.localUniforms.uGravity = value;
  }
  constructor(context, points, data, mappings, pickingManager, segments = 16) {
    super(context, points, data, mappings, pickingManager, segments);
  }
  initialize(context, points, data, mappings, pickingManager, segments) {
    super.initialize(context, points, data, mappings, pickingManager);
    this.localUniforms.uGravity = -0.2;
    const segmentVertices = [];
    for (let i = 0; i <= segments; ++i) {
      segmentVertices.push(i / segments, 0);
    }
    this.verticesVBO = context.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array(segmentVertices));
    this.edgesVAO = context.createVertexArray().vertexAttributeBuffer(0, this.verticesVBO);
    this.configureTargetVAO(this.edgesVAO);
    const shaders = this.getDrawShaders();
    this.program = context.createProgram(shaders.vs, shaders.fs);
    this.drawCall = context.createDrawCall(this.program, this.edgesVAO).primitive(PicoGL.LINE_STRIP);
    this.compute(context, {
      uGraphPoints: this.dataTexture
    });
  }
  destroy() {
  }
  render(context, mode, uniforms) {
    setDrawCallUniforms(this.drawCall, uniforms);
    setDrawCallUniforms(this.drawCall, this.localUniforms);
    this.configureRenderContext(context, mode);
    switch (mode) {
      case RenderMode.PICKING:
        break;
      default:
        this.drawCall.draw();
        break;
    }
  }
  getDrawShaders() {
    return {
      vs: Gravity_vs_default,
      fs: Gravity_fs_default
    };
  }
  getPickingShaders() {
    return {
      vs: Gravity_vs_default,
      fs: null
    };
  }
  getGLSourceTypes() {
    return kBasicEdgeDataTypes;
  }
  getGLTargetTypes() {
    return kGLStraightEdgeTypes;
  }
  getDataShader() {
    return {
      vs: Gravity_data_vs_default,
      varyings: ["vSource", "vTarget", "vSourceColor", "vTargetColor"]
    };
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/edges/path/CurvedPath.js
var CurvedPath_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in vec3 aVertex;\nlayout(location=1) in vec3 iOffsetA;\nlayout(location=2) in vec3 iOffsetB;\nlayout(location=3) in vec3 iControl;\nlayout(location=4) in uint iColorA;\nlayout(location=5) in uint iColorB;\nlayout(location=6) in vec2 iColorMix;\n\nuniform mat4 uViewMatrix;\nuniform mat4 uSceneMatrix;\nuniform mat4 uProjectionMatrix;\nuniform vec2 uViewportSize;\nuniform float uPixelRatio;\nuniform sampler2D uColorPalette;\n\nuniform float uLineWidth;\nuniform float uSegments;\n\nflat out float fLineWidth;\nout vec3 vColor;\nout vec2 vProjectedPosition;\nout float vProjectedW;\n\nvec4 getColorByIndexFromTexture(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nvec3 bezier(vec3 p0, vec3 p1, vec3 p2, float t) {\n    return p1 + pow(1.0 - t, 2.0) * (p2 - p1) + pow(t, 2.0) * (p0 - p1);\n}\n\nvoid main() {\n    // bezier works fine with 0 > t > 1\n    float t0 = aVertex.y / uSegments;\n    float t1 = (aVertex.y + 1.0) / uSegments;\n\n    // calculate both bezier points\n    vec3 b0 = bezier(iOffsetA, iControl, iOffsetB, t0);\n    vec3 b1 = bezier(iOffsetA, iControl, iOffsetB, t1);\n\n    // project the points to the screen\n    mat4 renderMatrix = uProjectionMatrix * uViewMatrix * uSceneMatrix;\n    vec4 b0Projected = renderMatrix * vec4(b0, 1.0);\n    vec4 b1Projected = renderMatrix * vec4(b1, 1.0);\n\n    // get their screen coords\n    vec2 b0Screen = (b0Projected.xy / b0Projected.w) * uViewportSize * 0.5;\n    vec2 b1Screen = (b1Projected.xy / b1Projected.w) * uViewportSize * 0.5;\n\n    // get the direction and normal of the segment\n    vec2 direction = normalize(b1Screen - b0Screen);\n    vec2 normal = vec2(-direction.y, direction.x);\n\n    // calculate the pixel offset\n    fLineWidth = uLineWidth * uPixelRatio;\n    float offsetWidth = fLineWidth + 0.5;\n    vec4 offset = vec4(((aVertex.x * normal * offsetWidth) / uViewportSize) * b0Projected.w, 0.0, 0.0);\n\n    // set the final vertex position\n    gl_Position = b0Projected + offset;\n    vProjectedPosition = b0Projected.xy;\n    vProjectedW = b0Projected.w;\n\n    // calculate the color\n    vec4 colorA = getColorByIndexFromTexture(uColorPalette, int(iColorA));\n    vec4 colorB = getColorByIndexFromTexture(uColorPalette, int(iColorB));\n    vec3 mixColorA = mix(colorA.rgb, colorB.rgb, iColorMix[1]);\n    vec3 mixColorB = mix(colorA.rgb, colorB.rgb, iColorMix[0]);\n    vColor = mix(mixColorA.rgb, mixColorB.rgb, t0);\n}\n";
var CurvedPath_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x_1540259130(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l_1540259130(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x_1540259130(color.r);\n    float g = luminance_x_1540259130(color.g);\n    float b = luminance_x_1540259130(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x_1540259130(color.r) * 0.2126;\n    float g = luminance_x_1540259130(color.g) * 0.7152;\n    float b = luminance_x_1540259130(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l_1540259130(tr / 0.2126);\n    float rg = color_l_1540259130(tg / 0.7152);\n    float rb = color_l_1540259130(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n#define ONE_ALPHA 0.00392156862 // 1.0 / 255.0\n\nfloat lineAlpha(vec2 position, float w, vec2 viewportSize, float lineWidth) {\n    vec2 lineCenter = ((position / w) * 0.5 + 0.5) * viewportSize;\n    float distOffset = (lineWidth - 1.0) * 0.5;\n    float dist = smoothstep(lineWidth * 0.5 - 0.5, lineWidth * 0.5 + 0.5, distance(lineCenter, gl_FragCoord.xy));\n    return (1.0 - dist);\n}\n\nvec4 lineColor(vec3 color, vec2 position, float w, vec2 viewportSize, uint mode, float lineWidth) {\n    if (mode < MODE_HIGH_PASS_1) {\n        return outputColor(vec4(color, 1.0));\n    }\n\n    float a = lineAlpha(position, w, viewportSize, lineWidth);\n\n    if (mode == MODE_HIGH_PASS_1) {\n        if (a == 1.0) {\n            return outputColor(vec4(color, a));\n        } else {\n            discard;\n        }\n    }\n\n    // Possible optimization.\n    // Edges run into fill rate issues because too many of them overlap, discarging pixels below a certain alpha\n    // threshold might help speed things up a bit.\n    if (a < ONE_ALPHA) {\n        discard;\n    }\n\n    return outputColor(vec4(color, a));\n}\n\nuniform vec2 uViewportSize;\nuniform uint uRenderMode;\n\nflat in float fLineWidth;\nin vec3 vColor;\nin vec2 vProjectedPosition;\nin float vProjectedW;\n\nout vec4 fragColor;\n\nvoid main() {\n    fragColor = lineColor(vColor, vProjectedPosition, vProjectedW, uViewportSize, uRenderMode, fLineWidth);\n}\n";
var CurvedPath_data_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in uint aSourceIndex;\nlayout(location=1) in uint aTargetIndex;\nlayout(location=2) in uvec3 aControl;\nlayout(location=3) in uint aSourceColor;\nlayout(location=4) in uint aTargetColor;\n\nuniform sampler2D uGraphPoints;\n\nout vec3 vSource;\nout vec3 vTarget;\nout vec3 vControl;\nflat out uint vSourceColor;\nflat out uint vTargetColor;\nout vec2 vColorMix;\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\nvoid main() {\n    vec4 source = valueForIndex(uGraphPoints, int(aSourceIndex));\n    vec4 target = valueForIndex(uGraphPoints, int(aTargetIndex));\n    vec4 control = valueForIndex(uGraphPoints, int(aControl[0]));\n\n    // TODO: Optimize this to avoid branches. (If performance becomes a problem)\n    if (aControl[1] == 0u) {\n        vSource = source.xyz;\n    } else {\n        vSource = (source.xyz + control.xyz) / 2.0;\n    }\n\n    if (aControl[1] == aControl[2] - 1u) {\n        vTarget = target.xyz;\n    } else {\n        vTarget = (target.xyz + control.xyz) / 2.0;\n    }\n\n    vControl = control.xyz;\n\n    vSourceColor = aSourceColor;\n    vTargetColor = aTargetColor;\n\n    vColorMix = vec2(float(aControl[1]) / float(aControl[2]), float(aControl[1] + 1u) / float(aControl[2]));\n}\n";
var kPathEdgeMappings = {
  id: (entry, i) => "id" in entry ? entry.id : i,
  source: (entry) => entry.source,
  target: (entry) => entry.target,
  control: (entry) => entry.control,
  sourceColor: (entry) => "sourceColor" in entry ? entry.sourceColor : 0,
  targetColor: (entry) => "targetColor" in entry ? entry.targetColor : 0
};
var kPathEdgeDataTypes = {
  source: PicoGL.UNSIGNED_INT,
  target: PicoGL.UNSIGNED_INT,
  control: [PicoGL.UNSIGNED_INT, PicoGL.UNSIGNED_INT, PicoGL.UNSIGNED_INT],
  sourceColor: PicoGL.UNSIGNED_INT,
  targetColor: PicoGL.UNSIGNED_INT
};
var kGLPathEdgeTypes = {
  source: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  target: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  control: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  sourceColor: PicoGL.UNSIGNED_INT,
  targetColor: PicoGL.UNSIGNED_INT,
  colorMix: [PicoGL.FLOAT, PicoGL.FLOAT]
};
var CurvedPath = class extends Edges {
  constructor(context, points, data, mappings, pickingManager, segments = 16) {
    super(context, points, data, mappings, pickingManager, segments);
  }
  initialize(context, points, data, mappings, pickingManager, segments) {
    super.initialize(context, points, data, mappings, pickingManager);
    const segmentVertices = [];
    for (let i = 0; i <= segments; ++i) {
      segmentVertices.push(-1, i, 1, i);
    }
    this.verticesVBO = context.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array(segmentVertices));
    this.edgesVAO = context.createVertexArray().vertexAttributeBuffer(0, this.verticesVBO);
    this.configureTargetVAO(this.edgesVAO);
    const shaders = this.getDrawShaders();
    this.program = context.createProgram(shaders.vs, shaders.fs);
    this.drawCall = context.createDrawCall(this.program, this.edgesVAO).primitive(PicoGL.TRIANGLE_STRIP);
    this.compute(context, {
      uGraphPoints: this.dataTexture
    });
    this.localUniforms.uSegments = segments;
  }
  destroy() {
  }
  render(context, mode, uniforms) {
    setDrawCallUniforms(this.drawCall, uniforms);
    setDrawCallUniforms(this.drawCall, this.localUniforms);
    this.configureRenderContext(context, mode);
    switch (mode) {
      case RenderMode.PICKING:
        break;
      default:
        this.drawCall.draw();
        break;
    }
  }
  getDrawShaders() {
    return {
      vs: CurvedPath_vs_default,
      fs: CurvedPath_fs_default
    };
  }
  getPickingShaders() {
    return {
      vs: CurvedPath_vs_default,
      fs: null
    };
  }
  getGLSourceTypes() {
    return kPathEdgeDataTypes;
  }
  getGLTargetTypes() {
    return kGLPathEdgeTypes;
  }
  getDataShader() {
    return {
      vs: CurvedPath_data_vs_default,
      varyings: ["vSource", "vTarget", "vControl", "vSourceColor", "vTargetColor", "vColorMix"]
    };
  }
  computeMappings(mappings) {
    const edgesMappings = Object.assign({}, kPathEdgeMappings, super.computeMappings(mappings));
    edgesMappings.control[kDataMappingFlatten] = (entry, i, l) => {
      return [this.points.getPointIndex(entry.control[i]), i, l];
    };
    edgesMappings.source[kDataMappingFlatten] = (entry, i, l) => {
      if (i === 0) {
        return entry.source;
      }
      return edgesMappings.control[kDataMappingFlatten](entry, i - 1, l)[0];
    };
    edgesMappings.target[kDataMappingFlatten] = (entry, i, l) => {
      if (i === l - 1) {
        return entry.target;
      }
      return edgesMappings.control[kDataMappingFlatten](entry, i + 1, l)[0];
    };
    return edgesMappings;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/edges/bundle/ClusterBundle.js
var ClusterBundle_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in vec3 aVertex;\nlayout(location=1) in vec3 iOffsetA;\nlayout(location=2) in vec3 iOffsetB;\nlayout(location=3) in vec3 iControl;\nlayout(location=4) in uint iColorA;\nlayout(location=5) in uint iColorB;\nlayout(location=6) in vec2 iColorMix;\n\nuniform mat4 uViewMatrix;\nuniform mat4 uSceneMatrix;\nuniform mat4 uProjectionMatrix;\nuniform vec2 uViewportSize;\nuniform float uPixelRatio;\nuniform sampler2D uColorPalette;\n\nuniform float uLineWidth;\nuniform float uSegments;\n\nflat out float fLineWidth;\nout vec3 vColor;\nout vec2 vProjectedPosition;\nout float vProjectedW;\n\nvec4 getColorByIndexFromTexture(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nvec3 bezier(vec3 p0, vec3 p1, vec3 p2, float t) {\n    return p1 + pow(1.0 - t, 2.0) * (p2 - p1) + pow(t, 2.0) * (p0 - p1);\n}\n\nvoid main() {\n    // bezier works fine with 0 > t > 1\n    float t0 = aVertex.y / uSegments;\n    float t1 = (aVertex.y + 1.0) / uSegments;\n\n    // calculate both bezier points\n    vec3 b0 = bezier(iOffsetA, iControl, iOffsetB, t0);\n    vec3 b1 = bezier(iOffsetA, iControl, iOffsetB, t1);\n\n    // project the points to the screen\n    mat4 renderMatrix = uProjectionMatrix * uViewMatrix * uSceneMatrix;\n    vec4 b0Projected = renderMatrix * vec4(b0, 1.0);\n    vec4 b1Projected = renderMatrix * vec4(b1, 1.0);\n\n    // get their screen coords\n    vec2 b0Screen = (b0Projected.xy / b0Projected.w) * uViewportSize * 0.5;\n    vec2 b1Screen = (b1Projected.xy / b1Projected.w) * uViewportSize * 0.5;\n\n    // get the direction and normal of the segment\n    vec2 direction = normalize(b1Screen - b0Screen);\n    vec2 normal = vec2(-direction.y, direction.x);\n\n    // calculate the pixel offset\n    fLineWidth = uLineWidth * uPixelRatio;\n    float offsetWidth = fLineWidth + 0.5;\n    vec4 offset = vec4(((aVertex.x * normal * offsetWidth) / uViewportSize) * b0Projected.w, 0.0, 0.0);\n\n    // set the final vertex position\n    gl_Position = b0Projected + offset;\n    vProjectedPosition = b0Projected.xy;\n    vProjectedW = b0Projected.w;\n\n    // calculate the color\n    vec4 colorA = getColorByIndexFromTexture(uColorPalette, int(iColorA));\n    vec4 colorB = getColorByIndexFromTexture(uColorPalette, int(iColorB));\n    vec3 mixColorA = mix(colorA.rgb, colorB.rgb, iColorMix[1]);\n    vec3 mixColorB = mix(colorA.rgb, colorB.rgb, iColorMix[0]);\n    vColor = mix(mixColorA.rgb, mixColorB.rgb, t0);\n}\n\n";
var ClusterBundle_fs_default = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x_1540259130(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l_1540259130(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x_1540259130(color.r);\n    float g = luminance_x_1540259130(color.g);\n    float b = luminance_x_1540259130(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x_1540259130(color.r) * 0.2126;\n    float g = luminance_x_1540259130(color.g) * 0.7152;\n    float b = luminance_x_1540259130(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l_1540259130(tr / 0.2126);\n    float rg = color_l_1540259130(tg / 0.7152);\n    float rb = color_l_1540259130(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n#define ONE_ALPHA 0.00392156862 // 1.0 / 255.0\n\nfloat lineAlpha(vec2 position, float w, vec2 viewportSize, float lineWidth) {\n    vec2 lineCenter = ((position / w) * 0.5 + 0.5) * viewportSize;\n    float distOffset = (lineWidth - 1.0) * 0.5;\n    float dist = smoothstep(lineWidth * 0.5 - 0.5, lineWidth * 0.5 + 0.5, distance(lineCenter, gl_FragCoord.xy));\n    return (1.0 - dist);\n}\n\nvec4 lineColor(vec3 color, vec2 position, float w, vec2 viewportSize, uint mode, float lineWidth) {\n    if (mode < MODE_HIGH_PASS_1) {\n        return outputColor(vec4(color, 1.0));\n    }\n\n    float a = lineAlpha(position, w, viewportSize, lineWidth);\n\n    if (mode == MODE_HIGH_PASS_1) {\n        if (a == 1.0) {\n            return outputColor(vec4(color, a));\n        } else {\n            discard;\n        }\n    }\n\n    // Possible optimization.\n    // Edges run into fill rate issues because too many of them overlap, discarging pixels below a certain alpha\n    // threshold might help speed things up a bit.\n    if (a < ONE_ALPHA) {\n        discard;\n    }\n\n    return outputColor(vec4(color, a));\n}\n\nuniform vec2 uViewportSize;\nuniform uint uRenderMode;\n\nflat in float fLineWidth;\nin vec3 vColor;\nin vec2 vProjectedPosition;\nin float vProjectedW;\n\nout vec4 fragColor;\n\nvoid main() {\n    fragColor = lineColor(vColor, vProjectedPosition, vProjectedW, uViewportSize, uRenderMode, fLineWidth);\n}\n\n";
var ClusterBundle_data_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in uint aSourceIndex;\nlayout(location=1) in uint aTargetIndex;\nlayout(location=2) in uint aSourceClusterIndex;\nlayout(location=3) in uint aTargetClusterIndex;\nlayout(location=4) in uint aSourceColor;\nlayout(location=5) in uint aTargetColor;\nlayout(location=6) in uint aIndex;\n\nuniform sampler2D uGraphPoints;\n\nout vec3 vSource;\nout vec3 vTarget;\nout vec3 vControl;\nflat out uint vSourceColor;\nflat out uint vTargetColor;\nout vec2 vColorMix;\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\nvoid main() {\n    vec4 source = valueForIndex(uGraphPoints, int(aSourceIndex));\n    vec4 target = valueForIndex(uGraphPoints, int(aTargetIndex));\n    vec4 sourceCluster = valueForIndex(uGraphPoints, int(aSourceClusterIndex));\n    vec4 targetCluster = valueForIndex(uGraphPoints, int(aTargetClusterIndex));\n\n    vec3 direction = normalize(vec3(targetCluster.xy, 0.0) - vec3(sourceCluster.xy, 0.0));\n    vec3 sourceClusterEdge = sourceCluster.xyz + direction * sourceCluster[3];\n    vec3 targetClusterEdge = targetCluster.xyz - direction * targetCluster[3];\n\n    float edgeToEdge = length(targetClusterEdge - sourceClusterEdge);\n    vec3 bundlePoint = sourceClusterEdge + direction * (edgeToEdge * 0.5);\n\n    vec3 sourceEdgeToNode = sourceClusterEdge - source.xyz - direction * source[3];\n    float sourceNodeAdjacent = dot(normalize(sourceEdgeToNode), direction) * length(sourceEdgeToNode);\n    vec3 sourceClusterControl = sourceClusterEdge - direction * min(sourceNodeAdjacent * 0.75, sourceCluster[3]);\n    vec3 sourceControlDirection = normalize(sourceClusterControl - source.xyz);\n    vec3 sourcePoint = source.xyz + sourceControlDirection * source[3];\n\n    vec3 targetEdgeToNode = target.xyz - targetClusterEdge - direction * target[3];\n    float targetNodeAdjacent = dot(normalize(targetEdgeToNode), direction) * length(targetEdgeToNode);\n    vec3 targetClusterControl = targetClusterEdge + direction * min(targetNodeAdjacent * 0.75, targetCluster[3]);\n    vec3 targetControlDirection = normalize(targetClusterControl - target.xyz);\n    vec3 targetPoint = target.xyz + targetControlDirection * target[3];\n\n    // TODO: Optimize this to avoid branches. (If performance becomes a problem)\n    if (aIndex == 0u) {\n        if (aSourceIndex == aSourceClusterIndex) {\n            vSource = sourcePoint;\n            vControl = sourcePoint;\n            vTarget = sourcePoint;\n        } else {\n            vSource = sourcePoint;\n            vControl = sourceClusterControl;\n            vTarget = (sourceClusterControl + bundlePoint) / 2.0;\n        }\n    } else if (aIndex == 1u) {\n        if (aSourceIndex == aSourceClusterIndex) {\n            vSource = sourcePoint;\n        } else {\n            vSource = (sourceClusterControl + bundlePoint) / 2.0;\n        }\n\n        vControl = bundlePoint;\n\n        if (aTargetIndex == aTargetClusterIndex) {\n            vTarget = targetPoint;\n        } else {\n            vTarget = (bundlePoint + targetClusterControl) / 2.0;\n        }\n    } else {\n        if (aTargetIndex == aTargetClusterIndex) {\n            vSource = targetPoint;\n            vControl = targetPoint;\n            vTarget = targetPoint;\n        } else {\n            vSource = (bundlePoint + targetClusterControl) / 2.0;\n            vControl = targetClusterControl;\n            vTarget = targetPoint;\n        }\n    }\n\n    vSourceColor = aSourceColor;\n    vTargetColor = aTargetColor;\n\n    vColorMix = vec2(float(aIndex) * 0.25, float(aIndex + 1u) * 0.25);\n}\n";
var kClusterBundleEdgeMappings = {
  id: (entry, i) => "id" in entry ? entry.id : i,
  source: (entry) => entry.source,
  target: (entry) => entry.target,
  sourceCluster: (entry) => entry.sourceCluster,
  targetCluster: (entry) => entry.targetCluster,
  sourceColor: (entry) => "sourceColor" in entry ? entry.sourceColor : 0,
  targetColor: (entry) => "targetColor" in entry ? entry.targetColor : 0,
  index: () => [0, 1, 2]
};
var kClusterBundleEdgeDataTypes = {
  source: PicoGL.UNSIGNED_INT,
  target: PicoGL.UNSIGNED_INT,
  sourceCluster: PicoGL.UNSIGNED_INT,
  targetCluster: PicoGL.UNSIGNED_INT,
  sourceColor: PicoGL.UNSIGNED_INT,
  targetColor: PicoGL.UNSIGNED_INT,
  index: PicoGL.UNSIGNED_INT
};
var kGLClusterBundleEdgeTypes = {
  source: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  target: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  control: [PicoGL.FLOAT, PicoGL.FLOAT, PicoGL.FLOAT],
  sourceColor: PicoGL.UNSIGNED_INT,
  targetColor: PicoGL.UNSIGNED_INT,
  colorMix: [PicoGL.FLOAT, PicoGL.FLOAT]
};
var ClusterBundle = class extends Edges {
  constructor(context, points, data, mappings, pickingManager, segments = 16) {
    super(context, points, data, mappings, pickingManager, segments);
  }
  initialize(context, points, data, mappings, pickingManager, segments) {
    super.initialize(context, points, data, mappings, pickingManager);
    const segmentVertices = [];
    for (let i = 0; i <= segments; ++i) {
      segmentVertices.push(-1, i, 1, i);
    }
    this.verticesVBO = context.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array(segmentVertices));
    this.edgesVAO = context.createVertexArray().vertexAttributeBuffer(0, this.verticesVBO);
    this.configureTargetVAO(this.edgesVAO);
    const shaders = this.getDrawShaders();
    this.program = context.createProgram(shaders.vs, shaders.fs);
    this.drawCall = context.createDrawCall(this.program, this.edgesVAO).primitive(PicoGL.TRIANGLE_STRIP);
    this.compute(context, {
      uGraphPoints: this.dataTexture
    });
    this.localUniforms.uSegments = segments;
  }
  destroy() {
  }
  render(context, mode, uniforms) {
    setDrawCallUniforms(this.drawCall, uniforms);
    setDrawCallUniforms(this.drawCall, this.localUniforms);
    this.configureRenderContext(context, mode);
    switch (mode) {
      case RenderMode.PICKING:
        break;
      default:
        this.drawCall.draw();
        break;
    }
  }
  getDrawShaders() {
    return {
      vs: ClusterBundle_vs_default,
      fs: ClusterBundle_fs_default
    };
  }
  getPickingShaders() {
    return {
      vs: ClusterBundle_vs_default,
      fs: null
    };
  }
  getGLSourceTypes() {
    return kClusterBundleEdgeDataTypes;
  }
  getGLTargetTypes() {
    return kGLClusterBundleEdgeTypes;
  }
  getDataShader() {
    return {
      vs: ClusterBundle_data_vs_default,
      varyings: ["vSource", "vTarget", "vControl", "vSourceColor", "vTargetColor", "vColorMix"]
    };
  }
  computeMappings(mappings) {
    const edgesMappings = Object.assign({}, kClusterBundleEdgeMappings, super.computeMappings(mappings));
    const sourceClusterMapping = edgesMappings.sourceCluster;
    edgesMappings.sourceCluster = (entry, i) => {
      return this.points.getPointIndex(sourceClusterMapping(entry, i));
    };
    const targetClusterMapping = edgesMappings.targetCluster;
    edgesMappings.targetCluster = (entry, i) => {
      return this.points.getPointIndex(targetClusterMapping(entry, i));
    };
    return edgesMappings;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/edges/mod.js
var types2 = {
  Straight,
  Dashed,
  Gravity,
  CurvedPath,
  ClusterBundle
};

// node_modules/@uncharted.software/grafer/build/lib/graph/labels/mod.js
var mod_exports3 = {};
__export(mod_exports3, {
  CircularLabel: () => CircularLabel,
  CircularLabelPlacement: () => CircularLabelPlacement,
  LabelAtlas: () => LabelAtlas,
  PointLabel: () => PointLabel,
  PointLabelPlacement: () => PointLabelPlacement,
  RingLabel: () => RingLabel,
  kCharBoxDataMappings: () => kCharBoxDataMappings,
  kCharBoxDataTypes: () => kCharBoxDataTypes,
  kGLLabelNodeTypes: () => kGLLabelNodeTypes,
  kLabelDataTypes: () => kLabelDataTypes,
  kLabelMappings: () => kLabelMappings,
  kLabelNodeDataTypes: () => kLabelNodeDataTypes,
  kLabelNodeMappings: () => kLabelNodeMappings,
  types: () => types3
});

// node_modules/potpack/index.mjs
function potpack(boxes) {
  let area = 0;
  let maxWidth = 0;
  for (const box of boxes) {
    area += box.w * box.h;
    maxWidth = Math.max(maxWidth, box.w);
  }
  boxes.sort((a, b) => b.h - a.h);
  const startWidth = Math.max(Math.ceil(Math.sqrt(area / 0.95)), maxWidth);
  const spaces = [{x: 0, y: 0, w: startWidth, h: Infinity}];
  let width = 0;
  let height = 0;
  for (const box of boxes) {
    for (let i = spaces.length - 1; i >= 0; i--) {
      const space = spaces[i];
      if (box.w > space.w || box.h > space.h)
        continue;
      box.x = space.x;
      box.y = space.y;
      height = Math.max(height, box.y + box.h);
      width = Math.max(width, box.x + box.w);
      if (box.w === space.w && box.h === space.h) {
        const last = spaces.pop();
        if (i < spaces.length)
          spaces[i] = last;
      } else if (box.h === space.h) {
        space.x += box.w;
        space.w -= box.w;
      } else if (box.w === space.w) {
        space.y += box.h;
        space.h -= box.h;
      } else {
        spaces.push({
          x: space.x + box.w,
          y: space.y,
          w: space.w - box.w,
          h: box.h
        });
        space.y += box.h;
        space.h -= box.h;
      }
      break;
    }
  }
  return {
    w: width,
    h: height,
    fill: area / (width * height) || 0
  };
}

// node_modules/@uncharted.software/grafer/build/lib/graph/labels/LabelAtlas.js
var LabelAtlas_test_vs_default = "#version 300 es\n\nprecision lowp usampler2D;\n#define GLSLIFY 1\n\nlayout(location=0) in uint aIndex;\n\nuniform usampler2D uDataTexture;\n\nflat out vec4 vBox;\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\nvoid main() {\n    vec2 texSize = vec2(textureSize(uDataTexture, 0));\n    vec4 box = vec4(uvalueForIndex(uDataTexture, int(aIndex)));\n    vBox = vec4(\n        box[0] / texSize.x,\n        box[1] / texSize.y,\n        box[2] / texSize.x,\n        box[3] / texSize.y\n    );\n}\n";
var noop_fs_default3 = "#version 300 es\n#define GLSLIFY 1\nvoid main() {}\n";
var kImageMargin = 12;
var INF = 1e20;
var kLabelMappings = {
  id: (entry, i) => "id" in entry ? entry.id : i,
  label: (entry, i) => "label" in entry ? entry.label : `${i}`,
  fontSize: (entry) => "fontSize" in entry ? entry.fontSize : 18,
  padding: (entry) => "padding" in entry ? entry.padding : [8, 5]
};
var kCharBoxDataMappings = {
  box: (entry) => [entry.x + kImageMargin, entry.y + kImageMargin, entry.w - kImageMargin * 2, entry.h - kImageMargin * 2]
};
var kCharBoxDataTypes = {
  box: [picogl_default.UNSIGNED_SHORT, picogl_default.UNSIGNED_SHORT, picogl_default.UNSIGNED_SHORT, picogl_default.UNSIGNED_SHORT]
};
var kLabelDataTypes = {
  char: picogl_default.UNSIGNED_SHORT
};
var LabelAtlas = class {
  constructor(context, data, mappings) {
    this.fontSizeStep = 25;
    this.spaceSizeMap = new Map();
    this.labelPixelRatio = window.devicePixelRatio;
    this.characterMap = new Map();
    this.labelMap = new Map();
    if (data.length) {
      this.processData(context, data, Object.assign({}, kLabelMappings, mappings));
    } else {
      this._boxesTexture = context.createTexture2D(1, 1);
      this._labelsTexture = context.createTexture2D(1, 1);
      this._charactersTexture = context.createTexture2D(1, 1);
    }
  }
  get boxesTexture() {
    return this._boxesTexture;
  }
  get labelsTexture() {
    return this._labelsTexture;
  }
  get charactersTexture() {
    return this._charactersTexture;
  }
  processData(context, data, mappings) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("style", "font-smooth: never;-webkit-font-smoothing : none;");
    const ctx = canvas.getContext("2d");
    const boxMap = new Map();
    const boxes = [];
    const labels = [];
    for (const [, entry] of dataIterator(data, mappings)) {
      if (typeof entry.label === "string") {
        const renderSize = Math.max(entry.fontSize, Math.floor(entry.fontSize / this.fontSizeStep) * this.fontSizeStep);
        const renderScale = entry.fontSize / renderSize;
        const labelInfo = {
          index: labels.length,
          length: entry.label.length,
          width: 0,
          height: 0
        };
        this.labelMap.set(entry.id, labelInfo);
        for (let i = 0, n = entry.label.length; i < n; ++i) {
          const char = entry.label.charAt(i);
          const charKey = `${char}-${renderSize}`;
          if (!this.characterMap.has(charKey)) {
            const image = this.computeDistanceField(this.renderCharTexture(char, renderSize, ctx, canvas), renderSize);
            const box2 = {id: charKey, w: image.width, h: image.height, image};
            boxMap.set(charKey, box2);
            boxes.push(box2);
            this.characterMap.set(charKey, 0);
          }
          const box = boxMap.get(charKey);
          labelInfo.width += (box.image.width - kImageMargin * 2) * renderScale;
          labelInfo.height = Math.max(labelInfo.height, (box.image.height - kImageMargin * 2) * renderScale);
          labels.push(charKey);
        }
      }
    }
    const pack = potpack(boxes);
    const finalImage = ctx.createImageData(pack.w, pack.h);
    const boxesBuffer = packData(boxes, kCharBoxDataMappings, kCharBoxDataTypes, true, (i) => {
      const box = boxes[i];
      this.characterMap.set(box.id, i);
      this.blitImageData(box.image, finalImage, box.x, finalImage.height - box.y - box.h);
    });
    this._charactersTexture = context.createTexture2D(finalImage, {
      flipY: true
    });
    this._boxesTexture = this.createTextureForBuffer(context, new Uint16Array(boxesBuffer), boxes.length, picogl_default.RGBA16UI);
    const labelDataMappings = {
      char: (entry) => this.characterMap.get(entry)
    };
    const labelBuffer = packData(labels, labelDataMappings, kLabelDataTypes, true);
    this._labelsTexture = this.createTextureForBuffer(context, new Uint16Array(labelBuffer), labels.length, picogl_default.R16UI);
  }
  createTextureForBuffer(context, data, dataLength, format) {
    const textureWidth = Math.pow(2, Math.ceil(Math.log2(Math.ceil(Math.sqrt(dataLength)))));
    const textureHeight = Math.pow(2, Math.ceil(Math.log2(Math.ceil(dataLength / textureWidth))));
    const texture = context.createTexture2D(textureWidth, textureHeight, {
      internalFormat: format
    });
    texture.data(data);
    return texture;
  }
  renderCharTexture(char, size, context, canvas) {
    const pixelRatio = this.labelPixelRatio;
    if (!this.spaceSizeMap.has(size)) {
      context.font = `${size * pixelRatio}px monospace`;
      context.imageSmoothingEnabled = false;
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      const spaceMetrics = context.measureText(" ");
      this.spaceSizeMap.set(size, Math.abs(spaceMetrics.actualBoundingBoxLeft) + Math.abs(spaceMetrics.actualBoundingBoxRight));
    }
    const textWidth = this.spaceSizeMap.get(size);
    const textHeight = size * pixelRatio;
    const textPadding = Math.min(textWidth, textHeight) * 0.15;
    canvas.width = textWidth + textPadding + kImageMargin * 2;
    canvas.height = size * pixelRatio + textPadding + kImageMargin * 2;
    context.font = `${size * pixelRatio}px monospace`;
    context.imageSmoothingEnabled = false;
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(char, canvas.width * 0.5, canvas.height * 0.5);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  }
  blitImageData(src, dst, x, y) {
    for (let yy = 0; yy < src.height; ++yy) {
      const srcStart = src.width * yy * 4;
      const srcEnd = srcStart + src.width * 4;
      const dstOff = dst.width * (yy + y) * 4 + x * 4;
      dst.data.set(src.data.subarray(srcStart, srcEnd), dstOff);
    }
  }
  computeDistanceField(imageData, fontSize) {
    const dataLength = imageData.width * imageData.height;
    const maxDimension = Math.max(imageData.width, imageData.height);
    const gridOuter = new Float64Array(dataLength);
    const gridInner = new Float64Array(dataLength);
    const f = new Float64Array(maxDimension);
    const z = new Float64Array(maxDimension + 1);
    const v = new Uint16Array(maxDimension);
    gridOuter.fill(INF, 0, dataLength);
    gridInner.fill(0, 0, dataLength);
    for (let i = 0; i < dataLength; ++i) {
      const a = imageData.data[i * 4 + 3] / 255;
      gridOuter[i] = a === 1 ? 0 : a === 0 ? INF : Math.pow(Math.max(0, 0.5 - a), 2);
      gridInner[i] = a === 1 ? INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
    }
    this.edt(gridOuter, imageData.width, imageData.height, f, v, z);
    this.edt(gridInner, imageData.width, imageData.height, f, v, z);
    const radius = fontSize / 8;
    const data = imageData.data;
    for (let i = 0; i < dataLength; ++i) {
      const d = Math.sqrt(gridOuter[i]) - Math.sqrt(gridInner[i]);
      const p = i * 4;
      const a = Math.round(255 - 255 * (d / radius + 0.5));
      data[p] = 255;
      data[p + 1] = 255;
      data[p + 2] = 255;
      data[p + 3] = a;
    }
    return imageData;
  }
  edt(data, width, height, f, v, z) {
    for (let x = 0; x < width; ++x) {
      this.edt1d(data, x, width, height, f, v, z);
    }
    for (let y = 0; y < height; ++y) {
      this.edt1d(data, y * width, 1, width, f, v, z);
    }
  }
  edt1d(grid, offset, stride, length5, f, v, z) {
    let q, k, s, r;
    v[0] = 0;
    z[0] = -INF;
    z[1] = INF;
    for (q = 0; q < length5; ++q) {
      f[q] = grid[offset + q * stride];
    }
    for (q = 1, k = 0, s = 0; q < length5; ++q) {
      do {
        r = v[k];
        s = (f[q] - f[r] + q * q - r * r) / (q - r) / 2;
      } while (s <= z[k] && --k > -1);
      ++k;
      v[k] = q;
      z[k] = s;
      z[k + 1] = INF;
    }
    for (q = 0, k = 0; q < length5; ++q) {
      while (z[k + 1] < q) {
        ++k;
      }
      r = v[k];
      grid[offset + q * stride] = f[r] + (q - r) * (q - r);
    }
  }
  testFeedback(context) {
    const program = context.createProgram(LabelAtlas_test_vs_default, noop_fs_default3, {transformFeedbackVaryings: ["vBox"], transformFeedbackMode: picogl_default.INTERLEAVED_ATTRIBS});
    const pointsTarget = context.createVertexBuffer(picogl_default.FLOAT, 4, 40);
    const pointsIndices = context.createVertexBuffer(picogl_default.UNSIGNED_BYTE, 1, new Uint8Array([
      0,
      1,
      2,
      3,
      4,
      5
    ]));
    const transformFeedback = context.createTransformFeedback().feedbackBuffer(0, pointsTarget);
    const vertexArray = context.createVertexArray().vertexAttributeBuffer(0, pointsIndices);
    const drawCall = context.createDrawCall(program, vertexArray).transformFeedback(transformFeedback);
    drawCall.primitive(picogl_default.POINTS);
    drawCall.texture("uDataTexture", this._boxesTexture);
    context.enable(picogl_default.RASTERIZER_DISCARD);
    drawCall.draw();
    context.disable(picogl_default.RASTERIZER_DISCARD);
    printDataGL(context, pointsTarget, 6, {
      box: [picogl_default.FLOAT, picogl_default.FLOAT, picogl_default.FLOAT, picogl_default.FLOAT]
    });
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/labels/point/PointLabel.js
var PointLabel_fs_default = "#version 300 es\nprecision highp float;\nprecision lowp usampler2D;\n#define GLSLIFY 1\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\nuniform usampler2D uLabelIndices;\nuniform usampler2D uCharBoxes;\nuniform sampler2D uCharTexture;\nuniform float uPixelRatio;\nuniform uint uRenderMode;\nuniform float uPadding;\n\nflat in vec4 fBackgroundColor;\nflat in vec4 fTextColor;\nflat in vec4 fLabelInfo;\nflat in float fPixelLength;\nflat in vec2 fCharTextureSize;\nin vec2 vFromCenter;\nin vec2 vStringCoords;\nin vec2 vPixelCoords;\n\nout vec4 fragColor;\n\nvoid main() {\n    float padding = uPadding * uPixelRatio;\n    vec4 finalColor;\n\n    if (vPixelCoords.x < padding || vPixelCoords.y < padding || vPixelCoords.x > fLabelInfo[2] + padding || vPixelCoords.y > fLabelInfo[3] + padding) {\n        finalColor = fBackgroundColor;\n    } else {\n        vec2 uvMultiplier = (vPixelCoords - padding) / fLabelInfo.ba;\n        float u = fLabelInfo[0] + fLabelInfo[1] * uvMultiplier.x;\n        float v = uvMultiplier.y;\n\n        float stringIndex = floor(u);\n        int charIndex = int(uivalueForIndex(uLabelIndices, int(stringIndex)));\n        vec4 charBox = vec4(uvalueForIndex(uCharBoxes, charIndex));\n        float charMult = u - stringIndex;\n\n        vec4 charBoxUV = charBox / vec4(fCharTextureSize, fCharTextureSize);\n\n        vec2 uv = vec2(charBoxUV[0] + charBoxUV[2] * charMult, charBoxUV[1] + charBoxUV[3] * v);\n        vec4 texPixel = texture(uCharTexture, uv);\n\n        float smoothing = 7.0 / fLabelInfo[3];\n        float distance = texPixel.a;\n        float textEdge = smoothstep(0.5 - smoothing, 0.5 + smoothing, distance);\n        finalColor = mix(fBackgroundColor, fTextColor, textEdge);\n    }\n\n    float threshold = uRenderMode == MODE_HIGH_PASS_1 ? 0.75 : 0.5;\n\n    if (uRenderMode != MODE_HIGH_PASS_2) {\n        if (finalColor.a < threshold) {\n            discard;\n        }\n        fragColor = outputColor(vec4(finalColor.rgb, 1.0));\n    } else {\n        if (finalColor.a == 1.0) {\n            discard;\n        }\n        fragColor = outputColor(finalColor);\n    }\n\n//    if ((uRenderMode != MODE_HIGH_PASS_2 && texPixel.a < threshold) || (uRenderMode == MODE_HIGH_PASS_2 && texPixel.a == 1.0)) {\n//        discard;\n//    }\n//    float alpha = uRenderMode == MODE_HIGH_PASS_2 ? texPixel.a : 1.0;\n//    fragColor = vec4(texPixel.rgb * fColor.rgb, alpha);\n}\n";
var PointLabel_vs_default = `#version 300 es

precision lowp usampler2D;
#define GLSLIFY 1

layout(location=0) in vec3 aVertex;
layout(location=1) in vec3 iPosition;
layout(location=2) in float iRadius;
layout(location=3) in uint iColor;
layout(location=4) in uvec4 iLabel;

//layout(std140) uniform RenderUniforms {
    uniform mat4 uViewMatrix;
    uniform mat4 uSceneMatrix;
    uniform mat4 uProjectionMatrix;
    uniform vec2 uViewportSize;
    uniform float uPixelRatio;
    uniform sampler2D uColorPalette;
//};
uniform usampler2D uLabelIndices;
uniform usampler2D uCharBoxes;
uniform sampler2D uCharTexture;
uniform float uVisibilityThreshold;
uniform vec2 uLabelPlacement;
uniform bool uBackground;
uniform float uPadding;

flat out vec4 fBackgroundColor;
flat out vec4 fTextColor;
flat out vec4 fLabelInfo;
flat out float fPixelLength;
flat out vec2 fCharTextureSize;
out vec2 vFromCenter;
out vec2 vStringCoords;
out vec2 vPixelCoords;

vec4 valueForIndex(sampler2D tex, int index) {
    int texWidth = textureSize(tex, 0).x;
    int col = index % texWidth;
    int row = index / texWidth;
    return texelFetch(tex, ivec2(col, row), 0);
}

uvec4 uvalueForIndex(usampler2D tex, int index) {
    int texWidth = textureSize(tex, 0).x;
    int col = index % texWidth;
    int row = index / texWidth;
    return texelFetch(tex, ivec2(col, row), 0);
}

uint uivalueForIndex(usampler2D tex, int index) {
    int texWidth = textureSize(tex, 0).x;
    int col = index % texWidth;
    int row = index / texWidth;
    return texelFetch(tex, ivec2(col, row), 0)[0];
}

// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
float luminance_x(float x) {
    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);
}
float color_l(float l) {
    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));
}

// from https://en.wikipedia.org/wiki/Relative_luminance
float rgb2luminance(vec3 color) {
    // relative luminance
    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    float r = luminance_x(color.r);
    float g = luminance_x(color.g);
    float b = luminance_x(color.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

vec3 setLuminance(vec3 color, float luminance) {
    float r = luminance_x(color.r) * 0.2126;
    float g = luminance_x(color.g) * 0.7152;
    float b = luminance_x(color.b) * 0.0722;
    float colorLuminance = r + g + b;

    float tr = luminance * (r / colorLuminance);
    float tg = luminance * (g / colorLuminance);
    float tb = luminance * (b / colorLuminance);

    float rr = color_l(tr / 0.2126);
    float rg = color_l(tg / 0.7152);
    float rb = color_l(tb / 0.0722);

    return vec3(rr, rg, rb );
}

// https://www.w3.org/TR/WCAG20/#contrast-ratiodef
// (L1 + 0.05) / (L2 + 0.05), where
// - L1 is the relative luminance of the lighter of the colors, and
// - L2 is the relative luminance of the darker of the colors.
float findDarker(float luminance, float contrast) {
    return (contrast * luminance) + (0.05 * contrast) - 0.05;
}
float findLighter(float luminance, float contrast) {
    return (luminance + 0.05 - (0.05 * contrast)) / contrast;
}

vec3 contrastingColor(vec3 color, float contrast) {
    float luminance = rgb2luminance(color);
    float darker = findDarker(luminance, contrast);
    float lighter = findLighter(luminance, contrast);

    float targetLuminance;
    if (darker < 0.0 || darker > 1.0) {
        targetLuminance = lighter;
    } else if (lighter < 0.0 || lighter > 1.0) {
        targetLuminance = darker;
    } else {
        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;
    }

    return setLuminance(color, targetLuminance);
}

vec3 desaturateColor(vec3 color, float amount) {
    float l = rgb2luminance(color);
    vec3 gray = vec3(l, l, l);
    return mix(color, gray, amount);
}

void main() {
    // claculate the offset matrix, done as a matrix to be able to compute "billboard" vertices in the shader
    mat4 offsetMatrix = mat4(1.0);
    offsetMatrix[3] = vec4(iPosition, 1.0);

    // reset the rotation of the model-view matrix
    mat4 modelMatrix = uViewMatrix * uSceneMatrix * offsetMatrix;
    mat4 lookAtMatrix = mat4(modelMatrix);
    lookAtMatrix[0] = vec4(1.0, 0.0, 0.0, lookAtMatrix[0][3]);
    lookAtMatrix[1] = vec4(0.0, 1.0, 0.0, lookAtMatrix[1][3]);
    lookAtMatrix[2] = vec4(0.0, 0.0, 1.0, lookAtMatrix[2][3]);

    // the on-screen center of this point
    vec4 quadCenter = uProjectionMatrix * lookAtMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    vec2 screenQuadCenter = quadCenter.xy / quadCenter.w;

    // the on-screen position of a side of this quad
    vec4 quadSide = uProjectionMatrix * lookAtMatrix * vec4(iRadius, 0.0, 0.0, 1.0);
    vec2 screenQuadSide = quadSide.xy / quadSide.w;

    // compute the pixel radius of this point for a size of 1 in world coordinates
    float pixelRadius = length((screenQuadSide - screenQuadCenter) * uViewportSize * 0.5);

    // send the size of the char texture to the fragment shader
    fCharTextureSize = vec2(textureSize(uCharTexture, 0));

    // send the render color to the fragment shader
    vec4 color = valueForIndex(uColorPalette, int(iColor));
    if (uBackground) {
        fBackgroundColor = vec4(color.rgb, 1.0);
        fTextColor = vec4(contrastingColor(color.rgb, 7.0), 1.0);
    } else {
        fBackgroundColor = vec4(color.rgb, 0.0);
        fTextColor = vec4(color.rgb, 1.0);
    }

    // send the normalized length of a single pixel to the fragment shader
    fPixelLength = 1.0 / max(1.0, pixelRadius);

    // send the normalized distance from the center to the fragment shader
    vFromCenter = aVertex.xy;

    // send the label size to the fragment shader
    fLabelInfo = vec4(iLabel);

    // compute the visibility multiplier
    float visibilityThreshold = uVisibilityThreshold * uPixelRatio;
    vec3 visibilityMultiplier = vec3(
        smoothstep(visibilityThreshold * 0.5, visibilityThreshold * 0.6, pixelRadius),
        smoothstep(visibilityThreshold * 0.5, visibilityThreshold * 0.525, pixelRadius),
        1.0
    );
//    float visibilityMultiplier = pixelRadius >= uVisibilityThreshold * 0.5 * uPixelRatio ? 1.0 : 0.0;

    // calculate the size of a pixel in worls coordinates with repsect to the point's position
    float pixelToWorld = iRadius / pixelRadius;

    // calculate the with and height of the label
    float padding = uPadding * uPixelRatio;
    vec3 labelSize = vec3((fLabelInfo[2] + padding * 2.0) * pixelToWorld, (fLabelInfo[3] + padding * 2.0) * pixelToWorld, 0.0);

    // compute the UV multiplier based on the vertices of the quad
    vec2 pixelMultiplier = vec2((aVertex.xy + 1.0) / 2.0);
    // send the pixel coords to the fragment shader
    vPixelCoords = vec2(fLabelInfo[2] + padding * 2.0, fLabelInfo[3] + padding * 2.0) * pixelMultiplier;

    // calculate the render matrix
    mat4 renderMatrix = uProjectionMatrix * lookAtMatrix;

    // claculate the label offset
    float labelMargin = 5.0 * pixelToWorld; // pixels
    vec3 labelOffset = vec3(
        (iRadius + labelSize.x * 0.5 + labelMargin) * uLabelPlacement.x,
        (iRadius + labelSize.y * 0.5 + labelMargin) * uLabelPlacement.y,
        0.01
    );

    // compute the vertex position and its screen position
    vec4 worldVertex = renderMatrix * vec4(aVertex * labelSize * 0.5 * visibilityMultiplier + labelOffset, 1.0);

    // set the render vertex location
    gl_Position = worldVertex;
}
`;
var PointLabel_data_vs_default = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location=0) in uint aPositionIndex;\nlayout(location=1) in uint aColor;\nlayout(location=2) in uvec4 aLabel;\n\nuniform sampler2D uGraphPoints;\n\nout vec3 vPosition;\nout float vRadius;\nflat out uint vColor;\nflat out uvec4 vLabel;\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\nvoid main() {\n    vec4 value = valueForIndex(uGraphPoints, int(aPositionIndex));\n    vPosition = value.xyz;\n    vRadius = value.w;\n    vColor = aColor;\n    vLabel = aLabel;\n}\n";
var kLabelNodeMappings = Object.assign({}, kLabelMappings, {
  point: (entry, i) => "point" in entry ? entry.point : i,
  color: (entry) => "color" in entry ? entry.color : 0
});
var kLabelNodeDataTypes = {
  point: picogl_default.UNSIGNED_INT,
  color: picogl_default.UNSIGNED_INT,
  label: [picogl_default.UNSIGNED_INT, picogl_default.UNSIGNED_INT, picogl_default.UNSIGNED_INT, picogl_default.UNSIGNED_INT]
};
var kGLLabelNodeTypes = {
  position: [picogl_default.FLOAT, picogl_default.FLOAT, picogl_default.FLOAT],
  radius: picogl_default.FLOAT,
  color: picogl_default.UNSIGNED_INT,
  label: [picogl_default.UNSIGNED_INT, picogl_default.UNSIGNED_INT, picogl_default.UNSIGNED_INT, picogl_default.UNSIGNED_INT]
};
var PointLabelPlacement;
(function(PointLabelPlacement2) {
  PointLabelPlacement2[PointLabelPlacement2["CENTER"] = 0] = "CENTER";
  PointLabelPlacement2[PointLabelPlacement2["TOP"] = 1] = "TOP";
  PointLabelPlacement2[PointLabelPlacement2["BOTTOM"] = 2] = "BOTTOM";
  PointLabelPlacement2[PointLabelPlacement2["LEFT"] = 3] = "LEFT";
  PointLabelPlacement2[PointLabelPlacement2["RIGHT"] = 4] = "RIGHT";
})(PointLabelPlacement || (PointLabelPlacement = {}));
var PointLabel = class extends Nodes {
  constructor(...args) {
    super(...args);
    this._labelPlacement = 0;
  }
  get labelPlacement() {
    return this._labelPlacement;
  }
  set labelPlacement(value) {
    this._labelPlacement = value;
    switch (this._labelPlacement) {
      case 0:
        this.localUniforms.uLabelPlacement = [0, 0];
        break;
      case 2:
        this.localUniforms.uLabelPlacement = [0, -1];
        break;
      case 1:
        this.localUniforms.uLabelPlacement = [0, 1];
        break;
      case 3:
        this.localUniforms.uLabelPlacement = [-1, 0];
        break;
      case 4:
        this.localUniforms.uLabelPlacement = [1, 0];
        break;
    }
  }
  get renderBackground() {
    return this.localUniforms.uBackground;
  }
  set renderBackground(value) {
    this.localUniforms.uBackground = value;
  }
  get visibilityThreshold() {
    return this.localUniforms.uVisibilityThreshold;
  }
  set visibilityThreshold(value) {
    this.localUniforms.uVisibilityThreshold = value;
  }
  get padding() {
    return this.localUniforms.uPadding;
  }
  set padding(value) {
    this.localUniforms.uPadding = value;
  }
  initialize(context, points, data, mappings, pickingManager, labelAtlas) {
    if (labelAtlas) {
      this.labelAtlas = labelAtlas;
    } else {
      this.labelAtlas = new LabelAtlas(context, data, mappings);
    }
    super.initialize(context, points, data, mappings, pickingManager);
    this.verticesVBO = context.createVertexBuffer(picogl_default.FLOAT, 2, new Float32Array([
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1
    ]));
    this.nodesVAO = context.createVertexArray().vertexAttributeBuffer(0, this.verticesVBO);
    this.configureTargetVAO(this.nodesVAO);
    const shaders = this.getDrawShaders();
    this.program = context.createProgram(shaders.vs, shaders.fs);
    this.drawCall = context.createDrawCall(this.program, this.nodesVAO).primitive(picogl_default.TRIANGLE_STRIP);
    this.compute(context, {
      uGraphPoints: this.dataTexture
    });
    this.localUniforms.uBackground = false;
    this.localUniforms.uLabelIndices = this.labelAtlas.labelsTexture;
    this.localUniforms.uCharBoxes = this.labelAtlas.boxesTexture;
    this.localUniforms.uCharTexture = this.labelAtlas.charactersTexture;
    this.localUniforms.uVisibilityThreshold = 15;
    this.localUniforms.uLabelPlacement = [0, 0];
    this.localUniforms.uPadding = 4;
  }
  destroy() {
  }
  render(context, mode, uniforms) {
    this.configureRenderContext(context, mode);
    switch (mode) {
      case RenderMode.DRAFT:
      case RenderMode.MEDIUM:
      case RenderMode.HIGH_PASS_1:
        setDrawCallUniforms(this.drawCall, uniforms);
        setDrawCallUniforms(this.drawCall, this.localUniforms);
        this.drawCall.draw();
        break;
      case RenderMode.HIGH_PASS_2:
        setDrawCallUniforms(this.drawCall, uniforms);
        setDrawCallUniforms(this.drawCall, this.localUniforms);
        this.drawCall.draw();
        break;
      default:
        break;
    }
  }
  getDrawShaders() {
    return {
      vs: PointLabel_vs_default,
      fs: PointLabel_fs_default
    };
  }
  getGLSourceTypes() {
    return kLabelNodeDataTypes;
  }
  getGLTargetTypes() {
    return kGLLabelNodeTypes;
  }
  getDataShader() {
    return {
      vs: PointLabel_data_vs_default,
      varyings: ["vPosition", "vRadius", "vColor", "vLabel"]
    };
  }
  computeMappings(mappings) {
    const dataMappings = Object.assign({}, kLabelNodeMappings, super.computeMappings(mappings));
    const idMapping = dataMappings.id;
    dataMappings.label = (entry, i) => {
      const labelInfo = this.labelAtlas.labelMap.get(idMapping(entry, i));
      return [
        labelInfo.index,
        labelInfo.length,
        labelInfo.width,
        labelInfo.height
      ];
    };
    return dataMappings;
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/labels/circular/CircularLabel.js
var CircularLabel_vs_default = `#version 300 es

precision lowp usampler2D;
#define GLSLIFY 1

#define M_PI 3.14159265359
#define M_2PI 6.28318530718

layout(location=0) in vec3 aVertex;
layout(location=1) in vec3 iPosition;
layout(location=2) in float iRadius;
layout(location=3) in uint iColor;
layout(location=4) in uvec4 iLabel;

//layout(std140) uniform RenderUniforms {
    uniform mat4 uViewMatrix;
    uniform mat4 uSceneMatrix;
    uniform mat4 uProjectionMatrix;
    uniform vec2 uViewportSize;
    uniform float uPixelRatio;
    uniform sampler2D uColorPalette;
//};
uniform sampler2D uCharTexture;
uniform float uVisibilityThreshold;
uniform vec2 uLabelPositioning;
uniform int uRepeatLabel;
uniform float uRepeatGap;
uniform float uPlacementMargin;
uniform float uLabelPlacement;
uniform vec2 uLabelDirection;
uniform bool uBackground;
uniform float uPadding;

flat out vec4 fBackgroundColor;
flat out vec4 fTextColor;
flat out float fPixelRadius;
flat out float fLabelStep;
flat out vec2 fCharTextureSize;
flat out vec4 fLabelInfo;
flat out float fPixelLength;
out vec2 vFromCenter;

vec4 valueForIndex(sampler2D tex, int index) {
    int texWidth = textureSize(tex, 0).x;
    int col = index % texWidth;
    int row = index / texWidth;
    return texelFetch(tex, ivec2(col, row), 0);
}

uvec4 uvalueForIndex(usampler2D tex, int index) {
    int texWidth = textureSize(tex, 0).x;
    int col = index % texWidth;
    int row = index / texWidth;
    return texelFetch(tex, ivec2(col, row), 0);
}

uint uivalueForIndex(usampler2D tex, int index) {
    int texWidth = textureSize(tex, 0).x;
    int col = index % texWidth;
    int row = index / texWidth;
    return texelFetch(tex, ivec2(col, row), 0)[0];
}

// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
float luminance_x(float x) {
    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);
}
float color_l(float l) {
    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));
}

// from https://en.wikipedia.org/wiki/Relative_luminance
float rgb2luminance(vec3 color) {
    // relative luminance
    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    float r = luminance_x(color.r);
    float g = luminance_x(color.g);
    float b = luminance_x(color.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

vec3 setLuminance(vec3 color, float luminance) {
    float r = luminance_x(color.r) * 0.2126;
    float g = luminance_x(color.g) * 0.7152;
    float b = luminance_x(color.b) * 0.0722;
    float colorLuminance = r + g + b;

    float tr = luminance * (r / colorLuminance);
    float tg = luminance * (g / colorLuminance);
    float tb = luminance * (b / colorLuminance);

    float rr = color_l(tr / 0.2126);
    float rg = color_l(tg / 0.7152);
    float rb = color_l(tb / 0.0722);

    return vec3(rr, rg, rb );
}

// https://www.w3.org/TR/WCAG20/#contrast-ratiodef
// (L1 + 0.05) / (L2 + 0.05), where
// - L1 is the relative luminance of the lighter of the colors, and
// - L2 is the relative luminance of the darker of the colors.
float findDarker(float luminance, float contrast) {
    return (contrast * luminance) + (0.05 * contrast) - 0.05;
}
float findLighter(float luminance, float contrast) {
    return (luminance + 0.05 - (0.05 * contrast)) / contrast;
}

vec3 contrastingColor(vec3 color, float contrast) {
    float luminance = rgb2luminance(color);
    float darker = findDarker(luminance, contrast);
    float lighter = findLighter(luminance, contrast);

    float targetLuminance;
    if (darker < 0.0 || darker > 1.0) {
        targetLuminance = lighter;
    } else if (lighter < 0.0 || lighter > 1.0) {
        targetLuminance = darker;
    } else {
        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;
    }

    return setLuminance(color, targetLuminance);
}

vec3 desaturateColor(vec3 color, float amount) {
    float l = rgb2luminance(color);
    vec3 gray = vec3(l, l, l);
    return mix(color, gray, amount);
}

void main() {
    // claculate the offset matrix, done as a matrix to be able to compute "billboard" vertices in the shader
    mat4 offsetMatrix = mat4(1.0);
    offsetMatrix[3] = vec4(iPosition, 1.0);

    // reset the rotation of the model-view matrix
    mat4 modelMatrix = uViewMatrix * uSceneMatrix * offsetMatrix;
    mat4 lookAtMatrix = mat4(modelMatrix);
    lookAtMatrix[0] = vec4(1.0, 0.0, 0.0, lookAtMatrix[0][3]);
    lookAtMatrix[1] = vec4(0.0, 1.0, 0.0, lookAtMatrix[1][3]);
    lookAtMatrix[2] = vec4(0.0, 0.0, 1.0, lookAtMatrix[2][3]);

    // the on-screen center of this point
    vec4 quadCenter = uProjectionMatrix * lookAtMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    vec2 screenQuadCenter = quadCenter.xy / quadCenter.w;

    // the on-screen position of a side of this quad
    vec4 quadSide = uProjectionMatrix * lookAtMatrix * vec4(iRadius, 0.0, 0.0, 1.0);
    vec2 screenQuadSide = quadSide.xy / quadSide.w;

    // compute the pixel radius of this point for a size of 1 in world coordinates
    float pixelRadius = length((screenQuadSide - screenQuadCenter) * uViewportSize * 0.5);

    // send the size of the char texture to the fragment shader
    fCharTextureSize = vec2(textureSize(uCharTexture, 0));

    // send the render color to the fragment shader
    vec4 color = valueForIndex(uColorPalette, int(iColor));
    if (uBackground) {
        fBackgroundColor = vec4(color.rgb, 1.0);
        fTextColor = vec4(contrastingColor(color.rgb, 7.0), 1.0);
    } else {
        fBackgroundColor = vec4(color.rgb, 0.0);
        fTextColor = vec4(color.rgb, 1.0);
    }

    // send thelabel info to the fragment shader
    fLabelInfo = vec4(iLabel);

    // send the pixel radius of this label to the fragment shader
    float padding = uPadding * uPixelRatio;
    float placementOffset = (fLabelInfo[3] + padding * 2.0) * uLabelPlacement + uPlacementMargin * (-1.0 + 2.0 * uLabelPlacement) * uPixelRatio;
    fPixelRadius = pixelRadius + placementOffset;

    // calculate the render matrix
    mat4 renderMatrix = uProjectionMatrix * lookAtMatrix;

    // compute the visibility multiplier
    float visibilityMultiplier = pixelRadius >= uVisibilityThreshold * 0.5 * uPixelRatio ? 1.0 : 0.0;

    // send the normalized length of a single pixel
    fPixelLength = 1.0 / fPixelRadius;

    // send the normalized distance from the center to the fragment shader
    vFromCenter = aVertex.xy;

    // compute the vertex position and its screen position
    float pixelLength = iRadius / pixelRadius;
    float textRadius = iRadius + pixelLength * placementOffset;
    vec3 labelOffset = vec3(0.0, 0.0, 0.01); // offset the label forward a tiny bit so it's always in front
    vec4 worldVertex = renderMatrix * vec4(aVertex * textRadius * visibilityMultiplier + labelOffset, 1.0);

    // find the number of label repetitions
    float repeatLabels = float(uint(uRepeatLabel));
    float repeatGap = uRepeatGap * uPixelRatio;
    float diameter = fPixelRadius * M_2PI;
    float maxLabels = min(repeatLabels, floor(diameter / (fLabelInfo[2] + repeatGap + padding * 2.0)));
    float maxLabelsLength = (fLabelInfo[2] + padding * 2.0) * maxLabels;
    float labelGap = (diameter - maxLabelsLength) / maxLabels;
    fLabelStep = fLabelInfo[2] + labelGap + padding * 2.0;

    // set the render vertex location
    gl_Position = worldVertex;
}
`;
var CircularLabel_fs_default = "#version 300 es\nprecision highp float;\nprecision lowp usampler2D;\n#define GLSLIFY 1\n\n#define M_PI 3.14159265359\n#define M_2PI 6.28318530718\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform usampler2D uLabelIndices;\nuniform usampler2D uCharBoxes;\nuniform sampler2D uCharTexture;\nuniform float uPixelRatio;\nuniform uint uRenderMode;\nuniform vec2 uLabelDirection;\nuniform bool uMirror;\nuniform float uPadding;\n\nflat in vec4 fBackgroundColor;\nflat in vec4 fTextColor;\nflat in float fPixelRadius;\nflat in float fLabelStep;\nflat in vec2 fCharTextureSize;\nflat in vec4 fLabelInfo;\nflat in float fPixelLength;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nfloat cross_ish(vec2 a, vec2 b)\n{\n    return a.x * b.y - a.y * b.x;\n}\n\nvoid main() {\n    float padding = uPadding * uPixelRatio;\n    float fromCenter = length(vFromCenter);\n    float halfLabelWidth = fLabelInfo[2] * 0.5;\n    float halfLabelHeight = fLabelInfo[3] * 0.5;\n    float normalizedHeight = (halfLabelHeight + padding) / fPixelRadius;\n    float circle = fromCenter - (1.0 - normalizedHeight);\n    float ring = opOnion(circle, normalizedHeight);\n\n    vec2 positionVector = uLabelDirection;\n    float angle = atan(cross_ish(vFromCenter, positionVector), dot(vFromCenter, positionVector));\n    float angleDistance = angle * fPixelRadius;\n    float paddedLabelWidth = fLabelInfo[2] + padding * 2.0;\n    float offsetAngleDistance = angleDistance + halfLabelWidth + padding;\n\n    if (ring > 0.0 || fract(offsetAngleDistance / fLabelStep) >= paddedLabelWidth / fLabelStep) {\n        discard;\n    }\n\n    float width = fract(offsetAngleDistance / fLabelStep) * fLabelStep;\n    float height = (1.0 - fromCenter) * fPixelRadius - padding;\n    vec4 finalColor;\n\n    if (height < 0.0 || height > fLabelInfo[3] || width < padding || width > fLabelInfo[2] + padding) {\n        finalColor = fBackgroundColor;\n    } else {\n        float uProgress = (width - padding) / fLabelInfo[2];\n        if (uMirror) {\n            uProgress = 1.0 - uProgress;\n        }\n        float stringProgress = fLabelInfo[0] + fLabelInfo[1] * uProgress;\n        float stringIndex = floor(stringProgress);\n        int charIndex = int(uivalueForIndex(uLabelIndices, int(stringIndex)));\n        vec4 charBox = vec4(uvalueForIndex(uCharBoxes, charIndex));\n        float charMult = stringProgress - stringIndex;\n\n        vec4 charBoxUV = charBox / vec4(fCharTextureSize, fCharTextureSize);\n\n        vec2 uv = vec2(charBoxUV[0] + charBoxUV[2] * charMult, charBoxUV[1] + charBoxUV[3] * fLabelInfo[1]);\n        if (uMirror) {\n            uv = vec2(charBoxUV[0] + charBoxUV[2] * charMult, charBoxUV[1] + charBoxUV[3] * (height / fLabelInfo[3]));\n        } else {\n            uv = vec2(charBoxUV[0] + charBoxUV[2] * charMult, charBoxUV[1] + charBoxUV[3] * (1.0 - height / fLabelInfo[3]));\n        }\n\n        vec4 texPixel = texture(uCharTexture, uv);\n\n        float smoothing = 7.0 / fLabelInfo[3];\n        float distance = texPixel.a;\n        float textEdge = smoothstep(0.5 - smoothing, 0.5 + smoothing, distance);\n        finalColor = mix(fBackgroundColor, fTextColor, textEdge);\n    }\n\n    finalColor.a *= smoothstep(0.0, fPixelLength * 1.5, abs(ring));\n\n    float threshold = uRenderMode == MODE_HIGH_PASS_1 ? 0.75 : 0.5;\n\n    if (uRenderMode != MODE_HIGH_PASS_2) {\n        if (finalColor.a < threshold) {\n            discard;\n        }\n        fragColor = outputColor(vec4(finalColor.rgb, 1.0));\n    } else {\n        if (finalColor.a == 1.0) {\n            discard;\n        }\n        fragColor = outputColor(finalColor);\n    }\n}\n";
var CircularLabelPlacement;
(function(CircularLabelPlacement2) {
  CircularLabelPlacement2[CircularLabelPlacement2["INSIDE"] = 0] = "INSIDE";
  CircularLabelPlacement2[CircularLabelPlacement2["OUTSIDE"] = 1] = "OUTSIDE";
})(CircularLabelPlacement || (CircularLabelPlacement = {}));
var CircularLabel = class extends PointLabel {
  get repeatLabel() {
    return this.localUniforms.uRepeatLabel;
  }
  set repeatLabel(value) {
    this.localUniforms.uRepeatLabel = value;
  }
  get repeatGap() {
    return this.localUniforms.uRepeatGap;
  }
  set repeatGap(value) {
    this.localUniforms.uRepeatGap = value;
  }
  get placementMargin() {
    return this.localUniforms.uPlacementMargin;
  }
  set placementMargin(value) {
    this.localUniforms.uPlacementMargin = value;
  }
  get mirror() {
    return this.localUniforms.uMirror;
  }
  set mirror(value) {
    this.localUniforms.uMirror = value;
  }
  get labelPlacement() {
    return this.localUniforms.uLabelPlacement;
  }
  set labelPlacement(value) {
    this.localUniforms.uLabelPlacement = value;
  }
  get labelDirection() {
    return this._labelDirection;
  }
  set labelDirection(value) {
    const rad = value * 0.0174533;
    this.localUniforms.uLabelDirection = [Math.cos(rad), Math.sin(rad)];
  }
  initialize(context, points, data, mappings, pickingManager, labelAtlas) {
    super.initialize(context, points, data, mappings, pickingManager, labelAtlas);
    this.localUniforms.uRepeatLabel = -1;
    this.localUniforms.uRepeatGap = 5;
    this.localUniforms.uPlacementMargin = 0;
    this.localUniforms.uMirror = false;
    this.localUniforms.uLabelPlacement = 1;
    this.labelDirection = 90;
  }
  getDrawShaders() {
    return {
      vs: CircularLabel_vs_default,
      fs: CircularLabel_fs_default
    };
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/labels/ring/RingLabel.js
var RingLabel_vs_default = '#version 300 es\n\nprecision lowp usampler2D;\n#define GLSLIFY 1\n\n#define M_PI 3.14159265359\n#define M_2PI 6.28318530718\n\nlayout(location=0) in vec3 aVertex;\nlayout(location=1) in vec3 iPosition;\nlayout(location=2) in float iRadius;\nlayout(location=3) in uint iColor;\nlayout(location=4) in uvec4 iLabel;\n\n//layout(std140) uniform RenderUniforms {\n    uniform mat4 uViewMatrix;\n    uniform mat4 uSceneMatrix;\n    uniform mat4 uProjectionMatrix;\n    uniform vec2 uViewportSize;\n    uniform float uPixelRatio;\n    uniform sampler2D uColorPalette;\n//};\nuniform sampler2D uCharTexture;\nuniform float uVisibilityThreshold;\nuniform vec2 uLabelPositioning;\nuniform int uRepeatLabel;\nuniform float uRepeatGap;\nuniform float uPlacementMargin;\nuniform float uLabelPlacement;\nuniform vec2 uLabelDirection;\nuniform bool uBackground;\nuniform float uPadding;\n\nflat out vec4 fBackgroundColor;\nflat out vec4 fTextColor;\nflat out vec4 fLabelInfo;\nflat out float fPixelRadius;\nflat out float fPixelLength;\nflat out float fThickness;\nflat out float fLabelStep;\nflat out vec2 fCharTextureSize;\n\nout vec2 vFromCenter;\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nvoid main() {\n    // claculate the offset matrix, done as a matrix to be able to compute "billboard" vertices in the shader\n    mat4 offsetMatrix = mat4(1.0);\n    offsetMatrix[3] = vec4(iPosition, 1.0);\n\n    // reset the rotation of the model-view matrix\n    mat4 modelMatrix = uViewMatrix * uSceneMatrix * offsetMatrix;\n    mat4 lookAtMatrix = mat4(modelMatrix);\n    lookAtMatrix[0] = vec4(1.0, 0.0, 0.0, lookAtMatrix[0][3]);\n    lookAtMatrix[1] = vec4(0.0, 1.0, 0.0, lookAtMatrix[1][3]);\n    lookAtMatrix[2] = vec4(0.0, 0.0, 1.0, lookAtMatrix[2][3]);\n\n    // the on-screen center of this point\n    vec4 quadCenter = uProjectionMatrix * lookAtMatrix * vec4(0.0, 0.0, 0.0, 1.0);\n    vec2 screenQuadCenter = quadCenter.xy / quadCenter.w;\n\n    // the on-screen position of a side of this quad\n    vec4 quadSide = uProjectionMatrix * lookAtMatrix * vec4(iRadius, 0.0, 0.0, 1.0);\n    vec2 screenQuadSide = quadSide.xy / quadSide.w;\n\n    // compute the pixel radius of this point for a size of 1 in world coordinates\n    float pixelRadius = length((screenQuadSide - screenQuadCenter) * uViewportSize * 0.5);\n\n    // send the size of the char texture to the fragment shader\n    fCharTextureSize = vec2(textureSize(uCharTexture, 0));\n\n    // send the render color to the fragment shader\n    vec4 color = valueForIndex(uColorPalette, int(iColor));\n    fBackgroundColor = vec4(color.rgb, 1.0);\n    fTextColor = vec4(contrastingColor(color.rgb, 7.0), 1.0);\n\n    // send thelabel info to the fragment shader\n    fLabelInfo = vec4(iLabel);\n\n    // calculate the label visibility\n    float visibilityThreshold = uVisibilityThreshold * uPixelRatio;\n    float visibilityMultiplier = smoothstep(visibilityThreshold * 0.5 - fLabelInfo[3], visibilityThreshold * 0.5, pixelRadius * 0.5);\n\n    // send the pixel radius of this label to the fragment shader\n    float padding = uPadding * uPixelRatio;\n    float minThickness = max(2.0, min(pixelRadius * 0.1, 3.0 * uPixelRatio));\n    fThickness = (minThickness + (fLabelInfo[3] + padding * 2.0 - minThickness) * visibilityMultiplier) * 0.5;\n    fPixelRadius = pixelRadius + fThickness;\n\n    // send the normalized length of a single pixel\n    fPixelLength = 1.0 / fPixelRadius;\n\n    // calculate the render matrix\n    mat4 renderMatrix = uProjectionMatrix * lookAtMatrix;\n\n    // send the normalized distance from the center to the fragment shader\n    vFromCenter = aVertex.xy;\n\n    // compute the vertex position and its screen position\n    float pixelLength = iRadius / pixelRadius;\n    float textRadius = iRadius + pixelLength * fThickness;\n    vec4 worldVertex = renderMatrix * vec4(aVertex * textRadius, 1.0);\n\n    // find the number of label repetitions\n    float repeatLabels = float(uint(uRepeatLabel));\n    float repeatGap = uRepeatGap * uPixelRatio;\n    float circumference = fPixelRadius * M_2PI;\n    float maxLabels = min(repeatLabels, floor(circumference / (fLabelInfo[2] + repeatGap + padding * 2.0)));\n    float maxLabelsLength = (fLabelInfo[2] + padding * 2.0) * maxLabels;\n    float labelGap = (circumference - maxLabelsLength) / maxLabels;\n    fLabelStep = fLabelInfo[2] + labelGap + padding * 2.0;\n\n    // set the render vertex location\n    gl_Position = worldVertex;\n}\n';
var RingLabel_fs_default = "#version 300 es\nprecision highp float;\nprecision lowp usampler2D;\n#define GLSLIFY 1\n\n#define M_PI 3.14159265359\n#define M_2PI 6.28318530718\n\nvec4 valueForIndex(sampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuvec4 uvalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0);\n}\n\nuint uivalueForIndex(usampler2D tex, int index) {\n    int texWidth = textureSize(tex, 0).x;\n    int col = index % texWidth;\n    int row = index / texWidth;\n    return texelFetch(tex, ivec2(col, row), 0)[0];\n}\n\n// from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation\nfloat luminance_x(float x) {\n    return x <= 0.04045 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);\n}\nfloat color_l(float l) {\n    return min(1.0, max(0.0, l <= 0.0031308 ? l * 12.92 : pow(l * 1.055, 1.0 / 2.4) - 0.055));\n}\n\n// from https://en.wikipedia.org/wiki/Relative_luminance\nfloat rgb2luminance(vec3 color) {\n    // relative luminance\n    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef\n    float r = luminance_x(color.r);\n    float g = luminance_x(color.g);\n    float b = luminance_x(color.b);\n    return 0.2126 * r + 0.7152 * g + 0.0722 * b;\n}\n\nvec3 setLuminance(vec3 color, float luminance) {\n    float r = luminance_x(color.r) * 0.2126;\n    float g = luminance_x(color.g) * 0.7152;\n    float b = luminance_x(color.b) * 0.0722;\n    float colorLuminance = r + g + b;\n\n    float tr = luminance * (r / colorLuminance);\n    float tg = luminance * (g / colorLuminance);\n    float tb = luminance * (b / colorLuminance);\n\n    float rr = color_l(tr / 0.2126);\n    float rg = color_l(tg / 0.7152);\n    float rb = color_l(tb / 0.0722);\n\n    return vec3(rr, rg, rb );\n}\n\n// https://www.w3.org/TR/WCAG20/#contrast-ratiodef\n// (L1 + 0.05) / (L2 + 0.05), where\n// - L1 is the relative luminance of the lighter of the colors, and\n// - L2 is the relative luminance of the darker of the colors.\nfloat findDarker(float luminance, float contrast) {\n    return (contrast * luminance) + (0.05 * contrast) - 0.05;\n}\nfloat findLighter(float luminance, float contrast) {\n    return (luminance + 0.05 - (0.05 * contrast)) / contrast;\n}\n\nvec3 contrastingColor(vec3 color, float contrast) {\n    float luminance = rgb2luminance(color);\n    float darker = findDarker(luminance, contrast);\n    float lighter = findLighter(luminance, contrast);\n\n    float targetLuminance;\n    if (darker < 0.0 || darker > 1.0) {\n        targetLuminance = lighter;\n    } else if (lighter < 0.0 || lighter > 1.0) {\n        targetLuminance = darker;\n    } else {\n        targetLuminance = abs(luminance - lighter) < abs(darker - luminance) ? lighter : darker;\n    }\n\n    return setLuminance(color, targetLuminance);\n}\n\nvec3 desaturateColor(vec3 color, float amount) {\n    float l = rgb2luminance(color);\n    vec3 gray = vec3(l, l, l);\n    return mix(color, gray, amount);\n}\n\nuniform vec4 uClearColor;\nuniform float uDesaturate;\nuniform float uFade;\nuniform float uAlpha;\n\nvec4 outputColor(vec4 color) {\n    // desaturate => fade => alpha\n    vec3 ret = vec3(desaturateColor(color.rgb, uDesaturate));\n    ret = mix(ret, uClearColor.rgb, uFade);\n    return vec4(ret, color.a * uAlpha);\n}\n\n#define MODE_DRAFT 0u\n#define MODE_MEDIUM 1u\n#define MODE_HIGH_PASS_1 2u\n#define MODE_HIGH_PASS_2 3u\n#define MODE_PICKING 4u\n\n// most of these come from this excellent post:\n// https://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n\nfloat opRound(in float d, in float r) {\n    return d - r;\n}\n\nfloat opOnion(in float d, in float r) {\n    return abs(d) - r;\n}\n\nfloat sdCircle(in vec2 p, in float r ) {\n    return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(in vec2 p, in float r) {\n    const float k = sqrt(3.0);\n    p.x = abs(p.x) - r;\n    p.y = p.y + (r) / k;\n    if (p.x + k * p.y > 0.0) {\n        p = vec2(p.x-k*p.y,-k*p.x-p.y) / 2.0;\n    }\n    p.x -= clamp(p.x, -2.0 * r, 0.0);\n    return -length(p) * sign(p.y);\n}\n\nfloat sdPentagon(in vec2 p, in float r) {\n    const vec3 k = vec3(0.809016994, 0.587785252, 0.726542528);\n    p.y = -(p.y) * 1.25;\n    p.x = abs(p.x) * 1.25;\n    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);\n    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);\n    p -= vec2(clamp(p.x, -r*k.z, r*k.z), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdOctagon(in vec2 p, in float r) {\n    // pi/8: cos, sin, tan.\n    const vec3 k = vec3(\n        -0.9238795325,   // sqrt(2+sqrt(2))/2\n        0.3826834323,   // sqrt(2-sqrt(2))/2\n        0.4142135623\n    ); // sqrt(2)-1\n    // reflections\n    p = abs(p) * 1.1;\n    p -= 2.0 * min(dot(vec2(k.x,k.y), p), 0.0) * vec2(k.x,k.y);\n    p -= 2.0 * min(dot(vec2(-k.x,k.y), p), 0.0) * vec2(-k.x,k.y);\n    // Polygon side.\n    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n    return length(p) * sign(p.y);\n}\n\nfloat sdStar(in vec2 p, in float r, in uint n, in float m) { // m=[2,n]\n    // these 4 lines can be precomputed for a given shape\n    float an = 3.141593 / float(n);\n    float en = 3.141593 / m;\n    vec2  acs = vec2(cos(an), sin(an));\n    vec2  ecs = vec2(cos(en), sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,\n\n    // reduce to first sector\n    float bn = mod(atan(p.x, p.y), 2.0 * an) - an;\n    p = length(p) * vec2(cos(bn), abs(sin(bn)));\n\n    // line sdf\n    p -= r * acs;\n    p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);\n    return length(p) * sign(p.x);\n}\n\nfloat sdCross(in vec2 p, in float w, in float r) {\n    p = abs(p);\n    return length(p - min(p.x + p.y, w) * 0.5) - r;\n}\n\n// TODO: Precompute this, we always pass the same parameters tot his function (v, vec2(1.0, 0.3), 0.0)\nfloat sdPlus( in vec2 p, in vec2 b, float r ) {\n    p = abs(p);\n    p = (p.y > p.x) ? p.yx : p.xy;\n\n    vec2  q = p - b;\n    float k = max(q.y, q.x);\n    vec2  w = (k > 0.0) ? q : vec2(b.y - p.x, -k);\n\n    return sign(k)*length(max(w, 0.0)) + r;\n}\n\nuniform usampler2D uLabelIndices;\nuniform usampler2D uCharBoxes;\nuniform sampler2D uCharTexture;\nuniform float uPixelRatio;\nuniform uint uRenderMode;\nuniform vec2 uLabelDirection;\nuniform bool uMirror;\nuniform float uPadding;\n\nflat in vec4 fBackgroundColor;\nflat in vec4 fTextColor;\nflat in float fPixelRadius;\nflat in float fLabelStep;\nflat in vec2 fCharTextureSize;\nflat in vec4 fLabelInfo;\nflat in float fPixelLength;\nflat in float fThickness;\nin vec2 vFromCenter;\n\nout vec4 fragColor;\n\nfloat cross_ish(vec2 a, vec2 b)\n{\n    return a.x * b.y - a.y * b.x;\n}\n\nvoid main() {\n    float padding = uPadding * uPixelRatio;\n    float fromCenter = length(vFromCenter);\n    float thickness = fThickness * fPixelLength;\n    float antialias = min(thickness, fPixelLength * 1.5);\n    float radius = 1.0 - thickness;\n    float circle = fromCenter - (1.0 - thickness);\n    float ring = opOnion(circle, thickness);\n    float modeDistance = uRenderMode == MODE_HIGH_PASS_1 ? -antialias : -antialias * 0.5;\n    float ringThreshold = uRenderMode == MODE_HIGH_PASS_2 ? 0.0 : modeDistance;\n\n    if (ring > ringThreshold) {\n        discard;\n    }\n\n    float halfLabelWidth = fLabelInfo[2] * 0.5;\n    float halfLabelHeight = fLabelInfo[3] * 0.5;\n    float normalizedHeight = (halfLabelHeight + padding) / fPixelRadius;\n\n    vec2 positionVector = uLabelDirection;\n    float angle = atan(cross_ish(vFromCenter, positionVector), dot(vFromCenter, positionVector));\n    float angleDistance = angle * fPixelRadius;\n    float paddedLabelWidth = fLabelInfo[2] + padding * 2.0;\n    float offsetAngleDistance = angleDistance + halfLabelWidth + padding;\n\n    float width = fract(offsetAngleDistance / fLabelStep) * fLabelStep;\n    float height = (1.0 - fromCenter) * fPixelRadius - padding;\n    vec4 finalColor;\n\n    if (height < 0.0 || height > fLabelInfo[3] || width < padding || width > fLabelInfo[2] + padding) {\n        finalColor = fBackgroundColor;\n    } else {\n        float uProgress = (width - padding) / fLabelInfo[2];\n        if (uMirror) {\n            uProgress = 1.0 - uProgress;\n        }\n        float stringProgress = fLabelInfo[0] + fLabelInfo[1] * uProgress;\n        float stringIndex = floor(stringProgress);\n        int charIndex = int(uivalueForIndex(uLabelIndices, int(stringIndex)));\n        vec4 charBox = vec4(uvalueForIndex(uCharBoxes, charIndex));\n        float charMult = stringProgress - stringIndex;\n\n        vec4 charBoxUV = charBox / vec4(fCharTextureSize, fCharTextureSize);\n\n        vec2 uv = vec2(charBoxUV[0] + charBoxUV[2] * charMult, charBoxUV[1] + charBoxUV[3] * fLabelInfo[1]);\n        if (uMirror) {\n            uv = vec2(charBoxUV[0] + charBoxUV[2] * charMult, charBoxUV[1] + charBoxUV[3] * (height / fLabelInfo[3]));\n        } else {\n            uv = vec2(charBoxUV[0] + charBoxUV[2] * charMult, charBoxUV[1] + charBoxUV[3] * (1.0 - height / fLabelInfo[3]));\n        }\n\n        vec4 texPixel = texture(uCharTexture, uv);\n\n        float smoothing = 7.0 / fLabelInfo[3];\n        float distance = texPixel.a;\n        float textEdge = smoothstep(0.5 - smoothing, 0.5 + smoothing, distance);\n        finalColor = mix(fBackgroundColor, fTextColor, textEdge);\n    }\n\n    if (uRenderMode == MODE_HIGH_PASS_2) {\n        if (ring < -antialias) {\n            discard;\n        }\n        fragColor = outputColor(vec4(finalColor.rgb, smoothstep(0.0, antialias, abs(ring))));\n    } else {\n        fragColor = outputColor(vec4(finalColor.rgb, 1.0));\n    }\n\n//    fragColor = vec4(1.0,0.0,1.0,1.0);\n}\n";
var RingLabel = class extends CircularLabel {
  initialize(context, points, data, mappings, pickingManager, labelAtlas) {
    super.initialize(context, points, data, mappings, pickingManager, labelAtlas);
    this.localUniforms.uPadding = 2;
  }
  getDrawShaders() {
    return {
      vs: RingLabel_vs_default,
      fs: RingLabel_fs_default
    };
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/labels/mod.js
var types3 = {
  PointLabel,
  CircularLabel,
  RingLabel
};

// node_modules/@dekkai/env/build/lib/node.js
var kIsNodeJS = Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
function isNodeJS() {
  return kIsNodeJS;
}

// node_modules/@dekkai/env/build/lib/deno.js
var kIsDeno = Boolean(typeof Deno !== "undefined");
function isDeno() {
  return kIsDeno;
}

// node_modules/@dekkai/data-source/build/lib/chunk/DataChunk.js
var DataChunk = class {
  constructor(source, start, end) {
    this._buffer = null;
    this.source = source;
    this.start = start;
    this.end = end;
  }
  get buffer() {
    return this._buffer;
  }
  get byteLength() {
    return Promise.resolve(this.end - this.start);
  }
  get loaded() {
    return Boolean(this._buffer);
  }
  async load() {
    if (!this._buffer) {
      this._buffer = await this.loadData();
      if (this._buffer === null) {
        this.start = 0;
        this.end = 0;
      } else if (this.end - this.start > this._buffer.byteLength) {
        this.end -= this.end - this.start - this._buffer.byteLength;
      }
    }
  }
  unload() {
    this._buffer = null;
  }
  slice(start, end) {
    return new DataChunk(this, start, end);
  }
  loadData(start = 0, end = this.end - this.start) {
    return this.source.loadData(this.start + start, this.start + end);
  }
};

// node_modules/@dekkai/data-source/build/lib/file/local/LocalDataFile.js
var LocalDataFile = class {
  slice(start, end) {
    return new DataChunk(this, start, end);
  }
};

// node_modules/@dekkai/data-source/build/lib/file/local/LocalDataFileNode.js
var import_moduleLoader = __toModule(require_moduleLoader());
var gFS = null;
var kFsPromise = (isNodeJS() ? (0, import_moduleLoader.loadModule)("fs") : Promise.resolve(null)).then((fs) => gFS = fs);
var LocalDataFileNode = class extends LocalDataFile {
  constructor(handle, stats) {
    super();
    this.handle = handle;
    this.stats = stats;
  }
  static async fromSource(source) {
    await kFsPromise;
    let handle;
    if (source instanceof URL || typeof source === "string") {
      handle = gFS.openSync(source);
    } else if (typeof source === "number") {
      handle = source;
    } else {
      throw `A LocalDataFileNode cannot be created from a ${typeof source} instance`;
    }
    const stats = gFS.fstatSync(handle);
    return new LocalDataFileNode(handle, stats);
  }
  get byteLength() {
    return Promise.resolve(this.stats.size);
  }
  close() {
    const handle = this.handle;
    kFsPromise.then(() => gFS.closeSync(handle));
    this.handle = null;
    this.stats = null;
  }
  async loadData(start = 0, end = this.stats.size) {
    await kFsPromise;
    const normalizedEnd = Math.min(end, this.stats.size);
    const length5 = normalizedEnd - start;
    const result = new Uint8Array(length5);
    let loaded = 0;
    while (loaded < length5) {
      loaded += await this.loadDataIntoBuffer(result, loaded, start + loaded, normalizedEnd);
    }
    return result.buffer;
  }
  loadDataIntoBuffer(buffer, offset, start, end) {
    return new Promise((resolve, reject) => {
      const length5 = end - start;
      gFS.read(this.handle, buffer, offset, length5, start, (err, bytesRead) => {
        if (err) {
          reject(err);
        } else {
          resolve(bytesRead);
        }
      });
    });
  }
};

// node_modules/@dekkai/data-source/build/lib/file/local/LocalDataFileDeno.js
var LocalDataFileDeno = class extends LocalDataFile {
  constructor(file, info) {
    super();
    this.file = file;
    this.info = info;
  }
  static async fromSource(source) {
    if (!(source instanceof URL) && typeof source !== "string") {
      throw `A LocalDataFileDeno cannot be created from a ${typeof source} instance`;
    }
    const stats = await Deno.stat(source);
    if (!stats.isFile) {
      throw `The path "${source} does not point to a file"`;
    }
    const file = await Deno.open(source, {read: true, write: false});
    return new LocalDataFileDeno(file, stats);
  }
  get byteLength() {
    return Promise.resolve(this.info.size);
  }
  close() {
    Deno.close(this.file.rid);
    this.file = null;
    this.info = null;
  }
  async loadData(start = 0, end = this.info.size) {
    const normalizedEnd = Math.min(end, this.info.size);
    const length5 = normalizedEnd - start;
    const result = new Uint8Array(length5);
    let loaded = 0;
    while (loaded < length5) {
      loaded += await this.loadDataIntoBuffer(result, loaded, start + loaded, normalizedEnd);
    }
    return result.buffer;
  }
  async loadDataIntoBuffer(buffer, offset, start, end) {
    const cursorPosition = await this.file.seek(start, Deno.SeekMode.Start);
    if (cursorPosition !== start) {
      throw "ERROR: Cannot seek to the desired position";
    }
    const result = new Uint8Array(end - start);
    const bytesRead = await this.file.read(result);
    buffer.set(result, offset);
    return bytesRead;
  }
};

// node_modules/@dekkai/data-source/build/lib/file/local/LocalDataFileBrowser.js
var LocalDataFileBrowser = class extends LocalDataFile {
  constructor(blob) {
    super();
    this.blob = blob;
  }
  static async fromSource(source) {
    return new LocalDataFileBrowser(source);
  }
  get byteLength() {
    return Promise.resolve(this.blob.size);
  }
  close() {
    this.blob = null;
  }
  async loadData(start = 0, end = this.blob.size) {
    const slice = this.blob.slice(start, Math.min(end, this.blob.size));
    return await this.loadBlob(slice);
  }
  loadBlob(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(blob);
    });
  }
};

// node_modules/@dekkai/data-source/build/lib/file/remote/RemoteDataFile.js
var RemoteDataFile = class extends EventEmitter {
  slice(start, end) {
    return new DataChunk(this, start, end);
  }
};
RemoteDataFile.LOADING_START = Symbol("DataFileEvents::LoadingStart");
RemoteDataFile.LOADING_PROGRESS = Symbol("DataFileEvents::LoadingProgress");
RemoteDataFile.LOADING_COMPLETE = Symbol("DataFileEvents::LoadingComplete");

// node_modules/@dekkai/data-source/build/lib/file/remote/RemoteDataFileBrowser.js
var kSizeOf4MB = 1024 * 1024 * 4;
var RemoteDataFileBrowser = class extends RemoteDataFile {
  constructor(source) {
    super();
    this._byteLength = null;
    this._bytesLoaded = 0;
    this._onLoadingComplete = null;
    this._isLoadingComplete = false;
    this.buffer = null;
    this.source = source;
    this._onLoadingComplete = {
      promise: null,
      resolve: null,
      reject: null,
      started: false
    };
    this._onLoadingComplete.promise = new Promise((resolve, reject) => {
      this._onLoadingComplete.resolve = resolve;
      this._onLoadingComplete.reject = reject;
    });
  }
  static async fromSource(source) {
    const result = new RemoteDataFileBrowser(source);
    await result.startDownloading();
    return result;
  }
  get byteLength() {
    if (this._byteLength === null) {
      return new Promise((resolve) => {
        const handleEvent = (e, byteLength) => {
          this.off(RemoteDataFile.LOADING_START, handleEvent);
          this._byteLength = byteLength;
          resolve(byteLength);
        };
        this.on(RemoteDataFile.LOADING_START, handleEvent);
      });
    }
    return Promise.resolve(this._byteLength);
  }
  get bytesLoaded() {
    return this._bytesLoaded;
  }
  get onLoadingComplete() {
    return this._onLoadingComplete.promise;
  }
  get isLoadingComplete() {
    return this._isLoadingComplete;
  }
  async startDownloading() {
    if (!this._onLoadingComplete.started) {
      this._onLoadingComplete.started = true;
      let response;
      try {
        response = await fetch(this.source);
      } catch (e) {
        this._onLoadingComplete.reject(e);
        throw e;
      }
      if (!response.ok) {
        const notOK = new Error("Network response was not ok");
        this._onLoadingComplete.reject(notOK);
        throw notOK;
      }
      setTimeout(() => this.readFileStream(response));
    }
  }
  async loadData(start = 0, end = this._byteLength) {
    if (this._isLoadingComplete && start >= this._byteLength) {
      return new ArrayBuffer(0);
    }
    if (this._bytesLoaded >= end || this._isLoadingComplete) {
      return this.buffer.slice(start, Math.min(end, this._bytesLoaded));
    }
    return new Promise((resolve) => {
      const handleEvent = (e, loaded) => {
        if (loaded >= end || e === RemoteDataFile.LOADING_COMPLETE) {
          this.off(RemoteDataFile.LOADING_PROGRESS, handleEvent);
          this.off(RemoteDataFile.LOADING_COMPLETE, handleEvent);
          resolve(this.buffer.slice(start, Math.min(end, loaded)));
        }
      };
      this.on(RemoteDataFile.LOADING_PROGRESS, handleEvent);
      this.on(RemoteDataFile.LOADING_COMPLETE, handleEvent);
    });
  }
  async readFileStream(response) {
    const contentLength = response.headers.get("content-length");
    if (contentLength !== null) {
      this._byteLength = parseInt(contentLength, 10);
      this.buffer = new ArrayBuffer(this._byteLength);
    } else {
      this._byteLength = -1;
      this.buffer = new ArrayBuffer(kSizeOf4MB);
    }
    this._bytesLoaded = 0;
    this.emit(RemoteDataFile.LOADING_START, this._byteLength);
    if (this._byteLength === 0) {
      this.emit(RemoteDataFile.LOADING_PROGRESS, this._bytesLoaded, this._byteLength);
      this._isLoadingComplete = true;
      this.emit(RemoteDataFile.LOADING_COMPLETE, this._byteLength);
      this._onLoadingComplete.resolve(this._byteLength);
    } else {
      const reader = response.body.getReader();
      let view = new Uint8Array(this.buffer);
      while (true) {
        try {
          const result = await reader.read();
          if (result.done) {
            this._byteLength = this._bytesLoaded;
            this._isLoadingComplete = true;
            this.emit(RemoteDataFile.LOADING_COMPLETE, this._byteLength);
            this._onLoadingComplete.resolve(this._byteLength);
            break;
          }
          if (this.buffer.byteLength < this._bytesLoaded + result.value.byteLength) {
            const oldView = view;
            this.buffer = new ArrayBuffer(this._bytesLoaded + Math.max(result.value.byteLength, kSizeOf4MB));
            view = new Uint8Array(this.buffer);
            view.set(oldView, 0);
          }
          view.set(result.value, this._bytesLoaded);
          this.emit(RemoteDataFile.LOADING_PROGRESS, this._bytesLoaded, this._byteLength);
          this._bytesLoaded += result.value.length;
        } catch (e) {
          this._onLoadingComplete.reject(e);
          throw e;
        }
      }
    }
  }
};

// node_modules/@dekkai/data-source/build/lib/file/remote/RemoteDataFileNode.js
var import_moduleLoader2 = __toModule(require_moduleLoader());
var gHTTP = null;
var gHTTPS = null;
var gURL = null;
var kLibPromise = (isNodeJS() ? Promise.all([(0, import_moduleLoader2.loadModule)("http"), (0, import_moduleLoader2.loadModule)("https"), (0, import_moduleLoader2.loadModule)("url")]) : Promise.resolve([null, null])).then((libs) => {
  gHTTP = libs[0];
  gHTTPS = libs[1];
  gURL = libs[2];
});
var kSizeOf4MB2 = 1024 * 1024 * 4;
var RemoteDataFileNode = class extends RemoteDataFile {
  constructor(source) {
    super();
    this._byteLength = null;
    this._bytesLoaded = null;
    this._onLoadingComplete = null;
    this._isLoadingComplete = false;
    this.buffer = null;
    this.source = source;
    this._onLoadingComplete = {
      promise: null,
      resolve: null,
      reject: null,
      started: false
    };
    this._onLoadingComplete.promise = new Promise((resolve, reject) => {
      this._onLoadingComplete.resolve = resolve;
      this._onLoadingComplete.reject = reject;
    });
  }
  static async fromSource(source) {
    const result = new RemoteDataFileNode(source);
    await result.startDownloading();
    return result;
  }
  get byteLength() {
    if (this._byteLength === null) {
      return new Promise((resolve) => {
        const handleEvent = (e, byteLength) => {
          this.off(RemoteDataFile.LOADING_START, handleEvent);
          this._byteLength = byteLength;
          resolve(byteLength);
        };
        this.on(RemoteDataFile.LOADING_START, handleEvent);
      });
    }
    return Promise.resolve(this._byteLength);
  }
  get bytesLoaded() {
    return this._bytesLoaded;
  }
  get onLoadingComplete() {
    return this._onLoadingComplete.promise;
  }
  get isLoadingComplete() {
    return this._isLoadingComplete;
  }
  startDownloading() {
    return new Promise((resolve, reject) => {
      kLibPromise.then(() => {
        const url = this.source instanceof gURL.URL ? this.source : gURL.parse(this.source);
        const protocol = url.protocol === "https" ? gHTTPS : gHTTP;
        protocol.get(this.source, (response) => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            response.resume();
            const notOK = new Error("Network response was not ok");
            this._onLoadingComplete.reject(notOK);
            reject(notOK);
            return;
          }
          resolve();
          setTimeout(() => this.readFileStream(response));
        });
      });
    });
  }
  async loadData(start = 0, end = this._byteLength) {
    if (this._isLoadingComplete && start >= this._byteLength) {
      return new ArrayBuffer(0);
    }
    if (this._bytesLoaded >= end || this._isLoadingComplete) {
      return this.buffer.slice(start, Math.min(end, this._bytesLoaded));
    }
    return new Promise((resolve) => {
      const handleEvent = (e, loaded) => {
        if (loaded >= end || e === RemoteDataFile.LOADING_COMPLETE) {
          this.off(RemoteDataFile.LOADING_PROGRESS, handleEvent);
          this.off(RemoteDataFile.LOADING_COMPLETE, handleEvent);
          resolve(this.buffer.slice(start, Math.min(end, loaded)));
        }
      };
      this.on(RemoteDataFile.LOADING_PROGRESS, handleEvent);
      this.on(RemoteDataFile.LOADING_COMPLETE, handleEvent);
    });
  }
  async readFileStream(response) {
    const contentLength = response.headers["content-length"];
    if (contentLength !== null && contentLength !== void 0) {
      this._byteLength = parseInt(contentLength, 10);
      this.buffer = new ArrayBuffer(this._byteLength);
    } else {
      this._byteLength = -1;
      this.buffer = new ArrayBuffer(kSizeOf4MB2);
    }
    this._bytesLoaded = 0;
    this.emit(RemoteDataFile.LOADING_START, this._byteLength);
    if (this._byteLength === 0) {
      this.emit(RemoteDataFile.LOADING_PROGRESS, this._bytesLoaded, this._byteLength);
      this._isLoadingComplete = true;
      this.emit(RemoteDataFile.LOADING_COMPLETE, this._byteLength);
      this._onLoadingComplete.resolve(this._byteLength);
      response.resume();
    } else {
      let view = new Uint8Array(this.buffer);
      response.on("error", (error) => {
        this._onLoadingComplete.reject(error);
        throw error;
      });
      response.on("data", (chunk) => {
        if (this.buffer.byteLength < this._bytesLoaded + chunk.byteLength) {
          const oldView = view;
          this.buffer = new ArrayBuffer(this._bytesLoaded + Math.max(chunk.byteLength, kSizeOf4MB2));
          view = new Uint8Array(this.buffer);
          view.set(oldView, 0);
        }
        view.set(chunk, this._bytesLoaded);
        this.emit(RemoteDataFile.LOADING_PROGRESS, this._bytesLoaded, this._byteLength);
        this._bytesLoaded += chunk.byteLength;
      });
      response.on("end", () => {
        this._byteLength = this._bytesLoaded;
        this._isLoadingComplete = true;
        this.emit(RemoteDataFile.LOADING_COMPLETE, this._byteLength);
        this._onLoadingComplete.resolve(this._byteLength);
      });
    }
  }
};

// node_modules/@dekkai/data-source/build/lib/file/DataFile.js
var import_moduleLoader3 = __toModule(require_moduleLoader());
var DataFile = class {
  static async fromLocalSource(source) {
    if (isNodeJS()) {
      return LocalDataFileNode.fromSource(source);
    } else if (isDeno()) {
      return LocalDataFileDeno.fromSource(source);
    }
    return LocalDataFileBrowser.fromSource(source);
  }
  static async fromRemoteSource(source) {
    if (isNodeJS()) {
      return RemoteDataFileNode.fromSource(source);
    } else if (isDeno()) {
      return RemoteDataFileBrowser.fromSource(source);
    }
    return RemoteDataFileBrowser.fromSource(source);
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/mod.js
var mod_exports6 = {};
__export(mod_exports6, {
  DebugMenu: () => DebugMenu,
  mouse: () => mod_exports4,
  picking: () => mod_exports5
});

// node_modules/@uncharted.software/grafer/build/lib/UX/mouse/mod.js
var mod_exports4 = {};
__export(mod_exports4, {
  DragModule: () => DragModule,
  DragPan: () => DragPan,
  DragRotation: () => DragRotation,
  DragTruck: () => DragTruck,
  MouseHandler: () => MouseHandler,
  ScrollDolly: () => ScrollDolly,
  kButton2Index: () => kButton2Index,
  kIndex2Button: () => kIndex2Button
});

// node_modules/@uncharted.software/grafer/build/lib/UX/mouse/drag/DragModule.js
var DragModule = class extends UXModule {
  constructor(viewport, enabled = false) {
    super();
    this.button = "primary";
    this.boundHandler = this.handleMouse.bind(this);
    this.viewport = viewport;
    this.enabled = enabled;
  }
  hookEvents() {
    this.viewport.mouseHandler.on(MouseHandler.events.move, this.boundHandler);
  }
  unhookEvents() {
    this.viewport.mouseHandler.off(MouseHandler.events.move, this.boundHandler);
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/mouse/drag/DragPan.js
var DragPan = class extends DragModule {
  handleMouse(event, state, delta) {
    if (state.buttons[this.button]) {
      const aspect = this.viewport.size[0] / this.viewport.size[1];
      const aov = this.viewport.camera.aov;
      const rotationX = -aov * (delta[1] / this.viewport.rect.height);
      const rotationY = -aov * (delta[0] / this.viewport.rect.width) * aspect;
      const r = quat_exports.fromEuler(quat_exports.create(), rotationX, rotationY, 0);
      this.viewport.camera.rotate(r);
      this.viewport.render();
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/mouse/drag/DragRotation.js
var DragRotation = class extends DragModule {
  constructor() {
    super(...arguments);
    this.button = "secondary";
  }
  handleMouse(event, state, delta) {
    if (state.buttons[this.button]) {
      const side = Math.min(this.viewport.size[0], this.viewport.size[1]);
      const rawRotation = quat_exports.fromEuler(quat_exports.create(), delta[1] / side * 90, delta[0] / side * 90, 0);
      const camInverse = quat_exports.invert(quat_exports.create(), this.viewport.camera.rotation);
      const rotation = quat_exports.mul(quat_exports.create(), camInverse, rawRotation);
      quat_exports.mul(rotation, rotation, this.viewport.camera.rotation);
      this.viewport.graph.rotate(rotation);
      this.viewport.render();
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/mouse/drag/DragTruck.js
var DragTruck = class extends DragModule {
  handleMouse(event, state, delta) {
    if (state.buttons[this.button]) {
      const position = this.viewport.camera.position;
      const rotated = vec3_exports.transformQuat(vec3_exports.create(), position, this.viewport.camera.rotation);
      const distance4 = Math.abs(rotated[2]);
      const vertical = this.viewport.camera.aovRad * distance4;
      const pixelToWorld = vertical / this.viewport.rect.height;
      const delta3 = vec3_exports.fromValues(delta[0] * pixelToWorld, delta[1] * -pixelToWorld, 0);
      const inverse4 = quat_exports.invert(quat_exports.create(), this.viewport.camera.rotation);
      vec3_exports.transformQuat(delta3, delta3, inverse4);
      vec3_exports.add(position, position, delta3);
      this.viewport.camera.position = position;
      this.viewport.render();
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/mouse/scroll/ScrollModule.js
var ScrollModule = class extends UXModule {
  constructor(viewport, enabled = false) {
    super();
    this.speed = 4.5;
    this.boundHandler = this.handleMouse.bind(this);
    this.viewport = viewport;
    this.enabled = enabled;
  }
  hookEvents() {
    this.viewport.mouseHandler.on(MouseHandler.events.wheel, this.boundHandler);
  }
  unhookEvents() {
    this.viewport.mouseHandler.off(MouseHandler.events.wheel, this.boundHandler);
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/mouse/scroll/ScrollDolly.js
var ScrollDolly = class extends ScrollModule {
  handleMouse(event, state, delta) {
    const invProjection = mat4_exports.invert(mat4_exports.create(), this.viewport.camera.projectionMatrix);
    const invView = mat4_exports.invert(mat4_exports.create(), this.viewport.camera.viewMatrix);
    const viewportCoords = vec2_exports.fromValues(state.canvasCoords[0] * this.viewport.pixelRatio, state.canvasCoords[1] * this.viewport.pixelRatio);
    const worldCoords = vec2_exports.fromValues(2 * viewportCoords[0] / this.viewport.size[0] - 1, 1 - 2 * viewportCoords[1] / this.viewport.size[1]);
    const rayClip = vec4_exports.fromValues(worldCoords[0], worldCoords[1], -1, 1);
    const rayEye = vec4_exports.transformMat4(vec4_exports.create(), rayClip, invProjection);
    rayEye[2] = -1;
    rayEye[3] = 0;
    const rayWorld4 = vec4_exports.transformMat4(vec4_exports.create(), rayEye, invView);
    const rayWorld = vec3_exports.fromValues(rayWorld4[0], rayWorld4[1], rayWorld4[2]);
    vec3_exports.normalize(rayWorld, rayWorld);
    const position = this.viewport.camera.position;
    const zMult = position[2] / rayWorld[2];
    const rayZeroZ = vec3_exports.fromValues(position[0] + rayWorld[0] * zMult, position[1] + rayWorld[1] * zMult, 0);
    const distance4 = Math.max(100, vec3_exports.distance(position, rayZeroZ));
    const speed = this.speed * (distance4 / 100);
    vec3_exports.scaleAndAdd(position, position, rayWorld, delta * speed);
    this.viewport.camera.position = position;
    this.viewport.render();
  }
};

// node_modules/@uncharted.software/grafer/build/lib/UX/picking/mod.js
var mod_exports5 = {};
__export(mod_exports5, {
  PickingManager: () => PickingManager
});

// node_modules/@uncharted.software/grafer/build/lib/UX/debug/DebugMenu.js
var import_tweakpane = __toModule(require_tweakpane());
var DebugMenu = class {
  constructor(viewport) {
    this.viewport = viewport;
    const layers = viewport.graph.layers;
    this.pane = new import_tweakpane.default({title: "Debug Menu", expanded: false});
    for (let i = 0, n = layers.length; i < n; ++i) {
      const layer = layers[i];
      const layerFolder = this.pane.addFolder({title: layer.name, expanded: false});
      this.addLayerOptions(layerFolder, layer);
    }
    this.uxFolder = null;
    this.pane.on("change", () => {
      this.viewport.render();
    });
  }
  registerUX(ux) {
    if (!this.uxFolder) {
      this.uxFolder = this.pane.addFolder({title: "UX", expanded: false});
    }
    const folder = this.uxFolder.addFolder({title: ux.constructor.name, expanded: false});
    folder.addInput(ux, "enabled");
    if ("button" in ux) {
      const keys = Object.keys(kButton2Index);
      const options = {};
      for (let i = 0, n = keys.length; i < n; ++i) {
        options[keys[i]] = keys[i];
      }
      folder.addInput(ux, "button", {options});
    }
    if ("speed" in ux) {
      folder.addInput(ux, "speed", {min: -100, max: 100});
    }
  }
  addLayerOptions(folder, layer) {
    folder.addInput(layer, "enabled");
    folder.addInput(layer, "nearDepth", {min: 0, max: 1, label: "near"});
    folder.addInput(layer, "farDepth", {min: 0, max: 1, label: "far"});
    if (layer.nodes) {
      const nodesFolder = folder.addFolder({title: "Nodes", expanded: false});
      this.addLayerElementOptions(nodesFolder, layer, "nodes");
    }
    if (layer.labels) {
      const labelsFolder = folder.addFolder({title: "Labels", expanded: false});
      this.addLayerElementOptions(labelsFolder, layer, "labels");
    }
    if (layer.edges) {
      const edgesFolder = folder.addFolder({title: "Edges", expanded: false});
      this.addLayerElementOptions(edgesFolder, layer, "edges");
    }
  }
  addLayerElementOptions(folder, layer, key) {
    const element = layer[key];
    const options = {
      enabled: [element, {}],
      blendMode: [element, {
        options: {
          normal: LayerRenderableBlendMode.NORMAL,
          additive: LayerRenderableBlendMode.ADDITIVE,
          none: LayerRenderableBlendMode.NONE
        }
      }],
      pixelSizing: [element, {label: "pixel sizing "}],
      billboard: [element, {label: "billboarding"}],
      minSize: [element, {label: "min size"}],
      maxSize: [element, {label: "max size"}],
      gravity: [element, {min: -2, max: 2}],
      alpha: [element, {min: 0, max: 1}],
      fade: [element, {min: 0, max: 1}],
      desaturate: [element, {min: 0, max: 1}],
      [`${key}NearDepth`]: [layer, {min: 0, max: 1, label: "near"}],
      [`${key}FarDepth`]: [layer, {min: 0, max: 1, label: "far"}]
    };
    const keys = Object.keys(options);
    for (let i = 0, n = keys.length; i < n; ++i) {
      if (keys[i] in options[keys[i]][0]) {
        folder.addInput(options[keys[i]][0], keys[i], options[keys[i]][1]);
      }
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/graph/Layer.js
var Layer = class extends EventEmitter {
  constructor(nodes, edges, labels, name = "Layer") {
    super();
    this._nearDepth = 0;
    this._farDepth = 1;
    this._nodesNearDepth = 0;
    this._nodesFarDepth = 1;
    this._edgesNearDepth = 0;
    this._edgesFarDepth = 1;
    this._labelsNearDepth = 0;
    this._labelsFarDepth = 1;
    this.enabled = true;
    this._nodes = nodes;
    this._edges = edges;
    this._labels = labels;
    this.name = name;
    if (this._nodes) {
      this._nodes.on(EventEmitter.omniEvent, (event, id) => {
        this.emit(event, {
          layer: this.name,
          type: "node",
          id
        });
      });
    }
    if (this._edges) {
      this._edges.on(EventEmitter.omniEvent, (event, id) => {
        this.emit(event, {
          layer: this.name,
          type: "edge",
          id
        });
      });
    }
  }
  get nodes() {
    return this._nodes;
  }
  get edges() {
    return this._edges;
  }
  get labels() {
    return this._labels;
  }
  get nearDepth() {
    return this._nearDepth;
  }
  set nearDepth(value) {
    this._nearDepth = value;
    this.updateLabelsDepths();
    this.updateNodesDepths();
    this.updateEdgesDepths();
  }
  get farDepth() {
    return this._farDepth;
  }
  set farDepth(value) {
    this._farDepth = value;
    this.updateLabelsDepths();
    this.updateNodesDepths();
    this.updateEdgesDepths();
  }
  get nodesNearDepth() {
    return this._nodesNearDepth;
  }
  set nodesNearDepth(value) {
    this._nodesNearDepth = value;
    this.updateNodesDepths();
  }
  get nodesFarDepth() {
    return this._nodesFarDepth;
  }
  set nodesFarDepth(value) {
    this._nodesFarDepth = value;
    this.updateNodesDepths();
  }
  get edgesNearDepth() {
    return this._edgesNearDepth;
  }
  set edgesNearDepth(value) {
    this._edgesNearDepth = value;
    this.updateEdgesDepths();
  }
  get edgesFarDepth() {
    return this._edgesFarDepth;
  }
  set edgesFarDepth(value) {
    this._edgesFarDepth = value;
    this.updateEdgesDepths();
  }
  get labelsNearDepth() {
    return this._labelsNearDepth;
  }
  set labelsNearDepth(value) {
    this._labelsNearDepth = value;
    this.updateLabelsDepths();
  }
  get labelsFarDepth() {
    return this._labelsFarDepth;
  }
  set labelsFarDepth(value) {
    this._labelsFarDepth = value;
    this.updateLabelsDepths();
  }
  render(context, mode, uniforms) {
    this.renderEdges(context, mode, uniforms);
    this.renderNodes(context, mode, uniforms);
    this.renderLabels(context, mode, uniforms);
  }
  renderNodes(context, mode, uniforms) {
    if (this._nodes && this._nodes.enabled) {
      this._nodes.render(context, mode, uniforms);
    }
  }
  renderEdges(context, mode, uniforms) {
    if (this._edges && this._edges.enabled) {
      this._edges.render(context, mode, uniforms);
    }
  }
  renderLabels(context, mode, uniforms) {
    if (this._labels && this.labels.enabled) {
      this._labels.render(context, mode, uniforms);
    }
  }
  updateLabelsDepths() {
    if (this._labels) {
      const depthRange = this._farDepth - this._nearDepth;
      this._labels.nearDepth = this._nearDepth + depthRange * this._labelsNearDepth;
      this._labels.farDepth = this._nearDepth + depthRange * this._labelsFarDepth;
    }
  }
  updateNodesDepths() {
    if (this._nodes) {
      const depthRange = this._farDepth - this._nearDepth;
      this._nodes.nearDepth = this._nearDepth + depthRange * this._nodesNearDepth;
      this._nodes.farDepth = this._nearDepth + depthRange * this._nodesFarDepth;
    }
  }
  updateEdgesDepths() {
    if (this._edges) {
      const depthRange = this._farDepth - this._nearDepth;
      this._edges.nearDepth = this._nearDepth + depthRange * this._edgesNearDepth;
      this._edges.farDepth = this._nearDepth + depthRange * this._edgesFarDepth;
    }
  }
};

// node_modules/@uncharted.software/grafer/build/lib/grafer/GraferController.js
var GraferController = class extends EventEmitter {
  get viewport() {
    return this._viewport;
  }
  get context() {
    return this.viewport.context;
  }
  get hasColors() {
    return this._hasColors;
  }
  constructor(canvas, data) {
    super();
    this._viewport = new Viewport(canvas);
    this._generateIdPrev = 0;
    const dolly = new ScrollDolly(this._viewport);
    dolly.enabled = true;
    const truck = new DragTruck(this._viewport);
    truck.button = "primary";
    truck.enabled = true;
    const rotation = new DragRotation(this._viewport);
    rotation.button = "secondary";
    rotation.enabled = true;
    const pan = new DragPan(this._viewport);
    pan.button = "auxiliary";
    pan.enabled = true;
    if (data) {
      this.loadData(data);
    }
  }
  generateId() {
    return this._generateIdPrev++;
  }
  loadData(data) {
    const pointsRadiusMapping = {radius: (entry) => "radius" in entry ? entry.radius : 1};
    this.loadColors(data);
    this.loadPoints(data, pointsRadiusMapping);
    this.loadLayers(data, pointsRadiusMapping);
    if (this._viewport.graph) {
      this._viewport.camera.position = [0, 0, -this._viewport.graph.bbCornerLength * 2];
      this._viewport.camera.farPlane = Math.max(this._viewport.graph.bbCornerLength * 4, 1e3);
      this._viewport.render();
    }
  }
  render() {
    if (this._viewport.graph) {
      this._viewport.render();
    } else {
      throw new Error("No graph found.");
    }
  }
  concatenateNodesFromLayers(data) {
    const nodes = [];
    const layers = data.layers;
    for (let i = 0, n = layers.length; i < n; ++i) {
      const data2 = layers[i].nodes?.data ?? layers[i].labels?.data;
      for (let ii = 0, nn = data2.length; ii < nn; ++ii) {
        data2[ii].point = this.generateId();
      }
      nodes.push(data2);
    }
    return nodes;
  }
  loadLayers(data, pointsRadiusMapping) {
    if (data.layers && data.layers.length) {
      const layers = data.layers;
      this._hasColors = Boolean(data.colors);
      if (!Boolean(this._viewport.graph)) {
        const nodes = this.concatenateNodesFromLayers(data);
        this._viewport.graph = Graph.createGraphFromNodes(this.context, nodes, pointsRadiusMapping);
        this._viewport.graph.picking = new PickingManager(this._viewport.context, this._viewport.mouseHandler);
      }
      for (let i = 0, n = layers.length; i < n; ++i) {
        const name = layers[i].name || `Layer_${i}`;
        this.addLayer(layers[i], name, this.hasColors);
      }
    }
  }
  addLayer(layer, name, useColors) {
    if (useColors && !this.hasColors) {
      throw new Error("No colors found.");
    }
    useColors = useColors ?? this.hasColors;
    const hasPoints = Boolean(this._viewport.graph);
    const graph = this._viewport.graph;
    const nodesData = layer.nodes;
    const nodes = this.addNodes(nodesData, useColors);
    const edgesData = layer.edges;
    if (edgesData && !nodes && !hasPoints) {
      throw new Error("Cannot load an edge-only layer in a graph without points!");
    }
    const edges = this.addEdges(edgesData, nodes, useColors);
    const layersData = layer.labels;
    const labels = this.addLabels(layersData, useColors);
    if (nodes || edges || labels) {
      const layer2 = new Layer(nodes, edges, labels, name);
      graph.layers.unshift(layer2);
      layer2.on(EventEmitter.omniEvent, (...args) => this.emit(...args));
    }
  }
  removeLayerByName(name) {
    const {layers} = this._viewport.graph;
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      if (layer.name === name) {
        this.removeLayerByIndex(i);
        i--;
      }
    }
  }
  removeLayerByIndex(index) {
    const {layers} = this._viewport.graph;
    if (index >= 0 && index < layers.length) {
      layers.splice(index, 1);
    }
  }
  addLabels(labelsData, hasColors) {
    const pickingManager = this._viewport.graph.picking;
    const context = this.context;
    const graph = this._viewport.graph;
    let labels = null;
    if (labelsData) {
      const labelsType = labelsData.type ? labelsData.type : "PointLabel";
      const LabelsClass = mod_exports3.types[labelsType] || mod_exports3.PointLabel;
      const labelsMappings = Object.assign({}, LabelsClass.defaultMappings, labelsData.mappings);
      if (!hasColors) {
        const colorMapping = labelsMappings.color;
        labelsMappings.color = (entry, i) => {
          const value = colorMapping(entry, i);
          if (typeof value !== "number") {
            return this._viewport.colorRegisrty.registerColor(value);
          }
          return value;
        };
      }
      labels = new LabelsClass(context, graph, labelsData.data, labelsMappings, pickingManager);
      if ("options" in labelsData) {
        const options = labelsData.options;
        const keys = Object.keys(options);
        for (const key of keys) {
          if (key in labels) {
            labels[key] = options[key];
          }
        }
      }
    }
    return labels;
  }
  addEdges(edgesData, nodes, hasColors) {
    const pickingManager = this._viewport.graph.picking;
    const context = this.context;
    const graph = this._viewport.graph;
    const hasPoints = Boolean(this._viewport.graph);
    let edges = null;
    if (edgesData) {
      const edgesType = edgesData.type ? edgesData.type : "Straight";
      const EdgesClass = mod_exports2.types[edgesType] || mod_exports2.Straight;
      const edgesMappings = Object.assign({}, EdgesClass.defaultMappings, edgesData.mappings);
      if (!hasPoints) {
        const sourceMapping = edgesMappings.source;
        edgesMappings.source = (entry, i) => {
          return nodes.getEntryPointID(sourceMapping(entry, i));
        };
        const targetMapping = edgesMappings.target;
        edgesMappings.target = (entry, i) => {
          return nodes.getEntryPointID(targetMapping(entry, i));
        };
      }
      if (!hasColors) {
        const sourceColorMapping = edgesMappings.sourceColor;
        edgesMappings.sourceColor = (entry, i) => {
          const value = sourceColorMapping(entry, i);
          if (typeof value !== "number") {
            return this._viewport.colorRegisrty.registerColor(value);
          }
          return value;
        };
        const targetColorMapping = edgesMappings.targetColor;
        edgesMappings.targetColor = (entry, i) => {
          const value = targetColorMapping(entry, i);
          if (typeof value !== "number") {
            return this._viewport.colorRegisrty.registerColor(value);
          }
          return value;
        };
      }
      edges = new EdgesClass(context, graph, edgesData.data, edgesMappings, pickingManager);
      if ("options" in edgesData) {
        const options = edgesData.options;
        const keys = Object.keys(options);
        for (const key of keys) {
          if (key in edges) {
            edges[key] = options[key];
          }
        }
      }
    }
    return edges;
  }
  addNodes(nodesData, hasColors) {
    const pickingManager = this._viewport.graph.picking;
    const context = this.context;
    const graph = this._viewport.graph;
    let nodes = null;
    if (nodesData) {
      const nodesType = nodesData.type ? nodesData.type : "Circle";
      const NodesClass = mod_exports.types[nodesType] || mod_exports.Circle;
      const nodesMappings = Object.assign({}, NodesClass.defaultMappings, nodesData.mappings);
      if (!hasColors) {
        const colorMapping = nodesMappings.color;
        nodesMappings.color = (entry, i) => {
          const value = colorMapping(entry, i);
          if (typeof value !== "number") {
            return this._viewport.colorRegisrty.registerColor(value);
          }
          return value;
        };
      }
      nodes = new NodesClass(context, graph, nodesData.data, nodesMappings, pickingManager);
      if ("options" in nodesData) {
        const options = nodesData.options;
        const keys = Object.keys(options);
        for (const key of keys) {
          if (key in nodes) {
            nodes[key] = options[key];
          }
        }
      }
    }
    return nodes;
  }
  loadPoints(data, pointsRadiusMapping) {
    if (data.points) {
      const mappings = Object.assign({}, pointsRadiusMapping, data.points.mappings);
      this._viewport.graph = new Graph(this._viewport.context, data.points.data, mappings);
      this._viewport.graph.picking = new PickingManager(this._viewport.context, this._viewport.mouseHandler);
    }
  }
  loadColors(data) {
    if (data.colors) {
      const colors = data.colors;
      const colorRegisrty = this._viewport.colorRegisrty;
      for (let i = 0, n = colors.length; i < n; ++i) {
        colorRegisrty.registerColor(colors[i]);
      }
    } else {
      this._viewport.colorRegisrty.registerColor("#d8dee9");
    }
  }
};

// node_modules/lit-html/lib/dom.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
var removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

// node_modules/lit-html/lib/template.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var marker = `{{lit-${String(Math.random()).slice(2)}}}`;
var nodeMarker = `<!--${marker}-->`;
var markerRegex = new RegExp(`${marker}|${nodeMarker}`);
var boundAttributeSuffix = "$lit$";
var Template = class {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = [];
    const walker = document.createTreeWalker(element.content, 133, null, false);
    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {strings, values: {length: length5}} = result;
    while (partIndex < length5) {
      const node = walker.nextNode();
      if (node === null) {
        walker.currentNode = stack.pop();
        continue;
      }
      index++;
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attributes = node.attributes;
          const {length: length6} = attributes;
          let count = 0;
          for (let i = 0; i < length6; i++) {
            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings[partIndex];
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({type: "attribute", index, name, strings: statics});
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings2 = data.split(markerRegex);
          const lastIndex = strings2.length - 1;
          for (let i = 0; i < lastIndex; i++) {
            let insert;
            let s = strings2[i];
            if (s === "") {
              insert = createMarker();
            } else {
              const match = lastAttributeNameRegex.exec(s);
              if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
              }
              insert = document.createTextNode(s);
            }
            parent.insertBefore(insert, node);
            this.parts.push({type: "node", index: ++index});
          }
          if (strings2[lastIndex] === "") {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings2[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({type: "node", index});
          if (node.nextSibling === null) {
            node.data = "";
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            this.parts.push({type: "node", index: -1});
            partIndex++;
          }
        }
      }
    }
    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }
};
var endsWith = (str6, suffix) => {
  const index = str6.length - suffix.length;
  return index >= 0 && str6.slice(index) === suffix;
};
var isTemplatePartActive = (part) => part.index !== -1;
var createMarker = () => document.createComment("");
var lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

// node_modules/lit-html/lib/modify-template.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var walkerNodeFilter = 133;
function removeNodesFromTemplate(template, nodesToRemove) {
  const {element: {content}, parts: parts2} = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts2);
  let part = parts2[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;
  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode;
    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    }
    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node);
      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    }
    if (currentRemovingNode !== null) {
      removeCount++;
    }
    while (part !== void 0 && part.index === nodeIndex) {
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
      partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
      part = parts2[partIndex];
    }
  }
  nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
var countNodes = (node) => {
  let count = node.nodeType === 11 ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
  while (walker.nextNode()) {
    count++;
  }
  return count;
};
var nextActiveIndexInTemplateParts = (parts2, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts2.length; i++) {
    const part = parts2[i];
    if (isTemplatePartActive(part)) {
      return i;
    }
  }
  return -1;
};
function insertNodeIntoTemplate(template, node, refNode = null) {
  const {element: {content}, parts: parts2} = template;
  if (refNode === null || refNode === void 0) {
    content.appendChild(node);
    return;
  }
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts2);
  let insertCount = 0;
  let walkerIndex = -1;
  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;
    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }
    while (partIndex !== -1 && parts2[partIndex].index === walkerIndex) {
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts2[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
        }
        return;
      }
      partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
    }
  }
}

// node_modules/lit-html/lib/directive.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var directives = new WeakMap();
var isDirective = (o) => {
  return typeof o === "function" && directives.has(o);
};

// node_modules/lit-html/lib/part.js
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var noChange = {};
var nothing = {};

// node_modules/lit-html/lib/template-instance.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var TemplateInstance = class {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i = 0;
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.setValue(values[i]);
      }
      i++;
    }
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts2 = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts2.length) {
      part = parts2[partIndex];
      if (!isTemplatePartActive(part)) {
        this.__parts.push(void 0);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part2 = this.processor.handleTextExpression(this.options);
        part2.insertAfterNode(node.previousSibling);
        this.__parts.push(part2);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
};

// node_modules/lit-html/lib/template-result.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", {createHTML: (s) => s});
var commentMarker = ` ${marker} `;
var TemplateResult = class {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  getHTML() {
    const l = this.strings.length - 1;
    let html2 = "";
    let isCommentBinding = false;
    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      const commentOpen = s.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        html2 += s + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        html2 += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }
    html2 += this.strings[l];
    return html2;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    let value = this.getHTML();
    if (policy !== void 0) {
      value = policy.createHTML(value);
    }
    template.innerHTML = value;
    return template;
  }
};

// node_modules/lit-html/lib/parts.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var isPrimitive = (value) => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
var isIterable = (value) => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
var AttributeCommitter = class {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts2 = this.parts;
    if (l === 1 && strings[0] === "" && strings[1] === "") {
      const v = parts2[0].value;
      if (typeof v === "symbol") {
        return String(v);
      }
      if (typeof v === "string" || !isIterable(v)) {
        return v;
      }
    }
    let text = "";
    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts2[i];
      if (part !== void 0) {
        const v = part.value;
        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === "string" ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === "string" ? t : String(t);
          }
        }
      }
    }
    text += strings[l];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
};
var AttributePart = class {
  constructor(committer) {
    this.value = void 0;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (isDirective(this.value)) {
      const directive2 = this.value;
      this.value = noChange;
      directive2(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
};
var NodePart = class {
  constructor(options) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.options = options;
  }
  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());
    part.__insert(this.endNode = createMarker());
  }
  insertAfterPart(ref) {
    ref.__insert(this.startNode = createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    const value = this.__pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance = new TemplateInstance(template, value.processor, this.options);
      const fragment = instance._clone();
      instance.update(value.values);
      this.__commitNode(fragment);
      this.value = instance;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === void 0) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
};
var BooleanAttributePart = class {
  constructor(element, name, strings) {
    this.value = void 0;
    this.__pendingValue = void 0;
    if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = noChange;
  }
};
var PropertyCommitter = class extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
};
var PropertyPart = class extends AttributePart {
};
var eventOptionsSupported = false;
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (_e) {
  }
})();
var EventPart = class {
  constructor(element, eventName, eventContext) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = (e) => this.handleEvent(e);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
};
var getOptions = (o) => o && (eventOptionsSupported ? {capture: o.capture, passive: o.passive, once: o.once} : o.capture);

// node_modules/lit-html/lib/template-factory.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);
  if (template === void 0) {
    template = new Template(result, result.getTemplateElement());
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
var templateCaches = new Map();

// node_modules/lit-html/lib/render.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var parts = new WeakMap();
var render = (result, container, options) => {
  let part = parts.get(container);
  if (part === void 0) {
    removeNodes(container, container.firstChild);
    parts.set(container, part = new NodePart(Object.assign({templateFactory}, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};

// node_modules/lit-html/lib/default-template-processor.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var DefaultTemplateProcessor = class {
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];
    if (prefix === ".") {
      const committer2 = new PropertyCommitter(element, name.slice(1), strings);
      return committer2.parts;
    }
    if (prefix === "@") {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === "?") {
      return [new BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new NodePart(options);
  }
};
var defaultTemplateProcessor = new DefaultTemplateProcessor();

// node_modules/lit-html/lit-html.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
if (typeof window !== "undefined") {
  (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.3.0");
}
var html = (strings, ...values) => new TemplateResult(strings, values, "html", defaultTemplateProcessor);

// node_modules/lit-html/lib/shady-render.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
var compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === "undefined") {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === "undefined") {
  console.warn(`Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
var shadyTemplateFactory = (scopeName) => (result) => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);
  let templateCache = templateCaches.get(cacheKey);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(cacheKey, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);
  if (template === void 0) {
    const element = result.getTemplateElement();
    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }
    template = new Template(result, element);
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
};
var TEMPLATE_TYPES = ["html", "svg"];
var removeStylesFromLitTemplates = (scopeName) => {
  TEMPLATE_TYPES.forEach((type) => {
    const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
    if (templates !== void 0) {
      templates.keyString.forEach((template) => {
        const {element: {content}} = template;
        const styles = new Set();
        Array.from(content.querySelectorAll("style")).forEach((s) => {
          styles.add(s);
        });
        removeNodesFromTemplate(template, styles);
      });
    }
  });
};
var shadyRenderSet = new Set();
var prepareTemplateStyles = (scopeName, renderedDOM, template) => {
  shadyRenderSet.add(scopeName);
  const templateElement = !!template ? template.element : document.createElement("template");
  const styles = renderedDOM.querySelectorAll("style");
  const {length: length5} = styles;
  if (length5 === 0) {
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    return;
  }
  const condensedStyle = document.createElement("style");
  for (let i = 0; i < length5; i++) {
    const style2 = styles[i];
    style2.parentNode.removeChild(style2);
    condensedStyle.textContent += style2.textContent;
  }
  removeStylesFromLitTemplates(scopeName);
  const content = templateElement.content;
  if (!!template) {
    insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
  } else {
    content.insertBefore(condensedStyle, content.firstChild);
  }
  window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
  const style = content.querySelector("style");
  if (window.ShadyCSS.nativeShadow && style !== null) {
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else if (!!template) {
    content.insertBefore(condensedStyle, content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    removeNodesFromTemplate(template, removes);
  }
};
var render2 = (result, container, options) => {
  if (!options || typeof options !== "object" || !options.scopeName) {
    throw new Error("The `scopeName` option is required.");
  }
  const scopeName = options.scopeName;
  const hasRendered = parts.has(container);
  const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11 && !!container.host;
  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  render(result, renderContainer, Object.assign({templateFactory: shadyTemplateFactory(scopeName)}, options));
  if (firstScopeRender) {
    const part = parts.get(renderContainer);
    parts.delete(renderContainer);
    const template = part.value instanceof TemplateInstance ? part.value.template : void 0;
    prepareTemplateStyles(scopeName, renderContainer, template);
    removeNodes(container, container.firstChild);
    container.appendChild(renderContainer);
    parts.set(container, part);
  }
  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};

// node_modules/lit-element/lib/updating-element.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
window.JSCompiler_renameProperty = (prop, _obj) => prop;
var defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? "" : null;
      case Object:
      case Array:
        return value == null ? value : JSON.stringify(value);
    }
    return value;
  },
  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;
      case Number:
        return value === null ? null : Number(value);
      case Object:
      case Array:
        return JSON.parse(value);
    }
    return value;
  }
};
var notEqual = (value, old) => {
  return old !== value && (old === old || value === value);
};
var defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
var STATE_HAS_UPDATED = 1;
var STATE_UPDATE_REQUESTED = 1 << 2;
var STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
var STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
var finalized = "finalized";
var UpdatingElement = class extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }
  static get observedAttributes() {
    this.finalize();
    const attributes = [];
    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);
      if (attr !== void 0) {
        this._attributeToPropertyMap.set(attr, p);
        attributes.push(attr);
      }
    });
    return attributes;
  }
  static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
      this._classProperties = new Map();
      const superProperties = Object.getPrototypeOf(this)._classProperties;
      if (superProperties !== void 0) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  static createProperty(name, options = defaultPropertyDeclaration) {
    this._ensureClassProperties();
    this._classProperties.set(name, options);
    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }
    const key = typeof name === "symbol" ? Symbol() : `__${name}`;
    const descriptor = this.getPropertyDescriptor(name, key, options);
    if (descriptor !== void 0) {
      Object.defineProperty(this.prototype, name, descriptor);
    }
  }
  static getPropertyDescriptor(name, key, options) {
    return {
      get() {
        return this[key];
      },
      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdateInternal(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(name) {
    return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
  }
  static finalize() {
    const superCtor = Object.getPrototypeOf(this);
    if (!superCtor.hasOwnProperty(finalized)) {
      superCtor.finalize();
    }
    this[finalized] = true;
    this._ensureClassProperties();
    this._attributeToPropertyMap = new Map();
    if (this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const props = this.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...typeof Object.getOwnPropertySymbols === "function" ? Object.getOwnPropertySymbols(props) : []
      ];
      for (const p of propKeys) {
        this.createProperty(p, props[p]);
      }
    }
  }
  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name === "string" ? name.toLowerCase() : void 0;
  }
  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === "function" ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  static _propertyValueToAttribute(value, options) {
    if (options.reflect === void 0) {
      return;
    }
    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  initialize() {
    this._updateState = 0;
    this._updatePromise = new Promise((res) => this._enableUpdatingResolver = res);
    this._changedProperties = new Map();
    this._saveInstanceProperties();
    this.requestUpdateInternal();
  }
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];
        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }
        this._instanceProperties.set(p, value);
      }
    });
  }
  _applyInstanceProperties() {
    this._instanceProperties.forEach((v, p) => this[p] = v);
    this._instanceProperties = void 0;
  }
  connectedCallback() {
    this.enableUpdating();
  }
  enableUpdating() {
    if (this._enableUpdatingResolver !== void 0) {
      this._enableUpdatingResolver();
      this._enableUpdatingResolver = void 0;
    }
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }
  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;
    const attr = ctor._attributeNameForProperty(name, options);
    if (attr !== void 0) {
      const attrValue = ctor._propertyValueToAttribute(value, options);
      if (attrValue === void 0) {
        return;
      }
      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }
  _attributeToProperty(name, value) {
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }
    const ctor = this.constructor;
    const propName = ctor._attributeToPropertyMap.get(name);
    if (propName !== void 0) {
      const options = ctor.getPropertyOptions(propName);
      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = ctor._propertyValueFromAttribute(value, options);
      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  requestUpdateInternal(name, oldValue, options) {
    let shouldRequestUpdate = true;
    if (name !== void 0) {
      const ctor = this.constructor;
      options = options || ctor.getPropertyOptions(name);
      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        }
        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === void 0) {
            this._reflectingProperties = new Map();
          }
          this._reflectingProperties.set(name, options);
        }
      } else {
        shouldRequestUpdate = false;
      }
    }
    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._updatePromise = this._enqueueUpdate();
    }
  }
  requestUpdate(name, oldValue) {
    this.requestUpdateInternal(name, oldValue);
    return this.updateComplete;
  }
  async _enqueueUpdate() {
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
    try {
      await this._updatePromise;
    } catch (e) {
    }
    const result = this.performUpdate();
    if (result != null) {
      await result;
    }
    return !this._hasRequestedUpdate;
  }
  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }
  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  performUpdate() {
    if (!this._hasRequestedUpdate) {
      return;
    }
    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }
    let shouldUpdate = false;
    const changedProperties = this._changedProperties;
    try {
      shouldUpdate = this.shouldUpdate(changedProperties);
      if (shouldUpdate) {
        this.update(changedProperties);
      } else {
        this._markUpdated();
      }
    } catch (e) {
      shouldUpdate = false;
      this._markUpdated();
      throw e;
    }
    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }
      this.updated(changedProperties);
    }
  }
  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  get updateComplete() {
    return this._getUpdateComplete();
  }
  _getUpdateComplete() {
    return this._updatePromise;
  }
  shouldUpdate(_changedProperties) {
    return true;
  }
  update(_changedProperties) {
    if (this._reflectingProperties !== void 0 && this._reflectingProperties.size > 0) {
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
      this._reflectingProperties = void 0;
    }
    this._markUpdated();
  }
  updated(_changedProperties) {
  }
  firstUpdated(_changedProperties) {
  }
};
_a = finalized;
UpdatingElement[_a] = true;

// node_modules/lit-element/lib/decorators.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var legacyCustomElement = (tagName, clazz) => {
  window.customElements.define(tagName, clazz);
  return clazz;
};
var standardCustomElement = (tagName, descriptor) => {
  const {kind, elements} = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }
  };
};
var customElement = (tagName) => (classOrDescriptor) => typeof classOrDescriptor === "function" ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
function query(selector, cache) {
  return (protoOrDescriptor, name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelector(selector);
      },
      enumerable: true,
      configurable: true
    };
    if (cache) {
      const key = typeof name === "symbol" ? Symbol() : `__${name}`;
      descriptor.get = function() {
        if (this[key] === void 0) {
          this[key] = this.renderRoot.querySelector(selector);
        }
        return this[key];
      };
    }
    return name !== void 0 ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
var legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};
var standardQuery = (descriptor, element) => ({
  kind: "method",
  placement: "prototype",
  key: element.key,
  descriptor
});
var ElementProto = Element.prototype;
var legacyMatches = ElementProto.msMatchesSelector || ElementProto.webkitMatchesSelector;

// node_modules/lit-element/lib/css-tag.js
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var constructionToken = Symbol();
var CSSResult = class {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
  }
  get styleSheet() {
    if (this._styleSheet === void 0) {
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();
        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }
    return this._styleSheet;
  }
  toString() {
    return this.cssText;
  }
};
var unsafeCSS = (value) => {
  return new CSSResult(String(value), constructionToken);
};
var textFromCSSResult = (value) => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
var css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};

// node_modules/lit-element/lit-element.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window["litElementVersions"] || (window["litElementVersions"] = [])).push("2.4.0");
var renderNotImplemented = {};
var LitElement = class extends UpdatingElement {
  static getStyles() {
    return this.styles;
  }
  static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) {
      return;
    }
    const userStyles = this.getStyles();
    if (Array.isArray(userStyles)) {
      const addStyles = (styles2, set7) => styles2.reduceRight((set8, s) => Array.isArray(s) ? addStyles(s, set8) : (set8.add(s), set8), set7);
      const set6 = addStyles(userStyles, new Set());
      const styles = [];
      set6.forEach((v) => styles.unshift(v));
      this._styles = styles;
    } else {
      this._styles = userStyles === void 0 ? [] : [userStyles];
    }
    this._styles = this._styles.map((s) => {
      if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
        const cssText = Array.prototype.slice.call(s.cssRules).reduce((css2, rule) => css2 + rule.cssText, "");
        return unsafeCSS(cssText);
      }
      return s;
    });
  }
  initialize() {
    super.initialize();
    this.constructor._getUniqueStyles();
    this.renderRoot = this.createRenderRoot();
    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  createRenderRoot() {
    return this.attachShadow({mode: "open"});
  }
  adoptStyles() {
    const styles = this.constructor._styles;
    if (styles.length === 0) {
      return;
    }
    if (window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
    } else if (supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
      this._needsShimAdoptedStyleSheets = true;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && window.ShadyCSS !== void 0) {
      window.ShadyCSS.styleElement(this);
    }
  }
  update(changedProperties) {
    const templateResult = this.render();
    super.update(changedProperties);
    if (templateResult !== renderNotImplemented) {
      this.constructor.render(templateResult, this.renderRoot, {scopeName: this.localName, eventContext: this});
    }
    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;
      this.constructor._styles.forEach((s) => {
        const style = document.createElement("style");
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  render() {
    return renderNotImplemented;
  }
};
LitElement["finalized"] = true;
LitElement.render = render2;

// node_modules/@uncharted.software/grafer/build/lib/grafer/GraferView.js
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
var GraferView = class extends LitElement {
  constructor() {
    super(...arguments);
    this._controller = null;
  }
  static get styles() {
    return css`
            :host {
                display: flex;
                align-items: stretch;
            }
            #grafer_canvas {
                flex-grow: 1;
                max-width: 100%;
                max-height: 100%;
            }
        `;
  }
  static get properties() {
    return {
      points: {type: Object},
      colors: {type: Object},
      layers: {type: Object}
    };
  }
  get controller() {
    return this._controller;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this._controller = new GraferController(this.canvas, {
      points: this.points,
      colors: this.colors,
      layers: this.layers
    });
    this._controller.on(EventEmitter.omniEvent, (event, ...args) => {
      const eventName = typeof event === "symbol" ? event.description : event;
      this.dispatchEvent(new CustomEvent(eventName, {detail: args}));
    });
  }
  render() {
    return html`<canvas id="grafer_canvas"></canvas>`;
  }
};
__decorate([
  query("#grafer_canvas", true)
], GraferView.prototype, "canvas", 2);
GraferView = __decorate([
  customElement("grafer-view")
], GraferView);

// node_modules/@dekkai/data-source/build/lib/mod.js
var import_moduleLoader4 = __toModule(require_moduleLoader());

// src/grafer/view.js
var import_chroma_js2 = __toModule(require_chroma());
async function parseJSONL(input, cb) {
  const file = await DataFile.fromRemoteSource(input);
  const sizeOf1MB = 1024 * 1024;
  const byteLength = await file.byteLength;
  const decoder = new TextDecoder();
  const lineBreak = "\n".charCodeAt(0);
  for (let offset = 0; offset <= byteLength; offset += sizeOf1MB) {
    const chunkEnd = Math.min(offset + sizeOf1MB, byteLength);
    const chunk = await file.loadData(offset, chunkEnd);
    const view = new DataView(chunk);
    let start = 0;
    for (let i = 0, n = chunk.byteLength; i < n; ++i) {
      if (view.getUint8(i) === lineBreak || offset + i === byteLength) {
        const statementBuffer = new Uint8Array(chunk, start, i - start);
        start = i + 1;
        const str6 = decoder.decode(statementBuffer);
        const json = JSON.parse(str6);
        cb(json);
      }
    }
    if (start < chunk.byteLength) {
      offset -= chunk.byteLength - start;
    }
  }
}
var kDataPackages = {
  adam_inferred: {
    points: "layouts/adam_d3js/inferred/points.jsonl",
    clusters: "layouts/adam_d3js/inferred/clusters.jsonl",
    clusterEdges: null,
    nodes: "layouts/adam_d3js/inferred/nodes.jsonl",
    nodeEdges: "layouts/adam_d3js/inferred/edges.jsonl"
  },
  adam_inferred_flat: {
    points: "layouts/adam_d3js/inferred_flat/points.jsonl",
    clusters: "layouts/adam_d3js/inferred_flat/clusters.jsonl",
    clusterEdges: null,
    nodes: "layouts/adam_d3js/inferred_flat/nodes.jsonl",
    nodeEdges: "layouts/adam_d3js/inferred_flat/edges.jsonl"
  }
};
var GraferView2 = class extends EventEmitter {
  constructor(container) {
    super();
    this.container = container;
    this.nodes = new Map();
    this.colors = this.getColors(container);
  }
  async init(dataPack) {
    const data = await this.loadData(dataPack in kDataPackages ? kDataPackages[dataPack] : kDataPackages.adam_inferred);
    this.controller = new GraferController(this.container, data);
    this.controller.on(mod_exports6.picking.PickingManager.events.click, (event, info) => {
      this.emit("node-clicked", this.nodes.get(info.id));
    });
    const color = (0, import_chroma_js2.default)(this.colors.background).rgba();
    vec4_exports.set(this.controller.viewport.clearColor, color[0] / 255, color[1] / 255, color[2] / 255, color[3]);
  }
  getWorldPointPosition(id) {
    const point = this.controller.viewport.graph.getPointIndex(id);
    const result = vec3_exports.create();
    if (point !== null) {
      const view = this.controller.viewport.graph.dataView;
      const index = point * 4 * 4;
      vec3_exports.set(result, view.getFloat32(index, true), view.getFloat32(index + 4, true), view.getFloat32(index + 8, true));
    }
    return result;
  }
  worldToPixel(position) {
    const camera = this.controller.viewport.camera;
    const renderMatrix = mat4_exports.mul(mat4_exports.create(), camera.projectionMatrix, camera.viewMatrix);
    mat4_exports.mul(renderMatrix, renderMatrix, this.controller.viewport.graph.matrix);
    const projected = vec4_exports.set(vec4_exports.create(), position[0], position[1], position[2], 1);
    vec4_exports.transformMat4(projected, projected, renderMatrix);
    const size = this.controller.viewport.size;
    const x = projected[0] / projected[3] * size[0] * 0.5 + size[0] * 0.5;
    const y = projected[1] / projected[3] * size[1] * 0.5 + size[1] * 0.5;
    return vec2_exports.set(vec2_exports.create(), x, y);
  }
  saveColor(key, value, colors, map) {
    const i = colors.indexOf(value);
    if (i === -1) {
      map.set(key, colors.length);
      colors.push(value);
    } else {
      map.set(key, i);
    }
  }
  getColors(element) {
    const style = getComputedStyle(element);
    const background = style.getPropertyValue("--grafer-background").trim();
    const nodes = style.getPropertyValue("--grafer-nodes").trim();
    const nodeEdges = style.getPropertyValue("--grafer-node-edges").trim();
    const clusters = style.getPropertyValue("--grafer-clusters").trim();
    const clusterEdges = style.getPropertyValue("--grafer-cluster-edges").trim();
    const values = [];
    const map = new Map();
    this.saveColor("nodes", nodes, values, map);
    this.saveColor("nodeEdges", nodeEdges, values, map);
    this.saveColor("clusters", clusters, values, map);
    this.saveColor("clusterEdges", clusterEdges, values, map);
    return {
      background,
      values,
      map
    };
  }
  async loadData(paths) {
    const points = {
      data: []
    };
    if (paths.points) {
      await parseJSONL(paths.points, (json) => {
        points.data.push(json);
      });
    }
    const clusterLayer = {
      name: "Clusters",
      labels: {
        type: "RingLabel",
        data: [],
        mappings: {
          background: () => false,
          fontSize: () => 14,
          padding: () => 0
        },
        options: {
          visibilityThreshold: 95,
          repeatLabel: 2,
          repeatGap: 32
        }
      },
      edges: {
        type: "ClusterBundle",
        data: [],
        options: {
          alpha: 0.04,
          nearDepth: 0.9
        }
      }
    };
    if (paths.clusters) {
      const nodes = clusterLayer.labels;
      await parseJSONL(paths.clusters, (json) => {
        nodes.data.push(Object.assign({}, json, {
          color: this.colors.map.get("clusters")
        }));
      });
    }
    if (paths.clusterEdges) {
      const edges = clusterLayer.edges;
      await parseJSONL(paths.clusterEdges, (json) => {
        edges.data.push(Object.assign({}, json, {
          sourceColor: this.colors.map.get("clusterEdges"),
          targetColor: this.colors.map.get("clusterEdges")
        }));
      });
    }
    const nodeLayer = {
      name: "Nodes",
      nodes: {
        type: "Circle",
        data: []
      },
      edges: {
        data: [],
        options: {
          alpha: 0.2,
          nearDepth: 0.9
        }
      }
    };
    if (paths.nodes) {
      const nodes = nodeLayer.nodes;
      await parseJSONL(paths.nodes, (json) => {
        this.nodes.set(json.id, json);
        nodes.data.push(Object.assign({}, json, {
          color: this.colors.map.get("nodes")
        }));
      });
    }
    if (paths.nodeEdges) {
      const edges = nodeLayer.edges;
      await parseJSONL(paths.nodeEdges, (json) => {
        edges.data.push(Object.assign({}, json, {
          sourceColor: this.colors.map.get("nodeEdges"),
          targetColor: this.colors.map.get("nodeEdges")
        }));
      });
    }
    const colors = this.colors.values;
    return {points, colors, layers: [nodeLayer, clusterLayer]};
  }
};

// src/twitter/tweet.js
var Tweet = class extends EventEmitter {
  constructor(container, node, twttr, theme, closeCB) {
    super();
    this.container = container;
    this.element = document.createElement("div");
    this.element.classList.add("tweet-container", "collapsable");
    this.container.insertBefore(this.element, this.container.firstChild);
    this.node = node;
    this.label = node.label;
    this.active = true;
    this.transitioning = false;
    const buttons = this.makeTweetButtons(closeCB);
    this.element.appendChild(buttons);
    const tweetText = this.makeTweetRaw(node.tweet);
    this.element.appendChild(tweetText);
    this.element.addEventListener("transitionstart", () => {
      this.transitioning = true;
      this.emitUpdate();
    });
    this.element.addEventListener("transitionend", () => {
      this.transitioning = false;
    });
    twttr.widgets.createTweet(node.label, this.element, {
      theme,
      width: 250,
      conversation: "none",
      align: "center"
    }).then((tweet) => {
      if (tweet) {
        this.element.removeChild(tweetText);
      }
      this.updateHeight();
    });
    this.element.style.height = "0";
    requestAnimationFrame(() => {
      this.updateHeight();
    });
  }
  remove() {
    this.active = false;
    this.element.style.height = "0";
    this.element.style.opacity = "0";
    this.element.style.margin = "0";
    this.element.style.padding = "0";
    this.element.addEventListener("transitionend", () => {
      if (this.container) {
        this.container.removeChild(this.element);
        this.emit("removed", this);
        this.container = null;
      }
    });
  }
  emitUpdate() {
    if (this.transitioning) {
      this.emit("updated", this);
      requestAnimationFrame(() => {
        this.emitUpdate();
      });
    }
  }
  updateHeight() {
    if (this.active) {
      const oldHeight = this.element.getBoundingClientRect().height;
      this.element.classList.remove("collapsable");
      this.element.style.height = "auto";
      const newHeight = this.element.getBoundingClientRect().height;
      this.element.classList.add("collapsable");
      this.element.style.height = `${oldHeight}px`;
      requestAnimationFrame(() => this.element.style.height = `${newHeight}px`);
    }
  }
  makeTweetButtons(closeCB) {
    const container = document.createElement("div");
    container.className = "tweet-container-buttons";
    container.textContent = "\u2716";
    container.addEventListener("click", closeCB);
    return container;
  }
  makeTweetRaw(tweet) {
    const tweetRaw = document.createElement("div");
    tweetRaw.className = "tweet-raw";
    const author = document.createElement("div");
    author.className = "tweet-raw-author";
    author.textContent = tweet.author;
    tweetRaw.appendChild(author);
    const user = document.createElement("div");
    user.className = "tweet-raw-user";
    user.textContent = `@${tweet.user}`;
    tweetRaw.appendChild(user);
    const text = document.createElement("div");
    text.className = "tweet-raw-text";
    text.textContent = tweet.text;
    tweetRaw.appendChild(text);
    return tweetRaw;
  }
};

// src/twitter/link.js
var Link = class {
  constructor(point, grafer) {
    this.point = point;
    this.lastTime = 0;
    this.progress = 0;
    this.maxProgress = 150;
    this.mult = 1;
    this.grafer = grafer;
    this.animating = false;
  }
  setAnimation(animation) {
    this.animating = true;
    this.lastTime = performance.now();
    this.mult = animation === "remove" ? -1 : 1;
  }
  draw(context, tweet, listBB, size) {
    const bb = tweet.element.getBoundingClientRect();
    const point = this.grafer.worldToPixel(this.point);
    let tweetY = bb.y + bb.height * 0.5;
    if (tweetY < listBB.top) {
      tweetY = listBB.top - (listBB.top - tweetY) * 0.025;
    } else if (tweetY > listBB.bottom) {
      tweetY = listBB.bottom + (tweetY - listBB.bottom) * 0.025;
    }
    const startX = point[0];
    const startY = size[1] - point[1];
    let endX = bb.x * window.devicePixelRatio;
    let endY = tweetY * window.devicePixelRatio;
    if (this.animating) {
      const time = performance.now();
      const progress = time - this.lastTime;
      this.lastTime = time;
      this.progress += progress * this.mult;
      if (this.mult > 0 && this.progress >= this.maxProgress) {
        this.progress = this.maxProgress;
        this.animating = false;
      } else if (this.mult < 0 && this.progress <= 0) {
        this.progress = 0;
        this.animating = false;
      }
    }
    const len5 = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    endX = startX + (endX - startX) / len5 * (this.progress / this.maxProgress) * len5;
    endY = startY + (endY - startY) / len5 * (this.progress / this.maxProgress) * len5;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }
};

// src/twitter/view.js
var TwitterView = class {
  constructor(container, grafer) {
    this.element = container;
    this.grafer = grafer;
    this.tweets = new Map();
    this.removingTweets = new Map();
    this.twttr = window.twttr;
    this.container = this.makeContainer();
    this.header = this.makeHeader();
    this.list = this.makeList();
    this.canvas = document.createElement("canvas");
    this.canvas.className = "twitter-links-canvas";
    this.element.appendChild(this.canvas);
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.context = this.canvas.getContext("2d");
    this.container.appendChild(this.header);
    this.container.appendChild(this.list);
    this.element.appendChild(this.container);
    const style = getComputedStyle(container);
    this.linkColor = style.getPropertyValue("--tweet-to-node").trim();
    this.tweetTheme = style.getPropertyValue("--tweet-theme").trim();
    this.initializeEvents();
  }
  initializeEvents() {
    let animationFrame = null;
    const animationCallback = () => {
      this.updateLinksCanvas();
      animationFrame = null;
    };
    const config = {attributes: true, childList: true, subtree: true};
    const observer = new MutationObserver(() => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animationCallback);
      }
    });
    observer.observe(this.list, config);
    this.list.addEventListener("scroll", () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animationCallback);
      }
    });
    const old_render = this.grafer.controller.viewport.render.bind(this.grafer.controller.viewport);
    this.grafer.controller.viewport.render = () => {
      old_render();
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animationCallback);
      }
    };
    this.tweetUpdated = () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animationCallback);
      }
    };
    this.tweetRemoved = (_, tweet) => {
      tweet.off("updated", this.tweetUpdated);
      tweet.off("removed", this.tweetRemoved);
      if (this.removingTweets.has(tweet.label)) {
        this.removingTweets.delete(tweet.label);
      }
      this.updateLinksCanvas();
    };
  }
  updateLinksCanvas() {
    const listBB = this.list.getBoundingClientRect();
    const size = this.grafer.controller.viewport.size;
    this.context.clearRect(0, 0, size[0], size[1]);
    this.context.strokeStyle = this.linkColor;
    this.context.lineWidth = 3;
    const allTweets = [...this.tweets.values(), ...this.removingTweets.values()];
    for (const info of allTweets) {
      info.link.draw(this.context, info.tweet, listBB, size);
    }
  }
  async displayTweet(node) {
    if (this.tweets.has(node.label)) {
      this.removeTweet(node.label);
    } else {
      const tweet = new Tweet(this.list, node, this.twttr, this.tweetTheme, () => {
        this.removeTweet(node.label);
      });
      const point = this.grafer.getWorldPointPosition(node.point);
      const link = new Link(point, this.grafer);
      link.setAnimation("add");
      this.tweets.set(node.label, {tweet, link});
      tweet.on("updated", this.tweetUpdated);
      tweet.on("removed", this.tweetRemoved);
    }
  }
  removeTweet(id) {
    const info = this.tweets.get(id);
    if (info) {
      info.tweet.remove();
      info.link.setAnimation("remove");
      this.tweets.delete(id);
      this.removingTweets.set(info.tweet.label, info);
    }
  }
  clearTweets() {
    for (const info of this.tweets.values()) {
      info.tweet.remove();
      info.link.setAnimation("remove");
      this.removingTweets.set(info.tweet.label, info);
    }
    this.tweets.clear();
  }
  makeEmptyElement(className) {
    const element = document.createElement("div");
    element.className = className;
    return element;
  }
  makeContainer() {
    return this.makeEmptyElement("twitter-panel");
  }
  makeHeader() {
    const header = this.makeEmptyElement("twitter-header");
    const title = this.makeEmptyElement("twitter-header-title");
    title.innerText = "D3 Tweets!";
    header.appendChild(title);
    const menu = this.makeEmptyElement("twitter-header-menu");
    const clear = document.createElement("span");
    clear.innerText = "clear";
    menu.appendChild(clear);
    header.appendChild(menu);
    clear.addEventListener("click", () => {
      this.clearTweets();
    });
    return header;
  }
  makeList() {
    return this.makeEmptyElement("twitter-list");
  }
};

// src/utils/easings.js
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// src/utils/download.js
function downloadObjectAsJson(exportObj, exportName) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

// src/snapshots/view.js
var tweetDelay = 200;
var animationDuration = 1500;
var maxAnimationDuration = 2e4;
var SnapshotsView = class {
  constructor(container, grafer, twitter, snapshots) {
    this.element = container;
    this.grafer = grafer;
    this.twitter = twitter;
    this.snapshots = snapshots || [];
    this.transitioning = false;
    this.description = "Add Description..";
    this.createSnapshotMenu();
  }
  createSnapshotMenu() {
    const el = document.createElement("div");
    el.className = "snapshot-menu";
    let current = -1;
    this.createSnapshotButton(el, "TAKE SNAPSHOT", () => {
      const cameraPosition = new Float32Array(this.grafer.controller.viewport.camera.position);
      const nodes = [];
      for (const info of this.twitter.tweets.values()) {
        nodes.push(info.tweet.node.id);
      }
      current = this.snapshots.length;
      this.snapshots.push({
        cameraPosition,
        nodes,
        description: this.description
      });
      console.log(this.snapshots[this.snapshots.length - 1]);
    });
    this.createSnapshotButton(el, "PREVIOUS", () => {
      if (!this.transitioning && current > 0) {
        this.showSnapshot(this.snapshots[--current]);
      }
    });
    this.createSnapshotButton(el, "NEXT", () => {
      if (!this.transitioning && current < this.snapshots.length - 1) {
        this.showSnapshot(this.snapshots[++current]);
      }
    });
    this.createDescriptionInputField(el);
    this.createSnapshotButton(el, "DOWNLOAD SNAPSHOTS", () => {
      const d = new Date();
      const exportFileName = `snapshots-${d.getMonth()}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
      downloadObjectAsJson(this.snapshots, exportFileName);
    });
    const inputEl = document.createElement("input");
    inputEl.id = "input-file-id";
    inputEl.className = "input-file";
    inputEl.type = "file";
    inputEl.addEventListener("change", () => {
      const snapshotFile = inputEl.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const snapshots = JSON.parse(reader.result);
        this.snapshots = snapshots;
      });
      reader.readAsText(snapshotFile);
    });
    el.appendChild(inputEl);
    this.element.appendChild(el);
  }
  showSnapshot(info) {
    const self2 = this;
    this.transitioning = true;
    const startPosition = vec3_exports.clone(this.grafer.controller.viewport.camera.position);
    const normal = vec3_exports.subtract(vec3_exports.create(), info.cameraPosition, startPosition);
    const distance4 = vec3_exports.len(normal);
    vec3_exports.set(normal, normal[0] / distance4, normal[1] / distance4, normal[2] / distance4);
    const targetTime = Math.min(maxAnimationDuration, animationDuration * Math.max(1, Math.abs(info.cameraPosition[2] - startPosition[2]) * 1e-3));
    let currentTime = 0;
    let time = performance.now();
    const animate = () => {
      if (currentTime >= targetTime) {
        this.transitioning = false;
        this.grafer.controller.viewport.camera.position = info.cameraPosition;
      } else {
        const progress = easeInOutCubic(currentTime / targetTime);
        this.grafer.controller.viewport.camera.position[0] = startPosition[0] + normal[0] * distance4 * progress;
        this.grafer.controller.viewport.camera.position[1] = startPosition[1] + normal[1] * distance4 * progress;
        this.grafer.controller.viewport.camera.position[2] = startPosition[2] + normal[2] * distance4 * progress;
        const now = performance.now();
        currentTime += now - time;
        time = now;
        requestAnimationFrame(() => animate());
      }
      this.grafer.controller.render();
    };
    animate();
    function updateTweets() {
      const snapshotTweets = new Set();
      const snapshotTweetsToNodesMap = new Map();
      for (const nodeID of info.nodes) {
        const node = self2.grafer.nodes.get(nodeID);
        snapshotTweets.add(node.label);
        snapshotTweetsToNodesMap.set(node.label, node);
      }
      const currentTweets = new Set(self2.twitter.tweets.keys());
      const tweetsToRemove = [...currentTweets].filter((tweet) => !snapshotTweets.has(tweet));
      const tweetsToAdd = [...snapshotTweets].filter((tweet) => !currentTweets.has(tweet));
      let delay = targetTime * 0.1;
      for (const tweet of tweetsToRemove) {
        setTimeout(() => self2.twitter.removeTweet(tweet), delay);
        delay += tweetDelay;
      }
      delay = targetTime * 0.9;
      for (const tweet of tweetsToAdd) {
        setTimeout(() => self2.twitter.displayTweet(snapshotTweetsToNodesMap.get(tweet)), delay);
        delay += tweetDelay * 3;
      }
    }
    updateTweets();
    document.getElementById("story-textarea-id").value = info.description;
  }
  createSnapshotButton(container, text, cb) {
    const el = document.createElement("div");
    el.className = "snapshot-button";
    el.innerText = text;
    el.addEventListener("click", cb);
    container.appendChild(el);
  }
  createDescriptionInputField(container) {
    const formEl = document.createElement("form");
    formEl.className = "description-form";
    const textInputEl = document.createElement("textarea");
    textInputEl.className = "story-textarea";
    textInputEl.id = "story-textarea-id";
    textInputEl.value = this.description;
    formEl.appendChild(textInputEl);
    textInputEl.addEventListener("change", (event) => {
      this.description = event.target.value;
    });
    container.appendChild(formEl);
  }
};

// src/main.js
function createLoading(container) {
  const el = document.createElement("div");
  el.className = "data-loading";
  const spinner = document.createElement("div");
  spinner.className = "lds-dual-ring";
  const label = document.createElement("div");
  label.className = "data-loading data-loading-label";
  label.innerText = "LOADING";
  el.appendChild(spinner);
  el.appendChild(label);
  container.appendChild(el);
  return el;
}
async function main() {
  const pathName = window.location.pathname;
  const pathComponents = pathName.split("/").filter((v) => Boolean(v));
  const dataPack = pathComponents.pop() || "adam_inferred";
  const grafer = new GraferView2(document.body);
  const loading = createLoading(document.body);
  grafer.init(dataPack).then(() => {
    const twitter = new TwitterView(document.body, grafer);
    grafer.on("node-clicked", (type, node) => {
      twitter.displayTweet(node);
    });
    loading.parentElement.removeChild(loading);
    const snapshots = [];
    new SnapshotsView(document.body, grafer, twitter, snapshots);
  });
}
main();
//# sourceMappingURL=main.js.map
