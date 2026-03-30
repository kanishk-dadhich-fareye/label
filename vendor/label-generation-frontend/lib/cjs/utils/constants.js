"use strict";

exports.__esModule = true;
exports.renderConstant = exports.VALIDATION_TYPE = exports.VALIDATION_RULES_TABLE_HEADER = exports.TEMPLATE_STATUS_MAP = exports.TEMPLATE_MODAL_TYPE = exports.SUB_FORM_CARD_CONST = exports.STATUS = exports.SPSL_CHECKS = exports.SHIPPER_SELECTED_FIELDS = exports.SHIPPER_NON_SELECTED_FIELDS = exports.REVERSE_CONNECTOR_TYPE = exports.RETURN_SELECTED_FIELDS = exports.RETURN_NON_SELECTED_FIELDS = exports.REGEX_GUIDE_TABLE_HEADER = exports.REGEX_CONSTANT = exports.REFERENCE_NUMBER_SELECTED_REGEX = exports.REFERENCE_NUMBER_NON_SELECTED_REGEX = exports.PINCODE_SELECTED_REGEX = exports.PINCODE_NON_SELECTED_REGEX = exports.PHONE_NUMBER_SELECTED_REGEX = exports.PHONE_NUMBER_NON_SELECTED_REGEX = exports.PARTY_MASTER_TYPE = exports.PARTY_MASTER_FORM_ELEMENTS = exports.PARTY_MASTER_BOOLEAN_OPTIONS_LIST = exports.PARTY_MASTER_API = exports.PARCEL_SHOP_MASTER_TABLE_HEADER = exports.PARCEL_SHOP_MASTER_FORM_ELEMENTS = exports.PARCEL_SHOP_MASTER_API = exports.PAGE_SIZE = exports.ORIGIN_SELECTED_FIELDS = exports.ORIGIN_NON_SELECTED_FIELDS = exports.ORDER_SELECTED_FIELDS = exports.ORDER_NON_SELECTED_FIELDS = exports.OPERATOR_CONSTANT = exports.OPERATOR = exports.OPERATIONS = exports.OPERATION = exports.MASTER_DATA_STRING_CONSTANTS = exports.MASTER_DATA_SETTING = exports.MASTER_DATA_INDEX = exports.LOGICAL_OPERATOR = exports.LEFT_TABS = exports.HELP_DOC = exports.FORM_TYPES_OBJ = exports.FORM_TYPES = exports.FORM_AND_CARD_ELEMENTS_CONST = exports.FIELDS_DATA_TYPES = exports.FIELDS_CONSTANT = exports.FIELDS_COLUMN = exports.EXCEL_CONSTANTS = exports.DROPDOWN_VALUE_CONST = exports.DESTINATION_SELECTED_FIELDS = exports.DESTINATION_NON_SELECTED_FIELDS = exports.DATA_VALIDATION = exports.DATA_INDEX = exports.CUSTOM_VALIDATION_MSG_MAP = exports.CONSTANT_ENUM = exports.CARRIER_SELECTED_FIELDS = exports.CARRIER_NON_SELECTED_FIELDS = exports.BASE_PATH_APIS = exports.AWB_STRING_CONSTANTS = exports.AWB_FORM_AND_CARD_TYPES = exports.AWB_ENTITY_TYPE = exports.AWB_DEFAULT_SUB_CARD_HEADING = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _ContainerConstants = require("./containerconstants/ContainerConstants");
var _content_copy = _interopRequireDefault(require("../images/content_copy.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const DATA_VALIDATION = exports.DATA_VALIDATION = {
  FIELDS: 'fields',
  VALIDATION_RULES: 'validation_rules',
  REGEX_GUIDE: 'regex_guide'
};
const EXCEL_CONSTANTS = exports.EXCEL_CONSTANTS = {
  INITIAL: 'INITIAL',
  UPLOADING: 'UPLOADING',
  UPLOAD_RESPONSE: 'UPLOAD_RESPONSE',
  ERROR: 'ERROR'
};
const LOGICAL_OPERATOR = exports.LOGICAL_OPERATOR = {
  AND: containerConstants.formatString(containerConstants.AND),
  OR: containerConstants.formatString(containerConstants.OR)
};
const LEFT_TABS = exports.LEFT_TABS = {
  PARTY_MASTER_TABPANE: 'party_master',
  PARCEL_SHOP_MASTER_TABPANE: 'parcel_shop_master'
};
const OPERATION = exports.OPERATION = {
  EDIT: 'edit'
};
const MASTER_DATA_INDEX = exports.MASTER_DATA_INDEX = {
  MERCHANT_CODE: 'merchantCode',
  TYPE: 'type',
  NAME: 'name',
  BILLING_ADDRESS: 'billingAddress',
  CONTACT_PERSON: 'contactPerson',
  CONTACT_NUMBER: 'contactNumber',
  EMAIL: 'email',
  RATE_CARD_CODE: 'rateCardCode',
  COMMISSION_CODE: 'commissionCode',
  BASE_ADDRESS: 'baseAddress',
  BASE_POSTAL_CODE: 'basePostalCode',
  BASE_LATITUDE: 'baseLatitude',
  BASE_LONGITUDE: 'baseLongitude',
  BRAND_EXPERIENCE: 'brandedExperience',
  NO_OF_RE_ATTEMPTS: 'numberOfReAttempts',
  ACCEPT_OVERAGE_PICKUP: 'acceptOveragePickup',
  THRESHOLD_NO_OF_PICKUP_SCAN: 'thresholdNumberForPickupScan',
  LINKED_TEMPLATE: 'linkedTemplate',
  ACTIVE: 'active',
  CODE: 'code',
  ADDRESS: 'address',
  PINCODE: 'pincode',
  GEO_LOCATION: 'geoLocation',
  ERROR_MSG: 'error_msg',
  FIELD_TYPE_SELECT: 'select',
  FIELD_TYPE_RADIO: 'radio'
};
const PARCEL_SHOP_MASTER_TABLE_HEADER = exports.PARCEL_SHOP_MASTER_TABLE_HEADER = [{
  width: 40,
  onCell: (record, rowIndex) => ({
    record,
    rowIndex
  }),
  fixed: 'left'
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500 fs10 lh18 text-upper"
  }, containerConstants.formatString(containerConstants.CODE)),
  width: 140,
  dataIndex: MASTER_DATA_INDEX.CODE,
  key: 'code',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal fs14 lh22"
  }, text)
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500 fs10 lh18 text-upper"
  }, containerConstants.formatString(containerConstants.NAME)),
  dataIndex: MASTER_DATA_INDEX.NAME,
  width: 140,
  key: '1',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal fs14 lh22"
  }, text)
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500 fs10 lh18 text-upper"
  }, containerConstants.formatString(containerConstants.CONTACT_NUMBER)),
  dataIndex: MASTER_DATA_INDEX.CONTACT_NUMBER,
  width: 140,
  key: '4',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal fs14 lh22"
  }, text)
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500 fs10 lh18 text-upper"
  }, containerConstants.formatString(containerConstants.ADDRESS)),
  dataIndex: MASTER_DATA_INDEX.ADDRESS,
  width: 140,
  key: '2',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal fs14 lh22"
  }, text)
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500 fs10 lh18 text-upper"
  }, containerConstants.formatString(containerConstants.PINCODE)),
  dataIndex: MASTER_DATA_INDEX.PINCODE,
  width: 140,
  key: '6',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal fs14 lh22"
  }, text)
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500 fs10 lh18 text-upper"
  }, containerConstants.formatString(containerConstants.GEO_LOCATION)),
  dataIndex: MASTER_DATA_INDEX.GEO_LOCATION,
  width: 140,
  key: '7',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal fs14 lh22"
  }, text)
}];
const OPERATOR = exports.OPERATOR = {
  GREATER_THAN: '1',
  LESS_THAN: '2',
  REQUIRED: '3',
  REGEX: '4',
  EQUALS_TO: '5',
  CONTAINS: '6',
  NOT_NULL: '8',
  NOT_EQUALS: '9',
  GREATER_THAN_EQUALS: '10',
  LESS_THAN_EQUALS: '11'
};
const OPERATOR_CONSTANT = exports.OPERATOR_CONSTANT = [{
  label: containerConstants.formatString(containerConstants.SELECT),
  value: ''
}, {
  label: containerConstants.formatString(containerConstants.GREATER_THAN),
  value: OPERATOR.GREATER_THAN
}, {
  label: containerConstants.formatString(containerConstants.REQUIRED),
  value: OPERATOR.REQUIRED
}, {
  label: containerConstants.formatString(containerConstants.REGEX),
  value: OPERATOR.REGEX
}, {
  label: containerConstants.formatString(containerConstants.LESS_THAN),
  value: OPERATOR.LESS_THAN
}, {
  label: containerConstants.formatString(containerConstants.CONTAINS),
  value: OPERATOR.CONTAINS
}, {
  label: containerConstants.formatString(containerConstants.NOT_EQUALS),
  value: OPERATOR.NOT_EQUALS
}, {
  label: containerConstants.formatString(containerConstants.EQUALS_TO),
  value: OPERATOR.EQUALS_TO
}, {
  label: containerConstants.formatString(containerConstants.NOT_NULL),
  value: OPERATOR.NOT_NULL
}, {
  label: containerConstants.formatString(containerConstants.GREATER_THAN_EQUALS),
  value: OPERATOR.GREATER_THAN_EQUALS
}, {
  label: containerConstants.formatString(containerConstants.LESS_THAN_EQUALS),
  value: OPERATOR.LESS_THAN_EQUALS
}];
const FIELDS_COLUMN = exports.FIELDS_COLUMN = [{
  title: 'Type',
  dataIndex: 'text',
  key: 'text',
  className: 'left-tabs ant-tabs-nav'
}];
const STATUS = exports.STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  FAILED: 'FAILED',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  INPROGRESS: 'INPROGRESS',
  DRAFT: 'DRAFT'
};
const FIELDS_CONSTANT = exports.FIELDS_CONSTANT = {
  ORIGIN: containerConstants.formatString(containerConstants.ORIGIN),
  DESTINATION: containerConstants.formatString(containerConstants.DESTINATION),
  RETURN: containerConstants.formatString(containerConstants.RETURN),
  ORDER: containerConstants.formatString(containerConstants.SHIPMENT),
  SHIPPER: containerConstants.formatString(containerConstants.SHIPPER),
  CARRIER: containerConstants.formatString(containerConstants.CARRIER)
};
const CONSTANT_ENUM = exports.CONSTANT_ENUM = {
  ORIGIN: 'ORIGIN',
  DESTINATION: 'DESTINATION',
  RETURN: 'RETURN',
  ORDER: 'ORDER',
  SHIPPER: 'SHIPPER',
  CARRIER: 'CARRIER',
  PINCODE: 'pinCode',
  PHONE_NUMBER: 'phoneNumber',
  REFERENCE_NUMBER: 'referenceNumber'
};
const REGEX_CONSTANT = exports.REGEX_CONSTANT = {
  PINCODE: containerConstants.formatString(containerConstants.PINCODE),
  PHONE_NUMBER: containerConstants.formatString(containerConstants.PHONE_NUMBER),
  REFERENCE_NUMBER: containerConstants.formatString(containerConstants.REFERENCE_NUMBER)
};
const ORIGIN_SELECTED_FIELDS = exports.ORIGIN_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "  font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.ORIGIN)),
  name: FIELDS_CONSTANT.ORIGIN
};
const ORIGIN_NON_SELECTED_FIELDS = exports.ORIGIN_NON_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.ORIGIN)),
  name: FIELDS_CONSTANT.ORIGIN
};
const DESTINATION_SELECTED_FIELDS = exports.DESTINATION_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.DESTINATION)),
  name: FIELDS_CONSTANT.ORIGIN
};
const DESTINATION_NON_SELECTED_FIELDS = exports.DESTINATION_NON_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22 ",
    type: "link"
  }, FIELDS_CONSTANT.DESTINATION)),
  name: FIELDS_CONSTANT.DESTINATION
};
const RETURN_SELECTED_FIELDS = exports.RETURN_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "  font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.RETURN)),
  name: FIELDS_CONSTANT.RETURN
};
const RETURN_NON_SELECTED_FIELDS = exports.RETURN_NON_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.RETURN)),
  name: FIELDS_CONSTANT.RETURN
};
const ORDER_SELECTED_FIELDS = exports.ORDER_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.ORDER)),
  name: FIELDS_CONSTANT.ORDER
};
const ORDER_NON_SELECTED_FIELDS = exports.ORDER_NON_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22 ",
    type: "link"
  }, FIELDS_CONSTANT.ORDER)),
  name: FIELDS_CONSTANT.ORDER
};
const SHIPPER_SELECTED_FIELDS = exports.SHIPPER_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "  font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.SHIPPER)),
  name: FIELDS_CONSTANT.SHIPPER
};
const SHIPPER_NON_SELECTED_FIELDS = exports.SHIPPER_NON_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.SHIPPER)),
  name: FIELDS_CONSTANT.SHIPPER
};
const CARRIER_SELECTED_FIELDS = exports.CARRIER_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, FIELDS_CONSTANT.CARRIER)),
  name: FIELDS_CONSTANT.CARRIER
};
const CARRIER_NON_SELECTED_FIELDS = exports.CARRIER_NON_SELECTED_FIELDS = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22 ",
    type: "link"
  }, FIELDS_CONSTANT.CARRIER)),
  name: FIELDS_CONSTANT.CARRIER
};
const OPERATIONS = exports.OPERATIONS = {
  ADD: 'ADD',
  SHOW: 'SHOW',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  EDIT_VALIDATION: 'EDIT_VALIDATION'
};
const getConditionLabel = text => {
  let label = '';
  OPERATOR_CONSTANT.forEach(obj => obj.value === text ? label = obj.label : '-');
  return label;
};
const VALIDATION_RULES_TABLE_HEADER = exports.VALIDATION_RULES_TABLE_HEADER = [{
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500  fs10 ls18",
    style: {
      color: '#727272',
      textTransform: 'uppercase'
    }
  }, containerConstants.formatString(containerConstants.RULE_NAME)),
  dataIndex: 'ruleName',
  width: '36%',
  key: 'ruleName',
  onCell: (record, rowIndex) => ({
    record,
    rowIndex
  })
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500  fs10 ls18",
    style: {
      color: '#727272',
      textTransform: 'uppercase'
    }
  }, containerConstants.formatString(containerConstants.CONDITION)),
  dataIndex: 'condition',
  width: '32%',
  key: 'condition',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal  fs12 ls18",
    style: {
      color: '#212121',
      'alignItems': 'center',
      'display': 'flex'
    }
  }, text ? getConditionLabel(text) : '-')
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500  fs10 ls18",
    style: {
      color: '#727272',
      textTransform: 'uppercase'
    }
  }, containerConstants.formatString(containerConstants.RIGHT_VALUE)),
  dataIndex: 'rightValue',
  width: '32%',
  key: 'rightValue',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal  fs12 ls18",
    style: {
      color: '#212121',
      'alignItems': 'center',
      'display': 'flex'
    }
  }, text ? text : '-')
}];
const REGEX_GUIDE_TABLE_HEADER = exports.REGEX_GUIDE_TABLE_HEADER = [{
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500  fs10 ls18",
    style: {
      color: '#727272',
      textTransform: 'uppercase'
    }
  }, containerConstants.formatString(containerConstants.S_NO)),
  dataIndex: 'serialNumber',
  width: '5%',
  key: 'serialNumber',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal  fs12 ls18",
    style: {
      color: '#212121',
      'alignItems': 'center',
      'display': 'flex'
    }
  }, text)
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500  fs10 ls18",
    style: {
      color: '#727272',
      textTransform: 'uppercase'
    }
  }, containerConstants.formatString(containerConstants.COUNTRY)),
  dataIndex: 'country',
  width: '48%',
  key: 'country',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal  fs12 ls18",
    style: {
      color: '#212121',
      'alignItems': 'center',
      'display': 'flex'
    }
  }, text)
}, {
  title: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-500  fs10 ls18",
    style: {
      color: '#727272',
      textTransform: 'uppercase'
    }
  }, containerConstants.formatString(containerConstants.REGEX)),
  dataIndex: 'regex',
  width: '47%',
  key: 'regex',
  render: text => /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-normal  fs12 ls18",
    style: {
      color: '#212121',
      'alignItems': 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      float: 'left'
    }
  }, text), /*#__PURE__*/_react.default.createElement("img", {
    src: _content_copy.default,
    alt: "Imgage not found",
    onClick: () => {
      navigator.clipboard.writeText(text);
      info();
    },
    style: {
      cursor: 'pointer',
      float: 'right'
    }
  }))
}];
const info = () => {
  _antd.message.success('copied!');
};
const PINCODE_SELECTED_REGEX = exports.PINCODE_SELECTED_REGEX = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "  font-family-weight-500 fs14 ls22",
    type: "link"
  }, REGEX_CONSTANT.PINCODE)),
  name: REGEX_CONSTANT.PINCODE
};
const PINCODE_NON_SELECTED_REGEX = exports.PINCODE_NON_SELECTED_REGEX = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, REGEX_CONSTANT.PINCODE)),
  name: REGEX_CONSTANT.PINCODE
};
const PHONE_NUMBER_SELECTED_REGEX = exports.PHONE_NUMBER_SELECTED_REGEX = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "  font-family-weight-500 fs14 ls22",
    type: "link"
  }, REGEX_CONSTANT.PHONE_NUMBER)),
  name: REGEX_CONSTANT.PHONE_NUMBER
};
const PHONE_NUMBER_NON_SELECTED_REGEX = exports.PHONE_NUMBER_NON_SELECTED_REGEX = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, REGEX_CONSTANT.PHONE_NUMBER)),
  name: REGEX_CONSTANT.PHONE_NUMBER
};
const REFERENCE_NUMBER_SELECTED_REGEX = exports.REFERENCE_NUMBER_SELECTED_REGEX = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-tabs-tab-active"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "  font-family-weight-500 fs14 ls22",
    type: "link"
  }, REGEX_CONSTANT.REFERENCE_NUMBER)),
  name: REGEX_CONSTANT.REFERENCE_NUMBER
};
const REFERENCE_NUMBER_NON_SELECTED_REGEX = exports.REFERENCE_NUMBER_NON_SELECTED_REGEX = {
  text: /*#__PURE__*/_react.default.createElement("div", {
    className: "left-inactive-tab"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    id: "color-727272",
    className: "font-family-weight-500 fs14 ls22",
    type: "link"
  }, REGEX_CONSTANT.REFERENCE_NUMBER)),
  name: REGEX_CONSTANT.REFERENCE_NUMBER
};
const AWB_STRING_CONSTANTS = exports.AWB_STRING_CONSTANTS = {
  PARTY_CODE: containerConstants.formatString(containerConstants.PARTY_CODE),
  PARTY_NAME: containerConstants.formatString(containerConstants.PARTY_NAME),
  TYPE: containerConstants.formatString(containerConstants.TYPE),
  SERIES: containerConstants.formatString(containerConstants.SERIES),
  CHECKSUM: containerConstants.formatString(containerConstants.CHECKSUM),
  EXTERNAL_SYSTEM: containerConstants.formatString(containerConstants.EXTERNAL_SYSTEM),
  REGEX: containerConstants.formatString(containerConstants.REGEX),
  START_WITH: containerConstants.formatString(containerConstants.START_WITH),
  ENDS_WITH: containerConstants.formatString(containerConstants.ENDS_WITH),
  START_RANGE: containerConstants.formatString(containerConstants.START_RANGE),
  END_RANGE: containerConstants.formatString(containerConstants.END_RANGE),
  RUNNING_NUMBER: containerConstants.formatString(containerConstants.RUNNING_NUMBER),
  LENGTH_OF_AWB: containerConstants.formatString(containerConstants.LENGTH_OF_AWB),
  CHECK_DIGIT: containerConstants.formatString(containerConstants.CHECK_DIGIT),
  SNO_START_POSITION: containerConstants.formatString(containerConstants.SNO_START_POSITION),
  SNO_END_POSITION: containerConstants.formatString(containerConstants.SNO_END_POSITION),
  MOD_BY: containerConstants.formatString(containerConstants.MOD_BY),
  END_POINT: containerConstants.formatString(containerConstants.END_POINT),
  TIMEOUT_SECONDS: containerConstants.formatString(containerConstants.TIMEOUT_SECONDS),
  NO_OF_RE_ATTEMPTS: containerConstants.formatString(containerConstants.NO_OF_RE_ATTEMPTS),
  STANDARD: containerConstants.formatString(containerConstants.STANDARD),
  PLACEHOLDER: containerConstants.formatString(containerConstants.PLACEHOLDER),
  IS_LEADING_ZERO_APPENDED: containerConstants.formatString("is Leading Zero required?"),
  HYBRID: containerConstants.formatString("Hybrid"),
  CHECK_DIGIT: containerConstants.formatString("Check Digit"),
  BASE: containerConstants.formatString("base")
};
const AWB_DEFAULT_SUB_CARD_HEADING = exports.AWB_DEFAULT_SUB_CARD_HEADING = {
  series: containerConstants.formatString(containerConstants.SERIES),
  checksum: containerConstants.formatString(containerConstants.CHECKSUM),
  external_system: containerConstants.formatString(containerConstants.EXTERNAL_SYSTEM),
  regex: containerConstants.formatString(containerConstants.REGEX),
  hybrid: containerConstants.formatString("Hybrid"),
  check_digit: containerConstants.formatString("Check Digit")
};
const AWB_ENTITY_TYPE = exports.AWB_ENTITY_TYPE = {
  SERIES: 'series',
  CHECKSUM: 'checksum',
  EXTERNAL_SYSTEM: 'external_system',
  REGEX: 'regex',
  HYBRID: 'hybrid',
  CHECK_DIGIT: 'check_digit'
};
const DROPDOWN_VALUE_CONST = exports.DROPDOWN_VALUE_CONST = [{
  value: "series",
  option: AWB_STRING_CONSTANTS.SERIES
}, {
  value: "regex",
  option: AWB_STRING_CONSTANTS.REGEX
}, {
  value: "checksum",
  option: AWB_STRING_CONSTANTS.CHECKSUM
}, {
  value: "check_digit",
  option: AWB_STRING_CONSTANTS.CHECK_DIGIT
}, {
  value: "external_system",
  option: AWB_STRING_CONSTANTS.EXTERNAL_SYSTEM
}, {
  value: "hybrid",
  option: AWB_STRING_CONSTANTS.HYBRID
}];
const FORM_TYPES = exports.FORM_TYPES = ['Default', 'Custom'];
const FORM_TYPES_OBJ = exports.FORM_TYPES_OBJ = {
  'DEFAULT': 'Default',
  'CUSTOM': 'Custom'
};
const AWB_FORM_AND_CARD_TYPES = exports.AWB_FORM_AND_CARD_TYPES = {
  SERIES: 'series',
  CHECKSUM: 'checksum',
  EXTERNAL_SYSTEM: 'external_system',
  REGEX: 'regex',
  HYBRID: 'hybrid',
  CHECK_DIGIT: 'check_digit'
};
const SUB_FORM_CARD_CONST = exports.SUB_FORM_CARD_CONST = [{
  title: AWB_STRING_CONSTANTS.SERIES,
  subCard: AWB_FORM_AND_CARD_TYPES.SERIES
}, {
  title: AWB_STRING_CONSTANTS.CHECKSUM,
  subCard: AWB_FORM_AND_CARD_TYPES.CHECKSUM
}, {
  title: AWB_STRING_CONSTANTS.EXTERNAL_SYSTEM,
  subCard: AWB_FORM_AND_CARD_TYPES.EXTERNAL_SYSTEM
}, {
  title: AWB_STRING_CONSTANTS.REGEX,
  subCard: AWB_FORM_AND_CARD_TYPES.REGEX
}, {
  title: AWB_STRING_CONSTANTS.HYBRID,
  subCard: AWB_FORM_AND_CARD_TYPES.HYBRID
}, {
  title: AWB_STRING_CONSTANTS.CHECK_DIGIT,
  subCard: AWB_FORM_AND_CARD_TYPES.CHECK_DIGIT
}];
const PAGE_SIZE = exports.PAGE_SIZE = {
  PAGE_10: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-400 font-s14 font-h22",
    style: {
      color: '#212121'
    }
  }, "10 / page"),
  PAGE_20: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-400 font-s14 font-h22",
    style: {
      color: '#212121'
    }
  }, "20 / page"),
  PAGE_50: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-400 font-s14 font-h22",
    style: {
      color: '#212121'
    }
  }, "50 / page"),
  PAGE_100: /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-400 font-s14 font-h22",
    style: {
      color: '#212121'
    }
  }, "100 / page")
};
const DATA_INDEX = exports.DATA_INDEX = {
  LINKED_PARTIES: 'linkedParties',
  TEMPLATE_CODE: 'templateCode',
  PARTY_CODE: 'partyCode',
  PARTY_NAME: 'name',
  TYPE: 'shipmentNumberType',
  SELECTED_FORM: 'shipmentNumberGenerationType',
  START_WITH: 'startWith',
  ENDS_WITH: 'endWith',
  START_RANGE: 'startRange',
  END_RANGE: 'endRange',
  RUNNING_NUMBER: 'runningNumber',
  LENGTH_OF_AWB: 'shipmentNumberLength',
  CHECK_DIGIT: 'checkDigit',
  SNO_START_POSITION: 'startPosition',
  SNO_END_POSITION: 'endPosition',
  MOD_BY: 'modBy',
  END_POINT: 'externalEndPoint',
  TIMEOUT_SECONDS: 'timeout',
  NO_OF_RE_ATTEMPTS: 'numberOfReattempt',
  STANDARD: 'regex',
  KEY: 'key',
  FIELD_TYPE_INPUT: 'input',
  FIELD_TYPE_SELECT: 'select',
  ERROR_MSG: 'error_msg',
  TEMPLATE_NAME: 'templateName',
  PAGE_SIZE: 'pageSize',
  ELEMENT_OPTIONS: 'element_options',
  TEMPLATE_STATUS: 'templateStatus',
  TEMPLATE_ID: 'templateId',
  TEMPLATE_SCRIPT: 'script',
  CREATED_AT: 'createdAt',
  LAST_MODIFIED_AT: 'lastModifiedAt',
  STATUS: 'status',
  NAME: 'name',
  IS_ACTIVE: 'isActive',
  IS_LEADING_ZERO_APPENDED: 'isLeadingZeroAppended',
  START_WITH_HYBRID: 'startWithHybrid',
  ENDS_WITH_HYBRID: 'endWithHybrid',
  START_RANGE_HYBRID: 'startRangeHybrid',
  END_RANGE_HYBRID: 'endRangeHybrid',
  RUNNING_NUMBER_HYBRID: 'runningNumberHybrid',
  MOD_BY_HYBRID: 'modByHybrid',
  IS_LEADING_ZERO_APPENDED_HYBRID: 'isLeadingZeroAppendedHybrid',
  START_WITH_CHECK_DIGIT: 'startWithCheckDigit',
  ENDS_WITH_CHECK_DIGIT: 'endWithCheckDigit',
  START_RANGE_CHECK_DIGIT: 'startRangeCheckDigit',
  END_RANGE_CHECK_DIGIT: 'endRangeCheckDigit',
  RUNNING_NUMBER_CHECK_DIGIT: 'runningNumberCheckDigit',
  BASE_CHECK_DIGIT: 'baseCheckDigit',
  IS_LEADING_ZERO_APPENDED_CHECK_DIGIT: 'isLeadingZeroAppendedCheckDigit'
};
const renderConstant = exports.renderConstant = {
  INITIAL: 'INITIAL',
  UPLOADING: 'UPLOADING',
  UPLOAD_RESPONSE: 'UPLOAD_RESPONSE',
  ERROR: 'ERROR'
};
const DROPDOWN_TIMEOUT_OPTIONS = [5, 10, 15, 20, 25, 30];
const DROPDOWN_RE_ATTEMPTS_OPTIONS = [1, 2, 3];
const DROPDOWN_LEADING_ZERO = [true, false];
const FIELDS_DATA_TYPES = exports.FIELDS_DATA_TYPES = {
  STRING: 'text',
  NUMBER: 'number',
  NUM: 'num'
};
const VALIDATION_TYPE = exports.VALIDATION_TYPE = {
  EMPTY: 1,
  DATA_TYPE: 2,
  CUSTOM: 3
};
const SPSL_CHECKS = exports.SPSL_CHECKS = {
  NOT_CONTAIN_DOT: 'NOT_CONTAIN_DOT',
  GREATER_THAN_EQUALS_TO_ZERO: 'GREATER_THAN_EQUALS_TO_ZERO',
  GREATER_THAN_ZERO: 'GREATER_THAN_ZERO',
  GREATER_THAN_EQUALS_TO_START_RANGE: 'GREATER_THAN_START_RANGE',
  LESS_THAN_EQUALS_TO_END_RANGE: 'LESS_THAN_EQUAL_TO_END_RANGE',
  LESS_THAN_EQUALS_TO_RUNNING_NUM: 'LESS_THAN_EQUALS_TO_RUNNING_NUM',
  LESS_THAN_EQUALS_TO_END_POSITION: 'LESS_THAN_EQUALS_TO_END_POSITION',
  GREATER_THAN_EQUALS_TO_START_POSITION: 'GREATER_THAN_EQUALS_TO_START_POSITION',
  LESS_THAN_EQUALS_TO_LENGTH_OF_SHIPMENT_NUM: 'LESS_THAN_EQUALS_TO_LENGTH_OF_SHIPMENT_NUM'
};
const REVERSE_CONNECTOR_TYPE = exports.REVERSE_CONNECTOR_TYPE = {
  ADD_PROCESS: 'Add Process'
};
const FORM_AND_CARD_ELEMENTS_CONST = exports.FORM_AND_CARD_ELEMENTS_CONST = {
  series: [{
    label: AWB_STRING_CONSTANTS.START_WITH,
    name: DATA_INDEX.START_WITH,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.STRING,
    editable: false
  }, {
    label: AWB_STRING_CONSTANTS.ENDS_WITH,
    name: DATA_INDEX.ENDS_WITH,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.STRING,
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.START_RANGE,
    name: DATA_INDEX.START_RANGE,
    spanSize: 5,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.END_RANGE,
    name: DATA_INDEX.END_RANGE,
    spanSize: 5,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.RUNNING_NUMBER,
    name: DATA_INDEX.RUNNING_NUMBER,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
    name: DATA_INDEX.IS_LEADING_ZERO_APPENDED,
    spanSize: 4,
    fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
    options: DROPDOWN_LEADING_ZERO,
    spslChecks: [],
    editable: true
  }],
  checksum: [{
    label: AWB_STRING_CONSTANTS.LENGTH_OF_AWB,
    name: DATA_INDEX.LENGTH_OF_AWB,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.CHECK_DIGIT,
    name: DATA_INDEX.CHECK_DIGIT,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.NUM,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.SNO_START_POSITION,
    name: DATA_INDEX.SNO_START_POSITION,
    spanSize: 5,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.SNO_END_POSITION,
    name: DATA_INDEX.SNO_END_POSITION,
    spanSize: 5,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.MOD_BY,
    name: DATA_INDEX.MOD_BY,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }],
  external_system: [{
    label: AWB_STRING_CONSTANTS.END_POINT,
    name: DATA_INDEX.END_POINT,
    spanSize: null,
    dataType: FIELDS_DATA_TYPES.STRING,
    fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.TIMEOUT_SECONDS,
    name: DATA_INDEX.TIMEOUT_SECONDS,
    spanSize: null,
    fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
    options: DROPDOWN_TIMEOUT_OPTIONS,
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.NO_OF_RE_ATTEMPTS,
    name: DATA_INDEX.NO_OF_RE_ATTEMPTS,
    spanSize: null,
    fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
    options: DROPDOWN_RE_ATTEMPTS_OPTIONS,
    editable: true
  }],
  regex: [{
    label: AWB_STRING_CONSTANTS.STANDARD,
    name: DATA_INDEX.STANDARD,
    spanSize: null,
    dataType: FIELDS_DATA_TYPES.STRING,
    editable: true
  }],
  partyCode: [{
    label: AWB_STRING_CONSTANTS.PARTY_CODE,
    name: DATA_INDEX.PARTY_CODE
  }],
  hybrid: [{
    label: AWB_STRING_CONSTANTS.START_WITH,
    name: DATA_INDEX.START_WITH_HYBRID,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.STRING,
    editable: false
  }, {
    label: AWB_STRING_CONSTANTS.ENDS_WITH,
    name: DATA_INDEX.ENDS_WITH_HYBRID,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.STRING,
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.START_RANGE,
    name: DATA_INDEX.START_RANGE_HYBRID,
    spanSize: 5,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.END_RANGE,
    name: DATA_INDEX.END_RANGE_HYBRID,
    spanSize: 5,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.RUNNING_NUMBER,
    name: DATA_INDEX.RUNNING_NUMBER_HYBRID,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.MOD_BY,
    name: DATA_INDEX.MOD_BY_HYBRID,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
    name: DATA_INDEX.IS_LEADING_ZERO_APPENDED_HYBRID,
    spanSize: 4,
    fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
    options: DROPDOWN_LEADING_ZERO,
    spslChecks: [],
    editable: true
  }],
  check_digit: [{
    label: AWB_STRING_CONSTANTS.START_WITH,
    name: DATA_INDEX.START_WITH_CHECK_DIGIT,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.STRING,
    editable: false
  }, {
    label: AWB_STRING_CONSTANTS.ENDS_WITH,
    name: DATA_INDEX.ENDS_WITH_CHECK_DIGIT,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.STRING,
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.START_RANGE,
    name: DATA_INDEX.START_RANGE_CHECK_DIGIT,
    spanSize: 5,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.END_RANGE,
    name: DATA_INDEX.END_RANGE_CHECK_DIGIT,
    spanSize: 5,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.RUNNING_NUMBER,
    name: DATA_INDEX.RUNNING_NUMBER_CHECK_DIGIT,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.BASE,
    name: DATA_INDEX.BASE_CHECK_DIGIT,
    spanSize: 4,
    dataType: FIELDS_DATA_TYPES.NUMBER,
    spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT],
    editable: true
  }, {
    label: AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
    name: DATA_INDEX.IS_LEADING_ZERO_APPENDED_CHECK_DIGIT,
    spanSize: 4,
    fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
    options: DROPDOWN_LEADING_ZERO,
    spslChecks: [],
    editable: true
  }]
};
const CUSTOM_VALIDATION_MSG_MAP = exports.CUSTOM_VALIDATION_MSG_MAP = {
  [DATA_INDEX.SNO_START_POSITION]: containerConstants.formatString(containerConstants.SNO_START_POSITION_CUSTOM_VALIDATION_MSG, containerConstants.SNO_START_POSITION, containerConstants.LENGTH_OF_AWB),
  [DATA_INDEX.SNO_END_POSITION]: containerConstants.formatString(containerConstants.CUSTOM_VALIDATION_MSG_IN_BTW, containerConstants.SNO_END_POSITION, containerConstants.SNO_START_POSITION, containerConstants.LENGTH_OF_AWB),
  [DATA_INDEX.START_RANGE]: containerConstants.formatString(containerConstants.START_RANGE_CUSTOM_VALIDATION_MSG, containerConstants.START_RANGE, containerConstants.END_RANGE),
  [DATA_INDEX.END_RANGE]: containerConstants.formatString(containerConstants.END_RANGE_CUSTOM_VALIDATION_MSG, containerConstants.END_RANGE, containerConstants.START_RANGE),
  [DATA_INDEX.RUNNING_NUMBER]: containerConstants.formatString(containerConstants.CUSTOM_VALIDATION_MSG_IN_BTW, containerConstants.RUNNING_NUMBER, containerConstants.START_RANGE, containerConstants.END_RANGE),
  [DATA_INDEX.END_POINT]: containerConstants.formatString(containerConstants.INCORRECT_VALIDATION_MSG, containerConstants.END_POINT),
  [DATA_INDEX.START_RANGE_HYBRID]: containerConstants.formatString(containerConstants.START_RANGE_CUSTOM_VALIDATION_MSG, containerConstants.START_RANGE, containerConstants.END_RANGE),
  [DATA_INDEX.END_RANGE_HYBRID]: containerConstants.formatString(containerConstants.END_RANGE_CUSTOM_VALIDATION_MSG, containerConstants.END_RANGE, containerConstants.START_RANGE),
  [DATA_INDEX.RUNNING_NUMBER_HYBRID]: containerConstants.formatString(containerConstants.CUSTOM_VALIDATION_MSG_IN_BTW, containerConstants.RUNNING_NUMBER, containerConstants.START_RANGE, containerConstants.END_RANGE)
};
const MASTER_DATA_STRING_CONSTANTS = exports.MASTER_DATA_STRING_CONSTANTS = {
  MERCHANT_CODE: containerConstants.formatString(containerConstants.MERCHANT_CODE),
  TYPE: containerConstants.formatString(containerConstants.TYPE),
  NAME: containerConstants.formatString(containerConstants.NAME),
  BILLING_ADDRESS: containerConstants.formatString(containerConstants.BILLING_ADDRESS),
  CONTACT_PERSON: containerConstants.formatString(containerConstants.CONTACT_PERSON),
  CONTACT_NUMBER: containerConstants.formatString(containerConstants.CONTACT_NUMBER),
  EMAIL: containerConstants.formatString(containerConstants.EMAIL),
  RATE_CARD_CODE: containerConstants.formatString(containerConstants.RATE_CARD_CODE),
  COMMISSION_CODE: containerConstants.formatString(containerConstants.COMMISSION_CODE),
  BASE_ADDRESS: containerConstants.formatString(containerConstants.BASE_ADDRESS),
  BASE_POSTAL_CODE: containerConstants.formatString(containerConstants.BASE_POSTAL_CODE),
  BASE_LATITUDE: containerConstants.formatString(containerConstants.BASE_LATITUDE),
  BASE_LONGITUDE: containerConstants.formatString(containerConstants.BASE_LONGITUDE),
  BRAND_EXPERIENCE: containerConstants.formatString(containerConstants.BRAND_EXPERIENCE),
  NO_OF_RE_ATTEMPTS: containerConstants.formatString(containerConstants.NO_OF_RE_ATTEMPTS),
  ACCEPT_OVERAGE_PICKUP: containerConstants.formatString(containerConstants.ACCEPT_OVERAGE_PICKUP),
  THRESHOLD_NO_OF_PICKUP_SCAN: containerConstants.formatString(containerConstants.THRESHOLD_NO_OF_PICKUP_SCAN),
  CODE: containerConstants.formatString(containerConstants.CODE),
  ADDRESS: containerConstants.formatString(containerConstants.ADDRESS),
  PINCODE: containerConstants.formatString(containerConstants.PINCODE),
  GEO_LOCATION: containerConstants.formatString(containerConstants.GEO_LOCATION),
  PLACEHOLDER: containerConstants.formatString(containerConstants.PLACEHOLDER)
};
const PARCEL_SHOP_MASTER_API = exports.PARCEL_SHOP_MASTER_API = {
  "End Point": window.location.protocol + "//" + window.location.host + "/api/v1/addOrUpdate/parcelShopMaster?api_key={api_key}",
  "Method Type": "POST",
  "Headers": {},
  "Request Body": {
    "\"code\"": "\"ABC\" /*required*/",
    "\"name\"": "\"ABC\"",
    "\"contactNumber\"": "9999999999",
    "\"address\"": "\"Noida\"",
    "\"pincode\"": "201301",
    "\"geoLocation\"": "31234.323"
  },
  "Response": {
    "\"For 200\"": {
      "\"message\"": "\"Successfully created\"",
      "\"status\"": "\"Success\""
    },
    "\"For 400, 404\"": {
      "\"message\"": "\"Some Message\"",
      "\"status\"": "\"Failed\""
    },
    "\"For other status code\"": {
      "\"message\"": "\"Something went wrong\"",
      "\"status\"": "\"Failed\""
    }
  }
};
const PARTY_MASTER_API = exports.PARTY_MASTER_API = {
  "End Point": window.location.protocol + "//" + window.location.host + "/api/v1/addOrUpdate/partyMaster?api_key={api_key}",
  "Method Type": "POST",
  "Headers": {},
  "Request Body": {
    "\"merchantCode\"": "\"ABC\"  /*required*/",
    "\"type\"": "\"Shipper\"  /*Shipper/Carrier*/",
    "\"name\"": "\"ABC\"",
    "\"billingAddress\"": "\"Noida\"",
    "\"contactPerson\"": "\"ABC\"",
    "\"contactNumber\"": "9999999999",
    "\"email\"": "\"test@test.com\"",
    "\"rateCardCode\"": "\"ABC\"",
    "\"commissionCode\"": "\"ABC\"",
    "\"baseAddress\"": "\"Noida\"",
    "\"basePostalCode\"": "201301",
    "\"baseLatitude\"": "1234.21",
    "\"baseLongitude\"": "31234.323",
    "\"brandedExperience\"": "true",
    "\"numberOfReAttempts\"": "1",
    "\"acceptOveragePickup\"": "true",
    "\"thresholdNumberForPickupScan\"": "1"
  },
  "Response": {
    "\"For 200\"": {
      "\"message\"": "\"Successfully created\"",
      "\"status\"": "\"Success\""
    },
    "\"For 400\"": {
      "\"message\"": "\"Some Message\"",
      "\"status\"": "\"Failed\""
    },
    "\"For other status code\"": {
      "\"message\"": "\"Something went wrong\"",
      "\"status\"": "\"Failed\""
    }
  }
};
const PARTY_MASTER_TYPE = exports.PARTY_MASTER_TYPE = ['Shipper', 'Carrier'];
const PARTY_MASTER_BOOLEAN_OPTIONS_LIST = exports.PARTY_MASTER_BOOLEAN_OPTIONS_LIST = ['True', 'False'];
const PARTY_MASTER_FORM_ELEMENTS = exports.PARTY_MASTER_FORM_ELEMENTS = [{
  label: MASTER_DATA_STRING_CONSTANTS.MERCHANT_CODE,
  name: MASTER_DATA_INDEX.MERCHANT_CODE,
  isRequired: true
}, {
  label: MASTER_DATA_STRING_CONSTANTS.TYPE,
  name: MASTER_DATA_INDEX.TYPE,
  isRequired: true,
  fieldType: MASTER_DATA_INDEX.FIELD_TYPE_SELECT,
  options: PARTY_MASTER_TYPE
}, {
  label: MASTER_DATA_STRING_CONSTANTS.NAME,
  name: MASTER_DATA_INDEX.NAME,
  isRequired: true
}, {
  label: MASTER_DATA_STRING_CONSTANTS.BILLING_ADDRESS,
  name: MASTER_DATA_INDEX.BILLING_ADDRESS,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.CONTACT_PERSON,
  name: MASTER_DATA_INDEX.CONTACT_PERSON,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.CONTACT_NUMBER,
  name: MASTER_DATA_INDEX.CONTACT_NUMBER,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.EMAIL,
  name: MASTER_DATA_INDEX.EMAIL,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.RATE_CARD_CODE,
  name: MASTER_DATA_INDEX.RATE_CARD_CODE,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.COMMISSION_CODE,
  name: MASTER_DATA_INDEX.COMMISSION_CODE,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.BASE_ADDRESS,
  name: MASTER_DATA_INDEX.BASE_ADDRESS,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.BASE_POSTAL_CODE,
  name: MASTER_DATA_INDEX.BASE_POSTAL_CODE,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.BASE_LATITUDE,
  name: MASTER_DATA_INDEX.BASE_LATITUDE,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.BASE_LONGITUDE,
  name: MASTER_DATA_INDEX.BASE_LONGITUDE,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.BRAND_EXPERIENCE,
  name: MASTER_DATA_INDEX.BRAND_EXPERIENCE,
  isRequired: false,
  fieldType: MASTER_DATA_INDEX.FIELD_TYPE_RADIO
}, {
  label: MASTER_DATA_STRING_CONSTANTS.NO_OF_RE_ATTEMPTS,
  name: MASTER_DATA_INDEX.NO_OF_RE_ATTEMPTS,
  isRequired: false,
  fieldType: MASTER_DATA_INDEX.FIELD_TYPE_SELECT,
  options: DROPDOWN_RE_ATTEMPTS_OPTIONS
}, {
  label: MASTER_DATA_STRING_CONSTANTS.ACCEPT_OVERAGE_PICKUP,
  name: MASTER_DATA_INDEX.ACCEPT_OVERAGE_PICKUP,
  isRequired: false,
  fieldType: MASTER_DATA_INDEX.FIELD_TYPE_RADIO
}, {
  label: MASTER_DATA_STRING_CONSTANTS.THRESHOLD_NO_OF_PICKUP_SCAN,
  name: MASTER_DATA_INDEX.THRESHOLD_NO_OF_PICKUP_SCAN,
  isRequired: false
}];
const PARCEL_SHOP_MASTER_FORM_ELEMENTS = exports.PARCEL_SHOP_MASTER_FORM_ELEMENTS = [{
  label: MASTER_DATA_STRING_CONSTANTS.CODE,
  name: MASTER_DATA_INDEX.CODE,
  isRequired: true
}, {
  label: MASTER_DATA_STRING_CONSTANTS.NAME,
  name: MASTER_DATA_INDEX.NAME,
  isRequired: true
}, {
  label: MASTER_DATA_STRING_CONSTANTS.CONTACT_NUMBER,
  name: MASTER_DATA_INDEX.CONTACT_NUMBER,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.ADDRESS,
  name: MASTER_DATA_INDEX.ADDRESS,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.PINCODE,
  name: MASTER_DATA_INDEX.PINCODE,
  isRequired: false
}, {
  label: MASTER_DATA_STRING_CONSTANTS.GEO_LOCATION,
  name: MASTER_DATA_INDEX.GEO_LOCATION,
  isRequired: false
}];
const MASTER_DATA_SETTING = exports.MASTER_DATA_SETTING = {
  TITLE: 'title',
  URL: 'url',
  API_ACCESS_TOKEN: 'apiAccessToken',
  ALLOWED_USER_TYPES: 'allowedUserTypes',
  ALLOCATION_OUTPUT: 'allocationOutputType',
  NO_OF_OUTPUT: 'noOfOutput',
  IS_ENABLED: 'isEnabled'
};
const TEMPLATE_MODAL_TYPE = exports.TEMPLATE_MODAL_TYPE = {
  CREATE_TEMPLATE: 'create_template',
  CHOOSE_TEMPLATE: 'choose_template'
};
const BASE_PATH_APIS = exports.BASE_PATH_APIS = {
  basePathForAPIS: ''
};
const TEMPLATE_STATUS_MAP = exports.TEMPLATE_STATUS_MAP = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};
const HELP_DOC = exports.HELP_DOC = {
  'Get Shipment Number of a Order': [{
    syntax: ['This prints order shipment number in plain text format', '${orderList[0].shipmentDetails.shipmentNumber.text};'],
    example: ['${orderList[0].shipmentDetails.shipmentNumber.text}', 'prints - 12345567']
  }, {
    syntax: ['This prints order shipment number in plain qrcode format', '${orderList[index].shipmentDetails.shipmentNumber.qrCode};'],
    example: ['${orderList[0].shipmentDetails.shipmentNumber.qrCode}', 'prints - qrCodeValue("12345567")']
  }, {
    syntax: ['This prints order shipment number in plain barcode code128 format', '${orderList[index].shipmentDetails.shipmentNumber.code128};'],
    example: ['${orderList[0].shipmentDetails.shipmentNumber.code128}', 'prints - code128Value("12345567")']
  }, {
    syntax: ['This prints order shipment number  in plain barcode code93 format', '${orderList[index].shipmentDetails.shipmentNumber.code93};'],
    example: ['${orderList[0].shipmentDetails.shipmentNumber.code93}', 'prints - code93Value("12345567")']
  }, {
    syntax: ['This prints order shipment number in plain barcode upc format', '${orderList[index].shipmentDetails.shipmentNumber.upc};'],
    example: ['${orderList[0].shipmentDetails.shipmentNumber.upc}', 'prints - upcValue("12345567")']
  }, {
    syntax: ['This prints order shipment number in plain barcode ean8 format', '${orderList[index].shipmentDetails.shipmentNumber.ean8};'],
    example: ['${orderList[0].shipmentDetails.shipmentNumber.ean8}', 'prints - ean8Value("12345567")']
  }, {
    syntax: ['This prints order shipment number in plain barcode ean13 format', '${orderList[index].shipmentDetails.shipmentNumber.ean13};'],
    example: ['${orderList[0].shipmentDetails.shipmentNumber.ean13}', 'prints - ean13Value("12345567")']
  }, {
    syntax: ['This prints order shipment number in barcode PDF-417 format', '${orderList[index].shipmentDetails.shipmentNumber.pdf417};'],
    example: ['${orderList[0].shipmentDetails.shipmentNumber.pdf417}', 'prints - pdf417Value("12345567")']
  }, {
    note: ['Please use "th:text" to get value of perticular variable '],
    example: ['<span th:text="${orderList[0].shipmentDetails.shipmentNumber.text}"></span>']
  }, {
    syntax: ['Same syntax will be used for Origin, Carrrier, Destination, Return'],
    example: ['${orderList[0].originDetails.value(key inside originDetails Object).text}', 'prints - 12345567', '${orderList[0].carrierDetails.value(key inside carrierDetails Object).text}', 'prints - 12345567', '${orderList[0].destibationDetails.value(key inside destinationDetails Object).text}', 'prints - 12345567', '${orderList[0].returnDetails.value(key inside returnDetails Object).text}', 'prints - 12345567']
  }],
  'Get additionalFreeJson child Node': [{
    syntax: ['This prints the shipment type value in plain text format', '${orderList[0].shipmentDetails.additionalFreeJson.map.shipment_type};'],
    example: ['${orderList[0].shipmentDetails.additionalFreeJson.map.shipment_type}', 'prints - Forward Field']
  }],
  'Get Attributes of a Consolidation': [{
    syntax: ['Consolidation details are present in entityData Object, to access them you can use dot operator', 'Consolidation Attributes List:', 'id', 'key', 'company_id', 'version', 'last_partition_offset_id', 'created_at', 'created_at_year_month', 'created_by', 'last_updated_at', 'last_updated_by', 'origin_hub', 'destination_hub', 'current_hub', 'consolidation_type', 'mode_of_transport', 'shipment_type', 'state', 'bag_size', 'item_count', 'run_key', 'connection_id', 'sealed_at', 'loaded_at', 'received_at', 'sealed_by', 'loaded_by', 'received_by', 'parent_consolidation_key', 'weight', 'volume', 'deconsolidated_item_count', 'remarks', 'service_type', 'dissolved_at', 'dissolved_by', 'last_parent_key', 'invoice_value'],
    example: ['Example 1: "${entityData.consolidation_type.text}"', 'Output: Bag', 'Example 2: "${entityData.current_hub.text}"', 'Output: rohini']
  }],
  'Get items of a Consolidation': [{
    syntax: ['Item list array can be fetched from \'entityData\' Object by dot operator', 'Syntax: "${entityData.item_list}"', 'Item list Array can be looped further to access attributes of an Item', 'Item Attributes List:', 'id', 'company_id', 'created_at', 'created_at_year_month', 'bag_id', 'item_key', 'item_type', 'status', 'scanned_at', 'scanned_by', 'scanned_out_at', 'scanned_out_by', 'destination_hub', 'weight', 'remarks', 'created_by', 'last_updated_at', 'last_updated_by', 'version', 'volume'],
    example: ['Example Snippet:', '<tr th:each="item, index : ${entityData.item_list}">', '  <td th:text="${index.index + 1}"></td>', '  <td th:text="${item.item_key.text}"></td>', '  <td th:text="${item.item_type.text}"></td>', '   <td th:text="${item.status.text}"></td>', '   <td th:text="${item.weight.text}"></td>', '   <td th:text="${item.destination_hub.text}"></td>', '   <td th:text="${item.scanned_by.text}"></td>', '</tr>']
  }],
  'Get Attributes of a Line Haul Run': [{
    syntax: ['Line Haul Run details are present in entityData Object, to access them you can use dot operator', 'Line Haul Run Attributes List:', 'id', 'key', 'company_id', 'version', 'last_partition_offset_id', 'created_at', 'created_at_year_month', 'created_by', 'last_updated_at', 'last_updated_by', 'lane_name', 'type', 'mode_of_transport', 'state', 'seal_number', 'driver_contact_number', 'driver_name', 'vehicle_number', 'current_facility', 'next_facility', 'current_connection_id', 'count', 'transporter', 'facility_list', 'last_arrival_time', 'last_dispatch_time', 'estimated_arrival_time', 'estimated_dispatch_time', 'service_type', 'next_facility_count', 'lane_code', 'origin_hub_code', 'destination_hub_code', 'value_limit', 'standard_arrival_time', 'standard_dispatch_time', 'max_volume', 'max_weight', 'weight', 'volume', 'invoice_value', 'current_facility_sequence'],
    example: ['Example 1: "${entityData.lane_name.text}"', 'Output: rohini-hub1-hub2', 'Example 2: "${entityData.mode_of_transport.text}"', 'Output: SEA']
  }],
  'Get Connections and Items of a Line Haul Run': [{
    syntax: ['Connection list array can be fetched from \'entityData\' Object by dot operator', 'Syntax: "${entityData.connection_list}"', 'Item list array can be fetched from \'connection_list\' Object by dot operator', 'Syntax: "${entityData.connection_list[0].connection_item_list}"', 'Line Haul Run connection_item_list can be looped further to access connection items and attributes of an Item', '--------', 'Connection Attributes List: ', 'id', 'company_id', 'created_at', 'created_at_year_month', 'run_id', 'hub_code', 'sequence', 'state', 'seal_number', 'actual_arrival_time', 'actual_dispatch_time', 'actual_docking_time', 'estimated_arrival_time', 'estimated_dispatch_time', 'distance', 'duration', 'docking_duration', 'last_updated_at', 'last_updated_by', 'load_count', 'unload_count', 'flight_number', 'vehicle_number', 'driver_name', 'mawb', 'vessel_number', 'additional_info', 'additional_info2', 'sta', 'std', 'created_by', 'version', '--------', 'Connection Item Attributes List', 'id', 'company_id', 'created_at', 'created_at_year_month', 'connection_id', 'run_id', 'state', 'item_type', 'item_key', 'item_weight', 'item_count', 'loaded_at', 'loaded_by', 'unloaded_at', 'unloaded_by', 'last_updated_at', 'last_updated_by', 'loaded_from_hub', 'item_destination_hub', 'remarks', 'created_by', 'version', 'item_volume', 'item_value'],
    example: ['Example Snippet:', '<span th:with="globalIndex=0">', '    <span th:each="connectionDetails, index : ${entityData.connection_list}">', '        <th:block th:if="${connectionDetails.load_count.text > 0}">', '            <tr th:each="itemDetails, index : ${connectionDetails.connection_item_list}">', '              <span th:with="globalIndex=${globalIndex + 1}">', '                <td th:text="${globalIndex}"></td>', '                <td th:text="${itemDetails.item_key.text}"></td>', '                <td th:text="${itemDetails.item_type.text}"></td>', '                <td th:text="${itemDetails.state.text}"></td>', '              </span>', '            </tr>', '        </th:block>', '    </span>', '</span>']
  }],
  'Get Barcodes of Consolidation and Line Haul Run Attributes': [{
    syntax: ['To fetch Barcodes use barcode name after dot operator', 'Valid Bar Codes List: ', 'qrCode', 'code128', 'code39', 'ean13', 'upc', 'code93', 'ean8', 'pdf417', 'map'],
    example: ['Example 1: "${entityData.run_key.qrCode}"', 'Output: QR code barcode']
  }]
};
//# sourceMappingURL=constants.js.map