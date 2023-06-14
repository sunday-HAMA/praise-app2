import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { PricingCard } from 'react-native-elements';

import { ResultProps } from '../interface/components';

export const Result = (props: ResultProps) => {
  const { route } = props;
  const { navigation } = props;
  const correctCount = route.params.props;

  const gotoTitle = () => navigation.navigate('Title');

  return (
    <View style={styles.container}>
      <PricingCard
        color="#4f9deb"
        title="回答結果"
        price={"10問中" + correctCount + "問正解！"}
        pricingStyle={styles.resultText}
        containerStyle={styles.resultContainer}
        button={{ title: 'タイトルへ戻る', icon: 'flight-takeoff' }}
        onButtonPress={() => gotoTitle()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultContainer: {
    width: '90%'
  },
  resultText: {
    fontSize: 30,
  }
});