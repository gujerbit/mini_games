<template>
    <div class="w-full flex flex-col items-center">
        <div id="sudoku-container" class="w-150 h-150 mx-auto mt-2 border-2 border-black rounded grid grid-cols-9 justify-items-center items-center">
            <template v-for="(column, columnIndex) in sudokuList" :key="columnIndex">
                <div v-for="(row, rowIndex) in column" :key="rowIndex" class="w-15 h-15 border border-black rounded flex justify-center items-center">
                    <p class="text-xl">{{ row }}</p>
                </div>
            </template>
        </div>

        <custom-button @click="createBoard" class="w-20 h-10 mt-2 bg-yellow-300" :disabled="false">Start</custom-button>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
    setup () {
        const sudokuList = ref(new Array());

        function createBoard () {
            for (let i = 0; i < 9; i++) {
                sudokuList.value[i] = new Array();

                for (let j = 0; j < 9; j++) {
                    sudokuList.value[i][j] = Math.floor(Math.random() * 9) + 1;
                }
            }

            validateBoard();
        }

        async function validateBoard () {
            let checkBoard = false;
            let tryCount = 1;

            const validating = () => {
                return new Promise<void>((resolve, reject) => {
                    setTimeout(() => {
                        if (tryCount % 5 === 0) {
                            updateColumn();
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
        }

        function validateColumn () {
            let checkColumn = true;
            
            for (let i = 0; i < 9; i++) {
                if ([... new Set(sudokuList.value[i])].length !== 9) {
                    checkColumn = false;

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
            
            return checkColumn;
        }

        function updateColumn () {
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

        function validateRow () {
            let checkRow = true;

            for (let i = 0; i < 9; i++) {
                const rowList = new Array();

                for (let j = 0; j < 9; j++) {
                    rowList.push(sudokuList.value[j][i]);
                }

                if ([... new Set(rowList)].length !== 9) {
                    checkRow = false;

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

            return checkRow;
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

                if ((startColumn + 1) % 3 === 0) {
                    startColumn = 0;
                    startRow++;
                } else {
                    startColumn++;
                }
            }

            return checkRegion;
        }

        return {
            sudokuList,
            createBoard,
        };
    },
});
</script>

<style scoped src="./Sudoku.css">
</style>