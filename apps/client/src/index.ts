import evt from 'evt';

import { dpr, el } from './lib/dom';
import { on } from './lib/events';
import { createWebSocket } from './lib/webSocket';

const { Evt } = evt;

const canvas = el<HTMLCanvasElement>('canvas');

if (!canvas) {
  throw new Error(`Expected an HTMLCanvasElement, but found none`);
}

const ctx = canvas.getContext('2d');
if (!ctx) {
  throw new Error(`Expected a CanvasRenderingContext2D, but found none`);
}

/**
 * Window Resizing
 */
Evt.from<Event>(window, 'resize').attach(() => {
  const { innerWidth, innerHeight } = window;

  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;

  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
  canvas.style.transform = `scale(${1 / dpr})`;
});

window.dispatchEvent(new Event('resize'));

const webSocket = createWebSocket('ws://localhost:8080');

on(webSocket, 'open', () => {
  console.log('open');
});
