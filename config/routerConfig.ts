/*
 * @Author: Meng Tian
 * @Date: 2022-03-05 11:40:09
 * @Descripttion: Do not edit
 */

export default [
  {
    path: '/',
    redirect: '/user/login',
  },
  {
    path: '/user/login',
    // component: '../pages/user/login/index',
    component: '@/layouts/index',
    routes: [
      {
        path: '/user/login',
        component: '../pages/user/login/index',
      },
    ],
  },
  {
    path: '/user/register',
    // component: '../pages/user/register/index',
    component: '@/layouts/index',
    routes: [
      {
        path: '/user/register',
        component: '../pages/user/register/index',
      },
    ],
  },
  {
    path: '/main',
    component: '@/layouts/index',
    routes: [
      {
        path: '/main',
        component: '../pages/main/index',
      },
    ],
  },
];
