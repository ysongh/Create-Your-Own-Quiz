<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Question #{{question.id + 1}}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2 mb-3">
          {{question.question}}
        </v-card-title>

        <div v-bind:key="answer.text" v-for="answer of question.answers">
          <v-card-text v-if="answer.correct">
            - {{ answer.text }} (Answer)
          </v-card-text>
          <v-card-text v-else>
            - {{ answer.text }}
          </v-card-text>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="error"
            text
            @click="onRemoveQuestion(question.id)" 
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  },
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    onRemoveQuestion(id){
      this.$emit('remove-question', id);
    }
  }
}
</script>

<style>

</style>