<template>
    <div v-if="positionDataLoaded">
        <Dashboard>
            <Row>
                <Tile tileClass="w-4" v-for="(leaderData) in topRow" :key="leaderData.title">
                    <template v-slot:data>
                        <Number :descriptor="leaderData.name" :title="leaderData.title" :number="leaderData.value"></Number>
                    </template>
                </Tile>
            </Row>
            <Row rowClass="tall">
                <StackedCharts stackedClass="w-2">
                    <Tile v-for="(leaderData) in adjacentCol" :key="leaderData.title">
                        <template v-slot:data>
                            <Number :descriptor="leaderData.name" :title="leaderData.title" :number="leaderData.value"></Number>
                        </template>
                    </Tile>
                </StackedCharts>
                <Tile tileClass="w-10">
                    <template v-slot:data>
                        <TableVis v-bind:header="positionDataHeader" v-bind:tableData="positionData"></TableVis>
                    </template>
                </Tile>
            </Row>
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
                return this.positionLeaderData.slice(0, 3);
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
                setGlobalTitle: 'setGlobalTitle'
            }),
            refreshComponent(position) {
                console.log('refereshComponent');
                console.log(position);
                this.getPositionData(position);
                this.setGlobalTitle(position);
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