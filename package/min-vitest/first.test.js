import { test, it, beforeEach, beforeAll, afterAll, afterEach, expect, describe } from './core.js'
beforeAll(() => {
  console.log('beforeAll')
})
beforeEach(() => {
  console.log('beforeEach')
})
afterAll(() => {
  console.log('afterAll')
})
afterEach(() => {
  console.log('afterEach')
})
test('test demo', () => {
  expect('1').toBe('1')
  expect({ name: '李' }).toEqual({ name: '李' })
  console.log('test demo')
})
it('it demo', () => {
  console.log('test demo')
})
// test.only('test only demo', () => {
//   expect({ name: '李' }).toEqual({ name: '李', age: '1' })
// })
describe('describe demo', () => {
  it('describe demo', () => {
    console.log('describe demo')
  })
})