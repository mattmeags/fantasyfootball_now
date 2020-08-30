import Vue from 'vue';
import { trimName, convertStringsToInts } from '../scripts/utilities';

// Not sure if these will be needed but this lets us use utils in vue filters
Vue.filter('convertStringsToInts', strings => {
    return convertStringsToInts(strings);
});

Vue.filter('trimName', name => {
    return trimName(name);
});