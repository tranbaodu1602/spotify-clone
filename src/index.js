import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./utils/StateProvider";
import reducer, { initialState } from "./utils/reducer";
import { Provider } from "react-redux";
import Store from "./app/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Provider>
  </React.StrictMode>
);
