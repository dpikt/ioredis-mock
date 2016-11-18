'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = type;

var _lodash = require('lodash');

function type(key) {
  // eslint-disable-line consistent-return
  if (!this.data.has(key)) {
    return 'none';
  }

  var val = this.data.get(key);

  if (val instanceof Set) {
    return 'set';
  }

  if ((0, _lodash.isArray)(val)) {
    return 'list';
  }

  if ((0, _lodash.isString)(val)) {
    return 'string';
  }

  if ((0, _lodash.isPlainObject)(val)) {
    return 'hash';
  }
}