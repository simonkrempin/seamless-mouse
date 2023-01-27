import { createRoot } from "react-dom/client";
import * as React from "react";
// import styles from "./styles.css";

const render = () => {
    const root = createRoot(document.getElementById("root"));
    root.render(<HelloMessage />);
};

const HelloMessage = (): React.ReactElement => {
    return (
        <>
            <h1 className="text-3xl font-bold">💖 Hello World!</h1>
            <p className="text-sm">Welcome to your Electron application.</p>
        </>
    );
};

render();
