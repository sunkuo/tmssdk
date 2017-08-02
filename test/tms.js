const should = require('should')
const Tms = require('../tms.js')

const APPKEY = 'your app key',
const SECRETKEY = 'your secret key',
const TOKEN = 'your token key'

describe('tmssdk', function() {
  it('query should word', function(done) {
    const tms = new Tms(APPKEY, SECRETKEY, TOKEN)
    tms.query().production(true).request().then((result) => {
      console.log(result)
      done()
    }).catch(done)
  })

  it('get should work', function(done) {
    const tms = new Tms(APPKEY, SECRETKEY, TOKEN)
    const sender = {
      address : {
          city : "上海市",
          detail : "夏宁路666弄130号",
          district : "金山区",
          province : "上海"
      },
      mobile : "17717351001",
      name : "张新永",
      phone : "17717351001"
    }
    const orderInfo = {
      orderChannelsType : "OTHERS",
      tradeOrderList : [
          "1"
      ]
    }

    const packageInfo = {
      items: [
        {
            count : "1",
            name : "衣服"
        }
      ]
    }

    const recipient = {
      address : {
          city : "北京市",
          detail : "花家地社区卫生服务站",
          district : "朝阳区",
          province : "北京",
          town : "望京街道"
      },
      mobile : "1326443654",
      name : "Bar",
      phone : "057123222"
    }
    
    tms.get().production(true).body(
    {
      cpCode : "YUNDA",
      dmsSorting : "false",
      sender : sender,
      tradeOrderInfoDtos : [
          {
              objectId : "1",
              orderInfo : orderInfo,
              packageInfo : packageInfo,
              recipient: recipient,
              templateUrl : "http://cloudprint.cainiao.com/template/standard/401/152",
              userId : "12"
          }
      ]
    }).request().then((result) => {
      console.log(result)
      done()
    })
  })
})