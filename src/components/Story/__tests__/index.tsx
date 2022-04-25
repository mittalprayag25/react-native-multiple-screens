import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import Story from '..';

describe('Story ', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    records: [
      {
        id: 30827210,
        feed: {
          by: 'user',
          descendants: 99,
          id: 30827210,
          kids: [
            30828021, 30827448, 30827932, 30828013, 30827621, 30827406,
            30827414, 30827390, 30827521, 30827440, 30827379, 30827508,
            30827335, 30827377, 30827636, 30827711,
          ],
          score: 140,
          time: 1648442500,
          title: 'story1',
          type: 'story',
          url: 'https://fuchsia.dev/fuchsia-src/development/build/build_workstation',
        },
      },
      {
        id: 30827211,
        feed: {
          by: 'user1',
          descendants: 99,
          id: 30827211,
          kids: [30828021],
          score: 140,
          time: 1648442500,
          title: 'story2',
          type: 'story',
          url: 'https://fuchsia.dev/fuchsia-src/development/build/build_workstation',
        },
      },
      {
        id: 30827212,
        feed: {
          by: 'user3',
          descendants: 99,
          id: 30827212,
          score: 140,
          time: 1648442500,
          title: 'story3',
          type: 'story',
          url: 'https://fuchsia.dev/fuchsia-src/development/build/build_workstation',
        },
      },
    ],
  };

  it('should match snapshot', () => {
    const tree = render(<Story {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('test Navigation', () => {
    const {getByTestId} = render(<Story {...props} />);
    const story = getByTestId('30827210-story');
    act(() => {
      fireEvent(story, 'press');
    });
  });
});
describe('Story with no records', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    records: [],
  };

  it('should match snapshot', () => {
    const tree = render(<Story {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
