import React from 'react';
import {NavigationActions, StackActions} from 'react-navigation';

describe('Navigator', () => {
  it('should use ref to navigate screens', () => {
    const routeName = 'destination';
    const params = {test: 'test'};
    const dispatch = jest.fn();
    jest.spyOn(React, 'createRef').mockReturnValue({
      current: {dispatch},
    });

    const {navigate, replace, goBack} = require('../RootNavigation');

    navigate(routeName, params);
    expect(dispatch).toBeCalledWith(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
    replace(routeName, params);
    expect(dispatch).toBeCalledWith(
      StackActions.replace({
        routeName,
        params,
      }),
    );

    goBack();
    expect(dispatch).toBeCalledWith(NavigationActions.back());
  });
});
