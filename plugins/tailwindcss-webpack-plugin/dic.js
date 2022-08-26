// 符号表格
const SYMBOL_TABLE = {
  BACKQUOTE: '`',
  TILDE: '~',
  EXCLAM: '!',
  AT: '@',
  NUMBERSIGN: '#',
  DOLLAR: '$',
  PERCENT: '%',
  CARET: '^',
  AMPERSAND: '&',
  ASTERISK: '*',
  PARENLEFT: '(',
  PARENRIGHT: ')',
  MINUS: '-',
  UNDERSCORE: '_',
  EQUAL: '=',
  PLUS: '+',
  BRACKETLEFT: '[',
  BRACELEFT: '{',
  BRACKETRIGHT: ']',
  BRACERIGHT: '}',
  SEMICOLON: ';',
  COLON: ':',
  QUOTE: "'",
  DOUBLEQUOTE: '"',
  BACKSLASH: '\\',
  BAR: '|',
  COMMA: ',',
  LESS: '<',
  PERIOD: '.',
  GREATER: '>',
  SLASH: '/',
  QUESTION: '?',
  SPACE: '',
  DOT: '.',
  HASH: '#'
}

// 转换后的字符
const MappingChars2String = {
  [SYMBOL_TABLE.BRACKETLEFT]: '_bl_',
  [SYMBOL_TABLE.BRACKETRIGHT]: '_br_',
  [SYMBOL_TABLE.PARENLEFT]: '_pl_',
  [SYMBOL_TABLE.PARENRIGHT]: '_qr_',
  [SYMBOL_TABLE.HASH]: '_h_',
  [SYMBOL_TABLE.EXCLAM]: '_i_',
  [SYMBOL_TABLE.SLASH]: '_s_',
  [SYMBOL_TABLE.BACKSLASH]: '_bs_',
  [SYMBOL_TABLE.DOT]: '_d_',
  [SYMBOL_TABLE.COLON]: '_c_',
  [SYMBOL_TABLE.PERCENT]: '_p_',
  [SYMBOL_TABLE.COMMA]: '_co_',
  [SYMBOL_TABLE.QUOTE]: '_q_',
  [SYMBOL_TABLE.DOUBLEQUOTE]: '_dq_',
  [SYMBOL_TABLE.ASTERISK]: '_a_',
  [SYMBOL_TABLE.AMPERSAND]: '_am_',
  [SYMBOL_TABLE.AT]: '_at_',
  [SYMBOL_TABLE.BRACELEFT]: '_bal_',
  [SYMBOL_TABLE.BRACERIGHT]: '_bar_'
}


module.exports = {
  SYMBOL_TABLE,
  MappingChars2String
}
