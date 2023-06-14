import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/themed";
import { QuestionProps } from "../interface/components";

export const Question = (question: QuestionProps) => {
  return (
    <Card containerStyle={styles.container}>
      <Text style={styles.questionText}>{question.questionText}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: {
    fontSize: 20,
    overflow: "scroll",
    width: 300,
  },
});
