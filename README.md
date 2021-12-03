# Create Your Own Quiz
A web app where you can create a quiz and generate a website of quiz on IPFS

- Live Site - https://createyourownquiz.web.app/
- Demo - https://youtu.be/Y82fYef2IjA

## Technologies
- Vue 2
- Vuex 3
- Vuetify
- Fleek Storage (Store a website of the quiz)
- Pinata (Store the quiz images)
- Skynet
- Handshake Domain

## Links to example use of IPFS
- (Fleek Storage) <https://github.com/ysongh/Create-Your-Own-Quiz/blob/master/src/views/Home.vue#L162>
- (Pinata) <https://github.com/ysongh/Create-Your-Own-Quiz/blob/master/src/components/QuestionForm.vue#L123>

## Project setup
```
npm install
```

### Create a file called 'config.js' on the src folder and add the following code
```
export const fleekAPIKey = "<Get API Key from Fleek>";
export const fleekAPISecret = "<Get API Secret from Fleek>";
export const pinataApiKey = "<Get API key from Pinata>";
export const pinataSecretApiKey = "<Get API Secret from Pinata>;
export const seedphase = <Enter any words>;
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Helpful Links
- https://docs.ipfs.io/how-to/websites-on-ipfs/link-a-domain/#handshake