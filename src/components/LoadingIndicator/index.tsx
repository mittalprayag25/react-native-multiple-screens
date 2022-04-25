import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';

import {coloredSource} from '../../utils/utilities';
import styles from './styles';

const LoadingIndicator = (size: any) => {
  return (
    <LottieView
      source={coloredSource(require('./spinner'), '#000000')}
      loop
      autoPlay
      style={styles.lottie}
    />
  );
};
export default LoadingIndicator;
