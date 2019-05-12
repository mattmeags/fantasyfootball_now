<template>
    <li class="nav-item">
        <font-awesome-icon v-bind:icon="menuItem.icon" />
    </li>
</template>

<script>
    export default {
        name: 'MenuItem',
        props: ['menuItem']
    }
</script>
