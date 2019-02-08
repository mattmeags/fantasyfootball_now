<template>
    <div>
        <keep-alive>
            hiya{{team}}
        </keep-alive>
        
    
    </div>
</template>

<script>
import axios from 'axios';

const paths = require('../assets/scripts/paths');


export default {
    name: 'team',
    
    data: function () {
        return {
            team: {}
        }
    },
    
    beforeRouteUpdate(to, from, next) {
        console.log(to);
        console.log(from);
        this.loadTeamData(to.params.team)
        next();
    },
    created: function() {
        this.loadTeamData(this.$route.params.team)
        console.log('route object: ', this.$route);
    },
    methods: {
        loadTeamData: async function(teamMascot) {
            let self = this;
            let response = await axios.post(paths.loadSingleTeamUrl, {
                teamId: teamMascot
            });
            try {
                console.log(response);
                self.team = response.data;
            } catch(error) {
                console.log(error);
            }
        }
    }
}
</script>