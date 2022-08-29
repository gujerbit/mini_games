<template>
    <p>{{ computedPlayTime.hours }}:{{ computedPlayTime.minutes }}:{{ computedPlayTime.seconds }}</p>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
    name: "CustomTimer",
    props: {
        time: {
            type: Number,
            default: 0,
        },
    },
    setup (props) {
        const computedPlayTime = ref({
            hours: computed(() => {
                const time = Math.floor(props.time / 3600);

                if (time > 9) {
                    return time;
                } else {
                    return `0${time}`;
                }
            }),
            minutes: computed(() => {
                const time = Math.floor(props.time / 60 % 60);

                if (time > 9) {
                    return time;
                } else {
                    return `0${time}`;
                }
            }),
            seconds: computed(() => {
                const time = props.time % 60;

                if (time > 9) {
                    return time;
                } else {
                    return `0${time}`;
                }
            }),
        });

        return {
            computedPlayTime,
        };
    },
});
</script>

<style scoped src="./CustomTimer.css">
</style>