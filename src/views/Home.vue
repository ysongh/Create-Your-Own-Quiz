<template>
  <v-container>
    <h1>Create Your Own Quiz</h1>

    <v-text-field
      v-model="title"
      label="Title"
      outlined
      dense
      clearable
    ></v-text-field>

    <h2>Create questions</h2>
    <form>
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

      <v-btn
        class="mr-4"
        @click="createQuestion()"
        x-large
      >
        Add Question
      </v-btn>
      <v-btn
        color="primary"
        elevation="2"
        x-large
        @click="uploadFile()"
      >Create</v-btn>
    </form>

    <p class="link">{{ publicUrl }}</p>
  </v-container>
</template>

<script>
  import fleekStorage from '@fleekhq/fleek-storage-js';
  
  import { quizTemplate } from '../helpers/quizTemplate';
  import { fleekAPIKey, fleekAPISecret } from '../config';

  export default {
    name: 'Home',
    data: () => ({
      publicUrl: "",
      title: "",
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      isAnswer1: false,
      isAnswer2: false,
      isAnswer3: false,
      isAnswer4: false,
      questionList: []
    }),
    methods: {
      createQuestion() {
        // {
        //   question: 'What color is the water',
        //   answers: [
        //     { text: 'yellow', correct: false },
        //     { text: 'blue', correct: true },
        //     { text: 'green', correct: false }
        //   ]
        // }

        const newQuestion = {
          "question": this.question,
          "answers": [
            { "text": this.answer1, "correct": this.isAnswer1 },
            { "text": this.answer2, "correct": this.isAnswer2 },
            { "text": this.answer3, "correct": this.isAnswer3 },
            { "text": this.answer4, "correct": this.isAnswer4 },
          ]
        }
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
      },
      async uploadFile(){
        const HTMLContent = quizTemplate(this.title, this.questionList);
          
        const uploadedFile = await fleekStorage.upload({
          apiKey: fleekAPIKey,
          apiSecret: fleekAPISecret,
          key: this.title,
          data: HTMLContent
        });

        console.log(uploadedFile);
        this.publicUrl = uploadedFile.publicUrl;
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin-bottom: .7rem;
  }

  .flexRow {
    display: flex;
  }

  .v-input--selection-controls {
    margin-top: 5px;
    margin-left: 7px;
  }

  .link {
    margin-top: 1rem;
  }
</style>