declare module 'ws/lib/websocket-server' {
  import type { Server } from 'ws';

  class SocketServer extends Server {}
  export default SocketServer;
}
