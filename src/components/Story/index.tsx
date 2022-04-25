import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {Routes} from './../../constants/NavigationUtils';

import styles from './styles';

const Story = ({records, navigation}: any): JSX.Element => {
  const showDetails = (feed: any) => {
    navigation.navigate(Routes.DETAILSCREEN, {feed});
  };

  return (
    records.length > 0 &&
    records.map((item: any) => {
      return (
        <TouchableOpacity style={styles.story}>
          <Text
            testID={`${item.feed.id}-story`}
            style={styles.storyHeader}
            onPress={() => showDetails(item.feed)}>
            {item.feed.title}
          </Text>
          <Text style={styles.storyAuthor}>(${item.feed.by})</Text>
        </TouchableOpacity>
      );
    })
  );
};

export default memo(Story);
