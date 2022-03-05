/*
 * @Author: linkenzone
 * @Date: 2021-06-06 23:34:20
 * @Descripttion: Do not edit
 */

/**
 * @description: JS获取url参数
 * @param {any} variable
 * @return {*}
 */
export const getQueryVariable = (variable: any) => {
  // 截取字符串，去掉?
  const vars = window.location.href.split('?');
  for (const item of vars) {
    const pair = item.split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return null;
};

/**
 * @description: 获取页面UUID
 * @param {*}
 * @return {*}
 */
export const getUUID = () => {
  return getQueryVariable('uuid');
};
