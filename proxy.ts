// import { SERVICEURL } from './src/utils/const';
export default {
  dev: {
    '/rbac': {
      target: 'rbac url',
      changeOrigin: true,
      pathRewrite: {
        '^/rbac': '',
      },
    },
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

    '/orthanc': {
      target: 'http://27.17.30.150:20083',
      changeOrigin: true,
      pathRewrite: {
        '^/orthanc': '',
      },
    },

    '/web-viewer': {
      target: 'http://27.17.30.150:20083/web-viewer',
      changeOrigin: true,
      pathRewrite: {
        '^/web-viewer': '',
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
