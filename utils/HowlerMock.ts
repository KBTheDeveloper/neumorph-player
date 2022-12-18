export default (() => {
  Object.defineProperty(global.window.HTMLMediaElement.prototype, 'play', {
    configurable: true,
    // Define the property getter
    get () {
      setTimeout(() => (this.onloadeddata && this.onloadeddata()))
      return () => {}
    }
  })

  Object.defineProperty(global.window.HTMLMediaElement.prototype, 'load', {
    configurable: true,
    // Define the property getter
    get () {
      setTimeout(() => (this.onloadeddata && this.onloadeddata()))
      return () => {}
    }
  })
})();