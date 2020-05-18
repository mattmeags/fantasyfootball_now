<template>
    <section class="dashboard">
        <slot></slot>
    </section>
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
    //flex-wrap: wrap;
    flex-direction: column;
    box-sizing: border-box;
    padding: $gutter;
    overflow: hidden;

    @include respondUp($tabletViewport) {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-auto-rows: auto;
        grid-row-gap: $gutter;
        grid-column-gap: $gutter;
    }
}
</style>