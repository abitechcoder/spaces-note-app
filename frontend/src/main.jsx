<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TextContextProvider from './util/TextContext.jsx'
import './index.css'
=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./app.css";
import TextContextProvider from './util/TextContext.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { FolderCategoryProvider } from "./context/folderCategoryContex.jsx";
>>>>>>> 1a62ccf9566d93fddc4574e90ae02c8781d8c378

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<<<<<<< HEAD
    <TextContextProvider>
    <App />
    </TextContextProvider>
  </React.StrictMode>,
)
=======
    <Provider store={store}>
      <FolderCategoryProvider>
        <TextContextProvider>
        <App />
        </TextContextProvider>
      </FolderCategoryProvider>
    </Provider>
  </React.StrictMode>
);
>>>>>>> 1a62ccf9566d93fddc4574e90ae02c8781d8c378
