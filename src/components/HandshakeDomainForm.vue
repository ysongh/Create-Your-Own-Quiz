<template>
  <form class="mt-4">
    <v-text-field
      v-model="tld"
      label="Handshake Name"
      outlined
      dense
      clearable
    ></v-text-field>

    <v-text-field
      v-model="subDomain"
      label="Subdomain Name"
      outlined
      dense
      clearable
    ></v-text-field>

    <v-btn
      class="mb-4"
      @click="redirectToNamebase()"
    >
      Add
    </v-btn>
  </form>
</template>

<script>
import { SkynetClient } from 'skynet-js';

const portal = 'https://siasky.net/';
const skynetClient = new SkynetClient(portal);

export default {
  name: "HandshakeDomainForm",
  props: {
    HTMLContent: String
  },
  data: () => ({
    tld: "",
    subDomain: ""
  }),
  methods: {
    async redirectToNamebase(){
      const webDirectory = {
        'index.html': new File(
          [this.HTMLContent],
          'index.html',
          {
            type: 'text/html',
          }
        )
      };

      // Upload quiz
      const data = await skynetClient.uploadDirectory(
        webDirectory,
        'quiz'
      );
      console.log(data)

      const skylink = `sia://${data.skylink.slice(4)}`;
      console.log(skylink)

      const records_json = [
        { type: "TXT",
          host: `_contenthash.${this.subDomain}`, 
          value: skylink,
          ttl: 60 },
        { type: "CNAME", host: this.subDomain, value: "sia.namebase.io.", ttl: 3600 }]
                        
      //const tld = 'aaronrasor';
      const url = new URL(`https://namebase.io/next/domain-manager/${this.tld}/records`);
      const redirectUrl = `http://localhost:8080/result/${this.subDomain}/${this.tld}`
      const encodedRedirectUrl = encodeURIComponent(encodeURIComponent(redirectUrl.toString()));

      url.searchParams.append('records', btoa(JSON.stringify(records_json)));
      url.searchParams.append('redirect', encodedRedirectUrl);

      window.location.href = url.toString();
    }
  }
}
</script>

<style>

</style>