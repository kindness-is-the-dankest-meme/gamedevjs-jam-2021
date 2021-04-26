import { on } from './lib/events';
import { createWebSocket } from './lib/webSocket';

const webSocket = createWebSocket('ws://localhost:8080');

on(webSocket, 'open', () => {
  console.log('open');
});
