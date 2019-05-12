<template>
    <div class="banner">
        <div class="banner-left">

        </div>
        <div class="banner-right">
            <h1>{{name}}</h1>
            <h4>{{location}}</h4>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Banner',
  props: ['name', 'teamColor', 'location'],
};
</script>
