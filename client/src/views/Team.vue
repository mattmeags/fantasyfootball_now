<template>
    <div>
        <keep-alive>
            hiya{{teamInfo.teamId}}
        </keep-alive>
        
    
    </div>
</template>

<script>
import axios from 'axios';

const API_URL = "http://localhost:4000/showTeam";

export default {
    name: 'team',
    data () {
        return {
            teamInfo: {}
        }
    },
    props: ['team'],

    beforeRouteUpdate(to, from, next) {
        console.log(to);
        console.log(from);
        axios.post('http://localhost:4000/loadTeam', {
          teamId: to.params.team
          //TODO write catches
        })
        .then(response => {
            console.log(response);
            this.teamInfo = response.data;
        })
        .catch(error => {
            console.log(error);
        })
        next();
      }
}
</script>