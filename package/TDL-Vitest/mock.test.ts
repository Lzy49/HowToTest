import { describe, expect, test, vi } from 'vitest'
describe('test vi.fn', () => {
  test('vi.fn', () => {
    const obj = {
      fn() {
        console.log(
          '我被调用了'
        )
      }
    }
    obj.fn = vi.fn();

    obj.fn()
    expect(obj.fn).toBeCalled()
  })
})

describe('test vi.spyOn', () => {
  test('vi.spyOn', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => 1)
    const obj = {
      say() {
        return Math.random();
      }
    }

    expect(obj.say()).toBe(1)
  })
})
describe('test vi.setSystemTime', () => {
  test('vi.setSystemTime', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(10, 4, 2));
    function getNowTime() {
      return (new Date()).toUTCString();
    }
    expect(getNowTime()).toBe(new Date(10, 4, 2).toUTCString())
    vi.useRealTimers();
  })
  test('vi.setSystemTime', () => {
    vi.setSystemTime(new Date(10, 4, 3));
    function getNowTime() {
      return (new Date()).toUTCString();
    }
    expect(getNowTime()).toBe(new Date(10, 4, 3).toUTCString())
  })
  test('vi.setSystemTime', () => {
    function getNowTime() {
      return (new Date()).toUTCString();
    }
    expect(getNowTime()).toBe(new Date(10, 4, 3).toUTCString())
  })
})