import React, { useEffect, useRef } from "react";
import { MonitorInformation, Monitor } from "../types/monitor";
import { coordinate } from "../types/screen";

const monitorInformation: MonitorInformation[] = [];
let mouseOffset: coordinate = { x: 0, y: 0 };

export const RenderMonitors = (props: { monitorInformation: MonitorInformation[] }) => {
    monitorInformation.push(...props.monitorInformation);
    const monitors = props.monitorInformation.map((info: MonitorInformation) => (
        <RenderMonitor key={info.id} monitor={new Monitor(info)} />
    ));

    return <>{monitors}</>;
};

export const RenderMonitor = (props: { monitor: Monitor }) => {
    const monitor = props.monitor;

    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    const dragging = useRef(false);

    useEffect(() => {
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointermove", onPointerMove);

        return () => {
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointermove", onPointerMove);
        };
    });

    const onPointerUp = () => {
        dragging.current = false;
        monitor.position.x = x;
        monitor.position.y = y;
        correctMonitorOverlap();
        setX(monitor.position.x);
        setY(monitor.position.y);
    };

    const onPointerDown = (event: any) => {
        mouseOffset.x = event.clientX - monitor.position.x;
        mouseOffset.y = event.clientY - monitor.position.y;
        dragging.current = true;
    };

    const updateMonitorPos = (newPos: coordinate) => {
        monitor.position = newPos;
        setX(newPos.x);
        setY(newPos.y);
    };

    const onPointerMove = (event: any) => {
        if (!dragging.current) return;

        const offsetPos = { x: event.clientX - mouseOffset.x, y: event.clientY - mouseOffset.y };
        const boundPos = monitor.keepInBounds(offsetPos);

        updateMonitorPos(boundPos);
    };

    return (
        <div
            className={`absolute bg-red-50 rounded-md`}
            style={{ left: x, top: y, width: monitor.divSize.width, height: monitor.divSize.height }}
            onPointerDown={onPointerDown}
        >
            <h1 className="text-2xl font-bold">{monitor.name}</h1>
            <p className="text-sm">{monitor.dpi} DPI</p>
            <p className="text-sm">
                {monitor.resolution.width} x {monitor.resolution.height}
            </p>
        </div>
    );
};

const calcMouseOffset = (mousePos: coordinate) => {
    return ;
}

const correctMonitorOverlap = () => {};

const centerMonitors = () => {
    // get all monitors
    // get the total width of all monitors
    // get the total height of all monitors
    // get the center of the screen
    // get the center of the monitors
    // calculate the offset
    // apply the offset to all monitors
};
