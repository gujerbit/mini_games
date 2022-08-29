<template>
    <button :class="disabled ? 'cursor-default opacity-25 pointer-events-none' : 'hover:opacity-75'" class="border rounded duration-200">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CustomButton",
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style scoped src="./CustomButton.css">
</style>