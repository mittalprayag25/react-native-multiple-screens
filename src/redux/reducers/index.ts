import {combineReducers} from 'redux';

import TopFeedReducer from './TopFeedReducer';
import KidsReducer from './KidsReducer';

const rootReducer = combineReducers({
  topFeed: TopFeedReducer,
  kids: KidsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
