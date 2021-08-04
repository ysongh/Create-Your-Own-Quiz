<template>
  <v-container>
    <Alert v-if="alert" :publicUrl="publicUrl" />

    <v-sheet
      class="pa-4 mb-3 "
      color="white"
      elevation="1"
    >
      <h1 class="text-h5 mb-2">Set quiz starting page content</h1>
      <QuizHomePageForm />
    </v-sheet>
   
    <v-sheet
      class="pa-4"
      color="white"
      elevation="1"
    >
      <h2 class="text-h5">Create questions</h2>

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
    </v-sheet>
  </v-container>
</template>

<script>
  import fleekStorage from '@fleekhq/fleek-storage-js';
  import { mapGetters } from 'vuex';
  
  import { quizTemplate } from '../helpers/quizTemplate';
  import { fleekAPIKey, fleekAPISecret } from '../config';

  import QuizHomePageForm from '../components/QuizHomePageForm.vue';
  import QuestionForm from '../components/QuestionForm.vue';
  import Alert from '../components/Alert.vue';
  import QuestinModal from '../components/QuestionModal.vue';
  import Spinner from '../components/Spinner.vue';

  export default {
    name: 'Home',
    components: {
      QuizHomePageForm,
      QuestionForm,
      Alert,
      QuestinModal,
      Spinner
    },
    computed: mapGetters(['title', 'subject', 'body']),
    data: () => ({
      publicUrl: "",
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

</style>