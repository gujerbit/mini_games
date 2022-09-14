<template>
    <div class="w-full flex flex-col">
        <custom-header></custom-header>
        
        <main class="w-full h-full">
            <!-- <div class="w-100 h-100 border border-black overflow-y-auto">
                <p v-for="(message, messageIndex) in messages" :key="messageIndex">{{ message }}</p>
            </div>

            <custom-input v-model="message" @keydown.enter="sendMessage" class="w-100 h-8"></custom-input> -->

            <router-view></router-view>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { io } from "socket.io-client";

export default defineComponent({
    name: "Main",
    setup () {
        // const messages:any = ref([]);
        // const message = ref("");
        const socket = io("http://localhost:3001");

        // socket.on("connect", () => {
        // });

        // socket.on("message", (message:string) => {
        //     messages.value.push(message);
        // });

        // function sendMessage () {
        //     socket.emit("send", {
        //         userName: window.sessionStorage.getItem("userName"),
        //         message: message.value,
        //     });

        //     message.value = "";
        // }

        return {
            // messages,
            // message,
            // sendMessage,
        }
    },
});
</script>

<style scoped src="./Main.css">
</style>