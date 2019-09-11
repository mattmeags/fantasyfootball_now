<template>
    <div class="sidebar-nav" v-bind:class="{'collapsed' : isCollpased}">
        <!-- {{isCollapsed}} -->
        <!-- <div class="menu-icon">
            <font-awesome-icon icon="bars"/>        
        </div> -->
        <nav>
            <ul>
                <!-- <li class="nav-item"><font-awesome-icon icon="search"/></li> -->
                <MenuItem v-for="item in menu" v-bind:key="item.title" v-bind:menuItem="item"></MenuItem>
            </ul>
            <!-- <ul>
                <li v-for="conference in teams" v-bind:key="conference.name">
                    {{ conference.name }}
                    <ul class="division">
                        <li v-for="divisions in conference.divisions" v-bind:key="divisions.name">
                            {{ divisions.name }}
                            <ul class="teams">
                                <li v-for="team in divisions.teams" v-bind:key="team.name">
                                    <router-link :to="{ name: 'team', params: { team: team.name }}" 
                                        v-bind:team="team.name" 
                                        v-on:click="sendTeam(team.name)">
                                        {{ team.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul> -->
        </nav>
    </div>
</template>

<script>
const paths = require('../../assets/scripts/paths.js');

import MenuItem from '@/components/header/MenuItem.vue';

// TODO try Vue animation
export default {
    name: 'Menu',
    props: ['teams', 'showNav'],
    components: {
        MenuItem
    },
    data: () => ({
        //subTeamsCategories: '',
        menu: [
            {
                title: 'Teams',
                href: '/',
                icon: 'fa-users',
                children: [

                ]
            },
            {
                title: 'Positions',
                href: '/positions',
                icon: 'fa-football-helmet'
            },
            {
                title: 'My Team',
                href: '/myteam',
                icon: 'fa-tachometer-fast'
            }
        ],
        isCollapsed: true
    }),
    methods: {
        sendTeam(team) {
            this.$http.post('/loadTeam', data, {
                teamId: team,
            });
        },
    },
    created() {
        console.log('created');
        fetch(paths.loadAllTeamsUrl)
        .then(response => response.json())
        .then((result) => {
            // this.subTeamsCategories = result;
            // console.log('yo')
            // console.log(this.subTeamsCategories);
            result.forEach(team => {
                this.menu[0].children.push(
                    {
                        name: team.name,
                        path: 'team/' + team.name,
                        subData: team
                    }
                )
            });
        });
    }
};
</script>

<style> 
    .sidebar-nav {
        width: 50px;
        position: fixed;
        left: 0;
        background: #f2f4f7;
    }
    /* nav {
        text-align: left;
        width: 200px;
        position: absolute;
        /* left: -200px;
        top: 40px;
    } */
    nav.active {
        left: 0;
    }
    nav li {
        list-style: none;
    }
</style>
