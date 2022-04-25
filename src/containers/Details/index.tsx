import { Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import LoadingIndicator from './../../components/LoadingIndicator';
import CommentSection from './../../components/CommentSection';
import styles from './styles';

const Details = ({ navigation }: any): JSX.Element => {
  const feed = navigation.getParam('feed');
  const { data, isFetching }: any = useSelector((s: RootState) => s.kids);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Hacker News</Text>
        <Text style={styles.subSection}>
          new | Past | comments | ask | show | jobs
        </Text>
      </View>

      <View>
        <Text style={styles.headerLabel}>{feed.title}</Text>
        <Text>Comments</Text>
        {isFetching ? <LoadingIndicator size={10} /> : null}
        {feed.text && <Text testID="detail-feed-text">{feed.text}</Text>}
        <View style={styles.comments}>
          {feed.kids && <CommentSection comments={feed.kids} data={data} />}
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;
