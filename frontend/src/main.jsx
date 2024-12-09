import { createRoot } from "react-dom/client";

// styles
import "./index.css";

import App from "./App.jsx";
import { ToastProvider } from "./contexts/ToastContexts.jsx";
import { Provider } from "react-redux";
import { Store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </PersistGate>
  </Provider>
);
