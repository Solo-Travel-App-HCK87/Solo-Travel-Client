import { io } from 'socket.io-client';

const socket = io('https://solo-travel.harryrismananda.site', {
  autoConnect: false,
});

export default socket;
