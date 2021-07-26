<template>
  <v-container>
    <Alert v-if="alert" :publicUrl="publicUrl" />

    <h1>Create Your Own Quiz</h1>

    <v-row>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          v-model="title"
          label="Title"
          outlined
          dense
          clearable
       ></v-text-field>
       <v-text-field
          class="subject"
          v-model="subject"
          label="Subject"
          outlined
          dense
          clearable
       ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
       <v-textarea
        outlined
        rows="3"
        label="Content"
        v-model="body"
        dense
        clearable
      ></v-textarea>
      </v-col>
    </v-row>

    <h2>Create questions</h2>

    <div class="flexRow">
      <div v-bind:key="question.id" v-for="question of questionList" class=" mr-2">
        <QuestinModal :question="question" @remove-question="removeQuestion" />
      </div>
    </div>
    
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

      <div class="d-flex">
        <v-btn
          class="mr-4"
          @click="createQuestion()"
          x-large
        >
          Add Question
        </v-btn>
        <div v-if="loading">
          <Spinner />
        </div>
        <div v-else>
          <v-btn
            color="primary"
            elevation="2"
            x-large
            @click="uploadFile()"
            :disabled="!title || !questionList.length"
          >Create</v-btn>
        </div>
      </div>
    </form>
  </v-container>
</template>

<script>
  import fleekStorage from '@fleekhq/fleek-storage-js';
  
  import { quizTemplate } from '../helpers/quizTemplate';
  import { fleekAPIKey, fleekAPISecret } from '../config';

  import Alert from '../components/Alert.vue';
  import QuestinModal from '../components/QuestionModal.vue';
  import Spinner from '../components/Spinner.vue';

  export default {
    name: 'Home',
    components: {
      Alert,
      QuestinModal,
      Spinner
    },
    data: () => ({
      publicUrl: "",
      title: "",
      subject: "",
      body: "",
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      isAnswer1: false,
      isAnswer2: false,
      isAnswer3: false,
      isAnswer4: false,
      questionList: [],
      alert: false,
      loading: false
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
          "id": this.questionList.length,
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
      removeQuestion(id) {
        this.questionList = this.questionList.filter(question => question.id !== id);
      },
      async uploadFile(){
        try {
          this.loading = true;
          const HTMLContent = quizTemplate(this.title, this.subject, this.body, this.questionList);
            
          const uploadedFile = await fleekStorage.upload({
            apiKey: fleekAPIKey,
            apiSecret: fleekAPISecret,
            key: this.title,
            data: HTMLContent
          });

          console.log(uploadedFile);
          this.publicUrl = uploadedFile.publicUrl;
          this.alert = true;
          this.loading = false;
        } catch(err) {
          console.error(err);
          this.loading = false;
        }
      } 
    }
  }
</script>

<style scoped>
  .subject {
    margin-top: -16px !important;
  }

  .flexRow {
    display: flex !important;
  }

  .v-input--selection-controls {
    margin-top: 5px;
    margin-left: 7px;
  }
</style>