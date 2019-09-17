<template>
    <nav>
        <div class="nav-wrapper">
            <ul class="icon-nav">
                <li class="nav-item" v-bind:class="{'selected' : selected === 'home'}" v-on:mouseover="showHomeText = true" v-on:mouseout="showHomeText = false"><router-link to="/" ><eva-icon name="home" fill="white"></eva-icon></router-link></li>
                <li class="nav-item" v-bind:class="[{deepSelected: deepTeamHighlight}, {'selected' : selected === 'team'}]" v-on:click="toggleDeepNav('team')" v-on:mouseover="showTeamText = true" v-on:mouseout="showTeamText = false"><eva-icon name="people" fill="white"></eva-icon></li>
                <li class="nav-item" v-bind:class="[{deepSelected: deepPositionHighlight}, {'selected' : selected === 'position'}]" v-on:click="toggleDeepNav('position')" v-on:mouseover="showPositionText = true" v-on:mouseout="showPositionText = false"><eva-icon name="award" fill="white"></eva-icon></li>
                <li class="nav-item" v-bind:class="{'selected' : selected === 'dashboard'}"  v-on:mouseover="showDashboardText = true" v-on:mouseout="showDashboardText = false"><router-link to=""><eva-icon name="pie-chart-2" fill="white"></eva-icon></router-link></li>
            </ul>
            <ul class="hidden-nav">
                <li class="nav-text" v-bind:class="{active: showHomeText}">Landing</li>
                <li class="nav-text" v-bind:class="{active: showTeamText}">Teams</li>
                <li class="nav-text" v-bind:class="{active: showPositionText}">Positions</li>
                <li class="nav-text" v-bind:class="{active: showDashboardText}">My Dashboard</li>
            </ul>
            <ul class="hidden-teams-nav" v-bind:class="{active: showTeamNav}">
                <li class="title">Teams</li>
                <li v-for="team in teams" v-bind:key="team"><router-link v-bind:to="'/team/' + team">{{team}}</router-link></li>
            </ul>
            <ul class="hidden-position-nav" v-bind:class="{active: showPositionNav}">
                <li class="title">Position</li>
                <li v-for="position in positions" v-bind:key="position"><router-link v-bind:to="'/' + position">{{position}}</router-link></li>
            </ul>
        </div>
        {{showHomeText}}
    </nav>
    
</template>

<script>
const paths = require('../../assets/scripts/paths.js');

export default {
    name: 'Navigation',
    data: () => ({
        showHomeText: false,
        showTeamText: false,
        showPositionText: false,
        showDashboardText: false,
        showTeamNav: false,
        deepTeamHighlight: false,
        showPositionNav: false,
        deepPositionHighlight: false,
        teams: [],
        positions: [],
        selected: ''
  }),
  methods: {
      toggleDeepNav: function(cat) {
          if (cat === 'team') {
              this.showTeamNav = !this.showTeamNav;
              this.showTeamText = false;
              this.deepTeamHighlight = !this.deepTeamHighlight;
              this.deepPositionHighlight = false;
              this.showPositionNav = false;
          }
          if (cat === 'position') {
              this.showPositionNav = !this.showPositionNav;
              this.showPositionText = false;
              this.deepPositionHighlight = !this.deepPositionHighlight;
              this.deepTeamHighlight = false;
              this.showTeamNav = false;
          }
      }
  },
  mounted() {
      this.selected = this.$route.name;
  },
   // get navigation and search suggestions data
  created() {
    fetch(paths.loadAllTeamsUrl)
      .then(response => response.json())
      .then((result) => {
        this.teams = result;
      });
      fetch(paths.loadPositinsUrl)
        .then(response => response.json())
        .then(result => {
            this.positions = result;
        });
  },
}
</script>

<style lang="scss">
    @import "../../../styles/variables";

    nav {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 40px;
        background: $secondary;
        z-index: 10;

        .nav-wrapper {
            position: relative;
            height: 100%;
        }

        ul {
            padding: 16px 0 0;
            margin: 0;
        }

        .icon-nav {
            z-index: 2;
        }

        .hidden-nav {
            z-index: 1;
            position: absolute;
            top: 0;
        }

        .nav-item {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 3;
            background: $secondary;
            height: 38px;

            a {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
            }

            i {
                display: flex;
                justify-content: center;
            }   

            &:hover {
                background: $accent;
                transition: 0.3s all linear;
                cursor: pointer;
            }

            &.deepSelected {
                background: $tietary;
            }

            &.selected {
                border-left: $border3;
            }
        }
        .nav-text {
            background: $accent;
            color: $white;
            position: relative;
            left: -150px;
            top: 0;
            height: 38px;
            width: 150px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;

            &.active {
                left: 40px;
                transition: all 0.3s ease-out;
            }
        }

        .hidden-teams-nav,
        .hidden-position-nav {
            position: absolute;
            top: 0;
            left: -180px;
            width: 180px;
            background: $tietary;
            padding-top: 0;
            overflow-y: scroll;
            height: 100vw;

            .title {
                background: $accent4;
                padding: 16px 0;
                color: $white;
                font-weight: bold;

            }

            a {
                color: $white;
                display: block;
                padding: 5px 0;
                text-transform: capitalize;

                &:hover {
                    background: $accent;
                    transition: 0.3s all linear;
                }
            }

            &.active {
                left: 40px;
                z-index: 6;
                height: 100%;
                transition: 0.3s left ease-out;
            }
        }
    }
</style>