const routerConfig = [
  {
    path: '/user',
    components: '@/layouts/Userlayout/Userlayouts',
    routes: [
      {
        path: '/user/login',
        components: '@/pages/user/login/index',
      },
      {
        path: '/user/register',
        components: '@/pages/user/register/index',
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
        components: '@/pages/index',
      },
      {
        path: '/basicInfo',
        components: '@/pages/basicInfo/index',
      },
      {
        path: '/doctorInfo',
        components: '@/pages/doctorInfo/index',
      },
    ],
  },
];

export default routerConfig;
