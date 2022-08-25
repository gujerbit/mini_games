<template>
    <div v-if="isShow" style="width: 100vw; height: 100vh;" class="fixed">
        <div @click="closePopup" class="w-full h-full bg-black opacity-30 absolute"></div>
        <div :style="[{ width: `${width * 4}px` }, { height: `${height * 4}px` }]" style="transform: translate(-50%, -50%);" class="border rounded bg-white absolute top-1/2 left-1/2">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
    name: "CustomPopup",
    props: {
        width: {
            type: Number,
            defulat: 500,
        },
        height: {
            type: Number,
            default: 500,
        },
    },
    setup () {
        const isShow = ref(false);

        function openPopup () {
            isShow.value = true;
        }

        function closePopup () {
            isShow.value = false;
        }

        return {
            isShow,
            openPopup,
            closePopup,
        };
    }
});
</script>

<style scoped src="./CustomPopup.css">
</style>