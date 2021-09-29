# 第三方路由

我们暴露了一个`POST`接口作为路由存在。你可以向该接口发送已经解析好的Feed对象。该接口继承了`RSSHub`生成`XML`的能力，会根据你发送的对象返回实时的`XML`文件。

## 使用示例

```
< 你的rsshub根地址 >/third-party
{
  headers: content-type: application/json
}
```
### got

```js
got({
  method: 'POST',
  url: 'https://rsshub.app/third-party',
  body: JSON.stringfy({
    title: '标题',
    description: '描述',
    item: [{
      title: '项目1'
      // .....
    }]
  })
})
```

