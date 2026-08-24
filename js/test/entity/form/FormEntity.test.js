
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { TypeformSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('FormEntity', async () => {

  test('instance', async () => {
    const testsdk = TypeformSDK.test()
    const ent = testsdk.Form()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
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
    const form_ref01_match = {}

    const form_ref01_list = (await form_ref01_ent.list(form_ref01_match)).map((e) => e.data())

    assert(!isempty(select(form_ref01_list, { id: form_ref01_data.id })))


    // UPDATE
    const form_ref01_data_up0 = {}
    form_ref01_data_up0.id = form_ref01_data.id

    const form_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-form_ref01_' + setup.now }
    form_ref01_data_up0 [form_ref01_markdef_up0.name] = form_ref01_markdef_up0.value

    const form_ref01_resdata_up0 = (await form_ref01_ent.update(form_ref01_data_up0)).data()
    assert(form_ref01_resdata_up0.id === form_ref01_data_up0.id)

    assert(form_ref01_resdata_up0[form_ref01_markdef_up0.name] === form_ref01_markdef_up0.value)


    // LOAD
    const form_ref01_match_dt0 = {}
    form_ref01_match_dt0.id = form_ref01_data.id
    const form_ref01_data_dt0 = (await form_ref01_ent.load(form_ref01_match_dt0)).data()
    assert(form_ref01_data_dt0.id === form_ref01_data.id)


    // REMOVE
    const form_ref01_match_rm0 = {}
    form_ref01_match_rm0.id = form_ref01_data.id
    await form_ref01_ent.remove(form_ref01_match_rm0)
  

    // LIST
    const form_ref01_match_rt0 = {}

    const form_ref01_list_rt0 = (await form_ref01_ent.list(form_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(form_ref01_list_rt0, { id: form_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

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

  const env = envOverride({
    'TYPEFORM_TEST_FORM_ENTID': idmap,
    'TYPEFORM_TEST_LIVE': 'FALSE',
    'TYPEFORM_TEST_EXPLAIN': 'FALSE',
    'TYPEFORM_APIKEY': 'NONE',
  })

  idmap = env['TYPEFORM_TEST_FORM_ENTID']

  if ('TRUE' === env.TYPEFORM_TEST_LIVE) {
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
    now: Date.now(),
  }

  return setup
}
  
