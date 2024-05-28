import { configureStore } from "@reduxjs/toolkit";
import posts from "./lessonSlice";
import auth from "./authSlice";
import projects from "./projectSlice";
import devices from "./devicesSlice";
import sensors from "./sensorSlice";

const store = configureStore({
    reducer: { posts , auth , devices , projects , sensors },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export default store;