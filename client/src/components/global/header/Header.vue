<template>
    <header>
        <h1 class="type--h4 h-no-margin">{{globalHeader}}</h1>
        <!--<Search v-bind:teams='headerData.conferences'></Search>-->
    </header>
</template>

<script>

// import Search from '@/components/header/Search.vue';
import {mapState} from 'vuex';

export default {
  name: 'Header',
  components: {
    // Search,
  },
  data: () => ({
    headerData: {},
    showMenu: false,
  }),
  computed: {
      ...mapState({
          globalHeader: 'globalHeader'
      })
  }
};
</script>

<style  lang="scss">
    @import "../../../assets/styles/_variables";

    header {
        background: $white;
        padding: 10px 0 10px 65px;
        position: fixed;
        width: 100%;
        height: $header-height;
        z-index: $domiant-index;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    
</style>
