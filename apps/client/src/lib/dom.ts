export const {
  devicePixelRatio: dpr,
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
} = window;

export const el = <E extends Element = Element>(selectors: string): E | null =>
  document.querySelector(selectors);
