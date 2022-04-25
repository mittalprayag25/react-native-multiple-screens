import {AxiosResponse} from 'axios';

import Axios from './config';
import endpoints from './endpoints';

export default {
  topFeed: {
    getTopFeed: (apiBaseURL = ''): Promise<AxiosResponse<any>> =>
      Axios.get(apiBaseURL + endpoints.api.topFeed),
  },
  feed: {
    getFeed: (id, apiBaseURL = ''): Promise<AxiosResponse<any>> =>
      Axios.get(apiBaseURL + endpoints.api.feed + id + '.json'),
  },
};
