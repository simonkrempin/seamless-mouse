import { coordinate, resolution, orientation } from "./screen";

export interface MonitorInformation {
    id: string;
    name: string;
    dpi: number;
    resolution: resolution;
    position?: coordinate;
    rotation?: orientation;
}

export class Monitor {
    public id: string;
    public name: string;
    public dpi: number;
    public resolution: resolution;
    public position: {
        x: number;
        y: number;
    };
    public rotation?: orientation;
    private _divSize?: { width: number; height: number };

    constructor(monitor: MonitorInformation) {
        this.id = monitor.id;
        this.name = monitor.name;
        this.dpi = monitor.dpi;
        this.resolution = monitor.resolution;
        this.position = monitor.position ?? { x: 0, y: 0 };
        this.rotation = monitor.rotation;
        this._divSize = this.calcDivSize();
    }

    private calcDivSize(): { width: number; height: number } {
        const divWidth = this.resolution.width / 10;
        const divHeight = this.resolution.height / 10;

        if (this.rotation === 90 || this.rotation === 270) return { width: divHeight, height: divWidth };
        return { width: divWidth, height: divHeight };
    }

    public get divSize(): { width: number; height: number } {
        return this._divSize;
    }

    /**
     * Checks if the monitors overlap by checking if the monitors are not overlapping
     * which is a simpler approach than checking if they are overlapping an return the opposite.
     * @param otherMonitor
     * @returns
     */
    public overlaps(otherMonitor: Monitor) {
        const thisAnchorPoints = this.getCornerPoints();
        const otherAnchorPoints = otherMonitor.getCornerPoints();

        /**
         *  [this] [other]
         */
        if (thisAnchorPoints.right < otherAnchorPoints.left) {
            return false;
        }

        /**
         *  [other] [this]
         */
        if (thisAnchorPoints.left > otherAnchorPoints.right) {
            return false;
        }

        /**
         * [this]
         * [other]
         */
        if (thisAnchorPoints.bottom < otherAnchorPoints.top) {
            return false;
        }

        /**
         * [other]
         * [this]
         */
        if (thisAnchorPoints.top > otherAnchorPoints.bottom) {
            return false;
        }

        return true;
    }

    public getCornerPoints() {
        return {
            top: this.position.y,
            bottom: this.position.y + this.divSize.height,
            left: this.position.x,
            right: this.position.x + this.divSize.width,
        };
    }

    public keepInBounds(unboundPos: coordinate) {
        const boundPos = { ...unboundPos };

        if (unboundPos.x < 0) {
            boundPos.x = 0;
        } else if (unboundPos.x + this.divSize.width > window.innerWidth) {
            boundPos.x = window.innerWidth - this.divSize.width;
        }

        if (unboundPos.y < 0) {
            boundPos.y = 0;
        } else if (unboundPos.y + this.divSize.height > window.innerHeight) {
            boundPos.y = window.innerHeight - this.divSize.height;
        }

        return boundPos;
    }

    static correctMonitorOverlap(monitors: Monitor[]) {}
}
