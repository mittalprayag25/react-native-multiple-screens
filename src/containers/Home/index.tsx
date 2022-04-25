import {Text, View, ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecords} from './../../utils/utilities';
import Story from './../../components/Story';
import {RootState} from '../../redux/reducers';
import LoadingIndicator from './../../components/LoadingIndicator';
import ErrorWidget from './../../components/ErrorWidget';
import actions from '../../redux/actions';
import styles from './styles';

const Home = ({navigation}: any): JSX.Element => {
  const dispatch = useDispatch();
  const {data, fullData, error, isFetching}: any = useSelector(
    (s: RootState) => s.topFeed,
  );
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    dispatch(actions.getTopFeed.request());
  }, [dispatch]);

  useEffect(() => {
    const arr = getRecords(page, data);
    callFeeds(arr);
  }, [data, page]);

  useEffect(() => {
    setRecords(fullData);
  }, [fullData]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(actions.getTopFeed.request());
    setRefreshing(false);
  }, []);

  const callFeeds = (arr: any) => {
    if (arr.length > 0) {
      dispatch(actions.getFeed.request(arr));
    }
  };

  const recordsPerPage = (page: number) => {
    const arr = getRecords(page, data);
    callFeeds(arr);
    setPage(page);
  };

  return (
    <ScrollView
      testID="home-story-view"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Hacker News</Text>
        <Text style={styles.subSection}>
          new | Past | comments | ask | show | jobs
        </Text>
      </View>
      {error ? (
        <ErrorWidget
          action={actions.getTopFeed.request()}
          label="Failed to load top stories"
        />
      ) : records.length === 0 ? (
        <LoadingIndicator />
      ) : (
        <>
          <Story records={records} navigation={navigation} />
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            <Text
              onPress={() => recordsPerPage(page + 1)}
              style={styles.more}
              testID="more-records">
              Click here for More stories.....
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Home;
