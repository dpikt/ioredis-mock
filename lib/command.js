'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCommand = createCommand;
exports.createBufferCommand = createBufferCommand;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function commandImpl(pipeline) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var lastArgIndex = args.length - 1;
    var callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      args.length = lastArgIndex; // eslint-disable-line no-param-reassign
    }

    return new _bluebird2.default(function (resolve) {
      return resolve(pipeline(args));
    }).asCallback(callback);
  };
}

function createCommand(emulate) {
  var pipeline = (0, _lodash.flowRight)([_utils.bufsToString, (0, _lodash.spread)(emulate), _utils.nonBufsToString]);
  return commandImpl(pipeline);
}

function createBufferCommand(emulate) {
  var pipeline = (0, _lodash.flowRight)([_utils.stringsToBuf, (0, _lodash.spread)(emulate), _utils.nonBufsToString]);
  return commandImpl(pipeline);
}