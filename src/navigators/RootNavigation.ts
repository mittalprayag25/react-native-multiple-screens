import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';

export const navigationRef = React.createRef<any>();

export function navigate(routeName: string, params: object) {
  navigationRef.current?.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export function goBack() {
  navigationRef.current?.dispatch(NavigationActions.back());
}

export function replace(routeName: string, params: object) {
  navigationRef.current?.dispatch(
    StackActions.replace({
      routeName,
      params,
    })
  );
}
