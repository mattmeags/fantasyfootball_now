<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ messages.message }}
  </div>
</template>

<script>
// TODO
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

const paths = require('../assets/scripts/paths');

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data: () => ({
    messages: {},
  }),
  mounted() {
    fetch(paths.loadAllTeamsUrl)
      .then(response => response.json())
      .then((result) => {
        this.messages = result;
      });
  },
};


</script>
