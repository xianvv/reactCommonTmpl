const Regs = {
  // 小写字母后的第一个大写字母
  // FIRST_UPPER_CHAR: new RegExp('(?<=[a-z])[A-Z]', 'g')
  FIRST_UPPER_CHAR: new RegExp('([a-z])[A-Z]', 'g'),
};

function transformCamelTo(spliter) {
  return (str) =>
    str.replace(Regs.FIRST_UPPER_CHAR, (c) => `${c[0]}${spliter}${c[1].toLowerCase()}`);
}

// 驼峰转下划线
export const toUnderLine = transformCamelTo('_');

// 驼峰转短横线
export const toShortLine = transformCamelTo('-');
