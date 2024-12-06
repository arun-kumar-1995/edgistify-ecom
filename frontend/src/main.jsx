import { createRoot } from "react-dom/client";

// styles
import "./styles/reset.css";
import "./styles/index.css";

import App from "./App.jsx";
import { ToastProvider } from "./contexts/ToastContexts";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
