import request from "umi-request";

// 登录获取token和用户信息
export async function Register(body:any) {
  console.log(body);
  const newBody = { ...body };
  console.log('newBody', newBody);
  return request('??', {
    method: 'POST',
    data: newBody,
  });
}
