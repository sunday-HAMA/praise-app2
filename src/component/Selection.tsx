import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { SelectionProps } from '../interface/components';

export const Selection = (props: SelectionProps) => {
  const { checkAnswer, selections } = props;
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
          { selections.map((val) => {
              return (
                <Button
                  key={val.answer_text}
                  buttonStyle={styles.button}
                  containerStyle={styles.buttonContainer}
                  title={val.answer_text}
                  raised
                  titleStyle={styles.buttonText}
                  onPress={() => checkAnswer(val.correct)}/>
              )
            })
          }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '55%',
  },
  button: {
    backgroundColor: 'rgb(29, 161, 242)',
    width: 150,
    height: 80,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20
  }
});