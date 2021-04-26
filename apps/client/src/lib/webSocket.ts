import { once } from './events';

export const search = (init?: Record<string, string>): string => {
  const searchString = new URLSearchParams(init).toString();
  /**
   * if `init` is `undefined` or empty (`{}`) then the `URLSearchParams` string
   * is `""` and we just return that, otherwise go ahead and tack on the `?` to
   * make it match the way `location.search` works
   */
  return searchString && `?${searchString}`;
};

export const href = (url: string, init?: Record<string, string>): string =>
  new URL(`${url}${search(init)}`).href;

export const createWebSocket = (
  url: string,
  init?: Record<string, string>,
): WebSocket => new WebSocket(href(url, init));

export const isConnecting = (webSocket: WebSocket): boolean =>
  webSocket.readyState === WebSocket.CONNECTING;

export const isOpen = (webSocket: WebSocket): boolean =>
  webSocket.readyState === WebSocket.OPEN;

export const isClosing = (webSocket: WebSocket): boolean =>
  webSocket.readyState === WebSocket.CLOSING;

export const isClosed = (webSocket: WebSocket): boolean =>
  webSocket.readyState === WebSocket.CLOSED;

export const ready = async (webSocket: WebSocket): Promise<true> =>
  isOpen(webSocket) ||
  new Promise((resolve) => {
    once(webSocket, 'open', () => resolve(true));
  });
