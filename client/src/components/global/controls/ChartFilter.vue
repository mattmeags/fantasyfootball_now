<template>
    <div class="filter">
		<select v-model="selected" v-on:change="updateFilter">
			<option :value="defaultOption" selected="selected">{{defaultOption}}</option>
			<option v-for="filterValue in filterValues" v-if="filterValue != defaultOption"
				v-bind:key="filterValue" 
				:value="filterValue"
				>{{filterValue}}
			</option>
		</select>
		<eva-icon name="arrow-ios-downward-outline" fill="#838587"></eva-icon>
    </div>

</template>

<script>
export default {
	name: 'Filter',
	props: {
		'filterValues': Array,
		'defaultOption': String
	},
	data() {
		return {
			selected: this.defaultOption
		}
	},
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
	@import '@/assets/styles';

	.filter {
		position: relative;

		i {
			position: absolute;
			right: 0;
			top: 5px;
			right: 2px;
			pointer-events: none;

			svg {
				height: 18px;
				width: 18px;
			}
		}
	}
	select {
		width: 100%;
		-webkit-appearance: none;
		appearance: none;
		border: none;
		// border-radius: $border-radius;
		padding: 5px 30px 5px 5px;
		background: none;
		color: $secondary;
		@include fontSize(14px, 16px);
  	}
</style>
