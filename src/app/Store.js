import { configureStore } from "@reduxjs/toolkit";
import TrackSlice from "./TrackSlice";

const Store = configureStore({
  reducer: {
    track: TrackSlice,
  },
});
export default Store;
