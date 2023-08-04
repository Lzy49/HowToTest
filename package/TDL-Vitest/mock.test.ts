import { describe, expect, test, vi } from 'vitest'
import flushPromises from 'flush-promises'

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



describe('test settimeout', () => {
  test('vi.advanceTimersToNextTimer', () => {
    vi.useFakeTimers();
    let v = 10;
    function test() {
      setTimeout(() => {
        v = 1000
      }, 1000);
    }
    test();
    vi.advanceTimersToNextTimer() // 不关注过程则使用这个
    expect(v).toBe(1000)
  })
  test('vi.advanceTimersToNextTimer', () => {
    vi.useFakeTimers();
    let v = 10;
    function test() {
      setTimeout(() => {
        v = 1000
      }, 1000);
    }
    test();
    vi.advanceTimersByTime(1000) // 需要增加时间 如果 时间是从外部传入的,则使用这个
    expect(v).toBe(1000)
  })

  test('vi.runAllTimers', () => {
    vi.useFakeTimers();
    let v = 10;
    function test() {
      setTimeout(() => {
        v = 1000
      }, 1000);
    }
    test();
    vi.runAllTimers() // 所有的 settimeout 全部执行完
    expect(v).toBe(1000)
  })
  test('vi.advanceTimersToNextTimer has twice', () => {
    vi.useFakeTimers();
    let v = 10;
    function test() {
      setTimeout(() => {
        setInterval(() => {
          v = 11;
        }, 1000)
      }, 1000);
    }
    test();
    vi.advanceTimersToNextTimer()
    vi.advanceTimersToNextTimer()
    expect(v).toBe(11)
  })
})
describe('test promise', async () => {
  test('promise', () => {
    flushPromises()
  })
  test('all promise', async () => {
    let c = 1;
    function allPromise() {
      Promise.resolve().then(() => c = 2).then(() => c = 3)
    }
    allPromise()
    await flushPromises()
    expect(c).toBe(3)
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
  test('vi.setSystemTime must useRealTimers', () => {
    vi.setSystemTime(new Date(10, 4, 3));
    function getNowTime() {
      return (new Date()).toUTCString();
    }
    expect(getNowTime()).toBe(new Date(10, 4, 3).toUTCString())
  })
  test('vi.setSystemTime do not have useRealTimers', () => {
    function getNowTime() {
      return (new Date()).toUTCString();
    }
    expect(getNowTime()).toBe(new Date(10, 4, 3).toUTCString())
  })
})
