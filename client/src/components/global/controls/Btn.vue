<template>
    <button :class="buttonType" :disabled="isDisabled">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'Btn',
    props: {
        buttonType: {
            type: String,
            default: 'primary'
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/styles';

    button {
        display: block;
        border: 2px solid $accent;
        background: $accent;
        padding: 10px 35px;
        border-radius: $border-radius;
        color: $white;
        max-width: 215px;
        font-size: 14px;

        &.secondary {
            background: $white;
            color: $accent;

            &:hover {
                cursor: pointer;
                background: $accent;
                border-color: $accent;
                color: $white;
                transition: all .1s linear;
            }
        }

        &:hover {
            cursor: pointer;
            background: $accent;
            opacity: .75;
            transition: all .1s linear;
        }

        &[disabled] {
            opacity: .5;

            &:hover {
                cursor: arrow;
                background: $accent;
                border-color: $accent;
            }
        }
    }
</style>