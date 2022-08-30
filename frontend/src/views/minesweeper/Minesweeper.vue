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

        <div :style="[{ 'grid-template-columns': `repeat(${celSize}, 1fr)` }, { 'grid-template-rows': `repeat(${celSize}, 1fr)` }]" :class="(isDie || isGameClear) ? 'pointer-events-none' : ''" class="w-150 h-150 mx-4 grid border-2 border-black">
            <!-- eslint-disable-next-line -->
            <template v-for="(column, columnIndex) in mineList" :key="columnIndex">
                <div @mousedown="onMousedownCel($event, columnIndex, rowIndex)" v-for="(row, rowIndex) in column" :key="rowIndex" style="box-shadow: inset 0px 0px 10px 1px #000000" :class="!row.open && !row.flag ? 'cursor-pointer hover:opacity-50' : getBackgroundColor(row)" class="flex justify-center items-center text-xs border border-black duration-200">
                    <template v-if="row.open">
                        <img v-if="row.celInfo === 'mine'" src="@assets/images/minesweeper/mine.png" alt="" class="p-2">
                        <p v-else>{{ row.celInfo ? row.celInfo : "" }}</p>
                    </template>
                    <template v-else>
                        <img v-if="row.flag" src="@assets/images/minesweeper/flag.png" alt="">
                    </template>
                </div>
            </template>
        </div>

        <div class="w-40">
            <div class="w-34 h-10 flex justify-center items-center border-2 border-black rounded">
                <custom-timer :time="playTime"></custom-timer>
            </div>

            <div class="w-34 h-10 my-2 flex items-center border-2 border-black rounded whitespace-nowrap text-sm overflow-hidden">
                <p class="mx-1">Mine Total: </p>
                <p>{{ flagCount }}</p>
            </div>
        </div>

        <custom-footer :version="'1.0'" :lastUpdate="'2022-08-29'"></custom-footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "Minesweeper",
    setup () {
        const mineList = ref(new Array());
        const gameSettings = ref({
            celSize: 10,
            mineCount: 10,
        });
        const isCreateMine = ref(false);
        const flagCount = ref(gameSettings.value.mineCount);
        const playTime = ref(0);
        const isDie = ref(false);
        const isGameClear = ref(false);
        const celSize = ref(0);

        const MINETOTAL = gameSettings.value.mineCount;
        
        let interval = 0;

        async function createGame () {
            mineList.value = new Array();
            isCreateMine.value = false;
            isDie.value = false;
            playTime.value = 0;
            isGameClear.value = false;
            celSize.value = gameSettings.value.celSize;

            for (let i = 0; i < gameSettings.value.celSize; i++)    {
                mineList.value[i] = new Array();

                for (let j = 0; j < gameSettings.value.celSize; j++) {
                    mineList.value[i].push({
                        celInfo: 0,
                        open: false,
                        flag: false,
                    });
                }
            }

            clearInterval(interval);
        }

        function createMine (selectColumnIndex:number, selectRowIndex:number) {
            if (isCreateMine.value) {
                return;
            }

            for (let i = 0; i < gameSettings.value.mineCount; i++) {
                const randomMineLocate = Math.floor(Math.random() * mineList.value.length ** 2);
                const columnIndex = Math.floor(randomMineLocate / mineList.value.length);
                const rowIndex = randomMineLocate % mineList.value.length;

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
            for (let i = 0; i < mineList.value.length; i++) {
                for (let j = 0; j < mineList.value.length; j++) {
                    validateNear(i, j);
                }
            }

            interval = setInterval(() => {
                playTime.value++;
            }, 1000);
        }

        function validateNear (columnIndex:number, rowIndex:number) {
            if (mineList.value[columnIndex][rowIndex].celInfo === "mine") {
                return;
            }

            for (let i = -1; i <= 1; i++) {
                if (columnIndex + i < 0 || columnIndex + i > mineList.value.length - 1) {
                    continue;
                }

                for (let j = -1; j <= 1; j++) {
                    if (rowIndex + j < 0 || rowIndex + j > mineList.value.length - 1 || mineList.value[columnIndex + i][rowIndex + j].celInfo !== "mine") {
                        continue;
                    }

                    mineList.value[columnIndex][rowIndex].celInfo++;
                }
            }
        }

        function onMousedownCel ($event:MouseEvent, columnIndex:number, rowIndex:number) {
            // eslint-disable-next-line
            $event.currentTarget?.addEventListener("contextmenu", (contextEvent:any) => {
                contextEvent.preventDefault();
            });

            if (!isCreateMine.value) {
                createMine(columnIndex, rowIndex);
            }

            if ($event.button === 0 && !mineList.value[columnIndex][rowIndex].flag) {
                openCel(columnIndex, rowIndex);
            } else if ($event.button === 2 && !mineList.value[columnIndex][rowIndex].open) {
                setFlag(columnIndex, rowIndex);
            }
        }

        function openCel (columnIndex:number, rowIndex:number) {
            if (mineList.value[columnIndex][rowIndex].open) {
                return;
            }

            mineList.value[columnIndex][rowIndex].open = true;

            if (mineList.value[columnIndex][rowIndex].celInfo) {
                if (mineList.value[columnIndex][rowIndex].celInfo === "mine") {
                    openMines();
                    clearInterval(interval);
                }

                return;
            }

            for (let i = -1; i <= 1; i++) {
                if (i !== 0 && columnIndex + i >= 0 && columnIndex + i <= mineList.value.length - 1) {
                    openCel(columnIndex + i, rowIndex);
                }

                if (i !== 0 && rowIndex + i >= 0 && rowIndex + i <= mineList.value.length - 1) {
                    openCel(columnIndex, rowIndex + i);
                }
            }
        }

        function setFlag (columnIndex:number, rowIndex:number) {
            if (flagCount.value <= 0) {
                return;
            }

            if (mineList.value[columnIndex][rowIndex].flag) {
                flagCount.value++;
            } else {
                flagCount.value--;
            }

            mineList.value[columnIndex][rowIndex].flag = !mineList.value[columnIndex][rowIndex].flag;
        }

        // eslint-disable-next-line
        function getBackgroundColor (cel:any) {
            return cel.flag ? "bg-green-200" : cel.celInfo === "mine" ? "bg-red-200" : "bg-yellow-200";
        }

        function openMines () {
            isDie.value = true;

            for (let i = 0; i < mineList.value.length; i++) {
                for (let j = 0; j < mineList.value.length; j++) {
                    if (mineList.value[i][j].celInfo === "mine" && !mineList.value[i][j].flag) {
                        mineList.value[i][j].open = true;
                    }
                }
            }
        }

        function validateGameClear () {
            let validateMineTotal = 0;

            for (let i = 0; i < mineList.value.length; i++) {
                for (let j = 0; j < mineList.value.length; j++) {
                    if (mineList.value[i][j].celInfo === "mine" && !mineList.value[i][j].open) {
                        validateMineTotal++;
                    }
                }
            }

            if (validateMineTotal === MINETOTAL) {
                isGameClear.value = true;
            }
        }

        return {
            mineList,
            gameSettings,
            flagCount,
            playTime,
            isDie,
            isGameClear,
            celSize,
            createGame,
            onMousedownCel,
            getBackgroundColor,
        };
    },
});
</script>

<style scoped src="./Minesweeper.css">
</style>