import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {parseSpecialCharacters} from './../../utils/utilities';

import styles from './styles';

const CommentSection = ({comments, data}: any): JSX.Element => {
  const getComments = kids => {
    const arr = [];
    kids.forEach((item: any) => {
      if (data[item]) {
        arr.push(data[item]);
      }
    });
    return arr;
  };

  const ui = (obj: any) => {
    return (
      <View style={styles.subComment}>
        {obj.by && (
          <Text style={styles.by}>
            -{'>'} ({obj.by})
          </Text>
        )}
        {obj.text && (
          <Text style={styles.commentColor}>
            {parseSpecialCharacters(obj.text)}
          </Text>
        )}
        {obj.kids && comment(obj.kids)}
      </View>
    );
  };

  const comment = (dat: any) => {
    return getComments(dat).map(obj => {
      return ui(obj);
    });
  };

  return comments && <View>{comment(comments)}</View>;
};

export default memo(CommentSection);
