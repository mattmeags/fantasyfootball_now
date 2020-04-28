<template>
     <div class="tile-stack-container" :class="stackedClass">
         <slot></slot>
     </div>
</template>

<script>
export default {
    name: 'StackedCharts',
    props: {
        stackedClass: String
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles';

.tile-stack-container {
    display: flex;
    flex-direction: column;
    margin-right: 0;
    

    @include respondUp($tabletViewport) {
        margin-right: $gutter;
        
        &:last-child {
            margin-right: 0;
        }

        .tile {
            margin-right: 0;

            &:not(:last-child) {
                margin-bottom: $gutter;
            }
        }
    }
}
</style>