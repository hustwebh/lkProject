/*
 * @Author: Meng Tian
 * @Date: 2022-03-05 11:47:36
 * @Descripttion: Do not edit
 */
// import { SERVICEURL } from './src/utils/const';
// import { SERVICEURL } from './src/utils/const';
export default {
  dev: {
    '/api': {
      target: 'http://127.0.0.1:4523',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },

    '/git': {
      target: 'https://github.com',
      changeOrigin: true,
      pathRewrite: {
        '^/git': '',
      },
    },

    '/detect': {
      target: 'http://120.24.40.160',
      changeOrigin: true,
      pathRewrite: {
        '^/detect': '',
      },
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

// export default {
//   dev: {
//     '/rbac': {
//       target: 'http://27.17.30.150:40581',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/rbac': '',
//       },
//     },
//     '/api': {
//       target: 'http://27.17.30.150:40582',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '',
//       },
//     },
//   },
//   test: {
//     '/api/': {
//       target: 'your pre url',
//       changeOrigin: true,
//       pathRewrite: { '^': '' },
//     },
//   },
//   pre: {
//     '/api/': {
//       target: 'your pre url',
//       changeOrigin: true,
//       pathRewrite: { '^': '' },
//     },
//   },
// };
