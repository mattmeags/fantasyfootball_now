<template>
    <div class="tile-header">
        <h3 class="type--h4 type--color-secondary h-no-margin">{{title}}</h3>
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
    @import '@/assets/styles';

    .tile-header {
        padding: 15px;
        border-bottom: $border;
    }
    h3 {
        
        text-align: left;
    }
    .descriptor {
        padding: 5px 0 0 15px;
    }
</style>