# 如何写单测
> 课时: [11-编写第一个单元测试](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_640c971de4b02685a4513ca5?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
自动化测试 来源于手动测试,使用代码模拟手动调用功能的步骤:
1. 准备数据 (given) -> 例如准备一些 测试数据,填充列表, input 输入
2. 调用测试的功能(when) -> 例如 点击上传按扭,点击保存 
3. 验证功能(then) ->  例如 保存后返回了我们想要的数据
4. 拆卸 -> 例如 刷新页面,清理缓存,清理后端数据,切换新帐号.保证测试环境干净
# 准备测试数据的方式
## 课时
[16-准备测试数据的三种方式](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_64296c96e4b0b0bc2bd102d8?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
[17-后门操作准备数据的方式](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_642c20fee4b0f2aa7dd73ec2?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
## 内联
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
## 委托
- 通过函数创建一个数据
- 优点 : 可以解决代码重复 , 可读性变高  
### 工厂模式
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
### 内联
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
## 隐式
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
## 后门操作准备数据
- 通过修改业务代码实现数据保存,例如 store 中没有 数据,我们可以通过 add 方法也可以通过 操作 store 来传入数据.而 操作 store 就是后门操作
- 缺点: 后门操作是脆弱测试, 如果结构发生变化,测试很容易出错.
- 优点: 在没有创建数据的方法时,可以即使使用.
