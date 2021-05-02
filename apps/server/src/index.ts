import { negotiate } from '@kitdm/shared';
import { Evt } from 'evt';
import { createServer } from 'http';
import WebSocket from 'ws';

import { createRtcPeerConnection } from './lib/rtcPeerConnection';
import { createSocketServer } from './lib/socketServer';

const server = createServer();
const socketServer = createSocketServer({ server });

const isOpen = (webSocket: WebSocket): boolean =>
  webSocket.readyState === WebSocket.OPEN;

const isReady = async (webSocket: WebSocket): Promise<true> =>
  isOpen(webSocket) ||
  new Promise((resolve) => {
    webSocket.addEventListener('open', () => resolve(true), { once: true });
  });

Evt.from<WebSocket>(socketServer, 'connection').attach((webSocket) => {
  const rtcPeerConnection = createRtcPeerConnection();

  negotiate(webSocket, rtcPeerConnection, isReady);
});

server.listen(8080, () => {
  console.log('listening on 8080');
});
