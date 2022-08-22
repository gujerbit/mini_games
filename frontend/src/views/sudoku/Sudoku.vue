<template>
    <div class="w-full flex flex-col items-center">
        <div id="sudoku-container" class="w-150 h-150 mx-auto mt-2 border-2 border-black rounded grid grid-cols-9 justify-items-center items-center">
            <div class="w-15 h-15 border rounded flex justify-center items-center">
                <p class="text-xl">1</p>
            </div>
        </div>

        <custom-button class="w-20 h-10 mt-2 bg-yellow-300" :disabled="true">Start</custom-button>
    </div>
</template>

<script lang="ts">
import { Ref, ref, defineComponent } from "vue";

export default defineComponent({
    setup () {
    },
});
</script>

<style scoped src="./Sudoku.css">
</style>