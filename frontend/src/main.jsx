import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./app.css";
import TextContextProvider from "./util/TextContext.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { FolderCategoryProvider } from "./context/folderCategoryContex.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DashboardContextProvider } from "./context/DashboardContextProvider.jsx";
import { MobileNavContextProvider } from "./context/MobileNavContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="942858751744-sup7tlece0d2i81mvkmn9k05qvv6ct06.apps.googleusercontent.com">
      <Provider store={store}>
        <FolderCategoryProvider>
          <DashboardContextProvider>
            <MobileNavContextProvider>
              <App />
            </MobileNavContextProvider>
          </DashboardContextProvider>
        </FolderCategoryProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
