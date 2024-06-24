import { NUM_PER_PAGE, NUM_TOTAL_STORIES } from '~/constants'

describe('constants', () => {
  test('NUM_TOTAL_STORIES is divisible by NUM_PER_PAGE', () => {
    expect(NUM_TOTAL_STORIES % NUM_PER_PAGE).toEqual(0)
  })
  test('NUM_TOTAL_STORIES is less than or equal to 500', () => {
    expect(NUM_TOTAL_STORIES).toBeLessThanOrEqual(500)
  })
})
