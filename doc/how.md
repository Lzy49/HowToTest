# 如何写单测
> 课时: [11-编写第一个单元测试](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_640c971de4b02685a4513ca5?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
自动化测试 来源于手动测试,使用代码模拟手动调用功能的步骤:
1. 准备数据 (given) -> 例如准备一些 测试数据,填充列表, input 输入
2. 调用测试的功能(when) -> 例如 点击上传按扭,点击保存 
3. 验证功能(then) ->  例如 保存后返回了我们想要的数据
4. 拆卸 -> 例如 刷新页面,清理缓存,清理后端数据,切换新帐号.保证测试环境干净

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
### 总结
- mock 可以直接更改业务代码依赖对象.
