<template>
    <div>this is the position view {{$route.params.position}}
        <div><TableVis v-bind:header="positionDataHeader" v-bind:tableData="positionData"></TableVis></div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import TableVis from '@/components/data/TableVis.vue'
    export default {
        name: 'Position',
        components: {
            TableVis
        },
        computed: {
            ...mapState({
                positionData: 'positionData',
                positionDataHeader: 'positionDataHeader'
            })
        },
        methods: {
            ...mapActions({
                getPositionData: 'getPositionData'
            })
        },
         beforeRouteUpdate(to, from, next) {
            console.log(to);
            console.log(from);
            this.getPositionData(to.params.position);
            next();
         },
        mounted() {
            console.log('lets goo');
            this.getPositionData(this.$route.params.position);
        }
    }
</script>