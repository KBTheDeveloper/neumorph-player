import { getStateKey } from "./state-key";

const positionStore = Object.create(null);

export function saveScrollPosition () {
    const key = getStateKey()
    if (key) {
      positionStore[key] = {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
    }
  }