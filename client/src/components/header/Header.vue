<template>
    <header>
        <div class="menu-icon">
            <eva-icon name="menu" v-on:click.native="menuClick"></eva-icon>
        </div>

        <!--<Menu v-bind:teams='headerData.conferences' v-bind:showNav='showMenu'></Menu>-->
        <h1 v-on:click='menuClick'>This is the header</h1>
        <!--<Search v-bind:teams='headerData.conferences'></Search>-->
    </header>
</template>

<script>

import Search from '@/components/header/Search.vue';
import Menu from '@/components/header/Menu.vue';

const paths = require('../../assets/scripts/paths.js');

export default {
  name: 'Header',
  components: {
    // Search,
    Menu,
  },
  data: () => ({
    headerData: {},
    showMenu: false,
  }),
  methods: {
    // open close menu
    menuClick() {
      if (this.showMenu === false) {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
    },
  },
  // get navigation and search suggestions data
  created() {
    fetch(paths.loadAllTeamsUrl)
      .then(response => response.json())
      .then((result) => {
        this.headerData = result;
      });
  },
  watch: {
    // watch for route change - close menu
    $route() {
      this.showMenu = false;
    },
  },
};
</script>

<style>
    .menu-icon {
        float: left;
    }
</style>
