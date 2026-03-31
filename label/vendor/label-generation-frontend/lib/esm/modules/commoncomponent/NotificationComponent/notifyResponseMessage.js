import { notification } from 'antd';
import { STATUS } from '../../../utils/constants';
import '../../../CSS/NotificationStyle.css';
var notifyResponseMessage = function notifyResponseMessage(type, message) {
  var placement = 'topRight';
  switch (type) {
    case STATUS.SUCCESS:
      notification.success({
        message: "Success",
        description: message,
        placement,
        className: 'Modal-Style',
        duration: 3
      });
      break;
    case STATUS.ERROR:
      notification.warning({
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
export { notifyResponseMessage };
//# sourceMappingURL=notifyResponseMessage.js.map