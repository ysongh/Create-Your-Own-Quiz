<template>
  <v-container>
    <h1>Create Your Own Quiz</h1>

    <v-text-field
      v-model="question1"
      label="Question"
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
  import fleekStorage from '@fleekhq/fleek-storage-js'

  import { fleekAPIKey, fleekAPISecret } from '../config';

  export default {
    name: 'Home',
    data: () => ({
      publicUrl: "",
      question1: "",
    }),
    methods: {
      async uploadFile(){
        const HTMLContent = `
          <!DOCTYPE html>
          <html lang="en" dir="ltr">
            <head>
              <meta charset="utf-8">
              <title>Skynet Certificate</title>
              <meta name="description" content="Certificate">
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                <h1>Quiz</h1>

                <h2>${this.question1}<h2>
            </body>
          </html>
        `

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
