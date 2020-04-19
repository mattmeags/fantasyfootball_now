<template>

    <form v-on:submit="routerFromPhrase">
        {{ teams }}
        <input type="search" name="search" v-model="searchPhrase"/>
        <input type="submit" value="Submit"/>
        {{searchPhrase}}
    </form>
</template>

<script>
export default {
  name: 'Search',
  props: ['teams'],
  // data: () => ({
  //     searchPhrase: ''
  // }),
  data() {
    return {
      searchPhrase: '',
    };
  },
  // TODO look into computed keyword to figure this out
  methods: {
    routerFromPhrase: () => {
      // alert('this:', this.$emit.searchPhrase);
    },
  },

};
</script>
