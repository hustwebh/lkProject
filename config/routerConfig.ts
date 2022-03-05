/*
 * @Author: Meng Tian
 * @Date: 2022-03-05 11:40:09
 * @Descripttion: Do not edit
 */

export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: '../pages/user/login/index',
    routes: [
      {
        path: '/main',
        component: '../pages/main/index',
      },
    ],
  },
  {
    path: '/register',
    component: '../pages/user/register/index',
    routes: [
      {
        path: '/main',
        component: '../pages/main/index',
      },
    ],
  },
  {
    path: '/main',
    component: '../pages/main/index',
  },
];
