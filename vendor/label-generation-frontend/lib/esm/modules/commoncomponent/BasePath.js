var getBasePath = function getBasePath(props, store) {
  if (props.fromFCR || store.fromFCR) {
    if (props.isProduction || store.isProduction) {
      return '/fcr/view/reactSettings';
    } else {
      return '/view/reactSettings';
    }
  }
  return '';
};
export { getBasePath };
//# sourceMappingURL=BasePath.js.map