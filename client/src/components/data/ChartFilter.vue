<template>

    <div>
      <select v-model="selected" v-on:change="updateFilter">
        <option value="all" selected="selected">all</option>
        <option v-for="position in filterValues" 
          v-bind:key="position" 
          :value="position">{{position}}
          </option>
      </select>
    </div>

</template>

<script>
export default {
  name: 'ChartFilter',
  props: {'filterValues': Array},
  data: () => ({
    selected: 'all',
  }),
  methods: {

    updateFilter() {
      //this.$store.commit('updateReceivingFilter', this.selected);
      // This looks for v-on:filterChange directive and passes selected to assigned method
      this.$emit('filterChange', this.selected);
    },
  },
};
</script>

<style lang="scss">
  @import "../../assets/styles/_variables.scss";
  @import "../../assets/styles/_mixins.scss";

  select {
    -webkit-appearance: none;
    appearance: none;
    border: $border;
    border-radius: $border-radius;
    padding: 5px 30px 5px 5px;
    //background: $white;
    background: url('../../assets/down-arrow.svg');
    background-size: 12px 12px;
    background-repeat: no-repeat;
    background-position: 80% 50%;

    @include fontSize(14px, 16px);
  }
</style>
