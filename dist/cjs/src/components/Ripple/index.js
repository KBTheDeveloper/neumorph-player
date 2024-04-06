"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ripple extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ["x", "y", "width", "height", "left", "right"];
    }
    attributeChangeCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this._updateRendering();
    }
    connectedCallback() {
        this._updateRendering();
    }
    _updateRendering() {
        const shadow = this.attachShadow({ mode: "open" });
        const diameter = Math.max(+this.getAttribute("width"), +this.getAttribute("height"));
        const radius = diameter / 2;
        shadow.innerHTML = `
      <style>
      .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.3);
      }
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      </style>
      <span class="ripple"
      style="width: ${diameter}px; height: ${diameter}px; left: ${+this.getAttribute("x") - +this.getAttribute("left") - radius}px; top: ${+this.getAttribute("y") - +this.getAttribute("top") - radius}px"></span>
    `;
    }
}
exports.default = Ripple;
//# sourceMappingURL=index.js.map