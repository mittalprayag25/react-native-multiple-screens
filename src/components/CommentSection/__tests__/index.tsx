import {render} from '@testing-library/react-native';
import React from 'react';

import CommentSection from '..';

describe('CommentSection ', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    data: {
      30821604: {
        by: 'cute_boi',
        id: 30821604,
        kids: [30821923],
        parent: 30820894,
        text: 'comment text',
        time: 1648398990,
        type: 'comment',
      },
      30821923: {
        by: 'commentNested1',
        id: 30821604,
        kids: [30821944],
        parent: 30820894,
        text: 'comment text',
        time: 1648398990,
        type: 'comment',
      },
      30821944: {
        by: 'commentNested2',
        id: 30821604,
        kids: [30821922],
        parent: 30820894,
        text: 'comment text',
        time: 1648398990,
        type: 'comment',
      },
      30820812: {
        by: 'newComment',
        id: 30821604,
        kids: [30821922],
        parent: 30820894,
        text: 'comment text',
        time: 1648398990,
        type: 'comment',
      },
    },
    comments: [30821604, 30820812],
  };

  it('should match snapshot', () => {
    const tree = render(<CommentSection {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('CommentSection when feeds not downloaded', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    data: {},
    comments: [30821604, 30820812],
  };

  it('should match snapshot', () => {
    const tree = render(<CommentSection {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('CommentSection when no comments', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    data: {},
    comments: [],
  };

  it('should match snapshot', () => {
    const tree = render(<CommentSection {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
