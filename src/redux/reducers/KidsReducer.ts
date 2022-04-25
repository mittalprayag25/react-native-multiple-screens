import {handleActions} from 'redux-actions';

import initialState from '../store/initialState';

const KidsReducer = handleActions(
  {
    GET_KIDS_FEED: {
      REQUEST: state => ({
        ...state,
        isFetching: true,
        error: null,
      }),
      FAILURE: (state, {payload}: any) => ({
        ...state,
        isFetching: false,
        error: payload,
      }),
      SUCCESS: (state, {payload}) => {
        return {
          ...state,
          data: {...state.data, ...payload},
          isFetching: false,
          error: null,
        };
      },
    },
  },
  initialState.kids,
);

export default KidsReducer;
