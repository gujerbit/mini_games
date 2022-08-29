<template>
    <div class="w-full mt-2 pb-10 flex justify-center">
        <div></div>

        <div class="w-150 h-150 mx-4 border-2 border-black">

        </div>

        <div></div>

        <custom-footer :version="'1.0'" :lastUpdate="'2022-08-29'"></custom-footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Minesweeper",
});
</script>

<style scoped src="./Minesweeper.css">
</style>