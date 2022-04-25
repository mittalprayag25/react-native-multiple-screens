import {
  call,
  put,
  takeLatest,
  select,
  takeEvery,
  all,
} from 'redux-saga/effects';

import api from '../../../api';
import actions from '../../actions';

function* getTopFeed(): any {
  try {
    yield put(actions.getTopFeed.reset());
    const { data } = yield call(api.topFeed.getTopFeed);
    const payload = { data };
    yield put(actions.getTopFeed.success(payload));
  } catch (error) {
    yield put(actions.getTopFeed.failure(error));
  }
}

function* getNestedComments(newData: any) {
  if (newData && newData.length > 0) {
    yield getKids(newData);
  }
}

const getYields = (action: any) => {
  const allYields = action.payload.map((item) => {
    return call(api.feed.getFeed, item);
  });

  return allYields;
};

const getData = (data: any) => {
  const newData = data.map((item: any) => {
    if (item && item.data && item.data.id) {
      const obj = { id: item.data.id, feed: item.data };
      return obj;
    }
  });

  return newData;
};

function* getFeed(action: any): any {
  try {
    const allYields: any = getYields(action);
    const [...data] = yield all(allYields);

    const newData = getData(data);
    yield getNestedComments(newData);

    const { topFeed } = yield select((state) => state);
    const fullData = [...topFeed.fullData, ...newData];
    const payload = { fullData };
    yield put(actions.getFeed.success(payload));
  } catch (error) {
    yield put(actions.getFeed.failure(error));
  }
}

function* getKidsFeed(action: any): any {
  try {
    const allYields: any = getYields(action);
    const [...data] = yield all(allYields);
    const newData = getData(data);

    yield getNestedComments(newData);

    const feedObj = {};
    newData.forEach((element, index) => {
      if (element && element.feed) {
        feedObj[element.id] = element.feed;
      }
    });

    yield put(actions.getKidsFeed.success(feedObj));
  } catch (error) {
    yield put(actions.getKidsFeed.failure(error));
  }
}

function* getKids(newData) {
  const listArr = [];
  newData.forEach((item) => {
    item.feed.kids && listArr.push(item.feed.kids);
  });
  let merged = [].concat.apply([], listArr);
  yield put(actions.getKidsFeed.request(merged));
}

export function* watchFeedSaga() {
  yield takeLatest(actions.getTopFeed.request, getTopFeed);
  yield takeEvery(actions.getFeed.request, getFeed);
  yield takeEvery(actions.getKidsFeed.request, getKidsFeed);
}
