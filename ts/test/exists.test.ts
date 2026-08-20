
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TypeformSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TypeformSDK.test()
    equal(null !== testsdk, true)
  })

})
