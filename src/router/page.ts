// 首页
const Index = () => import('@/views/Index/Index.vue')

// 404
const NotFound = () => import('@/views/NotFound/NotFound.vue')

// form
const Form = () => import('@/views/Form/Form.vue')

export default [
  // 找不到重定向
  { path: '*', redirect: '/notfound' },
  // 404
  { path: '/notfound', name: 'NotFound', component: NotFound, meta: { title: '页面找不到啦' } },
  //首页
  { path: '/index', redirect: '/' },
  { path: '/', name: 'Index', component: Index, meta: { title: '欢迎光临💂' } },
  // form表单
  { path: '/form', name: 'Form', component: Form, meta: { title: 'form表单' } }
]
