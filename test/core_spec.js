process.env.NODE_ENV = 'test'

const chai = require('chai')
const expect = chai.expect

const core = require('../lib/core')
const docproof = core.docproof
const transaction = core.transaction

const btc = require('./fixtures/btc')

describe('estimate docproof fees', () => {
  it('it should estimate a fee based on fee per kb', (done) => {
    feePerKb = 100000
    docproofFee = docproof.estimateFee(feePerKb)
    expect(docproofFee).to.equal(24200)
    done()
  })

  it('it should estimate a fee based on fee per kb, with a multiplier', (done) => {
    feePerKb = 124099
    docproofFee = docproof.estimateFee(feePerKb, 4)
    expect(docproofFee).to.equal(120128)
    done()
  })
})

describe('check if an address is a transaction input', () => {
  it('it should return true when an address is an input', (done) => {
    let tx = btc.unconfirmedDocproofTx()
    let address = 'ms6zWKUFA1txnncwcFvxc99899wjXrbGRH'
    let isAddressAnInput = transaction.isAddressAnInput(address, tx)
    expect(isAddressAnInput).to.be.true
    done()
  })

  it('it should return false when an address is an not input', (done) => {
    let tx = btc.unconfirmedDocproofTx()
    let address = 'moCXE9C7sB8zoEM673naWb1YSDwmdgNkw7'
    let isAddressAnInput = transaction.isAddressAnInput(address, tx)
    expect(isAddressAnInput).to.be.false
    done()
  })

  it('it should return false if any values are missing', (done) => {
    expect(transaction.isAddressAnInput('test', {})).to.be.undefined
    expect(transaction.isAddressAnInput('test', {inputs: []})).to.be.false
    expect(transaction.isAddressAnInput('test', {inputs: [{}]})).to.be.undefined
    done()
  })
})

describe('check if an address is a transaction output', () => {
  it('it should return true when an address is an output', (done) => {
    let tx = btc.unconfirmedPaymentTx()
    let address = 'ms6zWKUFA1txnncwcFvxc99899wjXrbGRH'
    let isAddressAnOutput = transaction.isAddressAnOutput(address, tx)
    expect(isAddressAnOutput).to.be.true
    done()
  })

  it('it should return false when an address is not an output', (done) => {
    let tx = btc.unconfirmedPaymentTx()
    let address = 'moCXE9C7sB8zoEM673naWb1YSDwmdgNkw7'
    let isAddressAnOutput = transaction.isAddressAnOutput(address, tx)
    expect(isAddressAnOutput).to.be.false
    done()
  })

  it('it should return false if any values are missing', (done) => {
    expect(transaction.isAddressAnOutput('test', {})).to.be.undefined
    expect(transaction.isAddressAnOutput('test', {outputs: []})).to.be.false
    expect(transaction.isAddressAnOutput('test', {outputs: [{}]})).to.be.undefined
    done()
  })
})
