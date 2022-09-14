<template>
    <input ref="input" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" class="p-1 border border-black rounded text-center">
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CustomInput",
    props: {
        modelValue: {
            type: [
                String,
                Number
            ],
        },
    },
});
</script>

<style scoped src="./CustomInput.css">
</style>