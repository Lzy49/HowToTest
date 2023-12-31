# 如何写单测
> 课时: [11-编写第一个单元测试](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_640c971de4b02685a4513ca5?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
自动化测试 来源于手动测试,使用代码模拟手动调用功能的步骤:
1. 准备数据 (given) -> 例如准备一些 测试数据,填充列表, input 输入
2. 调用测试的功能(when) -> 例如 点击上传按扭,点击保存 
3. 验证功能(then) ->  例如 保存后返回了我们想要的数据
4. 拆卸 -> 例如 刷新页面,清理缓存,清理后端数据,切换新帐号.保证测试环境干净
# 什么样的代码是可测的
## 课时
[26-可预测性-随机数-日期date](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_6448ee48e4b0b0bc2bdd23c2?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
## 结论
代码逻辑是稳定的, 保证给定输入时产生可预测的输出.
## 解决
以 mock 来模拟外部依赖,来解决外部库的稳定性
# 准备测试数据的方式 ( given )
## 课时
- [16-准备测试数据的三种方式](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_64296c96e4b0b0bc2bd102d8?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
- [17-后门操作准备数据的方式](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_642c20fee4b0f2aa7dd73ec2?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
- [18-最小准备测试数据原则](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_643023b0e4b0f2aa7dd8b890?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
## 方式
### 内联
- 数据准备在测试中 , 不进行任何处理
- 缺点: 数据重复, 可读性变差 , 后续维护成本增加
- 优点: 无脑
- 使用场景: 一开始使用后续维护 
```javascript
it('add', () => {
  const item = {title:'xx'}
  expect(add(item)[0].title).toBe('xx')
})
```
### 委托
- 通过函数创建一个数据
- 优点 : 可以解决代码重复 , 可读性变高  
#### 工厂模式
```ts
function createItem(title:string , content : string = 'content' ){
  return {title,content}
}
it('add', () => {
  const item = createItem('标题');
  expect(add(item)[0].title).toBe('标题')
})
it('add', () => {
  const item = createItem('标题','内容');
  expect(add(item)[0].title).toBe('标题')
  expect(add(item)[0].content).toBe('内容')
})
```
#### 内联
```ts
function createItem(title:string , content : string = 'content' ){
  return {title ,content}
}
it('add', () => {
  const item = createItem('标题');
  expect(add(item)[0].title).toBe('标题')
})
it('add', () => {
  const item = createItem('标题','内容');
  item.title = '你好'
  expect(add(item)[0].title).toBe('你好')
  expect(add(item)[0].content).toBe('内容')
})
```
### 隐式
- 通过 vitest 的 生命周期创建.
- 缺点:可读性变差
- 使用: 
  - 使用 describe 将两个内容放在一起
  - 不要在一个 生命周期中创建一系列参数 割裂代码.
```ts
let item = {name :'xx'}
before(()=>{
  item = {name:'xx'}
})
it('add',() => {
  expect(add(item)[0].title).toBe('标题')
})
```
### 后门操作准备数据
- 通过修改业务代码实现数据保存,例如 store 中没有 数据,我们可以通过 add 方法也可以通过 操作 store 来传入数据.而 操作 store 就是后门操作
- 缺点: 后门操作是脆弱测试, 如果结构发生变化,测试很容易出错.
- 优点: 在没有创建数据的方法时,可以即使使用.
## 原则
### 最小准备原则
1. 在准备数据的时候,和当前测试无关的数据不需要提供,保持单元测试的可读性.
2. 原因: 
   1. 测试代码维护成本要 < 业务代码成本. 大家才能有动力写.
   2. 测试是代码api的用户.所以 测试代码简单 == api 封装的好
## 解决方案:
1. 修改业务代码,删除多余参数 or 可选值 . -> 单测是一个 api 的用户, 修改业务代码是有必要性的. 单测 会产生的操作在业务中也会存在.
2. 使用工厂模式 helper.
3. 使用后面操作.
### round-trip
尽量不使用后门方法去创建测试数据, 而是使用 已有业务函数创建数据. 
# 调用测试的功能
## 课时
1. [19-程序的间接输入-依赖函数调用-stub 的应用](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_6432c647e4b0b2d1c405309f?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
2. [20-程序的间接输入-第三方库&对象&class&常量](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_64352f78e4b0b0bc2bd55ba4?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
3. [21-程序的间接输入-环境变量-全局global-间接层处理技巧](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_64397ffce4b0f2aa7ddc47d1?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
4. [22-程序的间接输入-依赖注入](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_643cae20e4b0b2d1c408cd69?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
5. [23-状态验证](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_643eba54e4b09d72378e3ca0?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
6. [24-行为验证](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_64435ffde4b0cf39e6bf843f?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
7. [25-不知道验证什么-完美主义&功能的目的&小步走](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_64465d3ee4b0f2aa7de11df1?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
8. [27-快速反馈-处理异步代码time—promise](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_644a80e0e4b0b0bc2bddd875?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
9. [28-API 的多种测试方案](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_6453c3a7e4b0b2d1c41111c9?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
10. [29-参数化验证](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_6456febfe4b0b0bc2be15950?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
11. [33-掌握使用 test double 测试替身的核心思想]([660e6ae4b0b0bc2be74b3c?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_64660e6ae4b0b0bc2be74b3c?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6))
12. [34-测试替身的类型-dummy-stub-spy-mock-fake](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_646a37bfe4b0cf39e6cd2f32?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
13. [35-独居测试和群居测试](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_646cd4c8e4b0b0bc2be9a901?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
## 输入
### 直接输入
- 测试代码直接给 业务代码传入的 内容. 
```js
it('test 直接' , () => {
  const a = {name:'直接值'} // 直接输入
  expect(fn(a).name).toBe('直接值')
})
```
### 程序间接输入
#### 依赖函数调用 stub
- 测试传入值是另一个业务函数创造的值.
- 常用在 数据在 内存 , 环境变量 ,store 中
#### 方法
#### 处理普通值
- 替换掉真实的逻辑实现.
- 使用场景 : 当我们可以控制传入值时,可以使用这种方式.
- 方案:使用 mock 模拟程序产生数据.
```js
function createItem(){
  return {
    name:'xx',
    money:100
  }
}
function addMoney(item){
  item.money ++ ; 
  return item
}
```
```js
import { mockCreateItem } from './user'
vi.mock("./user", () => {
  return {
    mockCreateItem(){
      return {
        name:'xx'
        money:10
      }
    }
  }
})
it('test 依赖函数调用',() => {
  expect(addMoney(createItem()).money).toBe(101) // wrong : 因为数据容易发生改变, 我们写死后 , 修改逻辑代码会发生改变.
  expect(addMoney(mockCreateItem()).money).toBe(101) // 正确的测试, 使用了 mock 中的数据, 数据不会因为上面的函数发生变化而变化.
})
```
##### 处理 Promise 异步
- 直接使用 mock 返回 Promise 即可 .
##### 接入第三方库&对象&class&常量
###### 第三方库
其实第三方库的本质也是函数, 只需要使用 mock 进行模拟即可
```js
vi.mock('axios')
describe('test axios', async () => {
  test('test axios', async () => {
    vi.mocked(axios).mockResolvedValue({
      name: '李四'
    })
    const data = await fetchData()
    expect(data.name).toBe('李四')
  })
})
```
##### 对象
`vi.mock`直接更改对象的值, 但是要保证有卸载.
##### 模块常量
`vi.mock`直接更改常量值
##### 获取env常量
- `vi.stubEnv` 更改常量
- `vi.unstubEnv` 取消常量更改
##### 获取window常量
- `vi.stubGlobal` : 接收两个值 把第二个值绑定在 window 的第一个值key上.
- `vi.unstubGlobal` : 删除  `vi.stubGlobal` 绑定的所有值
##### 通过间接层处理输出
给 window 对象使用的函数增加一个工具函数包裹.从而可以通过 mock 函数来解决获取 window 问题.
##### 依赖注入
需要什么就传入什么. 比如需要 window 就将 window 传入 不使用环境本身可以拿到的 window
### 总结
- mock 可以直接更改业务代码依赖对象.
## 验证
###  状态验证
#### 状态是什么
- 属性 
- 数据结构
#### 状态验证是什么
- 状态验证就是 对 结果的属性 和 数据结构进行验证. 对实现逻辑不关注
#### 状态验证的好处
- 可以放心大胆的重构
#### 操作
##### 内部数据
- 通过暴露接口获取验证
##### 依赖数据
- 在 test 中引入 ,使用依赖的测试方法测试.
### 行为验证
#### 什么是行为验证
- 验证对象之间的交互是否按照预期进行.
- A 调用了 B 的 c 方法.
#### 测试点
1. 函数调用了几次
2. 调用函数的对象是什么.
#### 操作
1. 假定状态的改变都是因行为的改变引起的.
2. 只要行为是正确的那状态就会是正确的.
##### mock ( 测试替身 )
1. 生成测试提升
2. 记录交互信息
3. 验证交互信息
#### 缺点
1. 测试行为会根据行为验证,所以内部逻辑发生改变,则测试会报错.
2. 和状态无关,但是我们的业务是与结果强相关的,所以会丧失测试有效性.
#### 使用时机
1. 状态非常难获取, http 请求 , 第三方库.
2. 成本不够的问题, http 返回值. 
3. 调试bug
### 我们要验证什么
1. 我们验证的内容是整个业务的功能,而不应该聚焦在一个小函数上. 如果这个小函数可以满足当前业务 则不需要对它进行更多的验证.
2. 用到什么功能就写什么功能, 不要过度设计 , 需要再写.
### 测试要快
1. 测试一定要快, 因为是替换手动测试的.
2. 一些 api 不够快应该使用对应的工具处理 
### API 测试方案
#### mock axios (不推荐)
##### 提交
1. mock axios  mockImplementation 改写服务. 
2. 执行业务代码,返回 mock 数据 验证状态.
##### 返回值
1. mock axios 返回值
2. 执行业务代码 返回 mock 数据 验证状态.
#### mock axios 中间层
##### 提交
1. mock axios  mockImplementation 改写服务. 
2. 执行业务代码,返回 mock 数据 验证状态.
##### 返回值
1. mock axios 返回值
2. 执行业务代码 返回 mock 数据 验证状态.
#### mock 接口 中间层
1. mock 接口封装
2. 验证业务代码 返回 mock 数据 验 证状态.
> 优势 1. mock 接口封装可以明确接口 , 2. 当 axios 发生变化时,不会影响 mock .
#### 参数化验证
- 解决 提供给多个 test case 中重用相同测试逻辑的方法. 相当于 forEach 执行相同逻辑
- API each
#### 测试替身
- 作用: 将被测代码 与 周围隔离开 掌握一切
- 场景: 当我们有 5个功能 , 我们可以只隔离出 其中 2个来测试, 然后避免受其他3个的影响.
- 好处:
  - 加速测试 : 替换接口, setTime
  - 使执行变得确定 : 替换接口 , 随机值, 日期
  - 模拟特殊场景 : 测试网络断开, 测试 环境清理 token.
  - 暴露隐藏信息 : 行为测试,测试某个功能的行为
####  测试替身分类
- 哑元对象: dummy 对象 : 
  - 一个 case 只测试一项功能,但一些代码需要传入多变量,而无关测试的变量使用哑元对象来表示.
  - 为了解决类型报错 , 业务函数要求 等问题.
- 测试桩 stub : 
  - 用来隔离依赖,让 case 专注测试.
  - 用来处理间接输入. 
- 测试间谍 Spy:
  - 收集细节信息, 用于细节测试.
- 模拟对象 Mock :
  - stub + spy 
  - 隔离依赖 ,处理间接输入
  - 收集细节信息 .
- 伪造对象 Fake:
  - 真实实现的简化版 来保证 逻辑可以实现测试.
#### 测试策略
- 独居测试 : 
  - 只测试待测系统,依赖的东西全部隔离.
  - 通过 mock stub 去模拟 依赖
  - 好处: 精准定位问题
  - 缺点: 
    - 需要写大量依赖.
    - 暴露实现细节. 增加重构成本
    - 忽略组件交互
  - 场景:
    - 架构清晰的情况下可以使用
- 群居测试 : 
  - 测试待测系统的依赖模块.
  - happy path
  - 好处:
    - 真实场景
    - 可以知道组件之间的交互
  - 缺点:
    - 定位问题困难
    - setup 费力
  - 解决:
    - 小步走 
    - setup 做工具, 做闭包
#### 单测原则
1. 不要写和当前 case 无关的内容
# 手动 -> 自动
## 课时
- [30-手动测试到单元测试的认知转变](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_645ce7c2e4b0f2aa7de8dbb1?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
## 结论
1. 单测的责任是 逻辑测试 ,而组件的操作是由组件测试完成的.
2. 如果想给项目增加单测 , 就需要 将 组件能力 和 逻辑能力分离.
3. e2e ( 小 ) <- 组件 ( 中 ) <- 单测 ( 大 ) 
# 测试基本策略
## 课时
- [31-测试的基本策略-正向测试&反向测试&异常测试](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_6460a37ce4b0f2aa7dea0338?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
## 策略类型
- 正向测试 (happy path) : 给定预期输入 , 满足功能需求
- 反向测试 (sad path) : 给定无效,错误输入, 看是否满足功能需求
- 异常测试 (sad path) : 检测代码是否可以正常报错.
## 操作
1. 当写测试时,有其他想法.利用todo来记录,不打断当前测试 
  
# 测试回报率
## 课时
- [32-不是所有代码都值得写测试](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_646362afe4b0cf39e6cac237?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
## 结论
### 要测试
- 只测回报率较高的: 公用库,公用组件,重要逻辑.
- 只测试容易出错的逻辑.
- 针对功能做测试 , 而不是某个函数.
### 不测试
- 逻辑非常简单的
- 第三方库的简单包装
- 非关键代码 