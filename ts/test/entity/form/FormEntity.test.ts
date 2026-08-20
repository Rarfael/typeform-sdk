
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { TypeformSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('FormEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TYPEFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TYPEFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TypeformSDK.test()
    const ent = testsdk.Form()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TYPEFORM_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'form.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set TYPEFORM_TEST_FORM_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const form_ref01_ent = client.Form()
    let form_ref01_data = setup.data.new.form['form_ref01']

    form_ref01_data = (await form_ref01_ent.create(form_ref01_data)).data()
    assert(null != form_ref01_data.id)


    // LIST
    const form_ref01_match: any = {}

    const form_ref01_list = (await form_ref01_ent.list(form_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(form_ref01_list, { id: form_ref01_data.id })))


    // UPDATE
    const form_ref01_data_up0: any = {}
    form_ref01_data_up0.id = form_ref01_data.id

    const form_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-form_ref01_' + setup.now }
    ;(form_ref01_data_up0 as any)[form_ref01_markdef_up0.name] = form_ref01_markdef_up0.value

    const form_ref01_resdata_up0 = (await form_ref01_ent.update(form_ref01_data_up0)).data()
    assert(form_ref01_resdata_up0.id === form_ref01_data_up0.id)

    assert((form_ref01_resdata_up0 as any)[form_ref01_markdef_up0.name] === form_ref01_markdef_up0.value)


    // LOAD
    const form_ref01_match_dt0: any = {}
    form_ref01_match_dt0.id = form_ref01_data.id
    const form_ref01_data_dt0 = (await form_ref01_ent.load(form_ref01_match_dt0)).data()
    assert(form_ref01_data_dt0.id === form_ref01_data.id)


    // REMOVE
    const form_ref01_match_rm0: any = { id: form_ref01_data.id }
    await form_ref01_ent.remove(form_ref01_match_rm0)
  

    // LIST
    const form_ref01_match_rt0: any = {}

    const form_ref01_list_rt0 = (await form_ref01_ent.list(form_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(form_ref01_list_rt0, { id: form_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/form/FormTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TypeformSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['form01','form02','form03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['TYPEFORM_TEST_FORM_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'TYPEFORM_TEST_FORM_ENTID': idmap,
    'TYPEFORM_TEST_LIVE': 'FALSE',
    'TYPEFORM_TEST_EXPLAIN': 'FALSE',
    'TYPEFORM_APIKEY': 'NONE',
  })

  idmap = env['TYPEFORM_TEST_FORM_ENTID']

  const live = 'TRUE' === env.TYPEFORM_TEST_LIVE

  if (live) {
    client = new TypeformSDK(merge([
      {
        apikey: env.TYPEFORM_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TYPEFORM_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
