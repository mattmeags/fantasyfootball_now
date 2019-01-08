<template>
    <header>
        <eva-icon name="menu" v-on:click.native="menuClick"></eva-icon>
        <Menu v-bind:teams='headerData.conferences' v-if='showMenu'></Menu>
        <h1 v-on:click='menuClick'>This is the header</h1>
        boo
        <Search v-bind:teams='headerData.conferences'></Search>
    </header>
</template>

<script>

import Search from '@/components/Search.vue';
import Menu from '@/components/Menu.vue';

const API_URL = "http://localhost:4000/getTeams/";

export default {
    name: 'Header',
    components: {
        Search,
        Menu
    },
    data: () => ({
        headerData: {},
        showMenu: false
    }),
     methods: {
        menuClick() {
            if (this.showMenu == false) {
                this.showMenu = true;
            } else {
                this.showMenu = false;
            }
        }
    },
    created() {
        fetch(API_URL)
            .then(response => response.json())
            .then(result => {
                this.headerData = result;
            });
    }
}
</script>
