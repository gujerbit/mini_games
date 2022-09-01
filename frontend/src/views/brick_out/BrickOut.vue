<template>
    <div class="w-full mt-2 pb-10 flex justify-center">
        <div class="w-30 mr-2 flex flex-col items-end">
            <div class="w-full h-10 flex items-center border-2 border-black rounded whitespace-nowrap overflow-hidden">
                <p class="ml-2 text-sm"> {{ `SCORE: ${score}` }}</p>
            </div>
        </div>

        <canvas id="brick-out-canvas" width="550" height="550" class="bg-gray-100"></canvas>
        <div @click="mountedFunc.gameStart" v-if="isGameOver || !isGameStart" class="w-137.5 h-137.5 flex flex-col justify-center items-center absolute">
            <div class="w-full h-full bg-white opacity-50 absolute"></div>
            <p v-if="isGameOver" class="text-3xl z-10">GAME OVER!!!</p>
            <p class="text-3xl z-10">Press to Start</p>
        </div>

        <div class="w-30 ml-2">
        </div>

        <custom-footer :version="'1.0'" :lastUpdate="'2022-09-01'"></custom-footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    name: "BrickOut",
    setup () {
        const mountedFunc:any = ref({});
        const isGameOver = ref(false);
        const isGameStart = ref(false);
        const score = ref(0);
        
        let animationId = 0;

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
            
            mountedFunc.value.gameStart = () => {
                updateGameInfo();
                updateBricks();
                renderGame();
            };

            function updateGameInfo () {
                isGameOver.value = false;
                isGameStart.value = true;
                score.value = 0;

                // ball info
                ballX = Math.floor(canvas.width / 2);
                ballY = canvas.height - 30;
                ballXSpeed = 1;
                ballYSpeed = -1;
                ballRadius = 10;
                ballPower = 1;

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
            }

            function updateBricks () {
                for (let i = 0; i < brickMaxColumnCount; i++) {
                    brickList[i] = [];

                    for (let j = 0; j < brickMaxRowCount; j++) {
                        brickList[i][j] = {
                            brickX: 0,
                            brickY: 0,
                            brickLife: brickLife,
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

                if (!isGameOver.value) {
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
                    isGameStart.value = false;

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
                            context.fillStyle = "#0F94CD";
                            context.fillRect(brickX, brickY, brickWidth, brickHeight);
                            context.closePath();
                        }
                    }
                }
            }
            
            function collisionDetectionBricks () {
                for (let i = 0; i < brickMaxColumnCount; i++) {
                    for (let j = 0; j < brickMaxRowCount; j++) {
                        const brick = brickList[i][j];

                        if (ballX < brick.brickX + brickWidth + ballRadius && ballX > brick.brickX + ballRadius && ballY < brick.brickY + brickHeight + ballRadius && ballY > brick.brickY + ballRadius && brick.brickLife > 0) {
                            brick.brickLife -= ballPower;
                            ballYSpeed = -ballYSpeed;
                            score.value++;

                            if (score.value === brickLifeTotal) {
                                //
                            }
                        }
                    }
                }
            }

            function onKeyDown (e:KeyboardEvent) {
                if (e.key === "ArrowLeft") {
                    leftPressed = true;
                } else if (e.key === "ArrowRight") {
                    rightPressed = true;
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
            isGameStart,
            score,
        }
    },
});
</script>

<style scoped src="./BrickOut.css">
</style>