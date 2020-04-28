<template>
    <div class="row" :class="rowClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Row',    
    props: {
        rowClass: String
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles';

.row {
    flex-basis: 100%;
    margin-bottom: $gutter;
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;

    &.tall {
        @include respondUp($tabletViewport) {
            max-height: calc(100vh * .7);
        }
    }

    @include respondUp($tabletViewport) {
        flex-wrap: nowrap;
    }
}

</style>