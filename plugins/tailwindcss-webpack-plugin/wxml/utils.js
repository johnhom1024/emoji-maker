// const { parseExpression, traverse, generate } = require('@babel')
const { parseExpression } = require("@babel/parser");
const _generate = require("@babel/generator");
const _traverse = require("@babel/traverse");
const traverse = _traverse.default;
const generate = _generate.default;

const replaceWxml = require('./shared');

const {
  variableMatch,
  tagWithEitherClassAndHoverClassRegexp,
  vueTemplateClassRegexp,
  variableRegExp
} = require("../reg.js");

function generateCode(match = "") {
  const ast = parseExpression(match);
  // console.log('----------johnhomLogDebug ast', ast)
  traverse(ast, {
    StringLiteral(path) {
      // console.log('----------johnhomLogDebug path.node.value', path.node.value)
      path.node.value = replaceWxml(path.node.value);
    },
    noScope: true,
  });

  const { code } = generate(ast, {
    compact: true,
    minified: true,
    jsescOption: {
      quotes: "single",
    },
  });

  return code;
}

function templateReplacer(original = "") {
  // 这里是匹配class属性是否传入了变量
  let match = variableMatch(original);
  // console.log('----------johnhomLogDebug match', match)
  const sources = [];

  while (match !== null) {
    sources.push({
      start: match.index,
      end: variableRegExp.lastIndex,
      raw: match[1],
    });

    match = variableMatch(original);
    // console.log('----------johnhomLogDebug match.while', match)
  }

  if (sources.length) {
    const resultArray = [];
    let p = 0;
    for (let i = 0; i < sources.length; i++) {
      const m = sources[i];
      // console.log('----------johnhomLogDebug m', m)
      resultArray.push(replaceWxml(original.slice(p, m.start), true));
      // console.log('----------johnhomLogDebug resultArray', resultArray)
      p = m.start;

      // 匹配后值
      if (m.raw.trim().length) {
        const code = generateCode(m.raw);
        m.source = `{{${code}}}`;
      } else {
        m.source = "";
      }

      resultArray.push(m.source);
      p = m.end;
      // 匹配最终尾部值
      if (i === sources.length - 1) {
        resultArray.push(replaceWxml(original.slice(m.end), true));
      }
    }

    return resultArray.filter((x) => x).join('');
  } else {
    // 如果不是变量，则直接替换
    return replaceWxml(original);
  }
}

function templateHandler(rawSource = "") {
  return rawSource.replace(tagWithEitherClassAndHoverClassRegexp, (m0) => {
    // console.log('----------johnhomLogDebug m0', m0)
    return m0.replace(vueTemplateClassRegexp, (m1, className) => {
      console.log('----------johnhomLogDebug className', className)
      console.log('----------johnhomLogDebug classNameReplacer', templateReplacer(className))
      return m1.replace(className, templateReplacer(className));
    });
  });
}

module.exports = {
  templateHandler,
};
