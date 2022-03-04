import { defineConfig } from 'umi';
import proxy from './proxy';


const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  // proxy: proxy[REACT_APP_ENV || 'dev'], // 配置代理 proxy 配置仅在 dev 时生效
});
