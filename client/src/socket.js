import { io } from "socket.io-client";
import { reactive } from 'vue';

const server_url = "http://localhost:3333";
export const socket = io(server_url);

export const state = reactive({
  connected: false,
});

socket.on("connect", () => {
  state.connected = true;
  console.log('Connected to Socket.IO server');
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log('Disconnected from Socket.IO server');
});
