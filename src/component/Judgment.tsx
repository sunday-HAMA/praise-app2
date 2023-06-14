import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { JudgmentProps } from '../interface/components';

export const Judgment = (props: JudgmentProps) => {
  const { correct } = props;

  return (
    <Overlay isVisible>
        { correct ?
          <View style={styles.container}>
            <Text>正解</Text>
            <Icon
              name='human-handsup'
              color='red'
              size={50} />
          </View>
        :
          <View style={styles.container}>
            <Text>不正解</Text>
            <Icon
              name='human-baby-changing-table'
              color='red'
              size={50} />
          </View>
        }
    </Overlay>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});