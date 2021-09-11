import React from 'react'
import { render } from '@testing-library/react'
import Button from '.'

describe('<Button/>', () => {
  it('should render component', () => {
    const { getByTestId } = render(<Button />)
    expect(getByTestId('button')).toMatchSnapshot()
  })

  it('should render a success button', () => {
    const { getByTestId } = render(<Button variant="success" />)
    expect(getByTestId('button').classList).toContain('btnSuccess')
  })

  it('should render a danger button', () => {
    const { getByTestId } = render(<Button variant="danger" />)
    expect(getByTestId('button').classList).toContain('btnDanger')
  })
})
