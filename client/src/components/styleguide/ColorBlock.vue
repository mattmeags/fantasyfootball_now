<template>
    <div class="color-block" v-bind:class="colorClass">
        {{ colorClass }}
    </div>
</template>

<script>
    export default {
        name: 'ColorBlock',
        props: ['colorClass']
    };
</script>

<style>
    .color-block {
        display: block;
        height: 50px;
        width: 50px;
        color: #fff;
    }
</style>