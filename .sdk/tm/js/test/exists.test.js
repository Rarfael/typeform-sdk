
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { TypeformSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TypeformSDK.test()
    equal(null !== testsdk, true)
  })

})
