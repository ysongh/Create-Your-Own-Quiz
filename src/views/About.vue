<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="redirectToNamebase">Get Namebase</button>
  </div>
</template>

<script>

export default {
  name: "About",
  methods: {
    redirectToNamebase(){
    const records_json = [
      { type: "TXT",
        host: '_dnslink.time3', 
        value: "dnslink=ipfs/SITE_CID://bafybeiaugst5lhuwdw2zuv2hlxls5tibnhggp3shp5vigemppp5qybh6ki",
        ttl: 60 },
      { type: "CNAME", host: 'time3', value: "gateway.ipfs.io.", ttl: 3600 }]
                      
    const tld = 'aaronrasor';
    const url = new URL(`https://namebase.io/next/domain-manager/${tld}/records`);
    const redirectUrl = 'http://localhost:8080/about'
    const encodedRedirectUrl = encodeURIComponent(encodeURIComponent(redirectUrl.toString()));

    url.searchParams.append('records', btoa(JSON.stringify(records_json)));
    url.searchParams.append('redirect', encodedRedirectUrl);

    window.location.href = url.toString();
    }
  }
}
</script>
