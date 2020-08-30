
<template>
    <div class="tile" :class="tileClass">
        <div v-if="hasHeaderSlot" class="tile__header">

            <slot name="header">
            
            </slot>
            <div class="tile__filter">
                <slot name="filter">
            
                </slot>
            </div>
            
        </div>

        <slot>
            
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
        }
    },
    computed: {
        hasHeaderSlot() {
            return !!this.$slots.header;
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
    display: flex;
    flex-direction: column;
    margin-bottom: $gutter;
    max-height: 33vh;

    .chart {
        padding: 15px 0;
        display: flex;
        justify-content: center;
        //display: flex;
        height: 100%;
        // width:
        // > div {
        //     height: 100%;
        // }

        // * {
        //     overflow: visible;
        // }
    }

    &:last-of-type {
        margin-right: 0;
    }

    @include respondUp($tabletViewport) {
        margin-bottom: 0;
        //margin-right: $gutter;
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

.tile__header {
    padding: 15px;
    border-bottom: $border;
    display: flex;
    justify-content: space-between;
}

.tile__filter {

}

// .tile-chart-wrapper {
//     position: relative;
// }
@include respondUp($tabletViewport) {
    .w- {
        &12 {
             grid-column: 1 / span 12;
        }
        &11 {
            // max-width: 91%;
            // flex-basis: 91%;
            &-1 {
                grid-column: 1 / span 11;
            }

            &-2{
                grid-column: 2 / span 11;
            }
        }
        &10 {
            // max-width: 83%; 
            // flex-basis: 83%;
            &-1 {
                grid-column: 1 / span 10;
            }

            &-2 {
                grid-column: 2 / span 10;
            }

            &-3 {
                grid-column: 3 / span 10;
            }
        }
        &9 {
            // max-width: 75%;
            // flex-basis: 75%
            &-1 {
                grid-column: 1 / span 9;
            }
            &-2 {
                grid-column: 2 / span 9;
            }
            &-3 {
                grid-column: 3 / span 9;
            }
            &-4 {
                grid-column: 4 / span 9;
            }
        }
        &8 {
            // max-width: 66%;
            // flex-basis: 66%
            &-1 {
                grid-column: 1 / span 8;
            }
            &-2 {
                grid-column: 2 / span 8;
            }
            &-3 {
                grid-column: 3 / span 8;
            }
            &-4 {
                grid-column: 4 / span 8;   
            }
            &-5 {
                grid-column: 5 / span 8;
            }
        }
        &7{
            // max-width: 58%;
            // flex-basis: 58%
            &-1 {
                grid-column: 1 / span 7;
            }
            &-2 {
                grid-column: 2 / span 7;
            }
            &-3 {
                grid-column: 3 / span 7;
            }
            &-4 {
                grid-column: 4 / span 7;
            }
            &-5 {
                grid-column: 5 / span 7;
            }
            &-6 {
                grid-column: 6 / span 7;
            }
        }
        &6 {
            // max-width: 50%;
            // flex-basis: 50%
            &-1 {
                grid-column: 1 / span 6;
            }
            &-2 {
                grid-column: 2 / span 6;
            }
            &-3 {
                grid-column: 3 / span 6;
            }
            &-4 {
                grid-column: 4 / span 6;   
            }
            &-5 {
                grid-column: 5 / span 6;
            }
            &-6 {
                grid-column: 6 / span 6;
            }
            &-7 {
                grid-column: 7 / span 6;
            }
        }
        &5 {
            // max-width: 42%;
            // flex-basis: 42%
            &-1 {
                grid-column: 1 / span 5;
            }
            &-2 {
                grid-column: 2 / span 5;
            }
            &-3 {
                grid-column: 3 / span 5;
            }
            &-4 {
                grid-column: 4 / span 5;
            }
            &-5 {
                grid-column: 5 / span 5;
            }
            &-6 {
                grid-column: 6 / span 5;
            }
            &-7 {
                grid-column: 7 / span 5;
            }
            &-8 {
                grid-column: 8 / span 5;
            }
        }
        &4 {
            // max-width: 33%; 
            // flex-basis: 33%
            &-1 {
                grid-column: 1 / span 4;
            }
            &-2 {
                grid-column: 2 / span 4;
            }
            &-3 {
                grid-column: 3 / span 4;
            }
            &-4 {
                grid-column: 4 / span 4;
            }
            &-5 {
                grid-column: 5 / span 4;
            }
            &-6 {
                grid-column: 6 / span 4;
            }
            &-7 {
                grid-column: 7 / span 4;
            }
            &-8 {
                grid-column: 8 / span 4;
            }
            &-9 {
                grid-column: 9 / span 4;
            }
        }
        &3 {
            // max-width: 25%;
            // flex-basis: 25%;
            &-1 {
                grid-column: 1 / span 3;
            }
            &-2 {
                grid-column: 2 / span 3;
            }
            &-3 {
                grid-column: 3 / span 3;
            }
            &-4 {
                grid-column: 4 / span 3;
            }
            &-5 {
                grid-column: 5 / span 3;
            }
            &-6 {
                grid-column: 6 / span 3;
            }
            &-7 {
                grid-column: 7 / span 3;
            }
            &-8 {
                grid-column: 8 / span 3;
            }
            &-9 {
                grid-column: 9 / span 3;
            }
            &-10 {
                grid-column: 10 / span 3;
            }
        }
        &2 {
            // max-width: 16%;
            // flex-basis: 16%;
            &-1 {
                grid-column: 1 / span 2;
            }
            &-2 {
                grid-column: 2 / span 2;
            }
            &-3 {
                grid-column: 3 / span 2;
            }
            &-4 {
                grid-column: 4 / span 2;
            }
            &-5 {
                grid-column: 5 / span 2;
            }
            &-6 {
                grid-column: 6 / span 2;
            }
            &-7 {
                grid-column: 7 / span 2;
            }
            &-8 {
                grid-column: 8 / span 2;
            }
            &-9 {
                grid-column: 9 / span 2;
            }
            &-10 {
                grid-column: 10 / span 2;
            }
            &-11 {
                grid-column: 11 / span 2;
            }
        }
        &1 {
            // max-width: 8%;
            // flex-basis: 8%;
            &-1 {
                grid-column: 1 / span 1;
            }
            &-2 {
                grid-column: 2 / span 1;
            }
            &-3 {
                grid-column: 3 / span 1;
            }
            &-4 {
                grid-column: 4 / span 1;
            }
            &-5 {
                grid-column: 5 / span 1;
            }
            &-6 {
                grid-column: 6 / span 1;
            }
            &-7 {
                grid-column: 7 / span 1;
            }
            &-8 {
                grid-column: 8 / span 1;
            }
            &-9 {
                grid-column: 9 / span 1;
            }
            &-10 {
                grid-column: 10 / span 1;
            }
            &-11 {
                grid-column: 11 / span 1;
            }
            &-12 {
                grid-column: 12 / span 1;
            }
        }
    }

    .tall-2 {
        grid-row-start: 2;
        grid-row-end: 4;
    }    

}

</style>