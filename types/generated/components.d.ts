import type { Schema, Struct } from '@strapi/strapi';

export interface QuizAntworten extends Struct.ComponentSchema {
  collectionName: 'components_quiz_antworten_s';
  info: {
    displayName: 'antworten ';
  };
  attributes: {
    antwort: Schema.Attribute.String;
    isCorrect: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface QuizOptions extends Struct.ComponentSchema {
  collectionName: 'components_quiz_options';
  info: {
    displayName: 'options';
  };
  attributes: {
    isCorrect: Schema.Attribute.Boolean;
    text: Schema.Attribute.String;
  };
}

export interface QuizQuizQuestion extends Struct.ComponentSchema {
  collectionName: 'components_quiz_quiz_questions';
  info: {
    displayName: 'Quiz Question';
    icon: 'lightbulb';
  };
  attributes: {
    frage: Schema.Attribute.String;
    optionenquestion: Schema.Attribute.Component<'quiz.options', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'quiz.antworten': QuizAntworten;
      'quiz.options': QuizOptions;
      'quiz.quiz-question': QuizQuizQuestion;
    }
  }
}
