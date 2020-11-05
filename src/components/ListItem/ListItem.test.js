import React from 'react';
import { render } from '@testing-library/react';
import ListItem from '.';

describe('<ListItem/>', () => {
  it('should render', () => {
    const { container } = render(<ListItem />);
    expect(container).toMatchSnapshot();
  });
});
