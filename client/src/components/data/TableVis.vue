<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th v-for="head in header" v-bind:key="header.id" v-on:click="sort(head)">
                        <div class="d-flex">
                            {{head}}
                            <span v-if="head in currentSort">
                                <eva-icon v-show="!currentSort[head]" name="arrow-ios-downward-outline" fill="#29CB97"></eva-icon>
                                <eva-icon v-show="currentSort[head]" name="arrow-ios-upward-outline" fill="#29CB97"></eva-icon>
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in tableData" v-bind:key="row.id">
                    <td v-for="item in row" v-bind:key="item.id">{{item}}</td>
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
    @import '../../assets/styles/tables';
</style>