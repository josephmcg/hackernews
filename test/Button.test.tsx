import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from '~/components/Button'

describe('Button', () => {
  test('should render a button with text', () => {
    render(<Button>Content</Button>)
    expect(screen.getByText(/content/i)).toBeDefined()
  })

  test('should call onClick when clicked', () => {
    const mockedFunction = vi.fn()
    render(<Button onClick={mockedFunction}>Content</Button>)
    const button = screen.getByText(/content/i)
    fireEvent.click(button)

    expect(mockedFunction).toHaveBeenCalled()
  })

  test('should not call onClick while disabled', () => {
    const mockedFunction = vi.fn()
    render(
      <Button onClick={mockedFunction} disabled>
        Content
      </Button>,
    )
    const button = screen.getByText(/content/i)
    fireEvent.click(button)

    expect(mockedFunction).toHaveBeenCalledTimes(0)
  })

  test('should not call onClick while loading', () => {
    const mockedFunction = vi.fn()
    render(
      <Button onClick={mockedFunction} loading>
        Content
      </Button>,
    )
    const button = screen.getByText(/content/i)
    fireEvent.click(button)

    expect(mockedFunction).toHaveBeenCalledTimes(0)
  })

  test('should display a different style while active', () => {
    render(<Button active>Content</Button>)
    const button = screen.getByText(/content/i)

    expect(button.classList.contains('bg-indigo-700')).toBe(true)
  })
})
