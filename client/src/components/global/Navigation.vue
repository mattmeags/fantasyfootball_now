<template>
    <nav>
        <div class="nav-wrapper" v-on:keydown.esc="toggleDeepNav('all')">
            <div class="desktop-only">
                <ul class="icon-nav">
                    <li class="nav-item" v-bind:class="{'selected' : selected === 'home'}" v-on:mouseover="showHomeText = true" v-on:mouseout="showHomeText = false" v-on:click="toggleDeepNav('all')"><router-link to="/" ><eva-icon name="home" fill="white"></eva-icon></router-link></li>
                    <li class="nav-item" v-bind:class="[{'deepSelected': deepTeamHighlight}, {'selected' : selected === 'team'}]" v-on:click="toggleDeepNav('team')" v-on:mouseover="showTeamText = true" v-on:mouseout="showTeamText = false"><eva-icon name="people" fill="white"></eva-icon></li>
                    <li class="nav-item" v-bind:class="[{'deepSelected': deepPositionHighlight}, {'selected' : selected === 'position'}]" v-on:click="toggleDeepNav('position')" v-on:mouseover="showPositionText = true" v-on:mouseout="showPositionText = false"><eva-icon name="award" fill="white"></eva-icon></li>
                    <!--Phase 3 -->
                    <!--<li class="nav-item" v-bind:class="{'selected' : selected === 'dashboard'}"  v-on:mouseover="showDashboardText = true" v-on:mouseout="showDashboardText = false"><router-link to=""><eva-icon name="pie-chart-2" fill="white"></eva-icon></router-link></li>-->
                </ul>
                <ul class="hidden-nav" v-bind:class="{active: showMobileTopLevel}">
                    <li class="nav-text" v-bind:class="{active: showHomeText}">Landing</li>
                    <li class="nav-text" v-bind:class="{active: showTeamText}">Teams</li>
                    <li class="nav-text" v-bind:class="{active: showPositionText}">Positions</li>
                    <li class="nav-text" v-bind:class="{active: showDashboardText}">My Dashboard</li>
                </ul>
            </div>

            <div class="nav-wrapper mobile-only">
                <div class="mobile-menu-action" v-on:click="toggleMobileMenu()">
                    <eva-icon name="menu-outline" fill="white"></eva-icon>
                </div>
                <ul class="mobile-level-one" v-bind:class="{active: showMobileTopLevel}">
                    <div class="close-icon" v-on:click="toggleMobileMenu()">
                        <eva-icon name="close-outline" fill="white"></eva-icon>
                    </div>
                    <li><router-link to="/" v-on:click="toggleMobileMenu()">Landing</router-link></li>
                    <li v-on:click="toggleDeepNav('team')"><span>Teams</span> <eva-icon name="arrow-ios-forward-outline" fill="white"></eva-icon></li>
                    <li v-on:click="toggleDeepNav('position')"><span>Positions</span> <eva-icon name="arrow-ios-forward-outline" fill="white"></eva-icon></li>
                </ul>
            </div>
            <ul class="hidden-teams-nav" v-bind:class="{active: showTeamNav}">
                <li class="mobile-only mobile-level-two-actions d-flex">
                    <eva-icon name="arrow-ios-back-outline" fill="white" v-on:click="toggleDeepNav('team')"></eva-icon>
                    <eva-icon name="close-outline" fill="white" v-on:click="closeMobileMenuFromDeep('team')"></eva-icon>
                </li>
                <li class="title">Teams</li>
                <li v-for="team in teams" v-bind:key="team" v-on:click="closeMobileMenuFromDeep('team')"><router-link v-bind:to="'/team/' + team">{{team}}</router-link></li>
            </ul>
            <ul class="hidden-position-nav" v-bind:class="{active: showPositionNav}">
                <li class="mobile-only mobile-level-two-actions">
                    <eva-icon name="arrow-ios-back-outline" fill="white" v-on:click="toggleDeepNav('position')"></eva-icon>
                    <eva-icon name="close-outline" fill="white" v-on:click="closeMobileMenuFromDeep('position')"></eva-icon>
                </li>
                <li class="title">Position</li>
                <li v-for="position in positions" v-bind:key="position" v-on:click="closeMobileMenuFromDeep('position')"><router-link v-bind:to="'/position/' + position">{{position}}</router-link></li>
            </ul>
        </div>
    </nav>
    
</template>

<script>

import {mapState, mapActions} from 'vuex';

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
        showMobileTopLevel: false,
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
                this.selected = 'team';
            }
            if (cat === 'position') {
                this.showPositionNav = !this.showPositionNav;
                this.showPositionText = false;
                this.deepPositionHighlight = !this.deepPositionHighlight;
                this.deepTeamHighlight = false;
                this.showTeamNav = false;
                this.selected = 'position';
            }
            //TODO: escapse should close and should close on click off
            if (cat === 'all') {
                console.log('esc');
                this.showTeamNav = false
                this.showTeamText = false;
                this.showPositionNav = false;
                this.showPositionText = false;
                this.showTeamText = false;
                this.selected = 'home';
            }
        },
        ...mapActions({
            getNavigationItems: 'getNavigationItems'
        }),
        toggleMobileMenu: function() {
            this.showMobileTopLevel = !this.showMobileTopLevel;
        },
        closeMobileMenuFromDeep: function(cat) {
            this.toggleMobileMenu();
            this.toggleDeepNav(cat);
        }
    },
    computed: {
        ...mapState({
            teams: 'teams',
            positions: 'positions',
            test: 'test'
        }),
    },

    // get navigation and search suggestions data
    created() {
        this.getNavigationItems();
        //Set selected on creation
        this.selected = this.$route.name;

    },
}
</script>

<style lang="scss">
    @import '@/assets/styles';
    //TODO: close should have same slide animation
    //TODO: BEM this?
    nav {
        position: fixed;
        left: 0;
        top: 48px;
        height: 100%;
        width: $nav-width;
        background: $secondary;
        z-index: $domiant-index;

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

            &.active {
                left: 40px;
                transition: all 0.3s ease-out;

                @include respondUp($tabletViewport) {
                    left: 0;
                    transition: none;
                }
            }
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
            left: -220px;
            width: 220px;
            background: $secondary;
            padding-top: 0;
            overflow-y: scroll;
            height: 100vw;

            .title {
                background: $accent4;
                padding: 16px 0 16px 15px;
                color: $white;
                font-weight: bold;
            }

            a {
                color: $white;
                display: block;
                padding: 10px 0 10px 15px;
                text-transform: capitalize;
                border-bottom: $border;

                

                &:hover {
                    background: $accent;
                    transition: 0.3s all linear;
                }

                @include respondUp($tabletViewport) {
                    padding: 5px 0 5px 15px;
                    border: none;
                }
            }

            &.active {
                left: 0;
                z-index: 6;
                height: 100%;
                transition: 0.3s left ease-out;

                @include respondUp($tabletViewport) {
                    left: $nav-width
                }
            }

            @include respondUp($tabletViewport) {
                background: $tietary;
                width: 180px;
                left: -180px;
            }
        }

        .mobile-level-one {
            position: absolute;
            left: -220px;
            top: 0;
            width: 220px;
            height: 100%;
            background: $secondary;
            padding-top: 50px;

            li {
                padding: 10px 0;
                border-bottom: $border;
                padding-left: $nav-width;
                margin-left: -$nav-width;
                display: flex;
                align-items: center;
                position: relative;

                &:first-of-type {
                    border-top: $border;
                }

                i {
                    position: absolute;
                    right: 10px;
                }

                a,
                span {
                    padding-left: 15px;
                    color: $white;
                    font-size: $font-size-desktop;
                }
            }

            &.active {
                left: 0;
                transition: 0.3s left ease-out;
                z-index: 6;
            }
        }

        .mobile-level-two-actions {
            // display: flex;
            // justify-content: space-between;
            position: relative;
            padding: 10px 0 0;
            background: $accent4;

            i {
                height: 100%;
                padding: 0 7px;

                &:last-of-type {
                    position: absolute;
                    right: 0;
                }
            }
        }

        .mobile-menu-action {
            padding-top: 10px;
            display: flex;
            justify-content: center;
        }

        .close-icon {
            position: absolute;
            right: 7px;
            top: 10px;
        }
    }
</style>