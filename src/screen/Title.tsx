import { Button } from "react-native-elements";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TitleProps } from "../interface/components";

export const Title = (props: TitleProps) => {
  const { navigation } = props;

  const goToMune = () => {
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>タイトル</Text>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          title="スタート"
          raised
          onPress={goToMune}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    height: 50,
    marginTop: 200,
  },
  title: {
    fontSize: 40,
    marginBottom: 50,
  },
  button: {
    backgroundColor: "rgb(29, 161, 242)",
    width: 300,
    height: 100,
  },
  buttonText: {
    fontWeight: "900",
    fontSize: 25,
    textAlign: "center",
  },
});
