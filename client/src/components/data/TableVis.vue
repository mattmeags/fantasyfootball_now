<template>
    <div class="table-wrapper">
        <table class="table">
            <thead>
                <tr class="table__row">
                    <th v-for="head in header" v-bind:key="header.id" v-on:click="sort(head)" class="table__head">
                        {{head}}
                        <span v-if="head in currentSort" class="table__sort-icon">
                            <eva-icon v-show="!currentSort[head]" name="arrow-ios-downward-outline" fill="#29CB97"></eva-icon>
                            <eva-icon v-show="currentSort[head]" name="arrow-ios-upward-outline" fill="#29CB97"></eva-icon>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in tableData" v-bind:key="row.id" class="table__row">
                    <td class="table__cell" v-for="item in row" v-bind:key="item.id">{{item}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'TableVis',
        props: {
            header: Array, 
            tableData: Array
        },
        data: () => ({
            currentSort: {}
        }),
        methods: {
            sort(head) {
                const index = this.header.indexOf(head);
                // Set currentSort to empty if new sort
                if (!(head in this.currentSort)) {
                    this.currentSort = {};
                }
                if (!head in this.currentSort !== head && !this.currentSort[head]) {
                    this.currentSort[head] = true;
                    this.tableData.sort((a, b) => {
                        if (isNaN(a[Object.keys(a)[index]])) {
                             if (a[Object.keys(a)[index]] > b[Object.keys(b)[index]]) {
                                return 1;
                            } else {
                                return -1;
                            }
                        } else {
                            if (parseInt(a[Object.keys(a)[index]], 10) > parseInt(b[Object.keys(b)[index]], 10)) {
                                return 1;
                            } else if (parseInt(a[Object.keys(a)[index]], 10) < parseInt(b[Object.keys(b)[index]], 10))  {
                                return -1;
                            } else {
                                return 0;
                            }
                        }
                    });
                } else {
                    this.currentSort[head]= false;
                    this.tableData.sort((a, b) => {
                        if (isNaN(a[Object.keys(a)[index]])) {
                             if (a[Object.keys(a)[index]] < b[Object.keys(b)[index]]) {
                                return 1;
                            } else {
                                return -1;
                            }
                        } else {
                            if (parseInt(a[Object.keys(a)[index]], 10) < parseInt(b[Object.keys(b)[index]], 10)) {
                                return 1;
                            } else if (parseInt(a[Object.keys(a)[index]], 10) > parseInt(b[Object.keys(b)[index]], 10))  {
                                return -1;
                            } else {
                                return 0;
                            }
                        }
                    });
                }
            }
        },
        mounted() {
            console.log(this.$props.header)
            this.sort(this.$props.header[0]);
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/styles';
    .table {
        border-collapse: collapse;
        width: 100%;
    }
    .table__cell {
        border-top: $border;
        border-bottom: $border;
    }
    .table__cell,
    .table__head {
        padding: 5px 10px 5px 0;
        text-align: left;

        @include respondUp($tabletViewport) {
            padding: 10px 20px 10px 0;
        }
    }
    .table__head {
        border-bottom: $border2;
        position: relative;
        white-space: nowrap;
        padding-right: 40px;

        i {
            height: 0;
            width: 0;
        }

        @include respondUp($tabletViewport) {
            padding-right: 20px;
        }
    }
    tr:hover {
        background: rgba($tietary, 0.2);
    }

    .table__sort-icon {
        position: absolute;
        right: 28px;
        bottom: -3px;

        @include respondUp($tabletViewport) {
            bottom: 2px;
        }   
    }

    .tile {
        .table-wrapper {
            padding: 15px;
        }
    }
</style>