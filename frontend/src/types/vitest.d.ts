import type { TestAPI } from 'vitest'

declare global {
  var vi: TestAPI['vi']
}