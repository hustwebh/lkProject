/*
 * @Descripttion: 项目的配置文件
 * @Author: linkenzone
 * @Date: 2020-09-04 00:20:42
 * 配置文件文档 : https://umijs.org/config/
 */

import { defineConfig } from 'umi';
import routerConfig from './routerConfig';
import proxy from './proxy';

// process.env包含着关于系统环境的信息
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  theme: {
    'primary-color': '#39bbdb',
    'heading-color': '#191919',
    'text-color': '#404040',
    'text-color-secondary': '#666666',
  },
  targets: { chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10 },
  nodeModulesTransform: {
    type: 'none',
  },
  copy: ['/src/assets/favicon.png'], // 设置要复制到输出目录的文件或文件夹。
  publicPath: '/', //静态资源
  history: { type: 'hash' }, // 使用hash路由
  hash: true,
  mock: false, //关闭mock
  routes: routerConfig, // 导入路由
  dynamicImport: {
    // 是否启用按需加载
    // loading: '@ant-design/pro-layout/es/PageLoading',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    // baseNavigator: true,
  },
  dva: {
    //dva 配置
    hmr: true,
    // disableModelsReExport: true,
    // lazyLoad: true,
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
});
