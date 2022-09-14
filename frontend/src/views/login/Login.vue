<template>
    <div class="w-full h-full flex justify-center items-center">
        <div class="w-100 h-40 flex flex-col items-center border-2 border-black rounded">
            <custom-input v-model="userName" @keydown.enter="login" class="w-70 h-8 my-8" :placeholder="'what is your name?'"></custom-input>
            <custom-button @click="login" class="w-20 h-8 bg-yellow-200">GO</custom-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Login",
    setup () {
        const router = useRouter();
        const userName = ref("");

        function login () {
            if (validateUser()) {
                window.sessionStorage.setItem("userName", userName.value);
                router.push("/");
            }
        }

        function validateUser () {
            if (userName.value.length === 0) {
                alert("your name is not empty!!");

                return false;
            } else if (userName.value.length > 20) {
                alert("your name is long!!");

                return false;
            }

            return true;
        }

        return {
            userName,
            login,
        }
    }
});
</script>

<style scoped src="./Login.css">
</style>