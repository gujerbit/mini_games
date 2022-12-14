<template>
    <div class="w-full pb-10 flex justify-center">
        <div class="w-40 mt-2 flex flex-col items-end">
            <custom-button @click="difficulty = 1" :class="[difficulty === 1 ? '' : 'opacity-30', createGameFinish ? '' : 'pointer-events-none']" class="w-34 h-8 bg-green-400">EASY</custom-button>
            <custom-button @click="difficulty = 2" :class="[difficulty === 2 ? '' : 'opacity-30', createGameFinish ? '' : 'pointer-events-none']" class="w-34 h-8 bg-blue-400 my-2">NORMAL</custom-button>
            <custom-button @click="difficulty = 3" :class="[difficulty === 3 ? '' : 'opacity-30', createGameFinish ? '' : 'pointer-events-none']" class="w-34 h-8 bg-red-400">HARD</custom-button>
            <custom-button @click="createBoard" class="w-34 h-8 my-2 bg-yellow-400" :disabled="!createGameFinish">{{ currentStatus }}</custom-button>
        </div>

        <div id="sudoku-container" :class="isGameClear ? 'pointer-events-none' : ''" class="w-150 h-150 mx-4 mt-2 border-2 border-black rounded grid grid-cols-9 justify-items-center items-center relative">
            <div style="z-index: -1" class="grid grid-cols-3 absolute">
                <div v-for="(background, backgroundIndex) in 9" :key="backgroundIndex" :class="background % 2 === 0 ? 'bg-gray-300' : 'bg-white'" class="w-49.5 h-49.5 rounded">
                </div>
            </div>

            <!-- eslint-disable-next-line -->
            <template v-for="(column, columnIndex) in sudokuList" :key="columnIndex + 'sudoku'" v-if="createGameFinish">
                <div @click="onClickCel(rowIndex + (columnIndex * 9))" v-for="(row, rowIndex) in column" :key="rowIndex" :class="[row.fixed ? 'text-yellow-300 pointer-events-none' : 'cursor-pointer', row.select ? 'bg-yellow-300' : '']" class="w-15 h-15 border border-black rounded flex justify-center items-center bg-white relative">
                    <div class="w-full h-full flex justify-between absolute text-xs text-gray-800">
                        <div class="ml-1 flex flex-col justify-center">
                            <!-- eslint-disable-next-line -->
                            <template v-for="(memo, memoIndex) in memoList[rowIndex + (columnIndex * 9)]" :key="memoIndex">
                                <p v-if="memoIndex < 3">{{ memo }}</p>
                            </template>
                        </div>
                        <div class="mr-1 flex flex-col justify-center">
                            <!-- eslint-disable-next-line -->
                            <template v-for="(memo, memoIndex) in memoList[rowIndex + (columnIndex * 9)]" :key="memoIndex">
                                <p v-if="memoIndex >= 3">{{ memo }}</p>
                            </template>
                        </div>
                    </div>

                    <p :class="(row.duplicateColumn || row.duplicateRow || row.duplicateRegion) ? 'text-red-400' : ''" class="text-xl">{{ row.value ? row.value : "" }}</p>
                </div>
            </template>

            <!-- eslint-disable-next-line -->
            <template v-for="(column, columnIndex) in tempSudokuList" :key="columnIndex + 'temp'" v-else>
                <div v-for="(row, rowIndex) in column" :key="rowIndex" class="w-15 h-15 border border-black rounded flex justify-center items-center bg-white">
                    <p class="text-xl">{{ row ? row : "" }}</p>
                </div>
            </template>
        </div>

        <div class="w-40 mt-2 flex flex-col">
            <div class="w-34 h-10 flex justify-center items-center border-2 border-black rounded">
                <custom-timer :time="playTime"></custom-timer>
            </div>

            <div class="w-34 h-10 my-2 flex items-center border-2 border-black rounded whitespace-nowrap text-sm overflow-hidden">
                <p class="mx-1">CHANGE: </p>
                <p>{{ changeCel }}</p>
            </div>

            <div class="w-34 h-10 flex items-center border-2 border-black rounded whitespace-nowrap text-sm overflow-hidden">
                <p class="mx-1">INCORRECT: </p>
                <p>{{ incorrectCel }}</p>
            </div>

            <div class="w-34 h-58 my-2 flex flex-col border-2 border-black rounded whitespace-nowrap overflow-hidden">
                <p class="p-1 text-xl text-center">MEMO</p>

                <div class="p-1 flex justify-between">
                    <custom-input @focus="focusingInput = true" @blur="focusingInput = false" v-model="memoValue" class="w-14 h-8"></custom-input>
                    <custom-button @click="addMemo" class="w-14 h-8 bg-yellow-300 text-sm" :disabled="currentCelIndex === -1">ADD</custom-button>
                </div>

                <div v-if="currentCelIndex !== -1 && memoList[currentCelIndex]" class="p-1 w-full flex flex-col">
                    <!-- eslint-disable-next-line -->
                    <div v-for="(memo, memoIndex) in memoList[currentCelIndex]" :key="memoIndex" class="w-full flex justify-between">
                        <p>{{ memo }}</p>
                        <custom-button @click="removeMemo(memoIndex)" class="w-5 h-5 border-black text-xs">X</custom-button>
                    </div>
                </div>
            </div>
        </div>

        <custom-popup ref="resultPopup" :width="100" :height="100">
            <div class="w-full h-full flex flex-col justify-center items-center">
                <p class="mt-24 text-3xl">SCORE: {{ gameScore }}</p>
                <custom-button @click="resultPopup.closePopup" class="w-20 h-8 mt-40 bg-yellow-300">OK</custom-button>
            </div>
        </custom-popup>

        <custom-footer :version="'1.1'" :lastUpdate="'2022-08-26'"></custom-footer>
    </div>
</template>

<script lang="ts">
import { nextTick, watch, ref, defineComponent } from "vue";

export default defineComponent({
    setup () {
        const sudokuList = ref(new Array());
        const tempSudokuList = ref(new Array());
        const createGameFinish = ref(true);
        const currentCelIndex = ref(-1);
        const currentStatus = ref("Start");
        const isGameClear = ref(true);
        const difficulty = ref(1);
        const playTime = ref(0);
        const changeCel = ref(0);
        const incorrectCel = ref(0);
        const resultPopup = ref(null);
        const gameScore = ref(0);
        const memoList = ref(new Array());
        const memoValue = ref();
        const focusingInput = ref(false);

        watch(memoValue, async () => {
            await nextTick();

            memoValue.value = memoValue.value.substring(memoValue.value.length - 1);

            if (memoValue.value == 0) {
                memoValue.value = "";
            }
        });

        let interval = 0;

        function createBoard () {
            createGameFinish.value = false;
            currentCelIndex.value = -1;
            currentStatus.value = "Creating...";
            isGameClear.value = false;
            playTime.value = 0;
            changeCel.value = 0;
            incorrectCel.value = 0;
            memoList.value = new Array();

            clearInterval(interval);

            for (let i = 0; i < 9; i++) {
                sudokuList.value[i] = new Array();

                for (let j = 0; j < 9; j++) {
                    sudokuList.value[i][j] = Math.floor(Math.random() * 9) + 1;
                }
            }

            createTempBoard();
            validateBoard();
        }

        async function createTempBoard () {
            const create = () => {
                return new Promise<void>((resolve) => {
                    setTimeout(() => {
                        for (let i = 0; i < 9; i++) {
                            tempSudokuList.value[i] = new Array();

                            for (let j = 0; j < 9; j++) {
                                tempSudokuList.value[i][j] = Math.floor(Math.random() * 9) + 1;
                            }
                        }

                        resolve();
                    }, 100);
                });
            }

            while (!createGameFinish.value) {
                await create();
            }
        }

        async function validateBoard () {
            let checkBoard = false;
            let tryCount = 1;

            const validating = () => {
                return new Promise<void>((resolve) => {
                    setTimeout(() => {
                        if (tryCount % 3 === 0) {
                            updateRandomColumn();
                        }

                        if (tryCount % 5000 === 0) {
                            for (let i = 0; i < 9; i++) {
                                sudokuList.value[i] = new Array();

                                for (let j = 0; j < 9; j++) {
                                    sudokuList.value[i][j] = Math.floor(Math.random() * 9) + 1;
                                }
                            }
                        }

                        const checkColumn = validateColumn();
                        const checkRow = validateRow();
                        const checkRegion = validateRegion();

                        if (checkColumn && checkRow && checkRegion) {
                            checkBoard = true;
                        } else {
                            !checkColumn && updateColumn();
                            !checkRow && updateRow();
                            !checkRegion && updateRegion();

                            tryCount++;
                        }

                        resolve();
                    }, 1);
                });
            };

            while (!checkBoard) {
                await validating();
            }

            removeRandomCel();
        }

        function validateColumn () {
            let checkColumn = true;
            
            for (let i = 0; i < 9; i++) {
                // eslint-disable-next-line
                if ([... new Set(sudokuList.value[i].map((column:any) => column.value ? +column.value : column))].length !== 9) {
                    checkColumn = false;
                }
            }
            
            return checkColumn;
        }

        function updateColumn () {
            for (let i = 0; i < 9; i++) {
                while ([... new Set(sudokuList.value[i])].length !== 9) {
                    for (let j = 0; j < 8; j++) {
                        for (let k = j + 1; k < 9; k++) {
                            if (sudokuList.value[i][j] === sudokuList.value[i][k]) {
                                sudokuList.value[i][k] = Math.floor(Math.random() * 9) + 1;
                            }
                        }
                    }
                }
            }
        }

        function validateRow () {
            let checkRow = true;

            for (let i = 0; i < 9; i++) {
                const rowList = new Array();

                for (let j = 0; j < 9; j++) {
                    rowList.push(sudokuList.value[j][i]);
                }

                // eslint-disable-next-line
                if ([... new Set(rowList.map((row:any) => row.value ? +row.value : row))].length !== 9) {
                    checkRow = false;
                }
            }
            
            return checkRow;
        }

        function updateRow () {
            for (let i = 0; i < 9; i++) {
                const rowList = new Array();

                for (let j = 0; j < 9; j++) {
                    rowList.push(sudokuList.value[j][i]);
                }

                while ([... new Set(rowList)].length !== 9) {
                    for (let j = 0; j < 8; j++) {
                        for (let k = j + 1; k < 9; k++) {
                            if (sudokuList.value[j][i] === sudokuList.value[k][i]) {
                                sudokuList.value[k][i] = Math.floor(Math.random() * 9) + 1;
                                rowList.splice(k, 1, sudokuList.value[k][i]);
                            }
                        }
                    }
                }
            }
        }

        function validateRegion () {
            let checkRegion = true;
            let startColumn = 0;
            let startRow = 0;

            for (let i = 0; i < 9; i++) {
                const regionList = new Array();

                for (let j = startColumn * 3; j < startColumn * 3 + 3; j++) {
                    for (let k = startRow * 3; k < startRow * 3 + 3; k++) {
                        regionList.push(sudokuList.value[j][k]);
                    }
                }

                // eslint-disable-next-line
                if ([... new Set(regionList.map((region:any) => region.value ? +region.value : region))].length !== 9) {
                    checkRegion = false;
                }

                if ((startColumn + 1) % 3 === 0) {
                    startColumn = 0;
                    startRow++;
                } else {
                    startColumn++;
                }
            }

            return checkRegion;
        }

        function updateRegion () {
            let startColumn = 0;
            let startRow = 0;

            for (let i = 0; i < 9; i++) {
                const regionList = new Array();

                for (let j = startColumn * 3; j < startColumn * 3 + 3; j++) {
                    for (let k = startRow * 3; k < startRow * 3 + 3; k++) {
                        regionList.push(sudokuList.value[j][k]);
                    }
                }

                while ([... new Set(regionList)].length !== 9) {
                    for (let j = 0; j < 8; j++) {
                        for (let k = j + 1; k < 9; k++) {
                            if (regionList[j] === regionList[k]) {
                                const randomValue = Math.floor(Math.random() * 9) + 1;

                                sudokuList.value[Math.floor(k / 3) + (startColumn * 3)][(k % 3) + startRow * 3] = randomValue;
                                regionList.splice(k, 1, randomValue);
                            }
                        }
                    }
                }

                if ((startColumn + 1) % 3 === 0) {
                    startColumn = 0;
                    startRow++;
                } else {
                    startColumn++;
                }
            }
        }

        function validateCel (celIndex:number) {
            const columnList = sudokuList.value[Math.floor(celIndex / 9)];
            const rowList = new Array();
            const regionList = new Array();

            let isIncorrect = false;

            for (let i = 0; i < 9; i++) {
                rowList.push(sudokuList.value[i][Math.floor(celIndex % 9)]);
            }

            for (let i = Math.floor(Math.floor(celIndex / 9) / 3) * 3; i < Math.floor(Math.floor(celIndex / 9) / 3) * 3 + 3; i++) {
                for (let j = Math.floor(celIndex % 9 / 3) * 3; j < Math.floor(celIndex % 9 / 3) * 3 + 3; j++) {
                    regionList.push(sudokuList.value[i][j]);
                }
            }

            for (let i = 1; i <= 9; i++) {
                let columnDuplicateCount = 0;
                let rowDuplicateCount = 0;
                let regionDuplicateCount = 0;

                // eslint-disable-next-line
                columnList.forEach((column:any) => { 
                    if (i == column.value) {
                        columnDuplicateCount++;
                    }
                });

                // eslint-disable-next-line
                rowList.forEach((row:any) => {
                    if (i == row.value) {
                        rowDuplicateCount++;
                    }
                });

                // eslint-disable-next-line
                regionList.forEach((region:any) => {
                    if (i == region.value) {
                        regionDuplicateCount++;
                    }
                });

                if (columnDuplicateCount > 1) {
                    // eslint-disable-next-line
                    columnList.forEach((column:any) => { 
                        if (i == column.value) {
                            column.duplicateColumn = true;
                        }
                    });

                    isIncorrect = true;
                } else {
                    // eslint-disable-next-line
                    columnList.forEach((column:any) => { 
                        if (i == column.value) {
                            column.duplicateColumn = false;
                        }
                    }); 
                }

                if (rowDuplicateCount > 1) {
                    // eslint-disable-next-line
                    rowList.forEach((row:any) => { 
                        if (i == row.value) {
                            row.duplicateRow = true;
                        }
                    });

                    isIncorrect = true;
                } else {
                    // eslint-disable-next-line
                    rowList.forEach((row:any) => { 
                        if (i == row.value) {
                            row.duplicateRow = false;
                        }
                    }); 
                }

                if (regionDuplicateCount > 1) {
                    // eslint-disable-next-line
                    regionList.forEach((region:any) => { 
                        if (i == region.value) {
                            region.duplicateRegion = true;
                        }
                    });

                    isIncorrect = true;
                } else {
                    // eslint-disable-next-line
                    regionList.forEach((region:any) => { 
                        if (i == region.value) {
                            region.duplicateRegion = false;
                        }
                    }); 
                }
            }

            return isIncorrect;
        }

        function updateRandomColumn () {
            for (let i = 0; i < 9; i++) {
                if ([... new Set(sudokuList.value[i])].length !== 9) {
                    let nonDuplicateList = new Array();

                    while (nonDuplicateList.length !== 9) {
                        nonDuplicateList.push(Math.floor(Math.random() * 9) + 1);
                        nonDuplicateList = [... new Set(nonDuplicateList)];
                    }

                    sudokuList.value[i] = nonDuplicateList;
                }
            }
        }

        function removeRandomCel () {
            let startColumn = 0;
            let startRow = 0;

            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 3 + difficulty.value; j++) {
                    const removeIndex = Math.floor(Math.random() * 9);

                    if (sudokuList.value[Math.floor(removeIndex / 3) + (startColumn * 3)][(removeIndex % 3) + startRow * 3]) {
                        sudokuList.value[Math.floor(removeIndex / 3) + (startColumn * 3)][(removeIndex % 3) + startRow * 3] = 0;
                    } else {
                        j--;
                    }
                }

                if ((startColumn + 1) % 3 === 0) {
                    startColumn = 0;
                    startRow++;
                } else {
                    startColumn++;
                }
            }

            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    sudokuList.value[i][j] = {
                        value: sudokuList.value[i][j],
                        fixed: sudokuList.value[i][j] ? true : false,
                        select: false,
                        duplicateColumn: false,
                        duplicateRow: false,
                        duplicateRegion: false,
                    };
                }
            }

            createGameFinish.value = true;
            currentStatus.value = "Restart";

            interval = setInterval(() => {
                playTime.value++;
            }, 1000);
        }

        function onClickCel (celIndex:number) {
            if (currentCelIndex.value !== -1) {
                sudokuList.value[Math.floor(currentCelIndex.value / 9)][currentCelIndex.value % 9].select = false;
            }

            if (celIndex !== currentCelIndex.value) {
                sudokuList.value[Math.floor(celIndex / 9)][celIndex % 9].select = true;
                currentCelIndex.value = celIndex;
            } else {
                currentCelIndex.value = -1;
            }
        }

        function onKeydownCel ($event:KeyboardEvent) {
            if (focusingInput.value) {
                return;
            }

            if (currentCelIndex.value === -1 || !/^[1-9]+$/.test($event.key)) {
                if (currentCelIndex.value !== -1 && $event.key === "Backspace") {
                    sudokuList.value[Math.floor(currentCelIndex.value / 9)][currentCelIndex.value % 9].value = 0;

                    validateCel(currentCelIndex.value) && incorrectCel.value++;
                }

                return;
            }

            setTimeout(() => {
                sudokuList.value[Math.floor(currentCelIndex.value / 9)][currentCelIndex.value % 9].value = $event.key;
                changeCel.value++;

                validateCel(currentCelIndex.value) && incorrectCel.value++;

                let isEmpty = false;

                for (let i = 0; i < 9; i ++) {
                    // eslint-disable-next-line
                    sudokuList.value[i].forEach((column:any) => {
                        if (column.value == 0) {
                            isEmpty = true;
                        }
                    });
                }

                if (!isEmpty) {
                    validateGameClear();
                }
            }, 100);
        }

        function validateGameClear () {
            if (validateColumn() && validateRow() && validateRegion()) {
                isGameClear.value = true;
                currentCelIndex.value = -1;

                clearInterval(interval);
                Object(resultPopup.value).openPopup();
                recordGameScore();
            }
        }

        async function recordGameScore () {
            let total = 10000;

            total -= playTime.value;
            total -= changeCel.value * 10;
            total -= incorrectCel.value * 100;
            total += difficulty.value * 500;

            const addScore = () => {
                return new Promise<void>((resolve) => {
                    setTimeout(() => {
                        gameScore.value += Math.floor(Math.random() * 10) + 1;

                        resolve();
                    }, 1);
                });
            }

            while (gameScore.value < total) {
                await addScore();
            }

            if (gameScore.value < total) {
                gameScore.value = total;
            }
        }

        function addMemo () {
            if (!memoList.value[currentCelIndex.value]) {
                memoList.value[currentCelIndex.value] = new Array();
            }

            if (memoList.value[currentCelIndex.value].length < 6) {
                memoList.value[currentCelIndex.value].push(memoValue.value);
                memoValue.value = "";
            }
        }

        function removeMemo (removeIndex:number) {
            memoList.value[currentCelIndex.value].splice(removeIndex, 1);
        }

        window.addEventListener("keydown", onKeydownCel);

        return {
            sudokuList,
            tempSudokuList,
            createGameFinish,
            currentStatus,
            isGameClear,
            difficulty,
            playTime,
            changeCel,
            incorrectCel,
            resultPopup,
            gameScore,
            memoList,
            memoValue,
            currentCelIndex,
            focusingInput,
            createBoard,
            onClickCel,
            onKeydownCel,
            addMemo,
            removeMemo,
        };
    },
});
</script>

<style scoped src="./Sudoku.css">
</style>