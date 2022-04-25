import {expectSaga} from 'redux-saga-test-plan';
import {call} from 'redux-saga/effects';
import topFeedMockData from '../../../../api/mocks/topFeedMockData';
import feedMockData from '../../../../api/mocks/feedMockData';
import actions from '../../../actions';
import TopFeedReducer from '../../../reducers/TopFeedReducer';
import KidsReducer from '../../../reducers/KidsReducer';
import initialState from '../../../store/initialState';
import {watchFeedSaga} from '..';

describe('Top Feed Saga Test API', () => {
  it('Top Feed api call', () => {
    return expectSaga(watchFeedSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve({
            data: topFeedMockData.topFeed,
          });
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            topFeed: {
              data: [],
              fullData: [],
            },
          });
        },
      })
      .hasFinalState({
        ...initialState.topFeed,
        data: topFeedMockData.topFeed,
      })
      .withReducer(TopFeedReducer, initialState.topFeed)
      .dispatch(actions.getTopFeed.request())
      .run({silenceTimeout: true});
  });
  it('Top Feed api call fail', () => {
    return expectSaga(watchFeedSaga)
      .provide({
        call({fn}, next) {
          return Promise.reject({
            error: 'Some error',
          });
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            topFeed: {
              data: [],
              fullData: [],
              error: {},
            },
          });
        },
      })
      .hasFinalState({
        ...initialState.topFeed,
        error: {
          error: 'Some error',
        },
      })
      .withReducer(TopFeedReducer, initialState.topFeed)
      .dispatch(actions.getTopFeed.request())
      .run({silenceTimeout: true});
  });
});

describe('Feed Saga Test API', () => {
  it('Feed api call', () => {
    return expectSaga(watchFeedSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve({
            data: feedMockData.feed,
          });
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            topFeed: {
              data: [],
              fullData: [],
            },
          });
        },
      })
      .hasFinalState({
        ...initialState.topFeed,
        fullData: [
          {
            id: 30828884,
            feed: {
              by: 'todsacerdoti',
              descendants: 0,
              id: 30828884,
              kids: [],
              score: 10,
              time: 1648461078,
              title:
                'Oxide on My Wrist: Hubris on PineTime was the best worst idea',
              type: 'story',
              url: 'https://artemis.sh/2022/03/28/oxide-hubris-on-pinetime.html',
            },
          },
          {
            id: 30828884,
            feed: {
              by: 'todsacerdoti',
              descendants: 0,
              id: 30828884,
              kids: [],
              score: 10,
              time: 1648461078,
              title:
                'Oxide on My Wrist: Hubris on PineTime was the best worst idea',
              type: 'story',
              url: 'https://artemis.sh/2022/03/28/oxide-hubris-on-pinetime.html',
            },
          },
        ],
      })
      .withReducer(TopFeedReducer, initialState.topFeed)
      .dispatch(actions.getFeed.request([30828021, 30827448]))
      .run({silenceTimeout: true});
  });
  it('Feed api call fail', () => {
    return expectSaga(watchFeedSaga)
      .provide({
        call({fn}, next) {
          return Promise.reject({
            error: 'Some error',
          });
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            topFeed: {
              data: [],
              fullData: [],
              error: {
                error: 'Some error',
              },
            },
          });
        },
      })
      .hasFinalState({
        ...initialState.topFeed,
        error: {
          error: 'Some error',
        },
      })
      .withReducer(TopFeedReducer, initialState.topFeed)
      .dispatch(actions.getFeed.request([30828884]))
      .run({silenceTimeout: true});
  });
});

describe('Kids Saga Test API', () => {
  it('Feed api call kids test', () => {
    return expectSaga(watchFeedSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve({
            data: feedMockData.feed,
          });
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            kids: {
              data: {},
            },
          });
        },
      })
      .hasFinalState({
        ...initialState.kids,
        data: {
          30828884: {
            by: 'todsacerdoti',
            descendants: 0,
            id: 30828884,
            kids: [],
            score: 10,
            time: 1648461078,
            title:
              'Oxide on My Wrist: Hubris on PineTime was the best worst idea',
            type: 'story',
            url: 'https://artemis.sh/2022/03/28/oxide-hubris-on-pinetime.html',
          },
        },
      })
      .withReducer(KidsReducer, initialState.kids)
      .dispatch(actions.getKidsFeed.request([30828021]))
      .run({silenceTimeout: true});
  });

  it('Feed api call kids test with empty data', () => {
    return expectSaga(watchFeedSaga)
      .provide({
        call({fn}, next) {
          return Promise.resolve({
            data: feedMockData.feed,
          });
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            kids: {
              data: {},
            },
          });
        },
      })
      .hasFinalState({
        ...initialState.kids,
        data: {},
      })
      .withReducer(KidsReducer, initialState.kids)
      .dispatch(actions.getKidsFeed.request([]))
      .run({silenceTimeout: true});
  });
  it('Feed api call fail for kids', () => {
    return expectSaga(watchFeedSaga)
      .provide({
        call({fn}, next) {
          return Promise.reject({
            error: 'Some error',
          });
        },
        select: ({selector}, next) => {
          if (!selector) {
            return next();
          }
          return selector({
            kids: {
              data: {},
              error: {
                error: 'Some error',
              },
            },
          });
        },
      })
      .hasFinalState({
        ...initialState.kids,
        error: {
          error: 'Some error',
        },
      })
      .withReducer(KidsReducer, initialState.kids)
      .dispatch(actions.getKidsFeed.request([30828884]))
      .run({silenceTimeout: true});
  });
});
