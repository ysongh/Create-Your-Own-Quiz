<template>
  <form class="mt-4">
    <v-text-field
      v-model="question"
      label="Question"
      outlined
      dense
      clearable
    ></v-text-field>

    <div class="flexRow">
        <v-text-field
        v-model="answer1"
        label="Answer 1"
        outlined
        dense
        clearable
      ></v-text-field>
      <v-checkbox
        v-model="isAnswer1"
        label="Mark Answer"
      ></v-checkbox>
    </div>
    
    <div class="flexRow">
      <v-text-field
        v-model="answer2"
        label="Answer 2"
        outlined
        dense
        clearable
      ></v-text-field>
      <v-checkbox
        v-model="isAnswer2"
        label="Mark Answer"
      ></v-checkbox>
    </div>

    <div class="flexRow">
      <v-text-field
        v-model="answer3"
        label="Answer 3"
        outlined
        dense
        clearable
      ></v-text-field>
      <v-checkbox
        v-model="isAnswer3"
        label="Mark Answer"
      ></v-checkbox>
    </div>

    <div class="flexRow">
      <v-text-field
        v-model="answer4"
        label="Answer 4"
        outlined
        dense
        clearable
      ></v-text-field>
      <v-checkbox
        v-model="isAnswer4"
        label="Mark Answer"
      ></v-checkbox>
    </div>

    <v-file-input
      label="Image input"
      outlined
      dense
      v-model="file"
    ></v-file-input>

    <v-btn
      class="mb-4"
      @click="createQuestion()"
    >
      Add Question
    </v-btn>
  </form>
</template>

<script>
export default {
  name: "QuestionForm",
  props: {
    questionList: Array
  },
  data: () => ({
    question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      isAnswer1: false,
      isAnswer2: false,
      isAnswer3: false,
      isAnswer4: false,
      file: null
  }),
  methods: {
    createQuestion() {
      // {
      //   question: 'What color is the water',
      //   image: 'URL'
      //   answers: [
      //     { text: 'yellow', correct: false },
      //     { text: 'blue', correct: true },
      //     { text: 'green', correct: false }
      //   ]
      // }
      
      const newQuestion = {
        "id": this.questionList.length,
        "question": this.question,
        "answers": []
      }

      if(this.answer1) newQuestion.answers.push({ "text": this.answer1, "correct": this.isAnswer1 });
      if(this.answer2) newQuestion.answers.push({ "text": this.answer2, "correct": this.isAnswer2 });
      if(this.answer3) newQuestion.answers.push({ "text": this.answer3, "correct": this.isAnswer3 });
      if(this.answer4) newQuestion.answers.push({ "text": this.answer4, "correct": this.isAnswer4 });

      this.questionList.push(newQuestion);
      this.question = "";
      this.answer1 = "";
      this.answer2 = "";
      this.answer3 = "";
      this.answer4 = "";
      this.isAnswer1 = false;
      this.isAnswer2 = false;
      this.isAnswer3 = false;
      this.isAnswer4 = false;
    }
  }
}
</script>

<style>
  .flexRow {
    display: flex !important;
  }

  .v-input--selection-controls {
    margin-top: 5px;
    margin-left: 7px;
  }
</style>