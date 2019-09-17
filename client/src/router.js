import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Team from './views/Team.vue';
import Player from './views/Player.vue';
import StyleGuide from './views/StyleGuide.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component() {
        return import(/* webpackChunkName: "about" */ './views/About.vue');
      },
    },
    {
      path: '/team/:team',
      name: 'team',
      component: Team,
    },
    {
      path: '/player/',
      name: 'player',
      component: Player,
    },
    {
      path: '/styleguide',
      name: 'styleguide',
      component: StyleGuide,
    },
  ],
});
