import { createRoot } from "react-dom/client";

// styles
import "./styles/reset.css";
import "./styles/index.css";

import App from "./App.jsx";
import { ToastProvider } from "./contexts/ToastContexts.jsx";
import { Provider } from "react-redux";
import { Store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>
);
