<template>
    <div class="dashboard">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',

}
</script>

<style lang="scss" scoped>
@import '@/assets/styles';

.dashboard {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    //flex-direction: column;
    box-sizing: border-box;
    padding: $gutter;
    overflow: hidden;

    // @include respondUp($tabletViewport) {
    //     padding: 25px;
    // }
}
</style>