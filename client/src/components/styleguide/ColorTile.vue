<template>
    <div class="color-tile" v-bind:class="colorClass + '-bg'"><span>{{ colorClass }}</span></div>
    
</template>

<script>
    export default {
        name: 'ColorTile',
        props: ['colorClass']
    }
</script>

<style lang="scss">
    .color-tile {
        display: block;
        height: 100px;
        width: 100px;
        margin: 0 10px 35px;
        position: relative;
        > span {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -20px;
        }
    }
</style>