import {
    NavigationProp,
    ParamListBase,
  } from '@react-navigation/native';
  import { Selection } from './models';
  
  export interface SelectionProps {
    selections: Selection[];
    checkAnswer: (flag: boolean) => void; 
  }
  
  export interface QuestionProps {
    questionText: string;
  }
  
  export interface AnswerProps {
    navigation: NavigationProp<ParamListBase, string, any, any>;
    route: any;
  }
  
  export interface ResultProps {
    navigation: NavigationProp<ParamListBase, string, any, any>;
    route: any;
  }
  
  export interface TitleProps {
    navigation: NavigationProp<ParamListBase, string, any, any>
  }
  
  export interface JudgmentProps {
    correct: boolean;
  }