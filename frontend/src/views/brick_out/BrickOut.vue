<template>
    <div class="w-full mt-2 pb-10 flex justify-center">
        <div class="w-50 mr-2 flex flex-col items-end">
            <div class="w-full h-10 flex items-center border-2 border-black rounded whitespace-nowrap overflow-hidden">
                <p class="ml-2 text-sm"> {{ `SCORE: ${score}` }}</p>
            </div>
        </div>

        <canvas id="brick-out-canvas" width="551" height="551" class="bg-gray-100"></canvas>

        <div v-if="isGameOver || isPause" class="w-137.5 h-137.5 flex flex-col justify-center items-center absolute">
            <div class="w-full h-full bg-white opacity-50 absolute"></div>
            <div @click="mountedFunc.gameStart" v-if="isGameOver" class="w-full h-full flex justify-center items-center z-10 cursor-pointer">
                <img class="w-50 h-50" src="@assets/images/brick_out/play_button.png" alt="">
            </div>
            <img class="w-50 h-50 z-10" v-if="!isGameOver && isPause" src="@assets/images/brick_out/pause_button.png" alt="">
        </div>

        <div v-if="isPlayerUpgrade" class="w-137.5 h-137.5 flex flex-col justify-center items-center absolute">
            <div class="w-full h-full bg-white opacity-50 absolute"></div>
            
            <div class="w-full h-full flex justify-center items-center z-10 relative">
                <p class="absolute top-20 text-3xl">Choose the ability</p>
                <div @click="mountedFunc.upgradePlayer(upgrade.value)" v-for="(upgrade, upgradeIndex) in playerUpgradeList" :key="upgradeIndex" class="w-40 h-40 mx-2 border-2 border-black rounded cursor-pointer hover:opacity-100 opacity-50 bg-white text-center duration-200">
                    <img class="py-3" :src="require(`@assets/images/brick_out/${upgrade.img}.png`)" alt="">
                    <p class="text-sm font-bold">{{ upgrade.name }}</p>
                </div>
            </div>
        </div>

        <div class="w-50 ml-2">
            <div class="w-full h-65 p-2 flex flex-col border-2 border-black rounded text-xs whitespace-nowrap">
                <p class="pb-2 text-center text-xl">Player Info</p>
                <p class="py-1">{{ `speed: ${playerInfo.ballSpeed ?? ""}` }}</p>
                <p class="py-1">{{ `power: ${playerInfo.ballPower ?? ""}` }}</p>
                <p class="py-1">{{ `critical chance: ${playerInfo.ballCriticalChance ?? ""}` }}</p>
                <p class="py-1">{{ `critical power: ${playerInfo.ballCriticalPower ?? ""}` }}</p>
                <p class="py-1">{{ `penetration chance: ${playerInfo.ballPenetrationChance ?? ""}` }}</p>
                <p class="py-1">{{ `multiple attack chance: ${playerInfo.ballMultipleAttackChance ?? ""}` }}</p>
                <p class="py-1">{{ `ball size: ${playerInfo.ballSize ?? ""}` }}</p>
                <p class="py-1">{{ `paddle width: ${playerInfo.paddleWidth ?? ""}` }}</p>
            </div>
        </div>

        <custom-footer :version="'1.1'" :lastUpdate="'2022-09-02'"></custom-footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    name: "BrickOut",
    setup () {
        const mountedFunc:any = ref({});
        const isGameOver = ref(true);
        const score = ref(0);
        const isPlayerUpgrade = ref(false);
        const playerUpgradeList:any = ref([]);
        const playerInfo:any = ref({});
        const isPause = ref(false);

        onMounted(() => {
            const canvas = document.getElementById("brick-out-canvas") as HTMLCanvasElement;
            const context = canvas.getContext("2d") as CanvasRenderingContext2D;

            // ball info
            let ballX = Math.floor(canvas.width / 2);
            let ballY = canvas.height - 30;
            let ballXSpeed = 1;
            let ballYSpeed = -1;
            let ballRadius = 10;
            let ballPower = 1;
            let ballCriticalChance = 0;
            let ballCriticalPower = 2;
            let ballPenetrationChance = 0;
            let ballMultipleAttackChance = 0;

            // paddle info
            let paddleX = Math.floor(canvas.width / 2);
            let paddleY = canvas.height - 10;
            let paddleSpeed = 7;
            let paddleWidth = 70;
            let paddleHeight = 10;
            let leftPressed = false;
            let rightPressed = false;

            // brick info
            const brickList:Array<Array<any>> = [];
            const brickColorList = [
                "FF0000",
                "FF2A00",
                "FF5500",
                "FF8000",
                "FFAA00",
                "FFD500",
                "FFFF00",
                "D4FF00",
                "AAFF00",
                "80FF00",
                "55FF00",
                "2BFF00",
                "00FF00",
                "00FF2A",
                "00FF55",
                "00FF80",
                "00FFAA",
                "00FFD5",
                "00FFFF",
                "00D5FF",
                "00AAFF",
                "0080FF",
                "0055FF",
                "002AFF",
                "0000FF",
                "2B00FF",
                "5500FF",
                "8000FF",
                "AA00FF",
                "D400FF",
                "FF00FF",
                "FF00D4",
                "FF00AA",
                "FF0080",
                "FF0055",
                "FF002B",
            ]

            let brickWidth = 100;
            let brickHeight = 30;
            let brickMaxColumnCount = 5;
            let brickMaxRowCount = 3;
            let brickOffsetTop = 10;
            let brickOffsetLeft = 10;
            let brickPaddingX = 5;
            let brickPaddingY = 5;
            let brickLife = 1;
            let brickLifeTotal = 0;

            // etc
            const abilityList = [
                {
                    name: "Ball Attack Power Up",
                    value: 0,
                    img: "ball_attack_up",
                },
                {
                    name: "Ball Speed Up",
                    value: 1,
                    img: "ball_speed_up",
                },
                {
                    name: "Paddle Width Up",
                    value: 2,
                    img: "paddle_width_up",
                },
                {
                    name: "Ball Speed Down",
                    value: 3,
                    img: "ball_speed_down",
                },
                {
                    name: "Ball Size Up",
                    value: 4,
                    img: "ball_size_up",
                },
                {
                    name: "Ball Critical Chance Up",
                    value: 5,
                    img: "ball_critical_chance_up",
                },
                {
                    name: "Ball Critical Power Up",
                    value: 6,
                    img: "ball_critical_power_up",
                },
                {
                    name: "Ball Penetration Chance Up",
                    value: 7,
                    img: "ball_penetration_chance_up",
                },
                {
                    name: "Ball Multiple Attack Chance Up",
                    value: 8,
                    img: "ball_multiple_attack_chance_up",
                },
            ];

            let animationId = 0;
            
            mountedFunc.value.gameStart = () => {
                updateGameInfo();
                updateBricks();
                renderGame();
            };

            function updateGameInfo () {
                // ball info
                ballX = Math.floor(canvas.width / 2);
                ballY = canvas.height - 30;
                ballXSpeed = 7.5;
                ballYSpeed = -7.5;
                ballRadius = 10;
                ballPower = 1;
                ballCriticalChance = 0;
                ballCriticalPower = 2;
                ballPenetrationChance = 0;
                ballMultipleAttackChance = 0;

                // paddle info
                paddleX = Math.floor(canvas.width / 2);
                paddleY = canvas.height - 10;
                paddleSpeed = 7;
                paddleWidth = 70;
                paddleHeight = 10;
                leftPressed = false;
                rightPressed = false;

                // brick info
                brickWidth = 100;
                brickHeight = 30;
                brickMaxColumnCount = 5;
                brickMaxRowCount = 3;
                brickOffsetTop = 10;
                brickOffsetLeft = 10;
                brickPaddingX = 5;
                brickPaddingY = 5;
                brickLife = 1;
                brickLifeTotal = 0;

                isGameOver.value = false;
                score.value = 0;

                updatePlayerInfo();
            }

            function updatePlayerInfo () {
                playerInfo.value.ballSpeed = Math.abs(ballXSpeed);
                playerInfo.value.ballSize = ballRadius;
                playerInfo.value.ballPower = ballPower;
                playerInfo.value.ballCriticalChance = ballCriticalChance;
                playerInfo.value.ballCriticalPower = ballCriticalPower;
                playerInfo.value.ballPenetrationChance = ballPenetrationChance;
                playerInfo.value.ballMultipleAttackChance = ballMultipleAttackChance;
                playerInfo.value.paddleWidth = paddleWidth;
            }

            function updateBricks () {
                for (let i = 0; i < brickMaxColumnCount; i++) {
                    brickList[i] = [];

                    for (let j = 0; j < brickMaxRowCount; j++) {
                        brickList[i][j] = {
                            brickX: 0,
                            brickY: 0,
                            brickLife: brickLife,
                            isCollision: false,
                        };

                        brickLifeTotal += brickLife;
                    }
                }
            }

            function renderGame () {
                context.clearRect(0, 0, canvas.width, canvas.height);

                renderBricks();
                renderBall();
                renderPaddle();
                collisionDetectionBricks();

                if (!isGameOver.value && !isPlayerUpgrade.value && !isPause.value) {
                    animationId = requestAnimationFrame(renderGame);
                }
            }

            function renderBall () {
                if (ballX + ballXSpeed > canvas.width - ballRadius || ballX + ballXSpeed < ballRadius) {
                    ballXSpeed = -ballXSpeed;
                }

                if (ballY + ballYSpeed < ballRadius) {
                    ballYSpeed = -ballYSpeed;
                } else if (ballY + ballYSpeed > canvas.height - ballRadius) {
                    isGameOver.value = true;

                    cancelAnimationFrame(animationId);
                } else if (ballY + ballYSpeed > canvas.height - ballRadius - paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth && ballYSpeed > 0) {
                    ballYSpeed = -ballYSpeed;
                }

                ballX += ballXSpeed;
                ballY += ballYSpeed;

                context.beginPath();
                context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
                context.fillStyle = "#FF00FF";
                context.fill();
                context.closePath();
            }

            function renderPaddle () {
                if (leftPressed && paddleX > 0) {
                    paddleX -= paddleSpeed;
                } else if (rightPressed && paddleX < canvas.width - paddleWidth) {
                    paddleX += paddleSpeed;
                }

                context.beginPath();
                context.fillStyle = "#000000";
                context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
                context.closePath();
            }

            function renderBricks () {
                brickWidth = Math.floor(canvas.width / brickMaxColumnCount) - 10;
                brickPaddingX = Math.floor(Math.floor((canvas.width - brickWidth * brickMaxColumnCount) / brickMaxColumnCount) / 2);
                brickOffsetLeft = Math.floor((canvas.width - ((brickWidth + brickPaddingX) * brickMaxColumnCount)) / 2) + Math.floor(brickPaddingX / 2);

                for (let i = 0; i < brickMaxColumnCount; i++) {
                    for (let j = 0; j < brickMaxRowCount; j++) {
                        const brick = brickList[i][j];

                        if (brick.brickLife > 0) {
                            const brickX = (brickWidth + brickPaddingX) * i + brickOffsetLeft;
                            const brickY = (brickHeight + brickPaddingY) * j + brickOffsetTop;

                            brick.brickX = brickX;
                            brick.brickY = brickY;

                            context.beginPath();
                            context.fillStyle = `#${brickColorList[brick.brickLife % 36]}`;
                            context.fillRect(brickX, brickY, brickWidth, brickHeight);
                            context.closePath();
                            context.font = "12px Arial";
                            context.fillStyle = "#000000";
                            context.fillText(brick.brickLife, brickX + Math.floor(brickWidth / 2) - 3, brickY + Math.floor(brickHeight / 2) + 2);
                        }
                    }
                }
            }

            function upgradeBricks () {
                brickLife++;
            }

            mountedFunc.value.upgradePlayer = (upgradeIndex:number) => {
                switch (upgradeIndex) {
                    case 0:
                        ballPower += Math.floor(Math.random() * 3) + 1;

                        break;
                    case 1:
                        if (Math.abs(ballXSpeed) < 9.9) {
                            ballXSpeed += (Math.floor(Math.random() * 3) + 1) * 0.1 * (ballXSpeed > 0 ? 1 : -1);
                            ballYSpeed += (Math.floor(Math.random() * 3) + 1) * 0.1 * (ballYSpeed > 0 ? 1 : -1);
                        }

                        if (Math.abs(ballXSpeed) > 9.9) {
                            ballXSpeed = ballXSpeed > 0 ? 9.9 : -9.9;
                            ballYSpeed = ballYSpeed > 0 ? 9.9 : -9.9;
                        }
                        
                        break;
                    case 2:
                        if (paddleWidth < 250) {
                            paddleWidth += Math.floor(Math.random() * 10) + 1;
                        }

                        if (paddleWidth > 250) {
                            paddleWidth = 250;
                        }
                        
                        break;
                    case 3:
                        if (Math.abs(ballXSpeed) > 1.5) {
                            ballXSpeed += (Math.floor(Math.random() * 3) + 1) * 0.1 * (ballXSpeed < 0 ? 1 : -1);
                            ballYSpeed += (Math.floor(Math.random() * 3) + 1) * 0.1 * (ballYSpeed < 0 ? 1 : -1);
                        }

                        if (Math.abs(ballXSpeed) < 1.5) {
                            ballXSpeed = ballXSpeed > 0 ? 1.5 : -1.5;
                            ballYSpeed = ballYSpeed > 0 ? 1.5 : -1.5;
                        }

                        break;
                    case 4:
                        if (ballRadius < 20) {
                            ballRadius += (Math.floor(Math.random() * 5) + 1) * 0.1;
                        }

                        if (ballRadius > 20) {
                            ballRadius = 20;
                        }

                        break;
                    case 5:
                        if (ballCriticalChance < 0.5) {
                            ballCriticalChance += (Math.floor(Math.random() * 5) + 1) * 0.01;
                        }

                        if (ballCriticalChance > 0.5) {
                            ballCriticalChance = 1;
                        }

                        break;
                    case 6:
                        ballCriticalPower += (Math.floor(Math.random() * 3) + 1) * 0.1;

                        break;
                    case 7:
                        if (ballPenetrationChance < 0.5) {
                            ballPenetrationChance += (Math.floor(Math.random() * 5) + 1) * 0.01;
                        }

                        if (ballPenetrationChance > 0.5) {
                            ballPenetrationChance = 0.5;
                        }

                        break;
                    case 8:
                        if (ballMultipleAttackChance < 0.5) {
                            ballMultipleAttackChance += (Math.floor(Math.random() * 5) + 1) * 0.01;
                        }

                        if (ballMultipleAttackChance > 0.5) {
                            ballMultipleAttackChance = 0.5;
                        }

                        break;
                }

                isPlayerUpgrade.value = false;
                ballX = Math.floor(canvas.width / 2);
                ballY = canvas.height - 30;

                updatePlayerInfo();
                renderGame();
            };
            
            function collisionDetectionBricks () {
                for (let i = 0; i < brickMaxColumnCount; i++) {
                    for (let j = 0; j < brickMaxRowCount; j++) {
                        const brick = brickList[i][j];

                        if (ballX < brick.brickX + brickWidth + ballRadius && ballX > brick.brickX + ballRadius && ballY < brick.brickY + brickHeight + ballRadius && ballY > brick.brickY + ballRadius && brick.brickLife > 0) {
                            if (brick.isCollision) {
                                continue;
                            }

                            // const leftTopVector = brick.brickX
                            // const beforeBallLocation = ballY -= Math.abs(ballYSpeed);

                            brick.isCollision = true;
                            ballYSpeed = -ballYSpeed;
                            brick.brickLife -= ballPower;
                            score.value++;

                            if (score.value === brickLifeTotal) {
                                for (let i = 0; i < 3; i++) {
                                    const randomIndex = Math.floor(Math.random() * abilityList.length);

                                    playerUpgradeList.value[i] = abilityList[randomIndex];
                                }

                                upgradeBricks();
                                updateBricks();

                                isPlayerUpgrade.value = true;
                            }
                        } else {
                            brick.isCollision = false;
                        }
                    }
                }
            }

            function onKeyDown (e:KeyboardEvent) {
                if (e.key === "ArrowLeft") {
                    leftPressed = true;
                } else if (e.key === "ArrowRight") {
                    rightPressed = true;
                } else if (!isGameOver.value && e.code === "Space") {
                    isPause.value = !isPause.value;

                    if (!isPause.value) {
                        renderGame();
                    }
                }
            }

            function onKeyUp (e:KeyboardEvent) {
                if (e.key === "ArrowLeft") {
                    leftPressed = false;
                } else if (e.key === "ArrowRight") {
                    rightPressed = false;
                }
            }

            function onMouseMove (e:MouseEvent) {
                const mouseX = e.clientX - canvas.offsetLeft;

                paddleX = mouseX - Math.floor(paddleWidth / 2);

                if (paddleX < 0) {
                    paddleX = 0;
                } else if (paddleX > canvas.width - paddleWidth) {
                    paddleX = canvas.width - paddleWidth;
                }
            }

            document.addEventListener("keydown", onKeyDown);
            document.addEventListener("keyup", onKeyUp);
            document.addEventListener("mousemove", onMouseMove);
        });

        return {
            mountedFunc,
            isGameOver,
            isPause,
            score,
            isPlayerUpgrade,
            playerUpgradeList,
            playerInfo,
        }
    },
});
</script>

<style scoped src="./BrickOut.css">
</style>