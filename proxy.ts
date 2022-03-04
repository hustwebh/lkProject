import { SERVICEURL } from './src/utils/const';
export default {
  dev: {
    '/sea': {
      target: `${SERVICEURL}/api`,
      changeOrigin: true,
      pathRewrite: {
        '^/sea': '',
      },
    },
    '/api': {
      target: SERVICEURL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      secure: false, //umi代理https时应该设置secure属性
    },
  },
  test: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
