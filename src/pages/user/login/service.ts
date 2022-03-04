import request from 'umi-request';

// 登录获取token和用户信息
export async function Login(body:object) {
  // console.log(body);
  return request('/login', {
    method: 'POST',
    data: body
  })
}