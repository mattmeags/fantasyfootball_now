<template>
    <div class="filter">
		<select v-model="selected" v-on:change="updateFilter">
			<option value="all" selected="selected">all</option>
			<option v-for="position in filterValues" 
				v-bind:key="position" 
				:value="position">{{position}}
			</option>
		</select>
		<eva-icon name="arrow-ios-downward-outline" fill="#4D85FF"></eva-icon>
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
	@import "../../assets/styles/_variables";
	@import "../../assets/styles/_mixins";

	.filter {
		position: relative;

		i {
			position: absolute;
			right: 0;
			top: 3px;
			pointer-events: none;
		}
	}
	select {
		-webkit-appearance: none;
		appearance: none;
		border: $border;
		border-radius: $border-radius;
		padding: 5px 30px 5px 5px;

		@include fontSize(14px, 16px);
  	}
</style>
