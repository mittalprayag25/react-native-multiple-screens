import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Linking} from 'react-native';
import * as reactRedux from 'react-redux';
import {Provider} from 'react-redux';

import {
  createMockStore,
  mockNavigationWithParams,
} from '../../../__mocks__/index';
import Details from '../index';
import initialState from './../../../redux/store/initialState';

const mockedDispatch = jest.fn();

describe('Details with success data', () => {
  const navigation = mockNavigationWithParams({
    feed: {
      by: 'timsneath',
      descendants: 99,
      id: 30827210,
      kids: [
        30828021, 30827448, 30827932, 30828013, 30827621, 30827406, 30827414,
        30827390, 30827521, 30827440, 30827379, 30827508, 30827335, 30827377,
        30827636, 30827711,
      ],
      time: 1648442500,
      text: 'Fuchsia Workstation',
      type: 'comment',
    },
  });

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
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
      },

      error: null,
      isFetching: false,
    });
    jest.setTimeout(10000);
  });

  const props = {
    navigation: navigation,
  };

  const changeState = {
    ...initialState,
  };
  it('should match snapshot', () => {
    const wrapper = render(
      <Provider store={createMockStore(changeState)}>
        <Details {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('Should contain CLick More Text', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Details {...props} />
      </Provider>,
    );
    expect(getByTestId('detail-feed-text').props.children).toBe(
      'Fuchsia Workstation',
    );
  });
});

describe('Details with isFetching data', () => {
  const navigation = mockNavigationWithParams({
    feed: {
      by: 'timsneath',
      descendants: 99,
      id: 30827210,
      time: 1648442500,
      type: 'comment',
    },
  });

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
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
      },

      error: null,
      isFetching: false,
    });
    jest.setTimeout(10000);
  });

  const props = {
    navigation: navigation,
  };

  const changeState = {
    ...initialState,
  };
  it('should match snapshot', () => {
    const wrapper = render(
      <Provider store={createMockStore(changeState)}>
        <Details {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('Should contain CLick More Text', () => {
    const {queryByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Details {...props} />
      </Provider>,
    );
    expect(queryByTestId('detail-feed-text')).toBeNull();
  });
});
