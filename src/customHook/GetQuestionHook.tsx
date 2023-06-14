import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import {
  Question,
  Selection,
  Problem,
  SelectionFromFirestore,
} from "../interface/models";
import { query, where, collection, limit, getDocs } from "firebase/firestore";

export const useGetQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]); // useState<型>で関数(setQuestions)の引数の型を指定できる
  const [selections, setSelections] = useState<Selection[][]>(); //useState() ()内には引数
  const [adjustmentData, setAdjustmentData] = useState<Problem[]>([]);

  // 問題レベルごとにDBを変更するためのState
  const [level, setLevel] = useState<string>(); // levelは状態変数(現在の値)、setLevelは状態を変更するための関数(現在の値を変更するための関数),useState()の中には初期値が入る
  const ref = useRef(level); //useRefは参照を保持するためのhookでRefオブジェクト(この場合level)を生成してその値をメモする。
  //↑値の取り出しはconst value = ref.current; 値の変更はconst ref.current = 2;
  //https://qiita.com/seira/items/f063e262b1d57d7e78b4

  // 問題データの取得
  useEffect(() => {
    //useEffectは必ず1度実行され、コンポーネントの更新のたびに実行される
    ref.current = level; //値の変更※18参照
    getData(); //37行で定義
  }, [level]); //第2引数にlevelを入れることでlevelの変更があったときのみ実行させる

  // 問題データが更新された後に選択肢データを取得
  useEffect(() => {
    getSelection(questions); //80
  }, [questions]);

  // 選択肢データの取得後にコンポーネントに渡すようのデータを作成
  useEffect(() => {
    dataAdjustment(questions, selections);
  }, [selections]);

  // 問題文と問題文IDの取得処理
  const getData = async () => {
    /*非同期処理(時間のかかる処理の結果を待たずに次の処理を実行できる仕組み)を簡潔に記述できる
     https://tedate.jp/firebase/basic-data-acquisition-methods-from-cloud-firestore
     asyncで非同期処理の関数が作成できる。Promise処理の前にawaitを記述する
     */
    const colRef = query(
      collection(db, "`${ref.current}-question`"),
      limit(10)
    );
    //collection('データ名')でfirestoreからデータを取ってこれる。※'${ref.current}-question'はコレクション
    //`文字${変数}文字`で文字列になる。limitで読み込むバッチサイズを制限(件数指定)
    //ref.currentにはlevel(string)が代入されておりMenuからlevel=firstが代入されているからfirst-questionといったデータの保存方式なのでは？
    //※firebaseのデータ保存方式が分からんので調べる
    const snapshots = await getDocs(colRef); //getDocs()で↑collectionの全ドキュメントを取得
    //colRefはcollectionReferenceの略
    //https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja#get_multiple_documents_from_a_collection
    //https://firebase.google.com/docs/web/modular-upgrade?hl=ja
    const ids = snapshots.docs.map((doc) => doc.id);
    // ※docsよくわからん,型はArray<QueryDocumentSnapshot<T>>=An array of all the documents in the `QuerySnapshot`
    // .mapで配列の内容を一覧表示 つまりidsは配列
    // forEach？URL
    // doc.idはfirebase独自の書き方でdocmentのidを持ってこれる
    const docs: string[] = snapshots.docs.map((doc) => doc.data().question);
    //const 変数: 型... TypeScript独自の仕組みで配列変数の各要素のデータ型を指定できる
    // doc.dataはfirebase独自の書き方で、docmentのdataを持ってこれる docsも配列
    const target: Question[] = [];
    for (let i = 0; i < ids.length; i++) {
      //for (初期化式※最初に1回だけ実行される式※; 条件式※初期化式の後に評価されtrueならforの中身が実行されfalseならfor文の次へ処理が移る; 変化式※ブロック内の処理が終わり次第1回だけ実行される){
      //    実行する文;
      //    }
      //最初に戻り、今度は初期化式を実行せずに条件式を評価し,trueが返された場合にはfor文のブロックの中の処理を実行し、最後に変化式を実行して最初に戻る。これを条件式がfalseを返すまで繰り返す。
      //ids.lengthでidsの配列の中の要素の数を数える
      let data: Question = {
        id: ids[i],
        question: docs[i],
      }; //dataにids配列のi番目とdocs配列のi番目の情報を代入している dataの型はQuestionに依存
      target.push(data); //変数.pushで配列の追加をする
    }
    setQuestions(target); //12行目 selectionsにtarget代入 30~32のuseEffectが動く getSelection(target)が発動
  };

  // 選択肢の取得
  const getSelection = async (questions: Question[]) => {
    //const 関数名 = (引数) => {処理};
    //questionsの型をQuestionに定義する 70~73は継続されるのか？ されるならquestionは配列
    //40~70の文構造と同じ
    const target: Selection[][] = [];
    for (let i = 0; i < questions.length; i++) {
      const colRef = query(
        collection(db, `${ref.current}-answer`),
        where("question_id", "==", questions[i].id)
      );
      /*colRefは43行目に既出だが異なるconst内のため大丈夫なのか？
      46行目参照
      whereメソッドでquestion_idがquestions[i].idのドキュメントを取得
      const array = [1, 2, 3];
      const e0 = array[0];
      const e1 = array[1];
      const e2 = array[2];
      配列を用意して、その配列の要素を個別の変数に代入している。
      questions[i]はquestionsは配列でそのうちのi番目の要素を取り出している
      */
      const snapshots = (await getDocs(colRef)) as SelectionFromFirestore;
      //asはTypeScriptの機能で型アサーション(推論されたまたは型定義済みの型を上書きする)
      //models.tsを見るとSelectionFromFirebaseはtypeで型を規定している
      const docs = snapshots.docs.map((doc) => doc.data()); //50行目
      target.push(docs); //65行目
    }
    setSelections(target); //13行目
  };

  // 問題データと選択肢データの調整
  // 前提：questionsとselectionsのそれぞれの配列のインデックス番号は必ず一致している
  // 前提が崩れるパターンが見つかったらidをもとに検索して、データを作成する方針に変更する
  const dataAdjustment = (questions: any, selections: any) => {
    //69行目
    const data: Problem[] = []; //54~65行目
    for (let i = 0; i < questions.length; i++) {
      let problem: Problem = {
        selections: selections[i],
        question: questions[i].question,
      };
      data.push(problem);
    }
    setAdjustmentData(data);
  };

  return { adjustmentData, setLevel }; //オブジェクトの分割代入でここのadjustmentData,setLevelはMenuに引き継がれる
};
