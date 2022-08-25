const selectorParser = require("postcss-selector-parser");

function createTransform(rule = {}, options = {}) {
  const replaceFlag = options.replaceUniversalSelectorWith !== false;

  const transform = (selectors) => {
    selectors.walk((selector) => {
      // do something with the selector
      // node.selector.replace(/\*/g, 'view')
      if (selectors.type === "universal" && replaceFlag) {
        selectors.value = options.replaceUniversalSelectorWith;
      }
      if (selectors.type === "selector") {
        const node = selector.nodes.find(
          (x) => x.type === "pseudo" && x.value === ":hover"
        );

        node && selector.remove();
      }
    });

    if (selectors.length === 0) {
      rule.remove();
    }
  };

  return transform;
}

const getTransformer = (rule = {}, options = {}) => {
  return selectorParser(createTransform(rule, options));
};
