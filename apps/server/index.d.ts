/// <reference lib="dom" />

declare module 'wrtc/lib' {
  /**
   * @see https://github.com/node-webrtc/node-webrtc/issues/605#issuecomment-759172283
   */
  // eslint-disable-next-line no-var
  var RTCPeerConnection: {
    prototype: RTCPeerConnection;
    new (configuration?: RTCConfiguration): RTCPeerConnection;
    generateCertificate(
      keygenAlgorithm: AlgorithmIdentifier,
    ): Promise<RTCCertificate>;
    getDefaultIceServers(): RTCIceServer[];
  };
}

declare module 'ws/lib/websocket-server' {
  import type { Server } from 'ws';
  export default class extends Server {}
}
