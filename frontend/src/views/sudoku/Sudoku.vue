<template>
    <div class="w-full flex flex-col items-center">
        <div id="sudoku-container" class="w-150 h-150 mx-auto mt-2 border-2 border-black rounded grid grid-cols-9 justify-items-center items-center">
            <!-- eslint-disable-next-line -->
            <template v-for="(column, columnIndex) in sudokuList" :key="columnIndex + 'sudoku'" v-if="createGameFinish">
                <div @click="onClickCell(rowIndex + (columnIndex * 9))" v-for="(row, rowIndex) in column" :key="rowIndex" :class="[row.fixed ? 'text-yellow-300 pointer-events-none' : 'cursor-pointer', row.select ? 'bg-yellow-300' : '']" class="w-15 h-15 border border-black rounded flex justify-center items-center">
                    <p :class="row.duplicate ? 'text-red-400' : ''" class="text-xl">{{ row.value ? row.value : "" }}</p>
                </div>
            </template>

            <!-- eslint-disable-next-line -->
            <template v-for="(column, columnIndex) in tempSudokuList" :key="columnIndex + 'temp'" v-else>
                <div v-for="(row, rowIndex) in column" :key="rowIndex" class="w-15 h-15 border border-black rounded flex justify-center items-center">
                    <p class="text-xl">{{ row ? row : "" }}</p>
                </div>
            </template>
        </div>

        <custom-button @click="createBoard" class="w-20 h-10 mt-2 bg-yellow-300" :disabled="!createGameFinish">{{ currentStatus }}</custom-button>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
    setup () {
        const sudokuList = ref(new Array());
        const tempSudokuList = ref(new Array());
        const createGameFinish = ref(true);
        const currentCellIndex = ref(-1);
        const currentStatus = ref("Start");

        function createBoard () {
            createGameFinish.value = false;
            currentCellIndex.value = 0;
            currentStatus.value = "Creating...";

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

                        if (validateColumn() && validateRow() && validateRegion()) {
                            checkBoard = true;
                        } else {
                            tryCount++;
                        }

                        resolve();
                    }, 1);
                });
            };

            while (!checkBoard) {
                await validating();
            }

            removeRandomCell();
        }

        function validateColumn () {
            let checkColumn = true;
            
            for (let i = 0; i < 9; i++) {
                if ([... new Set(sudokuList.value[i])].length !== 9) {
                    checkColumn = false;

                    updateColumn(i);
                }
            }
            
            return checkColumn;
        }

        function updateColumn (i:number) {
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

        function validateRow () {
            let checkRow = true;

            for (let i = 0; i < 9; i++) {
                const rowList = new Array();

                for (let j = 0; j < 9; j++) {
                    rowList.push(sudokuList.value[j][i]);
                }

                if ([... new Set(rowList)].length !== 9) {
                    checkRow = false;

                    updateRow(rowList, i);
                }
            }

            return checkRow;
        }

        function updateRow (rowList:Array<number>, i:number) {
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

                if ([... new Set(regionList)].length !== 9) {
                    checkRegion = false;

                    updateRegion(regionList, startColumn, startRow);
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

        function updateRegion (regionList:Array<number>, startColumn:number, startRow:number) {
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
        }

        // function validateCell (value:number) {
            
        // }

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

        function removeRandomCell () {
            let startColumn = 0;
            let startRow = 0;

            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 3; j++) {
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
                        duplicate: false,
                    };
                }
            }

            createGameFinish.value = true;
            currentStatus.value = "Restart";
        }

        function onClickCell (cellIndex:number) {
            if (currentCellIndex.value !== -1) {
                sudokuList.value[Math.floor(currentCellIndex.value / 9)][currentCellIndex.value % 9].select = false;
            }

            if (cellIndex !== currentCellIndex.value) {
                sudokuList.value[Math.floor(cellIndex / 9)][cellIndex % 9].select = true;
                currentCellIndex.value = cellIndex;
            } else {
                currentCellIndex.value = -1;
            }
        }

        function onKeydownCell ($event:KeyboardEvent) {
            if (currentCellIndex.value === -1 || !/^[1-9]+$/.test($event.key)) {
                return;
            }

            sudokuList.value[Math.floor(currentCellIndex.value / 9)][currentCellIndex.value % 9].value = $event.key;
        }

        window.addEventListener("keydown", onKeydownCell);

        return {
            sudokuList,
            tempSudokuList,
            createGameFinish,
            currentStatus,
            createBoard,
            onClickCell,
            onKeydownCell,
        };
    },
});
</script>

<style scoped src="./Sudoku.css">
</style>