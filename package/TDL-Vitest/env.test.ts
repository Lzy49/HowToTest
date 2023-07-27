import { describe, expect, test, vi } from 'vitest'
describe('test env', () => {
  test('stubEnv', () => {
    vi.stubEnv('TEXT_VALUE', '1')
    expect(process.env.TEXT_VALUE).toBe('1')
    vi.unstubAllEnvs()
  })

  test('unstubAllEnvs', () => {
    vi.stubEnv('TEXT_VALUE', '1')
    vi.unstubAllEnvs()
    expect(process.env.TEXT_VALUE).toBe(undefined)
  })
})

describe('test Global', () => {
  test('stubGlobal', () => {
    vi.stubGlobal('innerHeight', '1')
    expect(global.innerHeight).toBe('1')
  })
})