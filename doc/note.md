# 写单测的好处
## 自己观点 (想)
- 以测试驱动代码.
- 单测减少代码错误,减少错误定位难度.
- 因为要写单测,所以会在写代码时进行更细致的拆分.
## 课中观点 (学)
- 提高开发效率
  - 更高阶的调试手法
  - 验证局部逻辑 一步到位
- 对修改代码更加自信
  - 新增功能 & 修 bug
  - 重构代码
  - check 别人提交的代码
- 活文档
- 改善程序设计 
## 提高效率 & 修改代码更自信
### 对应课时 
- [课程 01-为什么写测试-更高阶的调试手法-提高开发效率](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_63f37a52e4b030cacb189f3a?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=%2a%2a6%2a%2a)
- [02-单元测试在修改代码时的好处](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_63f6e324e4b02685a448152d?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
- [03-写测试的好处-活文档&改善程序设计](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_63f9c24ce4b06159f741212d?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
### 写新功能 场景
- 无单测写代码: 实现代码 -> 调试 (手动) -有错误-> 更改 -> ..
- 有单测写代码: 实现测试 -> 实现代码 -> 执行测试 -> 更改 -> 执行测试 
> 虽代码增加,但好处增加
> 1. 写单测会带来额外时间, 但是 可以自动化测试节省后续调试时间. 
> 2. 单测会成为代码对应的工能文档, 便于后续代码修改,逻辑梳理
### 修改代码 场景
- 无单测 : 修改老代码 -> 测试修改点流程 -> 测试记得的旧逻辑流程 -> 祈祷不要改坏旧代码 -> 担心 
- 有单测 : 建立修改点单测 -> 修改老代码 -> 跑新单测 -> 跑老单测 -> 产出真正的影响点告之测试同学 -> 专业 + 自信
### 重构代码 场景
- 无单测 : 旧逻辑责任未知 -> 不重构 -> 旧逻辑 越来越难处理 , 且 越来越分散. -> 代码质量差 -> 修代码场景增加成本 .
- 有单测 : 旧逻辑责任已知 -> 重构 -> 代码质量提升 -> 效率增加
### check 别人代码 场景
- 无单测 : 肉眼查看代码是否有问题 -> 测试所有功能 并-> 合并 -> 希望不要有bug
- 有单测 : 自动化跑单测 ->  肉眼查看代码质量 -> 合并 -> DONE
## 除测试以外的好处
1. 单测在完成的同时, 产生活文档. 且该文档会实时的根据代码逻辑进行修改. 不会存在文档没有更新的情况 . 
2. 因为需要写单测, 如果代码耦合在一起会增加单测成本. 所以会在执行层面 驱动自己执行 单一职责原则 .
3. 代码稳定, 文档全面, 打代码开心 , 加班减少 , B格拉满 .
# 其他技巧
1. 阅读源码从单测开始 (通过单测这份文档来熟悉代码逻辑) . 