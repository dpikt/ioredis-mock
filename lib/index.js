'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _commands = require('./commands');

var commands = _interopRequireWildcard(_commands);

var _bufferMethods = require('./buffer-methods');

var _bufferMethods2 = _interopRequireDefault(_bufferMethods);

var _command2 = require('./command');

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _expires = require('./expires');

var _expires2 = _interopRequireDefault(_expires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedisMock = function () {
  function RedisMock() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$data = _ref.data,
        data = _ref$data === undefined ? {} : _ref$data;

    _classCallCheck(this, RedisMock);

    this.channels = {};
    this.batch = [];

    this.expires = (0, _expires2.default)();

    this.data = (0, _data2.default)(this.expires, data);

    // All commands
    Object.assign(this, (0, _lodash.chain)(commands).mapValues(function (command) {
      return command.bind(_this);
    }).mapValues(_command2.createCommand).value());

    // Buffer commands
    Object.assign(this, (0, _lodash.chain)(commands).pick(_bufferMethods2.default).mapValues(function (command) {
      return command.bind(_this);
    }).mapValues(_command2.createBufferCommand).mapKeys(function (_, name) {
      return name + 'Buffer';
    }).value());
  }

  _createClass(RedisMock, [{
    key: 'multi',
    value: function multi(batch) {
      var _this2 = this;

      this.batch = batch.map(function (_ref2) {
        var _command;

        var _ref3 = _toArray(_ref2),
            command = _ref3[0],
            options = _ref3.slice(1);

        return (_command = _this2[command]).bind.apply(_command, [_this2].concat(_toConsumableArray(options)));
      });

      return this;
    }
  }, {
    key: 'exec',
    value: function exec() {
      return Promise.all(this.batch.map(function (promise) {
        return promise();
      })).then(function (results) {
        return results.map(function (result) {
          return [null, result];
        });
      });
    }
  }]);

  return RedisMock;
}();

exports.default = RedisMock;