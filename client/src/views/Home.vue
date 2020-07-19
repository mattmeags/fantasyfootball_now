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

import { paths } from '../assets/scripts/utilities'
import { mapMutations } from 'vuex';

export default {
	name: 'home',
	components: {
		HelloWorld,
	},
	data: () => ({
		messages: {},
	}),
	methods: {
		...mapMutations({
			setGlobalTitle: 'setGlobalTitle'
		})
	},
	mounted() {
		fetch(paths.loadAllTeamsUrl)
		.then(response => response.json())
		.then((result) => {
			this.messages = result;
		});

		this.setGlobalTitle('Fantasy Football Now');
	},
};


</script>
