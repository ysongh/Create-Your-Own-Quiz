<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="redirectToNamebase">Get Namebase</button>
  </div>
</template>

<script>
import { SkynetClient } from 'skynet-js';
import { quizTemplate } from '../helpers/quizTemplate';

const portal = 'https://siasky.net/';
const skynetClient = new SkynetClient(portal);

export default {
  name: "About",
  methods: {
    async redirectToNamebase(){
      const HTMLContent = quizTemplate("quiz123", "Something", "It is a quiz", [{
        "question": 'What color is the water',
        "image": '',
        "size": 'long',
        "answers": [
          { text: 'yellow', correct: false },
          { text: 'blue', correct: true },
          { text: 'green', correct: false }
        ]
      }]);

      const webDirectory = {
        'index.html': new File(
          [HTMLContent],
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
          host: '_contenthash.tjijfw', 
          value: skylink,
          ttl: 60 },
        { type: "CNAME", host: 'tjijfw', value: "sia.namebase.io.", ttl: 3600 }]
                        
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
