import { negotiate } from '@kitdm/shared';
import evt from 'evt';

import { ctx } from './app/canvas';
import { createRtcPeerConnection } from './lib/rtcPeerConnection';
import { createWebSocket, isReady } from './lib/webSocket';

const { Evt } = evt;

const webSocket = createWebSocket('ws://localhost:8080');
const rtcPeerConnection = createRtcPeerConnection();
const dataChannel = rtcPeerConnection.createDataChannel(`@kitdm`);

/**
 * Connection Logging
 */
Evt.merge([
  Evt.from<Event>(rtcPeerConnection, 'connectionstatechange'),
  Evt.from<Event>(rtcPeerConnection, 'signalingstatechange'),
]).attach(() => {
  console.log(
    'rtcPeerConnection.connectionState',
    rtcPeerConnection.connectionState,
  );
  console.log(
    'rtcPeerConnection.signalingState',
    rtcPeerConnection.signalingState,
  );
});

/**
 * Data Channel Logging
 */
const isMessageEvent = (
  event: Event | RTCErrorEvent | MessageEvent,
): event is MessageEvent => event.type === 'message';

Evt.merge([
  Evt.from<Event>(dataChannel, 'open'),
  Evt.from<Event>(dataChannel, 'close'),
  Evt.from<RTCErrorEvent>(dataChannel, 'error'),
  Evt.from<MessageEvent<string>>(dataChannel, 'message'),
]).attach((event) => {
  if (isMessageEvent(event) && event.data) {
    console.log('event.data', event.data);
    return;
  }

  console.log('event.type', event.type);
  console.log('dataChannel.bufferedAmount', dataChannel.bufferedAmount);
  console.log('dataChannel.id', dataChannel.id);
  console.log('dataChannel.label', dataChannel.label);
  console.log('dataChannel.maxPacketLifeTime', dataChannel.maxPacketLifeTime);
  console.log('dataChannel.maxRetransmits', dataChannel.maxRetransmits);
  console.log('dataChannel.negotiated', dataChannel.negotiated);
  console.log('dataChannel.ordered', dataChannel.ordered);
  console.log('dataChannel.priority', dataChannel.priority);
  console.log('dataChannel.protocol', dataChannel.protocol);
  console.log('dataChannel.readyState', dataChannel.readyState);
});

negotiate(webSocket, rtcPeerConnection, isReady);

console.log(ctx);
