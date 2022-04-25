import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {createMockStore} from '../../../__mocks__/index';
import actions from '../../../redux/actions';
import ErrorWidget from '..';

describe('ErrorWidget ', () => {
  const props = {
    label: 'label',
    action: actions.getTopFeed.request(),
  };

  it('should match snapshot', () => {
    const tree = render(
      <Provider store={createMockStore()}>
        <ErrorWidget {...props} />
      </Provider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('Test Try again click', () => {
    const newMockStore = createMockStore();
    newMockStore.dispatch = jest.fn();
    const props = {
      label: 'label',
      action: actions.getTopFeed.request(),
    };
    const {getByTestId} = render(
      <Provider store={newMockStore}>
        <ErrorWidget {...props} />
      </Provider>,
    );
    const tryAgainLink = getByTestId('tryAgain');
    act(() => {
      fireEvent(tryAgainLink, 'press');
    });
    expect(newMockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(newMockStore.dispatch).toHaveBeenCalledWith(
      actions.getTopFeed.request(),
    );
  });

  it('Test Try again click with null action', () => {
    const newMockStore = createMockStore();
    newMockStore.dispatch = jest.fn();
    const props = {
      label: 'label',
    };
    const {getByTestId} = render(
      <Provider store={newMockStore}>
        <ErrorWidget {...props} />
      </Provider>,
    );
    const tryAgainLink = getByTestId('tryAgain');
    act(() => {
      fireEvent(tryAgainLink, 'press');
    });
    expect(newMockStore.dispatch).not.toHaveBeenCalledTimes(1);
  });
});
