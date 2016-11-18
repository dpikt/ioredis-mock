"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createData;
function createData(expires) {
  var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var raw = {};
  var data = Object.freeze({
    clear: function clear() {
      raw = {};
    },
    delete: function _delete(key) {
      if (expires.has(key)) {
        expires.delete(key);
      }

      delete raw[key];
    },
    get: function get(key) {
      if (expires.has(key) && expires.isExpired(key)) {
        this.delete(key);
      }

      return raw[key];
    },
    has: function has(key) {
      if (expires.has(key) && expires.isExpired(key)) {
        this.delete(key);
      }

      return {}.hasOwnProperty.call(raw, key);
    },
    keys: function keys() {
      return Object.keys(raw);
    },
    set: function set(key, val) {
      raw[key] = val;
    }
  });

  Object.keys(initial).forEach(function (key) {
    return data.set(key, initial[key]);
  });

  return data;
}