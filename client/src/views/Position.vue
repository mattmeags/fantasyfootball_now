<template>
    <div v-if="positionDataLoaded">
        <Dashboard>

            <Tile v-for="(leaderData) in topRow" :tileClass="`w-4-${leaderData.start}`"  :key="leaderData.title">
                <template v-slot:header>
                    {{leaderData.title}}
                </template>
                <Number :descriptor="leaderData.name" :title="leaderData.title" :number="leaderData.value"></Number>
            </Tile>

            <Tile tileClass="w-2-1" v-for="(leaderData) in adjacentCol" :key="leaderData.title">
                <template v-slot:header>
                    {{leaderData.title}}
                </template>
              
                <Number :descriptor="leaderData.name" :number="leaderData.value"></Number>
               
             </Tile>
            <Tile tileClass="w-10-3 tall-2">
                <TableVis v-bind:header="positionDataHeader" v-bind:tableData="positionData"></TableVis>
            </Tile>
        </Dashboard>
    </div>
    <div v-else>
        <Loading></Loading>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';
    import TableVis from '@/components/data/TableVis.vue';
    import Loading from '@/components/global/Loading.vue';
    import Number from '@/components/data/Number.vue';

    export default {
        name: 'Position',
        components: {
            TableVis,
            Loading,
            Number
        },
        computed: {
            ...mapState({
                positionData: 'positionData',
                positionDataHeader: 'positionDataHeader',
                positionDataLoaded: 'positionDataLoaded',
                positionLeaderData: 'positionLeaderData'
            }),
            topRow: function() {
                const topRow = this.positionLeaderData.slice(0, 3);
                topRow[0].start = 1;
                topRow[1].start = 5;
                topRow[2].start = 9;
                console.log(topRow);
                return topRow;
            },
            adjacentCol: function() {
                return this.positionLeaderData.slice(3, this.positionLeaderData.length + 1);
            }
        },
        methods: {
            ...mapActions({
                getPositionData: 'getPositionData'
            }),
            ...mapMutations({
                setPresentationState: 'setPresentationState'
            }),
            refreshComponent(position) {
                console.log('refereshComponent');
                console.log(position);
                this.getPositionData(position);
                this.setPresentationState({stateKey: 'globalHeader', data: position});
            }
        },
         beforeRouteUpdate(to, from, next) {
            console.log(to);
            console.log(from);
            this.refreshComponent(to.params.position);
            next();
         },
        mounted() {
            this.refreshComponent(this.$route.params.position);
            // this.getPositionData(this.$route.params.position);
            // this.setGlobalTitle(this.$route.params.position);
        },
        // updated() {
        //     console.log('updated');
        //     this.refreshComponent(this.$route.params.position);
        // }
        // beforeUpdate() {
        //     this.refreshComponent(this.$route.params.position);
        // },
    }
</script>