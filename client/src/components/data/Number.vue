<template>
    <article class="number-viz-wrapper">
        <h3 class="type--body type--color-tietary">{{title}}</h3>
        <div class="type--h4 type--color-secondary">{{formattedDescriptor}}</div>
        <div class="type--h1 type--color-light-pink number">{{number}}</div>
    </article>
</template>

<script>
import {trimName} from '../../assets/scripts/utilities';

export default {
    name: 'Number',
    props: ['title', 'descriptor', 'number'],
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

        .number {
            text-align: center;
            margin-top: 15px;
        }
    }
</style>