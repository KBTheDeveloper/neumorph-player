import React from "react";
export declare const range: (n: number) => Array<number>;
export declare function formatTime(secs: number): string;
export declare function setElementPosition(parent: HTMLElement | Element, child: HTMLElement, opts: any): void;
export declare const showMoreOnScroll: (bottomLine: number, callback: (...args: any[]) => void) => void;
export declare function getFormattedDate(type?: string): any;
export declare function formatBytes(bytes: any, decimals?: number): string;
export declare function debounce(func: any, timeout?: number): (...args: any) => void;
export declare const lazy: (componentImportFn: any) => React.LazyExoticComponent<React.ComponentType<any>>;
