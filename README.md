# insranceDetail

- 使用vue-cli4 构建

- 基于vue3.0 + vue-router4.0 + axios + webpack + TS + stylus + eslint + prettier

- 开发环境 nodejs v12.14.0 , yarn 1.21.1


```
# 安装依赖
npm install 
# or
yarn

# 开发环境编译和热加载
npm run serve 
# or
yarn serve

# 测试环境打包 -- 使用测试环境接口地址
npm run build:dev
# or
yarn build:dev

# 生产环境编译和压缩  -- 使用线上地址
npm run build
# or
yarn build

# 执行eslint检查并按配置eslint格式化文件
npm run lint
# or
yarn lint

```

## ✅主要目录结构

```
public
├─ favicon.ico   # 网站图标
├─ index.html    # 入口页面
|
src
|- assets  # 静态资源目录
|  ├─ images      # 本地图片
|  └─ stylus      # 公共样式
|      ├─ index.styl  # 公共样式导入入口
|      ├─ reset.styl  # 全局重置样式
|      ├─ mixin.styl  # mixin
|      └─ theme.styl  # 主题样式
|
|- api  # 请求相关目录
|
|- components   # 存放公共组件目录
|
|- views        # 存放页面级视图组件目录
| 
|- utils # 工具类
|   ├─ request.js         # 封装axios
|   └─ mitt.js            # Eventmitter 合集
|
|- router # 存放路由目录
|   ├─ index.js           # 主入口
|   ├─ routerGuards.js    # 路由警卫
|   └─ modules.js         # 页面路由模块化
|
├─ .env               # 开发环境接口前缀配置
├─ .env.development   # 测试环境接口前缀配置
├─ .env.production    # 生产环境接口前缀配置
├─ .gitignore         # git忽略文件
├─ .eslintrc.js       # ESLint标准配置
├─ .prettierrc.js     # prettier配置 统一代码风格
├─ babel.config.js    # babel常用配置
├─ vue.config.js      # vue常用配置项
├─ package.json       # 依赖
├─ postcss.config.js  # 预处理配置
└─ README.md          # 开发须知

```

## ✅已完成的配置、功能及相关说明 

##### 1. px自动转为rem，编写样式直接以px为单位。

* 默认按375px的设计稿为基准，可在`postcss.config.js`中修改

##### 2. stylus样式相关

* 可在全局使用mixin函数，在`mixin.styl`中编写
* 全局样式写在`reset.styl`中
* 主题样式写在`theme.styl`中，引用时需使用mixin方法

##### 3. jsBridge封装（delete）

* hybridApp交互函数已封装，相关方法请写在jsBridge.ts中进行引用使用，禁止直接调用交互函数

##### 4. axios封装
    
* axios封装出 Service()，具体method和data或params须开发者自己分辨
 
## ✅开发编码相关约定

##### 1. 关于路径

* router可按业务进行模块划分为独立文件，再导入index使用
* 导入组件的路径请使用别名components导入，配置见`vue.config.js`
       
##### 2. 关于命名

* 目录使用`pascalCase`驼峰式命名
* 组件命名统一使用 `PascalCase` 首字母大写驼峰式
    
##### 3. 关于样式

* 统一使用stylus编写样式
* 使用px为单位即可
* 使用mixin抽取公共颜色变量、重复的代码块，写在`theme.stylus`中

##### 4. 提交代码前 必须先解决eslint的警告和报错

##### 5. 两个及以上的页面用到相同的组件或功能，应考虑是否封装，是否使用hooks，避免代码重复copy
