<template>
    <article class="number-viz-wrapper">
        <!-- <h2 class="type--body type--color-tietary type--h2">{{title}}</h2> -->
        <h2 class="type--h2 type--color-secondary">{{formattedDescriptor}}</h2>
        <h2 class="type--h2 type--color-light-pink number">{{number}}</h2>
    </article>
</template>

<script>
import {trimName} from '@/assets/scripts/utilities';

export default {
    name: 'Number',
    props: ['descriptor', 'number'],
    computed: {
        formattedDescriptor: function() {
            return trimName(this.descriptor);
        }
    }
}
</script>

<style lang="scss">
    .number-viz-wrapper {
        padding: 15px;
        text-align: left;
        text-align: center;        

        .number {
            margin-top: 15px;
        }
    }
</style>