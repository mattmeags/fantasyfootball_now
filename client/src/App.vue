<template>
  <div id="app">
    <Navigation></Navigation>
    <Header></Header>
   <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Header from '@/components/global/header/Header.vue';
// import Menu from '@/components/header/Menu.vue';
import Navigation from '@/components/global/Navigation.vue';

export default {
  name: 'app',
  components: {
    Header,
    // Menu,
    Navigation
  },
};
</script>

<style lang="scss">
@import '@/assets/styles';

html {
  height: 100%;
}
body {
    background: $primary;
    color: $tietary;
    box-sizing: border-box;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    height: 100%;
}

main {
  text-align: center;
  position: relative;
  left: $nav-width;
  width: calc(100% - #{$nav-width});
  height: 100%;
  min-height: calc(100% - #{$header-height});
  margin-top: $header-height;
}

#app {
  height: 100%;
}


</style>
