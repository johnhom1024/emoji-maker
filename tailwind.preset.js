/**
 * 生成一个范围对象
 * @param {{
 *  min: number;
 *  max: number;
 *  step?: number;
 *  iterator?: (index: number) => [number | string | symbol, string | number];
 * }}
 * @return {Record<number | string | symbol, string | number>}
 */
function range({ min, max, step = 1, iterator = (num) => [num, num] }) {
  const result = {};

  for (let i = min, len = max; i <= len; i += step) {
    const [key, value] = iterator(i);

    result[key] = value;
  }

  return result;
}

/**
 * 把 100% 分成多少等份，每一个数组的值都会生成一个范围份额，
 * 如：
 * [3, 4] => {
 *  '1/3': '33.33%',
 *  '2/3': '0.67%',
 *  '1/4': '25%',
 *  '2/4': '50%',
 *  '3/4': '75%',
 * }
 * @param {number[]} partial
 * @return {Record<string, string>}
 */
 function getPercentRange(partial) {
  return partial.reduce((result, column) => {
    return {
      ...result,
      ...range({
        min: 1,
        max: column - 1,
        iterator: (num) => [`${num}/${column}`, `${num / column * 100}%`],
      }),
    };
  }, {});
}


/**
 * 获取颜色值的缩写形式，如：
 * #F3F3F5 => f3f3f5
 * #333333 => 33
 * #898989 => 89
 * rgba(0,0,0,0.5) => rgba(0,0,0,0.5)
 *
 * @param {string} color
 * @return {string}
 */
 function getColorKey(color = '') {
  color = color.toLowerCase();

  if (color[0] === '#') {
    const hex = color.slice(1);

    if (hex.length === 6) {
      /**
       * 取前 2 个字符重复 3 次
       * 如果和原来的值一致，表示可以缩写
       */
      const prefix = hex.slice(0, 2);
      if (prefix.repeat(3) === hex) return prefix;
    }

    return color.slice(1);
  }

  return color;
}

/**
 * @param {string[]} colors
 * @return {Record<number | string | symbol, string>}
 */
function getColors(colors) {
  return colors.reduce((result, color) => {
    // 获取颜色值 key 缩写形式
    const colorKey = getColorKey(color);

    result[colorKey] = color;

    return result;
  }, {});
}


/**
 * 生成tailwindcss 预设
 * @param {Paritial<{
 *  baseDesignWidth: number;
 *  baseWidth: number;
 *  unit: string;
 * }>} params
 */
function createPreset(params = {}) {
  const { baseDesignWidth = 1920, baseWidth = 1920, unit = "px" } = params;

  /**
   * @param {number} num
   * @return {string}
   */
  const getPxValue = (num) => {
    return `${(num * baseWidth) / baseDesignWidth}${unit}`;
  };

  /**
   * @param {number} min
   * @param {number} max
   * @param {number=} step
   */
  const getPxRange = (min, max, step) =>
    range({
      min,
      max,
      step,
      iterator: (num) => [num, getPxValue(num)],
    });

  return {
    purge: [
      './public/**/*.html',
      './src/**/*.{vue,html,tsx,jsx,ts,js,wxs,sjs}',
    ],
    theme: {
      /** 一般不需要用到媒体查询 */
      screens: {},
      colors: {
        // 主题色
        primary: {
          DEFAULT: 'var(--color-primary)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
        },
        // 白色
        white: '#FFFFFF',
        // 标题、重点文案
        black: '#000000',
        color: {
          ...getColors([
            // 背景色
            '#F3F3F5',
            // 内容区背景色
            '#F6F7FB',
            '#F6F6F6',
            // 骨架屏背景
            '#F1F1F1',
            '#F7F7F7',
            // 卡片背景
            '#F7F8FA',
            // 多用于表单页二级设置项底色
            '#F8F9FA',
            // 卡片骨架屏背景
            '#C1C1C1',
            // 边框颜色
            '#F0F0F0',
            // 按钮背景
            '#242424',
            // 用于重要级文字信息
            '#333333',
            // 主要文案、输入文案
            '#353535',
            // 主要文案、输入文案
            '#535353',
            // 用于白底左侧栏一级导航、暗色系的二级导航
            // 用于普通段落文字信息
            '#666666',
            // 用于白底左侧栏二级导航、暗色系的三级导航
            '#888888',
            // 次要文案
            '#898989',
            // 用于白底左侧栏导航项的归类
            '#AAAAAA',
            // 用于暗色系一级导航
            '#BBBBBB',
            // 提示文案
            '#B2B2B2',
            // 暗色系导航字体颜色
            // 用于辅助、次要的文字信息
            '#999999',
            // 标签背景色
            '#F54531',
            // 侧边栏暗色底
            '#1A1C21',
            // 滚动条
            // 分割线颜色、标签描边
            '#F2F2F2',
            // 滚动条 hover
            '#E8E7E7',
            // 输入框边框颜色
            '#D9D9D9',
            // 边框颜色
            '#ECECEC',
            '#E5E5E5',
            '#DADADA',
            // 边框颜色-2
            '#DCDFE6',
            // 置灰文字颜色
            '#BCBCBC',
            // 提示文字
            '#CCCCCC',
            // 表头背景色
            '#FAFAFA',
            // 表格 hover
            '#EFF4FF',
            // 背景色
            '#F5F5F5',
            // 按钮禁用
            '#E6E6E6',
            '#E1E1E1',
            '#D8D8D8',
          ]),
        },
        /**
         * 会员等级颜色值定义
         */
        member: {
          lv1: '#FBAE11',
          lv2: '#FA9B4B',
          lv3: '#A7805A',
          lv4: '#F48A6F',
          lv5: '#EF73B0',
          lv6: '#C16BDB',
          lv7: '#7F7EDC',
          lv8: '#5F93C1',
          lv9: '#828F99',
          lv10: '#554C43',
        },
        transparent: 'transparent',
      },
      spacing: getPxRange(0, 100, 0.5),
      width: {
        ...getPxRange(0, 800),
        auto: 'auto',
        ...getPercentRange([2, 3, 4, 5, 6, 12]),
        full: '100%',
        screen: '100vw',
      },
      minWidth: {
        ...getPxRange(0, 800),
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        auto: 'auto',
      },
      maxWidth: {
        ...getPxRange(0, 800),
        none: 'none',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
      },
      height: {
        ...getPxRange(0, 800),
        auto: 'auto',
        ...getPercentRange([2, 3, 4, 5, 6]),
        full: '100%',
        screen: '100vh',
      },
      minHeight: {
        ...getPxRange(0, 800),
        full: '100%',
        screen: '100vh',
      },
      maxHeight: {
        ...getPxRange(0, 800),
        full: '100%',
        screen: '100vh',
      },
      padding: {
        ...getPxRange(0, 200, 0.5),
        auto: 'auto',
      },
      margin: {
        ...getPxRange(-200, 200, 0.5),
        auto: 'auto',
      },
      borderWidth: {
        0: 0,
        DEFAULT: `1${unit}`,
        ...getPxRange(2, 200, 0.5),
      },
      borderRadius: {
        ...getPxRange(1, 100, 0.5),
        inherit: 'inherit',
        none: 0,
        half: '50%',
        full: '9999px',
      },
      opacity: range({
        min: 0,
        max: 100,
        iterator: (num) => [num, num / 100],
      }),
      letterSpacing: getPxRange(0, 10, 0.5),
      boxShadow: {
        DEFAULT: '0px 1px 4px rgba(0, 0, 0, 0.04)',
        md: '0px 6px 16px rgba(0, 0, 0, 0.04)',
        lg: '0px 6px 26px rgba(0, 0, 0, 0.04)',
        none: 'none',
      },
      fontFamily: {
        pc: ['Microsoft YaHei', 'PingFang SC', 'Arial'],
        wxapp: ['PingFang SC', 'Microsoft YaHei', 'Arial'],
        app: ['Source Han Sans', 'Microsoft YaHei', 'Arial'],
      },
      fontSize: {
        ...range({
          min: 1,
          max: 200,
          step: 0.5,
          iterator: (num) => [num, [getPxValue(num), {
            lineHeight: 1,
          }]],
        }),
        0: '0px',
        inherit: 'inherit',
        none: '0px',
      },
      lineHeight: {
        ...getPxRange(1, 200, 0.5),
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },
      zIndex: {
        // -20 ~ 50 用于基础使用
        ...range({ min: -20, max: 50 }),
        // 2000 ~ 2100 用于弹窗
        ...range({ min: 2000, max: 2100 }),
        none: 0,
        // 用于 loading 等层级超高的情况
        top: '99999',
        auto: 'auto',
      },
    },
    variants: {},
    plugins: [],
    corePlugins: {
      preflight: false
    },
  };
}


module.exports = createPreset;