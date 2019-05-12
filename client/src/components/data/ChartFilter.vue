<template>

    <div>
           <select v-model="selected" v-on:change="updateFilter">
              <option value="all" selected="selected">all</option>
              <option v-for="position in filterValues.receivingFilterValues" 
                v-bind:key="position" 
                :value="position">{{position}}
                </option>
           </select>
           {{selected}}
    </div>

</template>

<script>
export default {
  name: 'ChartFilter',
  props: ['filterValues'],
  data: () => ({
    selected: '',
  }),
  methods: {

    updateFilter() {
      this.$store.commit('updateReceivingFilter', this.selected);
      // This looks for v-on:filterChange directive and passes selected to assigned method
      this.$emit('filterChange', this.selected);
    },
  },
};
</script>
