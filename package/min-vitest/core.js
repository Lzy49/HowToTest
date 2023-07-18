import _ from 'lodash'
const testCallbacks = []
const testOnlyCallbacks = []
const beforeAllCallbacks = []
const beforeEachCallbacks = []
const afterAllCallbacks = []
const afterEachCallbacks = []
export function test(name, callback) {
  testCallbacks.push({
    name, callback
  })
}
test.only = function (name, callback) {
  testOnlyCallbacks.push({
    name, callback
  })
}
export const it = test;
export function run() {
  const suit = testOnlyCallbacks.length > 0 ? testOnlyCallbacks : testCallbacks
  beforeAllCallbacks.forEach(fn => fn());
  suit.forEach(({ name, callback }) => {
    beforeEachCallbacks.forEach((fn) => fn())
    callback()
    afterEachCallbacks.forEach(fn => fn())
  });
  afterAllCallbacks.forEach(fn => fn())
}
export function beforeAll(callback) {
  beforeAllCallbacks.push(callback)
}
export function beforeEach(callback) {
  beforeEachCallbacks.push(callback)
}
export function afterAll(callback) {
  afterAllCallbacks.push(callback)
}
export function afterEach(callback) {
  afterEachCallbacks.push(callback)
}
export function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`fail: ${actual} not eq ${expected}`)
      }
    },
    toEqual(expected) {
      if (!_.isEqual(actual, expected)) {
        throw new Error(`fail: ${JSON.stringify(actual)} not eq ${JSON.stringify(expected)}`)
      }
    },
  }

}
export function describe(name, callback) {
  callback();
}