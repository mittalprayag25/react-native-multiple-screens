import {all, fork} from 'redux-saga/effects';

import {watchFeedSaga} from './feedSaga';

export default function* root() {
  yield all([fork(watchFeedSaga)]);
}
