import React, {memo} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';

import styles from './styles';

const ErrorWidget = ({
  label = 'Error occured',
  action = null,
}: any): JSX.Element => {
  const dispatch = useDispatch();
  const tryAgain = () => {
    if (action) {
      dispatch(action);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.margins}>{label}</Text>
      <Text style={styles.margins}>
        This may be due to technical difficulty.
      </Text>
      <Button testID="tryAgain" onPress={() => tryAgain()} title="Try again" />
    </View>
  );
};

export default memo(ErrorWidget);
