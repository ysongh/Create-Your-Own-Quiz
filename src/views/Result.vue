<template>
  <v-container>
    <v-card
      class="pa-5"
      elevation="2"
    >
      <h1>Here your Link</h1>
      <h2>
        <a :href="'http://' + name + '.' + domain + '.hns.to'" target="_blank" rel="noopener noreferrer">{{name}}.{{domain}}.hns.to</a>
      </h2>
    </v-card>
    
  </v-container>
</template>

<script>
export default {
  name: 'Result',
  data: () => ({
    name: "",
    domain: ""
  }),
  async created() {
    console.log(this.$route.params.name);
    console.log(this.$route.params.domain);
    this.name = this.$route.params.name;
    this.domain = this.$route.params.domain;
  }
}
</script>

<style>

</style>