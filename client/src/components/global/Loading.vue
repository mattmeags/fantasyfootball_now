<template>
    <div class="loader">
        <img src='../../assets/loading.gif'/>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    //TODO: this doesn't work with local webpack
    //https://medium.com/p/8a933e82cb1e/responses/show
    // data: () => ({
    //     loaderUrl: '../../assets/loading.gif'
    // })
}
</script>

<style lang="scss" scoped>
    .loader {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>