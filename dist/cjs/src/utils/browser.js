"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMobile = exports.isTablet = exports.isDesktop = void 0;
const isDesktop = () => window.innerWidth > 992;
exports.isDesktop = isDesktop;
const isTablet = () => window.innerWidth > 600 && window.innerWidth < 768;
exports.isTablet = isTablet;
const isMobile = () => window.innerWidth < 600;
exports.isMobile = isMobile;
//# sourceMappingURL=browser.js.map