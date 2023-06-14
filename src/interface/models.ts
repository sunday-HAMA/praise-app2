import { getFirestore, doc, QuerySnapshot } from "firebase/firestore";

export interface Problem {
  selections: Selection[];
  question: string;
}
//interfaceでオブジェクトの型に名前を付けられる

export interface Selection {
  answer_text: string;
  correct: boolean;
  question_id: string;
}

export interface Question {
  id: string;
  question: string;
}

export type SelectionFromFirestore = QuerySnapshot<Selection>;

//↑公式サイト？にはあたらしいバージョンとして
//export declare class QuerySnapshot<T = Selection>
//という記述
//firestoreに保存されているデータの内容を取得するには'参照'をもとに実際にデータを持っているスナップショットを得る必要がある
//参照からスナップショットを得るには参照に生えたget()メソッドを呼ぶ
//get()の返り値はスナップショットを返すPromise
//QuerySnapshotは複数のドキュメントのデータを持つスナップショット
//https://qiita.com/maiyama18/items/86a4573fdce800221b72
//多分どっかの公式サイト
