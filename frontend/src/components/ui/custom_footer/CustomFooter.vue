<template>
    <footer class="w-full h-8 flex justify-center items-center fixed bottom-0 border-t border-black bg-white">
        <p class="mr-2">&copy; jylee. All rights reserved.</p>
        <p class="mr-2">Current Version: {{ version }}</p>
        <p class="mr-2">Last Update: {{ lastUpdate }}</p>
        <a href="https://github.com/gujerbit/mini_games" target="_blank">
            <img  src="@assets/images/github.png" alt="">
        </a>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CustomFooter",
    props: {
        version: {
            type: String,
        },
        lastUpdate: {
            type: String,
        }
    }
});
</script>

<style scoped src="./CustomFooter.css">
</style>