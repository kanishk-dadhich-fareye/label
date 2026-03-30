function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import React, { useEffect, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import 'ace-builds/src-noconflict/snippets/html';
import "ace-builds/src-noconflict/ace";
import 'ace-builds/src-noconflict/theme-github';
import "ace-builds/src-noconflict/ext-spellcheck";
import "ace-builds/src-noconflict/ext-language_tools";
import HtmlEditorStyle from './HtmlEditorStyle.js';
import { Button, Space, Tag } from 'antd';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import CodeEditorIcon from '../../images/code_editor_icon.svg';
import CodePreviewIcon from '../../images/code_preview_icon.svg';
import CustomModal from './CustomModal';
import { saveLabelTemplateScript } from "../APIConfig/LabelTemplateAction";
import { isEmpty, toUpper } from 'lodash';
import { DATA_INDEX, OPERATIONS, STATUS } from '../../utils/constants';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
var containerConstants = containerConstantsService.getInstance();
var isProbablyHtml = value => {
  if (!value) {
    return false;
  }
  var trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  return /<\s*\/?\s*\w+[\s\S]*?>/i.test(trimmed);
};
var isProbablyZpl = value => {
  if (!value) {
    return false;
  }
  var trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  return /^\^XA/i.test(trimmed) && /\^XZ\s*$/i.test(trimmed);
};
var HtmlEditor = _ref => {
  var {
    showEditor,
    setShowEditor,
    setShowTable,
    updateTemplateStatus
  } = _ref;
  var [htmlContent, setHtmlContent] = useState("");
  var [srcDoc, setSrcDoc] = useState("");
  var [ispublishButtonEnabled, setIspublishButtonEnabled] = useState(false);
  var [isDataChanges, setIsDataChanges] = useState(false);
  var [showHelpModal, setShowHelpModal] = useState(false);
  var labelFormat = toUpper(showEditor == null ? void 0 : showEditor[DATA_INDEX.LABEL_FORMAT]) || 'PDF';
  var editorMode = labelFormat === 'ZPL' ? 'text' : 'html';
  var canRenderHtml = labelFormat !== 'ZPL' && isProbablyHtml(srcDoc);
  useEffect(() => {
    var timerId = setTimeout(() => {
      setSrcDoc(htmlContent);
    }, 250);
    return () => clearTimeout(timerId);
  }, [htmlContent]);
  useEffect(() => {
    if (showEditor.operationType === OPERATIONS.EDIT) {
      setHtmlContent(showEditor.script ? showEditor.script : " ");
      if (showEditor[DATA_INDEX.TEMPLATE_STATUS] === STATUS.INPROGRESS) {
        setIspublishButtonEnabled(true);
      }
      setSrcDoc(showEditor.script);
    }
  }, [showEditor]);
  var onSaveScript = () => {
    var templateScriptReqObj = {
      [DATA_INDEX.TEMPLATE_ID]: showEditor[DATA_INDEX.TEMPLATE_ID],
      [DATA_INDEX.TEMPLATE_SCRIPT]: srcDoc
    };
    if (!isEmpty(srcDoc)) {
      if (labelFormat === 'ZPL') {
        if (!isProbablyZpl(srcDoc)) {
          notifyResponseMessage(STATUS.ERROR, 'Invalid ZPL. It should start with ^XA and end with ^XZ.');
          return;
        }
      } else {
        if (!isProbablyHtml(srcDoc)) {
          notifyResponseMessage(STATUS.ERROR, 'Invalid HTML. Please enter a valid HTML template for PDF labels.');
          return;
        }
      }
      saveLabelTemplateScript(templateScriptReqObj).then(response => {
        if (response && response.status === 200) {
          var _response$data;
          if (toUpper((_response$data = response.data) == null ? void 0 : _response$data.status) === STATUS.SUCCESS) {
            var _response$data2;
            setIsDataChanges(false);
            notifyResponseMessage(STATUS.SUCCESS, response == null || (_response$data2 = response.data) == null ? void 0 : _response$data2.message);
            setIspublishButtonEnabled(true);
          } else {
            var _response$data3;
            notifyResponseMessage(STATUS.ERROR, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
          }
        }
      }).catch(error => {});
    }
  };
  var onPublishTemplate = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      if (ispublishButtonEnabled) {
        var publishTemplateReqObj = {
          [DATA_INDEX.TEMPLATE_ID]: showEditor[DATA_INDEX.TEMPLATE_ID],
          [DATA_INDEX.IS_ACTIVE]: true
        };
        if (toUpper(yield updateTemplateStatus(null, publishTemplateReqObj)) === STATUS.SUCCESS) {
          setIspublishButtonEnabled(false);
          handleClickCancel();
        }
      }
    });
    return function onPublishTemplate() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleClickCancel = () => {
    setShowEditor({
      visible: false
    });
    setShowTable(true);
    setSrcDoc("");
    setHtmlContent(" ");
    setIspublishButtonEnabled(false);
    setIsDataChanges(false);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HtmlEditorStyle, null), /*#__PURE__*/React.createElement(CustomModal, {
    showHelpModal,
    setShowHelpModal
  }), /*#__PURE__*/React.createElement("div", {
    className: "html-editor",
    style: {
      display: showEditor.visible ? 'block' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-nav"
  }, /*#__PURE__*/React.createElement("span", {
    className: "editor-nav-title"
  }, showEditor[DATA_INDEX.TEMPLATE_NAME]), /*#__PURE__*/React.createElement(Tag, {
    className: 'fw400 fs12 status-tag' + (showEditor[DATA_INDEX.TEMPLATE_STATUS] === STATUS.ACTIVE ? ' status-tag-active' : ' status-tag-draft'),
    color: showEditor[DATA_INDEX.TEMPLATE_STATUS] === STATUS.ACTIVE ? '#E2FFEA' : '#F3F3F3'
  }, containerConstants.formatString(containerConstants[showEditor[DATA_INDEX.TEMPLATE_STATUS]])), /*#__PURE__*/React.createElement("div", {
    className: "editor-nav-btn"
  }, /*#__PURE__*/React.createElement(Space, {
    size: 8,
    align: "end"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "small",
    className: "fw400 fs14 lh22 action-btn",
    ghost: true,
    type: "primary",
    disabled: !ispublishButtonEnabled,
    onClick: onPublishTemplate
  }, containerConstants.formatString(containerConstants.PUBLISH)), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    disabled: !isDataChanges,
    className: "fw400 fs14 lh22 action-btn",
    type: "primary",
    style: {
      color: '#FFFFFF'
    },
    onClick: onSaveScript
  }, containerConstants.formatString(containerConstants.SAVE))), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    className: "border-none",
    style: {
      marginLeft: '20px'
    },
    onClick: handleClickCancel,
    icon: /*#__PURE__*/React.createElement(CloseOutlined, {
      style: {
        fontSize: '14px',
        color: '#323232'
      }
    })
  }))), /*#__PURE__*/React.createElement("div", {
    className: "editor-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "html-code-editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-sub-header flex justify-space-btw"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title-section flex"
  }, /*#__PURE__*/React.createElement("img", {
    alt: "",
    src: CodeEditorIcon
  }), /*#__PURE__*/React.createElement("span", {
    className: "title fw400 fs12 lh18"
  }, labelFormat === 'ZPL' ? 'ZPL Editor' : containerConstants.formatString(containerConstants.HTML_EDITOR))), /*#__PURE__*/React.createElement("span", {
    className: "help-section flex pointer",
    onClick: () => setShowHelpModal({
      visible: true,
      title: containerConstants.formatString(containerConstants.HELP_DOCUMENT)
    })
  }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, {
    style: {
      fontSize: '15px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "title fw400 fs12 lh18"
  }, containerConstants.formatString(containerConstants.HELP)))), /*#__PURE__*/React.createElement(AceEditor, {
    mode: editorMode,
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
  })), /*#__PURE__*/React.createElement("div", {
    className: "html-code-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-sub-header flex"
  }, /*#__PURE__*/React.createElement("span", {
    className: "title-section flex"
  }, /*#__PURE__*/React.createElement("img", {
    alt: "",
    src: CodePreviewIcon
  }), /*#__PURE__*/React.createElement("span", {
    className: "title fw400 fs12 lh18"
  }, labelFormat === 'ZPL' ? 'ZPL Preview' : containerConstants.formatString(containerConstants.HTML_PREVIEW)))), /*#__PURE__*/React.createElement("div", {
    className: "html-code-preview-container"
  }, canRenderHtml ? /*#__PURE__*/React.createElement("iframe", {
    srcDoc: srcDoc,
    width: '100%',
    height: '486px',
    frameBorder: 0,
    sandbox: "allow-scripts"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "fw400 fs12 lh18",
    style: {
      padding: '12px',
      color: '#727272'
    }
  }, labelFormat === 'ZPL' ? 'ZPL preview is not available.' : 'Enter valid HTML to preview.')))))));
};
export default HtmlEditor;
//# sourceMappingURL=HtmlEditor.js.map
