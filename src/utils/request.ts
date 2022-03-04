/*
 * @Descripttion: request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

import { extend } from 'umi-request';
import { notification, message } from 'antd';
import Cookies from 'js-cookie';
import { removeNull } from './util';
import { string } from 'prop-types';
import { SERVICEURL } from '@/utils/const';

// #region 设置
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const config = {
  // mock
  mock: 'mock url',
  mock_auth: 'mock auth',
  // 测试服务器地址
  pre: SERVICEURL,
  pre_auth: `${SERVICEURL}/api`,
  // 生产环境地址
  prod: SERVICEURL,
  prod_auth: SERVICEURL,
};
// #endregion

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  console.log('response', response, error);
  if (response && response.status) {
    //   const { code ,msg, request } = response;
    //   const errorText = msg;
    //   notification.error({
    //     message: `请求错误 ${code}: ${request}`,
    //     description: errorText,
    // });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'omit', // 默认请求是否带上cookie
  mode: 'cors',
});

const { NODE_ENV } = process.env;
const ENV = 'pre';

export const post_prefix = config[ENV];

let COOKIE_CONFIRM = true;

function custom_request(
  url: string,
  options: Parameters<typeof request>[1] = {},
) {
  let prefix: string;
  const { method = 'GET', params = {}, data, headers = {}, body } = options;

  if (/sea/.test(url)) {
    // 权限管理请求
    prefix = NODE_ENV === 'development' ? '/sea' : config[`${ENV}_auth`];
    url = url.slice(5);
  } else {
    // rwe请求
    prefix = NODE_ENV === 'development' ? '/api' : config[ENV];
  }

  // 判断cookie是否失效
  if (
    url !== '/v1/token' &&
    url !== '/v1/client/register' &&
    Cookies.get('token') === undefined
  ) {
    console.log(url);
    console.log(Cookies.get('token'));
    // 防止同时多次请求
    if (!COOKIE_CONFIRM) {
      return false;
    }
    COOKIE_CONFIRM = false;
    message.warning('登陆状态失效，请重新登陆！');
    window.location.href = `${window.location.origin}/#/user/login`;
    return false;
  }
  if (!COOKIE_CONFIRM) COOKIE_CONFIRM = true; // 防止同时多次请求

  // url加一个时间戳防止缓存引发的bug
  if (method === 'GET') {
    let timestamp = new Date().getTime();
    url += '?timestamp=' + timestamp;
  }

  return new Promise((resolve) => {
    request(prefix + url, {
      method,
      params: removeNull(params),
      data,
      body,
      credentials: 'omit',
      headers: {
        // 这里的request的header不能加在extend创建实例里
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
        ...headers,
      },
    }).then((res) => {
      if (res && res.code === 200) {
        // 如果post请求没有data，就返回true，以便判断generator下一步执行

        if (res.total !== undefined) {
          resolve({ data: res.data, total: res.total });
        } else {
          // console.log(res);
          resolve(res.data !== undefined ? res.data : true);
        }
      } else if (res) {
        // console.log('res', typeof res);
        if (res?.msg === 'token is invalid' && res.code === 10031) {
          document.cookie = '';
          message.warning('登陆状态失效，请重新登陆！');
        } else {
          if (typeof res === 'string' && res.search('http') !== -1) {
            resolve({ url: res });
          } else {
            notification.error({
              message: res.msg,
            });
          }
        }
      }
      resolve(null); // 错误不能reject 会导致generator call函数出错
    });
  });
}

export default custom_request;

export const requestAsPromise = async <R>(
  ...args: Parameters<typeof custom_request>
) => {
  const promise = custom_request(args[0], args[1] || {}) as Promise<R>;
  if (promise) {
    return await promise;
  } else {
    return await Promise.resolve(null);
    throw new Error('bad request');
  }
};

export const post = <R>(url, params = {}) =>
  requestAsPromise<R>(url, { ...params, method: 'POST' });

export const get = <R>(url, params = {}) =>
  requestAsPromise<R>(url, { ...params, method: 'GET' });

globalThis.request = custom_request;
