# 课时
[12-掌握 Vitest 的基础 API](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_641885fbe4b0b2d1c3fb32cf?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
# test & it 
## 相同
- 创建一个 测试案例 
## 不同
### test 
- 由 Jest 提出,更好的语意化
### it
- it 来源于 BDD 以 行为驱动测试 . 要求命名为 ` it should xx xx `  
- 相关案例库 Mocha Jasmine
## 使用建议
- 统一团队使用一种即可
# describe 
- 创建一个测试套件, 可以放多个test , 用来分类测试 .
- 以分类形式管理真个 类别中的所有 test
- 可以嵌套
# expect 
- 断言函数 , 用来创建一个断言
### 判断方式
- toBe : ===
- toEqual : 比较 两个对象 值 非 地址
- toBeTruthy : 判断值是否是个真值 `1` , `true` 
- toBeFalsy : 判断值是否是一个否值 `false` , `0`
- toContain : 判断值是否在数组中 或 字符串中
- toThrow : 判断函数是否会抛出错误, 如果传入值会判断 错误内容是否相同.
# mock 
- mock 模拟数据
## 相关api
- vi.mock  创建一个 mock  ( 和  mocked 有冲突, 不能两个位置定义数据)
- vi.mocked 获取当前已有的mock
  - mockReturnValue(value) // 替换 mock 中的值
- vi.doMock 创建一个 mock 数据 但是不会被提升到最上面
## 模拟值,获取业务产出模拟值
- 在使用 vi.mock 的时候会将一个模块的内容个性化,如果想要模块本身的值可以通过函数获取.
```

```
# vitest 生命周期
## 执行顺序 & 作用域
1. 生命周期对同层有效果
2. 每一个 describe 内部的生命周期只会对内部有效
## 生命周期有那些
- beforeAll : 
  - 只会执行一次 , 在最开始的时候 ( 数据库 连接创建 , 创建临时文件 , )
  - 提供一个返回函数 : afterAll ( 在 afterAll 之后执行)
- beforeEach : 
  - 每个 test 都会执行一次 ( pinia 创建)
  - 提供一个返回函数 : afterEach ( 在 afterEach 之后执行)
- test : 测试本测
- afterEach : 每个 test 结束都会执行 (pinia 数据恢复)
- afterAll : 所有测试结束后执行 ( 数据库 断开 , 临时文件 删除)
# 修饰符
## 作用
服务与 describe 和 test 对其起作用
## 常用
- skip : 跳过
- only : 只测试
- todo : 注释 , 备注
# 命令
- vitest xxx 测试单独文件 ( 默认watch )
- vitest run ( 只执行一次 )
# vscode 插件
- vitest snippets 
