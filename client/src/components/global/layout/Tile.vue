
<template>
    <div class="tile" :class="tileClass">

        <slot name="header">

        </slot>

        <slot name="data">
            
        </slot>
        <slot name="filter">
            
        </slot>
    </div>
</template>

<script>
export default {
    name: 'Tile',
    props: {
        tileClass: {
            type: String,
            default: 'w-12',
        },
        needsWrapper: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles';

.tile {
    background: $white;
    border-radius: $border-radius;
    box-shadow: 2px 4px 10px -6px $tietary;
    position: relative;
    overflow: scroll;

    .chart {
        //padding-top: 25px;
        //display: flex;
        //height: 100%;
        // width:
    }

    // &:hover {
    //     cursor: pointer;
    //     transform: scale(1.01);
    //     box-shadow: 4px 6px 10px -6px $tietary;
    //     transition: all .03s linear;
    // }
}

// .filter {
//     position: absolute;
//     right: 15px;
//     top: 15px;
// }

.tile-chart-wrapper {
    position: relative;
}
 .tile {
    margin-bottom: $gutter;

    &:last-of-type {
        margin-right: 0;
    }

    @include respondUp($tabletViewport) {
        margin-bottom: 0;
        margin-right: $gutter;
    }
}

</style>