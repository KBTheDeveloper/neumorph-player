declare class Ripple extends HTMLElement {
    constructor();
    static get observedAttributes(): string[];
    attributeChangeCallback(name: any, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    _updateRendering(): void;
}
export default Ripple;
