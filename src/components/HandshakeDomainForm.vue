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

export default {
  name: "HandshakeDomainForm",
  props: {
    publicUrl: String
  },
  data: () => ({
    tld: "",
    subDomain: ""
  }),
  methods: {
    async redirectToNamebase(){
      const ifpsLink = `ipfs://${this.publicUrl}`;
      console.log(ifpsLink);

      const records_json = [
        { type: "TXT",
          host: `_contenthash.${this.subDomain}`, 
          value: ifpsLink,
          ttl: 60 },
        { type: "CNAME", host: this.subDomain, value: "ipfs.namebase.io.", ttl: 3600 }]
                        
      //const tld = 'aaronrasor';
      const url = new URL(`https://namebase.io/next/domain-manager/${this.tld}/records`);
      const redirectUrl = `${window.location.origin}/result/${this.subDomain}/${this.tld}`
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