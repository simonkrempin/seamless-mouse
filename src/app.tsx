import { createRoot } from "react-dom/client";
import React, { useRef } from "react";
import { RenderMonitors } from "./components/monitorDisplay";

const render = () => {
    const root = createRoot(document.getElementById("root"));
    root.render(<App />);
};

const App = (): React.ReactElement => {
    const monitorInformation: MonitorInformation[] = [
        {
            id: "1",
            name: "Monitor 1",
            dpi: 96,
            resolution: {
                width: 1920,
                height: 1080,
            },
        },
        {
            id: "2",
            name: "Monitor 2",
            dpi: 96,
            resolution: {
                width: 1920,
                height: 1080,
            },
            rotation: 90,
        },
    ];

    return (
        <div className="w-full h-full">
            <RenderMonitors monitorInformation={monitorInformation} />
        </div>
    );
};

render();
