import React from "react";

export const range = (n: number, step: number = 0): Array<number> => Array.from({ length: n }, (_val: number, key: number) => key + 1);
export function formatTime(secs: number) {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = (secs - minutes * 60) || 0;

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function setElementPosition(parent: HTMLElement | Element, child: HTMLElement, opts: any): void {
  const coords = parent.getBoundingClientRect();
  let top, left;
  top = coords.top - child.offsetHeight - opts.margin;
  if (top < 0) top = coords.top + coords.height + opts.margin;
  left = coords.left + (coords.width - child.offsetWidth) / 2;
  if (left < 0) left = 0;
  child.style.left = `${left}px`;
  child.style.top = `${top}px`;
}

export const showMoreOnScroll = (bottomLine: number, callback: Function): void => {

  while (true) {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom > document.documentElement.clientHeight + bottomLine) break;
    callback();
  }
};


export function getFormattedDate(type: string = "DD-MM-YYYY") {
  const date = new Date();
  const day = date.getDate(),
    month = String(date.getMonth() < 10 ? 0 : "") + date.getMonth(),
    year = date.getFullYear();
  const cases = {
    "MM-DD-YYYY": `${month}-${day}-${year}`,
    "YYYY-MM-DD": `${year}-${month}-${day}`,
    "DD-MM-YYYY": `${day}-${month}-${year}`
  }
  return cases[type];
}

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export const lazy = (componentImportFn: Function) => React.lazy(async () => {
  let obj = await componentImportFn()
  return typeof obj.default === 'function' ? obj : obj.default
});