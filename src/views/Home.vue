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
    
    <QuestionForm :questionList="questionList" />

    <div v-if="loading">
      <Spinner />
    </div>
    <div v-else>
      <v-btn
        color="primary"
        elevation="2"
        @click="uploadFile()"
        :disabled="!questionList.length"
      >Create</v-btn>
    </div>
  </v-container>
</template>

<script>
  import fleekStorage from '@fleekhq/fleek-storage-js';
  
  import { quizTemplate } from '../helpers/quizTemplate';
  import { fleekAPIKey, fleekAPISecret } from '../config';

  import QuestionForm from '../components/QuestionForm.vue';
  import Alert from '../components/Alert.vue';
  import QuestinModal from '../components/QuestionModal.vue';
  import Spinner from '../components/Spinner.vue';

  export default {
    name: 'Home',
    components: {
      QuestionForm,
      Alert,
      QuestinModal,
      Spinner
    },
    data: () => ({
      publicUrl: "",
      title: "",
      subject: "",
      body: "",
      questionList: [],
      alert: false,
      loading: false
    }),
    methods: {
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
            key: `quiz/${this.title}`,
            data: HTMLContent
          });

          console.log(uploadedFile);
          this.publicUrl = uploadedFile.hash;
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
</style>