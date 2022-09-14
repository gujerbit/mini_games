<template>
    <div class="w-full flex flex-col relative">
        <router-link to="/sudoku">
            SUDOKU
        </router-link>

        <router-link to="/minesweeper">
            MINESWEEPER
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Main",
});
</script>

<style>

</style>