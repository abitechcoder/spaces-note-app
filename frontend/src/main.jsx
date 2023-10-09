import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./app.css";
import TextContextProvider from './util/TextContext.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { FolderCategoryProvider } from "./context/folderCategoryContex.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="942858751744-sup7tlece0d2i81mvkmn9k05qvv6ct06.apps.googleusercontent.com">
    <Provider store={store}>
      <FolderCategoryProvider>
        <TextContextProvider>
        <App />
        </TextContextProvider>
      </FolderCategoryProvider>
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
