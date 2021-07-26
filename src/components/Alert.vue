<template>
  <v-alert
    border="left"
    close-text="Close Alert"
    color="deep-purple accent-4"
    dark
    dismissible
  >
    <v-row align="center">
      <v-col class="grow">
        Your quiz was created, here is the link, <a :href="'https://ipfs.fleek.co/ipfs/' + publicUrl"  target="_blank" rel="noopener noreferrer">{{publicUrl}}</a>
      </v-col>
      <v-col class="shrink">
        <v-btn v-if="!isCopy" @click="copyText()">Copy Link</v-btn>
        <v-btn v-else>Copied</v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: {
    publicUrl: String
  },
  data: () => ({
    isCopy: false
  }),
  methods: {
    copyText(){
      navigator.clipboard.writeText("https://ipfs.fleek.co/ipfs/" + this.publicUrl);
      this.isCopy = true;
    }
  }
}
</script>

<style scoped>
  a:link, a:visited {
    color: white !important;
  }
</style>