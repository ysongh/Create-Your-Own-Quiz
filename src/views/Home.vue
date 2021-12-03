<template>
  <v-container>
    <Alert v-if="alert" :publicUrl="publicUrl" />

    <v-stepper
      v-model="e6"
      vertical
    >
      <v-stepper-step
        :complete="e6 > 1"
        step="1"
      >
        Set quiz starting page content
        <small>This is the quiz start page</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <section>
          <h2 class="text-h5 mb-5">Add the following content</h2>
          <QuizHomePageForm />
        </section>
        <v-btn
          color="primary"
          @click="e6 = 2"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 2"
        step="2"
      >
        Create questions
      </v-stepper-step>

      <v-stepper-content step="2">
        <section>
          <h2 class="text-h5">You can add as many quesitons as you want</h2>

          <div class="flexRow">
            <div v-bind:key="question.id" v-for="question of questionList" class=" mr-2">
              <QuestinModal :question="question" @remove-question="removeQuestion" />
            </div>
          </div>
          
          <QuestionForm :questionList="questionList" />
        </section>
        <v-btn
          color="primary"
          @click="e6 = 3"
        >
          Continue
        </v-btn>
        <v-btn text @click="e6 = 1">
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 3"
        step="3"
      >
        Review and submit
      </v-stepper-step>

      <v-stepper-content step="3">
        <div class="flexRow mb-5">
          <div v-bind:key="question.id" v-for="question of questionList" class=" mr-2">
            <QuestinModal :question="question" @remove-question="removeQuestion" />
          </div>
        </div>
        <h3 v-if="publicUrl">Do you have Handshake Domain that you would like to point to your quiz?</h3>
        <div v-if="loading">
          <Spinner />
        </div>
        <div v-else>
          <v-btn
            v-if="!publicUrl"
            color="primary"
            elevation="2"
            @click="uploadFile()"
            :disabled="!questionList.length"
          >Create</v-btn>
          <v-btn
            v-else
            color="primary"
            @click="e6 = 4"
          >
            Continue
          </v-btn>
          <v-btn text @click="e6 = 1">
            Done
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 4"
        step="4"
      >
        Add Handshake Domain
        <small>Optional</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <section>
          <h2 class="text-h5">Enter the following</h2>

          <HandshakeDomainForm :publicUrl="publicUrl" />
        </section>
        <v-btn text @click="e6 = 3">
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper>
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
  import HandshakeDomainForm from '../components/HandshakeDomainForm.vue';
  import Spinner from '../components/Spinner.vue';

  export default {
    name: 'Home',
    components: {
      QuizHomePageForm,
      QuestionForm,
      Alert,
      QuestinModal,
      HandshakeDomainForm,
      Spinner
    },
    computed: mapGetters(['title', 'subject', 'body']),
    data: () => ({
      publicUrl: "",
      questionList: [],
      e6: 1,
      HTMLContent: "",
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
          this.HTMLContent = quizTemplate(this.title, this.subject, this.body, this.questionList);
            
          const uploadedFile = await fleekStorage.upload({
            apiKey: fleekAPIKey,
            apiSecret: fleekAPISecret,
            key: `quiz/${this.title}`,
            data: this.HTMLContent
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