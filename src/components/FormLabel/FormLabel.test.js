import React from 'react';
import { render } from '@testing-library/react';
import FormLabel from '.';

describe('<FormLabel/>', () => {
  it('should render component', () => {
    const { container } = render(<FormLabel />);
    expect(container).toMatchSnapshot();
  });
});
