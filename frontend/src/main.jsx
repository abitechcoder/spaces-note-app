import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./app.css";
import { FolderCategoryProvider } from "./context/folderCategoryContex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<FolderCategoryProvider>
			<App />
		</FolderCategoryProvider>
	</React.StrictMode>
);
