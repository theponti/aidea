import React from 'react';
import { render } from '@testing-library/react';
import Emoji from '.';

describe('<Emoji/>', () => {
  it('should render component', () => {
    const { container } = render(<Emoji label="sheep" emoji="🐑" />);
    expect(container).toMatchSnapshot();
  });
});
