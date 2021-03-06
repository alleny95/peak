import Module from './views/modules/module'
import Create from './views/modules/create'
// import Upload from './views/upload/upload'
import Home from './views/Home.vue'
import basicInput from './views/input/basicInput'
import tablestyle from './views/tablestyle/tablestyle.vue'
import Playground from './views/modules/Playground'
import baseModules from './views/baseModules/baseModules'
let routes = [{
  path: '/',
  component: Home,
  name: '模板工作台',
  iconCls: 'el-icon-clouds-home',
  children: [
    {
      path: '/',
      name: '模板集市',
      component: Module
    },
    {
      path: '/detail/:id',
      name: '模板详情',
      // component: Detail,
      component: function (resolve) {
        require(['./views/modules/detail'], resolve)
      },
      hidden: true
    },
    {
      path: '/create',
      name: '新增模板',
      component: Create
    },
    {
      path: '/playground',
      name: 'Playground',
      component: Playground
    }
  ]
}, {
  path: '/',
  component: Home,
  name: '模板购物车',
  iconCls: 'el-icon-clouds-basemsg',
  children: [{
    path: '/basicInput',
    name: '基础input',
    component: basicInput
  }, {
    path: '/baseModules',
    name: '基础模板',
    component: baseModules
  },
  {
    path: '/tablestyle',
    name: '创建表格',
    component: tablestyle
  }]
},
{
  path: '*',
  hidden: true,
  redirect: { path: '/' }
}
]

export default routes
