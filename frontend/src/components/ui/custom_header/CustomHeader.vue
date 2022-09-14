<template>
    <header class="w-full h-10 bg-gray-200">
        <p class="p-2">{{ userName }}</p>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CustomHeader",
    setup () {
        const userName = window.sessionStorage.getItem("userName");

        return {
            userName,
        };
    }
});
</script>

<style scoped src="./CustomHeader.css">
</style>