<template>
    <div>
        <h3>{{title}}</h3>
    </div>
</template>

<script>
export default {
    name: 'TileHeader',
    props: ['title']
}
</script>

<style lang="scss">
    h3 {
        text-align: left;
        margin: 0;
    }
</style>