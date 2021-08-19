# Create Your Own Quiz
A web app where you can create a quiz and generate a website of quiz on IPFS

- Live Site - https://createyourownquiz.web.app/
- Demo - https://youtu.be/Y82fYef2IjA

## Technologies
- Vue 2
- Vuex 3
- Vuetify
- Fleek Storage
- Pinata
- Skynet
- Handshake Domain

## IPFS
- Quiz are created and store on Fleek Storage. (https://ipfs.fleek.co/ipfs/ + HASH)
- Quiz images are store on Pinata. (https://gateway.pinata.cloud/ipfs/ + HASH)

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
