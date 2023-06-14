import React, { useState, useEffect } from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, SafeAreaView } from "react-native";

import { useGetQuestions } from "../customHook/GetQuestionHook";

export const Menu = (props: any) => {
  //propsはパラメーター(関数に渡される名前付きの変数)
  const { navigation } = props; //const {} = で分割代入
  const { adjustmentData, setLevel } = useGetQuestions(); //独自フック1週目はsetLevelの引数にcorrectionが入る
  //https://qiita.com/kuropp/items/f5c3d8a327041a87622e
  //GetQuestionHookのuseGetQuestionsの最後でreturnされている

  // 問題データ取得完了フラグ
  const [load, setLoad] = useState(false); //初期値がfalse

  // 問題データの取得先コレクション指定
  const [correction, setCorrection] = useState(""); //初期値が空の文字列

  useEffect(() => {
    if (adjustmentData.length > 0) {
      setLoad(true); //loadがtrueになる
    }
  }, [adjustmentData]);
  //第2引数にadjustmentDataが入っているからadjustmentDataに変更があったときだけuseEffectが実行される

  // loadが変更されたらgotoAnswerを再度呼び出す
  useEffect(() => {
    //1週目動く
    gotoAnswer(correction); //33
  }, [load]);

  // issue/https://github.com/kimitashoichi/quiz-app/issues/18
  // 問題データの取得前にボタンが押されるといきなり結果表示画面へ遷移してしまう
  function gotoAnswer(level: string) {
    //渡された値が引数のところに記述した変数に格納される→level=correction(1周目)
    setCorrection(level); //17correctionにlevelぶち込み
    if (load) {
      //loadはtrue or false この場合18~22行のuseEffectでtrueになっていれば条件は正しい(つまりAnswerに遷移する)
      navigation.navigate("Answer", {
        props: adjustmentData, //遷移先の画面に渡したいパラメータを引数として指定できる
      });
    } else {
      setLevel(level); //1回目はfalseになるからelse以下が動く→10行のメソッドの引数にlevelが入る
    }
  }

  //ボタンを押して画面遷移するにはgotoAnswerの引数にfirstをいれて(58)setCorrectionの引数にfirstが代入されて(34)
  //loadがtrueならば遷移する(35)。loadがtrueになるのはsetLoadが動いたとき(14)、つまりadjustmentData.lengthが正の時(20)だが
  //adjustmentDataにはuseGetQuestionsが分割代入されており(10)useGetQuestionsはGetQuestionHookからimportしている(5)ため
  //GetQuestionHookが成り立つことを確認する

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Button
        buttonStyle={styles.button}
        title="初級"
        raised
        titleStyle={styles.buttonText}
        onPress={() => gotoAnswer("first")} //firstから変更
      />
      <Button
        buttonStyle={styles.button}
        title="中級"
        raised
        titleStyle={styles.buttonText}
        onPress={() => gotoAnswer("first")} //firstから変更
      />
      <Button
        buttonStyle={styles.button}
        title="上級"
        raised
        titleStyle={styles.buttonText}
        onPress={() => gotoAnswer("first")} //firstから変更
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgb(29, 161, 242)",
    width: 150,
    height: 80,
  },
  buttonText: {
    fontWeight: "900",
    fontSize: 25,
    textAlign: "center",
  },
});
