<template>
    <div>
        <h3 class="type--body type--color-secondary h-no-margin">{{title}}</h3>
        <div v-if="descriptor" class="type--h4 type--color-secondary descriptor">{{descriptor}}</div>
    </div>
</template>

<script>
export default {
    name: 'TileHeader',
    props: ['title', 'descriptor']
}
</script>

<style lang="scss" scoped>
    h3 {
        padding: 15px 0 0 15px;
        text-align: left;
    }
    .descriptor {
        padding: 5px 0 0 15px;
    }
</style>