<template>
    <div class="w-full mt-2 pb-10 flex justify-center">
        <div class="w-40 flex flex-col items-end">
            <div class="w-34 h-28 p-1 border-2 border-black rounded">
                <p class="text-xl text-center">Settings</p>

                <div class="my-2 flex justify-between items-center text-sm">
                    <p>Cel Size</p>
                    <custom-input v-model="gameSettings.celSize" class="w-10 h-6"></custom-input>
                </div>

                <div class="my-2 flex justify-between items-center text-sm">
                    <p>Mine Count</p>
                    <custom-input v-model="gameSettings.mineCount" class="w-10 h-6"></custom-input>
                </div>
            </div>

            <custom-button @click="createGame" class="w-34 h-8 my-2 bg-yellow-400" :disabled="false">{{ "Start" }}</custom-button>
        </div>

        <div :style="[{ 'grid-template-columns': `repeat(${gameSettings.celSize}, 1fr)` }, { 'grid-template-rows': `repeat(${gameSettings.celSize}, 1fr)` }]" class="w-150 h-150 mx-4 grid border-2 border-black">
            <!-- eslint-disable-next-line -->
            <template v-for="(column, columnIndex) in mineList" :key="columnIndex">
                <div @click="createMine(columnIndex, rowIndex)" v-for="(row, rowIndex) in column" :key="rowIndex" style="box-shadow: inset 0px 0px 10px 1px #000000" :class="!row.open ? 'cursor-pointer hover:opacity-50' : ''" class="flex justify-center items-center text-xl border border-black duration-200">
                    <!-- <template v-if="row.open"> -->
                        <img class="p-2" v-if="row.celInfo === 'mine'" src="@assets/images/minesweeper/bomb.png" alt="">
                        <p v-else>{{ row.celInfo ? row.celInfo : "" }}</p>
                    <!-- </template> -->
                </div>
            </template>
        </div>

        <div class="w-40"></div>

        <custom-footer :version="'1.0'" :lastUpdate="'2022-08-29'"></custom-footer>
    </div>
</template>

<script lang="ts">
import { compile, computed, defineComponent, ref } from "vue";

export default defineComponent({
    name: "Minesweeper",
    setup () {
        const mineList = ref(new Array());
        const gameSettings = ref({
            celSize: 10,
            mineCount: 10,
        });
        const isCreateMine = ref(false);

        function createGame () {
            isCreateMine.value = false;

            for (let i = 0; i < gameSettings.value.celSize; i++)    {
                mineList.value[i] = new Array();

                for (let j = 0; j < gameSettings.value.celSize; j++) {
                    mineList.value[i].push({
                        celInfo: 0,
                        open: false,
                    });
                }
            }
        }

        function createMine (selectColumnIndex:number, selectRowIndex:number) {
            if (isCreateMine.value) {
                return;
            }

            for (let i = 0; i < gameSettings.value.mineCount; i++) {
                const randomMineLocate = Math.floor(Math.random() * gameSettings.value.celSize ** 2);
                const columnIndex = Math.floor(randomMineLocate / gameSettings.value.celSize);
                const rowIndex = randomMineLocate % gameSettings.value.celSize;

                if (!mineList.value[columnIndex][rowIndex].celInfo && !(selectColumnIndex === columnIndex && selectRowIndex === rowIndex)) {
                    mineList.value[columnIndex][rowIndex].celInfo = "mine";
                } else {
                    i--;
                }
            }

            isCreateMine.value = true;

            updateMineInfo();
        }

        function updateMineInfo () {
            for (let i = 0; i < gameSettings.value.celSize; i++) {
                for (let j = 0; j < gameSettings.value.celSize; j++) {
                    validateNear(i, j);
                }
            }
        }

        function validateNear (column:number, row:number) {
            if (mineList.value[column][row].celInfo === "mine") {
                return;
            }

            for (let i = -1; i <= 1; i++) {
                if (column + i < 0 || column + i > gameSettings.value.celSize - 1) {
                    continue;
                }

                for (let j = -1; j <= 1; j++) {
                    if (row + j < 0 || row + j > gameSettings.value.celSize - 1) {
                        continue;
                    }

                    if (mineList.value[column + i][row + j].celInfo === "mine") {
                        mineList.value[column][row].celInfo++;
                    }
                }
            }
        }

        return {
            mineList,
            gameSettings,
            createGame,
            createMine,
        };
    },
});
</script>

<style scoped src="./Minesweeper.css">
</style>