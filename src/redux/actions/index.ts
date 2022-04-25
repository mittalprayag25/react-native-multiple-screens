import {createActions} from 'redux-actions';
import TopFeedAction from './TopFeedAction';
import FeedAction from './FeedAction';
import KidsFeedAction from './KidsFeedAction';

const actions: any = createActions({
  GET_TOP_FEED: TopFeedAction,
  GET_FEED: FeedAction,
  GET_KIDS_FEED: KidsFeedAction,
});

export default actions;
