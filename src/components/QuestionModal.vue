<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="amber darken-4"
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

        <v-img
          v-if="question.image"
          aspect-ratio="1.7"
          :src="question.image"
        ></v-img>

        <div v-bind:key="answer.text" v-for="answer of question.answers" class="pl-5">
          <div v-if="answer.correct" class="d-flex">
            <v-icon>mdi-arrow-right-bold</v-icon> 
            <v-card-text>
              {{ answer.text }} (Answer)
            </v-card-text>
          </div>
          <div v-else class="d-flex">
            <v-icon>mdi-arrow-right-bold-outline</v-icon> 
            <v-card-text>
              {{ answer.text }}
            </v-card-text>
          </div>
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