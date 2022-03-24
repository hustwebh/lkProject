const routerConfig = [
  {
    path: '/user',
    // component: '@/layouts/Userlayout/Userlayouts',
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
  // {
  //   path: '/patientDetails',
  //   component: '@/layouts/BasicLayout/BasicLayouts',
  //   routes: [
  //     {
  //       path: '/patientDetails/:?patient_id',
  //       component: '@/pages/patientDetails/[patient_id].tsx'
  //     },
  //   ],
  // },
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
        path: '/medicalInfo',
        component: '@/pages/medicalInfo/index',
      },
      {
        path: '/ctInfo',
        component: '@/pages/ctInfo/index',
      },
      {
        path: '/infoSearch',
        component: '@/pages/infoSearch/index',
      },
      {
        path: '/staffManage',
        component: '@/pages/staffManage/index',
      },
      {
        path: '/patientDetails',
        component: '@/pages/patientDetails/[patient_id].tsx',
      },
    ],
  },
];

export default routerConfig;
