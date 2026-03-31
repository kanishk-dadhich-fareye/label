"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactAce = _interopRequireDefault(require("react-ace"));
require("ace-builds/src-noconflict/mode-html");
require("ace-builds/src-noconflict/snippets/html");
require("ace-builds/src-noconflict/ace");
require("ace-builds/src-noconflict/theme-github");
require("ace-builds/src-noconflict/ext-spellcheck");
require("ace-builds/src-noconflict/ext-language_tools");
var _HtmlEditorStyle = _interopRequireDefault(require("./HtmlEditorStyle.js"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _code_editor_icon = _interopRequireDefault(require("../../images/code_editor_icon.svg"));
var _code_preview_icon = _interopRequireDefault(require("../../images/code_preview_icon.svg"));
var _CustomModal = _interopRequireDefault(require("./CustomModal"));
var _LabelTemplateAction = require("../APIConfig/LabelTemplateAction");
var _lodash = require("lodash");
var _constants = require("../../utils/constants");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const HtmlEditor = _ref => {
  let {
    showEditor,
    setShowEditor,
    setShowTable,
    updateTemplateStatus
  } = _ref;
  const [htmlContent, setHtmlContent] = (0, _react.useState)("");
  const [srcDoc, setSrcDoc] = (0, _react.useState)("");
  const [ispublishButtonEnabled, setIspublishButtonEnabled] = (0, _react.useState)(false);
  const [isDataChanges, setIsDataChanges] = (0, _react.useState)(false);
  const [showHelpModal, setShowHelpModal] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const timerId = setTimeout(() => {
      setSrcDoc(htmlContent);
    }, 250);
    return () => clearTimeout(timerId);
  }, [htmlContent]);
  (0, _react.useEffect)(() => {
    if (showEditor.operationType === _constants.OPERATIONS.EDIT) {
      setHtmlContent(showEditor.script ? showEditor.script : " ");
      if (showEditor[_constants.DATA_INDEX.TEMPLATE_STATUS] === _constants.STATUS.INPROGRESS) {
        setIspublishButtonEnabled(true);
      }
      setSrcDoc(showEditor.script);
    }
  }, [showEditor]);
  const onSaveScript = () => {
    const templateScriptReqObj = {
      [_constants.DATA_INDEX.TEMPLATE_ID]: showEditor[_constants.DATA_INDEX.TEMPLATE_ID],
      [_constants.DATA_INDEX.TEMPLATE_SCRIPT]: srcDoc
    };
    if (!(0, _lodash.isEmpty)(srcDoc)) {
      (0, _LabelTemplateAction.saveLabelTemplateScript)(templateScriptReqObj).then(response => {
        if (response && response.status === 200) {
          var _response$data;
          if ((0, _lodash.toUpper)((_response$data = response.data) == null ? void 0 : _response$data.status) === _constants.STATUS.SUCCESS) {
            var _response$data2;
            setIsDataChanges(false);
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response == null || (_response$data2 = response.data) == null ? void 0 : _response$data2.message);
            setIspublishButtonEnabled(true);
          } else {
            var _response$data3;
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
          }
        }
      }).catch(error => {});
    }
  };
  const onPublishTemplate = async () => {
    if (ispublishButtonEnabled) {
      const publishTemplateReqObj = {
        [_constants.DATA_INDEX.TEMPLATE_ID]: showEditor[_constants.DATA_INDEX.TEMPLATE_ID],
        [_constants.DATA_INDEX.IS_ACTIVE]: true
      };
      if ((0, _lodash.toUpper)(await updateTemplateStatus(null, publishTemplateReqObj)) === _constants.STATUS.SUCCESS) {
        setIspublishButtonEnabled(false);
        handleClickCancel();
      }
    }
  };
  const handleClickCancel = () => {
    setShowEditor({
      visible: false
    });
    setShowTable(true);
    setSrcDoc("");
    setHtmlContent(" ");
    setIspublishButtonEnabled(false);
    setIsDataChanges(false);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_HtmlEditorStyle.default, null), /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    showHelpModal,
    setShowHelpModal
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "html-editor",
    style: {
      display: showEditor.visible ? 'block' : 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "editor-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "editor-nav"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "editor-nav-title"
  }, showEditor[_constants.DATA_INDEX.TEMPLATE_NAME]), /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    className: 'fw400 fs12 status-tag' + (showEditor[_constants.DATA_INDEX.TEMPLATE_STATUS] === _constants.STATUS.ACTIVE ? ' status-tag-active' : ' status-tag-draft'),
    color: showEditor[_constants.DATA_INDEX.TEMPLATE_STATUS] === _constants.STATUS.ACTIVE ? '#E2FFEA' : '#F3F3F3'
  }, containerConstants.formatString(containerConstants[showEditor[_constants.DATA_INDEX.TEMPLATE_STATUS]])), /*#__PURE__*/_react.default.createElement("div", {
    className: "editor-nav-btn"
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    size: 8,
    align: "end"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    size: "small",
    className: "fw400 fs14 lh22 action-btn",
    ghost: true,
    type: "primary",
    disabled: !ispublishButtonEnabled,
    onClick: onPublishTemplate
  }, containerConstants.formatString(containerConstants.PUBLISH)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    size: "small",
    disabled: !isDataChanges,
    className: "fw400 fs14 lh22 action-btn",
    type: "primary",
    style: {
      color: '#FFFFFF'
    },
    onClick: onSaveScript
  }, containerConstants.formatString(containerConstants.SAVE))), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    size: "small",
    className: "border-none",
    style: {
      marginLeft: '20px'
    },
    onClick: handleClickCancel,
    icon: /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, {
      style: {
        fontSize: '14px',
        color: '#323232'
      }
    })
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "editor-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "html-code-editor"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "editor-sub-header flex justify-space-btw"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "title-section flex"
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    src: _code_editor_icon.default
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "title fw400 fs12 lh18"
  }, containerConstants.formatString(containerConstants.HTML_EDITOR))), /*#__PURE__*/_react.default.createElement("span", {
    className: "help-section flex pointer",
    onClick: () => setShowHelpModal({
      visible: true,
      title: containerConstants.formatString(containerConstants.HELP_DOCUMENT)
    })
  }, /*#__PURE__*/_react.default.createElement(_icons.QuestionCircleOutlined, {
    style: {
      fontSize: '15px'
    }
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "title fw400 fs12 lh18"
  }, containerConstants.formatString(containerConstants.HELP)))), /*#__PURE__*/_react.default.createElement(_reactAce.default, {
    mode: "html",
    theme: "github",
    name: "HTML_EDITOR",
    onChange: value => {
      setIsDataChanges(true);
      setHtmlContent(value);
    },
    style: {
      width: '95%',
      height: '88%',
      zIndex: 0
    },
    className: "html-code-editor-container",
    fontSize: 13,
    showPrintMargin: true,
    showGutter: true,
    highlightActiveLine: false,
    value: htmlContent,
    wrapEnabled: false,
    setOptions: {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      showLineNumbers: true,
      tabSize: 2,
      spellcheck: true,
      useWorker: true
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "html-code-preview"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "editor-sub-header flex"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "title-section flex"
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    src: _code_preview_icon.default
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "title fw400 fs12 lh18"
  }, containerConstants.formatString(containerConstants.HTML_PREVIEW)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "html-code-preview-container"
  }, /*#__PURE__*/_react.default.createElement("iframe", {
    srcDoc: srcDoc,
    width: '100%',
    height: '486px',
    frameBorder: 0,
    sandbox: "allow-scripts"
  })))))));
};
var _default = exports.default = HtmlEditor;
//# sourceMappingURL=HtmlEditor.js.map