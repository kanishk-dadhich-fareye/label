"use strict";

exports.__esModule = true;
exports.notifyResponseMessage = void 0;
var _antd = require("antd");
var _constants = require("../../../utils/constants");
require("../../../CSS/NotificationStyle.css");
const notifyResponseMessage = function (type, message) {
  let placement = 'topRight';
  switch (type) {
    case _constants.STATUS.SUCCESS:
      _antd.notification.success({
        message: "Success",
        description: message,
        placement,
        className: 'Modal-Style',
        duration: 3
      });
      break;
    case _constants.STATUS.ERROR:
      _antd.notification.warning({
        message: "Error",
        description: message,
        placement,
        className: 'Modal-Style-Error',
        duration: 10
      });
      break;
    default:
      return null;
  }
};
exports.notifyResponseMessage = notifyResponseMessage;
//# sourceMappingURL=notifyResponseMessage.js.map