import { describe, test, beforeAll, beforeEach, afterAll, afterEach, it, expect } from 'vitest'
let testValue = 1;
let eachValue = 1;
let afterValue = 1;
beforeAll(() => {
  testValue = 2;
})
beforeEach(() => {
  eachValue++;
  afterValue++;
})
afterEach(() => {
  afterValue = 1;
})
afterAll(() => {
  
})
describe('test describe', () => {
  expect(eachValue).toBe(1)
  expect(afterValue).toBe(1)
  test('hurt', () => {
    expect('Hello world').toBe('Hello world')
    expect(eachValue).toBe(2)
    expect(afterValue).toBe(2)
  });
  test('test beforeAll', () => {
    expect(testValue).toBe(2)
    expect(eachValue).toBe(3)
    expect(afterValue).toBe(2)
  })
  test('test beforeEach', () => {
    expect(eachValue).toBe(4)
    expect(afterValue).toBe(2)
  })
  test('test toBe', () => {
    expect('王').toBe('王')
  })
  test('test toEqual', () => {
    expect({ name: '王' }).toEqual({ name: '王' })
  })
  test('test toBeTruthy', () => {
    expect('1').toBeTruthy();
  })
  test('test toBeFalsy', () => {
    expect('').toBeFalsy();
  })
  test('test toContain array', () => {
    expect([1, 2, 3, 4]).toContain(1)
  })
  test('test toContain string', () => {
    expect('12345').toContain('1')
  })
  test('test toThrow', () => {
    function throwFun() {
      throw new Error('你错了')
    }
    expect(throwFun).toThrowError()
    expect(throwFun).toThrowError('你错了')
  })
  it('it should xx', () => {
    expect('xx').toBe('xx')
  })
})