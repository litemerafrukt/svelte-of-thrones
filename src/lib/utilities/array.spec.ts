import { describe, it, expect } from 'vitest'
import * as A from './array'

describe('lib/utilities/array => remove', () => {
  it('should remove an item from an array', () => {
    const array = [1, 2, 3, 4, 5]
    const expected = [1, 2, 4, 5]

    const result = A.remove(array, 3)

    expect(result).toEqual(expected)
  })

  it('should not mutate array', () => {
    const array = [1, 2, 3, 4, 5]

    const result = A.remove(array, 3)

    expect(array).toEqual([1, 2, 3, 4, 5])
    expect(result).not.toBe(array)
  })
})

describe('lib/utilities/array => add', () => {
  it('should add an item to an array', () => {
    const array = [1, 2, 3, 4, 5]
    const expected = [1, 2, 3, 4, 5, 6]

    const result = A.add(array, 6)

    expect(result).toEqual(expected)
  })

  it('should not mutate array', () => {
    const array = [1, 2, 3, 4, 5]

    const result = A.add(array, 6)

    expect(array).toEqual([1, 2, 3, 4, 5])
    expect(result).not.toBe(array)
  })
})
