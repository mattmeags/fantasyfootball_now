<template>
    <article class="number-viz-wrapper">
        <h2 class="type--body type--color-tietary type--h2">{{title}}</h2>
        <h3 class="type--h3 type--color-secondary">{{formattedDescriptor}}</h3>
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