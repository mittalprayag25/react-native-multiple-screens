import {render} from '@testing-library/react-native';
import React from 'react';

import LoadingIndicator from '..';

describe('LoadingIndicator ', () => {
  it('should match snapshot', () => {
    const tree = render(<LoadingIndicator />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('change color & size', () => {
    const tree = render(<LoadingIndicator color={'#000000'} size={40} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
