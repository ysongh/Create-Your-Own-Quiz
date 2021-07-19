<template>
  <v-container>
    <h1>Create Your Own Quiz</h1>

    <v-text-field
      v-model="title"
      label="Title"
      outlined
      clearable
    ></v-text-field>

    <h2>Create questions</h2>
    <form>
      <v-text-field
        v-model="question"
        label="Question"
        outlined
        clearable
      ></v-text-field>

      <v-row>
        <v-col cols="9">
          <v-text-field
            v-model="answer1"
            label="Answer 1"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="isAnswer1"
            label="Mark Answer"
          ></v-checkbox>
          </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="9">
          <v-text-field
            v-model="answer2"
            label="Answer 2"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox
             v-model="isAnswer2"
            label="Mark Answer"
          ></v-checkbox>
          </v-col>
      </v-row>

      <v-row>
        <v-col cols="9">
          <v-text-field
            v-model="answer3"
            label="Answer 3"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox
             v-model="isAnswer3"
            label="Mark Answer"
          ></v-checkbox>
          </v-col>
      </v-row>

      <v-row>
        <v-col cols="9">
          <v-text-field
            v-model="answer4"
            label="Answer 4"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="isAnswer4"
            label="Mark Answer"
          ></v-checkbox>
          </v-col>
      </v-row>

      <v-btn
        class="mr-4"
        @click="createQuestion()"
      >
        Add Question
      </v-btn>
    </form>

    <v-btn
      color="primary"
      elevation="2"
      x-large
      @click="uploadFile()"
    >Create</v-btn>

    <p>{{ publicUrl }}</p>
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
