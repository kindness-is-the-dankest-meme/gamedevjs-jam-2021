import { Evt } from 'evt';
import { createServer } from 'http';
import type WebSocket from 'ws';
import { createSocketServer } from './lib/socketServer';

const server = createServer();
const socketServer = createSocketServer({ server });

Evt.from<WebSocket>(socketServer, 'connection').attach((socket) => {
  console.log('socket');
});

server.listen(8080, () => {
  console.log('listening on 8080');
});
