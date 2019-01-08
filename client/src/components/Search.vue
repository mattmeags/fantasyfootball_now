<template>

    <form>
        afadsfads
        {{ teams }}
        <input type="search" name="search"/>
        <input type="submit" value="Submit"/>
    </form>
</template>

<script>
    export default {
       name: 'Search',
       props: ['teams']
    }
</script>
