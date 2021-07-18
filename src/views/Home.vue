<template>
  <v-container>
    <h1>Create Your Own Quiz</h1>

    <v-text-field
      v-model="title"
      label="Title"
      outlined
      clearable
    ></v-text-field>

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
    }),
    methods: {
      async uploadFile(){
        const HTMLContent = quizTemplate(this.title);
          
        const uploadedFile = await fleekStorage.upload({
          apiKey: fleekAPIKey,
          apiSecret: fleekAPISecret,
          key: 'test',
          data: HTMLContent
        });

        console.log(uploadedFile);
        this.publicUrl = uploadedFile.publicUrl;
      }
    }
  }
</script>
