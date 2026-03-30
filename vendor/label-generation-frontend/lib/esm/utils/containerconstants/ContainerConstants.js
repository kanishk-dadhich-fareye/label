function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import LocalizedStrings from 'react-localization';
import { isEmpty } from 'lodash';
class ContainerConstants {
  constructor() {
    _defineProperty(this, "containerInstance", null);
    _defineProperty(this, "languagePreference", void 0);
    // const localStorageLanguagePreference = 'en';
    // if (localStorageLanguagePreference) {
    //   this.languagePreference = localStorageLanguagePreference;

    // } else {
    //   this.languagePreference = 'en';
    // }

    var localStorageLanguagePreference = window.localStorage.getItem('FareyeLanguagePreference');
    var languagePreferenceArray = window.navigator.languages;
    if (localStorageLanguagePreference) {
      this.languagePreference = localStorageLanguagePreference;
    } else if (!isEmpty(languagePreferenceArray)) {
      this.languagePreference = languagePreferenceArray[0];
    } else {
      this.languagePreference = 'en';
    }
  }
  loadLanguage(languagePreference) {
    var localizedStringObject = {};
    var englishStringObject = require('./englishStrings').default;
    switch (languagePreference) {
      case 'en':
        {
          var englishStrings = require('./englishStrings');
          localizedStringObject.en = englishStrings.default;
          break;
        }
      case 'hi':
        {
          var hindiStrings = require('./hindiStrings');
          localizedStringObject.hi = _extends({}, englishStringObject, hindiStrings.default);
          break;
        }
      case 'pt':
        {
          var portugueseStrings = require('./portugueseStrings');
          localizedStringObject.pt = _extends({}, englishStringObject, portugueseStrings.default);
          break;
        }
      case 'es':
        {
          var spanishStrings = require('./spanishStrings');
          localizedStringObject.es = _extends({}, englishStringObject, spanishStrings.default);
          break;
        }
      case 'vi':
        {
          var vietnameseStrings = require('./vietnameseStrings');
          localizedStringObject.vi = _extends({}, englishStringObject, vietnameseStrings.default);
          break;
        }
      case 'ar':
        {
          var arabicStrings = require('./arabicStrings');
          localizedStringObject.ar = _extends({}, englishStringObject, arabicStrings.default);
          break;
        }
      case 'ur':
        {
          var urduStrings = require('./urduStrings');
          localizedStringObject.ur = _extends({}, englishStringObject, urduStrings.default);
          break;
        }
      case 'ms':
        {
          var malayStrings = require('./malayStrings');
          localizedStringObject.ms = _extends({}, englishStringObject, malayStrings.default);
          break;
        }
      case 'th':
        {
          var thaiStrings = require('./thaiStrings');
          localizedStringObject.th = _extends({}, englishStringObject, thaiStrings.default);
          break;
        }
      case 'bg':
        {
          var bulgarianStrings = require('./bulgarianStrings');
          localizedStringObject.bg = _extends({}, englishStringObject, bulgarianStrings.default);
          break;
        }
      case 'fi':
        {
          var finnishStrings = require('./finnishStrings');
          localizedStringObject.fi = _extends({}, englishStringObject, finnishStrings.default);
          break;
        }
      case 'da':
        {
          var danishStrings = require('./danishStrings');
          localizedStringObject.da = _extends({}, englishStringObject, danishStrings.default);
          break;
        }
      case 'ro':
        {
          var romanianStrings = require('./romanianStrings');
          localizedStringObject.ro = _extends({}, englishStringObject, romanianStrings.default);
          break;
        }
      case 'gu':
        {
          var gujaratiStrings = require('./gujaratiStrings');
          localizedStringObject.gu = _extends({}, englishStringObject, gujaratiStrings.default);
          break;
        }
      case 'fr':
        {
          var frenchStrings = require('./frenchStrings');
          localizedStringObject.fr = _extends({}, englishStringObject, frenchStrings.default);
          break;
        }
      case 'it':
        {
          var italianStrings = require('./italianStrings');
          localizedStringObject.it = _extends({}, englishStringObject, italianStrings.default);
          break;
        }
      case 'pl':
        {
          var polishStrings = require('./polishStrings');
          localizedStringObject.pl = _extends({}, englishStringObject, polishStrings.default);
          break;
        }
      case 'sv':
        {
          var swedishStrings = require('./swedishStrings');
          localizedStringObject.sv = _extends({}, englishStringObject, swedishStrings.default);
          break;
        }
      case 'de':
        {
          var germanStrings = require('./germanStrings');
          localizedStringObject.de = _extends({}, englishStringObject, germanStrings.default);
          break;
        }
      case 'lt':
        {
          var lithuanianStrings = require('./lithuanianStrings');
          localizedStringObject.lt = _extends({}, englishStringObject, lithuanianStrings.default);
          break;
        }
      case 'el':
        {
          var greekStrings = require('./greekStrings');
          localizedStringObject.el = _extends({}, englishStringObject, greekStrings.default);
          break;
        }
      default:
        {
          var _englishStrings = require('./englishStrings');
          localizedStringObject.en = _englishStrings.default;
        }
    }
    return new LocalizedStrings(localizedStringObject);
  }
  getInstance() {
    //window.localStorage.getItem('FareyeLanguagePreference')
    var localStorageLanguagePreference = window.localStorage.getItem('FareyeLanguagePreference');
    if (localStorageLanguagePreference) {
      this.languagePreference = localStorageLanguagePreference;
    }
    if (this.containerInstance === null || this.containerInstance.getLanguage() !== this.languagePreference) {
      this.containerInstance = this.loadLanguage(this.languagePreference);
    }
    return this.containerInstance;
  }
}
export var containerConstantsService = new ContainerConstants();
//# sourceMappingURL=ContainerConstants.js.map