<template>
    <nav v-bind:class="{active : showNav}">
        <ul>
            <li v-for="conference in teams" v-bind:key="conference.name">
                {{ conference.name }}
                <ul class="division">
                    <li v-for="divisions in conference.divisions" v-bind:key="divisions.name">
                        {{ divisions.name }}
                        <ul class="teams">
                            <li v-for="team in divisions.teams" v-bind:key="team.name">
                                <router-link :to="{ name: 'team', params: { team: team.name } }" v-bind:team="team.name" v-on:click="sendTeam(team.name)">{{ team.name }}</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
//TODO try Vue animation
    export default {
        name: 'Menu',
        props: ['teams', 'showNav'],
        methods: {
            sendTeam: function(team) {
                alert('click');
                this.$http.post('/loadTeam', data, {
                    teamId: team
                });
            }
        }
    }
</script>

<style>
    nav {
        text-align: left;
        width: 200px;
        position: absolute;
        left: -200px;
        top: 40px;
    }
    nav.active {
        left: 0;
    }
    nav li {
        list-style: none;
    }
</style>