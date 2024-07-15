export {};

declare global {
  interface Window {
    Howler: any;
  }
}

(<any>window).Howler = Howler;
