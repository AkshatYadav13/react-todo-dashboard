export function debounce(func, delay) {
  let timmer;

  return function (...args) {
    clearTimeout(timmer);
    timmer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
