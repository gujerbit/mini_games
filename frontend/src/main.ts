import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "@assets/styles/app.css";

// components
import CustomHeader from "@ui/custom_header/CustomHeader.vue";
import CustomFooter from "@ui/custom_footer/CustomFooter.vue";
import CustomInput from "@ui/custom_input/CustomInput.vue";
import CustomButton from "@ui/custom_button/CustomButton.vue";
import CustomPopup from "@ui/custom_popup/CustomPopup.vue";
import CustomTimer from "@ui/custom_timer/CustomTimer.vue";

const app = createApp(App);
const componentList = [
    CustomHeader,
    CustomFooter,
    CustomInput,
    CustomButton,
    CustomPopup,
    CustomTimer,
];

componentList.forEach((component) => {
    app.component(component.name, component);
});

app.use(store).use(router).mount("#app");
