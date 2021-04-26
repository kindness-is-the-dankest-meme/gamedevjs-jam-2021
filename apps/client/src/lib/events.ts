type EventMap = DocumentEventMap & EventSourceEventMap;

interface Listener<T extends keyof EventMap> extends EventListener {
  (event: EventMap[T]): void;
}

export const on = <T extends EventTarget, U extends keyof EventMap>(
  target: T,
  forEvent: U,
  listener: Listener<U>,
  options: boolean | AddEventListenerOptions = false,
): void => target.addEventListener(forEvent, listener, options);

export const once = <T extends EventTarget, U extends keyof EventMap>(
  target: T,
  forEvent: U,
  listener: Listener<U>,
  options: boolean | AddEventListenerOptions = false,
): void =>
  on(target, forEvent, listener, {
    ...(typeof options === 'boolean' ? { capture: options } : options),
    once: true,
  });

export const off = <T extends EventTarget, U extends keyof EventMap>(
  target: T,
  forEvent: U,
  listener: Listener<U>,
  options: boolean | EventListenerOptions = false,
): void => target.removeEventListener(forEvent, listener, options);
