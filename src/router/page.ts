// 首页
const Index = () => import('@/views/Index/Index.vue')

// 404
const NotFound = () => import('@/views/NotFound/NotFound.vue')

// form
const Form = () => import('@/views/Form/Form.vue')

export default [
  // 找不到重定向
  { path: '*', redirect: '/NotFound' },
  // 404
  { path: '/NotFound', name: 'NotFound', component: NotFound, meta: { title: '页面找不到啦' } },
  //首页
  { path: '/', name: 'Index', component: Index, meta: { title: '波波要火' } },
  // form表单
  { path: '/form', name: 'Form', component: Form, meta: { title: 'form表单' } }
]
