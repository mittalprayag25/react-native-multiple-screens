import {handleActions} from 'redux-actions';

import initialState from '../store/initialState';

const TopFeedReducer = handleActions(
  {
    GET_FEED: {
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
          fullData: payload.fullData,
          isFetching: false,
          error: null,
        };
      },
    },
    GET_TOP_FEED: {
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
          data: payload.data,
          isFetching: false,
          error: null,
        };
      },
      RESET: state => ({
        ...state,
        data: [],
        fullData: [],
        isFetching: false,
        error: null,
      }),
    },
  },
  initialState.topFeed,
);

export default TopFeedReducer;
