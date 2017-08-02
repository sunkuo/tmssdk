const crypto = require('crypto')
const rp = require('request-promise')

const MSG_TYPE = {
  query: 'TMS_WAYBILL_SUBSCRIPTION_QUERY',
  get: 'TMS_WAYBILL_GET',
  update: 'TMS_WAYBILL_UPDATE',
  discard: 'TMS_WAYBILL_DISCARD'
}

const PRODUCTION_ENDPOINT = 'http://link.cainiao.com/gateway/link.do'
const DEVELOP_ENDPOINT = 'http://linkdaily.tbsandbox.com/gateway/link.do'

const TMS = function (appId, appSecret, token) {
  this.appId = appId
  this.appSecret = appSecret
  this.token = token
  this.apiContent = {}
  this.production(false)
  return this
}
module.exports = TMS

TMS.prototype.token = function (token) {
  this.token = token
  return this
}

TMS.prototype.content = function (content) {
  this.content = content
  return this
}

TMS.prototype.production = function (env) {
  this.endPoint = !!env ? PRODUCTION_ENDPOINT : DEVELOP_ENDPOINT
  return this
}

TMS.prototype.request = function () {
  const that = this
  const options = {
    method: 'POST',
    uri: that.endPoint,
    form: bodyParam(that, that.apiContent)
  }
  console.log(options)
  return rp(options)
}

TMS.prototype.body = function (param) {
  this.apiContent = param
  return this
}

const commonBodyParam = function (ctx) {
  return {
    msg_type: ctx.msgType,
    logistic_provider_id: ctx.token
  }
}

const interfaceBodyParam = function (param) {
  return JSON.stringify(param)
}

const digestParam = TMS.prototype.digestParam = function (apiContent, secretKey) {
  const combine = JSON.stringify(apiContent) + secretKey
  const hash = crypto.createHash('md5')
  hash.update(Buffer.from(combine,'utf8'))
  return hash.digest('base64').toString('utf8')
}

const bodyParam = function (ctx, param) {
  return Object.assign(commonBodyParam(ctx), {
    data_digest: digestParam(param, ctx.appSecret),
    logistics_interface: interfaceBodyParam(param)
  })
}

const methods = ['query', 'get', 'update', 'discard']
methods.forEach((item) => {
  TMS.prototype[item] = function () {
    this.msgType = MSG_TYPE[item]
    return this
  }
})