### TMS SDK
这是淘宝物流云电子面单node sdk
[接口列表](http://pac.i56.taobao.com/apiinfo/showDetail.htm?spm=0.0.0.0.rk65vF&apiId=TMS_WAYBILL_SUBSCRIPTION_QUERY&type=merchant_electronic_sheet)
##### 安装
```
npm install tmssdk --save
```
##### 初始化

```javascript
const TMS = require('tmssdk')
const tms = new TMS('appKey', 'secretKey', 'token')
```

其中关于appkey，secretkey，token的获取方法，可以参考官方提供的白皮书
[电子面单接入文档白皮书](http://open.taobao.com/docs/doc.htm?docType=1&articleId=107052#s10)

##### query()函数

获取发货地，CP开通状态，账户的使用情况
使用例子如下

```javascript
const TMS = require('tmssdk')
const tms = new TMS('appKey', 'secretKey', 'token')
tms.query().production(true).request().then(function(result){
    console.log(result)
}).catch()
```
##### get()函数

电子面单云打印取号接口，使用例子如下

```javascript
const TMS = require('tmssdk')
const tms = new TMS('appKey', 'secretKey', 'token')
tms.get().production(true).body({
  sender, packageInfo, ...otherInfo
}).request().then(function(result){
    console.log(result)
}).catch()
```
##### 测试
```
mocha test
```

##### License
MIT







