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
