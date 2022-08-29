
const selectorParser = require("postcss-selector-parser");

const createTransform = (rule = {}, options = {}) => {
  const replaceFlag = options.replaceUniversalSelectorWith !== false;
  const transform = (selectors) => {
    selectors.walk((selector) => {
      // 如果是 * 这种通配符，则替换成replaceUniversalSelectorWith
      if (selector.type === "universal" && replaceFlag) {
        selector.value = options.replaceUniversalSelectorWith;
      }

      if (selector.type === "selector") {
        // console.log('----------johnhomLogDebug selector.nodes', selector.nodes)
        // 这里去掉:hover伪类
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
};

const getTransformer = (rule = {}, options = {}) => {
  return selectorParser(createTransform(rule, options));
};

const transformSync = (rule = {}, options = {}) => {
  const transformer = getTransformer(rule, options);

  return transformer.transformSync(rule, {
    lossless: false,
    updateSelector: true,
  });
};

module.exports = transformSync
