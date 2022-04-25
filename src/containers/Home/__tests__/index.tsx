import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Linking} from 'react-native';
import * as reactRedux from 'react-redux';
import {Provider} from 'react-redux';

import {
  createMockStore,
  mockNavigationWithParams,
} from '../../../__mocks__/index';
import Home from '../index';
import initialState from './../../../redux/store/initialState';

const mockedDispatch = jest.fn();

describe('Home with success data', () => {
  const navigation = mockNavigationWithParams({});

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
      data: [123, 3456, 345, 654, 8765, 345],
      fullData: [
        {
          id: 30827210,
          feed: {
            by: 'timsneath',
            descendants: 99,
            id: 30827210,
            kids: [
              30828021, 30827448, 30827932, 30828013, 30827621, 30827406,
              30827414, 30827390, 30827521, 30827440, 30827379, 30827508,
              30827335, 30827377, 30827636, 30827711,
            ],
            score: 140,
            time: 1648442500,
            title: 'Fuchsia Workstation',
            type: 'story',
            url: 'https://fuchsia.dev/fuchsia-src/development/build/build_workstation',
          },
        },
      ],
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
        <Home {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('Should contain CLick More Text', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    expect(getByTestId('more-records').props.children).toBe(
      'Click here for More stories.....',
    );
  });
  it('Should navigate to details', async () => {
    const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
    const mockedDispatch = jest.fn();
    useDispatchSpy.mockReturnValue(mockedDispatch);

    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    const scrollView = getByTestId('home-story-view');
    act(() => {
      fireEvent(getByTestId('more-records'), 'press');
    });
    expect(scrollView).toBeDefined();
    expect(mockedDispatch).toHaveBeenCalled();

    const {refreshControl} = scrollView.props;
    act(() => {
      refreshControl.props.onRefresh();
    });
    expect(mockedDispatch).toHaveBeenCalled();
  });
});

describe('Home when fetching', () => {
  const navigation = mockNavigationWithParams({});

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
      data: [123, 3456, 345, 654, 8765, 345],
      fullData: [
        {
          id: 30827210,
          feed: {
            by: 'timsneath',
            descendants: 99,
            id: 30827210,
            kids: [
              30828021, 30827448, 30827932, 30828013, 30827621, 30827406,
              30827414, 30827390, 30827521, 30827440, 30827379, 30827508,
              30827335, 30827377, 30827636, 30827711,
            ],
            score: 140,
            time: 1648442500,
            title: 'Fuchsia Workstation',
            type: 'story',
            url: 'https://fuchsia.dev/fuchsia-src/development/build/build_workstation',
          },
        },
      ],
      error: null,
      isFetching: true,
    });
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
        <Home {...props} />
      </Provider>,
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('Should contain CLick More Text', () => {
    const {queryByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    expect(queryByTestId('more-records')).toBeNull();
  });
});

describe('Home when fetched data and fullData is empty', () => {
  const navigation = mockNavigationWithParams({});

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
      data: [123, 3456, 345, 654, 8765, 345],
      fullData: [],
      error: null,
      isFetching: true,
    });
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
        <Home {...props} />
      </Provider>,
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('Should contain CLick More Text', () => {
    const {queryByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    expect(queryByTestId('more-records')).toBeNull();
  });
});
