const routerConfig = [
  {
    path: '/user',
    component: '@/layouts/Userlayout/Userlayouts',
    routes: [
      {
        path: '/user/login',
        component: '@/pages/user/login/index',
      },
      {
        path: '/user/register',
        component: '@/pages/user/register/index',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout/BasicLayouts',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        path: '/',
        component: '@/pages/index',
      },
      {
        path: '/basicInfo',
        component: '@/pages/basicInfo/index',
      },
      {
        path: '/doctorInfo',
        component: '@/pages/doctorInfo/index',
      },
      {
        path: '/staffManage',
        component: '@/pages/staffManage/index',
      },
    ],
  },
];

export default routerConfig;
