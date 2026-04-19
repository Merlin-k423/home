export function debounce(func, delay, immediate = false) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => (timer = null), delay)
      if (callNow) func.apply(this, args)
    } else {
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}
