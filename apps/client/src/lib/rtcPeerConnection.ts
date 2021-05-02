const defaultConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:global.stun.twilio.com:3478',
      ],
    },
  ],
};

export const createRtcPeerConnection = (config?: RTCConfiguration) =>
  new RTCPeerConnection({
    ...defaultConfig,
    ...config,
  });
