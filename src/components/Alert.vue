<template>
  <v-alert
    v-model="alert"
    border="left"
    close-text="Close Alert"
    color="deep-purple accent-4"
    type="success"
    dark
    dismissible
  >
    Your quiz was created, here is the link, <a :href="publicUrl"  target="_blank" rel="noopener noreferrer">{{publicUrl}}</a>
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: {
    publicUrl: String
  }
}
</script>

<style scoped>
  a:link, a:visited {
    color: white !important;
  }
</style>