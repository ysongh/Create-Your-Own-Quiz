<template>
  <v-row>
    <v-col
      cols="12"
      sm="4"
    >
      <v-text-field
        v-model="localTitle"
        label="Title"
        outlined
        dense
        clearable
      ></v-text-field>
      <v-text-field
        class="subject"
        v-model="localSubject"
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
      v-model="localBody"
      dense
      clearable
    ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "QuizHomePageForm",
  computed: {
    ...mapGetters(['title', 'subject', 'body']),
    localTitle: {
      get () {
        return this.title;
      },
      set (value) {
        this.updateTitle(value);
      }
    },
    localSubject: {
      get () {
        return this.subject;
      },
      set (value) {
        this.updateSubject(value);
      }
    },
    localBody: {
      get () {
        return this.body;
      },
      set (value) {
        this.updateBody(value);
      }
    }
  },
  methods: mapActions(['updateTitle', 'updateSubject', 'updateBody'])
}
</script>

<style>
  .subject {
    margin-top: -16px !important;
  }
</style>