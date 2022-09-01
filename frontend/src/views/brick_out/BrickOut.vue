<template>
    <div class="w-full mt-2 pb-10 flex justify-center">
        <canvas id="brick-out-canvas" width="550" height="550" class="bg-gray-100"></canvas>
        <custom-footer :version="'beta'" :lastUpdate="'2022-09-01'"></custom-footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    name: "BrickOut",
    setup () {
        const mountedFunc:any = ref({});

        onMounted(() => {
            const canvas = document.getElementById("brick-out-canvas") as HTMLCanvasElement;
            const context = canvas.getContext("2d") as CanvasRenderingContext2D;

            // ball info
            let ballX = Math.floor(canvas.width / 2);
            let ballY = canvas.height - 30;
            let ballXSpeed = 1;
            let ballYSpeed = -1;
            let ballRadius = 10;

            // paddle info
            let paddleX = Math.floor(canvas.width / 2);
            let paddleY = canvas.height - 10;
            let paddleSpeed = 7;
            let paddleWidth = 70;
            let paddleHeight = 10;
            let leftPressed = false;
            let rightPressed = false;
            
            mountedFunc.value.gameStart = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);

                renderBall();
                renderPaddle();

                requestAnimationFrame(mountedFunc.value.gameStart);
            };

            function renderBall () {
                if (ballX + ballXSpeed > canvas.width - ballRadius || ballX + ballXSpeed < ballRadius) {
                    ballXSpeed = -ballXSpeed;
                }

                if (ballY + ballYSpeed < ballRadius) {
                    ballYSpeed = -ballYSpeed;
                } else if (ballY + ballYSpeed > canvas.height - ballRadius) {
                    //
                } else if (ballY + ballYSpeed > canvas.height - ballRadius - paddleHeight && ballX > paddleX - Math.floor(paddleWidth / 2) && ballX < paddleX + Math.floor(paddleWidth / 2)) {
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
                context.fillRect(paddleX - Math.floor(paddleWidth / 2), paddleY, paddleWidth, paddleHeight);
                context.closePath();
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

                if (mouseX > 0 && mouseX < canvas.width) {
                    paddleX = mouseX - Math.floor(paddleWidth / 2);
                }
            }

            document.addEventListener("keydown", onKeyDown);
            document.addEventListener("keyup", onKeyUp);
            document.addEventListener("mousemove", onMouseMove);

            mountedFunc.value.gameStart();
        });

        return {
            mountedFunc,
        }
    },
});
</script>

<style scoped src="./BrickOut.css">
</style>