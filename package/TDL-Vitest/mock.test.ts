import { describe, expect, test, vi } from 'vitest'
import { add100Money, fetchData } from './index'
import { createItem, fetchGetItem } from './user'
import axios from 'axios'
vi.mock('./user', async (fn) => {
  const result = await fn();
  return ({
    ...result as any,
    createItem() {
      return {
        name: 'xx',
        money: 10
      }
    },
    fetchGetItem: () => Promise.resolve({
      money: 10
    })
  })
})
describe('mock', () => {
  test('test mock', () => {
    const item = createItem();
    expect(add100Money(item).money).toBe(110)
  })
  test.skip('test mocked', () => {
    const v = vi.mocked(createItem);
    vi.mocked(createItem).mockReturnValue({
      money: 100
    })
    const item = createItem();
    console.log(item);

    expect(add100Money(item).money).toBe(110)
  })
  test('test doMock', async () => {
    vi.doMock('./user', () => ({
      createItem() {
        return {
          money: 20
        }
      }
    }))
    const user = await import('./user')
    const i = user.createItem();
    expect(add100Money(i).money).toBe(120)
  })
})

describe('doMock', () => {
  test('test doMock', () => {
    const item = createItem();
    expect(add100Money(item).money).toBe(110)
  })
})
describe('异步获取数据 ', async () => {
  test('异步获取数据', async () => {
    const item = await fetchGetItem();
    expect(add100Money(item).money).toBe(110)
  })
})

vi.mock('axios')
describe('test axios', async () => {
  test('test axios', async () => {
    vi.mocked(axios).mockResolvedValue({
      name: '李四'
    })
    const data = await fetchData()
    expect(data.name).toBe('李四')
  })
})
