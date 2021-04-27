import type { Server, ServerOptions } from 'ws';
import SocketServer from 'ws/lib/websocket-server';

export const createSocketServer = (
  options?: ServerOptions,
  callback?: () => void,
): Server => new SocketServer(options, callback);
