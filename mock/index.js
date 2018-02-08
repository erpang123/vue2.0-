var Mock = require('mockjs')
var good = require('./goods.json')
console.log(good)

export const seller = Mock.mock('/api/seller', good)
export const goods = Mock.mock('/api/goods', good)
export const message = Mock.mock('/api/message', good)
