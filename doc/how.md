# 如何写单测
> 课时: [11-编写第一个单元测试](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/video/v_640c971de4b02685a4513ca5?product_id=p_63f3795ee4b06159f73e6452&content_app_id=&type=6)
自动化测试 来源于手动测试,使用代码模拟手动调用功能的步骤:
1. 准备数据 (given) -> 例如准备一些 测试数据,填充列表, input 输入
2. 调用测试的功能(when) -> 例如 点击上传按扭,点击保存 
3. 验证功能(then) ->  例如 保存后返回了我们想要的数据
4. 拆卸 -> 例如 刷新页面,清理缓存,清理后端数据,切换新帐号.保证测试环境干净
