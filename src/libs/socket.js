import { io } from 'socket.io-client';

const socket = io('https://ip-p2.bluecoree.site', {
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
