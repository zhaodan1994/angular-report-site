declare namespace dv {
    enum RenderMethod {
        SVG = 0,
        Canvas = 1
    }

    class Control {
        static getControl(element: any): Control;
        dispose(): void;
    }

    class FlexDV extends Control {
        renderMethod: RenderMethod;
        constructor(element: any);
        load(option: any): void;
    }
}