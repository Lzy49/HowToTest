import { describe, expect, it } from 'vitest'
describe('test each', () => {
  it.each([['111', 'test111'], ['222', 'test222']])('测试 %s 是 %s', (value, expected) => {
    expect('test' + value).toBe(expected)
  })
  it.each([{ start: '111', end: 'test111' }, { start: '222', end: 'test222' }])('测试 $start 是 $end', ({ start, end }) => {
    expect('test' + start).toBe(end)
  })
  it.each`
    start | end
    ${111} | ${'test111'}
    ${222} | ${'test222'}
  `('测试 $start 是 $end', ({ start, end }) => {
    expect('test' + start).toBe(end)
  })
})
