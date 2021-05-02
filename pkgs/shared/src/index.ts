import evt from 'evt';
import type ServerWebSocket from 'ws';

type IWebSocket = WebSocket | ServerWebSocket;

const { Evt } = evt;

const logger = Evt.create<string>();
logger.attach((message) => {
  console.log(message);
});

export const negotiate = (
  webSocket: IWebSocket,
  rtcPeerConnection: RTCPeerConnection,
  isReady: (webSocket: any) => Promise<true>,
): void => {
  Evt.from<Event>(rtcPeerConnection, 'negotiationneeded').attach(async () => {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation#Handling_the_negotiationneeded_event
     */
    try {
      // can't to "perfect negotiation" because of Safari/Mobile Safari
      const offer = await rtcPeerConnection.createOffer();
      await rtcPeerConnection.setLocalDescription(
        new RTCSessionDescription(offer),
      );
      await isReady(webSocket);
      webSocket.send(
        JSON.stringify({ description: rtcPeerConnection.localDescription }),
      );
    } catch (error) {
      console.error(error);
    }
  });

  Evt.from<RTCPeerConnectionIceEvent>(rtcPeerConnection, 'icecandidate').attach(
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation#Handling_incoming_ICE_candidates
     */
    async ({ candidate }) => {
      await isReady(webSocket);
      webSocket.send(JSON.stringify({ candidate }));
    },
  );

  Evt.from<MessageEvent<string>>(webSocket, 'message').attach(
    async ({ data }) => {
      /**
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation#Handling_incoming_messages_on_the_signaling_channel
       */
      const { candidate, description } = JSON.parse(data);
      console.log({ candidate, description });

      try {
        candidate && (await rtcPeerConnection.addIceCandidate(candidate));

        description &&
          description.type !== 'offer' &&
          (await rtcPeerConnection.setRemoteDescription(description));
      } catch (error) {
        console.error(error);
      }
    },
  );
};
